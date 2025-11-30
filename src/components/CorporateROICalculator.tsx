import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

export function CorporateROICalculator() {
  const [employeeCount, setEmployeeCount] = useState([100]);
  
  const avgSalary = 45000; // Average UK salary
  const burnoutCostPerEmployee = avgSalary * 0.34; // 34% productivity loss from burnout
  const turnoverCostPerEmployee = avgSalary * 1.5; // 150% of salary to replace
  
  // Annual costs without NeuroState
  const annualBurnoutCost = employeeCount[0] * burnoutCostPerEmployee * 0.25; // 25% affected
  const annualTurnoverCost = employeeCount[0] * turnoverCostPerEmployee * 0.18; // 18% turnover
  const totalAnnualCost = annualBurnoutCost + annualTurnoverCost;
  
  // With NeuroState improvements
  const burnoutReduction = 0.63; // 63% reduction
  const turnoverReduction = 0.40; // 40% retention improvement
  const productivityGain = 0.31; // 31% productivity gain
  
  const savedBurnoutCost = annualBurnoutCost * burnoutReduction;
  const savedTurnoverCost = annualTurnoverCost * turnoverReduction;
  const productivityValue = employeeCount[0] * avgSalary * productivityGain;
  
  const totalAnnualSavings = savedBurnoutCost + savedTurnoverCost + productivityValue;
  const roi = ((totalAnnualSavings / (employeeCount[0] * 78 * 12)) - 1) * 100; // Assuming Professional tier at £78/employee/month
  
  return (
    <Card className="bg-pearl rounded-3xl p-10">
      <h3 className="text-2xl font-bold text-carbon mb-2">ROI Calculator</h3>
      <p className="text-sm text-stone mb-8">
        Calculate potential cost savings and productivity gains for your organisation
      </p>
      
      {/* Employee Count Slider */}
      <div className="mb-8">
        <label className="text-xs font-bold text-accent uppercase tracking-wider mb-3 block">
          Number of Employees
        </label>
        <div className="text-5xl font-bold text-carbon mb-4">{employeeCount[0]}</div>
        <Slider
          value={employeeCount}
          onValueChange={setEmployeeCount}
          min={10}
          max={2000}
          step={10}
          className="mb-4"
        />
        <div className="flex justify-between text-xs text-stone font-medium">
          <span>10</span>
          <span>2,000+</span>
        </div>
      </div>
      
      {/* Results Grid */}
      <div className="space-y-4">
        <div className="bg-ivory rounded-2xl p-6">
          <div className="text-xs font-bold text-stone uppercase tracking-wider mb-2">
            Current Annual Cost of Burnout & Turnover
          </div>
          <div className="text-3xl font-bold text-carbon">
            £{totalAnnualCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6">
          <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
            Annual Savings with NeuroState
          </div>
          <div className="text-4xl font-bold text-carbon mb-2">
            £{totalAnnualSavings.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-sm text-stone">
            {roi.toFixed(0)}% ROI in year one
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">63%</div>
            <div className="text-xs text-stone">Burnout Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">40%</div>
            <div className="text-xs text-stone">Retention Gain</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">31%</div>
            <div className="text-xs text-stone">Productivity Gain</div>
          </div>
        </div>
      </div>
    </Card>
  );
}