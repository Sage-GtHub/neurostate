import { NovaNav } from "@/components/NovaNav";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Brain, Target, TrendingUp } from "lucide-react";

export default function NovaInsights() {
  return (
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      {/* Header */}
      <div className="border-b border-mist bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8">
          <h1 className="text-h2 font-semibold text-carbon">Performance Analytics</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        {/* Weekly Summary */}
        <div className="mb-12">
          <h2 className="text-h3 font-semibold text-carbon mb-6">Weekly Performance Summary</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-ash" />
                  <span className="text-caption text-ash uppercase tracking-wider">Average HRV</span>
                </div>
                <div className="text-[2rem] font-semibold text-carbon mb-1">68</div>
                <div className="text-caption text-[#10b981]">+5% from last week</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-ash" />
                  <span className="text-caption text-ash uppercase tracking-wider">Sleep Score</span>
                </div>
                <div className="text-[2rem] font-semibold text-carbon mb-1">7.8</div>
                <div className="text-caption text-ash">Steady</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-ash" />
                  <span className="text-caption text-ash uppercase tracking-wider">Focus Time</span>
                </div>
                <div className="text-[2rem] font-semibold text-carbon mb-1">12h</div>
                <div className="text-caption text-[#10b981]">+3 sessions</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-ash" />
                  <span className="text-caption text-ash uppercase tracking-wider">Recovery</span>
                </div>
                <div className="text-[2rem] font-semibold text-carbon mb-1">85%</div>
                <div className="text-caption text-[#10b981]">+8%</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* HRV Trend */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-body font-semibold text-carbon">HRV Trend</h3>
                <span className="text-caption text-ash">Past 8 days</span>
              </div>
              <div className="mb-4">
                <div className="text-[2.5rem] font-semibold text-carbon">70</div>
                <div className="text-caption text-ash">Current</div>
              </div>
              <div className="h-48 flex items-end gap-2 mb-4">
                {[62, 65, 67, 64, 68, 69, 71, 70].map((value, i) => (
                  <div key={i} className="flex-1 bg-pearl rounded-t" style={{ height: `${(value / 75) * 100}%` }} />
                ))}
              </div>
              <p className="text-sm text-ash leading-relaxed">
                Your HRV is trending upward, indicating improved recovery capacity since starting the morning performance stack.
              </p>
            </CardContent>
          </Card>

          {/* Sleep Stages */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-body font-semibold text-carbon">Sleep Stages</h3>
                <span className="text-caption text-ash">Last night</span>
              </div>
              <div className="mb-4">
                <div className="text-[2.5rem] font-semibold text-carbon">8.3h</div>
                <div className="text-caption text-ash">Total sleep</div>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-carbon" />
                      <span className="text-sm text-ash">Deep</span>
                    </div>
                    <span className="text-sm font-medium text-carbon">2.0h</span>
                  </div>
                  <Progress value={24} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-stone" />
                      <span className="text-sm text-ash">REM</span>
                    </div>
                    <span className="text-sm font-medium text-carbon">1.8h</span>
                  </div>
                  <Progress value={22} className="h-2 [&>div]:bg-stone" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-ash" />
                      <span className="text-sm text-ash">Light</span>
                    </div>
                    <span className="text-sm font-medium text-carbon">4.3h</span>
                  </div>
                  <Progress value={52} className="h-2 [&>div]:bg-ash" />
                </div>
              </div>
              <p className="text-sm text-ash leading-relaxed">
                Deep sleep has increased from 1.2h to 2.0h since starting magnesium glycinate - a 67% improvement.
              </p>
            </CardContent>
          </Card>

          {/* Daily Energy Curve */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-body font-semibold text-carbon">Daily Energy Curve</h3>
                <span className="text-caption text-ash">Today</span>
              </div>
              <div className="h-48 mb-6 flex items-center">
                <svg className="w-full h-full" viewBox="0 0 400 150">
                  <path
                    d="M 0 120 Q 50 80 100 70 Q 150 65 200 90 Q 250 100 300 85 Q 350 75 400 70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-carbon"
                  />
                </svg>
              </div>
              <div className="flex justify-between text-caption text-ash mb-4">
                <span>6am</span>
                <span>12pm</span>
                <span>6pm</span>
              </div>
              <p className="text-sm text-ash leading-relaxed">
                Consistent 3pm dip detected. Consider adding B-vitamins at lunch for sustained afternoon energy.
              </p>
            </CardContent>
          </Card>

          {/* Recovery Score */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-body font-semibold text-carbon">Recovery Score</h3>
                <span className="text-caption text-ash">Past 8 days</span>
              </div>
              <div className="mb-4">
                <div className="text-[2.5rem] font-semibold text-carbon">87%</div>
                <div className="text-caption text-ash">Today</div>
              </div>
              <div className="h-48 flex items-end gap-2 mb-4">
                {[72, 75, 78, 80, 82, 84, 86, 87].map((value, i) => (
                  <div key={i} className="flex-1 bg-pearl rounded-t" style={{ height: `${value}%` }} />
                ))}
              </div>
              <p className="text-sm text-ash leading-relaxed">
                Recovery score improved 15 points since protocol start. You're adapting well to your training volume.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI-Generated Insights */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-h3 font-semibold text-carbon mb-8">AI-Generated Insights</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-body font-semibold text-carbon mb-3">Sleep Quality Improving</h3>
                <p className="text-sm text-ash leading-relaxed">
                  Your Oura Ring data shows deep sleep has increased from 1.2h to 2.0h over the past two weeks. This 67% improvement correlates with your evening magnesium and red light therapy routine. Your HRV has also increased by 8%, indicating better recovery.
                </p>
              </div>

              <div>
                <h3 className="text-body font-semibold text-carbon mb-3">Focus Patterns Identified</h3>
                <p className="text-sm text-ash leading-relaxed">
                  Your Apple Watch activity data shows peak cognitive performance between 9-11 AM and 2-4 PM. Focus session duration has increased from 45 min to 72 min on average. Consider scheduling deep work during these windows for maximum productivity.
                </p>
              </div>

              <div>
                <h3 className="text-body font-semibold text-carbon mb-3">Optimisation Opportunity</h3>
                <p className="text-sm text-ash leading-relaxed">
                  Energy tracking reveals a consistent 3pm dip (average 25-point decrease). Based on your patterns, adding a midday B-vitamin complex or 10-minute movement break could maintain energy levels. Would you like me to create an afternoon protocol?
                </p>
              </div>
            </div>

            {/* Performance Goals */}
            <div className="border-t border-mist mt-8 pt-8">
              <h3 className="text-body font-semibold text-carbon mb-6">Your Performance Goals</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-ash">Better Sleep</span>
                    <span className="text-sm font-semibold text-carbon">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-ash">Enhanced Focus</span>
                    <span className="text-sm font-semibold text-carbon">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-ash">Athletic Recovery</span>
                    <span className="text-sm font-semibold text-carbon">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
