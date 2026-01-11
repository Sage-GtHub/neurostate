import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Activity {
  id: string;
  user_id: string;
  activity_type: string;
  title: string;
  description: string | null;
  metadata: Record<string, any>;
  is_read: boolean;
  created_at: string;
}

export function useActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchActivities = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('activity_feed')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (data) {
      setActivities(data as Activity[]);
      setUnreadCount(data.filter(a => !a.is_read).length);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const markAsRead = useCallback(async (activityId: string) => {
    const { error } = await supabase
      .from('activity_feed')
      .update({ is_read: true })
      .eq('id', activityId);

    if (!error) {
      setActivities(prev => 
        prev.map(a => a.id === activityId ? { ...a, is_read: true } : a)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('activity_feed')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    if (!error) {
      setActivities(prev => prev.map(a => ({ ...a, is_read: true })));
      setUnreadCount(0);
    }
  }, []);

  const addActivity = useCallback(async (
    activity_type: string,
    title: string,
    description?: string,
    metadata?: Record<string, any>
  ) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('activity_feed')
      .insert({
        user_id: user.id,
        activity_type,
        title,
        description,
        metadata: metadata || {}
      })
      .select()
      .single();

    if (data && !error) {
      setActivities(prev => [data as Activity, ...prev]);
      setUnreadCount(prev => prev + 1);
    }
  }, []);

  const deleteActivity = useCallback(async (activityId: string) => {
    const { error } = await supabase
      .from('activity_feed')
      .delete()
      .eq('id', activityId);

    if (!error) {
      setActivities(prev => prev.filter(a => a.id !== activityId));
    }
  }, []);

  const clearAll = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('activity_feed')
      .delete()
      .eq('user_id', user.id);

    if (!error) {
      setActivities([]);
      setUnreadCount(0);
    }
  }, []);

  return {
    activities,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    addActivity,
    deleteActivity,
    clearAll,
    refetch: fetchActivities,
  };
}
