import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <>
      <SEO 
        title="About Us | Neurostate"
        description="Neurostate is building the operating system for human performance. Learn about our mission, values, and the team behind cognitive infrastructure."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section - Clean typography */}
          <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="max-w-4xl">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">About</span>
                <h1 className="text-display text-foreground mt-4 leading-[1.1]">
                  Building the operating system
                  <br />
                  <span className="text-muted-foreground">for human performance.</span>
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mt-6">
                  We believe cognitive performance shouldn't be left to chance. Neurostate combines predictive AI, neuroscience, and precision interventions to give individuals and teams an unfair advantage.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Mission Statement - Flowing text */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                <ScrollReveal className="lg:sticky lg:top-28 self-start">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Mission</span>
                  <h2 className="text-large-display text-foreground mt-4">
                    Predict. Optimise.
                    <br />
                    <span className="text-muted-foreground">Outperform.</span>
                  </h2>
                </ScrollReveal>

                <div className="space-y-6">
                  <ScrollReveal delay={0.1}>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The future of work isn't about working harder—it's about working smarter. Yet most organisations treat cognitive performance as an afterthought, reacting to burnout rather than preventing it.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Neurostate changes this paradigm. We've built the first predictive cognitive infrastructure—an AI-powered platform that forecasts performance states, identifies risk patterns, and delivers precision interventions before problems occur.
                    </p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.3}>
                    <p className="text-sm text-foreground font-medium leading-relaxed">
                      From elite athletes to high-performance teams, we're enabling a new standard of sustained peak output.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>


          {/* Values - Clean list */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal className="lg:sticky lg:top-28">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Our Values</span>
                  <h2 className="text-large-display text-foreground mt-4">
                    Principles that
                    <br />
                    <span className="text-muted-foreground">guide everything.</span>
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mt-6">
                    These aren't just words on a wall. They're the decisions we make every day, the trade-offs we accept, and the standards we hold ourselves to.
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

          {/* Quality Standards - Simple comparison */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Quality Standards</span>
                <h2 className="text-large-display text-foreground">
                  Enterprise-grade.
                  <br />
                  <span className="text-muted-foreground">Research-validated.</span>
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                <ScrollReveal delay={0.1} direction="left">
                  <div className="space-y-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-5 font-medium">Security & Compliance</p>
                    {[
                      { title: "SOC 2 Type II certified", desc: "Enterprise security controls" },
                      { title: "GDPR compliant", desc: "Data protection by design" },
                      { title: "HIPAA ready", desc: "Healthcare-grade privacy" },
                      { title: "ISO 27001", desc: "Information security management" }
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
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-5 font-medium">Research Foundation</p>
                    {[
                      { title: "12 academic partnerships", desc: "Neuroscience & AI research" },
                      { title: "50+ peer-reviewed citations", desc: "Published methodology" },
                      { title: "Clinical validation studies", desc: "Ongoing efficacy research" },
                      { title: "Open research collaboration", desc: "Advancing the field together" }
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

          {/* CTA Section - Minimal */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center max-w-2xl mx-auto space-y-6">
                <h2 className="text-large-display text-foreground">
                  Ready to optimise
                  <br />
                  <span className="text-muted-foreground">performance?</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Join the organisations building the future of cognitive performance.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Link to="/contact">
                    <Button size="sm" className="h-10 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Get in touch
                      <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/nova/overview">
                    <Button variant="outline" size="sm" className="h-10 px-6 text-xs font-medium rounded-full border-border/50 hover:border-primary/50 hover:bg-transparent group">
                      Explore Nova
                      <ArrowUpRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
