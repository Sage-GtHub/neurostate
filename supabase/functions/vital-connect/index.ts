import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Vital API supports sandbox/production and US/EU regions
// VITAL_ENVIRONMENT: "sandbox" or "production" (defaults to sandbox)
// VITAL_REGION: "us" or "eu" (defaults to us)
const getVitalApiBase = () => {
  const env = Deno.env.get("VITAL_ENVIRONMENT") || "sandbox";
  const region = Deno.env.get("VITAL_REGION") || "us";
  
  if (env === "production") {
    return region === "eu" 
      ? "https://api.eu.tryvital.io/v2"
      : "https://api.us.tryvital.io/v2";
  }
  // Sandbox
  return region === "eu"
    ? "https://api.sandbox.eu.tryvital.io/v2"
    : "https://api.sandbox.tryvital.io/v2";
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const VITAL_API_KEY = Deno.env.get("VITAL_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const VITAL_API_BASE = getVitalApiBase();

    console.log("Using Vital API base:", VITAL_API_BASE);

    if (!VITAL_API_KEY) {
      console.error("VITAL_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Vital API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    // Get user from token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      console.error("User auth error:", userError);
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, provider } = await req.json();
    console.log(`Vital action: ${action}, provider: ${provider}, user: ${user.id}`);

    // Create or get Vital user
    if (action === "create-link") {
      // First, check if user exists in Vital
      let vitalUserId;
      
      // Try to create user in Vital
      const createUserRes = await fetch(`${VITAL_API_BASE}/user`, {
        method: "POST",
        headers: {
          "x-vital-api-key": VITAL_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_user_id: user.id,
        }),
      });

      if (createUserRes.ok) {
        const userData = await createUserRes.json();
        vitalUserId = userData.user_id;
        console.log("Created Vital user:", vitalUserId);
      } else {
        const createError = await createUserRes.text();
        console.log("Create user response:", createUserRes.status, createError);
        
        // User might already exist, try to get them
        const getUserRes = await fetch(`${VITAL_API_BASE}/user/resolve/${user.id}`, {
          headers: {
            "x-vital-api-key": VITAL_API_KEY,
          },
        });
        
        if (getUserRes.ok) {
          const existingUser = await getUserRes.json();
          vitalUserId = existingUser.user_id;
          console.log("Found existing Vital user:", vitalUserId);
        } else {
          const resolveError = await getUserRes.text();
          console.error("Failed to create/get Vital user. Create status:", createUserRes.status, "Resolve status:", getUserRes.status);
          console.error("Resolve error:", resolveError);
          
          // Check if API key is valid
          if (createUserRes.status === 401 || getUserRes.status === 401) {
            return new Response(JSON.stringify({ error: "Vital API key is invalid or expired. Please check your configuration." }), {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          
          return new Response(JSON.stringify({ error: "Unable to connect to Vital. Please verify your API key is configured correctly." }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }

      // Generate link token for the provider
      const linkRes = await fetch(`${VITAL_API_BASE}/link/token`, {
        method: "POST",
        headers: {
          "x-vital-api-key": VITAL_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: vitalUserId,
          provider: provider, // e.g., "oura", "whoop", "fitbit", "garmin"
          redirect_url: `${req.headers.get('origin')}/nova/devices`,
        }),
      });

      if (!linkRes.ok) {
        const errorText = await linkRes.text();
        console.error("Failed to create link token:", errorText);
        return new Response(JSON.stringify({ error: "Failed to create connection link" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const linkData = await linkRes.json();
      console.log("Generated link token for provider:", provider, "Response keys:", Object.keys(linkData));

      // Vital API returns link_web_url (the hosted widget URL) and link_token
      const linkUrl = linkData.link_web_url || linkData.link_url;
      
      if (!linkUrl) {
        console.error("No link URL in Vital response:", JSON.stringify(linkData));
        return new Response(JSON.stringify({ error: "Failed to generate connection link. No URL returned." }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ 
        link_url: linkUrl,
        link_token: linkData.link_token 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get connected providers for user
    if (action === "get-providers") {
      // First get the Vital user ID
      const getUserRes = await fetch(`${VITAL_API_BASE}/user/resolve/${user.id}`, {
        headers: {
          "x-vital-api-key": VITAL_API_KEY,
        },
      });

      if (!getUserRes.ok) {
        // User not in Vital yet
        return new Response(JSON.stringify({ providers: [] }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const vitalUser = await getUserRes.json();
      
      // Get connected providers
      const providersRes = await fetch(`${VITAL_API_BASE}/user/${vitalUser.user_id}/providers`, {
        headers: {
          "x-vital-api-key": VITAL_API_KEY,
        },
      });

      if (!providersRes.ok) {
        console.error("Failed to get providers");
        return new Response(JSON.stringify({ providers: [] }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const providers = await providersRes.json();
      console.log("Connected providers:", providers);

      return new Response(JSON.stringify({ providers }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Sync data from Vital
    if (action === "sync-data") {
      const getUserRes = await fetch(`${VITAL_API_BASE}/user/resolve/${user.id}`, {
        headers: {
          "x-vital-api-key": VITAL_API_KEY,
        },
      });

      if (!getUserRes.ok) {
        return new Response(JSON.stringify({ error: "User not found in Vital" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const vitalUser = await getUserRes.json();
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      // Fetch sleep data
      const sleepRes = await fetch(
        `${VITAL_API_BASE}/summary/sleep/${vitalUser.user_id}?start_date=${weekAgo}&end_date=${today}`,
        {
          headers: { "x-vital-api-key": VITAL_API_KEY },
        }
      );

      // Fetch activity data
      const activityRes = await fetch(
        `${VITAL_API_BASE}/summary/activity/${vitalUser.user_id}?start_date=${weekAgo}&end_date=${today}`,
        {
          headers: { "x-vital-api-key": VITAL_API_KEY },
        }
      );

      let sleepData = [];
      let activityData = [];

      if (sleepRes.ok) {
        const sleep = await sleepRes.json();
        sleepData = sleep.sleep || [];
        console.log(`Fetched ${sleepData.length} sleep records`);
      }

      if (activityRes.ok) {
        const activity = await activityRes.json();
        activityData = activity.activity || [];
        console.log(`Fetched ${activityData.length} activity records`);
      }

      // Store metrics in database
      for (const sleep of sleepData) {
        // Store sleep duration
        if (sleep.duration_sleep_seconds) {
          await supabase.from('user_metrics').insert({
            user_id: user.id,
            metric_type: 'sleep_duration',
            value: sleep.duration_sleep_seconds / 3600, // Convert to hours
            recorded_at: sleep.calendar_date,
            device_source: sleep.source?.name || 'vital',
            metadata: { 
              deep_sleep: sleep.duration_deep_sleep_seconds,
              rem_sleep: sleep.duration_rem_sleep_seconds,
              light_sleep: sleep.duration_light_sleep_seconds,
            }
          });
        }

        // Store HRV if available
        if (sleep.hrv?.avg_sdnn) {
          await supabase.from('user_metrics').insert({
            user_id: user.id,
            metric_type: 'hrv',
            value: sleep.hrv.avg_sdnn,
            recorded_at: sleep.calendar_date,
            device_source: sleep.source?.name || 'vital',
          });
        }
      }

      for (const activity of activityData) {
        // Store steps
        if (activity.steps) {
          await supabase.from('user_metrics').insert({
            user_id: user.id,
            metric_type: 'steps',
            value: activity.steps,
            recorded_at: activity.calendar_date,
            device_source: activity.source?.name || 'vital',
          });
        }

        // Store calories
        if (activity.calories_total) {
          await supabase.from('user_metrics').insert({
            user_id: user.id,
            metric_type: 'calories',
            value: activity.calories_total,
            recorded_at: activity.calendar_date,
            device_source: activity.source?.name || 'vital',
          });
        }
      }

      return new Response(JSON.stringify({ 
        success: true,
        synced: {
          sleep: sleepData.length,
          activity: activityData.length,
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Disconnect provider
    if (action === "disconnect") {
      const getUserRes = await fetch(`${VITAL_API_BASE}/user/resolve/${user.id}`, {
        headers: {
          "x-vital-api-key": VITAL_API_KEY,
        },
      });

      if (!getUserRes.ok) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const vitalUser = await getUserRes.json();

      // Deregister the provider
      const disconnectRes = await fetch(
        `${VITAL_API_BASE}/user/${vitalUser.user_id}/${provider}`,
        {
          method: "DELETE",
          headers: { "x-vital-api-key": VITAL_API_KEY },
        }
      );

      if (!disconnectRes.ok) {
        console.error("Failed to disconnect provider");
        return new Response(JSON.stringify({ error: "Failed to disconnect" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Also remove from our connected_devices table
      await supabase
        .from('connected_devices')
        .delete()
        .eq('user_id', user.id)
        .eq('device_type', provider);

      console.log(`Disconnected provider ${provider} for user ${user.id}`);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Vital connect error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
