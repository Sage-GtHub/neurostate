import { useState, useEffect } from 'react';
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
  Briefcase
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

// Executive Intelligence Metrics
const executiveMetrics = {
  cci: {
    current: 74,
    trend: 'up',
    change: 3.2,
    breakdown: {
      energy: 71,
      focus: 78,
      recovery: 69,
      stressVolatility: 22,
      burnoutRisk: 28
    }
  },
  revenueExposure: {
    weekly: 41800,
    daily: 5971,
    trend: 'down',
    change: -8.4
  },
  burnoutExposure: {
    projected: 320000,
    timeframe: '6 months',
    teamsAtRisk: 2
  }
};

// System adoption metrics
const adoptionMetrics = {
  dau: { value: 847, change: 12.3, trend: 'up' },
  wat: { value: 42, change: 5.0, trend: 'up' },
  coverageRate: { value: 89, change: 4.2, trend: 'up' },
  interventionAdoption: { value: 67, change: 8.1, trend: 'up' }
};

// Intervention effectiveness
const interventionEffectiveness = [
  {
    id: 1,
    action: 'Workload timing adjustment',
    team: 'Sales',
    signalChange: '+11% focus',
    valueRecovered: 17400,
    timeframe: '14 days',
    status: 'completed'
  },
  {
    id: 2,
    action: 'Recovery day scheduled',
    team: 'Engineering',
    signalChange: '+18% readiness',
    valueRecovered: 23600,
    timeframe: '21 days',
    status: 'completed'
  },
  {
    id: 3,
    action: 'Meeting load reduction',
    team: 'Product',
    signalChange: '+9% cognitive capacity',
    valueRecovered: 8900,
    timeframe: '7 days',
    status: 'in_progress'
  }
];

