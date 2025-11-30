import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Lock, TrendingUp, Activity, Brain, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PhaseProgressTrackerProps {
  currentPhase: 1 | 2 | 3 | 4;
  daysInPhase: number;
}

export function PhaseProgressTracker({ currentPhase, daysInPhase }: PhaseProgressTrackerProps) {
  const [metricsCollected, setMetricsCollected] = useState(0);
  const [protocolsActive, setProtocolsActive] = useState(0);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: metrics } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id);

      const { data: protocols } = await supabase
        .from('user_protocols')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');

      setMetricsCollected(metrics?.length || 0);
      setProtocolsActive(protocols?.length || 0);
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  };

  const phases = [
    {
      phase: 1,
      title: "Discover",
      duration: "Days 1-7",
      icon: Activity,
      description: "Establishing baseline through multi-dimensional analysis",
      requiredMetrics: 500,
      unlockCriteria: "Complete 7 days of continuous tracking",
      color: "from-blue-500 to-blue-600"
    },
    {
      phase: 2,
      title: "Optimise",
      duration: "Days 8-30",
      icon: TrendingUp,
      description: "Active experimentation and rapid optimization",
      requiredMetrics: 2000,
      unlockCriteria: "Complete Phase 1 + 30 days of data",
      color: "from-green-500 to-green-600"
    },
    {
      phase: 3,
      title: "Predict",
      duration: "Days 31-90",
      icon: Brain,
      description: "Advanced pattern recognition enabling 72-hour forecasting",
      requiredMetrics: 10000,
      unlockCriteria: "Complete Phase 2 + sufficient pattern data",
      color: "from-purple-500 to-purple-600"
    },
    {
      phase: 4,
      title: "Autonomy",
      duration: "Day 91+",
      icon: Zap,
      description: "Fully autonomous health optimization",
      requiredMetrics: 25000,
      unlockCriteria: "Complete 90 days + high prediction accuracy",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const getPhaseProgress = (phase: number) => {
    if (phase < currentPhase) return 100;
    if (phase === currentPhase) {
      const phaseData = phases[phase - 1];
      return Math.min((metricsCollected / phaseData.requiredMetrics) * 100, 100);
    }
    return 0;
  };

  const getPhaseStatus = (phase: number) => {
    if (phase < currentPhase) return "completed";
    if (phase === currentPhase) return "active";
    return "locked";
  };

  return (
    <Card className="hover-lift">
      <CardContent className="p-8">
          <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h3 font-semibold text-foreground">Your Nova Journey</h2>
            <Badge variant="accent" className="px-4 py-2">
              Phase {currentPhase} • Day {daysInPhase}
            </Badge>
          </div>
          <p className="text-body-sm text-muted-foreground leading-relaxed">
            Track your progress through Nova's 4-phase system as you unlock advanced AI capabilities
          </p>
        </div>

        <div className="space-y-6">
          {phases.map((phase) => {
            const status = getPhaseStatus(phase.phase);
            const progress = getPhaseProgress(phase.phase);
            const Icon = phase.icon;

            return (
              <div
                key={phase.phase}
                className={`relative p-6 rounded-2xl border transition-all hover-lift ${
                  status === "active"
                    ? "border-primary bg-primary/5"
                    : status === "completed"
                    ? "border-border/50 bg-muted/30"
                    : "border-border/30 bg-background opacity-60"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      status === "completed"
                        ? "bg-accent text-ivory"
                        : status === "active"
                        ? `bg-gradient-to-br ${phase.color} text-ivory`
                        : "bg-mist/30 text-stone"
                    }`}
                  >
                    {status === "completed" ? (
                      <Check className="w-7 h-7" />
                    ) : status === "locked" ? (
                      <Lock className="w-7 h-7" />
                    ) : (
                      <Icon className="w-7 h-7" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-body font-semibold text-carbon">
                        Phase {phase.phase}: {phase.title}
                      </h3>
                      <span className="text-caption text-ash">{phase.duration}</span>
                    </div>
                    <p className="text-sm text-ash mb-4">{phase.description}</p>

                    {status === "active" && (
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-ash">Progress</span>
                            <span className="font-semibold text-carbon">
                              {Math.round(progress)}%
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-mist/30">
                          <div>
                            <div className="text-caption text-ash uppercase tracking-wider mb-1">
                              Metrics Collected
                            </div>
                            <div className="text-[1.5rem] font-bold text-carbon">
                              {metricsCollected.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-caption text-ash uppercase tracking-wider mb-1">
                              Active Protocols
                            </div>
                            <div className="text-[1.5rem] font-bold text-carbon">
                              {protocolsActive}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {status === "locked" && (
                      <div className="pt-3 border-t border-mist/30">
                        <div className="text-caption text-ash uppercase tracking-wider mb-2">
                          Unlock Requirements
                        </div>
                        <p className="text-sm text-carbon font-medium">{phase.unlockCriteria}</p>
                      </div>
                    )}

                    {status === "completed" && (
                      <div className="flex items-center gap-2 pt-3 border-t border-mist/30">
                        <Check className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-accent">Phase Complete</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-pearl/50 to-ivory border border-mist/30">
          <h3 className="text-body font-semibold text-carbon mb-3">Next Milestone</h3>
          <p className="text-sm text-ash leading-relaxed">
            {currentPhase < 4
              ? `Continue tracking daily to unlock Phase ${currentPhase + 1}. ${
                  phases[currentPhase].requiredMetrics - metricsCollected
                } more data points needed.`
              : "You've reached full autonomy! Nova is now optimizing your protocols automatically."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
