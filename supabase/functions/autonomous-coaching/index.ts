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

    // Gather all relevant biometric context
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const [metricsRes, protocolsRes, checkInsRes, forecastsRes, existingNudgesRes] = await Promise.all([
      supabase.from('user_metrics').select('*').eq('user_id', user.id)
        .gte('recorded_at', fourteenDaysAgo.toISOString())
        .order('recorded_at', { ascending: true }),
      supabase.from('user_protocols').select('*').eq('user_id', user.id).eq('status', 'active').limit(5),
      supabase.from('protocol_check_ins').select('*').eq('user_id', user.id)
        .gte('check_in_date', fourteenDaysAgo.toISOString().split('T')[0])
        .order('check_in_date', { ascending: false }).limit(14),
      supabase.from('health_forecasts').select('*').eq('user_id', user.id)
        .gte('forecast_date', new Date().toISOString().split('T')[0])
        .order('forecast_date', { ascending: true }).limit(3),
      // Check how many active nudges already exist to avoid duplicates
      supabase.from('autonomous_nudges').select('id', { count: 'exact' }).eq('user_id', user.id).eq('status', 'active'),
    ]);

    const metrics = metricsRes.data || [];
    const protocols = protocolsRes.data || [];
    const checkIns = checkInsRes.data || [];
    const forecasts = forecastsRes.data || [];
    const activeNudgeCount = existingNudgesRes.count || 0;

    // Group metrics by type
    const metricsByType: Record<string, { value: number; date: string }[]> = {};
    metrics.forEach(m => {
      if (!metricsByType[m.metric_type]) metricsByType[m.metric_type] = [];
      metricsByType[m.metric_type].push({
        value: parseFloat(m.value.toString()),
        date: new Date(m.recorded_at).toISOString().split('T')[0],
      });
    });

    // Protocol context
    const protocolContext = protocols.map(p => ({
      name: p.protocol_name,
      goal: p.goal,
      completion: p.completion_percentage,
      products: p.products,
    }));

    // Check-in context (mood/energy trends)
    const checkInContext = checkIns.map(c => ({
      date: c.check_in_date,
      mood: c.mood_score,
      energy: c.energy_score,
      notes: c.notes,
    }));

    // Forecast context
    const forecastContext = forecasts.map(f => ({
      date: f.forecast_date,
      recovery: f.recovery_prediction,
      training_window: f.optimal_training_window,
    }));

    const now = new Date();
    const currentHour = now.getHours();
    const dayOfWeek = now.toLocaleDateString('en-GB', { weekday: 'long' });

    const systemPrompt = `You are Nova's autonomous coaching engine. You analyse biometric data to generate proactive coaching actions.

CURRENT CONTEXT:
- Day: ${dayOfWeek}, ${now.toISOString().split('T')[0]}
- Time: ${currentHour}:00
- Active nudges: ${activeNudgeCount} (avoid duplicating if many exist)
- Has biometric data: ${metrics.length > 0}

BIOMETRIC DATA (14 days):
${JSON.stringify(metricsByType, null, 2)}

ACTIVE PROTOCOLS: ${JSON.stringify(protocolContext)}
RECENT CHECK-INS: ${JSON.stringify(checkInContext)}
UPCOMING FORECASTS: ${JSON.stringify(forecastContext)}

Generate coaching actions across these categories:

1. NUDGES (2-3): Time-specific behavioural recommendations based on current biometric state
   - Types: movement, hydration, focus, rest, nutrition, mindfulness, recovery, training
   - Must include specific timing and quantified impact

2. RISK ALERTS (0-2): Only if biometric data shows concerning patterns
   - Burnout risk, overtraining, sleep debt accumulation, HRV decline
   - Priority: high or critical
   - Include specific biometric trigger data

3. PATTERNS (1-2): Detected correlations from the data
   - Positive patterns to reinforce, negative patterns to address
   - Include confidence score and data evidence

4. PREDICTIONS (1-2): 72-hour metric predictions
   - Include current value, predicted value, timeframe, and recommendation

5. PROTOCOL ADJUSTMENTS (0-1): Only if data strongly suggests a change
   - Specific modification to an active protocol based on biometric response

Rules:
- Be specific with times, percentages, and metrics
- Reference actual data trends when available
- If no biometric data, generate baseline recommendations for a healthy professional
- Use British English
- Don't generate more than 8 items total
- Each item must be actionable, not generic wellness advice`;

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
          { role: "user", content: "Analyse the biometric data and generate autonomous coaching actions." }
        ],
        tools: [{
          type: "function",
          function: {
            name: "generate_coaching_actions",
            description: "Generate autonomous coaching nudges, risk alerts, patterns, predictions, and protocol adjustments",
            parameters: {
              type: "object",
              properties: {
                actions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      nudge_type: { type: "string", enum: ["nudge", "risk_alert", "pattern", "prediction", "protocol_adjustment"] },
                      category: { type: "string", enum: ["movement", "hydration", "focus", "rest", "nutrition", "mindfulness", "recovery", "training", "general"] },
                      title: { type: "string" },
                      description: { type: "string" },
                      impact: { type: "string", description: "Quantified impact e.g. '+23% productivity'" },
                      confidence: { type: "number", description: "0-100" },
                      timing: { type: "string", description: "When to act" },
                      priority: { type: "string", enum: ["low", "medium", "high", "critical"] },
                      action_label: { type: "string", description: "CTA button text" },
                      metadata: {
                        type: "object",
                        description: "Extra data: biometric_trigger, current_value, predicted_value, timeframe, pattern_type (positive/negative/neutral), etc."
                      }
                    },
                    required: ["nudge_type", "category", "title", "description", "priority"]
                  }
                }
              },
              required: ["actions"]
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "generate_coaching_actions" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error('AI gateway error');
    }

    const aiResponse = await response.json();
    const toolCall = aiResponse.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error('No coaching actions generated');

    const result = JSON.parse(toolCall.function.arguments);

    // Expire old active nudges before inserting new ones
    await supabase
      .from('autonomous_nudges')
      .update({ status: 'expired' })
      .eq('user_id', user.id)
      .eq('status', 'active')
      .lt('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    // Insert new nudges
    const nudgesToInsert = (result.actions || []).map((a: any) => ({
      user_id: user.id,
      nudge_type: a.nudge_type || 'nudge',
      category: a.category || 'general',
      title: a.title,
      description: a.description,
      impact: a.impact || null,
      confidence: a.confidence || 75,
      timing: a.timing || null,
      priority: a.priority || 'medium',
      action_label: a.action_label || null,
      metadata: a.metadata || {},
      status: 'active',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }));

    if (nudgesToInsert.length > 0) {
      const { error: insertError } = await supabase
        .from('autonomous_nudges')
        .insert(nudgesToInsert);
      if (insertError) console.error("Insert error:", insertError);
    }

    // Also log a protocol adjustment to the protocol_adjustments table if any
    const protocolAdjustments = (result.actions || []).filter((a: any) => a.nudge_type === 'protocol_adjustment');
    for (const adj of protocolAdjustments) {
      const activeProtocol = protocols[0]; // Adjust the first active protocol
      if (activeProtocol) {
        await supabase.from('protocol_adjustments').insert({
          user_id: user.id,
          protocol_id: activeProtocol.id,
          adjustment_type: 'autonomous',
          reason: adj.description,
          biometric_trigger: adj.metadata || {},
          new_state: { recommendation: adj.title },
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      actions_generated: nudgesToInsert.length,
      actions: result.actions,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("autonomous-coaching error:", error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
