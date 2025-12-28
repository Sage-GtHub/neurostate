import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Microscope, Shield, Brain, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

const AboutUs = () => {
  const hero = useScrollAnimation({ threshold: 0.2 });
  const mission = useScrollAnimation({ threshold: 0.2 });
  const values = useScrollAnimation({ threshold: 0.2 });
  const standards = useScrollAnimation({ threshold: 0.2 });
  
  const valuesList = [
    {
      icon: Microscope,
      title: "Research Driven",
      description: "Every product backed by clinical evidence. No marketing claims. Just data.",
    },
    {
      icon: Shield,
      title: "Uncompromised Quality",
      description: "Third party tested. GMP certified. No shortcuts.",
    },
    {
      icon: Brain,
      title: "Cognitive First",
      description: "Everything we build optimises brain function. That is the mission.",
    },
    {
      icon: Zap,
      title: "Measurable Outcomes",
      description: "If you cannot measure it, we do not sell it. Performance you can track.",
    },
  ];

  const standardsList = [
    "Third party tested for purity and potency",
    "GMP certified manufacturing facilities",
    "Sustainable and ethical sourcing",
    "Full ingredient transparency",
    "NSF Certified for Sport",
    "Informed Sport certified",
  ];

  return (
    <>
      <SEO 
        title="About Neurostate – The Cognitive Performance Company | UK"
        description="We built the world's first cognitive performance system combining AI, neuromodulation, and precision supplements. Research-driven products for focus, energy, and mental resilience."
      />
      <Header />
      <div className="min-h-screen bg-background mobile-nav-padding relative overflow-hidden">
        {/* Organic background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[700px] h-[700px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
          <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        {/* Hero */}
        <section 
          ref={hero.ref} 
          className={`relative pt-32 md:pt-44 pb-24 md:pb-32 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">About Neurostate</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] tracking-tight">
              The AI Operating System<br />
              <span className="text-foreground/50">for Human Performance</span>
            </h1>
            <p className="text-sm text-foreground/50 max-w-lg mx-auto">
              We replace outdated wellness with the world's first integrated cognitive performance platform.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section 
          ref={mission.ref} 
          className={`py-24 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${mission.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">The Mission</p>
                <h2 className="text-3xl md:text-4xl font-light text-foreground leading-[1.15]">
                  Cognitive performance should not be a mystery
                </h2>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  For too long, optimal brain function has been left to chance. Meditation apps. Wellness programmes. Vague advice about sleep and stress.
                </p>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  We built Neurostate to change that. One integrated system combining AI coaching, clinical grade hardware, and precision nutrition.
                </p>
              </div>
              
              <div className="space-y-3">
                {[
                  { stat: "2025", label: "Founded in London" },
                  { stat: "47%", label: "Average focus increase" },
                  { stat: "63%", label: "Burnout reduction" },
                  { stat: "89%", label: "Customer satisfaction" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-5 rounded-2xl bg-foreground/[0.02] group hover:bg-foreground/[0.04] transition-colors">
                    <span className="text-2xl md:text-3xl font-light text-accent">{item.stat}</span>
                    <span className="text-xs text-foreground/50">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section 
          ref={values.ref} 
          className={`py-24 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${values.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Our Values</p>
              <h2 className="text-3xl md:text-4xl font-light text-foreground">
                No fluff. No clichés.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {valuesList.map((value, i) => (
                <div 
                  key={i} 
                  className="group p-8 rounded-3xl bg-foreground/[0.02] hover:bg-foreground transition-all duration-500"
                >
                  <value.icon className="w-5 h-5 text-accent group-hover:text-accent mb-5 transition-colors" />
                  <h3 className="text-sm font-medium text-foreground group-hover:text-background mb-2 transition-colors">{value.title}</h3>
                  <p className="text-xs text-foreground/50 group-hover:text-background/60 transition-colors">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standards */}
        <section 
          ref={standards.ref} 
          className={`py-24 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${standards.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Quality Standards</p>
                <h2 className="text-3xl md:text-4xl font-light text-foreground leading-[1.15]">
                  Military grade precision
                </h2>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  Every product we sell meets the highest standards in the industry. No exceptions.
                </p>
              </div>
              
              <div className="space-y-2">
                {standardsList.map((standard, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/[0.02] group hover:bg-foreground/[0.04] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-xs text-foreground/70">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glass-subtle rounded-3xl p-12 md:p-16 space-y-8">
              <h2 className="text-2xl md:text-3xl font-light text-foreground">
                Ready to upgrade?
              </h2>
              <p className="text-sm text-foreground/50 max-w-md mx-auto">
                Experience the Neurostate system. AI coaching. Neuromodulation. Precision nutrition.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button 
                  size="sm" 
                  className="rounded-full h-10 px-6 text-xs bg-foreground text-background hover:bg-foreground/90"
                  onClick={() => {
                    toast.info("Coming Soon", {
                      description: "Our shop is launching soon. Stay tuned!",
                    });
                  }}
                >
                  Shop now
                  <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </Button>
                <Link to="/contact">
                  <Button variant="outline" size="sm" className="rounded-full h-10 px-6 text-xs border-foreground/20 text-foreground/70 hover:bg-foreground/5">
                    Contact us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
