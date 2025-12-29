import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/SEO";
import { ArrowRight, ArrowUpRight, CheckCircle2, Target, Activity, Shield, Brain, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

export default function SportsOverview() {
  const hero = useScrollAnimation();
  const problem = useScrollAnimation();
  const outcomes = useScrollAnimation();
  const value = useScrollAnimation();
  const included = useScrollAnimation();
  const form = useScrollAnimation();
  
  const [formData, setFormData] = useState({ name: "", email: "", organisation: "", athletes: "", goals: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log("Partnership demo request:", formData); };

  return (
    <>
      <SEO 
        title="Cognitive Performance Infrastructure for Elite Sport | Neurostate"
        description="AI-powered performance forecasting for professional athletes. Predict performance volatility, prevent injuries, and optimise recovery with precision intelligence."
      />
      
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <Header />
        
        {/* Hero - Invisible Tech Style */}
        <section ref={hero.ref} className={`relative pt-32 sm:pt-44 pb-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-medium">Football · Rugby · Athletics · Cycling</p>
                <h1 className="text-4xl sm:text-5xl font-light text-foreground leading-[1.1]">
                  Sport operates on instinct.
                  <br />
                  <span className="text-muted-foreground">We make it predictive.</span>
                </h1>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                  Elite performance is cognitive, not just physical. We forecast readiness, predict injury risk, and optimise recovery — giving athletes and teams an intelligence advantage.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href="https://calendly.com/neurostate/30min" target="_blank" rel="noopener noreferrer">
                    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        Talk to our sports team
                        <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Button>
                    </motion.div>
                  </a>
                </div>
              </div>
              
              {/* Impact Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "+23%", label: "Performance", desc: "Key metrics" },
                  { stat: "-41%", label: "Injuries", desc: "Soft tissue" },
                  { stat: "-38%", label: "Recovery", desc: "Return time" },
                  { stat: "89%", label: "Satisfaction", desc: "Athlete NPS" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="p-5 rounded-2xl bg-foreground/[0.03] border border-border/30 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={hero.isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <p className="text-2xl font-light text-primary mb-1">{item.stat}</p>
                    <p className="text-xs font-medium text-foreground mb-0.5">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section ref={problem.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${problem.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">The Problem</p>
                <h2 className="text-3xl font-light text-foreground">
                  Performance science tracks the past.
                  <br />
                  <span className="text-muted-foreground">Injuries happen anyway.</span>
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Reactive load management", desc: "Training loads are adjusted after fatigue appears. The damage is already done." },
                  { title: "Missing cognitive signals", desc: "Physical metrics alone miss the full picture. Stress, sleep, and mental load drive performance volatility." },
                  { title: "Inconsistent recovery", desc: "Recovery protocols are generic. Individual athlete needs aren't accounted for in real-time." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="p-5 rounded-2xl bg-foreground/[0.02] border border-border/20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={problem.isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <h3 className="text-sm font-medium text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What Athletes Get */}
        <section ref={outcomes.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${outcomes.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">The Solution</p>
              <h2 className="text-3xl font-light text-foreground">
                Performance intelligence.
                <br />
                <span className="text-muted-foreground">For every athlete.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                Neurostate operates as a cognitive layer across athlete performance — forecasting readiness, predicting risk, and guiding recovery in real-time.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { 
                  icon: Brain, 
                  title: "Nova AI Coach", 
                  description: "Personalised cognitive protocols based on training load, recovery status, and competition schedule. 24/7 guidance.",
                  highlight: "Adaptive intelligence"
                },
                { 
                  icon: Activity, 
                  title: "Recovery Optimisation", 
                  description: "Red light therapy, supplement stacks, and sleep protocols designed specifically for athletic recovery demands.",
                  highlight: "Precision recovery"
                },
                { 
                  icon: Shield, 
                  title: "Injury Prevention", 
                  description: "Early warning detection from biometric patterns. Protocol adjustments before problems become injuries.",
                  highlight: "Predictive protection"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="group p-6 rounded-2xl bg-foreground/[0.02] border border-border/20 hover:bg-foreground hover:border-foreground transition-all duration-500"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-background/10 transition-colors">
                      <item.icon className="w-5 h-5 text-primary group-hover:text-background transition-colors" />
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-primary group-hover:text-accent transition-colors">{item.highlight}</span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-background mb-2 transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-background/70 leading-relaxed transition-colors">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Protection */}
        <section ref={value.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${value.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Asset Protection</p>
                <h2 className="text-3xl font-light text-foreground">
                  This isn't wellness.
                  <br />
                  <span className="text-muted-foreground">It's athlete asset protection.</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every injury costs time, money, and competitive advantage. Neurostate helps athletes stay on the pitch, performing at their cognitive and physical peak.
                </p>
                <div className="space-y-3">
                  {[
                    "41% reduction in soft tissue injuries",
                    "38% faster return-to-play times",
                    "Predictive load management",
                    "Competition readiness forecasting"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div 
                className="p-8 rounded-3xl bg-foreground"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-sm font-medium text-background mb-6 flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  Example: 25 Athlete Squad
                </h3>
                <div className="space-y-4 text-xs">
                  {[
                    { label: "Squad Size", value: "25 athletes" },
                    { label: "Average Player Value", value: "£5M" },
                    { label: "Injury Prevention (41%)", value: "£2.05M protected", accent: true },
                    { label: "Annual Investment", value: "£45K" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between pb-3 border-b border-background/10">
                      <span className="text-background/60">{item.label}</span>
                      <span className={item.accent ? "text-accent font-medium" : "text-background font-medium"}>{item.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3">
                    <span className="text-background font-medium">Value Protected</span>
                    <span className="text-accent text-xl font-medium">£2.0M+</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section ref={included.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${included.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Partnership Includes</p>
              <h2 className="text-3xl font-light text-foreground">
                Full performance stack.
                <br />
                <span className="text-muted-foreground">We handle the complexity.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Nova AI for all athletes",
                "Team analytics dashboard", 
                "Staff training programme",
                "Recovery device protocols",
                "Supplement recommendations",
                "Competition readiness tools"
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3 p-5 rounded-2xl bg-foreground/[0.02] border border-border/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={included.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section ref={form.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${form.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-lg mx-auto">
            <div className="border border-border/30 rounded-3xl p-8 sm:p-10 space-y-6 bg-foreground/[0.01]">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-light text-foreground">Let's explore whether Neurostate fits your organisation</h2>
                <p className="text-xs text-muted-foreground">We respond within 24 hours. Pilot programmes available.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                  <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Organisation name" value={formData.organisation} onChange={(e) => setFormData({...formData, organisation: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                  <Input placeholder="Number of athletes" value={formData.athletes} onChange={(e) => setFormData({...formData, athletes: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                </div>
                <Textarea placeholder="What are your performance goals?" value={formData.goals} onChange={(e) => setFormData({...formData, goals: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 text-xs min-h-[100px]" />
                <Button type="submit" className="w-full rounded-full h-11 text-xs bg-foreground text-background hover:bg-foreground/90">
                  Talk to Sports Team <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </Button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}