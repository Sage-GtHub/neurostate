import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { TrendingUp, Users, DollarSign, Clock } from "lucide-react";

const calculatorSchema = z.object({
  employees: z.number().min(10).max(10000),
  avgSalary: z.number().min(20000).max(500000),
  currentWellnessSpend: z.number().min(0).max(1000000),
  avgSickDays: z.number().min(0).max(30)
});

export function ROICalculator() {
  const [employees, setEmployees] = useState([250]);
  const [avgSalary, setAvgSalary] = useState("50000");
  const [currentWellnessSpend, setCurrentWellnessSpend] = useState("25000");
  const [avgSickDays, setAvgSickDays] = useState("8");

  // Validate and parse inputs
  const parseNumber = (value: string, defaultValue: number) => {
    const parsed = parseFloat(value.replace(/,/g, ''));
    return isNaN(parsed) ? defaultValue : parsed;
  };

  const salaryNum = parseNumber(avgSalary, 50000);
  const wellnessSpendNum = parseNumber(currentWellnessSpend, 25000);
  const sickDaysNum = parseNumber(avgSickDays, 8);
  const employeeCount = employees[0];

  // Calculate metrics based on NeuroState improvements
  const dailyRate = salaryNum / 260; // Working days per year
  
  // Productivity gains (31% improvement)
  const productivityGainPerEmployee = salaryNum * 0.31;
  const totalProductivityGain = productivityGainPerEmployee * employeeCount;

  // Sick day reduction (63% reduction in burnout = ~40% fewer sick days)
  const sickDayReduction = sickDaysNum * 0.40;
  const sickDaySavings = sickDayReduction * dailyRate * employeeCount;

  // Turnover reduction (18% improvement = reduced recruitment costs)
  const avgTurnoverCost = salaryNum * 0.5; // Industry standard
  const currentTurnoverRate = 0.15; // 15% annual turnover
  const turnoverReduction = 0.18; // 18% improvement
  const turnoverSavings = (currentTurnoverRate * turnoverReduction * avgTurnoverCost * employeeCount);

  // NeuroState cost (Professional tier at £78/employee/month)
  const neurostateAnnualCost = employeeCount * 78 * 12;
  
  // Total savings
  const totalSavings = totalProductivityGain + sickDaySavings + turnoverSavings - wellnessSpendNum;
  const netSavings = totalSavings - neurostateAnnualCost;
  const roi = ((netSavings / neurostateAnnualCost) * 100);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left Column - Inputs */}
      <div className="space-y-8">
        <div>
          <Label className="text-sm font-semibold text-stone uppercase tracking-wide mb-3 block">
            Number of Employees
          </Label>
          <div className="text-4xl font-bold text-carbon mb-4">{employeeCount}</div>
          <Slider
            value={employees}
            onValueChange={setEmployees}
            min={10}
            max={5000}
            step={10}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-stone">
            <span>10</span>
            <span>5,000</span>
          </div>
        </div>

        <div>
          <Label htmlFor="avgSalary" className="text-sm font-semibold text-stone uppercase tracking-wide mb-3 block">
            Average Salary (£)
          </Label>
          <Input
            id="avgSalary"
            type="text"
            value={avgSalary}
            onChange={(e) => setAvgSalary(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="50000"
            className="text-lg"
          />
        </div>

        <div>
          <Label htmlFor="currentWellness" className="text-sm font-semibold text-stone uppercase tracking-wide mb-3 block">
            Current Annual Wellness Spend (£)
          </Label>
          <Input
            id="currentWellness"
            type="text"
            value={currentWellnessSpend}
            onChange={(e) => setCurrentWellnessSpend(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="25000"
            className="text-lg"
          />
        </div>

        <div>
          <Label htmlFor="sickDays" className="text-sm font-semibold text-stone uppercase tracking-wide mb-3 block">
            Average Sick Days Per Employee
          </Label>
          <Input
            id="sickDays"
            type="text"
            value={avgSickDays}
            onChange={(e) => setAvgSickDays(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="8"
            className="text-lg"
          />
        </div>
      </div>

      {/* Right Column - Results */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-accent to-carbon text-ivory rounded-2xl p-8">
          <div className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">
            Annual ROI
          </div>
          <div className="text-5xl font-bold mb-2">
            {roi > 0 ? '+' : ''}{roi.toFixed(0)}%
          </div>
          <div className="text-sm opacity-90">
            {formatCurrency(netSavings)} net savings
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-pearl rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-stone mb-1">Productivity Gains</div>
                <div className="text-2xl font-bold text-carbon">{formatCurrency(totalProductivityGain)}</div>
                <div className="text-xs text-stone mt-1">31% improvement per employee</div>
              </div>
            </div>
          </div>

          <div className="bg-pearl rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-stone mb-1">Sick Day Reduction</div>
                <div className="text-2xl font-bold text-carbon">{formatCurrency(sickDaySavings)}</div>
                <div className="text-xs text-stone mt-1">40% fewer sick days annually</div>
              </div>
            </div>
          </div>

          <div className="bg-pearl rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-stone mb-1">Turnover Savings</div>
                <div className="text-2xl font-bold text-carbon">{formatCurrency(turnoverSavings)}</div>
                <div className="text-xs text-stone mt-1">18% retention improvement</div>
              </div>
            </div>
          </div>

          <div className="bg-ivory border border-mist rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-carbon rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-ivory" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-stone mb-1">NeuroState Investment</div>
                <div className="text-2xl font-bold text-carbon">{formatCurrency(neurostateAnnualCost)}</div>
                <div className="text-xs text-stone mt-1">£78 per employee per month</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-stone pt-4 border-t border-mist">
          * Calculations based on verified metrics from enterprise deployments. Individual results may vary.
        </div>
      </div>
    </div>
  );
}
