import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Gauge, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ReadinessScoreProps {
  compact?: boolean;
}

export function ReadinessScore({ compact = false }: ReadinessScoreProps) {
  const [score, setScore] = useState<number | null>(null);
  const [trend, setTrend] = useState<"up" | "down" | "stable" | null>(null);
  const [factors, setFactors] = useState<{
    hrv: number | null;
    sleep: number | null;
    recovery: number | null;
    checkin: number | null;
  }>({
    hrv: null,
    sleep: null,
    recovery: null,
    checkin: null,
  });

  useEffect(() => {
    calculateReadiness();
  }, []);

  const calculateReadiness = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get recent metrics
      const { data: metrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(100);

      if (!metrics || metrics.length === 0) return;

      // Get latest of each type
      const latestHrv = metrics.find(m => m.metric_type === 'hrv');
      const latestSleep = metrics.find(m => m.metric_type === 'sleep_quality' || m.metric_type === 'sleep_duration');
      const latestRecovery = metrics.find(m => m.metric_type === 'recovery');
      const latestCheckin = metrics.find(m => m.metric_type === 'morning_checkin');

      // Normalise each factor to 0-100
      let hrvScore = null;
      let sleepScore = null;
      let recoveryScore = null;
      let checkinScore = null;

      if (latestHrv) {
        // HRV: typical range 20-100, normalise to 0-100
        hrvScore = Math.min(Math.max(((latestHrv.value - 20) / 80) * 100, 0), 100);
      }

      if (latestSleep) {
        if (latestSleep.metric_type === 'sleep_duration') {
          // Sleep duration: 6-9 hours ideal
          const hours = latestSleep.value;
          if (hours >= 7 && hours <= 9) sleepScore = 90;
          else if (hours >= 6 && hours < 7) sleepScore = 70;
          else if (hours > 9 && hours <= 10) sleepScore = 75;
          else sleepScore = Math.max(50, 100 - Math.abs(7.5 - hours) * 15);
        } else {
          // Sleep quality: direct score out of 10
          sleepScore = latestSleep.value * 10;
        }
      }

      if (latestRecovery) {
        recoveryScore = latestRecovery.value;
      }

      if (latestCheckin) {
        checkinScore = latestCheckin.value;
      }

      setFactors({
        hrv: hrvScore,
        sleep: sleepScore,
        recovery: recoveryScore,
        checkin: checkinScore,
      });

      // Calculate weighted readiness score
      const weights = {
        hrv: 0.30,
        sleep: 0.30,
        recovery: 0.25,
        checkin: 0.15,
      };

      let totalWeight = 0;
      let weightedSum = 0;

      if (hrvScore !== null) {
        weightedSum += hrvScore * weights.hrv;
        totalWeight += weights.hrv;
      }
      if (sleepScore !== null) {
        weightedSum += sleepScore * weights.sleep;
        totalWeight += weights.sleep;
      }
      if (recoveryScore !== null) {
        weightedSum += recoveryScore * weights.recovery;
        totalWeight += weights.recovery;
      }
      if (checkinScore !== null) {
        weightedSum += checkinScore * weights.checkin;
        totalWeight += weights.checkin;
      }

      if (totalWeight > 0) {
        const calculatedScore = Math.round(weightedSum / totalWeight);
        setScore(calculatedScore);

        // Calculate trend from yesterday's metrics
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        const yesterdayMetrics = metrics.filter(m => 
          m.recorded_at.startsWith(yesterdayStr)
        );

        if (yesterdayMetrics.length > 0) {
          const yesterdayHrv = yesterdayMetrics.find(m => m.metric_type === 'hrv');
          if (yesterdayHrv && latestHrv) {
            const diff = latestHrv.value - yesterdayHrv.value;
            if (diff > 5) setTrend("up");
            else if (diff < -5) setTrend("down");
            else setTrend("stable");
          }
        }
      }
    } catch (error) {
      console.error("Error calculating readiness:", error);
    }
  };

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-green-500";
    if (s >= 60) return "text-accent";
    if (s >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreLabel = (s: number) => {
    if (s >= 80) return "Optimal";
    if (s >= 60) return "Good";
    if (s >= 40) return "Moderate";
    return "Low";
  };

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-background to-muted/20 border border-border/50">
        <div className="relative">
          <Gauge className={`w-8 h-8 ${score ? getScoreColor(score) : 'text-muted-foreground'}`} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Readiness</p>
          <p className={`text-2xl font-bold ${score ? getScoreColor(score) : 'text-muted-foreground'}`}>
            {score !== null ? `${score}%` : '--'}
          </p>
        </div>
        {trend && (
          <TrendIcon className={`w-4 h-4 ml-auto ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`} />
        )}
      </div>
    );
  }

  return (
    <Card className="border-border/50 overflow-hidden">
      <div className={`h-1 ${score ? (score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-accent' : score >= 40 ? 'bg-orange-500' : 'bg-red-500') : 'bg-muted'}`} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${score ? (score >= 60 ? 'bg-accent/10' : 'bg-orange-500/10') : 'bg-muted'} flex items-center justify-center`}>
              <Gauge className={`w-6 h-6 ${score ? getScoreColor(score) : 'text-muted-foreground'}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Daily Readiness</h3>
              <p className="text-sm text-muted-foreground">
                {score !== null ? getScoreLabel(score) : 'Calculating...'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-4xl font-bold ${score ? getScoreColor(score) : 'text-muted-foreground'}`}>
              {score !== null ? score : '--'}
            </p>
            <div className="flex items-center gap-1 justify-end mt-1">
              {trend && <TrendIcon className={`w-3 h-3 ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`} />}
              <span className="text-xs text-muted-foreground">
                {trend === 'up' ? 'vs yesterday' : trend === 'down' ? 'vs yesterday' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Factor breakdown */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "HRV", value: factors.hrv },
            { label: "Sleep", value: factors.sleep },
            { label: "Recovery", value: factors.recovery },
            { label: "Check-in", value: factors.checkin },
          ].map((factor) => (
            <div key={factor.label} className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">{factor.label}</p>
              <p className={`text-sm font-semibold ${factor.value !== null ? getScoreColor(factor.value) : 'text-muted-foreground'}`}>
                {factor.value !== null ? `${Math.round(factor.value)}%` : '--'}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
