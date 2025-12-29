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
        title="About Us | Neurostate"
        description="Neurostate is building cognitive infrastructure that predicts and guides, not just tracks. AI for cognitive performance — from prediction to execution."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section - Invisible Tech Style */}
          <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="max-w-4xl">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">About Neurostate</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mt-4 leading-[1.1]">
                  Advancing human cognitive capacity
                  <br />
                  <span className="text-muted-foreground">through artificial intelligence.</span>
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mt-6">
                  Most organisations measure outcomes, not the cognitive conditions that create them. We're changing that. Neurostate is a cognitive performance platform that predicts and guides — not just tracks.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* The Problem */}
          <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                <ScrollReveal className="lg:sticky lg:top-28 self-start">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Problem</span>
                  <h2 className="text-3xl md:text-4xl font-light text-foreground mt-4">
                    Modern work pushes cognitive limits.
                    <br />
                    <span className="text-muted-foreground">But teams operate blind.</span>
                  </h2>
                </ScrollReveal>

                <div className="space-y-6">
                  <ScrollReveal delay={0.1}>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Stress, fatigue, and cognitive overload build silently. Performance drops before anyone notices. Existing tools are reactive, fragmented, or purely descriptive.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The result? Burnout incidents that could have been prevented. Inconsistent output that damages team momentum. Decision-making that deteriorates under pressure.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.3}>
                    <p className="text-sm text-foreground font-medium leading-relaxed">
                      We built Neurostate because the future of work isn't about working harder — it's about working with precision.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Our Approach</span>
                <h2 className="text-3xl md:text-4xl font-light text-foreground">
                  A cognitive operating layer.
                  <br />
                  <span className="text-muted-foreground">Not another dashboard.</span>
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    icon: Brain,
                    title: "Forecast", 
                    desc: "Cognitive readiness and risk prediction before impact occurs.",
                  },
                  { 
                    icon: Eye,
                    title: "Identify", 
                    desc: "Performance patterns and early warning signals over time.",
                  },
                  { 
                    icon: Target,
                    title: "Recommend", 
                    desc: "Simple, actionable interventions tailored to the individual.",
                  },
                  { 
                    icon: TrendingUp,
                    title: "Adapt", 
                    desc: "Continuous evolution based on response and environment.",
                  },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={0.1 * i}>
                    <motion.div 
                      className="p-6 rounded-2xl bg-foreground/[0.02] border border-border/30 h-full"
                      whileHover={{ y: -4, borderColor: "hsl(var(--primary) / 0.3)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-base font-medium text-foreground mb-2">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.4} className="text-center mt-12">
                <p className="text-sm text-muted-foreground">
                  No dashboards to interpret. No guesswork. Just clear guidance.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* What We Combine */}
          <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal className="lg:sticky lg:top-28">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Stack</span>
                  <h2 className="text-3xl md:text-4xl font-light text-foreground mt-4">
                    Three layers.
                    <br />
                    <span className="text-muted-foreground">One cognitive OS.</span>
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mt-6">
                    We combine wearable data, behavioural signals, and AI-driven forecasting to help individuals and teams perform better, earlier, and more consistently.
                  </p>
                </ScrollReveal>

                <StaggerContainer className="space-y-0" staggerDelay={0.1}>
                  {[
                    { 
                      title: "Wearable Integration", 
                      desc: "Sleep, recovery, HRV, stress — continuous biometric monitoring from the devices your team already uses.",
                      num: "01"
                    },
                    { 
                      title: "Behavioural Signals", 
                      desc: "Contextual patterns, work rhythms, and environmental factors that shape cognitive capacity.",
                      num: "02"
                    },
                    { 
                      title: "AI-Driven Forecasting", 
                      desc: "Multi-model prediction engine that forecasts performance states and recommends interventions.",
                      num: "03"
                    },
                  ].map((item, i) => (
                    <StaggerItem key={i}>
                      <motion.div 
                        className="group py-6 border-b border-border/50 last:border-0 cursor-default"
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-muted-foreground font-mono">{item.num}</span>
                              <motion.div 
                                className="w-6 h-px bg-border group-hover:bg-primary/50 group-hover:w-10 transition-all duration-300"
                              />
                            </div>
                            <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">{item.desc}</p>
                          </div>
                          <motion.div
                            whileHover={{ rotate: 45 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all duration-300 mt-1" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </section>

          {/* Why This Matters */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Impact</span>
                <h2 className="text-3xl md:text-4xl font-light text-foreground">
                  This isn't wellness for wellness' sake.
                  <br />
                  <span className="text-muted-foreground">It's performance infrastructure.</span>
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                <ScrollReveal delay={0.1} direction="left">
                  <div className="space-y-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-5 font-medium">Team Outcomes</p>
                    {[
                      { title: "Fewer burnout incidents", desc: "Predict and prevent before impact" },
                      { title: "More consistent output", desc: "Sustainable high performance" },
                      { title: "Improved decision-making", desc: "Cognitive clarity under pressure" },
                      { title: "Healthier, sustainable teams", desc: "Long-term capacity building" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0 group cursor-default"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors duration-300">
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <div>
                          <span className="text-sm text-foreground font-medium">{item.title}</span>
                          <p className="text-xs text-muted-foreground/70 mt-0.5">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2} direction="right">
                  <div className="space-y-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-5 font-medium">Enterprise Standards</p>
                    {[
                      { title: "SOC 2 Type II certified", desc: "Enterprise security controls" },
                      { title: "GDPR compliant", desc: "Data protection by design" },
                      { title: "HIPAA ready", desc: "Healthcare-grade privacy" },
                      { title: "ISO 27001", desc: "Information security management" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0 group cursor-default"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors duration-300">
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <div>
                          <span className="text-sm text-foreground font-medium">{item.title}</span>
                          <p className="text-xs text-muted-foreground/70 mt-0.5">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 md:py-28 px-6 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal className="lg:sticky lg:top-28">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Our Values</span>
                  <h2 className="text-3xl md:text-4xl font-light text-foreground mt-4">
                    Principles that
                    <br />
                    <span className="text-muted-foreground">shape every decision.</span>
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mt-6">
                    These aren't marketing copy. They're the trade-offs we accept and the standards we hold ourselves to.
                  </p>
                </ScrollReveal>

                <StaggerContainer className="space-y-0" staggerDelay={0.1}>
                  {[
                    { 
                      title: "Science First", 
                      desc: "Every recommendation backed by peer-reviewed research. No wellness theatre.",
                      num: "01"
                    },
                    { 
                      title: "Prediction Over Reaction", 
                      desc: "Forecast problems before they impact. Prevention is the intervention.",
                      num: "02"
                    },
                    { 
                      title: "Precision at Scale", 
                      desc: "Personalised protocols that work for individuals and organisations alike.",
                      num: "03"
                    },
                    { 
                      title: "Radical Transparency", 
                      desc: "Show the data, cite the sources, explain the reasoning. Always.",
                      num: "04"
                    },
                    { 
                      title: "Continuous Evolution", 
                      desc: "The science advances. So do we. Constant iteration is the standard.",
                      num: "05"
                    },
                  ].map((item, i) => (
                    <StaggerItem key={i}>
                      <motion.div 
                        className="group py-6 border-b border-border/50 last:border-0 cursor-default"
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-muted-foreground font-mono">{item.num}</span>
                              <motion.div 
                                className="w-6 h-px bg-border group-hover:bg-primary/50 group-hover:w-10 transition-all duration-300"
                              />
                            </div>
                            <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">{item.desc}</p>
                          </div>
                          <motion.div
                            whileHover={{ rotate: 45 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all duration-300 mt-1" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center max-w-2xl mx-auto space-y-6">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Next Steps</span>
                <h2 className="text-3xl md:text-4xl font-light text-foreground">
                  Cognitive strain is increasing.
                  <br />
                  <span className="text-muted-foreground">Early adopters shape how these systems evolve.</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Let's explore whether Neurostate can help your team perform better.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <a href="https://calendly.com/neurostate/30min" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="h-10 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </a>
                  <Link to="/nova/overview">
                    <Button variant="outline" size="sm" className="h-10 px-6 text-xs font-medium rounded-full border-border/50 hover:border-primary/50 hover:bg-transparent group">
                      Explore Nova
                      <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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