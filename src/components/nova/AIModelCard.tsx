import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Activity } from "lucide-react";

interface AIModelCardProps {
  name: string;
  category: string;
  parameters: string;
  useCase: string;
  performance: string;
  performanceLabel: string;
  icon?: "brain" | "trending" | "activity";
}

export function AIModelCard({
  name,
  category,
  parameters,
  useCase,
  performance,
  performanceLabel,
  icon = "brain"
}: AIModelCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "trending":
        return <TrendingUp className="w-5 h-5 text-accent" />;
      case "activity":
        return <Activity className="w-5 h-5 text-accent" />;
      default:
        return <Brain className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-mist/30 hover:border-accent/30 bg-gradient-to-br from-ivory to-pearl/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center flex-shrink-0">
              {getIcon()}
            </div>
            <div>
              <h3 className="text-[1.125rem] font-semibold text-carbon tracking-tight">{name}</h3>
              <Badge variant="secondary" className="mt-1">{category}</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-mist/20">
            <span className="text-sm text-ash">Parameters</span>
            <span className="text-sm font-semibold text-carbon">{parameters}</span>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b border-mist/20">
            <span className="text-sm text-ash">Use Case</span>
            <span className="text-sm font-medium text-carbon text-right max-w-[60%]">{useCase}</span>
          </div>
          
          <div className="flex items-center justify-between py-2 bg-accent/5 px-3 rounded-xl mt-4">
            <span className="text-sm text-ash">{performanceLabel}</span>
            <span className="text-[1.5rem] font-bold text-accent tracking-tight">{performance}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
