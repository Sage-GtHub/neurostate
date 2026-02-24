import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface PersonalDigest {
  period_start: string;
  period_end: string;
  metrics_summary: {
    metric_type: string;
    this_week_avg: number;
    last_week_avg: number;
    change_pct: number;
    trend: "up" | "down" | "stable";
    data_points: number;
  }[];
  goals_summary: {
    goal_type: string;
    target_value: number;
    current_value: number | null;
    progress: number;
    status: string;
  }[];
  check_in_summary: {
    total_check_ins: number;
    avg_mood: number | null;
    avg_energy: number | null;
    protocols_adhered: number;
  };
  ai_narrative: string;
  highlights: string[];
  recommendations: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function generatePersonalDigest(
  supabase: SupabaseClient<any, any, any>,
  userId: string
): Promise<PersonalDigest> {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const periodStart = weekAgo.toISOString().split("T")[0];
  const periodEnd = now.toISOString().split("T")[0];

  // Fetch all data in parallel
  const [thisWeekMetrics, lastWeekMetrics, goals, checkIns, protocols, profile] = await Promise.all([
    supabase
      .from("user_metrics")
      .select("metric_type, value, recorded_at")
      .eq("user_id", userId)
      .gte("recorded_at", weekAgo.toISOString())
      .order("recorded_at", { ascending: true }),
    supabase
      .from("user_metrics")
      .select("metric_type, value, recorded_at")
      .eq("user_id", userId)
      .gte("recorded_at", twoWeeksAgo.toISOString())
      .lt("recorded_at", weekAgo.toISOString()),
    supabase
      .from("performance_goals")
      .select("goal_type, target_value, current_value, progress_percentage, status")
      .eq("user_id", userId)
      .eq("status", "active"),
    supabase
      .from("protocol_check_ins")
      .select("mood_score, energy_score, products_completed, check_in_date")
      .eq("user_id", userId)
      .gte("check_in_date", periodStart),
    supabase
      .from("user_protocols")
      .select("protocol_name, goal, completion_percentage, status")
      .eq("user_id", userId)
      .eq("status", "active"),
    supabase
      .from("profiles")
      .select("full_name")
      .eq("id", userId)
      .single(),
  ]);

  // Calculate metrics summary
  const metricTypes = new Set<string>();
  (thisWeekMetrics.data || []).forEach((m) => metricTypes.add(m.metric_type));
  (lastWeekMetrics.data || []).forEach((m) => metricTypes.add(m.metric_type));

  const metricsSummary = Array.from(metricTypes).map((type) => {
    const thisWeek = (thisWeekMetrics.data || [])
      .filter((m) => m.metric_type === type)
      .map((m) => Number(m.value));
    const lastWeek = (lastWeekMetrics.data || [])
      .filter((m) => m.metric_type === type)
      .map((m) => Number(m.value));

    const thisAvg = thisWeek.length > 0 ? thisWeek.reduce((a, b) => a + b, 0) / thisWeek.length : 0;
    const lastAvg = lastWeek.length > 0 ? lastWeek.reduce((a, b) => a + b, 0) / lastWeek.length : 0;
    const changePct = lastAvg > 0 ? Math.round(((thisAvg - lastAvg) / lastAvg) * 100) : 0;

    return {
      metric_type: type,
      this_week_avg: Math.round(thisAvg * 10) / 10,
      last_week_avg: Math.round(lastAvg * 10) / 10,
      change_pct: changePct,
      trend: (changePct > 5 ? "up" : changePct < -5 ? "down" : "stable") as "up" | "down" | "stable",
      data_points: thisWeek.length,
    };
  });

  // Goals summary
  const goalsSummary = (goals.data || []).map((g) => ({
    goal_type: g.goal_type,
    target_value: Number(g.target_value),
    current_value: g.current_value ? Number(g.current_value) : null,
    progress: g.progress_percentage || 0,
    status: g.status || "active",
  }));

  // Check-in summary
  const checkInData = checkIns.data || [];
  const moodScores = checkInData.map((c) => c.mood_score).filter((v): v is number => v !== null);
  const energyScores = checkInData.map((c) => c.energy_score).filter((v): v is number => v !== null);

  const checkInSummary = {
    total_check_ins: checkInData.length,
    avg_mood: moodScores.length > 0 ? Math.round((moodScores.reduce((a, b) => a + b, 0) / moodScores.length) * 10) / 10 : null,
    avg_energy: energyScores.length > 0 ? Math.round((energyScores.reduce((a, b) => a + b, 0) / energyScores.length) * 10) / 10 : null,
    protocols_adhered: checkInData.length,
  };

  // Generate AI narrative
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  let aiNarrative = "";
  let highlights: string[] = [];
  let recommendations: string[] = [];

  if (LOVABLE_API_KEY) {
    const firstName = profile.data?.full_name?.split(" ")[0] || "there";

    const prompt = `You are a friendly health coach writing a weekly summary for ${firstName}. Use simple, warm language — no jargon. Write like you're texting a friend who's into fitness.

Here's their week:

BIOMETRICS (this week vs last):
${metricsSummary.map((m) => `- ${m.metric_type}: ${m.this_week_avg} (${m.change_pct >= 0 ? "+" : ""}${m.change_pct}% from last week, ${m.data_points} readings)`).join("\n") || "No biometric data recorded."}

GOALS:
${goalsSummary.map((g) => `- ${g.goal_type}: ${g.progress}% towards ${g.target_value}${g.current_value ? ` (currently ${g.current_value})` : ""}`).join("\n") || "No active goals set."}

CHECK-INS: ${checkInSummary.total_check_ins} this week${checkInSummary.avg_mood ? `, avg mood ${checkInSummary.avg_mood}/10` : ""}${checkInSummary.avg_energy ? `, avg energy ${checkInSummary.avg_energy}/10` : ""}

ACTIVE PROTOCOLS:
${(protocols.data || []).map((p) => `- ${p.protocol_name} (${p.completion_percentage}% complete) — goal: ${p.goal}`).join("\n") || "None active."}`;

    try {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: "You are a friendly performance coach. Keep language simple and warm." },
            { role: "user", content: prompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "create_weekly_digest",
                description: "Create a weekly performance digest for the user.",
                parameters: {
                  type: "object",
                  properties: {
                    narrative: {
                      type: "string",
                      description: "A 3-4 sentence friendly summary of the week. Mention what went well and what to watch. No bullet points. Conversational tone.",
                    },
                    highlights: {
                      type: "array",
                      items: { type: "string" },
                      description: "2-4 short highlights (wins or notable moments) from the week. Each under 15 words.",
                    },
                    recommendations: {
                      type: "array",
                      items: { type: "string" },
                      description: "2-4 actionable tips for next week. Each under 20 words. Specific and practical.",
                    },
                  },
                  required: ["narrative", "highlights", "recommendations"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "create_weekly_digest" } },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
        if (toolCall?.function?.arguments) {
          const parsed = JSON.parse(toolCall.function.arguments);
          aiNarrative = parsed.narrative || "";
          highlights = parsed.highlights || [];
          recommendations = parsed.recommendations || [];
        }
      } else {
        console.error("AI gateway error:", response.status, await response.text());
      }
    } catch (e) {
      console.error("AI narrative generation failed:", e);
    }
  }

  // Fallback if AI didn't produce results
  if (!aiNarrative) {
    const improving = metricsSummary.filter((m) => m.trend === "up");
    const declining = metricsSummary.filter((m) => m.trend === "down");

    aiNarrative = improving.length > 0
      ? `Good week! ${improving.map((m) => m.metric_type).join(" and ")} improved. ${declining.length > 0 ? `Keep an eye on ${declining.map((m) => m.metric_type).join(" and ")}.` : "Keep it up!"}`
      : checkInSummary.total_check_ins > 0
        ? `You stayed consistent with ${checkInSummary.total_check_ins} check-ins this week. That consistency pays off over time.`
        : "Quiet week — try logging a few check-ins next week to spot trends.";

    highlights = metricsSummary.filter((m) => m.trend === "up").map((m) => `${m.metric_type} up ${m.change_pct}% from last week`);
    if (checkInSummary.total_check_ins > 3) highlights.push(`${checkInSummary.total_check_ins} check-ins — great consistency`);
    if (highlights.length === 0) highlights.push("Keep going — next week will have more data");

    recommendations = [];
    if (checkInSummary.total_check_ins < 3) recommendations.push("Try checking in at least 3 times this week");
    if (goalsSummary.length === 0) recommendations.push("Set a goal to stay focused and track progress");
    if (metricsSummary.length === 0) recommendations.push("Connect a wearable to start tracking automatically");
    if (recommendations.length === 0) recommendations.push("Keep up your current routine — it's working");
  }

  return {
    period_start: periodStart,
    period_end: periodEnd,
    metrics_summary: metricsSummary,
    goals_summary: goalsSummary,
    check_in_summary: checkInSummary,
    ai_narrative: aiNarrative,
    highlights,
    recommendations,
  };
}

