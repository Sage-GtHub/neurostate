import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, Check, LucideIcon, Activity, Brain, AlertTriangle, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EnterpriseROICalculator } from "@/components/EnterpriseROICalculator";

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
                  <a href="https://calendly.com/neurostate/30min" target="_blank" rel="noopener noreferrer">
                    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        <span className="flex items-center">
                          Book a demo
                          <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </Button>
                    </motion.div>
                  </a>
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

          {/* Industry Problem Deep Dive Section */}
          {industry.industryProblem && (
            <section className="py-20 md:py-28 px-6 md:px-8 bg-muted/30">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal className="space-y-8">
                  <div className="text-center space-y-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Problem</span>
                    <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                      {industry.industryProblem.title}
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    {industry.industryProblem.paragraphs.map((paragraph, i) => (
                      <motion.p 
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}

          {/* Challenges Section */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Challenge</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Why {industry.name} needs cognitive infrastructure
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industry.challenges.map((challenge, i) => (
                  <motion.div
                    key={i}
                    className="p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h3 className="text-sm font-medium text-foreground mb-2">{challenge.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{challenge.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Existing Solutions Fail */}
          {industry.whyExistingSolutionsFail && (
            <section className="py-20 md:py-28 px-6 md:px-8 bg-destructive/5">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal className="text-center mb-12 space-y-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-destructive font-medium">Why Existing Solutions Fail</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    {industry.whyExistingSolutionsFail.title}
                  </h2>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-6">
                  {industry.whyExistingSolutionsFail.failures.map((failure, i) => (
                    <motion.div
                      key={i}
                      className="p-6 rounded-2xl bg-background border border-destructive/20"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-foreground mb-2">{failure.point}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{failure.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* How NeuroState Applies */}
          {industry.howNeuroStateApplies && (
            <section className="py-20 md:py-28 px-6 md:px-8">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal className="text-center mb-12 space-y-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">How NeuroState Applies</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    {industry.howNeuroStateApplies.title}
                  </h2>
                </ScrollReveal>

                <div className="space-y-8 mb-12">
                  {industry.howNeuroStateApplies.paragraphs.map((paragraph, i) => (
                    <motion.p 
                      key={i}
                      className="text-sm text-muted-foreground leading-relaxed max-w-3xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Workflow Examples */}
                <div className="grid md:grid-cols-2 gap-6">
                  {industry.howNeuroStateApplies.workflows.map((workflow, i) => (
                    <motion.div
                      key={i}
                      className="p-6 rounded-2xl bg-primary/5 border border-primary/10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-foreground mb-2">{workflow.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{workflow.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Relevant Signals Section */}
          {industry.relevantSignals && (
            <section className="py-20 md:py-28 px-6 md:px-8 bg-muted/30">
              <div className="max-w-6xl mx-auto">
                <ScrollReveal className="text-center mb-12 space-y-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Signal Intelligence</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    Critical signals for {industry.name}
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                    Different industries require different signal priorities. These are the data streams that matter most for cognitive performance in {industry.name.toLowerCase()}.
                  </p>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {industry.relevantSignals.map((signal, i) => (
                    <motion.div
                      key={i}
                      className="p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/20 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Activity className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-sm font-medium text-foreground">{signal.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{signal.description}</p>
                      <div className="pt-3 border-t border-border/50">
                        <p className="text-[10px] text-primary uppercase tracking-wider mb-1">Why it matters</p>
                        <p className="text-xs text-muted-foreground">{signal.importance}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ROI Calculator - Landscape on Desktop */}
          <section className="py-12 md:py-16 px-6 md:px-8 bg-background">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-8 space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">ROI Calculator</span>
                <h2 className="text-xl md:text-2xl font-normal text-foreground">
                  Calculate your potential savings
                </h2>
              </ScrollReveal>
              <EnterpriseROICalculator variant="light" defaultIndustry={industry.defaultIndustry} />
            </div>
          </section>

          {/* Capabilities Section */}
          <section className="py-20 md:py-28 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Capabilities</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Purpose-built for {industry.name}
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-6">
                {industry.capabilities.map((cap, i) => (
                  <motion.div
                    key={i}
                    className="p-6 rounded-2xl bg-background border border-border/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <cap.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-medium text-foreground mb-2">{cap.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{cap.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Executive Outcomes Section */}
          {industry.executiveOutcomes && (
            <section className="py-20 md:py-28 px-6 md:px-8">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal className="text-center mb-12 space-y-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Executive Outcomes</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    What leadership cares about
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                    NeuroState translates cognitive intelligence into the metrics that matter to {industry.name.toLowerCase()} executives.
                  </p>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-6">
                  {industry.executiveOutcomes.map((outcome, i) => (
                    <motion.div
                      key={i}
                      className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Target className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-foreground mb-2">{outcome.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{outcome.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Outcomes Section */}
          <section className="py-20 md:py-28 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Outcomes</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Measurable impact
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {industry.outcomes.map((outcome, i) => (
                  <motion.div
                    key={i}
                    className="text-center p-6 rounded-2xl bg-background border border-primary/10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-3xl md:text-4xl font-medium text-primary mb-2">{outcome.metric}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{outcome.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Use Cases</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  How teams use NeuroState
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-6">
                {industry.useCases.map((useCase, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-muted/30 border border-border/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground mb-1">{useCase.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{useCase.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 md:py-28 px-6 md:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Ready to optimise cognitive performance?
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