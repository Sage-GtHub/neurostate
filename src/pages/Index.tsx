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

          {/* The Platform - Clean Minimal Style */}
          <section ref={system.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 xl:px-32 bg-background transition-all duration-1000 ${system.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20 md:mb-28 space-y-6">
                <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium">The Platform</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.1] tracking-tight">
                  Three integrated systems.
                  <br className="hidden md:block" />
                  <span className="text-muted-foreground">One cognitive operating system.</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-border">
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
                    className="group bg-background p-10 md:p-12 hover:bg-muted/30 transition-all duration-500"
                  >
                    <p className="text-xs text-muted-foreground font-mono mb-8">{item.num}</p>
                    <h3 className="text-xl font-medium text-foreground mb-2">{item.title}</h3>
                    <p className="text-primary text-sm font-medium mb-4">{item.desc}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Problems We Solve - Clean Style */}
          <section ref={problems.ref} className={`py-32 md:py-40 px-6 md:px-12 lg:px-20 xl:px-32 bg-muted/30 transition-all duration-1000 ${problems.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-6">
                  <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium">The Problem</p>
                  <h2 className="text-4xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight">
                    Cognitive risk without prediction.
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
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
                      className="group p-5 bg-background border border-border hover:border-primary/30 transition-all duration-300"
                    >
                      <p className="text-sm text-foreground">{problem}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Category Creation - Clean Style */}
          <section ref={category.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 xl:px-32 bg-background transition-all duration-1000 ${category.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20 md:mb-24 space-y-6">
                <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium">The Difference</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.1] tracking-tight">
                  Predictive infrastructure.
                  <br className="hidden md:block" />
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
                      className="group flex items-center gap-4 p-5 bg-muted/30 border-l-2 border-destructive/30"
                    >
                      <X className="w-4 h-4 text-destructive/60" />
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
                      className="group flex items-start gap-4 p-5 bg-muted/30 border-l-2 border-primary/50 hover:border-primary transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
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

          {/* Nova AI Section - Clean Style */}
          <section ref={nova.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 xl:px-32 bg-muted/30 transition-all duration-1000 ${nova.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium">AI Engine</p>
                    <h2 className="text-4xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight">
                      Nova — Cognitive Performance Forecasting Engine
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Nova is our multi-model AI engine for predictive cognitive modelling. It forecasts performance states, detects risk patterns, and delivers real-time analytics.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      "Personalised AI coaching",
                      "Adaptive recommendations",
                      "Real-time behavioural insights",
                      "Wearable integration",
                      "Protocol optimisation"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/nova/overview">
                    <Button size="lg" className="mt-4">
                      Explore Nova
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Nova Preview Card */}
                <div className="relative">
                  <div className="bg-background border border-border p-8 space-y-6">
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
                          className={`p-3 text-center ${i === 0 ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50'}`}
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
                          <p className="text-foreground text-lg font-medium">{metric.value}</p>
                          <p className="text-muted-foreground text-[10px] uppercase tracking-wider">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hardware Section - Clean Style */}
          <section ref={device.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 xl:px-32 bg-background transition-all duration-1000 ${device.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="order-last lg:order-first">
                  <img 
                    src={redlightDevice} 
                    alt="NeuroState Red Light Therapy Device" 
                    className="w-full h-auto"
                  />
                </div>

                <div className="space-y-8">
                  <div className="space-y-6">
                    <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium">Neuromodulation</p>
                    <h2 className="text-4xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight">
                      Red Light Therapy for Cognitive Performance
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Engineered to deliver photobiomodulation. Enhance focus, accelerate recovery, and improve mental clarity.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      "660nm and 850nm wavelengths",
                      "Alpha state for recovery and creativity",
                      "Beta state for focus optimisation",
                      "Clinically validated protocols"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/category/devices">
                    <Button size="lg" className="mt-4">
                      View devices
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Supplements Section - Clean Style */}
          <section ref={supplements.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 xl:px-32 bg-muted/30 transition-all duration-1000 ${supplements.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium">Execution Layer</p>
                    <h2 className="text-4xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight">
                      Precision Supplements for Focus and Recovery
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Every ingredient at the dose that works. No proprietary blends. Research-backed formulas designed for cognitive optimisation.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { title: "Focus optimisation", desc: "Targeted enhancement" },
                      { title: "Clinical dosing", desc: "Evidence-based" },
                      { title: "High performers", desc: "Built for pressure" },
                      { title: "Nova integration", desc: "AI-personalised" }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-background border border-border">
                        <p className="text-foreground font-medium text-sm">{item.title}</p>
                        <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/category/supplements">
                    <Button size="lg" className="mt-4">
                      Browse supplements
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div>
                  <img 
                    src={heroSupplement} 
                    alt="NeuroState Performance Supplements" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* For Teams - Clean Style */}
          <section ref={business.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 xl:px-32 bg-background transition-all duration-1000 ${business.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium">Enterprise</p>
                    <h2 className="text-4xl md:text-5xl font-medium text-foreground leading-[1.1] tracking-tight">
                      Corporate Performance Platform
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Deploy our cognitive performance system across your organisation. Measure real outcomes.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { stat: "47%", label: "Focus increase" },
                      { stat: "63%", label: "Burnout reduction" },
                      { stat: "31%", label: "Productivity gain" },
                      { stat: "89%", label: "Satisfaction rate" }
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-muted/30 border border-border">
                        <p className="text-3xl md:text-4xl font-medium text-primary tracking-tight">{item.stat}</p>
                        <p className="text-muted-foreground text-xs mt-2 uppercase tracking-wider">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/enterprise/overview">
                    <Button size="lg" className="mt-4">
                      For teams
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-6 font-medium">What's included</p>
                  {[
                    { title: "Nova AI for teams", desc: "Personalised AI coaching for every employee" },
                    { title: "Monthly supplement delivery", desc: "Research-backed formulas delivered to your office" },
                    { title: "Real-time analytics", desc: "Track cognitive performance across departments" },
                    { title: "Dedicated support", desc: "Enterprise account management and onboarding" }
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-muted/30 border-l-2 border-primary/30 hover:border-primary transition-colors">
                      <p className="text-foreground font-medium text-sm">{item.title}</p>
                      <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Explore Links - Clean Style */}
          <section className="py-24 px-6 md:px-12 lg:px-20 xl:px-32 bg-muted/30 border-y border-border">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium mb-4">Explore</p>
                <h3 className="text-2xl md:text-3xl font-medium text-foreground tracking-tight">Discover the full platform</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { title: "Nova AI", href: "/nova/overview", desc: "AI performance assistant" },
                  { title: "For Teams", href: "/enterprise/overview", desc: "Corporate solutions" },
                  { title: "Supplements", href: "/category/supplements", desc: "Performance nutrition" },
                  { title: "Red Light", href: "/category/devices", desc: "Neuromodulation" },
                  { title: "About Us", href: "/about", desc: "Our mission" }
                ].map((link, i) => (
                  <Link key={i} to={link.href} className="group p-5 bg-background border border-border hover:border-primary/30 transition-all duration-300">
                    <p className="text-sm font-medium text-foreground">{link.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{link.desc}</p>
                    <ArrowRight className="w-4 h-4 text-primary mt-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA - Clean Style */}
          <section ref={cta.ref} className={`py-32 md:py-40 lg:py-48 px-6 md:px-12 lg:px-20 xl:px-32 bg-background transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-[1.1] tracking-tight">
                Ready to optimise your cognitive performance?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Start with Nova AI. Experience the future of cognitive performance prediction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/nova/chat">
                  <Button size="lg" className="min-w-[180px]">
                    Chat with Nova
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button variant="outline" size="lg" className="min-w-[180px]">
                    Browse products
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
