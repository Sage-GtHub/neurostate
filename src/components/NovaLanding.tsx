import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  Activity, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  Shield,
  Database,
  MessageSquare,
  Zap
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const NovaLanding = () => {
  const navigate = useNavigate();
  
  const hero = useScrollAnimation();
  const stats = useScrollAnimation();
  const capabilities = useScrollAnimation();
  const research = useScrollAnimation();

  const coreStats = [
    { value: "100M+", label: "AI Parameters", desc: "Multi-model ensemble" },
    { value: "91%", label: "Prediction Accuracy", desc: "Continuously learning" },
    { value: "72hr", label: "Health Forecasts", desc: "Advance predictions" },
    { value: "500K", label: "SNPs Analysed", desc: "Genomic integration" }
  ];

  const capabilitiesData = [
    {
      icon: Brain,
      title: "Multi-Modal Intelligence",
      description: "Processes biometric data, genetic information, lifestyle inputs, and environmental factors simultaneously",
      stats: ["15+ data sources", "100M+ parameters", "<50ms latency"]
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "72-hour advance predictions for burnout, illness, performance dips, and optimal training windows",
      stats: ["91% accuracy", "24 health markers", "Real-time updates"]
    },
    {
      icon: Activity,
      title: "Adaptive Learning",
      description: "Continuously learns from individual responses to refine recommendations in real-time",
      stats: ["1000+ daily updates", "Zero user input", "15% efficacy improvement"]
    },
    {
      icon: Database,
      title: "Genomic Integration",
      description: "Analyses genetic variants to personalise supplement protocols, sleep timing, and recovery strategies",
      stats: ["500K+ SNPs analysed", "12 adjustments/month", "98% precision"]
    },
    {
      icon: MessageSquare,
      title: "Natural Language Interface",
      description: "Conversational AI that understands context, learns preferences, and provides empathetic responses",
      stats: ["95% intent accuracy", "0.3s latency", "40+ languages"]
    },
    {
      icon: Shield,
      title: "Privacy-First Architecture",
      description: "Zero-knowledge encryption, on-device processing, and full user data sovereignty",
      stats: ["AES-256 encryption", "GDPR compliant", "Local processing"]
    }
  ];

  return (
    <div className="bg-nova-bg">
      {/* Hero Section - Premium Glassmorphism */}
      <section 
        ref={hero.ref} 
        className={`relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 overflow-hidden transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-nova-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-nova-accent-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nova-glass border border-nova-border backdrop-blur-xl mb-8">
            <div className="w-2 h-2 rounded-full bg-nova-accent animate-pulse" />
            <Sparkles className="w-3 h-3 text-nova-accent" />
            <span className="text-xs font-medium tracking-widest uppercase text-nova-accent">The world's most sophisticated wellness AI</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-nova-text mb-6 leading-[1.05] tracking-tight">
            AI That Knows You
            <br />
            <span className="bg-gradient-to-r from-nova-accent via-nova-accent-secondary to-nova-accent bg-clip-text text-transparent">
              Better Than You Know Yourself
            </span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-nova-text-muted leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12">
            Processing 15+ data sources through 100M+ parameters to deliver genomic-level personalisation, 72-hour health predictions, and fully autonomous optimisation. Built on 10,000+ peer-reviewed studies and continuously learning from your unique biology.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button 
              size="lg" 
              className="h-14 px-8 gap-3 bg-gradient-to-r from-nova-accent to-nova-accent-secondary hover:opacity-90 text-white rounded-xl shadow-lg shadow-nova-accent/25 transition-all duration-300 hover:shadow-xl hover:shadow-nova-accent/30 hover:scale-[1.02] group" 
              onClick={() => navigate('/nova/chat')}
            >
              <Sparkles className="w-4 h-4" />
              <span>Chat with Nova</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 bg-nova-glass border-nova-border text-nova-text hover:bg-nova-surface-hover backdrop-blur-xl rounded-xl transition-all duration-300" 
              onClick={() => navigate('/nova/overview')}
            >
              <span>Learn More</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Stats - Premium Glassmorphism */}
      <section 
        ref={stats.ref} 
        className={`relative py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 border-y border-nova-border transition-all duration-1000 ${stats.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="absolute inset-0 bg-nova-glass backdrop-blur-xl" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {coreStats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-nova-accent to-nova-accent-secondary bg-clip-text text-transparent mb-3 tracking-tight leading-none group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-medium text-nova-text mb-1">{stat.label}</div>
                <div className="text-xs sm:text-sm text-nova-text-muted">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Nova Different - Premium Grid */}
      <section 
        ref={capabilities.ref} 
        className={`relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${capabilities.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-nova-surface to-nova-bg" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-nova-text mb-4 tracking-tight">
              What Makes Nova Different
            </h3>
            <p className="text-sm sm:text-base text-nova-text-muted max-w-2xl mx-auto">The most advanced wellness AI ever built</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilitiesData.map((capability, index) => (
              <div 
                key={index} 
                className="group relative bg-nova-surface rounded-2xl p-8 border border-nova-border hover:border-nova-accent/50 transition-all duration-500 hover:shadow-xl hover:shadow-nova-accent/10"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-nova-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-nova-accent/20 to-nova-accent-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <capability.icon className="w-7 h-7 text-nova-accent" />
                  </div>
                  
                  <h4 className="text-base font-semibold text-nova-text mb-3">{capability.title}</h4>
                  <p className="text-sm text-nova-text-muted leading-relaxed mb-6">{capability.description}</p>
                  
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
            ))}
          </div>
        </div>
      </section>

      {/* Research Foundation - Premium Stats */}
      <section 
        ref={research.ref} 
        className={`relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 border-t border-nova-border transition-all duration-1000 ${research.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-nova-accent/20 to-nova-accent-secondary/20 flex items-center justify-center mx-auto mb-8">
            <Database className="w-10 h-10 text-nova-accent" />
          </div>
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-nova-text mb-6 tracking-tight">
            Built on 10,000+ Peer-Reviewed Studies
          </h3>
          <p className="text-base sm:text-lg text-nova-text-muted leading-relaxed mb-12 max-w-2xl mx-auto">
            Every recommendation is traceable to clinical evidence with strength ratings. Our knowledge base is updated weekly with the latest longevity research.
          </p>
          
          <div className="flex items-center justify-center gap-8 sm:gap-16 mb-12">
            {[
              { value: "10K+", label: "Studies" },
              { value: "A-F", label: "Evidence Grades" },
              { value: "Weekly", label: "Updates" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-nova-accent to-nova-accent-secondary bg-clip-text text-transparent mb-2">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-nova-text-muted">{item.label}</div>
              </div>
            ))}
          </div>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="h-14 px-8 bg-nova-glass border-nova-border text-nova-text hover:bg-nova-surface-hover backdrop-blur-xl rounded-xl transition-all duration-300" 
            onClick={() => navigate('/nova/overview')}
          >
            <span>View Full Nova Overview</span>
          </Button>
        </div>
      </section>
    </div>
  );
};
