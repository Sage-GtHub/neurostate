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
    <Card className="bg-pearl rounded-3xl p-10">
      <h3 className="text-2xl font-bold text-carbon mb-2">Performance ROI Calculator</h3>
      <p className="text-sm text-stone mb-8">
        Calculate potential injury prevention savings and performance value gains
      </p>
      
      {/* Athlete Count Slider */}
      <div className="mb-8">
        <label className="text-xs font-bold text-accent uppercase tracking-wider mb-3 block">
          Squad Size (Athletes)
        </label>
        <div className="text-5xl font-bold text-carbon mb-4">{athleteCount[0]}</div>
        <Slider
          value={athleteCount}
          onValueChange={setAthleteCount}
          min={5}
          max={100}
          step={5}
          className="mb-4"
        />
        <div className="flex justify-between text-xs text-stone font-medium">
          <span>5</span>
          <span>100+</span>
        </div>
      </div>
      
      {/* Results Grid */}
      <div className="space-y-4">
        <div className="bg-ivory rounded-2xl p-6">
          <div className="text-xs font-bold text-stone uppercase tracking-wider mb-2">
            Current Annual Cost of Injuries & Suboptimal Performance
          </div>
          <div className="text-3xl font-bold text-carbon">
            £{totalAnnualCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6">
          <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
            Annual Value Gain with NeuroState
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
            <div className="text-2xl font-bold text-accent mb-1">41%</div>
            <div className="text-xs text-stone">Injury Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">38%</div>
            <div className="text-xs text-stone">Performance Gain</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">52%</div>
            <div className="text-xs text-stone">Faster Recovery</div>
          </div>
        </div>
      </div>
    </Card>
  );
}