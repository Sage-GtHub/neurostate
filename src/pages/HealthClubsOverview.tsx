import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEO } from "@/components/SEO";
import { ArrowRight, ArrowUpRight, CheckCircle2, TrendingUp, Target, Zap, Brain, Activity, Users, Calculator } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

export default function HealthClubsOverview() {
  const hero = useScrollAnimation();
  const problem = useScrollAnimation();
  const outcomes = useScrollAnimation();
  const revenue = useScrollAnimation();
  const included = useScrollAnimation();
  const form = useScrollAnimation();
  
  // ROI Calculator State
  const [employees, setEmployees] = useState<string>("500");
  const [avgSalary, setAvgSalary] = useState<string>("1200");
  const [sickDays, setSickDays] = useState<string>("8");
  const [industry, setIndustry] = useState<string>("gym");
  
  const roiCalculation = useMemo(() => {
    const memberCount = parseInt(employees) || 0;
    const memberValue = parseInt(avgSalary) || 0; // This is member lifetime value
    const churnRate = parseInt(sickDays) || 0; // This is churn percentage
    
    const currentChurnLoss = memberCount * (churnRate / 100) * memberValue;
    const revenueGap = memberCount * memberValue * 0.15; // 15% potential revenue increase
    const totalCurrentCost = currentChurnLoss + revenueGap;
    
    const churnReduction = 0.34; // 34% retention improvement
    const revenueGain = 0.28; // 28% revenue per member
    
    const churnSavings = currentChurnLoss * churnReduction;
    const revenueSavings = revenueGap * revenueGain;
    const totalSavings = churnSavings + revenueSavings;
    
    const investmentCost = memberCount * 24; // £24 per member per year
    const netROI = totalSavings - investmentCost;
    const roiMultiple = investmentCost > 0 ? totalSavings / investmentCost : 0;
    
    return {
      currentSickCost: Math.round(currentChurnLoss),
      productivityLoss: Math.round(revenueGap),
      totalCurrentCost: Math.round(totalCurrentCost),
      sickDaySavings: Math.round(churnSavings),
      productivitySavings: Math.round(revenueSavings),
      totalSavings: Math.round(totalSavings),
      investmentCost: Math.round(investmentCost),
      netROI: Math.round(netROI),
      roiMultiple: roiMultiple.toFixed(1)
    };
  }, [employees, avgSalary, sickDays, industry]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(value);
  };
  
  const [formData, setFormData] = useState({ name: "", email: "", facility: "", members: "", goals: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log("Partnership demo request:", formData); };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO 
        title="Cognitive Performance for Health Clubs and Gyms | Neurostate"
        description="Transform your fitness facility with AI driven cognitive analytics. Measure what matters. Deliver measurable results. Retain more members."
      />
      
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <Header />
        
        {/* Hero with ROI Calculator */}
        <section ref={hero.ref} className={`relative pt-32 sm:pt-40 pb-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-medium">Health Clubs · Gyms · Studios</p>
                <h1 className="text-4xl sm:text-5xl font-light text-foreground leading-[1.1]">
                  Your members train their bodies.
                  <br />
                  <span className="text-muted-foreground">Now train their minds.</span>
                </h1>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                  Most fitness facilities measure reps and sets. You will measure readiness, recovery, and cognitive load — then act on it before members drop off.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={scrollToContact} className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Book a demo
                      <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              {/* ROI Calculator */}
              <motion.div 
                className="p-6 sm:p-8 rounded-3xl bg-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={hero.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-background">ROI Calculator</h3>
                    <p className="text-[10px] text-background/60">Calculate your potential savings</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-background/60 uppercase tracking-wider mb-1.5 block">Members</label>
                      <Input 
                        type="number" 
                        value={employees} 
                        onChange={(e) => setEmployees(e.target.value)}
                        className="bg-background/10 border-background/20 text-background h-10 text-sm rounded-xl"
                        placeholder="500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-background/60 uppercase tracking-wider mb-1.5 block">Lifetime Value (£)</label>
                      <Input 
                        type="number" 
                        value={avgSalary} 
                        onChange={(e) => setAvgSalary(e.target.value)}
                        className="bg-background/10 border-background/20 text-background h-10 text-sm rounded-xl"
                        placeholder="1200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-background/60 uppercase tracking-wider mb-1.5 block">Churn Rate (%)</label>
                      <Input 
                        type="number" 
                        value={sickDays} 
                        onChange={(e) => setSickDays(e.target.value)}
                        className="bg-background/10 border-background/20 text-background h-10 text-sm rounded-xl"
                        placeholder="8"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-background/60 uppercase tracking-wider mb-1.5 block">Facility Type</label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger className="bg-background/10 border-background/20 text-background h-10 text-sm rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gym">Gym</SelectItem>
                          <SelectItem value="health-club">Health Club</SelectItem>
                          <SelectItem value="studio">Boutique Studio</SelectItem>
                          <SelectItem value="crossfit">CrossFit Box</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-background/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-background/60">Current annual loss</span>
                    <span className="text-background font-medium">{formatCurrency(roiCalculation.totalCurrentCost)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-background/60">Projected savings</span>
                    <span className="text-accent font-medium">{formatCurrency(roiCalculation.totalSavings)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-background/60">Investment</span>
                    <span className="text-background font-medium">{formatCurrency(roiCalculation.investmentCost)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-background/10">
                    <span className="text-background font-medium text-sm">Net Annual ROI</span>
                    <span className="text-accent text-xl font-medium">{formatCurrency(roiCalculation.netROI)}</span>
                  </div>
                  <div className="text-center pt-2">
                    <span className="text-[10px] text-accent">{roiCalculation.roiMultiple}x return on investment</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section ref={problem.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${problem.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">The Problem</p>
                <h2 className="text-3xl font-light text-foreground">
                  Members do not quit because of your equipment.
                  <br />
                  <span className="text-muted-foreground">They quit because they stop seeing results.</span>
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Invisible churn signals", desc: "Fatigue and stress build before members cancel. You only see the end result." },
                  { title: "Generic programming", desc: "One size fits all does not work. Members need personalised guidance based on their actual readiness." },
                  { title: "No outcome measurement", desc: "You track attendance. But can you prove cognitive and performance improvement?" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="p-5 rounded-2xl bg-foreground/[0.02] border border-border/20"
                    initial={{ opacity: 0, x: 20 }}
                    animate={problem.isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <h3 className="text-sm font-medium text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What Members Get */}
        <section ref={outcomes.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${outcomes.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">The Solution</p>
              <h2 className="text-3xl font-light text-foreground">
                Cognitive infrastructure.
                <br />
                <span className="text-muted-foreground">For every member.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                Neurostate integrates seamlessly into your facility, giving members AI powered guidance and giving you data that actually matters.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { 
                  icon: Brain, 
                  title: "Nova AI Coach", 
                  description: "Personal cognitive optimisation via app. 24/7 guidance tailored to each member's biometrics and goals.",
                  highlight: "Personalised protocols"
                },
                { 
                  icon: Activity, 
                  title: "Readiness Scoring", 
                  description: "Daily cognitive readiness scores based on sleep, HRV, and recovery. Members know when to push and when to rest.",
                  highlight: "Real time adaptation"
                },
                { 
                  icon: TrendingUp, 
                  title: "Outcome Tracking", 
                  description: "Visual metrics showing cognitive improvement, focus gains, and recovery trends. Proof your facility delivers results.",
                  highlight: "Measurable results"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="group p-6 rounded-2xl bg-foreground/[0.02] border border-border/20 hover:bg-foreground hover:border-foreground transition-all duration-500"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-background/10 transition-colors">
                      <item.icon className="w-5 h-5 text-primary group-hover:text-background transition-colors" />
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-primary group-hover:text-accent transition-colors">{item.highlight}</span>
                  </div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-background mb-2 transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-background/70 leading-relaxed transition-colors">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Revenue Impact */}
        <section ref={revenue.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${revenue.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Revenue Impact</p>
                <h2 className="text-3xl font-light text-foreground">
                  This is not wellness theatre.
                  <br />
                  <span className="text-muted-foreground">It is performance infrastructure.</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Neurostate creates new premium service opportunities. Members pay more, stay longer, and refer others. This is the differentiation your facility needs.
                </p>
                <div className="space-y-3">
                  {[
                    "20 to 40% product discounts for members",
                    "Premium tier differentiation",
                    "Reduced churn from early intervention",
                    "Data driven member success stories"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.div 
                className="p-8 rounded-3xl bg-foreground"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-sm font-medium text-background mb-6 flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  Example: 500 Member Facility
                </h3>
                <div className="space-y-4 text-xs">
                  {[
                    { label: "Current Members", value: "500" },
                    { label: "Average Lifetime Value", value: "£1,200" },
                    { label: "Retention Improvement (34%)", value: "£204K saved", accent: true },
                    { label: "Premium Revenue (28%)", value: "£168K new", accent: true },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between pb-3 border-b border-background/10">
                      <span className="text-background/60">{item.label}</span>
                      <span className={item.accent ? "text-accent font-medium" : "text-background font-medium"}>{item.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3">
                    <span className="text-background font-medium">Net Annual Gain</span>
                    <span className="text-accent text-xl font-medium">£342K+</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section ref={included.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${included.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Partnership Includes</p>
              <h2 className="text-3xl font-light text-foreground">
                Simple deployment.
                <br />
                <span className="text-muted-foreground">We handle the complexity.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Nova AI for all members",
                "Facility analytics dashboard", 
                "Staff training programme",
                "Marketing materials and assets",
                "Dedicated account support",
                "Member product discounts"
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3 p-5 rounded-2xl bg-foreground/[0.02] border border-border/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={included.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-section" ref={form.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${form.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-lg mx-auto">
            <div className="border border-border/30 rounded-3xl p-8 sm:p-10 space-y-6 bg-foreground/[0.01]">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-light text-foreground">Let us explore whether Neurostate fits your facility</h2>
                <p className="text-xs text-muted-foreground">We respond within 24 hours. No pressure, no jargon — just answers.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                  <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Facility name" value={formData.facility} onChange={(e) => setFormData({...formData, facility: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                  <Input placeholder="Number of members" value={formData.members} onChange={(e) => setFormData({...formData, members: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                </div>
                <Textarea placeholder="What are your goals for member performance?" value={formData.goals} onChange={(e) => setFormData({...formData, goals: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 text-xs min-h-[100px]" />
                <Button type="submit" className="w-full rounded-full h-11 text-xs bg-foreground text-background hover:bg-foreground/90">
                  Request Demo <ArrowRight className="ml-2 w-3.5 h-3.5" />
                </Button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}