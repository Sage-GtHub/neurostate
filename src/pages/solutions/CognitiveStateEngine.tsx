import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SolutionPageStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";
import { ArrowUpRight, ArrowRight, Cpu, Activity, Brain, Zap, AlertTriangle, TrendingUp, Database, Gauge, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SolutionDataFlowDiagram } from "@/components/SolutionDataFlowDiagram";


const cognitiveStates = [
  { 
    icon: Gauge, 
    title: "Readiness", 
    description: "Overall cognitive capacity for the day, derived from sleep quality, recovery status, and baseline patterns. Readiness tells you how much someone has to give, not how they feel.",
    mechanism: "Calculated from sleep architecture, HRV trends, and recovery debt. Adjusted for individual baseline and recent patterns."
  },
  { 
    icon: Brain, 
    title: "Cognitive Load", 
    description: "Real-time mental demand relative to available capacity. High load isn't bad. Sustained high load without recovery is where risk begins.",
    mechanism: "Combines meeting density, context switching, deadline pressure, and workload signals. Compared against current readiness."
  },
  { 
    icon: Zap, 
    title: "Recovery Debt", 
    description: "Accumulated fatigue that compounds over time without intervention. Like sleep debt, recovery debt doesn't disappear. It must be repaid.",
    mechanism: "Tracked as a rolling balance of demand vs. recovery. Factors in weekend patterns, holidays, and individual recovery rates."
  },
  { 
    icon: Activity, 
    title: "Stress Volatility", 
    description: "Variability in stress response over time. High volatility indicates fragility. The difference between resilience and one bad week away from breakdown.",
    mechanism: "Measured through HRV variability, response patterns, and physiological stress markers. Trend analysis over 7-30 day windows."
  },
  { 
    icon: AlertTriangle, 
    title: "Burnout Risk", 
    description: "Probability of performance breakdown based on trending indicators. Not a feeling. A statistical prediction based on accumulated signals.",
    mechanism: "Composite score from recovery debt trajectory, stress volatility, engagement patterns, and historical correlations with departure."
  },
];

