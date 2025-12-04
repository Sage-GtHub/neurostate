import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, X, Building2, Trophy, Dumbbell, BarChart3, Users, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function EnterpriseOverview() {
  const hero = useScrollAnimation();
  const problem = useScrollAnimation();
  const comparison = useScrollAnimation();
  const solution = useScrollAnimation();
  const impact = useScrollAnimation();
  const categories = useScrollAnimation();
  const cta = useScrollAnimation();

  return (
    <>
      <SEO 
        title="NeuroState for Teams – The Corporate Cognitive Performance Solution"
        description="Transform workforce performance with AI-driven protocols, recovery tools and supplements that improve focus, wellbeing and productivity. The enterprise cognitive performance platform."
      />
      <Header />
      
      <main className="min-h-screen bg-ivory mobile-nav-padding">
        {/* Hero */}
        <section ref={hero.ref} className={`pt-32 sm:pt-40 pb-24 sm:pb-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <p className="text-stone text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">For Organisations</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory leading-[1.02]">
              The end of corporate wellness
            </h1>
            <p className="text-xl sm:text-2xl text-ivory/90 font-medium">
              The era of cognitive performance begins.
            </p>
            <p className="text-base sm:text-lg text-stone max-w-2xl mx-auto">
              Skilled workers need a better brain, not another relaxation app. NeuroState drives clarity, focus, and resilience across teams.
            </p>
            <div className="pt-8">
              <Button 
                size="lg" 
                className="bg-ivory text-carbon hover:bg-mist min-h-[52px] px-10"
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See the solution
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Key Statement */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory border-b border-mist">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg sm:text-xl md:text-2xl text-carbon leading-relaxed">
              The first integrated platform combining AI, hardware, and nutrition.
              <br className="hidden sm:block" />
              <span className="font-semibold"> Employers finally get outcomes, not participation rates.</span>
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section ref={problem.ref} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory transition-all duration-1000 ${problem.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">The Problem</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.05]">
                  Corporate wellness is dead
                </h2>
                <p className="text-base sm:text-lg text-ash leading-relaxed">
                  Companies keep spending on wellness. Employees keep struggling. The problem is not stress management. The problem is cognitive performance.
                </p>
                <div className="pt-4 p-6 bg-carbon">
                  <p className="text-lg text-ivory font-medium">
                    Your people do not need more calm.
                  </p>
                  <p className="text-lg text-ivory/90">
                    They need sharper minds.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { item: "Meditation apps no one opens", impact: "Abandoned" },
                  { item: "Breathwork sessions that change nothing", impact: "Forgotten" }, 
                  { item: "Wellbeing talks no one attends", impact: "Ignored" },
                  { item: "Step challenges", impact: "Irrelevant" },
                  { item: "Mental health days that arrive too late", impact: "Reactive" }
                ].map((entry, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-carbon/5 border-l border-carbon/10">
                    <X className="w-4 h-4 text-carbon/30 flex-shrink-0" />
                    <span className="text-ash line-through text-sm">{entry.item}</span>
                    <span className="text-[10px] text-carbon/40 ml-auto uppercase tracking-wide">{entry.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section ref={comparison.ref} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon transition-all duration-1000 ${comparison.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-stone text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">The Difference</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ivory leading-[1.05]">
                Wellness vs Performance
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Old Wellness */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-stone mb-6 uppercase tracking-wider">Traditional Wellness</h3>
                {[
                  { item: "Meditation apps", issue: "Users stop after 2 weeks" },
                  { item: "Wellness workshops", issue: "Information forgotten in days" },
                  { item: "Mental health days", issue: "Reactive, not preventive" },
                  { item: "Step challenges", issue: "Does not improve cognition" },
                  { item: "EAP programmes", issue: "3% utilisation rate" }
                ].map((entry, i) => (
                  <div key={i} className="p-4 bg-slate/40 border-l border-stone/30">
                    <p className="text-ivory/80 text-sm">{entry.item}</p>
                    <p className="text-xs text-stone mt-1">{entry.issue}</p>
                  </div>
                ))}
              </div>

              {/* NeuroState */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-ivory mb-6 uppercase tracking-wider">NeuroState System</h3>
                {[
                  { item: "Nova AI coaching", benefit: "Personalised daily protocols" },
                  { item: "Monthly supplement delivery", benefit: "Research backed formulas" },
                  { item: "Real time analytics", benefit: "Measure cognitive markers" },
                  { item: "Predictive insights", benefit: "Prevent burnout before it happens" },
                  { item: "Performance tracking", benefit: "Prove ROI to leadership" }
                ].map((entry, i) => (
                  <div key={i} className="p-4 bg-ivory/5 border-l border-ivory/30">
                    <p className="text-ivory text-sm">{entry.item}</p>
                    <p className="text-xs text-stone mt-1">{entry.benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Deliver */}
        <section ref={solution.ref} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory transition-all duration-1000 ${solution.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">The Solution</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.05]">
                Cognitive performance delivered monthly
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-mist">
              {[
                { icon: BarChart3, title: "Nova AI", desc: "Personalised cognitive coaching for every employee" },
                { icon: Shield, title: "Precision Supplements", desc: "Monthly delivery of research backed formulas" },
                { icon: Clock, title: "Real Time Analytics", desc: "Track cognitive performance across teams" },
                { icon: Users, title: "Team Dashboards", desc: "Aggregate insights for leadership" },
                { icon: CheckCircle2, title: "Outcome Tracking", desc: "Measure focus, energy, and resilience" },
                { icon: Building2, title: "Enterprise Support", desc: "Dedicated account management" }
              ].map((item, i) => (
                <div key={i} className="p-8 sm:p-10 bg-ivory hover:bg-carbon group transition-all duration-300">
                  <item.icon className="w-5 h-5 text-carbon group-hover:text-ivory mb-4 transition-colors" />
                  <h3 className="text-base font-semibold text-carbon group-hover:text-ivory mb-2 transition-colors">{item.title}</h3>
                  <p className="text-sm text-ash group-hover:text-stone transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section ref={impact.ref} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon transition-all duration-1000 ${impact.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-stone text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">The Impact</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ivory leading-[1.05]">
                Measurable outcomes
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate/30">
              {[
                { stat: "47%", label: "Focus increase", period: "Average across teams" },
                { stat: "63%", label: "Burnout reduction", period: "Within 90 days" },
                { stat: "31%", label: "Productivity gain", period: "Output per employee" },
                { stat: "89%", label: "Satisfaction", period: "Programme rating" },
              ].map((item, i) => (
                <div key={i} className="p-10 sm:p-12 bg-carbon text-center">
                  <p className="text-5xl sm:text-6xl font-bold text-ivory mb-3">{item.stat}</p>
                  <p className="text-sm text-ivory mb-1">{item.label}</p>
                  <p className="text-xs text-stone">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" ref={categories.ref} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-ivory transition-all duration-1000 ${categories.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-carbon/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Solutions</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-carbon leading-[1.05]">
                Built for your organisation
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-mist">
              {[
                {
                  icon: Building2,
                  title: "Corporate",
                  desc: "Enterprise cognitive performance programmes",
                  href: "/enterprise/corporate/overview",
                  metrics: ["Focus tracking", "Burnout prevention", "Team analytics"]
                },
                {
                  icon: Trophy,
                  title: "Sports",
                  desc: "Athletic cognitive optimisation",
                  href: "/enterprise/sports/overview",
                  metrics: ["Reaction time", "Decision speed", "Recovery protocols"]
                },
                {
                  icon: Dumbbell,
                  title: "Health Clubs",
                  desc: "Member performance programmes",
                  href: "/enterprise/health-clubs/overview",
                  metrics: ["Member retention", "Premium offering", "Outcome tracking"]
                }
              ].map((category, i) => (
                <Link key={i} to={category.href} className="group">
                  <div className="p-8 sm:p-10 bg-ivory hover:bg-carbon transition-all duration-300 h-full">
                    <category.icon className="w-6 h-6 text-carbon group-hover:text-ivory mb-6 transition-colors" />
                    <h3 className="text-xl font-semibold text-carbon group-hover:text-ivory mb-2 transition-colors">{category.title}</h3>
                    <p className="text-sm text-ash group-hover:text-stone mb-6 transition-colors">{category.desc}</p>
                    <ul className="space-y-2">
                      {category.metrics.map((metric, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-ash group-hover:text-stone transition-colors">
                          <div className="w-1 h-1 bg-carbon group-hover:bg-ivory transition-colors" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-carbon group-hover:text-ivory transition-colors">
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section ref={cta.ref} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-carbon transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ivory leading-[1.05]">
              Ready to upgrade your workforce?
            </h2>
            <p className="text-base sm:text-lg text-stone max-w-xl mx-auto">
              Partner with NeuroState to deploy cognitive performance across your organisation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/contact">
                <Button size="lg" className="bg-ivory text-carbon hover:bg-mist min-h-[52px] px-10">
                  Contact us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="mailto:partnerships@neurostate.co.uk">
                <Button variant="outline" size="lg" className="border-ivory/30 text-ivory hover:bg-ivory/5 min-h-[52px] px-10">
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
