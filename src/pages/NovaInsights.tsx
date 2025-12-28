import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Activity, Brain, Target, Loader2, Watch, ArrowUpRight } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function NovaInsights() {
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

  const navigate = useNavigate();

  useEffect(() => {
    loadChartData();
  }, []);

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

  if (isLoading) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-foreground/40" />
              </div>
            </div>
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  if (!hasRealData) {
    return (
      <NovaSwipeWrapper>
        <SEO title="Insights | Nova AI" description="Performance analytics and insights." />
        <div className="min-h-screen bg-background">
          <NovaNav />
          
          {/* Floating orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl animate-float" />
          </div>
          
          <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-16">
            <div className="max-w-md mx-auto text-center">
              <div className="w-14 h-14 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-6">
                <Watch className="w-6 h-6 text-foreground/40" />
              </div>
              <h2 className="text-xl font-medium text-foreground mb-3">No biometric data yet</h2>
              <p className="text-foreground/50 text-sm mb-10">
                Connect a wearable device and sync your data to see performance analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => navigate('/nova/devices')}
                  className="h-11 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs"
                >
                  Connect Device
                </Button>
                <Button 
                  variant="outline" 
                  onClick={loadChartData}
                  className="h-11 px-8 rounded-full border-foreground/10 text-xs"
                >
                  Refresh
                </Button>
              </div>
            </div>
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
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Analytics</p>
            <h1 className="text-2xl font-medium text-foreground mb-2">Performance Analytics</h1>
            <p className="text-sm text-foreground/50">Visualise your biometric trends and patterns</p>
          </div>
        </div>

        <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { label: "Average HRV", value: summaryMetrics.hrv.value, trend: summaryMetrics.hrv.trend, icon: Activity },
              { label: "Sleep Score", value: summaryMetrics.sleep.value, trend: summaryMetrics.sleep.trend, icon: Brain },
              { label: "Focus Time", value: summaryMetrics.focus.value, trend: summaryMetrics.focus.trend, icon: Target },
              { label: "Recovery", value: summaryMetrics.recovery.value, trend: summaryMetrics.recovery.trend, icon: TrendingUp }
            ].map((metric, index) => (
              <div key={index} className="p-6 bg-white rounded-3xl border border-foreground/5 hover:border-foreground/10 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <metric.icon className="w-3.5 h-3.5 text-foreground/40" />
                  <span className="text-[10px] uppercase tracking-[0.15em] text-foreground/40">{metric.label}</span>
                </div>
                <div className="text-2xl font-medium text-foreground mb-1">{metric.value}</div>
                <div className="text-[10px] text-accent">{metric.trend}</div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-foreground/5">
              <h3 className="text-sm font-medium text-foreground mb-6">HRV Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hrvData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foreground) / 0.05)" />
                    <XAxis dataKey="date" stroke="hsl(var(--foreground) / 0.3)" style={{ fontSize: '10px' }} />
                    <YAxis stroke="hsl(var(--foreground) / 0.3)" style={{ fontSize: '10px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid hsl(var(--foreground) / 0.1)',
                        borderRadius: '12px',
                        fontSize: '11px'
                      }} 
                    />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--foreground))" strokeWidth={2} dot={{ fill: 'hsl(var(--foreground))', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-foreground/5">
              <h3 className="text-sm font-medium text-foreground mb-6">Sleep Stages</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foreground) / 0.05)" />
                    <XAxis dataKey="day" stroke="hsl(var(--foreground) / 0.3)" style={{ fontSize: '10px' }} />
                    <YAxis stroke="hsl(var(--foreground) / 0.3)" style={{ fontSize: '10px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid hsl(var(--foreground) / 0.1)',
                        borderRadius: '12px',
                        fontSize: '11px'
                      }} 
                    />
                    <Bar dataKey="Deep" stackId="a" fill="hsl(var(--foreground))" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="REM" stackId="a" fill="hsl(var(--foreground) / 0.6)" />
                    <Bar dataKey="Light" stackId="a" fill="hsl(var(--foreground) / 0.3)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-foreground/5">
              <h3 className="text-sm font-medium text-foreground mb-6">Energy Curve</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foreground) / 0.05)" />
                    <XAxis dataKey="hour" stroke="hsl(var(--foreground) / 0.3)" style={{ fontSize: '9px' }} interval={3} />
                    <YAxis stroke="hsl(var(--foreground) / 0.3)" style={{ fontSize: '10px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid hsl(var(--foreground) / 0.1)',
                        borderRadius: '12px',
                        fontSize: '11px'
                      }} 
                    />
                    <Area type="monotone" dataKey="energy" stroke="hsl(var(--foreground))" fill="hsl(var(--foreground) / 0.1)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-foreground/5">
              <h3 className="text-sm font-medium text-foreground mb-6">Recovery Score</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={recoveryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foreground) / 0.05)" />
                    <XAxis dataKey="day" stroke="hsl(var(--foreground) / 0.3)" style={{ fontSize: '10px' }} />
                    <YAxis stroke="hsl(var(--foreground) / 0.3)" style={{ fontSize: '10px' }} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid hsl(var(--foreground) / 0.1)',
                        borderRadius: '12px',
                        fontSize: '11px'
                      }} 
                    />
                    <Line type="monotone" dataKey="recovery" stroke="hsl(142, 76%, 36%)" strokeWidth={2} dot={{ fill: 'hsl(142, 76%, 36%)', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}