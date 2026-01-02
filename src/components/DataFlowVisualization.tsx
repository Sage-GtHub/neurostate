import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface DataNode {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'input' | 'process' | 'output';
}

const colors = [
  'hsl(var(--primary))',
  'hsl(220, 100%, 55%)',
  'hsl(270, 100%, 55%)',
  'hsl(156, 65%, 45%)',
];

export function DataFlowVisualization({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // Initialize particles
    const initialParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(initialParticles);

    const animate = () => {
      setParticles(prev => prev.map(p => {
        let newX = p.x + p.vx;
        let newY = p.y + p.vy;

        // Bounce off edges
        if (newX < 0 || newX > dimensions.width) p.vx *= -1;
        if (newY < 0 || newY > dimensions.height) p.vy *= -1;

        return {
          ...p,
          x: Math.max(0, Math.min(dimensions.width, newX)),
          y: Math.max(0, Math.min(dimensions.height, newY)),
        };
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);

  // Generate connection lines between nearby particles
  const connections: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = [];
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
      if (dist < 120) {
        connections.push({
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
          opacity: (1 - dist / 120) * 0.3,
        });
      }
    });
  });

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Connection lines */}
        {connections.map((conn, i) => (
          <line
            key={i}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            opacity={conn.opacity}
          />
        ))}

        {/* Particles */}
        {particles.map(p => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill={p.color}
            opacity={p.opacity}
          />
        ))}

        {/* Flowing data streams */}
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Animated flow paths */}
        {[0, 1, 2].map(i => (
          <motion.path
            key={i}
            d={`M 0 ${(dimensions.height / 4) * (i + 1)} 
                Q ${dimensions.width / 4} ${(dimensions.height / 4) * (i + 1) + Math.sin(i) * 30}, 
                  ${dimensions.width / 2} ${(dimensions.height / 4) * (i + 1)}
                Q ${(dimensions.width / 4) * 3} ${(dimensions.height / 4) * (i + 1) - Math.sin(i) * 30}, 
                  ${dimensions.width} ${(dimensions.height / 4) * (i + 1)}`}
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>

      {/* Glowing orbs */}
      <motion.div
        className="absolute w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
        animate={{
          x: [0, dimensions.width * 0.3, dimensions.width * 0.6, 0],
          y: [0, dimensions.height * 0.5, 0, dimensions.height * 0.3],
          opacity: [0.1, 0.2, 0.15, 0.1],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-24 h-24 rounded-full blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(270, 100%, 55%) 0%, transparent 70%)' }}
        animate={{
          x: [dimensions.width * 0.7, dimensions.width * 0.4, dimensions.width * 0.8, dimensions.width * 0.7],
          y: [dimensions.height * 0.2, dimensions.height * 0.6, dimensions.height * 0.4, dimensions.height * 0.2],
          opacity: [0.08, 0.15, 0.1, 0.08],
          scale: [0.9, 1.1, 1, 0.9],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Simpler neural network visualization for smaller spaces
export function NeuralNetworkVisual({ className = '' }: { className?: string }) {
  const nodes = [
    { layer: 0, count: 4 },
    { layer: 1, count: 6 },
    { layer: 2, count: 4 },
    { layer: 3, count: 2 },
  ];

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <defs>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(270, 100%, 55%)" />
          </linearGradient>
        </defs>

        {/* Draw connections */}
        {nodes.map((layerData, layerIdx) => {
          if (layerIdx === nodes.length - 1) return null;
          const nextLayer = nodes[layerIdx + 1];
          const connections: JSX.Element[] = [];

          for (let i = 0; i < layerData.count; i++) {
            for (let j = 0; j < nextLayer.count; j++) {
              const x1 = 50 + layerIdx * 100;
              const y1 = (200 / (layerData.count + 1)) * (i + 1);
              const x2 = 50 + (layerIdx + 1) * 100;
              const y2 = (200 / (nextLayer.count + 1)) * (j + 1);

              connections.push(
                <motion.line
                  key={`${layerIdx}-${i}-${j}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.5"
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: (i + j) * 0.1,
                  }}
                />
              );
            }
          }
          return connections;
        })}

        {/* Draw nodes */}
        {nodes.map((layerData, layerIdx) =>
          Array.from({ length: layerData.count }).map((_, nodeIdx) => {
            const x = 50 + layerIdx * 100;
            const y = (200 / (layerData.count + 1)) * (nodeIdx + 1);

            return (
              <motion.circle
                key={`node-${layerIdx}-${nodeIdx}`}
                cx={x}
                cy={y}
                r="8"
                fill="url(#nodeGradient)"
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{
                  scale: [0.8, 1, 0.8],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: layerIdx * 0.2,
                }}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

// Flowing signal visualization
export function SignalFlowVisual({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="signalGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="signalGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(270, 100%, 55%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(270, 100%, 55%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(270, 100%, 55%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="signalGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(156, 65%, 45%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(156, 65%, 45%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(156, 65%, 45%)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Signal waves */}
        {[
          { y: 50, gradient: 'signalGradient1', duration: 4, amplitude: 20 },
          { y: 100, gradient: 'signalGradient2', duration: 5, amplitude: 15 },
          { y: 150, gradient: 'signalGradient3', duration: 6, amplitude: 25 },
        ].map((wave, i) => (
          <motion.path
            key={i}
            d={`M -100 ${wave.y} ${Array.from({ length: 20 }).map((_, j) => 
              `Q ${j * 40 + 20} ${wave.y + (j % 2 === 0 ? -wave.amplitude : wave.amplitude)}, ${j * 40 + 40} ${wave.y}`
            ).join(' ')}`}
            fill="none"
            stroke={`url(#${wave.gradient})`}
            strokeWidth="2"
            initial={{ x: -100 }}
            animate={{ x: [0, -200] }}
            transition={{
              duration: wave.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Floating data points */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.circle
            key={`point-${i}`}
            r="3"
            fill="hsl(var(--primary))"
            initial={{ cx: 0, cy: 50 + i * 20, opacity: 0 }}
            animate={{
              cx: [0, 600],
              cy: [50 + i * 20, 50 + ((i + 3) % 8) * 20],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
