import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowRight, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProtocolAdjustment {
  product: string;
  currentDose: string;
  suggestedDose: string;
  reason: string;
  impact: "positive" | "negative";
  confidence: number;
}

interface AdaptiveProtocolProps {
  adjustments?: ProtocolAdjustment[];
}

export function AdaptiveProtocol({ adjustments = [] }: AdaptiveProtocolProps) {
  const defaultAdjustments: ProtocolAdjustment[] = [
    {
      product: "Magnesium Complex",
      currentDose: "400mg",
      suggestedDose: "600mg",
      reason: "HRV declining 8% over 3 days. Increased dose supports nervous system recovery.",
      impact: "positive",
      confidence: 87
    },
    {
      product: "L-Theanine",
      currentDose: "0mg",
      suggestedDose: "200mg",
      reason: "Elevated cortisol patterns detected. L-Theanine reduces stress without sedation.",
      impact: "positive",
      confidence: 92
    },
    {
      product: "NeuroFocus Cognitive",
      currentDose: "2 capsules",
      suggestedDose: "1 capsule",
      reason: "Sleep quality declining. Reducing stimulants to improve overnight recovery.",
      impact: "negative",
      confidence: 78
    }
  ];

  const displayAdjustments = adjustments.length > 0 ? adjustments : defaultAdjustments;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[1.5rem] font-semibold text-carbon tracking-tight mb-2">Adaptive Protocol</h2>
          <p className="text-sm text-ash leading-relaxed">
            Nova continuously analyses your data to optimise your protocol in real-time
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#10b981]/10 to-[#10b981]/5 border border-[#10b981]/20">
          <Sparkles className="w-4 h-4 text-[#10b981]" />
          <span className="text-sm font-medium text-[#10b981]">{displayAdjustments.length} Optimisations</span>
        </div>
      </div>

      <div className="space-y-4">
        {displayAdjustments.map((adjustment, index) => (
          <Card 
            key={index} 
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
                        ? "bg-[#10b981]/10 text-[#10b981]" 
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
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#10b981]/5 to-[#10b981]/10 border border-[#10b981]/20">
                  <div className="text-caption text-[#10b981] uppercase tracking-wider mb-2 font-medium">Suggested Dose</div>
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
                >
                  <span>Apply Changes</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline">Dismiss</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
