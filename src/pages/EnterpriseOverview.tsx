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
  const delivery = useScrollAnimation();
  const impact = useScrollAnimation();
  const subscription = useScrollAnimation();
  const metrics = useScrollAnimation();
  const categories = useScrollAnimation();
  const cta = useScrollAnimation();

  return (
    <>
      <SEO 
        title="Enterprise Overview | NeuroState"
        description="The new standard for corporate performance. A cognitive performance system that strengthens your workforce from the inside out."
      />
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section ref={hero.ref} className={`relative pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-6 sm:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-carbon leading-[0.95] tracking-tight">
                The world's first<br />
                Cognitive Performance OS<br />
                for Teams
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-stone max-w-3xl mx-auto leading-relaxed">
                Not another wellbeing perk — a system that makes your people sharper, faster, focused
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section ref={problem.ref} className={`py-20 sm:py-32 px-4 sm:px-6 bg-carbon transition-all duration-1000 ${problem.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-ivory leading-tight tracking-tight">
                Corporate wellness is broken
              </h2>
              <div className="space-y-6 text-base sm:text-lg md:text-xl text-mist leading-relaxed">
                <p>
                  Companies spend billions on meditation apps, yoga classes and "mindfulness benefits" that nobody uses
                </p>
                <p>
                  Employees are still tired. Burnt out. Distracted
                </p>
                <p className="text-ivory font-semibold text-xl sm:text-2xl">
                  Because calm is not performance
                </p>
                <p>
                  What teams need is a stronger brain — not another relaxation tool
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section ref={delivery.ref} className={`py-20 sm:py-32 px-4 sm:px-6 transition-all duration-1000 ${delivery.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16 sm:mb-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-carbon mb-6 sm:mb-8 leading-tight tracking-tight">
                NeuroState is the first system<br />built for cognitive output
              </h2>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
                {[
                  "Red light neuromodulation",
                  "Clinical-grade supplement protocols",
                  "AI coaching",
                  "Behavioural optimisation"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="px-6 py-3 bg-pearl border border-mist text-carbon text-sm sm:text-base font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-base sm:text-lg text-stone mt-8 max-w-2xl mx-auto">
                All delivered in one integrated ecosystem
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: "Monthly supplement delivery",
                  description: "Clinical-grade protocols shipped directly to employees"
                },
                {
                  title: "Red-light neuromodulation",
                  description: "Devices integrated with Nova AI for cognitive enhancement"
                },
                {
                  title: "Nova AI assistant",
                  description: "24/7 performance coaching for sleep, focus, recovery and routines"
                },
                {
                  title: "Employer dashboard",
                  description: "Real-time insights, ROI analytics and usage tracking"
                },
                {
                  title: "Wearable integration",
                  description: "Seamless data sync from existing devices"
                },
                {
                  title: "Performance zones",
                  description: "Optional on-site setups for brain optimisation"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group p-8 sm:p-10 bg-pearl hover:bg-mist transition-all duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-carbon mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-stone text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value for Employers */}
        <section ref={impact.ref} className={`py-20 sm:py-32 px-4 sm:px-6 bg-pearl transition-all duration-1000 ${impact.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-carbon mb-6 leading-tight tracking-tight">
                Value for employers
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 max-w-6xl mx-auto">
              {[
                "Better focus",
                "Better memory",
                "Better energy",
                "Fewer mistakes",
                "Faster thinking",
                "Higher output per employee",
                "Retention improvement",
                "A benefit people actually use"
              ].map((item, index) => (
                <div 
                  key={index}
                  className="text-center space-y-3"
                >
                  <div className="w-2 h-2 bg-primary mx-auto rounded-full"></div>
                  <p className="text-base sm:text-lg font-semibold text-carbon">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Three Categories Section */}
        <section id="categories" ref={categories.ref} className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background transition-all duration-1000 ${categories.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-carbon mb-4 sm:mb-6">
                Choose your pathway
              </h2>
              <p className="text-base sm:text-lg text-stone max-w-3xl mx-auto px-4">
                Tailored performance programmes designed for your industry
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Corporate Wellness */}
              <Link to="/enterprise/corporate/overview" className="group sm:col-span-2 lg:col-span-1">
                <div className="bg-pearl rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all h-full">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-full bg-carbon/5 flex items-center justify-center group-hover:bg-carbon/10 transition-colors">
                    <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-carbon" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-carbon mb-2 sm:mb-3">Corporate Wellness</h3>
                  <p className="text-sm sm:text-base text-stone mb-4 sm:mb-6 leading-relaxed">
                    Reduce burnout and boost productivity across your entire workforce with cognitive performance tools designed for busy professionals.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all text-sm sm:text-base">
                    <span>Explore corporate solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* Sports Organisations */}
              <Link to="/enterprise/sports/overview" className="group sm:col-span-2 lg:col-span-1">
                <div className="bg-pearl rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all h-full">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-full bg-carbon/5 flex items-center justify-center group-hover:bg-carbon/10 transition-colors">
                    <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-carbon" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-carbon mb-2 sm:mb-3">Sports Organisations</h3>
                  <p className="text-sm sm:text-base text-stone mb-4 sm:mb-6 leading-relaxed">
                    Maximise athlete performance and reduce injury risk with cutting edge recovery protocols and cognitive training systems.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all text-sm sm:text-base">
                    <span>Explore sports solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* Health Clubs and Studios */}
              <Link to="/enterprise/health-clubs/overview" className="group sm:col-span-2 lg:col-span-1">
                <div className="bg-pearl rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all h-full">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-full bg-carbon/5 flex items-center justify-center group-hover:bg-carbon/10 transition-colors">
                    <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-carbon" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-carbon mb-2 sm:mb-3">Health Clubs and Studios</h3>
                  <p className="text-sm sm:text-base text-stone mb-4 sm:mb-6 leading-relaxed">
                    Differentiate your facility and increase member retention with exclusive premium wellness and recovery technologies.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all text-sm sm:text-base">
                    <span>Explore facility solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section ref={cta.ref} className={`py-24 sm:py-40 px-4 sm:px-6 bg-carbon transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto max-w-5xl text-center space-y-8 sm:space-y-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-ivory leading-tight tracking-tight">
              Show them the future
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-mist leading-relaxed max-w-3xl mx-auto">
              Invite NeuroState into your organisation
            </p>
            <Button 
              size="lg" 
              className="gap-2 bg-ivory text-carbon hover:bg-mist min-h-[44px] px-8 sm:px-10 text-base sm:text-lg font-semibold"
              onClick={() => window.location.href = '/contact'}
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
