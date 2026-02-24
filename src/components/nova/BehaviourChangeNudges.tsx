import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, X, CheckCircle, Clock, Sparkles, Loader2, AlertTriangle, Moon, Droplets, Brain } from "lucide-react";
import { useAutonomousCoaching } from "@/hooks/useAutonomousCoaching";

const typeIcons: Record<string, React.ElementType> = {
  reminder: Bell,
  rest: Moon,
  hydration: Droplets,
  focus: Brain,
};

export function BehaviourChangeNudges() {
  const { activeNudges, riskAlerts, isLoading, isInitialLoading, generateCoaching, completeNudge, dismissNudge } = useAutonomousCoaching();

  const allNudges = [...riskAlerts, ...activeNudges];

  if (isInitialLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Behaviour Change Nudges</h2>
        <p className="text-sm text-muted-foreground">Timely reminders and suggestions based on your goals and patterns</p>
      </div>

      {allNudges.length > 0 ? (
        <div className="space-y-4">
          {allNudges.map((nudge) => {
            const Icon = nudge.nudge_type === 'risk_alert' ? AlertTriangle : (typeIcons[nudge.category] || Bell);
            const isRisk = nudge.nudge_type === 'risk_alert';

            return (
              <Card key={nudge.id} className={`border-foreground/5 hover:border-foreground/10 transition-all ${isRisk ? 'border-amber-500/20' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      isRisk ? 'bg-amber-500/10' : 'bg-accent/10'
                    }`}>
                      <Icon className={`w-5 h-5 ${isRisk ? 'text-amber-500' : 'text-accent'}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground">{nudge.title}</h3>
                        {nudge.timing && (
                          <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-full bg-foreground/[0.03]">
                            {nudge.timing}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{nudge.description}</p>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" onClick={() => completeNudge(nudge.id)} className="gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Mark Complete
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => dismissNudge(nudge.id)} className="gap-2">
                          <X className="w-4 h-4" />
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-foreground/5">
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-10 h-10 text-accent mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground mb-2">All caught up</p>
            <p className="text-xs text-muted-foreground mb-4">No active nudges. Generate coaching actions to get personalised recommendations.</p>
            <Button size="sm" onClick={generateCoaching} disabled={isLoading} className="gap-2">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Generate
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="border-foreground/5 bg-foreground/[0.01]">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-foreground font-medium mb-1">Smart Timing</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nudges are delivered at optimal moments based on your routine and biometric patterns. Customise preferences in settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
