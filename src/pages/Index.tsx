import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData, SoftwareApplicationStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";
import AnimatedNeuron from "@/components/AnimatedNeuron";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ArrowRight, X, CheckCircle2, Activity, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import redlightDevice from "@/assets/redlight.webp";
import heroSupplement from "@/assets/hero-supplement.png";

const Index = () => {
  const isMobile = useIsMobile();
  const [chatOpen, setChatOpen] = useState(false);
  
  const system = useScrollAnimation();
  const problems = useScrollAnimation();
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
      <LocalBusinessStructuredData />
      <div className="min-h-screen bg-[#0a0a0a] mobile-nav-padding">
        <Header />
        <main>
          <Hero />

          {/* The Platform - Dark Palantir Style */}
          <section ref={system.ref} className={`relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-[#0a0a0a] overflow-hidden transition-all duration-1000 ${system.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Grid background */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
              }}
            />
            
            {/* Gradient orb */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-emerald-500/[0.05] to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="text-center mb-20 sm:mb-28 space-y-6">
                <p className="text-emerald-400/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">The Platform</p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.02] tracking-tight">
                  One System.<br className="hidden sm:block" /> Three Forces.
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                  AI-driven cognitive performance, precision supplements, and neuromodulation technology. All working together to optimise the human mind.
                </p>
              </div>

              {/* Three Forces Grid */}
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {[
                  { 
                    title: "Nova AI", 
                    desc: "AI Cognitive OS",
                    detail: "Personalised AI coaching with adaptive recommendations and real-time behavioural insights.",
                    color: "violet",
                    borderColor: "border-violet-500/30",
                    glowColor: "from-violet-500/20",
                    iconColor: "#8b5cf6"
                  },
                  { 
                    title: "Supplements", 
                    desc: "Personalised stacks", 
                    detail: "Adaptogen supplements for focus. Magnesium for recovery. Third-party verified.",
                    color: "emerald",
                    borderColor: "border-emerald-500/30",
                    glowColor: "from-emerald-500/20",
                    iconColor: "#10b981"
                  },
                  { 
                    title: "Neuromodulation", 
                    desc: "Brain state control", 
                    detail: "Red light therapy cognitive benefits. Alpha and beta state switching.",
                    color: "amber",
                    borderColor: "border-amber-500/30",
                    glowColor: "from-amber-500/20",
                    iconColor: "#f59e0b"
                  },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="group relative p-8 hover:bg-white/[0.03] transition-all duration-500 cursor-pointer"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    {/* Hover glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10 space-y-4">
                      {/* Animated Neuron Icon */}
                      <AnimatedNeuron color={item.iconColor} className="w-16 h-16" pulseDelay={i * 200} />
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                      <p className={`text-${item.color}-400 text-sm font-medium uppercase tracking-wider`}>{item.desc}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${item.color}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Problems We Solve - Dark Style */}
          <section ref={problems.ref} className={`relative py-28 sm:py-36 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-[#050505] transition-all duration-1000 ${problems.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Diagonal lines */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, #FFFFFF 40px, #FFFFFF 41px)' }} />
            
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <div className="space-y-8">
                  <p className="text-emerald-400/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">Problems We Solve</p>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.02] tracking-tight">
                    Mental performance issues holding you back
                  </h2>
                  <p className="text-lg sm:text-xl text-white/50 leading-relaxed">
                    The modern brain is under siege. We built our cognitive performance system to address the root causes, not just the symptoms.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
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
                    <div 
                      key={i} 
                      className="group relative p-5 bg-white/[0.02] hover:bg-emerald-500/10 transition-all duration-500 border-l-2 border-emerald-500/20 hover:border-emerald-500"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <p className="relative z-10 text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-500">{problem}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Category Creation - Dark Style */}
          <section ref={category.ref} className={`relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-[#0a0a0a] overflow-hidden transition-all duration-1000 ${category.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}
            />
            
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="text-center mb-20 sm:mb-24 space-y-6">
                <p className="text-emerald-400/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">Category Creation</p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.02] tracking-tight">
                  Traditional wellness<br className="hidden sm:block" /> is dead
                </h2>
                <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
                  This is the future of personalised cognitive performance.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
                {/* Dead Solutions */}
                <div className="space-y-4">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-8 font-medium">What no longer works</p>
                  {[
                    { item: "Meditation apps no one opens", status: "Abandoned" },
                    { item: "Breathwork sessions that change nothing", status: "Ineffective" },
                    { item: "Wellbeing talks no one attends", status: "Ignored" },
                    { item: "Mental health days that arrive too late", status: "Reactive" }
                  ].map((entry, i) => (
                    <div 
                      key={i} 
                      className="group flex items-center gap-5 p-5 bg-white/[0.02] hover:bg-red-500/5 transition-all duration-500 border-l border-red-500/20"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                        <X className="w-4 h-4 text-red-500/50" />
                      </div>
                      <span className="text-white/40 line-through text-sm flex-1">{entry.item}</span>
                      <span className="text-[9px] text-red-500/40 uppercase tracking-[0.2em] font-medium">{entry.status}</span>
                    </div>
                  ))}
                </div>

                {/* NeuroState Outcomes */}
                <div className="space-y-4">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-8 font-medium">What NeuroState delivers</p>
                  {[
                    { outcome: "Focus Optimisation", metric: "Sustained attention and deep work capacity" },
                    { outcome: "Mental Clarity", metric: "Faster decisions. Clearer thinking." },
                    { outcome: "Cognitive Resilience", metric: "Retention and recall under pressure" },
                    { outcome: "Stable Energy", metric: "Consistent output throughout the day" },
                    { outcome: "Burnout Prevention", metric: "Stress reduction technology that works" }
                  ].map((entry, i) => (
                    <div 
                      key={i} 
                      className="group flex items-start gap-5 p-5 bg-white/[0.02] hover:bg-emerald-500/10 transition-all duration-500 border-l-2 border-emerald-500/30 hover:border-emerald-500"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <span className="text-white font-semibold text-sm block transition-colors">{entry.outcome}</span>
                        <p className="text-white/40 text-xs mt-1 transition-colors group-hover:text-white/60">{entry.metric}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Nova AI Section - Dark Style */}
          <section ref={nova.ref} className={`relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-[#050505] overflow-hidden transition-all duration-1000 ${nova.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Gradient orb */}
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-l from-emerald-500/[0.05] to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-emerald-400/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">AI Performance Assistant</p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.02] tracking-tight">
                      Nova, Your Cognitive Operating System
                    </h2>
                    <p className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-lg">
                      Nova is our AI-driven cognitive performance engine. It learns your physiology, predicts your mental states, and builds personalised protocols that improve how you think, recover, and perform.
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
                      <div key={i} className="group flex items-start gap-4 p-3 -mx-3 hover:bg-emerald-500/5 transition-colors duration-300">
                        <div className="w-6 h-6 flex items-center justify-center bg-emerald-500/10 group-hover:bg-emerald-500 transition-colors duration-300 flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 bg-emerald-500 group-hover:bg-[#050505] transition-colors duration-300" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{item.title}</p>
                          <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/nova/overview" target="_blank">
                    <Button 
                      size="lg"
                      className="bg-white text-[#0a0a0a] hover:bg-white/90 transition-all duration-300 min-h-[52px] touch-manipulation px-10 group"
                    >
                      Explore Nova
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Nova UI Preview */}
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/10 to-transparent blur-2xl opacity-50" />
                  <div className="relative overflow-hidden bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 shadow-2xl">
                    <div className="space-y-5">
                      {/* Header */}
                      <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Nova</p>
                          <p className="text-white/40 text-xs">7-Day Performance Forecast</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="text-[10px] text-white/40 uppercase tracking-wide">Live</span>
                        </div>
                      </div>

                      {/* 7-Day Forecast Calendar */}
                      <div className="grid grid-cols-7 gap-1.5">
                        {[
                          { day: "Today", readiness: "optimal", energy: 85 },
                          { day: "Tue", readiness: "optimal", energy: 82 },
                          { day: "Wed", readiness: "moderate", energy: 68 },
                          { day: "Thu", readiness: "low", energy: 55 },
                          { day: "Fri", readiness: "moderate", energy: 72 },
                          { day: "Sat", readiness: "optimal", energy: 88 },
                          { day: "Sun", readiness: "optimal", energy: 90 }
                        ].map((forecast, i) => (
                          <div 
                            key={i} 
                            className={`group p-2 text-center transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-0.5 ${
                              i === 0 ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <p className={`text-[9px] font-medium uppercase tracking-wide mb-1 ${
                              i === 0 ? 'text-emerald-400' : 'text-white/40 group-hover:text-white/60'
                            }`}>{forecast.day}</p>
                            <div className={`w-3 h-3 mx-auto rounded-full mb-1 transition-all duration-300 group-hover:scale-125 ${
                              forecast.readiness === 'optimal' ? 'bg-emerald-500' :
                              forecast.readiness === 'moderate' ? 'bg-orange-500' : 'bg-red-500'
                            }`} />
                            <p className="text-white text-xs font-semibold">{forecast.energy}%</p>
                          </div>
                        ))}
                      </div>

                      {/* Today's Insight */}
                      <div className="group bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 cursor-pointer border border-white/5">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <Activity className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-white text-xs font-semibold mb-1">Today: Optimal Training Window</p>
                            <p className="text-white/40 text-[11px] leading-relaxed">
                              Best performance window 9:00-11:00. Expect energy dip at 3pm. Take magnesium at 8pm.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Quick Metrics */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: "68", label: "HRV", trend: "+5%" },
                          { value: "7.8", label: "Sleep", trend: "Steady" },
                          { value: "85%", label: "Recovery", trend: "+8%" }
                        ].map((metric, i) => (
                          <div 
                            key={i} 
                            className="group bg-white/5 p-3 text-center transition-all duration-300 hover:bg-white/10 cursor-pointer"
                          >
                            <p className="text-white text-lg font-bold tracking-tight group-hover:text-emerald-400 transition-colors">{metric.value}</p>
                            <p className="text-white/40 text-[9px] uppercase tracking-wider">{metric.label}</p>
                            <p className="text-emerald-400 text-[8px] font-semibold mt-0.5">{metric.trend}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hardware Section - Dark Style */}
          <section ref={device.ref} className={`relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-[#0a0a0a] overflow-hidden transition-all duration-1000 ${device.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <div className="order-last lg:order-first">
                  <div className="relative group">
                    <div className="absolute -inset-8 bg-gradient-to-br from-emerald-500/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <img 
                      src={redlightDevice} 
                      alt="NeuroState Red Light Therapy Device for cognitive performance and mental clarity" 
                      className="relative w-full h-auto object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-emerald-400/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">Neuromodulation Hardware</p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.02] tracking-tight">
                      Red Light Therapy for Cognitive Performance
                    </h2>
                    <p className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-lg">
                      Not another wellness gadget. A device engineered to deliver red light therapy cognitive benefits. Enhance focus, accelerate recovery, and improve mental clarity in minutes.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      "660nm and 850nm wavelengths for photobiomodulation",
                      "Alpha state for recovery and creativity",
                      "Beta state for focus optimisation and execution",
                      "Clinically validated neuromodulation protocols"
                    ].map((item, i) => (
                      <div key={i} className="group flex items-center gap-4 p-3 -mx-3 hover:bg-emerald-500/5 transition-colors duration-300">
                        <div className="w-6 h-6 flex items-center justify-center bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors">
                          <div className="w-1.5 h-1.5 bg-emerald-500 group-hover:bg-[#0a0a0a]" />
                        </div>
                        <p className="text-white/70 group-hover:text-white text-sm transition-colors">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/category/devices">
                    <Button 
                      size="lg"
                      className="bg-white text-[#0a0a0a] hover:bg-white/90 transition-all duration-300 min-h-[52px] touch-manipulation px-10 group"
                    >
                      View devices
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Supplements Section - Dark Style */}
          <section ref={supplements.ref} className={`relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-[#050505] overflow-hidden transition-all duration-1000 ${supplements.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Gradient accent */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-emerald-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-emerald-400/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">Performance Supplements</p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.02] tracking-tight">
                      Adaptogen Supplements for Focus and Recovery
                    </h2>
                    <p className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-lg">
                      Every ingredient at the dose that works. No proprietary blends. No marketing nonsense. Performance supplements with research-backed formulas designed for cognitive optimisation.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { title: "Focus optimisation", desc: "Targeted cognitive enhancement" },
                      { title: "Clinical dosing", desc: "Evidence-based protocols" },
                      { title: "High performers", desc: "Built for pressure" },
                      { title: "Nova integration", desc: "AI-personalised stacks" }
                    ].map((item, i) => (
                      <div key={i} className="group p-5 bg-white/[0.02] hover:bg-emerald-500/10 border-l-2 border-emerald-500/20 hover:border-emerald-500 transition-all duration-500">
                        <p className="text-white font-semibold text-sm transition-colors">{item.title}</p>
                        <p className="text-white/40 text-xs mt-1 transition-colors group-hover:text-white/60">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/category/supplements">
                    <Button 
                      size="lg"
                      className="bg-white text-[#0a0a0a] hover:bg-white/90 transition-all duration-300 min-h-[52px] touch-manipulation px-10 group"
                    >
                      Browse supplements
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-8 bg-gradient-to-br from-emerald-500/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img 
                    src={heroSupplement} 
                    alt="NeuroState Performance Supplements with adaptogens for focus and cognitive enhancement" 
                    className="relative w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* For Teams - Dark Style */}
          <section ref={business.ref} className={`relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-[#0a0a0a] overflow-hidden transition-all duration-1000 ${business.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-emerald-400/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">Enterprise Wellbeing Solution</p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.02] tracking-tight">
                      Corporate Wellbeing Solution That Delivers Results
                    </h2>
                    <p className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-lg">
                      The workplace performance platform that replaces outdated corporate wellness. Deploy our cognitive performance system across your organisation and measure real outcomes.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { stat: "47%", label: "Focus increase" },
                      { stat: "63%", label: "Burnout reduction" },
                      { stat: "31%", label: "Productivity gain" },
                      { stat: "89%", label: "Satisfaction rate" }
                    ].map((item, i) => (
                      <div key={i} className="group p-6 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-emerald-500/30 transition-all duration-500">
                        <p className="text-4xl sm:text-5xl font-bold text-emerald-400 tracking-tight">{item.stat}</p>
                        <p className="text-white/40 text-xs mt-2 uppercase tracking-wider">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/enterprise/overview">
                    <Button 
                      size="lg"
                      className="bg-white text-[#0a0a0a] hover:bg-white/90 transition-all duration-300 min-h-[52px] touch-manipulation px-10 group"
                    >
                      For high-performance teams
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-8 font-medium">What enterprise clients receive</p>
                  {[
                    { title: "Nova AI for teams", desc: "Personalised AI coaching for every employee" },
                    { title: "Monthly supplement delivery", desc: "Research-backed formulas delivered to your office" },
                    { title: "Real-time analytics", desc: "Track cognitive performance across departments" },
                    { title: "Dedicated support", desc: "Enterprise account management and onboarding" }
                  ].map((item, i) => (
                    <div key={i} className="group p-5 bg-white/[0.02] hover:bg-emerald-500/10 border-l-2 border-emerald-500/20 hover:border-emerald-500 transition-all duration-500">
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-white/40 text-xs mt-1 group-hover:text-white/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Internal Links Section - Dark Style */}
          <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-[#050505] border-y border-white/5">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-emerald-400/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium mb-4">Explore More</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Discover the full cognitive performance system</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { title: "Nova AI", href: "/nova/overview", desc: "AI performance assistant" },
                  { title: "For Teams", href: "/enterprise/overview", desc: "Corporate solutions" },
                  { title: "Supplements", href: "/category/supplements", desc: "Performance nutrition" },
                  { title: "Red Light", href: "/category/devices", desc: "Neuromodulation devices" },
                  { title: "About Us", href: "/about", desc: "Our mission" }
                ].map((link, i) => (
                  <Link key={i} to={link.href} className="group p-5 bg-white/[0.02] hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 transition-all duration-500">
                    <p className="text-sm font-semibold text-white transition-colors">{link.title}</p>
                    <p className="text-xs text-white/40 transition-colors mt-1 group-hover:text-white/60">{link.desc}</p>
                    <ArrowRight className="w-4 h-4 text-emerald-500 mt-3 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA - Dark Style */}
          <section ref={cta.ref} className={`relative py-20 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-[#0a0a0a] overflow-hidden transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/[0.05] via-transparent to-transparent" />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
                Ready to optimise your<br className="hidden sm:block" /> cognitive performance?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
                Join thousands using the world's first cognitive performance system to think clearer, work harder, and recover faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6 px-2 sm:px-0">
                <Link to="/shop" className="w-full sm:w-auto">
                  <Button 
                    size="default"
                    className="bg-white text-[#0a0a0a] hover:bg-white/90 transition-all duration-300 h-11 sm:h-14 touch-manipulation px-6 sm:px-12 text-sm sm:text-base group w-full sm:w-auto"
                  >
                    Shop now
                    <ArrowRight className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/nova/overview" target="_blank" className="w-full sm:w-auto">
                  <Button 
                    variant="outline"
                    size="default"
                    className="border-white/20 text-white hover:bg-white hover:text-[#0a0a0a] transition-all duration-300 h-11 sm:h-14 touch-manipulation px-6 sm:px-12 text-sm sm:text-base w-full sm:w-auto"
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
