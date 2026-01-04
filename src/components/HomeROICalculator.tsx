import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, ArrowRight, TrendingUp, Users, Clock, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Industry-specific benchmarks from user requirements
const industryBenchmarks = {
  "saas-high-growth": {
    name: "SaaS – High Growth",
    turnover: 0.18,
    productivity: 0.17,
    avgSalary: 75000,
    description: "Hypergrowth environments with high cognitive demands"
  },
  "saas-enterprise": {
    name: "SaaS – Enterprise",
    turnover: 0.15,
    productivity: 0.15,
    avgSalary: 85000,
    description: "Scaled software organisations requiring sustained performance"
  },
  "financial-services": {
    name: "Financial Services",
    turnover: 0.13,
    productivity: 0.14,
    avgSalary: 95000,
    description: "High-stakes trading and investment teams"
  },
  "professional-services": {
    name: "Professional Services",
    turnover: 0.22,
    productivity: 0.19,
    avgSalary: 80000,
    description: "Consulting and advisory firms with billable capacity"
  },
  "healthcare": {
    name: "Healthcare",
    turnover: 0.19,
    productivity: 0.16,
    avgSalary: 60000,
    description: "Clinical teams under operational pressure"
  },
  "government-defence": {
    name: "Government / Defence",
    turnover: 0.11,
    productivity: 0.13,
    avgSalary: 70000,
    description: "Mission-critical operations requiring resilience"
  },
  "advanced-technology": {
    name: "Tech – Hardware/Other",
    turnover: 0.20,
    productivity: 0.18,
    avgSalary: 78000,
    description: "Deep tech and hardware development teams"
  }
};

type IndustryKey = keyof typeof industryBenchmarks;

export function HomeROICalculator() {
  const [teamSize, setTeamSize] = useState([100]);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>("saas-high-growth");
  
  const employees = teamSize[0];
  const industry = industryBenchmarks[selectedIndustry];
  const sickDays = 7;
  const improvement = 0.25;
  
  // Calculate costs using industry-specific benchmarks
  const calculations = useMemo(() => {
    const underperformanceCost = employees * industry.avgSalary * industry.productivity;
    const turnoverCost = employees * industry.turnover * (industry.avgSalary * 0.5);
    const dailyCost = industry.avgSalary / 260;
    const sickDaysCost = employees * dailyCost * sickDays;
    const totalHiddenCosts = underperformanceCost + turnoverCost + sickDaysCost;
    
    const investment = employees * 19 * 12;
    const year1Recovery = totalHiddenCosts * improvement;
    const netGain = year1Recovery - investment;
    const roiMultiple = investment > 0 ? year1Recovery / investment : 0;
    const paybackMonths = year1Recovery > 0 ? Math.min(12, Math.max(1, 12 * (investment / year1Recovery))) : 12;
    
    return {
      totalHiddenCosts,
      investment,
      year1Recovery,
      netGain,
      roiMultiple,
      paybackMonths
    };
  }, [employees, industry]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${Math.round(value * 100)}%`;
  };

  return (
    <motion.div 
      className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
            <Calculator className="w-3.5 h-3.5 text-primary" />
          </div>
          <p className="text-foreground font-medium text-xs">ROI Calculator</p>
        </div>
        <Select value={selectedIndustry} onValueChange={(val) => setSelectedIndustry(val as IndustryKey)}>
          <SelectTrigger className="w-[140px] h-7 text-[10px] bg-background/60 border-primary/20 rounded-lg">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(industryBenchmarks).map(([key, value]) => (
              <SelectItem key={key} value={key} className="text-xs">
                {value.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Compact Controls Row */}
      <div className="flex items-center gap-3 mb-4 p-2.5 rounded-lg bg-background/40 border border-primary/10">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground whitespace-nowrap">
          <Users className="w-3 h-3" />
          <span>{employees}</span>
        </div>
        <Slider
          value={teamSize}
          onValueChange={setTeamSize}
          min={10}
          max={500}
          step={10}
          className="flex-1"
        />
        <div className="flex gap-2 text-[9px] text-muted-foreground">
          <span>{formatPercentage(industry.turnover)} turnover</span>
          <span>•</span>
          <span>{formatPercentage(industry.productivity)} loss</span>
        </div>
      </div>

      {/* Results Row */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        <motion.div 
          className="p-2 rounded-lg bg-background/60 text-center"
          key={`roi-${calculations.roiMultiple.toFixed(1)}`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <p className="text-base font-medium text-primary">{calculations.roiMultiple.toFixed(1)}x</p>
          <p className="text-[8px] text-muted-foreground uppercase">ROI</p>
        </motion.div>
        <motion.div 
          className="p-2 rounded-lg bg-background/60 text-center"
          key={`payback-${Math.round(calculations.paybackMonths)}`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <p className="text-base font-medium text-foreground">{Math.round(calculations.paybackMonths)}mo</p>
          <p className="text-[8px] text-muted-foreground uppercase">Payback</p>
        </motion.div>
        <motion.div 
          className="p-2 rounded-lg bg-background/60 text-center"
          key={`recovery-${Math.round(calculations.year1Recovery / 1000)}`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <p className="text-base font-medium text-primary">£{Math.round(calculations.year1Recovery / 1000)}k</p>
          <p className="text-[8px] text-muted-foreground uppercase">Recovery</p>
        </motion.div>
        <motion.div 
          className="p-2 rounded-lg bg-primary/10 text-center"
          key={`net-${Math.round(calculations.netGain / 1000)}`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <p className="text-base font-medium text-primary">£{Math.round(calculations.netGain / 1000)}k</p>
          <p className="text-[8px] text-muted-foreground uppercase">Net Gain</p>
        </motion.div>
      </div>

      <Link to="/industries#calculator" className="block">
        <Button className="w-full h-8 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
          Full analysis
          <ArrowRight className="ml-1.5 w-3 h-3 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </motion.div>
  );
}
