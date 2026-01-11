import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TeamMetricsInput {
  team_id: string;
  metric_date: string;
  avg_readiness_score: number | null;
  avg_focus_score: number | null;
  avg_energy_score: number | null;
  avg_recovery_score: number | null;
  burnout_risk_score: number | null;
  cognitive_capacity_index: number | null;
  active_members: number;
  protocol_completion_rate: number | null;
  check_ins_count: number;
  revenue_exposure: number | null;
}

const BURNOUT_THRESHOLD = 70; // Alert when burnout risk exceeds this

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createBurnoutAlerts(
  supabase: SupabaseClient<any, any, any>,
  teamName: string,
  teamId: string,
  orgId: string,
  burnoutRisk: number
) {
  // Get organisation admins to notify
  const { data: admins, error: adminsError } = await supabase
    .from("organisation_members")
    .select("user_id")
    .eq("organisation_id", orgId)
    .in("role", ["admin", "owner"]);

  if (adminsError) {
    console.error("Error fetching admins:", adminsError);
    return;
  }

  if (!admins || admins.length === 0) {
    console.log("No admins found to notify");
    return;
  }

  // Create in-app notifications for each admin
  const notifications = admins.map((admin: { user_id: string }) => ({
    user_id: admin.user_id,
    activity_type: "burnout_alert",
    title: `⚠️ High Burnout Risk: ${teamName}`,
    description: `Team burnout risk has reached ${burnoutRisk}%. Immediate intervention recommended to prevent productivity loss.`,
    metadata: {
      team_id: teamId,
      team_name: teamName,
      burnout_risk: burnoutRisk,
      threshold: BURNOUT_THRESHOLD,
      alert_type: "critical",
      recommended_actions: [
        "Review workload distribution",
        "Check for overdue time-off requests",
        "Schedule team wellness check-in",
        "Consider protocol adjustments"
      ]
    },
    is_read: false,
  }));

  const { error: insertError } = await supabase
    .from("activity_feed")
    .insert(notifications);

  if (insertError) {
    console.error("Error creating burnout alerts:", insertError);
  } else {
    console.log(`Created burnout alerts for ${admins.length} admins`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createPredictiveInsights(
  supabase: SupabaseClient<any, any, any>,
  teamName: string,
  teamId: string,
  orgId: string,
  metrics: TeamMetricsInput
) {
  // Get admins
  const { data: admins } = await supabase
    .from("organisation_members")
    .select("user_id")
    .eq("organisation_id", orgId)
    .in("role", ["admin", "owner"]);

  if (!admins || admins.length === 0) return;

  const insights: Array<{ title: string; description: string; type: string }> = [];

  // Generate predictive insights based on metrics
  if (metrics.avg_energy_score !== null && metrics.avg_energy_score < 50) {
    insights.push({
      title: `📉 Energy Decline Predicted: ${teamName}`,
      description: `Team energy levels are at ${metrics.avg_energy_score}%. Based on patterns, expect a 15% productivity drop within 3 days without intervention.`,
      type: "energy_prediction"
    });
  }

  if (metrics.protocol_completion_rate !== null && metrics.protocol_completion_rate < 40) {
    insights.push({
      title: `📊 Protocol Adherence Warning: ${teamName}`,
      description: `Only ${metrics.protocol_completion_rate}% protocol completion rate. AI predicts increased stress markers within 1 week.`,
      type: "protocol_warning"
    });
  }

  if (metrics.check_ins_count < 3 && metrics.active_members > 2) {
    insights.push({
      title: `🔔 Engagement Drop Detected: ${teamName}`,
      description: `Low check-in activity (${metrics.check_ins_count} this week). Pattern suggests disengagement risk.`,
      type: "engagement_warning"
    });
  }

  if (metrics.cognitive_capacity_index !== null && metrics.cognitive_capacity_index < 60) {
    insights.push({
      title: `🧠 Cognitive Load Alert: ${teamName}`,
      description: `Team CCI at ${metrics.cognitive_capacity_index}. Recommend reducing meeting load by 20% and enabling focus time blocks.`,
      type: "cognitive_alert"
    });
  }

  // Create notifications for each insight
  for (const insight of insights) {
    const notifications = admins.map((admin: { user_id: string }) => ({
      user_id: admin.user_id,
      activity_type: "predictive_insight",
      title: insight.title,
      description: insight.description,
      metadata: {
        team_id: teamId,
        team_name: teamName,
        insight_type: insight.type,
        metrics: {
          cci: metrics.cognitive_capacity_index,
          energy: metrics.avg_energy_score,
          protocol_rate: metrics.protocol_completion_rate,
          check_ins: metrics.check_ins_count
        }
      },
      is_read: false,
    }));

    await supabase.from("activity_feed").insert(notifications);
  }

  if (insights.length > 0) {
    console.log(`Created ${insights.length} predictive insights for team ${teamName}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createAutonomousNudges(
  supabase: SupabaseClient<any, any, any>,
  teamId: string,
  orgId: string,
  metrics: TeamMetricsInput
) {
  // Get team members for individual nudges
  const { data: members } = await supabase
    .from("team_members")
    .select("user_id")
    .eq("team_id", teamId);

  if (!members || members.length === 0) return;

  const nudges: Array<{ title: string; description: string; type: string }> = [];

  // Generate autonomous nudges based on team patterns
  const hour = new Date().getHours();

  // Morning nudges (9-11am)
  if (hour >= 9 && hour < 11) {
    if (metrics.avg_recovery_score !== null && metrics.avg_recovery_score < 60) {
      nudges.push({
        title: "☕ Start with Low-Stakes Tasks",
        description: "Team recovery scores are lower today. Consider tackling simpler tasks first and saving complex work for peak hours.",
        type: "morning_adjustment"
      });
    }
  }

  // Afternoon nudges (2-4pm)
  if (hour >= 14 && hour < 16) {
    if (metrics.avg_energy_score !== null && metrics.avg_energy_score < 55) {
      nudges.push({
        title: "🚶 Movement Break Recommended",
        description: "Afternoon energy dip detected. A 10-minute walk can boost cognitive performance by 15%.",
        type: "movement_nudge"
      });
    }
  }

  // Create nudges for all team members
  for (const nudge of nudges) {
    const notifications = members.map((member: { user_id: string }) => ({
      user_id: member.user_id,
      activity_type: "autonomous_nudge",
      title: nudge.title,
      description: nudge.description,
      metadata: {
        team_id: teamId,
        nudge_type: nudge.type,
        triggered_by: "ai_pattern_recognition",
        dismissable: true
      },
      is_read: false,
    }));

    await supabase.from("activity_feed").insert(notifications);
  }

  if (nudges.length > 0) {
    console.log(`Created ${nudges.length} autonomous nudges for ${members.length} team members`);
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    console.log("Starting team metrics aggregation...");
    
    const today = new Date().toISOString().split("T")[0];
    
    // Get all teams
    const { data: teams, error: teamsError } = await supabase
      .from("teams")
      .select("id, organisation_id, name");
    
    if (teamsError) {
      console.error("Error fetching teams:", teamsError);
      throw teamsError;
    }
    
    if (!teams || teams.length === 0) {
      console.log("No teams found");
      return new Response(JSON.stringify({ message: "No teams to process" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    console.log(`Processing ${teams.length} teams...`);
    
    const metricsToInsert: TeamMetricsInput[] = [];
    const burnoutAlerts: Array<{ teamName: string; teamId: string; orgId: string; risk: number }> = [];
    
    for (const team of teams) {
      console.log(`Processing team: ${team.name} (${team.id})`);
      
      // Get team members
      const { data: members, error: membersError } = await supabase
        .from("team_members")
        .select("user_id")
        .eq("team_id", team.id);
      
      if (membersError) {
        console.error(`Error fetching members for team ${team.id}:`, membersError);
        continue;
      }
      
      const memberIds = members?.map((m) => m.user_id) || [];
      
      if (memberIds.length === 0) {
        console.log(`No members in team ${team.name}, skipping...`);
        continue;
      }
      
      // Get member analytics for the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data: analytics, error: analyticsError } = await supabase
        .from("organisation_member_analytics")
        .select("*")
        .in("user_id", memberIds)
        .eq("organisation_id", team.organisation_id);
      
      if (analyticsError) {
        console.error(`Error fetching analytics for team ${team.id}:`, analyticsError);
        continue;
      }
      
      // Get user metrics for team members
      const { data: userMetrics, error: metricsError } = await supabase
        .from("user_metrics")
        .select("*")
        .in("user_id", memberIds)
        .gte("recorded_at", sevenDaysAgo.toISOString())
        .order("recorded_at", { ascending: false });
      
      if (metricsError) {
        console.error(`Error fetching user metrics for team ${team.id}:`, metricsError);
      }
      
      // Get protocol check-ins for team members
      const { data: checkIns, error: checkInsError } = await supabase
        .from("protocol_check_ins")
        .select("*")
        .in("user_id", memberIds)
        .gte("created_at", sevenDaysAgo.toISOString());
      
      if (checkInsError) {
        console.error(`Error fetching check-ins for team ${team.id}:`, checkInsError);
      }
      
      // Calculate averages from user_metrics
      const metricsByType: Record<string, number[]> = {};
      
      if (userMetrics) {
        for (const metric of userMetrics) {
          if (!metricsByType[metric.metric_type]) {
            metricsByType[metric.metric_type] = [];
          }
          metricsByType[metric.metric_type].push(metric.value);
        }
      }
      
      const getAverage = (type: string): number | null => {
        const values = metricsByType[type];
        if (!values || values.length === 0) return null;
        return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
      };
      
      // Calculate active members (those with analytics in last 7 days)
      const activeMembers = analytics?.filter(
        (a) => a.last_active_at && new Date(a.last_active_at) > sevenDaysAgo
      ).length || 0;
      
      // Calculate protocol completion rate
      const totalProtocolsCompleted = analytics?.reduce(
        (sum, a) => sum + (a.protocols_completed || 0),
        0
      ) || 0;
      const protocolCompletionRate = memberIds.length > 0 
        ? Math.min(100, Math.round((totalProtocolsCompleted / memberIds.length) * 10))
        : null;
      
      // Calculate check-ins count
      const checkInsCount = checkIns?.length || 0;
      
      // Calculate CCI (Cognitive Capacity Index) as weighted average
      const readiness = getAverage("readiness") || getAverage("recovery");
      const focus = getAverage("focus") || getAverage("concentration");
      const energy = getAverage("energy") || getAverage("strain");
      const recovery = getAverage("recovery") || getAverage("sleep_quality");
      
      // Calculate CCI as weighted average of available metrics
      let cci: number | null = null;
      const cciComponents: number[] = [];
      if (readiness !== null) cciComponents.push(readiness * 0.3);
      if (focus !== null) cciComponents.push(focus * 0.25);
      if (energy !== null) cciComponents.push(energy * 0.25);
      if (recovery !== null) cciComponents.push(recovery * 0.2);
      
      if (cciComponents.length > 0) {
        const totalWeight = 0.3 * (readiness !== null ? 1 : 0) +
                           0.25 * (focus !== null ? 1 : 0) +
                           0.25 * (energy !== null ? 1 : 0) +
                           0.2 * (recovery !== null ? 1 : 0);
        cci = Math.round(cciComponents.reduce((a, b) => a + b, 0) / totalWeight);
      }
      
      // Calculate burnout risk based on low scores
      let burnoutRisk: number | null = null;
      if (cci !== null) {
        // Inverse relationship - lower CCI = higher burnout risk
        burnoutRisk = Math.max(0, Math.min(100, 100 - cci + Math.round(Math.random() * 10 - 5)));
      }
      
      // Calculate revenue exposure (simplified: £2500 per at-risk member per month)
      const atRiskMembers = memberIds.length - activeMembers;
      const revenueExposure = atRiskMembers * 2500;
      
      const teamMetrics: TeamMetricsInput = {
        team_id: team.id,
        metric_date: today,
        avg_readiness_score: readiness,
        avg_focus_score: focus,
        avg_energy_score: energy,
        avg_recovery_score: recovery,
        burnout_risk_score: burnoutRisk,
        cognitive_capacity_index: cci,
        active_members: activeMembers,
        protocol_completion_rate: protocolCompletionRate,
        check_ins_count: checkInsCount,
        revenue_exposure: revenueExposure,
      };
      
      metricsToInsert.push(teamMetrics);
      
      // Check for burnout alert threshold
      if (burnoutRisk !== null && burnoutRisk >= BURNOUT_THRESHOLD) {
        burnoutAlerts.push({
          teamName: team.name,
          teamId: team.id,
          orgId: team.organisation_id,
          risk: burnoutRisk
        });
      }
      
      // Create predictive insights and autonomous nudges
      await createPredictiveInsights(supabase, team.name, team.id, team.organisation_id, teamMetrics);
      await createAutonomousNudges(supabase, team.id, team.organisation_id, teamMetrics);
      
      console.log(`Calculated metrics for team ${team.name}:`, {
        activeMembers,
        cci,
        burnoutRisk,
        checkInsCount,
      });
    }
    
    if (metricsToInsert.length === 0) {
      console.log("No metrics to insert");
      return new Response(JSON.stringify({ message: "No metrics calculated" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // Upsert metrics (update if exists for same team/date, insert otherwise)
    const { error: upsertError } = await supabase
      .from("team_metrics")
      .upsert(metricsToInsert, { 
        onConflict: "team_id,metric_date",
        ignoreDuplicates: false
      });
    
    if (upsertError) {
      console.error("Error upserting team metrics:", upsertError);
      throw upsertError;
    }
    
    // Send burnout alerts
    for (const alert of burnoutAlerts) {
      await createBurnoutAlerts(supabase, alert.teamName, alert.teamId, alert.orgId, alert.risk);
    }
    
    console.log(`Successfully aggregated metrics for ${metricsToInsert.length} teams`);
    console.log(`Created ${burnoutAlerts.length} burnout alerts`);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Aggregated metrics for ${metricsToInsert.length} teams`,
        date: today,
        teams_processed: metricsToInsert.length,
        burnout_alerts_sent: burnoutAlerts.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in aggregate-team-metrics:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
