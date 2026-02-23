import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { FloatingNovaChat } from "@/components/nova/FloatingNovaChat";
import { NovaBreadcrumb } from "@/components/nova/NovaBreadcrumb";
import { NovaSkeleton, NovaSkeletonGrid } from "@/components/nova/NovaSkeleton";
import { NovaEmptyState } from "@/components/nova/NovaEmptyState";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Activity, Brain, Target, Loader2, Watch, RefreshCw, Zap, TrendingDown, Minus, Heart, AlertCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { format, subDays, startOfDay, endOfDay } from "date-fns";

// Standardized chart colors using design system tokens
const CHART_COLORS = {
  primary: "hsl(var(--foreground))",
  secondary: "hsl(var(--foreground) / 0.6)",
  tertiary: "hsl(var(--foreground) / 0.3)",
  accent: "hsl(var(--accent))",
  muted: "hsl(var(--muted-foreground))",
  success: "hsl(156, 65%, 42%)", // signal-green
  grid: "hsl(var(--foreground) / 0.05)",
  tooltip: {
    bg: "hsl(var(--card))",
    border: "hsl(var(--border))",
  }
};

// Custom tooltip component for consistent styling
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-lg">
      <p className="text-xs font-medium text-foreground mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-[11px]">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// ============ TRENDS TAB TYPES ============
interface MetricData {
  date: string;
  value: number;
}

interface TrendData {
  hrv: MetricData[];
  sleep: MetricData[];
  recovery: MetricData[];
  focus: MetricData[];
}

