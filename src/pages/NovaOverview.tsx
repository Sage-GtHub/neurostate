import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SoftwareApplicationStructuredData } from "@/components/StructuredData";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, Brain, Activity, Moon, Heart, Zap, TrendingUp, ArrowUpRight, MessageCircle, Shield, Sparkles, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  {
    icon: Brain,
    title: "Multi-model intelligence",
    description: "Integrates biometric, behavioural, and contextual data streams into a single cognitive picture. No more scattered tools.",
  },
  {
    icon: TrendingUp,
    title: "72-hour forecasting",
    description: "Predicts performance, recovery, and energy levels up to three days ahead so you can act before problems hit.",
  },
  {
    icon: Zap,
    title: "Adaptive protocols",
    description: "Personalised recommendations that evolve with your data. Every protocol learns from your response patterns.",
  },
  {
    icon: MessageCircle,
    title: "Natural language interface",
    description: "Ask Nova anything about your health data in plain English. No dashboards to interpret.",
  },
  {
    icon: Shield,
    title: "Privacy-first architecture",
    description: "End-to-end encryption, SOC 2 certified, GDPR compliant. Your biometric data stays yours.",
  },
  {
    icon: BarChart3,
    title: "Measurable ROI",
    description: "Every insight ties back to business outcomes. See the financial impact of every intervention.",
  },
];

const demoMetrics = [
  { label: "Recovery", value: "92%", trend: "+8%", description: "Optimal for high-intensity work" },
  { label: "Sleep Score", value: "85", trend: "+12", description: "7-day consistency streak" },
  { label: "HRV", value: "68ms", trend: "+5ms", description: "Trending above baseline" },
  { label: "Cognitive Load", value: "62%", trend: "−12%", description: "Within optimal range" },
];

export default function NovaOverview() {
  return (
    <>
      <SEO 
        title="Nova AI — Your Personal Health Intelligence | NeuroState" 
        description="Nova is your AI health coach. It reads your wearable data, tracks your sleep, recovery, and energy, and tells you what to do to feel and perform better." 
        keywords="Nova AI, health coach, personal wellness, sleep tracking, recovery, HRV, energy optimisation, daily health score" 
      />
      <SoftwareApplicationStructuredData />
      <div className="min-h-screen bg-background">
        <Header />
        <main>

          {/* Hero */}
          <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="max-w-3xl">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Nova AI</span>
                <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-medium text-foreground mt-4 tracking-tight leading-[1.08]">
                  Your AI health coach.{" "}
                  <span className="text-muted-foreground">Always on, always learning.</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl mt-6 leading-relaxed">
                  Nova reads your wearable data, understands your patterns, and tells you exactly what to do to feel and perform better. No guesswork.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-8">
                  <Link to="/auth?mode=signup">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Try Nova free
                      <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="h-12 px-6 text-sm font-medium rounded-full border-border/60 hover:border-foreground/30 group">
                      Book a demo
                      <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Live metrics preview */}
          <section className="py-12 md:py-20 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="p-6 md:p-8 rounded-xl bg-background border border-border/50 shadow-sm">
                  <div className="flex items-center gap-3 pb-5 border-b border-border/30 mb-6">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Nova Dashboard</p>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <p className="text-[11px] text-muted-foreground">Live preview</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {demoMetrics.map((metric, i) => (
                      <motion.div
                        key={i}
                        className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-mono">{metric.label}</p>
                        <p className="text-2xl md:text-3xl font-light text-foreground">{metric.value}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-emerald-600 font-medium">{metric.trend}</span>
                          <span className="text-[11px] text-muted-foreground hidden md:inline">{metric.description}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Positioning statement */}
          <section className="py-12 md:py-20 px-5 md:px-8">
            <motion.p
              className="text-lg md:text-2xl lg:text-3xl text-foreground text-center max-w-3xl mx-auto leading-snug font-light"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Most health apps show you data.{" "}
              <span className="text-primary font-medium">Nova tells you what it means</span>{" "}
              and what to do about it.
            </motion.p>
          </section>

          {/* Capabilities grid */}
          <section className="py-16 md:py-28 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="mb-14 md:mb-20">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Capabilities</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1] max-w-2xl">
                  Six layers of intelligence. One seamless experience.
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={i}
                    className="group p-6 rounded-xl border border-border/40 hover:border-primary/30 transition-colors"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <cap.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">{cap.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="py-16 md:py-28 px-5 md:px-8 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="mb-14 md:mb-20 text-center">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">How it works</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                  From raw data to clear action
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { step: "01", title: "Connect", desc: "Link your wearables. Apple Watch, WHOOP, Oura, Garmin — 40+ supported." },
                  { step: "02", title: "Analyse", desc: "Nova reads your biometrics, sleep, and activity patterns automatically." },
                  { step: "03", title: "Predict", desc: "Get 72-hour forecasts for energy, recovery, and cognitive readiness." },
                  { step: "04", title: "Act", desc: "Receive clear, personalised recommendations. Ask follow-up questions." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="text-center group"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="font-mono text-4xl md:text-5xl font-light text-primary/25 block mb-4">{item.step}</span>
                    <h3 className="text-base md:text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Chat preview */}
          <section className="py-16 md:py-28 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <ScrollReveal>
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Natural language</span>
                  <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                    Just ask. Nova understands.
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground mt-5 max-w-md leading-relaxed">
                    No menus to navigate, no charts to interpret. Ask Nova anything about your health in plain English and get actionable answers backed by your data.
                  </p>
                  <div className="mt-8">
                    <Link to="/auth?mode=signup">
                      <Button size="lg" className="h-12 px-8 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        Start chatting with Nova
                        <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <div className="p-6 rounded-xl bg-background border border-border/50 shadow-sm space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-border/30">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Nova</p>
                        <p className="text-[11px] text-muted-foreground">AI Health Coach</p>
                      </div>
                    </div>
                    {[
                      { role: "nova", text: "Good morning. Based on your sleep data, I've adjusted your focus window to 10am–1pm today. Your cognitive capacity is trending 12% above your weekly average." },
                      { role: "user", text: "What should I prioritise this morning?" },
                      { role: "nova", text: "Your highest-impact task is the Q4 strategy deck. Complexity matches your current state. I'd suggest blocking 90 minutes before lunch." },
                    ].map((msg, i) => (
                      <motion.div
                        key={i}
                        className={`p-4 rounded-lg max-w-[85%] ${msg.role === 'nova' ? 'bg-muted/40' : 'bg-primary/8 ml-auto max-w-[75%]'}`}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.12 }}
                      >
                        <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
                      </motion.div>
                    ))}
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20 border border-border/30 mt-2">
                      <span className="text-sm text-muted-foreground flex-1 pl-2">Ask Nova anything…</span>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 md:py-32 px-5 md:px-8 bg-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Get started</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-background leading-[1.1]">
                  Your health data is already there. Let Nova make sense of it.
                </h2>
                <p className="text-base text-background/60 max-w-lg mx-auto">
                  Connect your wearable, ask a question, and see what Nova finds. Free to start.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Link to="/auth?mode=signup">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group">
                      Try Nova free
                      <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium rounded-full bg-transparent border border-background/30 text-background hover:bg-background/10">
                      Book a demo
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
