import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { FloatingNovaChat } from "@/components/nova/FloatingNovaChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const RadialProgress = ({ 
  value, 
  max, 
  size = 100, 
  strokeWidth = 8,
}: { 
  value: number; 
  max: number; 
  size?: number; 
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((value / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--foreground) / 0.05)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-medium text-foreground">{Math.round(percentage)}%</span>
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
  
  const [newGoalType, setNewGoalType] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalDate, setNewGoalDate] = useState("");

  useEffect(() => { loadGoals(); }, []);

  const loadGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/auth'); return; }
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
      toast({ title: "Error", description: "Failed to load goals", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGoal = async () => {
    if (!newGoalType || !newGoalTarget) {
      toast({ title: "Missing information", description: "Please select a goal type and target value", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { error } = await supabase.from('performance_goals').insert({
        user_id: user.id,
        goal_type: newGoalType,
        target_value: parseFloat(newGoalTarget),
        target_date: newGoalDate || null,
        current_value: 0,
        progress_percentage: 0,
        status: 'active',
      });
      if (error) throw error;
      toast({ title: "Goal created", description: "Your new goal has been added" });
      setNewGoalType("");
      setNewGoalTarget("");
      setNewGoalDate("");
      setIsOpen(false);
      loadGoals();
    } catch (error) {
      console.error("Error creating goal:", error);
      toast({ title: "Error", description: "Failed to create goal", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      const { error } = await supabase.from('performance_goals').update({ status: 'cancelled' }).eq('id', goalId);
      if (error) throw error;
      toast({ title: "Goal removed", description: "The goal has been removed" });
      loadGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast({ title: "Error", description: "Failed to remove goal", variant: "destructive" });
    }
  };

  const getGoalConfig = (type: string) => {
    return GOAL_TYPES.find(g => g.value === type) || { label: type, icon: Target, unit: "", description: "" };
  };

  const completed = goals.filter(g => (g.progress_percentage || 0) >= 100).length;
  const avgProgress = goals.length > 0 ? Math.round(goals.reduce((acc, g) => acc + (g.progress_percentage || 0), 0) / goals.length) : 0;

  if (isLoading) {
    return (
      <NovaSwipeWrapper>
        <div className="min-h-screen bg-background">
          <NovaNav />
          <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-12">
            <div className="mb-8">
              <div className="w-20 h-3 rounded-full bg-foreground/5 skeleton-shimmer mb-3" />
              <div className="w-32 h-6 rounded-lg bg-foreground/5 skeleton-shimmer mb-2" />
              <div className="w-48 h-4 rounded-lg bg-foreground/5 skeleton-shimmer" />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-12">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-6 rounded-3xl bg-foreground/[0.02]">
                  <div className="w-12 h-8 rounded-lg bg-foreground/5 skeleton-shimmer mx-auto mb-2" />
                  <div className="w-16 h-3 rounded-full bg-foreground/5 skeleton-shimmer mx-auto" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-6 rounded-3xl bg-foreground/[0.02]">
                  <div className="w-20 h-4 rounded-lg bg-foreground/5 skeleton-shimmer mb-4" />
                  <div className="w-[100px] h-[100px] rounded-full bg-foreground/5 skeleton-shimmer mx-auto mb-4" />
                  <div className="w-24 h-3 rounded-full bg-foreground/5 skeleton-shimmer mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </NovaSwipeWrapper>
    );
  }

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Performance Goals | Nova AI"
        description="Set health and performance goals, track your progress, and see what's working."
      />
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <NovaNav />
        
        <div className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-2">Performance</p>
              <h1 className="text-2xl font-medium text-foreground mb-2">Goals</h1>
              <p className="text-sm text-foreground/50">Track targets and visualise your progress</p>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all text-xs font-medium">
                  <Plus className="w-3.5 h-3.5" />
                  Add Goal
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-3xl border-foreground/10">
                <DialogHeader>
                  <DialogTitle className="text-lg font-medium">Create New Goal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label className="text-[11px] text-foreground/50">Goal Type</Label>
                    <Select value={newGoalType} onValueChange={setNewGoalType}>
                      <SelectTrigger className="h-11 rounded-xl border-foreground/10">
                        <SelectValue placeholder="Select a metric" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {GOAL_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="w-4 h-4 text-foreground/40" />
                              <span>{type.label}</span>
                              <span className="text-foreground/30 text-xs">({type.unit})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] text-foreground/50">Target Value</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 70"
                      value={newGoalTarget}
                      onChange={(e) => setNewGoalTarget(e.target.value)}
                      className="h-11 rounded-xl border-foreground/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] text-foreground/50">Target Date (optional)</Label>
                    <Input
                      type="date"
                      value={newGoalDate}
                      onChange={(e) => setNewGoalDate(e.target.value)}
                      className="h-11 rounded-xl border-foreground/10"
                    />
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <button className="px-5 py-2.5 rounded-full text-xs text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all">
                      Cancel
                    </button>
                  </DialogClose>
                  <button
                    onClick={handleCreateGoal}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs font-medium disabled:opacity-50 transition-all"
                  >
                    {isSaving && <Loader2 className="w-3 h-3 animate-spin" />}
                    Create Goal
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>

          {goals.length === 0 ? (
            /* Empty State */
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <div className="w-16 h-16 rounded-full bg-foreground/[0.03] flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-foreground/20" />
              </div>
              <h2 className="text-lg font-medium text-foreground mb-2">No goals yet</h2>
              <p className="text-sm text-foreground/40 mb-8 max-w-sm text-center leading-relaxed">
                Set performance goals to track your progress and stay motivated on your optimisation journey.
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs font-medium transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Create Your First Goal
              </button>
            </motion.div>
          ) : (
            <div className="space-y-12">
              {/* Summary Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { value: goals.length, label: "Active" },
                  { value: completed, label: "Completed" },
                  { value: `${avgProgress}%`, label: "Average" },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-foreground/[0.02] text-center">
                    <div className={`text-2xl font-light ${i === 1 ? 'text-accent' : 'text-foreground'}`}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-foreground/40 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Goals Grid */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30 mb-4">Active Goals</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {goals.map((goal, index) => {
                      const config = getGoalConfig(goal.goal_type);
                      const Icon = config.icon;
                      const progress = goal.progress_percentage || 0;
                      const daysSince = Math.floor((Date.now() - new Date(goal.started_at).getTime()) / (1000 * 60 * 60 * 24));

                      return (
                        <motion.div
                          key={goal.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: 0.15 + index * 0.05 }}
                          className="group p-6 rounded-3xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-foreground/5 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-foreground/60" />
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-foreground">{config.label}</h3>
                                <p className="text-[10px] text-foreground/40">{config.description}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteGoal(goal.id)}
                              className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-full flex items-center justify-center text-foreground/30 hover:text-foreground/60 hover:bg-foreground/5 transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center justify-center mb-6">
                            <RadialProgress value={progress} max={100} />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-foreground/40">Current</span>
                              <span className="text-foreground font-medium">
                                {goal.current_value ?? 0}{config.unit}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-foreground/40">Target</span>
                              <span className="text-foreground font-medium">
                                {goal.target_value}{config.unit}
                              </span>
                            </div>
                            {goal.target_date && (
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-foreground/40">Due</span>
                                <span className="text-foreground/60">
                                  {new Date(goal.target_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-foreground/5">
                              <span className="text-foreground/30">{daysSince}d active</span>
                              {progress >= 100 && (
                                <span className="text-accent text-[10px] font-medium">Complete</span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <FloatingNovaChat />
      </div>
    </NovaSwipeWrapper>
  );
}
