import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, DollarSign, Clock, Brain, ArrowLeft, Download, Calendar, FileText, Target, Calculator } from "lucide-react";
import { motion } from "framer-motion";

type Industry = 
  | "saas-high-growth"
  | "saas-enterprise"
  | "financial-services"
  | "professional-services"
  | "healthcare"
  | "government-defense"
  | "tech-hardware";

type ImprovementScenario = "conservative" | "realistic" | "optimistic";

interface IndustryProfile {
  name: string;
  turnoverRate: number;
  productivityLossRate: number;
}

const industryProfiles: Record<Industry, IndustryProfile> = {
  "saas-high-growth": {
    name: "SaaS - High Growth",
    turnoverRate: 0.18,
    productivityLossRate: 0.17,
  },
  "saas-enterprise": {
    name: "SaaS - Enterprise",
    turnoverRate: 0.15,
    productivityLossRate: 0.15,
  },
  "financial-services": {
    name: "Financial Services",
    turnoverRate: 0.13,
    productivityLossRate: 0.14,
  },
  "professional-services": {
    name: "Professional Services",
    turnoverRate: 0.22,
    productivityLossRate: 0.19,
  },
  "healthcare": {
    name: "Healthcare",
    turnoverRate: 0.19,
    productivityLossRate: 0.16,
  },
  "government-defense": {
    name: "Government/Defense",
    turnoverRate: 0.11,
    productivityLossRate: 0.13,
  },
  "tech-hardware": {
    name: "Tech - Hardware/Other",
    turnoverRate: 0.20,
    productivityLossRate: 0.18,
  },
};

const improvementRates: Record<ImprovementScenario, number> = {
  conservative: 0.15,
  realistic: 0.25,
  optimistic: 0.35,
};

interface EnterpriseROICalculatorProps {
  variant?: "light" | "dark";
  defaultIndustry?: Industry;
}

