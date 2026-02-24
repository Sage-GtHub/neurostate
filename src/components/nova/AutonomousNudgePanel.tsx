import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Sparkles, Coffee, Moon, Dumbbell, Brain, Heart, Clock,
  CheckCircle2, X, ChevronDown, ChevronUp, Zap, Target,
  Droplets, Eye, Leaf, RefreshCw, Loader2, AlertTriangle,
} from 'lucide-react';
import { useAutonomousCoaching } from '@/hooks/useAutonomousCoaching';

const categoryIcons: Record<string, React.ElementType> = {
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

const categoryColors: Record<string, string> = {
  movement: 'text-emerald-500',
  hydration: 'text-blue-500',
  focus: 'text-violet-500',
  rest: 'text-indigo-500',
  nutrition: 'text-orange-500',
  mindfulness: 'text-pink-500',
  recovery: 'text-accent',
  training: 'text-amber-500',
  general: 'text-foreground/60',
};

export function AutonomousNudgePanel() {
  const { activeNudges, riskAlerts, isLoading, isInitialLoading, generateCoaching, completeNudge, dismissNudge } = useAutonomousCoaching();
  const [expanded, setExpanded] = useState(true);

  const allItems = [...riskAlerts, ...activeNudges];
  const completedToday = 0; // Could track from DB
  const totalItems = allItems.length;
  const progress = totalItems > 0 ? Math.round((completedToday / (totalItems + completedToday)) * 100) : 0;

  if (isInitialLoading) {
    return (
      <Card className="border-foreground/5">
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-2 w-full mt-3" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-lg" />)}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-foreground/5 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-accent" />
            Smart Nudges
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={generateCoaching}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Daily optimisation</span>
            <span className="font-medium">{totalItems} active</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="pt-0">
              <AnimatePresence mode="popLayout">
                {allItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-6"
                  >
                    <CheckCircle2 className="h-10 w-10 mx-auto mb-3 text-accent" />
                    <p className="text-sm font-medium">No active nudges</p>
                    <p className="text-xs text-muted-foreground mt-1 mb-3">
                      Generate coaching actions based on your biometric data
                    </p>
                    <Button size="sm" onClick={generateCoaching} disabled={isLoading} className="gap-2">
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                      Generate
                    </Button>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {allItems.map((nudge, index) => {
                      const Icon = nudge.nudge_type === 'risk_alert' ? AlertTriangle : (categoryIcons[nudge.category] || Zap);
                      const colorClass = nudge.nudge_type === 'risk_alert'
                        ? (nudge.priority === 'critical' ? 'text-red-500' : 'text-amber-500')
                        : (categoryColors[nudge.category] || 'text-foreground/60');

                      return (
                        <motion.div
                          key={nudge.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          transition={{ delay: index * 0.05 }}
                          className={`relative p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors ${
                            nudge.nudge_type === 'risk_alert' ? 'border-amber-500/30' : 'border-foreground/5'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-foreground/[0.03] ${colorClass}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-sm">{nudge.title}</h4>
                                {nudge.impact && (
                                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-accent/10 text-accent border-accent/20">
                                    <Zap className="h-2.5 w-2.5 mr-0.5" />
                                    {nudge.impact}
                                  </Badge>
                                )}
                                {nudge.priority === 'critical' && (
                                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Critical</Badge>
                                )}
                              </div>
                              
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {nudge.description}
                              </p>
                              
                              {nudge.timing && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {nudge.timing}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-accent hover:bg-accent/10"
                                onClick={() => completeNudge(nudge.id)}
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                                onClick={() => dismissNudge(nudge.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>

              <div className="mt-4 pt-3 border-t border-foreground/5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Target className="h-3.5 w-3.5 text-accent" />
                  <span>Personalised by Nova based on your biometric patterns</span>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
