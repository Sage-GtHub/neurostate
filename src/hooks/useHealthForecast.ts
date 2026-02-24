import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface EnergyPoint {
  hour: number;
  level: number;
}

export interface InterventionTiming {
  morning: string[];
  afternoon: string[];
  evening: string[];
}

export interface HealthForecast {
  id: string;
  date: string;
  optimal_training_window: string;
  energy_prediction: EnergyPoint[];
  recovery_prediction: number;
  intervention_timing: InterventionTiming;
}

export function useHealthForecast() {
  const [forecasts, setForecasts] = useState<HealthForecast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { toast } = useToast();

  const loadForecasts = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsInitialLoading(false); return; }

      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('health_forecasts')
        .select('*')
        .eq('user_id', user.id)
        .gte('forecast_date', today)
        .order('forecast_date', { ascending: true })
        .limit(7);

      if (error) throw error;

      setForecasts((data || []).map(f => ({
        id: f.id,
        date: f.forecast_date,
        optimal_training_window: f.optimal_training_window || '',
        energy_prediction: (f.energy_prediction as any) || [],
        recovery_prediction: f.recovery_prediction || 0,
        intervention_timing: (f.intervention_timing as any) || { morning: [], afternoon: [], evening: [] },
      })));
    } catch (error) {
      console.error('Error loading forecasts:', error);
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  const generateForecast = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Authentication required', description: 'Please sign in to generate forecasts', variant: 'destructive' });
        return;
      }

      const response = await supabase.functions.invoke('generate-health-forecast', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (response.error) {
        const msg = typeof response.error === 'object' && 'message' in response.error
          ? (response.error as any).message : 'Failed to generate forecast';
        throw new Error(msg);
      }

      await loadForecasts();
      toast({ title: 'Forecast generated', description: '7-day health forecast updated with latest biometric data' });
    } catch (error: any) {
      console.error('Error generating forecast:', error);
      toast({
        title: 'Forecast error',
        description: error?.message || 'Failed to generate forecast',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [loadForecasts, toast]);

  useEffect(() => {
    loadForecasts();
  }, [loadForecasts]);

  return {
    forecasts,
    isLoading,
    isInitialLoading,
    generateForecast,
    refreshForecasts: loadForecasts,
  };
}
