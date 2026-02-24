import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { FloatingNovaChat } from "@/components/nova/FloatingNovaChat";
import { NovaSkeletonGrid, NovaSkeleton } from "@/components/nova/NovaSkeleton";
import { NovaEmptyState } from "@/components/nova/NovaEmptyState";
import { NovaErrorState } from "@/components/nova/NovaErrorBoundary";
import { supabase } from "@/integrations/supabase/client";
import { ProtocolAssessment } from "@/components/ProtocolAssessment";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, ArrowUpRight, Target, Activity, TrendingUp, Zap, Sparkles, Check, Moon, Brain, Heart, Dumbbell, Loader2, Trash2, CheckCircle2, RefreshCw, AlertCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Protocol {
  id: string;
  protocol_name: string;
  goal: string;
  status: string;
  completion_percentage: number;
  started_at: string;
  products: any[];
}

interface Assessment {
  id: string;
  goals: string[];
  assessment_data: {
    sleepQuality?: string;
    stressLevel?: string;
    activityLevel?: string;
    workStyle?: string;
  };
  lifestyle_factors: any;
}

interface RecommendedProtocol {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  match: number;
  duration: string;
  items: number;
  benefits: string[];
}

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

const PROTOCOL_TEMPLATES: Record<string, Omit<RecommendedProtocol, 'match'>> = {
  sleep: {
    id: 'sleep',
    name: 'Better Sleep Plan',
    description: 'Improve your sleep quality so you wake up feeling rested and ready to go.',
    icon: Moon,
    color: 'from-indigo-500/20 to-purple-500/20',
    duration: '4 weeks',
    items: 5,
    benefits: ['Better sleep quality', 'Faster recovery', 'Clearer thinking']
  },
  focus: {
    id: 'focus',
    name: 'Sharper Focus Plan',
    description: 'Stay focused for longer, get more deep work done, and reduce mental fatigue.',
    icon: Brain,
    color: 'from-amber-500/20 to-orange-500/20',
    duration: '6 weeks',
    items: 4,
    benefits: ['Longer focus', 'Less brain fog', 'Clearer thinking']
  },
  recovery: {
    id: 'recovery',
    name: 'Faster Recovery Plan',
    description: 'Bounce back quicker between tough days so you can keep performing.',
    icon: Heart,
    color: 'from-emerald-500/20 to-teal-500/20',
    duration: '4 weeks',
    items: 6,
    benefits: ['Faster HRV recovery', 'Less inflammation', 'Better adaptation']
  },
  energy: {
    id: 'energy',
    name: 'Steady Energy Plan',
    description: 'Stop the afternoon crashes and keep your energy consistent all day.',
    icon: Zap,
    color: 'from-yellow-500/20 to-amber-500/20',
    duration: '3 weeks',
    items: 4,
    benefits: ['Stable energy', 'No afternoon slump', 'Better endurance']
  },
  stress: {
    id: 'stress',
    name: 'Stress Management Plan',
    description: 'Build your ability to handle pressure without it wearing you down.',
    icon: Activity,
    color: 'from-cyan-500/20 to-blue-500/20',
    duration: '5 weeks',
    items: 5,
    benefits: ['Lower stress hormones', 'Better heart health', 'More resilience']
  },
  performance: {
    id: 'performance',
    name: 'Peak Performance Plan',
    description: 'The full programme for getting the most out of your mind and body.',
    icon: Target,
    color: 'from-rose-500/20 to-pink-500/20',
    duration: '8 weeks',
    items: 8,
    benefits: ['Best output', 'Full recovery', 'Consistent excellence']
  },
};

const GOAL_TYPES = [
  { value: "hrv", label: "HRV", icon: Activity, unit: "ms", description: "Heart Rate Variability" },
  { value: "sleep_score", label: "Sleep Score", icon: Moon, unit: "/100", description: "Overall sleep quality" },
  { value: "recovery", label: "Recovery", icon: TrendingUp, unit: "%", description: "Daily recovery score" },
  { value: "focus_hours", label: "Focus Hours", icon: Brain, unit: "hrs/day", description: "Deep work time" },
  { value: "energy", label: "Energy", icon: Zap, unit: "/100", description: "Daily energy levels" },
];

// Radial progress component for Goals
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
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
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

