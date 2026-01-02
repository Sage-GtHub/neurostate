import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData, SoftwareApplicationStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check, Database, TrendingUp, Calculator, Zap, Brain, Gauge, Eye, Layers, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Building blocks - like Invisible's Neuron, Atomic, etc.
const platformBlocks = [
  {
    id: "cognitive-data",
    label: "Data Layer",
    name: "Cognitive Data Layer",
    description: "Connect any wearable, calendar, or productivity tool. We normalise signals from 40+ sources into a unified cognitive model.",
    icon: Database,
    link: "/solutions/data-layer",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "state-engine",
    label: "Intelligence",
    name: "Cognitive State Engine",
    description: "Raw biometrics become actionable intelligence. Readiness scores, cognitive load, recovery tracking—interpreted in real time.",
    icon: Brain,
    link: "/solutions/state-engine",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "prediction",
    label: "Forecasting",
    name: "Prediction & Simulation",
    description: "See what's coming. 7, 14, and 30-day forecasts for capacity, intervention timing, and optimal performance windows.",
    icon: TrendingUp,
    link: "/solutions/prediction",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: "roi-layer",
    label: "Financial",
    name: "ROI Attribution",
    description: "Every metric ties to money. Revenue exposure, intervention returns, capacity value—precision economics for cognitive performance.",
    icon: Calculator,
    link: "/solutions/roi-layer",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: "nova-ai",
    label: "AI Assistant",
    name: "Nova AI",
    description: "Personal cognitive intelligence. Contextual nudges, timing recommendations, and adaptive protocols—delivered when they matter.",
    icon: Sparkles,
    link: "/nova/overview",
    color: "from-indigo-500/20 to-violet-500/20"
  },
  {
    id: "command-surfaces",
    label: "Surfaces",
    name: "Command Surfaces",
    description: "One system, different views. Individuals see optimisation. Managers see team health. Executives see risk and exposure.",
    icon: Layers,
    link: "/solutions/command-surfaces",
    color: "from-rose-500/20 to-red-500/20"
  }
];

// Approach pillars - like Invisible's 3 columns
const approachPillars = [
  {
    title: "Foresight, not hindsight",
    description: "We surface patterns 72 hours before performance shifts. Early signals, clear context, time to act.",
    icon: Gauge
  },
  {
    title: "Infrastructure, not apps",
    description: "This is the cognitive layer your organisation was missing—connecting data, intelligence, and outcomes.",
    icon: Layers
  },
  {
    title: "Precision economics",
    description: "Every insight ties to value. Exposure quantified. Returns measured. Performance becomes a financial lever.",
    icon: Calculator
  }
];

// Industries
const industries = [
  { name: "SaaS & Technology", href: "/industries/saas-high-growth", desc: "Sustain engineering velocity at scale" },
  { name: "Financial Services", href: "/industries/financial-services", desc: "Precision in high-stakes environments" },
  { name: "Professional Services", href: "/industries/professional-services", desc: "Protect billable capacity and talent" },
  { name: "Healthcare", href: "/industries/healthcare", desc: "Operational resilience for clinical teams" },
  { name: "Research & Life Sciences", href: "/industries/research-life-sciences", desc: "Sustain deep work and discovery" },
  { name: "Government & Defence", href: "/industries/government-defence", desc: "Mission-critical performance systems" }
];

// Stats
const impactStats = [
  { value: "72hr", label: "Foresight window", sublabel: "before performance shifts" },
  { value: "89%", label: "Signal coverage", sublabel: "across connected sources" },
  { value: "3.2x", label: "First-year return", sublabel: "average enterprise ROI" },
  { value: "40+", label: "Integrations", sublabel: "wearables and tools" }
];

