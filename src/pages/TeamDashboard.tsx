import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Lock
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

// Mock data for demonstration
const teamReadinessData = {
  current: 78,
  trend: 'up',
  change: 4,
  forecast: [
    { day: 'Today', score: 78, risk: 'low' },
    { day: 'Tomorrow', score: 76, risk: 'low' },
    { day: 'Wed', score: 72, risk: 'medium' },
    { day: 'Thu', score: 68, risk: 'medium' },
    { day: 'Fri', score: 65, risk: 'medium' },
    { day: 'Sat', score: 74, risk: 'low' },
    { day: 'Sun', score: 80, risk: 'low' },
  ]
};

const burnoutRiskByTeam = [
  { team: 'Engineering', risk: 32, trend: 'down', members: 24 },
  { team: 'Product', risk: 45, trend: 'up', members: 12 },
  { team: 'Sales', risk: 28, trend: 'stable', members: 18 },
  { team: 'Customer Success', risk: 51, trend: 'up', members: 15 },
  { team: 'Marketing', risk: 22, trend: 'down', members: 8 },
];

const weeklyPatterns = [
  { day: 'Mon', focus: 72, fatigue: 28, optimal: 6.2 },
  { day: 'Tue', focus: 78, fatigue: 22, optimal: 7.1 },
  { day: 'Wed', focus: 74, fatigue: 26, optimal: 6.8 },
  { day: 'Thu', focus: 68, fatigue: 32, optimal: 5.9 },
  { day: 'Fri', focus: 62, fatigue: 38, optimal: 5.2 },
];

const interventions = [
  { 
    id: 1, 
    title: 'Schedule team recovery day', 
    team: 'Customer Success',
    impact: 'high',
    confidence: 87,
    trace: 'Detected 3-week upward trend in cognitive load. Recovery intervention historically reduces burnout risk by 34%.'
  },
  { 
    id: 2, 
    title: 'Reduce meeting load for Product', 
    team: 'Product',
    impact: 'medium',
    confidence: 72,
    trace: 'Meeting density 2.3x higher than baseline. Correlation with focus score decline: r=0.78.'
  },
  { 
    id: 3, 
    title: 'Shift deadline by 2 days', 
    team: 'Engineering',
    impact: 'high',
    confidence: 91,
    trace: 'Current trajectory indicates 23% probability of quality incidents. 2-day buffer reduces to 4%.'
  },
];

const trendComparisons = {
  weekOverWeek: {
    readiness: { current: 78, previous: 74, change: 5.4 },
    burnout: { current: 32, previous: 36, change: -11.1 },
    focus: { current: 71, previous: 68, change: 4.4 },
  },
  monthOverMonth: {
    readiness: { current: 78, previous: 72, change: 8.3 },
    burnout: { current: 32, previous: 41, change: -22.0 },
    focus: { current: 71, previous: 65, change: 9.2 },
  }
};

