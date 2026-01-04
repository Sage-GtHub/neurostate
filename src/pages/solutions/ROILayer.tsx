import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SolutionPageStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";
import { ArrowUpRight, Calculator, TrendingUp, Clock, DollarSign, Target, PoundSterling, AlertTriangle, Users, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EnterpriseROICalculator } from "@/components/EnterpriseROICalculator";
import { SolutionDataFlowDiagram } from "@/components/SolutionDataFlowDiagram";

const economicDimensions = [
  { 
    icon: AlertTriangle, 
    title: "Burnout & Turnover Exposure", 
    description: "The true cost of losing people is far higher than most organisations realise. It includes not just recruitment and onboarding costs, but lost institutional knowledge, team disruption, reduced capacity during backfill, and the compounding effect on remaining team members.",
    metrics: [
      { label: "Average cost to replace", value: "1.5-2x salary" },
      { label: "Productivity gap during ramp", value: "6-12 months" },
      { label: "Team impact multiplier", value: "1.3x per departure" },
    ],
    calculation: "NeuroState quantifies your turnover exposure by combining current burnout trajectory with historical departure correlation. You see not just risk—but the pound value of that risk."
  },
  { 
    icon: TrendingUp, 
    title: "Cognitive Underperformance", 
    description: "Hidden productivity loss from suboptimal cognitive states never shows up in timesheets. But it's real. A team operating at 70% cognitive capacity isn't producing 70% of outcomes—the relationship is non-linear, especially for knowledge work.",
    metrics: [
      { label: "Focus loss impact", value: "12-18% output reduction" },
      { label: "Decision quality degradation", value: "2.3x error rate at low readiness" },
      { label: "Meeting effectiveness decline", value: "40% when fatigued" },
    ],
    calculation: "NeuroState correlates cognitive metrics with performance indicators to model the hidden cost of operating below capacity. This becomes visible—and actionable."
  },
  { 
    icon: Clock, 
    title: "Recovery Value Over Time", 
    description: "Improving cognitive health isn't a one-time fix—it compounds. Teams that recover well perform better, stay longer, and create virtuous cycles of performance. This is the long-term value that justifies upfront investment.",
    metrics: [
      { label: "Readiness improvement trajectory", value: "+2-5 points/quarter" },
      { label: "Burnout risk reduction", value: "35-50% within 6 months" },
      { label: "Sustained performance uplift", value: "15-25% over 12 months" },
    ],
    calculation: "We project recovery trajectory based on intervention adoption and baseline patterns. You see the compounding value of sustained cognitive health improvements."
  },
  { 
    icon: Target, 
    title: "Payback Period & ROI", 
    description: "Clear investment returns that make the business case self-evident. NeuroState isn't sold on wellness benefits—it's sold on financial return. If we can't show ROI, we haven't done our job.",
    metrics: [
      { label: "Typical payback period", value: "4-8 months" },
      { label: "First-year ROI", value: "2-4x investment" },
      { label: "Three-year NPV multiple", value: "6-10x investment" },
    ],
    calculation: "ROI is calculated from avoided turnover, recovered productivity, and reduced absenteeism. Every number is defensible."
  },
];

const reportingExamples = [
  { title: "Monthly Executive Summary", description: "CCI trend, exposure reduction, intervention ROI—one page, board-ready" },
  { title: "Intervention Impact Report", description: "What we recommended, what was done, what changed, value recovered" },
  { title: "Quarterly Business Review", description: "Comprehensive analysis with department breakdown and forecast" },
  { title: "Budget Justification Package", description: "Everything finance needs to approve continued investment" },
];

