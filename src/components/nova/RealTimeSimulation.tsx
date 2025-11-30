import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Brain, TrendingUp, AlertCircle, Play, Pause } from "lucide-react";

interface Metric {
  label: string;
  value: number;
  unit: string;
  status: "optimal" | "moderate" | "low";
  icon: any;
}

export function RealTimeSimulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: "Heart Rate", value: 68, unit: "bpm", status: "optimal", icon: Activity },
    { label: "Sleep Quality", value: 82, unit: "/100", status: "optimal", icon: Brain },
    { label: "Recovery Score", value: 75, unit: "%", status: "moderate", icon: TrendingUp },
    { label: "Stress Index", value: 32, unit: "/100", status: "optimal", icon: AlertCircle }
  ]);
  const [aiConfidence, setAiConfidence] = useState(97);
  const [prediction, setPrediction] = useState("80/100");
  const [recommendation, setRecommendation] = useState("Magnesium +100mg");
  const [processing, setProcessing] = useState("Analyzing 15 biometric streams");

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const variance = Math.random() * 4 - 2;
        let newValue = metric.value + variance;
        
        if (metric.label === "Heart Rate") {
          newValue = Math.max(60, Math.min(75, newValue));
        } else if (metric.label === "Sleep Quality" || metric.label === "Stress Index") {
          newValue = Math.max(20, Math.min(95, newValue));
        } else if (metric.label === "Recovery Score") {
          newValue = Math.max(65, Math.min(90, newValue));
        }

        const status = 
          (metric.label === "Stress Index" && newValue < 40) || 
          (metric.label !== "Stress Index" && newValue >= 75) 
            ? "optimal" 
            : newValue >= 50 
            ? "moderate" 
            : "low";

        return { ...metric, value: Math.round(newValue), status };
      }));

      setAiConfidence(Math.max(90, Math.min(99, aiConfidence + (Math.random() * 2 - 1))));
      
      const sleepValue = metrics.find(m => m.label === "Sleep Quality")?.value || 82;
      setPrediction(`${Math.max(75, Math.min(85, Math.round(sleepValue + (Math.random() * 4 - 2))))}/100`);

      const recommendations = [
        "Magnesium +100mg",
        "L-Theanine 200mg",
        "Reduce caffeine intake",
        "Earlier bedtime recommended",
        "Increase hydration",
        "Light movement session"
      ];
      setRecommendation(recommendations[Math.floor(Math.random() * recommendations.length)]);

      const processingStates = [
        "Analyzing 15 biometric streams",
        "Processing sleep architecture",
        "Evaluating recovery patterns",
        "Computing HRV correlations",
        "Updating protocol recommendations"
      ];
      setProcessing(processingStates[Math.floor(Math.random() * processingStates.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning, metrics, aiConfidence]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "text-primary";
      case "moderate": return "text-warning";
      case "low": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "optimal": return "bg-primary/10";
      case "moderate": return "bg-warning/10";
      case "low": return "bg-destructive/10";
      default: return "bg-muted/20";
    }
  };

  return (
    <Card className="hover-lift">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-h3 font-semibold text-foreground mb-2">
              Real-Time AI Processing
            </h2>
            <p className="text-body-sm text-muted-foreground">Watch Nova analyse and adapt in real-time</p>
          </div>
          <Button
            onClick={() => setIsRunning(!isRunning)}
            variant={isRunning ? "outline" : "default"}
            size="sm"
            className="gap-2"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? "Pause" : "Start"} Simulation</span>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all ${getStatusBg(metric.status)}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${getStatusBg(metric.status)} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${getStatusColor(metric.status)}`} />
                    </div>
                    <span className="text-sm font-medium text-carbon">{metric.label}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBg(metric.status)} ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-[2.5rem] font-bold text-carbon tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-sm text-ash">{metric.unit}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-pearl/50 to-ivory border border-mist/30">
            <div className="text-caption text-ash uppercase tracking-wider mb-2">AI Confidence</div>
            <div className="text-[2rem] font-bold text-carbon mb-1">{Math.round(aiConfidence)}%</div>
            <div className="text-sm text-ash">Processing accuracy</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-pearl/50 to-ivory border border-mist/30">
            <div className="text-caption text-ash uppercase tracking-wider mb-2">Prediction (Tonight)</div>
            <div className="text-[2rem] font-bold text-carbon mb-1">{prediction}</div>
            <div className="text-sm text-ash">Sleep quality forecast</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-pearl/50 to-ivory border border-mist/30">
            <div className="text-caption text-ash uppercase tracking-wider mb-2">Training Readiness</div>
            <div className="text-[2rem] font-bold text-carbon mb-1">Moderate</div>
            <div className="text-sm text-ash">Current state</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
          <h3 className="text-body font-semibold text-carbon mb-4">Nova's Current Analysis</h3>
          
          <div className="space-y-4">
            <div>
              <div className="text-caption text-ash uppercase tracking-wider mb-2">Real-Time Processing</div>
              <p className="text-sm text-carbon font-medium">{processing} with &lt;50ms latency</p>
            </div>

            <div>
              <div className="text-caption text-ash uppercase tracking-wider mb-2">72-Hour Forecast</div>
              <p className="text-sm text-carbon font-medium">
                Optimal training window tomorrow afternoon based on recovery trends
              </p>
            </div>

            <div>
              <div className="text-caption text-ash uppercase tracking-wider mb-2">Auto-Adjustment Made</div>
              <p className="text-sm text-carbon font-medium">
                {recommendation} based on current biometric patterns
              </p>
            </div>
          </div>
        </div>

        {isRunning && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ash animate-pulse">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Live processing active • Updates every 2 seconds</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
