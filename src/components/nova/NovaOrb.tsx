import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface NovaOrbProps {
  isActive?: boolean;
  isSpeaking?: boolean;
  isListening?: boolean;
  audioLevel?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function NovaOrb({ 
  isActive = false, 
  isSpeaking = false, 
  isListening = false,
  audioLevel = 0,
  size = "md",
  className 
}: NovaOrbProps) {
  const [pulseIntensity, setPulseIntensity] = useState(0);
  
  useEffect(() => {
    if (isSpeaking || isListening) {
      setPulseIntensity(Math.min(1, audioLevel * 2));
    } else {
      setPulseIntensity(0);
    }
  }, [audioLevel, isSpeaking, isListening]);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const glowSizes = {
    sm: "blur-lg",
    md: "blur-xl",
    lg: "blur-2xl",
    xl: "blur-3xl"
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer glow ring - Hume AI inspired */}
      <div 
        className={cn(
          "absolute rounded-full transition-all duration-300",
          sizeClasses[size],
          glowSizes[size],
          isActive ? "opacity-60" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(circle, hsl(var(--cyber-blue) / ${0.4 + pulseIntensity * 0.4}) 0%, hsl(var(--electric-cyan) / ${0.2 + pulseIntensity * 0.3}) 50%, transparent 70%)`,
          transform: `scale(${1.8 + pulseIntensity * 0.5})`,
        }}
      />
      
      {/* Secondary glow - pulsing ring */}
      <div 
        className={cn(
          "absolute rounded-full transition-all duration-200",
          sizeClasses[size],
          isActive && "animate-ping"
        )}
        style={{
          background: `radial-gradient(circle, hsl(var(--electric-cyan) / 0.3) 0%, transparent 70%)`,
          transform: "scale(1.4)",
          animationDuration: "2s",
        }}
      />
      
      {/* Main orb with gradient */}
      <div 
        className={cn(
          "relative rounded-full flex items-center justify-center transition-all duration-300",
          sizeClasses[size],
          "nova-gradient",
          isActive && "nova-glow-pulse"
        )}
        style={{
          boxShadow: isActive 
            ? `0 0 ${20 + pulseIntensity * 40}px hsl(var(--cyber-blue) / ${0.5 + pulseIntensity * 0.3})`
            : undefined,
        }}
      >
        {/* Inner highlight */}
        <div 
          className="absolute inset-1 rounded-full opacity-30"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)"
          }}
        />
        
        {/* Audio visualizer bars - shown when active */}
        {isActive && (
          <div className="flex items-center justify-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 bg-white/90 rounded-full transition-all duration-75"
                style={{
                  height: `${Math.max(4, (isSpeaking || isListening) ? (6 + pulseIntensity * 12 * (1 + Math.sin(i * 0.8))) : 6)}px`,
                }}
              />
            ))}
          </div>
        )}
        
        {/* Static icon when not active */}
        {!isActive && (
          <div className="w-1/3 h-1/3 rounded-full bg-white/20" />
        )}
      </div>
      
      {/* Status indicator dot */}
      {isActive && (
        <div 
          className={cn(
            "absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-background",
            isSpeaking ? "bg-accent animate-pulse" : isListening ? "bg-green-500 animate-pulse" : "bg-green-500"
          )}
          style={{
            width: size === "sm" ? 8 : size === "md" ? 10 : size === "lg" ? 12 : 14,
            height: size === "sm" ? 8 : size === "md" ? 10 : size === "lg" ? 12 : 14,
          }}
        />
      )}
    </div>
  );
}