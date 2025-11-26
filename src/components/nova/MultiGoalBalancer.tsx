import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Target, Brain, Activity, Moon, Zap } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  icon: any;
  weight: number;
  color: string;
}

export function MultiGoalBalancer() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "sleep", name: "Sleep Quality", icon: Moon, weight: 40, color: "#666666" },
    { id: "focus", name: "Cognitive Focus", icon: Brain, weight: 30, color: "#1A1A1A" },
    { id: "recovery", name: "Athletic Recovery", icon: Activity, weight: 20, color: "#999999" },
    { id: "energy", name: "Daily Energy", icon: Zap, weight: 10, color: "#10b981" }
  ]);

  const handleWeightChange = (goalId: string, newWeight: number) => {
    const updatedGoals = goals.map(goal => 
      goal.id === goalId ? { ...goal, weight: newWeight } : goal
    );
    setGoals(updatedGoals);
  };

  const totalWeight = goals.reduce((sum, goal) => sum + goal.weight, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[1.5rem] font-semibold text-carbon tracking-tight mb-2">Multi-Goal Balancer</h2>
        <p className="text-sm text-ash leading-relaxed">
          Adjust the importance of each goal to optimise your protocol balance
        </p>
      </div>

      <Card className="border-mist/30 shadow-sm">
        <CardContent className="p-8">
          <div className="space-y-8">
            {goals.map((goal, index) => (
              <div 
                key={goal.id} 
                className="space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: `${goal.color}20` }}
                    >
                      <goal.icon className="w-5 h-5" style={{ color: goal.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-carbon">{goal.name}</h3>
                      <p className="text-xs text-ash">Priority weight</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[1.5rem] font-semibold text-carbon tracking-tight">{goal.weight}%</div>
                      <div className="text-xs text-ash">{((goal.weight / totalWeight) * 100).toFixed(0)}% of total</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Slider
                    value={[goal.weight]}
                    onValueChange={([value]) => handleWeightChange(goal.id, value)}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-mist/30 mt-8 pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-carbon">Total Weight</span>
              <span className="text-[1.5rem] font-semibold text-carbon tracking-tight">{totalWeight}%</span>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1">Apply Balance</Button>
              <Button variant="outline">Reset to Default</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-carbon/10 bg-gradient-to-br from-pearl/50 to-mist/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-carbon flex-shrink-0 mt-1" />
            <p className="text-sm text-ash leading-relaxed">
              Nova will dynamically adjust supplement timing, doses, and combinations based on your goal priorities. Changes take effect within 24 hours.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