// Nova forecasts
const novaForecasts = {
  days7: { capacity: 72, revenueAtRisk: 38200 },
  days14: { capacity: 68, revenueAtRisk: 52400 },
  days30: { capacity: 65, revenueAtRisk: 89600 },
  scenarios: [
    { name: 'Q1 deadline push', impact: -12, riskIncrease: 18000 },
    { name: 'Team offsite (planned)', impact: +8, riskDecrease: 14200 },
    { name: 'New product launch', impact: -18, riskIncrease: 34000 }
  ]
};

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
  { team: 'Engineering', risk: 32, trend: 'down', members: 24, exposure: 84000 },
  { team: 'Product', risk: 45, trend: 'up', members: 12, exposure: 126000 },
  { team: 'Sales', risk: 28, trend: 'stable', members: 18, exposure: 67200 },
  { team: 'Customer Success', risk: 51, trend: 'up', members: 15, exposure: 108000 },
  { team: 'Marketing', risk: 22, trend: 'down', members: 8, exposure: 42400 },
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
    estimatedValue: 23600,
    trace: 'Detected 3-week upward trend in cognitive load. Recovery intervention historically reduces burnout risk by 34%. Pattern correlation with previous Q4 period: r=0.82.'
  },
  { 
    id: 2, 
    title: 'Reduce meeting load for Product', 
    team: 'Product',
    impact: 'medium',
    confidence: 72,
    estimatedValue: 12400,
    trace: 'Meeting density 2.3x higher than baseline. Correlation with focus score decline: r=0.78. Similar interventions recovered 14% focus within 10 days.'
  },
  { 
    id: 3, 
    title: 'Shift deadline by 2 days', 
    team: 'Engineering',
    impact: 'high',
    confidence: 91,
    estimatedValue: 31200,
    trace: 'Current trajectory indicates 23% probability of quality incidents. 2-day buffer reduces to 4%. Historical data shows 89% success rate for similar interventions.'
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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedFunction, setSelectedFunction] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [comparisonPeriod, setComparisonPeriod] = useState<'week' | 'month'>('week');
  const [expandedIntervention, setExpandedIntervention] = useState<number | null>(null);
  const [forecastPeriod, setForecastPeriod] = useState<7 | 14 | 30>(7);
  const [showInsightTrace, setShowInsightTrace] = useState(false);
  
  // Modal states
  const [selectedTeamForModal, setSelectedTeamForModal] = useState<any>(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showFinancialModal, setShowFinancialModal] = useState(false);
  const [showInsightModal, setShowInsightModal] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<any>(null);
  
  // Onboarding wizard
  const { showOnboarding, completeOnboarding } = useOnboardingWizard();

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {/* CCI Score */}
              <motion.div 
                className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20"
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
                  <div className={`flex items-center text-[10px] md:text-xs mb-1 ml-auto ${executiveMetrics.cci.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                    {executiveMetrics.cci.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {executiveMetrics.cci.change > 0 ? '+' : ''}{executiveMetrics.cci.change}%
                  </div>
                </div>
                <Progress value={executiveMetrics.cci.current} className="h-1 md:h-1.5 mt-2" />
              </motion.div>

              {/* Live Cognitive Revenue Exposure */}
              <motion.div 
                className="p-3 md:p-4 rounded-xl bg-muted/30 border border-border/50"
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
                <div className={`flex items-center text-[10px] md:text-xs mt-1 ${executiveMetrics.revenueExposure.trend === 'down' ? 'text-green-600' : 'text-red-500'}`}>
                  {executiveMetrics.revenueExposure.trend === 'down' ? <TrendingDown className="w-3 h-3 mr-0.5" /> : <TrendingUp className="w-3 h-3 mr-0.5" />}
                  {executiveMetrics.revenueExposure.change}% vs last week
                </div>
              </motion.div>

              {/* Burnout Risk Exposure */}
              <motion.div 
                className="p-3 md:p-4 rounded-xl bg-muted/30 border border-border/50 sm:col-span-2 md:col-span-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
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
                  <span className="text-xl md:text-2xl font-semibold text-red-500">{formatCurrency(executiveMetrics.burnoutExposure.projected, true)}</span>
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
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger className="h-8 md:h-9 w-[110px] md:w-[130px] text-[10px] md:text-xs rounded-lg border-border/50 flex-shrink-0">
                    <Users className="w-3 h-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="customer-success">Customer Success</SelectItem>
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
                  <Button variant="outline" size="sm" className="h-8 md:h-9 px-2 md:px-3 rounded-lg text-[10px] md:text-xs">
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
              className="mb-6 md:mb-8 p-4 md:p-6 rounded-xl md:rounded-2xl bg-muted/20 border border-border/50"
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
                <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-background border border-border/30">
                  <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Daily Active</div>
                  <div className="text-lg md:text-2xl font-semibold text-foreground">{adoptionMetrics.dau.value}</div>
                  <div className={`text-[10px] md:text-xs mt-1 ${adoptionMetrics.dau.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                    +{adoptionMetrics.dau.change}%
                  </div>
                </div>
                <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-background border border-border/30">
                  <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Active Teams</div>
                  <div className="text-lg md:text-2xl font-semibold text-foreground">{adoptionMetrics.wat.value}</div>
                  <div className={`text-[10px] md:text-xs mt-1 ${adoptionMetrics.wat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                    +{adoptionMetrics.wat.change}%
                  </div>
                </div>
                <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-background border border-border/30">
                  <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Coverage</div>
                  <div className="text-lg md:text-2xl font-semibold text-foreground">{adoptionMetrics.coverageRate.value}%</div>
                  <div className={`text-[10px] md:text-xs mt-1 ${adoptionMetrics.coverageRate.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                    +{adoptionMetrics.coverageRate.change}%
                  </div>
                </div>
                <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-background border border-border/30">
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
                className="p-3 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20"
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
                className="p-3 md:p-5 rounded-xl md:rounded-2xl bg-muted/30 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Burnout</span>
                  <AlertTriangle className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-500" />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl md:text-3xl font-semibold text-foreground">32%</span>
                  <div className="flex items-center text-[10px] md:text-xs mb-1 text-green-600">
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                    11%
                  </div>
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mt-1 md:mt-2">2 teams at risk</p>
              </motion.div>

              {/* Focus Score */}
              <motion.div 
                className="p-3 md:p-5 rounded-xl md:rounded-2xl bg-muted/30 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Focus</span>
                  <Brain className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary" />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl md:text-3xl font-semibold text-foreground">71</span>
                  <div className="flex items-center text-[10px] md:text-xs mb-1 text-green-600">
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                    4%
                  </div>
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mt-1 md:mt-2">Peak: Tue 10am</p>
              </motion.div>

              {/* Active Interventions */}
              <motion.div 
                className="p-3 md:p-5 rounded-xl md:rounded-2xl bg-muted/30 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Actions</span>
                  <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent" />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl md:text-3xl font-semibold text-foreground">3</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground mb-1">pending</span>
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground mt-1 md:mt-2">Est: {formatCurrency(67200)}</p>
              </motion.div>
            </div>

            {/* Financial Attribution Alert */}
            <motion.div 
              className="mb-6 md:mb-8 p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 cursor-pointer hover:border-amber-500/40 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setShowFinancialModal(true)}
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs md:text-sm font-medium text-foreground">Financial Attribution</h4>
                    <Badge variant="outline" className="text-[8px] md:text-[9px] bg-amber-500/10 text-amber-600 border-amber-500/30">Live</Badge>
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 md:line-clamp-none">
                    <span className="text-foreground font-medium">20% focus decline</span> costing{' '}
                    <span className="text-amber-500 font-medium">{formatCurrency(8900)}/day</span>
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
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/20"
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
                    <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-background border border-border/30">
                      <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Capacity</div>
                      <div className="text-2xl md:text-3xl font-semibold text-foreground">{currentForecast.capacity}</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground mt-1">
                        {currentForecast.capacity < 70 ? 'Below target' : 'On track'}
                      </div>
                    </div>
                    <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-background border border-border/30">
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
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-muted/20 border border-border/50"
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
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-muted/20 border border-border/50"
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
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-muted/20 border border-border/50"
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
                      <div key={item.id} className="p-3 md:p-4 rounded-lg md:rounded-xl bg-background border border-border/30">
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
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-muted/20 border border-border/50"
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
                      <div key={i} className="p-2 md:p-3 rounded-lg md:rounded-xl bg-background border border-border/30">
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
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
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
                  <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-background border border-border/30">
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
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div>
                      <h3 className="text-xs md:text-sm font-medium text-foreground">Nova Interventions</h3>
                      <p className="text-[9px] md:text-[10px] text-muted-foreground mt-0.5 hidden sm:block">AI-recommended actions with ROI</p>
                    </div>
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {interventions.map((intervention) => (
                      <div 
                        key={intervention.id}
                        className="p-2.5 md:p-3 rounded-lg md:rounded-xl bg-background border border-border/30 cursor-pointer hover:border-accent/30 transition-all"
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
                              <Button size="sm" className="w-full mt-2 md:mt-3 h-7 md:h-8 text-[9px] md:text-[10px] bg-accent text-white hover:bg-accent/90 rounded-lg">
                                Apply intervention
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Trend Comparisons */}
                <motion.div 
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-muted/20 border border-border/50"
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
                    <div className="flex items-center justify-between p-2.5 md:p-3 rounded-lg md:rounded-xl bg-background border border-border/30">
                      <div>
                        <div className="text-[9px] md:text-[10px] text-muted-foreground">Readiness</div>
                        <div className="text-base md:text-lg font-semibold text-foreground">{comparison.readiness.current}</div>
                      </div>
                      <div className={`text-[10px] md:text-xs font-medium ${comparison.readiness.change > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {comparison.readiness.change > 0 ? '+' : ''}{comparison.readiness.change.toFixed(1)}%
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2.5 md:p-3 rounded-lg md:rounded-xl bg-background border border-border/30">
                      <div>
                        <div className="text-[9px] md:text-[10px] text-muted-foreground">Burnout Risk</div>
                        <div className="text-base md:text-lg font-semibold text-foreground">{comparison.burnout.current}%</div>
                      </div>
                      <div className={`text-[10px] md:text-xs font-medium ${comparison.burnout.change < 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {comparison.burnout.change > 0 ? '+' : ''}{comparison.burnout.change.toFixed(1)}%
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2.5 md:p-3 rounded-lg md:rounded-xl bg-background border border-border/30">
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
                  className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-muted/20 border border-border/50"
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
              </div>
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
      </div>
    </>
  );
}