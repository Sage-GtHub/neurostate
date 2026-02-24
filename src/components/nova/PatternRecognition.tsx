import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, AlertCircle, CheckCircle, Clock, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { useAutonomousCoaching } from "@/hooks/useAutonomousCoaching";

const patternTypeConfig = {
  positive: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  negative: { icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  neutral: { icon: TrendingUp, color: "text-foreground/60", bg: "bg-foreground/[0.03]", border: "border-foreground/5" },
};

export function PatternRecognition() {
  const { patterns, isLoading, isInitialLoading, generateCoaching } = useAutonomousCoaching();

  if (isInitialLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
      </div>
    );
  }

  if (patterns.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Pattern Recognition</h2>
          <p className="text-sm text-muted-foreground">Nova identifies correlations between your behaviours and performance outcomes</p>
        </div>
        <div className="text-center py-12 rounded-2xl bg-foreground/[0.02]">
          <Sparkles className="w-10 h-10 text-accent mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-2">No patterns detected yet</p>
          <p className="text-xs text-muted-foreground mb-4">Generate coaching actions to detect biometric patterns</p>
          <Button size="sm" onClick={generateCoaching} disabled={isLoading} className="gap-2">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Analyse Patterns
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Pattern Recognition</h2>
        <p className="text-sm text-muted-foreground">Correlations detected from your biometric data</p>
      </div>

      <div className="space-y-4">
        {patterns.map((pattern) => {
          const pType = (pattern.metadata?.pattern_type as string) || 'neutral';
          const config = patternTypeConfig[pType as keyof typeof patternTypeConfig] || patternTypeConfig.neutral;
          const Icon = config.icon;

          return (
            <Card key={pattern.id} className={`border-foreground/5 hover:border-foreground/10 transition-all ${config.border}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{pattern.title}</h3>
                      {pattern.timing && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{pattern.timing}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{pattern.description}</p>
                    
                    {/* Confidence bar */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1 bg-foreground/[0.03] rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${pType === 'positive' ? 'bg-emerald-500' : 'bg-accent'}`}
                          style={{ width: `${pattern.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground min-w-[3rem] text-right">
                        {pattern.confidence}%
                      </span>
                    </div>

                    {pattern.action_label && (
                      <Button variant="outline" size="sm" className="gap-2">
                        <span>{pattern.action_label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
