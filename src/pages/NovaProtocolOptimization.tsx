import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { FloatingNovaChat } from "@/components/nova/FloatingNovaChat";
import { ResearchFoundation } from "@/components/nova/ResearchFoundation";
import { PredictiveInsightsComponent } from "@/components/nova/PredictiveInsightsComponent";
import { AdaptiveProtocol } from "@/components/nova/AdaptiveProtocol";
import { MultiGoalBalancer } from "@/components/nova/MultiGoalBalancer";
import { BehaviourChangeNudges } from "@/components/nova/BehaviourChangeNudges";
import { PatternRecognition } from "@/components/nova/PatternRecognition";
import { AutonomousFeatures } from "@/components/nova/AutonomousFeatures";
import { RealTimeSimulation } from "@/components/nova/RealTimeSimulation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEO } from "@/components/SEO";

export default function NovaProtocolOptimization() {
  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Protocol Optimisation | Nova"
        description="Fine-tune your health protocols with data-driven adjustments, pattern spotting, and personalised recommendations."
      />
      <div className="min-h-screen bg-ivory">
        <NovaNav />
      
      <div className="border-b border-mist/30 bg-gradient-to-b from-ivory to-pearl/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8 sm:py-10 md:py-12">
          <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-2">Fine-tune</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-bold text-carbon tracking-tight mb-2 sm:mb-3">
            Protocol Optimisation
          </h1>
          <p className="text-sm sm:text-base md:text-body text-ash max-w-3xl">
            Tools to adjust your protocols, spot patterns, and keep improving
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8 sm:py-12 md:py-16 space-y-12 sm:space-y-16 md:space-y-24">
        
        {/* Real-Time AI Processing */}
        <section className="animate-fade-in">
          <RealTimeSimulation />
        </section>

        {/* Predictive Forecasting */}
        <section className="animate-fade-in">
          <PredictiveInsightsComponent />
        </section>

        {/* Protocol Optimisation Features */}
        <section className="animate-fade-in">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-bold text-carbon tracking-tight mb-2 sm:mb-3">
              Make It Work Better
            </h2>
            <p className="text-sm sm:text-base md:text-body text-ash">
              Adjust, balance, and improve your protocols over time
            </p>
          </div>

          <Tabs defaultValue="adaptive" className="space-y-6 sm:space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto gap-1.5 sm:gap-2 bg-pearl/30 p-1 sm:p-1.5 rounded-2xl sm:rounded-3xl overflow-x-auto">
              <TabsTrigger 
                value="adaptive" 
                className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm data-[state=active]:bg-accent/10 data-[state=active]:text-carbon data-[state=active]:border data-[state=active]:border-accent/20 rounded-xl sm:rounded-2xl transition-all whitespace-nowrap"
              >
                Smart Adjustments
              </TabsTrigger>
              <TabsTrigger 
                value="goals" 
                className="px-4 py-3 text-xs sm:text-sm data-[state=active]:bg-accent/10 data-[state=active]:text-carbon data-[state=active]:border data-[state=active]:border-accent/20 rounded-2xl transition-all"
              >
                Goal Balance
              </TabsTrigger>
              <TabsTrigger 
                value="patterns" 
                className="px-4 py-3 text-xs sm:text-sm data-[state=active]:bg-accent/10 data-[state=active]:text-carbon data-[state=active]:border data-[state=active]:border-accent/20 rounded-2xl transition-all"
              >
                Spot Patterns
              </TabsTrigger>
              <TabsTrigger 
                value="nudges" 
                className="px-4 py-3 text-xs sm:text-sm data-[state=active]:bg-accent/10 data-[state=active]:text-carbon data-[state=active]:border data-[state=active]:border-accent/20 rounded-2xl transition-all"
              >
                Behaviour Nudges
              </TabsTrigger>
              <TabsTrigger 
                value="autonomous" 
                className="px-4 py-3 text-xs sm:text-sm data-[state=active]:bg-accent/10 data-[state=active]:text-carbon data-[state=active]:border data-[state=active]:border-accent/20 rounded-2xl transition-all"
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
        </section>

        {/* Research Foundation */}
        <section className="animate-fade-in">
          <ResearchFoundation />
        </section>
      </div>
      
      <FloatingNovaChat />
    </div>
    </NovaSwipeWrapper>
  );
}