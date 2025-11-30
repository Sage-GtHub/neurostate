import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Zap, Moon, TrendingUp, Sparkles, Plus, X } from "lucide-react";

interface Goal {
  id: string;
  label: string;
  icon: any;
  color: string;
}

interface Supplement {
  name: string;
  dose: string;
  timing: string;
  purpose: string;
  synergies: string[];
}

const GOALS: Goal[] = [
  { id: "sleep", label: "Better Sleep", icon: Moon, color: "from-blue-500/10 to-blue-600/20" },
  { id: "focus", label: "Enhanced Focus", icon: Brain, color: "from-purple-500/10 to-purple-600/20" },
  { id: "recovery", label: "Athletic Recovery", icon: TrendingUp, color: "from-green-500/10 to-green-600/20" },
  { id: "energy", label: "Sustained Energy", icon: Zap, color: "from-orange-500/10 to-orange-600/20" },
];

const SUPPLEMENT_DATABASE: Record<string, Supplement[]> = {
  sleep: [
    { name: "Magnesium Complex", dose: "400mg", timing: "Before bed", purpose: "Improves sleep quality 31%", synergies: ["L-Theanine"] },
    { name: "L-Theanine", dose: "200mg", timing: "1hr before bed", purpose: "Reduces sleep latency 14min", synergies: ["Magnesium Complex"] },
    { name: "Melatonin", dose: "0.5mg", timing: "30min before bed", purpose: "Circadian rhythm support", synergies: [] },
  ],
  focus: [
    { name: "Lion's Mane Mushroom", dose: "1000mg", timing: "Morning", purpose: "Increases NGF production 23%", synergies: ["Rhodiola"] },
    { name: "Rhodiola Rosea", dose: "300mg", timing: "Morning", purpose: "Reduces mental fatigue 32%", synergies: ["Lion's Mane Mushroom"] },
    { name: "L-Theanine", dose: "200mg", timing: "With caffeine", purpose: "Focus improvement 41% vs caffeine alone", synergies: [] },
  ],
  recovery: [
    { name: "Omega-3 Elite", dose: "2000mg EPA/DHA", timing: "With meals", purpose: "Reduces inflammation markers", synergies: [] },
    { name: "Multi-Collagen Complex", dose: "10g", timing: "Post-workout", purpose: "Joint and tissue recovery", synergies: ["Omega-3 Elite"] },
    { name: "Electrolyte Complex", dose: "1 serving", timing: "During/after exercise", purpose: "Hydration and recovery", synergies: [] },
  ],
  energy: [
    { name: "Creatine Monohydrate", dose: "5g", timing: "Daily", purpose: "ATP production and cellular energy", synergies: [] },
    { name: "Ashwagandha", dose: "300mg", timing: "Morning", purpose: "Reduces cortisol 27%", synergies: ["Rhodiola"] },
    { name: "Rhodiola Rosea", dose: "300mg", timing: "Morning", purpose: "Stress resilience", synergies: ["Ashwagandha"] },
  ],
};

