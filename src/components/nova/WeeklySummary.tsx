import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, TrendingDown, Minus, Activity, Moon, Brain, Zap, ChevronRight, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WeeklyMetric {
  label: string;
  thisWeek: number;
  lastWeek: number;
  change: number;
  unit: string;
  icon: React.ElementType;
  gradient: string;
}

export function WeeklySummary() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<WeeklyMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    loadWeeklyData();
  }, []);

  const loadWeeklyData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const now = new Date();
      const thisWeekStart = new Date(now);
      thisWeekStart.setDate(now.getDate() - 7);
      
      const lastWeekStart = new Date(now);
      lastWeekStart.setDate(now.getDate() - 14);
      const lastWeekEnd = new Date(now);
      lastWeekEnd.setDate(now.getDate() - 7);

      const [thisWeekData, lastWeekData] = await Promise.all([
        supabase
          .from('user_metrics')
          .select('metric_type, value')
          .eq('user_id', user.id)
          .gte('recorded_at', thisWeekStart.toISOString())
          .lte('recorded_at', now.toISOString()),
        supabase
          .from('user_metrics')
          .select('metric_type, value')
          .eq('user_id', user.id)
          .gte('recorded_at', lastWeekStart.toISOString())
          .lte('recorded_at', lastWeekEnd.toISOString()),
      ]);

      if (thisWeekData.data && thisWeekData.data.length > 0) {
        setHasData(true);
        
        const metricTypes = ['hrv', 'sleep_quality', 'recovery', 'focus_time'];
        const metricConfigs: Record<string, { label: string; unit: string; icon: React.ElementType; gradient: string }> = {
          hrv: { label: 'HRV', unit: 'ms', icon: Activity, gradient: 'from-rose-500 to-pink-500' },
          sleep_quality: { label: 'Sleep', unit: '/10', icon: Moon, gradient: 'from-indigo-500 to-purple-500' },
          recovery: { label: 'Recovery', unit: '%', icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500' },
          focus_time: { label: 'Focus', unit: 'hrs', icon: Brain, gradient: 'from-nova-accent to-nova-glow' },
        };

        const weeklyMetrics = metricTypes.map(type => {
          const thisWeekValues = thisWeekData.data
            ?.filter(m => m.metric_type === type)
            .map(m => parseFloat(m.value.toString())) || [];
          
          const lastWeekValues = lastWeekData.data
            ?.filter(m => m.metric_type === type)
            .map(m => parseFloat(m.value.toString())) || [];

          const thisWeekAvg = thisWeekValues.length > 0 
            ? thisWeekValues.reduce((a, b) => a + b, 0) / thisWeekValues.length 
            : 0;
          
          const lastWeekAvg = lastWeekValues.length > 0 
            ? lastWeekValues.reduce((a, b) => a + b, 0) / lastWeekValues.length 
            : 0;

          const change = lastWeekAvg > 0 
            ? ((thisWeekAvg - lastWeekAvg) / lastWeekAvg) * 100 
            : 0;

          return {
            label: metricConfigs[type].label,
            thisWeek: Math.round(thisWeekAvg * 10) / 10,
            lastWeek: Math.round(lastWeekAvg * 10) / 10,
            change: Math.round(change),
            unit: metricConfigs[type].unit,
            icon: metricConfigs[type].icon,
            gradient: metricConfigs[type].gradient,
          };
        });

        setMetrics(weeklyMetrics);
      }
    } catch (error) {
      console.error("Error loading weekly data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendIcon = (change: number) => {
    if (change > 5) return TrendingUp;
    if (change < -5) return TrendingDown;
    return Minus;
  };

  const getTrendColor = (change: number) => {
    if (change > 5) return "text-emerald-400";
    if (change < -5) return "text-rose-400";
    return "text-muted-foreground";
  };

  const getTrendBg = (change: number) => {
    if (change > 5) return "bg-emerald-500/10";
    if (change < -5) return "bg-rose-500/10";
    return "bg-muted/20";
  };

  if (isLoading) {
    return (
      <Card className="nova-card animate-pulse">
        <CardContent className="p-6">
          <div className="h-40 bg-muted/20 rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  if (!hasData) {
    return (
      <Card className="nova-card overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nova-accent/20 to-nova-glow/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-nova-accent" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Weekly Summary</h3>
            </div>
            <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted/20">vs last week</span>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-muted/20 flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Connect a device and sync data to see your weekly progress
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/nova/devices')}
              className="gap-2 nova-glass border-nova-border hover:border-nova-accent/50 hover:bg-nova-accent/10"
            >
              Connect Device
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="nova-card overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-nova-accent/20 to-nova-glow/20 flex items-center justify-center nova-glow">
              <BarChart3 className="w-5 h-5 text-nova-accent" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Weekly Summary</h3>
          </div>
          <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted/20">vs last week</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric) => {
            const TrendIcon = getTrendIcon(metric.change);
            const trendColor = getTrendColor(metric.change);
            const trendBg = getTrendBg(metric.change);
            
            return (
              <div 
                key={metric.label}
                className="group p-4 rounded-xl nova-glass border border-nova-border/50 hover:border-nova-accent/30 transition-all duration-300 hover:nova-glow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center",
                    metric.gradient
                  )}>
                    <metric.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{metric.label}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-bold text-foreground">
                      {metric.thisWeek}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      {metric.unit}
                    </span>
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    trendBg,
                    trendColor
                  )}>
                    <TrendIcon className="w-3 h-3" />
                    <span>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Button 
          variant="ghost" 
          className="w-full mt-4 text-sm text-nova-accent hover:bg-nova-accent/10 group"
          onClick={() => navigate('/nova/trends')}
        >
          View Full Trends
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
