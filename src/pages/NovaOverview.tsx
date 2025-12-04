import { useState } from "react";
import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { RealTimeSimulation } from "@/components/nova/RealTimeSimulation";
import { SEO } from "@/components/SEO";
import { SoftwareApplicationStructuredData } from "@/components/StructuredData";
import { 
  Brain, 
  Activity, 
  TrendingUp, 
  Target, 
  Sparkles,
  ArrowRight,
  Shield,
  Database,
  Zap,
  LineChart as ChartIcon
} from "lucide-react";

export default function NovaOverview() {
  const navigate = useNavigate();
  const [activePhase, setActivePhase] = useState<number>(1);

  const coreStats = [
    { value: "100M+", label: "AI Parameters", desc: "Multi-model ensemble" },
    { value: "91%", label: "Prediction Accuracy", desc: "Continuously learning" },
    { value: "72hr", label: "Health Forecasts", desc: "Advance predictions" },
    { value: "500K", label: "SNPs Analysed", desc: "Genomic integration" }
  ];

  const capabilities = [
    {
      icon: Brain,
      title: "Predicts Your State",
      description: "72 hour advance predictions for burnout, illness, performance dips, and optimal training windows",
      stats: ["91% accuracy", "24 health markers", "Real time updates"]
    },
    {
      icon: TrendingUp,
      title: "Adapts Your Protocol",
      description: "Continuously adjusts your supplement stack and recommendations based on real biometric data",
      stats: ["1000+ daily updates", "Zero user input", "15% efficacy improvement"]
    },
    {
      icon: Activity,
      title: "Learns Your Biology",
      description: "Processes data from wearables, sleep, and lifestyle to build a model unique to you",
      stats: ["15+ data sources", "100M+ parameters", "<50ms latency"]
    },
    {
      icon: Database,
      title: "Integrates Your Devices",
      description: "Connects with Oura, Whoop, Apple Watch and other wearables for continuous data sync",
      stats: ["Oura Ring", "Apple Watch", "Whoop"]
    },
    {
      icon: Sparkles,
      title: "Speaks Your Language",
      description: "Conversational interface that understands context, learns preferences, and gives direct answers",
      stats: ["95% intent accuracy", "0.3s latency", "Voice and text"]
    },
    {
      icon: Shield,
      title: "Protects Your Data",
      description: "End to end encryption, on device processing, and full user data sovereignty",
      stats: ["AES-256 encryption", "GDPR compliant", "Local processing"]
    }
  ];

  const phases = [
    {
      phase: 1,
      title: "Discover",
      duration: "Days 1-7",
      description: "Deep assessment and baseline establishment through multi-dimensional analysis",
      metrics: ["500+ data points", "15 biometric markers", "50 lifestyle factors", "12 genetic variants"]
    },
    {
      phase: 2,
      title: "Optimise",
      duration: "Days 8-30",
      description: "Active experimentation and rapid optimisation through controlled interventions",
      metrics: ["2,000+ biometric readings", "90+ subjective reports", "20+ protocol variations tested", "Real-time adjustments"]
    },
    {
      phase: 3,
      title: "Predict",
      duration: "Days 31-90",
      description: "Advanced pattern recognition enabling 72-hour health forecasting",
      metrics: ["10,000+ patterns", "91% accuracy", "24 forecasted markers", "Weekly model retraining"]
    },
    {
      phase: 4,
      title: "Autonomy",
      duration: "Day 91+",
      description: "Fully autonomous health optimisation with minimal user input required",
      metrics: ["Continuous monitoring", "Autonomous adjustments", "Long-term tracking", "Minimal input"]
    }
  ];

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Nova – AI Cognitive Performance Assistant | NeuroState"
        description="Personalised protocols, predictive insights and real-time guidance to enhance focus, sleep and mental resilience. 72-hour health forecasting powered by AI."
      />
      <SoftwareApplicationStructuredData />
      <div className="min-h-screen bg-background">
        <NovaNav />
      
      {/* Hero Section */}
      <div className="border-b border-border/50 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-16 md:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-6 sm:mb-8 animate-fade-in">
              Cognitive Engine
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold text-foreground mb-4 sm:mb-6 leading-tight sm:leading-none animate-fade-in">
              Nova predicts before
              <br />
              <span className="text-accent">you feel it.</span>
            </h1>
            <p className="text-sm sm:text-base md:text-body text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 animate-fade-in">
              Not a chatbot. Not an assistant. A cognitive engine that tracks your biology, 
              spots patterns you miss, and tells you exactly what to do next. 72 hour predictions. 
              Real time adjustments. Learns your biology over time.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 animate-fade-in">
              <Button size="lg" className="gap-2 rounded-full px-8" onClick={() => navigate('/nova/chat')}>
                <span>Chat with Nova</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 rounded-full px-8" onClick={() => navigate('/nova/insights')}>
                <ChartIcon className="w-4 h-4" />
                <span>View Analytics</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Stats */}
      <div className="border-b border-mist/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 animate-fade-in">
            {coreStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-signal-green mb-2 tracking-tight leading-none">{stat.value}</div>
                <div className="text-sm sm:text-base md:text-body font-semibold text-carbon mb-1">{stat.label}</div>
                <div className="text-xs sm:text-sm text-ash">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What Makes Nova Different */}
      <div className="border-b border-mist/30 bg-gradient-to-b from-ivory to-pearl/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12 sm:py-16 md:py-20">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-carbon mb-3 sm:mb-4 tracking-tight">What Nova Does</h2>
            <p className="text-sm sm:text-base md:text-body text-ash max-w-2xl mx-auto">A cognitive engine, not a wellness app.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 animate-fade-in">
            {capabilities.map((capability, index) => (
              <Card key={index} className="border-mist/30 hover:border-mist transition-all hover:shadow-md">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center mb-6 shadow-sm">
                    <capability.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-body font-semibold text-carbon mb-3">{capability.title}</h3>
                  <p className="text-sm text-ash leading-relaxed mb-6">{capability.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {capability.stats.map((stat, i) => (
                      <div key={i} className="px-3 py-1.5 rounded-full bg-pearl/50 text-caption text-carbon font-medium">
                        {stat}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* 4-Phase System */}
      <div className="border-b border-mist/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-[2.5rem] font-bold text-carbon mb-4 tracking-tight">The 4-Phase Nova System</h2>
            <p className="text-body text-ash max-w-2xl mx-auto">From assessment to autonomous optimisation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
            {phases.map((phase) => (
              <Card 
                key={phase.phase} 
                className={`border-mist/30 cursor-pointer transition-all hover:shadow-md ${activePhase === phase.phase ? 'border-accent shadow-md' : ''}`}
                onClick={() => setActivePhase(phase.phase)}
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[1.125rem] font-bold ${activePhase === phase.phase ? 'bg-accent text-ivory' : 'bg-pearl text-ash'} transition-colors`}>
                      {phase.phase}
                    </div>
                    <div>
                      <div className="text-body font-semibold text-carbon">{phase.title}</div>
                      <div className="text-caption text-ash">{phase.duration}</div>
                    </div>
                  </div>
                  <p className="text-sm text-ash leading-relaxed mb-6">{phase.description}</p>
                  <div className="space-y-2">
                    {phase.metrics.map((metric, i) => (
                      <div key={i} className="text-caption text-carbon font-medium">• {metric}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center animate-fade-in">
            <Button size="lg" className="gap-2 rounded-full px-8" onClick={() => navigate('/nova/optimization')}>
              <Target className="w-4 h-4" />
              <span>Explore Protocol Optimisation</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Real-Time Simulation */}
      <div className="border-b border-mist/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-20">
          <RealTimeSimulation />
        </div>
      </div>

      {/* Research Foundation */}
      <div className="border-b border-mist/30 bg-gradient-to-b from-ivory to-pearl/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center mx-auto mb-8 shadow-sm">
              <Database className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-[2.5rem] font-bold text-carbon mb-6 tracking-tight">Built on 10,000+ Peer-Reviewed Studies</h2>
            <p className="text-body text-ash leading-relaxed mb-12">
              Every recommendation is traceable to clinical evidence with strength ratings. 
              Our knowledge base is updated weekly with the latest longevity research.
            </p>
            <div className="grid grid-cols-3 gap-8 mb-12">
              {[
                { value: "10K+", label: "Studies", icon: Database },
                { value: "A-F", label: "Evidence Grades", icon: Shield },
                { value: "Weekly", label: "Updates", icon: Zap }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-signal-green mb-2">{item.value}</div>
                  <div className="text-sm text-ash">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-carbon to-slate">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-6">Ready to Optimise Your Performance?</h2>
          <p className="text-pearl/80 mb-8 max-w-2xl mx-auto">
            Start your personalised journey with Nova today. Connect your devices and let the AI learn your unique biology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-carbon rounded-full px-8" onClick={() => navigate('/nova/chat')}>
              Start with Nova
            </Button>
            <Button size="lg" variant="outline" className="border-pearl/30 text-pearl hover:bg-pearl/10 rounded-full px-8" onClick={() => navigate('/nova/devices')}>
              Connect Devices
            </Button>
          </div>
        </div>
      </div>
    </div>
    </NovaSwipeWrapper>
  );
}