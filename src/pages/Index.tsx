import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData, SoftwareApplicationStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HomeROICalculator } from "@/components/HomeROICalculator";
import { FloatingNovaChat } from "@/components/nova/FloatingNovaChat";
import { HomeComparisonSection } from "@/components/HomeComparisonSection";
import { SocialProofStrip } from "@/components/SocialProofStrip";
import { StatsCounterBar } from "@/components/StatsCounterBar";
import { IntegrationLogoStrip } from "@/components/IntegrationLogoStrip";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check, Database, TrendingUp, Calculator, Zap, Brain, Gauge, Eye, Layers, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Building blocks - like Invisible's Neuron, Atomic, etc.
const platformBlocks = [
  {
    id: "data-integration",
    label: "Connect",
    name: "Data Collection",
    description: "Pull in data from 40+ wearables, calendars, and work tools your team already uses. Everything in one place.",
    icon: Database,
    link: "/solutions/data-layer",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "state-intelligence",
    label: "Understand",
    name: "Health Intelligence",
    description: "Raw numbers become useful insights. See how ready your team is, who's at risk of burnout, and where energy levels are dropping.",
    icon: Brain,
    link: "/solutions/state-engine",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "forecasting",
    label: "Predict",
    name: "Forecasting",
    description: "See what's coming. 7, 14, and 30-day predictions for team energy, recovery needs, and best times to push or rest.",
    icon: TrendingUp,
    link: "/solutions/prediction",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: "interventions",
    label: "Act",
    name: "Smart Recommendations",
    description: "The system doesn't just watch — it tells you what to do. Timely, specific actions to keep your team sharp.",
    icon: Zap,
    link: "/solutions/action-layer",
    color: "from-rose-500/20 to-red-500/20"
  },
  {
    id: "dashboards",
    label: "View",
    name: "Role-Based Dashboards",
    description: "Everyone sees what matters to them. Individuals see their own health. Managers see team wellbeing. Leaders see business impact.",
    icon: Layers,
    link: "/solutions/command-surfaces",
    color: "from-indigo-500/20 to-violet-500/20"
  },
  {
    id: "roi-analytics",
    label: "Measure",
    name: "Financial Impact",
    description: "See the money. How much burnout is costing you, what you're saving, and the return on every action taken.",
    icon: Calculator,
    link: "/solutions/roi-layer",
    color: "from-green-500/20 to-emerald-500/20"
  }
];

// Approach pillars - like Invisible's 3 columns
const approachPillars = [
  {
    title: "Spot problems early",
    description: "We flag burnout and fatigue up to 72 hours before they affect your team. Early warning means time to act.",
    icon: Gauge
  },
  {
    title: "One system, not ten apps",
    description: "NeuroState connects all your team's health and work data in one place. No more scattered tools and guesswork.",
    icon: Layers
  },
  {
    title: "Show the money",
    description: "Every insight ties back to cost. See what burnout is costing you, and what NeuroState saves.",
    icon: Calculator
  }
];

// Industries
const industries = [
  { name: "SaaS & Technology", href: "/industries/saas-high-growth", desc: "Keep engineering teams sharp as you scale" },
  { name: "Financial Services", href: "/industries/financial-services", desc: "Peak performance in high-pressure environments" },
  { name: "Professional Services", href: "/industries/professional-services", desc: "Protect your people and their output" },
  { name: "Healthcare", href: "/industries/healthcare", desc: "Support clinical teams under constant pressure" },
  { name: "Research & Life Sciences", href: "/industries/research-life-sciences", desc: "Protect deep focus and discovery" },
  { name: "Government & Defence", href: "/industries/government-defence", desc: "Performance systems for critical roles" }
];

// Stats
const impactStats = [
  { value: "72hr", label: "Early warning", sublabel: "spot burnout before it hits" },
  { value: "89%", label: "Data coverage", sublabel: "from connected wearables" },
  { value: "3.2x", label: "Return on investment", sublabel: "in the first year" },
  { value: "40+", label: "Integrations", sublabel: "wearables and work tools" }
];