export default function CognitiveStateEngine() {
  return (
    <>
      <SEO
        title="Cognitive Monitoring | Real-Time Cognitive Analysis | NeuroState"
        description="Transform raw biometric data into meaningful cognitive states: readiness, load, recovery debt, stress volatility, and burnout risk scores in real-time."
        keywords="cognitive state monitoring, readiness score, burnout risk prediction, recovery debt tracking, stress volatility, real-time analytics, workforce intelligence"
      />
      <SolutionPageStructuredData
        solution={{
          name: "Cognitive Monitoring",
          description: "Real-time interpretation of raw signals into meaningful cognitive states: readiness, load, recovery debt, stress volatility, and burnout risk.",
          url: "https://neurostate.co.uk/solutions/state-engine",
          features: ["Readiness scoring", "Cognitive load monitoring", "Recovery debt tracking", "Stress volatility analysis", "Burnout risk prediction"]
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neurostate.co.uk" },
          { name: "Platform", url: "https://neurostate.co.uk/solutions" },
          { name: "Cognitive Monitoring", url: "https://neurostate.co.uk/solutions/state-engine" }
        ]}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="relative py-20 lg:py-28 px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Cpu className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Layer 2 of 6</span>
                <h1 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mt-2 mb-4">
                  Cognitive Monitoring
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Raw data is noise. The Cognitive State Engine transforms signals into intelligence. Interpretable states that drive decisions. This is where NeuroState moves from tracking to understanding.
                </p>
                
                {/* Animated Data Flow Diagram */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <SolutionDataFlowDiagram variant="state-engine" className="mt-12" />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* The Difference */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Difference</span>
                  <h2 className="text-2xl font-normal text-foreground">Interpretation, not tracking</h2>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="leading-relaxed">
                    Most tools stop at data collection. They show you heart rate variability, sleep duration, meeting counts, and leave interpretation to you. But raw metrics are meaningless without context. A 45ms HRV could be excellent for one person and concerning for another. Eight meetings in a day might be normal for a sales lead and unsustainable for an engineer.
                  </p>
                  <p className="leading-relaxed">
                    The Cognitive State Engine solves this by maintaining a living baseline for every individual. It knows what's normal for each person, tracks deviation from that baseline, and translates those deviations into actionable cognitive states. The output isn't data. It's meaning.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* States Explained */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Five Cognitive States</span>
                <h2 className="text-2xl font-normal text-foreground">The states that matter</h2>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  Every NeuroState interpretation resolves to these five cognitive states. Each is precisely defined, mechanistically grounded, and directly tied to outcomes.
                </p>
              </ScrollReveal>

              <div className="space-y-6">
                {cognitiveStates.map((state, i) => (
                  <motion.div 
                    key={state.title}
                    className="p-8 rounded-2xl bg-muted/30 border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <state.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-lg font-medium text-foreground">{state.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{state.description}</p>
                        <div className="pt-3 border-t border-border/30">
                          <span className="text-[10px] uppercase tracking-wider text-primary font-medium">How it's calculated</span>
                          <p className="text-xs text-muted-foreground mt-1">{state.mechanism}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Before/After Example */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">In Practice</span>
                <h2 className="text-2xl font-normal text-foreground">From data to meaning</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Here's what interpretation looks like. Same person, same morning, but one view is data, the other is intelligence.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  className="p-8 rounded-2xl bg-background border border-border/50"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Database className="w-5 h-5 text-muted-foreground" />
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Before: Raw Data</h4>
                  </div>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    <li className="flex justify-between"><span>HRV</span><span className="font-mono">45ms</span></li>
                    <li className="flex justify-between"><span>Sleep Duration</span><span className="font-mono">6.2 hours</span></li>
                    <li className="flex justify-between"><span>Deep Sleep</span><span className="font-mono">48 min</span></li>
                    <li className="flex justify-between"><span>Resting HR</span><span className="font-mono">62 bpm</span></li>
                    <li className="flex justify-between"><span>Meetings Today</span><span className="font-mono">8</span></li>
                    <li className="flex justify-between"><span>Last Week Avg Sleep</span><span className="font-mono">5.8 hours</span></li>
                  </ul>
                  <div className="mt-6 pt-6 border-t border-border/30">
                    <p className="text-xs text-muted-foreground italic">Is this good? Bad? Without context, you can't know.</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Cpu className="w-5 h-5 text-primary" />
                    <h4 className="text-sm font-medium text-primary uppercase tracking-wider">After: Cognitive State</h4>
                  </div>
                  <ul className="space-y-4 text-sm text-foreground">
                    <li className="flex justify-between"><span>Readiness</span><span className="font-semibold text-amber-500">68/100</span></li>
                    <li className="flex justify-between"><span>Cognitive Load</span><span className="font-semibold text-red-500">High</span></li>
                    <li className="flex justify-between"><span>Recovery Debt</span><span className="font-semibold text-amber-500">Moderate (3 days)</span></li>
                    <li className="flex justify-between"><span>Stress Volatility</span><span className="font-semibold text-green-600">Low</span></li>
                    <li className="flex justify-between"><span>Optimal Window</span><span className="font-semibold text-primary">9-11am</span></li>
                    <li className="flex justify-between"><span>Recommendation</span><span className="font-semibold text-primary">Defer complex decisions</span></li>
                  </ul>
                  <div className="mt-6 pt-6 border-t border-primary/20">
                    <p className="text-xs text-foreground font-medium">Actionable. Clear. No interpretation required.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Living Baseline */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Personalisation</span>
                  <h2 className="text-2xl font-normal text-foreground">A living cognitive baseline</h2>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="leading-relaxed">
                    The engine maintains a continuously updating baseline for every individual. This baseline adapts to seasonal patterns (winter vs. summer sleep), workload cycles (end-of-quarter intensity), and personal rhythms (morning person vs. night owl). It learns what's normal for each person, so it can detect when something is off.
                  </p>
                  <p className="leading-relaxed">
                    At the team and organisation level, the engine aggregates individual states into collective intelligence. You can see team readiness before a product launch, department-level burnout risk, or organisation-wide patterns that require intervention.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6 pt-4">
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50 text-center">
                    <BarChart3 className="w-6 h-6 text-primary mx-auto mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-1">Individual</h4>
                    <p className="text-xs text-muted-foreground">Personal baseline, daily state, trend tracking</p>
                  </div>
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50 text-center">
                    <BarChart3 className="w-6 h-6 text-primary mx-auto mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-1">Team</h4>
                    <p className="text-xs text-muted-foreground">Aggregated capacity, risk distribution, intervention needs</p>
                  </div>
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50 text-center">
                    <BarChart3 className="w-6 h-6 text-primary mx-auto mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-1">Organisation</h4>
                    <p className="text-xs text-muted-foreground">Portfolio view, systemic patterns, strategic risk</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Next Layer */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <Link to="/solutions/prediction">
                  <div className="group p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Next: Layer 3</span>
                          <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">Predictive Intelligence</h3>
                          <p className="text-xs text-muted-foreground">Where state becomes forecast</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-xl font-normal text-foreground">See the State Engine in action</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/contact">
                    <Button className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Link to="/solutions">
                    <Button variant="outline" className="h-10 px-5 text-xs font-medium rounded-full">
                      Back to Solutions
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