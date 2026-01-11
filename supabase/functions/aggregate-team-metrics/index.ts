import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    
    console.log(`Successfully aggregated metrics for ${metricsToInsert.length} teams`);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Aggregated metrics for ${metricsToInsert.length} teams`,
        date: today,
        teams_processed: metricsToInsert.length,
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
