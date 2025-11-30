import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface NovaInsight {
  id: string;
  type: 'warning' | 'pattern' | 'prediction' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  recommendations: string[];
  data_sources: string[];
  created_at: string;
}

export function useNovaInsights() {
  const [insights, setInsights] = useState<NovaInsight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadInsights = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('ai_insights')
        .select('*')
        .eq('user_id', user.id)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      setInsights(data?.map(insight => ({
        id: insight.id,
        type: insight.insight_type as any,
        title: insight.title,
        description: insight.description,
        confidence: insight.confidence_score || 85,
        timeframe: insight.timeframe || 'ongoing',
        recommendations: insight.recommendations as string[] || [],
        data_sources: insight.data_sources as string[] || [],
        created_at: insight.created_at
      })) || []);
    } catch (error) {
      console.error('Error loading insights:', error);
    }
  };

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to generate insights',
          variant: 'destructive',
        });
        return;
      }

      const response = await supabase.functions.invoke('generate-insights', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (response.error) throw response.error;

      await loadInsights();

      toast({
        title: 'Insights generated',
        description: `Generated ${response.data.insights?.length || 0} new insights`,
      });
    } catch (error) {
      console.error('Error generating insights:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate insights',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  return {
    insights,
    isLoading,
    generateInsights,
    refreshInsights: loadInsights
  };
}
