import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, Zap, User, Users, Bell, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const actionTypes = [
  { icon: User, title: "Personal coaching prompts", description: "Timely, contextual nudges that guide individuals toward better decisions—when to push, when to recover." },
  { icon: Clock, title: "Workload timing recommendations", description: "Suggestions for when to schedule high-stakes work based on predicted cognitive capacity." },
  { icon: Users, title: "Manager nudges", description: "Alerts when team members may need support, without exposing individual data." },
  { icon: Bell, title: "Preventative interventions", description: "Early warnings that prevent breakdown before it happens—not after." },
];

export default function ActionControlLayer() {
  return (
    <>
      <SEO
        title="Action & Control Layer | NeuroState Solutions"
        description="NeuroState converts intelligence into clear, low-friction actions that drive outcomes."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="relative py-20 lg:py-28 px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Layer 4</span>
                <h1 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mt-2 mb-4">
                  Action & Control Layer
                </h1>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  NeuroState converts intelligence into clear, low-friction actions that drive measurable outcomes.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Action Types */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <h2 className="text-2xl font-normal text-foreground">From insight to action</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Insight without action is noise. We close the loop.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-6">
                {actionTypes.map((action, i) => (
                  <motion.div 
                    key={action.title}
                    className="p-6 rounded-2xl bg-background border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <action.icon className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-sm font-medium text-foreground mb-2">{action.title}</h3>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-2xl font-normal text-foreground">Insight without action is noise.</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Every recommendation is designed for low friction and high impact. We don't overwhelm—we intervene precisely, when it matters.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-xl font-normal text-foreground">See the Action Layer in practice</h2>
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
