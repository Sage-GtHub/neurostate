import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, ArrowRight, 
  Sparkles, Loader2, Activity, Pill, Brain, Calendar, Layers, BarChart3 
} from "lucide-react";
import { useAutonomousCoaching } from "@/hooks/useAutonomousCoaching";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const patternTypeConfig = {
  biometric_correlation: { icon: Activity, label: "Biometric", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  supplement_outcome: { icon: Pill, label: "Supplement", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  behaviour_performance: { icon: Brain, label: "Behaviour", color: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  temporal_cycle: { icon: Calendar, label: "Temporal", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  compound_effect: { icon: Layers, label: "Compound", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
};

const directionConfig = {
  positive: { icon: TrendingUp, color: "text-emerald-500", label: "Positive" },
  negative: { icon: TrendingDown, color: "text-rose-500", label: "Negative" },
  cyclical: { icon: Activity, color: "text-amber-500", label: "Cyclical" },
};

interface PatternSummary {
  total_data_points: number;
  strongest_correlation: string;
  key_finding: string;
  data_quality: string;
}

interface DetectedPattern {
  pattern_type: string;
  title: string;
  description: string;
  correlation_strength: number;
  confidence: number;
  lag_days?: number;
  direction: string;
  variables: string[];
  evidence_summary: string;
  actionable_insight: string;
  impact_estimate?: string;
}

export function PatternRecognition() {
  const { patterns, isLoading: isCoachingLoading, isInitialLoading } = useAutonomousCoaching();
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [detectedPatterns, setDetectedPatterns] = useState<DetectedPattern[]>([]);
  const [summary, setSummary] = useState<PatternSummary | null>(null);
  const [hasAnalysed, setHasAnalysed] = useState(false);

  const runPatternAnalysis = async () => {
    setIsAnalysing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { toast.error("Please sign in first"); return; }

      const res = await supabase.functions.invoke('pattern-recognition', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (res.error) throw new Error(res.error.message);
      const body = res.data;
      if (body.error) { toast.error(body.error); return; }

      setDetectedPatterns(body.patterns || []);
      setSummary(body.summary || null);
      setHasAnalysed(true);
      toast.success(`Detected ${body.patterns?.length || 0} patterns`);
    } catch (err: any) {
      toast.error(err.message || "Pattern analysis failed");
    } finally {
      setIsAnalysing(false);
    }
  };

  if (isInitialLoading) {
    return <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}</div>;
  }

  // Use real-time detected patterns if available, else fall back to stored patterns from coaching
  const displayPatterns = hasAnalysed ? detectedPatterns : [];
  const storedPatterns = patterns; // from useAutonomousCoaching (nudge_type='pattern')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Spot Patterns</h2>
          <p className="text-sm text-muted-foreground">See what's actually moving the needle in your health data</p>
        </div>
        <Button size="sm" onClick={runPatternAnalysis} disabled={isAnalysing} className="gap-2">
          {isAnalysing ? <Loader2 className="h-4 w-4 animate-spin" /> : <BarChart3 className="h-4 w-4" />}
          {isAnalysing ? "Analysing…" : "Run Analysis"}
        </Button>
      </div>

      {/* Summary Card */}
      {summary && (
        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">Analysis Summary</span>
              <Badge variant="outline" className="ml-auto text-xs">
                {summary.data_quality} data quality
              </Badge>
            </div>
            <p className="text-sm text-foreground mb-2">{summary.key_finding}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{summary.total_data_points} data points analysed</span>
              <span>•</span>
              <span>Strongest: {summary.strongest_correlation}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detected Patterns */}
      {displayPatterns.length > 0 ? (
        <div className="space-y-4">
          {displayPatterns.map((pattern, idx) => {
            const typeConf = patternTypeConfig[pattern.pattern_type as keyof typeof patternTypeConfig] || patternTypeConfig.biometric_correlation;
            const dirConf = directionConfig[pattern.direction as keyof typeof directionConfig] || directionConfig.positive;
            const TypeIcon = typeConf.icon;
            const DirIcon = dirConf.icon;
            const strengthPercent = Math.round(pattern.correlation_strength * 100);

            return (
              <Card key={idx} className={`${typeConf.border} hover:border-foreground/10 transition-all`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${typeConf.bg}`}>
                      <TypeIcon className={`w-5 h-5 ${typeConf.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Title row */}
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-semibold text-foreground text-sm">{pattern.title}</h3>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <DirIcon className={`w-3.5 h-3.5 ${dirConf.color}`} />
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {typeConf.label}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{pattern.description}</p>

                      {/* Variables */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pattern.variables.map((v, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-foreground/[0.04] text-muted-foreground border border-foreground/5">
                            {v}
                          </span>
                        ))}
                        {pattern.lag_days && pattern.lag_days > 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />{pattern.lag_days}d lag
                          </span>
                        )}
                      </div>

                      {/* Correlation strength bar */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] text-muted-foreground w-20">Correlation</span>
                        <div className="flex-1 bg-foreground/[0.03] rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              strengthPercent >= 70 ? 'bg-emerald-500' : strengthPercent >= 40 ? 'bg-amber-500' : 'bg-foreground/20'
                            }`}
                            style={{ width: `${strengthPercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-foreground w-10 text-right">{strengthPercent}%</span>
                      </div>

                      {/* Evidence & impact */}
                      <div className="bg-foreground/[0.02] rounded-lg p-3 mb-3">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          <span className="font-medium text-foreground">Evidence: </span>
                          {pattern.evidence_summary}
                        </p>
                      </div>

                      {/* Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {pattern.impact_estimate && (
                            <Badge variant="accent" className="text-[10px]">
                              {pattern.impact_estimate} improvement
                            </Badge>
                          )}
                          <span className="text-[10px] text-muted-foreground">Confidence: {pattern.confidence}%</span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1 text-xs h-7 px-2">
                          <CheckCircle className="w-3 h-3" />
                          <span className="hidden sm:inline">{pattern.actionable_insight?.substring(0, 40)}…</span>
                          <span className="sm:hidden">Action</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : storedPatterns.length > 0 ? (
        /* Fallback: show stored patterns from coaching */
        <div className="space-y-4">
          {storedPatterns.map((pattern) => {
            const pType = (pattern.metadata?.pattern_type as string) || 'neutral';
            const config = pType === 'positive' 
              ? { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" }
              : pType === 'negative'
              ? { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-500/10" }
              : { icon: TrendingUp, color: "text-foreground/60", bg: "bg-foreground/[0.03]" };
            const Icon = config.icon;

            return (
              <Card key={pattern.id} className="border-foreground/5">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm mb-1">{pattern.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{pattern.description}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-foreground/[0.03] rounded-full h-2 overflow-hidden">
                          <div className="h-full rounded-full bg-accent" style={{ width: `${pattern.confidence}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-foreground">{pattern.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div className="text-center py-12 rounded-2xl bg-foreground/[0.02]">
          <BarChart3 className="w-10 h-10 text-accent mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-2">No patterns found yet</p>
          <p className="text-xs text-muted-foreground mb-4">Run an analysis to find what's working and what isn't</p>
          <Button size="sm" onClick={runPatternAnalysis} disabled={isAnalysing} className="gap-2">
            {isAnalysing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Run Analysis
          </Button>
        </div>
      )}
    </div>
  );
}
