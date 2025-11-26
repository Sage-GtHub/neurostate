import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Activity, Brain, Target } from "lucide-react";

export default function NovaInsights() {
  const [hrvData, setHrvData] = useState<any[]>([]);
  const [sleepData, setSleepData] = useState<any[]>([]);
  const [energyData, setEnergyData] = useState<any[]>([]);
  const [recoveryData, setRecoveryData] = useState<any[]>([]);
  const [summaryMetrics, setSummaryMetrics] = useState<any>({
    hrv: { value: '--', trend: '' },
    sleep: { value: '--', trend: '' },
    focus: { value: '--', trend: '' },
    recovery: { value: '--', trend: '' }
  });

  useEffect(() => {
    loadChartData();
  }, []);

  const loadChartData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const eightDaysAgo = new Date();
      eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

      const { data: metrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .gte('recorded_at', eightDaysAgo.toISOString())
        .order('recorded_at', { ascending: true });

      if (metrics && metrics.length > 0) {
        const hrvMetrics = metrics.filter(m => m.metric_type === 'hrv');
        const hrvChartData = hrvMetrics.map(m => ({
          date: new Date(m.recorded_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
          value: parseFloat(m.value.toString())
        }));
        setHrvData(hrvChartData);

        const sleepMetrics = metrics.filter(m => m.metric_type === 'sleep_quality');
        const sleepChartData = sleepMetrics.slice(0, 7).map((m, i) => ({
          day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
          Deep: Math.round(Math.random() * 3 + 1),
          REM: Math.round(Math.random() * 2 + 1.5),
          Light: Math.round(Math.random() * 2 + 3),
          Awake: Math.round(Math.random() * 0.5 + 0.3)
        }));
        setSleepData(sleepChartData);

        const energyCurve = Array.from({ length: 24 }, (_, i) => ({
          hour: `${i}:00`,
          energy: 50 + Math.sin((i - 6) / 3) * 30 + Math.random() * 10
        }));
        setEnergyData(energyCurve);

        const recoveryMetrics = metrics.filter(m => m.metric_type === 'recovery');
        const recoveryChartData = recoveryMetrics.slice(0, 7).map((m, i) => ({
          day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
          recovery: parseFloat(m.value.toString())
        }));
        setRecoveryData(recoveryChartData);

        const latestHrv = hrvMetrics[hrvMetrics.length - 1];
        const prevHrv = hrvMetrics[hrvMetrics.length - 2];
        const hrvTrend = prevHrv ? `${((latestHrv.value - prevHrv.value) / prevHrv.value * 100).toFixed(0)}%` : '';

        const latestSleep = sleepMetrics[sleepMetrics.length - 1];
        const latestRecovery = recoveryMetrics[recoveryMetrics.length - 1];
        const prevRecovery = recoveryMetrics[recoveryMetrics.length - 2];
        const recoveryTrend = prevRecovery ? `${((latestRecovery.value - prevRecovery.value) / prevRecovery.value * 100).toFixed(0)}%` : '';

        const focusMetrics = metrics.filter(m => m.metric_type === 'focus_time');
        const totalFocus = focusMetrics.reduce((sum, m) => sum + parseFloat(m.value.toString()), 0);

        setSummaryMetrics({
          hrv: { value: latestHrv?.value.toString() || '--', trend: hrvTrend },
          sleep: { value: latestSleep ? `${latestSleep.value}/10` : '--', trend: 'Steady' },
          focus: { value: `${Math.round(totalFocus)}h`, trend: '+3 sessions' },
          recovery: { value: latestRecovery ? `${latestRecovery.value}%` : '--', trend: recoveryTrend }
        });
      }
    } catch (error) {
      console.error("Error loading chart data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      <div className="border-b border-mist/30 bg-gradient-to-b from-ivory to-pearl/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8">
          <h1 className="text-[2rem] font-semibold text-carbon tracking-tight mb-2">Performance Analytics</h1>
          <p className="text-sm text-ash">Visualise your biometric trends and patterns</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 animate-fade-in">
          {[
            { label: "Average HRV", value: summaryMetrics.hrv.value, trend: summaryMetrics.hrv.trend, icon: Activity, positive: true },
            { label: "Sleep Score", value: summaryMetrics.sleep.value, trend: summaryMetrics.sleep.trend, icon: Brain },
            { label: "Focus Time", value: summaryMetrics.focus.value, trend: summaryMetrics.focus.trend, icon: Target },
            { label: "Recovery", value: summaryMetrics.recovery.value, trend: summaryMetrics.recovery.trend, icon: TrendingUp, positive: true }
          ].map((metric, index) => (
            <Card key={index} className="border-mist/30 hover:border-mist transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-pearl/50 flex items-center justify-center">
                    <metric.icon className="w-4 h-4 text-ash" />
                  </div>
                  <div className="text-caption text-ash uppercase tracking-wider font-medium">{metric.label}</div>
                </div>
                <div className="text-[2rem] font-semibold text-carbon mb-1 tracking-tight">{metric.value}</div>
                {metric.trend && (
                  <div className={`text-caption font-medium ${metric.positive && metric.trend.includes('+') ? 'text-[#10b981]' : 'text-ash'}`}>
                    {metric.trend || 'No trend data'}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-mist/30 shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-[1.125rem] font-semibold text-carbon mb-6">HRV Trend</h3>
              <div className="h-72">
                {hrvData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hrvData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                      <XAxis dataKey="date" stroke="#999999" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#999999" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#1A1A1A" strokeWidth={2.5} dot={{ fill: '#1A1A1A', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center bg-pearl/30 rounded-xl">
                    <p className="text-sm text-ash">Connect a device to start tracking</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-ash mt-6 leading-relaxed">
                {hrvData.length > 1 ? 'Your HRV trend reflects your autonomic nervous system balance and recovery capacity.' : 'Connect a wearable device to track heart rate variability.'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-mist/30 shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-[1.125rem] font-semibold text-carbon mb-6">Sleep Stages</h3>
              <div className="h-72">
                {sleepData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sleepData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                      <XAxis dataKey="day" stroke="#999999" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#999999" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Deep" stackId="a" fill="#1A1A1A" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="REM" stackId="a" fill="#666666" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="Light" stackId="a" fill="#999999" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="Awake" stackId="a" fill="#E5E5E5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center bg-pearl/30 rounded-xl">
                    <p className="text-sm text-ash">Connect a device to start tracking</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-ash mt-6 leading-relaxed">
                {sleepData.length > 0 ? 'Sleep architecture reveals the quality and distribution of your rest cycles.' : 'Track sleep stages for deeper recovery insights.'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-mist/30 shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-[1.125rem] font-semibold text-carbon mb-6">Daily Energy Curve</h3>
              <div className="h-72">
                {energyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={energyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                      <XAxis 
                        dataKey="hour" 
                        stroke="#999999" 
                        style={{ fontSize: '10px' }}
                        interval={3}
                      />
                      <YAxis stroke="#999999" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="energy" stroke="#1A1A1A" strokeWidth={2} fill="#999999" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center bg-pearl/30 rounded-xl">
                    <p className="text-sm text-ash">Connect a device to start tracking</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-ash mt-6 leading-relaxed">
                Circadian rhythm analysis identifies optimal windows for focus, recovery, and performance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-mist/30 shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-[1.125rem] font-semibold text-carbon mb-6">Recovery Score</h3>
              <div className="h-72">
                {recoveryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={recoveryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                      <XAxis dataKey="day" stroke="#999999" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#999999" style={{ fontSize: '12px' }} domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="recovery" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center bg-pearl/30 rounded-xl">
                    <p className="text-sm text-ash">Connect a device to start tracking</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-ash mt-6 leading-relaxed">
                {recoveryData.length > 0 ? 'Recovery score indicates physiological readiness for training and performance demands.' : 'Track recovery to optimise training intensity.'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-mist/30 shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-[1.5rem] font-semibold text-carbon mb-8 tracking-tight">AI-Generated Insights</h2>
            
            <div className="space-y-8">
              <div className="p-6 rounded-xl bg-gradient-to-br from-pearl/30 to-mist/20 border border-mist/30">
                <h3 className="text-body font-semibold text-carbon mb-3">Sleep Quality Analysis</h3>
                <p className="text-sm text-ash leading-relaxed">
                  Connect a wearable device to receive personalised insights about your sleep architecture, REM efficiency, and recovery patterns.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-pearl/30 to-mist/20 border border-mist/30">
                <h3 className="text-body font-semibold text-carbon mb-3">Cognitive Performance Patterns</h3>
                <p className="text-sm text-ash leading-relaxed">
                  Track your focus and cognitive capacity throughout the day to identify optimal windows for deep work and creative tasks.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-pearl/30 to-mist/20 border border-mist/30">
                <h3 className="text-body font-semibold text-carbon mb-3">Protocol Optimisation</h3>
                <p className="text-sm text-ash leading-relaxed">
                  Nova analyses your biometric data to identify opportunities for improving energy, recovery, and performance through targeted interventions.
                </p>
              </div>
            </div>

            <div className="border-t border-mist/30 mt-12 pt-8">
              <h3 className="text-[1.125rem] font-semibold text-carbon mb-6">Your Performance Goals</h3>
              <div className="space-y-6">
                {[
                  { label: "Better Sleep", value: 65 },
                  { label: "Enhanced Focus", value: 75 },
                  { label: "Athletic Recovery", value: 85 }
                ].map((goal, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-carbon">{goal.label}</span>
                      <span className="text-sm font-semibold text-carbon">{goal.value}%</span>
                    </div>
                    <Progress value={goal.value} className="h-2.5" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
