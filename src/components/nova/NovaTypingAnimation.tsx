import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface NovaTypingAnimationProps {
  className?: string;
  variant?: "default" | "minimal" | "orb";
}

export function NovaTypingAnimation({ className, variant = "default" }: NovaTypingAnimationProps) {
  if (variant === "orb") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <motion.div 
          className="relative w-10 h-10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Outer glow ring */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-accent/20"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.1, 0.4]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Inner orb */}
          <motion.div 
            className="absolute inset-1 rounded-full bg-gradient-to-br from-accent/60 to-accent/30 backdrop-blur-sm"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent-foreground/80" />
          </div>
        </motion.div>
        
        <div className="flex flex-col">
          <span className="text-xs font-medium text-foreground">Nova is thinking</span>
          <span className="text-[10px] text-foreground/40">Analysing your data...</span>
        </div>
      </div>
    );
  }
  
  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-foreground/40"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                y: [0, -3, 0]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <span className="text-xs text-foreground/40">Thinking</span>
      </div>
    );
  }

  // Default - Wave animation inspired by ChatGPT
  return (
    <div className={cn("flex items-center gap-3 py-4", className)}>
      <div className="relative">
        <motion.div 
          className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-4 h-4 text-foreground/60" />
        </motion.div>
        
        {/* Pulse ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-accent/30"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-foreground/30"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4],
              y: [0, -4, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}
