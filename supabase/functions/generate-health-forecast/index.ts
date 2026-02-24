import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');

    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) throw new Error('Unauthorized');

    // Fetch 14 days of biometric data
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const [metricsRes, protocolsRes, checkInsRes] = await Promise.all([
      supabase.from('user_metrics').select('*').eq('user_id', user.id)
        .gte('recorded_at', fourteenDaysAgo.toISOString())
        .order('recorded_at', { ascending: true }),
      supabase.from('user_protocols').select('*').eq('user_id', user.id).eq('status', 'active').limit(3),
      supabase.from('protocol_check_ins').select('*').eq('user_id', user.id)
        .gte('check_in_date', fourteenDaysAgo.toISOString().split('T')[0])
        .order('check_in_date', { ascending: false }).limit(14),
    ]);

    const metrics = metricsRes.data || [];

    // Group metrics by type
    const metricsByType: Record<string, { value: number; date: string }[]> = {};
    metrics.forEach(m => {
      if (!metricsByType[m.metric_type]) metricsByType[m.metric_type] = [];
      metricsByType[m.metric_type].push({
        value: parseFloat(m.value.toString()),
        date: new Date(m.recorded_at).toISOString().split('T')[0],
      });
    });

    // Build context for AI
    const activeProtocols = (protocolsRes.data || []).map(p => ({
      name: p.protocol_name, goal: p.goal, completion: p.completion_percentage,
    }));

    const recentCheckIns = (checkInsRes.data || []).map(c => ({
      date: c.check_in_date, mood: c.mood_score, energy: c.energy_score,
    }));

    // Generate dates for next 7 days
    const forecastDates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      forecastDates.push(d.toISOString().split('T')[0]);
    }

    const hasData = metrics.length >= 3;

    const systemPrompt = `You are Nova's 72-hour predictive forecasting engine. You analyse biometric trends to generate actionable health and performance predictions.

${hasData ? `BIOMETRIC DATA (Last 14 Days):
${JSON.stringify(metricsByType, null, 2)}

ACTIVE PROTOCOLS: ${JSON.stringify(activeProtocols)}
RECENT CHECK-INS (mood/energy): ${JSON.stringify(recentCheckIns)}` : 'No biometric data available yet. Generate realistic baseline forecasts for a healthy adult.'}

Generate forecasts for these exact dates: ${JSON.stringify(forecastDates)}

For each day predict:
1. Optimal training window with specific time range
2. Hourly energy levels (every 2 hours from 6am-10pm, 0-100 scale)
3. Recovery prediction (0-100%)
4. Time-specific intervention recommendations for morning, afternoon, evening

Base predictions on:
- HRV trends and circadian rhythm patterns
- Sleep quality trajectories
- Recovery cycles (don't predict peak every day)
- Day-of-week patterns
- Protocol adherence effects`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate 7-day health forecast for dates: ${forecastDates.join(', ')}` }
        ],
        tools: [{
          type: "function",
          function: {
            name: "generate_forecast",
            description: "Generate 7-day health and performance forecast",
            parameters: {
              type: "object",
              properties: {
                forecasts: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      date: { type: "string", description: "YYYY-MM-DD format" },
                      optimal_training_window: { type: "string", description: "e.g. '10:00-12:00 — Peak HRV window'" },
                      energy_prediction: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            hour: { type: "number", description: "Hour 0-23" },
                            level: { type: "number", description: "Energy 0-100" }
                          },
                          required: ["hour", "level"]
                        }
                      },
                      recovery_prediction: { type: "number", description: "0-100" },
                      intervention_timing: {
                        type: "object",
                        properties: {
                          morning: { type: "array", items: { type: "string" } },
                          afternoon: { type: "array", items: { type: "string" } },
                          evening: { type: "array", items: { type: "string" } }
                        },
                        required: ["morning", "afternoon", "evening"]
                      }
                    },
                    required: ["date", "optimal_training_window", "energy_prediction", "recovery_prediction", "intervention_timing"]
                  }
                }
              },
              required: ["forecasts"]
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "generate_forecast" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a minute." }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error('AI gateway error');
    }

    const aiResponse = await response.json();
    const toolCall = aiResponse.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error('No forecast generated');

    const result = JSON.parse(toolCall.function.arguments);

    // Upsert forecasts
    const forecastsToSave = result.forecasts.map((f: any) => ({
      user_id: user.id,
      forecast_date: f.date,
      optimal_training_window: f.optimal_training_window,
      energy_prediction: f.energy_prediction,
      recovery_prediction: f.recovery_prediction,
      intervention_timing: f.intervention_timing,
    }));

    const { error: upsertError } = await supabase
      .from('health_forecasts')
      .upsert(forecastsToSave, { onConflict: 'user_id,forecast_date' });

    if (upsertError) console.error("Upsert error:", upsertError);

    return new Response(JSON.stringify({
      success: true,
      forecasts: result.forecasts,
      data_points: metrics.length,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("generate-health-forecast error:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
