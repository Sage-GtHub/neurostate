import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Lightbulb, Zap, Users, Building2, FlaskConical, Award } from "lucide-react";
import novaIcon from "@/assets/neurostate-icon.svg";
import redlightDevice from "@/assets/redlight.webp";
import heroSupplement from "@/assets/hero-supplement.png";

const Index = () => {
  const isMobile = useIsMobile();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <SEO />
      <OrganizationStructuredData />
      <div className="min-h-screen bg-[#0A0A0A]">
        <Header />
        <main>
          <Hero />

          {/* The NeuroState System */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(120,119,198,0.08),transparent_70%)]" />
            
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="text-center mb-24 space-y-8">
                <p className="text-[#7877C6] text-xs tracking-[0.3em] uppercase font-medium">The Complete System</p>
                <h2 className="text-5xl md:text-7xl font-light text-white/95 leading-[1.1]">
                  Four pillars of
                  <br />
                  <span className="font-normal bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">cognitive performance</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
                {[
                  { icon: Brain, title: "Nova AI", desc: "Your autonomous cognitive coach" },
                  { icon: Lightbulb, title: "Red Light", desc: "Photobiomodulation therapy" },
                  { icon: Zap, title: "Supplements", desc: "Precision neuromodulation" },
                  { icon: FlaskConical, title: "Protocols", desc: "Evidence-based stacks" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="group relative p-12 bg-gradient-to-b from-white/[0.02] to-transparent hover:from-[#7877C6]/10 hover:to-transparent transition-all duration-700"
                  >
                    <div className="space-y-6">
                      <item.icon className="w-8 h-8 text-[#7877C6] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                      <h3 className="text-xl font-light text-white/90">{item.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Nova AI Section */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                  <div className="inline-block">
                    <img src={novaIcon} alt="Nova AI" className="w-16 h-16 opacity-80" />
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-5xl md:text-7xl font-light text-white/95 leading-[1.1]">
                      Nova AI
                      <br />
                      <span className="font-normal text-[#7877C6]">Your cognitive copilot</span>
                    </h2>
                    <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                      Autonomous performance optimisation powered by continuous biometric analysis, 
                      predictive insights, and adaptive protocol generation.
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-[#7877C6] mt-3" />
                      <p className="text-white/60 leading-relaxed">Real-time HRV, sleep, and recovery tracking</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-[#7877C6] mt-3" />
                      <p className="text-white/60 leading-relaxed">Predictive pattern recognition and early intervention</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-[#7877C6] mt-3" />
                      <p className="text-white/60 leading-relaxed">Voice-enabled coaching and protocol optimisation</p>
                    </div>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 text-base px-10 py-7 rounded-full group transition-all duration-300"
                  >
                    Experience Nova
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Nova UI Mockup */}
                <div className="relative">
                  <div className="relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent p-10 backdrop-blur-xl">
                    <div className="space-y-8">
                      <div className="flex items-center gap-4 pb-8 border-b border-white/5">
                        <div className="w-14 h-14 rounded-full bg-[#7877C6]/20 border border-[#7877C6]/30 flex items-center justify-center">
                          <Brain className="w-7 h-7 text-[#7877C6]" />
                        </div>
                        <div>
                          <p className="text-white/90 font-medium text-lg">Nova</p>
                          <p className="text-white/40 text-sm">Online</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-white/[0.03] p-6 border border-white/5">
                          <p className="text-white/70 leading-relaxed">
                            Your HRV dropped 12% overnight. I've adjusted your protocol to prioritise recovery. 
                            Consider postponing high-intensity training today.
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-[#7877C6]/10 p-5 border border-[#7877C6]/20">
                            <p className="text-[#7877C6] text-2xl font-light mb-1">68</p>
                            <p className="text-white/40 text-xs">HRV</p>
                          </div>
                          <div className="bg-[#7877C6]/10 p-5 border border-[#7877C6]/20">
                            <p className="text-[#7877C6] text-2xl font-light mb-1">7.8</p>
                            <p className="text-white/40 text-xs">Sleep</p>
                          </div>
                          <div className="bg-[#7877C6]/10 p-5 border border-[#7877C6]/20">
                            <p className="text-[#7877C6] text-2xl font-light mb-1">85%</p>
                            <p className="text-white/40 text-xs">Recovery</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Red Light Device Section */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(239,68,68,0.06),transparent_60%)]" />
            
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                {/* Device Image */}
                <div className="order-last lg:order-first">
                  <div className="relative overflow-hidden">
                    <img 
                      src={redlightDevice} 
                      alt="NeuroState Red Light Therapy Device" 
                      className="w-full h-auto object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 to-transparent" />
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-5xl md:text-7xl font-light text-white/95 leading-[1.1]">
                      Red light
                      <br />
                      <span className="font-normal text-red-400/80">therapy devices</span>
                    </h2>
                    <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                      Clinical-grade photobiomodulation technology. Enhance mitochondrial function, 
                      accelerate recovery, and optimise cellular energy production.
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-red-400/60 mt-3" />
                      <p className="text-white/60 leading-relaxed">660nm & 850nm therapeutic wavelengths</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-red-400/60 mt-3" />
                      <p className="text-white/60 leading-relaxed">Clinically proven dosing protocols</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-red-400/60 mt-3" />
                      <p className="text-white/60 leading-relaxed">Full-body and targeted treatment options</p>
                    </div>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 text-base px-10 py-7 rounded-full group transition-all duration-300"
                  >
                    Explore Devices
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Supplements Section */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-[#0A0A0A]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(120,119,198,0.06),transparent_60%)]" />
            
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-5xl md:text-7xl font-light text-white/95 leading-[1.1]">
                      Performance
                      <br />
                      <span className="font-normal text-[#7877C6]">supplements</span>
                    </h2>
                    <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                      Science-backed compounds engineered for cognitive enhancement. 
                      Each formulation designed by neuroscientists for measurable performance gains.
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-[#7877C6] mt-3" />
                      <p className="text-white/60 leading-relaxed">Third-party tested for purity and potency</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-[#7877C6] mt-3" />
                      <p className="text-white/60 leading-relaxed">Evidence-based dosing protocols</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-[#7877C6] mt-3" />
                      <p className="text-white/60 leading-relaxed">Transparent ingredient sourcing</p>
                    </div>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 text-base px-10 py-7 rounded-full group transition-all duration-300"
                  >
                    Shop Supplements
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Supplement Hero Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={heroSupplement} 
                    alt="NeuroState Performance Supplements" 
                    className="w-full h-auto object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />
                </div>
              </div>
            </div>
          </section>

          {/* For Businesses */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A]">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20 space-y-8">
                <p className="text-[#7877C6] text-xs tracking-[0.3em] uppercase font-medium">Enterprise Solutions</p>
                <h2 className="text-5xl md:text-7xl font-light text-white/95 leading-[1.1]">
                  Built for
                  <br />
                  <span className="font-normal bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">high-performance teams</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-1 mb-16">
                {[
                  { icon: Building2, stat: "47%", label: "Focus increase", desc: "Measured across enterprise clients" },
                  { icon: Users, stat: "63%", label: "Burnout reduction", desc: "Within 90 days of implementation" },
                  { icon: Award, stat: "89%", label: "Satisfaction", desc: "Employee programme rating" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="relative p-12 bg-gradient-to-b from-white/[0.02] to-transparent hover:from-[#7877C6]/10 hover:to-transparent transition-all duration-700"
                  >
                    <item.icon className="w-8 h-8 text-[#7877C6] opacity-60 mb-8" />
                    <p className="text-6xl font-light text-white/90 mb-3">{item.stat}</p>
                    <p className="text-lg text-white/80 mb-2">{item.label}</p>
                    <p className="text-sm text-white/50">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 text-base px-10 py-7 rounded-full group transition-all duration-300"
                >
                  Explore Partner Portal
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </section>

          {/* For Individuals */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-20">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-[#7877C6] text-xs tracking-[0.3em] uppercase font-medium">Direct to Consumer</p>
                    <h2 className="text-5xl md:text-7xl font-light text-white/95 leading-[1.1]">
                      Optimise
                      <br />
                      <span className="font-normal bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">yourself</span>
                    </h2>
                    <p className="text-xl text-white/60 leading-relaxed max-w-xl">
                      Premium supplements, evidence-based protocols, and personalised 
                      performance stacks designed by neuroscientists.
                    </p>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 text-base px-10 py-7 rounded-full group transition-all duration-300"
                  >
                    Shop Products
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  {[
                    { title: "Supplements", count: "40+", desc: "Precision compounds" },
                    { title: "Protocols", count: "12", desc: "Expert-designed stacks" },
                    { title: "Devices", count: "8", desc: "Clinical-grade tools" },
                    { title: "Community", count: "10k+", desc: "High performers" },
                  ].map((item, i) => (
                    <div 
                      key={i}
                      className="p-10 bg-gradient-to-b from-white/[0.02] to-transparent hover:from-[#7877C6]/10 hover:to-transparent transition-all duration-700"
                    >
                      <p className="text-5xl font-light text-white/90 mb-3">{item.count}</p>
                      <p className="text-lg text-white/80 mb-1">{item.title}</p>
                      <p className="text-sm text-white/50">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Science Section */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(120,119,198,0.08),transparent_70%)]" />
            
            <div className="relative z-10 max-w-7xl mx-auto text-center">
              <div className="mb-20 space-y-8">
                <p className="text-[#7877C6] text-xs tracking-[0.3em] uppercase font-medium">Evidence-Based</p>
                <h2 className="text-5xl md:text-7xl font-light text-white/95 leading-[1.1] max-w-4xl mx-auto">
                  Rooted in
                  <br />
                  <span className="font-normal bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">neuroscience</span>
                </h2>
                <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                  Every product, protocol, and recommendation is backed by peer-reviewed research 
                  in neuromodulation, photobiomodulation, and cognitive enhancement.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-16">
                {[
                  { number: "200+", label: "Research papers", desc: "Reviewed and validated" },
                  { number: "15", label: "Neuroscientists", desc: "On advisory board" },
                  { number: "50k+", label: "Data points", desc: "Analysed daily" },
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <p className="text-7xl font-light text-[#7877C6]">{item.number}</p>
                    <p className="text-xl text-white/90">{item.label}</p>
                    <p className="text-white/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Community & Challenges */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto text-center">
              <div className="mb-16 space-y-8">
                <p className="text-[#7877C6] text-xs tracking-[0.3em] uppercase font-medium">Join the Movement</p>
                <h2 className="text-5xl md:text-7xl font-light text-white/95 leading-[1.1]">
                  Performance
                  <br />
                  <span className="font-normal bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">community</span>
                </h2>
                <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                  Connect with high performers, participate in optimisation challenges, 
                  and share your journey to cognitive peak.
                </p>
              </div>
              <Button 
                size="lg"
                className="bg-white text-black hover:bg-white/90 text-base px-10 py-7 rounded-full group transition-all duration-300"
              >
                Join Community
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </section>

          {/* Final CTA */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A] border-t border-white/5">
            <div className="max-w-4xl mx-auto text-center space-y-10">
              <h2 className="text-5xl md:text-7xl font-light text-white/95 leading-[1.1]">
                Ready to optimise?
              </h2>
              <p className="text-xl text-white/60 leading-relaxed">
                Start your journey to cognitive peak performance today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button 
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 text-base px-10 py-7 rounded-full group transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white/10 text-white/90 hover:bg-white/5 text-base px-10 py-7 rounded-full backdrop-blur-sm transition-all duration-300"
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        {!isMobile && <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />}
      </div>
    </>
  );
};

export default Index;
