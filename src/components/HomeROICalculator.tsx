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
      className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
          <Calculator className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-foreground font-medium text-sm">Quick ROI Calculator</p>
          <p className="text-muted-foreground text-xs">Select industry & team size</p>
        </div>
      </div>

      {/* Industry Selector */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground uppercase tracking-wide">Industry</span>
        </div>
        <Select value={selectedIndustry} onValueChange={(val) => setSelectedIndustry(val as IndustryKey)}>
          <SelectTrigger className="w-full h-9 text-xs bg-background/60 border-primary/20 rounded-lg">
            <SelectValue placeholder="Select industry" />
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

      {/* Industry Benchmarks Display */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedIndustry}
          className="grid grid-cols-2 gap-2 mb-5 p-3 rounded-lg bg-background/40 border border-primary/10"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center">
            <p className="text-lg font-medium text-primary">{formatPercentage(industry.turnover)}</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Avg. Turnover</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-primary">{formatPercentage(industry.productivity)}</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Productivity Loss</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Team Size Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">Team Size</span>
          <span className="text-lg font-medium text-foreground">{employees} people</span>
        </div>
        <Slider
          value={teamSize}
          onValueChange={setTeamSize}
          min={10}
          max={5000}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>10</span>
          <span>2,500</span>
          <span>5,000</span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <motion.div 
          className="p-3 rounded-xl bg-background/60 text-center"
          key={`roi-${calculations.roiMultiple.toFixed(1)}`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-xl font-light text-primary">{calculations.roiMultiple.toFixed(1)}x</p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">ROI</p>
        </motion.div>
        <motion.div 
          className="p-3 rounded-xl bg-background/60 text-center"
          key={`payback-${Math.round(calculations.paybackMonths)}`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-xl font-light text-foreground">{Math.round(calculations.paybackMonths)}</p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">Months Payback</p>
        </motion.div>
        <motion.div 
          className="p-3 rounded-xl bg-background/60 text-center"
          key={`recovery-${Math.round(calculations.year1Recovery / 1000)}`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-xl font-light text-primary">£{Math.round(calculations.year1Recovery / 1000)}k</p>
          <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1">Year 1 Recovery</p>
        </motion.div>
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-2 mb-5 pb-5 border-b border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Hidden costs identified</span>
          </div>
          <span className="text-sm font-medium text-foreground">{formatCurrency(calculations.totalHiddenCosts)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Potential recovery (25%)</span>
          </div>
          <span className="text-sm font-medium text-primary">{formatCurrency(calculations.year1Recovery)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Annual investment</span>
          </div>
          <span className="text-sm font-medium text-foreground">{formatCurrency(calculations.investment)}</span>
        </div>
      </div>

      {/* Net Gain Highlight */}
      <div className="p-3 rounded-xl bg-primary/10 mb-5 text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Net First-Year Gain</p>
        <p className="text-2xl font-light text-primary">{formatCurrency(calculations.netGain)}</p>
      </div>

      <Link to="/industries#calculator" className="block">
        <Button className="w-full h-10 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 rounded-full group">
          Get detailed analysis
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>

      <p className="text-[10px] text-muted-foreground text-center mt-3">
        Using {industry.name} benchmarks • 25% improvement scenario
      </p>
    </motion.div>
  );
}
