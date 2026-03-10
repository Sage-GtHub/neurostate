import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { CorporateServiceStructuredData, FAQStructuredData, WebsiteStructuredData } from "@/components/StructuredData";
import { AnnouncementBar } from "@/components/AnnouncementBar";

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
import { IntegrationLogoStrip } from "@/components/IntegrationLogoStrip";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check, Brain, Zap, Sparkles, MessageCircle, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// How it works steps
const steps = [
  { num: "01", title: "Connect your tools", desc: "Link wearables, calendars, and work tools your team already uses. Setup takes minutes." },
  { num: "02", title: "AI reads the signals", desc: "Nova analyses biometric data and behavioural patterns to understand team health in real time." },
  { num: "03", title: "Get clear actions", desc: "Receive specific, timely recommendations to prevent burnout and keep performance high." },
];

// Industries
const industries = [
  { name: "SaaS & Technology", href: "/industries/saas-high-growth", desc: "Keep engineering teams sharp as you scale" },
  { name: "Financial Services", href: "/industries/financial-services", desc: "Peak performance in high-pressure environments" },
  { name: "Professional Services", href: "/industries/professional-services", desc: "Protect your people and their output" },
  { name: "Healthcare", href: "/industries/healthcare", desc: "Support clinical teams under constant pressure" },
  { name: "Research & Life Sciences", href: "/industries/research-life-sciences", desc: "Protect deep focus and discovery" },
  { name: "Government & Defence", href: "/industries/government-defence", desc: "Performance systems for critical roles" },
];

// Nova demo tabs
const novaDemoTabs = [
  {
    id: 'chat',
    label: 'AI Chat',
    icon: MessageCircle,
    messages: [
      { role: 'nova', text: "Good morning. Based on your sleep data, I've adjusted your focus window to 10am–1pm today. Your cognitive capacity is trending 12% above your weekly average." },
      { role: 'user', text: "What should I prioritise this morning?" },
      { role: 'nova', text: "Your highest-impact task is the Q4 strategy deck. Complexity matches your current state. I'd suggest blocking 90 minutes before lunch." },
    ]
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: Brain,
    insights: [
      { title: "Sleep consistency improved", desc: "7-day streak detected. Circadian rhythm is optimising.", confidence: 94, type: "positive" },
      { title: "HRV downtrend detected", desc: "15% decline over 5 days. Consider a recovery protocol.", confidence: 87, type: "warning" },
      { title: "Peak focus window shifting", desc: "Your optimal cognitive period has moved 30 mins earlier this week.", confidence: 82, type: "neutral" },
    ]
  },
  {
    id: 'metrics',
    label: 'Live Metrics',
    icon: BarChart3,
    metrics: [
      { label: "HRV", value: 68, unit: "ms", trend: "+5%" },
      { label: "Sleep", value: 7.2, unit: "hrs", trend: "+0.4" },
      { label: "Readiness", value: 82, unit: "%", trend: "+8%" },
      { label: "Recovery", value: 91, unit: "%", trend: "+3%" },
    ]
  },
  {
    id: 'actions',
    label: 'Actions',
    icon: Zap,
    actions: [
      { title: "Schedule a recovery day", impact: "High", timing: "This week", category: "recovery" },
      { title: "Move deep work to 9-11 AM", impact: "Medium", timing: "Tomorrow", category: "focus" },
      { title: "Increase magnesium intake", impact: "Medium", timing: "Tonight", category: "nutrition" },
      { title: "Cap meetings at 4 hours", impact: "High", timing: "This week", category: "energy" },
    ]
  },
];

