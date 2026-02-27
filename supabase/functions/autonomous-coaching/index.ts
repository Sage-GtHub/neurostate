import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Simple rate limiter
const rateLimitMap = new Map<string, number[]>();
function checkRateLimit(userId: string, maxRequests = 3, windowMs = 5 * 60 * 1000): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(userId) || []).filter(t => now - t < windowMs);
  if (timestamps.length >= maxRequests) return false;
  timestamps.push(now);
  rateLimitMap.set(userId, timestamps);
  return true;
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
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const isCronCall = authHeader && authHeader.replace('Bearer ', '') === anonKey;

    let userIds: string[] = [];

    if (isCronCall) {
      // Cron mode: process all users who have active protocols or recent metrics
      const { data: activeUsers } = await supabase
        .from('user_preferences')
        .select('user_id')
        .eq('onboarding_completed', true)
        .limit(50);
      userIds = (activeUsers || []).map((u: any) => u.user_id);

      if (userIds.length === 0) {
        return new Response(JSON.stringify({ success: true, message: 'No active users to process' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      // User-initiated mode
      if (!authHeader) throw new Error('No authorization header');
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      if (!user) throw new Error('Unauthorized');

      if (!checkRateLimit(user.id)) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a few minutes." }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      userIds = [user.id];
    }

    // Process each user
    let totalGenerated = 0;
    for (const userId of userIds) {
      try {
        const generated = await processUserCoaching(supabase, userId, LOVABLE_API_KEY);
        totalGenerated += generated;
      } catch (err) {
        console.error(`Error processing user ${userId}:`, err);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      users_processed: userIds.length,
      actions_generated: totalGenerated,
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

/** Process coaching for a single user. Returns number of actions generated. */
async function processUserCoaching(supabase: any, userId: string, apiKey: string): Promise<number> {
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  const [metricsRes, protocolsRes, checkInsRes, forecastsRes, existingNudgesRes, responseHistoryRes] = await Promise.all([
    supabase.from('user_metrics').select('*').eq('user_id', userId)
      .gte('recorded_at', fourteenDaysAgo.toISOString())
      .order('recorded_at', { ascending: true }),
    supabase.from('user_protocols').select('*').eq('user_id', userId).eq('status', 'active').limit(5),
    supabase.from('protocol_check_ins').select('*').eq('user_id', userId)
      .gte('check_in_date', fourteenDaysAgo.toISOString().split('T')[0])
      .order('check_in_date', { ascending: false }).limit(14),
    supabase.from('health_forecasts').select('*').eq('user_id', userId)
      .gte('forecast_date', new Date().toISOString().split('T')[0])
      .order('forecast_date', { ascending: true }).limit(3),
    supabase.from('autonomous_nudges').select('id', { count: 'exact' }).eq('user_id', userId).eq('status', 'active'),
    supabase.from('autonomous_nudges').select('nudge_type, category, status, title, completed_at, created_at')
      .eq('user_id', userId)
      .in('status', ['completed', 'dismissed', 'expired'])
      .gte('created_at', fourteenDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(50),
  ]);

  const metrics = metricsRes.data || [];
  const protocols = protocolsRes.data || [];
  const checkIns = checkInsRes.data || [];
  const forecasts = forecastsRes.data || [];
  const activeNudgeCount = existingNudgesRes.count || 0;
  const responseHistory = responseHistoryRes.data || [];
  const responsePatterns = analyseResponsePatterns(responseHistory);

  const metricsByType: Record<string, { value: number; date: string }[]> = {};
  metrics.forEach((m: any) => {
    if (!metricsByType[m.metric_type]) metricsByType[m.metric_type] = [];
    metricsByType[m.metric_type].push({
      value: parseFloat(m.value.toString()),
      date: new Date(m.recorded_at).toISOString().split('T')[0],
    });
  });

  const protocolContext = protocols.map((p: any) => ({
    name: p.protocol_name, goal: p.goal, completion: p.completion_percentage, products: p.products,
  }));
  const checkInContext = checkIns.map((c: any) => ({
    date: c.check_in_date, mood: c.mood_score, energy: c.energy_score, notes: c.notes,
  }));
  const forecastContext = forecasts.map((f: any) => ({
    date: f.forecast_date, recovery: f.recovery_prediction, training_window: f.optimal_training_window,
  }));

  const now = new Date();
  const currentHour = now.getHours();
  const dayOfWeek = now.toLocaleDateString('en-GB', { weekday: 'long' });

  const systemPrompt = `You are Nova's autonomous coaching engine. Analyse biometric data and user response patterns to generate proactive, adaptive coaching actions.

CURRENT CONTEXT:
- Day: ${dayOfWeek}, ${now.toISOString().split('T')[0]}
- Time: ${currentHour}:00
- Active nudges: ${activeNudgeCount}
- Has biometric data: ${metrics.length > 0}

USER RESPONSE PATTERNS:
${JSON.stringify(responsePatterns, null, 2)}

Key adaptation rules:
- Categories with high dismiss rates should be deprioritised or reframed
- Categories with high completion rates should be reinforced and expanded
- Avoid repeating dismissed nudge titles
- Time nudges based on user completion patterns

BIOMETRIC DATA (14 days): ${JSON.stringify(metricsByType, null, 2)}
ACTIVE PROTOCOLS: ${JSON.stringify(protocolContext)}
RECENT CHECK-INS: ${JSON.stringify(checkInContext)}
UPCOMING FORECASTS: ${JSON.stringify(forecastContext)}

DISMISSED TITLES (do NOT repeat): ${responsePatterns.recentDismissedTitles.join(', ')}

Generate: 2-3 nudges, 0-2 risk alerts, 1-2 patterns, 1-2 predictions, 0-1 protocol adjustments.
Max 8 items. Be specific with times/percentages. Use British English.`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Analyse the biometric data and generate adaptive coaching actions." }
      ],
      tools: [{
        type: "function",
        function: {
          name: "generate_coaching_actions",
          description: "Generate autonomous coaching actions",
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
                    impact: { type: "string" },
                    confidence: { type: "number" },
                    timing: { type: "string" },
                    priority: { type: "string", enum: ["low", "medium", "high", "critical"] },
                    action_label: { type: "string" },
                    metadata: { type: "object" }
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
    const errText = await response.text();
    console.error("AI gateway error:", response.status, errText);
    throw new Error('AI gateway error');
  }

  const aiResponse = await response.json();
  const toolCall = aiResponse.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall) throw new Error('No coaching actions generated');

  const result = JSON.parse(toolCall.function.arguments);

  // Expire old active nudges
  await supabase.from('autonomous_nudges')
    .update({ status: 'expired' })
    .eq('user_id', userId).eq('status', 'active')
    .lt('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  const nudgesToInsert = (result.actions || []).map((a: any) => ({
    user_id: userId,
    nudge_type: a.nudge_type || 'nudge',
    category: a.category || 'general',
    title: a.title,
    description: a.description,
    impact: a.impact || null,
    confidence: a.confidence || 75,
    timing: a.timing || null,
    priority: a.priority || 'medium',
    action_label: a.action_label || null,
    metadata: { ...(a.metadata || {}), response_patterns_used: true, adaptation_context: responsePatterns.summary },
    status: 'active',
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }));

  if (nudgesToInsert.length > 0) {
    const { error: insertError } = await supabase.from('autonomous_nudges').insert(nudgesToInsert);
    if (insertError) console.error("Insert error:", insertError);
  }

  // Log protocol adjustments
  const protocolAdj = (result.actions || []).filter((a: any) => a.nudge_type === 'protocol_adjustment');
  for (const adj of protocolAdj) {
    if (protocols[0]) {
      await supabase.from('protocol_adjustments').insert({
        user_id: userId, protocol_id: protocols[0].id,
        adjustment_type: 'autonomous', reason: adj.description,
        biometric_trigger: adj.metadata || {}, new_state: { recommendation: adj.title },
      });
    }
  }

  return nudgesToInsert.length;
}


function analyseResponsePatterns(history: any[]) {
  const byCategory: Record<string, { completed: number; dismissed: number; expired: number }> = {};
  const byType: Record<string, { completed: number; dismissed: number; expired: number }> = {};
  const recentDismissedTitles: string[] = [];

  for (const item of history) {
    const cat = item.category || 'general';
    const type = item.nudge_type || 'nudge';
    
    if (!byCategory[cat]) byCategory[cat] = { completed: 0, dismissed: 0, expired: 0 };
    if (!byType[type]) byType[type] = { completed: 0, dismissed: 0, expired: 0 };

    if (item.status === 'completed') {
      byCategory[cat].completed++;
      byType[type].completed++;
    } else if (item.status === 'dismissed') {
      byCategory[cat].dismissed++;
      byType[type].dismissed++;
      recentDismissedTitles.push(item.title);
    } else if (item.status === 'expired') {
      byCategory[cat].expired++;
      byType[type].expired++;
    }
  }

  // Compute engagement rates per category
  const categoryEngagement: Record<string, { rate: number; preference: string }> = {};
  for (const [cat, counts] of Object.entries(byCategory)) {
    const total = counts.completed + counts.dismissed + counts.expired;
    const rate = total > 0 ? Math.round((counts.completed / total) * 100) : 50;
    categoryEngagement[cat] = {
      rate,
      preference: rate >= 70 ? 'high_engagement' : rate >= 40 ? 'moderate' : 'low_engagement',
    };
  }

  // Find preferred and avoided categories
  const preferred = Object.entries(categoryEngagement)
    .filter(([, v]) => v.preference === 'high_engagement')
    .map(([k]) => k);
  const avoided = Object.entries(categoryEngagement)
    .filter(([, v]) => v.preference === 'low_engagement')
    .map(([k]) => k);

  const totalCompleted = history.filter(h => h.status === 'completed').length;
  const totalDismissed = history.filter(h => h.status === 'dismissed').length;
  const overallRate = (totalCompleted + totalDismissed) > 0
    ? Math.round((totalCompleted / (totalCompleted + totalDismissed)) * 100)
    : 50;

  const summary = `Overall engagement: ${overallRate}%. Preferred: ${preferred.join(', ') || 'none yet'}. Avoided: ${avoided.join(', ') || 'none yet'}. Total history: ${history.length} nudges.`;

  return {
    byCategory,
    byType,
    categoryEngagement,
    preferredCategories: preferred,
    avoidedCategories: avoided,
    overallEngagementRate: overallRate,
    recentDismissedTitles: recentDismissedTitles.slice(0, 10),
    totalHistory: history.length,
    summary,
  };
}