export function EnterpriseROICalculator({ variant = "dark", defaultIndustry = "saas-high-growth" }: EnterpriseROICalculatorProps) {
  const [employees, setEmployees] = useState([50]);
  const [avgSalary, setAvgSalary] = useState("65000");
  const [avgSickDays, setAvgSickDays] = useState("7");
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(defaultIndustry);
  const [improvementScenario, setImprovementScenario] = useState<ImprovementScenario>("realistic");
  const [showReport, setShowReport] = useState(false);

  const currentIndustry = industryProfiles[selectedIndustry];
  const improvement = improvementRates[improvementScenario];

  // Parse inputs
  const parseNumber = (value: string, defaultValue: number) => {
    const parsed = parseFloat(value.replace(/,/g, ''));
    return isNaN(parsed) ? defaultValue : parsed;
  };

  const salaryNum = parseNumber(avgSalary, 65000);
  const sickDaysNum = parseNumber(avgSickDays, 7);
  const employeeCount = employees[0];
  const { turnoverRate, productivityLossRate } = currentIndustry;

  // Calculate current hidden costs
  const underperformanceCost = employeeCount * salaryNum * productivityLossRate;
  const turnoverCost = employeeCount * turnoverRate * (salaryNum * 0.5);
  const dailyCost = salaryNum / 260;
  const sickDaysCost = employeeCount * dailyCost * sickDaysNum;
  const totalHiddenCosts = underperformanceCost + turnoverCost + sickDaysCost;

  // Calculate NeuroState impact at £19/user/month
  const investment = employeeCount * 19 * 12;
  const recoveredUnderperformance = underperformanceCost * improvement;
  const recoveredTurnover = turnoverCost * improvement;
  const recoveredSickDays = sickDaysCost * improvement;
  const year1Recovery = recoveredUnderperformance + recoveredTurnover + recoveredSickDays;
  const netGain = year1Recovery - investment;
  const roiMultiple = investment > 0 ? year1Recovery / investment : 0;
  const paybackMonths = year1Recovery > 0 ? Math.min(60, Math.max(0, 12 * (investment / year1Recovery))) : 60;
  const fiveYearValue = (year1Recovery * 5) - (investment * 5);

  const formatCurrency = (value: number) => {
    // Abbreviate large values for mobile
    if (value >= 1000000) {
      return `£${(value / 1000000).toFixed(1)}m`;
    }
    if (value >= 1000) {
      return `£${(value / 1000).toFixed(0)}k`;
    }
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyFull = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const isDark = variant === "dark";

  // Report View
  if (showReport) {
    return (
      <motion.div 
        className={`rounded-3xl p-6 sm:p-8 ${isDark ? 'bg-foreground' : 'bg-background border border-border/50 shadow-soft'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setShowReport(false)}
          className={`mb-6 ${isDark ? 'text-background/60 hover:text-background' : 'text-muted-foreground hover:text-foreground'}`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculator
        </Button>

        {/* Executive Summary */}
        <div className={`rounded-2xl p-6 mb-6 ${isDark ? 'bg-background/10' : 'bg-gradient-to-br from-foreground to-foreground/90 text-background'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-background' : ''}`}>Executive Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`text-[10px] uppercase tracking-wider mb-1 ${isDark ? 'text-background/60' : 'opacity-70'}`}>Year 1 Recovery</div>
              <div className="text-xl font-semibold text-accent">{formatCurrency(year1Recovery)}</div>
            </div>
            <div className="text-center">
              <div className={`text-[10px] uppercase tracking-wider mb-1 ${isDark ? 'text-background/60' : 'opacity-70'}`}>Net Gain</div>
              <div className="text-xl font-semibold text-accent">{formatCurrency(netGain)}</div>
            </div>
            <div className="text-center">
              <div className={`text-[10px] uppercase tracking-wider mb-1 ${isDark ? 'text-background/60' : 'opacity-70'}`}>Payback</div>
              <div className="text-xl font-semibold text-accent">{Math.round(paybackMonths)} months</div>
            </div>
          </div>
        </div>

        {/* Detailed Cost Analysis */}
        <div className="mb-6">
          <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-background' : 'text-foreground'}`}>Detailed Cost Analysis</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Brain, label: "Cognitive Underperformance", current: underperformanceCost, recovery: recoveredUnderperformance },
              { icon: Users, label: "Burnout Turnover", current: turnoverCost, recovery: recoveredTurnover },
              { icon: Clock, label: "Sick Days", current: sickDaysCost, recovery: recoveredSickDays },
            ].map((item, i) => (
              <div key={i} className={`rounded-xl p-4 ${isDark ? 'bg-background/5' : 'bg-muted/50 border border-border/30'}`}>
                <item.icon className={`w-4 h-4 mb-2 ${isDark ? 'text-accent' : 'text-primary'}`} />
                <div className={`text-[9px] uppercase tracking-wider mb-2 ${isDark ? 'text-background/60' : 'text-muted-foreground'}`}>{item.label}</div>
                <div className={`text-xs mb-1 ${isDark ? 'text-background/80' : 'text-foreground'}`}>
                  Current: <span className="font-medium">{formatCurrency(item.current)}</span>
                </div>
                <div className="text-xs text-accent">
                  Recovery: <span className="font-medium">{formatCurrency(item.recovery)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Year Projection */}
        <div className={`rounded-xl p-4 mb-6 ${isDark ? 'bg-background/5' : 'bg-muted/50 border border-border/30'}`}>
          <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-background' : 'text-foreground'}`}>5-Year Value Projection</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className={`text-[10px] uppercase tracking-wider mb-1 ${isDark ? 'text-background/60' : 'text-muted-foreground'}`}>5-Year Recovery</div>
              <div className="text-lg font-semibold text-accent">{formatCurrency(year1Recovery * 5)}</div>
            </div>
            <div>
              <div className={`text-[10px] uppercase tracking-wider mb-1 ${isDark ? 'text-background/60' : 'text-muted-foreground'}`}>5-Year Investment</div>
              <div className={`text-lg font-semibold ${isDark ? 'text-background' : 'text-foreground'}`}>{formatCurrency(investment * 5)}</div>
            </div>
            <div>
              <div className={`text-[10px] uppercase tracking-wider mb-1 ${isDark ? 'text-background/60' : 'text-muted-foreground'}`}>5-Year Net Value</div>
              <div className="text-lg font-semibold text-accent">{formatCurrency(fiveYearValue)}</div>
            </div>
          </div>
        </div>

        {/* ROI Multiple */}
        <div className="bg-gradient-to-br from-accent via-accent/90 to-accent/80 rounded-xl p-6 text-center mb-6">
          <div className="text-[10px] uppercase tracking-wider text-white/80 mb-1">ROI Multiple</div>
          <div className="text-4xl font-bold text-white">{roiMultiple.toFixed(1)}x</div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="flex-1 h-11 bg-foreground text-background hover:bg-foreground/90"
            onClick={() => window.open('https://calendly.com/neurostate/30min', '_blank')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Implementation Call
          </Button>
          <Button
            variant="outline"
            className={`flex-1 h-11 ${isDark ? 'border-background/20 text-background hover:bg-background/10' : 'border-foreground text-foreground hover:bg-foreground/5'}`}
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Disclaimer */}
        <div className={`text-[10px] mt-4 text-center ${isDark ? 'text-background/50' : 'text-muted-foreground'}`}>
          * Projections based on {currentIndustry.name} benchmarks with {improvementScenario} scenario ({(improvement * 100).toFixed(0)}% improvement).
        </div>
      </motion.div>
    );
  }

  // Calculator View - Landscape layout on desktop
  return (
    <motion.div 
      className={`rounded-3xl p-6 lg:p-8 ${isDark ? 'bg-foreground' : 'bg-background border border-border/50 shadow-soft'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header - Desktop only */}
      <div className="hidden lg:flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-background/10' : 'bg-primary/10'}`}>
          <Calculator className={`w-5 h-5 ${isDark ? 'text-accent' : 'text-primary'}`} />
        </div>
        <div>
          <h3 className={`text-sm font-medium ${isDark ? 'text-background' : 'text-foreground'}`}>ROI Calculator</h3>
          <p className={`text-[10px] ${isDark ? 'text-background/60' : 'text-muted-foreground'}`}>Calculate your potential savings at £19/user/month</p>
        </div>
      </div>

      {/* Desktop Landscape Layout */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Left Column - Inputs */}
        <div className="space-y-4">
          <div className={`text-[10px] uppercase tracking-wider font-medium mb-3 ${isDark ? 'text-background/60' : 'text-muted-foreground'}`}>
            Your Organisation
          </div>
          
          {/* Number of Employees */}
          <div>
            <label className={`text-[10px] uppercase tracking-wider mb-1.5 block font-medium ${isDark ? 'text-background/60' : 'text-primary'}`}>
              Employees
            </label>
            <div className={`text-2xl font-light mb-2 tabular-nums ${isDark ? 'text-background' : 'text-foreground'}`}>
              {employeeCount.toLocaleString('en-GB')}
            </div>
            <Slider
              value={employees}
              onValueChange={setEmployees}
              min={10}
              max={1000}
              step={10}
              className="mb-1"
            />
            <div className={`flex justify-between text-[9px] ${isDark ? 'text-background/40' : 'text-muted-foreground'}`}>
              <span>10</span>
              <span>1,000</span>
            </div>
          </div>

          {/* Salary & Sick Days */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className={`text-[10px] uppercase tracking-wider mb-1.5 block font-medium ${isDark ? 'text-background/60' : 'text-primary'}`}>
                Avg Salary (£)
              </Label>
              <Input
                type="text"
                value={avgSalary}
                onChange={(e) => setAvgSalary(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="65000"
                className={`h-9 text-sm rounded-lg ${isDark ? 'bg-background/10 border-background/20 text-background' : ''}`}
              />
            </div>
            <div>
              <Label className={`text-[10px] uppercase tracking-wider mb-1.5 block font-medium ${isDark ? 'text-background/60' : 'text-primary'}`}>
                Sick Days/Yr
              </Label>
              <Input
                type="text"
                value={avgSickDays}
                onChange={(e) => setAvgSickDays(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder="7"
                className={`h-9 text-sm rounded-lg ${isDark ? 'bg-background/10 border-background/20 text-background' : ''}`}
              />
            </div>
          </div>

          {/* Industry */}
          <div>
            <Label className={`text-[10px] uppercase tracking-wider mb-1.5 block font-medium ${isDark ? 'text-background/60' : 'text-primary'}`}>
              Industry
            </Label>
            <Select value={selectedIndustry} onValueChange={(value) => setSelectedIndustry(value as Industry)}>
              <SelectTrigger className={`h-9 text-xs rounded-lg ${isDark ? 'bg-background/10 border-background/20 text-background' : ''}`}>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(industryProfiles).map(([key, profile]) => (
                  <SelectItem key={key} value={key} className="text-xs">
                    {profile.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Improvement Scenario */}
          <div>
            <Label className={`text-[10px] uppercase tracking-wider mb-1.5 block font-medium ${isDark ? 'text-background/60' : 'text-primary'}`}>
              Scenario
            </Label>
            <div className="flex gap-1.5">
              {[
                { key: "conservative" as const, label: "15%" },
                { key: "realistic" as const, label: "25%" },
                { key: "optimistic" as const, label: "35%" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setImprovementScenario(key)}
                  className={`flex-1 py-1.5 px-2 rounded-md text-[9px] font-medium transition-all ${
                    improvementScenario === key
                      ? 'bg-accent text-white'
                      : isDark 
                        ? 'bg-background/10 text-background/70 hover:bg-background/20'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Cost Breakdown */}
        <div className={`space-y-3 px-6 border-x ${isDark ? 'border-background/10' : 'border-border/30'}`}>
          <div className={`text-[10px] uppercase tracking-wider font-medium mb-3 ${isDark ? 'text-background/60' : 'text-muted-foreground'}`}>
            Hidden Costs (Annual)
          </div>
          
          <div className="space-y-2.5">
            <div className={`flex justify-between items-center ${isDark ? 'text-background/80' : 'text-foreground/80'}`}>
              <div className="flex items-center gap-2">
                <Brain className="w-3.5 h-3.5 text-accent" />
                <span className="text-[11px]">Underperformance</span>
              </div>
              <span className="text-sm font-medium tabular-nums">{formatCurrency(underperformanceCost)}</span>
            </div>
            <div className={`flex justify-between items-center ${isDark ? 'text-background/80' : 'text-foreground/80'}`}>
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-accent" />
                <span className="text-[11px]">Turnover</span>
              </div>
              <span className="text-sm font-medium tabular-nums">{formatCurrency(turnoverCost)}</span>
            </div>
            <div className={`flex justify-between items-center ${isDark ? 'text-background/80' : 'text-foreground/80'}`}>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span className="text-[11px]">Sick days</span>
              </div>
              <span className="text-sm font-medium tabular-nums">{formatCurrency(sickDaysCost)}</span>
            </div>
          </div>

          <div className={`pt-3 border-t ${isDark ? 'border-background/10' : 'border-border/30'}`}>
            <div className="flex justify-between items-center">
              <span className={`text-xs font-medium ${isDark ? 'text-background' : 'text-foreground'}`}>Total exposure</span>
              <span className={`text-lg font-semibold tabular-nums ${isDark ? 'text-background' : 'text-foreground'}`}>{formatCurrency(totalHiddenCosts)}</span>
            </div>
          </div>

          <div className={`rounded-lg p-3 mt-3 ${isDark ? 'bg-accent/20' : 'bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20'}`}>
            <div className="text-[9px] uppercase tracking-wider font-medium text-accent mb-2">
              NeuroState Recovery
            </div>
            <div className="space-y-1.5">
              <div className={`flex justify-between text-[11px] ${isDark ? 'text-background/80' : 'text-foreground/80'}`}>
                <span>Year 1 savings</span>
                <span className="font-medium text-accent tabular-nums">{formatCurrency(year1Recovery)}</span>
              </div>
              <div className={`flex justify-between text-[11px] ${isDark ? 'text-background/80' : 'text-foreground/80'}`}>
                <span>Investment</span>
                <span className="font-medium tabular-nums">{formatCurrency(investment)}</span>
              </div>
              <div className={`flex justify-between text-[11px] ${isDark ? 'text-background/80' : 'text-foreground/80'}`}>
                <span>Net gain</span>
                <span className="font-medium text-accent tabular-nums">{formatCurrency(netGain)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - ROI & Actions */}
        <div className="flex flex-col justify-between">
          <div>
            <div className={`text-[10px] uppercase tracking-wider font-medium mb-3 ${isDark ? 'text-background/60' : 'text-muted-foreground'}`}>
              Return on Investment
            </div>
            
            {/* ROI Multiple - Hero Card */}
            <div className="bg-gradient-to-br from-accent via-accent/90 to-accent/80 rounded-2xl p-5 text-center mb-4">
              <div className="text-[10px] uppercase tracking-wider text-white/70 mb-1">ROI Multiple</div>
              <div className="text-4xl font-bold text-white tabular-nums">{roiMultiple.toFixed(1)}x</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className={`rounded-xl p-3 text-center ${isDark ? 'bg-background/10' : 'bg-muted/50'}`}>
                <div className={`text-[9px] uppercase tracking-wider mb-1 ${isDark ? 'text-background/50' : 'text-muted-foreground'}`}>Payback</div>
                <div className={`text-lg font-semibold tabular-nums ${isDark ? 'text-background' : 'text-foreground'}`}>{Math.round(paybackMonths)}mo</div>
              </div>
              <div className={`rounded-xl p-3 text-center ${isDark ? 'bg-background/10' : 'bg-muted/50'}`}>
                <div className={`text-[9px] uppercase tracking-wider mb-1 ${isDark ? 'text-background/50' : 'text-muted-foreground'}`}>5-Year</div>
                <div className="text-lg font-semibold text-accent tabular-nums">{formatCurrency(fiveYearValue)}</div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setShowReport(true)}
            className="w-full h-10 mt-4 bg-foreground text-background hover:bg-foreground/90 rounded-xl text-xs font-medium"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Business Case
          </Button>
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? 'bg-background/10' : 'bg-primary/10'}`}>
            <Calculator className={`w-4 h-4 ${isDark ? 'text-accent' : 'text-primary'}`} />
          </div>
          <div>
            <h3 className={`text-sm font-medium ${isDark ? 'text-background' : 'text-foreground'}`}>ROI Calculator</h3>
            <p className={`text-[10px] ${isDark ? 'text-background/60' : 'text-muted-foreground'}`}>£19/user/month</p>
          </div>
        </div>

        {/* Mobile Inputs */}
        <div className="space-y-4 mb-5">
          {/* Employees */}
          <div>
            <label className={`text-[10px] uppercase tracking-wider mb-1.5 block font-medium ${isDark ? 'text-background/60' : 'text-primary'}`}>
              Employees
            </label>
            <div className={`text-2xl font-light mb-2 tabular-nums ${isDark ? 'text-background' : 'text-foreground'}`}>
              {employeeCount.toLocaleString('en-GB')}
            </div>
            <Slider value={employees} onValueChange={setEmployees} min={10} max={1000} step={10} className="mb-1" />
          </div>

          {/* Salary & Sick Days */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className={`text-[10px] uppercase tracking-wider mb-1.5 block font-medium ${isDark ? 'text-background/60' : 'text-primary'}`}>
                Avg Salary (£)
              </Label>
              <Input
                type="text"
                value={avgSalary}
                onChange={(e) => setAvgSalary(e.target.value.replace(/[^0-9]/g, ''))}
                className={`h-9 text-sm rounded-lg ${isDark ? 'bg-background/10 border-background/20 text-background' : ''}`}
              />
            </div>
            <div>
              <Label className={`text-[10px] uppercase tracking-wider mb-1.5 block font-medium ${isDark ? 'text-background/60' : 'text-primary'}`}>
                Sick Days
              </Label>
              <Input
                type="text"
                value={avgSickDays}
                onChange={(e) => setAvgSickDays(e.target.value.replace(/[^0-9.]/g, ''))}
                className={`h-9 text-sm rounded-lg ${isDark ? 'bg-background/10 border-background/20 text-background' : ''}`}
              />
            </div>
          </div>

          {/* Industry */}
          <Select value={selectedIndustry} onValueChange={(value) => setSelectedIndustry(value as Industry)}>
            <SelectTrigger className={`h-9 text-xs rounded-lg ${isDark ? 'bg-background/10 border-background/20 text-background' : ''}`}>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(industryProfiles).map(([key, profile]) => (
                <SelectItem key={key} value={key} className="text-xs">{profile.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Scenario Toggle */}
          <div className="flex gap-1.5">
            {[
              { key: "conservative" as const, label: "15%" },
              { key: "realistic" as const, label: "25%" },
              { key: "optimistic" as const, label: "35%" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setImprovementScenario(key)}
                className={`flex-1 py-2 px-2 rounded-lg text-[10px] font-medium transition-all ${
                  improvementScenario === key
                    ? 'bg-accent text-white'
                    : isDark ? 'bg-background/10 text-background/70' : 'bg-muted text-muted-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Results */}
        <div className={`pt-4 border-t ${isDark ? 'border-background/10' : 'border-border/30'}`}>
          {/* ROI Hero */}
          <div className="bg-gradient-to-br from-accent via-accent/90 to-accent/80 rounded-2xl p-5 text-center mb-4">
            <div className="text-[10px] uppercase tracking-wider text-white/70 mb-1">ROI Multiple</div>
            <div className="text-4xl font-bold text-white tabular-nums">{roiMultiple.toFixed(1)}x</div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className={`rounded-xl p-3 text-center ${isDark ? 'bg-background/10' : 'bg-muted/50'}`}>
              <div className={`text-[9px] uppercase tracking-wider mb-0.5 ${isDark ? 'text-background/50' : 'text-muted-foreground'}`}>Savings</div>
              <div className="text-sm font-semibold text-accent tabular-nums">{formatCurrency(year1Recovery)}</div>
            </div>
            <div className={`rounded-xl p-3 text-center ${isDark ? 'bg-background/10' : 'bg-muted/50'}`}>
              <div className={`text-[9px] uppercase tracking-wider mb-0.5 ${isDark ? 'text-background/50' : 'text-muted-foreground'}`}>Payback</div>
              <div className={`text-sm font-semibold tabular-nums ${isDark ? 'text-background' : 'text-foreground'}`}>{Math.round(paybackMonths)}mo</div>
            </div>
            <div className={`rounded-xl p-3 text-center ${isDark ? 'bg-background/10' : 'bg-muted/50'}`}>
              <div className={`text-[9px] uppercase tracking-wider mb-0.5 ${isDark ? 'text-background/50' : 'text-muted-foreground'}`}>5-Year</div>
              <div className="text-sm font-semibold text-accent tabular-nums">{formatCurrency(fiveYearValue)}</div>
            </div>
          </div>

          <Button
            onClick={() => setShowReport(true)}
            className="w-full h-10 bg-foreground text-background hover:bg-foreground/90 rounded-xl text-xs font-medium"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Business Case
          </Button>
        </div>
      </div>
    </motion.div>
  );
}