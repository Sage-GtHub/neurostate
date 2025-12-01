import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

export function SportsROICalculator() {
  const [athleteCount, setAthleteCount] = useState([25]);
  
  const avgPlayerValue = 500000; // Average squad player value
  const injuryCostPerPlayer = avgPlayerValue * 0.15; // 15% value loss per injury
  const performanceValue = 50000; // Value per percentage point of performance gain
  
  // Annual costs without NeuroState
  const annualInjuryCost = athleteCount[0] * injuryCostPerPlayer * 0.35; // 35% injury rate
  const missedPerformanceValue = athleteCount[0] * performanceValue * 0.20; // 20% below optimal
  const totalAnnualCost = annualInjuryCost + missedPerformanceValue;
  
  // With NeuroState improvements
  const injuryReduction = 0.41; // 41% reduction in injuries
  const performanceGain = 0.38; // 38% performance improvement
  const recoveryImprovement = 0.52; // 52% faster recovery
  
  const savedInjuryCost = annualInjuryCost * injuryReduction;
  const performanceGainValue = athleteCount[0] * performanceValue * performanceGain;
  const recoveryValue = athleteCount[0] * 25000 * recoveryImprovement; // £25k per athlete recovery time value
  
  const totalAnnualSavings = savedInjuryCost + performanceGainValue + recoveryValue;
  const roi = ((totalAnnualSavings / (athleteCount[0] * 145 * 12)) - 1) * 100; // Assuming Elite tier at £145/athlete/month
  
  return (
    <div className="bg-white border border-mist/50 rounded-3xl p-8 sm:p-10 md:p-12 shadow-soft">
      <div className="space-y-2 mb-10">
        <h3 className="text-2xl sm:text-3xl font-light text-carbon">Performance ROI Calculator</h3>
        <p className="text-caption text-ash">
          Calculate potential injury prevention savings and performance value gains
        </p>
      </div>
      
      {/* Athlete Count Slider */}
      <div className="mb-10">
        <label className="text-xs text-accent uppercase tracking-[0.2em] mb-4 block font-medium">
          Squad Size (Athletes)
        </label>
        <div className="text-6xl font-light text-carbon mb-6 tabular-nums">{athleteCount[0]}</div>
        <Slider
          value={athleteCount}
          onValueChange={setAthleteCount}
          min={5}
          max={100}
          step={5}
          className="mb-3"
        />
        <div className="flex justify-between text-xs text-stone font-medium">
          <span>5</span>
          <span>100+</span>
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
            Injuries & suboptimal performance
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 sm:p-7 border border-accent/20">
          <div className="text-xs text-accent uppercase tracking-[0.2em] mb-3 font-medium">
            Annual Value Gain with NeuroState
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
            <div className="text-2xl sm:text-3xl font-light text-accent mb-1 tabular-nums">41%</div>
            <div className="text-xs text-stone">Injury Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-light text-accent mb-1 tabular-nums">38%</div>
            <div className="text-xs text-stone">Performance Gain</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-light text-accent mb-1 tabular-nums">52%</div>
            <div className="text-xs text-stone">Faster Recovery</div>
          </div>
        </div>
      </div>
    </div>
  );
}