import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sunrise, Activity, Brain, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MorningCheckInProps {
  data: {
    sleepHours: number;
    hrvChange: number;
    recoveryScore: number;
    recommendation: string;
    adjustedProtocol: string[];
  };
  onDismiss: () => void;
}

export function MorningCheckIn({ data, onDismiss }: MorningCheckInProps) {
  return (
    <Card className="border-2 border-carbon">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-carbon flex items-center justify-center">
            <Sunrise className="w-5 h-5 text-ivory" />
          </div>
          <div className="flex-1">
            <h3 className="text-body font-semibold text-carbon">Good Morning</h3>
            <p className="text-caption text-ash">Your personalised check-in from Nova</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            Dismiss
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-ash" />
              <span className="text-caption text-ash uppercase tracking-wider">Sleep</span>
            </div>
            <div className="text-2xl font-semibold text-carbon">{data.sleepHours}h</div>
          </div>
          
          <div className="text-center border-x border-mist">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-ash" />
              <span className="text-caption text-ash uppercase tracking-wider">HRV</span>
            </div>
            <div className={`text-2xl font-semibold ${
              data.hrvChange < 0 ? "text-ash" : "text-[#10b981]"
            }`}>
              {data.hrvChange > 0 ? "+" : ""}{data.hrvChange}%
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-ash" />
              <span className="text-caption text-ash uppercase tracking-wider">Recovery</span>
            </div>
            <div className="text-2xl font-semibold text-carbon">{data.recoveryScore}%</div>
          </div>
        </div>

        <div className="bg-pearl/50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-semibold text-carbon mb-2">Today&apos;s Recommendation</h4>
          <p className="text-sm text-ash leading-relaxed">{data.recommendation}</p>
        </div>

        {data.adjustedProtocol.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-carbon text-ivory">Protocol Adjusted</Badge>
            </div>
            <ul className="space-y-2">
              {data.adjustedProtocol.map((adjustment, index) => (
                <li key={index} className="text-sm text-ash flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-carbon" />
                  {adjustment}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}