import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Lightbulb, Zap, Users, Building2, FlaskConical, Award, X, CheckCircle2, Activity, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import novaIcon from "@/assets/neurostate-icon.svg";
import redlightDevice from "@/assets/redlight.webp";
import heroSupplement from "@/assets/hero-supplement.png";
import { NovaLanding } from "@/components/NovaLanding";

const Index = () => {
  const isMobile = useIsMobile();
  const [chatOpen, setChatOpen] = useState(false);
  
  const system = useScrollAnimation();
  const nova = useScrollAnimation();
  const device = useScrollAnimation();
  const supplements = useScrollAnimation();
  const business = useScrollAnimation();
  const individuals = useScrollAnimation();
  const contrast = useScrollAnimation();
  const cta = useScrollAnimation();

  return (
    <>
      <SEO />
      <OrganizationStructuredData />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />

          {/* The NeuroState System */}
          <section ref={system.ref} className={`relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white overflow-hidden transition-all duration-1000 ${system.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="text-center mb-16 sm:mb-20 space-y-4">
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">The Platform</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-carbon leading-[1.1]">
                  One system. Total control.
                </h2>
                <p className="text-lg text-ash max-w-xl mx-auto">
                  Six components working together. Nothing else on earth does this.
                </p>
              </div>

              {/* System Diagram - Six Pillars */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-mist">
                {[
                  { icon: Brain, title: "Nova AI", desc: "Cognitive engine", detail: "Predicts. Adapts. Guides." },
                  { icon: Target, title: "Protocol Engine", desc: "Personalised stacks", detail: "Evidence based protocols." },
                  { icon: Lightbulb, title: "Red Light Therapy", desc: "Cellular energy", detail: "Clinical grade photobiomodulation." },
                  { icon: Zap, title: "Supplements", desc: "Research backed doses", detail: "Third party tested." },
                  { icon: Activity, title: "Data Integrations", desc: "Wearable sync", detail: "Oura. Whoop. Apple." },
                  { icon: Building2, title: "Corporate Programmes", desc: "Team performance", detail: "Enterprise deployment." },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="group relative p-8 sm:p-10 md:p-12 bg-white hover:bg-pearl/50 transition-all duration-500"
                  >
                    <div className="space-y-4 sm:space-y-5">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                      <h3 className="text-lg sm:text-xl font-semibold text-carbon">{item.title}</h3>
                      <p className="text-ash text-sm">{item.desc}</p>
                      <p className="text-stone text-xs">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The Problem - Old Wellness is Dead */}
          <section ref={contrast.ref} className={`relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon text-ivory transition-all duration-1000 ${contrast.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">The Problem</p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1]">
                    Wellness is dead.
                  </h2>
                  <p className="text-lg text-mist leading-relaxed">
                    Meditation apps. Breathwork coaches. Step challenges. Mental health webinars. 
                    None of it makes you sharper, faster, or more resilient.
                  </p>
                  <p className="text-xl text-ivory font-medium">
                    NeuroState is the operating system replacing all of it.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { item: "Meditation apps", status: "Passive" },
                    { item: "Breathwork coaches", status: "Temporary" }, 
                    { item: "Wellness workshops", status: "Forgotten" },
                    { item: "Step challenges", status: "Irrelevant" },
                    { item: "Mental health webinars", status: "Reactive" }
                  ].map((entry, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate/30 border-l-2 border-stone/30">
                      <X className="w-5 h-5 text-stone/60 flex-shrink-0" />
                      <span className="text-stone line-through">{entry.item}</span>
                      <span className="text-xs text-stone/60 ml-auto">{entry.status}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-4 p-4 bg-accent/10 border-l-2 border-accent mt-6">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-ivory font-medium">NeuroState cognitive system</span>
                    <span className="text-xs text-accent ml-auto">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Nova AI Section */}
          <section ref={nova.ref} className={`relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white transition-all duration-1000 ${nova.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="inline-block">
                    <img src={novaIcon} alt="Nova AI" className="w-12 h-12 sm:w-14 sm:h-14" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Cognitive Engine</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.1]">
                      Nova predicts
                      <br />
                      <span className="text-accent">before you feel it.</span>
                    </h2>
                    <p className="text-lg text-ash leading-relaxed max-w-lg">
                      Not a chatbot. Not an assistant. A cognitive engine that tracks your biology, 
                      spots patterns you miss, and tells you exactly what to do next.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Predicts your cognitive state 72 hours ahead",
                      "Generates personal performance protocols",
                      "Adjusts daily recommendations based on real data",
                      "Learns your biology over time"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <p className="text-carbon">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/nova" target="_blank">
                    <Button 
                      size="sm"
                      className="bg-carbon text-white hover:bg-slate rounded-full group transition-all duration-300 min-h-[44px] touch-manipulation"
                    >
                      Meet Nova
                      <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Nova UI Preview */}
                <div className="relative">
                  <div className="relative overflow-hidden bg-pearl border border-mist p-8 sm:p-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 pb-6 border-b border-mist">
                        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <p className="text-carbon font-semibold">Nova</p>
                          <p className="text-accent text-sm">Processing</p>
                        </div>
                      </div>
                      <div className="bg-white border border-mist p-5">
                        <p className="text-ash leading-relaxed text-sm">
                          Your HRV dropped 12% overnight. I am adjusting your protocol. 
                          Skip high intensity today. Take magnesium at 8pm.
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "68", label: "HRV" },
                          { value: "7.8", label: "Sleep" },
                          { value: "85%", label: "Recovery" }
                        ].map((metric, i) => (
                          <div key={i} className="bg-accent/5 p-4 border border-accent/10 text-center">
                            <p className="text-accent text-xl font-semibold">{metric.value}</p>
                            <p className="text-stone text-xs mt-1">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Red Light Device Section */}
          <section ref={device.ref} className={`relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl transition-all duration-1000 ${device.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-last lg:order-first">
                  <div className="relative overflow-hidden">
                    <img 
                      src={redlightDevice} 
                      alt="NeuroState Red Light Therapy Device" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-red-500 text-xs tracking-[0.3em] uppercase font-medium">Hardware</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.1]">
                      Light that heals.
                      <br />
                      <span className="text-red-500">Clinically proven.</span>
                    </h2>
                    <p className="text-lg text-ash leading-relaxed max-w-lg">
                      Clinical grade photobiomodulation. The right wavelengths at the right power. 
                      Speeds recovery. Boosts mitochondria. Sharpens cognition.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      "660nm and 850nm wavelengths",
                      "Clinically validated protocols",
                      "Full body or targeted treatment"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <p className="text-carbon">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/categories/recovery">
                    <Button 
                      size="sm"
                      className="bg-carbon text-white hover:bg-slate rounded-full group transition-all duration-300 min-h-[44px] touch-manipulation"
                    >
                      See Devices
                      <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Supplements Section */}
          <section ref={supplements.ref} className={`relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white transition-all duration-1000 ${supplements.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Supplements</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.1]">
                      No fluff.
                      <br />
                      <span className="text-accent">No fillers.</span>
                    </h2>
                    <p className="text-lg text-ash leading-relaxed max-w-lg">
                      Every ingredient at the dose that works. Third party tested. 
                      No proprietary blends. No marketing nonsense.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Research backed dosages",
                      "Full ingredient transparency",
                      "Third party lab verified"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <p className="text-carbon">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/categories/supplements">
                    <Button 
                      size="sm"
                      className="bg-carbon text-white hover:bg-slate rounded-full group transition-all duration-300 min-h-[44px] touch-manipulation"
                    >
                      Browse Supplements
                      <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="relative overflow-hidden">
                  <img 
                    src={heroSupplement} 
                    alt="NeuroState Performance Supplements" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* For Teams / Enterprise */}
          <section ref={business.ref} className={`relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl transition-all duration-1000 ${business.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">For Organisations</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.1]">
                  Every wellness programme is failing.
                </h2>
                <p className="text-lg text-ash max-w-2xl mx-auto">
                  Meditation apps and breathwork coaches are not fixing burnout. 
                  NeuroState replaces wellness with cognitive performance.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-mist mb-12">
                {[
                  { stat: "47%", label: "Focus increase", desc: "Measured improvement" },
                  { stat: "63%", label: "Less burnout", desc: "Within 90 days" },
                  { stat: "89%", label: "Satisfaction", desc: "Programme rating" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="relative p-10 sm:p-12 bg-white text-center"
                  >
                    <p className="text-5xl sm:text-6xl font-bold text-carbon mb-2">{item.stat}</p>
                    <p className="text-lg text-carbon mb-1">{item.label}</p>
                    <p className="text-sm text-stone">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center space-y-4">
                <p className="text-ash max-w-xl mx-auto">
                  Every pound invested returns sharper thinking, higher productivity, and measurable performance lift.
                </p>
                <Link to="/enterprise/overview">
                  <Button 
                    size="sm"
                    className="bg-carbon text-white hover:bg-slate rounded-full group transition-all duration-300 min-h-[44px] touch-manipulation"
                  >
                    Partner Portal
                    <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section ref={cta.ref} className={`relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon text-ivory transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
                Start performing
                <br />
                <span className="text-accent">at your potential.</span>
              </h2>
              <p className="text-lg text-mist max-w-xl mx-auto">
                Your brain is your most valuable asset. Upgrade it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/shop">
                  <Button 
                    size="sm"
                    className="bg-accent text-white hover:bg-accent-light rounded-full min-h-[44px] px-8"
                  >
                    Explore System
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/nova" target="_blank">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-ivory/30 text-ivory hover:bg-ivory/10 rounded-full min-h-[44px] px-8"
                  >
                    <Sparkles className="mr-2 w-4 h-4" />
                    Meet Nova AI
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <LiveChat />
      </div>
    </>
  );
};

export default Index;
