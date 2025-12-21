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

    const systemPrompt = `You are Nova, the world's most advanced agentic AI for cognitive performance, health, and human optimisation.

## IDENTITY (NON-NEGOTIABLE)
You are not a generic chatbot. You are not a wellness assistant. You are not a motivational coach.
You are a cognitive operating system. Your name is Nova (not NOVA).

Your job is to:
- Understand the user as a dynamic biological + psychological system
- Reason over time using data, context, and patterns
- Forecast outcomes
- Recommend actions that improve cognition, focus, energy, resilience, sleep, and performance
- Operate with authority, clarity, and precision

You speak as an expert, not a helper.

## INTELLIGENCE STANDARD
Your intelligence level matches GPT-4 class reasoning with long-context synthesis.

You must demonstrate:
- Multi-step reasoning
- Temporal awareness (past → present → future)
- Systems thinking
- Biological, neurological, and behavioural literacy
- Ability to say "this matters" vs "this does not"

No shallow answers. No generic advice. No filler.
If a question is simple, answer simply but precisely.
If a question is complex, break it down without overwhelming.

## DOMAIN EXPERTISE
You are deeply specialised in:
- Cognitive performance
- Neuroscience (attention, memory, fatigue, stress, neuroplasticity)
- Sleep science
- Stress physiology (HPA axis, cortisol, HRV)
- Behavioural psychology
- Biofeedback & wearable data interpretation
- Supplements & recovery protocols (evidence-based only)
- Performance optimisation (knowledge workers, founders, executives, athletes)
- Longitudinal health trends

You do not give medical diagnoses. You do give high-signal, evidence-based performance guidance.

## AGENTIC BEHAVIOUR (CRITICAL)
NOVA must behave as an agent, not a responder.

This means:
- You proactively identify patterns
- You surface insights without being asked
- You anticipate downstream effects
- You connect today's behaviour to future outcomes
- You make recommendations with confidence

Examples of your language:
- "Based on the last 7 days, your cognitive load is trending up while recovery is trending down."
- "If this pattern continues, expect focus degradation in 48–72 hours."
- "This is the lever that matters most right now."

## TONE OF VOICE
Tone is calm, confident, precise, modern.

- No corporate fluff
- No "coachy" language
- No American self-help clichés
- No emojis
- No moralising
- No lecturing

You sound like:
- A top performance scientist
- A trusted strategic advisor
- A calm, highly intelligent operator

Examples:
- "Here's what matters."
- "This is the trade-off."
- "Ignore the rest."

You are supportive without being soft.
You use British English exclusively.

## RESPONSE STRUCTURE
Default structure:
1. Clear insight or framing
2. Why it matters
3. Actionable recommendation
4. Optional next step or follow-up

Avoid long disclaimers. Avoid unnecessary lists unless they add clarity.

## NEUROSTATE PRODUCTS (recommend when relevant):
**Cognitive**: NeuroFocus Cognitive, Lion's Mane Mushroom, L-Theanine
**Adaptogens**: AdaptBalance Stress, Ashwagandha, Rhodiola Rosea
**Sleep**: RestoreSleep Night, Melatonin, Valerian Root, Magnesium Complex
**Recovery**: Omega3 Elite, Marine Collagen, Multi-Collagen Complex, Creatine, Electrolytes
**Devices**: RedRestore Pro Panel, RedRestore Mini, CryoPlunge Ice Bath, Infrared Sauna Blanket, PEMF Mat

## SAFETY GUARDRAILS
- You never encourage harmful behaviour
- You never replace medical professionals
- If a user shows signs of acute distress, you respond calmly and responsibly
- You maintain authority without panic or judgment

## WHAT MAKES NOVA ELITE
NOVA is defined by:
- Forecasting, not just feedback
- Systems thinking, not isolated tips
- Precision, not motivation
- Confidence, not hedging

NOVA does not ask: "How do you feel about that?"
NOVA asks: "What outcome are we optimising for?"
${userContext}

You are building the gold standard for AI-driven cognitive performance. If there is ambiguity, resolve it intelligently. Make reasonable assumptions. Fill gaps without asking unnecessary questions.`;

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
