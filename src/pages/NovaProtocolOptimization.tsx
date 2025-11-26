import { NovaNav } from "@/components/NovaNav";
import { AdaptiveProtocol } from "@/components/nova/AdaptiveProtocol";
import { MultiGoalBalancer } from "@/components/nova/MultiGoalBalancer";
import { BehaviourChangeNudges } from "@/components/nova/BehaviourChangeNudges";
import { PatternRecognition } from "@/components/nova/PatternRecognition";
import { AutonomousFeatures } from "@/components/nova/AutonomousFeatures";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NovaProtocolOptimization() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-carbon via-slate to-carbon">
      <NovaNav />
      
      <div className="border-b border-ivory/5 backdrop-blur-xl bg-carbon/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8">
          <h1 className="text-[2rem] font-semibold text-ivory tracking-tight mb-2">Protocol Optimisation</h1>
          <p className="text-sm text-ivory/60">Advanced AI-driven protocol management and behaviour change</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <Tabs defaultValue="adaptive" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto gap-2 bg-ivory/5 backdrop-blur-xl p-1.5 rounded-2xl border border-ivory/10">
            <TabsTrigger 
              value="adaptive" 
              className="px-4 py-3 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#10b981]/20 data-[state=active]:to-[#10b981]/10 data-[state=active]:text-ivory data-[state=active]:border data-[state=active]:border-[#10b981]/30 rounded-xl transition-all"
            >
              Adaptive Protocol
            </TabsTrigger>
            <TabsTrigger 
              value="goals" 
              className="px-4 py-3 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#10b981]/20 data-[state=active]:to-[#10b981]/10 data-[state=active]:text-ivory data-[state=active]:border data-[state=active]:border-[#10b981]/30 rounded-xl transition-all"
            >
              Multi-Goal Balance
            </TabsTrigger>
            <TabsTrigger 
              value="patterns" 
              className="px-4 py-3 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#10b981]/20 data-[state=active]:to-[#10b981]/10 data-[state=active]:text-ivory data-[state=active]:border data-[state=active]:border-[#10b981]/30 rounded-xl transition-all"
            >
              Pattern Recognition
            </TabsTrigger>
            <TabsTrigger 
              value="nudges" 
              className="px-4 py-3 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#10b981]/20 data-[state=active]:to-[#10b981]/10 data-[state=active]:text-ivory data-[state=active]:border data-[state=active]:border-[#10b981]/30 rounded-xl transition-all"
            >
              Behaviour Nudges
            </TabsTrigger>
            <TabsTrigger 
              value="autonomous" 
              className="px-4 py-3 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#10b981]/20 data-[state=active]:to-[#10b981]/10 data-[state=active]:text-ivory data-[state=active]:border data-[state=active]:border-[#10b981]/30 rounded-xl transition-all"
            >
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
