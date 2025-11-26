import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp } from "lucide-react";

interface Pattern {
  id: string;
  title: string;
  correlation: number;
  description: string;
  dataPoints: number;
  actionable: boolean;
  suggestion?: string;
}

interface PatternRecognitionProps {
  patterns: Pattern[];
}

export function PatternRecognition({ patterns }: PatternRecognitionProps) {
  if (patterns.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Lightbulb className="w-12 h-12 text-ash mx-auto mb-4" />
          <p className="text-sm text-ash mb-2">
            Nova is analyzing your patterns
          </p>
          <p className="text-xs text-stone">
            Connect devices and maintain protocols for 2+ weeks to discover personalized insights
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {patterns.map((pattern) => (
        <Card key={pattern.id}>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#10b981]/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-[#10b981]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-body font-semibold text-carbon">{pattern.title}</h4>
                  <Badge variant="outline" className="border-[#10b981] text-[#10b981] text-xs">
                    {pattern.correlation}% correlation
                  </Badge>
                </div>
                <p className="text-sm text-ash leading-relaxed mb-2">
                  {pattern.description}
                </p>
                <div className="text-xs text-stone">
                  Based on {pattern.dataPoints.toLocaleString()} data points
                </div>
              </div>
            </div>

            {pattern.actionable && pattern.suggestion && (
              <div className="bg-pearl/50 rounded-lg p-4 flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-carbon flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-semibold text-carbon mb-1">Actionable Insight</h5>
                  <p className="text-sm text-ash">{pattern.suggestion}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}