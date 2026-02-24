import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  TrendingUp, TrendingDown, Minus, Activity, Moon, Brain,
  Heart, BarChart3, ChevronRight, Sparkles, Target, CheckCircle2,
  Lightbulb, Loader2, RefreshCw, Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MetricSummary {
  metric_type: string;
  this_week_avg: number;
  last_week_avg: number;
  change_pct: number;
  trend: "up" | "down" | "stable";
  data_points: number;
}

interface GoalSummary {
  goal_type: string;
  target_value: number;
  current_value: number | null;
  progress: number;
  status: string;
}

interface DigestData {
  period_start: string;
  period_end: string;
  metrics_summary: MetricSummary[];
  goals_summary: GoalSummary[];
  check_in_summary: {
    total_check_ins: number;
    avg_mood: number | null;
    avg_energy: number | null;
    protocols_adhered: number;
  };
  ai_narrative: string;
  highlights: string[];
  recommendations: string[];
}

const metricIcons: Record<string, React.ElementType> = {
  hrv: Heart,
  sleep_quality: Moon,
  sleep: Moon,
  recovery: TrendingUp,
  focus_time: Brain,
  focus: Brain,
  energy: Activity,
};

const metricLabels: Record<string, string> = {
  hrv: "HRV",
  sleep_quality: "Sleep",
  sleep: "Sleep",
  recovery: "Recovery",
  focus_time: "Focus",
  focus: "Focus",
  energy: "Energy",
  resting_heart_rate: "Resting HR",
  steps: "Steps",
};

