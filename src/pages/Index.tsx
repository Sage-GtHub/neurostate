import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData, SoftwareApplicationStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { EnterpriseROICalculator } from "@/components/EnterpriseROICalculator";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check, Database, Cpu, TrendingUp, Calculator, Layers, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Solution layers for the home page
const solutionLayers = [
  {
    icon: Database,
    title: "Cognitive Data Layer",
    subtitle: "From fragmented signals to one coherent model",
    description: "NeuroState unifies biometric, behavioural, and contextual signals into a single cognitive data layer. Wearables, work patterns, and environmental context — normalised, structured, and ready for interpretation.",
    href: "/solutions/data-layer",
    color: "hsl(220, 100%, 55%)"
  },
  {
    icon: Cpu,
    title: "Cognitive State Engine",
    subtitle: "From raw data to live cognitive baselines",
    description: "We translate signals into readiness, cognitive load, recovery debt, stress volatility, and burnout risk — in real time. This is where data becomes intelligence.",
    href: "/solutions/state-engine",
    color: "hsl(270, 100%, 55%)"
  },
  {
    icon: TrendingUp,
    title: "Prediction & Risk Forecasting",
    subtitle: "See risk before performance breaks",
    description: "NeuroState forecasts near-term cognitive risk and capacity, supporting proactive decisions rather than reactive responses. Know what's coming before it arrives.",
    href: "/solutions/prediction",
    color: "hsl(156, 65%, 45%)"
  },
  {
    icon: Calculator,
    title: "Economic & ROI Layer",
    subtitle: "Turn cognitive risk into financial reality",
    description: "We quantify revenue at risk, cost of burnout, and recovery value — making performance measurable and buyable. ROI is not a hope. It's a metric.",
    href: "/solutions/roi-layer",
    color: "hsl(280, 70%, 55%)"
  }
];

