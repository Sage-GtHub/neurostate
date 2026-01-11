import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
async function generateDigest(
  supabase: SupabaseClient<any, any, any>,
  organisationId: string,
  organisationName: string
): Promise<WeeklyDigest> {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  // Get teams for this organisation
  const { data: teams } = await supabase
    .from("teams")
    .select("id, name")
    .eq("organisation_id", organisationId);

  if (!teams || teams.length === 0) {
    return {
      organisation_id: organisationId,
      organisation_name: organisationName,
      period_start: weekAgo.toISOString().split("T")[0],
      period_end: now.toISOString().split("T")[0],
      summary: {
        avg_cci: 0,
        cci_change: 0,
        avg_burnout_risk: 0,
        burnout_change: 0,
        total_revenue_exposure: 0,
        active_members: 0,
        interventions_completed: 0,
        top_performing_team: null,
        at_risk_team: null,
      },
      team_summaries: [],
      recommendations: ["Add teams and members to start tracking performance"],
    };
  }

  const teamIds = teams.map((t) => t.id);

  // Get this week's metrics
  const { data: thisWeekMetrics } = await supabase
    .from("team_metrics")
    .select("*")
    .in("team_id", teamIds)
    .gte("metric_date", weekAgo.toISOString().split("T")[0]);

  // Get last week's metrics for comparison
  const { data: lastWeekMetrics } = await supabase
    .from("team_metrics")
    .select("*")
    .in("team_id", teamIds)
    .gte("metric_date", twoWeeksAgo.toISOString().split("T")[0])
    .lt("metric_date", weekAgo.toISOString().split("T")[0]);

  // Get completed interventions
  const { data: completedInterventions } = await supabase
    .from("team_interventions")
    .select("id")
    .eq("organisation_id", organisationId)
    .eq("status", "completed")
    .gte("completed_at", weekAgo.toISOString());

  // Calculate averages
  const calcAvg = (
    metrics: Array<{ cognitive_capacity_index: number | null }> | null,
    field: string
  ): number => {
    if (!metrics || metrics.length === 0) return 0;
    const values = metrics
      .map((m) => (m as Record<string, number | null>)[field])
      .filter((v): v is number => v !== null);
    return values.length > 0
      ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
      : 0;
  };

  const thisWeekCCI = calcAvg(thisWeekMetrics, "cognitive_capacity_index");
  const lastWeekCCI = calcAvg(lastWeekMetrics, "cognitive_capacity_index");
  const thisWeekBurnout = calcAvg(thisWeekMetrics, "burnout_risk_score");
  const lastWeekBurnout = calcAvg(lastWeekMetrics, "burnout_risk_score");

  const cciChange = lastWeekCCI > 0 ? Math.round(((thisWeekCCI - lastWeekCCI) / lastWeekCCI) * 100) : 0;
  const burnoutChange = lastWeekBurnout > 0 ? Math.round(((thisWeekBurnout - lastWeekBurnout) / lastWeekBurnout) * 100) : 0;

  // Calculate team summaries
  const teamSummaries = teams.map((team) => {
    const teamMetrics = (thisWeekMetrics || []).filter((m) => m.team_id === team.id);
    const lastTeamMetrics = (lastWeekMetrics || []).filter((m) => m.team_id === team.id);
    
    const cci = calcAvg(teamMetrics, "cognitive_capacity_index");
    const lastCci = calcAvg(lastTeamMetrics, "cognitive_capacity_index");
    const burnout = calcAvg(teamMetrics, "burnout_risk_score");

    let trend: "up" | "down" | "stable" = "stable";
    if (cci > lastCci + 5) trend = "up";
    else if (cci < lastCci - 5) trend = "down";

    return {
      team_name: team.name,
      cci,
      burnout_risk: burnout,
      trend,
    };
  });

  // Find top and at-risk teams
  const sortedByPerformance = [...teamSummaries].sort((a, b) => b.cci - a.cci);
  const sortedByRisk = [...teamSummaries].sort((a, b) => b.burnout_risk - a.burnout_risk);

  const topPerformingTeam = sortedByPerformance[0]?.cci > 0 ? sortedByPerformance[0]?.team_name : null;
  const atRiskTeam = sortedByRisk[0]?.burnout_risk > 60 ? sortedByRisk[0]?.team_name : null;

  // Calculate total revenue exposure
  const totalRevenueExposure = (thisWeekMetrics || []).reduce(
    (sum, m) => sum + (Number(m.revenue_exposure) || 0),
    0
  );

  // Active members
  const activeMembers = (thisWeekMetrics || []).reduce(
    (sum, m) => sum + (m.active_members || 0),
    0
  );

  // Generate recommendations
  const recommendations: string[] = [];
  
  if (burnoutChange > 10) {
    recommendations.push("⚠️ Burnout risk increased this week. Consider scheduling team wellness check-ins.");
  }
  if (cciChange < -5) {
    recommendations.push("📉 Cognitive capacity declined. Review workload distribution and meeting schedules.");
  }
  if (atRiskTeam) {
    recommendations.push(`🔴 ${atRiskTeam} shows elevated burnout risk. Prioritise intervention.`);
  }
  if (topPerformingTeam && cciChange > 0) {
    recommendations.push(`✅ ${topPerformingTeam} is performing well. Consider sharing their practices.`);
  }
  if (totalRevenueExposure > 50000) {
    recommendations.push(`💷 £${totalRevenueExposure.toLocaleString()} at risk. Focus on reducing cognitive friction.`);
  }
  if (recommendations.length === 0) {
    recommendations.push("✅ All metrics stable. Continue current protocols.");
  }

  return {
    organisation_id: organisationId,
    organisation_name: organisationName,
    period_start: weekAgo.toISOString().split("T")[0],
    period_end: now.toISOString().split("T")[0],
    summary: {
      avg_cci: thisWeekCCI,
      cci_change: cciChange,
      avg_burnout_risk: thisWeekBurnout,
      burnout_change: burnoutChange,
      total_revenue_exposure: totalRevenueExposure,
      active_members: activeMembers,
      interventions_completed: completedInterventions?.length || 0,
      top_performing_team: topPerformingTeam,
      at_risk_team: atRiskTeam,
    },
    team_summaries: teamSummaries,
    recommendations,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendDigestNotifications(
  supabase: SupabaseClient<any, any, any>,
  digest: WeeklyDigest
) {
  // Get organisation admins
  const { data: admins } = await supabase
    .from("organisation_members")
    .select("user_id")
    .eq("organisation_id", digest.organisation_id)
    .in("role", ["admin", "owner"]);

  if (!admins || admins.length === 0) return;

  // Create digest notification for each admin
  const notifications = admins.map((admin: { user_id: string }) => ({
    user_id: admin.user_id,
    activity_type: "weekly_digest",
    title: `📊 Weekly Performance Digest: ${digest.organisation_name}`,
    description: `CCI: ${digest.summary.avg_cci} (${digest.summary.cci_change >= 0 ? "+" : ""}${digest.summary.cci_change}%) | Burnout Risk: ${digest.summary.avg_burnout_risk}% | Revenue Exposure: £${digest.summary.total_revenue_exposure.toLocaleString()}`,
    metadata: {
      digest_type: "weekly",
      period_start: digest.period_start,
      period_end: digest.period_end,
      summary: digest.summary,
      team_summaries: digest.team_summaries,
      recommendations: digest.recommendations,
    },
    is_read: false,
  }));

  await supabase.from("activity_feed").insert(notifications);
  console.log(`Sent weekly digest to ${admins.length} admins for ${digest.organisation_name}`);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Generating weekly performance digests...");

    // Get all organisations
    const { data: organisations, error: orgError } = await supabase
      .from("organisations")
      .select("id, name");

    if (orgError) {
      console.error("Error fetching organisations:", orgError);
      throw orgError;
    }

    if (!organisations || organisations.length === 0) {
      return new Response(
        JSON.stringify({ message: "No organisations to process" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const digests: WeeklyDigest[] = [];

    for (const org of organisations) {
      console.log(`Generating digest for: ${org.name}`);
      const digest = await generateDigest(supabase, org.id, org.name);
      digests.push(digest);
      await sendDigestNotifications(supabase, digest);
    }

    console.log(`Generated ${digests.length} weekly digests`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Generated ${digests.length} weekly digests`,
        digests,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in weekly-performance-digest:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
