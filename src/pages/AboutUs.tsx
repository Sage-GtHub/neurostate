import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Microscope, Shield, Brain, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SEO } from "@/components/SEO";

const AboutUs = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: standardsRef, isVisible: standardsVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const values = [
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

  const standards = [
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
      <div className="min-h-screen bg-background mobile-nav-padding">
        {/* Hero */}
        <section ref={heroRef} className={`pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-foreground transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium">About Neurostate</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-background leading-[1.1] tracking-tight">
              The AI Operating System for Human Performance
            </h1>
            <p className="text-lg text-background/60 max-w-2xl mx-auto">
              We replace outdated wellness with the world's first integrated cognitive performance platform.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section ref={missionRef} className={`py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="space-y-6">
                <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium">The Mission</p>
                <h2 className="text-3xl md:text-4xl font-medium text-foreground leading-[1.1] tracking-tight">
                  Cognitive performance should not be a mystery
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  For too long, optimal brain function has been left to chance. Meditation apps. Wellness programmes. Vague advice about sleep and stress.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We built Neurostate to change that. One integrated system combining AI coaching, clinical grade hardware, and precision nutrition.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  { stat: "2025", label: "Founded in London" },
                  { stat: "47%", label: "Average focus increase" },
                  { stat: "63%", label: "Burnout reduction" },
                  { stat: "89%", label: "Customer satisfaction" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-5 bg-muted/30 border-l-2 border-primary/30">
                    <span className="text-2xl md:text-3xl font-medium text-primary">{item.stat}</span>
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className={`py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 xl:px-32 bg-foreground transition-all duration-1000 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium">Our Values</p>
              <h2 className="text-3xl md:text-4xl font-medium text-background leading-[1.1] tracking-tight">
                No fluff. No clichés.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-background/10">
              {values.map((value, i) => (
                <div key={i} className="p-10 bg-foreground">
                  <value.icon className="w-5 h-5 text-primary mb-6" />
                  <h3 className="text-lg font-medium text-background mb-3">{value.title}</h3>
                  <p className="text-sm text-background/60">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standards */}
        <section ref={standardsRef} className={`py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${standardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              <div className="space-y-6">
                <p className="text-primary/60 text-xs tracking-[0.3em] uppercase font-medium">Quality Standards</p>
                <h2 className="text-3xl md:text-4xl font-medium text-foreground leading-[1.1] tracking-tight">
                  Military grade precision
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every product we sell meets the highest standards in the industry. No exceptions.
                </p>
              </div>
              
              <div className="space-y-3">
                {standards.map((standard, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-muted/30 border-l-2 border-primary/30">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 xl:px-32 bg-foreground">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-medium text-background leading-[1.1] tracking-tight">
              Ready to upgrade?
            </h2>
            <p className="text-lg text-background/60 max-w-xl mx-auto">
              Experience the Neurostate system. AI coaching. Neuromodulation. Precision nutrition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/shop">
                <Button size="lg">
                  Shop now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-background/30 text-background hover:bg-background/10">
                  Contact us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
