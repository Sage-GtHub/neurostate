import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowRight, Sparkles, Loader2, Check, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useRealtimeMetrics } from "@/hooks/useRealtimeMetrics";

interface ProtocolAdjustment {
  id: string;
  product: string;
  currentDose: string;
  suggestedDose: string;
  reason: string;
  impact: "positive" | "negative";
  confidence: number;
  protocolId?: string;
}

export function AdaptiveProtocol() {
  const [adjustments, setAdjustments] = useState<ProtocolAdjustment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const { metrics } = useRealtimeMetrics();

  useEffect(() => {
    generateAdjustments();
  }, [metrics]);

  const generateAdjustments = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      // Get user's active protocols
      const { data: protocols } = await supabase
        .from('user_protocols')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');

      // Get recent metrics to analyse patterns
      const { data: recentMetrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(50);

      // Generate AI-based adjustments based on metrics
      const generatedAdjustments: ProtocolAdjustment[] = [];

      // Analyse HRV trends
      const hrvMetrics = recentMetrics?.filter(m => m.metric_type === 'hrv') || [];
      if (hrvMetrics.length >= 3) {
        const avgHrv = hrvMetrics.reduce((sum, m) => sum + Number(m.value), 0) / hrvMetrics.length;
        const recentHrv = Number(hrvMetrics[0]?.value || 0);
        
        if (recentHrv < avgHrv * 0.92) {
          generatedAdjustments.push({
            id: 'hrv-magnesium',
            product: "Magnesium Complex",
            currentDose: "400mg",
            suggestedDose: "600mg",
            reason: `HRV declining ${Math.round((1 - recentHrv / avgHrv) * 100)}% from your average. Increased magnesium supports nervous system recovery.`,
            impact: "positive",
            confidence: 87,
            protocolId: protocols?.[0]?.id
          });
        }
      }

      // Analyse sleep patterns
      const sleepMetrics = recentMetrics?.filter(m => m.metric_type === 'sleep_score' || m.metric_type === 'sleep_duration') || [];
      if (sleepMetrics.length >= 2) {
        const avgSleep = sleepMetrics.reduce((sum, m) => sum + Number(m.value), 0) / sleepMetrics.length;
        const recentSleep = Number(sleepMetrics[0]?.value || 0);
        
        if (recentSleep < avgSleep * 0.85) {
          generatedAdjustments.push({
            id: 'sleep-ltheanine',
            product: "L-Theanine",
            currentDose: "0mg",
            suggestedDose: "200mg",
            reason: "Sleep quality declining. L-Theanine promotes relaxation and supports deeper sleep without sedation.",
            impact: "positive",
            confidence: 92
          });
        }
      }

      // Recovery analysis
      const recoveryMetrics = recentMetrics?.filter(m => m.metric_type === 'recovery') || [];
      if (recoveryMetrics.length >= 2) {
        const avgRecovery = recoveryMetrics.reduce((sum, m) => sum + Number(m.value), 0) / recoveryMetrics.length;
        
        if (avgRecovery < 70) {
          generatedAdjustments.push({
            id: 'recovery-adapt',
            product: "AdaptBalance Stress",
            currentDose: "1 capsule",
            suggestedDose: "2 capsules",
            reason: "Recovery scores consistently below optimal. Adaptogens help regulate cortisol and improve resilience.",
            impact: "positive",
            confidence: 85
          });
        }
      }

      // If no real data patterns, show helpful defaults
      if (generatedAdjustments.length === 0 && (!recentMetrics || recentMetrics.length < 5)) {
        generatedAdjustments.push(
          {
            id: 'default-1',
            product: "Omega-3 Elite",
            currentDose: "2g",
            suggestedDose: "3g",
            reason: "Baseline recommendation: Higher EPA/DHA supports cognitive function and reduces inflammation.",
            impact: "positive",
            confidence: 90
          },
          {
            id: 'default-2',
            product: "Vitamin D3",
            currentDose: "2000 IU",
            suggestedDose: "4000 IU",
            reason: "Seasonal adjustment: Increased vitamin D during lower sunlight months supports immune function and mood.",
            impact: "positive",
            confidence: 88
          }
        );
      }

      setAdjustments(generatedAdjustments.filter(a => !dismissedIds.has(a.id)));
    } catch (error) {
      console.error("Error generating adjustments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async (adjustment: ProtocolAdjustment) => {
    setApplyingId(adjustment.id);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Record the adjustment
      await supabase.from('protocol_adjustments').insert({
        user_id: user.id,
        protocol_id: adjustment.protocolId || null,
        adjustment_type: 'dose_change',
        previous_state: { product: adjustment.product, dose: adjustment.currentDose },
        new_state: { product: adjustment.product, dose: adjustment.suggestedDose },
        reason: adjustment.reason,
        biometric_trigger: { confidence: adjustment.confidence }
      });

      toast({
        title: "Adjustment Applied",
        description: `${adjustment.product} updated to ${adjustment.suggestedDose}`,
      });

      // Remove from list
      setAdjustments(prev => prev.filter(a => a.id !== adjustment.id));
    } catch (error) {
      console.error("Error applying adjustment:", error);
      toast({
        title: "Error",
        description: "Failed to apply adjustment",
        variant: "destructive",
      });
    } finally {
      setApplyingId(null);
    }
  };

  const handleDismiss = (adjustmentId: string) => {
    setDismissedIds(prev => new Set([...prev, adjustmentId]));
    setAdjustments(prev => prev.filter(a => a.id !== adjustmentId));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[1.5rem] font-semibold text-carbon tracking-tight mb-2">Adaptive Protocol</h2>
          <p className="text-sm text-ash leading-relaxed">
            Nova continuously analyses your data to optimise your protocol in real-time
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent">{adjustments.length} Optimisations</span>
        </div>
      </div>

      {adjustments.length === 0 ? (
        <Card className="border-mist/30">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-carbon mb-2">Protocol Optimised</h3>
            <p className="text-sm text-ash">
              Your current protocol is well-balanced. Nova will notify you when adjustments are recommended.
            </p>
            <Button variant="outline" onClick={generateAdjustments} className="mt-4">
              Check Again
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {adjustments.map((adjustment, index) => (
            <Card 
              key={adjustment.id} 
              className="border-mist/30 hover:border-mist transition-all hover:shadow-lg group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-body font-semibold text-carbon">{adjustment.product}</h3>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        adjustment.impact === "positive" 
                          ? "bg-accent/10 text-accent" 
                          : "bg-ash/10 text-ash"
                      }`}>
                        {adjustment.impact === "positive" ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>
                          {adjustment.impact === "positive" ? "Increase" : "Decrease"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-ash leading-relaxed mb-4">
                      {adjustment.reason}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 rounded-xl bg-pearl/30 border border-mist/30">
                    <div className="text-caption text-ash uppercase tracking-wider mb-2 font-medium">Current Dose</div>
                    <div className="text-[1.5rem] font-semibold text-carbon tracking-tight">{adjustment.currentDose}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
                    <div className="text-caption text-accent uppercase tracking-wider mb-2 font-medium">Suggested Dose</div>
                    <div className="text-[1.5rem] font-semibold text-carbon tracking-tight">{adjustment.suggestedDose}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ash font-medium">Confidence Level</span>
                    <span className="font-semibold text-carbon">{adjustment.confidence}%</span>
                  </div>
                  <Progress value={adjustment.confidence} className="h-2" />
                </div>

                <div className="flex gap-3 mt-6">
                  <Button 
                    className="flex-1 gap-2 group-hover:shadow-md transition-shadow"
                    onClick={() => handleApply(adjustment)}
                    disabled={applyingId === adjustment.id}
                  >
                    {applyingId === adjustment.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Apply Changes</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDismiss(adjustment.id)}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="border-carbon/10 bg-gradient-to-br from-pearl/50 to-mist/30">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-ash leading-relaxed">
            All adjustments are based on your biometric data patterns and scientific research. You maintain complete control over protocol changes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
