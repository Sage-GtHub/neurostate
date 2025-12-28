import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { SEO } from "@/components/SEO";
import { OrganizationStructuredData, SoftwareApplicationStructuredData, WebsiteStructuredData, LocalBusinessStructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { ClientLogos } from "@/components/ClientLogos";
import { ProductSystem } from "@/components/ProductSystem";
import { CaseStudies } from "@/components/CaseStudies";

import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import redlightDevice from "@/assets/redlight.webp";
import heroSupplement from "@/assets/hero-supplement.png";

const Index = () => {
  const stats = useScrollAnimation();
  const difference = useScrollAnimation();
  const nova = useScrollAnimation();
  const hardware = useScrollAnimation();
  const supplements = useScrollAnimation();
  const cta = useScrollAnimation();

  return (
    <>
      <SEO 
        title="Know When You'll Be At Your Best | Neurostate"
        description="Neurostate combines AI, supplements, and light therapy to predict and optimise your mental performance. Used by elite athletes, executives, and high-performers worldwide."
      />
      <OrganizationStructuredData />
      <SoftwareApplicationStructuredData />
      <WebsiteStructuredData />
      <LocalBusinessStructuredData />
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Header />
        <main>
          <Hero />

          {/* Client Logos */}
          <ClientLogos />

          {/* Stats - Clean numbers */}
          <section 
            ref={stats.ref} 
            className={`py-20 md:py-24 px-6 md:px-8 transition-all duration-700 ${stats.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
                {[
                  { value: "72hr", label: "Performance prediction window" },
                  { value: "500+", label: "Enterprise teams trust us" },
                  { value: "34%", label: "Average performance improvement" },
                  { value: "98%", label: "Customer satisfaction rate" }
                ].map((stat, i) => (
                  <div 
                    key={i} 
                    className="text-center lg:text-left group cursor-default"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <p className="text-4xl md:text-5xl font-light text-foreground group-hover:text-primary transition-colors duration-300">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-3 max-w-[160px] mx-auto lg:mx-0">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Named Product System */}
          <ProductSystem />

          {/* The Difference - Clean comparison */}
          <section 
            ref={difference.ref} 
            className={`py-24 md:py-32 px-6 md:px-8 transition-all duration-700 ${difference.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 space-y-4 max-w-2xl mx-auto">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Why Neurostate</span>
                <h2 className="text-large-display text-foreground">
                  We predict problems
                  <br />
                  <span className="text-muted-foreground">before they happen</span>
                </h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Most wellness apps react after you're already burnt out. We tell you 72 hours ahead when to push hard and when to recover.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                {/* What others do */}
                <div className="space-y-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-5 font-medium">Traditional wellness apps</p>
                  {[
                    "React after burnout happens",
                    "Generic advice without data",
                    "No performance forecasting",
                    "Interventions when it's too late"
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 py-3 border-b border-border/50 last:border-0"
                    >
                      <div className="w-4 h-4 rounded-full border border-destructive/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-[8px] text-destructive/60">✕</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                {/* What we do */}
                <div className="space-y-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-5 font-medium">Neurostate</p>
                  {[
                    { title: "Predict your best days", desc: "72-hour forecasting" },
                    { title: "Catch problems early", desc: "Before they impact you" },
                    { title: "Know your capacity", desc: "Real-time readiness scores" },
                    { title: "Optimise automatically", desc: "AI-driven recommendations" }
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0 group cursor-default"
                    >
                      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors duration-300">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs text-foreground font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground ml-2">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Nova AI Section */}
          <section 
            ref={nova.ref} 
            className={`py-24 md:py-32 px-6 md:px-8 bg-muted/30 transition-all duration-700 ${nova.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="space-y-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Meet Nova</span>
                  <h2 className="text-large-display text-foreground">
                    Your personal performance analyst
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                    Nova learns your patterns from wearables, sleep data, and daily check-ins. It tells you when you'll be sharp, when you'll crash, and what to do about it.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 py-2">
                    {["Daily briefings", "Wearable sync", "Personalised insights", "Trend analysis"].map((item, i) => (
                      <span key={i} className="px-3 py-1.5 text-[10px] font-medium text-muted-foreground bg-background rounded-full border border-border/50">
                        {item}
                      </span>
                    ))}
                  </div>
                  
                  <Link to="/nova/overview">
                    <Button size="sm" className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Learn about Nova
                      <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                {/* Nova Preview */}
                <div className="relative">
                  <div className="bg-background border border-border/50 rounded-3xl p-6 space-y-5">
                    <div className="flex items-center justify-between pb-4 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                          <span className="text-primary font-medium text-sm">N</span>
                        </div>
                        <div>
                          <p className="text-foreground font-medium text-sm">Nova</p>
                          <p className="text-muted-foreground text-[10px]">7-Day Forecast</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <span className="text-[10px] text-muted-foreground">Live</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                        <div 
                          key={i} 
                          className={`p-2.5 text-center rounded-xl transition-all duration-300 ${i === 0 ? 'bg-primary/10 ring-1 ring-primary/20' : 'bg-muted/50 hover:bg-muted'}`}
                        >
                          <p className="text-[9px] text-muted-foreground uppercase mb-1.5">{day}</p>
                          <div className={`w-1.5 h-1.5 mx-auto rounded-full mb-1.5 ${i <= 1 || i >= 5 ? 'bg-primary' : i === 3 ? 'bg-destructive/60' : 'bg-yellow-500/60'}`} />
                          <p className="text-foreground text-[11px] font-medium">{[85, 82, 68, 55, 72, 88, 90][i]}%</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "68", label: "HRV" },
                        { value: "7.8h", label: "Sleep" },
                        { value: "85%", label: "Recovery" }
                      ].map((metric, i) => (
                        <div key={i} className="bg-muted/50 p-3 text-center rounded-xl">
                          <p className="text-foreground text-lg font-light">{metric.value}</p>
                          <p className="text-muted-foreground text-[9px] uppercase tracking-wider">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Case Studies */}
          <CaseStudies />

          {/* Hardware Section */}
          <section 
            ref={hardware.ref} 
            className={`py-24 md:py-32 px-6 md:px-8 bg-muted/30 transition-all duration-700 ${hardware.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="order-last lg:order-first">
                  <div className="rounded-3xl overflow-hidden bg-muted/50">
                    <img 
                      src={redlightDevice} 
                      alt="Pulse Red Light Therapy Device" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Pulse Devices</span>
                  <h2 className="text-large-display text-foreground">
                    Light therapy that actually works
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                    Clinical-grade red and near-infrared light for your brain and body. Use it morning to prime yourself for focus, or evening to wind down and recover.
                  </p>
                  
                  <div className="space-y-2 py-2">
                    {["660nm & 850nm wavelengths", "Clinically validated", "Portable design"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        <span className="text-xs text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/category/devices">
                    <Button size="sm" className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      View devices
                      <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Supplements Section */}
          <section 
            ref={supplements.ref} 
            className={`py-24 md:py-32 px-6 md:px-8 transition-all duration-700 ${supplements.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="space-y-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Axon Supplements</span>
                  <h2 className="text-large-display text-foreground">
                    Ingredients that actually do something
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                    Research-backed formulations at clinical doses. No proprietary blends hiding underdosed ingredients. Just effective compounds that support how you think and feel.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 py-2">
                    {["Focus", "Recovery", "Sleep", "Energy"].map((item, i) => (
                      <span key={i} className="px-3 py-1.5 text-[10px] font-medium text-muted-foreground bg-muted rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                  
                  <Link to="/category/supplements">
                    <Button size="sm" className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Shop supplements
                      <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                <div className="order-first lg:order-last">
                  <div className="rounded-3xl overflow-hidden bg-muted/50">
                    <img 
                      src={heroSupplement} 
                      alt="Axon Supplements" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section 
            ref={cta.ref} 
            className={`py-24 md:py-32 px-6 md:px-8 bg-muted/30 transition-all duration-700 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Get Started</span>
              <h2 className="text-large-display text-foreground">
                Ready to perform at your best?
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Join thousands of high-performers who use Neurostate to stay sharp, avoid burnout, and do their best work.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <Link to="/contact">
                  <Button size="sm" className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                    Book a demo
                    <ArrowUpRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button size="sm" variant="outline" className="h-11 px-6 text-xs font-medium rounded-full border-border/50 hover:bg-foreground hover:text-background hover:border-foreground transition-all">
                    Browse products
                  </Button>
                </Link>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
