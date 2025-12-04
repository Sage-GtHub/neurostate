import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData, SoftwareApplicationStructuredData, WebsiteStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Lightbulb, Zap, Users, Building2, X, CheckCircle2, Activity, Target, Sparkles, BarChart3, Shield, Clock, Briefcase, Dumbbell, Heart, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import novaIcon from "@/assets/neurostate-icon.svg";
import redlightDevice from "@/assets/redlight.webp";
import heroSupplement from "@/assets/hero-supplement.png";

const Index = () => {
  const isMobile = useIsMobile();
  const [chatOpen, setChatOpen] = useState(false);
  
  const system = useScrollAnimation();
  const whoWeHelp = useScrollAnimation();
  const problems = useScrollAnimation();
  const science = useScrollAnimation();
  const category = useScrollAnimation();
  const nova = useScrollAnimation();
  const device = useScrollAnimation();
  const supplements = useScrollAnimation();
  const business = useScrollAnimation();
  const cta = useScrollAnimation();

  return (
    <>
      <SEO 
        title="NeuroState – The World's First Cognitive Performance System"
        description="AI, red light therapy and performance supplements combined into one system to improve focus, sleep, energy and cognitive performance. The future of mental performance starts here."
      />
      <OrganizationStructuredData />
      <SoftwareApplicationStructuredData />
      <WebsiteStructuredData />
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
                  One Cognitive Performance System. Three Forces.
                </h2>
                <p className="text-base sm:text-lg text-ash max-w-2xl mx-auto">
                  AI-driven cognitive performance, precision supplements, and neuromodulation technology. All working together to optimise the human mind. This is not a product line. It is a performance ecosystem.
                </p>
              </div>

              {/* System Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-mist">
                {[
                  { icon: Brain, title: "Nova AI", desc: "AI performance assistant", detail: "Personalised AI coaching with adaptive recommendations and real-time behavioural insights." },
                  { icon: Target, title: "Protocol Engine", desc: "Personal stacks", detail: "Evidence-based protocols tuned to your biology for focus optimisation." },
                  { icon: Lightbulb, title: "Neuromodulation", desc: "Brain state control", detail: "Red light therapy cognitive benefits. Alpha and beta state switching." },
                  { icon: Zap, title: "Supplements", desc: "Precision nutrition", detail: "Adaptogen supplements for focus. Magnesium for recovery. Third-party verified." },
                  { icon: Activity, title: "Data Integration", desc: "Wearable sync", detail: "Oura. Whoop. Apple Watch. Unified predictive wellness AI." },
                  { icon: Building2, title: "Team Deployment", desc: "Enterprise scale", detail: "Corporate wellbeing solution. Workplace performance platform." },
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

          {/* Who We Help */}
          <section ref={whoWeHelp.ref} className={`relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl transition-all duration-1000 ${whoWeHelp.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Who We Help</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.05]">
                  Built for those who demand more
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Briefcase, title: "Professionals", desc: "High performers seeking sustained focus and mental clarity under pressure" },
                  { icon: Building2, title: "Corporate Teams", desc: "Organisations ready to replace outdated wellness with cognitive performance" },
                  { icon: Dumbbell, title: "Health Clubs", desc: "Studios and gyms offering premium member performance programmes" },
                  { icon: Users, title: "Founders and Athletes", desc: "Creatives and competitors who need to think faster and recover better" }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-ivory border-l border-carbon/10">
                    <item.icon className="w-5 h-5 text-carbon mb-4" />
                    <h3 className="text-base font-semibold text-carbon mb-2">{item.title}</h3>
                    <p className="text-sm text-ash">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Problems We Solve */}
          <section ref={problems.ref} className={`relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory transition-all duration-1000 ${problems.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-6">
                  <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Problems We Solve</p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.05]">
                    Mental performance issues holding you back
                  </h2>
                  <p className="text-base sm:text-lg text-ash leading-relaxed">
                    The modern brain is under siege. We built our cognitive performance system to address the root causes, not just the symptoms.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Brain fog",
                    "Poor focus",
                    "Burnout",
                    "Low energy",
                    "Sleep issues",
                    "Chronic stress",
                    "Recovery deficits",
                    "Decision fatigue"
                  ].map((problem, i) => (
                    <div key={i} className="p-4 bg-carbon/5 border-l border-carbon/10">
                      <p className="text-sm text-carbon font-medium">{problem}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Backed by Science */}
          <section ref={science.ref} className={`relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon text-ivory transition-all duration-1000 ${science.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <p className="text-stone text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Backed by Science</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05]">
                  Evidence-based cognitive optimisation
                </h2>
                <p className="text-base sm:text-lg text-stone max-w-2xl mx-auto">
                  Every element of our system is grounded in peer-reviewed research and clinical evidence.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-slate/30">
                {[
                  { icon: Lightbulb, title: "Photobiomodulation", desc: "Red light therapy cognitive benefits at 660nm and 850nm wavelengths" },
                  { icon: Brain, title: "Neuromodulation", desc: "Non-invasive brain state modulation for focus and recovery" },
                  { icon: FlaskConical, title: "Adaptogens", desc: "Ashwagandha, Rhodiola, and Lion's Mane for stress adaptation" },
                  { icon: Shield, title: "Magnesium Glycinate", desc: "Bioavailable magnesium for sleep optimisation and recovery" },
                  { icon: Sparkles, title: "AI Personalisation", desc: "Predictive wellness AI adapts protocols to your biology" }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-carbon text-center">
                    <item.icon className="w-5 h-5 text-ivory mx-auto mb-3" />
                    <h3 className="text-sm font-semibold text-ivory mb-2">{item.title}</h3>
                    <p className="text-xs text-stone">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Category Creation - Old vs New */}
          <section ref={category.ref} className={`relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory transition-all duration-1000 ${category.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 sm:mb-20 space-y-4">
                <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Category Creation</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-carbon leading-[1.05]">
                  Traditional wellness is dead
                </h2>
                <p className="text-base sm:text-lg text-ash max-w-2xl mx-auto">
                  This is the future of personalised cognitive performance.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Dead Solutions */}
                <div className="space-y-3">
                  <p className="text-xs text-carbon/60 uppercase tracking-wider mb-6">What no longer works</p>
                  {[
                    { item: "Meditation apps no one opens", status: "Abandoned" },
                    { item: "Breathwork sessions that change nothing", status: "Ineffective" },
                    { item: "Wellbeing talks no one attends", status: "Ignored" },
                    { item: "Mental health days that arrive too late", status: "Reactive" }
                  ].map((entry, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-carbon/5 border-l border-carbon/10">
                      <X className="w-4 h-4 text-carbon/30 flex-shrink-0" />
                      <span className="text-ash line-through text-sm">{entry.item}</span>
                      <span className="text-[10px] text-carbon/40 ml-auto uppercase tracking-wide">{entry.status}</span>
                    </div>
                  ))}
                </div>

                {/* NeuroState Outcomes */}
                <div className="space-y-3">
                  <p className="text-xs text-carbon/60 uppercase tracking-wider mb-6">What NeuroState delivers</p>
                  {[
                    { outcome: "Focus Optimisation", metric: "Sustained attention and deep work capacity" },
                    { outcome: "Mental Clarity", metric: "Faster decisions. Clearer thinking." },
                    { outcome: "Cognitive Resilience", metric: "Retention and recall under pressure" },
                    { outcome: "Stable Energy", metric: "Consistent output throughout the day" },
                    { outcome: "Burnout Prevention", metric: "Stress reduction technology that works" }
                  ].map((entry, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-carbon/5 border-l border-carbon/20">
                      <CheckCircle2 className="w-4 h-4 text-carbon flex-shrink-0" />
                      <div>
                        <span className="text-carbon font-medium text-sm">{entry.outcome}</span>
                        <p className="text-ash text-xs mt-0.5">{entry.metric}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Nova AI Section */}
          <section ref={nova.ref} className={`relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl transition-all duration-1000 ${nova.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">AI Performance Assistant</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.05]">
                      Nova, Your Cognitive Operating System
                    </h2>
                    <p className="text-base sm:text-lg text-ash leading-relaxed max-w-lg">
                      Nova is our AI-driven cognitive performance engine. It learns your physiology, predicts your mental states, and builds personalised protocols that improve how you think, recover, and perform. Predictive wellness AI that reshapes your habits using science, data, and relentless precision.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: "Personalised AI coaching", desc: "Daily protocols tailored to your biology" },
                      { title: "Adaptive recommendations", desc: "Adjusts in real-time as your data changes" },
                      { title: "Real-time behavioural insights", desc: "Learns patterns and optimises continuously" },
                      { title: "Wearable integration", desc: "Connects to Oura, Whoop, Apple Watch" },
                      { title: "Protocol optimisation", desc: "Refines your supplement stack automatically" }
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
                          <p className="text-stone text-xs">Analysing your biometrics</p>
                        </div>
                      </div>
                      <div className="bg-slate/50 p-4">
                        <p className="text-stone text-sm leading-relaxed">
                          Your HRV dropped 12% overnight. Adjusting protocol. Skip high intensity today. Take magnesium at 8pm for sleep optimisation.
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
                      alt="NeuroState Red Light Therapy Device for cognitive performance and mental clarity" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-stone text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Neuromodulation Hardware</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ivory leading-[1.05]">
                      Red Light Therapy for Cognitive Performance
                    </h2>
                    <p className="text-base sm:text-lg text-stone leading-relaxed max-w-lg">
                      Not another wellness gadget. A device engineered to deliver red light therapy cognitive benefits. Enhance focus, accelerate recovery, and improve mental clarity in minutes. Mental performance tools that change your brain state on demand.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      "660nm and 850nm wavelengths for photobiomodulation",
                      "Alpha state for recovery and creativity",
                      "Beta state for focus optimisation and execution",
                      "Clinically validated neuromodulation protocols"
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
                    <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Performance Supplements</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.05]">
                      Adaptogen Supplements for Focus and Recovery
                    </h2>
                    <p className="text-base sm:text-lg text-ash leading-relaxed max-w-lg">
                      Every ingredient at the dose that works. No proprietary blends. No marketing nonsense. Performance supplements with research-backed formulas designed for cognitive optimisation. Magnesium for recovery. Adaptogens for stress. Nootropics for focus.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "Focus optimisation", desc: "Targeted cognitive enhancement" },
                      { title: "Clinical dosing", desc: "Evidence-based protocols" },
                      { title: "High performers", desc: "Built for pressure" },
                      { title: "Nova integration", desc: "AI-personalised stacks" }
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
                    alt="NeuroState Performance Supplements with adaptogens for focus and cognitive enhancement" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* For Teams */}
          <section ref={business.ref} className={`relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon transition-all duration-1000 ${business.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-stone text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Enterprise Wellbeing Solution</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ivory leading-[1.05]">
                      Corporate Wellbeing Solution That Delivers Results
                    </h2>
                    <p className="text-base sm:text-lg text-stone leading-relaxed max-w-lg">
                      The workplace performance platform that replaces outdated corporate wellness. Deploy our cognitive performance system across your organisation and measure real outcomes. Employee performance tools that actually work.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { stat: "47%", label: "Focus increase" },
                      { stat: "63%", label: "Burnout reduction" },
                      { stat: "31%", label: "Productivity gain" },
                      { stat: "89%", label: "Satisfaction rate" }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-ivory/5">
                        <p className="text-3xl font-bold text-ivory">{item.stat}</p>
                        <p className="text-stone text-xs mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/enterprise/overview">
                    <Button 
                      size="lg"
                      className="bg-ivory text-carbon hover:bg-mist transition-all duration-300 min-h-[48px] touch-manipulation px-8"
                    >
                      For high-performance teams
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-stone uppercase tracking-wider mb-6">What enterprise clients receive</p>
                  {[
                    { title: "Nova AI for teams", desc: "Personalised AI coaching for every employee" },
                    { title: "Monthly supplement delivery", desc: "Research-backed formulas delivered to your office" },
                    { title: "Real-time analytics", desc: "Track cognitive performance across departments" },
                    { title: "Dedicated support", desc: "Enterprise account management and onboarding" }
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-ivory/5 border-l border-ivory/20">
                      <p className="text-ivory font-medium text-sm">{item.title}</p>
                      <p className="text-stone text-xs mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Internal Links Section */}
          <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl border-y border-mist">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium mb-4">Explore More</p>
                <h3 className="text-xl sm:text-2xl font-bold text-carbon">Discover the full cognitive performance system</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { title: "Nova AI", href: "/nova/overview", desc: "AI performance assistant" },
                  { title: "For Teams", href: "/enterprise/overview", desc: "Corporate solutions" },
                  { title: "Supplements", href: "/category/supplements", desc: "Performance nutrition" },
                  { title: "Red Light", href: "/category/devices", desc: "Neuromodulation devices" },
                  { title: "About Us", href: "/about", desc: "Our mission" }
                ].map((link, i) => (
                  <Link key={i} to={link.href} className="group p-4 bg-ivory hover:bg-carbon transition-all duration-300">
                    <p className="text-sm font-semibold text-carbon group-hover:text-ivory transition-colors">{link.title}</p>
                    <p className="text-xs text-ash group-hover:text-stone transition-colors mt-1">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section ref={cta.ref} className={`relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-carbon leading-[1.05]">
                Ready to optimise your cognitive performance?
              </h2>
              <p className="text-base sm:text-lg text-ash max-w-2xl mx-auto">
                Join thousands using the world's first cognitive performance system to think clearer, work harder, and recover faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/shop">
                  <Button 
                    size="lg"
                    className="bg-carbon text-ivory hover:bg-slate transition-all duration-300 min-h-[52px] touch-manipulation px-10"
                  >
                    Shop now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/nova/overview" target="_blank">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-carbon/30 text-carbon hover:bg-carbon/5 transition-all duration-300 min-h-[52px] touch-manipulation px-10"
                  >
                    Explore Nova AI
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
      </div>
    </>
  );
};

export default Index;
