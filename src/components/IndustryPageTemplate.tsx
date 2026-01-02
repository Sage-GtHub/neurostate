import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, Check, LucideIcon, Activity, Brain, AlertTriangle, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EnterpriseROICalculator } from "@/components/EnterpriseROICalculator";
import { DataFlowVisualization, SignalFlowVisual } from "@/components/DataFlowVisualization";

interface Signal {
  name: string;
  description: string;
  importance: string;
}

interface IndustryProblemSection {
  title: string;
  paragraphs: string[];
}

interface WhyExistingSolutionsFail {
  title: string;
  failures: { point: string; explanation: string }[];
}

interface HowNeuroStateApplies {
  title: string;
  paragraphs: string[];
  workflows: { title: string; description: string }[];
}

interface IndustryPageProps {
  industry: {
    name: string;
    slug: string;
    headline: string;
    subheadline: string;
    heroStats: { value: string; label: string }[];
    challenges: { title: string; description: string }[];
    capabilities: { icon: LucideIcon; title: string; description: string }[];
    outcomes: { metric: string; label: string }[];
    useCases: { title: string; description: string }[];
    defaultIndustry: "saas-high-growth" | "saas-enterprise" | "financial-services" | "professional-services" | "healthcare" | "government-defense" | "tech-hardware";
    // Enhanced content sections
    industryProblem?: IndustryProblemSection;
    whyExistingSolutionsFail?: WhyExistingSolutionsFail;
    howNeuroStateApplies?: HowNeuroStateApplies;
    relevantSignals?: Signal[];
    executiveOutcomes?: { title: string; description: string }[];
  };
}

