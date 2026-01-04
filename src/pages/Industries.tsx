import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ROICalculator } from "@/components/ROICalculator";
import { ArrowRight, Building2, Briefcase, Heart, Shield, FlaskConical, Cpu, TrendingUp, Users, Zap } from "lucide-react";
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
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "financial-services",
    name: "Financial Services",
    description: "Precision performance in high-stakes, regulated environments.",
    icon: TrendingUp,
    href: "/industries/financial-services",
    stats: { turnover: "13%", productivity: "14%" },
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: "professional-services",
    name: "Professional Services",
    description: "Protect billable capacity and retain top talent.",
    icon: Briefcase,
    href: "/industries/professional-services",
    stats: { turnover: "22%", productivity: "19%" },
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "healthcare",
    name: "Healthcare & Clinical",
    description: "Operational resilience for clinical teams under pressure.",
    icon: Heart,
    href: "/industries/healthcare",
    stats: { turnover: "19%", productivity: "16%" },
    color: "from-red-500/20 to-rose-500/20"
  },
  {
    id: "research-life-sciences",
    name: "Research & Life Sciences",
    description: "Sustain deep work and accelerate discovery cycles.",
    icon: FlaskConical,
    href: "/industries/research-life-sciences",
    stats: { turnover: "15%", productivity: "18%" },
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: "government-defence",
    name: "Government & Defence",
    description: "Mission-critical performance systems for complex operations.",
    icon: Shield,
    href: "/industries/government-defence",
    stats: { turnover: "11%", productivity: "13%" },
    color: "from-slate-500/20 to-zinc-500/20"
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
          {/* Hero Section */}
          <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="max-w-3xl">
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Industries</span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mt-3 mb-4">
                  Built for knowledge-intensive organisations
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                  Every industry has unique cognitive demands. NeuroState adapts to yours—with benchmarks, 
                  integrations, and ROI models tailored to your sector.
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* Industry Grid */}
          <section className="py-12 md:py-16 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {industries.map((industry, i) => (
                  <Link key={industry.id} to={industry.href}>
                    <motion.div
                      className={`group relative h-full p-5 rounded-xl bg-gradient-to-br ${industry.color} border border-border/30 hover:border-primary/40 transition-all duration-300 cursor-pointer overflow-hidden`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-background/50 to-transparent rounded-bl-full opacity-50" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg bg-background/80 flex items-center justify-center group-hover:bg-background transition-colors">
                            <industry.icon className="w-4 h-4 text-foreground" />
                          </div>
                        </div>
                        
                        <h3 className="text-sm font-medium text-foreground mb-1.5 group-hover:text-primary transition-colors">
                          {industry.name}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                          {industry.description}
                        </p>
                        
                        <div className="flex items-center gap-4 pt-3 border-t border-border/30">
                          <div>
                            <p className="text-sm font-medium text-foreground">{industry.stats.turnover}</p>
                            <p className="text-[10px] text-muted-foreground">Avg. turnover</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{industry.stats.productivity}</p>
                            <p className="text-[10px] text-muted-foreground">Productivity loss</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Explore</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="py-10 md:py-12 px-6 md:px-8 bg-foreground">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                {impactStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center md:text-left group cursor-default"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-2xl md:text-3xl font-light text-background mb-1 group-hover:text-primary transition-colors">{stat.value}</p>
                    <p className="text-xs text-background/80 font-medium">{stat.label}</p>
                    <p className="text-[10px] text-background/50 mt-0.5">{stat.sublabel}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ROI Calculator Section */}
          <section className="py-12 md:py-20 px-6 md:px-8" id="calculator">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-10">
                <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">ROI Calculator</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground mt-3 mb-4">
                  Calculate your hidden costs
                </h2>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  See what cognitive underperformance, burnout-related turnover, and preventable sick days 
                  are really costing your organisation—and what NeuroState can recover.
                </p>
              </ScrollReveal>

              <motion.div
                className="bg-background rounded-2xl border border-border/50 p-6 md:p-8 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ROICalculator />
              </motion.div>
            </div>
          </section>

          {/* Enterprise Features */}
          <section className="py-12 md:py-16 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <ScrollReveal className="space-y-5">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-primary font-medium">Enterprise Ready</span>
                  <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                    Built for scale
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-md">
                    NeuroState is designed for enterprise deployment with security, compliance, and integration capabilities that match your requirements.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 py-2">
                    {[
                      { icon: Shield, text: "SOC 2 Type II", detail: "Certified compliant" },
                      { icon: Building2, text: "SSO & SCIM", detail: "Enterprise auth" },
                      { icon: Zap, text: "40+ Integrations", detail: "Wearables & tools" },
                      { icon: Users, text: "Unlimited seats", detail: "Scale freely" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        className="p-3 rounded-xl bg-background/50 border border-border/30 hover:border-primary/30 transition-all group cursor-default"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -2, scale: 1.02 }}
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <p className="text-xs font-medium text-foreground">{item.text}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{item.detail}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link to="/contact">
                      <Button className="h-9 px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        Book a demo
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link to="/enterprise/overview">
                      <Button variant="outline" className="h-9 px-4 text-sm font-medium rounded-full">
                        Enterprise overview
                      </Button>
                    </Link>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.2}>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Data residency", options: "EU, US, UK, APAC" },
                      { label: "Uptime SLA", options: "99.9% guaranteed" },
                      { label: "Support", options: "24/7 dedicated" },
                      { label: "Onboarding", options: "White-glove service" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="p-4 rounded-xl bg-background border border-border/30 text-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.options}</p>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-12 md:py-16 px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Ready to see your numbers?
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Get a custom ROI analysis for your organisation. Our team will walk you through the platform and show you exactly what NeuroState can deliver.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <Link to="/contact">
                    <Button className="h-10 px-6 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Book a demo
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <a href="#calculator">
                    <Button variant="outline" className="h-10 px-6 text-sm font-medium rounded-full">
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
