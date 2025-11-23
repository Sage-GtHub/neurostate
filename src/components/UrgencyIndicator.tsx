import { Clock, Flame, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";

interface UrgencyIndicatorProps {
  type: "low-stock" | "trending" | "limited-time" | "popular";
  count?: number;
  className?: string;
}

export const UrgencyIndicator = ({ type, count, className = "" }: UrgencyIndicatorProps) => {
  const indicators = {
    "low-stock": {
      icon: AlertCircle,
      text: count ? `Only ${count} left` : "Low stock",
      variant: "destructive" as const,
      color: "text-destructive",
    },
    "trending": {
      icon: TrendingUp,
      text: "Trending",
      variant: "default" as const,
      color: "text-carbon",
    },
    "limited-time": {
      icon: Clock,
      text: "Limited time",
      variant: "secondary" as const,
      color: "text-carbon",
    },
    "popular": {
      icon: Flame,
      text: "Popular choice",
      variant: "default" as const,
      color: "text-carbon",
    },
  };

  const config = indicators[type];
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant}
      className={`flex items-center gap-1 ${className}`}
    >
      <Icon className="h-3 w-3" />
      <span className="text-[0.625rem] uppercase tracking-wider">{config.text}</span>
    </Badge>
  );
};
