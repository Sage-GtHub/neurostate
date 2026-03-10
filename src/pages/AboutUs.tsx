import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check, Brain, Zap, Target, Eye, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <>
      <SEO 
        title="About NeuroState | Cognitive Performance Infrastructure"
        description="NeuroState is a B2B SaaS platform building cognitive infrastructure for organisations. Predictive analytics, AI-driven insights, and workforce optimisation at enterprise scale."
        keywords="about NeuroState, cognitive performance SaaS, B2B analytics platform, workforce optimisation technology, enterprise AI software, cognitive infrastructure company"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>

          {/* Hero */}
          <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="max-w-3xl">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">About NeuroState</span>
                <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-medium text-foreground mt-4 tracking-tight leading-[1.08]">
                  Advancing human cognitive capacity{" "}
                  <span className="text-muted-foreground">through artificial intelligence.</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mt-6 leading-relaxed">
                  Most organisations measure outcomes, not the cognitive conditions that create them. We're changing that. NeuroState is a cognitive performance platform that predicts and guides, not just tracks.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* The Problem */}
          <section className="py-16 md:py-28 px-5 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                <ScrollReveal className="lg:sticky lg:top-28 self-start">
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">The Problem</span>
                  <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                    Modern work pushes cognitive limits.{" "}
                    <span className="text-muted-foreground">But teams operate blind.</span>
                  </h2>
                </ScrollReveal>

                <div className="space-y-6">
                  <ScrollReveal delay={0.1}>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Stress, fatigue, and cognitive overload build silently. Performance drops before anyone notices. Existing tools are reactive, fragmented, or purely descriptive.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      The result? Burnout incidents that could have been prevented. Inconsistent output that damages team momentum. Decision-making that deteriorates under pressure.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.3}>
                    <p className="text-base text-foreground font-medium leading-relaxed">
                      We built NeuroState because the future of work isn't about working harder. It's about working with precision.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section className="py-16 md:py-28 px-5 md:px-8 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Our Approach</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                  A cognitive operating layer.{" "}
                  <span className="text-muted-foreground">Not another dashboard.</span>
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Brain, title: "Forecast", desc: "Cognitive readiness and risk prediction before impact occurs." },
                  { icon: Eye, title: "Identify", desc: "Performance patterns and early warning signals over time." },
                  { icon: Target, title: "Recommend", desc: "Simple, actionable interventions tailored to the individual." },
                  { icon: TrendingUp, title: "Adapt", desc: "Continuous evolution based on response and environment." },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={0.08 * i}>
                    <motion.div 
                      className="group p-6 rounded-xl border border-border/40 bg-background hover:border-primary/30 transition-colors h-full"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.3} className="text-center mt-10">
                <p className="text-sm text-muted-foreground">
                  No dashboards to interpret. No guesswork. Just clear guidance.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* The Stack */}
          <section className="py-16 md:py-28 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal className="lg:sticky lg:top-28">
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">The Stack</span>
                  <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                    Three layers.{" "}
                    <span className="text-muted-foreground">One cognitive OS.</span>
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-sm mt-6">
                    We integrate wearable data, behavioural signals, and AI-driven forecasting to help organisations optimise workforce performance at scale.
                  </p>
                </ScrollReveal>

                <div className="space-y-0">
                  {[
                    { title: "Wearable Integrations", desc: "Sleep, recovery, HRV, stress: continuous biometric monitoring from the devices your team already uses. 40+ integrations, no hardware to buy.", num: "01" },
                    { title: "Behavioural Signals", desc: "Contextual patterns, work rhythms, and environmental factors that shape cognitive capacity across your organisation.", num: "02" },
                    { title: "AI-Driven Forecasting", desc: "Multi-model prediction engine that forecasts performance states and recommends interventions with measurable ROI.", num: "03" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="group py-7 border-b border-border/40 last:border-0 cursor-default"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 6 }}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] text-muted-foreground font-mono">{item.num}</span>
                            <div className="w-6 h-px bg-border group-hover:bg-primary/50 group-hover:w-10 transition-all duration-300" />
                          </div>
                          <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">{item.desc}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Impact */}
          <section className="py-16 md:py-28 px-5 md:px-8 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Impact</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground leading-[1.1]">
                  Enterprise-grade cognitive analytics.{" "}
                  <span className="text-muted-foreground">Measurable business outcomes.</span>
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                <ScrollReveal delay={0.1}>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-6 font-semibold">Business Outcomes</p>
                    <div className="space-y-0">
                      {[
                        { title: "Reduced turnover costs", desc: "Predict and prevent burnout before impact" },
                        { title: "Consistent team output", desc: "Sustainable high performance at scale" },
                        { title: "Better decision-making", desc: "Cognitive clarity under pressure" },
                        { title: "Quantified ROI", desc: "Financial attribution for every intervention" },
                      ].map((item, i) => (
                        <motion.div 
                          key={i}
                          className="flex items-start gap-3 py-4 border-b border-border/30 last:border-0 group"
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.15 + i * 0.08 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <div>
                            <span className="text-sm text-foreground font-medium">{item.title}</span>
                            <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-6 font-semibold">Enterprise Standards</p>
                    <div className="space-y-0">
                      {[
                        { title: "SOC 2 Type II certified", desc: "Enterprise security controls" },
                        { title: "GDPR compliant", desc: "Data protection by design" },
                        { title: "HIPAA ready", desc: "Healthcare-grade privacy" },
                        { title: "ISO 27001", desc: "Information security management" },
                      ].map((item, i) => (
                        <motion.div 
                          key={i}
                          className="flex items-start gap-3 py-4 border-b border-border/30 last:border-0 group"
                          initial={{ opacity: 0, x: 12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.15 + i * 0.08 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <div>
                            <span className="text-sm text-foreground font-medium">{item.title}</span>
                            <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-16 md:py-28 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal className="lg:sticky lg:top-28">
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Our Values</span>
                  <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                    Principles that{" "}
                    <span className="text-muted-foreground">shape every decision.</span>
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-sm mt-6">
                    These aren't marketing copy. They're the trade-offs we accept and the standards we hold ourselves to.
                  </p>
                </ScrollReveal>

                <div className="space-y-0">
                  {[
                    { title: "Science First", desc: "Every recommendation backed by peer-reviewed research. No wellness theatre.", num: "01" },
                    { title: "Prediction Over Reaction", desc: "Forecast problems before they impact. Prevention is the intervention.", num: "02" },
                    { title: "Precision at Scale", desc: "Personalised protocols that work for individuals and organisations alike.", num: "03" },
                    { title: "Radical Transparency", desc: "Show the data, cite the sources, explain the reasoning. Always.", num: "04" },
                    { title: "Continuous Evolution", desc: "The science advances. So do we. Constant iteration is the standard.", num: "05" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="group py-7 border-b border-border/40 last:border-0 cursor-default"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ x: 6 }}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] text-muted-foreground font-mono">{item.num}</span>
                            <div className="w-6 h-px bg-border group-hover:bg-primary/50 group-hover:w-10 transition-all duration-300" />
                          </div>
                          <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">{item.desc}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 md:py-32 px-5 md:px-8 bg-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Next Steps</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-background leading-[1.1]">
                  Cognitive strain is increasing.{" "}
                  <span className="text-background/60">Early adopters shape how these systems evolve.</span>
                </h2>
                <p className="text-base text-background/60 leading-relaxed max-w-lg mx-auto">
                  Let's explore whether NeuroState can help your team perform better.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Link to="/contact">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/nova/overview">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium rounded-full bg-transparent border border-background/30 text-background hover:bg-background/10">
                      Explore Nova
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
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
};

export default AboutUs;
