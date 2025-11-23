import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, ArrowRight } from "lucide-react";
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

  if (isLoading) {
    return (
      <section className="py-24 md:py-32">
        <div className="text-center text-ash">Loading learning paths...</div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32">
      <div className="mb-16 md:mb-20 text-center">
        <p className="ghost-number mb-6">STRUCTURED LEARNING</p>
        <h2 className="mb-4">Learning paths</h2>
        <p className="text-body-large text-ash max-w-2xl mx-auto">
          Step-by-step courses designed by experts. Track progress, earn badges, master your goals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {paths?.map((path) => {
          const progress = getProgress(path.id);
          const earned = hasBadge(path.id);

          return (
            <div
              key={path.id}
              className="group"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-stone">
                    {path.difficulty}
                  </span>
                  <span className="text-stone">·</span>
                  <span className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-stone">
                    {path.category}
                  </span>
                </div>

                <h3 className="text-[1.25rem] font-medium mb-3 group-hover:opacity-60 transition-opacity">
                  {path.title}
                </h3>
                <p className="text-[0.9375rem] text-ash leading-relaxed mb-6">
                  {path.description}
                </p>

                <div className="flex items-center gap-6 text-[0.8125rem] text-stone mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {path.duration_days} days
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {lessonCounts?.[path.id] || 0} lessons
                  </div>
                </div>

                {user && progress > 0 && (
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-[0.8125rem]">
                      <span className="text-stone">Progress</span>
                      <span className="font-medium text-carbon">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-1" />
                  </div>
                )}
              </div>

              <Link to={`/learning-path/${path.id}`}>
                <Button variant="ghost" size="sm" className="group/btn">
                  {progress > 0 ? 'Continue' : 'Start Course'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};
