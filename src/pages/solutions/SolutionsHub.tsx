import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SolutionPageStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";
import { ArrowRight, ArrowUpRight, Layers, Brain, TrendingUp, Zap, Users, Calculator, Database, Cpu, Target, BarChart3, Check, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const solutionLayers = [
  {
    icon: Database,
    title: "Data Integration",
    description: "Unified signal ingestion from wearables, behaviour, and context. NeuroState connects to the tools teams already use and normalises disparate data streams into a single coherent model.",
    href: "/solutions/data-layer",
    layer: 1
  },
  {
    icon: Cpu,
    title: "Cognitive Monitoring",
    description: "Real-time interpretation of raw signals into meaningful cognitive states: readiness, load, recovery debt, stress volatility, and burnout risk.",
    href: "/solutions/state-engine",
    layer: 2
  },
  {
    icon: TrendingUp,
    title: "Predictive Intelligence",
    description: "Near-term forecasting and scenario modelling. NeuroState tells you what is likely to happen next, and what you can do about it.",
    href: "/solutions/prediction",
    layer: 3
  },
  {
    icon: Zap,
    title: "AI Coaching",
    description: "Low-friction interventions that drive outcomes. Personal coaching prompts, workload timing recommendations, and preventative interventions.",
    href: "/solutions/action-layer",
    layer: 4
  },
  {
    icon: Users,
    title: "Team Analytics",
    description: "Tailored interfaces for individuals seeking personal optimisation, managers overseeing team health, and executives monitoring organisational risk.",
    href: "/solutions/command-surfaces",
    layer: 5
  },
  {
    icon: Calculator,
    title: "Performance ROI",
    description: "Cognitive risk translated to business value. See the cost of burnout, the price of underperformance, and the return on intervention.",
    href: "/solutions/roi-layer",
    layer: 6
  },
];

const wellnessComparison = [
  { feature: "Real-time cognitive visibility", wellness: false, neurostate: true },
  { feature: "Predictive burnout detection", wellness: false, neurostate: true },
  { feature: "Financial attribution", wellness: false, neurostate: true },
  { feature: "Personalised interventions", wellness: false, neurostate: true },
  { feature: "Role-based command surfaces", wellness: false, neurostate: true },
  { feature: "Closed-loop ROI measurement", wellness: false, neurostate: true },
  { feature: "Survey-based data collection", wellness: true, neurostate: false },
  { feature: "Historical dashboards only", wellness: true, neurostate: false },
];

export default function SolutionsHub() {
  return (
    <>
      <SEO
        title="Platform | How NeuroState Works | NeuroState"
        description="See how NeuroState turns wearable data and work patterns into clear health intelligence, early warnings, and measurable results for your organisation."
        keywords="team health platform, data integration, health monitoring, forecasting, wellness ROI, employee wellbeing, burnout prevention"
      />
      <SolutionPageStructuredData
        solution={{
          name: "NeuroState Platform",
          description: "Six layers of cognitive infrastructure transforming biometric signals into predictive intelligence and measurable ROI.",
          url: "https://neurostate.co.uk/solutions",
          features: [
            "Data Integration",
            "Cognitive Monitoring",
            "Predictive Intelligence",
            "AI Coaching",
            "Team Analytics",
            "Performance ROI"
          ]
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neurostate.co.uk" },
          { name: "Platform", url: "https://neurostate.co.uk/solutions" }
        ]}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section — left-aligned, clean */}
          <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="max-w-3xl space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Platform</span>

                <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-medium text-foreground tracking-tight leading-[1.08]">
                  One platform that turns{" "}
                  <span className="text-muted-foreground">health data into better teams.</span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  We connect wearables and work tools, spot problems early, and give you clear actions to keep your people healthy and performing. With measurable results.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link to="/contact">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/industries">
                    <Button size="lg" variant="outline" className="h-12 px-6 text-sm font-medium rounded-full border-border/60 hover:border-foreground/30 group">
                      View industries
                      <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Category Framing */}
          <section className="py-16 md:py-28 px-5 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                <ScrollReveal className="lg:sticky lg:top-28 self-start">
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Category Definition</span>
                  <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                    This is not another wellness app.{" "}
                    <span className="text-muted-foreground">It's cognitive infrastructure.</span>
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-md mt-6">
                    Most workplace wellbeing tools rely on annual surveys and historical charts. NeuroState was built to solve a different problem: how do you keep a workforce healthy and performing, in real-time, with clear accountability?
                  </p>
                </ScrollReveal>

                <div className="space-y-0">
                  {[
                    { bad: "Reactive, not predictive.", fix: "Predictive cognitive intelligence.", desc: "Forecast burnout risk and capacity gaps before they become problems." },
                    { bad: "Fragmented dashboards.", fix: "Unified system of record.", desc: "One coherent model that ingests signals from wearables, behaviour, and context." },
                    { bad: "One-size-fits-all.", fix: "Personalised interventions.", desc: "AI-powered recommendations calibrated to individual patterns." },
                    { bad: "Focused on optics.", fix: "Measurable business outcomes.", desc: "Every intervention is tied to financial impact. ROI is a metric, not a hope." },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="group py-7 border-b border-border/40 last:border-0"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground line-through decoration-muted-foreground/30">{item.bad}</p>
                          <h3 className="text-base font-medium text-foreground">{item.fix}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="py-16 md:py-28 px-5 md:px-8 bg-muted/20">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="mb-10">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Comparison</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                  Side-by-side
                </h2>
              </ScrollReveal>

              <div className="rounded-xl border border-border/50 overflow-hidden">
                <div className="grid grid-cols-3 bg-muted/50">
                  <div className="p-4 text-xs font-medium text-muted-foreground font-mono">Capability</div>
                  <div className="p-4 text-xs font-medium text-center text-muted-foreground font-mono">Wellness Tools</div>
                  <div className="p-4 text-xs font-medium text-center text-primary font-mono">NeuroState</div>
                </div>
                {wellnessComparison.map((row, i) => (
                  <div key={i} className="grid grid-cols-3 border-t border-border/30">
                    <div className="p-4 text-xs text-foreground">{row.feature}</div>
                    <div className="p-4 flex justify-center">
                      {row.wellness ? (
                        <Check className="w-4 h-4 text-signal-green" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/30" />
                      )}
                    </div>
                    <div className="p-4 flex justify-center">
                      {row.neurostate ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/30" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <ScrollReveal delay={0.2} className="text-center mt-8">
                <p className="text-base text-foreground leading-relaxed">
                  Like <span className="font-medium">Stripe</span> makes payments simple, and{" "}
                  <span className="font-medium">Palantir</span> makes sense of complex data,{" "}
                  <span className="text-primary font-medium">NeuroState</span> makes workforce health visible and actionable.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Solution Layers Grid */}
          <section className="py-16 md:py-28 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="mb-14 md:mb-20">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Architecture</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1] max-w-2xl">
                  Six layers working together.{" "}
                  <span className="text-muted-foreground">One seamless system.</span>
                </h2>
                <p className="text-base text-muted-foreground max-w-xl mt-6 leading-relaxed">
                  A complete system that turns raw health data into measurable business results. Each layer builds on the one below it.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {solutionLayers.map((layer, i) => (
                  <motion.div
                    key={layer.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <Link to={layer.href}>
                      <div className="group p-6 rounded-xl border border-border/40 hover:border-primary/30 transition-colors h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                            <layer.icon className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-[11px] font-mono text-muted-foreground">Layer {layer.layer}</span>
                        </div>
                        <h3 className="text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                          {layer.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {layer.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Explore layer
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works — flow diagram */}
          <section className="py-16 md:py-28 px-5 md:px-8 bg-muted/20">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="mb-14 md:mb-20 text-center">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">How it works</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                  From signals to outcomes
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: Database, step: "01", title: "Signal Ingestion", desc: "Wearables, behaviour, context" },
                  { icon: Cpu, step: "02", title: "State Interpretation", desc: "Readiness, load, risk" },
                  { icon: TrendingUp, step: "03", title: "Prediction", desc: "Forecasts, scenarios" },
                  { icon: Zap, step: "04", title: "Intervention", desc: "Actions, nudges" },
                  { icon: Users, step: "05", title: "Role Surfaces", desc: "Tailored views" },
                  { icon: Calculator, step: "06", title: "ROI Measurement", desc: "Financial attribution" },
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
                    <item.icon className="w-5 h-5 text-primary mx-auto mb-3" />
                    <h3 className="text-base font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why This Matters */}
          <section className="py-16 md:py-28 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                <ScrollReveal className="lg:sticky lg:top-28 self-start">
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Why This Matters</span>
                  <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                    The cognitive infrastructure{" "}
                    <span className="text-muted-foreground">imperative.</span>
                  </h2>
                </ScrollReveal>

                <div className="space-y-6">
                  <ScrollReveal delay={0.1}>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      In the knowledge economy, cognitive capacity is the scarcest resource. It determines the quality of decisions, the pace of innovation, and the resilience of teams under pressure. Yet most organisations have no systematic way to measure, protect, or optimise it.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      The cost of this blind spot is enormous. Burnout drives turnover. Cognitive fatigue degrades decision quality. Recovery debt compounds until high performers leave or break down.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.3}>
                    <p className="text-base text-foreground font-medium leading-relaxed">
                      NeuroState changes the equation. By making cognitive state visible, predictable, and actionable, we give organisations the ability to protect their most valuable asset: the minds of their people.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 md:py-32 px-5 md:px-8 bg-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Get Started</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-background leading-[1.1]">
                  Ready to build cognitive infrastructure?
                </h2>
                <p className="text-base text-background/60 max-w-lg mx-auto">
                  Speak with our team to understand how NeuroState can transform your organisation's approach to performance and resilience.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Link to="/contact">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/industries">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium rounded-full bg-transparent border border-background/30 text-background hover:bg-background/10">
                      Explore industries
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
