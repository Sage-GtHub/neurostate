import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const getVitalApiBase = () => {
  const env = Deno.env.get("VITAL_ENVIRONMENT") || "sandbox";
  const region = Deno.env.get("VITAL_REGION") || "us";
  if (env === "production") {
    return region === "eu" ? "https://api.eu.tryvital.io/v2" : "https://api.us.tryvital.io/v2";
  }
  return region === "eu" ? "https://api.sandbox.eu.tryvital.io/v2" : "https://api.sandbox.tryvital.io/v2";
};

// Runs on a cron schedule — syncs all connected devices via Vital API
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const VITAL_API_KEY = Deno.env.get("VITAL_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const VITAL_API_BASE = getVitalApiBase();

    console.log('[Scheduled Sync] Starting scheduled device sync...');

    if (!VITAL_API_KEY) {
      console.error('[Scheduled Sync] VITAL_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Vital API key not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get all connected devices
    const { data: devices, error: devicesError } = await supabase
      .from('connected_devices')
      .select('*')
      .eq('connection_status', 'connected');

    if (devicesError) throw devicesError;

    if (!devices || devices.length === 0) {
      console.log('[Scheduled Sync] No connected devices to sync');
      return new Response(JSON.stringify({ success: true, message: 'No connected devices', synced: 0 }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`[Scheduled Sync] Found ${devices.length} connected devices`);

    // Group devices by user_id to avoid duplicate Vital API calls
    const userDevices = new Map<string, typeof devices>();
    for (const device of devices) {
      const existing = userDevices.get(device.user_id) || [];
      existing.push(device);
      userDevices.set(device.user_id, existing);
    }

    let successCount = 0;
    let errorCount = 0;

    for (const [userId, userDeviceList] of userDevices) {
      try {
        // Resolve the Vital user by client_user_id (our auth user id)
        const getUserRes = await fetch(`${VITAL_API_BASE}/user/resolve/${userId}`, {
          headers: { "x-vital-api-key": VITAL_API_KEY },
        });

        if (!getUserRes.ok) {
          console.log(`[Scheduled Sync] User ${userId} not found in Vital, skipping`);
          errorCount += userDeviceList.length;
          continue;
        }

        const vitalUser = await getUserRes.json();
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        // Fetch sleep + activity in parallel
        const [sleepRes, activityRes] = await Promise.all([
          fetch(`${VITAL_API_BASE}/summary/sleep/${vitalUser.user_id}?start_date=${yesterday}&end_date=${today}`, {
            headers: { "x-vital-api-key": VITAL_API_KEY },
          }),
          fetch(`${VITAL_API_BASE}/summary/activity/${vitalUser.user_id}?start_date=${yesterday}&end_date=${today}`, {
            headers: { "x-vital-api-key": VITAL_API_KEY },
          }),
        ]);

        const metrics: Array<{ user_id: string; metric_type: string; value: number; recorded_at: string; device_source: string; metadata?: Record<string, unknown> }> = [];

        if (sleepRes.ok) {
          const { sleep = [] } = await sleepRes.json();
          for (const s of sleep) {
            const source = s.source?.name || 'vital';
            if (s.duration_sleep_seconds) {
              metrics.push({ user_id: userId, metric_type: 'sleep_duration', value: s.duration_sleep_seconds / 3600, recorded_at: s.calendar_date, device_source: source,
                metadata: { deep: s.duration_deep_sleep_seconds, rem: s.duration_rem_sleep_seconds, light: s.duration_light_sleep_seconds } });
            }
            if (s.hrv?.avg_sdnn) {
              metrics.push({ user_id: userId, metric_type: 'hrv', value: s.hrv.avg_sdnn, recorded_at: s.calendar_date, device_source: source });
            }
            if (s.hr_average) {
              metrics.push({ user_id: userId, metric_type: 'resting_heart_rate', value: s.hr_average, recorded_at: s.calendar_date, device_source: source });
            }
          }
        }

        if (activityRes.ok) {
          const { activity = [] } = await activityRes.json();
          for (const a of activity) {
            const source = a.source?.name || 'vital';
            if (a.steps) metrics.push({ user_id: userId, metric_type: 'steps', value: a.steps, recorded_at: a.calendar_date, device_source: source });
            if (a.calories_total) metrics.push({ user_id: userId, metric_type: 'calories', value: a.calories_total, recorded_at: a.calendar_date, device_source: source });
          }
        }

        if (metrics.length > 0) {
          const { error: insertError } = await supabase.from('user_metrics').insert(metrics);
          if (insertError) console.error(`[Scheduled Sync] Insert error for user ${userId}:`, insertError);
        }

        // Update last_sync_at for all this user's devices
        const deviceIds = userDeviceList.map(d => d.id);
        await supabase.from('connected_devices')
          .update({ last_sync_at: new Date().toISOString() })
          .in('id', deviceIds);

        console.log(`[Scheduled Sync] Synced ${metrics.length} metrics for user ${userId}`);
        successCount += userDeviceList.length;

      } catch (userError) {
        console.error(`[Scheduled Sync] Error for user ${userId}:`, userError);
        errorCount += userDeviceList.length;
      }
    }

    console.log(`[Scheduled Sync] Completed. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(JSON.stringify({ success: true, synced: successCount, errors: errorCount }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[Scheduled Sync] Fatal error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
