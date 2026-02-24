import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Brain, Activity, Moon, Zap, Sparkles, Loader2, RefreshCw,
  AlertTriangle, Link2, ArrowRight, Clock, TrendingUp, CheckCircle2, Info,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface GoalWithWeight {
  id: string;
  goal_type: string;
  target_value: number;
  current_value: number | null;
  progress_percentage: number | null;
  priority_weight: number;
}

interface Conflict {
  goal_a: string;
  goal_b: string;
  severity: string;
  description: string;
  resolution: string;
}

interface Synergy {
  goal_a: string;
  goal_b: string;
  strength: string;
  description: string;
}

interface TradeOff {
  title: string;
  description: string;
  recommendation: string;
}

interface ScheduleBlock {
  time_window: string;
  primary_goal: string;
  activities: string;
}

interface RecommendedWeight {
  goal_type: string;
  recommended_weight: number;
  rationale: string;
}

interface BalanceAnalysis {
  conflicts: Conflict[];
  synergies: Synergy[];
  recommended_weights: RecommendedWeight[];
  trade_offs: TradeOff[];
  schedule_blocks?: ScheduleBlock[];
  overall_assessment: string;
}

const goalConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  hrv: { label: "HRV", icon: Activity, color: "text-emerald-500" },
  sleep_score: { label: "Sleep Quality", icon: Moon, color: "text-indigo-500" },
  recovery: { label: "Recovery", icon: TrendingUp, color: "text-blue-500" },
  focus_hours: { label: "Cognitive Focus", icon: Brain, color: "text-violet-500" },
  energy: { label: "Daily Energy", icon: Zap, color: "text-amber-500" },
};

const getGoalLabel = (type: string) => goalConfig[type]?.label || type;
const getGoalIcon = (type: string) => goalConfig[type]?.icon || Target;

