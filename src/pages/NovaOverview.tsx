import { useState } from "react";
import { NovaNav } from "@/components/NovaNav";
import { Button } from "@/components/ui/button";
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
    { value: "500K", label: "SNPs Analyzed", desc: "Genomic integration" }
  ];

  const capabilities = [
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
      description: "Analyzes genetic variants to personalize supplement protocols, sleep timing, and recovery strategies",
      stats: ["500K+ SNPs analyzed", "12 adjustments/month", "98% precision"]
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
      title: "Optimize",
      duration: "Days 8-30",
      description: "Active experimentation and rapid optimization through controlled interventions",
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
      description: "Fully autonomous health optimization with minimal user input required",
      metrics: ["Continuous monitoring", "Autonomous adjustments", "Long-term tracking", "Minimal input"]
    }
  ];

  const techStack = [
    { category: "Frontend", tech: "React Native", detail: "Cross-platform native experience" },
    { category: "AI Models", tech: "GPT-4 + XGBoost + LSTM", detail: "15+ specialized models" },
    { category: "ML Training", tech: "PyTorch + Ray", detail: "Distributed model training" },
    { category: "Database", tech: "PostgreSQL + TimescaleDB", detail: "Relational + time-series data" },
    { category: "Security", tech: "AES-256 + TLS 1.3", detail: "Data at rest and in transit" },
    { category: "Compliance", tech: "HIPAA + GDPR + SOC 2", detail: "Healthcare compliance" }
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      {/* Hero Section */}
      <div className="border-b border-mist/30 bg-gradient-to-b from-ivory via-pearl/20 to-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-caption font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>The world's most sophisticated wellness AI</span>
            </div>
            <h1 className="text-[3rem] md:text-[4rem] font-bold text-carbon tracking-tight mb-6 leading-none animate-fade-in">
              AI That Knows You Better Than You Know Yourself
            </h1>
            <p className="text-body text-ash leading-relaxed max-w-3xl mx-auto mb-12 animate-fade-in">
              Processing 15+ data sources through 100M+ parameters to deliver genomic-level personalization, 72-hour health predictions, and fully autonomous optimization. Built on 10,000+ peer-reviewed studies and continuously learning from your unique biology.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in">
              <Button size="lg" className="gap-2 rounded-full px-8" onClick={() => navigate('/nova')}>
                <span>Start with Nova</span>
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
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
            {coreStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-[3.5rem] font-bold text-carbon mb-2 tracking-tight leading-none">{stat.value}</div>
                <div className="text-body font-semibold text-carbon mb-1">{stat.label}</div>
                <div className="text-sm text-ash">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What Makes Nova Different */}
      <div className="border-b border-mist/30 bg-gradient-to-b from-ivory to-pearl/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-[2.5rem] font-bold text-carbon mb-4 tracking-tight">What Makes Nova Different</h2>
            <p className="text-body text-ash max-w-2xl mx-auto">The most advanced wellness AI ever built</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
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
            <p className="text-body text-ash max-w-2xl mx-auto">From assessment to autonomous optimization</p>
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
              <span>Explore Protocol Optimization</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="border-b border-mist/30 bg-gradient-to-b from-ivory to-pearl/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-[2.5rem] font-bold text-carbon mb-4 tracking-tight">Enterprise-Grade Infrastructure</h2>
            <p className="text-body text-ash max-w-2xl mx-auto">Built on cutting-edge technology stack</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {techStack.map((item, index) => (
              <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-pearl/50 to-ivory border border-mist/30">
                <div className="text-caption text-ash uppercase tracking-wider font-medium mb-2">{item.category}</div>
                <div className="text-body font-semibold text-carbon mb-1">{item.tech}</div>
                <div className="text-sm text-ash">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Research Foundation */}
      <div className="border-b border-mist/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center mx-auto mb-8 shadow-sm">
              <Database className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-[2.5rem] font-bold text-carbon mb-6 tracking-tight">Built on 10,000+ Peer-Reviewed Studies</h2>
            <p className="text-body text-ash leading-relaxed mb-12">
              Every recommendation is traceable to clinical evidence with strength ratings. Our knowledge base is updated weekly with the latest longevity research.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 mb-12">
              {[
                { value: "10K+", label: "Studies" },
                { value: "Weekly", label: "Updates" },
                { value: "500+", label: "Clinical researchers" }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-[2.5rem] font-bold text-carbon mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-sm text-ash">{stat.label}</div>
                </div>
              ))}
            </div>
            <Button size="lg" className="gap-2 rounded-full px-8" onClick={() => navigate('/resources')}>
              <span>Explore Research Library</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-carbon to-slate text-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-[2.5rem] font-bold mb-6 tracking-tight">Ready to experience Nova?</h2>
            <p className="text-body text-pearl/90 leading-relaxed mb-12">
              Start your journey to genomic-level personalization and autonomous health optimization
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" variant="outline" className="gap-2 rounded-full px-8 bg-ivory text-carbon hover:bg-pearl" onClick={() => navigate('/auth')}>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="ghost" className="gap-2 rounded-full px-8 text-ivory hover:bg-slate" onClick={() => navigate('/nova')}>
                <Zap className="w-4 h-4" />
                <span>Try Demo</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
