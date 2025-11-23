import { NovaNav } from "@/components/NovaNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";

export default function NovaProtocols() {
  const protocols = [
    {
      name: "Morning Performance Stack",
      started: "1 Nov 2025",
      status: "Active",
      completion: 78,
      todaysStack: [
        { supplement: "NeuroCharge", time: "7:00 AM", dosage: "2 capsules" },
        { supplement: "Omega-3 Elite", time: "7:00 AM", dosage: "3 softgels" },
        { supplement: "Vitamin D3+K2", time: "7:00 AM", dosage: "1 capsule" },
      ],
    },
    {
      name: "Sleep Optimisation Protocol",
      started: "8 Nov 2025",
      status: "Active",
      completion: 45,
      todaysStack: [
        { supplement: "Magnesium Glycinate", time: "10:00 PM", dosage: "400mg" },
        { supplement: "RestoreSleep", time: "10:30 PM", dosage: "2 capsules" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <NovaNav />
      
      {/* Header */}
      <div className="border-b border-mist bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-8">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-h2 font-semibold text-carbon">My Active Protocols</h1>
            <Button>Create New Protocol</Button>
          </div>
          <p className="text-body text-ash">Track your daily supplement stacks and protocol progress</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-12">
        <div className="space-y-8">
          {/* Protocols List */}
          {protocols.map((protocol, index) => (
            <Card key={index}>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-h3 font-semibold text-carbon mb-2">{protocol.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-ash">
                      <span>Started {protocol.started}</span>
                      <span>•</span>
                      <span className="text-[#10b981]">{protocol.status}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-ash">Completion</span>
                    <span className="text-sm font-semibold text-carbon">{protocol.completion}%</span>
                  </div>
                  <Progress value={protocol.completion} className="h-2" />
                </div>

                {/* Today's Stack */}
                <div className="border-t border-mist pt-6">
                  <h3 className="text-caption text-ash uppercase tracking-wider mb-4">Today's Stack</h3>
                  <div className="space-y-3">
                    {protocol.todaysStack.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-pearl flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-carbon" />
                          </div>
                          <span className="text-sm font-medium text-carbon">{item.supplement}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-ash">
                          <span>{item.dosage}</span>
                          <span className="text-carbon font-medium">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Create Protocol CTA */}
          <Card className="bg-pearl border-mist">
            <CardContent className="p-8 text-center">
              <h3 className="text-h3 font-semibold text-carbon mb-3">Ready to optimise something new?</h3>
              <p className="text-body text-ash mb-6 max-w-2xl mx-auto">
                Take another assessment to create a specialised protocol for different goals
              </p>
              <Button>Create Protocol</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
