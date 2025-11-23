import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

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

      // Fetch last 8 days of metrics
      const eightDaysAgo = new Date();
      eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

      const { data: metrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .gte('recorded_at', eightDaysAgo.toISOString())
        .order('recorded_at', { ascending: true });

      if (metrics && metrics.length > 0) {
        // Process HRV data
        const hrvMetrics = metrics.filter(m => m.metric_type === 'hrv');
        const hrvChartData = hrvMetrics.map(m => ({
          date: new Date(m.recorded_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
          value: parseFloat(m.value.toString())
        }));
        setHrvData(hrvChartData);

        // Process sleep data
        const sleepMetrics = metrics.filter(m => m.metric_type === 'sleep_quality');
        const sleepChartData = sleepMetrics.slice(0, 7).map((m, i) => ({
          day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
          Deep: Math.round(Math.random() * 3 + 1),
          REM: Math.round(Math.random() * 2 + 1.5),
          Light: Math.round(Math.random() * 2 + 3),
          Awake: Math.round(Math.random() * 0.5 + 0.3)
        }));
        setSleepData(sleepChartData);

        // Process energy curve
        const energyCurve = Array.from({ length: 24 }, (_, i) => ({
          hour: `${i}:00`,
          energy: 50 + Math.sin((i - 6) / 3) * 30 + Math.random() * 10
        }));
        setEnergyData(energyCurve);

        // Process recovery data
        const recoveryMetrics = metrics.filter(m => m.metric_type === 'recovery');
        const recoveryChartData = recoveryMetrics.slice(0, 7).map((m, i) => ({
          day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
          recovery: parseFloat(m.value.toString())
        }));
        setRecoveryData(recoveryChartData);

        // Calculate summary metrics
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
      
      <div className="border-b border-mist bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6">
          <h1 className="text-h3 font-semibold text-carbon">Performance Analytics</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-caption text-ash uppercase tracking-wider mb-2">Average HRV</div>
              <div className="text-[2rem] font-semibold text-carbon mb-1">{summaryMetrics.hrv.value}</div>
              <div className="text-caption text-[#10b981]">{summaryMetrics.hrv.trend || 'No trend data'}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-caption text-ash uppercase tracking-wider mb-2">Sleep Score</div>
              <div className="text-[2rem] font-semibold text-carbon mb-1">{summaryMetrics.sleep.value}</div>
              <div className="text-caption text-ash">{summaryMetrics.sleep.trend}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-caption text-ash uppercase tracking-wider mb-2">Focus Time</div>
              <div className="text-[2rem] font-semibold text-carbon mb-1">{summaryMetrics.focus.value}</div>
              <div className="text-caption text-ash">{summaryMetrics.focus.trend}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-caption text-ash uppercase tracking-wider mb-2">Recovery</div>
              <div className="text-[2rem] font-semibold text-carbon mb-1">{summaryMetrics.recovery.value}</div>
              <div className="text-caption text-[#10b981]">{summaryMetrics.recovery.trend || 'No trend data'}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-body font-semibold text-carbon mb-4">HRV Trend</h3>
              <div className="h-64">
                {hrvData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hrvData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                      <XAxis dataKey="date" stroke="#666666" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#666666" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#1A1A1A" strokeWidth={2} dot={{ fill: '#1A1A1A' }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center bg-pearl rounded-lg">
                    <p className="text-sm text-ash">No HRV data available</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-ash mt-4">
                {hrvData.length > 1 ? 'Your HRV trend shows your recovery and stress levels over time.' : 'Connect a device to start tracking HRV.'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-body font-semibold text-carbon mb-4">Sleep Stages</h3>
              <div className="h-64">
                {sleepData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sleepData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                      <XAxis dataKey="day" stroke="#666666" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#666666" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Deep" stackId="a" fill="#1A1A1A" />
                      <Bar dataKey="REM" stackId="a" fill="#666666" />
                      <Bar dataKey="Light" stackId="a" fill="#999999" />
                      <Bar dataKey="Awake" stackId="a" fill="#E5E5E5" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center bg-pearl rounded-lg">
                    <p className="text-sm text-ash">No sleep data available</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-ash mt-4">
                {sleepData.length > 0 ? 'Track your sleep stages to optimize recovery and performance.' : 'Connect a device to start tracking sleep stages.'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-body font-semibold text-carbon mb-4">Daily Energy Curve</h3>
              <div className="h-64">
                {energyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={energyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                      <XAxis 
                        dataKey="hour" 
                        stroke="#666666" 
                        style={{ fontSize: '10px' }}
                        interval={3}
                      />
                      <YAxis stroke="#666666" style={{ fontSize: '12px' }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="energy" stroke="#1A1A1A" fill="#999999" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center bg-pearl rounded-lg">
                    <p className="text-sm text-ash">No energy data available</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-ash mt-4">
                Your energy patterns help identify optimal times for focused work and rest.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-body font-semibold text-carbon mb-4">Recovery Score</h3>
              <div className="h-64">
                {recoveryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={recoveryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                      <XAxis dataKey="day" stroke="#666666" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#666666" style={{ fontSize: '12px' }} domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="recovery" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center bg-pearl rounded-lg">
                    <p className="text-sm text-ash">No recovery data available</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-ash mt-4">
                {recoveryData.length > 0 ? 'Your recovery score indicates how ready your body is for training.' : 'Connect a device to start tracking recovery.'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8">
            <h2 className="text-h3 font-semibold text-carbon mb-8">AI-Generated Insights</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-body font-semibold text-carbon mb-3">Sleep Quality Improving</h3>
                <p className="text-sm text-ash leading-relaxed">
                  Connect a wearable device to receive personalized insights about your sleep patterns, HRV trends, and recovery metrics.
                </p>
              </div>

              <div>
                <h3 className="text-body font-semibold text-carbon mb-3">Focus Patterns</h3>
                <p className="text-sm text-ash leading-relaxed">
                  Track your cognitive performance throughout the day to identify optimal times for deep work and focused activities.
                </p>
              </div>

              <div>
                <h3 className="text-body font-semibold text-carbon mb-3">Optimization Opportunities</h3>
                <p className="text-sm text-ash leading-relaxed">
                  Nova analyzes your data to identify opportunities for improving energy, recovery, and performance through targeted protocols.
                </p>
              </div>
            </div>

            <div className="border-t border-mist mt-8 pt-8">
              <h3 className="text-body font-semibold text-carbon mb-6">Your Performance Goals</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-ash">Better Sleep</span>
                    <span className="text-sm font-semibold text-carbon">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-ash">Enhanced Focus</span>
                    <span className="text-sm font-semibold text-carbon">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-ash">Athletic Recovery</span>
                    <span className="text-sm font-semibold text-carbon">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}