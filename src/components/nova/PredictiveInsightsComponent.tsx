import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, AlertCircle, Clock, Sparkles, Loader2 } from "lucide-react";
import { useAutonomousCoaching } from "@/hooks/useAutonomousCoaching";

export function PredictiveInsightsComponent() {
  const { predictions, isLoading, isInitialLoading, generateCoaching } = useAutonomousCoaching();

  if (isInitialLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-52 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (predictions.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">72-Hour Predictive Forecast</h2>
            <p className="text-sm text-muted-foreground">AI-powered predictions based on your biometric patterns</p>
          </div>
        </div>
        <div className="text-center py-12 rounded-2xl bg-foreground/[0.02]">
          <TrendingUp className="w-10 h-10 text-accent mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-2">No predictions yet</p>
          <p className="text-xs text-muted-foreground mb-4">Generate coaching actions to get 72-hour metric predictions</p>
          <Button size="sm" onClick={generateCoaching} disabled={isLoading} className="gap-2">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Generate Predictions
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">72-Hour Predictive Forecast</h2>
          <p className="text-sm text-muted-foreground">AI-powered predictions based on your biometric patterns</p>
        </div>
        <Badge className="bg-accent/10 text-accent border-accent/20">
          <Clock className="w-3 h-3 mr-1" />
          Live Predictions
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {predictions.map((prediction) => {
          const meta = prediction.metadata || {};
          const trend = meta.trend || 'stable';
          const currentVal = meta.current_value;
          const predictedVal = meta.predicted_value;
          const timeframe = meta.timeframe || prediction.timing;

          return (
            <Card key={prediction.id} className="border-foreground/5 hover:border-foreground/10 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{prediction.title}</h3>
                    <p className="text-xs text-muted-foreground">{timeframe}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    trend === 'up' ? 'bg-accent/10' : trend === 'down' ? 'bg-amber-500/10' : 'bg-foreground/[0.03]'
                  }`}>
                    {trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-accent" />
                    ) : trend === 'down' ? (
                      <TrendingDown className="w-5 h-5 text-amber-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {(currentVal !== undefined || predictedVal !== undefined) && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {currentVal !== undefined && (
                      <div className="p-3 bg-foreground/[0.02] rounded-xl">
                        <div className="text-xs text-muted-foreground mb-1">Current</div>
                        <div className="text-xl font-bold text-foreground">{currentVal}</div>
                      </div>
                    )}
                    {predictedVal !== undefined && (
                      <div className="p-3 bg-accent/5 rounded-xl border border-accent/10">
                        <div className="text-xs text-accent mb-1">Predicted</div>
                        <div className="text-xl font-bold text-foreground">{predictedVal}</div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-semibold text-foreground">{prediction.confidence}%</span>
                  </div>
                  <div className="w-full bg-foreground/[0.03] rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${prediction.confidence}%` }} />
                  </div>
                </div>

                <div className="p-3 bg-foreground/[0.02] rounded-xl">
                  <p className="text-sm text-muted-foreground leading-relaxed">{prediction.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
