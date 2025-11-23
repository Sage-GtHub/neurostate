import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { deviceId } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get authenticated user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get device
    const { data: device, error: deviceError } = await supabase
      .from('connected_devices')
      .select('*')
      .eq('id', deviceId)
      .eq('user_id', user.id)
      .single();

    if (deviceError || !device) {
      return new Response(JSON.stringify({ error: 'Device not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get OAuth token
    const { data: tokenData } = await supabase
      .from('device_tokens')
      .select('*')
      .eq('user_id', user.id)
      .eq('device_type', device.device_type === 'oura_ring' ? 'oura' : device.device_type)
      .single();

    if (!tokenData) {
      return new Response(JSON.stringify({ error: 'Device not connected' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Sync data based on device type
    if (device.device_type === 'oura_ring') {
      // Fetch data from Oura API
      const today = new Date().toISOString().split('T')[0];
      const ouraResponse = await fetch(`https://api.ouraring.com/v2/usercollection/daily_activity?start_date=${today}&end_date=${today}`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
        },
      });

      if (ouraResponse.ok) {
        const ouraData = await ouraResponse.json();
        const metrics = [];

        // Parse Oura data and create metrics
        if (ouraData.data && ouraData.data.length > 0) {
          const dayData = ouraData.data[0];
          
          // HRV
          if (dayData.contributors?.hrv_balance) {
            metrics.push({
              user_id: user.id,
              metric_type: 'hrv',
              value: dayData.contributors.hrv_balance,
              device_source: 'oura',
              recorded_at: new Date().toISOString(),
            });
          }

          // Sleep score
          if (dayData.score) {
            metrics.push({
              user_id: user.id,
              metric_type: 'sleep_quality',
              value: dayData.score / 10, // Convert to 1-10 scale
              device_source: 'oura',
              recorded_at: new Date().toISOString(),
            });
          }

          // Recovery
          if (dayData.contributors?.recovery_index) {
            metrics.push({
              user_id: user.id,
              metric_type: 'recovery',
              value: dayData.contributors.recovery_index,
              device_source: 'oura',
              recorded_at: new Date().toISOString(),
            });
          }
        }

        // Insert metrics
        if (metrics.length > 0) {
          await supabase.from('user_metrics').insert(metrics);
        }

        // Update device sync time
        await supabase
          .from('connected_devices')
          .update({ last_sync_at: new Date().toISOString() })
          .eq('id', deviceId);

        return new Response(JSON.stringify({ 
          success: true, 
          metrics_synced: metrics.length 
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ error: 'Sync not implemented for this device' }), {
      status: 501,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in sync-device-data:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});