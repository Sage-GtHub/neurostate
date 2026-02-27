import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Activity,
  Brain,
  Zap,
  Calendar,
  ChevronRight,
  ChevronDown,
  Filter,
  RefreshCw,
  Info,
  Shield,
  Target,
  Clock,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  Building2,
  Settings,
  Eye,
  Lock,
  DollarSign,
  Gauge,
  PoundSterling,
  LineChart,
  Lightbulb,
  CheckCircle2,
  MapPin,
  Briefcase,
  Plus,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';
import { TeamBreakdownModal, InsightTraceModal, FinancialBreakdownModal } from '@/components/DashboardModals';
import { OnboardingWizard } from '@/components/onboarding';
import { useOnboardingWizard } from '@/hooks/useOnboardingWizard';
import { useTeamDashboard } from '@/hooks/useTeamDashboard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { IntelligentAlerts } from '@/components/nova/IntelligentAlerts';
import { AutonomousNudgePanel } from '@/components/nova/AutonomousNudgePanel';
import { MeetingLoadOptimiser } from '@/components/nova/MeetingLoadOptimiser';
import { InterventionROITracker } from '@/components/nova/InterventionROITracker';

// Format currency helper
const formatCurrency = (value: number, abbreviated = false): string => {
  if (abbreviated) {
    if (value >= 1000000) return `£${(value / 1000000).toFixed(1)}m`;
    if (value >= 1000) return `£${(value / 1000).toFixed(0)}k`;
    return `£${value}`;
  }
  return `£${value.toLocaleString()}`;
};

