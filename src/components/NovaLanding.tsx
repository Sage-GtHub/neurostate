import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  Activity, 
  TrendingUp, 
  Target, 
  Sparkles,
  ArrowRight,
  Shield,
  Database,
  Zap
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const NovaLanding = () => {
  const navigate = useNavigate();
  const [activePhase, setActivePhase] = useState<number>(1);
  
  const hero = useScrollAnimation();
  const stats = useScrollAnimation();
  const capabilities = useScrollAnimation();
  const phases = useScrollAnimation();
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
      stats: ["1000+ daily updates", "Zero user input", "15% efficacy improvement/90 days"]
    },
    {
      icon: Database,
      title: "Genomic Integration",
      description: "Analyses genetic variants to personalise supplement protocols, sleep timing, and recovery strategies",
      stats: ["500K+ SNPs analysed", "12 adjustments/month", "98% precision"]
    },
    {
      icon: Sparkles,
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

  const phasesData = [
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
    <div className="bg-white">
      {/* Hero Section */}
      <section ref={hero.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-pearl/30 to-white transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 sm:mb-8 border-accent/30 text-accent">
            <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
            <span className="text-xs sm:text-sm">The world's most sophisticated wellness AI</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-carbon mb-4 sm:mb-6 leading-[1.1]">
            AI That Knows You
            <br />
            <span className="font-normal">Better Than You Know Yourself</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-ash leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12">
            Processing 15+ data sources through 100M+ parameters to deliver genomic-level personalisation, 72-hour health predictions, and fully autonomous optimisation. Built on 10,000+ peer-reviewed studies and continuously learning from your unique biology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button size="sm" className="bg-carbon text-white hover:bg-slate rounded-full group min-h-[44px]" onClick={() => navigate('/nova')}>
              <span>Start with Nova</span>
              <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="sm" variant="outline" className="border-carbon/20 text-carbon hover:bg-carbon/5 rounded-full min-h-[44px]" onClick={() => navigate('/nova/insights')}>
              <span>View Analytics</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Core Stats */}
      <section ref={stats.ref} className={`relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 border-t border-mist/30 transition-all duration-1000 ${stats.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {coreStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-signal-green mb-2 tracking-tight leading-none">{stat.value}</div>
                <div className="text-sm sm:text-base font-medium text-carbon mb-1">{stat.label}</div>
                <div className="text-xs sm:text-sm text-ash">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Nova Different */}
      <section ref={capabilities.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl/30 transition-all duration-1000 ${capabilities.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-carbon mb-3 sm:mb-4 tracking-tight">What Makes Nova Different</h3>
            <p className="text-sm sm:text-base text-ash max-w-2xl mx-auto">The most advanced wellness AI ever built</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {capabilitiesData.map((capability, index) => (
              <Card key={index} className="border-mist/30 hover:border-signal-green/30 hover:shadow-sm transition-all bg-white">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-signal-green/10 flex items-center justify-center mb-6">
                    <capability.icon className="w-6 h-6 text-signal-green" />
                  </div>
                  <h4 className="text-base font-medium text-carbon mb-3">{capability.title}</h4>
                  <p className="text-sm text-ash leading-relaxed mb-6">{capability.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {capability.stats.map((stat, i) => (
                      <div key={i} className="px-3 py-1.5 rounded-full bg-signal-green/10 text-xs text-carbon font-medium">
                        {stat}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Phase System */}
      <section ref={phases.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${phases.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-carbon mb-3 sm:mb-4 tracking-tight">The 4-Phase Nova System</h3>
            <p className="text-sm sm:text-base text-ash max-w-2xl mx-auto">From assessment to autonomous optimisation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {phasesData.map((phase) => (
              <Card 
                key={phase.phase} 
                className={`border-mist/30 cursor-pointer transition-all hover:shadow-sm ${activePhase === phase.phase ? 'border-signal-green shadow-sm' : ''}`}
                onClick={() => setActivePhase(phase.phase)}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-medium ${activePhase === phase.phase ? 'bg-signal-green text-white' : 'bg-pearl text-ash'} transition-colors`}>
                      {phase.phase}
                    </div>
                    <div>
                      <div className="text-base font-medium text-carbon">{phase.title}</div>
                      <div className="text-xs text-ash">{phase.duration}</div>
                    </div>
                  </div>
                  <p className="text-sm text-ash leading-relaxed mb-6">{phase.description}</p>
                  <div className="space-y-2">
                    {phase.metrics.map((metric, i) => (
                      <div key={i} className="text-xs text-carbon font-medium flex items-center gap-2">
                        <span className="w-1 h-1 bg-signal-green rounded-full"></span>
                        {metric}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="sm" className="bg-carbon text-white hover:bg-slate rounded-full group min-h-[44px]" onClick={() => navigate('/nova/optimization')}>
              <Target className="w-4 h-4 mr-2" />
              <span>Explore Protocol Optimisation</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Research Foundation */}
      <section ref={research.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl/30 transition-all duration-1000 ${research.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-signal-green/10 flex items-center justify-center mx-auto mb-8">
            <Database className="w-8 h-8 text-signal-green" />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-carbon mb-6 tracking-tight">Built on 10,000+ Peer-Reviewed Studies</h3>
          <p className="text-base sm:text-lg text-ash leading-relaxed mb-12">
            Every recommendation is traceable to clinical evidence with strength ratings. Our knowledge base is updated weekly with the latest longevity research.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 mb-12">
            {[
              { value: "10K+", label: "Studies" },
              { value: "A-F", label: "Evidence Grades" },
              { value: "Weekly", label: "Updates" }
            ].map((item, i) => (
              <div key={i}>
                <div className="text-4xl sm:text-5xl font-light text-signal-green mb-2">{item.value}</div>
                <div className="text-sm text-ash">{item.label}</div>
              </div>
            ))}
          </div>
          <Button size="sm" variant="outline" className="border-carbon/20 text-carbon hover:bg-carbon/5 rounded-full min-h-[44px]" onClick={() => navigate('/nova/overview')}>
            <span>View Full Nova Overview</span>
          </Button>
        </div>
      </section>
    </div>
  );
};
