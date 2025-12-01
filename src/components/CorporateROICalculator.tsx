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
    <div className="bg-white border border-mist/50 rounded-3xl p-8 sm:p-10 md:p-12 shadow-soft">
      <div className="space-y-2 mb-10">
        <h3 className="text-2xl sm:text-3xl font-light text-carbon">ROI Calculator</h3>
        <p className="text-caption text-ash">
          Calculate potential cost savings and productivity gains for your organisation
        </p>
      </div>
      
      {/* Employee Count Slider */}
      <div className="mb-10">
        <label className="text-xs text-accent uppercase tracking-[0.2em] mb-4 block font-medium">
          Number of Employees
        </label>
        <div className="text-6xl font-light text-carbon mb-6 tabular-nums">{employeeCount[0]}</div>
        <Slider
          value={employeeCount}
          onValueChange={setEmployeeCount}
          min={10}
          max={2000}
          step={10}
          className="mb-3"
        />
        <div className="flex justify-between text-xs text-stone font-medium">
          <span>10</span>
          <span>2,000+</span>
        </div>
      </div>
      
      {/* Results Grid */}
      <div className="space-y-3">
        <div className="bg-pearl/50 rounded-2xl p-6 sm:p-7 border border-mist/30">
          <div className="text-xs text-stone uppercase tracking-[0.2em] mb-3 font-medium">
            Current Annual Cost
          </div>
          <div className="text-3xl sm:text-4xl font-light text-carbon tabular-nums">
            £{totalAnnualCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-caption text-ash mt-2">
            Burnout & turnover costs
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 sm:p-7 border border-accent/20">
          <div className="text-xs text-accent uppercase tracking-[0.2em] mb-3 font-medium">
            Annual Savings with NeuroState
          </div>
          <div className="text-4xl sm:text-5xl font-light text-carbon mb-2 tabular-nums">
            £{totalAnnualSavings.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-caption text-stone">
            {roi.toFixed(0)}% ROI in year one
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 pt-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-light text-accent mb-1 tabular-nums">63%</div>
            <div className="text-xs text-stone">Burnout Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-light text-accent mb-1 tabular-nums">40%</div>
            <div className="text-xs text-stone">Retention Gain</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-light text-accent mb-1 tabular-nums">31%</div>
            <div className="text-xs text-stone">Productivity Gain</div>
          </div>
        </div>
      </div>
    </div>
  );
}