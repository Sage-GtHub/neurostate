import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData, SoftwareApplicationStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HomeROICalculator } from "@/components/HomeROICalculator";

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
        title="NeuroState® | Cognitive Performance Infrastructure for Organisations"
        description="The system of record for cognitive capacity. Predictive intelligence, risk visibility, and financial attribution for enterprise-scale human performance."
        keywords="cognitive performance infrastructure, enterprise wellness platform, AI performance analytics, workforce optimisation, burnout prevention, predictive intelligence, Nova AI, cognitive capacity management"
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
          <section ref={approachRef} className="py-12 md:py-16 px-6 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
              {/* Section header */}
              <motion.div 
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-2">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Our approach</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    Ask. Analyse. Act.
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground max-w-md">
                  The cognitive operating system for high-performing teams.
                </p>
              </motion.div>

              {/* 3 Pillars */}
              <div className="grid md:grid-cols-3 gap-4 md:gap-5">
                {approachPillars.map((pillar, i) => (
                  <motion.div
                    key={i}
                    className="group relative p-5 md:p-6 rounded-xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/30 hover:border-primary/30 transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <pillar.icon className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-foreground mb-2">{pillar.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Positioning Statement - Between Approach and System */}
          <section className="py-10 md:py-12 px-6 md:px-8 border-y border-border/30">
            <motion.p 
              className="text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              Like <span className="text-foreground font-medium">Stripe</span> is infrastructure for money, and{" "}
              <span className="text-foreground font-medium">Palantir</span> is infrastructure for decision intelligence,{" "}
              <span className="text-primary font-medium">NeuroState</span> is infrastructure for human performance.
            </motion.p>
          </section>

          {/* Building Blocks Section - Like Invisible's platform modules */}
          <section className="py-12 md:py-16 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="space-y-3 mb-8">
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Our System</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground max-w-2xl">
                  Building blocks, not black boxes
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl">
                  Modular components designed to integrate with your existing stack. Take what you need, shape it to your context.
                </p>
              </ScrollReveal>

              {/* Building blocks grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {platformBlocks.map((block, i) => (
                  <Link key={block.id} to={block.link}>
                    <motion.div
                      className={`group relative h-full p-5 rounded-xl bg-gradient-to-br ${block.color} border border-border/30 hover:border-primary/40 transition-all duration-300 cursor-pointer overflow-hidden`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      {/* Background decoration */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-background/50 to-transparent rounded-bl-full opacity-50" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-background/80 flex items-center justify-center group-hover:bg-background transition-colors">
                            <block.icon className="w-4 h-4 text-foreground" />
                          </div>
                          <span className="text-[9px] tracking-[0.1em] uppercase text-muted-foreground">{block.label}</span>
                        </div>
                        
                        <h3 className="text-sm font-medium text-foreground mb-1.5 group-hover:text-primary transition-colors">
                          {block.name}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {block.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-3 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
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
                className="flex justify-center mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link to="/solutions">
                  <Button variant="outline" className="h-9 px-5 text-sm font-medium rounded-full group">
                    Explore all solutions
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* How It Works - Journey Flow */}
          <section className="py-12 md:py-16 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="space-y-3 mb-8 text-center">
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">How It Works</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  From signals to outcomes
                </h2>
              </ScrollReveal>

              {/* Journey steps */}
              <div className="relative">
                {/* Connection line */}
                <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                  {[
                    { step: "01", title: "Connect", desc: "Link wearables, calendars, and work tools. Setup takes minutes.", icon: Database },
                    { step: "02", title: "Interpret", desc: "AI transforms raw data into cognitive intelligence.", icon: Brain },
                    { step: "03", title: "Forecast", desc: "See capacity shifts and risk patterns before they materialise.", icon: TrendingUp },
                    { step: "04", title: "Act", desc: "Receive contextual interventions with measurable returns.", icon: Zap }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="relative group p-4 rounded-xl hover:bg-muted/30 transition-all cursor-default"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      

                      
                      <div className="text-center">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <h3 className="text-sm font-medium text-foreground mb-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Impact Stats - Full width dark section */}
          <section className="py-10 md:py-12 px-6 md:px-8 bg-foreground">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                {impactStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center md:text-left group cursor-default"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-2xl md:text-3xl font-light text-background mb-1 group-hover:text-primary transition-colors">{stat.value}</p>
                    <p className="text-xs text-background/80 font-medium">{stat.label}</p>
                    <p className="text-[10px] text-background/50 mt-0.5">{stat.sublabel}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Industries Section */}
          <section className="py-12 md:py-16 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
                {/* Left - Header */}
                <ScrollReveal className="space-y-4 lg:sticky lg:top-24">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Industries</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    Built for knowledge-intensive organisations
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Every industry has unique cognitive demands. NeuroState adapts to yours.
                  </p>
                  <div className="pt-3">
                    <Link to="/enterprise/overview">
                      <Button variant="outline" className="h-9 px-5 text-sm font-medium rounded-full group">
                        View all industries
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Right - Industry list */}
                <div className="space-y-2">
                  {industries.map((industry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <Link to={industry.href} className="block group">
                        <motion.div 
                          className="flex items-center justify-between p-3 rounded-xl border border-border/30 hover:border-primary/30 hover:bg-muted/30 transition-all"
                          whileHover={{ x: 4, scale: 1.01 }}
                        >
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{industry.name}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{industry.desc}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Command Surfaces Preview */}
          <section className="py-12 md:py-16 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                <ScrollReveal direction="left">
                  <div className="space-y-4">
                    <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Enterprise-Grade</span>
                    <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                      Command surfaces for every role
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-md">
                      One system, different perspectives. Each role sees what matters most to them.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 py-2">
                      {[
                        { icon: Eye, text: "Live cognitive capacity visibility", detail: "Real-time team health" },
                        { icon: Gauge, text: "Predictive risk indicators", detail: "72hr foresight" },
                        { icon: Calculator, text: "Financial attribution", detail: "ROI tracking" },
                        { icon: Sparkles, text: "AI-powered recommendations", detail: "Nova intelligence" }
                      ].map((item, i) => (
                        <motion.div 
                          key={i} 
                          className="p-3 rounded-xl bg-background/50 border border-border/30 hover:border-primary/30 transition-all group cursor-default"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ y: -2, scale: 1.02 }}
                        >
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                            <item.icon className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <p className="text-xs font-medium text-foreground">{item.text}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{item.detail}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 pt-1">
                      <Link to="/team-dashboard">
                        <Button className="h-9 px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                          View Team Dashboard
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link to="/solutions/command-surfaces">
                        <Button variant="outline" className="h-9 px-4 text-sm font-medium rounded-full">
                          Learn more
                        </Button>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Dashboard Preview Card */}
                <ScrollReveal direction="right" delay={0.2}>
                  <motion.div 
                    className="p-5 md:p-6 rounded-2xl bg-background border border-border/50 shadow-lg"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-border/30">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Layers className="w-4 h-4 text-primary" />
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

                    <div className="grid grid-cols-3 gap-3 py-5">
                      {[
                        { value: "74", label: "CCI Score", color: "text-primary", trend: "+3" },
                        { value: "£41.8k", label: "Exposure", color: "text-amber-500", trend: "-12%" },
                        { value: "3", label: "Actions", color: "text-foreground", trend: "pending" }
                      ].map((metric, i) => (
                        <motion.div 
                          key={i} 
                          className="text-center p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-default"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <p className={`text-xl font-light ${metric.color}`}>{metric.value}</p>
                          <p className="text-muted-foreground text-[10px] uppercase tracking-wider mt-0.5">{metric.label}</p>
                          <p className="text-[9px] text-muted-foreground/60 mt-0.5">{metric.trend}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Mini action preview */}
                    <div className="pt-3 border-t border-border/30 space-y-2">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Recommended Actions</p>
                      {[
                        { text: "Capacity review for Engineering", priority: "high" },
                        { text: "Recovery protocol for Sales leads", priority: "medium" }
                      ].map((action, i) => (
                        <motion.div 
                          key={i}
                          className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                          whileHover={{ x: 4 }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${action.priority === 'high' ? 'bg-amber-500' : 'bg-primary'}`} />
                          <span className="text-xs text-foreground flex-1">{action.text}</span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ROI Calculator Section */}
          <section className="py-12 md:py-16 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left - Header & Benefits */}
                <ScrollReveal className="space-y-5 lg:sticky lg:top-24">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Financial Impact</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    Calculate your hidden costs
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Cognitive underperformance, burnout-related turnover, and preventable sick days cost more than you think. See what NeuroState can recover.
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    {[
                      { label: "Productivity losses", value: "15-20% of salary spend" },
                      { label: "Turnover costs", value: "50-200% of annual salary" },
                      { label: "Sick day impact", value: "£600+ per day per employee" }
                    ].map((stat, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                        <span className="text-xs font-medium text-foreground">{stat.value}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="pt-3">
                    <Link to="/industries">
                      <Button variant="outline" className="h-9 px-5 text-sm font-medium rounded-full group">
                        View all industries
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Right - Interactive Calculator */}
                <ScrollReveal direction="right" delay={0.2}>
                  <HomeROICalculator />
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Nova AI Preview Section */}
          <section className="py-12 md:py-16 px-6 md:px-8 bg-gradient-to-b from-muted/30 to-background">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Nova Chat Preview */}
                <ScrollReveal direction="left" delay={0.1}>
                  <motion.div 
                    className="relative p-5 md:p-6 rounded-2xl bg-background border border-border/50 shadow-lg overflow-hidden"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 pb-4 border-b border-border/30">
                      <motion.div 
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-5 h-5 text-white" />
                      </motion.div>
                      <div>
                        <p className="text-foreground font-medium text-sm">Nova</p>
                        <p className="text-xs text-muted-foreground">Your cognitive intelligence assistant</p>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-xs text-muted-foreground">Active</span>
                      </div>
                    </div>

                    {/* Chat messages */}
                    <div className="space-y-3 py-4">
                      <motion.div 
                        className="p-3 rounded-xl bg-muted/50 max-w-[85%]"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-xs text-foreground">Good morning. Based on your sleep data, I've adjusted your focus window to 10am–1pm today. Your cognitive capacity is trending 12% above your weekly average.</p>
                      </motion.div>
                      
                      <motion.div 
                        className="p-3 rounded-xl bg-primary/10 max-w-[75%] ml-auto"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        <p className="text-xs text-foreground">What should I prioritise this morning?</p>
                      </motion.div>
                      
                      <motion.div 
                        className="p-3 rounded-xl bg-muted/50 max-w-[85%]"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                      >
                        <p className="text-xs text-foreground">Your highest-impact task is the Q4 strategy deck—complexity matches your current state. I'd suggest blocking 90 minutes before lunch.</p>
                      </motion.div>
                    </div>

                    {/* Input area */}
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/30">
                      <span className="text-xs text-muted-foreground flex-1 pl-2">Ask Nova anything...</span>
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5 text-primary" />
                      </div>
                    </div>

                    {/* Background glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                  </motion.div>
                </ScrollReveal>

                {/* Right - Nova Info */}
                <ScrollReveal direction="right" className="space-y-5">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">AI Assistant</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    Meet Nova, your cognitive co-pilot
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Nova interprets your biometric data, schedules, and work patterns to deliver contextual guidance when it matters most.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 py-2">
                    {[
                      { icon: Brain, text: "Adaptive protocols", detail: "Personalised recommendations" },
                      { icon: TrendingUp, text: "Predictive insights", detail: "72-hour foresight" },
                      { icon: Zap, text: "Real-time nudges", detail: "Context-aware timing" },
                      { icon: Eye, text: "Pattern recognition", detail: "Learn from your data" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="p-3 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 transition-all group cursor-default"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -2, scale: 1.02 }}
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <p className="text-xs font-medium text-foreground">{item.text}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{item.detail}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-1">
                    <Link to="/nova/overview">
                      <Button className="h-9 px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        Explore Nova
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link to="/nova">
                      <Button variant="outline" className="h-9 px-4 text-sm font-medium rounded-full">
                        Try the demo
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Platform Integration Visual */}
          <section className="py-12 md:py-16 px-6 md:px-8">
            <div className="max-w-6xl mx-auto text-center">
              <ScrollReveal className="space-y-3 mb-8">
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Integrations</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Connect everything. See everything.
                </h2>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  40+ integrations across wearables, calendars, and productivity tools—all normalised into a single cognitive model.
                </p>
              </ScrollReveal>

              {/* Integration categories */}
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {[
                  { category: "Wearables", items: ["Oura", "Whoop", "Apple Watch", "Garmin"], count: "15+" },
                  { category: "Calendars", items: ["Google", "Outlook", "Apple"], count: "3" },
                  { category: "Productivity", items: ["Slack", "Teams", "Notion"], count: "12+" },
                  { category: "HR Systems", items: ["Workday", "BambooHR", "SAP"], count: "10+" }
                ].map((group, i) => (
                  <motion.div
                    key={i}
                    className="p-4 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/30 transition-all text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <p className="text-2xl font-light text-primary mb-1">{group.count}</p>
                    <p className="text-xs font-medium text-foreground mb-2">{group.category}</p>
                    <p className="text-[10px] text-muted-foreground">{group.items.join(" · ")}</p>
                  </motion.div>
                ))}
              </div>

              <Link to="/enterprise/integrations">
                <Button variant="outline" className="h-9 px-5 text-sm font-medium rounded-full group">
                  View all integrations
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-12 md:py-16 px-6 md:px-8 bg-gradient-to-b from-background to-muted/30">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-5">
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Get Started</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Curious to see it in action?
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Click below to learn more or speak to our team today.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <Link to="/contact">
                    <Button className="h-10 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button variant="outline" className="h-10 px-6 text-sm font-medium rounded-full">
                      Start free trial
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-4 text-muted-foreground">
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
