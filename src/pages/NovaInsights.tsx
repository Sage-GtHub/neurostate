import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
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
      
      <div className="border-b border-mist/20 bg-gradient-to-b from-ivory to-pearl/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          <h1 className="text-[2rem] font-normal text-carbon tracking-tight mb-3">Performance Analytics</h1>
          <p className="text-sm text-ash/70">Visualise your biometric trends and patterns</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 animate-fade-in">
          {[
            { label: "Average HRV", value: summaryMetrics.hrv.value, trend: summaryMetrics.hrv.trend, icon: Activity, positive: true },
            { label: "Sleep Score", value: summaryMetrics.sleep.value, trend: summaryMetrics.sleep.trend, icon: Brain },
            { label: "Focus Time", value: summaryMetrics.focus.value, trend: summaryMetrics.focus.trend, icon: Target },
            { label: "Recovery", value: summaryMetrics.recovery.value, trend: summaryMetrics.recovery.trend, icon: TrendingUp, positive: true }
          ].map((metric, index) => (
            <div key={index} className="group">
              <div className="flex items-center gap-3 mb-5">
                <metric.icon className="w-4 h-4 text-ash/60 group-hover:text-carbon transition-colors duration-300" />
                <div className="text-caption text-ash/80 uppercase tracking-[0.15em] font-normal">{metric.label}</div>
              </div>
              <div className="text-[2.5rem] font-normal text-carbon mb-2 tracking-tighter">{metric.value}</div>
              {metric.trend && (
                <div className={`text-caption font-normal ${metric.positive && metric.trend.includes('+') ? 'text-[#10b981]' : 'text-ash/70'}`}>
                  {metric.trend || 'No trend data'}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-6">
            <h3 className="text-[1rem] font-normal text-carbon/80 tracking-tight uppercase text-caption">HRV Trend</h3>
            <div className="h-80 p-10 bg-gradient-to-br from-pearl/20 to-transparent rounded-3xl">
              {hrvData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hrvData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" opacity={0.3} />
                    <XAxis dataKey="date" stroke="#999999" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#999999" style={{ fontSize: '11px' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#1A1A1A" strokeWidth={2} dot={{ fill: '#1A1A1A', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-ash/60">Connect a device to start tracking</p>
                </div>
              )}
            </div>
            <p className="text-sm text-ash/70 leading-relaxed">
              {hrvData.length > 1 ? 'Your HRV trend reflects your autonomic nervous system balance and recovery capacity.' : 'Connect a wearable device to track heart rate variability.'}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-[1rem] font-normal text-carbon/80 tracking-tight uppercase text-caption">Sleep Stages</h3>
            <div className="h-80 p-10 bg-gradient-to-br from-pearl/20 to-transparent rounded-3xl">
              {sleepData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" opacity={0.3} />
                    <XAxis dataKey="day" stroke="#999999" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#999999" style={{ fontSize: '11px' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Deep" stackId="a" fill="#1A1A1A" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="REM" stackId="a" fill="#666666" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Light" stackId="a" fill="#999999" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Awake" stackId="a" fill="#E5E5E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-ash/60">Connect a device to start tracking</p>
                </div>
              )}
            </div>
            <p className="text-sm text-ash/70 leading-relaxed">
              {sleepData.length > 0 ? 'Sleep architecture reveals the quality and distribution of your rest cycles.' : 'Track sleep stages for deeper recovery insights.'}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-[1rem] font-normal text-carbon/80 tracking-tight uppercase text-caption">Daily Energy Curve</h3>
            <div className="h-80 p-10 bg-gradient-to-br from-pearl/20 to-transparent rounded-3xl">
              {energyData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" opacity={0.3} />
                    <XAxis 
                      dataKey="hour" 
                      stroke="#999999" 
                      style={{ fontSize: '10px' }}
                      interval={3}
                    />
                    <YAxis stroke="#999999" style={{ fontSize: '11px' }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="energy" stroke="#1A1A1A" strokeWidth={1.5} fill="#999999" fillOpacity={0.15} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-ash/60">Connect a device to start tracking</p>
                </div>
              )}
            </div>
            <p className="text-sm text-ash/70 leading-relaxed">
              Circadian rhythm analysis identifies optimal windows for focus, recovery, and performance.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-[1rem] font-normal text-carbon/80 tracking-tight uppercase text-caption">Recovery Score</h3>
            <div className="h-80 p-10 bg-gradient-to-br from-pearl/20 to-transparent rounded-3xl">
              {recoveryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={recoveryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" opacity={0.3} />
                    <XAxis dataKey="day" stroke="#999999" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#999999" style={{ fontSize: '11px' }} domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="recovery" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-ash/60">Connect a device to start tracking</p>
                </div>
              )}
            </div>
            <p className="text-sm text-ash/70 leading-relaxed">
              {recoveryData.length > 0 ? 'Recovery score indicates physiological readiness for training and performance demands.' : 'Track recovery to optimise training intensity.'}
            </p>
          </div>
        </div>

        <div className="space-y-16 py-12">
          <div className="space-y-12">
            <h2 className="text-[1rem] font-normal text-carbon/80 tracking-tight uppercase text-caption">AI-Generated Insights</h2>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="space-y-5 p-10 bg-gradient-to-br from-pearl/20 to-transparent rounded-3xl">
                <h3 className="text-body font-normal text-carbon">Sleep Quality Analysis</h3>
                <p className="text-sm text-ash/70 leading-relaxed">
                  Connect a wearable device to receive personalised insights about your sleep architecture, REM efficiency, and recovery patterns.
                </p>
              </div>

              <div className="space-y-5 p-10 bg-gradient-to-br from-pearl/20 to-transparent rounded-3xl">
                <h3 className="text-body font-normal text-carbon">Cognitive Performance Patterns</h3>
                <p className="text-sm text-ash/70 leading-relaxed">
                  Track your focus and cognitive capacity throughout the day to identify optimal windows for deep work and creative tasks.
                </p>
              </div>

              <div className="space-y-5 p-10 bg-gradient-to-br from-pearl/20 to-transparent rounded-3xl">
                <h3 className="text-body font-normal text-carbon">Protocol Optimisation</h3>
                <p className="text-sm text-ash/70 leading-relaxed">
                  Nova analyses your biometric data to identify opportunities for improving energy, recovery, and performance through targeted interventions.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-12 pt-12 border-t border-mist/20">
            <h3 className="text-[1rem] font-normal text-carbon/80 tracking-tight uppercase text-caption">Your Performance Goals</h3>
            <div className="grid md:grid-cols-3 gap-16">
              {[
                { label: "Better Sleep", value: 65 },
                { label: "Enhanced Focus", value: 75 },
                { label: "Athletic Recovery", value: 85 }
              ].map((goal, index) => (
                <div key={index} className="space-y-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-normal text-carbon/80">{goal.label}</span>
                    <span className="text-[1.75rem] font-normal text-carbon tracking-tighter">{goal.value}%</span>
                  </div>
                  <Progress value={goal.value} className="h-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
