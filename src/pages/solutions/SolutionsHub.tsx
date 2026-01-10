import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SolutionPageStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";
import { ArrowRight, ArrowUpRight, Layers, Brain, TrendingUp, Zap, Users, Calculator, Database, Cpu, Target, BarChart3, Check, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DataFlowVisualization } from "@/components/DataFlowVisualization";


const solutionLayers = [
  {
    icon: Database,
    title: "Data Integration",
    description: "Unified signal ingestion from wearables, behaviour, and context. NeuroState connects to the tools teams already use and normalises disparate data streams into a single coherent model.",
    href: "/solutions/data-layer",
    color: "hsl(220, 100%, 55%)",
    layer: 1
  },
  {
    icon: Cpu,
    title: "State Intelligence",
    description: "Real-time interpretation of raw signals into meaningful cognitive states: readiness, load, recovery debt, stress volatility, and burnout risk. This is where data becomes intelligence.",
    href: "/solutions/state-engine",
    color: "hsl(270, 100%, 55%)",
    layer: 2
  },
  {
    icon: TrendingUp,
    title: "Forecasting",
    description: "Near-term forecasting and scenario modelling. NeuroState doesn't just show you what is happening—it tells you what is likely to happen next, and what you can do about it.",
    href: "/solutions/prediction",
    color: "hsl(156, 65%, 45%)",
    layer: 3
  },
  {
    icon: Zap,
    title: "Interventions",
    description: "Low-friction interventions that drive outcomes. Personal coaching prompts, workload timing recommendations, manager nudges, and preventative interventions before breakdown occurs.",
    href: "/solutions/action-layer",
    color: "hsl(45, 100%, 50%)",
    layer: 4
  },
  {
    icon: Users,
    title: "Dashboards",
    description: "One system, different truths. Tailored interfaces for individuals seeking personal optimisation, managers overseeing team health, and executives monitoring organisational risk.",
    href: "/solutions/command-surfaces",
    color: "hsl(0, 70%, 55%)",
    layer: 5
  },
  {
    icon: Calculator,
    title: "ROI Analytics",
    description: "Cognitive risk translated to business value. See the cost of burnout, the price of underperformance, and the return on intervention—in pounds, not platitudes.",
    href: "/solutions/roi-layer",
    color: "hsl(280, 70%, 55%)",
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
        title="Platform | Cognitive Performance Infrastructure | NeuroState"
        description="NeuroState is the system of record for cognitive capacity. Six layers of infrastructure transforming biometric signals into predictive intelligence and measurable ROI."
        keywords="cognitive performance infrastructure, data integration, state intelligence, forecasting, interventions, dashboards, ROI analytics, enterprise wellness platform"
      />
      <SolutionPageStructuredData
        solution={{
          name: "NeuroState Platform",
          description: "Six layers of cognitive infrastructure transforming biometric signals into predictive intelligence and measurable ROI.",
          url: "https://neurostate.co.uk/solutions",
          features: [
            "Data Integration",
            "State Intelligence",
            "Forecasting",
            "Interventions",
            "Dashboards",
            "ROI Analytics"
          ]
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neurostate.co.uk" },
          { name: "Platform", url: "https://neurostate.co.uk/solutions" }
        ]}
      />
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.03]" />
            
            {/* Animated Data Flow Background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <DataFlowVisualization className="w-full h-full" />
            </div>
            
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

                <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We turn biometric, behavioural, and contextual signals into real-time cognitive intelligence — insight, prediction, and action that protects performance at scale.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <Link to="/contact">
                    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        <span className="flex items-center">
                          Book a demo
                          <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Category Framing - Comprehensive */}
          <section className="py-20 md:py-28 px-6 md:px-8 bg-card/50">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="space-y-12">
                <div className="text-center space-y-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Category Definition</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    This is not wellness software.
                  </h2>
                </div>

                {/* Detailed Explanation */}
                <div className="max-w-3xl mx-auto">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Most workplace "wellbeing" tools were designed for a different era. They rely on periodic surveys, offer historical dashboards with no predictive capability, and treat employee health as an HR checkbox rather than a strategic lever. They measure engagement after the fact. They cannot tell you who is at risk of burnout before it happens. They cannot quantify the cost of cognitive underperformance. They cannot recommend interventions with measurable ROI.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    NeuroState was built from first principles to solve a different problem: how do you maintain cognitive performance across a workforce at scale, in real-time, with economic accountability?
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  {/* What we're not */}
                  <div className="p-8 rounded-2xl bg-background border border-border/50">
                    <h3 className="text-sm font-medium text-muted-foreground mb-6">Most workplace "wellbeing" tools are:</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">×</span>
                        <div>
                          <span className="text-foreground font-medium">Reactive, not predictive.</span>
                          <p className="text-xs mt-1">They tell you someone burned out. NeuroState tells you they will if nothing changes.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">×</span>
                        <div>
                          <span className="text-foreground font-medium">Fragmented dashboards of historical data.</span>
                          <p className="text-xs mt-1">Disconnected charts that require interpretation. No unified model, no actionable intelligence.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">×</span>
                        <div>
                          <span className="text-foreground font-medium">One-size-fits-all programmes.</span>
                          <p className="text-xs mt-1">Generic recommendations that ignore individual context, team dynamics, and organisational reality.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">×</span>
                        <div>
                          <span className="text-foreground font-medium">Focused on optics, not outcomes.</span>
                          <p className="text-xs mt-1">Designed to demonstrate "we care about wellbeing" rather than to measurably improve performance.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* What we are */}
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                    <h3 className="text-sm font-medium text-foreground mb-6">NeuroState is different:</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3 text-sm text-foreground">
                        <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                        <div>
                          <span className="font-medium">Predictive cognitive intelligence.</span>
                          <p className="text-xs mt-1 text-muted-foreground">Forecast burnout risk, capacity gaps, and intervention opportunities before they become problems.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-foreground">
                        <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                        <div>
                          <span className="font-medium">Unified system of record.</span>
                          <p className="text-xs mt-1 text-muted-foreground">One coherent model that ingests signals from wearables, behaviour, and context.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-foreground">
                        <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                        <div>
                          <span className="font-medium">Personalised interventions.</span>
                          <p className="text-xs mt-1 text-muted-foreground">AI-powered recommendations calibrated to individual patterns and team dynamics.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-foreground">
                        <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                        <div>
                          <span className="font-medium">Measurable business outcomes.</span>
                          <p className="text-xs mt-1 text-muted-foreground">Every intervention is tied to financial impact. ROI is not a hope—it's a metric.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Infrastructure Positioning */}
                <div className="text-center pt-8 max-w-3xl mx-auto">
                  <p className="text-base text-foreground leading-relaxed">
                    Like <span className="font-medium">Stripe</span> is infrastructure for money, and{" "}
                    <span className="font-medium">Palantir</span> is infrastructure for decision intelligence,{" "}
                    <span className="text-primary font-medium">NeuroState</span> is infrastructure for human performance.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    We are not building another wellness app. We are building the operating system for cognitive capacity at scale.
                  </p>
                </div>

                {/* Visual Comparison Table */}
                <div className="mt-12">
                  <h3 className="text-sm font-medium text-foreground text-center mb-6">Side-by-side comparison</h3>
                  <div className="rounded-2xl border border-border/50 overflow-hidden">
                    <div className="grid grid-cols-3 bg-muted/50">
                      <div className="p-4 text-xs font-medium text-muted-foreground">Capability</div>
                      <div className="p-4 text-xs font-medium text-center text-muted-foreground">Wellness Tools</div>
                      <div className="p-4 text-xs font-medium text-center text-primary">NeuroState</div>
                    </div>
                    {wellnessComparison.map((row, i) => (
                      <div key={i} className="grid grid-cols-3 border-t border-border/30">
                        <div className="p-4 text-xs text-foreground">{row.feature}</div>
                        <div className="p-4 flex justify-center">
                          {row.wellness ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground/50" />
                          )}
                        </div>
                        <div className="p-4 flex justify-center">
                          {row.neurostate ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground/50" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  A complete stack that transforms raw signals into measurable business outcomes. Each layer builds on the one below it, creating a system where data flows seamlessly from collection to action to ROI.
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
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${layer.color}15` }}
                          >
                            <layer.icon className="w-6 h-6" style={{ color: layer.color }} />
                          </div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Layer {layer.layer}</span>
                        </div>
                        <h3 className="text-base font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
                          {layer.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
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

          {/* Visual Diagram - Data Flow */}
          <section className="py-20 md:py-28 px-6 md:px-8 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">How It Works</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  From signals to outcomes
                </h2>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  NeuroState operates as a continuous loop: ingesting signals, interpreting state, predicting risk, recommending action, and measuring impact. Every insight is traceable. Every intervention is accountable.
                </p>
              </ScrollReveal>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                {/* Flow Diagram */}
                <div className="flex flex-col gap-4">
                  {/* Row 1 */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                    <div className="flex-1 p-6 rounded-2xl bg-background border border-border/50 text-center">
                      <Database className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h4 className="text-sm font-medium text-foreground mb-1">Signal Ingestion</h4>
                      <p className="text-[10px] text-muted-foreground">Wearables, behaviour, context</p>
                    </div>

                    <ChevronRight className="w-6 h-6 text-muted-foreground hidden md:block" />

                    <div className="flex-1 p-6 rounded-2xl bg-background border border-border/50 text-center">
                      <Cpu className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h4 className="text-sm font-medium text-foreground mb-1">State Interpretation</h4>
                      <p className="text-[10px] text-muted-foreground">Readiness, load, risk</p>
                    </div>

                    <ChevronRight className="w-6 h-6 text-muted-foreground hidden md:block" />

                    <div className="flex-1 p-6 rounded-2xl bg-background border border-border/50 text-center">
                      <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h4 className="text-sm font-medium text-foreground mb-1">Prediction</h4>
                      <p className="text-[10px] text-muted-foreground">Forecasts, scenarios</p>
                    </div>
                  </div>

                  {/* Arrow down */}
                  <div className="flex justify-end pr-[16.5%] md:pr-[8%]">
                    <div className="w-0.5 h-8 bg-border" />
                  </div>

                  {/* Row 2 */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                    <div className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 text-center">
                      <Calculator className="w-8 h-8 text-accent mx-auto mb-3" />
                      <h4 className="text-sm font-medium text-foreground mb-1">ROI Measurement</h4>
                      <p className="text-[10px] text-muted-foreground">Financial attribution</p>
                    </div>

                    <ChevronRight className="w-6 h-6 text-muted-foreground rotate-180 hidden md:block" />

                    <div className="flex-1 p-6 rounded-2xl bg-background border border-border/50 text-center">
                      <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h4 className="text-sm font-medium text-foreground mb-1">Role Surfaces</h4>
                      <p className="text-[10px] text-muted-foreground">Tailored views</p>
                    </div>

                    <ChevronRight className="w-6 h-6 text-muted-foreground rotate-180 hidden md:block" />

                    <div className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 text-center">
                      <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h4 className="text-sm font-medium text-foreground mb-1">Intervention</h4>
                      <p className="text-[10px] text-muted-foreground">Actions, nudges</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Why This Matters */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Why This Matters</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    The cognitive infrastructure imperative
                  </h2>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="leading-relaxed">
                    In the knowledge economy, cognitive capacity is the scarcest resource. It determines the quality of decisions, the pace of innovation, and the resilience of teams under pressure. Yet most organisations have no systematic way to measure, protect, or optimise it.
                  </p>
                  <p className="leading-relaxed">
                    The cost of this blind spot is enormous. Burnout drives turnover. Cognitive fatigue degrades decision quality. Recovery debt compounds until high performers leave or break down. And because none of this is visible, leadership cannot intervene until it's too late.
                  </p>
                  <p className="leading-relaxed">
                    NeuroState changes the equation. By making cognitive state visible, predictable, and actionable, we give organisations the ability to protect their most valuable asset: the minds of their people.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 md:py-28 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Ready to build cognitive infrastructure?
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Speak with our team to understand how NeuroState can transform your organisation's approach to performance and resilience.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <Link to="/contact">
                    <Button className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </Link>
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