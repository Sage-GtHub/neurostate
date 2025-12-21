import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SoftwareApplicationStructuredData } from "@/components/StructuredData";
import { ChatDemo } from "@/components/nova/ChatDemo";
import { ArrowRight, BarChart3 } from "lucide-react";

export default function NovaOverview() {
  const navigate = useNavigate();

  const coreStats = [
    { value: "100M+", label: "AI Parameters", desc: "Multi-model ensemble" },
    { value: "91%", label: "Prediction Accuracy", desc: "Continuously learning" },
    { value: "72hr", label: "Health Forecasts", desc: "Advance predictions" },
    { value: "500K", label: "SNPs Analysed", desc: "Genomic integration" }
  ];

  const capabilities = [
    {
      title: "Predicts Your State",
      description: "72 hour advance predictions for burnout, illness, performance dips, and optimal training windows",
      stats: ["91% accuracy", "24 health markers", "Real time updates"]
    },
    {
      title: "Adapts Your Protocol",
      description: "Continuously adjusts your supplement stack and recommendations based on real biometric data",
      stats: ["1000+ daily updates", "Zero user input", "15% efficacy improvement"]
    },
    {
      title: "Learns Your Biology",
      description: "Processes data from wearables, sleep, and lifestyle to build a model unique to you",
      stats: ["15+ data sources", "100M+ parameters", "<50ms latency"]
    },
    {
      title: "Integrates Your Devices",
      description: "Connects with Oura, Whoop, Apple Watch and other wearables for continuous data sync",
      stats: ["Oura Ring", "Apple Watch", "Whoop"]
    },
    {
      title: "Speaks Your Language",
      description: "Conversational interface that understands context, learns preferences, and gives direct answers",
      stats: ["95% intent accuracy", "0.3s latency", "Voice and text"]
    },
    {
      title: "Protects Your Data",
      description: "End to end encryption, on device processing, and full user data sovereignty",
      stats: ["AES-256 encryption", "GDPR compliant", "Local processing"]
    }
  ];

  const phases = [
    { phase: 1, title: "Discover", duration: "Days 1-7" },
    { phase: 2, title: "Optimise", duration: "Days 8-30" },
    { phase: 3, title: "Predict", duration: "Days 31-90" },
    { phase: 4, title: "Autonomy", duration: "Day 91+" }
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
        <section className="py-20 sm:py-28 md:py-36">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-5xl">
            <div className="text-center">
              <p className="text-accent text-xs tracking-[0.25em] uppercase font-medium mb-8">
                Cognitive Engine
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
                Nova predicts before
                <br />
                <span className="text-accent">you feel it.</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                Not a chatbot. Not an assistant. A cognitive engine that tracks your biology, 
                spots patterns you miss, and tells you exactly what to do next.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="h-12 px-8 gap-2 text-sm font-medium" 
                  onClick={() => navigate('/nova/chat')}
                >
                  Chat with Nova
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-12 px-8 gap-2 text-sm font-medium" 
                  onClick={() => navigate('/nova/insights')}
                >
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-y border-border">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {coreStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Nova Does */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                What Nova Does
              </h2>
              <p className="text-muted-foreground">A cognitive engine, not a wellness app.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {capabilities.map((capability, index) => (
                <div 
                  key={index} 
                  className="bg-background p-8 sm:p-10 hover:bg-muted/30 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {capability.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {capability.stats.map((stat, i) => (
                      <span 
                        key={i} 
                        className="text-xs text-muted-foreground border border-border px-3 py-1"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Chat Demo */}
        <ChatDemo />

        {/* 4-Phase System */}
        <section className="py-20 sm:py-28 border-t border-border">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                The 4-Phase System
              </h2>
              <p className="text-muted-foreground">From assessment to autonomous optimisation</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-0">
              {phases.map((phase, index) => (
                <div 
                  key={phase.phase} 
                  className="flex-1 text-center py-8 sm:py-12 px-6 border border-border sm:border-l-0 first:sm:border-l hover:bg-muted/30 transition-colors"
                >
                  <div className="text-4xl sm:text-5xl font-bold text-accent mb-3">
                    {phase.phase}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {phase.title}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {phase.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Foundation */}
        <section className="py-20 sm:py-28 border-t border-border">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Built on 10,000+ Peer-Reviewed Studies
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-12">
              Every recommendation is traceable to clinical evidence with strength ratings. 
              Our knowledge base is updated weekly with the latest longevity research.
            </p>
            <div className="flex items-center justify-center gap-12 sm:gap-20">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-1">10K+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Studies</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-1">A-F</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Evidence</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-1">Weekly</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Updates</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28 border-t border-border bg-foreground text-background">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
              Ready to Optimise Your Performance?
            </h2>
            <p className="text-background/70 mb-10 max-w-xl mx-auto">
              Start your personalised journey with Nova today. Connect your devices and let the AI learn your unique biology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="h-12 px-8 bg-accent hover:bg-accent/90 text-accent-foreground" 
                onClick={() => navigate('/nova/chat')}
              >
                Start with Nova
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 px-8 border-background/30 text-background hover:bg-background/10" 
                onClick={() => navigate('/nova/devices')}
              >
                Connect Devices
              </Button>
            </div>
          </div>
        </section>
      </div>
    </NovaSwipeWrapper>
  );
}
