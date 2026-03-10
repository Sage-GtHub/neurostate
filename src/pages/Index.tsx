import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { CorporateServiceStructuredData, FAQStructuredData, WebsiteStructuredData } from "@/components/StructuredData";

const homepageFaqs = [
  { question: "What is NeuroState?", answer: "NeuroState is the cognitive performance infrastructure for organisations. It connects to 40+ wearable devices your team already uses, surfaces early signs of burnout and fatigue, and gives managers clear actions to keep people performing at their best." },
  { question: "How does Nova AI work?", answer: "Nova is NeuroState's multi-model AI engine. It analyses wearable biometrics, calendar patterns, and behavioural signals to forecast cognitive performance up to 72 hours ahead, then recommends evidence-based interventions." },
  { question: "Which wearable devices does NeuroState support?", answer: "NeuroState integrates with over 40 wearable devices including Apple Watch, WHOOP, Oura Ring, Garmin, Fitbit, Polar, Samsung Health, COROS, Amazfit, and Withings. Data syncs automatically in real time." },
  { question: "How does NeuroState measure ROI?", answer: "NeuroState attributes financial value to cognitive interventions by tracking metrics like reduced absenteeism, improved focus scores, lower burnout risk, and increased protocol completion rates — then maps them to revenue exposure and productivity gains." },
  { question: "Is NeuroState suitable for enterprise teams?", answer: "Yes. NeuroState is built for organisations of all sizes, from small teams to enterprise-scale deployments. It includes team dashboards, organisation-wide analytics, role-based access, and SSO integration." },
  { question: "How is employee data protected?", answer: "NeuroState follows enterprise-grade security practices including end-to-end encryption, SOC 2 compliance, GDPR adherence, and anonymised team-level reporting. Individual biometric data is never shared with managers without consent." },
];
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HomeROICalculator } from "@/components/HomeROICalculator";
import { FloatingNovaChat } from "@/components/nova/FloatingNovaChat";
import { HomeComparisonSection } from "@/components/HomeComparisonSection";
import { IntegrationLogoStrip } from "@/components/IntegrationLogoStrip";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check, Database, TrendingUp, Calculator, Zap, Brain, Gauge, Layers, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Approach pillars
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

