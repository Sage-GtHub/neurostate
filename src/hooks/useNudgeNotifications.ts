import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const priorityLabels: Record<string, string> = {
  critical: '🚨 Critical Alert',
  high: '⚠️ Important',
  medium: '💡 Suggestion',
  low: '📋 Tip',
};

/**
 * Subscribes to realtime inserts on autonomous_nudges.
 * Shows browser Notification API alerts for critical/high-priority nudges
 * and in-app toasts for all new nudges.
 */
export function useNudgeNotifications() {
  const { user } = useAuth();
  const { toast } = useToast();
  const hasPermission = useRef(false);

  // Check notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      hasPermission.current = Notification.permission === 'granted';
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('nudge-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'autonomous_nudges',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const nudge = payload.new as any;
          if (!nudge || nudge.status !== 'active') return;

          const isCritical = nudge.priority === 'critical' || nudge.priority === 'high';
          const label = priorityLabels[nudge.priority] || '💡 Nova';

          // In-app toast for all nudges
          toast({
            title: `${label}: ${nudge.title}`,
            description: nudge.description?.slice(0, 120),
            variant: isCritical ? 'destructive' : 'default',
          });

          // Browser notification for critical/high only
          if (isCritical && hasPermission.current && document.hidden) {
            try {
              new Notification(`${label}: ${nudge.title}`, {
                body: nudge.description || 'Nova has an important alert for you.',
                icon: '/favicon.png',
                badge: '/favicon.png',
                tag: `nudge-${nudge.id}`,
              });
            } catch {
              // Notifications may be blocked in some contexts
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, toast]);
}
