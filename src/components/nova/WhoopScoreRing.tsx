import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface WhoopScoreRingProps {
  score: number; // 0-100
  label: string;
  sublabel?: string;
  size?: "sm" | "md" | "lg";
  color?: "green" | "yellow" | "red" | "cyan" | "purple";
  className?: string;
  animated?: boolean;
}

const colorVariants = {
  green: {
    stroke: "stroke-green-500",
    fill: "fill-green-500",
    glow: "drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]",
    bg: "text-green-500/20",
  },
  yellow: {
    stroke: "stroke-yellow-500",
    fill: "fill-yellow-500",
    glow: "drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]",
    bg: "text-yellow-500/20",
  },
  red: {
    stroke: "stroke-red-500",
    fill: "fill-red-500",
    glow: "drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]",
    bg: "text-red-500/20",
  },
  cyan: {
    stroke: "stroke-accent",
    fill: "fill-accent",
    glow: "drop-shadow-[0_0_8px_hsl(var(--accent)/0.5)]",
    bg: "text-accent/20",
  },
  purple: {
    stroke: "stroke-purple-500",
    fill: "fill-purple-500",
    glow: "drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
    bg: "text-purple-500/20",
  },
};

const sizeVariants = {
  sm: { size: 80, strokeWidth: 6, fontSize: "text-xl", labelSize: "text-[10px]" },
  md: { size: 120, strokeWidth: 8, fontSize: "text-3xl", labelSize: "text-xs" },
  lg: { size: 160, strokeWidth: 10, fontSize: "text-4xl", labelSize: "text-sm" },
};

export function WhoopScoreRing({
  score,
  label,
  sublabel,
  size = "md",
  color = "green",
  className,
  animated = true,
}: WhoopScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const { size: ringSize, strokeWidth, fontSize, labelSize } = sizeVariants[size];
  const colors = colorVariants[color];
  
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedScore(score);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedScore(score);
    }
  }, [score, animated]);

  // Determine color based on score if not explicitly set
  const autoColor = score >= 67 ? "green" : score >= 34 ? "yellow" : "red";
  const activeColors = color === "green" ? colorVariants[autoColor] : colors;

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Ring SVG */}
      <div className="relative" style={{ width: ringSize, height: ringSize }}>
        <svg
          width={ringSize}
          height={ringSize}
          className={cn("transform -rotate-90", animated && colors.glow)}
        >
          {/* Background ring */}
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-muted/30 fill-none"
          />
          
          {/* Progress ring */}
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={cn("fill-none transition-all duration-1000 ease-out", activeColors.stroke)}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold tracking-tight", fontSize)}>
            {Math.round(animatedScore)}
          </span>
          {sublabel && (
            <span className={cn("text-muted-foreground uppercase tracking-widest", labelSize)}>
              {sublabel}
            </span>
          )}
        </div>
      </div>
      
      {/* Label */}
      <span className={cn(
        "mt-2 font-medium uppercase tracking-wider text-muted-foreground",
        labelSize
      )}>
        {label}
      </span>
    </div>
  );
}