import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, ArrowRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration_days: number;
  difficulty: string;
  category: string;
  badge_name: string;
  badge_icon: string;
  order_index: number;
}

export const LearningPaths = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  // Fetch learning paths
  const { data: paths, isLoading } = useQuery({
    queryKey: ['learning-paths'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('is_active', true)
        .order('order_index');
      
      if (error) throw error;
      return data as LearningPath[];
    },
  });

  // Fetch user progress for all paths
  const { data: allProgress } = useQuery({
    queryKey: ['all-user-progress', user?.id],
    queryFn: async () => {
      if (!user) return {};
      
      const { data, error } = await supabase
        .from('user_learning_progress')
        .select('path_id, lesson_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Group by path_id
      const progressByPath: Record<string, string[]> = {};
      data.forEach(p => {
        if (!progressByPath[p.path_id]) {
          progressByPath[p.path_id] = [];
        }
        progressByPath[p.path_id].push(p.lesson_id);
      });
      
      return progressByPath;
    },
    enabled: !!user,
  });

  // Fetch lesson counts for each path
  const { data: lessonCounts } = useQuery({
    queryKey: ['lesson-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_path_lessons')
        .select('path_id');
      
      if (error) throw error;
      
      // Count lessons per path
      const counts: Record<string, number> = {};
      data.forEach(lesson => {
        counts[lesson.path_id] = (counts[lesson.path_id] || 0) + 1;
      });
      
      return counts;
    },
  });

  // Fetch earned badges
  const { data: badges } = useQuery({
    queryKey: ['user-badges', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_badges')
        .select('path_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(b => b.path_id);
    },
    enabled: !!user,
  });

  const getProgress = (pathId: string) => {
    if (!allProgress || !lessonCounts) return 0;
    const completed = allProgress[pathId]?.length || 0;
    const total = lessonCounts[pathId] || 1;
    return Math.round((completed / total) * 100);
  };

  const hasBadge = (pathId: string) => badges?.includes(pathId);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'advanced': return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default: return 'bg-muted';
    }
  };

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="text-center">Loading learning paths...</div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-primary/10 text-primary">
          <Trophy className="h-3 w-3 mr-1" />
          Structured Learning
        </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learning Paths
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow step-by-step courses designed by experts. Track your progress, earn badges, and master your health goals.
          </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {paths?.map((path) => {
          const progress = getProgress(path.id);
          const earned = hasBadge(path.id);

          return (
            <Card
              key={path.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 group"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                    <Badge variant="secondary">{path.category}</Badge>
                  </div>
                  {earned && (
                    <div className="flex items-center gap-1 text-primary">
                      <Trophy className="h-4 w-4" />
                      <span className="text-xl">{path.badge_icon}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {path.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                  {path.description}
                </p>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {path.duration_days} days
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {lessonCounts?.[path.id] || 0} lessons
                  </div>
                </div>

                {user && progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Link to={`/learning-path/${path.id}`} className="w-full">
                  <Button className="w-full group/btn">
                    {progress > 0 ? 'Continue Learning' : 'Start Course'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};