export function WeeklySummary() {
  const navigate = useNavigate();
  const [digest, setDigest] = useState<DigestData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasExistingDigest, setHasExistingDigest] = useState(false);

  useEffect(() => {
    loadExistingDigest();
  }, []);

  const loadExistingDigest = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setIsLoading(false); return; }

      // Check for a recent digest in activity_feed
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const { data } = await supabase
        .from("activity_feed")
        .select("metadata")
        .eq("user_id", user.id)
        .eq("activity_type", "weekly_digest")
        .gte("created_at", weekAgo.toISOString())
        .order("created_at", { ascending: false })
        .limit(1);

      if (data && data.length > 0 && data[0].metadata) {
        const meta = data[0].metadata as Record<string, unknown>;
        if (meta.digest_type === "weekly_personal" && meta.ai_narrative) {
          setDigest(meta as unknown as DigestData);
          setHasExistingDigest(true);
        }
      }
    } catch (error) {
      console.error("Error loading digest:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateDigest = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("weekly-performance-digest", {
        body: { mode: "personal" },
      });

      if (error) throw error;
      if (data?.digest) {
        setDigest(data.digest);
        setHasExistingDigest(true);
        toast.success("Weekly summary generated");
      }
    } catch (error) {
      console.error("Error generating digest:", error);
      toast.error("Couldn't generate your summary right now");
    } finally {
      setIsGenerating(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return TrendingUp;
    if (trend === "down") return TrendingDown;
    return Minus;
  };

  const getTrendColour = (trend: string, metricType: string) => {
    // For burnout-type metrics, "up" is bad
    if (trend === "up") return "text-emerald-400";
    if (trend === "down") return "text-rose-400";
    return "text-foreground/40";
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl bg-foreground/[0.02] animate-pulse p-6">
        <div className="h-48 rounded-xl" />
      </div>
    );
  }

  // No digest yet — show generate prompt
  if (!digest) {
    return (
      <div className="rounded-3xl bg-foreground/[0.02] p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">Weekly Summary</h3>
            <p className="text-[10px] text-foreground/40">AI-powered review of your week</p>
          </div>
        </div>

        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-foreground/[0.03] flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7 text-foreground/20" />
          </div>
          <p className="text-sm text-foreground/50 mb-1">Ready to see how your week went?</p>
          <p className="text-xs text-foreground/30 mb-5">
            We'll look at your biometrics, goals, and check-ins to give you a clear picture.
          </p>
          <Button
            onClick={generateDigest}
            disabled={isGenerating}
            className="rounded-full px-6 bg-accent text-accent-foreground hover:bg-accent/90"
            size="sm"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Building your summary…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Weekly Summary
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Show the digest
  return (
    <div className="space-y-4">
      {/* AI Narrative Card */}
      <div className="rounded-3xl bg-foreground/[0.02] p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">Weekly Summary</h3>
              <p className="text-[10px] text-foreground/30">
                {digest.period_start} — {digest.period_end}
              </p>
            </div>
          </div>
          <button
            onClick={generateDigest}
            disabled={isGenerating}
            className="p-2 rounded-full hover:bg-foreground/[0.05] text-foreground/30 hover:text-foreground/60 transition-colors"
            title="Refresh summary"
          >
            <RefreshCw className={cn("w-4 h-4", isGenerating && "animate-spin")} />
          </button>
        </div>

        {/* AI narrative */}
        <p className="text-sm text-foreground/70 leading-relaxed mb-6">
          {digest.ai_narrative}
        </p>

        {/* Highlights */}
        {digest.highlights.length > 0 && (
          <div className="space-y-2 mb-6">
            <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30 mb-3">Highlights</p>
            {digest.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-foreground/60">{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {digest.recommendations.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30 mb-3">For Next Week</p>
            {digest.recommendations.map((r, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-foreground/60">{r}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      {digest.metrics_summary.length > 0 && (
        <div className="rounded-3xl bg-foreground/[0.02] p-6">
          <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30 mb-4">Biometrics vs Last Week</p>
          <div className="grid grid-cols-2 gap-3">
            {digest.metrics_summary.slice(0, 6).map((metric) => {
              const Icon = metricIcons[metric.metric_type] || Activity;
              const TrendIcon = getTrendIcon(metric.trend);
              const trendColour = getTrendColour(metric.trend, metric.metric_type);
              const label = metricLabels[metric.metric_type] || metric.metric_type;

              return (
                <div
                  key={metric.metric_type}
                  className="p-4 rounded-2xl bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-foreground/30" />
                    <span className="text-[10px] text-foreground/40 font-medium uppercase tracking-wider">{label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-xl font-light text-foreground">{metric.this_week_avg}</span>
                    <div className={cn("flex items-center gap-1 text-xs", trendColour)}>
                      <TrendIcon className="w-3 h-3" />
                      <span>{metric.change_pct > 0 ? "+" : ""}{metric.change_pct}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Goals Progress */}
      {digest.goals_summary.length > 0 && (
        <div className="rounded-3xl bg-foreground/[0.02] p-6">
          <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30 mb-4">Goal Progress</p>
          <div className="space-y-3">
            {digest.goals_summary.map((goal, i) => (
              <div key={i} className="p-4 rounded-2xl bg-foreground/[0.02]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-foreground/30" />
                    <span className="text-xs font-medium text-foreground">
                      {goal.goal_type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                  <span className="text-xs text-foreground/40">{goal.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-foreground/[0.05]">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      goal.progress >= 80 ? "bg-emerald-400" :
                      goal.progress >= 50 ? "bg-accent" :
                      "bg-amber-400"
                    )}
                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                  />
                </div>
                {goal.current_value !== null && (
                  <p className="text-[10px] text-foreground/30 mt-2">
                    {goal.current_value} / {goal.target_value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Check-in Stats */}
      {digest.check_in_summary.total_check_ins > 0 && (
        <div className="rounded-3xl bg-foreground/[0.02] p-6">
          <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30 mb-4">Check-ins</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-2xl bg-foreground/[0.02]">
              <Calendar className="w-4 h-4 text-foreground/30 mx-auto mb-2" />
              <p className="text-lg font-light text-foreground">{digest.check_in_summary.total_check_ins}</p>
              <p className="text-[9px] text-foreground/30 uppercase">Total</p>
            </div>
            {digest.check_in_summary.avg_mood !== null && (
              <div className="text-center p-3 rounded-2xl bg-foreground/[0.02]">
                <Sparkles className="w-4 h-4 text-foreground/30 mx-auto mb-2" />
                <p className="text-lg font-light text-foreground">{digest.check_in_summary.avg_mood}</p>
                <p className="text-[9px] text-foreground/30 uppercase">Avg Mood</p>
              </div>
            )}
            {digest.check_in_summary.avg_energy !== null && (
              <div className="text-center p-3 rounded-2xl bg-foreground/[0.02]">
                <Activity className="w-4 h-4 text-foreground/30 mx-auto mb-2" />
                <p className="text-lg font-light text-foreground">{digest.check_in_summary.avg_energy}</p>
                <p className="text-[9px] text-foreground/30 uppercase">Avg Energy</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* View Trends Link */}
      <button
        onClick={() => navigate("/nova/trends")}
        className="w-full p-4 rounded-2xl bg-foreground/[0.02] hover:bg-foreground/[0.04] flex items-center justify-between text-xs text-foreground/50 hover:text-foreground/70 transition-colors group"
      >
        <span>View full trends</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
