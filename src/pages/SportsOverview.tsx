import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEO } from "@/components/SEO";
import { ArrowRight, ArrowUpRight, CheckCircle2, Target, Activity, Shield, Brain, Users, Calculator } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

export default function SportsOverview() {
  const hero = useScrollAnimation();
  const problem = useScrollAnimation();
  const outcomes = useScrollAnimation();
  const value = useScrollAnimation();
  const included = useScrollAnimation();
  const form = useScrollAnimation();
  
  // ROI Calculator State
  const [employees, setEmployees] = useState<string>("25");
  const [avgSalary, setAvgSalary] = useState<string>("150000");
  const [sickDays, setSickDays] = useState<string>("15");
  const [industry, setIndustry] = useState<string>("football");
  
  const roiCalculation = useMemo(() => {
    const empCount = parseInt(employees) || 0;
    const salary = parseInt(avgSalary) || 0;
    const days = parseInt(sickDays) || 0;
    
    const dailyCost = salary / 260;
    const currentSickCost = empCount * days * dailyCost;
    const productivityLoss = empCount * salary * 0.20; // 20% productivity loss from injuries
    const totalCurrentCost = currentSickCost + productivityLoss;
    
    const sickDayReduction = 0.41; // 41% injury reduction
    const productivityGain = 0.23; // 23% performance improvement
    
    const sickDaySavings = currentSickCost * sickDayReduction;
    const productivitySavings = productivityLoss * productivityGain;
    const totalSavings = sickDaySavings + productivitySavings;
    
    const investmentCost = empCount * 1800; // Higher investment for elite athletes
    const netROI = totalSavings - investmentCost;
    const roiMultiple = investmentCost > 0 ? totalSavings / investmentCost : 0;
    
    return {
      currentSickCost: Math.round(currentSickCost),
      productivityLoss: Math.round(productivityLoss),
      totalCurrentCost: Math.round(totalCurrentCost),
      sickDaySavings: Math.round(sickDaySavings),
      productivitySavings: Math.round(productivitySavings),
      totalSavings: Math.round(totalSavings),
      investmentCost: Math.round(investmentCost),
      netROI: Math.round(netROI),
      roiMultiple: roiMultiple.toFixed(1)
    };
  }, [employees, avgSalary, sickDays, industry]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(value);
  };
  
  const [formData, setFormData] = useState({ name: "", email: "", organisation: "", athletes: "", goals: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log("Partnership demo request:", formData); };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO 
        title="Sports Performance | NeuroState for Athletes & Teams"
        description="Help athletes recover faster, avoid injuries, and perform better on game day. NeuroState tracks health data from wearables and gives coaches clear, actionable plans."
        keywords="sports performance, athlete recovery, injury prevention, sports technology, athletic performance, team sports health"
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
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-medium">Football · Rugby · Athletics · Cycling</p>
                <h1 className="text-4xl sm:text-5xl font-light text-foreground leading-[1.1]">
                  Keep athletes healthy.
                  <br />
                  <span className="text-muted-foreground">Keep them performing.</span>
                </h1>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                  Performance is not just physical. We track sleep, stress, and recovery data from wearables, then give coaches and athletes clear plans to stay healthy and play better.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={scrollToContact} className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                      Talk to our sports team
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
                      <label className="text-[10px] text-background/60 uppercase tracking-wider mb-1.5 block">Squad Size</label>
                      <Input 
                        type="number" 
                        value={employees} 
                        onChange={(e) => setEmployees(e.target.value)}
                        className="bg-background/10 border-background/20 text-background h-10 text-sm rounded-xl"
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-background/60 uppercase tracking-wider mb-1.5 block">Avg. Value (£)</label>
                      <Input 
                        type="number" 
                        value={avgSalary} 
                        onChange={(e) => setAvgSalary(e.target.value)}
                        className="bg-background/10 border-background/20 text-background h-10 text-sm rounded-xl"
                        placeholder="150000"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-background/60 uppercase tracking-wider mb-1.5 block">Injury Days/Year</label>
                      <Input 
                        type="number" 
                        value={sickDays} 
                        onChange={(e) => setSickDays(e.target.value)}
                        className="bg-background/10 border-background/20 text-background h-10 text-sm rounded-xl"
                        placeholder="15"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-background/60 uppercase tracking-wider mb-1.5 block">Sport</label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger className="bg-background/10 border-background/20 text-background h-10 text-sm rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="football">Football</SelectItem>
                          <SelectItem value="rugby">Rugby</SelectItem>
                          <SelectItem value="athletics">Athletics</SelectItem>
                          <SelectItem value="cycling">Cycling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-background/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-background/60">Current annual cost</span>
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
                  Most teams only react after injuries happen.
                  <br />
                  <span className="text-muted-foreground">By then, the damage is done.</span>
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Training adjustments come too late", desc: "Loads get changed after fatigue shows up. By then, performance has already dropped." },
                  { title: "Stress and sleep get ignored", desc: "Physical data alone misses the full picture. Mental load, sleep quality, and stress all affect how athletes perform." },
                  { title: "Recovery is one-size-fits-all", desc: "Every athlete is different, but most recovery plans treat them the same. That means slower comebacks." }
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

        {/* What Athletes Get */}
        <section ref={outcomes.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${outcomes.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">The Solution</p>
              <h2 className="text-3xl font-light text-foreground">
                What athletes and coaches get.
                <br />
                <span className="text-muted-foreground">Clear tools, real results.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                NeuroState sits on top of the wearables your athletes already use. It reads the data, spots risks, and tells you what to do about it.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { 
                  icon: Brain, 
                  title: "Personal AI Coach", 
                  description: "Every athlete gets a personalised plan based on their training, sleep, and recovery. Available 24/7 through the app.",
                  highlight: "Always on"
                },
                { 
                  icon: Activity, 
                  title: "Faster Recovery", 
                  description: "Red light therapy, supplements, and sleep plans built specifically for each athlete's recovery needs.",
                  highlight: "Tailored recovery"
                },
                { 
                  icon: Shield, 
                  title: "Injury Prevention", 
                  description: "Spot warning signs early from wearable data. Adjust training before small issues become big injuries.",
                  highlight: "Early warning"
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

        {/* Value Protection */}
        <section ref={value.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${value.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Protect Your Players</p>
                <h2 className="text-3xl font-light text-foreground">
                  Every injury costs you time, money, and results.
                  <br />
                  <span className="text-muted-foreground">We help you prevent them.</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Keep athletes on the pitch and performing at their best. NeuroState spots problems early so you can act before injuries happen.
                </p>
                <div className="space-y-3">
                  {[
                    "41% reduction in soft tissue injuries",
                    "38% faster return to play times",
                    "Predictive load management",
                    "Competition readiness forecasting"
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
                  Example: 25 Athlete Squad
                </h3>
                <div className="space-y-4 text-xs">
                  {[
                    { label: "Squad Size", value: "25 athletes" },
                    { label: "Average Player Value", value: "£5M" },
                    { label: "Injury Prevention (41%)", value: "£2.05M protected", accent: true },
                    { label: "Annual Investment", value: "£45K" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between pb-3 border-b border-background/10">
                      <span className="text-background/60">{item.label}</span>
                      <span className={item.accent ? "text-accent font-medium" : "text-background font-medium"}>{item.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3">
                    <span className="text-background font-medium">Value Protected</span>
                    <span className="text-accent text-xl font-medium">£2.0M+</span>
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
                Full performance stack.
                <br />
                <span className="text-muted-foreground">We handle the complexity.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Nova AI for all athletes",
                "Team analytics dashboard", 
                "Staff training programme",
                "Recovery device protocols",
                "Supplement recommendations",
                "Competition readiness tools"
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
                <h2 className="text-xl font-light text-foreground">Let us explore whether NeuroState fits your organisation</h2>
                <p className="text-xs text-muted-foreground">We respond within 24 hours. Pilot programmes available.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                  <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Organisation name" value={formData.organisation} onChange={(e) => setFormData({...formData, organisation: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                  <Input placeholder="Number of athletes" value={formData.athletes} onChange={(e) => setFormData({...formData, athletes: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                </div>
                <Textarea placeholder="What are your performance goals?" value={formData.goals} onChange={(e) => setFormData({...formData, goals: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 text-xs min-h-[100px]" />
                <Button type="submit" className="w-full rounded-full h-11 text-xs bg-foreground text-background hover:bg-foreground/90">
                  Talk to Sports Team <ArrowRight className="ml-2 w-3.5 h-3.5" />
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