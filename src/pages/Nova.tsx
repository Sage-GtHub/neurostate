import { NovaNav } from "@/components/NovaNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Watch, TrendingUp, Brain, Target, Sparkles } from "lucide-react";

export default function Nova() {
  return (
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      {/* Header */}
      <div className="border-b border-mist bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-h3 font-semibold text-carbon">Nova – AI Performance Assistant</h1>
            <div className="flex items-center gap-2 text-sm text-ash">
              <div className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span>Synced 2 min ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Chat + Metrics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Chat Interface */}
            <Card>
              <CardContent className="p-8">
                <div className="flex gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-carbon flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-ivory" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-body text-carbon leading-relaxed">
                      Hello! I'm Nova, your AI performance assistant. I'm here to help you improve your cognitive performance, recovery, and overall wellbeing. How can I help you today?
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="How can I help you today?"
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-carbon transition-colors text-body"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Live Metrics */}
            <div>
              <h2 className="text-h3 font-semibold text-carbon mb-6">Live Metrics</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-ash" />
                      <span className="text-caption text-ash uppercase tracking-wider">HRV Score</span>
                    </div>
                    <div className="text-[2rem] font-semibold text-carbon mb-1">68</div>
                    <div className="text-caption text-[#10b981]">+5% from last week</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-ash" />
                      <span className="text-caption text-ash uppercase tracking-wider">Sleep Quality</span>
                    </div>
                    <div className="text-[2rem] font-semibold text-carbon mb-1">7.8/10</div>
                    <div className="text-caption text-ash">Steady</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-ash" />
                      <span className="text-caption text-ash uppercase tracking-wider">Focus Sessions</span>
                    </div>
                    <div className="text-[2rem] font-semibold text-carbon mb-1">12</div>
                    <div className="text-caption text-ash">This week</div>
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
          </div>

          {/* Right Column - Devices + CTA */}
          <div className="space-y-8">
            {/* Connected Devices */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-body font-semibold text-carbon mb-4">Connected Devices</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full border-2 border-carbon" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-carbon">Oura Ring Gen 3</div>
                        <div className="text-caption text-ash">2 minutes ago</div>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center">
                        <Watch className="w-5 h-5 text-carbon" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-carbon">Apple Watch Ultra</div>
                        <div className="text-caption text-ash">5 minutes ago</div>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Manage Devices
                </Button>
              </CardContent>
            </Card>

            {/* Nova Intelligence */}
            <Card className="bg-carbon text-ivory">
              <CardContent className="p-6">
                <h3 className="text-body font-semibold mb-6">Nova Intelligence</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-caption text-pearl uppercase tracking-wider mb-1">Data Points Analysed</div>
                    <div className="text-[2rem] font-semibold">12,847</div>
                  </div>
                  <div>
                    <div className="text-caption text-pearl uppercase tracking-wider mb-1">Insights Generated</div>
                    <div className="text-[2rem] font-semibold">156</div>
                  </div>
                  <div>
                    <div className="text-caption text-pearl uppercase tracking-wider mb-1">Performance Gain</div>
                    <div className="text-[2rem] font-semibold text-[#10b981]">+23%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Get Started CTA */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-body font-semibold text-carbon mb-3">Get Started</h3>
                <p className="text-sm text-ash mb-4 leading-relaxed">
                  Take our 2-minute assessment for a personalised supplement protocol
                </p>
                <Button className="w-full">Start Assessment</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