export function MultiGoalBalancer() {
  const { toast } = useToast();
  const [goals, setGoals] = useState<GoalWithWeight[]>([]);
  const [analysis, setAnalysis] = useState<BalanceAnalysis | null>(null);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const loadGoals = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from('performance_goals')
        .select('id, goal_type, target_value, current_value, progress_percentage, priority_weight')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: true });
      if (error) throw error;
      setGoals((data || []).map(g => ({
        ...g,
        priority_weight: (g as any).priority_weight ?? 50,
      })));
    } catch (err) {
      console.error("Error loading goals:", err);
    } finally {
      setIsLoadingGoals(false);
    }
  }, []);

  useEffect(() => { loadGoals(); }, [loadGoals]);

  const handleWeightChange = (goalId: string, newWeight: number) => {
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, priority_weight: newWeight } : g));
    setHasUnsavedChanges(true);
  };

  const saveWeights = async () => {
    setIsSaving(true);
    try {
      for (const goal of goals) {
        await supabase
          .from('performance_goals')
          .update({ priority_weight: goal.priority_weight } as any)
          .eq('id', goal.id);
      }
      setHasUnsavedChanges(false);
      toast({ title: "Weights saved", description: "Your goal priorities have been updated." });
    } catch (err) {
      console.error("Error saving weights:", err);
      toast({ title: "Error", description: "Failed to save weights", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const applyRecommended = (rec: RecommendedWeight[]) => {
    setGoals(prev => prev.map(g => {
      const match = rec.find(r => r.goal_type === g.goal_type);
      return match ? { ...g, priority_weight: match.recommended_weight } : g;
    }));
    setHasUnsavedChanges(true);
  };

  const runAnalysis = async () => {
    setIsAnalysing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Authentication required", variant: "destructive" });
        return;
      }

      const response = await supabase.functions.invoke('goal-balance', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (response.error) {
        const msg = typeof response.error === 'object' && 'message' in response.error
          ? (response.error as any).message : 'Failed to analyse goals';
        throw new Error(msg);
      }

      setAnalysis(response.data.analysis);
      toast({ title: "Analysis complete", description: "Trade-off analysis generated from your biometric data." });
    } catch (err: any) {
      console.error("Analysis error:", err);
      toast({ title: "Error", description: err?.message || "Failed to analyse goals", variant: "destructive" });
    } finally {
      setIsAnalysing(false);
    }
  };

  const totalWeight = goals.reduce((s, g) => s + g.priority_weight, 0);

  if (isLoadingGoals) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
      </div>
    );
  }

  if (goals.length < 2) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Balance Your Goals</h2>
          <p className="text-sm text-muted-foreground">When goals compete, this helps you decide what to prioritise</p>
        </div>
        <Card className="border-foreground/5">
          <CardContent className="p-10 text-center">
            <Target className="h-10 w-10 mx-auto mb-4 text-foreground/20" />
            <p className="text-sm font-medium text-foreground mb-2">Need at least 2 active goals</p>
            <p className="text-xs text-muted-foreground mb-4">
              Create performance goals in the Goals page to enable trade-off analysis.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Balance Your Goals</h2>
          <p className="text-sm text-muted-foreground">Set priorities and see how your goals work together or compete</p>
        </div>
        <div className="flex gap-2">
          {hasUnsavedChanges && (
            <Button size="sm" onClick={saveWeights} disabled={isSaving} className="gap-2">
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              Save Weights
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={runAnalysis} disabled={isAnalysing} className="gap-2">
            {isAnalysing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Analyse Goals
          </Button>
        </div>
      </div>

      {/* Priority Sliders */}
      <Card className="border-foreground/5">
        <CardContent className="p-6 space-y-6">
          {goals.map((goal, index) => {
            const Icon = getGoalIcon(goal.goal_type);
            const colorClass = goalConfig[goal.goal_type]?.color || "text-foreground/60";
            const pct = totalWeight > 0 ? Math.round((goal.priority_weight / totalWeight) * 100) : 0;

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-foreground/[0.03] ${colorClass}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{getGoalLabel(goal.goal_type)}</h3>
                      <p className="text-[10px] text-muted-foreground">
                        {goal.current_value ?? 0} / {goal.target_value} · {goal.progress_percentage ?? 0}% progress
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-foreground">{goal.priority_weight}</span>
                    <span className="text-xs text-muted-foreground ml-1">({pct}%)</span>
                  </div>
                </div>
                <Slider
                  value={[goal.priority_weight]}
                  onValueChange={([v]) => handleWeightChange(goal.id, v)}
                  max={100}
                  min={0}
                  step={5}
                  className="flex-1"
                />
              </motion.div>
            );
          })}

          <div className="border-t border-foreground/5 pt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total weight</span>
            <span className="font-semibold text-foreground">{totalWeight}</span>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Overall Assessment */}
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-5 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">AI Assessment</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{analysis.overall_assessment}</p>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Weights */}
            {analysis.recommended_weights?.length > 0 && (
              <Card className="border-foreground/5">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Target className="h-4 w-4 text-accent" />
                      Recommended Weights
                    </h3>
                    <Button size="sm" variant="outline" onClick={() => applyRecommended(analysis.recommended_weights)} className="text-xs gap-1">
                      <ArrowRight className="h-3 w-3" /> Apply
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {analysis.recommended_weights.map((rw, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-foreground/[0.02]">
                        <div className="flex-1">
                          <span className="text-sm font-medium text-foreground">{getGoalLabel(rw.goal_type)}</span>
                          <p className="text-xs text-muted-foreground mt-0.5">{rw.rationale}</p>
                        </div>
                        <Badge variant="outline" className="ml-3 text-xs">{rw.recommended_weight}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Conflicts */}
            {analysis.conflicts?.length > 0 && (
              <Card className="border-foreground/5">
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Goal Conflicts
                  </h3>
                  <div className="space-y-3">
                    {analysis.conflicts.map((c, i) => (
                      <div key={i} className={`p-4 rounded-lg border ${
                        c.severity === 'high' ? 'border-amber-500/20 bg-amber-500/5' : 'border-foreground/5 bg-foreground/[0.02]'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-foreground">{getGoalLabel(c.goal_a)}</span>
                          <span className="text-xs text-muted-foreground">vs</span>
                          <span className="text-xs font-medium text-foreground">{getGoalLabel(c.goal_b)}</span>
                          <Badge variant="outline" className={`text-[10px] ml-auto ${
                            c.severity === 'high' ? 'border-amber-500/30 text-amber-600' : ''
                          }`}>{c.severity}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{c.description}</p>
                        <p className="text-xs text-accent"><strong>Resolution:</strong> {c.resolution}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Synergies */}
            {analysis.synergies?.length > 0 && (
              <Card className="border-foreground/5">
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                    <Link2 className="h-4 w-4 text-emerald-500" />
                    Goal Synergies
                  </h3>
                  <div className="space-y-3">
                    {analysis.synergies.map((s, i) => (
                      <div key={i} className="p-4 rounded-lg border border-emerald-500/10 bg-emerald-500/5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-foreground">{getGoalLabel(s.goal_a)}</span>
                          <Link2 className="h-3 w-3 text-emerald-500" />
                          <span className="text-xs font-medium text-foreground">{getGoalLabel(s.goal_b)}</span>
                          <Badge variant="outline" className="text-[10px] ml-auto border-emerald-500/30 text-emerald-600">{s.strength}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trade-offs */}
            {analysis.trade_offs?.length > 0 && (
              <Card className="border-foreground/5">
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                    <Info className="h-4 w-4 text-blue-500" />
                    Trade-off Analysis
                  </h3>
                  <div className="space-y-3">
                    {analysis.trade_offs.map((t, i) => (
                      <div key={i} className="p-4 rounded-lg border border-foreground/5 bg-foreground/[0.02]">
                        <h4 className="text-xs font-semibold text-foreground mb-1">{t.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{t.description}</p>
                        <p className="text-xs text-accent"><strong>Recommendation:</strong> {t.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Schedule Blocks */}
            {analysis.schedule_blocks && analysis.schedule_blocks.length > 0 && (
              <Card className="border-foreground/5">
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-violet-500" />
                    Optimised Daily Schedule
                  </h3>
                  <div className="space-y-2">
                    {analysis.schedule_blocks.map((sb, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-foreground/[0.02]">
                        <Badge variant="outline" className="text-[10px] font-mono flex-shrink-0 mt-0.5">{sb.time_window}</Badge>
                        <div>
                          <span className="text-xs font-medium text-foreground">{getGoalLabel(sb.primary_goal)}</span>
                          <p className="text-xs text-muted-foreground mt-0.5">{sb.activities}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="border-foreground/5 bg-foreground/[0.01]">
        <CardContent className="p-5 flex items-start gap-3">
          <Target className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium mb-1">Intelligent Balancing</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nova analyses your biometric data, active protocols, and check-in history to identify conflicts, synergies, 
              and optimal priority distributions between competing goals.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
