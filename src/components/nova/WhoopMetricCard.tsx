import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface WhoopMetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "cyan" | "green" | "yellow" | "red" | "purple";
  className?: string;
}

const colorVariants = {
  cyan: {
    icon: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  green: {
    icon: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  yellow: {
    icon: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  red: {
    icon: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  purple: {
    icon: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
};

export function WhoopMetricCard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  trendValue,
  color = "cyan",
  className,
}: WhoopMetricCardProps) {
  const colors = colorVariants[color];
  
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground";

  return (
    <div 
      className={cn(
        "group relative p-4 rounded-2xl",
        "bg-card/50 border border-border/50",
        "hover:bg-card hover:border-border",
        "transition-all duration-300",
        className
      )}
    >
      {/* Icon */}
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
        colors.bg, colors.border, "border"
      )}>
        <Icon className={cn("w-5 h-5", colors.icon)} />
      </div>
      
      {/* Label */}
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </p>
      
      {/* Value */}
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      
      {/* Trend */}
      {trend && trendValue && (
        <div className={cn("flex items-center gap-1 mt-2", trendColor)}>
          <TrendIcon className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{trendValue}</span>
        </div>
      )}
    </div>
  );
}