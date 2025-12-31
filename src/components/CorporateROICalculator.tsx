import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, DollarSign, Clock, Brain, ArrowLeft, Download, Calendar, FileText, Target } from "lucide-react";

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

export function CorporateROICalculator() {
  const [employees, setEmployees] = useState([50]);
  const [avgSalary, setAvgSalary] = useState("65000");
  const [avgSickDays, setAvgSickDays] = useState("7");
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>("saas-high-growth");
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

  // Calculate NeuroState impact at £50/user/month
  const investment = employeeCount * 50 * 12;
  const recoveredUnderperformance = underperformanceCost * improvement;
  const recoveredTurnover = turnoverCost * improvement;
  const recoveredSickDays = sickDaysCost * improvement;
  const year1Recovery = recoveredUnderperformance + recoveredTurnover + recoveredSickDays;
  const netGain = year1Recovery - investment;
  const roiMultiple = investment > 0 ? year1Recovery / investment : 0;
  const paybackMonths = year1Recovery > 0 ? Math.min(60, Math.max(0, 12 * (investment / year1Recovery))) : 60;
  const fiveYearValue = (year1Recovery * 5) - (investment * 5);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (showReport) {
    return (
      <div className="bg-white border border-mist/50 rounded-3xl p-8 sm:p-10 md:p-12 shadow-soft">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setShowReport(false)}
          className="mb-6 text-stone hover:text-carbon"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Calculator
        </Button>

        {/* Executive Summary */}
        <div className="bg-gradient-to-br from-carbon to-slate text-ivory rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">Executive Summary</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-xs uppercase tracking-wide mb-2 opacity-80">Year 1 Recovery</div>
              <div className="text-3xl font-bold text-accent">{formatCurrency(year1Recovery)}</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-xs uppercase tracking-wide mb-2 opacity-80">Net Gain</div>
              <div className="text-3xl font-bold text-accent">{formatCurrency(netGain)}</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl">
              <div className="text-xs uppercase tracking-wide mb-2 opacity-80">Payback Period</div>
              <div className="text-3xl font-bold text-accent">{Math.round(paybackMonths)} months</div>
            </div>
          </div>
        </div>

        {/* Detailed Cost Analysis */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-carbon mb-4">Detailed Cost Analysis</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-pearl/50 rounded-2xl p-6 border border-mist/30">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-5 h-5 text-accent" />
                <span className="text-xs uppercase tracking-wide text-stone font-medium">Cognitive Underperformance</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-stone mb-1">Current Cost</div>
                  <div className="text-xl font-bold text-carbon">{formatCurrency(underperformanceCost)}</div>
                </div>
                <div>
                  <div className="text-xs text-stone mb-1">Estimated Recovery</div>
                  <div className="text-xl font-bold text-accent">{formatCurrency(recoveredUnderperformance)}</div>
                </div>
              </div>
            </div>

            <div className="bg-pearl/50 rounded-2xl p-6 border border-mist/30">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-accent" />
                <span className="text-xs uppercase tracking-wide text-stone font-medium">Burnout-Related Turnover</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-stone mb-1">Current Cost</div>
                  <div className="text-xl font-bold text-carbon">{formatCurrency(turnoverCost)}</div>
                </div>
                <div>
                  <div className="text-xs text-stone mb-1">Estimated Recovery</div>
                  <div className="text-xl font-bold text-accent">{formatCurrency(recoveredTurnover)}</div>
                </div>
              </div>
            </div>

            <div className="bg-pearl/50 rounded-2xl p-6 border border-mist/30">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-xs uppercase tracking-wide text-stone font-medium">Preventable Sick Days</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-stone mb-1">Current Cost</div>
                  <div className="text-xl font-bold text-carbon">{formatCurrency(sickDaysCost)}</div>
                </div>
                <div>
                  <div className="text-xs text-stone mb-1">Estimated Recovery</div>
                  <div className="text-xl font-bold text-accent">{formatCurrency(recoveredSickDays)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Year Value Projection */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-carbon mb-4">5-Year Value Projection</h3>
          <div className="bg-pearl/50 rounded-2xl p-6 border border-mist/30">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-xs uppercase tracking-wide text-stone mb-2">5-Year Recovery</div>
                <div className="text-2xl font-bold text-accent">{formatCurrency(year1Recovery * 5)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs uppercase tracking-wide text-stone mb-2">5-Year Investment</div>
                <div className="text-2xl font-bold text-carbon">{formatCurrency(investment * 5)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs uppercase tracking-wide text-stone mb-2">5-Year Net Value</div>
                <div className="text-2xl font-bold text-accent">{formatCurrency(fiveYearValue)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Multiple Card */}
        <div className="bg-gradient-to-br from-accent via-accent/90 to-accent/80 rounded-2xl p-8 text-center mb-8">
          <div className="text-xs uppercase tracking-wide text-white/80 mb-2">ROI Multiple</div>
          <div className="text-5xl font-bold text-white">{roiMultiple.toFixed(1)}x</div>
          <div className="text-sm text-white/80 mt-2">Return on investment</div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            size="lg"
            className="bg-carbon text-ivory hover:bg-carbon/90"
            onClick={() => window.open('https://calendly.com', '_blank')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book an Implementation Call
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-carbon text-carbon hover:bg-carbon/5"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-stone pt-4 border-t border-mist text-center">
          * Projections based on {currentIndustry.name} industry benchmarks with {improvementScenario} scenario ({(improvement * 100).toFixed(0)}% improvement). Individual results may vary.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-mist/50 rounded-3xl p-8 sm:p-10 md:p-12 shadow-soft">
      <div className="space-y-2 mb-10">
        <h3 className="text-2xl sm:text-3xl font-light text-carbon">ROI Calculator</h3>
        <p className="text-caption text-ash">
          Calculate potential cost savings and productivity gains for your organisation
        </p>
      </div>

      {/* Number of Employees Slider */}
      <div className="mb-8">
        <label className="text-xs text-accent uppercase tracking-[0.2em] mb-4 block font-medium">
          Number of Employees
        </label>
        <div className="text-5xl font-light text-carbon mb-6 tabular-nums">{employeeCount.toLocaleString('en-GB')}</div>
        <Slider
          value={employees}
          onValueChange={setEmployees}
          min={10}
          max={1000}
          step={10}
          className="mb-3"
        />
        <div className="flex justify-between text-xs text-stone font-medium">
          <span>10</span>
          <span>1,000</span>
        </div>
      </div>

      {/* Average Salary Input */}
      <div className="mb-8">
        <Label htmlFor="avgSalary" className="text-xs text-accent uppercase tracking-[0.2em] mb-4 block font-medium">
          Average Salary (£)
        </Label>
        <Input
          id="avgSalary"
          type="text"
          value={avgSalary}
          onChange={(e) => setAvgSalary(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder="65000"
          className="text-lg h-14"
        />
      </div>

      {/* Average Sick Days Input */}
      <div className="mb-8">
        <Label htmlFor="sickDays" className="text-xs text-accent uppercase tracking-[0.2em] mb-4 block font-medium">
          Average Sick Days per Year
        </Label>
        <Input
          id="sickDays"
          type="text"
          value={avgSickDays}
          onChange={(e) => setAvgSickDays(e.target.value.replace(/[^0-9.]/g, ''))}
          placeholder="7"
          className="text-lg h-14"
        />
      </div>

      {/* Industry Dropdown */}
      <div className="mb-8">
        <Label className="text-xs text-accent uppercase tracking-[0.2em] mb-4 block font-medium">
          Industry
        </Label>
        <Select value={selectedIndustry} onValueChange={(value) => setSelectedIndustry(value as Industry)}>
          <SelectTrigger className="text-lg h-14">
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(industryProfiles).map(([key, profile]) => (
              <SelectItem key={key} value={key}>
                {profile.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Improvement Scenario Toggle */}
      <div className="mb-10">
        <Label className="text-xs text-accent uppercase tracking-[0.2em] mb-4 block font-medium">
          Improvement Scenario
        </Label>
        <div className="flex gap-2">
          {[
            { key: "conservative" as const, label: "Conservative", rate: "15%" },
            { key: "realistic" as const, label: "Realistic", rate: "25%" },
            { key: "optimistic" as const, label: "Optimistic", rate: "35%" },
          ].map(({ key, label, rate }) => (
            <button
              key={key}
              onClick={() => setImprovementScenario(key)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                improvementScenario === key
                  ? 'bg-accent text-white'
                  : 'bg-pearl text-stone hover:bg-mist'
              }`}
            >
              <div>{label}</div>
              <div className="text-xs opacity-80">({rate})</div>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {/* Current Hidden Costs */}
        <div className="bg-pearl/50 rounded-2xl p-6 sm:p-7 border border-mist/30">
          <div className="text-xs text-stone uppercase tracking-[0.2em] mb-4 font-medium">
            Current Hidden Costs
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-stone">Cognitive underperformance</span>
              <span className="text-carbon font-medium">{formatCurrency(underperformanceCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone">Burnout-related turnover</span>
              <span className="text-carbon font-medium">{formatCurrency(turnoverCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone">Preventable sick days</span>
              <span className="text-carbon font-medium">{formatCurrency(sickDaysCost)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-mist/50">
            <span className="text-sm font-semibold text-carbon">Total hidden costs</span>
            <span className="text-3xl sm:text-4xl font-light text-carbon tabular-nums">
              {formatCurrency(totalHiddenCosts)}
            </span>
          </div>
        </div>

        {/* NeuroState Impact */}
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 sm:p-7 border border-accent/20">
          <div className="text-xs text-accent uppercase tracking-[0.2em] mb-4 font-medium">
            NeuroState Impact
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-stone">Year 1 recovery</span>
              <span className="text-accent font-medium">{formatCurrency(year1Recovery)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone">Annual investment</span>
              <span className="text-carbon font-medium">{formatCurrency(investment)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone">Net gain</span>
              <span className="text-accent font-medium">{formatCurrency(netGain)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone">Payback</span>
              <span className="text-carbon font-medium">{Math.round(paybackMonths)} months</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-accent/20">
            <span className="text-sm text-stone">5-year value</span>
            <span className="text-4xl sm:text-5xl font-light text-carbon tabular-nums">
              {formatCurrency(fiveYearValue)}
            </span>
          </div>
        </div>

        {/* ROI Multiple */}
        <div className="bg-gradient-to-br from-accent via-accent/90 to-accent/80 rounded-2xl p-6 sm:p-7 text-center">
          <div className="text-xs text-white/80 uppercase tracking-[0.2em] mb-2">ROI Multiple</div>
          <div className="text-5xl sm:text-6xl font-light text-white tabular-nums">{roiMultiple.toFixed(1)}x</div>
        </div>

        {/* View Report Button */}
        <Button
          size="lg"
          className="w-full bg-carbon text-ivory hover:bg-carbon/90 h-14 text-base"
          onClick={() => setShowReport(true)}
        >
          <FileText className="w-4 h-4 mr-2" />
          View Complete Business Case
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-stone pt-6 border-t border-mist mt-6">
        * Calculations based on {currentIndustry.name} industry benchmarks ({(turnoverRate * 100).toFixed(0)}% turnover, {(productivityLossRate * 100).toFixed(0)}% productivity loss). Individual results may vary.
      </div>
    </div>
  );
}