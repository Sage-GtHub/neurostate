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
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) {
      throw new Error('Unauthorized');
    }

    // Get recent metrics for forecasting
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const { data: metrics } = await supabase
      .from('user_metrics')
      .select('*')
      .eq('user_id', user.id)
      .gte('recorded_at', fourteenDaysAgo.toISOString())
      .order('recorded_at', { ascending: true });

    if (!metrics || metrics.length < 5) {
      return new Response(JSON.stringify({
        forecasts: [],
        message: 'Need at least 5 days of data to generate forecasts.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare data for forecasting
    const metricsByType: Record<string, any[]> = {};
    metrics.forEach(m => {
      if (!metricsByType[m.metric_type]) {
        metricsByType[m.metric_type] = [];
      }
      metricsByType[m.metric_type].push({
        value: parseFloat(m.value.toString()),
        date: new Date(m.recorded_at).toISOString()
      });
    });

    const systemPrompt = `You are Nova's predictive forecasting engine. Generate 7-day health and performance forecasts based on historical biometric trends.

Recent Biometric Data (Last 14 Days):
${JSON.stringify(metricsByType, null, 2)}

Generate daily forecasts for the next 7 days. For each day, predict:
1. Optimal training window (morning/afternoon/evening)
2. Expected energy levels throughout the day (hourly predictions)
3. Recovery prediction (0-100%)
4. Recommended intervention timing (when to take supplements, schedule recovery)

Return a JSON array with this structure:
[
  {
    "date": "YYYY-MM-DD",
    "optimal_training_window": "string (e.g., '10:00-12:00 - Peak HRV window')",
    "energy_prediction": [
      { "hour": number (0-23), "level": number (0-100) }
    ],
    "recovery_prediction": number (0-100),
    "intervention_timing": {
      "morning": ["supplement or activity"],
      "afternoon": ["supplement or activity"],
      "evening": ["supplement or activity"]
    }
  }
]

Base predictions on:
- HRV trends and patterns
- Sleep quality trajectories
- Recovery score progressions
- Circadian rhythm analysis
- Historical performance patterns

Important:
- Be realistic based on actual trends
- Factor in recovery cycles (don't predict peak performance every day)
- Include specific time windows, not vague suggestions`;

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
          { role: "user", content: "Generate 7-day health forecast." }
        ],
        tools: [
          {
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
                        date: { type: "string" },
                        optimal_training_window: { type: "string" },
                        energy_prediction: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              hour: { type: "number" },
                              level: { type: "number" }
                            }
                          }
                        },
                        recovery_prediction: { type: "number" },
                        intervention_timing: {
                          type: "object",
                          properties: {
                            morning: { type: "array", items: { type: "string" } },
                            afternoon: { type: "array", items: { type: "string" } },
                            evening: { type: "array", items: { type: "string" } }
                          }
                        }
                      },
                      required: ["date", "optimal_training_window", "energy_prediction", "recovery_prediction", "intervention_timing"]
                    }
                  }
                },
                required: ["forecasts"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_forecast" } }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate forecast');
    }

    const aiResponse = await response.json();
    const toolCall = aiResponse.choices[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No forecast generated');
    }

    const result = JSON.parse(toolCall.function.arguments);

    // Save forecasts to database
    const forecastsToSave = result.forecasts.map((forecast: any) => ({
      user_id: user.id,
      forecast_date: forecast.date,
      optimal_training_window: forecast.optimal_training_window,
      energy_prediction: forecast.energy_prediction,
      recovery_prediction: forecast.recovery_prediction,
      intervention_timing: forecast.intervention_timing
    }));

    // Use upsert to avoid duplicates
    await supabase
      .from('health_forecasts')
      .upsert(forecastsToSave, { onConflict: 'user_id,forecast_date' });

    return new Response(JSON.stringify({
      success: true,
      forecasts: result.forecasts
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
