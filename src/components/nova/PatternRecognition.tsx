import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertCircle, CheckCircle, Clock, ArrowRight } from "lucide-react";

interface Pattern {
  id: string;
  type: "positive" | "negative" | "neutral";
  title: string;
  description: string;
  frequency: string;
  confidence: number;
  action?: string;
}

interface PatternRecognitionProps {
  patterns?: Pattern[];
}

export function PatternRecognition({ patterns = [] }: PatternRecognitionProps) {
  const defaultPatterns: Pattern[] = [
    {
      id: "1",
      type: "positive",
      title: "Optimal Sleep Window Identified",
      description: "Your best sleep consistently occurs when you take magnesium before 8pm and avoid screens after 9pm. This pattern has held for 12 of the last 14 days.",
      frequency: "Consistent",
      confidence: 92,
      action: "Set evening protocol reminder"
    },
    {
      id: "2",
      type: "negative",
      title: "Caffeine Sensitivity Pattern",
      description: "Consuming caffeine after 2pm correlates with 28% reduction in deep sleep. Pattern observed on 8 of last 10 occurrences.",
      frequency: "High correlation",
      confidence: 87,
      action: "Adjust caffeine cutoff time"
    },
    {
      id: "3",
      type: "positive",
      title: "Recovery Enhancement Detected",
      description: "HRV increases by 15% on mornings following cold exposure. Pattern consistent across 6 sessions.",
      frequency: "Emerging pattern",
      confidence: 78,
      action: "Add to recovery protocol"
    },
    {
      id: "4",
      type: "neutral",
      title: "Exercise Timing Variability",
      description: "No significant performance difference detected between morning and evening training sessions. Sample size: 18 sessions.",
      frequency: "Neutral correlation",
      confidence: 71,
      action: "Continue monitoring"
    }
  ];

  const displayPatterns = patterns.length > 0 ? patterns : defaultPatterns;

  const getPatternIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <CheckCircle className="w-5 h-5 text-[#10b981]" />;
      case "negative":
        return <AlertCircle className="w-5 h-5 text-ash" />;
      default:
        return <TrendingUp className="w-5 h-5 text-carbon" />;
    }
  };

  const getPatternBorder = (type: string) => {
    switch (type) {
      case "positive":
        return "border-[#10b981]/20";
      case "negative":
        return "border-ash/20";
      default:
        return "border-mist/30";
    }
  };

  const getPatternBg = (type: string) => {
    switch (type) {
      case "positive":
        return "bg-[#10b981]/5";
      case "negative":
        return "bg-ash/5";
      default:
        return "bg-pearl/30";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[1.5rem] font-semibold text-carbon tracking-tight mb-2">Pattern Recognition</h2>
        <p className="text-sm text-ash leading-relaxed">
          Nova identifies correlations between your behaviours and performance outcomes
        </p>
      </div>

      <div className="space-y-4">
        {displayPatterns.map((pattern, index) => (
          <Card 
            key={pattern.id}
            className={`border-mist/30 hover:border-mist transition-all hover:shadow-lg group animate-fade-in ${getPatternBorder(pattern.type)}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${getPatternBg(pattern.type)}`}>
                  {getPatternIcon(pattern.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-body font-semibold text-carbon">{pattern.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-ash">
                      <Clock className="w-3 h-3" />
                      <span>{pattern.frequency}</span>
                    </div>
                  </div>
                  <p className="text-sm text-ash leading-relaxed mb-4">
                    {pattern.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 bg-pearl/30 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          pattern.type === "positive" ? "bg-[#10b981]" : "bg-carbon"
                        }`}
                        style={{ width: `${pattern.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-carbon min-w-[3rem] text-right">
                      {pattern.confidence}%
                    </span>
                  </div>

                  {pattern.action && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 group-hover:bg-pearl/50 transition-colors"
                    >
                      <span>{pattern.action}</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-carbon/10 bg-gradient-to-br from-pearl/50 to-mist/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-carbon flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-carbon font-medium mb-1">Pattern Confidence</p>
              <p className="text-sm text-ash leading-relaxed">
                Patterns require minimum 5 data points and 70% confidence threshold before recommendations are generated.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
