import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Metric {
  label: string;
  value: string;
  trend?: string;
  trendColor?: string;
  rawValue: number;
}

export interface RealtimeMetrics {
  hrv: Metric | null;
  sleep: Metric | null;
  focus: Metric | null;
  recovery: Metric | null;
}

export function useRealtimeMetrics() {
  const [metrics, setMetrics] = useState<RealtimeMetrics>({
    hrv: null,
    sleep: null,
    focus: null,
    recovery: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const { toast } = useToast();

  const calculateTrend = (current: number, previous: number | null): { trend: string; color: string } | null => {
    if (!previous) return null;
    const change = ((current - previous) / previous * 100).toFixed(0);
    const numChange = parseFloat(change);
    return {
      trend: `${numChange > 0 ? '+' : ''}${change}%`,
      color: numChange > 0 ? 'text-accent' : numChange < 0 ? 'text-red-500' : 'text-stone'
    };
  };

  const loadMetrics = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      if (data && data.length > 0) {
        const newMetrics: RealtimeMetrics = {
          hrv: null,
          sleep: null,
          focus: null,
          recovery: null,
        };

        // Process HRV
        const hrvData = data.filter(m => m.metric_type === 'hrv');
        if (hrvData.length > 0) {
          const latest = hrvData[0];
          const previous = hrvData[1];
          const trendData = calculateTrend(latest.value, previous?.value);
          newMetrics.hrv = {
            label: 'HRV',
            value: Math.round(latest.value).toString(),
            trend: trendData?.trend,
            trendColor: trendData?.color,
            rawValue: latest.value
          };
        }

        // Process Sleep
        const sleepData = data.filter(m => m.metric_type === 'sleep_quality' || m.metric_type === 'sleep_duration');
        if (sleepData.length > 0) {
          const latest = sleepData[0];
          const previous = sleepData[1];
          const trendData = calculateTrend(latest.value, previous?.value);
          const displayValue = latest.metric_type === 'sleep_duration' 
            ? `${latest.value.toFixed(1)}h` 
            : `${latest.value}/10`;
          newMetrics.sleep = {
            label: 'Sleep',
            value: displayValue,
            trend: trendData?.trend,
            trendColor: trendData?.color,
            rawValue: latest.value
          };
        }

        // Process Focus - derive from activity data if no direct focus_time
        const focusData = data.filter(m => m.metric_type === 'focus_time');
        if (focusData.length > 0) {
          const total = focusData.slice(0, 7).reduce((sum, m) => sum + m.value, 0);
          newMetrics.focus = {
            label: 'Focus',
            value: `${Math.round(total)}h`,
            rawValue: total
          };
        } else {
          // Derive focus score from HRV and sleep quality (higher HRV + better sleep = better focus potential)
          const hrvValue = newMetrics.hrv?.rawValue;
          const sleepValue = newMetrics.sleep?.rawValue;
          if (hrvValue && sleepValue) {
            // Normalise HRV (typical range 20-100) and combine with sleep
            const hrvNorm = Math.min(Math.max((hrvValue - 20) / 80, 0), 1);
            const sleepNorm = sleepValue > 10 ? sleepValue / 10 : sleepValue / 10; // Handle both duration and quality
            const focusScore = Math.round((hrvNorm * 0.4 + sleepNorm * 0.6) * 10);
            newMetrics.focus = {
              label: 'Focus',
              value: `${focusScore}/10`,
              trend: focusScore >= 7 ? 'Good' : focusScore >= 5 ? 'Moderate' : 'Low',
              trendColor: focusScore >= 7 ? 'text-accent' : focusScore >= 5 ? 'text-orange-500' : 'text-red-500',
              rawValue: focusScore
            };
          }
        }

        // Process Recovery - derive from HRV and sleep if no direct recovery metric
        const recoveryData = data.filter(m => m.metric_type === 'recovery');
        if (recoveryData.length > 0) {
          const latest = recoveryData[0];
          const previous = recoveryData[1];
          const trendData = calculateTrend(latest.value, previous?.value);
          newMetrics.recovery = {
            label: 'Recovery',
            value: `${Math.round(latest.value)}%`,
            trend: trendData?.trend,
            trendColor: trendData?.color,
            rawValue: latest.value
          };
        } else {
          // Derive recovery from HRV (primary indicator) and sleep duration
          const hrvValue = newMetrics.hrv?.rawValue;
          const sleepValue = newMetrics.sleep?.rawValue;
          if (hrvValue) {
            // HRV-based recovery: higher HRV = better recovery
            // Typical HRV ranges: 20-40 (low), 40-60 (moderate), 60-100+ (good)
            let recoveryScore = Math.min(Math.round((hrvValue / 80) * 100), 100);
            
            // Boost if sleep is good (7+ hours or 7+ score)
            if (sleepValue && sleepValue >= 7) {
              recoveryScore = Math.min(recoveryScore + 10, 100);
            }
            
            const previous = data.filter(m => m.metric_type === 'hrv')[1];
            const prevRecovery = previous ? Math.min(Math.round((previous.value / 80) * 100), 100) : null;
            const trendData = calculateTrend(recoveryScore, prevRecovery);
            
            newMetrics.recovery = {
              label: 'Recovery',
              value: `${recoveryScore}%`,
              trend: trendData?.trend,
              trendColor: trendData?.color,
              rawValue: recoveryScore
            };
          }
        }

        setMetrics(newMetrics);
        
        // Get last sync time from metrics
        if (data[0]?.recorded_at) {
          setLastSync(new Date(data[0].recorded_at));
        }
      }
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadMetrics();
  }, [loadMetrics]);

  // Set up realtime subscription
  useEffect(() => {
    const setupRealtimeSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const channel = supabase
        .channel('user-metrics-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'user_metrics',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            console.log('New metric received:', payload);
            loadMetrics();
            setLastSync(new Date());
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    const cleanup = setupRealtimeSubscription();
    
    return () => {
      cleanup.then(fn => fn?.());
    };
  }, [loadMetrics]);

  // Sync function to trigger Vital API sync
  const syncDevices = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: 'Sign in required',
          description: 'Please sign in to sync devices.',
          variant: 'destructive',
        });
        return;
      }

      // Call Vital API to sync data
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/vital-connect`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ action: 'sync-data' }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // If user not found in Vital, show helpful message
        if (response.status === 404) {
          toast({
            title: 'No devices connected',
            description: 'Connect a wearable device first to sync data.',
            variant: 'destructive',
          });
          return;
        }
        
        throw new Error(errorData.error || 'Failed to sync data');
      }

      const data = await response.json();
      
      toast({
        title: 'Sync complete',
        description: `Synced ${data.synced?.sleep || 0} sleep and ${data.synced?.activity || 0} activity records.`,
      });

      // Refresh metrics after sync
      await loadMetrics();
      setLastSync(new Date());
    } catch (error) {
      console.error('Error syncing devices:', error);
      toast({
        title: 'Sync failed',
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive',
      });
    }
  }, [loadMetrics, toast]);

  return {
    metrics,
    isLoading,
    lastSync,
    syncDevices,
    refreshMetrics: loadMetrics
  };
}
