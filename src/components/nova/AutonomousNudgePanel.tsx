import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  Coffee,
  Moon,
  Dumbbell,
  Brain,
  Heart,
  Clock,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  Zap,
  Target
} from 'lucide-react';
import { useActivityFeed } from '@/hooks/useActivityFeed';

interface Nudge {
  id: string;
  title: string;
  description: string;
  type: 'movement' | 'hydration' | 'focus' | 'rest' | 'nutrition' | 'mindfulness';
  timing: string;
  impact: string;
  completed: boolean;
}

const nudgeIcons = {
  movement: Dumbbell,
  hydration: Coffee,
  focus: Brain,
  rest: Moon,
  nutrition: Heart,
  mindfulness: Sparkles,
};

const nudgeColors = {
  movement: 'text-green-500',
  hydration: 'text-blue-500',
  focus: 'text-purple-500',
  rest: 'text-indigo-500',
  nutrition: 'text-orange-500',
  mindfulness: 'text-pink-500',
};

const smartNudges: Nudge[] = [
  {
    id: '1',
    title: 'Deep Work Block',
    description: 'Your cognitive metrics peak between 9-11am. Block this time for complex tasks.',
    type: 'focus',
    timing: 'Best: 9:00 AM - 11:00 AM',
    impact: '+23% productivity',
    completed: false,
  },
  {
    id: '2',
    title: 'Movement Break',
    description: 'HRV data suggests tension building. A 5-min stretch will reset your focus.',
    type: 'movement',
    timing: 'Now - based on biometrics',
    impact: '+15% afternoon energy',
    completed: false,
  },
  {
    id: '3',
    title: 'Hydration Reminder',
    description: 'Pattern detected: dehydration correlates with your 3pm energy dips.',
    type: 'hydration',
    timing: 'Before 2:00 PM',
    impact: '-40% afternoon fatigue',
    completed: false,
  },
  {
    id: '4',
    title: 'Wind-Down Protocol',
    description: 'Based on your sleep patterns, starting wind-down now optimises recovery.',
    type: 'rest',
    timing: 'Start at 9:30 PM',
    impact: '+18% sleep quality',
    completed: false,
  },
];

export function AutonomousNudgePanel() {
  const [nudges, setNudges] = useState<Nudge[]>(smartNudges);
  const [expanded, setExpanded] = useState(true);
  const [completedToday, setCompletedToday] = useState(1);
  const { addActivity } = useActivityFeed();

  const totalNudges = nudges.length;
  const completedNudges = nudges.filter(n => n.completed).length + completedToday;
  const progress = Math.round((completedNudges / (totalNudges + completedToday)) * 100);

  const handleComplete = async (id: string) => {
    setNudges(prev => prev.map(n => 
      n.id === id ? { ...n, completed: true } : n
    ));
    
    const nudge = nudges.find(n => n.id === id);
    if (nudge) {
      await addActivity(
        'nudge_completed',
        `Completed: ${nudge.title}`,
        nudge.impact,
        { nudge_type: nudge.type }
      );
    }

    // Remove after animation
    setTimeout(() => {
      setNudges(prev => prev.filter(n => n.id !== id));
    }, 500);
  };

  const handleDismiss = (id: string) => {
    setNudges(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            Smart Nudges
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Daily optimisation</span>
            <span className="font-medium">{completedNudges}/{totalNudges + completedToday} complete</span>
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
                {nudges.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-6"
                  >
                    <CheckCircle2 className="h-10 w-10 mx-auto mb-3 text-primary" />
                    <p className="text-sm font-medium">All caught up!</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Great work following your optimised routine
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {nudges.map((nudge, index) => {
                      const Icon = nudgeIcons[nudge.type];
                      return (
                        <motion.div
                          key={nudge.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: nudge.completed ? 0.5 : 1, 
                            x: 0,
                            scale: nudge.completed ? 0.95 : 1
                          }}
                          exit={{ opacity: 0, x: 100 }}
                          transition={{ delay: index * 0.05 }}
                          className={`relative p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors ${
                            nudge.completed ? 'border-primary/30' : 'border-border/50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-muted/50 ${nudgeColors[nudge.type]}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-medium text-sm ${nudge.completed ? 'line-through' : ''}`}>
                                  {nudge.title}
                                </h4>
                                <Badge 
                                  variant="outline" 
                                  className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/20"
                                >
                                  <Zap className="h-2.5 w-2.5 mr-0.5" />
                                  {nudge.impact}
                                </Badge>
                              </div>
                              
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {nudge.description}
                              </p>
                              
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {nudge.timing}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-primary hover:bg-primary/10"
                                onClick={() => handleComplete(nudge.id)}
                                disabled={nudge.completed}
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                                onClick={() => handleDismiss(nudge.id)}
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

              {/* AI Attribution */}
              <div className="mt-4 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Target className="h-3.5 w-3.5 text-primary" />
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