export function ProtocolBuilder() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [recommendedStack, setRecommendedStack] = useState<Supplement[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const generateRecommendations = () => {
    const stack: Supplement[] = [];
    const added = new Set<string>();

    selectedGoals.forEach(goalId => {
      const supplements = SUPPLEMENT_DATABASE[goalId] || [];
      supplements.forEach(supp => {
        if (!added.has(supp.name)) {
          stack.push(supp);
          added.add(supp.name);
        }
      });
    });

    // Sort by timing
    const timingOrder: Record<string, number> = {
      "Morning": 1,
      "With meals": 2,
      "Daily": 2,
      "During/after exercise": 3,
      "Post-workout": 3,
      "With caffeine": 4,
      "1hr before bed": 5,
      "30min before bed": 6,
      "Before bed": 7,
    };

    stack.sort((a, b) => (timingOrder[a.timing] || 99) - (timingOrder[b.timing] || 99));

    setRecommendedStack(stack);
    setShowRecommendations(true);
  };

  const getSynergisticPairs = () => {
    const pairs: string[] = [];
    recommendedStack.forEach(supp => {
      supp.synergies.forEach(synergy => {
        if (recommendedStack.some(s => s.name === synergy)) {
          const pair = [supp.name, synergy].sort().join(" + ");
          if (!pairs.includes(pair)) {
            pairs.push(pair);
          }
        }
      });
    });
    return pairs;
  };

  return (
    <Card className="hover-lift">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-h4 font-semibold text-foreground">Protocol Builder</h3>
            <p className="text-body-sm text-muted-foreground">AI-powered supplement stack customisation</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Goal Selection */}
          <div>
            <label className="text-sm font-semibold text-carbon mb-3 block uppercase tracking-wider">
              Select Your Goals
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`relative overflow-hidden rounded-2xl p-4 border-2 transition-all ${
                    selectedGoals.includes(goal.id)
                      ? "border-accent bg-accent/5"
                      : "border-mist/30 bg-pearl/30 hover:border-mist hover:bg-pearl/50"
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${goal.color} rounded-full blur-2xl -mr-12 -mt-12`} />
                  <div className="relative flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      selectedGoals.includes(goal.id) ? "bg-accent/20" : "bg-mist/40"
                    }`}>
                      <goal.icon className={`w-5 h-5 ${
                        selectedGoals.includes(goal.id) ? "text-accent" : "text-stone"
                      }`} />
                    </div>
                    <span className={`text-sm font-medium ${
                      selectedGoals.includes(goal.id) ? "text-carbon" : "text-ash"
                    }`}>
                      {goal.label}
                    </span>
                    {selectedGoals.includes(goal.id) && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                        <Plus className="w-3 h-3 text-ivory rotate-45" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateRecommendations}
            disabled={selectedGoals.length === 0}
            size="lg"
            className="w-full gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Generate AI Recommendations
          </Button>

          {/* Recommendations */}
          {showRecommendations && recommendedStack.length > 0 && (
            <div className="space-y-6 animate-fade-in pt-6 border-t border-mist/30">
              <div>
                <h4 className="text-sm font-semibold text-carbon mb-1 uppercase tracking-wider">
                  Your Personalised Stack
                </h4>
                <p className="text-caption text-ash mb-4">
                  {recommendedStack.length} supplements optimised for your goals
                </p>

                <div className="space-y-3">
                  {recommendedStack.map((supp, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-pearl/50 to-ivory border border-mist/20 transition-all hover:shadow-soft"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-semibold text-carbon text-sm">{supp.name}</h5>
                            {supp.synergies.length > 0 && recommendedStack.some(s => supp.synergies.includes(s.name)) && (
                              <Badge variant="outline" className="text-[0.6875rem] border-accent/30 text-accent">
                                Synergy
                              </Badge>
                            )}
                          </div>
                          <p className="text-caption text-ash mb-2">{supp.purpose}</p>
                          <div className="flex flex-wrap gap-2 text-[0.6875rem]">
                            <span className="px-2 py-1 rounded-full bg-mist/30 text-stone font-medium">
                              {supp.dose}
                            </span>
                            <span className="px-2 py-1 rounded-full bg-mist/30 text-stone font-medium">
                              {supp.timing}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Synergistic Interactions */}
              {getSynergisticPairs().length > 0 && (
                <Alert className="bg-accent/5 border-accent/20">
                  <Zap className="h-4 w-4 text-accent" />
                  <AlertDescription className="text-caption text-carbon">
                    <strong>Synergistic effects detected:</strong> {getSynergisticPairs().join(", ")} work together for enhanced results.
                  </AlertDescription>
                </Alert>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button size="sm" className="flex-1 rounded-full">
                  Save as Protocol
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Adjust Stack
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
