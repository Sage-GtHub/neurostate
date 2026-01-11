import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar,
  Clock,
  Brain,
  Zap,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Target,
  Timer,
  Coffee,
  Moon
} from 'lucide-react';

interface TimeBlock {
  id: string;
  time: string;
  type: 'meeting' | 'focus' | 'break' | 'available';
  duration: number;
  cognitiveLoad: number;
  label?: string;
}

interface DaySchedule {
  day: string;
  date: string;
  meetingLoad: number;
  focusTime: number;
  cognitiveScore: number;
  blocks: TimeBlock[];
}

// Mock schedule data
const weekSchedule: DaySchedule[] = [
  {
    day: 'Monday',
    date: '13 Jan',
    meetingLoad: 75,
    focusTime: 2,
    cognitiveScore: 62,
    blocks: [
      { id: '1', time: '09:00', type: 'meeting', duration: 60, cognitiveLoad: 70, label: 'Team Standup' },
      { id: '2', time: '10:00', type: 'meeting', duration: 90, cognitiveLoad: 85, label: 'Strategy Review' },
      { id: '3', time: '11:30', type: 'meeting', duration: 30, cognitiveLoad: 40, label: '1:1 Check-in' },
      { id: '4', time: '14:00', type: 'meeting', duration: 120, cognitiveLoad: 90, label: 'Client Presentation' },
      { id: '5', time: '16:00', type: 'focus', duration: 60, cognitiveLoad: 50, label: 'Deep Work' },
    ]
  },
  {
    day: 'Tuesday',
    date: '14 Jan',
    meetingLoad: 45,
    focusTime: 4,
    cognitiveScore: 78,
    blocks: [
      { id: '6', time: '09:00', type: 'focus', duration: 120, cognitiveLoad: 60, label: 'Deep Work' },
      { id: '7', time: '11:00', type: 'meeting', duration: 60, cognitiveLoad: 70, label: 'Product Sync' },
      { id: '8', time: '14:00', type: 'meeting', duration: 60, cognitiveLoad: 65, label: 'Design Review' },
      { id: '9', time: '15:00', type: 'focus', duration: 120, cognitiveLoad: 55, label: 'Analysis' },
    ]
  },
  {
    day: 'Wednesday',
    date: '15 Jan',
    meetingLoad: 85,
    focusTime: 1,
    cognitiveScore: 52,
    blocks: [
      { id: '10', time: '09:00', type: 'meeting', duration: 60, cognitiveLoad: 75, label: 'All Hands' },
      { id: '11', time: '10:00', type: 'meeting', duration: 90, cognitiveLoad: 80, label: 'Planning' },
      { id: '12', time: '13:00', type: 'meeting', duration: 120, cognitiveLoad: 90, label: 'Workshop' },
      { id: '13', time: '15:00', type: 'meeting', duration: 60, cognitiveLoad: 70, label: 'Stakeholder Call' },
      { id: '14', time: '16:00', type: 'meeting', duration: 60, cognitiveLoad: 65, label: 'Retro' },
    ]
  },
  {
    day: 'Thursday',
    date: '16 Jan',
    meetingLoad: 35,
    focusTime: 5,
    cognitiveScore: 85,
    blocks: [
      { id: '15', time: '09:00', type: 'focus', duration: 180, cognitiveLoad: 70, label: 'Strategic Work' },
      { id: '16', time: '14:00', type: 'meeting', duration: 45, cognitiveLoad: 50, label: 'Quick Sync' },
      { id: '17', time: '15:00', type: 'focus', duration: 120, cognitiveLoad: 60, label: 'Documentation' },
    ]
  },
  {
    day: 'Friday',
    date: '17 Jan',
    meetingLoad: 55,
    focusTime: 3,
    cognitiveScore: 71,
    blocks: [
      { id: '18', time: '09:00', type: 'meeting', duration: 30, cognitiveLoad: 40, label: 'Standup' },
      { id: '19', time: '10:00', type: 'focus', duration: 120, cognitiveLoad: 65, label: 'Development' },
      { id: '20', time: '14:00', type: 'meeting', duration: 90, cognitiveLoad: 75, label: 'Sprint Review' },
      { id: '21', time: '16:00', type: 'break', duration: 60, cognitiveLoad: 20, label: 'Wind Down' },
    ]
  },
];

const optimisations = [
  {
    id: '1',
    title: 'Consolidate Monday meetings',
    description: 'Move Strategy Review to Tuesday to create a 2-hour focus block',
    impact: '+18% cognitive capacity',
    priority: 'high',
    accepted: false,
  },
  {
    id: '2',
    title: 'Add buffer after Client Presentation',
    description: 'Insert 30-min recovery time after high-intensity meeting',
    impact: '+12% afternoon focus',
    priority: 'medium',
    accepted: false,
  },
  {
    id: '3',
    title: 'Protect Wednesday morning',
    description: 'Decline All Hands or attend async to reduce cognitive load',
    impact: '-25% burnout risk',
    priority: 'high',
    accepted: false,
  },
  {
    id: '4',
    title: 'Block 9-11am as Focus Time',
    description: 'Your peak cognitive hours. Protect them for deep work.',
    impact: '+32% productivity',
    priority: 'high',
    accepted: false,
  },
];

