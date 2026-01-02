import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, Database, Watch, Activity, MapPin, Layers, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CognitiveDataLayer() {
  return (
    <>
      <SEO
        title="Cognitive Data Layer | NeuroState Solutions"
        description="NeuroState connects to the tools teams already use and unifies them into a single cognitive data model."
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
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Layer 1</span>
                <h1 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mt-2 mb-4">
                  Cognitive Data Layer
                </h1>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  NeuroState connects to the tools teams already use and unifies them into a single cognitive data model.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Signal Types */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <h2 className="text-2xl font-normal text-foreground">Three signal categories</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  We ingest and normalise data across biometric, behavioural, and contextual dimensions.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.div 
                  className="p-6 rounded-2xl bg-background border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Watch className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-sm font-medium text-foreground mb-2">Wearable Signals</h3>
                  <p className="text-xs text-muted-foreground mb-4">Sleep quality, recovery metrics, stress indicators, HRV, resting heart rate.</p>
                  <ul className="space-y-2">
                    {['Oura', 'WHOOP', 'Apple Watch', 'Garmin', 'Fitbit'].map(device => (
                      <li key={device} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <Check className="w-3 h-3 text-primary" />
                        {device}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  className="p-6 rounded-2xl bg-background border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Activity className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-sm font-medium text-foreground mb-2">Behavioural Signals</h3>
                  <p className="text-xs text-muted-foreground mb-4">Work patterns, meeting rhythm, deep work windows, activity levels.</p>
                  <ul className="space-y-2">
                    {['Calendar analysis', 'Focus time', 'Context switching', 'Work rhythm'].map(item => (
                      <li key={item} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <Check className="w-3 h-3 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  className="p-6 rounded-2xl bg-background border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <MapPin className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-sm font-medium text-foreground mb-2">Contextual Signals</h3>
                  <p className="text-xs text-muted-foreground mb-4">Environment factors, timing, workload, deadlines, travel impact.</p>
                  <ul className="space-y-2">
                    {['Time zone shifts', 'Deadline pressure', 'Environmental factors', 'Workload density'].map(item => (
                      <li key={item} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <Check className="w-3 h-3 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Unified Model */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="text-center space-y-6">
                <Layers className="w-12 h-12 text-primary mx-auto" />
                <h2 className="text-2xl font-normal text-foreground">Many signals. One coherent model.</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Raw data from disparate sources is normalised into a unified cognitive data model that powers all downstream intelligence.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-xl font-normal text-foreground">Ready to unify your cognitive data?</h2>
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
