import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Shield, Microscope, Zap, Brain, CheckCircle2 } from "lucide-react";
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
        title="About NeuroState – The Cognitive Performance Company | UK"
        description="We built the world's first cognitive performance system combining AI, neuromodulation, and precision supplements. Research-driven products for focus, energy, and mental resilience."
      />
      <Header />
      <div className="min-h-screen bg-ivory mobile-nav-padding">
        {/* Hero */}
        <section ref={heroRef} className={`pt-32 sm:pt-40 pb-24 sm:pb-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <p className="text-stone text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">About NeuroState</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory leading-[1.02]">
              The AI Operating System for Human Performance
            </h1>
            <p className="text-base sm:text-lg text-stone max-w-2xl mx-auto">
              We replace outdated wellness with the world's first integrated cognitive performance platform.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section ref={missionRef} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory transition-all duration-1000 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">The Mission</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.05]">
                  Cognitive performance should not be a mystery
                </h2>
                <p className="text-base sm:text-lg text-ash leading-relaxed">
                  For too long, optimal brain function has been left to chance. Meditation apps. Wellness programmes. Vague advice about sleep and stress.
                </p>
                <p className="text-base sm:text-lg text-ash leading-relaxed">
                  We built NeuroState to change that. One integrated system combining AI coaching, clinical grade hardware, and precision nutrition. Measurable outcomes. Real results.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  { stat: "2025", label: "Founded in London" },
                  { stat: "47%", label: "Average focus increase" },
                  { stat: "63%", label: "Burnout reduction" },
                  { stat: "89%", label: "Customer satisfaction" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-5 bg-carbon/5 border-l border-carbon/10">
                    <span className="text-2xl sm:text-3xl font-bold text-carbon">{item.stat}</span>
                    <span className="text-sm text-ash">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon transition-all duration-1000 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-stone text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Our Values</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ivory leading-[1.05]">
                No fluff. No clichés.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-px bg-slate/30">
              {values.map((value, i) => (
                <div key={i} className="p-8 sm:p-10 bg-carbon group">
                  <value.icon className="w-5 h-5 text-ivory mb-6" />
                  <h3 className="text-lg font-semibold text-ivory mb-3">{value.title}</h3>
                  <p className="text-sm text-stone">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standards */}
        <section ref={standardsRef} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory transition-all duration-1000 ${standardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-6">
                <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Quality Standards</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.05]">
                  Military grade precision
                </h2>
                <p className="text-base sm:text-lg text-ash leading-relaxed">
                  Every product we sell meets the highest standards in the industry. No exceptions. No compromises.
                </p>
              </div>
              
              <div className="space-y-3">
                {standards.map((standard, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-carbon/5 border-l border-carbon/10">
                    <CheckCircle2 className="w-4 h-4 text-carbon flex-shrink-0" />
                    <span className="text-sm text-carbon">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ivory leading-[1.05]">
              Ready to upgrade?
            </h2>
            <p className="text-base sm:text-lg text-stone max-w-xl mx-auto">
              Experience the NeuroState system. AI coaching. Neuromodulation. Precision nutrition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/shop">
                <Button size="lg" className="bg-ivory text-carbon hover:bg-mist min-h-[52px] px-10">
                  Shop now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-ivory/30 text-ivory hover:bg-ivory/5 min-h-[52px] px-10">
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
