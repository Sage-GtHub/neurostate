import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { ArrowRight, ArrowUpRight, Check, Cpu, Brain, Shield, Users, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const InformationTechnologyOverview = () => {
  const stats = [
    { value: "47%", label: "Reduced burnout", desc: "across all departments" },
    { value: "31%", label: "Productivity gain", desc: "company-wide improvement" },
    { value: "2.4x", label: "ROI", desc: "within first year" },
    { value: "89%", label: "Team retention", desc: "annual retention rate" }
  ];

  const solutions = [
    { 
      title: "Team Wellness Monitoring", 
      desc: "Real-time tracking of cognitive load and burnout risk across all departments—from sales sprints to project deadlines.",
      detail: "Seamless integration with Slack, Microsoft Teams, and workplace tools.",
      num: "01",
      icon: Brain
    },
    { 
      title: "Deep Work Optimisation", 
      desc: "AI-predicted optimal time windows for complex work, strategic planning, and focused problem-solving.",
      detail: "Personalised to individual work patterns and meeting schedules.",
      num: "02",
      icon: Target
    },
    { 
      title: "High-Pressure Recovery", 
      desc: "Automated recovery support for teams handling demanding projects, client deadlines, and high-stress periods.",
      detail: "Evidence-based techniques from elite performance psychology.",
      num: "03",
      icon: Shield
    },
  ];

  const benefits = [
    { title: "Sustainable performance", desc: "Maintain high output without burnout" },
    { title: "Higher quality work", desc: "Fewer errors when teams are well-rested" },
    { title: "Reduced turnover", desc: "Retain top talent across all departments" },
    { title: "Better decisions", desc: "Clearer thinking for strategic choices" }
  ];

  const useCases = [
    { title: "Tech Companies", desc: "All teams from engineering to sales" },
    { title: "Startups", desc: "Fast-moving cross-functional teams" },
    { title: "Enterprise IT", desc: "Platform, support, and operations teams" },
    { title: "Agencies", desc: "Client delivery and creative teams" }
  ];

  return (
    <>
      <SEO 
        title="Information Technology Solutions | Neurostate"
        description="AI-powered cognitive performance for technology companies. Reduce burnout, improve productivity, and retain top talent across all teams."
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
              style={{ background: 'radial-gradient(circle, hsl(270, 100%, 55%) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.08, 0.06] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-40 left-[5%] w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, hsl(200, 65%, 45%) 0%, transparent 70%)' }}
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
                    <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Information Technology</span>
                  </div>

                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground tracking-tight">
                    Perform better.{" "}
                    <span className="text-primary">Burn out less.</span>
                  </h1>
                  
                  <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                    Elite cognitive performance for technology teams. Predict burnout, optimise focus windows, and maintain sustainable output when deadlines are critical.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link to="/contact">
                      <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Button className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                          <span className="flex items-center">
                            Request team demo
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
                          <Cpu className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium text-sm">Team Performance</p>
                          <p className="text-muted-foreground text-[10px]">Real-time wellness monitoring</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] text-muted-foreground">Active</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Focus Score", value: "87%", trend: "Optimal" },
                        { label: "Burnout Risk", value: "Low", trend: "Healthy" },
                        { label: "Deep Work", value: "3.2h", trend: "Today" },
                        { label: "Team Wellness", value: "92%", trend: "Above avg" }
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

                    <div className="pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Next Focus Block</p>
                          <p className="text-sm font-medium text-foreground mt-1">In 25 minutes</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="text-xs text-primary font-medium">Calendar protected</span>
                        </div>
                      </div>
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
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Team Solutions</span>
                  <h2 className="text-large-display text-foreground">
                    Sustainable velocity.
                    <br />
                    <span className="text-muted-foreground">High-performing teams.</span>
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                    Purpose-built for the demands of modern technology companies. From startups to enterprise, we help your teams perform without burning out.
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
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Team Benefits</span>
                <h2 className="text-large-display text-foreground">
                  Better outcomes.
                  <br />
                  <span className="text-muted-foreground">Keep your best people.</span>
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
                  Ready to build sustainable teams?
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-8">
                  Schedule a demonstration to see how Neurostate can help your teams perform at their best without burning out.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link to="/contact">
                    <Button className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Request team demo
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

export default InformationTechnologyOverview;
