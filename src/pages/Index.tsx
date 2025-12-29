import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData, SoftwareApplicationStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const SupplementStackVisual = lazy(() => import("@/components/visuals/SupplementStackVisual"));
const RecoveryTechVisual = lazy(() => import("@/components/visuals/RecoveryTechVisual"));

const Index = () => {

  return (
    <>
      <SEO 
        title="AI Cognitive Performance Platform | Neurostate"
        description="Neurostate is an AI-driven cognitive performance platform that predicts focus, fatigue, and performance volatility for teams and individuals. Enterprise-grade cognitive infrastructure."
      />
      <OrganizationStructuredData />
      <SoftwareApplicationStructuredData />
      <WebsiteStructuredData />
      <LocalBusinessStructuredData />
      <div className="min-h-screen bg-background mobile-nav-padding">
        <Header />
        <main>
          <Hero />

          {/* Stats - Large flowing numbers with enhanced interaction */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                {[
                  { value: "80%", label: "AI models trained", desc: "on cognitive performance data" },
                  { value: "7 days", label: "Prediction window", desc: "for performance forecasting" },
                  { value: "12+", label: "Research partners", desc: "in neuroscience and AI" },
                  { value: "98%", label: "Accuracy rate", desc: "in cognitive state detection" }
                ].map((stat, i) => (
                  <StaggerItem key={i}>
                    <motion.div 
                      className="text-center lg:text-left group cursor-default relative"
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary/5 rounded-3xl -m-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <p className="stat-display text-foreground group-hover:text-primary transition-colors duration-300 relative">{stat.value}</p>
                      <p className="text-sm text-foreground font-medium mt-2 relative">{stat.label}</p>
                      <p className="hidden lg:block text-xs text-muted-foreground mt-1 relative">{stat.desc}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* Platform Section - Clean cards */}
          <section className="py-24 md:py-32 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {/* Left - Heading */}
                <ScrollReveal className="lg:sticky lg:top-28 space-y-5">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Platform</span>
                  <h2 className="text-large-display text-foreground">
                    Three integrated systems.
                    <br />
                    <span className="text-muted-foreground">One cognitive OS.</span>
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                    A complete infrastructure for predicting, measuring, and optimising cognitive performance across individuals and teams.
                  </p>
                  <p className="hidden lg:block text-sm text-muted-foreground leading-relaxed max-w-sm">
                    Each layer of the Neurostate platform works in concert to deliver measurable improvements in focus, recovery, and sustained output.
                  </p>
                </ScrollReveal>

                {/* Right - Flowing Cards */}
                <StaggerContainer className="space-y-4" staggerDelay={0.15}>
                  {[
                    { 
                      title: "Nova AI Engine", 
                      desc: "Cognitive forecasting with multi-model AI. Real-time performance prediction and risk detection.",
                      detail: "Integrates with wearables for continuous biometric monitoring.",
                      num: "01"
                    },
                    { 
                      title: "Execution Layer", 
                      desc: "Precision supplements with research-backed formulas. Biological optimisation for peak output.",
                      detail: "Third-party tested, pharmaceutical-grade compounds.",
                      num: "02"
                    },
                    { 
                      title: "Neuromodulation", 
                      desc: "Red light therapy and photobiomodulation. Alpha and beta state control for cognitive readiness.",
                      detail: "Clinical-grade devices with proven wavelengths.",
                      num: "03"
                    },
                  ].map((item, i) => (
                    <StaggerItem key={i}>
                      <motion.div 
                        className="group flow-card spotlight-card p-6 md:p-8 cursor-pointer"
                        whileHover={{ x: 8, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * 100;
                          const y = ((e.clientY - rect.top) / rect.height) * 100;
                          e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                          e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                        }}
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-muted-foreground font-mono">{item.num}</span>
                              <motion.div 
                                className="w-6 h-px bg-border group-hover:bg-primary/50 transition-all duration-300"
                                whileHover={{ width: 40 }}
                              />
                            </div>
                            <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">{item.desc}</p>
                            <p className="hidden lg:block text-xs text-muted-foreground/70 leading-relaxed max-w-sm mt-1">{item.detail}</p>
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

          {/* The Difference - Clean comparison */}
          <section className="py-24 md:py-32 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">The Difference</span>
                <h2 className="text-large-display text-foreground">
                  Predictive infrastructure.
                  <br />
                  <span className="text-muted-foreground">Not reactive wellness.</span>
                </h2>
                <p className="hidden lg:block text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  Most wellness platforms wait for problems to occur before responding. Neurostate predicts cognitive decline before it impacts performance, enabling proactive intervention.
                </p>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                {/* What others do */}
                <ScrollReveal delay={0.1} direction="left">
                  <div className="space-y-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-5 font-medium">Reactive approaches</p>
                    {[
                      { title: "Apps that respond after burnout", desc: "Damage already done" },
                      { title: "Generic wellness with no data", desc: "One-size-fits-all solutions" },
                      { title: "No performance prediction", desc: "Flying blind on capacity" },
                      { title: "Interventions after breakdown", desc: "Costly recovery periods" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <div className="w-4 h-4 rounded-full border border-destructive/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[8px] text-destructive/60">✕</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">{item.title}</span>
                          <p className="hidden lg:block text-xs text-muted-foreground/60 mt-0.5">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>

                {/* What we do */}
                <ScrollReveal delay={0.2} direction="right">
                  <div className="space-y-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-5 font-medium">Predictive infrastructure</p>
                    {[
                      { title: "Cognitive forecasting", desc: "72-hour prediction window", detail: "See performance dips before they happen" },
                      { title: "Risk detection", desc: "Before impact", detail: "Early warning system for burnout" },
                      { title: "Readiness measurement", desc: "Quantified capacity", detail: "Know your cognitive bandwidth daily" },
                      { title: "Autonomous optimisation", desc: "AI-driven protocols", detail: "Continuous improvement without manual tracking" }
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
                          <span className="text-xs text-muted-foreground ml-2">{item.desc}</span>
                          <p className="hidden lg:block text-xs text-muted-foreground/70 mt-0.5">{item.detail}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Nova AI Section */}
          <section className="py-24 md:py-32 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <ScrollReveal direction="left">
                  <div className="space-y-6">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">AI Engine</span>
                    <h2 className="text-large-display text-foreground">
                      Nova: Cognitive Performance Forecasting
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                      Nova is our multi-model AI engine for predictive cognitive modelling. It forecasts performance states, detects risk patterns, and delivers real-time analytics based on your biometric data.
                    </p>
                    <p className="hidden lg:block text-sm text-muted-foreground leading-relaxed max-w-md">
                      By synthesising data from wearables, sleep patterns, and historical performance, Nova builds a dynamic model of your cognitive capacity and provides actionable recommendations to optimise your output.
                    </p>
                    
                    <div className="space-y-4 py-2">
                      <div className="flex flex-wrap gap-2">
                        {["Personalised coaching", "Adaptive recommendations", "Wearable integration", "Real-time insights", "Voice interface"].map((item, i) => (
                          <motion.span 
                            key={i} 
                            className="px-3 py-1.5 text-[10px] font-medium text-muted-foreground bg-background rounded-full border border-border/50"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                      
                      <div className="hidden lg:flex gap-6 pt-2">
                        {[
                          { value: "7", label: "Day forecast" },
                          { value: "24/7", label: "Monitoring" },
                          { value: "10+", label: "Integrations" }
                        ].map((item, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <p className="text-lg text-foreground font-medium">{item.value}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <Link to="/nova/overview">
                      <Button size="sm" className="h-10 px-5 text-xs font-medium bg-gray-800 text-white hover:bg-gray-700 rounded-full group flex items-center gap-2">
                        <span>Explore Nova</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Nova Preview */}
                <ScrollReveal direction="right" delay={0.2}>
                  <motion.div 
                    className="flow-card p-6 space-y-5"
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                          <span className="text-primary font-medium text-xs">N</span>
                        </div>
                        <div>
                          <p className="text-foreground font-medium text-xs">Nova</p>
                          <p className="text-muted-foreground text-[10px]">7-Day Forecast</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <span className="text-[10px] text-muted-foreground">Live</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                        <motion.div 
                          key={i} 
                          className={`p-2.5 text-center rounded-xl transition-all duration-300 ${i === 0 ? 'bg-primary/10 ring-1 ring-primary/20' : 'bg-muted/50 hover:bg-muted'}`}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <p className="text-[9px] text-muted-foreground uppercase mb-1.5">{day}</p>
                          <div className={`w-1.5 h-1.5 mx-auto rounded-full mb-1.5 ${i <= 1 || i >= 5 ? 'bg-primary' : i === 3 ? 'bg-destructive/60' : 'bg-yellow-500/60'}`} />
                          <p className="text-foreground text-[11px] font-medium">{[85, 82, 68, 55, 72, 88, 90][i]}%</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "68", label: "HRV" },
                        { value: "7.8h", label: "Sleep" },
                        { value: "85%", label: "Recovery" }
                      ].map((metric, i) => (
                        <motion.div 
                          key={i} 
                          className="bg-muted/50 p-3 text-center rounded-xl"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <p className="text-foreground text-lg font-light">{metric.value}</p>
                          <p className="text-muted-foreground text-[9px] uppercase tracking-wider">{metric.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Hardware Section - Recovery Technologies */}
          <section className="py-24 md:py-32 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <ScrollReveal direction="left" className="order-last lg:order-first">
                  <Suspense fallback={
                    <div className="w-full aspect-square max-w-sm mx-auto flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                    </div>
                  }>
                    <RecoveryTechVisual />
                  </Suspense>
                </ScrollReveal>

                <ScrollReveal direction="right">
                  <div className="space-y-6">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Neuromodulation</span>
                    <h2 className="text-large-display text-foreground">
                      Recovery Technologies
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                      Clinical-grade photobiomodulation devices engineered for neural pathway stimulation. Our recovery technologies combine red and near-infrared light therapy to enhance mitochondrial function, accelerate tissue repair, and optimise cognitive performance.
                    </p>
                    <p className="hidden lg:block text-sm text-muted-foreground leading-relaxed max-w-md">
                      Each device is calibrated to deliver precise wavelengths proven in peer-reviewed research to stimulate cellular energy production. Whether you're recovering from intense training or seeking enhanced mental clarity, our photobiomodulation systems provide measurable, repeatable results.
                    </p>
                    
                    <StaggerContainer className="space-y-3 py-2" staggerDelay={0.1}>
                      {[
                        { title: "660nm & 850nm wavelengths", desc: "Optimal penetration for cellular regeneration" },
                        { title: "Direct neural pathway stimulation", desc: "Enhanced brain plasticity and cognitive function" },
                        { title: "Clinically validated efficacy", desc: "Backed by 500+ peer-reviewed studies" },
                        { title: "Professional-grade power output", desc: "Medical-level irradiance for faster results" }
                      ].map((item, i) => (
                        <StaggerItem key={i}>
                          <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                            <div>
                              <span className="text-sm text-foreground font-medium">{item.title}</span>
                              <p className="hidden lg:block text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                    
                    <Link to="/category/devices">
                      <Button size="sm" className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        View Devices
                        <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Supplements Section */}
          <section className="py-24 md:py-32 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <ScrollReveal direction="left">
                  <div className="space-y-6">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Execution Layer</span>
                    <h2 className="text-large-display text-foreground">
                      Personalised Supplement Stacks
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                      Research-backed formulations designed for measurable cognitive enhancement. Every compound is selected for efficacy, bioavailability, and synergistic interaction with our broader protocol ecosystem.
                    </p>
                    <p className="hidden lg:block text-sm text-muted-foreground leading-relaxed max-w-md">
                      Our formulations are developed in partnership with leading neuroscientists and are manufactured to pharmaceutical-grade standards. Each ingredient is third-party tested for purity, and dosages are calibrated based on clinical research rather than marketing claims.
                    </p>
                    
                    <div className="space-y-4 py-2">
                      <div className="flex flex-wrap gap-2">
                        {["Cognitive", "Recovery", "Sleep", "Focus", "Energy", "Longevity"].map((item, i) => (
                          <motion.span 
                            key={i} 
                            className="px-3 py-1.5 text-[10px] font-medium text-muted-foreground bg-background rounded-full border border-border/50"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                      
                      <div className="hidden lg:grid grid-cols-2 gap-4 pt-2">
                        {[
                          { label: "Bioavailability", value: "Enhanced absorption" },
                          { label: "Purity", value: "Third-party tested" },
                          { label: "Dosing", value: "Research-calibrated" },
                          { label: "Synergy", value: "Stack-optimised" }
                        ].map((item, i) => (
                          <motion.div 
                            key={i}
                            className="p-3 bg-muted/30 rounded-xl"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                          >
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                            <p className="text-sm text-foreground font-medium mt-1">{item.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <Link to="/category/supplements">
                      <Button size="sm" className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        Shop Supplements
                        <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.2}>
                  <Suspense fallback={
                    <div className="w-full aspect-square max-w-sm mx-auto flex items-center justify-center">
                      <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                    </div>
                  }>
                    <SupplementStackVisual />
                  </Suspense>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <ScrollReveal className="py-24 md:py-32 px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <motion.span 
                className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Get Started
              </motion.span>
              <motion.h2 
                className="text-large-display text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Ready to get started?
              </motion.h2>
              <motion.p 
                className="text-sm text-muted-foreground max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Join the enterprises already using Neurostate for predictive cognitive performance management.
              </motion.p>
              <motion.p 
                className="hidden lg:block text-sm text-muted-foreground max-w-lg mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                Whether you are an individual optimiser or leading an enterprise team, our platform scales to meet your cognitive performance needs.
              </motion.p>
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-3 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/contact">
                  <Button size="sm" className="h-10 px-6 text-xs font-medium bg-gray-800 text-white hover:bg-gray-700 rounded-full group">
                    Book a demo
                    <ArrowUpRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button size="sm" variant="outline" className="h-10 px-6 text-xs font-medium rounded-full">
                    Browse Products
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="hidden lg:flex items-center justify-center gap-8 pt-8 text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {["No credit card required", "14-day free trial", "Cancel anytime"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <Check className="w-3 h-3 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>

        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
