import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

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
    hoverBg: "group-hover:bg-accent/15",
  },
  green: {
    icon: "text-signal-green",
    bg: "bg-signal-green/10",
    hoverBg: "group-hover:bg-signal-green/15",
  },
  yellow: {
    icon: "text-warning-amber",
    bg: "bg-warning-amber/10",
    hoverBg: "group-hover:bg-warning-amber/15",
  },
  red: {
    icon: "text-destructive",
    bg: "bg-destructive/10",
    hoverBg: "group-hover:bg-destructive/15",
  },
  purple: {
    icon: "text-plasma-purple",
    bg: "bg-plasma-purple/10",
    hoverBg: "group-hover:bg-plasma-purple/15",
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
    <motion.div 
      whileHover={{ y: -2 }}
      className={cn(
        "group relative p-4 rounded-xl",
        "bg-card border border-border/50",
        "hover:border-border hover:shadow-md",
        "transition-all duration-300",
        className
      )}
    >
      {/* Icon */}
      <div className={cn(
        "w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300",
        colors.bg, colors.hoverBg
      )}>
        <Icon className={cn("w-4.5 h-4.5", colors.icon)} />
      </div>
      
      {/* Label */}
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-mono">
        {label}
      </p>
      
      {/* Value */}
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      
      {/* Trend */}
      {trend && trendValue && (
        <div className={cn("flex items-center gap-1 mt-2", trendColor)}>
          <TrendIcon className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">{trendValue}</span>
        </div>
      )}
    </motion.div>
  );
}
