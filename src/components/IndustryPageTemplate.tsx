import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowUpRight, Check, LucideIcon, Activity, Brain, AlertTriangle, Zap, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


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
          {/* Hero Section - Clean, minimal */}
          <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">{industry.name}</span>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground tracking-tight leading-[1.1] max-w-4xl">
                  {industry.headline}
                </h1>

                <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                  {industry.subheadline}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link to="/contact">
                    <Button className="h-10 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/solutions">
                    <Button variant="ghost" className="h-10 px-5 text-sm font-medium rounded-full hover:bg-foreground/5">
                      Explore solutions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Stats Row - Flowing, no boxes */}
          <section className="py-12 px-6 md:px-8 border-y border-border/30">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap justify-between gap-8 md:gap-10">
                {industry.heroStats.map((stat, i) => (
                  <motion.div 
                    key={i} 
                    className="text-left group cursor-default"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl md:text-4xl font-light text-foreground mb-1 group-hover:text-primary transition-colors">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* The Problem - Flowing text, no boxes */}
          {industry.industryProblem && (
            <section className="py-20 px-6 md:px-8">
              <div className="max-w-3xl mx-auto">
                <ScrollReveal className="space-y-8">
                  <div className="space-y-4">
                    <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">The Challenge</span>
                    <h2 className="text-3xl md:text-4xl font-normal text-foreground leading-tight">
                      {industry.industryProblem.title}
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {industry.industryProblem.paragraphs.slice(0, 2).map((para, i) => (
                      <p key={i} className="text-base text-muted-foreground leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}

          {/* Challenges - Flowing list with subtle dividers */}
          <section className="py-20 px-6 md:px-8 bg-muted/20">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-12">
                <div className="space-y-4">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Key Challenges</span>
                  <h2 className="text-3xl font-normal text-foreground">
                    What {industry.name} teams face
                  </h2>
                </div>

                <div className="space-y-0">
                  {industry.challenges.slice(0, 4).map((challenge, i) => (
                    <motion.div
                      key={i}
                      className="py-6 border-b border-border/30 last:border-0"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-6">
                        <span className="text-sm text-muted-foreground/50 font-mono mt-1">0{i + 1}</span>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-foreground mb-2">{challenge.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{challenge.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Why Existing Solutions Fail - Two column flowing layout */}
          {industry.whyExistingSolutionsFail && (
            <section className="py-20 px-6 md:px-8">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal className="space-y-16">
                  <div className="max-w-3xl space-y-4">
                    <span className="text-[11px] tracking-[0.15em] uppercase text-destructive/80 font-medium">Current Gaps</span>
                    <h2 className="text-3xl md:text-4xl font-normal text-foreground leading-tight">
                      {industry.whyExistingSolutionsFail.title}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
                    {industry.whyExistingSolutionsFail.failures.slice(0, 4).map((failure, i) => (
                      <motion.div
                        key={i}
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-destructive/60" />
                          <h3 className="text-base font-medium text-foreground">{failure.point}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-4">{failure.explanation}</p>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}

          {/* How NeuroState Applies - Clean flowing layout */}
          {industry.howNeuroStateApplies && (
            <section className="py-20 px-6 md:px-8 bg-muted/20">
              <div className="max-w-5xl mx-auto">
                <ScrollReveal className="space-y-16">
                  <div className="max-w-3xl space-y-4">
                    <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Our Approach</span>
                    <h2 className="text-3xl md:text-4xl font-normal text-foreground leading-tight">
                      {industry.howNeuroStateApplies.title}
                    </h2>
                    {industry.howNeuroStateApplies.paragraphs[0] && (
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {industry.howNeuroStateApplies.paragraphs[0]}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
                    {industry.howNeuroStateApplies.workflows.slice(0, 4).map((workflow, i) => (
                      <motion.div
                        key={i}
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <h3 className="text-base font-medium text-foreground">{workflow.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-4">{workflow.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}

          {/* Capabilities - Minimal, flowing */}
          <section className="py-20 px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="space-y-16">
                <div className="space-y-4">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Capabilities</span>
                  <h2 className="text-3xl font-normal text-foreground">
                    Built for {industry.name}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                  {industry.capabilities.slice(0, 4).map((cap, i) => (
                    <motion.div
                      key={i}
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <cap.icon className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-medium text-foreground">{cap.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Outcomes - Large numbers, flowing layout */}
          <section className="py-20 px-6 md:px-8 bg-foreground text-background">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="space-y-16">
                <div className="space-y-4">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-background/60 font-medium">Outcomes</span>
                  <h2 className="text-3xl font-normal text-background">
                    Measurable impact
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                  {industry.outcomes.map((outcome, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="text-4xl md:text-5xl font-light text-background mb-2">{outcome.metric}</div>
                      <div className="text-sm text-background/60">{outcome.label}</div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Use Cases - Simple list */}
          <section className="py-20 px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal className="space-y-12">
                <div className="space-y-4">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Use Cases</span>
                  <h2 className="text-3xl font-normal text-foreground">
                    How teams use NeuroState
                  </h2>
                </div>

                <div className="space-y-0">
                  {industry.useCases.slice(0, 4).map((useCase, i) => (
                    <motion.div
                      key={i}
                      className="py-6 border-b border-border/30 last:border-0"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-6">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-foreground mb-1">{useCase.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-20 px-6 md:px-8 bg-muted/20">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Get Started</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  The cognitive operating system for {industry.name}
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Connect your data, understand your patterns, and unlock sustainable performance at scale.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact">
                    <Button className="h-11 px-7 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/team-dashboard">
                    <Button variant="outline" className="h-11 px-6 text-sm font-medium rounded-full border-foreground/20">
                      View Team Dashboard
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