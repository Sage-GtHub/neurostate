import { NovaNav } from "@/components/NovaNav";
import { AdaptiveProtocol } from "@/components/nova/AdaptiveProtocol";
import { MultiGoalBalancer } from "@/components/nova/MultiGoalBalancer";
import { BehaviourChangeNudges } from "@/components/nova/BehaviourChangeNudges";
import { PatternRecognition } from "@/components/nova/PatternRecognition";
import { AutonomousFeatures } from "@/components/nova/AutonomousFeatures";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NovaProtocolOptimization() {
  return (
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      <div className="border-b border-mist/30 bg-gradient-to-b from-ivory to-pearl/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8">
          <h1 className="text-[2rem] font-semibold text-carbon tracking-tight mb-2">Protocol Optimisation</h1>
          <p className="text-sm text-ash">Advanced AI-driven protocol management and behaviour change</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <Tabs defaultValue="adaptive" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto gap-2">
            <TabsTrigger value="adaptive" className="px-4 py-3 text-xs sm:text-sm">
              Adaptive Protocol
            </TabsTrigger>
            <TabsTrigger value="goals" className="px-4 py-3 text-xs sm:text-sm">
              Multi-Goal Balance
            </TabsTrigger>
            <TabsTrigger value="patterns" className="px-4 py-3 text-xs sm:text-sm">
              Pattern Recognition
            </TabsTrigger>
            <TabsTrigger value="nudges" className="px-4 py-3 text-xs sm:text-sm">
              Behaviour Nudges
            </TabsTrigger>
            <TabsTrigger value="autonomous" className="px-4 py-3 text-xs sm:text-sm">
              Autonomous (Phase 4)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="adaptive" className="animate-fade-in">
            <AdaptiveProtocol />
          </TabsContent>

          <TabsContent value="goals" className="animate-fade-in">
            <MultiGoalBalancer />
          </TabsContent>

          <TabsContent value="patterns" className="animate-fade-in">
            <PatternRecognition />
          </TabsContent>

          <TabsContent value="nudges" className="animate-fade-in">
            <BehaviourChangeNudges />
          </TabsContent>

          <TabsContent value="autonomous" className="animate-fade-in">
            <AutonomousFeatures />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
