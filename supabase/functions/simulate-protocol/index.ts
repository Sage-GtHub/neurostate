import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Not signed in' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const { changes } = await req.json();
    // changes: { supplement_adjustments: [{name, current_dose, proposed_dose}], timing_changes: [{item, current_time, proposed_time}], additions: [string], removals: [string] }

    // Fetch current biometrics (last 14 days)
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const [metricsRes, protocolsRes, checkInsRes] = await Promise.all([
      supabase.from('user_metrics').select('*').eq('user_id', user.id).gte('recorded_at', fourteenDaysAgo).order('recorded_at', { ascending: false }).limit(200),
      supabase.from('user_protocols').select('*').eq('user_id', user.id).eq('status', 'active').limit(5),
      supabase.from('protocol_check_ins').select('*').eq('user_id', user.id).gte('check_in_date', fourteenDaysAgo.split('T')[0]).order('check_in_date', { ascending: false }).limit(30),
    ]);

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'AI not configured' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const prompt = `You are a health protocol simulator. Given a user's current biometric data and proposed protocol changes, predict how their key metrics would change over the next 7 and 30 days.

Current biometric data (last 14 days):
${JSON.stringify(metricsRes.data?.slice(0, 50) || [], null, 2)}

Active protocols:
${JSON.stringify(protocolsRes.data || [], null, 2)}

Recent check-ins:
${JSON.stringify(checkInsRes.data?.slice(0, 15) || [], null, 2)}

Proposed changes:
${JSON.stringify(changes)}

Return a JSON object with this exact structure:
{
  "predictions": [
    {
      "metric": "Sleep Quality",
      "current_value": <number>,
      "predicted_7d": <number>,
      "predicted_30d": <number>,
      "unit": "string",
      "direction": "up" | "down" | "stable",
      "confidence": <0-100>
    }
  ],
  "overall_impact": "positive" | "negative" | "mixed" | "neutral",
  "impact_score": <0-100>,
  "summary": "One plain-English sentence about the overall effect",
  "risks": ["plain-English risk if any"],
  "recommendations": ["plain-English suggestion"]
}

Include predictions for: Sleep Quality, HRV, Energy, Recovery, Focus, and Stress.
Use simple language. Values should be on a 0-100 scale where applicable.
If there's limited data, make reasonable estimates and lower the confidence scores.`;

    const aiResponse = await fetch('https://api.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI request failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || '{}';
    
    let simulation;
    try {
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      simulation = JSON.parse(cleaned);
    } catch {
      simulation = { predictions: [], overall_impact: 'neutral', impact_score: 50, summary: 'Unable to generate prediction with available data.', risks: [], recommendations: [] };
    }

    return new Response(JSON.stringify(simulation), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
