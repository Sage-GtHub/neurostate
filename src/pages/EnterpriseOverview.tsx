import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, X, Package, TrendingUp, Building2, Trophy, Dumbbell } from "lucide-react";
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
        <section ref={hero.ref} className={`pt-32 pb-20 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-carbon leading-tight">
                The new standard for<br />corporate performance
              </h1>
              <div className="space-y-4 max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-ash font-medium">
                  Not another wellbeing perk
                </p>
                <p className="text-lg md:text-xl text-stone leading-relaxed">
                  A cognitive performance system that strengthens your workforce from the inside out<br />
                  <span className="text-carbon font-semibold">Think better perform better recover better</span>
                </p>
              </div>
              <Button 
                size="lg" 
                className="gap-2 mt-8"
                onClick={() => window.scrollTo({ top: document.getElementById('categories')?.offsetTop || 0, behavior: 'smooth' })}
              >
                Explore the corporate system
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section ref={problem.ref} className={`py-20 bg-pearl transition-all duration-1000 ${problem.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-carbon">
                  Corporate wellness is broken
                </h2>
                <p className="text-lg text-stone leading-relaxed">
                  Meditation apps yoga sessions and wellbeing platforms are not solving burnout brain fog or declining productivity. Companies keep spending employees keep struggling. People do not need more calm they need a sharper mind. They need the ability to think clearly recover quickly and perform at a high level every day. Nobody is addressing this in a meaningful way until now.
                </p>
              </div>
              <div className="bg-background rounded-3xl p-8 shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 pb-6 border-b border-mist">
                    <div className="p-3 rounded-full bg-destructive/10">
                      <X className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-carbon mb-2">Old Approach</h3>
                      <p className="text-sm text-stone">Meditation apps, yoga sessions, wellbeing platforms</p>
                      <p className="text-xs text-ash mt-1">No measurable impact on cognitive performance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pt-2">
                    <div className="p-3 rounded-full bg-primary/10">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-carbon mb-2">NeuroState Approach</h3>
                      <p className="text-sm text-stone">Cognitive performance system with measurable outcomes</p>
                      <p className="text-xs text-primary mt-1">Engineered for focus, clarity, and resilience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Deliver */}
        <section ref={delivery.ref} className={`py-20 transition-all duration-1000 ${delivery.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-carbon mb-6">
                A cognitive performance system<br />for modern teams
              </h2>
              <p className="text-lg text-stone max-w-3xl mx-auto leading-relaxed">
                NeuroState gives organisations a complete ecosystem designed to enhance focus energy resilience and clarity. Our system includes:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Nova AI your personal cognitive coach",
                  description: "AI powered guidance tailored to each team member"
                },
                {
                  title: "Neuromodulation devices",
                  description: "Shift mental state instantly for deep focus or rapid recovery"
                },
                {
                  title: "Clinically supported supplements",
                  description: "Shipped every month to every employee"
                },
                {
                  title: "Wearable integrations",
                  description: "Clear insights from existing devices"
                },
                {
                  title: "Behaviour analytics",
                  description: "Track team improvements in real time"
                },
                {
                  title: "Performance programmes and education",
                  description: "Built for busy professionals"
                },
                {
                  title: "Plug and play performance rooms",
                  description: "Brain upgrade zones inside your office"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-pearl rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-xl font-semibold text-carbon mb-2">
                    {item.title}
                  </h3>
                  <p className="text-stone text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section ref={impact.ref} className={`py-20 bg-slate transition-all duration-1000 ${impact.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-background rounded-3xl p-8 shadow-xl">
                  <div className="space-y-4">
                    {[
                      { label: "Better concentration", metric: null },
                      { label: "Faster decisions", metric: null },
                      { label: "Stronger emotional control", metric: null },
                      { label: "Less burnout", metric: null },
                      { label: "More creativity", metric: null },
                      { label: "Higher quality output every day", metric: null }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 pb-3 border-b border-mist last:border-0">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium text-carbon">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6 order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-bold text-ivory">
                  High performing minds build high performing companies
                </h2>
                <div className="text-lg text-mist leading-relaxed space-y-4">
                  <p>
                    When your people think better everything improves. Better concentration. Faster decisions. Stronger emotional control. Less burnout. More creativity. Higher quality output every day.
                  </p>
                  <p className="font-semibold text-ivory">
                    NeuroState strengthens the foundation of performance the mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Model */}
        <section ref={subscription.ref} className={`py-20 transition-all duration-1000 ${subscription.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-carbon mb-6">
                Cognitive performance delivered every month
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-pearl rounded-3xl p-10 space-y-8">
                <p className="text-lg text-stone leading-relaxed">
                  For the first time companies can sponsor a monthly cognitive performance subscription for every employee. They receive supplements delivered to their home. Personalised Nova AI coaching. Access to performance programmes. Hardware integrations. Continuous improvement.
                </p>
                <div className="bg-background rounded-2xl p-8">
                  <p className="text-carbon font-semibold text-xl mb-4">
                    This is a performance infrastructure not a perk
                  </p>
                  <p className="text-stone">
                    It is designed for real measurable change
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6 pt-4">
                  {[
                    { icon: Package, label: "Monthly supplements" },
                    { icon: CheckCircle2, label: "Nova AI coaching" },
                    { icon: TrendingUp, label: "Continuous tracking" }
                  ].map((item, index) => (
                    <div key={index} className="text-center space-y-3">
                      <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm font-medium text-carbon">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Measurable Impact */}
        <section ref={metrics.ref} className={`py-20 bg-pearl transition-all duration-1000 ${metrics.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-carbon mb-6">
                Real impact zero guesswork
              </h2>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-background rounded-3xl p-10 shadow-xl">
                <p className="text-lg text-stone mb-8">We track:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Cognitive markers",
                    "Stress and recovery scores",
                    "Focus quality",
                    "Protocol engagement",
                    "Supplement adherence",
                    "Team wide progress"
                  ].map((metric, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-carbon font-medium">{metric}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-mist">
                  <p className="text-carbon font-semibold text-lg">
                    You finally get a wellbeing solution that produces actual results supported by real data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Categories Section */}
        <section id="categories" ref={categories.ref} className={`py-20 bg-background transition-all duration-1000 ${categories.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-carbon mb-6">
                Choose your pathway
              </h2>
              <p className="text-lg text-stone max-w-3xl mx-auto">
                Tailored performance programmes designed for your industry
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Corporate Wellness */}
              <Link to="/enterprise/corporate/overview" className="group">
                <div className="bg-pearl rounded-3xl p-8 hover:shadow-xl transition-all h-full">
                  <div className="w-16 h-16 mb-6 rounded-full bg-carbon/5 flex items-center justify-center group-hover:bg-carbon/10 transition-colors">
                    <Building2 className="w-8 h-8 text-carbon" />
                  </div>
                  <h3 className="text-2xl font-bold text-carbon mb-3">Corporate Wellness</h3>
                  <p className="text-stone mb-6 leading-relaxed">
                    Reduce burnout and boost productivity across your entire workforce with cognitive performance tools designed for busy professionals.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                    <span>Explore corporate solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* Sports Organisations */}
              <Link to="/enterprise/sports/overview" className="group">
                <div className="bg-pearl rounded-3xl p-8 hover:shadow-xl transition-all h-full">
                  <div className="w-16 h-16 mb-6 rounded-full bg-carbon/5 flex items-center justify-center group-hover:bg-carbon/10 transition-colors">
                    <Trophy className="w-8 h-8 text-carbon" />
                  </div>
                  <h3 className="text-2xl font-bold text-carbon mb-3">Sports Organisations</h3>
                  <p className="text-stone mb-6 leading-relaxed">
                    Maximise athlete performance and reduce injury risk with cutting edge recovery protocols and cognitive training systems.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                    <span>Explore sports solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* Health Clubs and Studios */}
              <Link to="/enterprise/health-clubs/overview" className="group">
                <div className="bg-pearl rounded-3xl p-8 hover:shadow-xl transition-all h-full">
                  <div className="w-16 h-16 mb-6 rounded-full bg-carbon/5 flex items-center justify-center group-hover:bg-carbon/10 transition-colors">
                    <Dumbbell className="w-8 h-8 text-carbon" />
                  </div>
                  <h3 className="text-2xl font-bold text-carbon mb-3">Health Clubs and Studios</h3>
                  <p className="text-stone mb-6 leading-relaxed">
                    Differentiate your facility and increase member retention with exclusive premium wellness and recovery technologies.
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                    <span>Explore facility solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section ref={cta.ref} className={`py-32 bg-carbon transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-ivory mb-6">
              Bring NeuroState into your organisation
            </h2>
            <p className="text-xl text-mist leading-relaxed mb-8">
              This is the shift from wellness perks to engineered cognitive performance. If you want your people to think lead and perform at world class levels this is the system.
            </p>
            <Button 
              size="lg" 
              className="gap-2 bg-ivory text-carbon hover:bg-pearl"
              onClick={() => window.location.href = '/contact'}
            >
              Learn more
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
