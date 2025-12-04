import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, X, Package, TrendingUp, Briefcase, Trophy, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function EnterpriseOverview() {
  const hero = useScrollAnimation();
  const problem = useScrollAnimation();
  const solution = useScrollAnimation();
  const impact = useScrollAnimation();
  const categories = useScrollAnimation();
  const cta = useScrollAnimation();

  return (
    <>
      <SEO 
        title="Enterprise Performance | NeuroState"
        description="Replace outdated wellness programmes with cognitive performance infrastructure. Sharper minds. Measurable results."
      />
      <Header />
      
      <main className="min-h-screen bg-white">
        {/* Hero - Revolutionary Statement */}
        <section ref={hero.ref} className={`pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">For Organisations</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-carbon leading-[1.02]">
              Corporate wellness
              <br />
              <span className="text-accent">doesn't work.</span>
            </h1>
            <p className="text-xl text-ash max-w-2xl mx-auto">
              Meditation apps and yoga sessions are not solving burnout. 
              Your people need sharper minds, not more calm.
            </p>
            <Button 
              size="sm" 
              className="gap-2 mt-6 min-h-[44px] bg-carbon hover:bg-slate rounded-full px-8"
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See the solution
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* The Problem - Old vs New */}
        <section ref={problem.ref} className={`py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon text-ivory transition-all duration-1000 ${problem.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">The Problem</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1]">
                  Old wellness is dead.
                </h2>
                <p className="text-lg text-mist leading-relaxed">
                  Companies keep spending on wellness. Employees keep struggling. 
                  The problem is not stress management. The problem is cognitive performance.
                </p>
                <p className="text-xl text-ivory font-semibold">
                  Your people do not need more calm.
                  <br />
                  They need sharper minds.
                </p>
              </div>
              
              <div className="space-y-3">
                {[
                  "Meditation apps",
                  "Breathwork workshops", 
                  "Wellbeing platforms",
                  "Step challenges",
                  "Mental health webinars"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate/40 border-l-2 border-stone/40">
                    <X className="w-5 h-5 text-stone/70 flex-shrink-0" />
                    <span className="text-stone line-through">{item}</span>
                    <span className="text-xs text-stone/60 ml-auto">No measurable impact</span>
                  </div>
                ))}
                <div className="flex items-center gap-4 p-4 bg-accent/15 border-l-2 border-accent mt-6">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-ivory font-medium">NeuroState cognitive system</span>
                  <span className="text-xs text-accent ml-auto">Measurable results</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Deliver - Clean Three Step */}
        <section ref={solution.ref} className={`py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white transition-all duration-1000 ${solution.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">The Solution</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.1]">
                Cognitive performance
                <br />
                delivered monthly.
              </h2>
              <p className="text-lg text-ash max-w-2xl mx-auto">
                A complete system for enhancing focus, energy, and resilience across your entire workforce.
              </p>
            </div>
            
            {/* Three Step Flow */}
            <div className="grid md:grid-cols-3 gap-px bg-mist">
              {[
                {
                  step: "01",
                  title: "Nova AI coaching",
                  description: "Personalised guidance for every team member. Learns patterns. Adjusts protocols."
                },
                {
                  step: "02",
                  title: "Monthly supplements",
                  description: "Shipped to every employee. Research backed doses. Third party tested."
                },
                {
                  step: "03",
                  title: "Real time analytics",
                  description: "Track cognitive markers, engagement, and progress across your organisation."
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white p-10 sm:p-12"
                >
                  <p className="text-accent text-xs font-semibold mb-4">{item.step}</p>
                  <h3 className="text-xl font-bold text-carbon mb-3">{item.title}</h3>
                  <p className="text-ash text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Additional Features */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                "Neuromodulation devices",
                "Wearable integrations",
                "Performance programmes",
                "Performance rooms"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-pearl">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-carbon text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section ref={impact.ref} className={`py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-pearl transition-all duration-1000 ${impact.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Measurable Impact</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.1]">
                Results, not promises.
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-px bg-mist">
              {[
                { stat: "47%", label: "Focus increase", desc: "Cognitive testing" },
                { stat: "63%", label: "Burnout reduction", desc: "Within 90 days" },
                { stat: "31%", label: "Productivity gain", desc: "Output metrics" },
                { stat: "89%", label: "Satisfaction", desc: "Programme rating" },
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 sm:p-10 text-center">
                  <p className="text-4xl sm:text-5xl font-bold text-accent mb-2">{item.stat}</p>
                  <p className="text-carbon font-semibold mb-1">{item.label}</p>
                  <p className="text-xs text-stone">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Pathways */}
        <section id="categories" ref={categories.ref} className={`py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white transition-all duration-1000 ${categories.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium">Choose Your Path</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.1]">
                Tailored for your sector.
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Corporate Wellness */}
              <Link to="/enterprise/corporate/overview" className="group">
                <div className="h-full p-8 sm:p-10 bg-pearl hover:bg-carbon hover:text-ivory transition-all duration-300">
                  <Briefcase className="w-8 h-8 mb-6 text-accent group-hover:text-accent" />
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-ivory">Corporate</h3>
                  <p className="text-ash group-hover:text-mist mb-6 text-sm leading-relaxed">
                    Reduce burnout and boost productivity across your entire workforce.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-medium text-sm">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Sports */}
              <Link to="/enterprise/sports/overview" className="group">
                <div className="h-full p-8 sm:p-10 bg-pearl hover:bg-carbon hover:text-ivory transition-all duration-300">
                  <Trophy className="w-8 h-8 mb-6 text-accent group-hover:text-accent" />
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-ivory">Sports</h3>
                  <p className="text-ash group-hover:text-mist mb-6 text-sm leading-relaxed">
                    Maximise athlete performance and reduce injury risk with recovery protocols.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-medium text-sm">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* Health Clubs */}
              <Link to="/enterprise/health-clubs/overview" className="group">
                <div className="h-full p-8 sm:p-10 bg-pearl hover:bg-carbon hover:text-ivory transition-all duration-300">
                  <Dumbbell className="w-8 h-8 mb-6 text-accent group-hover:text-accent" />
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-ivory">Health Clubs</h3>
                  <p className="text-ash group-hover:text-mist mb-6 text-sm leading-relaxed">
                    Differentiate your facility with premium cognitive wellness services.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-medium text-sm">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section ref={cta.ref} className={`py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon text-ivory transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1]">
              Ready to upgrade
              <br />
              your workforce?
            </h2>
            <p className="text-lg text-mist max-w-xl mx-auto">
              High performing minds build high performing companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/contact">
                <Button 
                  size="sm"
                  className="bg-accent text-white hover:bg-accent-light rounded-full min-h-[44px] px-8"
                >
                  Book a Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="mailto:partnerships@neurostate.co.uk">
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-ivory/30 text-ivory hover:bg-ivory/10 rounded-full min-h-[44px] px-8"
                >
                  partnerships@neurostate.co.uk
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
