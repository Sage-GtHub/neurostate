import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { FloatingNovaChat } from "@/components/nova/FloatingNovaChat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Minus, Loader2, Activity, Brain, Target, Heart, AlertCircle } from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";

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

export default function NovaHistoricalTrends() {
  const [timeRange, setTimeRange] = useState<"30" | "90">("30");
  const [trendData, setTrendData] = useState<TrendData>({ hrv: [], sleep: [], recovery: [], focus: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTrendData();
  }, [timeRange]);

  const loadTrendData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
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

      // Group by metric type and date
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

      // Average values per day
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
      setError("Failed to load trend data");
    } finally {
      setIsLoading(false);
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
    return <Minus className="w-4 h-4 text-ash" />;
  };

  const metrics = [
    { key: "hrv", label: "HRV", icon: Heart, color: "#00A67F", data: trendData.hrv, unit: "ms" },
    { key: "sleep", label: "Sleep Score", icon: Brain, color: "#6366f1", data: trendData.sleep, unit: "" },
    { key: "recovery", label: "Recovery", icon: Activity, color: "#f59e0b", data: trendData.recovery, unit: "%" },
    { key: "focus", label: "Focus", icon: Target, color: "#ec4899", data: trendData.focus, unit: "" },
  ];

  if (isLoading) {
    return (
      <NovaSwipeWrapper>
        <SEO title="Historical Trends – Cognitive Performance Analytics | Nova" description="30-day and 90-day biometric trend analysis with predictive performance modelling." />
        <div className="min-h-screen bg-white">
          <NovaNav />
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO title="Historical Trends – Cognitive Performance Analytics | Nova" description="30-day and 90-day biometric trend analysis with predictive performance modelling." />
      <div className="min-h-screen bg-white">
        <NovaNav />

        <div className="border-b border-mist bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 sm:py-8">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-2">Analytics</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-carbon">Historical Trends</h1>
            <p className="text-sm text-ash mt-1">Track your biometric patterns over time</p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8 sm:py-12">
          {/* Time Range Selector */}
          <div className="flex justify-center mb-8">
            <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as "30" | "90")}>
              <TabsList>
                <TabsTrigger value="30">30 Days</TabsTrigger>
                <TabsTrigger value="90">90 Days</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-ash mb-4">{error}</p>
              <Button onClick={loadTrendData} variant="outline">Try Again</Button>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {metrics.map((metric) => {
                const trend = calculateTrend(metric.data);
                const latestValue = metric.data[metric.data.length - 1]?.value || "--";
                const hasData = metric.data.length > 0;

                return (
                  <Card key={metric.key} className="border-mist/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${metric.color}15` }}>
                            <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-carbon">{metric.label}</h3>
                            <p className="text-sm text-ash">
                              Current: {latestValue}{metric.unit}
                            </p>
                          </div>
                        </div>
                        {hasData && (
                          <div className="flex items-center gap-2">
                            <TrendIcon direction={trend.direction} />
                            <span className={`text-sm font-medium ${
                              trend.direction === "up" ? "text-accent" :
                              trend.direction === "down" ? "text-red-500" : "text-ash"
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
                              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
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
                                  backgroundColor: '#fff', 
                                  border: '1px solid #E5E5E5',
                                  borderRadius: '8px',
                                  fontSize: '12px',
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
                            <p className="text-ash mb-2">No data available</p>
                            <p className="text-xs text-stone">Connect a device to start tracking</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
        
        <FloatingNovaChat />
      </div>
    </NovaSwipeWrapper>
  );
}
