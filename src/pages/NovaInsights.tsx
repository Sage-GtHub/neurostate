import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Activity, Brain, Target, Loader2, AlertCircle, Watch, RefreshCw } from "lucide-react";
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
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
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
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Watch className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-3">No biometric data yet</h2>
              <p className="text-muted-foreground mb-8">
                Connect a wearable device and sync your data to see performance analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => navigate('/nova/devices')}>Connect Device</Button>
                <Button variant="outline" onClick={loadChartData}>Refresh</Button>
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
        
        <div className="border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">Performance Analytics</h1>
            <p className="text-sm text-muted-foreground">Visualise your biometric trends and patterns</p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8 sm:py-12">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Average HRV", value: summaryMetrics.hrv.value, trend: summaryMetrics.hrv.trend, icon: Activity },
              { label: "Sleep Score", value: summaryMetrics.sleep.value, trend: summaryMetrics.sleep.trend, icon: Brain },
              { label: "Focus Time", value: summaryMetrics.focus.value, trend: summaryMetrics.focus.trend, icon: Target },
              { label: "Recovery", value: summaryMetrics.recovery.value, trend: summaryMetrics.recovery.trend, icon: TrendingUp }
            ].map((metric, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <metric.icon className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</span>
                  </div>
                  <div className="text-2xl font-semibold text-foreground mb-1">{metric.value}</div>
                  <div className="text-xs text-accent">{metric.trend}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-foreground mb-6">HRV Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hrvData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                      <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: 'hsl(var(--accent))', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-foreground mb-6">Sleep Stages</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sleepData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                      <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Bar dataKey="Deep" stackId="a" fill="hsl(var(--foreground))" />
                      <Bar dataKey="REM" stackId="a" fill="hsl(var(--accent))" />
                      <Bar dataKey="Light" stackId="a" fill="hsl(var(--muted-foreground))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-foreground mb-6">Energy Curve</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={energyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '10px' }} interval={3} />
                      <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="energy" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-foreground mb-6">Recovery Score</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={recoveryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
                      <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="recovery" stroke="hsl(142, 76%, 36%)" strokeWidth={2} dot={{ fill: 'hsl(142, 76%, 36%)', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}