export function IndustryPageTemplate({ industry }: IndustryPageProps) {
  return (
    <>
      <SEO
        title={`${industry.name} | NeuroState Cognitive Performance`}
        description={industry.subheadline}
      />
      <div className="min-h-screen bg-background">
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
              className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.08, 0.06] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 py-20 lg:py-28">
              <motion.div
                className="max-w-3xl mx-auto text-center space-y-6"
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
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{industry.name}</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground tracking-tight">
                  {industry.headline}
                </h1>

                <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  {industry.subheadline}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <Link to="/contact">
                    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        <span className="flex items-center">
                          Book a demo
                          <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="h-10 px-5 text-xs font-medium rounded-full border-foreground/20 hover:bg-foreground/5">
                      Contact us
                    </Button>
                  </Link>
                </div>

                {/* Hero Stats */}
                <div className="flex flex-wrap justify-center gap-8 pt-8">
                  {industry.heroStats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl md:text-3xl font-medium text-foreground">{stat.value}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ROI Calculator - Directly Under Hero */}
          <section className="py-10 md:py-12 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-6 space-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">ROI Calculator</span>
                <h2 className="text-lg md:text-xl font-normal text-foreground">
                  Calculate your potential savings
                </h2>
              </ScrollReveal>
              <EnterpriseROICalculator variant="light" defaultIndustry={industry.defaultIndustry} />
            </div>
          </section>

          {/* Industry Problem - Condensed */}
          {industry.industryProblem && (
            <section className="py-12 md:py-16 px-6 md:px-8">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal className="space-y-4">
                  <div className="text-center space-y-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Problem</span>
                    <h2 className="text-xl md:text-2xl font-normal text-foreground">
                      {industry.industryProblem.title}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
                    {industry.industryProblem.paragraphs[0]}
                  </p>
                </ScrollReveal>
              </div>
            </section>
          )}

          {/* Challenges Section - Compact */}
          <section className="py-12 md:py-16 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-8 space-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Key Challenges</span>
                <h2 className="text-xl md:text-2xl font-normal text-foreground">
                  Why {industry.name} needs cognitive infrastructure
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-3 gap-4">
                {industry.challenges.slice(0, 3).map((challenge, i) => (
                  <motion.div
                    key={i}
                    className="p-4 rounded-xl bg-background border border-border/50 hover:border-primary/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h3 className="text-xs font-medium text-foreground mb-1">{challenge.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{challenge.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Existing Solutions Fail - Condensed */}
          {industry.whyExistingSolutionsFail && (
            <section className="py-12 md:py-16 px-6 md:px-8">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal className="text-center mb-8 space-y-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-destructive font-medium">Current Gaps</span>
                  <h2 className="text-xl md:text-2xl font-normal text-foreground">
                    {industry.whyExistingSolutionsFail.title}
                  </h2>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-4">
                  {industry.whyExistingSolutionsFail.failures.slice(0, 4).map((failure, i) => (
                    <motion.div
                      key={i}
                      className="p-4 rounded-xl bg-background border border-destructive/20"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-xs font-medium text-foreground mb-1">{failure.point}</h3>
                          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{failure.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* How NeuroState Applies - Compact */}
          {industry.howNeuroStateApplies && (
            <section className="py-12 md:py-16 px-6 md:px-8 bg-muted/30">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal className="text-center mb-8 space-y-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Our Approach</span>
                  <h2 className="text-xl md:text-2xl font-normal text-foreground">
                    {industry.howNeuroStateApplies.title}
                  </h2>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-4">
                  {industry.howNeuroStateApplies.workflows.slice(0, 4).map((workflow, i) => (
                    <motion.div
                      key={i}
                      className="p-4 rounded-xl bg-primary/5 border border-primary/10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-xs font-medium text-foreground mb-1">{workflow.title}</h3>
                          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{workflow.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Relevant Signals - Condensed */}
          {industry.relevantSignals && (
            <section className="py-12 md:py-16 px-6 md:px-8">
              <div className="max-w-6xl mx-auto">
                <ScrollReveal className="text-center mb-8 space-y-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Signal Intelligence</span>
                  <h2 className="text-xl md:text-2xl font-normal text-foreground">
                    Critical signals for {industry.name}
                  </h2>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-4">
                  {industry.relevantSignals.slice(0, 3).map((signal, i) => (
                    <motion.div
                      key={i}
                      className="p-4 rounded-xl bg-background border border-border/50 hover:border-primary/20 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-primary" />
                        <h3 className="text-xs font-medium text-foreground">{signal.name}</h3>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{signal.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Capabilities Section - Compact */}
          <section className="py-12 md:py-16 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-8 space-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Capabilities</span>
                <h2 className="text-xl md:text-2xl font-normal text-foreground">
                  Purpose-built for {industry.name}
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {industry.capabilities.slice(0, 4).map((cap, i) => (
                  <motion.div
                    key={i}
                    className="p-4 rounded-xl bg-background border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <cap.icon className="w-5 h-5 text-primary mb-2" />
                    <h3 className="text-xs font-medium text-foreground mb-1">{cap.title}</h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{cap.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Executive Outcomes - Condensed */}
          {industry.executiveOutcomes && (
            <section className="py-12 md:py-16 px-6 md:px-8">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal className="text-center mb-8 space-y-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Executive Outcomes</span>
                  <h2 className="text-xl md:text-2xl font-normal text-foreground">
                    What leadership cares about
                  </h2>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-4">
                  {industry.executiveOutcomes.slice(0, 4).map((outcome, i) => (
                    <motion.div
                      key={i}
                      className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <Target className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-xs font-medium text-foreground mb-1">{outcome.title}</h3>
                          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{outcome.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Outcomes Section - Compact */}
          <section className="py-12 md:py-16 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-8 space-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Outcomes</span>
                <h2 className="text-xl md:text-2xl font-normal text-foreground">
                  Measurable impact
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {industry.outcomes.map((outcome, i) => (
                  <motion.div
                    key={i}
                    className="text-center p-4 rounded-xl bg-background border border-primary/10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-2xl md:text-3xl font-medium text-primary mb-1">{outcome.metric}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{outcome.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases - Compact */}
          <section className="py-12 md:py-16 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-8 space-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Use Cases</span>
                <h2 className="text-xl md:text-2xl font-normal text-foreground">
                  How teams use NeuroState
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-4">
                {industry.useCases.slice(0, 4).map((useCase, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs font-medium text-foreground mb-1">{useCase.title}</h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{useCase.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section - Compact */}
          <section className="py-12 md:py-16 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal className="space-y-4">
                <h2 className="text-xl md:text-2xl font-normal text-foreground">
                  Ready to optimise cognitive performance?
                </h2>
                <p className="text-xs text-muted-foreground max-w-lg mx-auto">
                  Speak with our team to understand how NeuroState can transform your organisation.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Link to="/contact">
                    <Button className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="h-10 px-5 text-xs font-medium rounded-full">
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