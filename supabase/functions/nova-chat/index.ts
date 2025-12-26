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
    const { messages, context } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id || null;
    }

    // Build rich user context
    let userContext = '';
    if (userId) {
      // Fetch recent metrics
      const { data: metrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', userId)
        .order('recorded_at', { ascending: false })
        .limit(20);

      // Fetch active protocols
      const { data: protocols } = await supabase
        .from('user_protocols')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active');

      // Fetch connected devices
      const { data: devices } = await supabase
        .from('connected_devices')
        .select('*')
        .eq('user_id', userId);

      // Fetch recent insights
      const { data: insights } = await supabase
        .from('ai_insights')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch health forecasts
      const { data: forecasts } = await supabase
        .from('health_forecasts')
        .select('*')
        .eq('user_id', userId)
        .order('forecast_date', { ascending: false })
        .limit(3);

      if (metrics && metrics.length > 0) {
        userContext += '\n\n## User\'s Recent Biometrics:\n';
        const metricGroups: Record<string, { value: number; date: string }[]> = {};
        metrics.forEach(m => {
          if (!metricGroups[m.metric_type]) metricGroups[m.metric_type] = [];
          metricGroups[m.metric_type].push({ value: m.value, date: new Date(m.recorded_at).toLocaleDateString() });
        });
        Object.entries(metricGroups).forEach(([type, values]) => {
          const latest = values[0];
          const trend = values.length > 1 ? (values[0].value > values[1].value ? '↑' : values[0].value < values[1].value ? '↓' : '→') : '';
          userContext += `- ${type}: ${latest.value} ${trend} (${latest.date})\n`;
        });
      }

      if (protocols && protocols.length > 0) {
        userContext += '\n## Active Protocols:\n';
        protocols.forEach(p => {
          userContext += `- ${p.protocol_name}: ${p.goal} (${p.completion_percentage}% complete)\n`;
          if (p.products) {
            userContext += `  Products: ${JSON.stringify(p.products)}\n`;
          }
        });
      }

      if (devices && devices.length > 0) {
        userContext += '\n## Connected Devices:\n';
        devices.forEach(d => {
          userContext += `- ${d.device_name} (${d.device_type}): ${d.connection_status}\n`;
        });
      }

      if (insights && insights.length > 0) {
        userContext += '\n## Recent AI Insights:\n';
        insights.forEach(i => {
          userContext += `- ${i.title}: ${i.description}\n`;
        });
      }

      if (forecasts && forecasts.length > 0) {
        userContext += '\n## Health Forecasts:\n';
        forecasts.forEach(f => {
          userContext += `- ${f.forecast_date}: Recovery ${f.recovery_prediction}%, Training window: ${f.optimal_training_window || 'Not set'}\n`;
        });
      }
    }

    const systemPrompt = `You are Nova, a cognitive operating system for human performance optimisation.

## LANGUAGE
Always use British English spelling and conventions (e.g., optimise, colour, behaviour, programme, centre, analyse).

## RESPONSE FORMAT (MANDATORY)
Every response MUST use this exact structure with markdown headers:

**SIGNAL:** [1-2 lines max. Reference data source or trend. Example: "Sleep efficiency dropped 9% vs 14-day baseline over 3 nights."]

**FORECAST:** [1 line max. Time-bound prediction. Example: "Expect cognitive dip in 24-48h if load stays constant."]

**ACTION:**
• [Concrete action 1]
• [Concrete action 2]
• [Concrete action 3 - max 4 bullets]

---

**EXPLAIN:** [Hidden by default - detailed reasoning if complex]

**EVIDENCE:** [Hidden by default - research/data citations]

**PROTOCOL:** [Hidden by default - alternative protocol options]

## TONE RULES
- Authoritative, concise, direct
- Technical but readable
- No motivational language
- No hedging unless confidence is genuinely low

FORBIDDEN: "I think...", "You may want to...", "It might be helpful...", "Remember to..."
USE: "Do this now:", "Forecast:", "Primary lever:", "Next 24h:"

## STATE AWARENESS
Always reference when available:
- Baseline comparisons ("vs your 14-day baseline")
- Time windows ("last 7 days", "last 3 nights")
- Trend detection ("trend detected", "deviation")
- Data sources user has connected

## FOLLOW-UP QUESTIONS
If needed, ask MAX 1 question as multiple choice:
"Which is true today?"
- High meetings day
- Training day
- Travel
- Rest day

## PRODUCTS (recommend when relevant):
Cognitive: NeuroFocus, Lion's Mane, L-Theanine
Adaptogens: AdaptBalance, Ashwagandha, Rhodiola
Sleep: RestoreSleep, Melatonin, Magnesium
Recovery: Omega3 Elite, Marine Collagen, Creatine
Devices: RedRestore Pro, CryoPlunge, PEMF Mat

## USER CONTEXT
${userContext}

You are Nova. State, don't explain. Be decisive.`;

    console.log('Sending request to Lovable AI with context length:', userContext.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "I'm receiving too many requests right now. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("nova-chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
