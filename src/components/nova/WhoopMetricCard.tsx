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
    icon: "text-signal-green",
    bg: "bg-signal-green/10",
    border: "border-signal-green/20",
  },
  yellow: {
    icon: "text-warning-amber",
    bg: "bg-warning-amber/10",
    border: "border-warning-amber/20",
  },
  red: {
    icon: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
  },
  purple: {
    icon: "text-plasma-purple",
    bg: "bg-plasma-purple/10",
    border: "border-plasma-purple/20",
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
  const trendColor = trend === "up" ? "text-signal-green" : trend === "down" ? "text-destructive" : "text-muted-foreground";

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