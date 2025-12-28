import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, CheckCircle2, X, Building2, Trophy, Dumbbell, BarChart3, Users, Shield, Clock } from "lucide-react";
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
        title="Cognitive Performance Infrastructure for High-Performing Teams | Neurostate"
        description="Predict and reduce performance volatility at scale. AI-driven cognitive analytics, performance forecasting, and risk prediction for enterprise teams."
      />
      <Header />
      
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Organic background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        {/* Hero */}
        <section 
          ref={hero.ref} 
          className={`relative pt-32 sm:pt-44 pb-28 sm:pb-36 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">For Organisations</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-[1.1] tracking-tight">
              Cognitive Performance<br />
              <span className="text-foreground/50">Infrastructure</span>
            </h1>
            <p className="text-sm sm:text-base text-foreground/50 max-w-lg mx-auto">
              Enterprise-grade AI that measures cognitive readiness, predicts performance risk, and stabilises output across high-performing teams.
            </p>
            <div className="pt-4">
              <Button 
                size="sm"
                className="rounded-full h-10 px-6 text-xs bg-foreground text-background hover:bg-foreground/90"
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See the solution
                <ArrowRight className="ml-2 w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Key Statement - Glass card */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-32 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="glass-subtle rounded-3xl p-8 md:p-12 text-center">
              <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                The first AI platform combining predictive cognitive analytics, biometric data, and performance forecasting.
                <span className="block mt-2 text-foreground font-medium">Employers measure outcomes, not participation.</span>
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section 
          ref={problem.ref} 
          className={`py-24 sm:py-32 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${problem.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">The Problem</p>
                <h2 className="text-3xl sm:text-4xl font-light text-foreground leading-[1.15]">
                  Performance volatility costs billions
                </h2>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  Companies cannot predict cognitive risk. Teams operate in the dark until performance breaks down. The problem is not stress—it's unmeasured cognitive capacity.
                </p>
                <div className="pt-4">
                  <div className="inline-block bg-foreground rounded-2xl p-6">
                    <p className="text-xs text-background/80">
                      Your teams don't need relaxation apps.
                    </p>
                    <p className="text-xs text-background font-medium mt-1">
                      They need predictive cognitive infrastructure.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {[
                  { item: "Meditation apps no one opens", impact: "Abandoned" },
                  { item: "Breathwork sessions that change nothing", impact: "Forgotten" }, 
                  { item: "Wellbeing talks no one attends", impact: "Ignored" },
                  { item: "Step challenges", impact: "Irrelevant" },
                  { item: "Mental health days that arrive too late", impact: "Reactive" }
                ].map((entry, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/[0.02] group hover:bg-foreground/[0.04] transition-colors"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <X className="w-3.5 h-3.5 text-foreground/30 flex-shrink-0" />
                    <span className="text-foreground/40 line-through text-xs">{entry.item}</span>
                    <span className="text-[10px] text-foreground/25 ml-auto uppercase tracking-wide">{entry.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section 
          ref={comparison.ref} 
          className={`py-24 sm:py-32 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${comparison.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">The Difference</p>
              <h2 className="text-3xl sm:text-4xl font-light text-foreground">
                Wellness vs Performance
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Old Wellness */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/30 mb-4">Traditional Wellness</p>
                {[
                  { item: "Meditation apps", issue: "Users stop after 2 weeks" },
                  { item: "Wellness workshops", issue: "Information forgotten in days" },
                  { item: "Mental health days", issue: "Reactive, not preventive" },
                  { item: "Step challenges", issue: "Does not improve cognition" },
                  { item: "EAP programmes", issue: "3% utilisation rate" }
                ].map((entry, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-foreground/[0.02]">
                    <p className="text-foreground/50 text-xs">{entry.item}</p>
                    <p className="text-[10px] text-foreground/30 mt-1">{entry.issue}</p>
                  </div>
                ))}
              </div>

              {/* NeuroState */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.15em] text-accent mb-4">NeuroState System</p>
                {[
                  { item: "Nova AI cognitive engine", benefit: "Predictive performance forecasting" },
                  { item: "Performance execution layer", benefit: "Precision cognitive stacks" },
                  { item: "Real-time cognitive analytics", benefit: "Measure readiness before it breaks" },
                  { item: "Risk prediction models", benefit: "Prevent volatility before it happens" },
                  { item: "Enterprise dashboards", benefit: "Prove ROI to leadership" }
                ].map((entry, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-accent/5 border border-accent/10">
                    <p className="text-foreground text-xs">{entry.item}</p>
                    <p className="text-[10px] text-foreground/50 mt-1">{entry.benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Deliver */}
        <section 
          ref={solution.ref} 
          className={`py-24 sm:py-32 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${solution.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">The Solution</p>
              <h2 className="text-3xl sm:text-4xl font-light text-foreground">
                Cognitive performance delivered monthly
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: BarChart3, title: "Nova AI", desc: "Personalised cognitive coaching for every employee" },
                { icon: Shield, title: "Precision Supplements", desc: "Monthly delivery of research backed formulas" },
                { icon: Clock, title: "Real Time Analytics", desc: "Track cognitive performance across teams" },
                { icon: Users, title: "Team Dashboards", desc: "Aggregate insights for leadership" },
                { icon: CheckCircle2, title: "Outcome Tracking", desc: "Measure focus, energy, and resilience" },
                { icon: Building2, title: "Enterprise Support", desc: "Dedicated account management" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="group p-8 rounded-3xl bg-foreground/[0.02] hover:bg-foreground hover:text-background transition-all duration-500"
                >
                  <item.icon className="w-5 h-5 text-accent group-hover:text-accent mb-5 transition-colors" />
                  <h3 className="text-sm font-medium mb-2 transition-colors">{item.title}</h3>
                  <p className="text-xs text-foreground/50 group-hover:text-background/60 transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section 
          ref={impact.ref} 
          className={`py-24 sm:py-32 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${impact.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">The Impact</p>
              <h2 className="text-3xl sm:text-4xl font-light text-foreground">
                Measurable outcomes
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { stat: "47", suffix: "%", label: "Focus increase", period: "Average across teams" },
                { stat: "63", suffix: "%", label: "Burnout reduction", period: "Within 90 days" },
                { stat: "31", suffix: "%", label: "Productivity gain", period: "Output per employee" },
                { stat: "89", suffix: "%", label: "Satisfaction", period: "Programme rating" },
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl bg-foreground text-background text-center">
                  <p className="text-4xl sm:text-5xl font-light text-accent mb-2">
                    {item.stat}<span className="text-2xl">{item.suffix}</span>
                  </p>
                  <p className="text-xs text-background/80 mb-1">{item.label}</p>
                  <p className="text-[10px] text-background/40">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section 
          id="categories" 
          ref={categories.ref} 
          className={`py-24 sm:py-32 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${categories.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">Solutions</p>
              <h2 className="text-3xl sm:text-4xl font-light text-foreground">
                Built for your organisation
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
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
                  <div className="p-8 rounded-3xl bg-foreground/[0.02] hover:bg-foreground transition-all duration-500 h-full flex flex-col">
                    <category.icon className="w-5 h-5 text-foreground/60 group-hover:text-background mb-6 transition-colors" />
                    <h3 className="text-lg font-medium text-foreground group-hover:text-background mb-2 transition-colors">{category.title}</h3>
                    <p className="text-xs text-foreground/50 group-hover:text-background/60 mb-6 transition-colors">{category.desc}</p>
                    <ul className="space-y-2 mt-auto mb-6">
                      {category.metrics.map((metric, j) => (
                        <li key={j} className="flex items-center gap-2 text-[10px] text-foreground/40 group-hover:text-background/50 transition-colors">
                          <div className="w-1 h-1 rounded-full bg-accent" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-xs font-medium text-foreground/60 group-hover:text-background transition-colors">
                      Learn more
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section 
          ref={cta.ref} 
          className={`py-24 sm:py-32 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="glass-subtle rounded-3xl p-12 md:p-16 space-y-8">
              <h2 className="text-2xl sm:text-3xl font-light text-foreground">
                Ready to upgrade your workforce?
              </h2>
              <p className="text-sm text-foreground/50 max-w-md mx-auto">
                Partner with NeuroState to deploy cognitive performance across your organisation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link to="/contact">
                  <Button size="sm" className="rounded-full h-10 px-6 text-xs bg-foreground text-background hover:bg-foreground/90">
                    Contact us
                    <ArrowRight className="ml-2 w-3.5 h-3.5" />
                  </Button>
                </Link>
                <a href="mailto:partnerships@neurostate.co.uk">
                  <Button variant="outline" size="sm" className="rounded-full h-10 px-6 text-xs border-foreground/20 text-foreground/70 hover:bg-foreground/5">
                    partnerships@neurostate.co.uk
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
