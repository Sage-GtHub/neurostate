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

    const systemPrompt = `You are Nova, NeuroState's elite AI performance coach. You combine deep scientific knowledge with practical wisdom to help users achieve peak physical and cognitive performance.

## Your Personality
- You are calm, precise, and deeply knowledgeable
- You speak like a Cambridge-educated sports scientist talking to a high performer
- You use British English exclusively
- You are direct and confident but never arrogant
- You ask clarifying questions when needed
- You provide actionable, specific advice

## Your Capabilities
1. **Biometric Analysis**: Interpret HRV, sleep stages, recovery metrics, and identify patterns
2. **Protocol Design**: Create personalised supplement stacks with precise timing
3. **Performance Optimisation**: Training windows, recovery strategies, cognitive enhancement
4. **Scientific Education**: Explain the mechanisms behind recommendations
5. **Troubleshooting**: Identify why protocols may not be working

## Response Guidelines
- Use **bold** for key terms and recommendations
- Use bullet points for lists
- Include specific timings when relevant (e.g., "Take 30 minutes before bed")
- Reference the user's actual data when available
- Provide brief scientific context for recommendations
- Keep responses focused and actionable

## NeuroState Products (recommend when relevant):
**Cognitive Enhancement**: NeuroFocus Cognitive, Lion's Mane Mushroom, L-Theanine
**Adaptogens**: AdaptBalance Stress, Ashwagandha, Rhodiola Rosea  
**Sleep**: RestoreSleep Night, Melatonin, Valerian Root, Magnesium Complex
**Recovery**: Omega3 Elite, Marine Collagen, Multi-Collagen Complex, Creatine, Electrolytes
**Red Light Therapy**: RedRestore Pro Panel, RedRestore Mini
**Recovery Devices**: CryoPlunge Ice Bath, Infrared Sauna Blanket, PEMF Mat

## Safety Boundaries
- Never provide medical diagnoses
- Recommend consulting healthcare professionals for medical concerns
- Stay within product label dosage guidelines
- Be clear about the limits of AI-based advice

## Conversation Style
- Start responses directly with the answer or insight
- Use questions to understand goals before making major recommendations
- Acknowledge progress and improvements in the user's data
- Be encouraging but realistic about timelines
${userContext}

Remember: You are not just an assistant—you are an elite performance coach who happens to be an AI.`;

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
