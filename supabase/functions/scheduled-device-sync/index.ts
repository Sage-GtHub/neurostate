import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// This function runs on a schedule to sync all connected devices
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const vitalApiKey = Deno.env.get('VITAL_API_KEY');
    const vitalRegion = Deno.env.get('VITAL_REGION') || 'us';
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('[Scheduled Sync] Starting scheduled device sync...');

    // Get all connected devices
    const { data: devices, error: devicesError } = await supabase
      .from('connected_devices')
      .select('*')
      .eq('connection_status', 'connected');

    if (devicesError) {
      console.error('[Scheduled Sync] Error fetching devices:', devicesError);
      throw devicesError;
    }

    if (!devices || devices.length === 0) {
      console.log('[Scheduled Sync] No connected devices to sync');
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No connected devices to sync',
        synced: 0 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`[Scheduled Sync] Found ${devices.length} connected devices`);

    let successCount = 0;
    let errorCount = 0;
    const results: Array<{ deviceId: string; status: string; error?: string }> = [];

    for (const device of devices) {
      try {
        console.log(`[Scheduled Sync] Syncing device: ${device.device_name} (${device.device_type})`);

        // Get device token for this device
        const { data: deviceToken } = await supabase
          .from('device_tokens')
          .select('*')
          .eq('user_id', device.user_id)
          .eq('device_type', device.device_type === 'oura_ring' ? 'oura' : device.device_type)
          .single();

        // Try Vital API first if available
        if (vitalApiKey && deviceToken?.vital_user_id) {
          const vitalBaseUrl = vitalRegion === 'eu' 
            ? 'https://api.eu.tryvital.io'
            : 'https://api.tryvital.io';

          // Fetch summary data from Vital
          const today = new Date().toISOString().split('T')[0];
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          
          const summaryResponse = await fetch(
            `${vitalBaseUrl}/v2/summary/activity/${device.device_tokens.vital_user_id}?start_date=${yesterday}&end_date=${today}`,
            {
              headers: {
                'x-vital-api-key': vitalApiKey,
              },
            }
          );

          if (summaryResponse.ok) {
            const summaryData = await summaryResponse.json();
            const metrics = [];

            // Parse activity data
            if (summaryData.activity && summaryData.activity.length > 0) {
              const latestActivity = summaryData.activity[0];
              
              if (latestActivity.steps) {
                metrics.push({
                  user_id: device.user_id,
                  metric_type: 'steps',
                  value: latestActivity.steps,
                  device_source: device.device_type,
                  recorded_at: new Date().toISOString(),
                });
              }

              if (latestActivity.calories_active) {
                metrics.push({
                  user_id: device.user_id,
                  metric_type: 'calories_active',
                  value: latestActivity.calories_active,
                  device_source: device.device_type,
                  recorded_at: new Date().toISOString(),
                });
              }
            }

            // Insert metrics if any
            if (metrics.length > 0) {
              await supabase.from('user_metrics').insert(metrics);
              console.log(`[Scheduled Sync] Inserted ${metrics.length} metrics for ${device.device_name}`);
            }
          }

          // Fetch sleep data
          const sleepResponse = await fetch(
            `${vitalBaseUrl}/v2/summary/sleep/${device.device_tokens.vital_user_id}?start_date=${yesterday}&end_date=${today}`,
            {
              headers: {
                'x-vital-api-key': vitalApiKey,
              },
            }
          );

          if (sleepResponse.ok) {
            const sleepData = await sleepResponse.json();
            const sleepMetrics = [];

            if (sleepData.sleep && sleepData.sleep.length > 0) {
              const latestSleep = sleepData.sleep[0];

              if (latestSleep.duration_total) {
                sleepMetrics.push({
                  user_id: device.user_id,
                  metric_type: 'sleep_duration',
                  value: latestSleep.duration_total / 3600, // Convert to hours
                  device_source: device.device_type,
                  recorded_at: new Date().toISOString(),
                });
              }

              if (latestSleep.efficiency) {
                sleepMetrics.push({
                  user_id: device.user_id,
                  metric_type: 'sleep_efficiency',
                  value: latestSleep.efficiency,
                  device_source: device.device_type,
                  recorded_at: new Date().toISOString(),
                });
              }

              if (latestSleep.hr_average) {
                sleepMetrics.push({
                  user_id: device.user_id,
                  metric_type: 'resting_heart_rate',
                  value: latestSleep.hr_average,
                  device_source: device.device_type,
                  recorded_at: new Date().toISOString(),
                });
              }

              if (latestSleep.hrv_rmssd_average) {
                sleepMetrics.push({
                  user_id: device.user_id,
                  metric_type: 'hrv',
                  value: latestSleep.hrv_rmssd_average,
                  device_source: device.device_type,
                  recorded_at: new Date().toISOString(),
                });
              }
            }

            if (sleepMetrics.length > 0) {
              await supabase.from('user_metrics').insert(sleepMetrics);
              console.log(`[Scheduled Sync] Inserted ${sleepMetrics.length} sleep metrics for ${device.device_name}`);
            }
          }
        }
        // Fallback to direct Oura API if device has token
        else if (device.device_type === 'oura_ring' && deviceToken?.access_token) {
          const today = new Date().toISOString().split('T')[0];
          const ouraResponse = await fetch(
            `https://api.ouraring.com/v2/usercollection/daily_activity?start_date=${today}&end_date=${today}`,
            {
              headers: {
                'Authorization': `Bearer ${deviceToken.access_token}`,
              },
            }
          );

          if (ouraResponse.ok) {
            const ouraData = await ouraResponse.json();
            const metrics = [];

            if (ouraData.data && ouraData.data.length > 0) {
              const dayData = ouraData.data[0];

              if (dayData.contributors?.hrv_balance) {
                metrics.push({
                  user_id: device.user_id,
                  metric_type: 'hrv',
                  value: dayData.contributors.hrv_balance,
                  device_source: 'oura',
                  recorded_at: new Date().toISOString(),
                });
              }

              if (dayData.score) {
                metrics.push({
                  user_id: device.user_id,
                  metric_type: 'readiness',
                  value: dayData.score,
                  device_source: 'oura',
                  recorded_at: new Date().toISOString(),
                });
              }
            }

            if (metrics.length > 0) {
              await supabase.from('user_metrics').insert(metrics);
              console.log(`[Scheduled Sync] Inserted ${metrics.length} Oura metrics for ${device.device_name}`);
            }
          }
        }

        // Update last sync time
        await supabase
          .from('connected_devices')
          .update({ last_sync_at: new Date().toISOString() })
          .eq('id', device.id);

        successCount++;
        results.push({ deviceId: device.id, status: 'success' });

      } catch (deviceError) {
        console.error(`[Scheduled Sync] Error syncing device ${device.id}:`, deviceError);
        errorCount++;
        results.push({ 
          deviceId: device.id, 
          status: 'error', 
          error: deviceError instanceof Error ? deviceError.message : 'Unknown error' 
        });
      }
    }

    console.log(`[Scheduled Sync] Completed. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(JSON.stringify({
      success: true,
      message: `Synced ${successCount} devices, ${errorCount} errors`,
      synced: successCount,
      errors: errorCount,
      results,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[Scheduled Sync] Fatal error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