export default function TeamDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [comparisonPeriod, setComparisonPeriod] = useState<'week' | 'month'>('week');
  const [expandedIntervention, setExpandedIntervention] = useState<number | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUser(user);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-foreground/20" />
      </div>
    );
  }

  const comparison = comparisonPeriod === 'week' ? trendComparisons.weekOverWeek : trendComparisons.monthOverMonth;

  return (
    <>
      <SEO 
        title="Team Dashboard | NeuroState Nova"
        description="Enterprise-grade cognitive performance analytics for your organisation."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="px-6 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Nova Intelligence</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">Team Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Cognitive performance analytics · Last updated 2 min ago</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="h-9 w-[120px] text-xs rounded-lg border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="14d">Last 14 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger className="h-9 w-[140px] text-xs rounded-lg border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-9 px-3 rounded-lg">
                  <RefreshCw className="w-3.5 h-3.5 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Team Readiness */}
              <motion.div 
                className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-primary font-medium">Team Readiness</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">
                      Aggregate cognitive capacity score based on sleep, recovery, and stress indicators across all team members.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold text-foreground">{teamReadinessData.current}</span>
                  <div className={`flex items-center text-xs mb-1 ${teamReadinessData.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                    {teamReadinessData.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {teamReadinessData.change}%
                  </div>
                </div>
                <Progress value={teamReadinessData.current} className="h-1.5 mt-3" />
              </motion.div>

              {/* Burnout Risk */}
              <motion.div 
                className="p-5 rounded-2xl bg-muted/30 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Burnout Risk</span>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold text-foreground">32%</span>
                  <div className="flex items-center text-xs mb-1 text-green-600">
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                    11%
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">2 teams require attention</p>
              </motion.div>

              {/* Focus Score */}
              <motion.div 
                className="p-5 rounded-2xl bg-muted/30 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Avg Focus Score</span>
                  <Brain className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold text-foreground">71</span>
                  <div className="flex items-center text-xs mb-1 text-green-600">
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                    4%
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">Peak: Tuesday 10am</p>
              </motion.div>

              {/* Active Interventions */}
              <motion.div 
                className="p-5 rounded-2xl bg-muted/30 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Nova Interventions</span>
                  <Zap className="w-3.5 h-3.5 text-accent" />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold text-foreground">3</span>
                  <span className="text-xs text-muted-foreground mb-1">recommended</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">Est. impact: +12% readiness</p>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - 7-Day Forecast */}
              <div className="lg:col-span-2 space-y-6">
                {/* Readiness Forecast */}
                <motion.div 
                  className="p-6 rounded-2xl bg-muted/20 border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-sm font-medium text-foreground">Team Readiness Forecast</h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Nova Insights · 7-day projection</p>
                    </div>
                    <Badge variant="outline" className="text-[9px] px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Forecast
                    </Badge>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {teamReadinessData.forecast.map((day, i) => (
                      <div key={i} className="text-center">
                        <div className={`text-[10px] mb-2 ${i === 0 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                          {day.day}
                        </div>
                        <div className={`h-20 rounded-lg flex items-end justify-center pb-2 transition-all ${
                          day.risk === 'low' ? 'bg-green-500/20' : day.risk === 'medium' ? 'bg-amber-500/20' : 'bg-red-500/20'
                        }`}>
                          <div 
                            className={`w-8 rounded-md ${
                              day.risk === 'low' ? 'bg-green-500' : day.risk === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ height: `${day.score * 0.8}%` }}
                          />
                        </div>
                        <div className={`text-xs font-medium mt-1.5 ${
                          day.risk === 'low' ? 'text-green-600' : day.risk === 'medium' ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {day.score}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/30">
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Low risk
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      Medium risk
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      High risk
                    </div>
                  </div>
                </motion.div>

                {/* Burnout Risk by Team */}
                <motion.div 
                  className="p-6 rounded-2xl bg-muted/20 border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-sm font-medium text-foreground">Burnout Risk by Team</h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Aggregated view · Individual data anonymised</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Lock className="w-3 h-3" />
                      Privacy protected
                    </div>
                  </div>
                  <div className="space-y-3">
                    {burnoutRiskByTeam.map((team, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-32 text-xs text-foreground">{team.team}</div>
                        <div className="flex-1">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                team.risk < 30 ? 'bg-green-500' : team.risk < 50 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${team.risk}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-12 text-right">
                          <span className={`text-xs font-medium ${
                            team.risk < 30 ? 'text-green-600' : team.risk < 50 ? 'text-amber-600' : 'text-red-600'
                          }`}>{team.risk}%</span>
                        </div>
                        <div className="w-6">
                          {team.trend === 'up' && <TrendingUp className="w-3 h-3 text-red-500" />}
                          {team.trend === 'down' && <TrendingDown className="w-3 h-3 text-green-500" />}
                          {team.trend === 'stable' && <div className="w-3 h-0.5 bg-muted-foreground rounded" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                      <Eye className="w-3 h-3" />
                      Individual view available with consent/admin permission
                    </p>
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] text-primary">
                      Request access
                    </Button>
                  </div>
                </motion.div>

                {/* Weekly Patterns */}
                <motion.div 
                  className="p-6 rounded-2xl bg-muted/20 border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-sm font-medium text-foreground">Focus & Fatigue Patterns</h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Weekly rhythm analysis</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    {weeklyPatterns.map((day, i) => (
                      <div key={i} className="p-3 rounded-xl bg-background border border-border/30">
                        <div className="text-[10px] text-muted-foreground mb-2">{day.day}</div>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-[9px] mb-0.5">
                              <span className="text-primary">Focus</span>
                              <span className="text-foreground font-medium">{day.focus}%</span>
                            </div>
                            <div className="h-1 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${day.focus}%` }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-[9px] mb-0.5">
                              <span className="text-amber-600">Fatigue</span>
                              <span className="text-foreground font-medium">{day.fatigue}%</span>
                            </div>
                            <div className="h-1 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${day.fatigue}%` }} />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-border/30">
                          <div className="text-[9px] text-muted-foreground">Optimal hrs</div>
                          <div className="text-sm font-medium text-foreground">{day.optimal}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Interventions & Comparisons */}
              <div className="space-y-6">
                {/* Nova Interventions */}
                <motion.div 
                  className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-foreground">Nova Interventions</h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">AI-recommended actions</p>
                    </div>
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <div className="space-y-3">
                    {interventions.map((intervention) => (
                      <div 
                        key={intervention.id}
                        className="p-3 rounded-xl bg-background border border-border/30 cursor-pointer hover:border-accent/30 transition-all"
                        onClick={() => setExpandedIntervention(expandedIntervention === intervention.id ? null : intervention.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-xs font-medium text-foreground mb-1">{intervention.title}</div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-[9px] px-1.5 py-0 rounded">
                                {intervention.team}
                              </Badge>
                              <Badge 
                                className={`text-[9px] px-1.5 py-0 rounded ${
                                  intervention.impact === 'high' ? 'bg-green-500/20 text-green-600' : 'bg-amber-500/20 text-amber-600'
                                }`}
                              >
                                {intervention.impact} impact
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-medium text-accent">{intervention.confidence}%</div>
                            <div className="text-[9px] text-muted-foreground">confidence</div>
                          </div>
                        </div>
                        {expandedIntervention === intervention.id && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-border/30"
                          >
                            <div className="text-[10px] text-muted-foreground mb-2 flex items-center gap-1">
                              <Info className="w-3 h-3" />
                              Insight Trace
                            </div>
                            <p className="text-[11px] text-foreground/80 leading-relaxed">{intervention.trace}</p>
                            <Button size="sm" className="w-full mt-3 h-8 text-[10px] bg-accent text-white hover:bg-accent/90 rounded-lg">
                              Apply intervention
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Trend Comparisons */}
                <motion.div 
                  className="p-6 rounded-2xl bg-muted/20 border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-foreground">Trend Comparison</h3>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setComparisonPeriod('week')}
                        className={`px-2 py-1 text-[9px] rounded ${comparisonPeriod === 'week' ? 'bg-foreground text-background' : 'text-muted-foreground'}`}
                      >
                        WoW
                      </button>
                      <button 
                        onClick={() => setComparisonPeriod('month')}
                        className={`px-2 py-1 text-[9px] rounded ${comparisonPeriod === 'month' ? 'bg-foreground text-background' : 'text-muted-foreground'}`}
                      >
                        MoM
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/30">
                      <div>
                        <div className="text-[10px] text-muted-foreground">Readiness</div>
                        <div className="text-lg font-semibold text-foreground">{comparison.readiness.current}</div>
                      </div>
                      <div className={`text-xs font-medium ${comparison.readiness.change > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {comparison.readiness.change > 0 ? '+' : ''}{comparison.readiness.change.toFixed(1)}%
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/30">
                      <div>
                        <div className="text-[10px] text-muted-foreground">Burnout Risk</div>
                        <div className="text-lg font-semibold text-foreground">{comparison.burnout.current}%</div>
                      </div>
                      <div className={`text-xs font-medium ${comparison.burnout.change < 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {comparison.burnout.change > 0 ? '+' : ''}{comparison.burnout.change.toFixed(1)}%
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/30">
                      <div>
                        <div className="text-[10px] text-muted-foreground">Focus Score</div>
                        <div className="text-lg font-semibold text-foreground">{comparison.focus.current}</div>
                      </div>
                      <div className={`text-xs font-medium ${comparison.focus.change > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {comparison.focus.change > 0 ? '+' : ''}{comparison.focus.change.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div 
                  className="p-6 rounded-2xl bg-muted/20 border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-sm font-medium text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-between h-10 text-xs rounded-lg">
                      <span className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Export report
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between h-10 text-xs rounded-lg">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Schedule review
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between h-10 text-xs rounded-lg">
                      <span className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Configure alerts
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
