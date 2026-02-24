import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp, TrendingDown, Minus, CheckCircle2, Clock, BarChart3,
  ArrowUpRight, ArrowDownRight, Loader2, Trash2, FlaskConical
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format } from "date-fns";

interface Intervention {
  id: string;
  title: string;
  description: string | null;
  intervention_type: string;
  changes: any;
  predicted_outcomes: any;
  actual_outcomes: any;
  status: string;
  started_at: string;
  review_at: string | null;
  completed_at: string | null;
  roi_score: number | null;
}

export function PersonalROITracker() {
  const { user } = useAuth();
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) fetchInterventions();
  }, [user]);

  const fetchInterventions = async () => {
    const { data, error } = await supabase
      .from('protocol_interventions' as any)
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error && data) setInterventions(data as any);
    setLoading(false);
  };

  const reviewIntervention = async (intervention: Intervention) => {
    setReviewingId(intervention.id);
    try {
      // Fetch current metrics to compare against predictions
      const startDate = new Date(intervention.started_at).toISOString();
      const { data: metrics } = await supabase
        .from('user_metrics')
        .select('metric_type, value, recorded_at')
        .eq('user_id', user!.id)
        .gte('recorded_at', startDate)
        .order('recorded_at', { ascending: false })
        .limit(100);

      // Build actual outcomes from recent metrics
      const metricMap: Record<string, number[]> = {};
      (metrics || []).forEach((m: any) => {
        if (!metricMap[m.metric_type]) metricMap[m.metric_type] = [];
        metricMap[m.metric_type].push(Number(m.value));
      });

      const actualOutcomes: Record<string, number> = {};
      Object.entries(metricMap).forEach(([key, values]) => {
        actualOutcomes[key] = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
      });

      // Calculate ROI score
      const predicted = intervention.predicted_outcomes?.predictions || [];
      let totalDelta = 0;
      let count = 0;
      predicted.forEach((p: any) => {
        const metricKey = p.metric?.toLowerCase().replace(/\s/g, '_');
        const actual = actualOutcomes[metricKey];
        if (actual !== undefined && p.predicted_30d) {
          const accuracy = 100 - Math.abs(actual - p.predicted_30d);
          totalDelta += Math.max(0, accuracy);
          count++;
        }
      });
      const roiScore = count > 0 ? Math.round(totalDelta / count) : null;

      await supabase
        .from('protocol_interventions' as any)
        .update({
          actual_outcomes: actualOutcomes,
          roi_score: roiScore,
          status: 'reviewed',
          completed_at: new Date().toISOString(),
        } as any)
        .eq('id', intervention.id);

      toast.success("Review complete — results updated");
      fetchInterventions();
    } catch (err: any) {
      toast.error(err.message || "Review failed");
    } finally {
      setReviewingId(null);
    }
  };

  const deleteIntervention = async (id: string) => {
    await supabase.from('protocol_interventions' as any).delete().eq('id', id);
    setInterventions(interventions.filter(i => i.id !== id));
    toast.success("Intervention removed");
  };

  const activeInterventions = interventions.filter(i => i.status === 'active');
  const reviewedInterventions = interventions.filter(i => i.status === 'reviewed');

  const avgROI = reviewedInterventions.length > 0
    ? Math.round(reviewedInterventions.reduce((s, i) => s + (i.roi_score || 0), 0) / reviewedInterventions.length)
    : null;

  if (loading) {
    return (
      <Card className="border-mist/30">
        <CardContent className="p-8 flex justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-ash" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-mist/30">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-accent" />
              <h2 className="text-h3 font-semibold text-carbon">What Actually Worked</h2>
            </div>
            <p className="text-body-sm text-ash">
              Track your protocol changes and see which ones made a real difference
            </p>
          </div>
          {avgROI !== null && (
            <div className="text-right">
              <div className="text-2xl font-bold text-carbon">{avgROI}%</div>
              <div className="text-xs text-ash">avg accuracy</div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {interventions.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-pearl/30 border border-mist/20 text-center">
              <div className="text-xl font-bold text-carbon">{activeInterventions.length}</div>
              <div className="text-xs text-ash">In progress</div>
            </div>
            <div className="p-4 rounded-xl bg-pearl/30 border border-mist/20 text-center">
              <div className="text-xl font-bold text-carbon">{reviewedInterventions.length}</div>
              <div className="text-xs text-ash">Reviewed</div>
            </div>
            <div className="p-4 rounded-xl bg-pearl/30 border border-mist/20 text-center">
              <div className="text-xl font-bold text-carbon">{interventions.length}</div>
              <div className="text-xs text-ash">Total</div>
            </div>
          </div>
        )}

        {interventions.length === 0 ? (
          <div className="text-center py-12">
            <FlaskConical className="w-10 h-10 text-mist mx-auto mb-3" />
            <h3 className="text-sm font-medium text-carbon mb-1">No interventions tracked yet</h3>
            <p className="text-xs text-ash max-w-sm mx-auto">
              Use "Preview Changes" above to simulate a protocol change, then commit it to start tracking results
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {interventions.map((intervention) => {
              const predictions = intervention.predicted_outcomes?.predictions || [];
              const isActive = intervention.status === 'active';
              const isReviewed = intervention.status === 'reviewed';
              const daysSinceStart = Math.floor((Date.now() - new Date(intervention.started_at).getTime()) / (1000 * 60 * 60 * 24));

              return (
                <div
                  key={intervention.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isReviewed
                      ? 'bg-accent/5 border-accent/20'
                      : 'bg-pearl/20 border-mist/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isReviewed ? (
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                      ) : (
                        <Clock className="w-4 h-4 text-orange-500" />
                      )}
                      <span className="text-sm font-medium text-carbon">{intervention.title}</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {intervention.intervention_type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {isActive && daysSinceStart >= 7 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 gap-1"
                          onClick={() => reviewIntervention(intervention)}
                          disabled={reviewingId === intervention.id}
                        >
                          {reviewingId === intervention.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <BarChart3 className="w-3 h-3" />
                          )}
                          Review
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => deleteIntervention(intervention.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-ash" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs text-ash mb-3">
                    Started {format(new Date(intervention.started_at), 'd MMM yyyy')}
                    {isActive && <> · {daysSinceStart} days ago</>}
                    {isReviewed && intervention.completed_at && (
                      <> · Reviewed {format(new Date(intervention.completed_at), 'd MMM yyyy')}</>
                    )}
                  </div>

                  {/* Changes summary */}
                  {intervention.changes?.supplement_adjustments?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {intervention.changes.supplement_adjustments.map((s: any, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {s.name}: {s.current_dose} → {s.proposed_dose}
                        </Badge>
                      ))}
                      {intervention.changes.additions?.map((a: string, i: number) => (
                        <Badge key={`a-${i}`} variant="secondary" className="text-xs bg-accent/10 text-accent">+ {a}</Badge>
                      ))}
                      {intervention.changes.removals?.map((r: string, i: number) => (
                        <Badge key={`r-${i}`} variant="secondary" className="text-xs bg-red-500/10 text-red-500">− {r}</Badge>
                      ))}
                    </div>
                  )}

                  {/* Predicted vs Actual */}
                  {predictions.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {predictions.slice(0, 6).map((p: any, i: number) => {
                        const metricKey = p.metric?.toLowerCase().replace(/\s/g, '_');
                        const actual = intervention.actual_outcomes?.[metricKey];
                        const predicted = p.predicted_30d;
                        const hit = actual !== undefined && predicted !== undefined
                          ? Math.abs(actual - predicted) <= 10
                          : null;

                        return (
                          <div key={i} className="p-2.5 rounded-lg bg-ivory/50 border border-mist/10">
                            <div className="text-xs text-ash mb-1">{p.metric}</div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-semibold text-carbon">{p.current_value}</span>
                              {p.direction === 'up' ? (
                                <ArrowUpRight className="w-3 h-3 text-accent" />
                              ) : p.direction === 'down' ? (
                                <ArrowDownRight className="w-3 h-3 text-red-500" />
                              ) : (
                                <Minus className="w-3 h-3 text-ash" />
                              )}
                              <span className="text-xs text-ash">→ {predicted}</span>
                            </div>
                            {actual !== undefined && (
                              <div className="mt-1 flex items-center gap-1">
                                <span className="text-xs text-ash">Actual:</span>
                                <span className={`text-xs font-medium ${hit ? 'text-accent' : 'text-orange-500'}`}>
                                  {actual}
                                </span>
                                {hit !== null && (
                                  <span className={`text-[10px] ${hit ? 'text-accent' : 'text-orange-500'}`}>
                                    {hit ? '✓' : '~'}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* ROI Score */}
                  {isReviewed && intervention.roi_score !== null && (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1">
                        <Progress value={intervention.roi_score} className="h-1.5" />
                      </div>
                      <span className="text-sm font-medium text-carbon">
                        {intervention.roi_score}% match
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