// ---- Org-level digest (existing) ----

interface WeeklyDigest {
  organisation_id: string;
  organisation_name: string;
  period_start: string;
  period_end: string;
  summary: {
    avg_cci: number;
    cci_change: number;
    avg_burnout_risk: number;
    burnout_change: number;
    total_revenue_exposure: number;
    active_members: number;
    interventions_completed: number;
    top_performing_team: string | null;
    at_risk_team: string | null;
  };
  team_summaries: Array<{
    team_name: string;
    cci: number;
    burnout_risk: number;
    trend: "up" | "down" | "stable";
  }>;
  recommendations: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function generateOrgDigest(
  supabase: SupabaseClient<any, any, any>,
  organisationId: string,
  organisationName: string
): Promise<WeeklyDigest> {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const { data: teams } = await supabase
    .from("teams").select("id, name").eq("organisation_id", organisationId);

  if (!teams || teams.length === 0) {
    return {
      organisation_id: organisationId, organisation_name: organisationName,
      period_start: weekAgo.toISOString().split("T")[0], period_end: now.toISOString().split("T")[0],
      summary: { avg_cci: 0, cci_change: 0, avg_burnout_risk: 0, burnout_change: 0, total_revenue_exposure: 0, active_members: 0, interventions_completed: 0, top_performing_team: null, at_risk_team: null },
      team_summaries: [], recommendations: ["Add teams and members to start tracking performance"],
    };
  }

  const teamIds = teams.map((t) => t.id);
  const [thisWeekRes, lastWeekRes, interventionsRes] = await Promise.all([
    supabase.from("team_metrics").select("*").in("team_id", teamIds).gte("metric_date", weekAgo.toISOString().split("T")[0]),
    supabase.from("team_metrics").select("*").in("team_id", teamIds).gte("metric_date", twoWeeksAgo.toISOString().split("T")[0]).lt("metric_date", weekAgo.toISOString().split("T")[0]),
    supabase.from("team_interventions").select("id").eq("organisation_id", organisationId).eq("status", "completed").gte("completed_at", weekAgo.toISOString()),
  ]);

  const thisWeekMetrics = thisWeekRes.data;
  const lastWeekMetrics = lastWeekRes.data;

  const calcAvg = (metrics: any[] | null, field: string): number => {
    if (!metrics || metrics.length === 0) return 0;
    const values = metrics.map((m) => m[field]).filter((v): v is number => v !== null);
    return values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
  };

  const thisWeekCCI = calcAvg(thisWeekMetrics, "cognitive_capacity_index");
  const lastWeekCCI = calcAvg(lastWeekMetrics, "cognitive_capacity_index");
  const thisWeekBurnout = calcAvg(thisWeekMetrics, "burnout_risk_score");
  const lastWeekBurnout = calcAvg(lastWeekMetrics, "burnout_risk_score");
  const cciChange = lastWeekCCI > 0 ? Math.round(((thisWeekCCI - lastWeekCCI) / lastWeekCCI) * 100) : 0;
  const burnoutChange = lastWeekBurnout > 0 ? Math.round(((thisWeekBurnout - lastWeekBurnout) / lastWeekBurnout) * 100) : 0;

  const teamSummaries = teams.map((team) => {
    const tm = (thisWeekMetrics || []).filter((m) => m.team_id === team.id);
    const lm = (lastWeekMetrics || []).filter((m) => m.team_id === team.id);
    const cci = calcAvg(tm, "cognitive_capacity_index");
    const lastCci = calcAvg(lm, "cognitive_capacity_index");
    const burnout = calcAvg(tm, "burnout_risk_score");
    let trend: "up" | "down" | "stable" = "stable";
    if (cci > lastCci + 5) trend = "up";
    else if (cci < lastCci - 5) trend = "down";
    return { team_name: team.name, cci, burnout_risk: burnout, trend };
  });

  const sorted = [...teamSummaries].sort((a, b) => b.cci - a.cci);
  const sortedRisk = [...teamSummaries].sort((a, b) => b.burnout_risk - a.burnout_risk);
  const topTeam = sorted[0]?.cci > 0 ? sorted[0]?.team_name : null;
  const riskTeam = sortedRisk[0]?.burnout_risk > 60 ? sortedRisk[0]?.team_name : null;

  const totalRevenue = (thisWeekMetrics || []).reduce((s, m) => s + (Number(m.revenue_exposure) || 0), 0);
  const activeMembers = (thisWeekMetrics || []).reduce((s, m) => s + (m.active_members || 0), 0);

  const recs: string[] = [];
  if (burnoutChange > 10) recs.push("⚠️ Burnout risk increased. Consider team wellness check-ins.");
  if (cciChange < -5) recs.push("📉 Cognitive capacity declined. Review workload distribution.");
  if (riskTeam) recs.push(`🔴 ${riskTeam} shows elevated burnout risk.`);
  if (topTeam && cciChange > 0) recs.push(`✅ ${topTeam} is performing well.`);
  if (totalRevenue > 50000) recs.push(`💷 £${totalRevenue.toLocaleString()} at risk.`);
  if (recs.length === 0) recs.push("✅ All metrics stable. Continue current approach.");

  return {
    organisation_id: organisationId, organisation_name: organisationName,
    period_start: weekAgo.toISOString().split("T")[0], period_end: now.toISOString().split("T")[0],
    summary: { avg_cci: thisWeekCCI, cci_change: cciChange, avg_burnout_risk: thisWeekBurnout, burnout_change: burnoutChange, total_revenue_exposure: totalRevenue, active_members: activeMembers, interventions_completed: interventionsRes.data?.length || 0, top_performing_team: topTeam, at_risk_team: riskTeam },
    team_summaries: teamSummaries, recommendations: recs,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendOrgDigestNotifications(supabase: SupabaseClient<any, any, any>, digest: WeeklyDigest) {
  const { data: admins } = await supabase.from("organisation_members").select("user_id").eq("organisation_id", digest.organisation_id).in("role", ["admin", "owner"]);
  if (!admins || admins.length === 0) return;
  const notifications = admins.map((a: { user_id: string }) => ({
    user_id: a.user_id, activity_type: "weekly_digest",
    title: `📊 Weekly Digest: ${digest.organisation_name}`,
    description: `CCI: ${digest.summary.avg_cci} (${digest.summary.cci_change >= 0 ? "+" : ""}${digest.summary.cci_change}%) | Burnout: ${digest.summary.avg_burnout_risk}%`,
    metadata: { digest_type: "weekly_org", ...digest }, is_read: false,
  }));
  await supabase.from("activity_feed").insert(notifications);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json().catch(() => ({}));
    const mode = body.mode || "org"; // "personal" or "org"

    // ---- Personal digest mode ----
    if (mode === "personal") {
      const authHeader = req.headers.get("Authorization");
      let userId = body.user_id;

      if (!userId && authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const { data: { user } } = await supabase.auth.getUser(token);
        userId = user?.id;
      }

      if (!userId) {
        return new Response(JSON.stringify({ error: "User not found" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const digest = await generatePersonalDigest(supabase, userId);

      // Store as activity feed item
      await supabase.from("activity_feed").insert({
        user_id: userId,
        activity_type: "weekly_digest",
        title: "📊 Your Weekly Summary",
        description: digest.ai_narrative,
        metadata: { digest_type: "weekly_personal", ...digest },
        is_read: false,
      });

      return new Response(JSON.stringify({ success: true, digest }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ---- Org digest mode (existing) ----
    const { data: organisations, error: orgError } = await supabase.from("organisations").select("id, name");
    if (orgError) throw orgError;

    if (!organisations || organisations.length === 0) {
      return new Response(JSON.stringify({ message: "No organisations to process" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const digests: WeeklyDigest[] = [];
    for (const org of organisations) {
      const digest = await generateOrgDigest(supabase, org.id, org.name);
      digests.push(digest);
      await sendOrgDigestNotifications(supabase, digest);
    }

    return new Response(JSON.stringify({ success: true, message: `Generated ${digests.length} digests`, digests }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in weekly-performance-digest:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
