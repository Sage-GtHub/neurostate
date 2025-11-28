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
      <div className="min-h-screen bg-carbon">
        <Header />
        <main>
          <Hero />

          {/* The NeuroState System */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-carbon to-slate overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,255,0,0.03),transparent_50%)]" />
            
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="text-center mb-20 space-y-6">
                <p className="text-accent text-xs tracking-[0.2em] uppercase font-medium">The Complete System</p>
                <h2 className="text-5xl md:text-6xl font-light text-ivory leading-tight">
                  Four pillars of
                  <br />
                  <span className="font-normal">cognitive performance</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Brain, title: "Nova AI", desc: "Your autonomous cognitive coach", color: "from-accent/20 to-accent/5" },
                  { icon: Lightbulb, title: "Red Light", desc: "Photobiomodulation therapy", color: "from-blue-500/20 to-blue-500/5" },
                  { icon: Zap, title: "Supplements", desc: "Precision neuromodulation", color: "from-accent/20 to-accent/5" },
                  { icon: FlaskConical, title: "Protocols", desc: "Evidence-based stacks", color: "from-accent/20 to-accent/5" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="group relative p-8 rounded-3xl bg-gradient-to-br from-ivory/5 to-transparent border border-ivory/10 backdrop-blur-sm hover:border-accent/30 transition-all duration-500 hover:scale-105"
                  >
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10 space-y-4">
                      <item.icon className="w-10 h-10 text-accent" />
                      <h3 className="text-2xl font-normal text-ivory">{item.title}</h3>
                      <p className="text-stone text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Nova AI Section */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-slate">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="inline-block">
                    <img src={novaIcon} alt="Nova AI" className="w-16 h-16" />
                  </div>
                  <div className="space-y-6">
                    <h2 className="text-5xl md:text-6xl font-light text-ivory leading-tight">
                      Nova AI
                      <br />
                      <span className="font-normal text-accent">Your cognitive copilot</span>
                    </h2>
                    <p className="text-xl text-stone leading-relaxed">
                      Autonomous performance optimization powered by continuous biometric analysis, 
                      predictive insights, and adaptive protocol generation.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      <p className="text-stone">Real-time HRV, sleep, and recovery tracking</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      <p className="text-stone">Predictive pattern recognition and early intervention</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      <p className="text-stone">Voice-enabled coaching and protocol optimization</p>
                    </div>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-accent text-carbon hover:bg-accent/90 text-base px-8 py-6 rounded-full group"
                  >
                    Experience Nova
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Nova UI Mockup */}
                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden border border-ivory/10 bg-gradient-to-br from-ivory/5 to-transparent backdrop-blur-sm p-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-6 border-b border-ivory/10">
                        <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                          <Brain className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <p className="text-ivory font-medium">Nova</p>
                          <p className="text-stone text-sm">Online</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-ivory/5 rounded-2xl p-4 border border-ivory/10">
                          <p className="text-stone text-sm leading-relaxed">
                            Your HRV dropped 12% overnight. I've adjusted your protocol to prioritise recovery. 
                            Consider postponing high-intensity training today.
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                            <p className="text-accent text-2xl font-light">68</p>
                            <p className="text-stone text-xs">HRV</p>
                          </div>
                          <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                            <p className="text-accent text-2xl font-light">7.8</p>
                            <p className="text-stone text-xs">Sleep</p>
                          </div>
                          <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                            <p className="text-accent text-2xl font-light">85%</p>
                            <p className="text-stone text-xs">Recovery</p>
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
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-slate to-carbon">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,0,0,0.05),transparent_50%)]" />
            
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Device Image */}
                <div className="order-last lg:order-first">
                  <div className="relative rounded-3xl overflow-hidden">
                    <img 
                      src={redlightDevice} 
                      alt="NeuroState Red Light Therapy Device" 
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 to-transparent" />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-6">
                    <h2 className="text-5xl md:text-6xl font-light text-ivory leading-tight">
                      Red light
                      <br />
                      <span className="font-normal text-red-400">therapy devices</span>
                    </h2>
                    <p className="text-xl text-stone leading-relaxed">
                      Clinical-grade photobiomodulation technology. Enhance mitochondrial function, 
                      accelerate recovery, and optimise cellular energy production.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                      <p className="text-stone">660nm & 850nm therapeutic wavelengths</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                      <p className="text-stone">Clinically proven dosing protocols</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                      <p className="text-stone">Full-body and targeted treatment options</p>
                    </div>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-ivory text-carbon hover:bg-pearl text-base px-8 py-6 rounded-full group"
                  >
                    Explore Devices
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Supplements Section */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-carbon to-slate">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,255,0,0.03),transparent_50%)]" />
            
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h2 className="text-5xl md:text-6xl font-light text-ivory leading-tight">
                      Performance
                      <br />
                      <span className="font-normal text-accent">supplements</span>
                    </h2>
                    <p className="text-xl text-stone leading-relaxed">
                      Science-backed compounds engineered for cognitive enhancement. 
                      Each formulation designed by neuroscientists for measurable performance gains.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      <p className="text-stone">Third-party tested for purity and potency</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      <p className="text-stone">Evidence-based dosing protocols</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      <p className="text-stone">Transparent ingredient sourcing</p>
                    </div>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-accent text-carbon hover:bg-accent/90 text-base px-8 py-6 rounded-full group"
                  >
                    Shop Supplements
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Supplement Hero Image */}
                <div className="relative rounded-3xl overflow-hidden">
                  <img 
                    src={heroSupplement} 
                    alt="NeuroState Performance Supplements" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 to-transparent" />
                </div>
              </div>
            </div>
          </section>

          {/* For Businesses */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 space-y-6">
                <p className="text-accent text-xs tracking-[0.2em] uppercase font-medium">Enterprise Solutions</p>
                <h2 className="text-5xl md:text-6xl font-light text-ivory leading-tight">
                  Built for
                  <br />
                  <span className="font-normal">high-performance teams</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  { icon: Building2, stat: "47%", label: "Focus increase", desc: "Measured across enterprise clients" },
                  { icon: Users, stat: "63%", label: "Burnout reduction", desc: "Within 90 days of implementation" },
                  { icon: Award, stat: "89%", label: "Satisfaction", desc: "Employee programme rating" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="relative p-8 rounded-3xl bg-gradient-to-br from-ivory/5 to-transparent border border-ivory/10 backdrop-blur-sm"
                  >
                    <item.icon className="w-8 h-8 text-accent mb-6" />
                    <p className="text-5xl font-light text-ivory mb-2">{item.stat}</p>
                    <p className="text-lg text-ivory mb-2">{item.label}</p>
                    <p className="text-sm text-stone">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-accent text-carbon hover:bg-accent/90 text-base px-8 py-6 rounded-full group"
                >
                  Explore Partner Portal
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </section>

          {/* For Individuals */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-slate to-carbon">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <p className="text-accent text-xs tracking-[0.2em] uppercase font-medium">Direct to Consumer</p>
                    <h2 className="text-5xl md:text-6xl font-light text-ivory leading-tight">
                      Optimise
                      <br />
                      <span className="font-normal">yourself</span>
                    </h2>
                    <p className="text-xl text-stone leading-relaxed">
                      Premium supplements, evidence-based protocols, and personalised 
                      performance stacks designed by neuroscientists.
                    </p>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-ivory text-carbon hover:bg-pearl text-base px-8 py-6 rounded-full group"
                  >
                    Shop Products
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { title: "Supplements", count: "40+", desc: "Precision compounds" },
                    { title: "Protocols", count: "12", desc: "Expert-designed stacks" },
                    { title: "Devices", count: "8", desc: "Clinical-grade tools" },
                    { title: "Community", count: "10k+", desc: "High performers" },
                  ].map((item, i) => (
                    <div 
                      key={i}
                      className="p-6 rounded-3xl bg-gradient-to-br from-ivory/5 to-transparent border border-ivory/10 backdrop-blur-sm"
                    >
                      <p className="text-4xl font-light text-ivory mb-2">{item.count}</p>
                      <p className="text-lg text-ivory mb-1">{item.title}</p>
                      <p className="text-sm text-stone">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Science Section */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.03),transparent_50%)]" />
            
            <div className="relative z-10 max-w-7xl mx-auto text-center">
              <div className="mb-16 space-y-6">
                <p className="text-accent text-xs tracking-[0.2em] uppercase font-medium">Evidence-Based</p>
                <h2 className="text-5xl md:text-6xl font-light text-ivory leading-tight max-w-3xl mx-auto">
                  Rooted in
                  <br />
                  <span className="font-normal">neuroscience</span>
                </h2>
                <p className="text-xl text-stone max-w-2xl mx-auto leading-relaxed">
                  Every product, protocol, and recommendation is backed by peer-reviewed research 
                  in neuromodulation, photobiomodulation, and cognitive enhancement.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { number: "200+", label: "Research papers", desc: "Reviewed and validated" },
                  { number: "15", label: "Neuroscientists", desc: "On advisory board" },
                  { number: "50k+", label: "Data points", desc: "Analysed daily" },
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <p className="text-6xl font-light text-accent">{item.number}</p>
                    <p className="text-xl text-ivory">{item.label}</p>
                    <p className="text-stone">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Community & Challenges */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-b from-slate to-carbon">
            <div className="max-w-7xl mx-auto text-center">
              <div className="mb-16 space-y-6">
                <p className="text-accent text-xs tracking-[0.2em] uppercase font-medium">Join the Movement</p>
                <h2 className="text-5xl md:text-6xl font-light text-ivory leading-tight">
                  Performance
                  <br />
                  <span className="font-normal">community</span>
                </h2>
                <p className="text-xl text-stone max-w-2xl mx-auto leading-relaxed">
                  Connect with high performers, participate in optimisation challenges, 
                  and share your journey to cognitive peak.
                </p>
              </div>
              <Button 
                size="lg"
                className="bg-ivory text-carbon hover:bg-pearl text-base px-8 py-6 rounded-full group"
              >
                Join Community
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </section>

          {/* Final CTA */}
          <section className="relative py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon border-t border-ivory/10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-5xl md:text-6xl font-light text-ivory leading-tight">
                Ready to optimise?
              </h2>
              <p className="text-xl text-stone leading-relaxed">
                Start your journey to cognitive peak performance today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg"
                  className="bg-accent text-carbon hover:bg-accent/90 text-base px-8 py-6 rounded-full group"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-ivory/20 text-ivory hover:bg-ivory/10 text-base px-8 py-6 rounded-full backdrop-blur-sm"
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
