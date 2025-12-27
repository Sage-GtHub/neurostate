import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface WhoopScoreRingProps {
  score: number; // 0-100
  label?: string;
  sublabel?: string;
  size?: "sm" | "md" | "lg" | number;
  strokeWidth?: number;
  showLabel?: boolean;
  color?: "green" | "yellow" | "red" | "auto";
  className?: string;
  animated?: boolean;
}

export function WhoopScoreRing({
  score,
  label,
  sublabel,
  size = "md",
  strokeWidth: customStrokeWidth,
  showLabel = true,
  color = "auto",
  className,
  animated = true,
}: WhoopScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Handle numeric or preset sizes
  const getSize = () => {
    if (typeof size === "number") return size;
    switch (size) {
      case "sm": return 80;
      case "lg": return 160;
      default: return 120;
    }
  };
  
  const ringSize = getSize();
  const strokeWidth = customStrokeWidth ?? (typeof size === "number" ? 8 : size === "sm" ? 6 : size === "lg" ? 10 : 8);
  
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

  // Determine color based on score (Whoop style)
  const getColor = () => {
    if (color !== "auto") {
      switch (color) {
        case "green": return "hsl(156, 100%, 47%)";
        case "yellow": return "hsl(45, 100%, 50%)";
        case "red": return "hsl(0, 85%, 55%)";
      }
    }
    if (animatedScore >= 67) return "hsl(156, 100%, 47%)"; // Green
    if (animatedScore >= 34) return "hsl(45, 100%, 50%)"; // Yellow
    return "hsl(0, 85%, 55%)"; // Red
  };

  const ringColor = getColor();
  
  // Font sizes based on ring size
  const scoreFontSize = Math.max(16, ringSize * 0.28);
  const labelFontSize = Math.max(8, ringSize * 0.06);

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Ring SVG */}
      <div className="relative" style={{ width: ringSize, height: ringSize }}>
        <svg
          width={ringSize}
          height={ringSize}
          className="transform -rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            stroke="hsl(0, 0%, 15%)"
          />
          
          {/* Progress ring */}
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
            stroke={ringColor}
            className="transition-all duration-1000 ease-out"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              filter: `drop-shadow(0 0 8px ${ringColor})`,
            }}
          />
        </svg>
        
        {/* Center content */}
        {showLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span 
              className="font-bold tracking-tight leading-none"
              style={{ 
                fontSize: scoreFontSize,
                color: ringColor,
              }}
            >
              {Math.round(animatedScore)}
            </span>
            {label && (
              <span 
                className="text-muted-foreground uppercase tracking-widest font-medium mt-1"
                style={{ fontSize: labelFontSize }}
              >
                {label}
              </span>
            )}
            {sublabel && (
              <span 
                className="text-muted-foreground uppercase tracking-widest"
                style={{ fontSize: Math.max(7, labelFontSize - 1) }}
              >
                {sublabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
