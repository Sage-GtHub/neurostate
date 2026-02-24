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

    // Gather goals, metrics, protocols, and check-ins
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const [goalsRes, metricsRes, protocolsRes, checkInsRes] = await Promise.all([
      supabase.from('performance_goals').select('*').eq('user_id', user.id).eq('status', 'active'),
      supabase.from('user_metrics').select('*').eq('user_id', user.id)
        .gte('recorded_at', fourteenDaysAgo.toISOString())
        .order('recorded_at', { ascending: true }),
      supabase.from('user_protocols').select('*').eq('user_id', user.id).eq('status', 'active').limit(5),
      supabase.from('protocol_check_ins').select('*').eq('user_id', user.id)
        .gte('check_in_date', fourteenDaysAgo.toISOString().split('T')[0])
        .order('check_in_date', { ascending: false }).limit(14),
    ]);

    const goals = goalsRes.data || [];
    const metrics = metricsRes.data || [];
    const protocols = protocolsRes.data || [];
    const checkIns = checkInsRes.data || [];

    if (goals.length < 2) {
      return new Response(JSON.stringify({
        error: "At least 2 active goals are needed for trade-off analysis.",
        goals_count: goals.length,
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Group metrics
    const metricsByType: Record<string, number[]> = {};
    metrics.forEach(m => {
      if (!metricsByType[m.metric_type]) metricsByType[m.metric_type] = [];
      metricsByType[m.metric_type].push(parseFloat(m.value.toString()));
    });

    const goalsContext = goals.map(g => ({
      id: g.id,
      type: g.goal_type,
      target: g.target_value,
      current: g.current_value,
      progress: g.progress_percentage,
      priority_weight: g.priority_weight ?? 50,
      started: g.started_at,
      target_date: g.target_date,
    }));

    const protocolContext = protocols.map(p => ({
      name: p.protocol_name, goal: p.goal, completion: p.completion_percentage,
    }));

    const checkInSummary = {
      count: checkIns.length,
      avg_mood: checkIns.length > 0 ? Math.round(checkIns.reduce((s, c) => s + (c.mood_score || 5), 0) / checkIns.length) : null,
      avg_energy: checkIns.length > 0 ? Math.round(checkIns.reduce((s, c) => s + (c.energy_score || 5), 0) / checkIns.length) : null,
    };

    const systemPrompt = `You are Nova's multi-goal balancing engine. You analyse competing health objectives and provide trade-off analysis with priority recommendations.

USER'S ACTIVE GOALS:
${JSON.stringify(goalsContext, null, 2)}

BIOMETRIC TRENDS (14 days, values per metric type):
${JSON.stringify(Object.fromEntries(Object.entries(metricsByType).map(([k, v]) => [k, { count: v.length, avg: Math.round(v.reduce((a, b) => a + b, 0) / v.length * 10) / 10, trend: v.length >= 3 ? (v[v.length - 1] > v[0] ? 'improving' : 'declining') : 'insufficient_data' }])), null, 2)}

ACTIVE PROTOCOLS: ${JSON.stringify(protocolContext)}
CHECK-IN SUMMARY: ${JSON.stringify(checkInSummary)}

Analyse these goals and provide:
1. CONFLICTS: Where goals compete (e.g. intense training vs recovery)
2. SYNERGIES: Where goals reinforce each other
3. RECOMMENDED WEIGHTS: Optimal priority distribution based on current biometric state
4. TRADE-OFFS: Specific trade-offs the user faces with actionable guidance
5. SCHEDULE OPTIMISATION: How to time-share between competing goals across the day/week

Use British English. Be specific with percentages and metrics.`;

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
          { role: "user", content: "Analyse my goals and provide trade-off analysis with recommended priority weights." }
        ],
        tools: [{
          type: "function",
          function: {
            name: "goal_balance_analysis",
            description: "Provide multi-goal trade-off analysis with recommended weights",
            parameters: {
              type: "object",
              properties: {
                conflicts: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      goal_a: { type: "string", description: "First goal type" },
                      goal_b: { type: "string", description: "Second goal type" },
                      severity: { type: "string", enum: ["low", "medium", "high"] },
                      description: { type: "string" },
                      resolution: { type: "string", description: "How to mitigate this conflict" },
                    },
                    required: ["goal_a", "goal_b", "severity", "description", "resolution"]
                  }
                },
                synergies: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      goal_a: { type: "string" },
                      goal_b: { type: "string" },
                      strength: { type: "string", enum: ["moderate", "strong"] },
                      description: { type: "string" },
                    },
                    required: ["goal_a", "goal_b", "strength", "description"]
                  }
                },
                recommended_weights: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      goal_type: { type: "string" },
                      recommended_weight: { type: "number", description: "0-100" },
                      rationale: { type: "string" },
                    },
                    required: ["goal_type", "recommended_weight", "rationale"]
                  }
                },
                trade_offs: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      recommendation: { type: "string" },
                    },
                    required: ["title", "description", "recommendation"]
                  }
                },
                schedule_blocks: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      time_window: { type: "string", description: "e.g. '06:00-08:00'" },
                      primary_goal: { type: "string" },
                      activities: { type: "string" },
                    },
                    required: ["time_window", "primary_goal", "activities"]
                  }
                },
                overall_assessment: { type: "string", description: "Brief overall assessment of goal compatibility" },
              },
              required: ["conflicts", "synergies", "recommended_weights", "trade_offs", "overall_assessment"]
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "goal_balance_analysis" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded." }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error('AI gateway error');
    }

    const aiResponse = await response.json();
    const toolCall = aiResponse.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error('No analysis generated');

    const analysis = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({
      success: true,
      analysis,
      goals: goalsContext,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("goal-balance error:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
