import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ROICalculator } from "@/components/ROICalculator";
import { ArrowRight, ArrowUpRight, Building2, Briefcase, Heart, Shield, FlaskConical, Cpu, TrendingUp, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const industries = [
  {
    id: "saas-high-growth",
    name: "SaaS & Technology",
    description: "Sustain engineering velocity and prevent burnout in high-growth environments.",
    icon: Cpu,
    href: "/industries/saas-high-growth",
    stats: { turnover: "18%", productivity: "17%" },
  },
  {
    id: "financial-services",
    name: "Financial Services",
    description: "Precision performance in high-stakes, regulated environments.",
    icon: TrendingUp,
    href: "/industries/financial-services",
    stats: { turnover: "13%", productivity: "14%" },
  },
  {
    id: "professional-services",
    name: "Professional Services",
    description: "Protect billable capacity and retain top talent.",
    icon: Briefcase,
    href: "/industries/professional-services",
    stats: { turnover: "22%", productivity: "19%" },
  },
  {
    id: "healthcare",
    name: "Healthcare & Clinical",
    description: "Operational resilience for clinical teams under pressure.",
    icon: Heart,
    href: "/industries/healthcare",
    stats: { turnover: "19%", productivity: "16%" },
  },
  {
    id: "research-life-sciences",
    name: "Research & Life Sciences",
    description: "Sustain deep work and accelerate discovery cycles.",
    icon: FlaskConical,
    href: "/industries/research-life-sciences",
    stats: { turnover: "15%", productivity: "18%" },
  },
  {
    id: "government-defence",
    name: "Government & Defence",
    description: "Mission-critical performance systems for complex operations.",
    icon: Shield,
    href: "/industries/government-defence",
    stats: { turnover: "11%", productivity: "13%" },
  }
];

const impactStats = [
  { value: "3.2x", label: "Average ROI", sublabel: "First-year return" },
  { value: "25%", label: "Productivity Gain", sublabel: "Recovered capacity" },
  { value: "40%", label: "Turnover Reduction", sublabel: "Burnout prevention" },
  { value: "4.2", label: "Month Payback", sublabel: "Time to value" }
];

const Industries = () => {
  return (
    <>
      <SEO 
        title="Industries | NeuroState® - Cognitive Performance by Sector"
        description="NeuroState adapts to your industry's unique cognitive demands. Calculate your ROI and see how we serve SaaS, financial services, healthcare, and more."
        keywords="enterprise wellness, industry solutions, SaaS burnout prevention, healthcare workforce, financial services performance"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-5 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="max-w-3xl">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Industries</span>
                <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] font-medium text-foreground mt-4 tracking-tight leading-[1.08]">
                  Built for knowledge-intensive{" "}
                  <span className="text-muted-foreground">organisations.</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-xl mt-6 leading-relaxed">
                  Every industry has unique cognitive demands. NeuroState adapts to yours, with benchmarks, integrations, and ROI models tailored to your sector.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Industry Grid */}
          <section className="py-16 md:py-28 px-5 md:px-8 border-t border-border/30">
            <div className="max-w-6xl mx-auto">
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
                        {industry.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        {industry.description}
                      </p>
                      
                      <div className="flex items-center gap-6 pt-4 border-t border-border/30">
                        <div>
                          <p className="text-lg font-light text-foreground">{industry.stats.turnover}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">Avg. turnover</p>
                        </div>
                        <div>
                          <p className="text-lg font-light text-foreground">{industry.stats.productivity}</p>
                          <p className="text-[10px] text-muted-foreground font-mono">Productivity loss</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-4 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="py-16 md:py-20 px-5 md:px-8 bg-foreground">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {impactStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="group cursor-default"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <p className="text-3xl md:text-4xl font-light text-background mb-1">{stat.value}</p>
                    <p className="text-xs text-background/80 font-medium">{stat.label}</p>
                    <p className="text-[10px] text-background/50 mt-0.5 font-mono">{stat.sublabel}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ROI Calculator */}
          <section className="py-16 md:py-28 px-5 md:px-8" id="calculator">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="mb-14 md:mb-20 text-center">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">ROI Calculator</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                  Calculate your hidden costs
                </h2>
                <p className="text-base text-muted-foreground max-w-xl mx-auto mt-6 leading-relaxed">
                  See what cognitive underperformance, burnout-related turnover, and preventable sick days are really costing your organisation.
                </p>
              </ScrollReveal>

              <div className="p-6 md:p-8 rounded-xl border border-border/50 bg-background">
                <ROICalculator />
              </div>
            </div>
          </section>

          {/* Enterprise Features */}
          <section className="py-16 md:py-28 px-5 md:px-8 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <ScrollReveal className="lg:sticky lg:top-28">
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Enterprise Ready</span>
                  <h2 className="text-3xl md:text-[2.75rem] font-medium text-foreground mt-4 leading-[1.1]">
                    Built for scale.{" "}
                    <span className="text-muted-foreground">Ready for compliance.</span>
                  </h2>
                  <p className="text-base text-muted-foreground max-w-md mt-6 leading-relaxed">
                    NeuroState is designed for enterprise deployment with security, compliance, and integration capabilities that match your requirements.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-8">
                    <Link to="/contact">
                      <Button size="lg" className="h-12 px-8 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        Book a demo
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link to="/enterprise/overview">
                      <Button size="lg" variant="outline" className="h-12 px-6 text-sm font-medium rounded-full border-border/60 hover:border-foreground/30">
                        Enterprise overview
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>

                <div className="space-y-0">
                  {[
                    { icon: Shield, title: "SOC 2 Type II", desc: "Enterprise security controls, certified compliant." },
                    { icon: Building2, title: "SSO & SCIM", desc: "Enterprise authentication and provisioning." },
                    { icon: Zap, title: "40+ Integrations", desc: "Connect to wearables and productivity tools." },
                    { icon: Users, title: "Unlimited seats", desc: "Scale freely across your organisation." },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="group py-7 border-b border-border/40 last:border-0"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ x: 6 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 md:py-32 px-5 md:px-8 bg-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-6">
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary font-semibold">Next Steps</span>
                <h2 className="text-3xl md:text-[2.75rem] font-medium text-background leading-[1.1]">
                  Ready to see your numbers?
                </h2>
                <p className="text-base text-background/60 max-w-lg mx-auto">
                  Get a custom ROI analysis for your organisation. Our team will walk you through the platform and show you exactly what NeuroState can deliver.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <Link to="/contact">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <a href="#calculator">
                    <Button size="lg" className="h-12 px-8 text-sm font-medium rounded-full bg-transparent border border-background/30 text-background hover:bg-background/10">
                      Use calculator
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
};

export default Industries;
