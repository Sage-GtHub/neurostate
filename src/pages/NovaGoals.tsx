import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SEO } from "@/components/SEO";
import { 
  Target, 
  Plus, 
  Activity, 
  Brain, 
  Moon, 
  Zap, 
  TrendingUp,
  Loader2,
  CheckCircle2,
  Edit2,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Goal {
  id: string;
  goal_type: string;
  target_value: number;
  current_value: number | null;
  progress_percentage: number | null;
  status: string | null;
  target_date: string | null;
  started_at: string;
}

const GOAL_TYPES = [
  { value: "hrv", label: "HRV", icon: Activity, unit: "ms", description: "Heart Rate Variability" },
  { value: "sleep_score", label: "Sleep Score", icon: Moon, unit: "/100", description: "Overall sleep quality" },
  { value: "recovery", label: "Recovery", icon: TrendingUp, unit: "%", description: "Daily recovery score" },
  { value: "focus_hours", label: "Focus Hours", icon: Brain, unit: "hrs/day", description: "Deep work time" },
  { value: "energy", label: "Energy", icon: Zap, unit: "/100", description: "Daily energy levels" },
];

// Radial progress component
const RadialProgress = ({ 
  value, 
  max, 
  size = 120, 
  strokeWidth = 10,
  color = "hsl(var(--accent))",
  bgColor = "hsl(var(--muted))"
}: { 
  value: number; 
  max: number; 
  size?: number; 
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((value / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
};

export default function NovaGoals() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // New goal form state
  const [newGoalType, setNewGoalType] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalDate, setNewGoalDate] = useState("");

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('performance_goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error("Error loading goals:", error);
      toast({
        title: "Error",
        description: "Failed to load goals",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGoal = async () => {
    if (!newGoalType || !newGoalTarget) {
      toast({
        title: "Missing information",
        description: "Please select a goal type and enter a target value",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('performance_goals')
        .insert({
          user_id: user.id,
          goal_type: newGoalType,
          target_value: parseFloat(newGoalTarget),
          target_date: newGoalDate || null,
          current_value: 0,
          progress_percentage: 0,
          status: 'active',
        });

      if (error) throw error;

      toast({
        title: "Goal created",
        description: "Your new goal has been added",
      });

      setNewGoalType("");
      setNewGoalTarget("");
      setNewGoalDate("");
      setIsOpen(false);
      loadGoals();
    } catch (error) {
      console.error("Error creating goal:", error);
      toast({
        title: "Error",
        description: "Failed to create goal",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      const { error } = await supabase
        .from('performance_goals')
        .update({ status: 'cancelled' })
        .eq('id', goalId);

      if (error) throw error;

      toast({
        title: "Goal removed",
        description: "The goal has been removed",
      });
      loadGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast({
        title: "Error",
        description: "Failed to remove goal",
        variant: "destructive",
      });
    }
  };

  const getGoalIcon = (type: string) => {
    const goalType = GOAL_TYPES.find(g => g.value === type);
    return goalType?.icon || Target;
  };

  const getGoalLabel = (type: string) => {
    const goalType = GOAL_TYPES.find(g => g.value === type);
    return goalType?.label || type;
  };

  const getGoalUnit = (type: string) => {
    const goalType = GOAL_TYPES.find(g => g.value === type);
    return goalType?.unit || "";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "hsl(142, 76%, 36%)"; // Green
    if (percentage >= 50) return "hsl(var(--accent))"; // Accent
    if (percentage >= 25) return "hsl(38, 92%, 50%)"; // Orange
    return "hsl(var(--muted-foreground))"; // Gray
  };

  if (isLoading) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Goals – Nova | NeuroState"
        description="Track your performance goals and visualise your progress with Nova."
      />
      <div className="min-h-screen bg-background">
        <NovaNav />
        
        <div className="border-b border-border/50 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6 sm:py-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-2">Performance</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Goals</h1>
                <p className="text-sm text-muted-foreground">Track targets and visualise your progress</p>
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Goal</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Goal</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Goal Type</Label>
                      <Select value={newGoalType} onValueChange={setNewGoalType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a metric" />
                        </SelectTrigger>
                        <SelectContent>
                          {GOAL_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <type.icon className="w-4 h-4" />
                                <span>{type.label}</span>
                                <span className="text-muted-foreground text-xs">({type.unit})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Target Value</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 70"
                        value={newGoalTarget}
                        onChange={(e) => setNewGoalTarget(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Target Date (optional)</Label>
                      <Input
                        type="date"
                        value={newGoalDate}
                        onChange={(e) => setNewGoalDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleCreateGoal} disabled={isSaving}>
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Create Goal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8 sm:py-12">
          {goals.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-3">No goals yet</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Set performance goals to track your progress and stay motivated on your optimisation journey.
              </p>
              <Button onClick={() => setIsOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Your First Goal
              </Button>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              {/* Overview Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-3xl font-bold text-foreground">{goals.length}</div>
                    <div className="text-sm text-muted-foreground">Active Goals</div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-3xl font-bold text-accent">
                      {goals.filter(g => (g.progress_percentage || 0) >= 100).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-3xl font-bold text-foreground">
                      {Math.round(goals.reduce((acc, g) => acc + (g.progress_percentage || 0), 0) / goals.length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Progress</div>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-3xl font-bold text-foreground">
                      {goals.filter(g => (g.progress_percentage || 0) >= 50).length}
                    </div>
                    <div className="text-sm text-muted-foreground">On Track</div>
                  </CardContent>
                </Card>
              </div>

              {/* Goals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => {
                  const Icon = getGoalIcon(goal.goal_type);
                  const progress = goal.progress_percentage || 0;
                  const isComplete = progress >= 100;

                  return (
                    <Card 
                      key={goal.id} 
                      className={cn(
                        "border-border/50 transition-all hover:shadow-md",
                        isComplete && "border-accent/50 bg-accent/5"
                      )}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center",
                              isComplete ? "bg-accent/20" : "bg-muted"
                            )}>
                              {isComplete ? (
                                <CheckCircle2 className="w-5 h-5 text-accent" />
                              ) : (
                                <Icon className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{getGoalLabel(goal.goal_type)}</h3>
                              <p className="text-xs text-muted-foreground">
                                Target: {goal.target_value}{getGoalUnit(goal.goal_type)}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-center my-6">
                          <RadialProgress 
                            value={progress} 
                            max={100}
                            color={getProgressColor(progress)}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current</span>
                            <span className="font-medium text-foreground">
                              {goal.current_value || 0}{getGoalUnit(goal.goal_type)}
                            </span>
                          </div>
                          {goal.target_date && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Target Date</span>
                              <span className="font-medium text-foreground">
                                {new Date(goal.target_date).toLocaleDateString('en-GB', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </NovaSwipeWrapper>
  );
}