import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, TrendingUp, Calendar, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PredictionSimulation() {
  return (
    <>
      <SEO
        title="Prediction & Simulation | NeuroState Solutions"
        description="NeuroState does not stop at visibility. It forecasts what is likely to happen next."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="relative py-20 lg:py-28 px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Layer 3</span>
                <h1 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mt-2 mb-4">
                  Prediction & Simulation
                </h1>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  NeuroState does not stop at visibility. It forecasts what is likely to happen next—and lets you model the impact of decisions before you make them.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Capabilities */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div 
                  className="p-8 rounded-2xl bg-background border border-border/50"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Calendar className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-3">Near-term Forecasting</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    7-day and 14-day projections of team readiness, burnout risk, and optimal performance windows based on historical patterns and upcoming commitments.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="w-3 h-3 text-primary" />
                      Daily readiness forecasts
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="w-3 h-3 text-primary" />
                      Recovery trajectory modelling
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="w-3 h-3 text-primary" />
                      Optimal scheduling recommendations
                    </li>
                  </ul>
                </motion.div>

                <motion.div 
                  className="p-8 rounded-2xl bg-background border border-border/50"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Target className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-3">Scenario Modelling</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    "What if" analysis for upcoming workload spikes, deadlines, travel, or organisational changes. Model cognitive impact before it happens.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="w-3 h-3 text-primary" />
                      Deadline impact analysis
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="w-3 h-3 text-primary" />
                      Travel fatigue modelling
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="w-3 h-3 text-primary" />
                      Team restructure simulation
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Decision Support */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-2xl font-normal text-foreground">Decision support, not speculation</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Every forecast comes with confidence intervals and the data sources that informed it. This is decision support grounded in evidence, not crystal-ball guessing.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-xl font-normal text-foreground">See predictive intelligence in action</h2>
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
