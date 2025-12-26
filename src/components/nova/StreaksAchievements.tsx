import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Flame, Award, Trophy, Target, Zap, Calendar, Star, Crown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Streak {
  type: string;
  count: number;
  label: string;
  icon: React.ElementType;
  gradient: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  earned: boolean;
  earnedAt?: string;
  gradient: string;
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

      const { data: checkIns } = await supabase
        .from('protocol_check_ins')
        .select('check_in_date')
        .eq('user_id', user.id)
        .order('check_in_date', { ascending: false });

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
            continue;
          } else {
            break;
          }
        }
      }

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
          gradient: 'from-orange-500 via-red-500 to-rose-500',
        },
        {
          type: 'chat',
          count: chatStreak,
          label: 'Day Chat',
          icon: Zap,
          gradient: 'from-nova-accent via-cyan-400 to-nova-glow',
        },
        {
          type: 'protocol',
          count: activeProtocols,
          label: 'Active Protocol' + (activeProtocols !== 1 ? 's' : ''),
          icon: Target,
          gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
        },
      ]);

      const totalCheckIns = checkIns?.length || 0;
      const totalChats = chatMessages?.length || 0;

      setAchievements([
        {
          id: 'first_checkin',
          name: 'First Steps',
          description: 'Complete your first check-in',
          icon: Star,
          earned: totalCheckIns >= 1,
          gradient: 'from-amber-400 to-yellow-500',
        },
        {
          id: 'week_streak',
          name: 'Week Warrior',
          description: '7-day check-in streak',
          icon: Flame,
          earned: checkInStreak >= 7,
          gradient: 'from-orange-500 to-red-500',
        },
        {
          id: 'month_streak',
          name: 'Monthly Master',
          description: '30-day check-in streak',
          icon: Crown,
          earned: checkInStreak >= 30,
          gradient: 'from-violet-500 to-purple-500',
        },
        {
          id: 'chat_explorer',
          name: 'Curious Mind',
          description: 'Ask Nova 10 questions',
          icon: Zap,
          earned: totalChats >= 10,
          gradient: 'from-blue-500 to-cyan-500',
        },
        {
          id: 'chat_master',
          name: 'Nova Expert',
          description: 'Have 50 conversations with Nova',
          icon: Trophy,
          earned: totalChats >= 50,
          gradient: 'from-nova-accent to-nova-glow',
        },
        {
          id: 'protocol_starter',
          name: 'Protocol Pioneer',
          description: 'Start your first protocol',
          icon: Target,
          earned: activeProtocols >= 1,
          gradient: 'from-emerald-500 to-teal-500',
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
      <Card className="nova-card animate-pulse">
        <CardContent className="p-6">
          <div className="h-48 bg-muted/20 rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="nova-card overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Streaks & Achievements</h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-medium text-amber-400">{earnedCount}/{achievements.length}</span>
          </div>
        </div>

        {/* Streaks */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 -mx-1 px-1">
          {streaks.map((streak) => (
            <div 
              key={streak.type}
              className={cn(
                "flex-shrink-0 px-5 py-4 rounded-2xl bg-gradient-to-br text-white min-w-[110px] relative overflow-hidden group",
                streak.gradient
              )}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <streak.icon className="w-5 h-5 drop-shadow-lg" />
                  <span className="text-3xl font-bold drop-shadow-lg">{streak.count}</span>
                </div>
                <span className="text-xs font-medium opacity-90">{streak.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Achievements</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={cn(
                  "relative group p-3 rounded-xl border text-center transition-all duration-300 cursor-default",
                  achievement.earned 
                    ? "nova-glass border-nova-border/50 hover:border-nova-accent/30 hover:nova-glow" 
                    : "bg-muted/10 border-border/20 opacity-40 grayscale"
                )}
                title={`${achievement.name}: ${achievement.description}`}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center",
                  achievement.earned 
                    ? `bg-gradient-to-br ${achievement.gradient}` 
                    : "bg-muted/30"
                )}>
                  <achievement.icon 
                    className={cn(
                      "w-5 h-5",
                      achievement.earned ? "text-white drop-shadow-lg" : "text-muted-foreground/50"
                    )} 
                  />
                </div>
                <p className={cn(
                  "text-[10px] leading-tight font-medium",
                  achievement.earned ? "text-foreground" : "text-muted-foreground/50"
                )}>
                  {achievement.name}
                </p>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl">
                  <div className="font-semibold mb-0.5">{achievement.name}</div>
                  <div className="opacity-80">{achievement.description}</div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
