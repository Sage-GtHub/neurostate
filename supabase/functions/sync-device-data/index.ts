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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const VITAL_API_KEY = Deno.env.get("VITAL_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (!VITAL_API_KEY) {
      return new Response(JSON.stringify({ error: "Vital API key not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get authenticated user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const VITAL_API_BASE = getVitalApiBase();

    // Resolve the Vital user
    const getUserRes = await fetch(`${VITAL_API_BASE}/user/resolve/${user.id}`, {
      headers: { "x-vital-api-key": VITAL_API_KEY },
    });

    if (!getUserRes.ok) {
      return new Response(JSON.stringify({ error: "User not registered with Vital. Connect a device first." }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const vitalUser = await getUserRes.json();
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Fetch sleep + activity in parallel
    const [sleepRes, activityRes] = await Promise.all([
      fetch(`${VITAL_API_BASE}/summary/sleep/${vitalUser.user_id}?start_date=${weekAgo}&end_date=${today}`, {
        headers: { "x-vital-api-key": VITAL_API_KEY },
      }),
      fetch(`${VITAL_API_BASE}/summary/activity/${vitalUser.user_id}?start_date=${weekAgo}&end_date=${today}`, {
        headers: { "x-vital-api-key": VITAL_API_KEY },
      }),
    ]);

    const metrics: Array<{ user_id: string; metric_type: string; value: number; recorded_at: string; device_source: string; metadata?: Record<string, unknown> }> = [];

    if (sleepRes.ok) {
      const { sleep = [] } = await sleepRes.json();
      for (const s of sleep) {
        if (s.duration_sleep_seconds) {
          metrics.push({
            user_id: user.id, metric_type: 'sleep_duration',
            value: s.duration_sleep_seconds / 3600, recorded_at: s.calendar_date,
            device_source: s.source?.name || 'vital',
            metadata: { deep: s.duration_deep_sleep_seconds, rem: s.duration_rem_sleep_seconds, light: s.duration_light_sleep_seconds },
          });
        }
        if (s.hrv?.avg_sdnn) {
          metrics.push({ user_id: user.id, metric_type: 'hrv', value: s.hrv.avg_sdnn, recorded_at: s.calendar_date, device_source: s.source?.name || 'vital' });
        }
        if (s.hr_average) {
          metrics.push({ user_id: user.id, metric_type: 'resting_heart_rate', value: s.hr_average, recorded_at: s.calendar_date, device_source: s.source?.name || 'vital' });
        }
        if (s.efficiency) {
          metrics.push({ user_id: user.id, metric_type: 'sleep_efficiency', value: s.efficiency, recorded_at: s.calendar_date, device_source: s.source?.name || 'vital' });
        }
      }
    }

    if (activityRes.ok) {
      const { activity = [] } = await activityRes.json();
      for (const a of activity) {
        if (a.steps) {
          metrics.push({ user_id: user.id, metric_type: 'steps', value: a.steps, recorded_at: a.calendar_date, device_source: a.source?.name || 'vital' });
        }
        if (a.calories_total) {
          metrics.push({ user_id: user.id, metric_type: 'calories', value: a.calories_total, recorded_at: a.calendar_date, device_source: a.source?.name || 'vital' });
        }
      }
    }

    if (metrics.length > 0) {
      const { error: insertError } = await supabase.from('user_metrics').insert(metrics);
      if (insertError) console.error("Insert error:", insertError);
    }

    // Update connected_devices last_sync_at
    await supabase.from('connected_devices')
      .update({ last_sync_at: new Date().toISOString() })
      .eq('user_id', user.id);

    console.log(`[sync-device-data] Synced ${metrics.length} metrics for user ${user.id}`);

    return new Response(JSON.stringify({ success: true, metrics_synced: metrics.length }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in sync-device-data:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
