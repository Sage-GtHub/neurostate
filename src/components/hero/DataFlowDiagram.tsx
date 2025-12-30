import { motion } from "framer-motion";
import { Watch, Brain, Sparkles } from "lucide-react";

const DataFlowDiagram = () => {
  return (
    <div className="relative w-full max-w-md mx-auto py-8">
      {/* Connection lines */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 400 80" 
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Animated gradient definition */}
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.3" />
            <animate
              attributeName="x1"
              values="-100%;100%"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values="0%;200%"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        {/* Line from Devices to AI */}
        <motion.path
          d="M 80 40 L 160 40"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.path
          d="M 80 40 L 160 40"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Line from AI to Performance */}
        <motion.path
          d="M 240 40 L 320 40"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.path
          d="M 240 40 L 320 40"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* Animated dots flowing */}
        <motion.circle
          r="3"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            cx: [80, 120, 160, 160],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
        >
          <animate attributeName="cy" values="40;40" dur="2s" repeatCount="indefinite" />
        </motion.circle>

        <motion.circle
          r="3"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            cx: [240, 280, 320, 320],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: 1.5,
            ease: "easeInOut"
          }}
        >
          <animate attributeName="cy" values="40;40" dur="2s" repeatCount="indefinite" />
        </motion.circle>
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
            className="w-12 h-12 bg-background border border-border/50 rounded-xl flex items-center justify-center shadow-sm"
            animate={{ 
              boxShadow: [
                "0 0 0 0 hsl(var(--primary) / 0)",
                "0 0 0 8px hsl(var(--primary) / 0.1)",
                "0 0 0 0 hsl(var(--primary) / 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
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
              scale: [1, 1.05, 1],
              borderColor: [
                "hsl(var(--primary) / 0.3)",
                "hsl(var(--primary) / 0.6)",
                "hsl(var(--primary) / 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Brain className="w-7 h-7 text-primary" />
            {/* Orbiting dot */}
            <motion.div
              className="absolute w-2 h-2 bg-primary rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ 
                transformOrigin: "32px 32px",
                top: "-4px",
                left: "50%",
                marginLeft: "-4px"
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
            className="w-12 h-12 bg-background border border-border/50 rounded-xl flex items-center justify-center shadow-sm"
            animate={{ 
              boxShadow: [
                "0 0 0 0 hsl(var(--primary) / 0)",
                "0 0 0 8px hsl(var(--primary) / 0.1)",
                "0 0 0 0 hsl(var(--primary) / 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
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