export default function NovaInsights() {
  const [activeTab, setActiveTab] = useState("insights");
  
  // Insights state
  const [hrvData, setHrvData] = useState<any[]>([]);
  const [sleepData, setSleepData] = useState<any[]>([]);
  const [energyData, setEnergyData] = useState<any[]>([]);
  const [recoveryData, setRecoveryData] = useState<any[]>([]);
  const [hasRealData, setHasRealData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summaryMetrics, setSummaryMetrics] = useState<any>({
    hrv: { value: '--', trend: '' },
    sleep: { value: '--', trend: '' },
    focus: { value: '--', trend: '' },
    recovery: { value: '--', trend: '' }
  });

  // Trends state
  const [timeRange, setTimeRange] = useState<"30" | "90">("30");
  const [trendData, setTrendData] = useState<TrendData>({ hrv: [], sleep: [], recovery: [], focus: [] });
  const [trendsLoading, setTrendsLoading] = useState(false);
  const [trendsError, setTrendsError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadChartData();
  }, []);

  useEffect(() => {
    if (activeTab === "trends") {
      loadTrendData();
    }
  }, [timeRange, activeTab]);

  const loadChartData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const eightDaysAgo = new Date();
      eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

      const { data: metrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .gte('recorded_at', eightDaysAgo.toISOString())
        .order('recorded_at', { ascending: true });

      if (metrics && metrics.length > 0) {
        setHasRealData(true);
        
        const hrvMetrics = metrics.filter(m => m.metric_type === 'hrv');
        if (hrvMetrics.length > 0) {
          setHrvData(hrvMetrics.map(m => ({
            date: new Date(m.recorded_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
            value: parseFloat(m.value.toString())
          })));
        }

        setSleepData([
          { day: 'Mon', Deep: 2.1, REM: 1.8, Light: 3.5, Awake: 0.4 },
          { day: 'Tue', Deep: 1.9, REM: 2.0, Light: 3.8, Awake: 0.3 },
          { day: 'Wed', Deep: 2.4, REM: 1.6, Light: 3.2, Awake: 0.5 },
          { day: 'Thu', Deep: 2.0, REM: 2.2, Light: 3.4, Awake: 0.3 },
          { day: 'Fri', Deep: 1.7, REM: 1.9, Light: 4.0, Awake: 0.6 },
          { day: 'Sat', Deep: 2.5, REM: 2.1, Light: 3.6, Awake: 0.2 },
          { day: 'Sun', Deep: 2.3, REM: 2.0, Light: 3.3, Awake: 0.4 }
        ]);

        setEnergyData(Array.from({ length: 24 }, (_, i) => ({
          hour: `${i}:00`,
          energy: 50 + Math.sin((i - 6) / 3) * 30 + Math.random() * 10
        })));

        const recoveryMetrics = metrics.filter(m => m.metric_type === 'recovery');
        setRecoveryData(recoveryMetrics.slice(0, 7).map((m, i) => ({
          day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
          recovery: parseFloat(m.value.toString())
        })));

        setSummaryMetrics({
          hrv: { value: hrvMetrics[hrvMetrics.length - 1]?.value?.toString() || '--', trend: '+5%' },
          sleep: { value: '8.2/10', trend: 'Steady' },
          focus: { value: '6h', trend: '+3 sessions' },
          recovery: { value: '82%', trend: '+8%' }
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  // ============ TRENDS LOGIC ============
  const loadTrendData = async () => {
    setTrendsLoading(true);
    setTrendsError(null);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setTrendsLoading(false);
        return;
      }

      const days = parseInt(timeRange);
      const startDate = startOfDay(subDays(new Date(), days));
      const endDate = endOfDay(new Date());

      const { data, error } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .gte('recorded_at', startDate.toISOString())
        .lte('recorded_at', endDate.toISOString())
        .order('recorded_at', { ascending: true });

      if (error) throw error;

      const grouped: Record<string, Record<string, number[]>> = {
        hrv: {},
        sleep_duration: {},
        sleep_score: {},
        recovery: {},
        focus: {},
        steps: {},
      };

      (data || []).forEach(metric => {
        const date = format(new Date(metric.recorded_at), 'yyyy-MM-dd');
        const type = metric.metric_type;
        
        if (!grouped[type]) grouped[type] = {};
        if (!grouped[type][date]) grouped[type][date] = [];
        grouped[type][date].push(Number(metric.value));
      });

      const processMetric = (metricData: Record<string, number[]>): MetricData[] => {
        return Object.entries(metricData).map(([date, values]) => ({
          date,
          value: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
        })).sort((a, b) => a.date.localeCompare(b.date));
      };

      setTrendData({
        hrv: processMetric(grouped.hrv || {}),
        sleep: processMetric(grouped.sleep_score || grouped.sleep_duration || {}),
        recovery: processMetric(grouped.recovery || {}),
        focus: processMetric(grouped.focus || {}),
      });
    } catch (err) {
      console.error("Error loading trends:", err);
      setTrendsError("Failed to load trend data");
    } finally {
      setTrendsLoading(false);
    }
  };

  const calculateTrend = (data: MetricData[]) => {
    if (data.length < 2) return { direction: "neutral", change: 0 };
    
    const recent = data.slice(-7);
    const earlier = data.slice(-14, -7);
    
    if (recent.length === 0 || earlier.length === 0) return { direction: "neutral", change: 0 };
    
    const recentAvg = recent.reduce((a, b) => a + b.value, 0) / recent.length;
    const earlierAvg = earlier.reduce((a, b) => a + b.value, 0) / earlier.length;
    
    const change = ((recentAvg - earlierAvg) / earlierAvg) * 100;
    
    return {
      direction: change > 2 ? "up" : change < -2 ? "down" : "neutral",
      change: Math.abs(Math.round(change)),
    };
  };

  const TrendIcon = ({ direction }: { direction: string }) => {
    if (direction === "up") return <TrendingUp className="w-4 h-4 text-accent" />;
    if (direction === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const trendMetrics = [
    { key: "hrv", label: "HRV", icon: Heart, color: "#00A67F", data: trendData.hrv, unit: "ms" },
    { key: "sleep", label: "Sleep Score", icon: Brain, color: "#6366f1", data: trendData.sleep, unit: "" },
    { key: "recovery", label: "Recovery", icon: Activity, color: "#f59e0b", data: trendData.recovery, unit: "%" },
    { key: "focus", label: "Focus", icon: Target, color: "#ec4899", data: trendData.focus, unit: "" },
  ];

  // Loading state with skeleton loaders
  if (isLoading) {
    return (
      <NovaSwipeWrapper>
        <SEO title="Health Insights | Biometric Analytics | Nova AI" description="AI-generated insights from your wearable data. Analyse sleep quality, HRV trends, recovery patterns, and cognitive readiness over time." noindex={true} />
        <div className="min-h-screen bg-background">
          <NovaNav />
          
          <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-12">
            <div className="mb-8">
              <div className="w-20 h-3 rounded-full bg-foreground/5 skeleton-shimmer mb-3" />
              <div className="w-48 h-6 rounded-lg bg-foreground/5 skeleton-shimmer mb-2" />
              <div className="w-64 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
            </div>
            
            <NovaSkeletonGrid count={4} variant="metric" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <NovaSkeleton variant="chart" />
              <NovaSkeleton variant="chart" />
            </div>
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  // Empty state
  if (!hasRealData) {
    return (
      <NovaSwipeWrapper>
        <SEO title="Health Insights | Biometric Analytics | Nova AI" description="AI-generated insights from your wearable data. Analyse sleep quality, HRV trends, recovery patterns, and cognitive readiness over time." noindex={true} />
        <div className="min-h-screen bg-background">
          <NovaNav />
          
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float" />
          </div>
          
          <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-12">
            <NovaBreadcrumb className="mb-6" />
            
            <NovaEmptyState
              variant="insights"
              primaryAction={{
                label: "Connect Device",
                to: "/nova/devices"
              }}
              secondaryAction={{
                label: "Refresh",
                onClick: loadChartData
              }}
            />
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO title="Insights | Nova AI" description="Performance analytics and insights." />
      <div className="min-h-screen bg-background">
        <NovaNav />
        
        {/* Floating orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-40 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>
        
        {/* Header */}
        <div className="relative border-b border-foreground/5">
          <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-12">
            <NovaBreadcrumb className="mb-4" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Analytics</p>
                <h1 className="text-2xl font-medium text-foreground mb-2">Your Health Data</h1>
                <p className="text-sm text-foreground/50">See how your sleep, recovery, and energy are trending</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={loadChartData}
                className="rounded-full gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-8">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 bg-muted/30">
              <TabsTrigger value="insights" className="gap-2">
                <Zap className="w-4 h-4" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="trends" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Trends
              </TabsTrigger>
            </TabsList>

            {/* INSIGHTS TAB */}
            <TabsContent value="insights" className="mt-0">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                {[
                  { label: "Average HRV", value: summaryMetrics.hrv.value, trend: summaryMetrics.hrv.trend, icon: Activity, color: "text-accent" },
                  { label: "Sleep Score", value: summaryMetrics.sleep.value, trend: summaryMetrics.sleep.trend, icon: Brain, color: "text-signal-blue" },
                  { label: "Focus Time", value: summaryMetrics.focus.value, trend: summaryMetrics.focus.trend, icon: Target, color: "text-signal-amber" },
                  { label: "Recovery", value: summaryMetrics.recovery.value, trend: summaryMetrics.recovery.trend, icon: TrendingUp, color: "text-signal-green" }
                ].map((metric, index) => (
                  <div 
                    key={index} 
                    className="group p-6 bg-card rounded-3xl border border-foreground/5 hover:border-foreground/10 hover:shadow-lg transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <metric.icon className={`w-4 h-4 ${metric.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-[11px] uppercase tracking-[0.15em] text-foreground/40">{metric.label}</span>
                    </div>
                    <div className="text-2xl font-medium text-foreground mb-1">{metric.value}</div>
                    <div className="text-[11px] text-signal-green font-medium">{metric.trend}</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="group p-6 bg-card rounded-3xl border border-foreground/5 hover:border-foreground/10 transition-all">
                  <h3 className="text-sm font-medium text-foreground mb-6">HRV Trend</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={hrvData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                        <XAxis dataKey="date" stroke={CHART_COLORS.muted} style={{ fontSize: '11px' }} />
                        <YAxis stroke={CHART_COLORS.muted} style={{ fontSize: '11px' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          name="HRV"
                          stroke={CHART_COLORS.accent} 
                          strokeWidth={2} 
                          dot={{ fill: CHART_COLORS.accent, r: 4, strokeWidth: 0 }}
                          activeDot={{ r: 6, strokeWidth: 2, stroke: CHART_COLORS.accent }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="group p-6 bg-card rounded-3xl border border-foreground/5 hover:border-foreground/10 transition-all">
                  <h3 className="text-sm font-medium text-foreground mb-6">Sleep Stages</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sleepData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                        <XAxis dataKey="day" stroke={CHART_COLORS.muted} style={{ fontSize: '11px' }} />
                        <YAxis stroke={CHART_COLORS.muted} style={{ fontSize: '11px' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                          wrapperStyle={{ fontSize: '11px' }}
                          iconType="circle"
                          iconSize={8}
                        />
                        <Bar dataKey="Deep" name="Deep" stackId="a" fill={CHART_COLORS.primary} radius={[0, 0, 0, 0]} />
                        <Bar dataKey="REM" name="REM" stackId="a" fill={CHART_COLORS.secondary} />
                        <Bar dataKey="Light" name="Light" stackId="a" fill={CHART_COLORS.tertiary} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="group p-6 bg-card rounded-3xl border border-foreground/5 hover:border-foreground/10 transition-all">
                  <h3 className="text-sm font-medium text-foreground mb-6">Energy Curve</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={energyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                        <XAxis dataKey="hour" stroke={CHART_COLORS.muted} style={{ fontSize: '10px' }} interval={3} />
                        <YAxis stroke={CHART_COLORS.muted} style={{ fontSize: '11px' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <defs>
                          <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="energy" 
                          name="Energy"
                          stroke={CHART_COLORS.accent} 
                          strokeWidth={2}
                          fill="url(#energyGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="group p-6 bg-card rounded-3xl border border-foreground/5 hover:border-foreground/10 transition-all">
                  <h3 className="text-sm font-medium text-foreground mb-6">Recovery Score</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={recoveryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                        <XAxis dataKey="day" stroke={CHART_COLORS.muted} style={{ fontSize: '11px' }} />
                        <YAxis stroke={CHART_COLORS.muted} style={{ fontSize: '11px' }} domain={[0, 100]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line 
                          type="monotone" 
                          dataKey="recovery" 
                          name="Recovery"
                          stroke={CHART_COLORS.success} 
                          strokeWidth={2} 
                          dot={{ fill: CHART_COLORS.success, r: 4, strokeWidth: 0 }}
                          activeDot={{ r: 6, strokeWidth: 2, stroke: CHART_COLORS.success }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TRENDS TAB */}
            <TabsContent value="trends" className="mt-0">
              {/* Time Range Selector */}
              <div className="flex justify-center mb-8">
                <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as "30" | "90")}>
                  <TabsList>
                    <TabsTrigger value="30">30 Days</TabsTrigger>
                    <TabsTrigger value="90">90 Days</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {trendsLoading ? (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="w-8 h-8 animate-spin text-accent" />
                </div>
              ) : trendsError ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                  <p className="text-foreground/50 mb-4">{trendsError}</p>
                  <Button onClick={loadTrendData} variant="outline">Try Again</Button>
                </div>
              ) : (
                <div className="grid gap-6 lg:grid-cols-2">
                  {trendMetrics.map((metric) => {
                    const trend = calculateTrend(metric.data);
                    const latestValue = metric.data[metric.data.length - 1]?.value || "--";
                    const hasData = metric.data.length > 0;

                    return (
                      <Card key={metric.key} className="border-foreground/5 bg-card">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${metric.color}15` }}>
                                <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                              </div>
                              <div>
                                <h3 className="font-medium text-foreground">{metric.label}</h3>
                                <p className="text-sm text-foreground/50">
                                  Current: {latestValue}{metric.unit}
                                </p>
                              </div>
                            </div>
                            {hasData && (
                              <div className="flex items-center gap-2">
                                <TrendIcon direction={trend.direction} />
                                <span className={`text-sm font-medium ${
                                  trend.direction === "up" ? "text-accent" :
                                  trend.direction === "down" ? "text-red-500" : "text-foreground/40"
                                }`}>
                                  {trend.change}%
                                </span>
                              </div>
                            )}
                          </div>

                          {hasData ? (
                            <div className="h-48">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={metric.data}>
                                  <defs>
                                    <linearGradient id={`gradient-${metric.key}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor={metric.color} stopOpacity={0.2} />
                                      <stop offset="95%" stopColor={metric.color} stopOpacity={0} />
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foreground) / 0.05)" />
                                  <XAxis 
                                    dataKey="date" 
                                    tick={{ fontSize: 10, fill: '#999' }}
                                    tickFormatter={(value) => format(new Date(value), 'd MMM')}
                                  />
                                  <YAxis 
                                    tick={{ fontSize: 10, fill: '#999' }}
                                    domain={['dataMin - 5', 'dataMax + 5']}
                                  />
                                  <Tooltip 
                                    contentStyle={{ 
                                      backgroundColor: 'hsl(var(--card))', 
                                      border: '1px solid hsl(var(--foreground) / 0.1)',
                                      borderRadius: '12px',
                                      fontSize: '11px',
                                    }}
                                    labelFormatter={(value) => format(new Date(value), 'dd MMM yyyy')}
                                  />
                                  <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke={metric.color} 
                                    strokeWidth={2}
                                    fill={`url(#gradient-${metric.key})`}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          ) : (
                            <div className="h-48 flex items-center justify-center text-center">
                              <div>
                                <p className="text-foreground/50 mb-2">No data available</p>
                                <p className="text-xs text-foreground/30">Connect a device to start tracking</p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <FloatingNovaChat />
      </div>
    </NovaSwipeWrapper>
  );
}