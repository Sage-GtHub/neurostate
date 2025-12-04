import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/SEO";
import { ArrowRight, CheckCircle2, TrendingUp, Shield, Target, Activity } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function SportsOverview() {
  const hero = useScrollAnimation();
  const outcomes = useScrollAnimation();
  const value = useScrollAnimation();
  const included = useScrollAnimation();
  const form = useScrollAnimation();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    athletes: "",
    goals: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partnership demo request:", formData);
  };

  return (
    <>
      <SEO 
        title="Sports Cognitive Performance System | NeuroState for Teams"
        description="AI-driven cognitive performance for elite athletes. Faster recovery, injury prevention and peak mental performance through personalised protocols, red light therapy and adaptogen supplements."
        keywords="sports cognitive performance, athlete mental performance, AI sports coaching, injury prevention technology, athletic recovery optimisation, sports wellness platform"
      />
      
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero - Performance Focused */}
        <section ref={hero.ref} className={`pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Football · Rugby · Athletics · Elite Teams</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-carbon leading-[1.02]">
              Cognitive Performance
              <br />
              <span className="text-accent">for Elite Athletes.</span>
            </h1>
            <p className="text-xl text-ash max-w-2xl mx-auto">
              AI-driven cognitive optimisation for sports organisations. 
              Faster recovery. Fewer injuries. Peak mental performance when it matters.
            </p>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon text-ivory">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate">
              {[
                { stat: "+23%", label: "Performance Gain", desc: "Key metrics" },
                { stat: "-41%", label: "Injury Reduction", desc: "Soft tissue" },
                { stat: "-38%", label: "Recovery Time", desc: "Return to peak" },
                { stat: "89%", label: "Athlete Satisfaction", desc: "Programme NPS" }
              ].map((item, i) => (
                <div key={i} className="bg-carbon p-6 sm:p-8 text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-signal-green mb-1">{item.stat}</p>
                  <p className="text-ivory font-medium text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-mist">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Athletes Get */}
        <section ref={outcomes.ref} className={`py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white transition-all duration-1000 ${outcomes.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Athlete Benefits</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.1]">
                What athletes get.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-mist">
              {[
                {
                  icon: Target,
                  title: "Nova AI Coach",
                  description: "Personalised protocols based on training load, recovery status, and competition schedule."
                },
                {
                  icon: Activity,
                  title: "Recovery Optimisation",
                  description: "Red light therapy, supplement stacks, and sleep protocols designed for athletic recovery."
                },
                {
                  icon: Shield,
                  title: "Injury Prevention",
                  description: "Early warning detection. Protocol adjustments before problems become injuries."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-10 sm:p-12 border-l-2 border-signal-green/30">
                  <item.icon className="w-8 h-8 text-signal-green mb-6" />
                  <h3 className="text-xl font-bold text-carbon mb-3">{item.title}</h3>
                  <p className="text-ash text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Protection */}
        <section ref={value.ref} className={`py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl transition-all duration-1000 ${value.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">ROI</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.1]">
                  Protect your
                  <br />
                  <span className="text-accent">most valuable assets.</span>
                </h2>
                <p className="text-lg text-ash leading-relaxed">
                  Every injury costs time, money, and competitive advantage. 
                  NeuroState helps athletes stay on the pitch.
                </p>
              </div>

              <div className="bg-carbon text-ivory p-8 sm:p-10">
                <h3 className="text-lg font-bold mb-6">Example: 25 Athlete Squad</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between pb-4 border-b border-slate">
                    <span className="text-mist">Squad Size</span>
                    <span className="font-bold">25 athletes</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-slate">
                    <span className="text-mist">Average Player Value</span>
                    <span className="font-bold">£5M</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-slate">
                    <span className="text-mist">Injury Prevention Value (41%)</span>
                    <span className="font-bold text-accent">£2.05M protected</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-slate">
                    <span className="text-mist">Annual Investment</span>
                    <span className="font-bold">£45K</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t-2 border-accent">
                    <span className="text-lg font-bold">Value Protected</span>
                    <span className="text-2xl font-bold text-accent">£2.0M+</span>
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
                Full performance stack.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Nova AI for all athletes",
                "Team analytics dashboard",
                "Staff training",
                "Recovery devices",
                "Supplement protocols",
                "Competition readiness tools"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-6 bg-pearl border-l-2 border-signal-green/40">
                  <CheckCircle2 className="w-5 h-5 text-signal-green flex-shrink-0" />
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
                Talk to our sports team.
              </h2>
              <p className="text-ash">
                See how NeuroState works for elite athletes. We respond within 24 hours.
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
                  placeholder="Organisation"
                  value={formData.organisation}
                  onChange={(e) => setFormData({...formData, organisation: e.target.value})}
                  className="bg-white border-mist min-h-[48px]"
                />
                <Input 
                  placeholder="Number of athletes"
                  value={formData.athletes}
                  onChange={(e) => setFormData({...formData, athletes: e.target.value})}
                  className="bg-white border-mist min-h-[48px]"
                />
              </div>
              <Textarea 
                placeholder="What are your performance goals?"
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
