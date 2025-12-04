import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Target, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function HealthClubsOverview() {
  const hero = useScrollAnimation();
  const outcomes = useScrollAnimation();
  const revenue = useScrollAnimation();
  const included = useScrollAnimation();
  const form = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    facility: "",
    members: "",
    goals: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partnership demo request:", formData);
  };

  return (
    <>
      <SEO 
        title="Cognitive Performance for Health Clubs & Studios | NeuroState"
        description="Differentiate your facility with AI-driven cognitive performance tools. Increase member retention, boost revenue and deliver personalised wellness that drives results."
        keywords="health club cognitive performance, gym wellness platform, member retention technology, fitness facility AI, studio performance tools, personalised fitness wellness"
      />
      
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero - Clear Value Proposition */}
        <section ref={hero.ref} className={`pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Gyms · Yoga Studios · Private Clubs</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-carbon leading-[1.02]">
              Cognitive Performance
              <br />
              <span className="text-accent">for Your Members.</span>
            </h1>
            <p className="text-xl text-ash max-w-2xl mx-auto">
              Give your members the cognitive edge. AI-driven performance tools that increase retention, 
              boost revenue, and deliver results they cannot get elsewhere.
            </p>
          </div>
        </section>

        {/* Impact Metrics - Bold Numbers */}
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon text-ivory">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate">
              {[
                { stat: "+34%", label: "Member Retention", desc: "Average improvement" },
                { stat: "+28%", label: "Revenue Per Member", desc: "Premium services" },
                { stat: "89%", label: "Satisfaction Score", desc: "Member NPS" },
                { stat: "4 weeks", label: "Full Rollout", desc: "Simple onboarding" }
              ].map((item, i) => (
                <div key={i} className="bg-carbon p-6 sm:p-8 text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-accent mb-1">{item.stat}</p>
                  <p className="text-ivory font-medium text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-mist">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clear Outcomes for Members */}
        <section ref={outcomes.ref} className={`py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white transition-all duration-1000 ${outcomes.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Member Benefits</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.1]">
                What members get.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-mist">
              {[
                {
                  icon: Target,
                  title: "Nova AI Coach",
                  description: "Personal cognitive optimisation via app. 24/7 guidance tailored to their goals."
                },
                {
                  icon: Zap,
                  title: "Premium Products",
                  description: "20-40% member discount on supplements, red light devices, and recovery tools."
                },
                {
                  icon: TrendingUp,
                  title: "Progress Tracking",
                  description: "Visual metrics showing cognitive improvement, recovery scores, and focus gains."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-10 sm:p-12">
                  <item.icon className="w-8 h-8 text-accent mb-6" />
                  <h3 className="text-xl font-bold text-carbon mb-3">{item.title}</h3>
                  <p className="text-ash text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Revenue Streams */}
        <section ref={revenue.ref} className={`py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl transition-all duration-1000 ${revenue.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Revenue Impact</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.1]">
                  More than retention.
                  <br />
                  <span className="text-accent">New revenue.</span>
                </h2>
                <p className="text-lg text-ash leading-relaxed">
                  NeuroState creates new premium service opportunities. 
                  Members pay more. Stay longer. Refer others.
                </p>
              </div>

              <div className="bg-carbon text-ivory p-8 sm:p-10">
                <h3 className="text-lg font-bold mb-6">Example: 500 Member Facility</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between pb-4 border-b border-slate">
                    <span className="text-mist">Current Members</span>
                    <span className="font-bold">500</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-slate">
                    <span className="text-mist">Average Lifetime Value</span>
                    <span className="font-bold">£1,200</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-slate">
                    <span className="text-mist">Retention Improvement (34%)</span>
                    <span className="font-bold text-accent">£204K saved</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-slate">
                    <span className="text-mist">Premium Revenue (28% ARPU)</span>
                    <span className="font-bold text-accent">£168K new</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t-2 border-accent">
                    <span className="text-lg font-bold">Net Annual Gain</span>
                    <span className="text-2xl font-bold text-accent">£342K+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section ref={included.ref} className={`py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white transition-all duration-1000 ${included.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Partnership Includes</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.1]">
                Simple onboarding.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Nova AI for all members",
                "Facility dashboard",
                "Staff training",
                "Marketing materials",
                "Dedicated support",
                "Product discounts"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-6 bg-pearl">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-carbon font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section ref={form.ref} className={`py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl transition-all duration-1000 ${form.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-carbon">
                Schedule a demo.
              </h2>
              <p className="text-ash">
                See how NeuroState works for your facility. We respond within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white border-mist min-h-[48px]"
                />
                <Input 
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-white border-mist min-h-[48px]"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="Facility name"
                  value={formData.facility}
                  onChange={(e) => setFormData({...formData, facility: e.target.value})}
                  className="bg-white border-mist min-h-[48px]"
                />
                <Input 
                  placeholder="Number of members"
                  value={formData.members}
                  onChange={(e) => setFormData({...formData, members: e.target.value})}
                  className="bg-white border-mist min-h-[48px]"
                />
              </div>
              <Textarea 
                placeholder="What are your goals?"
                value={formData.goals}
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
                className="bg-white border-mist min-h-[120px]"
              />
              <Button type="submit" className="w-full bg-carbon hover:bg-slate rounded-full min-h-[48px]">
                Request Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
