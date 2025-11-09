import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Target, TrendingUp, Calendar, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: string;
  question: string;
  options: {
    label: string;
    value: string;
    icon: string;
  }[];
}

interface Recommendation {
  type: 'article' | 'path';
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  badge?: string;
}

const questions: Question[] = [
  {
    id: 'goal',
    question: "What's your primary health goal?",
    options: [
      { label: 'Better Sleep', value: 'sleep', icon: '🌙' },
      { label: 'Faster Recovery', value: 'recovery', icon: '⚡' },
      { label: 'Mental Clarity', value: 'brain', icon: '🧠' },
      { label: 'Overall Wellness', value: 'wellness', icon: '✨' },
      { label: 'Beauty & Skin', value: 'beauty', icon: '💎' },
      { label: 'Stress Management', value: 'stress', icon: '🧘' },
    ],
  },
  {
    id: 'experience',
    question: "What's your experience level with supplements and biohacking?",
    options: [
      { label: 'Just Starting Out', value: 'beginner', icon: '🌱' },
      { label: 'Some Experience', value: 'intermediate', icon: '📈' },
      { label: 'Very Experienced', value: 'advanced', icon: '🎯' },
    ],
  },
  {
    id: 'format',
    question: "How do you prefer to learn?",
    options: [
      { label: 'Step-by-Step Courses', value: 'structured', icon: '📚' },
      { label: 'Quick Articles', value: 'articles', icon: '📄' },
      { label: 'Mix of Both', value: 'mixed', icon: '🔀' },
    ],
  },
];

// Mapping goals to categories and article IDs
const goalToCategories: Record<string, { categories: string[]; articleIds: number[]; pathIds?: string[] }> = {
  sleep: { 
    categories: ['Sleep'], 
    articleIds: [3],
    pathIds: ['sleep-optimization']
  },
  recovery: { 
    categories: ['Recovery'], 
    articleIds: [2, 5, 7],
    pathIds: ['recovery-protocol']
  },
  brain: { 
    categories: ['Brain Health'], 
    articleIds: [9],
    pathIds: ['cognitive-performance']
  },
  wellness: { 
    categories: ['Wellness', 'Nutrition'], 
    articleIds: [1, 6, 8],
    pathIds: ['wellness-foundation']
  },
  beauty: { 
    categories: ['Beauty'], 
    articleIds: [4],
  },
  stress: { 
    categories: ['Wellness'], 
    articleIds: [8],
  },
};

export const ResourceFinder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // Fetch learning paths
  const { data: paths } = useQuery({
    queryKey: ['learning-paths'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    },
  });

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    const goal = answers.goal;
    const experience = answers.experience;
    const format = answers.format;

    if (!goal) return [];

    const mapping = goalToCategories[goal];
    
    // Add learning paths if user wants structured learning or mixed
    if ((format === 'structured' || format === 'mixed') && mapping.pathIds && paths) {
      const relevantPaths = paths.filter(path => {
        // Match difficulty to experience level
        if (experience === 'beginner' && path.difficulty !== 'beginner') return false;
        if (experience === 'advanced' && path.difficulty === 'beginner') return false;
        
        // Match category
        return mapping.categories.includes(path.category);
      });

      relevantPaths.forEach(path => {
        recommendations.push({
          type: 'path',
          id: path.id,
          title: path.title,
          description: path.description,
          category: path.category,
          link: `/learning-path/${path.id}`,
          badge: path.badge_icon,
        });
      });
    }

    // Add articles if user wants quick reads or mixed
    if (format === 'articles' || format === 'mixed') {
      // Mock article recommendations based on IDs
      const articleMap: Record<number, { title: string; description: string; category: string }> = {
        1: { title: 'The Complete Guide to Omega-3 Fatty Acids', description: 'Learn everything about omega-3s and their benefits for heart health and brain function.', category: 'Nutrition' },
        2: { title: 'Red Light Therapy: Science and Benefits', description: 'Discover how red light therapy works and its proven benefits for recovery.', category: 'Recovery' },
        3: { title: 'Sleep Optimisation for Peak Performance', description: 'Understanding the role of quality sleep in recovery and performance.', category: 'Sleep' },
        4: { title: 'Marine Collagen: Your Skin\'s Best Friend', description: 'The science behind marine collagen and why it\'s superior for skin health.', category: 'Beauty' },
        5: { title: 'Cold Therapy: Benefits of Ice Baths', description: 'Explore the powerful recovery benefits of cold exposure.', category: 'Recovery' },
        6: { title: 'Trace Minerals: The Missing Link', description: 'Why trace minerals are essential for optimum health.', category: 'Nutrition' },
        7: { title: 'PEMF Therapy: Electromagnetic Healing', description: 'Understanding pulsed electromagnetic field therapy applications.', category: 'Recovery' },
        8: { title: 'Adaptogens for Stress Management', description: 'Natural compounds that help your body adapt to stress.', category: 'Wellness' },
        9: { title: 'Cognitive Enhancement: Science of Nootropics', description: 'Evidence-based guide to supplements that support mental clarity.', category: 'Brain Health' },
      };

      mapping.articleIds.forEach(id => {
        if (articleMap[id]) {
          recommendations.push({
            type: 'article',
            id: id.toString(),
            title: articleMap[id].title,
            description: articleMap[id].description,
            category: articleMap[id].category,
            link: '/resources',
          });
        }
      });
    }

    return recommendations.slice(0, 5); // Limit to top 5 recommendations
  };

  const recommendations = showResults ? getRecommendations() : [];

  if (showResults) {
    return (
      <Card className="mb-16 overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader className="text-center pb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 mx-auto">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Your Personalised Resources</h3>
          <p className="text-muted-foreground">
            Based on your goals and experience, here are the best resources for you
          </p>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 mb-6">
            {recommendations.map((rec, index) => (
              <Card
                key={rec.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 group animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {rec.type === 'path' ? (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-2xl">{rec.badge}</span>
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-accent" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={rec.type === 'path' ? 'default' : 'secondary'}>
                          {rec.type === 'path' ? 'Learning Path' : 'Article'}
                        </Badge>
                        <Badge variant="outline">{rec.category}</Badge>
                      </div>
                      <h4 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                        {rec.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {rec.description}
                      </p>
                      <Link to={rec.link}>
                        <Button variant="ghost" size="sm" className="group/btn">
                          {rec.type === 'path' ? 'Start Course' : 'Read Article'}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={handleRestart}>
              Take Quiz Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <Card className="mb-16 overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader className="text-center pb-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 mx-auto">
          <Target className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-2">Find Your Perfect Resources</h3>
        <p className="text-muted-foreground">
          Answer a few quick questions to get personalised recommendations
        </p>
      </CardHeader>

      <CardContent>
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h4 className="text-xl font-bold mb-6 text-center">
            {currentQuestion.question}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className={`h-auto py-4 px-6 justify-start text-left hover:border-primary hover:bg-primary/5 transition-all ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-primary bg-primary/10'
                    : ''
                }`}
                onClick={() => handleAnswer(option.value)}
              >
                <span className="text-3xl mr-3">{option.icon}</span>
                <span className="font-semibold">{option.label}</span>
              </Button>
            ))}
          </div>

          {currentStep > 0 && (
            <div className="flex justify-center">
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Question
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};