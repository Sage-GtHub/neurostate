import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, AlertCircle } from "lucide-react";

interface Nudge {
  id: string;
  priority: "high" | "medium" | "low";
  title: string;
  insight: string;
  impact: string;
  action: string;
  dismissed: boolean;
}

interface BehaviorChangeNudgesProps {
  nudges: Nudge[];
  onAccept: (nudgeId: string) => void;
  onDismiss: (nudgeId: string) => void;
}

export function BehaviorChangeNudges({ nudges, onAccept, onDismiss }: BehaviorChangeNudgesProps) {
  const activeNudges = nudges.filter(n => !n.dismissed);

  if (activeNudges.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Target className="w-12 h-12 text-ash mx-auto mb-4" />
          <p className="text-sm text-ash">
            No behaviour change recommendations at this time
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {activeNudges.map((nudge) => (
        <Card key={nudge.id}>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                nudge.priority === "high" ? "bg-carbon" : 
                nudge.priority === "medium" ? "bg-ash" : "bg-mist"
              }`}>
                {nudge.priority === "high" ? (
                  <AlertCircle className="w-5 h-5 text-ivory" />
                ) : (
                  <Target className="w-5 h-5 text-ivory" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-body font-semibold text-carbon">{nudge.title}</h4>
                  <Badge className={
                    nudge.priority === "high" ? "bg-carbon text-ivory" :
                    nudge.priority === "medium" ? "bg-ash text-ivory" :
                    "bg-mist text-carbon"
                  }>
                    {nudge.priority} priority
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-ash uppercase tracking-wider">
                      Insight
                    </span>
                    <p className="text-sm text-ash leading-relaxed mt-1">
                      {nudge.insight}
                    </p>
                  </div>

                  <div className="bg-[#10b981]/10 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-[#10b981] uppercase tracking-wider">
                          Expected Impact
                        </span>
                        <p className="text-sm text-carbon mt-1">{nudge.impact}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-ash uppercase tracking-wider">
                      Recommended Action
                    </span>
                    <p className="text-sm text-carbon font-medium mt-1">
                      {nudge.action}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => onAccept(nudge.id)} className="flex-1">
                Accept Recommendation
              </Button>
              <Button variant="outline" onClick={() => onDismiss(nudge.id)}>
                Dismiss
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}