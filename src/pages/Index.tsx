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
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import novaIcon from "@/assets/neurostate-icon.svg";
import redlightDevice from "@/assets/redlight.webp";
import heroSupplement from "@/assets/hero-supplement.png";

const Index = () => {
  const isMobile = useIsMobile();
  const [chatOpen, setChatOpen] = useState(false);
  
  const system = useScrollAnimation();
  const nova = useScrollAnimation();
  const device = useScrollAnimation();
  const supplements = useScrollAnimation();
  const business = useScrollAnimation();
  const individuals = useScrollAnimation();
  const science = useScrollAnimation();
  const community = useScrollAnimation();
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
          <section ref={system.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl overflow-hidden transition-all duration-1000 ${system.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="text-center mb-16 sm:mb-20 md:mb-24 space-y-6 sm:space-y-8">
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">The Complete System</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-carbon leading-[1.1] px-4">
                  Everything you need for
                  <br />
                  <span className="font-normal">peak performance</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                {[
                  { icon: Brain, title: "Nova AI", desc: "Your autonomous cognitive coach" },
                  { icon: Lightbulb, title: "Red Light", desc: "Photobiomodulation therapy" },
                  { icon: Zap, title: "Supplements", desc: "Precision neuromodulation" },
                  { icon: FlaskConical, title: "Protocols", desc: "Evidence-based stacks" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="group relative p-8 sm:p-10 md:p-12 hover:bg-white/60 transition-all duration-500"
                  >
                    <div className="space-y-4 sm:space-y-6">
                      <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                      <h3 className="text-lg sm:text-xl font-light text-carbon">{item.title}</h3>
                      <p className="text-ash text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Nova AI Section */}
          <section ref={nova.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white transition-all duration-1000 ${nova.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 items-center">
                <div className="space-y-8 sm:space-y-10">
                  <div className="inline-block">
                    <img src={novaIcon} alt="Nova AI" className="w-12 h-12 sm:w-16 sm:h-16" />
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-carbon leading-[1.1]">
                      Nova AI
                      <br />
                      <span className="font-normal text-accent">Your AI performance coach</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-ash leading-relaxed max-w-xl">
                      Tracks your biometrics, spots patterns, and tells you exactly what your body needs right now—whether it's more sleep, a different supplement stack, or a rest day.
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-accent mt-3" />
                      <p className="text-ash leading-relaxed">Live tracking of HRV, sleep quality, and recovery</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-accent mt-3" />
                      <p className="text-ash leading-relaxed">Knows when you're about to burn out before you do</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-accent mt-3" />
                      <p className="text-ash leading-relaxed">Talks to you like a real coach—with voice</p>
                    </div>
                  </div>
                  <Link to="/nova">
                    <Button 
                      size="sm"
                      className="bg-carbon text-white hover:bg-slate rounded-full group transition-all duration-300 min-h-[44px] touch-manipulation"
                    >
                      Try Nova
                      <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Nova UI Mockup */}
                <div className="relative">
                  <div className="relative overflow-hidden bg-pearl/50 border border-mist p-10">
                    <div className="space-y-8">
                      <div className="flex items-center gap-4 pb-8 border-b border-mist">
                        <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                          <Brain className="w-7 h-7 text-accent" />
                        </div>
                        <div>
                          <p className="text-carbon font-medium text-lg">Nova</p>
                          <p className="text-stone text-sm">Online</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-white border border-mist p-6">
                          <p className="text-ash leading-relaxed">
                            Your HRV dropped 12% overnight. I've adjusted your protocol to prioritise recovery. 
                            Consider postponing high-intensity training today.
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-accent/5 p-5 border border-accent/20">
                            <p className="text-accent text-2xl font-light mb-1">68</p>
                            <p className="text-stone text-xs">HRV</p>
                          </div>
                          <div className="bg-accent/5 p-5 border border-accent/20">
                            <p className="text-accent text-2xl font-light mb-1">7.8</p>
                            <p className="text-stone text-xs">Sleep</p>
                          </div>
                          <div className="bg-accent/5 p-5 border border-accent/20">
                            <p className="text-accent text-2xl font-light mb-1">85%</p>
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
          <section ref={device.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl transition-all duration-1000 ${device.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 items-center">
                {/* Device Image */}
                <div className="order-last lg:order-first">
                  <div className="relative overflow-hidden">
                    <img 
                      src={redlightDevice} 
                      alt="NeuroState Red Light Therapy Device" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-8 sm:space-y-10">
                  <div className="space-y-4 sm:space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-carbon leading-[1.1]">
                      Red light
                      <br />
                      <span className="font-normal text-red-500">therapy that works</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-ash leading-relaxed max-w-xl">
                      Proper red light therapy using the right wavelengths. Speeds up recovery, boosts your cells' energy, and helps your brain work better.
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-red-500 mt-3" />
                      <p className="text-ash leading-relaxed">660nm and 850nm wavelengths (the ones backed by research)</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-red-500 mt-3" />
                      <p className="text-ash leading-relaxed">Clinically proven protocols—not guesswork</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-red-500 mt-3" />
                      <p className="text-ash leading-relaxed">Full-body panels or targeted devices</p>
                    </div>
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
          <section ref={supplements.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white transition-all duration-1000 ${supplements.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 items-center">
                <div className="space-y-8 sm:space-y-10">
                  <div className="space-y-4 sm:space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-carbon leading-[1.1]">
                      Supplements
                      <br />
                      <span className="font-normal text-accent">that actually work</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-ash leading-relaxed max-w-xl">
                      No marketing hype. No dodgy ingredients. Just properly dosed supplements backed by real research—designed to help you sleep better, focus longer, and recover faster.
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-accent mt-3" />
                      <p className="text-ash leading-relaxed">Third-party tested—we show you the results</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-accent mt-3" />
                      <p className="text-ash leading-relaxed">Doses based on actual studies, not guesswork</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-accent mt-3" />
                      <p className="text-ash leading-relaxed">Transparent about where everything comes from</p>
                    </div>
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

                {/* Supplement Hero Image */}
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

          {/* For Businesses */}
          <section ref={business.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl transition-all duration-1000 ${business.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 sm:mb-20 space-y-6 sm:space-y-8 px-4">
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">For Teams</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-carbon leading-[1.1]">
                  Keep your team
                  <br />
                  <span className="font-normal">sharp and healthy</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mb-12 sm:mb-16">
                {[
                  { icon: Building2, stat: "47%", label: "Focus increase", desc: "Measured across enterprise clients" },
                  { icon: Users, stat: "63%", label: "Burnout reduction", desc: "Within 90 days of implementation" },
                  { icon: Award, stat: "89%", label: "Satisfaction", desc: "Employee programme rating" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="relative p-12 hover:bg-white/80 transition-all duration-500"
                  >
                    <item.icon className="w-8 h-8 text-accent opacity-70 mb-8" />
                    <p className="text-6xl font-light text-carbon mb-3">{item.stat}</p>
                    <p className="text-lg text-carbon mb-2">{item.label}</p>
                    <p className="text-sm text-ash">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link to="/enterprise/corporate/overview">
                  <Button 
                    size="sm"
                    className="bg-carbon text-white hover:bg-slate rounded-full group transition-all duration-300 min-h-[44px] touch-manipulation"
                  >
                    See Partner Portal
                    <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* For Individuals */}
          <section ref={individuals.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white transition-all duration-1000 ${individuals.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20">
                <div className="space-y-8 sm:space-y-10">
                  <div className="space-y-4 sm:space-y-6">
                    <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">For You</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-carbon leading-[1.1]">
                      Upgrade
                      <br />
                      <span className="font-normal">your performance</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-ash leading-relaxed max-w-xl">
                      Top-quality supplements and recovery devices. Everything you need to feel sharper, sleep better, and recover faster.
                    </p>
                  </div>
                  <Link to="/categories/supplements">
                    <Button 
                      size="sm"
                      className="bg-carbon text-white hover:bg-slate rounded-full group transition-all duration-300 min-h-[44px] touch-manipulation"
                    >
                      Shop Now
                      <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
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
                      className="p-10 hover:bg-pearl/60 transition-all duration-500"
                    >
                      <p className="text-5xl font-light text-carbon mb-3">{item.count}</p>
                      <p className="text-lg text-carbon mb-1">{item.title}</p>
                      <p className="text-sm text-ash">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Science Section */}
          <section ref={science.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl transition-all duration-1000 ${science.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            <div className="relative z-10 max-w-7xl mx-auto text-center">
              <div className="mb-16 sm:mb-20 space-y-6 sm:space-y-8 px-4">
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Science-Backed</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-carbon leading-[1.1] max-w-4xl mx-auto">
                  Backed by
                  <br />
                  <span className="font-normal">real research</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-ash max-w-3xl mx-auto leading-relaxed">
                  Everything we make is based on actual peer-reviewed studies—not wellness trends or marketing hype
                  in neuromodulation, photobiomodulation, and cognitive enhancement.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-16">
                {[
                  { number: "200+", label: "Research papers", desc: "Reviewed and validated" },
                  { number: "15", label: "Neuroscientists", desc: "On advisory board" },
                  { number: "50k+", label: "Data points", desc: "Analysed daily" },
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <p className="text-7xl font-light text-accent">{item.number}</p>
                    <p className="text-xl text-carbon">{item.label}</p>
                    <p className="text-ash">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Community & Challenges */}
          <section ref={community.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white transition-all duration-1000 ${community.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-7xl mx-auto text-center">
              <div className="mb-12 sm:mb-16 space-y-6 sm:space-y-8 px-4">
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Community</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-carbon leading-[1.1]">
                  Join other
                  <br />
                  <span className="font-normal">high performers</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-ash max-w-3xl mx-auto leading-relaxed">
                  Connect with people optimising their performance, share what's working, and learn from others doing the same thing.
                </p>
              </div>
              <a href="https://discord.gg/neurostate" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="sm"
                  className="bg-carbon text-white hover:bg-slate rounded-full group transition-all duration-300 min-h-[44px] touch-manipulation"
                >
                  Join Community
                  <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </section>

          {/* Final CTA */}
          <section ref={cta.ref} className={`relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl border-t border-mist transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-carbon leading-[1.1] px-4">
                Ready to level up?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-ash leading-relaxed px-4">
                Start feeling sharper, sleeping better, and performing at your best.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6 px-4">
                <Link to="/categories/supplements" className="w-full sm:w-auto">
                  <Button 
                    size="sm"
                    className="bg-carbon text-white hover:bg-slate rounded-full group transition-all duration-300 min-h-[44px] touch-manipulation w-full sm:w-auto"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/nova" className="w-full sm:w-auto">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-carbon/20 text-carbon hover:bg-carbon/5 rounded-full transition-all duration-300 min-h-[44px] touch-manipulation w-full sm:w-auto"
                  >
                    Try Nova AI
                  </Button>
                </Link>
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
