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
  Sparkles,
  Dumbbell,
  Droplets,
  Moon,
  Heart,
  Leaf,
  Coffee,
  RefreshCw,
  Loader2,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useActivityFeed, Activity as ActivityType } from '@/hooks/useActivityFeed';
import { useAutonomousCoaching } from '@/hooks/useAutonomousCoaching';
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

const nudgeCategoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  movement: Dumbbell,
  hydration: Droplets,
  focus: Brain,
  rest: Moon,
  nutrition: Heart,
  mindfulness: Leaf,
  recovery: Sparkles,
  training: Target,
  general: Zap,
};

const nudgeCategoryColors: Record<string, string> = {
  movement: 'bg-emerald-500/10 text-emerald-500',
  hydration: 'bg-blue-500/10 text-blue-500',
  focus: 'bg-violet-500/10 text-violet-500',
  rest: 'bg-indigo-500/10 text-indigo-500',
  nutrition: 'bg-orange-500/10 text-orange-500',
  mindfulness: 'bg-pink-500/10 text-pink-500',
  recovery: 'bg-accent/10 text-accent',
  training: 'bg-amber-500/10 text-amber-500',
  general: 'bg-muted text-muted-foreground',
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

  const {
    nudges,
    isLoading: nudgesLoading,
    isInitialLoading: nudgesInitialLoading,
    generateCoaching,
    completeNudge,
    dismissNudge,
  } = useAutonomousCoaching();

  const totalBadge = unreadCount + nudges.length;

  const getIcon = (type: string) => activityIcons[type] || activityIcons.default;
  const getColor = (type: string) => activityColors[type] || activityColors.default;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full"
        >
          <Bell className="h-4 w-4" />
          {totalBadge > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-[10px] font-medium text-accent-foreground flex items-center justify-center"
            >
              {totalBadge > 9 ? '9+' : totalBadge}
            </motion.span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        className="w-[400px] p-0 rounded-2xl shadow-xl border-border/50"
        sideOffset={8}
      >
        <Tabs defaultValue="nudges" className="w-full">
          {/* Header */}
          <div className="p-4 pb-2 border-b border-border/50">
            <TabsList className="w-full h-8 bg-muted/50">
              <TabsTrigger value="nudges" className="flex-1 text-xs gap-1.5 h-7">
                <Sparkles className="h-3 w-3" />
                Nudges
                {nudges.length > 0 && (
                  <Badge variant="secondary" className="h-4 px-1 text-[9px] ml-1">{nudges.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex-1 text-xs gap-1.5 h-7">
                <Bell className="h-3 w-3" />
                Activity
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="h-4 px-1 text-[9px] ml-1">{unreadCount}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Nudges Tab */}
          <TabsContent value="nudges" className="m-0">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
              <p className="text-[10px] text-muted-foreground">
                AI-powered coaching actions
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-[10px] gap-1.5"
                onClick={generateCoaching}
                disabled={nudgesLoading}
              >
                {nudgesLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                Generate
              </Button>
            </div>
            <ScrollArea className="h-[380px]">
              {nudgesInitialLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-6 h-6 rounded-full border-2 border-muted border-t-foreground animate-spin" />
                </div>
              ) : nudges.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground/80">No active nudges</p>
                  <p className="text-[11px] text-muted-foreground mt-1 mb-3">
                    Generate coaching actions based on your biometric data
                  </p>
                  <Button size="sm" onClick={generateCoaching} disabled={nudgesLoading} className="gap-2 text-xs">
                    {nudgesLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                    Generate Nudges
                  </Button>
                </div>
              ) : (
                <div className="py-2">
                  <AnimatePresence mode="popLayout">
                    {nudges.map((nudge) => {
                      const isRisk = nudge.nudge_type === 'risk_alert';
                      const Icon = isRisk ? AlertTriangle : (nudgeCategoryIcons[nudge.category] || Zap);
                      const colorClass = isRisk
                        ? (nudge.priority === 'critical' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500')
                        : (nudgeCategoryColors[nudge.category] || 'bg-muted text-muted-foreground');

                      return (
                        <motion.div
                          key={nudge.id}
                          layout
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className={cn(
                            "group relative flex gap-3 px-4 py-3 hover:bg-muted/30 transition-colors",
                            isRisk && "bg-amber-500/[0.03]"
                          )}
                        >
                          {/* Priority indicator */}
                          {(nudge.priority === 'critical' || nudge.priority === 'high') && (
                            <div className={cn(
                              "absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full",
                              nudge.priority === 'critical' ? 'bg-red-500' : 'bg-amber-500'
                            )} />
                          )}

                          {/* Icon */}
                          <div className={cn(
                            "flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
                            colorClass
                          )}>
                            <Icon className="w-4 h-4" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-medium text-foreground line-clamp-1">
                                {nudge.title}
                              </p>
                              {nudge.impact && (
                                <Badge variant="outline" className="text-[9px] px-1 py-0 bg-accent/10 text-accent border-accent/20 shrink-0">
                                  {nudge.impact}
                                </Badge>
                              )}
                              {nudge.priority === 'critical' && (
                                <Badge variant="destructive" className="text-[9px] px-1 py-0 shrink-0">Critical</Badge>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                              {nudge.description}
                            </p>
                            {nudge.timing && (
                              <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60 mt-1">
                                <Clock className="h-2.5 w-2.5" />
                                {nudge.timing}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => completeNudge(nudge.id)}
                              className="h-6 w-6 text-accent hover:text-accent hover:bg-accent/10"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => dismissNudge(nudge.id)}
                              className="h-6 w-6 text-muted-foreground hover:text-foreground"
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
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="m-0">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
              <p className="text-[10px] text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
              </p>
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
            <ScrollArea className="h-[380px]">
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
                          {!activity.is_read && (
                            <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
                          )}
                          <div className={cn(
                            "flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
                            getColor(activity.activity_type)
                          )}>
                            <Icon className="w-4 h-4" />
                          </div>
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
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!activity.is_read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => { e.stopPropagation(); markAsRead(activity.id); }}
                                className="h-6 w-6 text-muted-foreground hover:text-foreground"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => { e.stopPropagation(); deleteActivity(activity.id); }}
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
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}