import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData, SoftwareApplicationStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from "@/components/StructuredData";
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
      <div className="min-h-screen bg-ivory mobile-nav-padding">
        <Header />
        <main>
          <Hero />

          {/* The Platform */}
          <section ref={system.ref} className={`relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory overflow-hidden transition-all duration-1000 ${system.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Subtle gradient orb */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-carbon/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-carbon/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="text-center mb-20 sm:mb-28 space-y-6">
                <p className="text-carbon/40 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium animate-fade-in">The Platform</p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-carbon leading-[1.02] tracking-tight">
                  One System.<br className="hidden sm:block" /> Three Forces.
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-ash max-w-2xl mx-auto leading-relaxed">
                  AI-driven cognitive performance, precision supplements, and neuromodulation technology. All working together to optimise the human mind.
                </p>
              </div>

              {/* Three Forces - Animated Circular Design */}
              <div className="relative">
                {/* Connecting lines - visible on md+ screens */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
                  <defs>
                    <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="rgb(245, 158, 11)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  {/* Line from first to second icon */}
                  <line 
                    x1="22%" y1="72px" x2="44%" y2="72px" 
                    stroke="url(#lineGradient1)" 
                    strokeWidth="2" 
                    strokeDasharray="8 4"
                    className="animate-pulse"
                  />
                  {/* Line from second to third icon */}
                  <line 
                    x1="56%" y1="72px" x2="78%" y2="72px" 
                    stroke="url(#lineGradient2)" 
                    strokeWidth="2" 
                    strokeDasharray="8 4"
                    className="animate-pulse"
                  />
                  {/* Animated particles on first line */}
                  <circle r="4" fill="rgb(139, 92, 246)">
                    <animate attributeName="cx" values="22%;44%;22%" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="72px" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
                  </circle>
                  {/* Animated particles on second line */}
                  <circle r="4" fill="rgb(245, 158, 11)">
                    <animate attributeName="cx" values="56%;78%;56%" dur="3s" repeatCount="indefinite" begin="1.5s" />
                    <animate attributeName="cy" values="72px" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="1.5s" />
                  </circle>
                </svg>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {[
                  { 
                    icon: Brain, 
                    title: "Nova AI", 
                    desc: "AI performance assistant", 
                    detail: "Personalised AI coaching with adaptive recommendations and real-time behavioural insights.",
                    number: "01",
                    gradient: "from-violet-500 to-purple-600",
                    pulseColor: "violet"
                  },
                  { 
                    icon: FlaskConical, 
                    title: "Supplements", 
                    desc: "Personalised stacks", 
                    detail: "Adaptogen supplements for focus. Magnesium for recovery. Third-party verified.",
                    number: "02",
                    gradient: "from-emerald-500 to-teal-600",
                    pulseColor: "emerald"
                  },
                  { 
                    icon: Activity, 
                    title: "Neuromodulation", 
                    desc: "Brain state control", 
                    detail: "Red light therapy cognitive benefits. Alpha and beta state switching.",
                    number: "03",
                    gradient: "from-amber-500 to-orange-600",
                    pulseColor: "amber"
                  },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="group relative text-center cursor-pointer"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    {/* Circular container with animations */}
                    <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 mb-6">
                      {/* Animated pulse rings */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 animate-pulse`} />
                      
                      {/* Outer rotating ring */}
                      <div 
                        className="absolute inset-0 rounded-full border-2 border-dashed border-carbon/10 group-hover:border-carbon/30 transition-colors duration-700"
                        style={{ animation: 'spin 20s linear infinite' }}
                      />
                      
                      {/* Middle ring */}
                      <div className="absolute inset-2 rounded-full border border-carbon/5 group-hover:border-carbon/20 transition-colors duration-500" />
                      
                      {/* Inner gradient circle */}
                      <div className={`absolute inset-4 rounded-full bg-gradient-to-br from-pearl to-ivory group-hover:from-carbon group-hover:to-slate transition-all duration-700 shadow-lg group-hover:shadow-xl`} />
                      
                      {/* Orbiting dots */}
                      <div 
                        className="absolute inset-0"
                        style={{ animation: 'spin 8s linear infinite' }}
                      >
                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-br ${item.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                      </div>
                      <div 
                        className="absolute inset-0"
                        style={{ animation: 'spin 8s linear infinite reverse' }}
                      >
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${item.gradient} opacity-40 group-hover:opacity-80 transition-opacity`} />
                      </div>
                      
                      {/* Icon container */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-carbon/5 group-hover:bg-gradient-to-br group-hover:${item.gradient} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}>
                          <item.icon className={`w-6 h-6 sm:w-7 sm:h-7 text-carbon group-hover:text-ivory transition-all duration-500 group-hover:scale-110`} strokeWidth={1.5} />
                        </div>
                      </div>
                      
                      {/* Number badge with pulse */}
                      <div className="absolute -top-1 -right-1">
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.gradient} animate-ping opacity-30`} />
                        <div className={`relative w-7 h-7 rounded-full bg-carbon group-hover:bg-gradient-to-br group-hover:${item.gradient} flex items-center justify-center transition-all duration-500 shadow-md`}>
                          <span className="text-ivory text-[10px] font-semibold">{item.number}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Text content */}
                    <div className="space-y-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-carbon transition-colors duration-500">{item.title}</h3>
                      <p className={`bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent text-sm font-medium uppercase tracking-wider`}>{item.desc}</p>
                      <p className="text-ash text-sm leading-relaxed max-w-xs mx-auto">{item.detail}</p>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </section>

          {/* Problems We Solve - Enhanced */}
          <section ref={problems.ref} className={`relative py-28 sm:py-36 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-pearl to-ivory transition-all duration-1000 ${problems.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <div className="space-y-8">
                  <p className="text-carbon/40 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">Problems We Solve</p>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-carbon leading-[1.02] tracking-tight">
                    Mental performance issues holding you back
                  </h2>
                  <p className="text-lg sm:text-xl text-ash leading-relaxed">
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
                      className="group relative p-5 bg-carbon/[0.03] hover:bg-carbon transition-all duration-500 border-l-2 border-signal-green/30 hover:border-signal-green overflow-hidden"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-signal-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <p className="relative z-10 text-sm font-medium text-carbon group-hover:text-ivory transition-colors duration-500">{problem}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Category Creation - Old vs New - Enhanced */}
          <section ref={category.ref} className={`relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory overflow-hidden transition-all duration-1000 ${category.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Diagonal lines pattern */}
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, #1A1A1A 40px, #1A1A1A 41px)' }} />
            
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="text-center mb-20 sm:mb-24 space-y-6">
                <p className="text-carbon/40 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">Category Creation</p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-carbon leading-[1.02] tracking-tight">
                  Traditional wellness<br className="hidden sm:block" /> is dead
                </h2>
                <p className="text-lg sm:text-xl text-ash max-w-2xl mx-auto">
                  This is the future of personalised cognitive performance.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
                {/* Dead Solutions */}
                <div className="space-y-4">
                  <p className="text-[10px] text-carbon/50 uppercase tracking-[0.3em] mb-8 font-medium">What no longer works</p>
                  {[
                    { item: "Meditation apps no one opens", status: "Abandoned" },
                    { item: "Breathwork sessions that change nothing", status: "Ineffective" },
                    { item: "Wellbeing talks no one attends", status: "Ignored" },
                    { item: "Mental health days that arrive too late", status: "Reactive" }
                  ].map((entry, i) => (
                    <div 
                      key={i} 
                      className="group flex items-center gap-5 p-5 bg-carbon/[0.02] hover:bg-carbon/[0.05] transition-all duration-500 border-l border-carbon/5"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-carbon/5 group-hover:bg-carbon/10 transition-colors">
                        <X className="w-4 h-4 text-carbon/30" />
                      </div>
                      <span className="text-ash line-through text-sm flex-1">{entry.item}</span>
                      <span className="text-[9px] text-carbon/30 uppercase tracking-[0.2em] font-medium">{entry.status}</span>
                    </div>
                  ))}
                </div>

                {/* NeuroState Outcomes */}
                <div className="space-y-4">
                  <p className="text-[10px] text-carbon/50 uppercase tracking-[0.3em] mb-8 font-medium">What NeuroState delivers</p>
                  {[
                    { outcome: "Focus Optimisation", metric: "Sustained attention and deep work capacity" },
                    { outcome: "Mental Clarity", metric: "Faster decisions. Clearer thinking." },
                    { outcome: "Cognitive Resilience", metric: "Retention and recall under pressure" },
                    { outcome: "Stable Energy", metric: "Consistent output throughout the day" },
                    { outcome: "Burnout Prevention", metric: "Stress reduction technology that works" }
                  ].map((entry, i) => (
                    <div 
                      key={i} 
                      className="group flex items-start gap-5 p-5 bg-carbon/[0.03] hover:bg-carbon transition-all duration-500 border-l-2 border-signal-green/40 hover:border-signal-green"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-signal-green/10 group-hover:bg-signal-green/20 transition-colors flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-signal-green transition-colors" />
                      </div>
                      <div className="flex-1">
                        <span className="text-carbon group-hover:text-ivory font-semibold text-sm block transition-colors">{entry.outcome}</span>
                        <p className="text-ash group-hover:text-stone text-xs mt-1 transition-colors">{entry.metric}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Nova AI Section - Enhanced */}
          <section ref={nova.ref} className={`relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl overflow-hidden transition-all duration-1000 ${nova.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Gradient orbs */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-l from-carbon/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-carbon/40 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">AI Performance Assistant</p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-carbon leading-[1.02] tracking-tight">
                      Nova, Your Cognitive Operating System
                    </h2>
                    <p className="text-lg sm:text-xl text-ash leading-relaxed max-w-lg">
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
                      <div key={i} className="group flex items-start gap-4 p-3 -mx-3 hover:bg-signal-green/5 transition-colors duration-300">
                        <div className="w-6 h-6 flex items-center justify-center bg-signal-green/10 group-hover:bg-signal-green transition-colors duration-300 flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 bg-signal-green group-hover:bg-ivory transition-colors duration-300" />
                        </div>
                        <div>
                          <p className="text-carbon font-medium text-sm">{item.title}</p>
                          <p className="text-ash text-xs mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/nova/overview" target="_blank">
                    <Button 
                      size="lg"
                      className="bg-carbon text-ivory hover:bg-slate transition-all duration-300 min-h-[52px] touch-manipulation px-10 group"
                    >
                      Explore Nova
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Nova UI Preview - Enhanced with 7-Day Forecast */}
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-carbon/5 to-transparent blur-2xl opacity-50" />
                  <div className="relative overflow-hidden bg-carbon p-6 sm:p-8 shadow-2xl">
                    <div className="space-y-5">
                      {/* Header */}
                      <div className="flex items-center gap-3 pb-4 border-b border-slate/50">
                        <div className="w-10 h-10 bg-gradient-to-br from-ivory/20 to-ivory/5 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-ivory" />
                        </div>
                        <div>
                          <p className="text-ivory font-semibold text-sm">Nova</p>
                          <p className="text-stone text-xs">7-Day Performance Forecast</p>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-signal-green rounded-full animate-pulse" />
                          <span className="text-[10px] text-stone uppercase tracking-wide">Live</span>
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
                              i === 0 ? 'bg-signal-green/20 border border-signal-green/40' : 'bg-slate/30 hover:bg-slate/50'
                            }`}
                            style={{ animationDelay: `${i * 80}ms` }}
                          >
                            <p className={`text-[9px] font-medium uppercase tracking-wide mb-1 transition-colors duration-200 ${
                              i === 0 ? 'text-signal-green' : 'text-stone group-hover:text-ivory'
                            }`}>{forecast.day}</p>
                            <div className={`w-3 h-3 mx-auto rounded-full mb-1 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg ${
                              forecast.readiness === 'optimal' ? 'bg-signal-green group-hover:shadow-signal-green/50' :
                              forecast.readiness === 'moderate' ? 'bg-orange-500 group-hover:shadow-orange-500/50' : 'bg-red-500 group-hover:shadow-red-500/50'
                            }`} />
                            <p className="text-ivory text-xs font-semibold transition-transform duration-200 group-hover:scale-110">{forecast.energy}%</p>
                          </div>
                        ))}
                      </div>

                      {/* Today's Insight */}
                      <div className="group bg-gradient-to-br from-slate/60 to-slate/40 p-4 transition-all duration-300 hover:from-slate/70 hover:to-slate/50 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-signal-green/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-signal-green/30 group-hover:scale-110">
                            <Activity className="w-4 h-4 text-signal-green transition-transform duration-300 group-hover:animate-pulse" />
                          </div>
                          <div className="transition-transform duration-200 group-hover:translate-x-0.5">
                            <p className="text-ivory text-xs font-semibold mb-1">Today: Optimal Training Window</p>
                            <p className="text-stone text-[11px] leading-relaxed group-hover:text-mist transition-colors duration-200">
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
                            className="group bg-slate/30 p-3 text-center transition-all duration-300 hover:bg-slate/50 cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            <p className="text-ivory text-lg font-bold tracking-tight transition-all duration-200 group-hover:scale-110 group-hover:text-signal-green">{metric.value}</p>
                            <p className="text-stone text-[9px] uppercase tracking-wider transition-colors duration-200 group-hover:text-mist">{metric.label}</p>
                            <p className="text-signal-green text-[8px] font-semibold mt-0.5 transition-transform duration-200 group-hover:scale-105">{metric.trend}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hardware Section - Enhanced */}
          <section ref={device.ref} className={`relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon overflow-hidden transition-all duration-1000 ${device.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <div className="order-last lg:order-first">
                  <div className="relative group">
                    <div className="absolute -inset-8 bg-gradient-to-br from-ivory/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <img 
                      src={redlightDevice} 
                      alt="NeuroState Red Light Therapy Device for cognitive performance and mental clarity" 
                      className="relative w-full h-auto object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-stone/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">Neuromodulation Hardware</p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ivory leading-[1.02] tracking-tight">
                      Red Light Therapy for Cognitive Performance
                    </h2>
                    <p className="text-lg sm:text-xl text-stone leading-relaxed max-w-lg">
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
                      <div key={i} className="group flex items-center gap-4 p-3 -mx-3 hover:bg-signal-green/10 transition-colors duration-300">
                        <div className="w-6 h-6 flex items-center justify-center bg-signal-green/20 group-hover:bg-signal-green transition-colors">
                          <div className="w-1.5 h-1.5 bg-signal-green group-hover:bg-ivory" />
                        </div>
                        <p className="text-ivory/80 group-hover:text-ivory text-sm transition-colors">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/category/devices">
                    <Button 
                      size="lg"
                      className="bg-ivory text-carbon hover:bg-mist transition-all duration-300 min-h-[52px] touch-manipulation px-10 group"
                    >
                      View devices
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Supplements Section - Enhanced */}
          <section ref={supplements.ref} className={`relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory overflow-hidden transition-all duration-1000 ${supplements.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Gradient accent */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-carbon/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-carbon/40 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">Performance Supplements</p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-carbon leading-[1.02] tracking-tight">
                      Adaptogen Supplements for Focus and Recovery
                    </h2>
                    <p className="text-lg sm:text-xl text-ash leading-relaxed max-w-lg">
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
                      <div key={i} className="group p-5 bg-carbon/[0.03] hover:bg-carbon border-l-2 border-signal-green/30 hover:border-signal-green transition-all duration-500">
                        <p className="text-carbon group-hover:text-ivory font-semibold text-sm transition-colors">{item.title}</p>
                        <p className="text-ash group-hover:text-stone text-xs mt-1 transition-colors">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/category/supplements">
                    <Button 
                      size="lg"
                      className="bg-carbon text-ivory hover:bg-slate transition-all duration-300 min-h-[52px] touch-manipulation px-10 group"
                    >
                      Browse supplements
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-8 bg-gradient-to-br from-carbon/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img 
                    src={heroSupplement} 
                    alt="NeuroState Performance Supplements with adaptogens for focus and cognitive enhancement" 
                    className="relative w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* For Teams - Enhanced */}
          <section ref={business.ref} className={`relative py-28 sm:py-36 md:py-44 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon overflow-hidden transition-all duration-1000 ${business.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            <div className="max-w-6xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-stone/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium">Enterprise Wellbeing Solution</p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ivory leading-[1.02] tracking-tight">
                      Corporate Wellbeing Solution That Delivers Results
                    </h2>
                    <p className="text-lg sm:text-xl text-stone leading-relaxed max-w-lg">
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
                      <div key={i} className="group p-6 bg-ivory/[0.03] hover:bg-ivory/[0.08] border border-ivory/10 hover:border-ivory/20 transition-all duration-500">
                        <p className="text-4xl sm:text-5xl font-bold text-signal-green tracking-tight">{item.stat}</p>
                        <p className="text-stone text-xs mt-2 uppercase tracking-wider">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/enterprise/overview">
                    <Button 
                      size="lg"
                      className="bg-ivory text-carbon hover:bg-mist transition-all duration-300 min-h-[52px] touch-manipulation px-10 group"
                    >
                      For high-performance teams
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] text-stone/50 uppercase tracking-[0.3em] mb-8 font-medium">What enterprise clients receive</p>
                  {[
                    { title: "Nova AI for teams", desc: "Personalised AI coaching for every employee" },
                    { title: "Monthly supplement delivery", desc: "Research-backed formulas delivered to your office" },
                    { title: "Real-time analytics", desc: "Track cognitive performance across departments" },
                    { title: "Dedicated support", desc: "Enterprise account management and onboarding" }
                  ].map((item, i) => (
                    <div key={i} className="group p-5 bg-ivory/[0.03] hover:bg-signal-green/10 border-l-2 border-signal-green/30 hover:border-signal-green transition-all duration-500">
                      <p className="text-ivory font-semibold text-sm">{item.title}</p>
                      <p className="text-stone text-xs mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Internal Links Section - Enhanced */}
          <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-pearl to-ivory border-y border-mist">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-carbon/40 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium mb-4">Explore More</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-carbon tracking-tight">Discover the full cognitive performance system</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { title: "Nova AI", href: "/nova/overview", desc: "AI performance assistant" },
                  { title: "For Teams", href: "/enterprise/overview", desc: "Corporate solutions" },
                  { title: "Supplements", href: "/category/supplements", desc: "Performance nutrition" },
                  { title: "Red Light", href: "/category/devices", desc: "Neuromodulation devices" },
                  { title: "About Us", href: "/about", desc: "Our mission" }
                ].map((link, i) => (
                  <Link key={i} to={link.href} className="group p-5 bg-ivory hover:bg-carbon border border-signal-green/10 hover:border-signal-green transition-all duration-500">
                    <p className="text-sm font-semibold text-carbon group-hover:text-ivory transition-colors">{link.title}</p>
                    <p className="text-xs text-ash group-hover:text-stone transition-colors mt-1">{link.desc}</p>
                    <ArrowRight className="w-4 h-4 text-signal-green group-hover:text-ivory mt-3 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA - Enhanced */}
          <section ref={cta.ref} className={`relative py-32 sm:py-40 md:py-48 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory overflow-hidden transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Radial gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-carbon/[0.02] via-transparent to-transparent" />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-carbon leading-[1.02] tracking-tight">
                Ready to optimise your<br className="hidden sm:block" /> cognitive performance?
              </h2>
              <p className="text-lg sm:text-xl text-ash max-w-2xl mx-auto leading-relaxed">
                Join thousands using the world's first cognitive performance system to think clearer, work harder, and recover faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link to="/shop">
                  <Button 
                    size="lg"
                    className="bg-carbon text-ivory hover:bg-slate transition-all duration-300 min-h-[56px] touch-manipulation px-12 text-base group"
                  >
                    Shop now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/nova/overview" target="_blank">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-carbon/20 text-carbon hover:bg-carbon hover:text-ivory transition-all duration-300 min-h-[56px] touch-manipulation px-12 text-base"
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
