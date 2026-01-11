import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useOrganisation } from './useOrganisation';

export interface Team {
  id: string;
  organisation_id: string;
  name: string;
  description: string | null;
  color: string;
  icon: string;
  created_at: string;
  updated_at: string;
  member_count?: number;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: string;
  joined_at: string;
  profile?: {
    full_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
}

export interface TeamIntervention {
  id: string;
  organisation_id: string;
  team_id: string | null;
  title: string;
  description: string | null;
  intervention_type: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  impact_level: 'low' | 'medium' | 'high';
  confidence_score: number;
  estimated_value: number | null;
  actual_value: number | null;
  signal_change: string | null;
  ai_trace: string | null;
  created_by: string | null;
  assigned_to: string | null;
  started_at: string | null;
  completed_at: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  team?: Team;
  assignee?: { full_name: string | null; email: string | null };
}

export interface TeamMetrics {
  id: string;
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

export interface AggregatedMetrics {
  totalMembers: number;
  activeMembers: number;
  avgCCI: number;
  avgReadiness: number;
  avgFocus: number;
  avgEnergy: number;
  avgRecovery: number;
  avgBurnoutRisk: number;
  totalRevenueExposure: number;
  protocolCompletionRate: number;
  totalCheckIns: number;
}

export function useTeamDashboard() {
  const { organisation, members: orgMembers, analytics: memberAnalytics, isAdmin, loading: orgLoading } = useOrganisation();
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [interventions, setInterventions] = useState<TeamIntervention[]>([]);
  const [teamMetrics, setTeamMetrics] = useState<TeamMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch teams
  const fetchTeams = useCallback(async () => {
    if (!organisation) return;

    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('organisation_id', organisation.id)
      .order('name');

    if (error) {
      console.error('Error fetching teams:', error);
      return;
    }

    // Get member counts
    const teamsWithCounts = await Promise.all(
      (data || []).map(async (team) => {
        const { count } = await supabase
          .from('team_members')
          .select('*', { count: 'exact', head: true })
          .eq('team_id', team.id);
        
        return { ...team, member_count: count || 0 };
      })
    );

    setTeams(teamsWithCounts);
  }, [organisation]);

  // Fetch team members
  const fetchTeamMembers = useCallback(async () => {
    if (!organisation || teams.length === 0) return;

    const teamIds = teams.map(t => t.id);
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .in('team_id', teamIds);

    if (error) {
      console.error('Error fetching team members:', error);
      return;
    }

    // Fetch profiles for members
    if (data && data.length > 0) {
      const userIds = [...new Set(data.map(m => m.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url')
        .in('id', userIds);

      const membersWithProfiles = data.map(member => ({
        ...member,
        profile: profiles?.find(p => p.id === member.user_id)
      }));

      setTeamMembers(membersWithProfiles);
    } else {
      setTeamMembers([]);
    }
  }, [organisation, teams]);

  // Fetch interventions
  const fetchInterventions = useCallback(async () => {
    if (!organisation) return;

    const { data, error } = await supabase
      .from('team_interventions')
      .select('*')
      .eq('organisation_id', organisation.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching interventions:', error);
      return;
    }

    // Enrich with team and assignee info
    const enriched = await Promise.all(
      (data || []).map(async (intervention) => {
        const team = teams.find(t => t.id === intervention.team_id);
        let assignee = null;
        
        if (intervention.assigned_to) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', intervention.assigned_to)
            .single();
          assignee = profile;
        }

        return { 
          ...intervention, 
          team,
          assignee,
          status: intervention.status as TeamIntervention['status'],
          priority: intervention.priority as TeamIntervention['priority'],
          impact_level: intervention.impact_level as TeamIntervention['impact_level'],
        };
      })
    );

    setInterventions(enriched);
  }, [organisation, teams]);

  // Fetch team metrics
  const fetchTeamMetrics = useCallback(async () => {
    if (!organisation || teams.length === 0) return;

    const teamIds = teams.map(t => t.id);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabase
      .from('team_metrics')
      .select('*')
      .in('team_id', teamIds)
      .gte('metric_date', thirtyDaysAgo.toISOString().split('T')[0])
      .order('metric_date', { ascending: false });

    if (error) {
      console.error('Error fetching team metrics:', error);
      return;
    }

    setTeamMetrics(data || []);
  }, [organisation, teams]);

  // Create a new team
  const createTeam = async (name: string, description?: string, color?: string) => {
    if (!organisation) throw new Error('No organisation');

    const { data, error } = await supabase
      .from('teams')
      .insert({
        organisation_id: organisation.id,
        name,
        description,
        color: color || '#6366f1'
      })
      .select()
      .single();

    if (error) throw error;

    await fetchTeams();
    toast({ title: 'Team created successfully' });
    return data;
  };

  // Update team
  const updateTeam = async (teamId: string, updates: Partial<Team>) => {
    const { error } = await supabase
      .from('teams')
      .update(updates)
      .eq('id', teamId);

    if (error) throw error;

    await fetchTeams();
    toast({ title: 'Team updated' });
  };

  // Delete team
  const deleteTeam = async (teamId: string) => {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', teamId);

    if (error) throw error;

    await fetchTeams();
    toast({ title: 'Team deleted' });
  };

  // Add member to team
  const addTeamMember = async (teamId: string, userId: string, role = 'member') => {
    const { error } = await supabase
      .from('team_members')
      .insert({ team_id: teamId, user_id: userId, role });

    if (error) throw error;

    await fetchTeamMembers();
    await fetchTeams();
    toast({ title: 'Member added to team' });
  };

  // Remove member from team
  const removeTeamMember = async (teamMemberId: string) => {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', teamMemberId);

    if (error) throw error;

    await fetchTeamMembers();
    await fetchTeams();
    toast({ title: 'Member removed from team' });
  };

  // Create intervention
  const createIntervention = async (intervention: Partial<TeamIntervention>) => {
    if (!organisation) throw new Error('No organisation');
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('team_interventions')
      .insert({
        organisation_id: organisation.id,
        team_id: intervention.team_id,
        title: intervention.title || 'New Intervention',
        description: intervention.description,
        intervention_type: intervention.intervention_type || 'general',
        priority: intervention.priority || 'medium',
        impact_level: intervention.impact_level || 'medium',
        confidence_score: intervention.confidence_score || 75,
        estimated_value: intervention.estimated_value,
        ai_trace: intervention.ai_trace,
        created_by: user?.id,
        assigned_to: intervention.assigned_to,
        due_date: intervention.due_date
      })
      .select()
      .single();

    if (error) throw error;

    await fetchInterventions();
    toast({ title: 'Intervention created' });
    return data;
  };

  // Update intervention
  const updateIntervention = async (interventionId: string, updates: Partial<TeamIntervention>) => {
    const updateData: Record<string, unknown> = { ...updates };
    
    if (updates.status === 'in_progress' && !updates.started_at) {
      updateData.started_at = new Date().toISOString();
    }
    if (updates.status === 'completed' && !updates.completed_at) {
      updateData.completed_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('team_interventions')
      .update(updateData)
      .eq('id', interventionId);

    if (error) throw error;

    await fetchInterventions();
    toast({ title: 'Intervention updated' });
  };

  // Delete intervention
  const deleteIntervention = async (interventionId: string) => {
    const { error } = await supabase
      .from('team_interventions')
      .delete()
      .eq('id', interventionId);

    if (error) throw error;

    await fetchInterventions();
    toast({ title: 'Intervention deleted' });
  };

  // Record team metrics (for aggregation)
  const recordTeamMetrics = async (teamId: string, metrics: Partial<TeamMetrics>) => {
    const today = new Date().toISOString().split('T')[0];
    
    const { error } = await supabase
      .from('team_metrics')
      .upsert({
        team_id: teamId,
        metric_date: today,
        ...metrics
      }, { onConflict: 'team_id,metric_date' });

    if (error) throw error;

    await fetchTeamMetrics();
  };

  // Calculate aggregated metrics
  const getAggregatedMetrics = useCallback((): AggregatedMetrics => {
    const latestMetrics = teams.map(team => {
      const teamMetric = teamMetrics
        .filter(m => m.team_id === team.id)
        .sort((a, b) => new Date(b.metric_date).getTime() - new Date(a.metric_date).getTime())[0];
      return teamMetric;
    }).filter(Boolean);

    const totalMembers = orgMembers.length;
    const activeMembers = memberAnalytics.filter(
      a => a.last_active_at && new Date(a.last_active_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;

    if (latestMetrics.length === 0) {
      return {
        totalMembers,
        activeMembers,
        avgCCI: 0,
        avgReadiness: 0,
        avgFocus: 0,
        avgEnergy: 0,
        avgRecovery: 0,
        avgBurnoutRisk: 0,
        totalRevenueExposure: 0,
        protocolCompletionRate: 0,
        totalCheckIns: memberAnalytics.reduce((sum, a) => sum + (a.check_ins_count || 0), 0)
      };
    }

    const avg = (field: keyof TeamMetrics) => {
      const values = latestMetrics.map(m => m?.[field] as number | null).filter((v): v is number => v !== null);
      return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    };

    return {
      totalMembers,
      activeMembers,
      avgCCI: avg('cognitive_capacity_index'),
      avgReadiness: avg('avg_readiness_score'),
      avgFocus: avg('avg_focus_score'),
      avgEnergy: avg('avg_energy_score'),
      avgRecovery: avg('avg_recovery_score'),
      avgBurnoutRisk: avg('burnout_risk_score'),
      totalRevenueExposure: latestMetrics.reduce((sum, m) => sum + (Number(m?.revenue_exposure) || 0), 0),
      protocolCompletionRate: avg('protocol_completion_rate'),
      totalCheckIns: latestMetrics.reduce((sum, m) => sum + (m?.check_ins_count || 0), 0)
    };
  }, [teams, teamMetrics, orgMembers, memberAnalytics]);

  // Get team-specific metrics
  const getTeamMetrics = useCallback((teamId: string) => {
    return teamMetrics
      .filter(m => m.team_id === teamId)
      .sort((a, b) => new Date(b.metric_date).getTime() - new Date(a.metric_date).getTime());
  }, [teamMetrics]);

  // Get team burnout risk rankings
  const getTeamBurnoutRankings = useCallback(() => {
    return teams.map(team => {
      const latestMetric = teamMetrics
        .filter(m => m.team_id === team.id)
        .sort((a, b) => new Date(b.metric_date).getTime() - new Date(a.metric_date).getTime())[0];

      return {
        team,
        burnoutRisk: latestMetric?.burnout_risk_score || 0,
        revenueExposure: latestMetric?.revenue_exposure || 0,
        memberCount: team.member_count || 0
      };
    }).sort((a, b) => b.burnoutRisk - a.burnoutRisk);
  }, [teams, teamMetrics]);

  // Setup realtime subscriptions
  useEffect(() => {
    if (!organisation) return;

    const teamsChannel = supabase
      .channel('teams-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teams' }, () => fetchTeams())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_members' }, () => fetchTeamMembers())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_interventions' }, () => fetchInterventions())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team_metrics' }, () => fetchTeamMetrics())
      .subscribe();

    return () => {
      supabase.removeChannel(teamsChannel);
    };
  }, [organisation, fetchTeams, fetchTeamMembers, fetchInterventions, fetchTeamMetrics]);

  // Initial data fetch
  useEffect(() => {
    if (orgLoading) return;
    
    const loadData = async () => {
      setLoading(true);
      await fetchTeams();
      setLoading(false);
    };
    
    loadData();
  }, [orgLoading, fetchTeams]);

  // Fetch dependent data when teams change
  useEffect(() => {
    if (teams.length > 0) {
      fetchTeamMembers();
      fetchInterventions();
      fetchTeamMetrics();
    }
  }, [teams.length, fetchTeamMembers, fetchInterventions, fetchTeamMetrics]);

  return {
    // Organisation data
    organisation,
    orgMembers,
    memberAnalytics,
    isAdmin,
    
    // Team data
    teams,
    teamMembers,
    interventions,
    teamMetrics,
    loading: loading || orgLoading,
    
    // Team actions
    createTeam,
    updateTeam,
    deleteTeam,
    addTeamMember,
    removeTeamMember,
    
    // Intervention actions
    createIntervention,
    updateIntervention,
    deleteIntervention,
    
    // Metrics
    recordTeamMetrics,
    getAggregatedMetrics,
    getTeamMetrics,
    getTeamBurnoutRankings,
    
    // Refetch
    refetch: fetchTeams
  };
}