import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/SEO";
import { ArrowRight, CheckCircle2, TrendingUp, Target, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function HealthClubsOverview() {
  const hero = useScrollAnimation();
  const outcomes = useScrollAnimation();
  const revenue = useScrollAnimation();
  const included = useScrollAnimation();
  const form = useScrollAnimation();
  
  const [formData, setFormData] = useState({ name: "", email: "", facility: "", members: "", goals: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log("Partnership demo request:", formData); };

  return (
    <>
      <SEO 
        title="Cognitive Performance Infrastructure for Fitness Facilities | Neurostate"
        description="Enterprise-grade cognitive analytics for health clubs. Measure member cognitive readiness and deliver data-driven results."
      />
      
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <Header />
        
        {/* Hero */}
        <section ref={hero.ref} className={`relative pt-32 sm:pt-44 pb-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">Gyms · Yoga Studios · Private Clubs</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-[1.1]">
              Cognitive Analytics<br />
              <span className="text-foreground/50">for Your Facility</span>
            </h1>
            <p className="text-sm text-foreground/50 max-w-lg mx-auto">
              Enterprise-grade cognitive infrastructure for fitness facilities. Measure performance outcomes. Deliver data-driven results.
            </p>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-32 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { stat: "+34%", label: "Retention", desc: "Average" },
                { stat: "+28%", label: "Revenue", desc: "Per member" },
                { stat: "89%", label: "Satisfaction", desc: "NPS score" },
                { stat: "4 weeks", label: "Rollout", desc: "Onboarding" }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-3xl bg-foreground text-center">
                  <p className="text-2xl font-light text-accent mb-1">{item.stat}</p>
                  <p className="text-xs text-background mb-0.5">{item.label}</p>
                  <p className="text-[10px] text-background/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Members Get */}
        <section ref={outcomes.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${outcomes.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Member Benefits</p>
              <h2 className="text-3xl font-light text-foreground">What members get</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Target, title: "Nova AI Coach", description: "Personal cognitive optimisation via app. 24/7 guidance tailored to their goals." },
                { icon: Zap, title: "Premium Products", description: "20-40% member discount on supplements, red light devices, and recovery tools." },
                { icon: TrendingUp, title: "Progress Tracking", description: "Visual metrics showing cognitive improvement, recovery scores, and focus gains." }
              ].map((item, index) => (
                <div key={index} className="p-8 rounded-3xl bg-foreground/[0.02] hover:bg-foreground group transition-all duration-500">
                  <item.icon className="w-5 h-5 text-accent mb-5" />
                  <h3 className="text-sm font-medium text-foreground group-hover:text-background mb-2 transition-colors">{item.title}</h3>
                  <p className="text-xs text-foreground/50 group-hover:text-background/60 transition-colors">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Revenue */}
        <section ref={revenue.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${revenue.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Revenue Impact</p>
                <h2 className="text-3xl font-light text-foreground">
                  More than retention<br /><span className="text-foreground/50">New revenue</span>
                </h2>
                <p className="text-sm text-foreground/50">NeuroState creates new premium service opportunities. Members pay more. Stay longer. Refer others.</p>
              </div>

              <div className="p-8 rounded-3xl bg-foreground">
                <h3 className="text-sm font-medium text-background mb-6">Example: 500 Member Facility</h3>
                <div className="space-y-4 text-xs">
                  {[
                    { label: "Current Members", value: "500" },
                    { label: "Average Lifetime Value", value: "£1,200" },
                    { label: "Retention Improvement (34%)", value: "£204K saved", accent: true },
                    { label: "Premium Revenue (28%)", value: "£168K new", accent: true },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between pb-3 border-b border-background/10">
                      <span className="text-background/50">{item.label}</span>
                      <span className={item.accent ? "text-accent font-medium" : "text-background font-medium"}>{item.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3">
                    <span className="text-background font-medium">Net Annual Gain</span>
                    <span className="text-accent text-lg font-medium">£342K+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section ref={included.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${included.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Partnership Includes</p>
              <h2 className="text-3xl font-light text-foreground">Simple onboarding</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {["Nova AI for all members", "Facility dashboard", "Staff training", "Marketing materials", "Dedicated support", "Product discounts"].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-5 rounded-2xl bg-foreground/[0.02]">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-xs text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section ref={form.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${form.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-lg mx-auto">
            <div className="glass-subtle rounded-3xl p-8 sm:p-10 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-light text-foreground">Schedule a demo</h2>
                <p className="text-xs text-foreground/50">We respond within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-xs" />
                  <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-xs" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Facility name" value={formData.facility} onChange={(e) => setFormData({...formData, facility: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-xs" />
                  <Input placeholder="Number of members" value={formData.members} onChange={(e) => setFormData({...formData, members: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-foreground/10 h-11 text-xs" />
                </div>
                <Textarea placeholder="What are your goals?" value={formData.goals} onChange={(e) => setFormData({...formData, goals: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-foreground/10 text-xs min-h-[100px]" />
                <Button type="submit" className="w-full rounded-full h-11 text-xs bg-foreground text-background hover:bg-foreground/90">
                  Request Demo <ArrowRight className="ml-2 w-3.5 h-3.5" />
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
