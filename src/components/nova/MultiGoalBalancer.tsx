import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Target, Brain, Moon, Dumbbell } from "lucide-react";
import { useState } from "react";

interface Goal {
  id: string;
  name: string;
  icon: any;
  priority: number;
  currentProgress: number;
  conflicts: string[];
}

interface MultiGoalBalancerProps {
  goals: Goal[];
  onOptimize: (priorities: { [key: string]: number }) => void;
}

export function MultiGoalBalancer({ goals: initialGoals, onOptimize }: MultiGoalBalancerProps) {
  const [goals, setGoals] = useState(initialGoals);

  const updatePriority = (goalId: string, value: number) => {
    setGoals(goals.map(g => g.id === goalId ? { ...g, priority: value } : g));
  };

  const handleOptimize = () => {
    const priorities = goals.reduce((acc, goal) => {
      acc[goal.id] = goal.priority;
      return acc;
    }, {} as { [key: string]: number });
    onOptimize(priorities);
  };

  const totalPriority = goals.reduce((sum, g) => sum + g.priority, 0);
  const avgPriority = totalPriority / goals.length;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-body font-semibold text-carbon mb-2">Multi-Goal Optimization</h3>
          <p className="text-sm text-ash leading-relaxed">
            Nova will balance these goals to create an optimal protocol that maximizes all objectives
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <div key={goal.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-carbon" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-carbon">{goal.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {goal.currentProgress}% progress
                        </Badge>
                      </div>
                      {goal.conflicts.length > 0 && (
                        <p className="text-xs text-ash mt-1">
                          Conflicts with: {goal.conflicts.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-carbon">
                    {goal.priority}%
                  </span>
                </div>
                <Slider
                  value={[goal.priority]}
                  onValueChange={([value]) => updatePriority(goal.id, value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            );
          })}
        </div>

        <div className="bg-pearl/50 rounded-lg p-4 mb-6">
          <div className="text-sm text-ash mb-2">
            <span className="font-semibold text-carbon">Balance Score:</span>{" "}
            {avgPriority > 70 ? "Well Balanced" : avgPriority > 40 ? "Moderate Focus" : "Single Goal Focus"}
          </div>
          <p className="text-xs text-ash leading-relaxed">
            Nova will create a protocol that prioritizes these goals according to your preferences while minimizing conflicts
          </p>
        </div>

        <Button onClick={handleOptimize} className="w-full">
          Generate Optimized Protocol
        </Button>
      </CardContent>
    </Card>
  );
}