import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  X,
  Zap,
  Brain,
  Target,
  Activity,
  AlertTriangle,
  TrendingUp,
  MessageCircle,
  Smartphone,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useActivityFeed, Activity as ActivityType } from '@/hooks/useActivityFeed';
import { cn } from '@/lib/utils';

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  insight: Zap,
  protocol: Target,
  goal: Activity,
  alert: AlertTriangle,
  trend: TrendingUp,
  chat: MessageCircle,
  device: Smartphone,
  ai: Brain,
  default: Bell,
};

const activityColors: Record<string, string> = {
  insight: 'bg-accent/10 text-accent',
  protocol: 'bg-blue-500/10 text-blue-500',
  goal: 'bg-green-500/10 text-green-500',
  alert: 'bg-orange-500/10 text-orange-500',
  trend: 'bg-purple-500/10 text-purple-500',
  chat: 'bg-cyan-500/10 text-cyan-500',
  device: 'bg-indigo-500/10 text-indigo-500',
  ai: 'bg-pink-500/10 text-pink-500',
  default: 'bg-muted text-muted-foreground',
};

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const { 
    activities, 
    unreadCount, 
    loading, 
    markAsRead, 
    markAllAsRead, 
    deleteActivity,
    clearAll 
  } = useActivityFeed();

  const getIcon = (type: string) => {
    return activityIcons[type] || activityIcons.default;
  };

  const getColor = (type: string) => {
    return activityColors[type] || activityColors.default;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-[10px] font-medium text-accent-foreground flex items-center justify-center"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        className="w-[380px] p-0 rounded-2xl shadow-xl border-border/50"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div>
            <h3 className="text-sm font-medium">Notifications</h3>
            <p className="text-[10px] text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="h-7 text-[10px] gap-1.5"
              >
                <CheckCheck className="h-3 w-3" />
                Mark all read
              </Button>
            )}
            {activities.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearAll}
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Activity List */}
        <ScrollArea className="h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 rounded-full border-2 border-muted border-t-foreground animate-spin" />
            </div>
          ) : activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                <Bell className="w-5 h-5 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium text-foreground/80">No notifications</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                You're all caught up! New activity will appear here.
              </p>
            </div>
          ) : (
            <div className="py-2">
              <AnimatePresence mode="popLayout">
                {activities.map((activity) => {
                  const Icon = getIcon(activity.activity_type);
                  return (
                    <motion.div
                      key={activity.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className={cn(
                        "group relative flex gap-3 px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer",
                        !activity.is_read && "bg-accent/[0.03]"
                      )}
                      onClick={() => !activity.is_read && markAsRead(activity.id)}
                    >
                      {/* Unread indicator */}
                      {!activity.is_read && (
                        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
                      )}

                      {/* Icon */}
                      <div className={cn(
                        "flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
                        getColor(activity.activity_type)
                      )}>
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground line-clamp-1">
                          {activity.title}
                        </p>
                        {activity.description && (
                          <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                            {activity.description}
                          </p>
                        )}
                        <p className="text-[10px] text-muted-foreground/60 mt-1">
                          {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!activity.is_read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(activity.id);
                            }}
                            className="h-6 w-6 text-muted-foreground hover:text-foreground"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteActivity(activity.id);
                          }}
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