export function MeetingLoadOptimiser() {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [acceptedOptimisations, setAcceptedOptimisations] = useState<string[]>([]);

  const currentDay = weekSchedule.find(d => d.day === selectedDay) || weekSchedule[0];
  const weeklyAvgLoad = Math.round(weekSchedule.reduce((sum, d) => sum + d.meetingLoad, 0) / weekSchedule.length);
  const weeklyAvgFocus = Math.round(weekSchedule.reduce((sum, d) => sum + d.focusTime, 0) / weekSchedule.length);

  const handleAcceptOptimisation = (id: string) => {
    setAcceptedOptimisations(prev => [...prev, id]);
  };

  const getLoadColor = (load: number) => {
    if (load >= 75) return 'text-destructive';
    if (load >= 50) return 'text-amber-500';
    return 'text-green-500';
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            Meeting Load Optimiser
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Week Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className={`text-2xl font-semibold ${getLoadColor(weeklyAvgLoad)}`}>
                {weeklyAvgLoad}%
              </div>
              <div className="text-xs text-muted-foreground">Avg Meeting Load</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className="text-2xl font-semibold text-primary">
                {weeklyAvgFocus}h
              </div>
              <div className="text-xs text-muted-foreground">Avg Focus Time</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <div className={`text-2xl font-semibold ${getScoreColor(72)}`}>
                72
              </div>
              <div className="text-xs text-muted-foreground">Week CCI Score</div>
            </div>
          </div>

          {/* Day Selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {weekSchedule.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`flex-shrink-0 p-3 rounded-lg border transition-all ${
                  selectedDay === day.day
                    ? 'bg-primary/10 border-primary'
                    : 'bg-muted/30 border-border/50 hover:bg-muted/50'
                }`}
              >
                <div className="text-xs text-muted-foreground">{day.date}</div>
                <div className="font-medium text-sm">{day.day.slice(0, 3)}</div>
                <div className={`text-xs mt-1 ${getLoadColor(day.meetingLoad)}`}>
                  {day.meetingLoad}% load
                </div>
              </button>
            ))}
          </div>

          {/* Day Detail */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{currentDay.day} Schedule</h4>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className={getLoadColor(currentDay.meetingLoad)}>
                    {currentDay.meetingLoad}% meeting load
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                  <span className={getScoreColor(currentDay.cognitiveScore)}>
                    CCI: {currentDay.cognitiveScore}
                  </span>
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              {currentDay.blocks.map((block) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    block.type === 'meeting'
                      ? 'bg-amber-500/10 border-amber-500/20'
                      : block.type === 'focus'
                      ? 'bg-primary/10 border-primary/20'
                      : 'bg-muted/30 border-border/50'
                  }`}
                >
                  <div className="text-sm font-mono text-muted-foreground w-12">
                    {block.time}
                  </div>
                  <div className="flex-shrink-0">
                    {block.type === 'meeting' ? (
                      <Calendar className="h-4 w-4 text-amber-500" />
                    ) : block.type === 'focus' ? (
                      <Brain className="h-4 w-4 text-primary" />
                    ) : (
                      <Coffee className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{block.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {block.duration} min • Cognitive load: {block.cognitiveLoad}%
                    </div>
                  </div>
                  <Progress 
                    value={block.cognitiveLoad} 
                    className="w-16 h-1.5"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Optimisations */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-amber-500" />
            AI Optimisation Suggestions
            <Badge variant="secondary" className="ml-auto">
              {optimisations.length - acceptedOptimisations.length} pending
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {optimisations.map((opt) => {
              const isAccepted = acceptedOptimisations.includes(opt.id);
              return (
                <motion.div
                  key={opt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isAccepted ? 0.5 : 1, y: 0 }}
                  className={`p-4 rounded-lg border ${
                    isAccepted
                      ? 'bg-green-500/10 border-green-500/20'
                      : opt.priority === 'high'
                      ? 'bg-amber-500/5 border-amber-500/20'
                      : 'bg-muted/30 border-border/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {isAccepted ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : opt.priority === 'high' ? (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        ) : (
                          <Target className="h-4 w-4 text-primary" />
                        )}
                        <span className="font-medium text-sm">{opt.title}</span>
                        <Badge 
                          variant="outline" 
                          className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary"
                        >
                          {opt.impact}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {opt.description}
                      </p>
                    </div>
                    {!isAccepted && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => handleAcceptOptimisation(opt.id)}
                      >
                        Apply
                      </Button>
                    )}
                    {isAccepted && (
                      <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-500">
                        Applied
                      </Badge>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Optimal Schedule Recommendation */}
          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Optimal Day Structure</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded bg-primary/10">
                <div className="font-medium">9-11am</div>
                <div className="text-muted-foreground">Deep Work</div>
              </div>
              <div className="p-2 rounded bg-amber-500/10">
                <div className="font-medium">11am-12pm</div>
                <div className="text-muted-foreground">Meetings</div>
              </div>
              <div className="p-2 rounded bg-muted/50">
                <div className="font-medium">12-1pm</div>
                <div className="text-muted-foreground">Break</div>
              </div>
              <div className="p-2 rounded bg-amber-500/10">
                <div className="font-medium">1-3pm</div>
                <div className="text-muted-foreground">Collab</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