const Index = () => {

  return (
    <>
      <SEO 
        title="Cognitive Infrastructure for Organisations | NeuroState"
        description="NeuroState is the system of record for cognitive capacity in an organisation. Predictive intelligence for performance, burnout risk, and financial attribution."
      />
      <OrganizationStructuredData />
      <SoftwareApplicationStructuredData />
      <WebsiteStructuredData />
      <LocalBusinessStructuredData />
      <div className="min-h-screen bg-background mobile-nav-padding">
        <Header />
        <main>
          <Hero />

          {/* ROI Calculator - Directly Under Hero */}
          <section className="py-12 md:py-16 px-6 md:px-8">
            <EnterpriseROICalculator />
          </section>

          {/* Problem Statement */}
          <section className="py-20 md:py-28 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Problem</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground leading-relaxed">
                  Cognitive performance is invisible,<br />
                  <span className="text-muted-foreground">unmanaged, and costly.</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Most organisations cannot see cognitive capacity until it breaks. They cannot predict burnout before it happens. They cannot quantify the cost of underperformance. They react to problems instead of preventing them.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Category Statement */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center space-y-8">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Category Definition</span>
                <h2 className="text-2xl md:text-4xl font-normal text-foreground">
                  NeuroState is <span className="text-primary">cognitive infrastructure.</span>
                </h2>
                <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Not wellness. Not perks. Not another dashboard. NeuroState is the system of record for cognitive capacity in an organisation — ingesting signals, interpreting states, predicting risk, and driving action with measurable ROI.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 pt-8 max-w-4xl mx-auto">
                  {[
                    { label: "Stripe", desc: "Infrastructure for money" },
                    { label: "Palantir", desc: "Infrastructure for decisions" },
                    { label: "NeuroState", desc: "Infrastructure for performance", highlight: true }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className={`p-6 rounded-2xl border ${item.highlight ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-border/50'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className={`text-base font-medium ${item.highlight ? 'text-primary' : 'text-foreground'}`}>{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* How NeuroState Works - System Architecture */}
          <section className="py-24 md:py-32 px-6 md:px-8 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-16 space-y-5">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">How It Works</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Cognitive infrastructure, end to end.
                </h2>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  A complete system that ingests signals, interprets cognitive states, predicts risk, drives action, and measures ROI — continuously and autonomously.
                </p>
              </ScrollReveal>

              {/* Data Flow Visualisation */}
              <ScrollReveal className="mb-16">
                <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                  {["Signals", "States", "Predictions", "Actions", "ROI"].map((step, i) => (
                    <motion.div
                      key={step}
                      className="flex items-center gap-2 md:gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className={`px-4 py-2 rounded-full text-xs font-medium ${i === 4 ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border/50 text-foreground'}`}>
                        {step}
                      </div>
                      {i < 4 && (
                        <motion.div
                          className="hidden md:block"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                        >
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Solution Layer Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {solutionLayers.map((layer, i) => (
                  <motion.div
                    key={layer.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link to={layer.href} className="block h-full">
                      <div className="group p-6 md:p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                        <div className="flex items-start gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${layer.color}15` }}
                          >
                            <layer.icon className="w-6 h-6" style={{ color: layer.color }} />
                          </div>
                          <div className="flex-1 space-y-2">
                            <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                              {layer.title}
                            </h3>
                            <p className="text-xs font-medium text-primary/80">
                              {layer.subtitle}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {layer.description}
                            </p>
                            <div className="pt-2">
                              <span className="text-[10px] text-primary font-medium group-hover:underline flex items-center gap-1">
                                Learn more
                                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* The Difference - Predictive vs Reactive */}
          <section className="py-24 md:py-32 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Difference</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Predictive infrastructure.
                  <br />
                  <span className="text-muted-foreground">Not reactive wellness.</span>
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                {/* What others do */}
                <ScrollReveal delay={0.1} direction="left">
                  <div className="space-y-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-5 font-medium">Reactive approaches</p>
                    {[
                      { title: "Respond after burnout occurs", desc: "Damage already done" },
                      { title: "Generic wellness programmes", desc: "One-size-fits-all solutions" },
                      { title: "No performance prediction", desc: "Flying blind on capacity" },
                      { title: "No financial attribution", desc: "Cost remains invisible" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <div className="w-4 h-4 rounded-full border border-destructive/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[8px] text-destructive/60">✕</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">{item.title}</span>
                          <p className="hidden lg:block text-xs text-muted-foreground/60 mt-0.5">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>

                {/* What we do */}
                <ScrollReveal delay={0.2} direction="right">
                  <div className="space-y-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-5 font-medium">NeuroState infrastructure</p>
                    {[
                      { title: "Predict risk before impact", desc: "72-hour burnout forecasting" },
                      { title: "Personalised interventions", desc: "AI-calibrated to individual patterns" },
                      { title: "Real-time cognitive visibility", desc: "Live readiness and capacity scores" },
                      { title: "Measurable ROI", desc: "Financial attribution on every action" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0 group cursor-default"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors duration-300">
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <div>
                          <span className="text-sm text-foreground font-medium">{item.title}</span>
                          <p className="hidden lg:block text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Proof of Seriousness - Dashboard Preview */}
          <section className="py-24 md:py-32 px-6 md:px-8 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <ScrollReveal direction="left">
                  <div className="space-y-6">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Enterprise-Grade</span>
                    <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                      Command surfaces for every role.
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                      One system, different truths. Individuals see personal optimisation. Managers see team health. Executives see organisational risk and financial exposure.
                    </p>
                    
                    <StaggerContainer className="space-y-3 py-2" staggerDelay={0.1}>
                      {[
                        "Live cognitive capacity dashboards",
                        "Predictive burnout risk forecasting",
                        "Financial attribution on every metric",
                        "Nova AI intervention recommendations"
                      ].map((item, i) => (
                        <StaggerItem key={i}>
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            <span className="text-sm text-foreground">{item}</span>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                    
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link to="/team-dashboard">
                        <Button size="sm" className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                          View Team Dashboard
                          <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link to="/solutions">
                        <Button size="sm" variant="outline" className="h-10 px-5 text-xs font-medium rounded-full">
                          Explore Solutions
                        </Button>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Dashboard Preview Card */}
                <ScrollReveal direction="right" delay={0.2}>
                  <motion.div 
                    className="flow-card p-6 space-y-5"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Layers className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium text-xs">Team Dashboard</p>
                          <p className="text-muted-foreground text-[10px]">Executive View</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <span className="text-[10px] text-muted-foreground">Live</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "74", label: "CCI Score" },
                        { value: "£41.8k", label: "At Risk" },
                        { value: "3", label: "Actions" }
                      ].map((metric, i) => (
                        <motion.div 
                          key={i} 
                          className="bg-muted/50 p-3 text-center rounded-xl"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <p className="text-foreground text-lg font-semibold">{metric.value}</p>
                          <p className="text-muted-foreground text-[9px] uppercase tracking-wider">{metric.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1.5">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                        <motion.div 
                          key={i} 
                          className={`p-2 text-center rounded-lg transition-all duration-300 ${i === 0 ? 'bg-primary/10 ring-1 ring-primary/20' : 'bg-muted/50 hover:bg-muted'}`}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                        >
                          <p className="text-[8px] text-muted-foreground uppercase mb-1">{day}</p>
                          <div className={`w-1 h-1 mx-auto rounded-full mb-1 ${i <= 1 || i >= 5 ? 'bg-primary' : i === 3 ? 'bg-destructive/60' : 'bg-yellow-500/60'}`} />
                          <p className="text-foreground text-[10px] font-medium">{[85, 82, 68, 55, 72, 88, 90][i]}%</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                {[
                  { value: "72hr", label: "Prediction window", desc: "For burnout risk forecasting" },
                  { value: "89%", label: "Coverage rate", desc: "Workforce signal visibility" },
                  { value: "£41.8k", label: "Weekly at risk", desc: "Average cognitive exposure" },
                  { value: "67%", label: "Adoption rate", desc: "Intervention acceptance" }
                ].map((stat, i) => (
                  <StaggerItem key={i}>
                    <motion.div 
                      className="text-center lg:text-left group cursor-default relative"
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary/5 rounded-3xl -m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <p className="stat-display text-foreground group-hover:text-primary transition-colors duration-300 relative">{stat.value}</p>
                      <p className="text-sm text-foreground font-medium mt-2 relative">{stat.label}</p>
                      <p className="hidden lg:block text-xs text-muted-foreground mt-1 relative">{stat.desc}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* CTA Section */}
          <ScrollReveal className="py-24 md:py-32 px-6 md:px-8 bg-muted/20">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <motion.span 
                className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Get Started
              </motion.span>
              <motion.h2 
                className="text-2xl md:text-3xl font-normal text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Ready to make cognitive performance visible?
              </motion.h2>
              <motion.p 
                className="text-sm text-muted-foreground max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Join the enterprises already using NeuroState for predictive cognitive infrastructure.
              </motion.p>
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-3 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/contact">
                  <Button size="sm" className="h-10 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                    Book a demo
                    <ArrowUpRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
                <Link to="/solutions">
                  <Button size="sm" variant="outline" className="h-10 px-6 text-xs font-medium rounded-full">
                    Explore Solutions
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="hidden lg:flex items-center justify-center gap-8 pt-8 text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {["No credit card required", "Enterprise-ready", "SOC 2 compliant"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <Check className="w-3 h-3 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>

        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
