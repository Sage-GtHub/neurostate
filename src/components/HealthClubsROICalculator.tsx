import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

export function HealthClubsROICalculator() {
  const [memberCount, setMemberCount] = useState([200]);
  
  const avgMembershipValue = 85; // £85/month average membership
  const customerAcquisitionCost = 150; // Cost to acquire new member
  
  // Annual costs without NeuroState
  const annualChurnCost = memberCount[0] * customerAcquisitionCost * 0.28; // 28% annual churn
  const lostRevenue = memberCount[0] * avgMembershipValue * 12 * 0.28;
  const totalAnnualCost = annualChurnCost + lostRevenue;
  
  // With NeuroState improvements
  const retentionGain = 0.34; // 34% retention improvement
  const additionalRevenue = 42; // £42 additional revenue per member per month
  const attendanceGain = 0.28; // 28% attendance improvement
  
  const savedChurnCost = annualChurnCost * retentionGain;
  const savedRevenueLoss = lostRevenue * retentionGain;
  const newRetailRevenue = memberCount[0] * additionalRevenue * 12;
  const attendanceValue = memberCount[0] * avgMembershipValue * 12 * (attendanceGain * 0.15); // 15% value from increased attendance
  
  const totalAnnualGain = savedChurnCost + savedRevenueLoss + newRetailRevenue + attendanceValue;
  const roi = ((totalAnnualGain / (memberCount[0] * 52 * 12)) - 1) * 100; // Assuming Premium tier at £52/member/month
  
  return (
    <Card className="bg-pearl rounded-3xl p-10">
      <h3 className="text-2xl font-bold text-carbon mb-2">Facility ROI Calculator</h3>
      <p className="text-sm text-stone mb-8">
        Calculate potential retention savings and revenue gains for your facility
      </p>
      
      {/* Member Count Slider */}
      <div className="mb-8">
        <label className="text-xs font-bold text-accent uppercase tracking-wider mb-3 block">
          Number of Members
        </label>
        <div className="text-5xl font-bold text-carbon mb-4">{memberCount[0]}</div>
        <Slider
          value={memberCount}
          onValueChange={setMemberCount}
          min={25}
          max={2000}
          step={25}
          className="mb-4"
        />
        <div className="flex justify-between text-xs text-stone font-medium">
          <span>25</span>
          <span>2,000+</span>
        </div>
      </div>
      
      {/* Results Grid */}
      <div className="space-y-4">
        <div className="bg-ivory rounded-2xl p-6">
          <div className="text-xs font-bold text-stone uppercase tracking-wider mb-2">
            Current Annual Cost of Churn
          </div>
          <div className="text-3xl font-bold text-carbon">
            £{totalAnnualCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6">
          <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
            Annual Revenue Gain with NeuroState
          </div>
          <div className="text-4xl font-bold text-carbon mb-2">
            £{totalAnnualGain.toLocaleString('en-GB', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-sm text-stone">
            {roi.toFixed(0)}% ROI in year one
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">34%</div>
            <div className="text-xs text-stone">Retention Gain</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">£42</div>
            <div className="text-xs text-stone">Revenue/Member</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">28%</div>
            <div className="text-xs text-stone">Attendance Gain</div>
          </div>
        </div>
      </div>
    </Card>
  );
}