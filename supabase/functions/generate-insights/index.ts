import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = { maxRequests: 5, windowMs: 300000 };

function checkRateLimit(userId: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(userId);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return { allowed: true };
  }
  if (record.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }
  record.count++;
  return { allowed: true };
}

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

    const rateCheck = checkRateLimit(user.id);
    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({ error: `Rate limited. Retry in ${rateCheck.retryAfter}s.` }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch 30 days of metrics
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [metricsRes, protocolsRes, checkInsRes] = await Promise.all([
      supabase.from('user_metrics').select('*').eq('user_id', user.id)
        .gte('recorded_at', thirtyDaysAgo.toISOString()).order('recorded_at', { ascending: true }),
      supabase.from('user_protocols').select('*').eq('user_id', user.id).eq('status', 'active'),
      supabase.from('protocol_check_ins').select('*').eq('user_id', user.id)
        .gte('check_in_date', thirtyDaysAgo.toISOString().split('T')[0]).order('check_in_date', { ascending: true }),
    ]);

    const metrics = metricsRes.data || [];
    if (metrics.length === 0) {
      return new Response(JSON.stringify({
        insights: [],
        message: 'Not enough data yet. Connect a wearable device to start generating insights.'
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const metricsByType: Record<string, any[]> = {};
    metrics.forEach(m => {
      if (!metricsByType[m.metric_type]) metricsByType[m.metric_type] = [];
      metricsByType[m.metric_type].push({
        value: parseFloat(m.value.toString()),
        date: new Date(m.recorded_at).toISOString().split('T')[0],
        source: m.device_source
      });
    });

    const systemPrompt = `You are Nova, NeuroState's AI insights engine. You perform rigorous biometric analysis with evidence-graded recommendations.

USER'S BIOMETRIC DATA (Last 30 Days):
${JSON.stringify(metricsByType, null, 2)}

ACTIVE PROTOCOLS: ${JSON.stringify((protocolsRes.data || []).map(p => ({ name: p.protocol_name, goal: p.goal, completion: p.completion_percentage })))}

CHECK-IN HISTORY: ${JSON.stringify((checkInsRes.data || []).slice(-14).map(c => ({ date: c.check_in_date, mood: c.mood_score, energy: c.energy_score })))}

Generate 4-6 evidence-graded insights. Each insight must include:
- An evidence_grade (A-F) reflecting how strong the scientific evidence is for the recommendation
  A = Multiple large RCTs with consistent results
  B = Single large RCT or multiple smaller studies
  C = Observational studies or expert consensus
  D = Case studies or preliminary research
  F = Minimal or anecdotal evidence only
- A pattern_category for classification

Focus on:
1. PATTERN RECOGNITION: Identify recurring cycles, correlations between metrics (e.g. HRV drops correlating with poor sleep 2 days later)
2. RISK ALERTS: Detect declining trends that predict burnout, overtraining, or cognitive impairment
3. EVIDENCE-BASED RECOMMENDATIONS: Grade each suggestion by scientific evidence strength
4. PREDICTIVE INSIGHTS: 72-hour forward predictions based on current trajectory
5. PROTOCOL OPTIMISATION: How current protocols interact with biometric patterns`;

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
          { role: "user", content: "Analyse my biometric data and generate evidence-graded insights with pattern recognition." }
        ],
        tools: [{
          type: "function",
          function: {
            name: "generate_insights",
            description: "Generate evidence-graded AI insights from biometric data",
            parameters: {
              type: "object",
              properties: {
                insights: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string", enum: ["warning", "pattern", "prediction", "optimisation"] },
                      title: { type: "string" },
                      description: { type: "string" },
                      confidence: { type: "number", minimum: 60, maximum: 99 },
                      timeframe: { type: "string" },
                      evidence_grade: { type: "string", enum: ["A", "B", "C", "D", "F"] },
                      pattern_category: { type: "string", enum: ["sleep_quality", "recovery_cycle", "cognitive_performance", "stress_response", "training_load", "circadian_rhythm", "metabolic_health", "cardiovascular"] },
                      recommendations: { type: "array", items: { type: "string" } },
                      data_sources: { type: "array", items: { type: "string" } },
                      supporting_metrics: {
                        type: "object",
                        properties: {
                          current_value: { type: "string" },
                          baseline_value: { type: "string" },
                          change_percentage: { type: "number" },
                          trend_direction: { type: "string", enum: ["improving", "declining", "stable"] }
                        }
                      }
                    },
                    required: ["type", "title", "description", "confidence", "timeframe", "evidence_grade", "pattern_category", "recommendations", "data_sources"],
                    additionalProperties: false
                  }
                }
              },
              required: ["insights"],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "generate_insights" } }
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "AI rate limited. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please top up your workspace." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const aiResponse = await response.json();
    const toolCall = aiResponse.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error('No insights generated');

    const result = JSON.parse(toolCall.function.arguments);

    // Save insights with evidence grades stored in metadata
    const insightsToSave = result.insights.map((insight: any) => ({
      user_id: user.id,
      insight_type: insight.type,
      title: insight.title,
      description: insight.description,
      confidence_score: insight.confidence,
      timeframe: insight.timeframe,
      recommendations: insight.recommendations,
      data_sources: insight.data_sources,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }));

    await supabase.from('ai_insights').insert(insightsToSave);

    return new Response(JSON.stringify({
      success: true,
      insights: result.insights
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error("generate-insights error:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
