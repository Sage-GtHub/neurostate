import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/SEO";
import { ArrowRight, ArrowUpRight, CheckCircle2, Sparkles, Moon, Sun, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

export default function HospitalityOverview() {
  const hero = useScrollAnimation();
  const problem = useScrollAnimation();
  const outcomes = useScrollAnimation();
  const revenue = useScrollAnimation();
  const included = useScrollAnimation();
  const form = useScrollAnimation();
  
  const [formData, setFormData] = useState({ name: "", email: "", property: "", rooms: "", goals: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log("Partnership demo request:", formData); };

  return (
    <>
      <SEO 
        title="Wellness Intelligence for Luxury Hospitality | Neurostate"
        description="AI-powered guest wellness for hotels, resorts, and spas. Personalised experiences that drive premium revenue and lasting guest loyalty."
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
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-medium">Hotels · Resorts · Spas</p>
                <h1 className="text-4xl sm:text-5xl font-light text-foreground leading-[1.1]">
                  Luxury is no longer enough.
                  <br />
                  <span className="text-muted-foreground">Guests expect transformation.</span>
                </h1>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                  The wellness economy is reshaping hospitality. Properties that deliver measurable guest outcomes capture premium rates and fierce loyalty. We provide the intelligence layer.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href="https://calendly.com/neurostate/30min" target="_blank" rel="noopener noreferrer">
                    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        Schedule property tour
                        <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Button>
                    </motion.div>
                  </a>
                </div>
              </div>
              
              {/* Impact Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "+35%", label: "Revenue", desc: "Wellness programmes" },
                  { stat: "89%", label: "Satisfaction", desc: "Guest NPS" },
                  { stat: "4.8★", label: "Rating", desc: "Wellness services" },
                  { stat: "52%", label: "Return Rate", desc: "Wellness guests" }
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
                  Traditional wellness is passive.
                  <br />
                  <span className="text-muted-foreground">Spa menus don't drive transformation.</span>
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Generic experiences", desc: "Every guest gets the same menu. No personalisation based on biometrics, stress levels, or sleep patterns." },
                  { title: "Unmeasured outcomes", desc: "Guests can't see the value of what you offer. No data to prove recovery, relaxation, or cognitive improvement." },
                  { title: "Commoditised positioning", desc: "Without differentiation, you compete on price. Premium wellness commands premium rates." }
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

        {/* Guest Experiences */}
        <section ref={outcomes.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${outcomes.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">The Solution</p>
              <h2 className="text-3xl font-light text-foreground">
                Wellness intelligence.
                <br />
                <span className="text-muted-foreground">For every guest.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                Neurostate transforms passive wellness into active transformation. Personalised journeys based on real data. Measurable outcomes guests can see.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { 
                  icon: Sparkles, 
                  title: "Personalised Journeys", 
                  description: "AI-curated spa and wellness experiences based on guest preferences, biometrics, and real-time stress levels.",
                  highlight: "Adaptive experiences"
                },
                { 
                  icon: Moon, 
                  title: "Sleep Optimisation", 
                  description: "In-room cognitive wellness technology including circadian lighting, air quality monitoring, and sleep protocols.",
                  highlight: "Suite integration"
                },
                { 
                  icon: Sun, 
                  title: "Recovery Protocols", 
                  description: "Red light therapy, photobiomodulation, and evidence-based recovery protocols for spa and wellness centres.",
                  highlight: "Measurable results"
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

        {/* Revenue Impact */}
        <section ref={revenue.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${revenue.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Revenue Impact</p>
                <h2 className="text-3xl font-light text-foreground">
                  This isn't an amenity.
                  <br />
                  <span className="text-muted-foreground">It's a revenue engine.</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wellness guests spend more, stay longer, and return more often. Neurostate positions your property as a destination, not just accommodation.
                </p>
                <div className="space-y-3">
                  {[
                    "Premium tier differentiation",
                    "Higher ancillary revenue from spa bookings",
                    "Increased guest loyalty and return rates",
                    "Automated wellness preference capture"
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
                  Example: 150-Room Luxury Property
                </h3>
                <div className="space-y-4 text-xs">
                  {[
                    { label: "Annual Occupancy", value: "72%" },
                    { label: "Wellness Guest Spend", value: "+£85/night" },
                    { label: "Revenue Uplift (35%)", value: "£420K new", accent: true },
                    { label: "Return Rate Improvement", value: "+52%", accent: true },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between pb-3 border-b border-background/10">
                      <span className="text-background/60">{item.label}</span>
                      <span className={item.accent ? "text-accent font-medium" : "text-background font-medium"}>{item.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3">
                    <span className="text-background font-medium">Annual Impact</span>
                    <span className="text-accent text-xl font-medium">£580K+</span>
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
                Turnkey deployment.
                <br />
                <span className="text-muted-foreground">We handle the complexity.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Guest wellness app",
                "Property management integration", 
                "Staff training programme",
                "In-room wellness tech",
                "Dedicated account support",
                "Marketing materials & assets"
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
                <h2 className="text-xl font-light text-foreground">Let's explore whether Neurostate fits your property</h2>
                <p className="text-xs text-muted-foreground">We respond within 24 hours. Property tours available.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                  <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Property name" value={formData.property} onChange={(e) => setFormData({...formData, property: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                  <Input placeholder="Number of rooms" value={formData.rooms} onChange={(e) => setFormData({...formData, rooms: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                </div>
                <Textarea placeholder="What are your goals for guest wellness?" value={formData.goals} onChange={(e) => setFormData({...formData, goals: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 text-xs min-h-[100px]" />
                <Button type="submit" className="w-full rounded-full h-11 text-xs bg-foreground text-background hover:bg-foreground/90">
                  Request Property Tour <ArrowRight className="ml-2 w-3.5 h-3.5" />
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