import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ReadinessData {
  score: number | null;
  trend: 'up' | 'down' | 'stable' | null;
  factors: {
    hrv: number | null;
    sleep: number | null;
    recovery: number | null;
    checkin: number | null;
  };
  recommendation: string;
}

export function useReadinessScore() {
  const [data, setData] = useState<ReadinessData>({
    score: null,
    trend: null,
    factors: { hrv: null, sleep: null, recovery: null, checkin: null },
    recommendation: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const calculateReadiness = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data: metrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(100);

      if (!metrics || metrics.length === 0) {
        setIsLoading(false);
        return;
      }

      const latestHrv = metrics.find(m => m.metric_type === 'hrv');
      const latestSleep = metrics.find(m => m.metric_type === 'sleep_quality' || m.metric_type === 'sleep_duration');
      const latestRecovery = metrics.find(m => m.metric_type === 'recovery');
      const latestCheckin = metrics.find(m => m.metric_type === 'morning_checkin');

      let hrvScore = null;
      let sleepScore = null;
      let recoveryScore = null;
      let checkinScore = null;

      if (latestHrv) {
        hrvScore = Math.min(Math.max(((latestHrv.value - 20) / 80) * 100, 0), 100);
      }

      if (latestSleep) {
        if (latestSleep.metric_type === 'sleep_duration') {
          const hours = latestSleep.value;
          if (hours >= 7 && hours <= 9) sleepScore = 90;
          else if (hours >= 6 && hours < 7) sleepScore = 70;
          else if (hours > 9 && hours <= 10) sleepScore = 75;
          else sleepScore = Math.max(50, 100 - Math.abs(7.5 - hours) * 15);
        } else {
          sleepScore = latestSleep.value * 10;
        }
      }

      if (latestRecovery) {
        recoveryScore = latestRecovery.value;
      }

      if (latestCheckin) {
        checkinScore = latestCheckin.value;
      }

      const weights = { hrv: 0.30, sleep: 0.30, recovery: 0.25, checkin: 0.15 };
      let totalWeight = 0;
      let weightedSum = 0;

      if (hrvScore !== null) { weightedSum += hrvScore * weights.hrv; totalWeight += weights.hrv; }
      if (sleepScore !== null) { weightedSum += sleepScore * weights.sleep; totalWeight += weights.sleep; }
      if (recoveryScore !== null) { weightedSum += recoveryScore * weights.recovery; totalWeight += weights.recovery; }
      if (checkinScore !== null) { weightedSum += checkinScore * weights.checkin; totalWeight += weights.checkin; }

      let score = null;
      let trend: 'up' | 'down' | 'stable' | null = null;
      let recommendation = 'Connect a device or complete your morning check-in to see your readiness score.';

      if (totalWeight > 0) {
        score = Math.round(weightedSum / totalWeight);

        // Generate recommendation
        if (score >= 80) {
          recommendation = 'Excellent readiness. This is a great day for high-intensity training or demanding cognitive work.';
        } else if (score >= 60) {
          recommendation = 'Good readiness. You can handle moderate training and focused work sessions.';
        } else if (score >= 40) {
          recommendation = 'Moderate readiness. Consider lighter activity and prioritise recovery today.';
        } else {
          recommendation = 'Low readiness. Focus on recovery, hydration, and rest. Avoid strenuous activity.';
        }

        // Calculate trend
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        const yesterdayMetrics = metrics.filter(m => m.recorded_at.startsWith(yesterdayStr));
        if (yesterdayMetrics.length > 0 && latestHrv) {
          const yesterdayHrv = yesterdayMetrics.find(m => m.metric_type === 'hrv');
          if (yesterdayHrv) {
            const diff = latestHrv.value - yesterdayHrv.value;
            if (diff > 5) trend = 'up';
            else if (diff < -5) trend = 'down';
            else trend = 'stable';
          }
        }
      }

      setData({
        score,
        trend,
        factors: { hrv: hrvScore, sleep: sleepScore, recovery: recoveryScore, checkin: checkinScore },
        recommendation,
      });
    } catch (error) {
      console.error('Error calculating readiness:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    calculateReadiness();
  }, [calculateReadiness]);

  return { ...data, isLoading, refresh: calculateReadiness };
}
