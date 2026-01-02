import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData, SoftwareApplicationStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check, Database, Cpu, TrendingUp, Calculator, Layers, Zap, Users, Brain, Activity, Target, Shield, BarChart3, AlertTriangle, Clock, Gauge, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Platform capabilities for educational section
const platformCapabilities = [
  {
    icon: Database,
    title: "Signal Ingestion",
    description: "Connect wearables, calendars, and productivity tools. NeuroState normalises data from Oura, WHOOP, Apple Watch, Google Calendar, and more into a unified cognitive model."
  },
  {
    icon: Brain,
    title: "State Interpretation",
    description: "Raw data becomes intelligence. We calculate readiness scores, cognitive load, recovery debt, stress volatility, and burnout risk in real-time."
  },
  {
    icon: TrendingUp,
    title: "Predictive Forecasting",
    description: "See what's coming. 7, 14, and 30-day forecasts for capacity, burnout probability, and optimal intervention timing."
  },
  {
    icon: Zap,
    title: "Nova AI Interventions",
    description: "Personalised coaching prompts, workload timing recommendations, and manager nudges—delivered at the right moment to drive action."
  },
  {
    icon: Users,
    title: "Role-Based Surfaces",
    description: "Individuals see personal optimisation. Managers see team health. Executives see organisational risk and financial exposure."
  },
  {
    icon: Calculator,
    title: "Financial Attribution",
    description: "Every metric ties to pounds. Revenue at risk, cost of burnout, ROI on interventions—cognitive performance becomes a financial lever."
  }
];

// Industries served
const industries = [
  { name: "SaaS & Technology", href: "/industries/saas-high-growth", desc: "Protect engineering capacity and reduce churn" },
  { name: "Financial Services", href: "/industries/financial-services", desc: "Manage cognitive risk in high-stakes environments" },
  { name: "Professional Services", href: "/industries/professional-services", desc: "Optimise billable capacity and retention" },
  { name: "Healthcare", href: "/industries/healthcare", desc: "Prevent clinician burnout and improve care" }
];

