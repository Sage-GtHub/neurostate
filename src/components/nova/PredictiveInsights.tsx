import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingDown, AlertTriangle, TrendingUp, Lightbulb } from "lucide-react";

interface Insight {
  type: "warning" | "prediction" | "opportunity" | "pattern";
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
}

interface PredictiveInsightsProps {
  insights: Insight[];
}

export function PredictiveInsights({ insights }: PredictiveInsightsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "prediction":
        return <TrendingDown className="w-5 h-5" />;
      case "opportunity":
        return <TrendingUp className="w-5 h-5" />;
      case "pattern":
        return <Lightbulb className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "destructive";
      default:
        return "default";
    }
  };

  if (insights.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-sm text-ash">
            Connect a wearable device to receive predictive insights about your performance trends
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <Alert key={index} variant={getVariant(insight.type)}>
          <div className="flex items-start gap-3">
            {getIcon(insight.type)}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-semibold">{insight.title}</h4>
                <span className="text-xs text-ash">
                  {insight.confidence}% confidence
                </span>
              </div>
              <AlertDescription className="text-sm leading-relaxed">
                {insight.description}
              </AlertDescription>
              <div className="text-xs text-ash mt-2">
                Expected timeframe: {insight.timeframe}
              </div>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
}