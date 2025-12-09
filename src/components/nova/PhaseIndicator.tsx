import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Target, Sparkles } from "lucide-react";

interface PhaseIndicatorProps {
  currentPhase: 1 | 2 | 3 | 4;
  daysInCurrentPhase?: number;
}

export function PhaseIndicator({ currentPhase, daysInCurrentPhase }: PhaseIndicatorProps) {
  const phases = [
    {
      number: 1,
      title: "Conversational AI",
      description: "Intelligent assistant providing personalised guidance",
      icon: Brain,
      color: "text-carbon"
    },
    {
      number: 2,
      title: "Predictive Intelligence",
      description: "Forecasting performance trends and proactive adjustments",
      icon: TrendingUp,
      color: "text-carbon"
    },
    {
      number: 3,
      title: "Prescriptive Optimisation",
      description: "Autonomous protocol optimisation and A/B testing",
      icon: Target,
      color: "text-carbon"
    },
    {
      number: 4,
      title: "Autonomous Coach",
      description: "24/7 performance scientist managing your entire ecosystem",
      icon: Sparkles,
      color: "text-carbon"
    }
  ];

  return (
    <Card className="bg-pearl/50 border-mist">
      <CardContent className="p-4 sm:p-6">
        
        <div className="space-y-3">
          {phases.map((phase) => {
            const Icon = phase.icon;
            const isActive = phase.number === currentPhase;
            const isComplete = phase.number < currentPhase;
            
            return (
              <div
                key={phase.number}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                  isActive ? "bg-ivory" : ""
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isComplete ? "bg-[#10b981]" : isActive ? "bg-carbon" : "bg-mist"
                }`}>
                  <Icon className={`w-4 h-4 ${
                    isComplete || isActive ? "text-ivory" : "text-ash"
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-semibold ${
                      isActive ? "text-carbon" : "text-ash"
                    }`}>
                      Phase {phase.number}: {phase.title}
                    </span>
                    {isActive && (
                      <Badge className="bg-carbon text-ivory text-xs">Active</Badge>
                    )}
                    {isComplete && (
                      <Badge variant="outline" className="border-[#10b981] text-[#10b981] text-xs">Complete</Badge>
                    )}
                  </div>
                  {isActive && daysInCurrentPhase && (
                    <div className="text-xs text-accent font-medium mt-1">
                      Day {daysInCurrentPhase} of this phase
                    </div>
                  )}
                  <p className={`text-xs leading-relaxed ${
                    isActive ? "text-ash" : "text-stone"
                  }`}>
                    {phase.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}