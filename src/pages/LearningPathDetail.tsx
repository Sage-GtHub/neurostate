import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, CheckCircle2, Circle, Trophy, Calendar } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  day_number: number;
  duration_minutes: number;
  video_url?: string;
}

const LearningPathDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  // Fetch learning path
  const { data: path } = useQuery({
    queryKey: ['learning-path', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as LearningPath;
    },
  });

  // Fetch lessons
  const { data: lessons } = useQuery({
    queryKey: ['learning-path-lessons', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_path_lessons')
        .select('*')
        .eq('path_id', id)
        .order('order_index');
      
      if (error) throw error;
      return data as Lesson[];
    },
  });

  // Fetch user progress
  const { data: progress } = useQuery({
    queryKey: ['user-progress', id, user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_learning_progress')
        .select('lesson_id')
        .eq('path_id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(p => p.lesson_id);
    },
    enabled: !!user,
  });

  // Fetch badge
  const { data: badge } = useQuery({
    queryKey: ['user-badge', id, user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_badges')
        .select('*')
        .eq('path_id', id)
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user,
  });

  // Complete lesson mutation
  const completeLessonMutation = useMutation({
    mutationFn: async (lessonId: string) => {
      if (!user) {
        navigate('/auth');
        throw new Error('Please log in to track progress');
      }

      const { error } = await supabase
        .from('user_learning_progress')
        .insert({
          user_id: user.id,
          path_id: id,
          lesson_id: lessonId,
        });

      if (error) throw error;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user-progress', id, user?.id] });
      
      // Check if all lessons are complete and award badge
      if (lessons && progress) {
        const completedCount = (progress?.length || 0) + 1;
        if (completedCount === lessons.length && !badge) {
          await supabase
            .from('user_badges')
            .insert({
              user_id: user.id,
              path_id: id,
            });
          
          await queryClient.invalidateQueries({ queryKey: ['user-badge', id, user?.id] });
          toast.success("🎉 Congratulations!", {
            description: `You've earned the ${path?.badge_name} badge!`,
          });
        } else {
          toast.success("Lesson completed!");
        }
      }
    },
    onError: (error: any) => {
      if (error.message === 'Please log in to track progress') {
        toast.error(error.message);
      } else {
        toast.error("Failed to mark lesson as complete");
      }
    },
  });

  const progressPercentage = lessons && progress 
    ? Math.round((progress.length / lessons.length) * 100)
    : 0;

  const isLessonComplete = (lessonId: string) => progress?.includes(lessonId);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'advanced': return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default: return 'bg-muted';
    }
  };

  if (!path || !lessons) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/resources')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Resources
        </Button>

        {/* Path Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className={getDifficultyColor(path.difficulty)}>
              {path.difficulty}
            </Badge>
            <Badge variant="secondary">{path.category}</Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {path.duration_days} days
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{path.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">{path.description}</p>
        </div>

        {/* Progress Card */}
        {user && (
          <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Your Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    {progress?.length || 0} of {lessons.length} lessons completed
                  </p>
                </div>
                {badge && (
                  <div className="flex items-center gap-2 bg-background rounded-full px-4 py-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{path.badge_icon} {path.badge_name}</span>
                  </div>
                )}
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-right text-sm text-muted-foreground mt-2">
                {progressPercentage}% Complete
              </p>
            </CardContent>
          </Card>
        )}

        {/* Lessons */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Course Content</h2>
          {lessons.map((lesson) => {
            const completed = isLessonComplete(lesson.id);
            const isExpanded = expandedLesson === lesson.id;

            return (
              <Card
                key={lesson.id}
                className={`overflow-hidden transition-all ${
                  completed ? 'border-primary/30 bg-primary/5' : ''
                }`}
              >
                <CardHeader
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setExpandedLesson(isExpanded ? null : lesson.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {completed ? (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Day {lesson.day_number}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {lesson.duration_minutes} min
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{lesson.title}</h3>
                      <p className="text-muted-foreground">{lesson.description}</p>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="border-t pt-6 animate-in fade-in slide-in-from-top-2">
                    <div className="prose prose-sm max-w-none dark:prose-invert mb-6">
                      <p className="whitespace-pre-line">{lesson.content}</p>
                    </div>
                    
                    {!completed && user && (
                      <Button
                        onClick={() => completeLessonMutation.mutate(lesson.id)}
                        disabled={completeLessonMutation.isPending}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Mark as Complete
                      </Button>
                    )}

                    {!user && (
                      <Button onClick={() => navigate('/auth')}>
                        Sign in to Track Progress
                      </Button>
                    )}

                    {completed && (
                      <Badge className="bg-primary/10 text-primary">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        {!user && (
          <Card className="mt-12 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-muted-foreground mb-6">
              Sign in to track your progress, earn badges, and unlock your full potential.
            </p>
              <Button size="lg" onClick={() => navigate('/auth')}>
                Get Started
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LearningPathDetail;