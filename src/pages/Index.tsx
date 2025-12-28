import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData, SoftwareApplicationStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import redlightDevice from "@/assets/redlight.webp";
import heroSupplement from "@/assets/hero-supplement.png";

const Index = () => {
  const stats = useScrollAnimation();
  const system = useScrollAnimation();
  const problems = useScrollAnimation();
  const category = useScrollAnimation();
  const nova = useScrollAnimation();
  const device = useScrollAnimation();
  const supplements = useScrollAnimation();
  const business = useScrollAnimation();
  const cta = useScrollAnimation();

  return (
    <>
      <SEO 
        title="AI Cognitive Performance Platform | Neurostate"
        description="Neurostate is an AI-driven cognitive performance platform that predicts focus, fatigue, and performance volatility for teams and individuals. Enterprise-grade cognitive infrastructure."
      />
      <OrganizationStructuredData />
      <SoftwareApplicationStructuredData />
      <WebsiteStructuredData />
      <LocalBusinessStructuredData />
      <div className="min-h-screen bg-background mobile-nav-padding">
        <Header />
        <main>
          <Hero />

          {/* Stats Section - Large Display Numbers */}
          <section ref={stats.ref} className={`py-24 md:py-32 px-6 md:px-12 lg:px-20 border-b border-border transition-all duration-1000 ${stats.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                {[
                  { value: "40%", label: "Reduction in cognitive volatility" },
                  { value: "72hr", label: "Performance prediction window" },
                  { value: "500+", label: "Enterprise deployments" },
                  { value: "98%", label: "Prediction accuracy" }
                ].map((stat, i) => (
                  <div 
                    key={i} 
                    className="text-center lg:text-left space-y-3"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <p className="stat-display text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground max-w-[180px] mx-auto lg:mx-0">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The Platform - Asymmetric Grid */}
          <section ref={system.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 bg-background transition-all duration-1000 ${system.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-[1400px] mx-auto">
              <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-start">
                {/* Left - Heading */}
                <div className="lg:col-span-5 lg:sticky lg:top-32">
                  <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-6">The Platform</p>
                  <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-foreground leading-[1.1] tracking-tight mb-8">
                    Three integrated systems.
                    <br />
                    <span className="text-muted-foreground">One cognitive OS.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                    A complete infrastructure for predicting, measuring, and optimising cognitive performance.
                  </p>
                </div>

                {/* Right - Cards */}
                <div className="lg:col-span-7 space-y-4">
                  {[
                    { 
                      title: "Nova AI Engine", 
                      desc: "Cognitive Forecasting",
                      detail: "Predictive cognitive modelling with multi-model AI. Real-time performance forecasting and risk prediction.",
                      num: "01"
                    },
                    { 
                      title: "Execution Layer", 
                      desc: "Precision Supplements", 
                      detail: "Biological optimisation components. Research-backed formulas for peak cognitive output.",
                      num: "02"
                    },
                    { 
                      title: "Neuromodulation", 
                      desc: "Brain State Control", 
                      detail: "Red light therapy and photobiomodulation. Alpha and beta state switching for cognitive readiness.",
                      num: "03"
                    },
                  ].map((item, i) => (
                    <div 
                      key={i}
                      className="group border border-border hover:border-primary/30 p-8 md:p-10 transition-all duration-500 card-hover bg-background"
                    >
                      <div className="flex items-start justify-between gap-8">
                        <div className="space-y-4 flex-1">
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground font-mono">{item.num}</span>
                            <div className="w-8 h-px bg-border" />
                          </div>
                          <h3 className="text-xl font-medium text-foreground">{item.title}</h3>
                          <p className="text-primary text-sm font-medium">{item.desc}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">{item.detail}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="section-divider mx-6 md:mx-12 lg:mx-20" />

          {/* Problems We Solve */}
          <section ref={problems.ref} className={`py-32 md:py-40 px-6 md:px-12 lg:px-20 bg-background transition-all duration-1000 ${problems.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-[1400px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                <div className="space-y-8 lg:sticky lg:top-32">
                  <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium">The Problem</p>
                  <h2 className="text-4xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight">
                    Cognitive risk without prediction.
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                    Traditional approaches react to problems. Our cognitive infrastructure predicts and prevents performance volatility before it impacts output.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Focus volatility",
                    "Performance unpredictability",
                    "Cognitive fatigue",
                    "Decision degradation",
                    "Recovery blindness",
                    "Stress accumulation",
                    "Output instability",
                    "Readiness gaps"
                  ].map((problem, i) => (
                    <div 
                      key={i} 
                      className="group p-6 border border-border hover:border-foreground/20 transition-all duration-300"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      <p className="text-sm text-foreground">{problem}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Category Creation - Clean Style */}
          <section ref={category.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 bg-muted/30 grain-texture transition-all duration-1000 ${category.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="text-center mb-20 md:mb-24 space-y-6 max-w-3xl mx-auto">
                <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium">The Difference</p>
                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-foreground leading-[1.1] tracking-tight">
                  Predictive infrastructure.
                  <br />
                  <span className="text-muted-foreground">Not reactive wellness.</span>
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                {/* Dead Solutions */}
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-8 font-medium">Reactive approaches</p>
                  {[
                    { item: "Apps that respond after burnout", status: "Reactive" },
                    { item: "Generic wellness with no data", status: "Unmeasured" },
                    { item: "No performance prediction", status: "Blind" },
                    { item: "Interventions after breakdown", status: "Too late" }
                  ].map((entry, i) => (
                    <div 
                      key={i} 
                      className="group flex items-center gap-4 p-5 bg-background border-l-2 border-destructive/30"
                    >
                      <X className="w-4 h-4 text-destructive/60 flex-shrink-0" />
                      <span className="text-muted-foreground line-through text-sm flex-1">{entry.item}</span>
                      <span className="text-[10px] text-destructive/60 uppercase tracking-wider font-medium">{entry.status}</span>
                    </div>
                  ))}
                </div>

                {/* Neurostate Infrastructure */}
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-8 font-medium">Predictive infrastructure</p>
                  {[
                    { outcome: "Cognitive Forecasting", metric: "72-hour performance prediction" },
                    { outcome: "Risk Detection", metric: "Identify volatility before impact" },
                    { outcome: "Readiness Measurement", metric: "Quantified cognitive capacity" },
                    { outcome: "Performance Stabilisation", metric: "40% reduction in variability" },
                    { outcome: "Autonomous Optimisation", metric: "AI-driven adjustments" }
                  ].map((entry, i) => (
                    <div 
                      key={i} 
                      className="group flex items-start gap-4 p-5 bg-background border-l-2 border-primary/50 hover:border-primary transition-colors duration-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-foreground font-medium text-sm block">{entry.outcome}</span>
                        <p className="text-muted-foreground text-xs mt-1">{entry.metric}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Nova AI Section */}
          <section ref={nova.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 bg-background transition-all duration-1000 ${nova.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-[1400px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium">AI Engine</p>
                    <h2 className="text-4xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight">
                      Nova — Cognitive Performance Forecasting
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                      Nova is our multi-model AI engine for predictive cognitive modelling. It forecasts performance states, detects risk patterns, and delivers real-time analytics.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-4">
                    {[
                      "Personalised coaching",
                      "Adaptive recommendations",
                      "Behavioural insights",
                      "Wearable integration"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/nova/overview">
                    <Button size="lg" className="h-14 px-8 rounded-none bg-foreground text-background hover:bg-foreground/90 group">
                      Explore Nova
                      <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                {/* Nova Preview Card */}
                <div className="relative">
                  <div className="border border-border p-8 space-y-6 card-hover">
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-medium text-sm">N</span>
                        </div>
                        <div>
                          <p className="text-foreground font-medium text-sm">Nova</p>
                          <p className="text-muted-foreground text-xs">7-Day Forecast</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-xs text-muted-foreground">Live</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {["Today", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                        <div 
                          key={i} 
                          className={`p-3 text-center transition-all duration-300 ${i === 0 ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50 hover:bg-muted'}`}
                        >
                          <p className="text-[10px] text-muted-foreground uppercase mb-2">{day}</p>
                          <div className={`w-2 h-2 mx-auto rounded-full mb-2 ${i <= 1 || i >= 5 ? 'bg-primary' : i === 3 ? 'bg-destructive' : 'bg-yellow-500'}`} />
                          <p className="text-foreground text-xs font-medium">{[85, 82, 68, 55, 72, 88, 90][i]}%</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "68", label: "HRV" },
                        { value: "7.8", label: "Sleep" },
                        { value: "85%", label: "Recovery" }
                      ].map((metric, i) => (
                        <div key={i} className="bg-muted/50 p-4 text-center">
                          <p className="text-foreground text-2xl font-light">{metric.value}</p>
                          <p className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section Divider */}
          <div className="section-divider mx-6 md:mx-12 lg:mx-20" />

          {/* Hardware Section */}
          <section ref={device.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 bg-background transition-all duration-1000 ${device.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-[1400px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="order-last lg:order-first img-scale">
                  <img 
                    src={redlightDevice} 
                    alt="NeuroState Red Light Therapy Device" 
                    className="w-full h-auto"
                  />
                </div>

                <div className="space-y-8">
                  <div className="space-y-6">
                    <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium">Neuromodulation</p>
                    <h2 className="text-4xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight">
                      Red Light Therapy for Cognitive Performance
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                      Engineered to deliver photobiomodulation. Enhance focus, accelerate recovery, and improve mental clarity.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      "660nm and 850nm wavelengths",
                      "Alpha state for recovery",
                      "Beta state for focus",
                      "Clinical protocols"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/category/devices">
                    <Button size="lg" className="h-14 px-8 rounded-none bg-foreground text-background hover:bg-foreground/90 group">
                      View devices
                      <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Supplements Section */}
          <section ref={supplements.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 bg-muted/30 grain-texture transition-all duration-1000 ${supplements.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium">Execution Layer</p>
                    <h2 className="text-4xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight">
                      Precision Supplements for Focus and Recovery
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                      Every ingredient at the dose that works. No proprietary blends. Research-backed formulas designed for cognitive optimisation.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "Focus optimisation", desc: "Targeted enhancement" },
                      { title: "Clinical dosing", desc: "Evidence-based" },
                      { title: "Clean formulas", desc: "No fillers" },
                      { title: "Bioavailable", desc: "Maximum absorption" }
                    ].map((item, i) => (
                      <div key={i} className="p-4 border border-border/50 bg-background">
                        <p className="text-foreground text-sm font-medium">{item.title}</p>
                        <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/category/supplements">
                    <Button size="lg" className="h-14 px-8 rounded-none bg-foreground text-background hover:bg-foreground/90 group">
                      Shop supplements
                      <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                <div className="img-scale">
                  <img 
                    src={heroSupplement} 
                    alt="NeuroState Precision Supplements" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Enterprise Section */}
          <section ref={business.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 bg-foreground text-background transition-all duration-1000 ${business.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-[1400px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-8">
                  <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium">Enterprise</p>
                  <h2 className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight">
                    Deploy cognitive infrastructure at scale
                  </h2>
                  <p className="text-lg text-background/70 leading-relaxed max-w-lg">
                    From elite sports to Fortune 500 teams. Our platform scales cognitive performance across your entire organisation.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link to="/enterprise">
                      <Button 
                        size="lg" 
                        className="h-14 px-8 rounded-none bg-background text-foreground hover:bg-background/90 group"
                      >
                        Learn more
                        <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button 
                        size="lg" 
                        variant="ghost"
                        className="h-14 px-8 rounded-none text-background hover:text-primary hover:bg-transparent"
                      >
                        Contact sales
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "500+", label: "Enterprise clients" },
                    { value: "50K+", label: "Active users" },
                    { value: "12", label: "Countries" },
                    { value: "99.9%", label: "Uptime SLA" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-8 border border-background/20">
                      <p className="text-4xl md:text-5xl font-light mb-2">{stat.value}</p>
                      <p className="text-sm text-background/60">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section ref={cta.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 bg-background transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-[800px] mx-auto text-center space-y-10">
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-foreground leading-[1.1] tracking-tight">
                Ready to optimise cognitive performance?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Join the organisations using Neurostate to predict, measure, and enhance cognitive output.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    className="h-14 px-10 rounded-none bg-foreground text-background hover:bg-foreground/90 group"
                  >
                    Get started
                    <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/nova/overview">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="h-14 px-10 rounded-none border-border text-foreground hover:bg-muted"
                  >
                    Explore Nova
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;