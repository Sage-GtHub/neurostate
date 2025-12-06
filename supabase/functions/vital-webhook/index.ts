import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-vital-webhook-secret',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const payload = await req.json();
    console.log("Vital webhook received:", JSON.stringify(payload, null, 2));

    const { event_type, data, client_user_id } = payload;

    if (!client_user_id) {
      console.log("No client_user_id in webhook payload");
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Handle different event types
    switch (event_type) {
      case "daily.data.sleep.created":
      case "daily.data.sleep.updated": {
        const sleep = data;
        
        // Store sleep duration
        if (sleep.duration_sleep_seconds) {
          await supabase.from('user_metrics').upsert({
            user_id: client_user_id,
            metric_type: 'sleep_duration',
            value: sleep.duration_sleep_seconds / 3600,
            recorded_at: sleep.calendar_date,
            device_source: sleep.source?.name || 'vital',
            metadata: {
              deep_sleep: sleep.duration_deep_sleep_seconds,
              rem_sleep: sleep.duration_rem_sleep_seconds,
              light_sleep: sleep.duration_light_sleep_seconds,
            }
          }, { onConflict: 'user_id,metric_type,recorded_at' });
        }

        // Store HRV
        if (sleep.hrv?.avg_sdnn) {
          await supabase.from('user_metrics').upsert({
            user_id: client_user_id,
            metric_type: 'hrv',
            value: sleep.hrv.avg_sdnn,
            recorded_at: sleep.calendar_date,
            device_source: sleep.source?.name || 'vital',
          }, { onConflict: 'user_id,metric_type,recorded_at' });
        }

        // Store sleep score if available
        if (sleep.sleep_efficiency) {
          await supabase.from('user_metrics').upsert({
            user_id: client_user_id,
            metric_type: 'sleep_score',
            value: sleep.sleep_efficiency * 10, // Scale to 0-10
            recorded_at: sleep.calendar_date,
            device_source: sleep.source?.name || 'vital',
          }, { onConflict: 'user_id,metric_type,recorded_at' });
        }

        console.log(`Processed sleep data for user ${client_user_id}`);
        break;
      }

      case "daily.data.activity.created":
      case "daily.data.activity.updated": {
        const activity = data;

        // Store steps
        if (activity.steps) {
          await supabase.from('user_metrics').upsert({
            user_id: client_user_id,
            metric_type: 'steps',
            value: activity.steps,
            recorded_at: activity.calendar_date,
            device_source: activity.source?.name || 'vital',
          }, { onConflict: 'user_id,metric_type,recorded_at' });
        }

        // Store active calories
        if (activity.calories_active) {
          await supabase.from('user_metrics').upsert({
            user_id: client_user_id,
            metric_type: 'calories',
            value: activity.calories_active,
            recorded_at: activity.calendar_date,
            device_source: activity.source?.name || 'vital',
          }, { onConflict: 'user_id,metric_type,recorded_at' });
        }

        console.log(`Processed activity data for user ${client_user_id}`);
        break;
      }

      case "daily.data.body.created":
      case "daily.data.body.updated": {
        const body = data;

        // Store recovery score if available
        if (body.recovery_score) {
          await supabase.from('user_metrics').upsert({
            user_id: client_user_id,
            metric_type: 'recovery',
            value: body.recovery_score,
            recorded_at: body.calendar_date,
            device_source: body.source?.name || 'vital',
          }, { onConflict: 'user_id,metric_type,recorded_at' });
        }

        console.log(`Processed body data for user ${client_user_id}`);
        break;
      }

      case "provider.connected": {
        // Update connected_devices table
        const providerName = data.provider;
        
        await supabase.from('connected_devices').upsert({
          user_id: client_user_id,
          device_type: providerName,
          device_name: providerName.charAt(0).toUpperCase() + providerName.slice(1),
          connection_status: 'connected',
          last_sync_at: new Date().toISOString(),
        }, { onConflict: 'user_id,device_type' });

        console.log(`Provider ${providerName} connected for user ${client_user_id}`);
        break;
      }

      case "provider.disconnected": {
        const providerName = data.provider;

        await supabase
          .from('connected_devices')
          .update({ connection_status: 'disconnected' })
          .eq('user_id', client_user_id)
          .eq('device_type', providerName);

        console.log(`Provider ${providerName} disconnected for user ${client_user_id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event_type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Vital webhook error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
