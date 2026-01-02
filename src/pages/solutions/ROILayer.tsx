import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, Calculator, TrendingUp, Clock, DollarSign, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EnterpriseROICalculator } from "@/components/EnterpriseROICalculator";

const economicMetrics = [
  { icon: DollarSign, title: "Burnout & turnover exposure", description: "The true cost of losing people—recruitment, onboarding, lost institutional knowledge." },
  { icon: TrendingUp, title: "Cognitive underperformance", description: "Hidden productivity loss from suboptimal cognitive states that never shows up in timesheets." },
  { icon: Clock, title: "Recovery value over time", description: "Compounding returns from sustained performance improvements." },
  { icon: Target, title: "Payback period & ROI", description: "Clear investment returns that make the business case self-evident." },
];

export default function ROILayer() {
  return (
    <>
      <SEO
        title="Economic & ROI Layer | NeuroState Solutions"
        description="NeuroState translates cognitive risk into economic reality. This is where performance becomes measurable."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="relative py-20 lg:py-28 px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Layer 6</span>
                <h1 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mt-2 mb-4">
                  Economic & ROI Layer
                </h1>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  NeuroState translates cognitive risk into economic reality. This is where performance becomes measurable—and buyable.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Economic Metrics */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <h2 className="text-2xl font-normal text-foreground">Cognitive risk as economic reality</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  We quantify what was previously invisible.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-6">
                {economicMetrics.map((metric, i) => (
                  <motion.div 
                    key={metric.title}
                    className="p-6 rounded-2xl bg-background border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <metric.icon className="w-6 h-6 text-primary mb-3" />
                    <h3 className="text-sm font-medium text-foreground mb-2">{metric.title}</h3>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ROI Calculator */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-10 space-y-3">
                <h2 className="text-2xl font-normal text-foreground">Calculate your potential</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  See what cognitive infrastructure could deliver for your organisation.
                </p>
              </ScrollReveal>
              <EnterpriseROICalculator variant="light" />
            </div>
          </section>

          {/* Closing */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-2xl font-normal text-foreground">This is where performance becomes measurable.</h2>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <a href="https://calendly.com/neurostate/30min" target="_blank" rel="noopener noreferrer">
                    <Button className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </a>
                  <Link to="/solutions">
                    <Button variant="outline" className="h-11 px-6 text-xs font-medium rounded-full">
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