export default function NovaProtocols() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("protocols");
  
  // Protocols state
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [protocolsLoading, setProtocolsLoading] = useState(true);
  const [protocolsError, setProtocolsError] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedProtocol[]>([]);
  const [showAssessment, setShowAssessment] = useState(false);
  const [activatingProtocol, setActivatingProtocol] = useState<string | null>(null);

  // Goals state
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalsLoading, setGoalsLoading] = useState(false);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [isSavingGoal, setIsSavingGoal] = useState(false);
  const [newGoalType, setNewGoalType] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalDate, setNewGoalDate] = useState("");

  useEffect(() => { 
    loadProtocols(); 
    loadAssessment();
  }, []);

  useEffect(() => {
    if (activeTab === "goals") {
      loadGoals();
    }
  }, [activeTab]);

  const loadProtocols = async () => {
    setProtocolsLoading(true);
    setProtocolsError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase.from('user_protocols').select('*').eq('user_id', user.id).order('started_at', { ascending: false });
      if (error) throw error;
      setProtocols((data || []) as Protocol[]);
    } catch (error) {
      console.error("Error loading protocols:", error);
      setProtocolsError(error instanceof Error ? error.message : 'Failed to load protocols');
      toast({ title: "Error", description: "Failed to load protocols", variant: "destructive" });
    } finally {
      setProtocolsLoading(false);
    }
  };

  const loadAssessment = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data, error } = await supabase
        .from('protocol_assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setAssessment(data as Assessment);
        generateRecommendations(data as Assessment);
      }
    } catch (error) {
      console.error("Error loading assessment:", error);
    }
  };

  const generateRecommendations = (assessment: Assessment) => {
    const recs: RecommendedProtocol[] = [];
    
    assessment.goals.forEach((goal, index) => {
      const template = PROTOCOL_TEMPLATES[goal];
      if (template) {
        let matchScore = 95 - (index * 5);
        const lifestyle = assessment.assessment_data;
        if (goal === 'sleep' && lifestyle?.sleepQuality === 'poor') matchScore += 3;
        if (goal === 'stress' && (lifestyle?.stressLevel === 'high' || lifestyle?.stressLevel === 'very_high')) matchScore += 3;
        if (goal === 'recovery' && lifestyle?.activityLevel === 'very_active') matchScore += 3;
        
        recs.push({
          ...template,
          match: Math.min(99, matchScore)
        });
      }
    });
    
    if (recs.length < 3) {
      const lifestyle = assessment.assessment_data;
      if (lifestyle?.stressLevel === 'high' || lifestyle?.stressLevel === 'very_high') {
        if (!assessment.goals.includes('stress')) {
          recs.push({ ...PROTOCOL_TEMPLATES.stress, match: 82 });
        }
      } else if (lifestyle?.sleepQuality === 'poor' || lifestyle?.sleepQuality === 'fair') {
        if (!assessment.goals.includes('sleep')) {
          recs.push({ ...PROTOCOL_TEMPLATES.sleep, match: 78 });
        }
      }
    }
    
    setRecommendations(recs.slice(0, 4));
  };

  const activateProtocol = async (rec: RecommendedProtocol) => {
    setActivatingProtocol(rec.id);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      
      const { error } = await supabase.from('user_protocols').insert({
        user_id: user.id,
        protocol_name: rec.name,
        goal: rec.id,
        status: 'active',
        completion_percentage: 0,
        products: rec.benefits.map((b, i) => ({ id: `${rec.id}-${i}`, name: b, completed: false }))
      });
      
      if (error) throw error;
      
      toast({
        title: "Protocol activated",
        description: `${rec.name} has been added to your active protocols.`,
      });
      
      await loadProtocols();
    } catch (error) {
      console.error("Error activating protocol:", error);
      toast({
        title: "Error",
        description: "Failed to activate protocol. Please try again.",
        variant: "destructive"
      });
    } finally {
      setActivatingProtocol(null);
    }
  };

  const getDaysSince = (dateString: string) => {
    const start = new Date(dateString);
    const now = new Date();
    return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  // ============ GOALS LOGIC ============
  const loadGoals = async () => {
    setGoalsLoading(true);
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
      setGoalsLoading(false);
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

    setIsSavingGoal(true);
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
      setIsGoalDialogOpen(false);
      loadGoals();
    } catch (error) {
      console.error("Error creating goal:", error);
      toast({
        title: "Error",
        description: "Failed to create goal",
        variant: "destructive",
      });
    } finally {
      setIsSavingGoal(false);
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
    if (percentage >= 80) return "hsl(142, 76%, 36%)";
    if (percentage >= 50) return "hsl(var(--accent))";
    if (percentage >= 25) return "hsl(38, 92%, 50%)";
    return "hsl(var(--muted-foreground))";
  };

  const averageProgress = protocols.length > 0 ? Math.round(protocols.reduce((acc, p) => acc + p.completion_percentage, 0) / protocols.length) : 0;
  const activeGoals = protocols.filter(p => p.status === 'active').map(p => p.goal);

  return (
    <NovaSwipeWrapper>
      <SEO title="Protocols & Goals | Nova" description="Build and track personalised plans for better sleep, sharper focus, faster recovery, and steady energy." noindex={true} />
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <NovaNav />
        
        <div className="relative container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-2">Your journey</p>
            <h1 className="text-2xl font-light text-foreground mb-6">Protocols & Goals</h1>
            
            {/* Stats */}
            <div className="flex items-center justify-center gap-8">
              {[
                { value: protocols.filter(p => p.status === 'active').length, label: "Active Protocols" },
                { value: `${averageProgress}%`, label: "Adherence", accent: true },
                { value: goals.length, label: "Goals" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className={`text-2xl font-light ${stat.accent ? 'text-accent' : 'text-foreground'}`}>{stat.value}</div>
                  <div className="text-[10px] text-foreground/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 bg-muted/30 mx-auto flex w-fit">
              <TabsTrigger value="protocols" className="gap-2">
                <Activity className="w-4 h-4" />
                Protocols
              </TabsTrigger>
              <TabsTrigger value="goals" className="gap-2">
                <Target className="w-4 h-4" />
                Goals
              </TabsTrigger>
            </TabsList>

            {/* PROTOCOLS TAB */}
            <TabsContent value="protocols" className="mt-0">
              {/* Loading State */}
              {protocolsLoading && (
                <div className="space-y-4">
                  <NovaSkeletonGrid count={2} variant="protocol" />
                </div>
              )}

              {/* Error State */}
              {!protocolsLoading && protocolsError && (
                <NovaErrorState 
                  error={protocolsError} 
                  onRetry={loadProtocols}
                  title="Failed to load protocols"
                />
              )}

              {/* Empty State */}
              {!protocolsLoading && !protocolsError && protocols.length === 0 && recommendations.length === 0 && (
                <NovaEmptyState
                  variant="protocols"
                  primaryAction={{
                    label: "Create Protocol",
                    onClick: () => setShowAssessment(true)
                  }}
                  secondaryAction={{
                    label: "Refresh",
                    onClick: loadProtocols
                  }}
                />
              )}

              {/* Personalised Recommendations */}
              {!protocolsLoading && !protocolsError && recommendations.length > 0 && (
                <motion.div 
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <p className="text-[10px] uppercase tracking-[0.15em] text-primary font-medium">Recommended for You</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recommendations.map((rec, i) => {
                      const isActive = activeGoals.includes(rec.id);
                      const Icon = rec.icon;
                      
                      return (
                        <motion.div
                          key={rec.id}
                          className={`relative p-5 rounded-2xl border transition-all ${
                            isActive 
                              ? 'border-primary/30 bg-primary/5 opacity-60' 
                              : 'border-border/50 bg-gradient-to-br ' + rec.color + ' hover:border-primary/30'
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/50">
                            <span className="text-[10px] font-medium text-primary">{rec.match}% match</span>
                          </div>
                          
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-foreground/70" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-foreground mb-1">{rec.name}</h3>
                              <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                                {rec.description}
                              </p>
                              
                              <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-4">
                                <span>{rec.duration}</span>
                                <span>•</span>
                                <span>{rec.items} focus areas</span>
                              </div>
                              
                              {isActive ? (
                                <div className="flex items-center gap-1.5 text-[11px] text-primary">
                                  <Check className="w-3.5 h-3.5" />
                                  Already active
                                </div>
                              ) : (
                                <button
                                  onClick={() => activateProtocol(rec)}
                                  disabled={activatingProtocol === rec.id}
                                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-[11px] font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
                                >
                                  {activatingProtocol === rec.id ? (
                                    <>
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                      Activating...
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-3 h-3" />
                                      Activate Protocol
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Custom Protocol Button */}
              <button
                onClick={() => setShowAssessment(true)}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full border border-dashed border-border/50 text-foreground/60 text-xs font-medium transition-all hover:border-primary/50 hover:text-foreground hover:bg-primary/5 mb-8"
              >
                <Plus className="w-4 h-4" />
                Create Custom Protocol
              </button>

              {/* Active Protocols List */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-4">Active Protocols</p>

                {protocols.length > 0 ? (
                  protocols.map((protocol) => (
                    <button
                      key={protocol.id}
                      onClick={() => navigate(`/nova/protocols/${protocol.id}`)}
                      className="w-full flex items-center gap-4 p-5 rounded-3xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all text-left group"
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-accent/30 flex items-center justify-center flex-shrink-0 bg-accent/[0.02]">
                        <span className="text-sm font-light text-foreground">{protocol.completion_percentage}%</span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xs font-medium text-foreground mb-1">{protocol.protocol_name}</h3>
                        <p className="text-[10px] text-foreground/40">
                          {getDaysSince(protocol.started_at)} days · {protocol.products?.length || 0} items · <span className="capitalize">{protocol.status}</span>
                        </p>
                      </div>

                      <ArrowUpRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </button>
                  ))
                ) : (
                  !recommendations.length && (
                    <div className="flex flex-col items-center py-16 text-center">
                      <div className="w-14 h-14 rounded-3xl bg-foreground/[0.02] flex items-center justify-center mb-6">
                        <Target className="w-6 h-6 text-foreground/20" />
                      </div>
                  <p className="text-xs text-foreground/40 mb-6 max-w-xs">
                        No active protocols yet. Answer a few questions and we'll suggest the right plan for you.
                      </p>
                      <button
                        onClick={() => setShowAssessment(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-xs font-medium"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Start Assessment
                      </button>
                    </div>
                  )
                )}
              </div>

              {/* Journey Progress */}
              {protocols.length > 0 && (
                <div className="mt-12 pt-8 border-t border-foreground/5">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/40 mb-4">Your Journey</p>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { phase: 1, label: "Discover", icon: Activity, active: true },
                      { phase: 2, label: "Optimise", icon: TrendingUp, active: getDaysSince(protocols[0]?.started_at) > 7 },
                      { phase: 3, label: "Predict", icon: Target, active: getDaysSince(protocols[0]?.started_at) > 30 },
                      { phase: 4, label: "Autonomy", icon: Zap, active: getDaysSince(protocols[0]?.started_at) > 90 },
                    ].map((item) => (
                      <div
                        key={item.phase}
                        className={`flex flex-col items-center p-4 rounded-2xl transition-all ${
                          item.active ? "bg-foreground/[0.03]" : "bg-foreground/[0.01] opacity-50"
                        }`}
                      >
                        <item.icon className={`w-4 h-4 mb-2 ${item.active ? "text-accent" : "text-foreground/30"}`} />
                        <span className={`text-[10px] ${item.active ? "text-foreground" : "text-foreground/30"}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* GOALS TAB */}
            <TabsContent value="goals" className="mt-0">
              <div className="flex justify-end mb-6">
                <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Goal
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
                      <Button onClick={handleCreateGoal} disabled={isSavingGoal}>
                        {isSavingGoal ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Create Goal
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {goalsLoading ? (
                <div className="space-y-6">
                  {/* Overview Cards skeleton */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="p-4 sm:p-6 bg-card rounded-xl border border-foreground/5">
                        <div className="w-12 h-8 rounded-lg bg-foreground/5 skeleton-shimmer mx-auto mb-2" />
                        <div className="w-16 h-3 rounded-full bg-foreground/5 skeleton-shimmer mx-auto" />
                      </div>
                    ))}
                  </div>
                  {/* Goals Grid skeleton */}
                  <NovaSkeletonGrid count={3} variant="goal" />
                </div>
              ) : goals.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                    <Target className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">No goals yet</h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Set performance goals to track your progress and stay motivated on your optimisation journey.
                  </p>
                  <Button onClick={() => setIsGoalDialogOpen(true)} className="gap-2">
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
                          {goals.length > 0 ? Math.round(goals.reduce((acc, g) => acc + (g.progress_percentage || 0), 0) / goals.length) : 0}%
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
                                  <span className="text-muted-foreground">Due</span>
                                  <span className="font-medium text-foreground">
                                    {new Date(goal.target_date).toLocaleDateString('en-GB', { 
                                      day: 'numeric', 
                                      month: 'short', 
                                      year: 'numeric' 
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
            </TabsContent>
          </Tabs>
        </div>

        <ProtocolAssessment open={showAssessment} onOpenChange={setShowAssessment} onComplete={() => { loadProtocols(); loadAssessment(); }} />
        
        <FloatingNovaChat />
      </div>
    </NovaSwipeWrapper>
  );
}