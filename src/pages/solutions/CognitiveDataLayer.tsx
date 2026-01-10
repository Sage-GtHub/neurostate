import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SolutionPageStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";
import { ArrowUpRight, ArrowRight, Database, Watch, Activity, MapPin, Layers, Check, ChevronRight, Cpu, Server, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SolutionDataFlowDiagram } from "@/components/SolutionDataFlowDiagram";


const signalSources = [
  {
    icon: Watch,
    category: "Wearable Signals",
    description: "Physiological data from consumer and enterprise wearables. Sleep architecture, recovery metrics, heart rate variability, resting heart rate, activity levels, and stress indicators.",
    sources: ["Oura Ring", "WHOOP", "Apple Watch", "Garmin", "Fitbit", "Polar", "Samsung Galaxy Watch"],
    dataPoints: ["Sleep stages & quality", "HRV & recovery", "Resting heart rate", "Activity & steps", "Respiratory rate", "Skin temperature"]
  },
  {
    icon: Activity,
    category: "Behavioural Signals",
    description: "Work patterns and digital behaviour that indicate cognitive load and focus. Calendar density, context switching, deep work windows, and communication patterns.",
    sources: ["Calendar integration", "Productivity tools", "Communication platforms", "Browser patterns"],
    dataPoints: ["Meeting density", "Focus time blocks", "Context switching frequency", "Response latency", "Work rhythm patterns", "After-hours activity"]
  },
  {
    icon: MapPin,
    category: "Contextual Signals",
    description: "Environmental and situational factors that affect cognitive performance. Time zone shifts, deadline pressure, workload spikes, and environmental conditions.",
    sources: ["Project management tools", "HR systems", "Location data", "Calendar context"],
    dataPoints: ["Deadline proximity", "Workload density", "Time zone shifts", "Travel frequency", "Team composition changes", "Organisational events"]
  }
];

