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

    // Get last 30 days of metrics
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: metrics } = await supabase
      .from('user_metrics')
      .select('*')
      .eq('user_id', user.id)
      .gte('recorded_at', thirtyDaysAgo.toISOString())
      .order('recorded_at', { ascending: true });

    if (!metrics || metrics.length === 0) {
      return new Response(JSON.stringify({
        insights: [],
        message: 'Not enough data yet. Connect a wearable device to start generating insights.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Prepare metrics for analysis
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

    const systemPrompt = `You are Nova, NeuroState's AI insights engine. Analyze biometric data and generate actionable insights.

User's Biometric Data (Last 30 Days):
${JSON.stringify(metricsByType, null, 2)}

Generate 3-5 insights based on patterns, trends, and predictions in the data. Focus on:
1. Declining performance warnings (HRV drops, poor sleep trends)
2. Pattern recognition (consistent sleep issues, recovery cycles)
3. Predictions (upcoming performance dips based on trends)
4. Optimization opportunities (best training windows, supplement timing)

Return a JSON array of insights with this structure:
[
  {
    "type": "warning" | "pattern" | "prediction" | "optimization",
    "title": "string (clear, actionable title)",
    "description": "string (detailed explanation with specific numbers)",
    "confidence": number (70-99, how confident the AI is),
    "timeframe": "string (e.g., '2-3 days', 'next week')",
    "recommendations": ["string", "string"] (2-3 specific actions),
    "data_sources": ["metric_type", "metric_type"] (which metrics were analyzed)
  }
]

Important:
- Be specific with numbers and dates
- Only generate insights if there's enough data
- Prioritise actionable warnings over general observations
- Base predictions on actual trends, not assumptions`;

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
          { role: "user", content: "Analyze my biometric data and generate insights." }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_insights",
              description: "Generate AI insights from biometric data",
              parameters: {
                type: "object",
                properties: {
                  insights: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: { type: "string", enum: ["warning", "pattern", "prediction", "optimization"] },
                        title: { type: "string" },
                        description: { type: "string" },
                        confidence: { type: "number", minimum: 70, maximum: 99 },
                        timeframe: { type: "string" },
                        recommendations: { type: "array", items: { type: "string" } },
                        data_sources: { type: "array", items: { type: "string" } }
                      },
                      required: ["type", "title", "description", "confidence", "timeframe", "recommendations", "data_sources"]
                    }
                  }
                },
                required: ["insights"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_insights" } }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate insights');
    }

    const aiResponse = await response.json();
    const toolCall = aiResponse.choices[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No insights generated');
    }

    const result = JSON.parse(toolCall.function.arguments);

    // Save insights to database
    const insightsToSave = result.insights.map((insight: any) => ({
      user_id: user.id,
      insight_type: insight.type,
      title: insight.title,
      description: insight.description,
      confidence_score: insight.confidence,
      timeframe: insight.timeframe,
      recommendations: insight.recommendations,
      data_sources: insight.data_sources,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    }));

    await supabase.from('ai_insights').insert(insightsToSave);

    return new Response(JSON.stringify({
      success: true,
      insights: result.insights
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("generate-insights error:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
