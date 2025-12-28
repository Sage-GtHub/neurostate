import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  Activity, 
  TrendingUp, 
  ArrowRight,
  Shield,
  Database,
  MessageSquare,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const NovaLanding = () => {
  const navigate = useNavigate();
  
  const hero = useScrollAnimation();
  const stats = useScrollAnimation();
  const capabilities = useScrollAnimation();
  const research = useScrollAnimation();

  const coreStats = [
    { value: "100M+", label: "AI Parameters" },
    { value: "91%", label: "Prediction Accuracy" },
    { value: "72hr", label: "Health Forecasts" },
    { value: "500K", label: "SNPs Analysed" }
  ];

  const capabilitiesData = [
    {
      icon: Brain,
      title: "Multi-Modal Intelligence",
      description: "Processes biometric data, genetic information, lifestyle inputs, and environmental factors simultaneously.",
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "72-hour advance predictions for burnout, illness, performance dips, and optimal training windows.",
    },
    {
      icon: Activity,
      title: "Adaptive Learning",
      description: "Continuously learns from individual responses to refine recommendations in real-time.",
    },
    {
      icon: Database,
      title: "Genomic Integration",
      description: "Analyses genetic variants to personalise supplement protocols, sleep timing, and recovery strategies.",
    },
    {
      icon: MessageSquare,
      title: "Natural Language Interface",
      description: "Conversational AI that understands context, learns preferences, and provides empathetic responses.",
    },
    {
      icon: Shield,
      title: "Privacy-First Architecture",
      description: "Zero-knowledge encryption, on-device processing, and full user data sovereignty.",
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section 
        ref={hero.ref} 
        className={`py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-6">AI Cognitive Engine</p>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 leading-[1.1] tracking-tight">
            AI That Knows You
            <br />
            <span className="text-muted-foreground">Better Than You Know Yourself</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            Processing 15+ data sources through 100M+ parameters to deliver genomic-level personalisation, 72-hour health predictions, and fully autonomous optimisation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/nova/chat')}
            >
              Chat with Nova
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/nova/overview')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Core Stats */}
      <section 
        ref={stats.ref} 
        className={`py-20 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 border-y border-border bg-muted/30 transition-all duration-1000 ${stats.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {coreStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-medium text-primary mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section 
        ref={capabilities.ref} 
        className={`py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${capabilities.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium mb-4">Capabilities</p>
            <h3 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight">
              What Makes Nova Different
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {capabilitiesData.map((capability, index) => (
              <div 
                key={index} 
                className="bg-background p-8 md:p-10 group hover:bg-muted/30 transition-colors"
              >
                <capability.icon className="w-6 h-6 text-primary mb-6" />
                <h4 className="text-base font-medium text-foreground mb-3">{capability.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Foundation */}
      <section 
        ref={research.ref} 
        className={`py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 xl:px-32 border-t border-border bg-muted/30 transition-all duration-1000 ${research.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium mb-6">Research Foundation</p>
          
          <h3 className="text-3xl md:text-4xl font-medium text-foreground mb-6 tracking-tight">
            Built on 10,000+ Peer-Reviewed Studies
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Every recommendation is traceable to clinical evidence. Our knowledge base is updated weekly with the latest longevity research.
          </p>
          
          <div className="flex items-center justify-center gap-12 mb-12">
            {[
              { value: "10K+", label: "Studies" },
              { value: "A-F", label: "Evidence Grades" },
              { value: "Weekly", label: "Updates" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-medium text-primary mb-2">
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
          
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/nova/overview')}
          >
            View Full Overview
          </Button>
        </div>
      </section>
    </div>
  );
};