export default function CognitiveDataLayer() {
  return (
    <>
      <SEO
        title="Data Integration | Unified Signal Ingestion | NeuroState"
        description="Connect wearables, calendars, and work tools into a unified cognitive data model. NeuroState's Data Integration layer normalises disparate signals into actionable intelligence."
        keywords="wearable data integration, biometric signals, HRV tracking, sleep analytics, work behaviour data, cognitive data unification, enterprise wellness data"
      />
      <SolutionPageStructuredData
        solution={{
          name: "Data Integration",
          description: "Unified signal ingestion from wearables, calendars, and work tools. NeuroState's Data Integration layer normalises disparate signals into actionable intelligence.",
          url: "https://neurostate.co.uk/solutions/data-layer",
          features: ["Wearable integration", "Behavioural signal capture", "Contextual data ingestion", "Real-time data normalisation", "Privacy-first architecture"]
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neurostate.co.uk" },
          { name: "Platform", url: "https://neurostate.co.uk/solutions" },
          { name: "Data Integration", url: "https://neurostate.co.uk/solutions/data-layer" }
        ]}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="relative py-20 lg:py-28 px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Layer 1 of 6</span>
                <h1 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mt-2 mb-4">
                  Data Integration
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  NeuroState connects to the tools your teams already use and unifies disparate data streams into a single, coherent cognitive model. No new hardware. No behaviour change. Just signal.
                </p>
              </motion.div>
              
              {/* Animated Data Flow Diagram */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <SolutionDataFlowDiagram variant="data-layer" className="mt-12" />
              </motion.div>
            </div>
          </section>

          {/* The Problem */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Challenge</span>
                  <h2 className="text-2xl font-normal text-foreground">Why data integration matters</h2>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="leading-relaxed">
                    Most organisations sit on a wealth of data that could reveal cognitive state, but it's fragmented across dozens of systems. Wearable data lives in consumer apps. Work patterns are buried in calendars and project tools. Contextual information is scattered across HR systems and communication platforms.
                  </p>
                  <p className="leading-relaxed">
                    Without integration, this data is useless for understanding cognitive capacity. A low HRV reading means nothing without knowing someone has a deadline tomorrow. A spike in after-hours work is concerning, but only if it's sustained. Recovery debt only matters in the context of upcoming demands.
                  </p>
                  <p className="leading-relaxed">
                    The Cognitive Data Layer solves this by creating a unified ingestion pipeline that normalises signals from any source into a common format, ready for interpretation by the Cognitive State Engine.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Signal Categories */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Signal Taxonomy</span>
                <h2 className="text-2xl font-normal text-foreground">Three categories of cognitive signal</h2>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  We ingest and normalise data across biometric, behavioural, and contextual dimensions. Each category provides a different lens on cognitive state. Together, they create a complete picture.
                </p>
              </ScrollReveal>

              <div className="space-y-6">
                {signalSources.map((source, i) => (
                  <motion.div 
                    key={source.category}
                    className="p-8 rounded-2xl bg-muted/30 border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <source.icon className="w-7 h-7 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-foreground mb-2">{source.category}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{source.description}</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Supported Sources</h4>
                            <div className="flex flex-wrap gap-2">
                              {source.sources.map(s => (
                                <span key={s} className="px-2.5 py-1 text-[10px] rounded-full bg-background border border-border/50 text-muted-foreground">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Data Points</h4>
                            <ul className="grid grid-cols-2 gap-1">
                              {source.dataPoints.map(dp => (
                                <li key={dp} className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Check className="w-3 h-3 text-primary flex-shrink-0" />
                                  {dp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Technical Architecture</span>
                <h2 className="text-2xl font-normal text-foreground">How data flows through NeuroState</h2>
              </ScrollReveal>

              <div className="space-y-4">
                <motion.div 
                  className="flex flex-col md:flex-row items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-1 p-6 rounded-xl bg-background border border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">1</div>
                      <h4 className="text-sm font-medium text-foreground">Signal Ingestion</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">OAuth integrations pull data from wearables and productivity tools. APIs connect to enterprise systems. All data flows through encrypted pipelines.</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground hidden md:block" />
                  <div className="flex-1 p-6 rounded-xl bg-background border border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">2</div>
                      <h4 className="text-sm font-medium text-foreground">Normalisation</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Raw data is cleaned, validated, and transformed into a common schema. Different devices and sources are standardised into comparable units.</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground hidden md:block" />
                  <div className="flex-1 p-6 rounded-xl bg-background border border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">3</div>
                      <h4 className="text-sm font-medium text-foreground">Unified Model</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Normalised signals are combined into a unified cognitive data model. A single source of truth ready for the State Engine.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Privacy & Security */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Privacy First</span>
                  <h2 className="text-2xl font-normal text-foreground">Data security is non-negotiable</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
                    <Shield className="w-6 h-6 text-primary mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-2">End-to-end encryption</h4>
                    <p className="text-xs text-muted-foreground">All data is encrypted in transit and at rest. We never store raw wearable data. Only derived metrics.</p>
                  </div>
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
                    <Server className="w-6 h-6 text-primary mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-2">User-owned data</h4>
                    <p className="text-xs text-muted-foreground">Individuals control their data. They choose what to share and can revoke access at any time.</p>
                  </div>
                  <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
                    <Layers className="w-6 h-6 text-primary mb-3" />
                    <h4 className="text-sm font-medium text-foreground mb-2">Aggregated by default</h4>
                    <p className="text-xs text-muted-foreground">Team and org views show aggregated metrics only. Individual data requires explicit consent.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Unified Model */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="text-center space-y-6">
                <Layers className="w-12 h-12 text-primary mx-auto" />
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">Many signals. One coherent model.</h2>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Raw data from disparate sources is normalised into a unified cognitive data model. This model powers all downstream intelligence, from state interpretation to prediction to intervention. Without this foundation, everything else would be guesswork.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Next Layer */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <Link to="/solutions/state-engine">
                  <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Cpu className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Next: Layer 2</span>
                          <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">State Intelligence</h3>
                          <p className="text-xs text-muted-foreground">Where raw data becomes meaningful intelligence</p>
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
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-xl font-normal text-foreground">Ready to unify your cognitive data?</h2>
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