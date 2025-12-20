import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, TrendingDown, Minus, Activity, Moon, Brain, Zap, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface WeeklyMetric {
  label: string;
  thisWeek: number;
  lastWeek: number;
  change: number;
  unit: string;
  icon: React.ElementType;
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

      // Fetch metrics for this week and last week
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
        const metricConfigs: Record<string, { label: string; unit: string; icon: React.ElementType }> = {
          hrv: { label: 'HRV', unit: 'ms', icon: Activity },
          sleep_quality: { label: 'Sleep', unit: '/10', icon: Moon },
          recovery: { label: 'Recovery', unit: '%', icon: TrendingUp },
          focus_time: { label: 'Focus', unit: 'hrs', icon: Brain },
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
    if (change > 5) return "text-green-500";
    if (change < -5) return "text-red-500";
    return "text-muted-foreground";
  };

  if (isLoading) {
    return (
      <Card className="border-border/50 animate-pulse">
        <CardContent className="p-6">
          <div className="h-32 bg-muted rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  if (!hasData) {
    return (
      <Card className="border-border/50 bg-gradient-to-br from-muted/30 to-muted/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Weekly Summary</h3>
            <span className="text-xs text-muted-foreground">vs last week</span>
          </div>
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground mb-4">
              Connect a device and sync data to see your weekly progress
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/nova/devices')}
              className="gap-2"
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
    <Card className="border-border/50 bg-gradient-to-br from-muted/30 to-muted/10">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-foreground">Weekly Summary</h3>
          <span className="text-xs text-muted-foreground">vs last week</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => {
            const TrendIcon = getTrendIcon(metric.change);
            const trendColor = getTrendColor(metric.change);
            
            return (
              <div 
                key={metric.label}
                className="p-3 rounded-lg bg-background/50 border border-border/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{metric.label}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-lg font-bold text-foreground">
                      {metric.thisWeek}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      {metric.unit}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 ${trendColor}`}>
                    <TrendIcon className="w-3 h-3" />
                    <span className="text-xs font-medium">
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
          className="w-full mt-4 text-xs text-accent"
          onClick={() => navigate('/nova/trends')}
        >
          View Full Trends
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}