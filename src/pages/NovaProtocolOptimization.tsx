import { useState, useEffect } from "react";
import { NovaNav } from "@/components/NovaNav";
import { AdaptiveProtocol } from "@/components/nova/AdaptiveProtocol";
import { MultiGoalBalancer } from "@/components/nova/MultiGoalBalancer";
import { BehaviorChangeNudges } from "@/components/nova/BehaviorChangeNudges";
import { PatternRecognition } from "@/components/nova/PatternRecognition";
import { AutonomousFeatures } from "@/components/nova/AutonomousFeatures";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Moon, Dumbbell, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function NovaProtocolOptimization() {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<"optimisation" | "balancer" | "nudges" | "patterns" | "autonomous">("optimisation");

  const handleAcceptOptimisation = (protocolId: string) => {
    toast({
      title: "Optimisation accepted",
      description: "Your protocol will be updated with the suggested changes",
    });
  };

  const handleViewDetails = (protocolId: string) => {
    // Navigate to protocol detail
  };

  const handleMultiGoalOptimise = (priorities: { [key: string]: number }) => {
    toast({
      title: "Generating optimised protocol",
      description: "Nova is creating a balanced protocol for your goals",
    });
  };

  const handleAcceptNudge = (nudgeId: string) => {
    toast({
      title: "Recommendation accepted",
      description: "We'll help you implement this behavior change",
    });
  };

  const handleDismissNudge = (nudgeId: string) => {
    toast({
      title: "Dismissed",
      description: "You can revisit this recommendation at any time",
    });
  };

  return (
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      <div className="border-b border-mist bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-h3 font-semibold text-carbon">Protocol Optimisation</h1>
              <p className="text-body text-ash mt-2">Phase 3: AI-driven protocol optimisation and behaviour insights</p>
            </div>
            <Badge className="bg-carbon text-ivory">Phase 3</Badge>
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            <Button 
              variant={activeView === "optimisation" ? "default" : "outline"}
              onClick={() => setActiveView("optimisation")}
              size="sm"
            >
              Adaptive Protocols
            </Button>
            <Button 
              variant={activeView === "balancer" ? "default" : "outline"}
              onClick={() => setActiveView("balancer")}
              size="sm"
            >
              Multi-Goal Balancer
            </Button>
            <Button 
              variant={activeView === "nudges" ? "default" : "outline"}
              onClick={() => setActiveView("nudges")}
              size="sm"
            >
              Behaviour Nudges
            </Button>
            <Button 
              variant={activeView === "patterns" ? "default" : "outline"}
              onClick={() => setActiveView("patterns")}
              size="sm"
            >
              Pattern Recognition
            </Button>
            <Button 
              variant={activeView === "autonomous" ? "default" : "outline"}
              onClick={() => setActiveView("autonomous")}
              size="sm"
            >
              Autonomous Features
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        {activeView === "optimisation" && (
          <div className="space-y-8">
            <AdaptiveProtocol
              optimisation={{
                protocolId: "1",
                protocolName: "Peak Performance Protocol",
                currentEffectiveness: 73,
                suggestedChanges: [
                  {
                    type: "adjust",
                    product: "Magnesium Complex",
                    reason: "Your sleep hasn't improved after 2 weeks at current dosage",
                    expectedImprovement: "15% better sleep quality"
                  },
                  {
                    type: "add",
                    product: "Red Light Therapy (15 min before bed)",
                    reason: "Pattern analysis shows you respond well to evening light therapy",
                    expectedImprovement: "20% faster sleep onset"
                  }
                ],
                abTestRunning: true,
                dataPoints: 847
              }}
              onAcceptChanges={handleAcceptOptimisation}
              onViewDetails={handleViewDetails}
            />
          </div>
        )}

        {activeView === "balancer" && (
          <MultiGoalBalancer
            goals={[
              {
                id: "sleep",
                name: "Better Sleep",
                icon: Moon,
                priority: 80,
                currentProgress: 65,
                conflicts: ["High training intensity"]
              },
              {
                id: "performance",
                name: "Peak Performance",
                icon: Brain,
                priority: 70,
                currentProgress: 72,
                conflicts: []
              },
              {
                id: "recovery",
                name: "Athletic Recovery",
                icon: Dumbbell,
                priority: 60,
                currentProgress: 80,
                conflicts: ["Late night work sessions"]
              },
              {
                id: "focus",
                name: "Enhanced Focus",
                icon: Target,
                priority: 50,
                currentProgress: 68,
                conflicts: []
              }
            ]}
            onOptimise={handleMultiGoalOptimise}
          />
        )}

        {activeView === "nudges" && (
          <BehaviorChangeNudges
            nudges={[
              {
                id: "1",
                priority: "high",
                title: "Caffeine Timing Impact",
                insight: "Your caffeine intake after 2pm is your biggest sleep disruptor. Data shows a 34% reduction in sleep quality on days with late caffeine.",
                impact: "Expect 25% improvement in sleep quality and 15% better HRV",
                action: "Cut caffeine after 2pm, or switch to L-Theanine for afternoon focus",
                dismissed: false
              },
              {
                id: "2",
                priority: "medium",
                title: "Training Window Optimisation",
                insight: "Your best workouts consistently happen between 4-6pm when your body temperature peaks. Morning sessions show 18% lower performance output.",
                impact: "12% performance gain by shifting training to optimal window",
                action: "Schedule high-intensity training between 4-6pm when possible",
                dismissed: false
              }
            ]}
            onAccept={handleAcceptNudge}
            onDismiss={handleDismissNudge}
          />
        )}

        {activeView === "patterns" && (
          <PatternRecognition
            patterns={[
              {
                id: "1",
                title: "Evening Screen Time & Sleep Quality",
                correlation: 87,
                description: "You consistently get 40 minutes more deep sleep on nights when you stop screen time before 9pm",
                dataPoints: 47,
                actionable: true,
                suggestion: "Set a device reminder for 8:45pm to begin winding down. Consider blue light blocking glasses if evening work is unavoidable."
              },
              {
                id: "2",
                title: "Magnesium Timing Optimisation",
                correlation: 92,
                description: "Taking magnesium at 8pm results in 25% faster sleep onset compared to taking it at 10pm",
                dataPoints: 63,
                actionable: true,
                suggestion: "Move your magnesium dose to 8pm for optimal absorption and sleep onset benefits."
              },
              {
                id: "3",
                title: "HRV Recovery Pattern",
                correlation: 79,
                description: "Your HRV recovers best after 2 consecutive rest days following intense training blocks",
                dataPoints: 89,
                actionable: true,
                suggestion: "Structure your training with intentional 2-day recovery windows every 10-12 days for optimal adaptation."
              }
            ]}
          />
        )}

        {activeView === "autonomous" && (
          <AutonomousFeatures />
        )}
      </div>
    </div>
  );
}