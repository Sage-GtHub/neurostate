-- Create teams table for grouping organisation members
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organisation_id UUID NOT NULL REFERENCES public.organisations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#6366f1',
  icon TEXT DEFAULT 'users',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team_members junction table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Create team_interventions table for tracking wellness actions
CREATE TABLE public.team_interventions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organisation_id UUID NOT NULL REFERENCES public.organisations(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  intervention_type TEXT NOT NULL DEFAULT 'general',
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  impact_level TEXT DEFAULT 'medium',
  confidence_score INTEGER DEFAULT 75,
  estimated_value NUMERIC(10,2),
  actual_value NUMERIC(10,2),
  signal_change TEXT,
  ai_trace TEXT,
  created_by UUID REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team_metrics table for aggregated team performance data
CREATE TABLE public.team_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
  avg_readiness_score NUMERIC(5,2),
  avg_focus_score NUMERIC(5,2),
  avg_energy_score NUMERIC(5,2),
  avg_recovery_score NUMERIC(5,2),
  burnout_risk_score NUMERIC(5,2),
  cognitive_capacity_index NUMERIC(5,2),
  active_members INTEGER DEFAULT 0,
  protocol_completion_rate NUMERIC(5,2),
  check_ins_count INTEGER DEFAULT 0,
  revenue_exposure NUMERIC(12,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, metric_date)
);

-- Enable RLS on all tables
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for teams
CREATE POLICY "Organisation members can view teams"
  ON public.teams FOR SELECT
  USING (public.is_org_member(organisation_id, auth.uid()));

CREATE POLICY "Org admins can manage teams"
  ON public.teams FOR ALL
  USING (public.is_org_admin_or_owner(organisation_id, auth.uid()));

-- RLS Policies for team_members
CREATE POLICY "Organisation members can view team members"
  ON public.team_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id
      AND public.is_org_member(t.organisation_id, auth.uid())
    )
  );

CREATE POLICY "Org admins can manage team members"
  ON public.team_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id
      AND public.is_org_admin_or_owner(t.organisation_id, auth.uid())
    )
  );

-- RLS Policies for team_interventions
CREATE POLICY "Organisation members can view interventions"
  ON public.team_interventions FOR SELECT
  USING (public.is_org_member(organisation_id, auth.uid()));

CREATE POLICY "Org admins can manage interventions"
  ON public.team_interventions FOR INSERT
  WITH CHECK (public.is_org_admin_or_owner(organisation_id, auth.uid()));

CREATE POLICY "Org admins can update interventions"
  ON public.team_interventions FOR UPDATE
  USING (public.is_org_admin_or_owner(organisation_id, auth.uid()));

CREATE POLICY "Org admins can delete interventions"
  ON public.team_interventions FOR DELETE
  USING (public.is_org_admin_or_owner(organisation_id, auth.uid()));

-- RLS Policies for team_metrics
CREATE POLICY "Organisation members can view team metrics"
  ON public.team_metrics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id
      AND public.is_org_member(t.organisation_id, auth.uid())
    )
  );

CREATE POLICY "System can insert team metrics"
  ON public.team_metrics FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id
      AND public.is_org_admin_or_owner(t.organisation_id, auth.uid())
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_interventions_updated_at
  BEFORE UPDATE ON public.team_interventions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for team tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.teams;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_members;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_interventions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_metrics;

-- Set replica identity for better realtime
ALTER TABLE public.teams REPLICA IDENTITY FULL;
ALTER TABLE public.team_members REPLICA IDENTITY FULL;
ALTER TABLE public.team_interventions REPLICA IDENTITY FULL;
ALTER TABLE public.team_metrics REPLICA IDENTITY FULL;