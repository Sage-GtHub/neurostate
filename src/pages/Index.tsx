import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Lightbulb, Zap, Users, Building2, X, CheckCircle2, Activity, Target, Sparkles, BarChart3, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import novaIcon from "@/assets/neurostate-icon.svg";
import redlightDevice from "@/assets/redlight.webp";
import heroSupplement from "@/assets/hero-supplement.png";

const Index = () => {
  const isMobile = useIsMobile();
  const [chatOpen, setChatOpen] = useState(false);
  
  const system = useScrollAnimation();
  const category = useScrollAnimation();
  const nova = useScrollAnimation();
  const device = useScrollAnimation();
  const supplements = useScrollAnimation();
  const business = useScrollAnimation();
  const cta = useScrollAnimation();

  return (
    <>
      <SEO 
        title="NeuroState | The AI Operating System for Human Performance"
        description="NeuroState replaces outdated corporate wellness with the world's first AI-powered cognitive performance system. Nova AI. Red light neuromodulation. Precision supplements."
      />
      <OrganizationStructuredData />
      <div className="min-h-screen bg-ivory mobile-nav-padding">
        <Header />
        <main>
          <Hero />

          {/* The Platform */}
          <section ref={system.ref} className={`relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory overflow-hidden transition-all duration-1000 ${system.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="text-center mb-16 sm:mb-24 space-y-4">
                <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">The Platform</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-carbon leading-[1.05]">
                  One System. Three Forces.
                </h2>
                <p className="text-base sm:text-lg text-ash max-w-2xl mx-auto">
                  AI, science-backed supplements, and state-shifting technology — all working together to upgrade the human mind. This isn't a product line. It's a performance architecture.
                </p>
              </div>

              {/* System Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-mist">
                {[
                  { icon: Brain, title: "Nova AI", desc: "Cognitive engine", detail: "Daily guidance. Real time adjustments. Deep personalisation." },
                  { icon: Target, title: "Protocol Engine", desc: "Personal stacks", detail: "Evidence based protocols tuned to your biology." },
                  { icon: Lightbulb, title: "Neuromodulation", desc: "Brain state control", detail: "Clinical grade red light therapy. Alpha and beta switching." },
                  { icon: Zap, title: "Supplements", desc: "Precision nutrition", detail: "Research backed doses. Third party verified." },
                  { icon: Activity, title: "Data Integration", desc: "Wearable sync", detail: "Oura. Whoop. Apple Watch. Unified intelligence." },
                  { icon: Building2, title: "Team Deployment", desc: "Enterprise scale", detail: "Roll out across organisations. Measure outcomes." },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="group relative p-8 sm:p-10 md:p-12 bg-ivory hover:bg-carbon transition-all duration-500 cursor-pointer"
                  >
                    <div className="space-y-4 sm:space-y-5">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-carbon group-hover:text-ivory transition-colors" />
                      <h3 className="text-base sm:text-lg font-semibold text-carbon group-hover:text-ivory transition-colors">{item.title}</h3>
                      <p className="text-ash group-hover:text-stone text-xs sm:text-sm transition-colors">{item.desc}</p>
                      <p className="text-stone group-hover:text-stone/70 text-xs transition-colors">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Category Creation - Old vs New */}
          <section ref={category.ref} className={`relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon text-ivory transition-all duration-1000 ${category.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 sm:mb-20 space-y-4">
                <p className="text-stone text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Category Creation</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
                  The old corporate wellness world is dead
                </h2>
                <p className="text-base sm:text-lg text-stone max-w-2xl mx-auto">
                  This is the future of cognitive performance.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Dead Solutions */}
                <div className="space-y-3">
                  <p className="text-xs text-stone/60 uppercase tracking-wider mb-6">What no longer works</p>
                  {[
                    { item: "Meditation apps no one opens", status: "Abandoned" },
                    { item: "Breathwork sessions that change nothing", status: "Ineffective" },
                    { item: "Wellbeing talks no one attends", status: "Ignored" },
                    { item: "Mental health days that arrive too late", status: "Reactive" }
                  ].map((entry, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate/40 border-l border-stone/20">
                      <X className="w-4 h-4 text-stone/50 flex-shrink-0" />
                      <span className="text-stone/70 line-through text-sm">{entry.item}</span>
                      <span className="text-[10px] text-stone/40 ml-auto uppercase tracking-wide">{entry.status}</span>
                    </div>
                  ))}
                </div>

                {/* NeuroState Outcomes */}
                <div className="space-y-3">
                  <p className="text-xs text-ivory/60 uppercase tracking-wider mb-6">What NeuroState delivers</p>
                  {[
                    { outcome: "Focus", metric: "Sustained attention and deep work capacity" },
                    { outcome: "Clarity", metric: "Faster decisions. Clearer thinking." },
                    { outcome: "Memory", metric: "Retention and recall under pressure" },
                    { outcome: "Energy", metric: "Stable output throughout the day" },
                    { outcome: "Resilience", metric: "Stress adaptation. Cognitive recovery." }
                  ].map((entry, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-ivory/5 border-l border-ivory/20">
                      <CheckCircle2 className="w-4 h-4 text-ivory flex-shrink-0" />
                      <div>
                        <span className="text-ivory font-medium text-sm">{entry.outcome}</span>
                        <p className="text-stone/70 text-xs mt-0.5">{entry.metric}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Nova AI Section */}
          <section ref={nova.ref} className={`relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory transition-all duration-1000 ${nova.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Cognitive Engine</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.05]">
                      Nova — Your Cognitive Operating System
                    </h2>
                    <p className="text-base sm:text-lg text-ash leading-relaxed max-w-lg">
                      Nova learns your physiology, predicts your mental states, and builds personalised protocols that improve how you think, recover, and perform. It doesn't 'motivate' you — it reshapes your habits using science, data, and relentless precision.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: "Daily guidance", desc: "Personalised protocols every morning" },
                      { title: "Real time adjustments", desc: "Adapts as your data changes" },
                      { title: "Deep personalisation", desc: "Learns your biology over time" },
                      { title: "Data integrations", desc: "Connects to your wearables" },
                      { title: "Protocol optimisation", desc: "Refines your stack continuously" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1 h-1 rounded-full bg-carbon mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-carbon font-medium text-sm">{item.title}</p>
                          <p className="text-ash text-xs">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/nova/overview" target="_blank">
                    <Button 
                      size="lg"
                      className="bg-carbon text-ivory hover:bg-slate transition-all duration-300 min-h-[48px] touch-manipulation px-8"
                    >
                      Explore Nova
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Nova UI Preview */}
                <div className="relative">
                  <div className="relative overflow-hidden bg-carbon p-6 sm:p-8">
                    <div className="space-y-5">
                      <div className="flex items-center gap-3 pb-4 border-b border-slate">
                        <div className="w-10 h-10 bg-ivory/10 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-ivory" />
                        </div>
                        <div>
                          <p className="text-ivory font-medium text-sm">Nova</p>
                          <p className="text-stone text-xs">Processing your data</p>
                        </div>
                      </div>
                      <div className="bg-slate/50 p-4">
                        <p className="text-stone text-sm leading-relaxed">
                          Your HRV dropped 12% overnight. Adjusting protocol. Skip high intensity today. Take magnesium at 8pm.
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: "68", label: "HRV" },
                          { value: "7.8", label: "Sleep" },
                          { value: "85%", label: "Recovery" }
                        ].map((metric, i) => (
                          <div key={i} className="bg-slate/30 p-3 text-center">
                            <p className="text-ivory text-lg font-semibold">{metric.value}</p>
                            <p className="text-stone text-[10px] mt-0.5 uppercase tracking-wide">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hardware Section */}
          <section ref={device.ref} className={`relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon transition-all duration-1000 ${device.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
                    <p className="text-stone text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Hardware</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ivory leading-[1.05]">
                      State-Shifting Technology for Peak Performance
                    </h2>
                    <p className="text-base sm:text-lg text-stone leading-relaxed max-w-lg">
                      Not another wellness gadget. A device engineered to enhance focus, recovery, and cognitive clarity — in minutes. Designed to change your mental state on demand.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      "660nm and 850nm wavelengths",
                      "Alpha state for recovery and creativity",
                      "Beta state for focus and execution",
                      "Clinically validated protocols"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-ivory flex-shrink-0" />
                        <p className="text-ivory/80 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/category/devices">
                    <Button 
                      size="lg"
                      className="bg-ivory text-carbon hover:bg-mist transition-all duration-300 min-h-[48px] touch-manipulation px-8"
                    >
                      View devices
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Supplements Section */}
          <section ref={supplements.ref} className={`relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory transition-all duration-1000 ${supplements.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Supplements</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.05]">
                      Performance nutrition engineered for the brain
                    </h2>
                    <p className="text-base sm:text-lg text-ash leading-relaxed max-w-lg">
                      Every ingredient at the dose that works. No proprietary blends. No marketing nonsense. Just research backed formulas designed for cognitive output.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "What it does", desc: "Targeted cognitive enhancement" },
                      { title: "Why it works", desc: "Clinical dosing protocols" },
                      { title: "Who it helps", desc: "High performers under pressure" },
                      { title: "How it fits", desc: "Integrates with Nova AI" }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-carbon/5 border-l border-carbon/10">
                        <p className="text-carbon font-medium text-sm">{item.title}</p>
                        <p className="text-ash text-xs mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/category/supplements">
                    <Button 
                      size="lg"
                      className="bg-carbon text-ivory hover:bg-slate transition-all duration-300 min-h-[48px] touch-manipulation px-8"
                    >
                      Browse supplements
                      <ArrowRight className="ml-2 w-4 h-4" />
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

          {/* For Teams */}
          <section ref={business.ref} className={`relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon transition-all duration-1000 ${business.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 sm:mb-20 space-y-4">
                <p className="text-stone text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">For Organisations</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ivory leading-[1.05]">
                  Corporate Wellness Is Broken.
                </h2>
                <p className="text-base sm:text-lg text-stone max-w-2xl mx-auto">
                  Meditation apps, webinars, and yoga sessions don't improve cognitive performance. NeuroState replaces outdated wellbeing perks with a scientific performance system that helps employees think faster, recover better, and perform at elite levels.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate/30 mb-12">
                {[
                  { stat: "47%", label: "Focus increase", desc: "Measured improvement" },
                  { stat: "63%", label: "Less burnout", desc: "Within 90 days" },
                  { stat: "31%", label: "Productivity", desc: "Output per employee" },
                  { stat: "89%", label: "Satisfaction", desc: "Programme rating" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="relative p-8 sm:p-10 bg-carbon text-center"
                  >
                    <p className="text-4xl sm:text-5xl font-bold text-ivory mb-2">{item.stat}</p>
                    <p className="text-sm text-ivory mb-1">{item.label}</p>
                    <p className="text-xs text-stone">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center space-y-4">
                <p className="text-stone max-w-xl mx-auto text-sm">
                  The first integrated platform combining AI, hardware, and nutrition. Employers finally get outcomes, not participation rates.
                </p>
                <Link to="/enterprise/overview">
                  <Button 
                    size="lg"
                    className="bg-ivory text-carbon hover:bg-mist transition-all duration-300 min-h-[48px] touch-manipulation px-8"
                  >
                    Partner Portal
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section ref={cta.ref} className={`relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-carbon leading-[1.05]">
                Your brain is your most valuable asset
              </h2>
              <p className="text-base sm:text-lg text-ash max-w-xl mx-auto">
                Upgrade it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/shop">
                  <Button 
                    size="lg"
                    className="bg-carbon text-ivory hover:bg-slate transition-all duration-300 min-h-[52px] px-10"
                  >
                    Shop now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/nova/overview" target="_blank">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-carbon/20 text-carbon hover:bg-carbon/5 transition-all duration-300 min-h-[52px] px-10"
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
