import { motion } from "framer-motion";
import { Watch, Brain, Sparkles } from "lucide-react";

const DataFlowDiagram = () => {
  // Data types with distinct colors
  const dataTypes = [
    { name: "Heart Rate", color: "239, 68, 68", hue: "0 84% 60%" }, // Red
    { name: "Sleep", color: "99, 102, 241", hue: "239 84% 67%" }, // Indigo
    { name: "Stress", color: "34, 197, 94", hue: "142 71% 45%" }, // Green
  ];

  return (
    <div className="relative w-full max-w-md mx-auto py-8">
      {/* Connection lines and particles */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 400 100" 
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Gradient definitions for each data type */}
        <defs>
          {/* Glow filters for each color */}
          {dataTypes.map((type, i) => (
            <filter key={`glow-${i}`} id={`glow-${i}`} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          ))}

          {/* Radial gradients for glowing particles */}
          {dataTypes.map((type, i) => (
            <radialGradient key={`particle-glow-${i}`} id={`particleGlow-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={`rgb(${type.color})`} stopOpacity="1" />
              <stop offset="40%" stopColor={`rgb(${type.color})`} stopOpacity="0.6" />
              <stop offset="100%" stopColor={`rgb(${type.color})`} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* Base connection lines - curved paths */}
        <motion.path
          d="M 80 50 Q 120 50 160 50"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="3 6"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.path
          d="M 240 50 Q 280 50 320 50"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="3 6"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Multi-lane paths for different data types - Left side */}
        {dataTypes.map((type, i) => {
          const yOffset = 42 + (i * 8); // Stagger vertically
          return (
            <g key={`left-lane-${i}`}>
              {/* Multiple particles per lane */}
              {[0, 1, 2].map((p) => (
                <motion.g key={`left-particle-${i}-${p}`}>
                  {/* Outer glow */}
                  <motion.circle
                    r="8"
                    fill={`url(#particleGlow-${i})`}
                    initial={{ cx: 80, cy: yOffset, opacity: 0 }}
                    animate={{ 
                      cx: [80, 120, 160],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: p * 0.7 + i * 0.25,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Core particle */}
                  <motion.circle
                    r="2.5"
                    fill={`rgb(${type.color})`}
                    filter={`url(#glow-${i})`}
                    initial={{ cx: 80, cy: yOffset, opacity: 0 }}
                    animate={{ 
                      cx: [80, 120, 160],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: p * 0.7 + i * 0.25,
                      ease: "easeInOut"
                    }}
                  />
                </motion.g>
              ))}
            </g>
          );
        })}

        {/* Multi-lane paths for different data types - Right side */}
        {dataTypes.map((type, i) => {
          const yOffset = 42 + (i * 8);
          return (
            <g key={`right-lane-${i}`}>
              {[0, 1, 2].map((p) => (
                <motion.g key={`right-particle-${i}-${p}`}>
                  {/* Outer glow */}
                  <motion.circle
                    r="8"
                    fill={`url(#particleGlow-${i})`}
                    initial={{ cx: 240, cy: yOffset, opacity: 0 }}
                    animate={{ 
                      cx: [240, 280, 320],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: p * 0.7 + i * 0.25 + 0.3,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Core particle */}
                  <motion.circle
                    r="2.5"
                    fill={`rgb(${type.color})`}
                    filter={`url(#glow-${i})`}
                    initial={{ cx: 240, cy: yOffset, opacity: 0 }}
                    animate={{ 
                      cx: [240, 280, 320],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: p * 0.7 + i * 0.25 + 0.3,
                      ease: "easeInOut"
                    }}
                  />
                </motion.g>
              ))}
            </g>
          );
        })}

        {/* Data merge effect at AI node */}
        {dataTypes.map((type, i) => (
          <motion.circle
            key={`burst-${i}`}
            cx="200"
            cy="50"
            r="6"
            fill="none"
            stroke={`rgb(${type.color})`}
            strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 2.5],
              opacity: [0.8, 0.3, 0],
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
          />
        ))}
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
            {/* Multi-color pulse rings */}
            {dataTypes.map((type, i) => (
              <motion.div
                key={`device-ring-${i}`}
                className="absolute inset-0 rounded-xl"
                style={{ border: `2px solid rgb(${type.color})`, opacity: 0.3 }}
                animate={{ 
                  scale: [1, 1.4, 1.4],
                  opacity: [0.3, 0, 0],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
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
            
            {/* Orbiting dots with data type colors */}
            {dataTypes.map((type, i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute w-2 h-2 rounded-full shadow-lg"
                style={{ backgroundColor: `rgb(${type.color})` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                initial={{ 
                  top: "50%",
                  left: "50%",
                  marginTop: "-4px",
                  marginLeft: `${24 + i * 4}px`,
                  transformOrigin: `${-24 - i * 4}px 4px`
                }}
              />
            ))}
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
            {/* Multi-color pulse rings */}
            {dataTypes.map((type, i) => (
              <motion.div
                key={`perf-ring-${i}`}
                className="absolute inset-0 rounded-xl"
                style={{ border: `2px solid rgb(${type.color})`, opacity: 0.3 }}
                animate={{ 
                  scale: [1, 1.4, 1.4],
                  opacity: [0.3, 0, 0],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 + 1 }}
              />
            ))}
            <Sparkles className="w-5 h-5 text-muted-foreground" />
          </motion.div>
          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">
            Performance
          </span>
        </motion.div>
      </div>

      {/* Data type legend */}
      <motion.div 
        className="flex items-center justify-center gap-4 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {dataTypes.map((type, i) => (
          <motion.div 
            key={type.name}
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.1 }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: `rgb(${type.color})` }}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <span className="text-[8px] text-muted-foreground uppercase tracking-wider">
              {type.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DataFlowDiagram;