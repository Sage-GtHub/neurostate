import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();
  const userIdRef = useRef<string | null>(null);

  const fetchActivities = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }
    userIdRef.current = user.id;

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

  // Set up real-time subscription
  useEffect(() => {
    fetchActivities();

    const channel = supabase
      .channel('activity-feed-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_feed',
        },
        (payload) => {
          const newActivity = payload.new as Activity;
          // Only add if it's for the current user
          if (newActivity.user_id === userIdRef.current) {
            setActivities(prev => [newActivity, ...prev].slice(0, 50));
            setUnreadCount(prev => prev + 1);
            
            // Show toast notification
            toast({
              title: newActivity.title,
              description: newActivity.description || undefined,
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'activity_feed',
        },
        (payload) => {
          const updated = payload.new as Activity;
          if (updated.user_id === userIdRef.current) {
            setActivities(prev =>
              prev.map(a => a.id === updated.id ? updated : a)
            );
            // Recalculate unread count
            setActivities(prev => {
              setUnreadCount(prev.filter(a => !a.is_read).length);
              return prev;
            });
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'activity_feed',
        },
        (payload) => {
          const deleted = payload.old as Activity;
          setActivities(prev => prev.filter(a => a.id !== deleted.id));
          if (!deleted.is_read) {
            setUnreadCount(prev => Math.max(0, prev - 1));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchActivities, toast]);

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

    await supabase
      .from('activity_feed')
      .insert({
        user_id: user.id,
        activity_type,
        title,
        description,
        metadata: metadata || {}
      });
    // Real-time subscription will handle the state update
  }, []);

  const deleteActivity = useCallback(async (activityId: string) => {
    await supabase
      .from('activity_feed')
      .delete()
      .eq('id', activityId);
    // Real-time subscription will handle the state update
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
