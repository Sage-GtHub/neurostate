import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { ArrowRight, ArrowUpRight, Check, Cpu, TrendingUp, Heart, Sparkles, Trophy, Dumbbell, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { EnterpriseROICalculator } from "@/components/EnterpriseROICalculator";

const industries = [
  {
    id: "information-technology",
    title: "Information Technology",
    category: "Corporate",
    desc: "Cognitive performance infrastructure for technology organisations.",
    href: "/enterprise/information-technology/overview",
    icon: Cpu,
    stats: { primary: "47%", label: "Reduced burnout" },
    features: ["Team wellness monitoring", "Deep work optimisation", "High-pressure recovery"],
    color: "hsl(270, 100%, 55%)"
  },
  {
    id: "financial-services",
    title: "Financial Services",
    category: "Corporate",
    desc: "Peak cognitive performance for high-stakes teams.",
    href: "/enterprise/financial-services/overview",
    icon: TrendingUp,
    stats: { primary: "23%", label: "Performance uplift" },
    features: ["Cognitive load monitoring", "Peak performance windows", "Risk & stress management"],
    color: "hsl(220, 100%, 55%)"
  },
  {
    id: "healthcare",
    title: "Healthcare & Clinical",
    category: "Healthcare",
    desc: "AI-powered patient recovery and clinical wellness programmes.",
    href: "/enterprise/healthcare/overview",
    icon: Heart,
    stats: { primary: "40%", label: "Faster recovery" },
    features: ["Predictive recovery monitoring", "Cognitive rehabilitation", "Patient wellness"],
    color: "hsl(0, 70%, 55%)"
  },
  {
    id: "hospitality",
    title: "Hospitality & Spas",
    category: "Hospitality",
    desc: "Premium guest wellness experiences for luxury properties.",
    href: "/enterprise/hospitality/overview",
    icon: Sparkles,
    stats: { primary: "35%", label: "Revenue increase" },
    features: ["Personalised wellness journeys", "Sleep optimisation suites", "Recovery & rejuvenation"],
    color: "hsl(280, 70%, 55%)"
  },
  {
    id: "sports",
    title: "Sports & Athletics",
    category: "Performance",
    desc: "Cognitive optimisation for elite performers.",
    href: "/enterprise/sports/overview",
    icon: Trophy,
    stats: { primary: "2.1x", label: "Performance gain" },
    features: ["Reaction time training", "Decision speed optimisation", "Recovery protocols"],
    color: "hsl(45, 100%, 50%)"
  },
  {
    id: "health-clubs",
    title: "Health Clubs & Gyms",
    category: "Fitness",
    desc: "Member performance programmes for fitness facilities.",
    href: "/enterprise/health-clubs/overview",
    icon: Dumbbell,
    stats: { primary: "52%", label: "Member retention" },
    features: ["Member wellness tracking", "Premium offerings", "Outcome measurement"],
    color: "hsl(156, 65%, 45%)"
  }
];

const categories = ["All", "Corporate", "Healthcare", "Hospitality", "Performance", "Fitness"];

export default function EnterpriseOverview() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const filteredIndustries = activeFilter === "All" 
    ? industries 
    : industries.filter(ind => ind.category === activeFilter);

  const toggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(i => i !== id));
    } else if (selectedForCompare.length < 3) {
      setSelectedForCompare([...selectedForCompare, id]);
    }
  };

  const comparedIndustries = industries.filter(ind => selectedForCompare.includes(ind.id));

  return (
    <>
      <SEO 
        title="Enterprise Solutions | Neurostate"
        description="AI-powered cognitive performance infrastructure for organisations. Explore solutions for IT, Financial Services, Healthcare, Hospitality, Sports, and Health Clubs."
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.03]" />
            <motion.div 
              className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.08, 0.06] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 py-20 lg:py-28">
              <motion.div 
                className="max-w-3xl mx-auto text-center space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="inline-flex items-center gap-2 justify-center">
                  <motion.div 
                    className="w-1.5 h-1.5 bg-primary rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Human Performance OS</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-foreground tracking-tight">
                  The cognitive performance{" "}
                  <span className="text-primary">ecosystem.</span>
                </h1>
                
                <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  Invisible AI infrastructure advancing human performance through predictive intelligence. The operating system for cognitive excellence at enterprise scale.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <a href="https://calendly.com/neurostate/30min" target="_blank" rel="noopener noreferrer">
                    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button className="h-10 px-5 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        <span className="flex items-center">
                          Book a demo
                          <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </Button>
                    </motion.div>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Filter & Compare Controls */}
          <section className="py-8 px-6 md:px-8 border-b border-border/30">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Category Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground mr-1" />
                  {categories.map((cat) => (
                    <motion.button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-3 py-1.5 text-[10px] uppercase tracking-wider rounded-full transition-all duration-300 ${
                        activeFilter === cat 
                          ? "bg-foreground text-background" 
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>

                {/* Compare Toggle */}
                <motion.button
                  onClick={() => {
                    setCompareMode(!compareMode);
                    if (compareMode) setSelectedForCompare([]);
                  }}
                  className={`px-4 py-2 text-xs rounded-full border transition-all duration-300 ${
                    compareMode 
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "border-border text-muted-foreground hover:border-foreground/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {compareMode ? `Compare (${selectedForCompare.length}/3)` : "Compare industries"}
                </motion.button>
              </div>
            </div>
          </section>

          {/* Industries Grid */}
          <section className="py-16 md:py-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredIndustries.map((industry) => (
                    <StaggerItem key={industry.id}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        {compareMode && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => toggleCompare(industry.id)}
                            className={`absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                              selectedForCompare.includes(industry.id)
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted border border-border text-muted-foreground"
                            }`}
                          >
                            {selectedForCompare.includes(industry.id) ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <span className="text-[10px]">{selectedForCompare.length < 3 ? "+" : ""}</span>
                            )}
                          </motion.button>
                        )}

                        <Link to={industry.href} className={compareMode ? "pointer-events-none" : ""}>
                          <motion.div 
                            className={`group flow-card p-6 h-full transition-all duration-300 ${
                              selectedForCompare.includes(industry.id) ? "ring-2 ring-primary" : ""
                            }`}
                            whileHover={!compareMode ? { y: -4, scale: 1.01 } : {}}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div 
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: `${industry.color}15` }}
                              >
                                <industry.icon className="w-5 h-5" style={{ color: industry.color }} />
                              </div>
                              <span className="text-[9px] uppercase tracking-wider text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                                {industry.category}
                              </span>
                            </div>

                            <h3 className="text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                              {industry.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                              {industry.desc}
                            </p>

                            <div className="mb-4 pb-4 border-b border-border/30">
                              <p className="text-2xl font-medium text-foreground">{industry.stats.primary}</p>
                              <p className="text-[10px] text-muted-foreground">{industry.stats.label}</p>
                            </div>

                            <ul className="space-y-2">
                              {industry.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: industry.color }} />
                                  {feature}
                                </li>
                              ))}
                            </ul>

                            {!compareMode && (
                              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/30 text-xs font-medium text-foreground/60 group-hover:text-primary transition-colors">
                                Learn more
                                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </div>
                            )}
                          </motion.div>
                        </Link>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </AnimatePresence>
              </StaggerContainer>
            </div>
          </section>

          {/* Comparison Panel */}
          <AnimatePresence>
            {compareMode && selectedForCompare.length > 1 && (
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border z-50 py-6 px-6"
              >
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-foreground">Comparing {selectedForCompare.length} industries</h3>
                    <button 
                      onClick={() => { setCompareMode(false); setSelectedForCompare([]); }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {comparedIndustries.map((ind) => (
                      <div key={ind.id} className="p-4 rounded-xl bg-muted/30 border border-border/50">
                        <div className="flex items-center gap-2 mb-3">
                          <ind.icon className="w-4 h-4" style={{ color: ind.color }} />
                          <span className="text-xs font-medium text-foreground">{ind.title}</span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-lg font-medium text-foreground">{ind.stats.primary}</p>
                            <p className="text-[10px] text-muted-foreground">{ind.stats.label}</p>
                          </div>
                          <div className="pt-2 border-t border-border/30">
                            {ind.features.slice(0, 2).map((f, i) => (
                              <p key={i} className="text-[10px] text-muted-foreground">• {f}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-4">
                    <Link to="/contact">
                      <Button className="h-9 px-5 text-xs rounded-full bg-foreground text-background hover:bg-foreground/90">
                        Request comparison demo
                        <ArrowRight className="ml-2 w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* ROI Calculator Section */}
          <section className="py-20 md:py-28 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-12 space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">ROI Calculator</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Calculate your potential savings
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  See how NeuroState can deliver measurable returns for your organisation at founding pricing of £50/employee per month.
                </p>
              </ScrollReveal>

              <div className="max-w-xl mx-auto">
                <EnterpriseROICalculator variant="light" />
              </div>
            </div>
          </section>


          {/* Stats Section */}
          <section className="py-20 md:py-28 px-6 md:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal className="text-center mb-16 space-y-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Enterprise Impact</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground">
                  Measurable outcomes across industries
                </h2>
              </ScrollReveal>

              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { value: "47%", label: "Average burnout reduction" },
                  { value: "2.4x", label: "ROI within first year" },
                  { value: "89%", label: "Programme satisfaction" },
                  { value: "31%", label: "Productivity improvement" }
                ].map((stat, i) => (
                  <StaggerItem key={i}>
                    <motion.div 
                      className="text-center group"
                      whileHover={{ scale: 1.05, y: -4 }}
                    >
                      <p className="text-3xl md:text-4xl font-medium text-foreground group-hover:text-primary transition-colors">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">{stat.label}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 md:py-32 px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal>
                <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium">Get Started</span>
                <h2 className="text-2xl md:text-3xl font-normal text-foreground mt-4 mb-6">
                  Ready to transform your organisation?
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-8">
                  Schedule a consultation to discuss how Neurostate can be tailored to your industry's specific needs.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link to="/contact">
                    <Button className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Book enterprise demo
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </Link>
                  <a href="mailto:partnerships@neurostate.co.uk">
                    <Button variant="outline" className="h-11 px-6 text-xs font-medium rounded-full">
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
