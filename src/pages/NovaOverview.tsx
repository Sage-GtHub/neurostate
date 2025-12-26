import { NovaNav } from "@/components/NovaNav";
import { NovaSwipeWrapper } from "@/components/NovaSwipeWrapper";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SoftwareApplicationStructuredData } from "@/components/StructuredData";
import { ChatDemo } from "@/components/nova/ChatDemo";
import { 
  ArrowRight, 
  BarChart3, 
  Brain, 
  Activity, 
  TrendingUp, 
  Database, 
  MessageSquare, 
  Shield,
  Sparkles,
  Zap
} from "lucide-react";

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
      icon: Brain,
      title: "Predicts Your State",
      description: "72 hour advance predictions for burnout, illness, performance dips, and optimal training windows",
      stats: ["91% accuracy", "24 health markers", "Real time updates"]
    },
    {
      icon: Activity,
      title: "Adapts Your Protocol",
      description: "Continuously adjusts your supplement stack and recommendations based on real biometric data",
      stats: ["1000+ daily updates", "Zero user input", "15% efficacy improvement"]
    },
    {
      icon: Database,
      title: "Learns Your Biology",
      description: "Processes data from wearables, sleep, and lifestyle to build a model unique to you",
      stats: ["15+ data sources", "100M+ parameters", "<50ms latency"]
    },
    {
      icon: Zap,
      title: "Integrates Your Devices",
      description: "Connects with Oura, Whoop, Apple Watch and other wearables for continuous data sync",
      stats: ["Oura Ring", "Apple Watch", "Whoop"]
    },
    {
      icon: MessageSquare,
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
    { phase: 1, title: "Discover", duration: "Days 1-7", description: "Connect devices, complete assessment" },
    { phase: 2, title: "Optimise", duration: "Days 8-30", description: "Personalised protocol refinement" },
    { phase: 3, title: "Predict", duration: "Days 31-90", description: "72-hour health forecasting begins" },
    { phase: 4, title: "Autonomy", duration: "Day 91+", description: "Fully autonomous optimisation" }
  ];

  return (
    <NovaSwipeWrapper>
      <SEO 
        title="Nova – AI Cognitive Performance Assistant | NeuroState"
        description="Personalised protocols, predictive insights and real-time guidance to enhance focus, sleep and mental resilience. 72-hour health forecasting powered by AI."
      />
      <SoftwareApplicationStructuredData />
      <div className="min-h-screen bg-nova-bg">
        <NovaNav />
      
        {/* Hero Section - Premium Glassmorphism */}
        <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-nova-surface via-nova-bg to-nova-surface" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-nova-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-nova-accent-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="container relative mx-auto px-6 sm:px-8 lg:px-16 max-w-5xl">
            <div className="text-center">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nova-glass border border-nova-border backdrop-blur-xl mb-8 animate-fade-in">
                <div className="w-2 h-2 rounded-full bg-nova-accent animate-pulse" />
                <span className="text-xs font-medium tracking-widest uppercase text-nova-accent">Cognitive Engine</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-nova-text mb-6 leading-[1.05] tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Nova predicts before
                <br />
                <span className="bg-gradient-to-r from-nova-accent via-nova-accent-secondary to-nova-accent bg-clip-text text-transparent">
                  you feel it.
                </span>
              </h1>
              
              <p className="text-nova-text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Not a chatbot. Not an assistant. A cognitive engine that tracks your biology, 
                spots patterns you miss, and tells you exactly what to do next.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Button 
                  size="lg" 
                  className="h-14 px-8 gap-3 text-sm font-medium bg-gradient-to-r from-nova-accent to-nova-accent-secondary hover:opacity-90 text-white rounded-xl shadow-lg shadow-nova-accent/25 transition-all duration-300 hover:shadow-xl hover:shadow-nova-accent/30 hover:scale-[1.02]" 
                  onClick={() => navigate('/nova/chat')}
                >
                  <Sparkles className="w-4 h-4" />
                  Chat with Nova
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 gap-3 text-sm font-medium bg-nova-glass border-nova-border text-nova-text hover:bg-nova-surface-hover backdrop-blur-xl rounded-xl transition-all duration-300" 
                  onClick={() => navigate('/nova/insights')}
                >
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </Button>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-nova-text-muted animate-bounce">
            <span className="text-xs tracking-wider uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-nova-text-muted to-transparent" />
          </div>
        </section>

        {/* Interactive Chat Demo */}
        <ChatDemo />

        {/* Stats Bar - Premium Glassmorphism */}
        <section className="relative py-20 border-y border-nova-border">
          <div className="absolute inset-0 bg-nova-glass backdrop-blur-xl" />
          <div className="container relative mx-auto px-6 sm:px-8 lg:px-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {coreStats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-nova-accent to-nova-accent-secondary bg-clip-text text-transparent mb-3 tracking-tight group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-nova-text mb-1">{stat.label}</div>
                  <div className="text-xs text-nova-text-muted">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Nova Does - Premium Grid */}
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-nova-text mb-4 tracking-tight">
                What Nova Does
              </h2>
              <p className="text-nova-text-muted text-lg">A cognitive engine, not a wellness app.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <div 
                    key={index} 
                    className="group relative bg-nova-surface rounded-2xl p-8 border border-nova-border hover:border-nova-accent/50 transition-all duration-500 hover:shadow-xl hover:shadow-nova-accent/10"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-nova-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-nova-accent/20 to-nova-accent-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-nova-accent" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-nova-text mb-3">
                        {capability.title}
                      </h3>
                      <p className="text-sm text-nova-text-muted leading-relaxed mb-6">
                        {capability.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {capability.stats.map((stat, i) => (
                          <span 
                            key={i} 
                            className="text-xs text-nova-text-muted bg-nova-glass border border-nova-border px-3 py-1.5 rounded-full"
                          >
                            {stat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4-Phase System - Premium Timeline */}
        <section className="py-24 sm:py-32 border-t border-nova-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-nova-surface to-nova-bg" />
          
          <div className="container relative mx-auto px-6 sm:px-8 lg:px-16 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-nova-text mb-4 tracking-tight">
                The 4-Phase System
              </h2>
              <p className="text-nova-text-muted text-lg">From assessment to autonomous optimisation</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {phases.map((phase, index) => (
                <div 
                  key={phase.phase} 
                  className="group relative bg-nova-surface rounded-2xl p-8 border border-nova-border hover:border-nova-accent/50 transition-all duration-500 text-center"
                >
                  {/* Phase number with glow */}
                  <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-nova-accent/20 to-nova-accent-secondary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-full h-full rounded-full bg-nova-glass border border-nova-border flex items-center justify-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-nova-accent to-nova-accent-secondary bg-clip-text text-transparent">
                        {phase.phase}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-nova-text mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-nova-accent uppercase tracking-wider mb-3">
                    {phase.duration}
                  </p>
                  <p className="text-sm text-nova-text-muted">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Foundation - Premium Stats */}
        <section className="py-24 sm:py-32 border-t border-nova-border">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-4xl text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-nova-accent/20 to-nova-accent-secondary/20 flex items-center justify-center mx-auto mb-8">
              <Database className="w-10 h-10 text-nova-accent" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-nova-text mb-6 tracking-tight">
              Built on 10,000+ Peer-Reviewed Studies
            </h2>
            <p className="text-nova-text-muted text-base sm:text-lg leading-relaxed mb-16 max-w-2xl mx-auto">
              Every recommendation is traceable to clinical evidence with strength ratings. 
              Our knowledge base is updated weekly with the latest longevity research.
            </p>
            
            <div className="flex items-center justify-center gap-8 sm:gap-16">
              {[
                { value: "10K+", label: "Studies" },
                { value: "A-F", label: "Evidence" },
                { value: "Weekly", label: "Updates" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-nova-accent to-nova-accent-secondary bg-clip-text text-transparent mb-2">
                    {item.value}
                  </div>
                  <div className="text-xs text-nova-text-muted uppercase tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Premium Gradient */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-nova-accent via-nova-accent-secondary to-nova-accent" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGMxLjEyNSAwIDIuMjI2LS4xMDMgMy4yOTMtLjMwMSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
          
          <div className="container relative mx-auto px-6 sm:px-8 lg:px-16 max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to Optimise Your Performance?
            </h2>
            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto">
              Start your personalised journey with Nova today. Connect your devices and let the AI learn your unique biology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="h-14 px-8 bg-white text-nova-accent hover:bg-white/90 rounded-xl font-medium shadow-lg transition-all duration-300 hover:scale-[1.02]" 
                onClick={() => navigate('/nova/chat')}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start with Nova
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 border-white/30 text-white hover:bg-white/10 rounded-xl font-medium backdrop-blur-xl transition-all duration-300" 
                onClick={() => navigate('/nova/devices')}
              >
                <Activity className="w-4 h-4 mr-2" />
                Connect Devices
              </Button>
            </div>
          </div>
        </section>
      </div>
    </NovaSwipeWrapper>
  );
}
