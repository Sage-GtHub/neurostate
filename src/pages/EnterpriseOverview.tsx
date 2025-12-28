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
        title="Cognitive Performance Infrastructure for High-Performing Teams | Neurostate"
        description="Predict and reduce performance volatility at scale. AI-driven cognitive analytics, performance forecasting, and risk prediction for enterprise teams."
      />
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section ref={hero.ref} className={`pt-32 sm:pt-40 pb-24 sm:pb-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-foreground transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-medium">For Organisations</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-background leading-[1.02]">
              Cognitive Performance Infrastructure
            </h1>
            <p className="text-xl sm:text-2xl text-background/90 font-medium">
              Predict and reduce performance volatility at scale.
            </p>
            <p className="text-base sm:text-lg text-background/70 max-w-2xl mx-auto">
              Enterprise-grade AI that measures cognitive readiness, predicts performance risk, and stabilises output across high-performing teams.
            </p>
            <div className="pt-8">
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-muted min-h-[52px] px-10"
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See the solution
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Key Statement */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed">
              The first AI platform combining predictive cognitive analytics, biometric data, and performance forecasting.
              <br className="hidden sm:block" />
              <span className="font-medium"> Employers measure outcomes, not participation.</span>
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section ref={problem.ref} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-background transition-all duration-1000 ${problem.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-medium">The Problem</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-[1.05]">
                  Performance volatility costs billions
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Companies cannot predict cognitive risk. Teams operate in the dark until performance breaks down. The problem is not stress—it's unmeasured cognitive capacity.
                </p>
                <div className="pt-4 p-6 bg-foreground">
                  <p className="text-lg text-background font-medium">
                    Your teams don't need relaxation apps.
                  </p>
                  <p className="text-lg text-background/90">
                    They need predictive cognitive infrastructure.
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
                  <div key={i} className="flex items-center gap-4 p-4 bg-muted border-l-2 border-border">
                    <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground line-through text-sm">{entry.item}</span>
                    <span className="text-xs text-muted-foreground/70 ml-auto uppercase tracking-wide">{entry.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section ref={comparison.ref} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-foreground transition-all duration-1000 ${comparison.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-background/60 text-xs tracking-[0.3em] uppercase font-medium">The Difference</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-background leading-[1.05]">
                Wellness vs Performance
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Old Wellness */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-background/60 mb-6 uppercase tracking-wider">Traditional Wellness</h3>
                {[
                  { item: "Meditation apps", issue: "Users stop after 2 weeks" },
                  { item: "Wellness workshops", issue: "Information forgotten in days" },
                  { item: "Mental health days", issue: "Reactive, not preventive" },
                  { item: "Step challenges", issue: "Does not improve cognition" },
                  { item: "EAP programmes", issue: "3% utilisation rate" }
                ].map((entry, i) => (
                  <div key={i} className="p-4 bg-background/5 border-l border-background/20">
                    <p className="text-background/80 text-sm">{entry.item}</p>
                    <p className="text-xs text-background/50 mt-1">{entry.issue}</p>
                  </div>
                ))}
              </div>

              {/* NeuroState */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-background mb-6 uppercase tracking-wider">NeuroState System</h3>
                {[
                  { item: "Nova AI cognitive engine", benefit: "Predictive performance forecasting" },
                  { item: "Performance execution layer", benefit: "Precision cognitive stacks" },
                  { item: "Real-time cognitive analytics", benefit: "Measure readiness before it breaks" },
                  { item: "Risk prediction models", benefit: "Prevent volatility before it happens" },
                  { item: "Enterprise dashboards", benefit: "Prove ROI to leadership" }
                ].map((entry, i) => (
                  <div key={i} className="p-4 bg-accent/10 border-l-2 border-accent">
                    <p className="text-background text-sm">{entry.item}</p>
                    <p className="text-xs text-background/60 mt-1">{entry.benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Deliver */}
        <section ref={solution.ref} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-background transition-all duration-1000 ${solution.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-medium">The Solution</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-[1.05]">
                Cognitive performance delivered monthly
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {[
                { icon: BarChart3, title: "Nova AI", desc: "Personalised cognitive coaching for every employee" },
                { icon: Shield, title: "Precision Supplements", desc: "Monthly delivery of research backed formulas" },
                { icon: Clock, title: "Real Time Analytics", desc: "Track cognitive performance across teams" },
                { icon: Users, title: "Team Dashboards", desc: "Aggregate insights for leadership" },
                { icon: CheckCircle2, title: "Outcome Tracking", desc: "Measure focus, energy, and resilience" },
                { icon: Building2, title: "Enterprise Support", desc: "Dedicated account management" }
              ].map((item, i) => (
                <div key={i} className="p-8 sm:p-10 bg-background hover:bg-foreground group transition-all duration-300 border-l-2 border-accent/30 hover:border-accent">
                  <item.icon className="w-5 h-5 text-accent group-hover:text-accent mb-4 transition-colors" />
                  <h3 className="text-base font-medium text-foreground group-hover:text-background mb-2 transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-background/70 transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section ref={impact.ref} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-foreground transition-all duration-1000 ${impact.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-background/60 text-xs tracking-[0.3em] uppercase font-medium">The Impact</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-background leading-[1.05]">
                Measurable outcomes
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-background/10">
              {[
                { stat: "47%", label: "Focus increase", period: "Average across teams" },
                { stat: "63%", label: "Burnout reduction", period: "Within 90 days" },
                { stat: "31%", label: "Productivity gain", period: "Output per employee" },
                { stat: "89%", label: "Satisfaction", period: "Programme rating" },
              ].map((item, i) => (
                <div key={i} className="p-10 sm:p-12 bg-foreground text-center">
                  <p className="text-5xl sm:text-6xl font-bold text-accent mb-3">{item.stat}</p>
                  <p className="text-sm text-background mb-1">{item.label}</p>
                  <p className="text-xs text-background/60">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" ref={categories.ref} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-background transition-all duration-1000 ${categories.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-medium">Solutions</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-[1.05]">
                Built for your organisation
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-border">
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
                  <div className="p-8 sm:p-10 bg-background hover:bg-foreground transition-all duration-300 h-full">
                    <category.icon className="w-6 h-6 text-foreground group-hover:text-background mb-6 transition-colors" />
                    <h3 className="text-xl font-medium text-foreground group-hover:text-background mb-2 transition-colors">{category.title}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-background/70 mb-6 transition-colors">{category.desc}</p>
                    <ul className="space-y-2">
                      {category.metrics.map((metric, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-background/70 transition-colors">
                          <div className="w-1.5 h-1.5 bg-accent" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-background transition-colors">
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
        <section ref={cta.ref} className={`py-24 sm:py-32 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-foreground transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-background leading-[1.05]">
              Ready to upgrade your workforce?
            </h2>
            <p className="text-base sm:text-lg text-background/70 max-w-xl mx-auto">
              Partner with NeuroState to deploy cognitive performance across your organisation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/contact">
                <Button size="lg" className="bg-background text-foreground hover:bg-muted min-h-[52px] px-10">
                  Contact us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="mailto:partnerships@neurostate.co.uk">
                <Button variant="outline" size="lg" className="border-background/30 text-background hover:bg-background/5 min-h-[52px] px-10">
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
