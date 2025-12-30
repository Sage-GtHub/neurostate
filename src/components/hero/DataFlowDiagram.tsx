import { motion } from "framer-motion";
import { Watch, Brain, Sparkles } from "lucide-react";

const DataFlowDiagram = () => {
  // Generate multiple particles for each connection
  const particles = [0, 1, 2, 3, 4];
  
  return (
    <div className="relative w-full max-w-md mx-auto py-8">
      {/* Connection lines and particles */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 400 80" 
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Gradient definitions */}
        <defs>
          {/* Glowing particle gradient */}
          <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          
          {/* Line glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Animated flow gradient - left to right */}
          <linearGradient id="flowGradient1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0">
              <animate attributeName="offset" values="-0.5;1" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8">
              <animate attributeName="offset" values="0;1.5" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0">
              <animate attributeName="offset" values="0.5;2" dur="2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          <linearGradient id="flowGradient2">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0">
              <animate attributeName="offset" values="-0.5;1" dur="2s" repeatCount="indefinite" begin="0.3s" />
            </stop>
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8">
              <animate attributeName="offset" values="0;1.5" dur="2s" repeatCount="indefinite" begin="0.3s" />
            </stop>
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0">
              <animate attributeName="offset" values="0.5;2" dur="2s" repeatCount="indefinite" begin="0.3s" />
            </stop>
          </linearGradient>
        </defs>

        {/* Base connection lines */}
        <motion.path
          d="M 80 40 L 160 40"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="2 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.path
          d="M 240 40 L 320 40"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="2 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Glowing flow lines */}
        <motion.path
          d="M 80 40 L 160 40"
          stroke="url(#flowGradient1)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        <motion.path
          d="M 240 40 L 320 40"
          stroke="url(#flowGradient2)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />

        {/* Multiple flowing particles - Devices to AI */}
        {particles.map((i) => (
          <motion.g key={`particle-left-${i}`}>
            {/* Outer glow */}
            <motion.circle
              r="6"
              fill="url(#particleGlow)"
              initial={{ cx: 80, cy: 40, opacity: 0 }}
              animate={{ 
                cx: [80, 120, 160],
                opacity: [0, 0.6, 0],
              }}
              transition={{ 
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
            {/* Core particle */}
            <motion.circle
              r="2.5"
              fill="hsl(var(--primary))"
              initial={{ cx: 80, cy: 40, opacity: 0 }}
              animate={{ 
                cx: [80, 120, 160],
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            />
          </motion.g>
        ))}

        {/* Multiple flowing particles - AI to Performance */}
        {particles.map((i) => (
          <motion.g key={`particle-right-${i}`}>
            {/* Outer glow */}
            <motion.circle
              r="6"
              fill="url(#particleGlow)"
              initial={{ cx: 240, cy: 40, opacity: 0 }}
              animate={{ 
                cx: [240, 280, 320],
                opacity: [0, 0.6, 0],
              }}
              transition={{ 
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.4 + 0.2,
                ease: "easeInOut"
              }}
            />
            {/* Core particle */}
            <motion.circle
              r="2.5"
              fill="hsl(var(--primary))"
              initial={{ cx: 240, cy: 40, opacity: 0 }}
              animate={{ 
                cx: [240, 280, 320],
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.4 + 0.2,
                ease: "easeInOut"
              }}
            />
          </motion.g>
        ))}

        {/* Data burst effect at AI node */}
        <motion.circle
          cx="200"
          cy="40"
          r="8"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ 
            scale: [0, 2, 3],
            opacity: [0.6, 0.2, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </svg>

      {/* Nodes */}
      <div className="relative z-10 flex items-center justify-between px-4">
        {/* Devices Node */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div 
            className="w-12 h-12 bg-background border border-border/50 rounded-xl flex items-center justify-center shadow-sm relative overflow-hidden"
            whileHover={{ scale: 1.1, borderColor: "hsl(var(--primary) / 0.5)" }}
          >
            {/* Subtle pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-primary/30"
              animate={{ 
                scale: [1, 1.3, 1.3],
                opacity: [0.4, 0, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <Watch className="w-5 h-5 text-muted-foreground" />
          </motion.div>
          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">
            Devices
          </span>
        </motion.div>

        {/* AI Node - Center, larger */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center relative"
            animate={{ 
              scale: [1, 1.03, 1],
              borderColor: [
                "hsl(var(--primary) / 0.3)",
                "hsl(var(--primary) / 0.6)",
                "hsl(var(--primary) / 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Inner glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-primary/5"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <Brain className="w-7 h-7 text-primary relative z-10" />
            
            {/* Multiple orbiting dots */}
            <motion.div
              className="absolute w-2 h-2 bg-primary rounded-full shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ 
                transformOrigin: "0px 0px",
                top: "50%",
                left: "50%",
                marginTop: "-4px",
                marginLeft: "28px"
              }}
            />
            <motion.div
              className="absolute w-1.5 h-1.5 bg-primary/60 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ 
                transformOrigin: "0px 0px",
                top: "50%",
                left: "50%",
                marginTop: "-3px",
                marginLeft: "22px"
              }}
            />
          </motion.div>
          <span className="text-[9px] text-primary uppercase tracking-wider font-medium">
            Nova AI
          </span>
        </motion.div>

        {/* Performance Node */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div 
            className="w-12 h-12 bg-background border border-border/50 rounded-xl flex items-center justify-center shadow-sm relative overflow-hidden"
            whileHover={{ scale: 1.1, borderColor: "hsl(var(--primary) / 0.5)" }}
          >
            {/* Subtle pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-primary/30"
              animate={{ 
                scale: [1, 1.3, 1.3],
                opacity: [0.4, 0, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            />
            <Sparkles className="w-5 h-5 text-muted-foreground" />
          </motion.div>
          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">
            Performance
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default DataFlowDiagram;