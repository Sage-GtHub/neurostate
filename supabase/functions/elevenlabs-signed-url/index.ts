import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY is not configured');
    }

    // Get agent ID from request body or use default
    let agentId: string | undefined;
    
    try {
      const body = await req.json();
      agentId = body.agent_id;
    } catch {
      // No body provided, will need agent_id from env or error
    }

    // Use environment variable if not provided in request
    if (!agentId) {
      agentId = Deno.env.get('ELEVENLABS_AGENT_ID');
    }

    if (!agentId) {
      throw new Error('ElevenLabs Agent ID not configured. Create an agent at elevenlabs.io and set ELEVENLABS_AGENT_ID secret.');
    }

    console.log("Requesting signed URL for agent:", agentId);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        method: "GET",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", response.status, errorText);
      
      if (response.status === 404) {
        throw new Error('Agent not found. Please check your ElevenLabs Agent ID.');
      }
      if (response.status === 401) {
        throw new Error('Invalid ElevenLabs API key.');
      }
      
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Successfully obtained signed URL");

    return new Response(
      JSON.stringify({ signed_url: data.signed_url }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error("elevenlabs-signed-url error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});