// What buyers learn
const educationalPoints = [
  {
    number: "01",
    title: "Cognitive capacity is your most valuable—and invisible—asset",
    description: "Your people's ability to think, decide, and perform is what drives revenue. But unlike servers or software, you can't see when it's degrading. NeuroState makes the invisible visible."
  },
  {
    number: "02",
    title: "Burnout is predictable—and preventable",
    description: "72 hours before performance breaks, the signals are there: declining HRV, increased recovery debt, rising stress volatility. NeuroState detects these patterns and intervenes before damage occurs."
  },
  {
    number: "03",
    title: "Wellness programmes don't work because they can't measure",
    description: "Generic perks and annual surveys don't change outcomes because they can't connect interventions to results. NeuroState closes the loop: action → signal change → value recovered."
  },
  {
    number: "04",
    title: "ROI is not a hope—it's a metric",
    description: "NeuroState quantifies everything: revenue at risk, cost of turnover, value of recovery. CFOs can see exactly what cognitive infrastructure returns to the business."
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

          {/* Problem Statement - Flowing text */}
          <section className="py-20 px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal className="space-y-6">
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">The Problem</span>
                <h2 className="text-3xl md:text-4xl font-normal text-foreground leading-tight">
                  Cognitive performance is invisible, unmanaged, and costly.
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Most organisations cannot see cognitive capacity until it breaks. They cannot predict burnout before it happens. They cannot quantify the cost of underperformance. They react to problems instead of preventing them.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Category Statement - Clean flowing */}
          <section className="py-20 px-6 md:px-8 border-y border-border/30">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="space-y-12">
                <div className="max-w-3xl space-y-6">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Category Definition</span>
                  <h2 className="text-3xl md:text-4xl font-normal text-foreground leading-tight">
                    NeuroState is <span className="text-primary">cognitive infrastructure.</span>
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Not wellness. Not perks. Not another dashboard. NeuroState is the system of record for cognitive capacity in an organisation—ingesting signals, interpreting states, predicting risk, and driving action with measurable ROI.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-12">
                  {[
                    { label: "Stripe", desc: "Infrastructure for money" },
                    { label: "Palantir", desc: "Infrastructure for decisions" },
                    { label: "NeuroState", desc: "Infrastructure for performance", highlight: true }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className={`w-2 h-2 rounded-full ${item.highlight ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                      <div>
                        <p className={`text-base font-medium ${item.highlight ? 'text-primary' : 'text-foreground'}`}>{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Educational Section - What Buyers Learn */}
          <section className="py-24 px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="space-y-16">
                <div className="max-w-3xl space-y-4">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Why It Matters</span>
                  <h2 className="text-3xl md:text-4xl font-normal text-foreground leading-tight">
                    What every leader should understand about cognitive performance.
                  </h2>
                </div>

                <div className="space-y-0">
                  {educationalPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      className="py-8 border-b border-border/30 last:border-0"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-8">
                        <span className="text-sm text-muted-foreground/50 font-mono">{point.number}</span>
                        <div className="flex-1 max-w-2xl">
                          <h3 className="text-lg font-medium text-foreground mb-3">{point.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Platform Capabilities - Flowing two-column */}
          <section className="py-24 px-6 md:px-8 bg-muted/20">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="space-y-16">
                <div className="max-w-3xl space-y-4">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Platform Capabilities</span>
                  <h2 className="text-3xl md:text-4xl font-normal text-foreground leading-tight">
                    A complete cognitive infrastructure stack.
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    From signal ingestion to financial attribution—every layer of the system works together to make cognitive performance visible, predictable, and actionable.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                  {platformCapabilities.map((cap, i) => (
                    <motion.div
                      key={i}
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <cap.icon className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-medium text-foreground">{cap.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-8">
                  <Link to="/solutions">
                    <Button variant="outline" className="h-11 px-6 text-sm font-medium rounded-full group">
                      Explore all solutions
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* The Difference - Predictive vs Reactive - Clean flowing */}
          <section className="py-24 px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="space-y-16">
                <div className="max-w-3xl space-y-4">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">The Difference</span>
                  <h2 className="text-3xl md:text-4xl font-normal text-foreground leading-tight">
                    Predictive infrastructure. Not reactive wellness.
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
                  {/* Reactive approaches */}
                  <div className="space-y-6">
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Reactive approaches</p>
                    {[
                      "Respond after burnout occurs",
                      "Generic wellness programmes",
                      "No performance prediction",
                      "No financial attribution"
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center gap-4 py-3 border-b border-border/30"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive/60" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* NeuroState */}
                  <div className="space-y-6">
                    <p className="text-sm text-foreground font-medium uppercase tracking-wider">NeuroState infrastructure</p>
                    {[
                      "Predict risk before impact",
                      "Personalised interventions",
                      "Real-time cognitive visibility",
                      "Measurable ROI"
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center gap-4 py-3 border-b border-border/30"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-foreground font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Command Surfaces Preview */}
          <section className="py-24 px-6 md:px-8 bg-muted/20">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <ScrollReveal direction="left">
                  <div className="space-y-6">
                    <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Enterprise-Grade</span>
                    <h2 className="text-3xl font-normal text-foreground leading-tight">
                      Command surfaces for every role.
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      One system, different truths. Individuals see personal optimisation. Managers see team health. Executives see organisational risk and financial exposure.
                    </p>
                    
                    <div className="space-y-4 py-4">
                      {[
                        { icon: Eye, text: "Live cognitive capacity dashboards" },
                        { icon: AlertTriangle, text: "Predictive burnout risk forecasting" },
                        { icon: Calculator, text: "Financial attribution on every metric" },
                        { icon: Zap, text: "Nova AI intervention recommendations" }
                      ].map((item, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <item.icon className="w-4 h-4 text-primary" />
                          <span className="text-sm text-foreground">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 pt-4">
                      <Link to="/team-dashboard">
                        <Button className="h-11 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                          View Team Dashboard
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link to="/solutions/command-surfaces">
                        <Button variant="outline" className="h-11 px-6 text-sm font-medium rounded-full">
                          Learn more
                        </Button>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Dashboard Preview Card */}
                <ScrollReveal direction="right" delay={0.2}>
                  <motion.div 
                    className="p-8 rounded-2xl bg-background border border-border/50"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <div className="flex items-center justify-between pb-6 border-b border-border/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Layers className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium text-sm">Team Dashboard</p>
                          <p className="text-muted-foreground text-xs">Executive View</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-xs text-muted-foreground">Live</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-6">
                      {[
                        { value: "74", label: "CCI Score", trend: "+3.2%" },
                        { value: "£41.8k", label: "At Risk", trend: "-8.4%" },
                        { value: "3", label: "Actions", trend: "pending" }
                      ].map((metric, i) => (
                        <motion.div 
                          key={i} 
                          className="text-center"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <p className="text-foreground text-2xl font-light">{metric.value}</p>
                          <p className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">{metric.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-border/30">
                      <span className="text-xs text-muted-foreground">Next intervention:</span>
                      <span className="text-xs text-foreground font-medium">Workload adjustment for Sales</span>
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Industries Section - Flowing */}
          <section className="py-24 px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="space-y-16">
                <div className="max-w-3xl space-y-4">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Industries</span>
                  <h2 className="text-3xl font-normal text-foreground leading-tight">
                    Built for knowledge-intensive organisations.
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {industries.map((industry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link to={industry.href} className="block group">
                        <div className="p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{industry.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{industry.desc}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link to="/enterprise/overview">
                    <Button variant="ghost" className="text-sm font-medium group">
                      View all industries
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Stats Section - Large numbers */}
          <section className="py-24 px-6 md:px-8 bg-foreground text-background">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="space-y-16">
                <div className="space-y-4">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-background/60 font-medium">By The Numbers</span>
                  <h2 className="text-3xl font-normal text-background">
                    Measurable outcomes.
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                  {[
                    { value: "72hr", label: "Prediction window" },
                    { value: "89%", label: "Coverage rate" },
                    { value: "£41.8k", label: "Weekly at risk" },
                    { value: "67%", label: "Adoption rate" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="text-4xl md:text-5xl font-light text-background">{stat.value}</p>
                      <p className="text-sm text-background/60 mt-2">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-normal text-foreground">
                  Ready to make cognitive performance visible?
                </h2>
                <p className="text-base text-muted-foreground">
                  Join the enterprises already using NeuroState for predictive cognitive infrastructure.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <Link to="/contact">
                    <Button className="h-12 px-8 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button variant="outline" className="h-12 px-8 text-sm font-medium rounded-full">
                      Start free trial
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center justify-center gap-8 pt-8 text-muted-foreground">
                  {["No credit card required", "Enterprise-ready", "SOC 2 compliant"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <Check className="w-3 h-3 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;