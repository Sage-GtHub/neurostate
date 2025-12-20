import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Flame, Award, Trophy, Target, Zap, Calendar, Star, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Streak {
  type: string;
  count: number;
  label: string;
  icon: React.ElementType;
  color: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  earned: boolean;
  earnedAt?: string;
  color: string;
}

export function StreaksAchievements() {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStreaksAndAchievements();
  }, []);

  const loadStreaksAndAchievements = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // Load check-ins to calculate streaks
      const { data: checkIns } = await supabase
        .from('protocol_check_ins')
        .select('check_in_date')
        .eq('user_id', user.id)
        .order('check_in_date', { ascending: false });

      // Calculate check-in streak
      let checkInStreak = 0;
      if (checkIns && checkIns.length > 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const sortedDates = checkIns
          .map(c => new Date(c.check_in_date))
          .sort((a, b) => b.getTime() - a.getTime());

        for (let i = 0; i < sortedDates.length; i++) {
          const checkDate = new Date(sortedDates[i]);
          checkDate.setHours(0, 0, 0, 0);
          
          const expectedDate = new Date(today);
          expectedDate.setDate(today.getDate() - i);
          
          if (checkDate.getTime() === expectedDate.getTime()) {
            checkInStreak++;
          } else if (i === 0 && checkDate.getTime() === expectedDate.getTime() - 86400000) {
            // Allow for yesterday if today hasn't been checked in yet
            continue;
          } else {
            break;
          }
        }
      }

      // Load chat messages for chat streak
      const { data: chatMessages } = await supabase
        .from('nova_chat_messages')
        .select('created_at')
        .eq('user_id', user.id)
        .eq('role', 'user')
        .order('created_at', { ascending: false });

      let chatStreak = 0;
      if (chatMessages && chatMessages.length > 0) {
        const uniqueDays = new Set(
          chatMessages.map(m => 
            new Date(m.created_at).toISOString().split('T')[0]
          )
        );
        
        const today = new Date();
        for (let i = 0; i < 365; i++) {
          const checkDate = new Date(today);
          checkDate.setDate(today.getDate() - i);
          const dateStr = checkDate.toISOString().split('T')[0];
          
          if (uniqueDays.has(dateStr)) {
            chatStreak++;
          } else if (i > 0) {
            break;
          }
        }
      }

      // Load protocols for protocol streak
      const { data: protocols } = await supabase
        .from('user_protocols')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');

      const activeProtocols = protocols?.length || 0;

      setStreaks([
        {
          type: 'check_in',
          count: checkInStreak,
          label: 'Day Check-in',
          icon: Flame,
          color: 'from-orange-500 to-red-500',
        },
        {
          type: 'chat',
          count: chatStreak,
          label: 'Day Chat',
          icon: Zap,
          color: 'from-accent to-accent/70',
        },
        {
          type: 'protocol',
          count: activeProtocols,
          label: 'Active Protocol' + (activeProtocols !== 1 ? 's' : ''),
          icon: Target,
          color: 'from-blue-500 to-purple-500',
        },
      ]);

      // Define achievements
      const totalCheckIns = checkIns?.length || 0;
      const totalChats = chatMessages?.length || 0;

      setAchievements([
        {
          id: 'first_checkin',
          name: 'First Steps',
          description: 'Complete your first check-in',
          icon: Star,
          earned: totalCheckIns >= 1,
          color: 'text-yellow-500',
        },
        {
          id: 'week_streak',
          name: 'Week Warrior',
          description: '7-day check-in streak',
          icon: Flame,
          earned: checkInStreak >= 7,
          color: 'text-orange-500',
        },
        {
          id: 'month_streak',
          name: 'Monthly Master',
          description: '30-day check-in streak',
          icon: Crown,
          earned: checkInStreak >= 30,
          color: 'text-purple-500',
        },
        {
          id: 'chat_explorer',
          name: 'Curious Mind',
          description: 'Ask Nova 10 questions',
          icon: Zap,
          earned: totalChats >= 10,
          color: 'text-blue-500',
        },
        {
          id: 'chat_master',
          name: 'Nova Expert',
          description: 'Have 50 conversations with Nova',
          icon: Trophy,
          earned: totalChats >= 50,
          color: 'text-accent',
        },
        {
          id: 'protocol_starter',
          name: 'Protocol Pioneer',
          description: 'Start your first protocol',
          icon: Target,
          earned: activeProtocols >= 1,
          color: 'text-green-500',
        },
      ]);

    } catch (error) {
      console.error("Error loading streaks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const earnedCount = achievements.filter(a => a.earned).length;

  if (isLoading) {
    return (
      <Card className="border-border/50 animate-pulse">
        <CardContent className="p-6">
          <div className="h-40 bg-muted rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-foreground">Streaks & Achievements</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Award className="w-4 h-4" />
            <span>{earnedCount}/{achievements.length}</span>
          </div>
        </div>

        {/* Streaks */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {streaks.map((streak) => (
            <div 
              key={streak.type}
              className={cn(
                "flex-shrink-0 px-4 py-3 rounded-xl bg-gradient-to-br text-white min-w-[100px]",
                streak.color
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <streak.icon className="w-4 h-4" />
                <span className="text-2xl font-bold">{streak.count}</span>
              </div>
              <span className="text-xs opacity-90">{streak.label}</span>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Achievements</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={cn(
                  "relative group p-3 rounded-lg border text-center transition-all",
                  achievement.earned 
                    ? "border-border/50 bg-muted/30" 
                    : "border-border/20 bg-muted/10 opacity-40"
                )}
                title={`${achievement.name}: ${achievement.description}`}
              >
                <achievement.icon 
                  className={cn(
                    "w-6 h-6 mx-auto mb-1",
                    achievement.earned ? achievement.color : "text-muted-foreground/50"
                  )} 
                />
                <p className={cn(
                  "text-[10px] leading-tight",
                  achievement.earned ? "text-foreground" : "text-muted-foreground/50"
                )}>
                  {achievement.name}
                </p>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}