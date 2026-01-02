import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, ArrowUpRight, Layers, Brain, TrendingUp, Zap, Users, Calculator, Database, Cpu, Target, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const solutionLayers = [
  {
    icon: Database,
    title: "Cognitive Data Layer",
    description: "Unified signal ingestion from wearables, behaviour, and context.",
    href: "/solutions/data-layer",
    color: "hsl(220, 100%, 55%)"
  },
  {
    icon: Cpu,
    title: "Cognitive State Engine",
    description: "Real-time interpretation of readiness, load, and risk.",
    href: "/solutions/state-engine",
    color: "hsl(270, 100%, 55%)"
  },
  {
    icon: TrendingUp,
    title: "Prediction & Simulation",
    description: "Near-term forecasting and scenario modelling.",
    href: "/solutions/prediction",
    color: "hsl(156, 65%, 45%)"
  },
  {
    icon: Zap,
    title: "Action & Control Layer",
    description: "Low-friction interventions that drive outcomes.",
    href: "/solutions/action-layer",
    color: "hsl(45, 100%, 50%)"
  },
  {
    icon: Users,
    title: "Command Surfaces by Role",
    description: "Tailored views for individuals, managers, and executives.",
    href: "/solutions/command-surfaces",
    color: "hsl(0, 70%, 55%)"
  },
  {
    icon: Calculator,
    title: "Economic & ROI Layer",
    description: "Cognitive risk translated to business value.",
    href: "/solutions/roi-layer",
    color: "hsl(280, 70%, 55%)"
  },
];

export default function SolutionsHub() {
  return (
    <>
      <SEO
        title="Solutions | NeuroState Cognitive Infrastructure"
        description="NeuroState is the system of record for cognitive capacity in an organisation. Infrastructure for human performance at scale."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.03]" />
            <motion.div
              className="absolute top-20 right-[10%] w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[150px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.08, 0.06] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 py-20 lg:py-28">
              <motion.div
                className="max-w-4xl mx-auto text-center space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="inline-flex items-center gap-2 justify-center">
                  <motion.div
                    className="w-1.5 h-1.5 bg-primary rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Solutions Overview</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground tracking-tight leading-tight">
                  NeuroState is the system of record for{" "}
                  <span className="text-primary">cognitive capacity</span> in an organisation.
                </h1>

                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  We turn biometric, behavioural, and contextual signals into real-time cognitive intelligence — insight, prediction, and action that protects performance at scale.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <a href="https://calendly.com/neurostate/30min" target="_blank" rel="noopener noreferrer">
                    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        <span className="flex items-center">
                          Book a demo
                          <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </Button>
                    </motion.div>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Category Framing */}
          <section className="py-20 md:py-28 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Category Definition</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    This is not wellness software.
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  {/* What we're not */}
                  <div className="p-6 rounded-2xl bg-background border border-border/50">
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Most workplace "wellbeing" tools are:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-red-500 mt-0.5">×</span>
                        Reactive, not predictive
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-red-500 mt-0.5">×</span>
                        Fragmented dashboards of historical data
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-red-500 mt-0.5">×</span>
                        One-size-fits-all programmes
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-red-500 mt-0.5">×</span>
                        Focused on optics, not outcomes
                      </li>
                    </ul>
                  </div>

                  {/* What we are */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                    <h3 className="text-sm font-medium text-foreground mb-4">NeuroState is different:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm text-foreground">
                        <span className="text-primary mt-0.5">✓</span>
                        Predictive cognitive intelligence
                      </li>
                      <li className="flex items-start gap-3 text-sm text-foreground">
                        <span className="text-primary mt-0.5">✓</span>
                        Unified system of record
                      </li>
                      <li className="flex items-start gap-3 text-sm text-foreground">
                        <span className="text-primary mt-0.5">✓</span>
                        Personalised interventions
                      </li>
                      <li className="flex items-start gap-3 text-sm text-foreground">
                        <span className="text-primary mt-0.5">✓</span>
                        Measurable business outcomes
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center pt-8">
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                    Like <span className="text-foreground font-medium">Stripe</span> is infrastructure for money, and{" "}
                    <span className="text-foreground font-medium">Palantir</span> is infrastructure for decision intelligence,{" "}
                    <span className="text-primary font-medium">NeuroState</span> is infrastructure for human performance.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Solution Layers Grid */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Architecture</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Six layers of cognitive infrastructure
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  A complete stack that transforms raw signals into measurable business outcomes.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solutionLayers.map((layer, i) => (
                  <motion.div
                    key={layer.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link to={layer.href}>
                      <div className="group p-6 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: `${layer.color}15` }}
                        >
                          <layer.icon className="w-6 h-6" style={{ color: layer.color }} />
                        </div>
                        <h3 className="text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                          {layer.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                          {layer.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Learn more
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Visual Diagram */}
          <section className="py-20 md:py-28 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">How It Works</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  From signals to outcomes
                </h2>
              </ScrollReveal>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                  {/* Signal Input */}
                  <div className="flex-1 p-6 rounded-2xl bg-background border border-border/50 text-center">
                    <Database className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-1">Signals</h4>
                    <p className="text-[10px] text-muted-foreground">Wearables, behaviour, context</p>
                  </div>

                  <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
                  <div className="w-6 h-6 flex items-center justify-center md:hidden">
                    <div className="w-0.5 h-6 bg-border" />
                  </div>

                  {/* Processing */}
                  <div className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 text-center">
                    <Brain className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-1">Nova AI</h4>
                    <p className="text-[10px] text-muted-foreground">Interpret, predict, recommend</p>
                  </div>

                  <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
                  <div className="w-6 h-6 flex items-center justify-center md:hidden">
                    <div className="w-0.5 h-6 bg-border" />
                  </div>

                  {/* Output */}
                  <div className="flex-1 p-6 rounded-2xl bg-background border border-border/50 text-center">
                    <BarChart3 className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-1">Outcomes</h4>
                    <p className="text-[10px] text-muted-foreground">Performance, retention, ROI</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Ready to build cognitive infrastructure?
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Speak with our team to understand how NeuroState can transform your organisation.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <a href="https://calendly.com/neurostate/30min" target="_blank" rel="noopener noreferrer">
                    <Button className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </a>
                  <Link to="/contact">
                    <Button variant="outline" className="h-11 px-6 text-xs font-medium rounded-full">
                      Contact us
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
