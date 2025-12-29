import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEO } from "@/components/SEO";
import { ArrowRight, ArrowUpRight, CheckCircle2, Cpu, Brain, Shield, Target, Users, Calculator } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

export default function InformationTechnologyOverview() {
  const hero = useScrollAnimation();
  const problem = useScrollAnimation();
  const outcomes = useScrollAnimation();
  const impact = useScrollAnimation();
  const included = useScrollAnimation();
  const form = useScrollAnimation();
  
  // ROI Calculator State
  const [employees, setEmployees] = useState<string>("50");
  const [avgSalary, setAvgSalary] = useState<string>("65000");
  const [sickDays, setSickDays] = useState<string>("7");
  const [industry, setIndustry] = useState<string>("saas");
  
  const roiCalculation = useMemo(() => {
    const empCount = parseInt(employees) || 0;
    const salary = parseInt(avgSalary) || 0;
    const days = parseInt(sickDays) || 0;
    
    const dailyCost = salary / 260; // Working days per year
    const currentSickCost = empCount * days * dailyCost;
    const burnoutCost = empCount * salary * 0.18; // 18% productivity loss from burnout/fatigue
    const turnoverCost = empCount * salary * 0.08; // 8% turnover cost
    const totalCurrentCost = currentSickCost + burnoutCost + turnoverCost;
    
    // Neurostate improvements
    const sickDayReduction = 0.40; // 40% reduction
    const burnoutReduction = 0.47; // 47% reduction
    const turnoverReduction = 0.35; // 35% reduction
    
    const sickDaySavings = currentSickCost * sickDayReduction;
    const burnoutSavings = burnoutCost * burnoutReduction;
    const turnoverSavings = turnoverCost * turnoverReduction;
    const totalSavings = sickDaySavings + burnoutSavings + turnoverSavings;
    
    const investmentCost = empCount * 380; // £380 per employee per year
    const netROI = totalSavings - investmentCost;
    const roiMultiple = investmentCost > 0 ? totalSavings / investmentCost : 0;
    
    return {
      currentSickCost: Math.round(currentSickCost),
      burnoutCost: Math.round(burnoutCost),
      totalCurrentCost: Math.round(totalCurrentCost),
      sickDaySavings: Math.round(sickDaySavings),
      burnoutSavings: Math.round(burnoutSavings),
      turnoverSavings: Math.round(turnoverSavings),
      totalSavings: Math.round(totalSavings),
      investmentCost: Math.round(investmentCost),
      netROI: Math.round(netROI),
      roiMultiple: roiMultiple.toFixed(1)
    };
  }, [employees, avgSalary, sickDays, industry]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(value);
  };
  
  const [formData, setFormData] = useState({ name: "", email: "", organisation: "", team: "", goals: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log("Partnership demo request:", formData); };

  return (
    <>
      <SEO 
        title="Cognitive Performance for Technology Teams | Neurostate"
        description="AI-powered cognitive infrastructure for tech companies. Reduce burnout, improve productivity, and retain top talent across engineering, product, and leadership teams."
      />
      
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <Header />
        
        {/* Hero - ROI Calculator */}
        <section ref={hero.ref} className={`relative pt-32 sm:pt-40 pb-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${hero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-medium">SaaS · Enterprise · Startups · Agencies</p>
                <h1 className="text-4xl sm:text-5xl font-light text-foreground leading-[1.1]">
                  Tech runs on people.
                  <br />
                  <span className="text-muted-foreground">People run on cognitive capacity.</span>
                </h1>
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                  Burnout isn't a badge of honour — it's a business liability. Neurostate predicts cognitive strain, optimises focus windows, and keeps your best people performing sustainably.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href="https://calendly.com/neurostate/30min" target="_blank" rel="noopener noreferrer">
                    <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button className="h-11 px-6 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
                        Request team demo
                        <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Button>
                    </motion.div>
                  </a>
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
                      <label className="text-[10px] text-background/60 uppercase tracking-wider mb-1.5 block">Employees</label>
                      <Input 
                        type="number" 
                        value={employees} 
                        onChange={(e) => setEmployees(e.target.value)}
                        className="bg-background/10 border-background/20 text-background h-10 text-sm rounded-xl"
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-background/60 uppercase tracking-wider mb-1.5 block">Avg. Salary (£)</label>
                      <Input 
                        type="number" 
                        value={avgSalary} 
                        onChange={(e) => setAvgSalary(e.target.value)}
                        className="bg-background/10 border-background/20 text-background h-10 text-sm rounded-xl"
                        placeholder="65000"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-background/60 uppercase tracking-wider mb-1.5 block">Sick Days/Year</label>
                      <Input 
                        type="number" 
                        value={sickDays} 
                        onChange={(e) => setSickDays(e.target.value)}
                        className="bg-background/10 border-background/20 text-background h-10 text-sm rounded-xl"
                        placeholder="7"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-background/60 uppercase tracking-wider mb-1.5 block">Industry</label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger className="bg-background/10 border-background/20 text-background h-10 text-sm rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saas">SaaS</SelectItem>
                          <SelectItem value="enterprise">Enterprise Software</SelectItem>
                          <SelectItem value="startup">Startup</SelectItem>
                          <SelectItem value="agency">Agency</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-background/10 pt-5 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-background/60">Current hidden costs</span>
                    <span className="text-background/80">{formatCurrency(roiCalculation.totalCurrentCost)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-background/60">Sick day savings (40%)</span>
                    <span className="text-accent">{formatCurrency(roiCalculation.sickDaySavings)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-background/60">Burnout reduction (47%)</span>
                    <span className="text-accent">{formatCurrency(roiCalculation.burnoutSavings)}</span>
                  </div>
                  <div className="flex justify-between text-xs pb-3 border-b border-background/10">
                    <span className="text-background/60">Annual investment</span>
                    <span className="text-background/80">-{formatCurrency(roiCalculation.investmentCost)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <span className="text-xs text-background/60 block">Net Annual ROI</span>
                      <span className="text-2xl font-light text-accent">{formatCurrency(roiCalculation.netROI)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-background/60 block">ROI Multiple</span>
                      <span className="text-xl font-medium text-background">{roiCalculation.roiMultiple}x</span>
                    </div>
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
                  Your best performers are burning out.
                  <br />
                  <span className="text-muted-foreground">Quietly. Invisibly. Expensively.</span>
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Silent burnout", desc: "High performers don't complain — they just leave. By the time burnout is visible, it's too late to intervene." },
                  { title: "Deep work destruction", desc: "Meetings, notifications, and context-switching fragment focus. Complex problem-solving requires sustained cognitive capacity." },
                  { title: "Retention crisis", desc: "Replacing a senior employee costs 6-12 months salary. The institutional knowledge loss is immeasurable." }
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

        {/* Solutions */}
        <section ref={outcomes.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${outcomes.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">The Solution</p>
              <h2 className="text-3xl font-light text-foreground">
                Performance infrastructure.
                <br />
                <span className="text-muted-foreground">For sustainable velocity.</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                Neurostate operates as a cognitive layer across your organisation — predicting burnout, protecting deep work, and keeping your best people performing at their peak.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { 
                  icon: Brain, 
                  title: "Burnout Prediction", 
                  description: "Real-time tracking of cognitive load and burnout risk across all teams. Early warning before performance drops.",
                  highlight: "Predictive intelligence"
                },
                { 
                  icon: Target, 
                  title: "Deep Work Optimisation", 
                  description: "AI-predicted optimal windows for complex work, protected calendar time, and focus session recommendations.",
                  highlight: "Focus protection"
                },
                { 
                  icon: Shield, 
                  title: "Recovery Systems", 
                  description: "Automated recovery support during high-pressure periods. Evidence-based protocols for sustainable performance.",
                  highlight: "Proactive recovery"
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

        {/* Impact */}
        <section ref={impact.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${impact.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Business Impact</p>
                <h2 className="text-3xl font-light text-foreground">
                  This isn't perks.
                  <br />
                  <span className="text-muted-foreground">It's performance infrastructure.</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sustainable high performance isn't about working harder — it's about working smarter. Neurostate gives your team the cognitive edge to ship faster, think clearer, and stay longer.
                </p>
                <div className="space-y-3">
                  {[
                    "47% reduction in burnout indicators",
                    "31% improvement in deep work hours",
                    "35% reduction in voluntary turnover",
                    "2.4x ROI within first year"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-xs text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "-47%", label: "Burnout", desc: "Risk reduction" },
                  { stat: "+31%", label: "Deep Work", desc: "Focus hours" },
                  { stat: "89%", label: "Retention", desc: "Annual rate" },
                  { stat: "2.4x", label: "ROI", desc: "Year one" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="p-5 rounded-2xl bg-foreground/[0.03] border border-border/30 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={impact.isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <p className="text-2xl font-light text-primary mb-1">{item.stat}</p>
                    <p className="text-xs font-medium text-foreground mb-0.5">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section ref={included.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${included.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Team Partnership</p>
              <h2 className="text-3xl font-light text-foreground">
                Simple deployment.
                <br />
                <span className="text-muted-foreground">We handle the complexity.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Nova AI for all team members",
                "Slack & Teams integration", 
                "Team analytics dashboard",
                "Leadership training",
                "Dedicated success manager",
                "Calendar protection tools"
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
        <section ref={form.ref} className={`py-20 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${form.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-lg mx-auto">
            <div className="border border-border/30 rounded-3xl p-8 sm:p-10 space-y-6 bg-foreground/[0.01]">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-light text-foreground">Let's explore whether Neurostate fits your team</h2>
                <p className="text-xs text-muted-foreground">We respond within 24 hours. Pilot programmes available.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                  <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Company" value={formData.organisation} onChange={(e) => setFormData({...formData, organisation: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                  <Input placeholder="Team size" value={formData.team} onChange={(e) => setFormData({...formData, team: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 h-11 text-xs" />
                </div>
                <Textarea placeholder="What challenges are you looking to address?" value={formData.goals} onChange={(e) => setFormData({...formData, goals: e.target.value})} className="rounded-xl bg-foreground/[0.02] border-border/30 text-xs min-h-[100px]" />
                <Button type="submit" className="w-full rounded-full h-11 text-xs bg-foreground text-background hover:bg-foreground/90">
                  Request Team Demo <ArrowRight className="ml-2 w-3.5 h-3.5" />
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