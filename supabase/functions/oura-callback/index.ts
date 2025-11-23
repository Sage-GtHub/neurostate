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
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state'); // user_id encoded in state

    if (!code || !state) {
      return new Response('Missing authorization code or state', { 
        status: 400,
        headers: corsHeaders
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Exchange code for access token
    const ouraClientId = Deno.env.get('OURA_CLIENT_ID');
    const ouraClientSecret = Deno.env.get('OURA_CLIENT_SECRET');

    if (!ouraClientId || !ouraClientSecret) {
      return new Response('Oura credentials not configured', {
        status: 500,
        headers: corsHeaders
      });
    }

    const tokenResponse = await fetch('https://api.ouraring.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${supabaseUrl}/functions/v1/oura-callback`,
        client_id: ouraClientId,
        client_secret: ouraClientSecret,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Oura token error:', error);
      return new Response('Failed to exchange authorization code', {
        status: 500,
        headers: corsHeaders
      });
    }

    const tokenData = await tokenResponse.json();

    // Store token
    await supabase.from('device_tokens').insert({
      user_id: state,
      device_type: 'oura',
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      token_expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
    });

    // Update device status
    await supabase
      .from('connected_devices')
      .update({ 
        connection_status: 'connected',
        last_sync_at: new Date().toISOString()
      })
      .eq('user_id', state)
      .eq('device_type', 'oura_ring');

    // Redirect back to devices page
    return Response.redirect(`${url.origin}/nova/devices?connected=oura`, 302);

  } catch (error) {
    console.error('Error in oura-callback:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});