export default function ROILayer() {
  return (
    <>
      <SEO
        title="Economic & ROI Layer | Financial Attribution | NeuroState"
        description="Translate cognitive risk into business value. See the cost of burnout, price of underperformance, and return on intervention—in pounds, not platitudes."
        keywords="wellness ROI, burnout cost calculation, cognitive performance ROI, workforce investment returns, turnover cost prevention, productivity loss attribution, business case wellness"
      />
      <SolutionPageStructuredData
        solution={{
          name: "Economic & ROI Layer",
          description: "Cognitive risk translated to business value. See the cost of burnout, the price of underperformance, and the return on intervention—in pounds, not platitudes.",
          url: "https://neurostate.co.uk/solutions/roi-layer",
          features: ["Burnout cost quantification", "Turnover exposure calculation", "Intervention ROI tracking", "Board-ready reporting", "Financial attribution"]
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://neurostate.co.uk" },
          { name: "Solutions", url: "https://neurostate.co.uk/solutions" },
          { name: "Economic & ROI Layer", url: "https://neurostate.co.uk/solutions/roi-layer" }
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
                  <Calculator className="w-8 h-8 text-primary" />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Layer 6 of 6</span>
                <h1 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mt-2 mb-4">
                  Economic & ROI Layer
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  NeuroState translates cognitive risk into economic reality. This is where performance becomes measurable—and where cognitive infrastructure proves its value in pounds, not platitudes.
                </p>
                
                {/* Animated Data Flow Diagram */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <SolutionDataFlowDiagram variant="roi" className="mt-12" />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ROI Calculator - Directly Under Hero */}
          <section className="py-12 md:py-16 px-6 md:px-8">
            <EnterpriseROICalculator />
          </section>

          {/* Why Economics Matter */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Business Case</span>
                  <h2 className="text-2xl font-normal text-foreground">Why cognitive health needs a price tag</h2>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <p className="leading-relaxed">
                    Wellness programmes have traditionally struggled to justify their existence. They feel good, they might help morale, but when budgets tighten they're the first to go. Why? Because they can't prove ROI.
                  </p>
                  <p className="leading-relaxed">
                    NeuroState is different. We built economic accountability into the core of the system. Every metric we track connects to a financial outcome. Every intervention we recommend comes with an expected return. Every decision you make is informed by its impact on the bottom line.
                  </p>
                  <p className="leading-relaxed">
                    This isn't about reducing humans to numbers. It's about giving cognitive health the legitimacy it deserves in business conversations. When you can show that a recovery programme returned £120,000 in avoided turnover, suddenly wellness has a seat at the strategy table.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Economic Dimensions - Detailed */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Economic Dimensions</span>
                <h2 className="text-2xl font-normal text-foreground">Four ways we quantify value</h2>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  Each dimension represents a different way cognitive health impacts the business. Together, they paint a complete picture of value.
                </p>
              </ScrollReveal>

              <div className="space-y-8">
                {economicDimensions.map((dimension, i) => (
                  <motion.div 
                    key={dimension.title}
                    className="p-8 rounded-2xl bg-muted/30 border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-1/2">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <dimension.icon className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-lg font-medium text-foreground">{dimension.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{dimension.description}</p>
                        <div className="p-4 rounded-xl bg-background border border-border/30">
                          <span className="text-[10px] uppercase tracking-wider text-primary font-medium">How we calculate</span>
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{dimension.calculation}</p>
                        </div>
                      </div>
                      <div className="lg:w-1/2">
                        <h4 className="text-[10px] uppercase tracking-wider text-muted-foreground mb-4">Benchmark Metrics</h4>
                        <div className="space-y-4">
                          {dimension.metrics.map((metric, j) => (
                            <div key={j} className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/30">
                              <span className="text-xs text-muted-foreground">{metric.label}</span>
                              <span className="text-sm font-semibold text-primary">{metric.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ROI Calculator */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-10 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Interactive Tool</span>
                <h2 className="text-2xl font-normal text-foreground">Calculate your potential</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  See what cognitive infrastructure could deliver for your organisation. Adjust the inputs to match your context.
                </p>
              </ScrollReveal>
              <EnterpriseROICalculator variant="light" />
            </div>
          </section>

          {/* Reporting */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Accountability</span>
                <h2 className="text-2xl font-normal text-foreground">Reports that prove value</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Standard reports that make the business case undeniable—for the board, for finance, for anyone who asks "what did we get for this investment?"
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-6">
                {reportingExamples.map((report, i) => (
                  <motion.div 
                    key={report.title}
                    className="p-6 rounded-xl bg-muted/30 border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-1">{report.title}</h4>
                        <p className="text-xs text-muted-foreground">{report.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* The Loop Closes */}
          <section className="py-16 md:py-24 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-8">
                <div className="text-center space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Full Circle</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">This is where performance becomes measurable.</h2>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground text-center">
                  <p className="leading-relaxed">
                    The Economic & ROI Layer completes the NeuroState stack. Data flows in, gets interpreted, drives predictions, triggers actions, and produces measurable returns. Every step is accountable. Every intervention is tracked. Every pound invested is justified.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/50">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-xs text-foreground">Defensible ROI</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/50">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-xs text-foreground">Board-ready reporting</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/50">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-xs text-foreground">Continuous accountability</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Back to Solutions */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <Link to="/solutions">
                  <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Explore More</span>
                          <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">Back to Solutions Hub</h3>
                          <p className="text-xs text-muted-foreground">See all six layers of cognitive infrastructure</p>
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
                <h2 className="text-xl font-normal text-foreground">Ready to see your ROI?</h2>
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