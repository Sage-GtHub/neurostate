import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface HealthForecast {
  id: string;
  date: string;
  optimal_training_window: string;
  energy_prediction: { hour: number; level: number }[];
  recovery_prediction: number;
  intervention_timing: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
}

export function useHealthForecast() {
  const [forecasts, setForecasts] = useState<HealthForecast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadForecasts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('health_forecasts')
        .select('*')
        .eq('user_id', user.id)
        .gte('forecast_date', today)
        .order('forecast_date', { ascending: true })
        .limit(7);

      if (error) throw error;

      setForecasts(data?.map(f => ({
        id: f.id,
        date: f.forecast_date,
        optimal_training_window: f.optimal_training_window || '',
        energy_prediction: f.energy_prediction as any || [],
        recovery_prediction: f.recovery_prediction || 0,
        intervention_timing: f.intervention_timing as any || { morning: [], afternoon: [], evening: [] }
      })) || []);
    } catch (error) {
      console.error('Error loading forecasts:', error);
    }
  };

  const generateForecast = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to generate forecasts',
          variant: 'destructive',
        });
        return;
      }

      const response = await supabase.functions.invoke('generate-health-forecast', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (response.error) throw response.error;

      await loadForecasts();

      toast({
        title: 'Forecast generated',
        description: 'Generated 7-day health forecast',
      });
    } catch (error) {
      console.error('Error generating forecast:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate forecast',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadForecasts();
  }, []);

  return {
    forecasts,
    isLoading,
    generateForecast,
    refreshForecasts: loadForecasts
  };
}
