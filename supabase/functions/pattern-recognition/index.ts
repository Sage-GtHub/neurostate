import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');
    const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (!user) throw new Error('Unauthorized');

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [metricsRes, checkInsRes, protocolsRes, nudgesRes] = await Promise.all([
      supabase.from('user_metrics').select('*').eq('user_id', user.id)
        .gte('recorded_at', thirtyDaysAgo.toISOString()).order('recorded_at', { ascending: true }),
      supabase.from('protocol_check_ins').select('*').eq('user_id', user.id)
        .gte('check_in_date', thirtyDaysAgo.toISOString().split('T')[0]).order('check_in_date', { ascending: true }),
      supabase.from('user_protocols').select('*').eq('user_id', user.id).eq('status', 'active'),
      supabase.from('autonomous_nudges').select('*').eq('user_id', user.id)
        .in('status', ['completed', 'dismissed']).order('created_at', { ascending: false }).limit(30),
    ]);

    const metrics = metricsRes.data || [];
    const checkIns = checkInsRes.data || [];
    const protocols = protocolsRes.data || [];

    if (metrics.length < 3 && checkIns.length < 3) {
      return new Response(JSON.stringify({
        patterns: [],
        message: 'Not enough historical data. At least a few days of biometric or check-in data is needed.'
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Group metrics by type with daily aggregation
    const metricsByType: Record<string, { date: string; value: number }[]> = {};
    metrics.forEach((m: any) => {
      if (!metricsByType[m.metric_type]) metricsByType[m.metric_type] = [];
      metricsByType[m.metric_type].push({
        date: new Date(m.recorded_at).toISOString().split('T')[0],
        value: parseFloat(m.value.toString()),
      });
    });

    // Supplement intake from check-ins
    const supplementIntake = checkIns.map((c: any) => ({
      date: c.check_in_date,
      products_completed: c.products_completed,
      mood: c.mood_score,
      energy: c.energy_score,
    }));

    const systemPrompt = `You are Nova's Pattern Recognition Engine. You specialise in detecting statistically meaningful correlations between biometric signals, supplement intake patterns, and performance outcomes.

BIOMETRIC DATA (30 days, grouped by metric type):
${JSON.stringify(metricsByType, null, 2)}

SUPPLEMENT INTAKE & SELF-REPORTED SCORES (check-ins):
${JSON.stringify(supplementIntake, null, 2)}

ACTIVE PROTOCOLS:
${JSON.stringify(protocols.map((p: any) => ({ name: p.protocol_name, goal: p.goal, products: p.products, completion: p.completion_percentage })), null, 2)}

RECENT COACHING RESPONSES:
${JSON.stringify((nudgesRes.data || []).slice(0, 10).map((n: any) => ({ title: n.title, category: n.category, status: n.status })), null, 2)}

YOUR TASK:
Perform correlation analysis across the data to find:

1. BIOMETRIC-TO-BIOMETRIC CORRELATIONS: e.g. "When HRV drops below X, sleep quality declines 2 days later"
2. SUPPLEMENT-TO-OUTCOME CORRELATIONS: e.g. "Days with magnesium intake show 15% higher deep sleep"  
3. BEHAVIOUR-TO-PERFORMANCE LINKS: e.g. "Check-in energy scores are 20% higher after 2+ consecutive protocol adherence days"
4. TEMPORAL PATTERNS: e.g. "Recovery scores consistently dip on Mondays" or "HRV peaks mid-week"
5. COMPOUND EFFECTS: e.g. "Combining omega-3 + sleep protocol yields 25% better recovery than either alone"

For each pattern, calculate a correlation_strength (0-1 float) and specify the lag_days if the effect is delayed.
Be specific with numbers from the actual data. Do NOT fabricate correlations — if data is insufficient for a pattern, skip it.`;

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
          { role: "user", content: "Analyse the data and identify all meaningful correlations and patterns." }
        ],
        tools: [{
          type: "function",
          function: {
            name: "report_patterns",
            description: "Report detected correlations and patterns from biometric and supplement data",
            parameters: {
              type: "object",
              properties: {
                patterns: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      pattern_type: { type: "string", enum: ["biometric_correlation", "supplement_outcome", "behaviour_performance", "temporal_cycle", "compound_effect"] },
                      title: { type: "string" },
                      description: { type: "string" },
                      correlation_strength: { type: "number", minimum: 0, maximum: 1 },
                      confidence: { type: "integer", minimum: 50, maximum: 99 },
                      lag_days: { type: "integer", minimum: 0, maximum: 14 },
                      direction: { type: "string", enum: ["positive", "negative", "cyclical"] },
                      variables: {
                        type: "array",
                        items: { type: "string" },
                        description: "The two or more variables involved in the correlation"
                      },
                      evidence_summary: { type: "string", description: "Brief statement of the data supporting this pattern" },
                      actionable_insight: { type: "string", description: "What the user should do based on this pattern" },
                      impact_estimate: { type: "string", description: "Estimated % improvement if acted upon" }
                    },
                    required: ["pattern_type", "title", "description", "correlation_strength", "confidence", "direction", "variables", "evidence_summary", "actionable_insight"],
                    additionalProperties: false
                  }
                },
                summary: {
                  type: "object",
                  properties: {
                    total_data_points: { type: "integer" },
                    strongest_correlation: { type: "string" },
                    key_finding: { type: "string" },
                    data_quality: { type: "string", enum: ["excellent", "good", "moderate", "limited"] }
                  },
                  required: ["total_data_points", "strongest_correlation", "key_finding", "data_quality"],
                  additionalProperties: false
                }
              },
              required: ["patterns", "summary"],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "report_patterns" } }
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please top up." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const aiResponse = await response.json();
    const toolCall = aiResponse.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error('No patterns generated');

    const result = JSON.parse(toolCall.function.arguments);

    // Store patterns as autonomous_nudges with nudge_type = 'pattern'
    const patternsToSave = result.patterns.map((p: any) => ({
      user_id: user.id,
      nudge_type: 'pattern',
      category: p.pattern_type,
      title: p.title,
      description: p.description,
      confidence: p.confidence,
      priority: p.correlation_strength >= 0.7 ? 'high' : p.correlation_strength >= 0.4 ? 'medium' : 'low',
      impact: p.impact_estimate || null,
      timing: p.lag_days ? `${p.lag_days}-day lag` : 'immediate',
      action_label: p.actionable_insight?.substring(0, 60) || 'View Details',
      status: 'active',
      metadata: {
        pattern_type: p.direction,
        correlation_strength: p.correlation_strength,
        variables: p.variables,
        evidence_summary: p.evidence_summary,
        lag_days: p.lag_days || 0,
      },
    }));

    // Clear old patterns and insert new
    await supabase.from('autonomous_nudges').delete()
      .eq('user_id', user.id).eq('nudge_type', 'pattern').eq('status', 'active');
    
    if (patternsToSave.length > 0) {
      await supabase.from('autonomous_nudges').insert(patternsToSave);
    }

    return new Response(JSON.stringify({
      success: true,
      patterns: result.patterns,
      summary: result.summary,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error("pattern-recognition error:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
