import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface NovaInsight {
  id: string;
  type: 'warning' | 'pattern' | 'prediction' | 'optimisation';
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  evidence_grade?: string;
  pattern_category?: string;
  supporting_metrics?: {
    current_value?: string;
    baseline_value?: string;
    change_percentage?: number;
    trend_direction?: string;
  };
  recommendations: string[];
  data_sources: string[];
  created_at: string;
}

export function useNovaInsights() {
  const [insights, setInsights] = useState<NovaInsight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExisting, setIsLoadingExisting] = useState(true);
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
    } finally {
      setIsLoadingExisting(false);
    }
  };

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Authentication required', description: 'Please sign in to generate insights', variant: 'destructive' });
        return null;
      }

      const response = await supabase.functions.invoke('generate-insights', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (response.error) throw response.error;

      // Return fresh AI insights (with evidence grades) from the response
      const freshInsights: NovaInsight[] = (response.data.insights || []).map((i: any, idx: number) => ({
        id: `fresh-${idx}`,
        type: i.type,
        title: i.title,
        description: i.description,
        confidence: i.confidence,
        timeframe: i.timeframe,
        evidence_grade: i.evidence_grade,
        pattern_category: i.pattern_category,
        supporting_metrics: i.supporting_metrics,
        recommendations: i.recommendations || [],
        data_sources: i.data_sources || [],
        created_at: new Date().toISOString(),
      }));

      // Also reload from DB
      await loadInsights();

      toast({
        title: 'Insights generated',
        description: `Generated ${freshInsights.length} evidence-graded insights`,
      });

      return freshInsights;
    } catch (error: any) {
      console.error('Error generating insights:', error);
      const msg = error?.message || 'Failed to generate insights';
      toast({ title: 'Error', description: msg, variant: 'destructive' });
      return null;
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
    isLoadingExisting,
    generateInsights,
    refreshInsights: loadInsights
  };
}