const Index = () => {
  const [activeDemoTab, setActiveDemoTab] = useState('chat');

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
        <AnnouncementBar />
        <Header />
        <main>
          <Hero />

          {/* Logo strip */}
          <IntegrationLogoStrip />

          {/* Positioning statement */}
          <section className="py-20 md:py-36 px-5 md:px-8">
            <motion.p
              className="text-xl md:text-3xl lg:text-[2.5rem] text-foreground text-center max-w-4xl mx-auto leading-snug font-normal tracking-[-0.02em]"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              Your team wears fitness trackers, smartwatches, and health devices every day.{" "}
              <span className="text-primary font-medium">NeuroState</span> turns that data into real business value.
            </motion.p>
          </section>

          {/* How it works — 3-step, clean */}
          <section className="py-20 md:py-36 px-5 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="mb-16 md:mb-24">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">How it works</span>
                <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-medium text-foreground mt-4 leading-[1.08] tracking-[-0.02em]">
                  Up and running in minutes
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-12 md:gap-16">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="group"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <span className="font-mono text-5xl md:text-6xl font-light text-border block mb-6">{step.num}</span>
                    <h3 className="text-lg md:text-xl font-medium text-foreground mb-3">{step.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Impact stats — full-width dark */}
          <section className="py-16 md:py-24 px-5 md:px-8 bg-foreground">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                {[
                  { value: "72hr", label: "Early warning" },
                  { value: "89%", label: "Data coverage" },
                  { value: "3.2x", label: "Return on investment" },
                  { value: "40+", label: "Integrations" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <p className="text-3xl md:text-5xl font-light text-background mb-2">{stat.value}</p>
                    <p className="text-sm text-background/60 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Industries */}
          <section className="py-20 md:py-36 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                <ScrollReveal className="lg:sticky lg:top-24">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">Industries</span>
                  <h2 className="text-3xl md:text-5xl font-medium text-foreground mt-4 leading-[1.08] tracking-[-0.02em]">
                    Built for teams where performance matters most
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground max-w-md mt-6">
                    Different industries, different pressures. NeuroState adapts to yours.
                  </p>
                  <div className="pt-8">
                    <Link to="/industries">
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
                        <div className="flex items-center justify-between py-6 border-b border-border/30 group-hover:border-primary/40 transition-colors">
                          <div>
                            <h3 className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors">{industry.name}</h3>
                            <p className="text-sm text-muted-foreground mt-0.5">{industry.desc}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all flex-shrink-0 ml-4" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Nova AI Demo */}
          <section className="py-20 md:py-36 px-5 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">AI Assistant</span>
                <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-medium text-foreground mt-4 leading-[1.08] tracking-[-0.02em]">
                  Meet Nova
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mt-5">
                  Your team's AI health advisor. Click through to explore what it can do.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="relative max-w-3xl mx-auto">
                  {/* Tab Navigation */}
                  <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-full max-w-fit mx-auto mb-8 border border-border/30">
                    {novaDemoTabs.map((tab) => {
                      const TabIcon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveDemoTab(tab.id)}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                            activeDemoTab === tab.id
                              ? 'bg-background text-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <TabIcon className="w-4 h-4" />
                          <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Demo Content */}
                  <div className="relative p-6 md:p-8 rounded-2xl bg-background border border-border/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-3 pb-5 border-b border-border/30">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium text-base">Nova</p>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <p className="text-xs text-muted-foreground">Interactive demo</p>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {activeDemoTab === 'chat' && (
                        <motion.div
                          key="chat"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-4 py-5"
                        >
                          {novaDemoTabs[0].messages?.map((msg, i) => (
                            <motion.div
                              key={i}
                              className={`p-4 rounded-xl max-w-[85%] ${msg.role === 'nova' ? 'bg-muted/50' : 'bg-primary/5 ml-auto max-w-[75%]'}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.15 }}
                            >
                              <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
                            </motion.div>
                          ))}
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/30 border border-border/30 mt-4">
                            <span className="text-sm text-muted-foreground flex-1 pl-2">Ask Nova anything...</span>
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <ArrowRight className="w-4 h-4 text-primary" />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeDemoTab === 'insights' && (
                        <motion.div
                          key="insights"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-3 py-5"
                        >
                          {novaDemoTabs[1].insights?.map((insight, i) => (
                            <motion.div
                              key={i}
                              className="p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-colors"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className={`w-2 h-2 rounded-full ${
                                      insight.type === 'positive' ? 'bg-emerald-500' : 
                                      insight.type === 'warning' ? 'bg-amber-500' : 'bg-primary'
                                    }`} />
                                    <p className="text-sm font-medium text-foreground">{insight.title}</p>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{insight.desc}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-light text-primary">{insight.confidence}%</p>
                                  <p className="text-[10px] text-muted-foreground">confidence</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {activeDemoTab === 'metrics' && (
                        <motion.div
                          key="metrics"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="py-5"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {novaDemoTabs[2].metrics?.map((metric, i) => (
                              <motion.div
                                key={i}
                                className="p-5 rounded-xl border border-border/30"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.08 }}
                              >
                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{metric.label}</p>
                                <div className="flex items-baseline gap-1.5">
                                  <p className="text-3xl font-light text-foreground">{metric.value}</p>
                                  <span className="text-sm text-muted-foreground">{metric.unit}</span>
                                </div>
                                <p className="text-xs text-primary mt-1">{metric.trend}</p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeDemoTab === 'actions' && (
                        <motion.div
                          key="actions"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-2 py-5"
                        >
                          {novaDemoTabs[3].actions?.map((action, i) => (
                            <motion.div
                              key={i}
                              className="flex items-center gap-4 p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-colors"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Zap className="w-4 h-4 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground">{action.title}</p>
                                <p className="text-xs text-muted-foreground">{action.timing}</p>
                              </div>
                              <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${
                                action.impact === 'High' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                              }`}>
                                {action.impact}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </ScrollReveal>

              <div className="flex flex-wrap gap-3 pt-12 justify-center">
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

          {/* ROI Section — simplified */}
          <section className="py-20 md:py-36 px-5 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                <ScrollReveal className="lg:sticky lg:top-24">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">ROI</span>
                  <h2 className="text-3xl md:text-5xl font-medium text-foreground mt-4 leading-[1.08] tracking-[-0.02em]">
                    See what burnout is really costing you
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground max-w-md mt-6">
                    Poor health, high turnover, and sick days add up fast.
                  </p>
                  
                  <div className="space-y-5 pt-8">
                    {[
                      { label: "Lost productivity", value: "15-20% of salary spend" },
                      { label: "Replacing someone who leaves", value: "50-200% of their salary" },
                      { label: "Each sick day", value: "£600+ per employee" },
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
                <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-medium text-background leading-[1.08] tracking-[-0.02em]">
                  Ready to see it in action?
                </h2>
                <p className="text-base md:text-lg text-background/50 max-w-lg mx-auto">
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
                    <Button className="h-12 px-8 text-base font-medium rounded-full bg-transparent border border-background/30 text-background hover:bg-background/10">
                      Explore the platform
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 pt-8 text-background/40">
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