export default function TeamDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('all');
  const [selectedFunction, setSelectedFunction] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [comparisonPeriod, setComparisonPeriod] = useState<'week' | 'month'>('week');
  const [expandedIntervention, setExpandedIntervention] = useState<string | null>(null);
  const [forecastPeriod, setForecastPeriod] = useState<7 | 14 | 30>(7);
  const [showInsightTrace, setShowInsightTrace] = useState(false);
  
  // Modal states
  const [selectedTeamForModal, setSelectedTeamForModal] = useState<any>(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showFinancialModal, setShowFinancialModal] = useState(false);
  const [showInsightModal, setShowInsightModal] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<any>(null);
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false);
  const [showCreateInterventionDialog, setShowCreateInterventionDialog] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  const [newInterventionTitle, setNewInterventionTitle] = useState('');
  const [newInterventionTeam, setNewInterventionTeam] = useState('');
  const [newInterventionPriority, setNewInterventionPriority] = useState<'low' | 'medium' | 'high'>('medium');
  
  // Onboarding wizard
  const { showOnboarding, completeOnboarding } = useOnboardingWizard();
  
  // Real team dashboard data
  const {
    organisation,
    orgMembers,
    memberAnalytics,
    isAdmin,
    teams,
    teamMembers,
    interventions: realInterventions,
    teamMetrics,
    loading: dashboardLoading,
    createTeam,
    updateTeam,
    deleteTeam,
    addTeamMember,
    removeTeamMember,
    createIntervention,
    updateIntervention,
    deleteIntervention,
    getAggregatedMetrics,
    getTeamBurnoutRankings,
    refetch
  } = useTeamDashboard();

  // ─── Real Computed Metrics ──────────────────────────────────────────
  const aggregatedMetrics = useMemo(() => getAggregatedMetrics(), [getAggregatedMetrics]);
  const teamBurnoutRankings = useMemo(() => getTeamBurnoutRankings(), [getTeamBurnoutRankings]);

  const displayInterventions = useMemo(() => {
    return realInterventions.map(intervention => ({
      id: intervention.id,
      title: intervention.title,
      team: intervention.team?.name || 'Organisation',
      impact: intervention.impact_level,
      confidence: intervention.confidence_score,
      estimatedValue: Number(intervention.estimated_value) || 0,
      trace: intervention.ai_trace || 'Nova AI analysis pending...',
      status: intervention.status
    }));
  }, [realInterventions]);

  const pendingInterventionsCount = useMemo(() =>
    realInterventions.filter(i => i.status === 'pending' || i.status === 'in_progress').length
  , [realInterventions]);

  // Executive Intelligence Metrics — derived from real data
  const executiveMetrics = useMemo(() => {
    const cciCurrent = Math.round(aggregatedMetrics.avgCCI) || 0;
    const weeklyExposure = Math.round(aggregatedMetrics.totalRevenueExposure) || 0;
    const atRiskTeams = teamBurnoutRankings.filter(t => Number(t.burnoutRisk) > 40).length;
    return {
      cci: {
        current: cciCurrent,
        trend: 'up' as const,
        change: 0,
        breakdown: {
          energy: Math.round(aggregatedMetrics.avgEnergy) || 0,
          focus: Math.round(aggregatedMetrics.avgFocus) || 0,
          recovery: Math.round(aggregatedMetrics.avgRecovery) || 0,
          stressVolatility: 0,
          burnoutRisk: Math.round(aggregatedMetrics.avgBurnoutRisk) || 0,
        }
      },
      revenueExposure: {
        weekly: weeklyExposure,
        daily: Math.round(weeklyExposure / 7),
        trend: 'down' as const,
        change: 0,
      },
      burnoutExposure: {
        projected: weeklyExposure * 26,
        timeframe: '6 months',
        teamsAtRisk: atRiskTeams,
      }
    };
  }, [aggregatedMetrics, teamBurnoutRankings]);

  // Adoption metrics from real data
  const adoptionMetrics = useMemo(() => {
    const activeInLast7Days = memberAnalytics.filter(
      a => a.last_active_at && new Date(a.last_active_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;
    return {
      dau: { value: activeInLast7Days, change: 0, trend: 'up' as const },
      wat: { value: teams.length, change: 0, trend: 'up' as const },
      coverageRate: { value: orgMembers.length > 0 ? Math.round((activeInLast7Days / orgMembers.length) * 100) : 0, change: 0, trend: 'up' as const },
      interventionAdoption: { value: realInterventions.filter(i => i.status === 'completed').length, change: 0, trend: 'up' as const }
    };
  }, [memberAnalytics, teams, orgMembers, realInterventions]);

  // Team readiness from real data
  const teamReadinessData = useMemo(() => {
    const readiness = Math.round(aggregatedMetrics.avgReadiness) || 0;
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const forecast = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayMetrics = teamMetrics.filter(m => new Date(m.metric_date).getDay() === d.getDay());
      const avg = dayMetrics.length > 0
        ? Math.round(dayMetrics.reduce((s, m) => s + (Number(m.avg_readiness_score) || 0), 0) / dayMetrics.length)
        : readiness;
      return {
        day: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayLabels[d.getDay()],
        score: avg,
        risk: avg > 70 ? 'low' : avg > 50 ? 'medium' : 'high',
      };
    });
    return { current: readiness, trend: 'up' as const, change: 0, forecast };
  }, [aggregatedMetrics, teamMetrics]);

  // Burnout risk by team from real data
  const burnoutRiskByTeam = useMemo(() => {
    return teamBurnoutRankings.map(r => ({
      team: r.team.name,
      risk: Math.round(Number(r.burnoutRisk)) || 0,
      trend: (Math.round(Number(r.burnoutRisk)) > 40 ? 'up' : Math.round(Number(r.burnoutRisk)) < 25 ? 'down' : 'stable') as 'up' | 'down' | 'stable',
      members: r.memberCount,
      exposure: Math.round(Number(r.revenueExposure)) || 0,
    }));
  }, [teamBurnoutRankings]);

  // Weekly focus & fatigue patterns from team_metrics
  const weeklyPatterns = useMemo(() => {
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return [1, 2, 3, 4, 5].map(dayIdx => {
      const dayMetrics = teamMetrics.filter(m => new Date(m.metric_date).getDay() === dayIdx);
      const avgFocus = dayMetrics.length > 0
        ? Math.round(dayMetrics.reduce((s, m) => s + (Number(m.avg_focus_score) || 0), 0) / dayMetrics.length) : 0;
      const avgEnergy = dayMetrics.length > 0
        ? Math.round(dayMetrics.reduce((s, m) => s + (Number(m.avg_energy_score) || 0), 0) / dayMetrics.length) : 0;
      return {
        day: dayLabels[dayIdx],
        focus: avgFocus,
        fatigue: avgEnergy > 0 ? Math.max(0, 100 - avgEnergy) : 0,
        optimal: avgFocus > 0 ? Math.round((avgFocus / 100) * 8 * 10) / 10 : 0,
      };
    });
  }, [teamMetrics]);

  // Intervention effectiveness from completed interventions
  const interventionEffectiveness = useMemo(() => {
    return realInterventions
      .filter(i => i.status === 'completed' || i.status === 'in_progress')
      .slice(0, 5)
      .map(i => ({
        id: i.id,
        action: i.title,
        team: i.team?.name || 'Organisation',
        signalChange: i.signal_change || 'Measuring...',
        valueRecovered: Number(i.actual_value) || Number(i.estimated_value) || 0,
        timeframe: i.started_at && i.completed_at
          ? `${Math.round((new Date(i.completed_at).getTime() - new Date(i.started_at).getTime()) / (1000 * 60 * 60 * 24))} days`
          : 'In progress',
        status: i.status,
      }));
  }, [realInterventions]);

  // Trend comparisons from team_metrics history
  const trendComparisons = useMemo(() => {
    const now = Date.now();
    const ms = (d: number) => d * 86400000;
    const avgPeriod = (startAgo: number, endAgo: number, getter: (m: typeof teamMetrics[0]) => number | null) => {
      const filtered = teamMetrics.filter(m => {
        const t = new Date(m.metric_date).getTime();
        return t >= now - ms(startAgo) && t < now - ms(endAgo);
      });
      if (filtered.length === 0) return 0;
      return Math.round(filtered.reduce((s, m) => s + (Number(getter(m)) || 0), 0) / filtered.length);
    };
    const pctChange = (current: number, previous: number) =>
      previous > 0 ? Math.round(((current - previous) / previous) * 1000) / 10 : 0;
    const makeComp = (s1: number, e1: number, s2: number, e2: number) => {
      const rC = avgPeriod(s1, e1, m => m.avg_readiness_score);
      const rP = avgPeriod(s2, e2, m => m.avg_readiness_score);
      const bC = avgPeriod(s1, e1, m => m.burnout_risk_score);
      const bP = avgPeriod(s2, e2, m => m.burnout_risk_score);
      const fC = avgPeriod(s1, e1, m => m.avg_focus_score);
      const fP = avgPeriod(s2, e2, m => m.avg_focus_score);
      return {
        readiness: { current: rC, previous: rP, change: pctChange(rC, rP) },
        burnout: { current: bC, previous: bP, change: pctChange(bC, bP) },
        focus: { current: fC, previous: fP, change: pctChange(fC, fP) },
      };
    };
    return {
      weekOverWeek: makeComp(7, 0, 14, 7),
      monthOverMonth: makeComp(30, 0, 60, 30),
    };
  }, [teamMetrics]);

  // Nova forecasts from current trends
  const novaForecasts = useMemo(() => {
    const avgCCI = aggregatedMetrics.avgCCI || 0;
    const exposure = aggregatedMetrics.totalRevenueExposure || 0;
    return {
      days7: { capacity: Math.round(avgCCI * 0.97), revenueAtRisk: Math.round(exposure) },
      days14: { capacity: Math.round(avgCCI * 0.94), revenueAtRisk: Math.round(exposure * 1.4) },
      days30: { capacity: Math.round(avgCCI * 0.90), revenueAtRisk: Math.round(exposure * 2.3) },
      scenarios: [] as { name: string; impact: number; riskIncrease?: number; riskDecrease?: number }[],
    };
  }, [aggregatedMetrics]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUser(user);
      setAuthLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) return;
    try {
      await createTeam(newTeamName, newTeamDescription);
      setNewTeamName('');
      setNewTeamDescription('');
      setShowCreateTeamDialog(false);
    } catch (error) {
      toast({ title: 'Error creating team', variant: 'destructive' });
    }
  };

  const handleCreateIntervention = async () => {
    if (!newInterventionTitle.trim()) return;
    try {
      await createIntervention({
        title: newInterventionTitle,
        team_id: newInterventionTeam || undefined,
        priority: newInterventionPriority,
        impact_level: newInterventionPriority === 'high' ? 'high' : 'medium',
        confidence_score: 75,
        ai_trace: 'Manually created intervention'
      });
      setNewInterventionTitle('');
      setNewInterventionTeam('');
      setShowCreateInterventionDialog(false);
    } catch (error) {
      toast({ title: 'Error creating intervention', variant: 'destructive' });
    }
  };

  const handleApplyIntervention = async (interventionId: string) => {
    try {
      await updateIntervention(interventionId, { status: 'in_progress' });
    } catch (error) {
      toast({ title: 'Error applying intervention', variant: 'destructive' });
    }
  };

  const handleCompleteIntervention = async (interventionId: string) => {
    try {
      await updateIntervention(interventionId, { status: 'completed' });
    } catch (error) {
      toast({ title: 'Error completing intervention', variant: 'destructive' });
    }
  };

  const loading = authLoading || dashboardLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-foreground/20" />
      </div>
    );
  }

  const comparison = comparisonPeriod === 'week' ? trendComparisons.weekOverWeek : trendComparisons.monthOverMonth;
  const currentForecast = forecastPeriod === 7 ? novaForecasts.days7 : forecastPeriod === 14 ? novaForecasts.days14 : novaForecasts.days30;

  return (
    <>
      {/* Onboarding Wizard for new users */}
      <OnboardingWizard open={showOnboarding} onComplete={completeOnboarding} />
      <SEO 
        title="Team Dashboard | NeuroState Nova"
        description="Enterprise-grade cognitive performance analytics for your organisation."
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Executive Intelligence Strip - Sticky on Desktop, scrollable on Mobile */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-3 md:py-4">
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-1 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:overflow-visible">
              {/* CCI Score */}
              <motion.div 
                className="p-3 md:p-4 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 min-w-[260px] sm:min-w-0 snap-start"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-primary font-medium">CCI Score</span>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm text-xs p-3">
                      <p className="font-medium mb-1">Live Cognitive Capacity Index</p>
                      <p className="text-muted-foreground">Usable cognitive capacity derived from energy, focus, recovery, stress volatility, and burnout risk.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-end gap-2 md:gap-3">
                  <span className="text-2xl md:text-3xl font-semibold text-foreground">{executiveMetrics.cci.current}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground mb-1">/ 100</span>
                  <div className={`flex items-center text-[10px] md:text-xs mb-1 ml-auto ${executiveMetrics.cci.trend === 'up' ? 'text-signal-green' : 'text-destructive'}`}>
                    {executiveMetrics.cci.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {executiveMetrics.cci.change > 0 ? '+' : ''}{executiveMetrics.cci.change}%
                  </div>
                </div>
                <Progress value={executiveMetrics.cci.current} className="h-1 md:h-1.5 mt-2" />
              </motion.div>

              {/* Live Cognitive Revenue Exposure */}
              <motion.div 
                className="p-3 md:p-4 rounded-lg bg-muted/30 border border-border/50 min-w-[260px] sm:min-w-0 snap-start"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <PoundSterling className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500" />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Revenue Exposure</span>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm text-xs p-3">
                      <p className="font-medium mb-1">Estimated Revenue at Risk</p>
                      <p className="text-muted-foreground">Real-time financial loss driven by current cognitive underperformance.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-xl md:text-2xl font-semibold text-amber-500">{formatCurrency(executiveMetrics.revenueExposure.weekly)}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground mb-1">/ week</span>
                </div>
                <div className={`flex items-center text-[10px] md:text-xs mt-1 ${executiveMetrics.revenueExposure.trend === 'down' ? 'text-signal-green' : 'text-destructive'}`}>
                  {executiveMetrics.revenueExposure.trend === 'down' ? <TrendingDown className="w-3 h-3 mr-0.5" /> : <TrendingUp className="w-3 h-3 mr-0.5" />}
                  {executiveMetrics.revenueExposure.change}% vs last week
                </div>
              </motion.div>

              {/* Burnout Risk Exposure */}
              <motion.div 
                className="p-3 md:p-4 rounded-lg bg-muted/30 border border-border/50 min-w-[260px] sm:min-w-0 snap-start sm:col-span-2 md:col-span-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 md:w-4 md:h-4 text-destructive" />
                    <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Burnout Exposure</span>
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm text-xs p-3">
                      <p className="font-medium mb-1">Projected 6-Month Exposure</p>
                      <p className="text-muted-foreground">Aggregated projected cost from turnover and underperformance.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-xl md:text-2xl font-semibold text-destructive">{formatCurrency(executiveMetrics.burnoutExposure.projected, true)}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground mb-1">projected</span>
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground mt-1">
                  {executiveMetrics.burnoutExposure.teamsAtRisk} teams require attention
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <main className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header with Filters */}
            <div className="flex flex-col gap-4 mb-6 md:mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Nova Intelligence</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-foreground">Team Dashboard</h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Cognitive performance analytics · Last updated 2 min ago</p>
              </div>
              
              {/* Filters - Scrollable on mobile */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="h-8 md:h-9 w-[100px] md:w-[120px] text-[10px] md:text-xs rounded-lg border-border/50 flex-shrink-0">
                    <Clock className="w-3 h-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="14d">Last 14 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedTeamFilter} onValueChange={setSelectedTeamFilter}>
                  <SelectTrigger className="h-8 md:h-9 w-[110px] md:w-[130px] text-[10px] md:text-xs rounded-lg border-border/50 flex-shrink-0">
                    <Users className="w-3 h-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    {teams.map(team => (
                      <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                  <SelectTrigger className="h-8 md:h-9 w-[100px] md:w-[130px] text-[10px] md:text-xs rounded-lg border-border/50 flex-shrink-0 hidden sm:flex">
                    <Briefcase className="w-3 h-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="ic">Individual Contributors</SelectItem>
                    <SelectItem value="managers">Managers</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="h-8 md:h-9 w-[100px] md:w-[130px] text-[10px] md:text-xs rounded-lg border-border/50 flex-shrink-0 hidden sm:flex">
                    <MapPin className="w-3 h-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 ml-auto flex-shrink-0">
                  <Button variant="outline" size="sm" className="h-8 md:h-9 px-2 md:px-3 rounded-lg text-[10px] md:text-xs" onClick={() => refetch()}>
                    <RefreshCw className="w-3 h-3 md:mr-2" />
                    <span className="hidden md:inline">Refresh</span>
                  </Button>
                  <Link to="/team/settings/members">
                    <Button variant="outline" size="sm" className="h-8 md:h-9 px-2 md:px-3 rounded-lg text-[10px] md:text-xs">
                      <Settings className="w-3 h-3 md:mr-2" />
                      <span className="hidden md:inline">Settings</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* System Adoption & Coverage Module */}
            <motion.div 
              className="mb-6 md:mb-8 p-4 md:p-6 rounded-lg bg-muted/20 border border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-foreground">System Adoption & Coverage</h3>
                  <p className="text-[9px] md:text-[10px] text-muted-foreground mt-0.5">Real-time platform engagement</p>
                </div>
                <Badge variant="outline" className="text-[8px] md:text-[9px]">Live</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                <div className="p-3 md:p-4 rounded-lg bg-background border border-border/30">
                  <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Daily Active</div>
                  <div className="text-lg md:text-2xl font-semibold text-foreground">{adoptionMetrics.dau.value}</div>
                  <div className={`text-[10px] md:text-xs mt-1 ${adoptionMetrics.dau.trend === 'up' ? 'text-signal-green' : 'text-destructive'}`}>
                    +{adoptionMetrics.dau.change}%
                  </div>
                </div>
                <div className="p-3 md:p-4 rounded-lg bg-background border border-border/30">
                  <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Active Teams</div>
                  <div className="text-lg md:text-2xl font-semibold text-foreground">{adoptionMetrics.wat.value}</div>
                  <div className={`text-[10px] md:text-xs mt-1 ${adoptionMetrics.wat.trend === 'up' ? 'text-signal-green' : 'text-destructive'}`}>
                    +{adoptionMetrics.wat.change}%
                  </div>
                </div>
                <div className="p-3 md:p-4 rounded-lg bg-background border border-border/30">
                  <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Coverage</div>
                  <div className="text-lg md:text-2xl font-semibold text-foreground">{adoptionMetrics.coverageRate.value}%</div>
                  <div className={`text-[10px] md:text-xs mt-1 ${adoptionMetrics.coverageRate.trend === 'up' ? 'text-signal-green' : 'text-destructive'}`}>
                    +{adoptionMetrics.coverageRate.change}%
                  </div>
                </div>
                <div className="p-3 md:p-4 rounded-lg bg-background border border-border/30">
                  <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Adoption</div>
                  <div className="text-lg md:text-2xl font-semibold text-foreground">{adoptionMetrics.interventionAdoption.value}%</div>
                  <div className={`text-[10px] md:text-xs mt-1 ${adoptionMetrics.interventionAdoption.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                    +{adoptionMetrics.interventionAdoption.change}%
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              {/* Team Readiness */}
              <motion.div 
                className="p-3 md:p-5 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-primary font-medium">Readiness</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 md:w-3.5 md:h-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">
                      Aggregate cognitive capacity score across all team members.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl md:text-3xl font-semibold text-foreground">{teamReadinessData.current}</span>
                  <div className={`flex items-center text-[10px] md:text-xs mb-1 ${teamReadinessData.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                    {teamReadinessData.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {teamReadinessData.change}%
                  </div>
                </div>
                <Progress value={teamReadinessData.current} className="h-1 md:h-1.5 mt-2 md:mt-3" />
              </motion.div>

              {/* Burnout Risk */}
              <motion.div 
                className="p-3 md:p-5 rounded-lg bg-muted/30 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Burnout</span>
                  <AlertTriangle className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-500" />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl md:text-3xl font-semibold text-foreground">{Math.round(aggregatedMetrics.avgBurnoutRisk)}%</span>
                  <div className={`flex items-center text-[10px] md:text-xs mb-1 ${trendComparisons.weekOverWeek.burnout.change <= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {trendComparisons.weekOverWeek.burnout.change <= 0 ? <TrendingDown className="w-3 h-3 mr-0.5" /> : <TrendingUp className="w-3 h-3 mr-0.5" />}
                    {Math.abs(trendComparisons.weekOverWeek.burnout.change)}%
                  </div>
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mt-1 md:mt-2">{executiveMetrics.burnoutExposure.teamsAtRisk} teams at risk</p>
              </motion.div>

              {/* Focus Score */}
              <motion.div 
                className="p-3 md:p-5 rounded-lg bg-muted/30 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Focus</span>
                  <Brain className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary" />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl md:text-3xl font-semibold text-foreground">{Math.round(aggregatedMetrics.avgFocus)}</span>
                  <div className={`flex items-center text-[10px] md:text-xs mb-1 ${trendComparisons.weekOverWeek.focus.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {trendComparisons.weekOverWeek.focus.change >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {Math.abs(trendComparisons.weekOverWeek.focus.change)}%
                  </div>
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mt-1 md:mt-2">Avg across teams</p>
              </motion.div>

              {/* Active Interventions */}
              <motion.div 
                className="p-3 md:p-5 rounded-lg bg-muted/30 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Actions</span>
                  <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent" />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl md:text-3xl font-semibold text-foreground">{pendingInterventionsCount}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground mb-1">pending</span>
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mt-1 md:mt-2">Est: {formatCurrency(displayInterventions.reduce((s, i) => s + i.estimatedValue, 0))}</p>
              </motion.div>
            </div>

            {/* Financial Attribution Alert */}
            <motion.div 
              className="mb-6 md:mb-8 p-3 md:p-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 cursor-pointer hover:border-amber-500/40 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setShowFinancialModal(true)}
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs md:text-sm font-medium text-foreground">Financial Attribution</h4>
                    <Badge variant="outline" className="text-[8px] md:text-[9px] bg-amber-500/10 text-amber-600 border-amber-500/30">Live</Badge>
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 md:line-clamp-none">
                    <span className="text-foreground font-medium">{aggregatedMetrics.avgFocus > 0 ? `${Math.round(100 - aggregatedMetrics.avgFocus)}% focus gap` : 'Cognitive performance'}</span> costing{' '}
                    <span className="text-amber-500 font-medium">{formatCurrency(executiveMetrics.revenueExposure.daily)}/day</span>
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-[10px] md:text-xs text-primary px-2 md:px-3 hidden sm:flex" onClick={(e) => { e.stopPropagation(); setShowFinancialModal(true); }}>
                  View
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
              {/* Left Column - Forecasts & Burnout */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                {/* Nova AI Forecast Panel */}
                <motion.div 
                  className="p-4 md:p-6 rounded-lg bg-gradient-to-br from-primary/5 to-transparent border border-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-4 md:mb-5">
                    <div>
                      <h3 className="text-xs md:text-sm font-medium text-foreground">Nova AI Forecast</h3>
                      <p className="text-[9px] md:text-[10px] text-muted-foreground mt-0.5">Capacity & revenue projection</p>
                    </div>
                    <div className="flex gap-1">
                      {[7, 14, 30].map((days) => (
                        <button
                          key={days}
                          onClick={() => setForecastPeriod(days as 7 | 14 | 30)}
                          className={`px-2 md:px-3 py-1 md:py-1.5 text-[9px] md:text-[10px] rounded-md md:rounded-lg transition-all ${
                            forecastPeriod === days 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {days}d
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="p-3 md:p-4 rounded-lg bg-background border border-border/30">
                      <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Capacity</div>
                      <div className="text-2xl md:text-3xl font-semibold text-foreground">{currentForecast.capacity}</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-1">
                        {currentForecast.capacity < 70 ? 'Below target' : 'On track'}
                      </div>
                    </div>
                    <div className="p-3 md:p-4 rounded-lg bg-background border border-border/30">
                      <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mb-1">At Risk</div>
                      <div className="text-2xl md:text-3xl font-semibold text-amber-500">{formatCurrency(currentForecast.revenueAtRisk, true)}</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-1">If no action</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider">Scenarios</div>
                    {novaForecasts.scenarios.map((scenario, i) => (
                      <div key={i} className="flex items-center justify-between p-2 md:p-3 rounded-md md:rounded-lg bg-background border border-border/30">
                        <span className="text-[10px] md:text-xs text-foreground truncate mr-2">{scenario.name}</span>
                        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                          <span className={`text-[10px] md:text-xs font-medium ${scenario.impact > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {scenario.impact > 0 ? '+' : ''}{scenario.impact}
                          </span>
                          <span className={`text-[10px] md:text-xs hidden sm:inline ${scenario.riskIncrease ? 'text-red-500' : 'text-green-600'}`}>
                            {scenario.riskIncrease ? `+${formatCurrency(scenario.riskIncrease, true)}` : `-${formatCurrency(scenario.riskDecrease!, true)}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Readiness Forecast */}
                <motion.div 
                  className="p-4 md:p-6 rounded-lg bg-muted/20 border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-5">
                    <div>
                      <h3 className="text-xs md:text-sm font-medium text-foreground">Readiness Forecast</h3>
                      <p className="text-[9px] md:text-[10px] text-muted-foreground mt-0.5">7-day projection</p>
                    </div>
                    <Badge variant="outline" className="text-[8px] md:text-[9px] px-1.5 md:px-2 py-0.5 rounded-full">
                      <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" />
                      AI
                    </Badge>
                  </div>
                  <div className="grid grid-cols-7 gap-1 md:gap-2">
                    {teamReadinessData.forecast.map((day, i) => (
                      <div key={i} className="text-center">
                        <div className={`text-[8px] md:text-[10px] mb-1 md:mb-2 ${i === 0 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                          {day.day}
                        </div>
                        <div className={`h-12 md:h-20 rounded-md md:rounded-lg flex items-end justify-center pb-1 md:pb-2 transition-all ${
                          day.risk === 'low' ? 'bg-green-500/20' : day.risk === 'medium' ? 'bg-amber-500/20' : 'bg-red-500/20'
                        }`}>
                          <div 
                            className={`w-4 md:w-8 rounded-sm md:rounded-md ${
                              day.risk === 'low' ? 'bg-green-500' : day.risk === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ height: `${day.score * 0.8}%` }}
                          />
                        </div>
                        <div className={`text-[10px] md:text-xs font-medium mt-1 ${
                          day.risk === 'low' ? 'text-green-600' : day.risk === 'medium' ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {day.score}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 md:gap-4 mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border/30">
                    <div className="flex items-center gap-1 text-[8px] md:text-[10px] text-muted-foreground">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500" />
                      Low
                    </div>
                    <div className="flex items-center gap-1 text-[8px] md:text-[10px] text-muted-foreground">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-500" />
                      Med
                    </div>
                    <div className="flex items-center gap-1 text-[8px] md:text-[10px] text-muted-foreground">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500" />
                      High
                    </div>
                  </div>
                </motion.div>

                {/* Burnout Risk by Team */}
                <motion.div 
                  className="p-4 md:p-6 rounded-lg bg-muted/20 border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-5">
                    <div>
                      <h3 className="text-xs md:text-sm font-medium text-foreground">Burnout by Team</h3>
                      <p className="text-[9px] md:text-[10px] text-muted-foreground mt-0.5 hidden sm:block">With financial exposure</p>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-muted-foreground">
                      <Lock className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      <span className="hidden sm:inline">Protected</span>
                    </div>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {burnoutRiskByTeam.map((team, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 md:gap-4 cursor-pointer hover:bg-muted/30 p-1.5 md:p-2 -mx-1.5 md:-mx-2 rounded-lg transition-colors"
                        onClick={() => {
                          setSelectedTeamForModal({ name: team.team, risk: team.risk, trend: team.trend, members: team.members, exposure: team.exposure });
                          setShowTeamModal(true);
                        }}
                      >
                        <div className="w-20 md:w-32 text-[10px] md:text-xs text-foreground truncate">{team.team}</div>
                        <div className="flex-1">
                          <div className="h-1.5 md:h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                team.risk < 30 ? 'bg-green-500' : team.risk < 50 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${team.risk}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-8 md:w-12 text-right">
                          <span className={`text-[10px] md:text-xs font-medium ${
                            team.risk < 30 ? 'text-green-600' : team.risk < 50 ? 'text-amber-600' : 'text-red-600'
                          }`}>{team.risk}%</span>
                        </div>
                        <div className="w-12 md:w-20 text-right hidden sm:block">
                          <span className="text-[10px] md:text-xs text-muted-foreground">{formatCurrency(team.exposure, true)}</span>
                        </div>
                        <div className="w-4 md:w-6">
                          {team.trend === 'up' && <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3 text-red-500" />}
                          {team.trend === 'down' && <TrendingDown className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500" />}
                          {team.trend === 'stable' && <div className="w-2.5 md:w-3 h-0.5 bg-muted-foreground rounded" />}
                        </div>
                        <ChevronRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border/30 flex items-center justify-between">
                    <p className="text-[8px] md:text-[10px] text-muted-foreground flex items-center gap-1">
                      <Eye className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      <span className="hidden sm:inline">Individual views with consent</span>
                      <span className="sm:hidden">With consent</span>
                    </p>
                    <Button variant="ghost" size="sm" className="h-6 md:h-7 text-[9px] md:text-[10px] text-primary px-2">
                      Access
                    </Button>
                  </div>
                </motion.div>

                {/* Intervention Effectiveness */}
                <motion.div 
                  className="p-4 md:p-6 rounded-lg bg-muted/20 border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-5">
                    <div>
                      <h3 className="text-xs md:text-sm font-medium text-foreground">Intervention Effectiveness</h3>
                      <p className="text-[9px] md:text-[10px] text-muted-foreground mt-0.5 hidden sm:block">Closed-loop impact measurement</p>
                    </div>
                    <Badge variant="outline" className="text-[8px] md:text-[9px] px-1.5 md:px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 border-green-500/30">
                      <CheckCircle2 className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" />
                      <span className="hidden sm:inline">Verified</span> ROI
                    </Badge>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {interventionEffectiveness.map((item) => (
                      <div key={item.id} className="p-3 md:p-4 rounded-lg bg-background border border-border/30">
                        <div className="flex items-start justify-between mb-1.5 md:mb-2">
                          <div className="flex-1 min-w-0 mr-2">
                            <div className="text-[10px] md:text-xs font-medium text-foreground truncate">{item.action}</div>
                            <div className="text-[9px] md:text-[10px] text-muted-foreground">{item.team} · {item.timeframe}</div>
                          </div>
                          <Badge 
                            className={`text-[8px] md:text-[9px] px-1.5 md:px-2 flex-shrink-0 ${
                              item.status === 'completed' ? 'bg-green-500/20 text-green-600' : 'bg-amber-500/20 text-amber-600'
                            }`}
                          >
                            {item.status === 'completed' ? 'Done' : 'Active'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-600" />
                            <span className="text-[10px] md:text-xs text-green-600 font-medium">{item.signalChange}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <PoundSterling className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                            <span className="text-[10px] md:text-xs text-primary font-medium">{formatCurrency(item.valueRecovered, true)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Weekly Patterns */}
                <motion.div 
                  className="p-4 md:p-6 rounded-lg bg-muted/20 border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-5">
                    <div>
                      <h3 className="text-xs md:text-sm font-medium text-foreground">Focus & Fatigue Patterns</h3>
                      <p className="text-[9px] md:text-[10px] text-muted-foreground mt-0.5 hidden sm:block">Weekly rhythm analysis</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 md:gap-3">
                    {weeklyPatterns.map((day, i) => (
                      <div key={i} className="p-2 md:p-3 rounded-lg bg-background border border-border/30">
                        <div className="text-[8px] md:text-[10px] text-muted-foreground mb-1 md:mb-2">{day.day}</div>
                        <div className="space-y-1.5 md:space-y-2">
                          <div>
                            <div className="flex justify-between text-[7px] md:text-[9px] mb-0.5">
                              <span className="text-primary hidden sm:inline">Focus</span>
                              <span className="text-primary sm:hidden">F</span>
                              <span className="text-foreground font-medium">{day.focus}%</span>
                            </div>
                            <div className="h-0.5 md:h-1 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${day.focus}%` }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[7px] md:text-[9px] mb-0.5">
                              <span className="text-amber-600 hidden sm:inline">Fatigue</span>
                              <span className="text-amber-600 sm:hidden">Ft</span>
                              <span className="text-foreground font-medium">{day.fatigue}%</span>
                            </div>
                            <div className="h-0.5 md:h-1 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${day.fatigue}%` }} />
                            </div>
                          </div>
                        </div>
                        <div className="mt-1.5 md:mt-2 pt-1.5 md:pt-2 border-t border-border/30">
                          <div className="text-[7px] md:text-[9px] text-muted-foreground hidden sm:block">Optimal hrs</div>
                          <div className="text-[10px] md:text-sm font-medium text-foreground">{day.optimal}<span className="sm:hidden text-[7px] text-muted-foreground">h</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Interventions & Comparisons */}
              <div className="space-y-4 md:space-y-6">
                {/* Insight Trace Panel */}
                <motion.div 
                  className="p-4 md:p-6 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div>
                      <h3 className="text-xs md:text-sm font-medium text-foreground">Insight Trace</h3>
                      <p className="text-[9px] md:text-[10px] text-muted-foreground mt-0.5 hidden sm:block">Why Nova recommended this</p>
                    </div>
                    <Lightbulb className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                  </div>
                  <div className="p-3 md:p-4 rounded-lg bg-background border border-border/30">
                    <div className="text-[9px] md:text-[10px] text-primary uppercase tracking-wider mb-1.5 md:mb-2">Current Priority</div>
                    <p className="text-[10px] md:text-xs text-foreground leading-relaxed mb-2 md:mb-3">
                      Reduced recovery + sustained workload → rising burnout volatility → preventative intervention recommended.
                    </p>
                    <div className="space-y-1.5 md:space-y-2 pt-2 md:pt-3 border-t border-border/30">
                      <div className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="line-clamp-1">3-week upward trend in cognitive load</span>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        <span className="line-clamp-1">Recovery rate 23% below baseline</span>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                        <span className="line-clamp-1">Similar pattern preceded 2 departures in Q3</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Nova Interventions */}
                <motion.div 
                  className="p-4 md:p-6 rounded-lg bg-gradient-to-br from-accent/10 to-transparent border border-accent/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div>
                      <h3 className="text-xs md:text-sm font-medium text-foreground">Nova Interventions</h3>
                      <p className="text-[9px] md:text-[10px] text-muted-foreground mt-0.5 hidden sm:block">AI-recommended actions with ROI</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isAdmin && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => setShowCreateInterventionDialog(true)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      )}
                      <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
                    </div>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {displayInterventions.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground text-xs">
                        No interventions yet. {isAdmin && 'Click + to create one.'}
                      </div>
                    ) : (
                      displayInterventions.map((intervention) => (
                        <div 
                          key={intervention.id}
                          className="p-2.5 md:p-3 rounded-lg bg-background border border-border/30 cursor-pointer hover:border-accent/30 transition-all"
                          onClick={() => setExpandedIntervention(expandedIntervention === intervention.id ? null : intervention.id)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] md:text-xs font-medium text-foreground mb-1 line-clamp-2">{intervention.title}</div>
                              <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                                <Badge variant="outline" className="text-[8px] md:text-[9px] px-1 md:px-1.5 py-0 rounded">
                                  {intervention.team}
                                </Badge>
                                <Badge 
                                  className={`text-[8px] md:text-[9px] px-1 md:px-1.5 py-0 rounded ${
                                    intervention.impact === 'high' ? 'bg-green-500/20 text-green-600' : 'bg-amber-500/20 text-amber-600'
                                  }`}
                                >
                                  {intervention.impact}
                                </Badge>
                                <Badge 
                                  className={`text-[8px] md:text-[9px] px-1 md:px-1.5 py-0 rounded ${
                                    intervention.status === 'completed' ? 'bg-green-500/20 text-green-600' : 
                                    intervention.status === 'in_progress' ? 'bg-blue-500/20 text-blue-600' : 
                                    'bg-amber-500/20 text-amber-600'
                                  }`}
                                >
                                  {intervention.status}
                                </Badge>
                                <span className="text-[8px] md:text-[9px] text-primary font-medium">
                                  {formatCurrency(intervention.estimatedValue, true)}
                                </span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-[10px] md:text-xs font-medium text-accent">{intervention.confidence}%</div>
                              <div className="text-[8px] md:text-[9px] text-muted-foreground hidden sm:block">confidence</div>
                            </div>
                          </div>
                          <AnimatePresence>
                            {expandedIntervention === intervention.id && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-border/30"
                              >
                                <div className="text-[9px] md:text-[10px] text-muted-foreground mb-1.5 md:mb-2 flex items-center gap-1">
                                  <Info className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                  Insight Trace
                                </div>
                                <p className="text-[10px] md:text-[11px] text-foreground/80 leading-relaxed">{intervention.trace}</p>
                                <div className="flex gap-2 mt-2 md:mt-3">
                                  {intervention.status === 'pending' && (
                                    <Button 
                                      size="sm" 
                                      className="flex-1 h-7 md:h-8 text-[9px] md:text-[10px] bg-accent text-white hover:bg-accent/90 rounded-lg"
                                      onClick={(e) => { e.stopPropagation(); handleApplyIntervention(intervention.id); }}
                                    >
                                      Start intervention
                                    </Button>
                                  )}
                                  {intervention.status === 'in_progress' && (
                                    <Button 
                                      size="sm" 
                                      className="flex-1 h-7 md:h-8 text-[9px] md:text-[10px] bg-green-600 text-white hover:bg-green-700 rounded-lg"
                                      onClick={(e) => { e.stopPropagation(); handleCompleteIntervention(intervention.id); }}
                                    >
                                      Mark complete
                                    </Button>
                                  )}
                                  {intervention.status === 'completed' && (
                                    <div className="flex-1 h-7 md:h-8 flex items-center justify-center text-[9px] md:text-[10px] text-green-600">
                                      <CheckCircle2 className="w-3 h-3 mr-1" />
                                      Completed
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>

                {/* Trend Comparisons */}
                <motion.div 
                  className="p-4 md:p-6 rounded-lg bg-muted/20 border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h3 className="text-xs md:text-sm font-medium text-foreground">Trend Comparison</h3>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setComparisonPeriod('week')}
                        className={`px-1.5 md:px-2 py-0.5 md:py-1 text-[8px] md:text-[9px] rounded ${comparisonPeriod === 'week' ? 'bg-foreground text-background' : 'text-muted-foreground'}`}
                      >
                        WoW
                      </button>
                      <button 
                        onClick={() => setComparisonPeriod('month')}
                        className={`px-1.5 md:px-2 py-0.5 md:py-1 text-[8px] md:text-[9px] rounded ${comparisonPeriod === 'month' ? 'bg-foreground text-background' : 'text-muted-foreground'}`}
                      >
                        MoM
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center justify-between p-2.5 md:p-3 rounded-lg bg-background border border-border/30">
                      <div>
                        <div className="text-[9px] md:text-[10px] text-muted-foreground">Readiness</div>
                        <div className="text-base md:text-lg font-semibold text-foreground">{comparison.readiness.current}</div>
                      </div>
                      <div className={`text-[10px] md:text-xs font-medium ${comparison.readiness.change > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {comparison.readiness.change > 0 ? '+' : ''}{comparison.readiness.change.toFixed(1)}%
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2.5 md:p-3 rounded-lg bg-background border border-border/30">
                      <div>
                        <div className="text-[9px] md:text-[10px] text-muted-foreground">Burnout Risk</div>
                        <div className="text-base md:text-lg font-semibold text-foreground">{comparison.burnout.current}%</div>
                      </div>
                      <div className={`text-[10px] md:text-xs font-medium ${comparison.burnout.change < 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {comparison.burnout.change > 0 ? '+' : ''}{comparison.burnout.change.toFixed(1)}%
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2.5 md:p-3 rounded-lg bg-background border border-border/30">
                      <div>
                        <div className="text-[9px] md:text-[10px] text-muted-foreground">Focus Score</div>
                        <div className="text-base md:text-lg font-semibold text-foreground">{comparison.focus.current}</div>
                      </div>
                      <div className={`text-[10px] md:text-xs font-medium ${comparison.focus.change > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {comparison.focus.change > 0 ? '+' : ''}{comparison.focus.change.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div 
                  className="p-4 md:p-6 rounded-lg bg-muted/20 border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-xs md:text-sm font-medium text-foreground mb-3 md:mb-4">Quick Actions</h3>
                  <div className="space-y-1.5 md:space-y-2">
                    <Button variant="outline" className="w-full justify-between h-8 md:h-10 text-[10px] md:text-xs rounded-lg">
                      <span className="flex items-center gap-1.5 md:gap-2">
                        <BarChart3 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        Export report
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between h-8 md:h-10 text-[10px] md:text-xs rounded-lg">
                      <span className="flex items-center gap-1.5 md:gap-2">
                        <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        Schedule review
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </Button>
                    <Link to="/team/settings/advanced">
                      <Button variant="outline" className="w-full justify-between h-8 md:h-10 text-[10px] md:text-xs rounded-lg">
                        <span className="flex items-center gap-1.5 md:gap-2">
                          <Settings className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          Configure alerts
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* Intelligent Alerts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <IntelligentAlerts />
                </motion.div>

                {/* Smart Nudges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <AutonomousNudgePanel />
                </motion.div>
              </div>

              {/* Meeting Load Optimiser - Full Width */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <MeetingLoadOptimiser />
              </motion.div>

              {/* Intervention ROI Tracker - Full Width */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <InterventionROITracker />
              </motion.div>
            </div>
          </div>
        </main>
        <Footer />
        
        {/* Modals */}
        {selectedTeamForModal && (
          <TeamBreakdownModal
            open={showTeamModal}
            onClose={() => setShowTeamModal(false)}
            team={selectedTeamForModal}
          />
        )}
        
        <FinancialBreakdownModal
          open={showFinancialModal}
          onClose={() => setShowFinancialModal(false)}
        />
        
        {selectedInsight && (
          <InsightTraceModal
            open={showInsightModal}
            onClose={() => setShowInsightModal(false)}
            insight={selectedInsight}
          />
        )}
        
        {/* Create Team Dialog */}
        <Dialog open={showCreateTeamDialog} onOpenChange={setShowCreateTeamDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Team</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="teamName">Team Name</Label>
                <Input id="teamName" value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} placeholder="e.g. Engineering" />
              </div>
              <div>
                <Label htmlFor="teamDesc">Description</Label>
                <Textarea id="teamDesc" value={newTeamDescription} onChange={(e) => setNewTeamDescription(e.target.value)} placeholder="Optional description" />
              </div>
              <Button onClick={handleCreateTeam} className="w-full">Create Team</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Create Intervention Dialog */}
        <Dialog open={showCreateInterventionDialog} onOpenChange={setShowCreateInterventionDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Intervention</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="intTitle">Title</Label>
                <Input id="intTitle" value={newInterventionTitle} onChange={(e) => setNewInterventionTitle(e.target.value)} placeholder="e.g. Schedule recovery day" />
              </div>
              <div>
                <Label htmlFor="intTeam">Team (optional)</Label>
                <Select value={newInterventionTeam} onValueChange={setNewInterventionTeam}>
                  <SelectTrigger><SelectValue placeholder="Select team" /></SelectTrigger>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={newInterventionPriority} onValueChange={(v) => setNewInterventionPriority(v as 'low' | 'medium' | 'high')}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateIntervention} className="w-full">Create Intervention</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}