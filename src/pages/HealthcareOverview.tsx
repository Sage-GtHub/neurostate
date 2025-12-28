import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { ArrowRight, ArrowUpRight, Check, Heart, Activity, Brain, Clock, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HealthcareOverview = () => {
  const stats = [
    { value: "40%", label: "Faster recovery", desc: "post-surgical outcomes" },
    { value: "67%", label: "Reduced readmissions", desc: "through predictive monitoring" },
    { value: "92%", label: "Patient satisfaction", desc: "with personalised protocols" },
    { value: "24/7", label: "Continuous monitoring", desc: "with real-time alerts" }
  ];

  const solutions = [
    { 
      title: "Predictive Recovery Monitoring", 
      desc: "AI-powered analysis of patient biometrics to predict recovery trajectories and identify complications before they occur.",
      detail: "Integrates with hospital systems for seamless data flow.",
      num: "01",
      icon: Activity
    },
    { 
      title: "Cognitive Rehabilitation", 
      desc: "Evidence-based protocols for cognitive recovery following neurological events, surgery, or trauma.",
      detail: "Personalised therapy schedules optimised by Nova AI.",
      num: "02",
      icon: Brain
    },
    { 
      title: "Patient Wellness Programmes", 
      desc: "Comprehensive mental health and stress management protocols for long-term patient wellbeing.",
      detail: "Designed for chronic disease management and preventive care.",
      num: "03",
      icon: Heart
    },
  ];

  const benefits = [
    { title: "Reduced length of stay", desc: "Accelerate recovery with precision protocols" },
    { title: "Lower readmission rates", desc: "Predictive monitoring prevents complications" },
    { title: "Improved patient outcomes", desc: "Data-driven care optimisation" },
    { title: "Staff efficiency gains", desc: "Automated monitoring frees clinical time" }
  ];

  const useCases = [
    { title: "Post-Surgical Recovery", desc: "Optimise healing with personalised protocols" },
    { title: "Chronic Disease Management", desc: "Continuous monitoring for long-term conditions" },
    { title: "Mental Health Services", desc: "Cognitive wellness and stress reduction" },
    { title: "Rehabilitation Centres", desc: "Accelerated physical and cognitive recovery" }
  ];

  return (
    <>
      <SEO 
        title="Healthcare & Clinical Solutions | Neurostate"
        description="AI-powered cognitive performance platform for healthcare. Accelerate patient recovery, reduce readmissions, and improve outcomes with predictive monitoring."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.03]" />
            <motion.div 
              className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, hsl(220, 100%, 55%) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.08, 0.06] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-40 left-[5%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, hsl(156, 65%, 45%) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 py-20 lg:py-28">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="inline-flex items-center gap-2">
                    <motion.div 
                      className="w-1.5 h-1.5 bg-primary rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Healthcare & Clinical</span>
                  </div>

                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground tracking-tight">
                    Predictive healthcare.{" "}
                    <span className="text-primary">Better outcomes.</span>
                  </h1>
                  
                  <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                    Transform patient care with AI-powered cognitive monitoring. Predict recovery trajectories, prevent complications, and deliver personalised wellness protocols.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link to="/contact">
                      <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Button className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                          <span className="flex items-center">
                            Request clinical demo
                            <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </Button>
                      </motion.div>
                    </Link>
                    <Link to="/enterprise/overview">
                      <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Button variant="ghost" className="h-10 px-5 text-xs font-medium text-foreground hover:bg-muted rounded-full group">
                          View all solutions
                          <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>

                {/* Hero Visual */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <div className="flow-card p-8 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Heart className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium text-sm">Patient Recovery</p>
                          <p className="text-muted-foreground text-[10px]">Real-time monitoring</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] text-muted-foreground">Active</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Recovery Score", value: "87%", trend: "+12%" },
                        { label: "Risk Level", value: "Low", trend: "Stable" },
                        { label: "Sleep Quality", value: "94", trend: "+8" },
                        { label: "HRV", value: "52ms", trend: "+4ms" }
                      ].map((metric, i) => (
                        <motion.div 
                          key={i}
                          className="p-4 rounded-xl bg-muted/30 border border-border/30"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{metric.label}</p>
                          <p className="text-lg font-medium text-foreground mt-1">{metric.value}</p>
                          <p className="text-[10px] text-green-500">{metric.trend}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                {stats.map((stat, i) => (
                  <StaggerItem key={i}>
                    <motion.div 
                      className="text-center lg:text-left group cursor-default relative"
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <motion.div className="absolute inset-0 bg-primary/5 rounded-3xl -m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <p className="stat-display text-foreground group-hover:text-primary transition-colors duration-300 relative">{stat.value}</p>
                      <p className="text-sm text-foreground font-medium mt-2 relative">{stat.label}</p>
                      <p className="hidden lg:block text-xs text-muted-foreground mt-1 relative">{stat.desc}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* Solutions Section */}
          <section className="py-24 md:py-32 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal className="lg:sticky lg:top-28 space-y-5">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Clinical Solutions</span>
                  <h2 className="text-large-display text-foreground">
                    Three integrated systems.
                    <br />
                    <span className="text-muted-foreground">Seamless patient care.</span>
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                    Purpose-built healthcare solutions that integrate with existing clinical workflows to deliver measurable improvements in patient outcomes.
                  </p>
                </ScrollReveal>

                <StaggerContainer className="space-y-4" staggerDelay={0.15}>
                  {solutions.map((item, i) => (
                    <StaggerItem key={i}>
                      <motion.div 
                        className="group flow-card spotlight-card p-6 md:p-8 cursor-pointer"
                        whileHover={{ x: 8, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-muted-foreground font-mono">{item.num}</span>
                              <motion.div className="w-6 h-px bg-border group-hover:bg-primary/50 transition-all duration-300" whileHover={{ width: 40 }} />
                            </div>
                            <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">{item.desc}</p>
                            <p className="hidden lg:block text-xs text-muted-foreground/70 leading-relaxed max-w-sm mt-1">{item.detail}</p>
                          </div>
                          <motion.div whileHover={{ rotate: 45 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
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

          {/* Benefits Section */}
          <section className="py-24 md:py-32 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Clinical Benefits</span>
                <h2 className="text-large-display text-foreground">
                  Measurable improvements.
                  <br />
                  <span className="text-muted-foreground">Evidence-based outcomes.</span>
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <ScrollReveal delay={0.1} direction="left">
                  <div className="space-y-4">
                    {benefits.map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-background transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2} direction="right">
                  <div className="space-y-4">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-5 font-medium">Use Cases</p>
                    {useCases.map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        whileHover={{ x: 4, borderColor: "hsl(var(--primary) / 0.5)" }}
                      >
                        <div>
                          <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 md:py-32 px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Get Started</span>
                <h2 className="text-large-display text-foreground mt-4 mb-6">
                  Ready to transform patient care?
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-8">
                  Schedule a clinical demonstration to see how Neurostate can integrate with your healthcare systems and improve patient outcomes.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link to="/contact">
                    <Button className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Request clinical demo
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/enterprise/overview">
                    <Button variant="outline" className="h-11 px-6 text-xs font-medium rounded-full">
                      View all industries
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

export default HealthcareOverview;
