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

    // Check if user already has demo data
    const { data: existingMetrics } = await supabase
      .from('user_metrics')
      .select('id')
      .eq('user_id', user.id)
      .limit(1);

    if (existingMetrics && existingMetrics.length > 0) {
      return new Response(JSON.stringify({ message: 'Demo data already exists' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate 30 days of sample data
    const metrics = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);

      // HRV data (trending upward with variation)
      const baseHrv = 60 + (29 - i) * 0.3;
      const hrvVariation = Math.random() * 8 - 4;
      metrics.push({
        user_id: user.id,
        metric_type: 'hrv',
        value: Math.round(baseHrv + hrvVariation),
        recorded_at: date.toISOString(),
        device_source: 'demo',
      });

      // Sleep quality (7-9 range with variation)
      const sleepQuality = 7 + Math.random() * 2;
      metrics.push({
        user_id: user.id,
        metric_type: 'sleep_quality',
        value: parseFloat(sleepQuality.toFixed(1)),
        recorded_at: date.toISOString(),
        device_source: 'demo',
        metadata: {
          deep_sleep: 1.5 + Math.random() * 1,
          rem_sleep: 1.5 + Math.random() * 0.8,
          light_sleep: 3 + Math.random() * 2,
        }
      });

      // Recovery score (trending upward 70-90%)
      const baseRecovery = 70 + (29 - i) * 0.5;
      const recoveryVariation = Math.random() * 10 - 5;
      metrics.push({
        user_id: user.id,
        metric_type: 'recovery',
        value: Math.round(Math.max(60, Math.min(95, baseRecovery + recoveryVariation))),
        recorded_at: date.toISOString(),
        device_source: 'demo',
      });

      // Focus time (varying 1-3 hours per day)
      if (i < 7) { // Only last week
        const focusTime = 1 + Math.random() * 2;
        metrics.push({
          user_id: user.id,
          metric_type: 'focus_time',
          value: parseFloat(focusTime.toFixed(1)),
          recorded_at: date.toISOString(),
          device_source: 'demo',
        });
      }
    }

    // Insert all metrics
    const { error: insertError } = await supabase
      .from('user_metrics')
      .insert(metrics);

    if (insertError) {
      console.error('Error inserting metrics:', insertError);
      throw insertError;
    }

    // Create demo devices
    const devices = [
      {
        user_id: user.id,
        device_type: 'oura_ring',
        device_name: 'Oura Ring Gen 3',
        connection_status: 'disconnected',
        last_sync_at: null,
        battery_level: null,
      },
      {
        user_id: user.id,
        device_type: 'apple_watch',
        device_name: 'Apple Watch Ultra',
        connection_status: 'disconnected',
        last_sync_at: null,
        battery_level: null,
      },
      {
        user_id: user.id,
        device_type: 'whoop',
        device_name: 'Whoop 4.0',
        connection_status: 'disconnected',
        last_sync_at: null,
        battery_level: null,
      },
    ];

    const { error: devicesError } = await supabase
      .from('connected_devices')
      .insert(devices);

    if (devicesError) {
      console.error('Error inserting devices:', devicesError);
      throw devicesError;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Demo data seeded successfully',
      metrics_count: metrics.length,
      devices_count: devices.length
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in seed-demo-data:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});