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
            value: latest.value.toString(),
            trend: trendData?.trend,
            trendColor: trendData?.color,
            rawValue: latest.value
          };
        }

        // Process Sleep
        const sleepData = data.filter(m => m.metric_type === 'sleep_quality');
        if (sleepData.length > 0) {
          const latest = sleepData[0];
          const previous = sleepData[1];
          const trendData = calculateTrend(latest.value, previous?.value);
          newMetrics.sleep = {
            label: 'Sleep',
            value: `${latest.value}/10`,
            trend: trendData?.trend,
            trendColor: trendData?.color,
            rawValue: latest.value
          };
        }

        // Process Focus
        const focusData = data.filter(m => m.metric_type === 'focus_time');
        if (focusData.length > 0) {
          const total = focusData.slice(0, 7).reduce((sum, m) => sum + m.value, 0);
          newMetrics.focus = {
            label: 'Focus',
            value: `${Math.round(total)}h`,
            rawValue: total
          };
        }

        // Process Recovery
        const recoveryData = data.filter(m => m.metric_type === 'recovery');
        if (recoveryData.length > 0) {
          const latest = recoveryData[0];
          const previous = recoveryData[1];
          const trendData = calculateTrend(latest.value, previous?.value);
          newMetrics.recovery = {
            label: 'Recovery',
            value: `${latest.value}%`,
            trend: trendData?.trend,
            trendColor: trendData?.color,
            rawValue: latest.value
          };
        }

        setMetrics(newMetrics);
        setLastSync(new Date());
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
            // Refresh metrics when new data arrives
            loadMetrics();
            
            toast({
              title: 'Data synced',
              description: 'New biometric data received from your device.',
            });
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
  }, [loadMetrics, toast]);

  // Sync function to manually trigger device sync
  const syncDevices = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get connected devices
      const { data: devices } = await supabase
        .from('connected_devices')
        .select('*')
        .eq('user_id', user.id)
        .eq('connection_status', 'connected');

      if (!devices || devices.length === 0) {
        toast({
          title: 'No devices connected',
          description: 'Connect a device to sync biometric data.',
          variant: 'destructive',
        });
        return;
      }

      // Simulate device sync by generating new metrics
      const newMetrics = [
        { 
          metric_type: 'hrv', 
          value: (metrics.hrv?.rawValue || 65) + (Math.random() * 10 - 5),
          device_source: devices[0].device_type
        },
        { 
          metric_type: 'sleep_quality', 
          value: Math.min(10, Math.max(1, (metrics.sleep?.rawValue || 7) + (Math.random() * 2 - 1))),
          device_source: devices[0].device_type
        },
        { 
          metric_type: 'recovery', 
          value: Math.min(100, Math.max(0, (metrics.recovery?.rawValue || 75) + (Math.random() * 10 - 5))),
          device_source: devices[0].device_type
        },
        { 
          metric_type: 'focus_time', 
          value: Math.random() * 3 + 1,
          device_source: devices[0].device_type
        },
      ];

      for (const metric of newMetrics) {
        await supabase.from('user_metrics').insert({
          user_id: user.id,
          metric_type: metric.metric_type,
          value: Math.round(metric.value * 10) / 10,
          device_source: metric.device_source
        });
      }

      // Update device last_sync_at
      await supabase
        .from('connected_devices')
        .update({ last_sync_at: new Date().toISOString() })
        .eq('user_id', user.id);

      toast({
        title: 'Sync complete',
        description: 'Your biometric data has been updated.',
      });

      // Refresh metrics
      await loadMetrics();
    } catch (error) {
      console.error('Error syncing devices:', error);
      toast({
        title: 'Sync failed',
        description: 'Failed to sync device data. Please try again.',
        variant: 'destructive',
      });
    }
  }, [metrics, loadMetrics, toast]);

  return {
    metrics,
    isLoading,
    lastSync,
    syncDevices,
    refreshMetrics: loadMetrics
  };
}