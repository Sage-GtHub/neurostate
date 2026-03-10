import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { ArrowRight, ArrowUpRight, Check, Cpu, TrendingUp, Heart, Sparkles, Trophy, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { EnterpriseROICalculator } from "@/components/EnterpriseROICalculator";

const industries = [
  {
    id: "information-technology",
    title: "Information Technology",
    desc: "Help tech teams avoid burnout and stay sharp under pressure.",
    href: "/enterprise/information-technology/overview",
    icon: Cpu,
    stats: { primary: "47%", label: "Less burnout" },
    features: ["Team health monitoring", "Deep work support", "Stress recovery"],
  },
  {
    id: "financial-services",
    title: "Financial Services",
    desc: "Keep high-pressure teams focused and performing at their best.",
    href: "/enterprise/financial-services/overview",
    icon: TrendingUp,
    stats: { primary: "23%", label: "Better performance" },
    features: ["Workload tracking", "Best performance windows", "Stress management"],
  },
  {
    id: "healthcare",
    title: "Healthcare & Clinical",
    desc: "Support patient recovery and staff wellbeing with health data.",
    href: "/enterprise/healthcare/overview",
    icon: Heart,
    stats: { primary: "40%", label: "Faster recovery" },
    features: ["Recovery tracking", "Staff wellness", "Patient health monitoring"],
  },
  {
    id: "hospitality",
    title: "Hospitality & Spas",
    desc: "Offer guests premium wellness experiences backed by real data.",
    href: "/enterprise/hospitality/overview",
    icon: Sparkles,
    stats: { primary: "35%", label: "Revenue increase" },
    features: ["Personalised guest wellness", "Sleep improvement suites", "Recovery services"],
  },
  {
    id: "sports",
    title: "Sports & Athletics",
    desc: "Help athletes recover faster and perform better on game day.",
    href: "/enterprise/sports/overview",
    icon: Trophy,
    stats: { primary: "2.1x", label: "Performance gain" },
    features: ["Reaction time training", "Faster recovery", "Injury prevention"],
  },
  {
    id: "health-clubs",
    title: "Health Clubs & Gyms",
    desc: "Keep members engaged with personalised performance tracking.",
    href: "/enterprise/health-clubs/overview",
    icon: Dumbbell,
    stats: { primary: "52%", label: "Better retention" },
    features: ["Member health tracking", "Premium tier services", "Measurable results"],
  }
];

export default function EnterpriseOverview() {
  return (
    <>
      <SEO 
        title="Team Health Solutions | NeuroState for Business"
        description="NeuroState helps organisations look after their people. Connect wearables, spot burnout early, and keep teams healthy and productive."
        keywords="employee wellness platform, team health monitoring, burnout prevention, workforce wellbeing, team performance, workplace health technology"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="max-w-3xl">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Enterprise</span>
                <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-medium text-foreground mt-4 tracking-tight leading-[1.08]">
                  Better health data.{" "}
                  <span className="text-muted-foreground">Better teams.</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl mt-6 leading-relaxed">
                  NeuroState connects to wearables, spots early signs of burnout and fatigue, and gives managers clear actions to keep their teams performing at their best.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-8">
                  <Link to="/contact">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <Link to="/solutions">
                    <Button size="lg" variant="outline" className="h-12 px-6 text-sm font-medium rounded-full border-border/60 hover:border-foreground/30 group">
                      Explore platform
                      <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Industries Grid */}
          <section className="py-16 md:py-28 px-5 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="mb-14 md:mb-20">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Industries</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1] max-w-2xl">
                  Tailored for every sector.{" "}
                  <span className="text-muted-foreground">Proven across all of them.</span>
                </h2>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {industries.map((industry, i) => (
                  <Link key={industry.id} to={industry.href}>
                    <motion.div
                      className="group p-6 rounded-xl border border-border/40 hover:border-primary/30 transition-colors h-full"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                        <industry.icon className="w-5 h-5 text-primary" />
                      </div>

                      <h3 className="text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                        {industry.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        {industry.desc}
                      </p>

                      <div className="pt-4 border-t border-border/30 mb-4">
                        <p className="text-xl font-light text-foreground">{industry.stats.primary}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{industry.stats.label}</p>
                      </div>

                      <ul className="space-y-1.5">
                        {industry.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <Check className="w-3 h-3 text-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/30 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ROI Calculator */}
          <section className="py-16 md:py-28 px-5 md:px-8 bg-muted/20">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="mb-14 md:mb-20 text-center">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">ROI Calculator</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                  Calculate your potential savings
                </h2>
                <p className="text-base text-muted-foreground max-w-xl mx-auto mt-6 leading-relaxed">
                  See how NeuroState can deliver measurable returns at founding pricing of £19/employee per month.
                </p>
              </ScrollReveal>

              <div className="max-w-xl mx-auto">
                <EnterpriseROICalculator variant="light" />
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 md:py-20 px-5 md:px-8 bg-foreground">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {[
                  { value: "47%", label: "Less burnout" },
                  { value: "2.4x", label: "Return on investment in year one" },
                  { value: "89%", label: "Staff satisfaction" },
                  { value: "31%", label: "Productivity improvement" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="group cursor-default"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <p className="text-3xl md:text-4xl font-light text-background mb-1">{stat.value}</p>
                    <p className="text-xs text-background/60">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 md:py-32 px-5 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Get Started</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground leading-[1.1]">
                  Ready to look after your team properly?
                </h2>
                <p className="text-base text-muted-foreground max-w-lg mx-auto">
                  Book a call and we'll show you how NeuroState works for your industry.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Link to="/contact">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group">
                      Book enterprise demo
                      <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <a href="mailto:partnerships@neurostate.co.uk">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium rounded-full bg-transparent border border-border text-foreground hover:bg-muted/50">
                      partnerships@neurostate.co.uk
                    </Button>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