const Index = () => {
  const approachRef = useRef<HTMLDivElement>(null);
  const isApproachInView = useInView(approachRef, { once: true, margin: "-100px" });

  return (
    <>
      <SEO 
        title="NeuroState® | Turn Your Team's Health Data Into Better Business Performance"
        description="Connect wearables your team already uses, spot burnout before it happens, and get clear actions to keep people performing at their best. 40+ integrations, 72-hour early warnings, 3.2x ROI."
        keywords="workforce health, team performance, burnout prevention, wearable analytics, employee wellbeing platform, workplace health intelligence, Nova AI, HR analytics"
      />
      <OrganizationStructuredData />
      <SoftwareApplicationStructuredData />
      <WebsiteStructuredData />
      <LocalBusinessStructuredData />
      <div className="min-h-screen bg-background mobile-nav-padding relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>
        <Header />
        <main>
          <Hero />

          <IntegrationLogoStrip />

          {/* Approach Section - Open editorial, no boxes */}
          <section ref={approachRef} className="py-16 md:py-32 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="mb-16 md:mb-20"
                initial={{ opacity: 0, y: 20 }}
                animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">How we help</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal text-foreground mt-4 leading-[1.1]">
                  Predict. Prevent. Perform.
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-10 md:gap-16">
                {approachPillars.map((pillar, i) => (
                  <motion.div
                    key={i}
                    className="group cursor-default"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isApproachInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <pillar.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-foreground mb-3">{pillar.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Positioning Statement - Large editorial quote */}
          <section className="py-12 md:py-24 px-5 md:px-8">
            <motion.p
              className="text-lg md:text-3xl lg:text-4xl text-foreground text-center max-w-4xl mx-auto leading-snug font-light"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              Your team wears fitness trackers, smartwatches, and health devices every day.{" "}
              <span className="text-primary font-medium">NeuroState</span> turns that data into real business value.
            </motion.p>
          </section>

          {/* Building Blocks - Clean list, no card containers */}
          <section className="py-16 md:py-32 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="mb-16 md:mb-20">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">The platform</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal text-foreground mt-4 max-w-3xl leading-[1.1]">
                  Six building blocks. One complete system.
                </h2>
              </ScrollReveal>

              <div className="space-y-0">
                {platformBlocks.map((block, i) => (
                  <Link key={block.id} to={block.link}>
                    <motion.div
                      className="group flex items-start md:items-center justify-between py-8 md:py-10 border-t border-border/40 hover:border-primary/40 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                    >
                      <div className="flex-1 flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                        <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold w-20 flex-shrink-0">{block.label}</span>
                        <h3 className="text-lg md:text-2xl font-medium text-foreground group-hover:text-primary transition-colors">
                          {block.name}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-md md:ml-auto">
                          {block.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all ml-4 flex-shrink-0" />
                    </motion.div>
                  </Link>
                ))}
              </div>

              <motion.div 
                className="flex justify-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link to="/solutions">
                  <Button variant="outline" className="h-11 px-7 text-sm font-medium rounded-full group">
                    Explore all solutions
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* How It Works - Numbered steps, no boxes */}
          <section className="py-16 md:py-32 px-5 md:px-8 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="mb-16 md:mb-20 text-center">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">How it works</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal text-foreground mt-4 leading-[1.1]">
                  Up and running in minutes
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
                {[
                  { step: "01", title: "Connect", desc: "Link wearables, calendars, and work tools. Takes minutes, not days.", icon: Database },
                  { step: "02", title: "Understand", desc: "AI reads the data and tells you what it means — in plain English.", icon: Brain },
                  { step: "03", title: "Predict", desc: "See who's at risk of burnout or fatigue before it happens.", icon: TrendingUp },
                  { step: "04", title: "Act", desc: "Get clear recommendations that save money and protect your people.", icon: Zap }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <span className="font-mono text-4xl md:text-5xl font-light text-primary/30 block mb-4">{item.step}</span>
                    <h3 className="text-lg md:text-xl font-medium text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Impact Stats - Full width dark section */}
          <section className="py-14 md:py-20 px-5 md:px-8 bg-foreground">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16">
                {impactStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <p className="text-2xl md:text-4xl lg:text-5xl font-light text-white mb-2">{stat.value}</p>
                    <p className="text-sm text-white/70 font-medium">{stat.label}</p>
                    <p className="text-xs text-white/40 mt-1">{stat.sublabel}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Industries Section - Clean list, no cards */}
          <section className="py-16 md:py-32 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal className="lg:sticky lg:top-24">
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Industries</span>
                  <h2 className="text-3xl md:text-5xl font-normal text-foreground mt-4 leading-[1.1]">
                    Built for teams where performance matters most
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground max-w-md mt-5">
                    Different industries, different pressures. NeuroState adapts to yours.
                  </p>
                  <div className="pt-6">
                    <Link to="/enterprise/overview">
                      <Button variant="outline" className="h-11 px-6 text-sm font-medium rounded-full group">
                        View all industries
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>

                <div className="space-y-0">
                  {industries.map((industry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <Link to={industry.href} className="group block">
                        <div className="flex items-center justify-between py-5 border-b border-border/30 group-hover:border-primary/40 transition-colors">
                          <div>
                            <h3 className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors">{industry.name}</h3>
                            <p className="text-sm text-muted-foreground mt-0.5">{industry.desc}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all flex-shrink-0" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Side-by-side Comparison */}
          <HomeComparisonSection />

          {/* Command Surfaces Preview - Open layout, fewer boxes */}
          <section className="py-16 md:py-32 px-5 md:px-8 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal direction="left">
                  <div className="space-y-5">
                    <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">For Leaders</span>
                    <h2 className="text-3xl md:text-5xl font-normal text-foreground leading-[1.1]">
                      Dashboards built for every role
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-md">
                      Everyone sees what matters most to them. No noise, just what you need.
                    </p>
                    
                    <div className="space-y-4 py-4">
                      {[
                        { icon: Eye, text: "See team health in real time" },
                        { icon: Gauge, text: "Spot risks before they hit" },
                        { icon: Calculator, text: "Track the financial impact" },
                        { icon: Sparkles, text: "AI-powered next steps" }
                      ].map((item, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                          <p className="text-sm md:text-base text-foreground">{item.text}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link to="/team-dashboard">
                        <Button className="h-11 px-6 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group">
                          View Team Dashboard
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Dashboard Preview - Single clean card */}
                <ScrollReveal direction="right" delay={0.2}>
                  <motion.div 
                    className="p-6 md:p-8 rounded-lg bg-background border border-border/50 shadow-lg"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <div className="flex items-center justify-between pb-5 border-b border-border/30">
                      <div>
                        <p className="text-foreground font-medium text-base">Team Dashboard</p>
                        <p className="text-muted-foreground text-sm">Executive View</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm text-muted-foreground">Live</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 py-6">
                      {[
                        { value: "74", label: "Team Health", color: "text-primary", trend: "+3" },
                        { value: "£41.8k", label: "At Risk", color: "text-amber-500", trend: "-12%" },
                        { value: "3", label: "Actions", color: "text-foreground", trend: "pending" }
                      ].map((metric, i) => (
                        <div key={i} className="text-center">
                          <p className={`text-2xl md:text-3xl font-light ${metric.color}`}>{metric.value}</p>
                          <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border/30 space-y-3">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Suggested Actions</p>
                      {[
                        "Schedule check-in with Engineering team",
                        "Adjust workload for Sales leads this week"
                      ].map((action, i) => (
                        <div key={i} className="flex items-center gap-3 py-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-amber-500' : 'bg-primary'}`} />
                          <span className="text-sm text-foreground flex-1">{action}</span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ROI Calculator Section - Open layout */}
          <section className="py-16 md:py-32 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal className="lg:sticky lg:top-24">
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">The real cost</span>
                  <h2 className="text-3xl md:text-5xl font-normal text-foreground mt-4 leading-[1.1]">
                    See what burnout is really costing you
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground max-w-md mt-5">
                    Poor health, high turnover, and sick days add up fast.
                  </p>
                  
                  <div className="space-y-5 pt-6">
                    {[
                      { label: "Lost productivity", value: "15-20% of salary spend" },
                      { label: "Replacing someone who leaves", value: "50-200% of their salary" },
                      { label: "Each sick day", value: "£600+ per employee" }
                    ].map((stat, i) => (
                      <motion.div 
                        key={i}
                        className="flex items-center justify-between py-3 border-b border-border/30"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                        <span className="text-sm font-medium text-foreground">{stat.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.2}>
                  <HomeROICalculator />
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Nova AI Section - Clean editorial */}
          <section className="py-16 md:py-32 px-5 md:px-8 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">AI Assistant</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal text-foreground mt-4 leading-[1.1]">
                  Meet Nova
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mt-5">
                  Your team's AI health advisor. Ask it anything — in plain English.
                </p>
              </ScrollReveal>
              
              {/* Feature list - no boxes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 max-w-4xl mx-auto">
                {[
                  { icon: Brain, text: "Personalised plans" },
                  { icon: TrendingUp, text: "72-hour predictions" },
                  { icon: Zap, text: "Timely nudges" },
                  { icon: Eye, text: "Learns your patterns" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                    <p className="text-sm md:text-base font-medium text-foreground">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Nova Chat Preview */}
              <ScrollReveal delay={0.2}>
                <motion.div 
                  className="relative p-6 md:p-8 rounded-lg bg-background border border-border/50 shadow-lg overflow-hidden max-w-2xl mx-auto"
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  <div className="flex items-center gap-3 pb-5 border-b border-border/30">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-foreground font-medium text-base">Nova</p>
                      <p className="text-sm text-muted-foreground">Your AI health advisor</p>
                    </div>
                  </div>

                  <div className="space-y-4 py-5">
                    <motion.div 
                      className="p-4 rounded-xl bg-muted/50 max-w-[85%]"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-sm text-foreground leading-relaxed">Good morning. Based on your sleep data, I've adjusted your focus window to 10am–1pm today. Your cognitive capacity is trending 12% above your weekly average.</p>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 rounded-xl bg-primary/10 max-w-[75%] ml-auto"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-sm text-foreground">What should I prioritise this morning?</p>
                    </motion.div>
                    
                    <motion.div 
                      className="p-4 rounded-xl bg-muted/50 max-w-[85%]"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 }}
                    >
                      <p className="text-sm text-foreground leading-relaxed">Your highest-impact task is the Q4 strategy deck. Complexity matches your current state. I'd suggest blocking 90 minutes before lunch.</p>
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/30">
                    <span className="text-sm text-muted-foreground flex-1 pl-2">Ask Nova anything...</span>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                </motion.div>
              </ScrollReveal>

              <div className="flex flex-wrap gap-3 pt-10 justify-center">
                <Link to="/nova/overview">
                  <Button className="h-11 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                    Explore Nova
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/nova">
                  <Button variant="outline" className="h-11 px-6 text-sm font-medium rounded-full">
                    Try the demo
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Integrations - Clean text, no card grid */}
          <section className="py-16 md:py-32 px-5 md:px-8">
            <div className="max-w-6xl mx-auto text-center">
              <ScrollReveal className="mb-16">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Integrations</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal text-foreground mt-4 leading-[1.1]">
                  Works with what your team already uses
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-5">
                  40+ integrations across wearables, calendars, and work tools.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-3xl mx-auto mb-12">
                {[
                  { category: "Wearables", count: "15+" },
                  { category: "Calendars", count: "3" },
                  { category: "Work Tools", count: "12+" },
                  { category: "HR Systems", count: "10+" }
                ].map((group, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="text-3xl md:text-4xl font-light text-primary mb-2">{group.count}</p>
                    <p className="text-sm md:text-base font-medium text-foreground">{group.category}</p>
                  </motion.div>
                ))}
              </div>

              <Link to="/enterprise/integrations">
                <Button variant="outline" className="h-11 px-7 text-sm font-medium rounded-full group">
                  View all integrations
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </section>

          {/* Final CTA - Dark Groq-style contrast section */}
          <section className="py-20 md:py-36 px-5 md:px-8 bg-foreground">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Get Started</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal text-white leading-[1.1]">
                  Ready to see it in action?
                </h2>
                <p className="text-base md:text-lg text-white/60 max-w-lg mx-auto">
                  Book a 15-minute demo or start exploring for free. No credit card needed.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <Link to="/contact">
                    <Button className="h-12 px-8 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button className="h-12 px-8 text-base font-medium rounded-full bg-transparent border border-white/40 !text-white hover:bg-white/10">
                      Start free trial
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-white/50">
                  {["No credit card required", "Enterprise-ready", "SOC 2 compliant"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

        </main>
        <Footer />
        <FloatingNovaChat />
      </div>
    </>
  );
};

export default Index;