// Building blocks
const platformBlocks = [
  { id: "data-integration", label: "Connect", name: "Data Collection", description: "Pull in data from 40+ wearables, calendars, and work tools your team already uses.", icon: Database, link: "/solutions/data-layer" },
  { id: "state-intelligence", label: "Understand", name: "Health Intelligence", description: "Raw numbers become useful insights. See who's at risk and where energy levels are dropping.", icon: Brain, link: "/solutions/state-engine" },
  { id: "forecasting", label: "Predict", name: "Forecasting", description: "See what's coming. 7, 14, and 30-day predictions for team energy and recovery needs.", icon: TrendingUp, link: "/solutions/prediction" },
  { id: "interventions", label: "Act", name: "Smart Recommendations", description: "The system doesn't just watch — it tells you what to do. Timely, specific actions.", icon: Zap, link: "/solutions/action-layer" },
  { id: "dashboards", label: "View", name: "Role-Based Dashboards", description: "Everyone sees what matters to them. Individuals, managers, and leaders — each gets their own view.", icon: Layers, link: "/solutions/command-surfaces" },
  { id: "roi-analytics", label: "Measure", name: "Financial Impact", description: "See the money. How much burnout is costing you, what you're saving, and the ROI.", icon: Calculator, link: "/solutions/roi-layer" }
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
  return (
    <>
      <SEO 
        title="NeuroState® — Cognitive Performance Infrastructure"
        description="Turn your team's health data into better business performance. 40+ wearable integrations, 72-hour burnout early warnings, and 3.2x ROI. The system of record for cognitive capacity."
        keywords="cognitive performance infrastructure, workforce health intelligence, team performance platform, burnout prevention, wearable analytics, employee wellbeing, Nova AI, HR analytics, predictive intelligence"
      />
      <CorporateServiceStructuredData />
      <WebsiteStructuredData />
      <FAQStructuredData faqs={homepageFaqs} />
      <div className="min-h-screen bg-background mobile-nav-padding relative overflow-hidden">
        <Header />
        <main>
          <Hero />

          <IntegrationLogoStrip />

          {/* Positioning Statement */}
          <section className="py-20 md:py-36 px-5 md:px-8">
            <motion.p
              className="text-xl md:text-3xl lg:text-[2.75rem] text-foreground text-center max-w-4xl mx-auto leading-[1.25] font-light tracking-[-0.01em]"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              Your team wears fitness trackers, smartwatches, and health devices every day.{" "}
              <span className="text-primary font-medium">NeuroState</span> turns that data into real business value.
            </motion.p>
          </section>

          {/* Approach Section */}
          <section className="py-16 md:py-32 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="mb-16 md:mb-24">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">How we help</span>
                <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal text-foreground mt-4 leading-[1.1] tracking-[-0.02em]">
                  Predict. Prevent. Perform.
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-12 md:gap-16">
                {approachPillars.map((pillar, i) => (
                  <motion.div
                    key={i}
                    className="group cursor-default"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-5">
                      <pillar.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-foreground mb-3">{pillar.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Building Blocks */}
          <section className="py-16 md:py-32 px-5 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="mb-16 md:mb-20">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">The platform</span>
                <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal text-foreground mt-4 max-w-3xl leading-[1.1] tracking-[-0.02em]">
                  Six building blocks. One complete system.
                </h2>
              </ScrollReveal>

              <div className="space-y-0">
                {platformBlocks.map((block, i) => (
                  <Link key={block.id} to={block.link}>
                    <motion.div
                      className="group flex items-start md:items-center justify-between py-8 md:py-10 border-t border-border/30 hover:border-primary/30 transition-colors"
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
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                    </motion.div>
                  </Link>
                ))}
              </div>

              <motion.div 
                className="flex justify-center mt-14"
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

          {/* Team Dashboard Showcase */}
          <section className="py-16 md:py-32 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Centered headline block */}
              <ScrollReveal className="text-center mb-12 md:mb-16">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">For leaders</span>
                <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal text-foreground mt-4 leading-[1.1] tracking-[-0.02em] max-w-3xl mx-auto">
                  The team performance command centre
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed">
                  Replace scattered spreadsheets with real-time executive intelligence. Spot burnout risk, track cognitive capacity, and see the financial impact.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-8">
                  {[
                    "Cognitive Capacity Index across teams",
                    "Revenue exposure from burnout risk",
                    "AI-generated interventions",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Full-width product screenshot */}
              <ScrollReveal delay={0.15}>
                <motion.div
                  className="relative rounded-xl border border-border/50 bg-card overflow-hidden shadow-xl"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-muted/30">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                    </div>
                    <div className="flex-1 mx-3">
                      <div className="bg-background/60 rounded-md px-3 py-1 text-[10px] text-muted-foreground font-mono text-center max-w-xs mx-auto">
                        neurostate.app/team-dashboard
                      </div>
                    </div>
                  </div>

                  <div className="p-5 md:p-8 space-y-5">
                    {/* Dashboard header bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Gauge className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Team Intelligence</p>
                          <p className="text-[10px] text-muted-foreground">Last updated 2 min ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-7 px-3 rounded-md bg-muted/50 border border-border/30 text-[10px] text-muted-foreground flex items-center gap-1.5 font-mono">
                          <span>Last 7 days</span>
                          <ChevronDown className="w-3 h-3" />
                        </div>
                        <div className="h-7 px-3 rounded-md bg-muted/50 border border-border/30 text-[10px] text-muted-foreground flex items-center gap-1.5 font-mono">
                          <span>All teams</span>
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </div>
                    </div>

                    {/* Executive metric strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: "Cognitive Capacity", value: "78", suffix: "/100", color: "text-primary", trend: "↑ 4%" },
                        { label: "Revenue Exposure", value: "£142k", suffix: "", color: "text-destructive", trend: "↓ 12%" },
                        { label: "Burnout Risk", value: "23%", suffix: "", color: "text-primary", trend: "↓ 8%" },
                        { label: "Protocol Completion", value: "87%", suffix: "", color: "text-primary", trend: "↑ 5%" },
                      ].map((metric, i) => (
                        <motion.div
                          key={i}
                          className="bg-background rounded-lg p-4 border border-border/30"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.08 }}
                        >
                          <p className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-2">{metric.label}</p>
                          <div className="flex items-end justify-between">
                            <p className={`text-xl font-semibold ${metric.color}`}>
                              {metric.value}<span className="text-xs font-normal text-muted-foreground">{metric.suffix}</span>
                            </p>
                            <span className={`text-[10px] font-medium ${metric.trend.startsWith('↑') ? 'text-primary' : 'text-destructive'}`}>{metric.trend}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Chart area — 2 cols */}
                      <motion.div
                        className="md:col-span-2 bg-background rounded-lg border border-border/30 p-5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-xs font-medium text-foreground">Team Energy & Recovery</p>
                          <div className="flex gap-4">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1.5"><span className="w-3 h-[3px] bg-primary rounded-full inline-block" /> Energy</span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1.5"><span className="w-3 h-[3px] bg-muted-foreground/30 rounded-full inline-block" /> Recovery</span>
                          </div>
                        </div>
                        <svg viewBox="0 0 400 80" className="w-full h-20" fill="none">
                          {/* Grid lines */}
                          <line x1="0" y1="20" x2="400" y2="20" stroke="hsl(var(--border))" strokeWidth="0.5" strokeOpacity="0.3" />
                          <line x1="0" y1="40" x2="400" y2="40" stroke="hsl(var(--border))" strokeWidth="0.5" strokeOpacity="0.3" />
                          <line x1="0" y1="60" x2="400" y2="60" stroke="hsl(var(--border))" strokeWidth="0.5" strokeOpacity="0.3" />
                          {/* Energy line with gradient fill */}
                          <defs>
                            <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d="M0,55 C30,50 60,42 100,38 S160,30 200,35 S280,22 330,18 S380,15 400,12 L400,80 L0,80 Z" fill="url(#energyGrad)" />
                          <path d="M0,55 C30,50 60,42 100,38 S160,30 200,35 S280,22 330,18 S380,15 400,12" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
                          <path d="M0,60 C30,58 60,52 100,48 S160,42 200,45 S280,35 330,32 S380,28 400,25" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeOpacity="0.25" fill="none" strokeDasharray="4 3" />
                          {/* Data point */}
                          <circle cx="330" cy="18" r="3" fill="hsl(var(--primary))" />
                          <circle cx="330" cy="18" r="6" fill="hsl(var(--primary))" fillOpacity="0.15" />
                        </svg>
                        <div className="flex justify-between mt-2">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                            <span key={d} className="text-[9px] text-muted-foreground/50 font-mono">{d}</span>
                          ))}
                        </div>
                      </motion.div>

                      {/* AI Alerts — 1 col */}
                      <motion.div
                        className="bg-background rounded-lg border border-border/30 p-5"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                      >
                        <p className="text-xs font-medium text-foreground mb-3">Active Alerts</p>
                        <div className="space-y-3">
                          {[
                            { icon: "🔴", title: "Sales team burnout risk elevated", time: "2h ago" },
                            { icon: "🟡", title: "3 engineers below recovery threshold", time: "4h ago" },
                            { icon: "🟢", title: "Product team protocol 92% complete", time: "6h ago" },
                          ].map((alert, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <span className="text-[10px] mt-0.5">{alert.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] text-foreground leading-snug">{alert.title}</p>
                                <p className="text-[9px] text-muted-foreground mt-0.5">{alert.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Team breakdown rows */}
                    <div className="grid md:grid-cols-3 gap-3">
                      {[
                        { team: "Engineering", members: 24, cci: 82, risk: "Low", riskColor: "bg-primary/10 text-primary" },
                        { team: "Sales", members: 18, cci: 64, risk: "High", riskColor: "bg-destructive/10 text-destructive" },
                        { team: "Product", members: 12, cci: 91, risk: "Low", riskColor: "bg-primary/10 text-primary" },
                      ].map((team, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center justify-between py-3 px-4 bg-background rounded-lg border border-border/30 hover:border-primary/20 transition-colors cursor-pointer"
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 + i * 0.06 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                              <Users className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-foreground">{team.team}</p>
                              <p className="text-[10px] text-muted-foreground">{team.members} members</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-sm font-semibold text-foreground">{team.cci}</p>
                              <p className="text-[9px] text-muted-foreground">CCI</p>
                            </div>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${team.riskColor}`}>{team.risk}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>

              {/* CTA below showcase */}
              <motion.div
                className="flex justify-center mt-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/team-dashboard">
                  <Button variant="outline" className="h-11 px-7 text-sm font-medium rounded-full group">
                    Explore Team Dashboard
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="py-16 md:py-24 px-5 md:px-8 bg-foreground">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                {impactStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <p className="text-3xl md:text-4xl lg:text-5xl font-light text-background mb-2">{stat.value}</p>
                    <p className="text-sm text-background/70 font-medium">{stat.label}</p>
                    <p className="text-xs text-background/40 mt-1">{stat.sublabel}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Industries */}
          <section className="py-16 md:py-32 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal className="lg:sticky lg:top-24">
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Industries</span>
                  <h2 className="text-3xl md:text-5xl font-normal text-foreground mt-4 leading-[1.1] tracking-[-0.02em]">
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
                        <div className="flex items-center justify-between py-5 border-b border-border/30 group-hover:border-primary/30 transition-colors">
                          <div>
                            <h3 className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors">{industry.name}</h3>
                            <p className="text-sm text-muted-foreground mt-0.5">{industry.desc}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Comparison */}
          <HomeComparisonSection />

          {/* ROI Calculator */}
          <section className="py-16 md:py-32 px-5 md:px-8 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal className="lg:sticky lg:top-24">
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">The real cost</span>
                  <h2 className="text-3xl md:text-5xl font-normal text-foreground mt-4 leading-[1.1] tracking-[-0.02em]">
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

          {/* Final CTA */}
          <section className="py-24 md:py-40 px-5 md:px-8 bg-foreground">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Get Started</span>
                <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-normal text-background leading-[1.1] tracking-[-0.02em]">
                  Ready to see it in action?
                </h2>
                <p className="text-base md:text-lg text-background/60 max-w-lg mx-auto">
                  Book a 15-minute demo or start exploring for free. No credit card needed.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-4">
                  <Link to="/contact">
                    <Button className="h-12 px-8 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/solutions">
                    <Button className="h-12 px-8 text-base font-medium rounded-full bg-transparent border border-background/40 text-background hover:bg-background/10">
                      Explore the platform
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 text-background/50">
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
