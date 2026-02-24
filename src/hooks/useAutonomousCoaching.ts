import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface AutonomousNudge {
  id: string;
  nudge_type: 'nudge' | 'risk_alert' | 'pattern' | 'prediction' | 'protocol_adjustment';
  category: string;
  title: string;
  description: string;
  impact: string | null;
  confidence: number;
  timing: string | null;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'completed' | 'dismissed' | 'expired';
  action_label: string | null;
  metadata: Record<string, any>;
  created_at: string;
}

export function useAutonomousCoaching() {
  const [nudges, setNudges] = useState<AutonomousNudge[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { toast } = useToast();

  const loadNudges = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsInitialLoading(false); return; }

      const { data, error } = await supabase
        .from('autonomous_nudges')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      setNudges((data || []).map(n => ({
        id: n.id,
        nudge_type: n.nudge_type as any,
        category: n.category,
        title: n.title,
        description: n.description,
        impact: n.impact,
        confidence: n.confidence || 75,
        timing: n.timing,
        priority: n.priority as any,
        status: n.status as any,
        action_label: n.action_label,
        metadata: (n.metadata as any) || {},
        created_at: n.created_at,
      })));
    } catch (err) {
      console.error('Error loading nudges:', err);
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  const generateCoaching = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Authentication required', description: 'Please sign in', variant: 'destructive' });
        return;
      }

      const response = await supabase.functions.invoke('autonomous-coaching', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (response.error) {
        const msg = typeof response.error === 'object' && 'message' in response.error
          ? (response.error as any).message : 'Failed to generate coaching actions';
        throw new Error(msg);
      }

      await loadNudges();
      toast({ title: 'Coaching updated', description: `Generated ${response.data?.actions_generated || 0} coaching actions` });
    } catch (error: any) {
      console.error('Error generating coaching:', error);
      toast({ title: 'Error', description: error?.message || 'Failed to generate coaching', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [loadNudges, toast]);

  const completeNudge = useCallback(async (id: string) => {
    try {
      await supabase
        .from('autonomous_nudges')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', id);
      setNudges(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error('Error completing nudge:', err);
    }
  }, []);

  const dismissNudge = useCallback(async (id: string) => {
    try {
      await supabase
        .from('autonomous_nudges')
        .update({ status: 'dismissed' })
        .eq('id', id);
      setNudges(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error('Error dismissing nudge:', err);
    }
  }, []);

  useEffect(() => {
    loadNudges();
  }, [loadNudges]);

  // Derived views
  const activeNudges = nudges.filter(n => n.nudge_type === 'nudge');
  const riskAlerts = nudges.filter(n => n.nudge_type === 'risk_alert');
  const patterns = nudges.filter(n => n.nudge_type === 'pattern');
  const predictions = nudges.filter(n => n.nudge_type === 'prediction');
  const protocolAdjustments = nudges.filter(n => n.nudge_type === 'protocol_adjustment');

  return {
    nudges,
    activeNudges,
    riskAlerts,
    patterns,
    predictions,
    protocolAdjustments,
    isLoading,
    isInitialLoading,
    generateCoaching,
    completeNudge,
    dismissNudge,
    refreshNudges: loadNudges,
  };
}