const Index = () => {
  const approachRef = useRef<HTMLDivElement>(null);
  const isApproachInView = useInView(approachRef, { once: true, margin: "-100px" });

  return (
    <>
      <SEO 
        title="Cognitive Infrastructure for Organisations | NeuroState"
        description="NeuroState is the system of record for cognitive capacity. Predictive intelligence for performance, risk visibility, and financial attribution at enterprise scale."
      />
      <OrganizationStructuredData />
      <SoftwareApplicationStructuredData />
      <WebsiteStructuredData />
      <LocalBusinessStructuredData />
      <div className="min-h-screen bg-background mobile-nav-padding">
        <Header />
        <main>
          <Hero />

          {/* Approach Section - 3 Pillars like Invisible's */}
          <section ref={approachRef} className="py-16 md:py-20 px-6 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
              {/* Section header */}
              <motion.div 
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-3">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Our approach</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    Ask. Analyse. Act.
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground max-w-md">
                  We walk you through what's possible. No pressure, no jargon—just answers.
                </p>
              </motion.div>

              {/* 3 Pillars */}
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {approachPillars.map((pillar, i) => (
                  <motion.div
                    key={i}
                    className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/30 hover:border-primary/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <pillar.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-base font-medium text-foreground mb-3">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div 
                className="flex justify-center mt-10"
                initial={{ opacity: 0 }}
                animate={isApproachInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link to="/contact">
                  <Button className="h-11 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                    Book a demo
                    <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Building Blocks Section - Like Invisible's platform modules */}
          <section className="py-16 md:py-20 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="space-y-4 mb-12">
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Our System</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground max-w-2xl">
                  Building blocks, not black boxes
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl">
                  Modular components designed to integrate with your existing stack. Take what you need, shape it to your context.
                </p>
              </ScrollReveal>

              {/* Building blocks grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {platformBlocks.map((block, i) => (
                  <Link key={block.id} to={block.link}>
                    <motion.div
                      className={`group relative h-full p-6 rounded-2xl bg-gradient-to-br ${block.color} border border-border/30 hover:border-primary/40 transition-all duration-300 cursor-pointer overflow-hidden`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      whileHover={{ y: -4, scale: 1.01 }}
                    >
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-background/50 to-transparent rounded-bl-full opacity-50" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-background/80 flex items-center justify-center">
                            <block.icon className="w-5 h-5 text-foreground" />
                          </div>
                          <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground">{block.label}</span>
                        </div>
                        
                        <h3 className="text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                          {block.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {block.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-4 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Learn more</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* View all solutions */}
              <motion.div 
                className="flex justify-center mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link to="/solutions">
                  <Button variant="outline" className="h-11 px-6 text-sm font-medium rounded-full group">
                    Explore all solutions
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* How It Works - Journey Flow */}
          <section className="py-16 md:py-20 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="space-y-4 mb-12 text-center">
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">How It Works</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  From signals to outcomes
                </h2>
              </ScrollReveal>

              {/* Journey steps */}
              <div className="relative">
                {/* Connection line */}
                <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { step: "01", title: "Connect", desc: "Link wearables, calendars, and work tools. Setup takes minutes.", icon: Database },
                    { step: "02", title: "Interpret", desc: "AI transforms raw data into cognitive intelligence.", icon: Brain },
                    { step: "03", title: "Forecast", desc: "See capacity shifts and risk patterns before they materialise.", icon: TrendingUp },
                    { step: "04", title: "Act", desc: "Receive contextual interventions with measurable returns.", icon: Zap }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="relative group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      {/* Step number */}
                      <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center mx-auto mb-4 group-hover:border-primary/50 transition-colors relative z-10">
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{item.step}</span>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-base font-medium text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Impact Stats - Full width dark section */}
          <section className="py-14 md:py-16 px-6 md:px-8 bg-foreground">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {impactStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center md:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <p className="text-3xl md:text-4xl font-light text-background mb-1">{stat.value}</p>
                    <p className="text-sm text-background/80 font-medium">{stat.label}</p>
                    <p className="text-xs text-background/50 mt-0.5">{stat.sublabel}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Industries Section */}
          <section className="py-16 md:py-20 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left - Header */}
                <ScrollReveal className="space-y-4 lg:sticky lg:top-24">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Industries</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    Built for knowledge-intensive organisations
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Every industry has unique cognitive demands. NeuroState adapts to yours.
                  </p>
                  <div className="pt-4">
                    <Link to="/enterprise/overview">
                      <Button variant="outline" className="h-10 px-5 text-sm font-medium rounded-full group">
                        View all industries
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Right - Industry list */}
                <div className="space-y-3">
                  {industries.map((industry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <Link to={industry.href} className="block group">
                        <div className="flex items-center justify-between p-4 rounded-xl border border-border/30 hover:border-primary/30 hover:bg-muted/30 transition-all">
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{industry.name}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{industry.desc}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Command Surfaces Preview */}
          <section className="py-16 md:py-20 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <ScrollReveal direction="left">
                  <div className="space-y-5">
                    <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Enterprise-Grade</span>
                    <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                      Command surfaces for every role
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-md">
                      One system, different perspectives. Each role sees what matters most to them.
                    </p>
                    
                    <div className="space-y-3 py-2">
                      {[
                        { icon: Eye, text: "Live cognitive capacity visibility" },
                        { icon: Gauge, text: "Predictive risk indicators" },
                        { icon: Calculator, text: "Financial attribution" },
                        { icon: Sparkles, text: "AI-powered recommendations" }
                      ].map((item, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                            <item.icon className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="text-sm text-foreground">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link to="/team-dashboard">
                        <Button className="h-10 px-5 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                          View Team Dashboard
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link to="/solutions/command-surfaces">
                        <Button variant="outline" className="h-10 px-5 text-sm font-medium rounded-full">
                          Learn more
                        </Button>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Dashboard Preview Card */}
                <ScrollReveal direction="right" delay={0.2}>
                  <motion.div 
                    className="p-6 md:p-8 rounded-2xl bg-background border border-border/50 shadow-lg"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <div className="flex items-center justify-between pb-5 border-b border-border/30">
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
                        { value: "74", label: "CCI Score", color: "text-primary" },
                        { value: "£41.8k", label: "Exposure", color: "text-amber-500" },
                        { value: "3", label: "Actions", color: "text-foreground" }
                      ].map((metric, i) => (
                        <motion.div 
                          key={i} 
                          className="text-center"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <p className={`text-2xl font-light ${metric.color}`}>{metric.value}</p>
                          <p className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">{metric.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-border/30">
                      <span className="text-xs text-muted-foreground">Next action:</span>
                      <span className="text-xs text-foreground font-medium">Capacity review for Engineering</span>
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 md:py-20 px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  See what's possible
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  We'll walk you through NeuroState and answer your questions. No pressure, no jargon.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <Link to="/contact">
                    <Button className="h-11 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button variant="outline" className="h-11 px-6 text-sm font-medium rounded-full">
                      Start free trial
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center justify-center gap-6 pt-6 text-muted-foreground">
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
