import { useState } from "react";
import { NovaNav } from "@/components/NovaNav";
import { PhaseIndicator } from "@/components/nova/PhaseIndicator";
import { AIModelCard } from "@/components/nova/AIModelCard";
import { ResearchFoundation } from "@/components/nova/ResearchFoundation";
import { TechnicalArchitecture } from "@/components/nova/TechnicalArchitecture";
import { PredictiveInsightsComponent } from "@/components/nova/PredictiveInsightsComponent";
import { AdaptiveProtocol } from "@/components/nova/AdaptiveProtocol";
import { MultiGoalBalancer } from "@/components/nova/MultiGoalBalancer";
import { BehaviourChangeNudges } from "@/components/nova/BehaviourChangeNudges";
import { PatternRecognition } from "@/components/nova/PatternRecognition";
import { AutonomousFeatures } from "@/components/nova/AutonomousFeatures";
import { RealTimeSimulation } from "@/components/nova/RealTimeSimulation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const aiModels = [
  {
    name: "GPT-4 Turbo",
    category: "Natural Language Understanding",
    parameters: "175B parameters",
    useCase: "Conversational interface, report generation",
    performance: "95%",
    performanceLabel: "Intent accuracy",
    icon: "brain" as const
  },
  {
    name: "XGBoost",
    category: "Ensemble Learning",
    parameters: "500 trees",
    useCase: "Protocol efficacy prediction",
    performance: "91%",
    performanceLabel: "Forecast accuracy",
    icon: "trending" as const
  },
  {
    name: "LSTM Networks",
    category: "Time-Series Forecasting",
    parameters: "Multi-layer recurrent",
    useCase: "72-hour health forecasting",
    performance: "89%",
    performanceLabel: "Prediction accuracy",
    icon: "activity" as const
  },
  {
    name: "Random Forest",
    category: "Risk Assessment",
    parameters: "1000 decision trees",
    useCase: "Burnout detection, illness prediction",
    performance: "87%",
    performanceLabel: "Early detection rate",
    icon: "brain" as const
  },
  {
    name: "Transformer Architecture",
    category: "Multi-Modal Data Fusion",
    parameters: "100M parameters",
    useCase: "Biometric + genetic + lifestyle data integration",
    performance: "84%",
    performanceLabel: "Correlation detection",
    icon: "trending" as const
  },
  {
    name: "Reinforcement Learning",
    category: "Autonomous Decision Making",
    parameters: "Deep Q-Network",
    useCase: "Protocol optimization",
    performance: "92%",
    performanceLabel: "Optimal decisions",
    icon: "brain" as const
  },
  {
    name: "K-Means Clustering",
    category: "User Archetype Discovery",
    parameters: "24 clusters",
    useCase: "Personalization engine",
    performance: "79%",
    performanceLabel: "Archetype match",
    icon: "activity" as const
  },
  {
    name: "Prophet (Meta)",
    category: "Seasonal Trend Decomposition",
    parameters: "Bayesian approach",
    useCase: "Circadian rhythm modeling, baseline tracking",
    performance: "92%",
    performanceLabel: "Pattern recognition",
    icon: "trending" as const
  },
  {
    name: "Isolation Forest",
    category: "Anomaly Detection",
    parameters: "Unsupervised learning",
    useCase: "Detecting unusual health patterns",
    performance: "96%",
    performanceLabel: "Anomaly detection",
    icon: "brain" as const
  }
];

export default function NovaProtocolOptimization() {
  const [currentPhase] = useState<1 | 2 | 3 | 4>(2);
  const [daysInCurrentPhase] = useState(15);

  return (
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      <div className="border-b border-mist/30 bg-gradient-to-b from-ivory to-pearl/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
          <h1 className="text-[3rem] font-bold text-carbon tracking-tight mb-3">
            Nova Intelligence System
          </h1>
          <p className="text-body text-ash max-w-3xl">
            15+ specialized AI models working together to optimize your health and performance
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-16 space-y-24">
        
        {/* The 4-Phase System */}
        <section className="animate-fade-in">
          <PhaseIndicator currentPhase={currentPhase} daysInCurrentPhase={daysInCurrentPhase} />
        </section>

        {/* Real-Time AI Processing */}
        <section className="animate-fade-in">
          <RealTimeSimulation />
        </section>

        {/* AI Model Stack */}
        <section className="animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-[2rem] font-bold text-carbon tracking-tight mb-3">
              AI Model Stack
            </h2>
            <p className="text-body text-ash">
              15+ specialized models working together
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiModels.map((model, index) => (
              <div 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <AIModelCard {...model} />
              </div>
            ))}
          </div>
        </section>

        {/* Predictive Forecasting */}
        <section className="animate-fade-in">
          <PredictiveInsightsComponent />
        </section>

        {/* Protocol Optimization Features */}
        <section className="animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-[2rem] font-bold text-carbon tracking-tight mb-3">
              Advanced Protocol Management
            </h2>
            <p className="text-body text-ash">
              AI-driven optimization and behavior change
            </p>
          </div>

          <Tabs defaultValue="adaptive" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto gap-2 bg-pearl/30 p-1.5 rounded-3xl">
              <TabsTrigger 
                value="adaptive" 
                className="px-4 py-3 text-xs sm:text-sm data-[state=active]:bg-accent/10 data-[state=active]:text-carbon data-[state=active]:border data-[state=active]:border-accent/20 rounded-2xl transition-all"
              >
                Adaptive Protocol
              </TabsTrigger>
              <TabsTrigger 
                value="goals" 
                className="px-4 py-3 text-xs sm:text-sm data-[state=active]:bg-accent/10 data-[state=active]:text-carbon data-[state=active]:border data-[state=active]:border-accent/20 rounded-2xl transition-all"
              >
                Multi-Goal Balance
              </TabsTrigger>
              <TabsTrigger 
                value="patterns" 
                className="px-4 py-3 text-xs sm:text-sm data-[state=active]:bg-accent/10 data-[state=active]:text-carbon data-[state=active]:border data-[state=active]:border-accent/20 rounded-2xl transition-all"
              >
                Pattern Recognition
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

        {/* Technical Architecture */}
        <section className="animate-fade-in">
          <TechnicalArchitecture />
        </section>

      </div>
    </div>
  );
}
