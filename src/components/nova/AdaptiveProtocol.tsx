import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, TrendingUp, Target } from "lucide-react";

interface ProtocolOptimisation {
  protocolId: string;
  protocolName: string;
  currentEffectiveness: number;
  suggestedChanges: {
    type: "add" | "remove" | "adjust";
    product: string;
    reason: string;
    expectedImprovement: string;
  }[];
  abTestRunning: boolean;
  dataPoints: number;
}

interface AdaptiveProtocolProps {
  optimisation: ProtocolOptimisation;
  onAcceptChanges: (protocolId: string) => void;
  onViewDetails: (protocolId: string) => void;
}

export function AdaptiveProtocol({ optimisation, onAcceptChanges, onViewDetails }: AdaptiveProtocolProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-body font-semibold text-carbon mb-1">
              {optimisation.protocolName}
            </h3>
            <p className="text-sm text-ash">
              Nova has identified optimisation opportunities
            </p>
          </div>
          {optimisation.abTestRunning && (
            <Badge className="bg-carbon text-ivory">
              <RefreshCw className="w-3 h-3 mr-1" />
              Testing
            </Badge>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-ash">Current Effectiveness</span>
            <span className="font-semibold text-carbon">{optimisation.currentEffectiveness}%</span>
          </div>
          <Progress value={optimisation.currentEffectiveness} className="h-2" />
          <p className="text-xs text-ash mt-1">
            Based on {optimisation.dataPoints.toLocaleString()} data points
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-semibold text-carbon">Suggested Optimisations</h4>
          {optimisation.suggestedChanges.map((change, index) => (
            <div key={index} className="bg-pearl/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  change.type === "add" ? "bg-[#10b981]" : 
                  change.type === "remove" ? "bg-ash" : "bg-carbon"
                }`}>
                  {change.type === "add" ? (
                    <TrendingUp className="w-4 h-4 text-ivory" />
                  ) : change.type === "remove" ? (
                    <TrendingUp className="w-4 h-4 text-ivory rotate-180" />
                  ) : (
                    <Target className="w-4 h-4 text-ivory" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-carbon capitalize">
                      {change.type} {change.product}
                    </span>
                  </div>
                  <p className="text-sm text-ash mb-2">{change.reason}</p>
                  <div className="text-xs text-[#10b981]">
                    Expected improvement: {change.expectedImprovement}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => onAcceptChanges(optimisation.protocolId)} className="flex-1">
            Accept Changes
          </Button>
          <Button variant="outline" onClick={() => onViewDetails(optimisation.protocolId)}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}