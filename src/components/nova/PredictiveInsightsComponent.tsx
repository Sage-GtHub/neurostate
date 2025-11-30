import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertCircle, Clock } from "lucide-react";

interface Prediction {
  metric: string;
  current: number;
  predicted: number;
  timeframe: string;
  confidence: number;
  trend: "up" | "down" | "stable";
  recommendation: string;
}

const predictions: Prediction[] = [
  {
    metric: "HRV Score",
    current: 68,
    predicted: 72,
    timeframe: "Next 48h",
    confidence: 91,
    trend: "up",
    recommendation: "Continue current protocol, increase magnesium by 100mg"
  },
  {
    metric: "Sleep Quality",
    current: 82,
    predicted: 79,
    timeframe: "Tonight",
    confidence: 87,
    trend: "down",
    recommendation: "Reduce screen time after 9pm, take melatonin 1mg"
  },
  {
    metric: "Training Readiness",
    current: 75,
    predicted: 85,
    timeframe: "Tomorrow 2-4pm",
    confidence: 89,
    trend: "up",
    recommendation: "Optimal training window detected, schedule high-intensity session"
  },
  {
    metric: "Stress Index",
    current: 32,
    predicted: 28,
    timeframe: "Next 72h",
    confidence: 84,
    trend: "down",
    recommendation: "Stress levels improving, maintain current adaptogen protocol"
  }
];

export function PredictiveInsightsComponent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[1.5rem] font-semibold text-carbon tracking-tight mb-2">
            72-Hour Predictive Forecast
          </h2>
          <p className="text-sm text-ash">
            AI-powered predictions based on your biometric patterns
          </p>
        </div>
        <Badge className="bg-accent text-white">
          <Clock className="w-3 h-3 mr-1" />
          Live Predictions
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {predictions.map((prediction, index) => (
          <Card 
            key={index}
            className="border-mist/30 hover:shadow-lg transition-all group"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-body font-semibold text-carbon mb-1">
                    {prediction.metric}
                  </h3>
                  <p className="text-caption text-ash">{prediction.timeframe}</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  prediction.trend === "up" 
                    ? "bg-accent/10" 
                    : prediction.trend === "down"
                    ? "bg-ash/10"
                    : "bg-pearl/50"
                }`}>
                  {prediction.trend === "up" ? (
                    <TrendingUp className="w-5 h-5 text-accent" />
                  ) : prediction.trend === "down" ? (
                    <TrendingDown className="w-5 h-5 text-ash" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-carbon" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-pearl/30 rounded-xl">
                  <div className="text-caption text-ash mb-1">Current</div>
                  <div className="text-[1.5rem] font-bold text-carbon">{prediction.current}</div>
                </div>
                <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                  <div className="text-caption text-accent mb-1">Predicted</div>
                  <div className="text-[1.5rem] font-bold text-carbon">{prediction.predicted}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-ash">Confidence</span>
                  <span className="font-semibold text-carbon">{prediction.confidence}%</span>
                </div>
                <div className="w-full bg-pearl/30 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-gradient-to-br from-pearl/50 to-mist/30 rounded-xl">
                <p className="text-sm text-ash leading-relaxed">
                  {prediction.recommendation}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
