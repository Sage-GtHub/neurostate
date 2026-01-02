import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, Cpu, Activity, Brain, Zap, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cognitiveStates = [
  { icon: Activity, title: "Readiness", description: "Overall cognitive capacity for the day based on recovery, sleep, and baseline." },
  { icon: Brain, title: "Cognitive Load", description: "Real-time mental demand relative to available capacity." },
  { icon: Zap, title: "Recovery Debt", description: "Accumulated fatigue that compounds over time without intervention." },
  { icon: AlertTriangle, title: "Stress Volatility", description: "Variability in stress response indicating resilience or fragility." },
  { icon: AlertTriangle, title: "Burnout Risk", description: "Probability of performance breakdown based on trending indicators." },
];

export default function CognitiveStateEngine() {
  return (
    <>
      <SEO
        title="Cognitive State Engine | NeuroState Solutions"
        description="NeuroState translates raw signals into meaningful cognitive states that drive action."
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
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Layer 2</span>
                <h1 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mt-2 mb-4">
                  Cognitive State Engine
                </h1>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  NeuroState translates raw signals into meaningful cognitive states: readiness, load, recovery debt, stress volatility, and burnout risk.
                </p>
              </motion.div>
            </div>
          </section>

          {/* States Grid */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <h2 className="text-2xl font-normal text-foreground">Interpretation, not tracking</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  We don't just collect data. We interpret it into actionable cognitive states.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cognitiveStates.map((state, i) => (
                  <motion.div 
                    key={state.title}
                    className="p-6 rounded-2xl bg-background border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <state.icon className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-sm font-medium text-foreground mb-2">{state.title}</h3>
                    <p className="text-xs text-muted-foreground">{state.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Before/After */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <h2 className="text-2xl font-normal text-foreground">From data to meaning</h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-muted/50 border border-border/50">
                  <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">Before: Raw Data</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• HRV: 45ms</li>
                    <li>• Sleep: 6.2 hours</li>
                    <li>• Resting HR: 62 bpm</li>
                    <li>• 8 meetings scheduled</li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                  <h4 className="text-xs font-medium text-primary mb-4 uppercase tracking-wider">After: Cognitive State</h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• Readiness: 68/100</li>
                    <li>• Recovery Debt: Moderate</li>
                    <li>• Optimal window: 9-11am</li>
                    <li>• Recommendation: Defer complex decisions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Living Baseline */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-2xl font-normal text-foreground">A living cognitive baseline</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  The engine maintains a continuously updating baseline for individuals, teams, and the organisation—adapting to seasonal patterns, workload changes, and personal rhythms.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-xl font-normal text-foreground">See the State Engine in action</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href="https://calendly.com/neurostate/30min" target="_blank" rel="noopener noreferrer">
                    <Button className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </a>
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
