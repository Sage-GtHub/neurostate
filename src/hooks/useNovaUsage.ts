import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NovaUsageRecord {
  id: string;
  user_id: string;
  organisation_id: string | null;
  session_started_at: string;
  session_ended_at: string | null;
  tokens_used: number;
  messages_count: number;
  feature_type: string;
  created_at: string;
}

export interface NovaUsageSummary {
  totalSessions: number;
  totalTokens: number;
  totalMessages: number;
  currentMonthSessions: number;
  currentMonthTokens: number;
  currentMonthMessages: number;
}

export interface OrgNovaUsage {
  userId: string;
  userName: string | null;
  userEmail: string | null;
  totalSessions: number;
  totalTokens: number;
  totalMessages: number;
  lastUsed: string | null;
}

export function useNovaUsage(organisationId?: string) {
  const [usage, setUsage] = useState<NovaUsageRecord[]>([]);
  const [summary, setSummary] = useState<NovaUsageSummary | null>(null);
  const [orgUsage, setOrgUsage] = useState<OrgNovaUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Fetch user's own usage
  const fetchUsage = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('nova_usage')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      
      // Type assertion since the table was just created
      const typedData = (data || []) as unknown as NovaUsageRecord[];
      setUsage(typedData);

      // Calculate summary
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const currentMonthData = typedData.filter(
        r => new Date(r.created_at) >= startOfMonth
      );

      setSummary({
        totalSessions: typedData.length,
        totalTokens: typedData.reduce((acc, r) => acc + (r.tokens_used || 0), 0),
        totalMessages: typedData.reduce((acc, r) => acc + (r.messages_count || 0), 0),
        currentMonthSessions: currentMonthData.length,
        currentMonthTokens: currentMonthData.reduce((acc, r) => acc + (r.tokens_used || 0), 0),
        currentMonthMessages: currentMonthData.reduce((acc, r) => acc + (r.messages_count || 0), 0),
      });
    } catch (error) {
      console.error('Error fetching Nova usage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch organisation-wide usage (for admins)
  const fetchOrgUsage = useCallback(async () => {
    if (!organisationId) return;

    try {
      const { data, error } = await supabase
        .from('nova_usage')
        .select('*')
        .eq('organisation_id', organisationId);

      if (error) throw error;

      const typedData = (data || []) as unknown as NovaUsageRecord[];

      // Group by user
      const userUsageMap = new Map<string, {
        sessions: number;
        tokens: number;
        messages: number;
        lastUsed: string | null;
      }>();

      typedData.forEach(record => {
        const existing = userUsageMap.get(record.user_id) || {
          sessions: 0,
          tokens: 0,
          messages: 0,
          lastUsed: null
        };

        userUsageMap.set(record.user_id, {
          sessions: existing.sessions + 1,
          tokens: existing.tokens + (record.tokens_used || 0),
          messages: existing.messages + (record.messages_count || 0),
          lastUsed: !existing.lastUsed || new Date(record.created_at) > new Date(existing.lastUsed)
            ? record.created_at
            : existing.lastUsed
        });
      });

      // Fetch user profiles
      const userIds = Array.from(userUsageMap.keys());
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds);

      const orgUsageData: OrgNovaUsage[] = Array.from(userUsageMap.entries()).map(([userId, data]) => {
        const profile = profiles?.find(p => p.id === userId);
        return {
          userId,
          userName: profile?.full_name || null,
          userEmail: profile?.email || null,
          totalSessions: data.sessions,
          totalTokens: data.tokens,
          totalMessages: data.messages,
          lastUsed: data.lastUsed
        };
      });

      setOrgUsage(orgUsageData.sort((a, b) => b.totalMessages - a.totalMessages));
    } catch (error) {
      console.error('Error fetching org Nova usage:', error);
    }
  }, [organisationId]);

  // Start a new usage session
  const startSession = useCallback(async (featureType: string = 'chat') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Get user's organisation
      const { data: membership } = await supabase
        .from('organisation_members')
        .select('organisation_id')
        .eq('user_id', user.id)
        .maybeSingle();

      const { data, error } = await supabase
        .from('nova_usage')
        .insert({
          user_id: user.id,
          organisation_id: membership?.organisation_id || null,
          feature_type: featureType,
          tokens_used: 0,
          messages_count: 0
        })
        .select()
        .single();

      if (error) throw error;

      const typedData = data as unknown as NovaUsageRecord;
      setCurrentSessionId(typedData.id);
      return typedData.id;
    } catch (error) {
      console.error('Error starting Nova session:', error);
      return null;
    }
  }, []);

  // Update session usage
  const updateSession = useCallback(async (
    sessionId: string,
    tokensUsed: number,
    messagesCount: number
  ) => {
    try {
      const { error } = await supabase
        .from('nova_usage')
        .update({
          tokens_used: tokensUsed,
          messages_count: messagesCount
        })
        .eq('id', sessionId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating Nova session:', error);
    }
  }, []);

  // End session
  const endSession = useCallback(async (sessionId?: string) => {
    const id = sessionId || currentSessionId;
    if (!id) return;

    try {
      const { error } = await supabase
        .from('nova_usage')
        .update({
          session_ended_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      setCurrentSessionId(null);
    } catch (error) {
      console.error('Error ending Nova session:', error);
    }
  }, [currentSessionId]);

  // Increment message count for current session
  const incrementMessages = useCallback(async (sessionId?: string, tokens: number = 0) => {
    const id = sessionId || currentSessionId;
    if (!id) return;

    try {
      // Get current values first
      const { data: current } = await supabase
        .from('nova_usage')
        .select('messages_count, tokens_used')
        .eq('id', id)
        .single();

      if (current) {
        const typedCurrent = current as { messages_count: number; tokens_used: number };
        await supabase
          .from('nova_usage')
          .update({
            messages_count: (typedCurrent.messages_count || 0) + 1,
            tokens_used: (typedCurrent.tokens_used || 0) + tokens
          })
          .eq('id', id);
      }
    } catch (error) {
      console.error('Error incrementing messages:', error);
    }
  }, [currentSessionId]);

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  useEffect(() => {
    if (organisationId) {
      fetchOrgUsage();
    }
  }, [organisationId, fetchOrgUsage]);

  return {
    usage,
    summary,
    orgUsage,
    loading,
    currentSessionId,
    startSession,
    updateSession,
    endSession,
    incrementMessages,
    refetch: fetchUsage,
    refetchOrgUsage: fetchOrgUsage
  };
}
