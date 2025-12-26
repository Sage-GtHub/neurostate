import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface DataNode {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface DataStream {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  color: string;
}

const DataVisualization = () => {
  const [nodes, setNodes] = useState<DataNode[]>([]);
  const [streams, setStreams] = useState<DataStream[]>([]);
  const [metrics, setMetrics] = useState({
    processed: 0,
    active: 0,
    latency: 0,
  });

  // Generate random nodes
  useEffect(() => {
    const generateNodes = () => {
      const newNodes: DataNode[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      }));
      setNodes(newNodes);
    };
    generateNodes();
  }, []);

  // Animate nodes floating upward
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        y: node.y <= 0 ? 100 : node.y - node.speed * 0.1,
        opacity: Math.sin(Date.now() * 0.001 * node.speed) * 0.3 + 0.4,
      })));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate data streams
  useEffect(() => {
    const createStream = () => {
      const colors = [
        "rgba(16, 185, 129, 0.6)",
        "rgba(6, 182, 212, 0.6)",
        "rgba(139, 92, 246, 0.4)",
      ];
      const newStream: DataStream = {
        id: Date.now(),
        startX: Math.random() * 30,
        startY: Math.random() * 100,
        endX: 70 + Math.random() * 30,
        endY: Math.random() * 100,
        progress: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setStreams(prev => [...prev.slice(-10), newStream]);
    };

    const interval = setInterval(createStream, 800);
    return () => clearInterval(interval);
  }, []);

  // Animate streams
  useEffect(() => {
    const interval = setInterval(() => {
      setStreams(prev => 
        prev
          .map(stream => ({ ...stream, progress: stream.progress + 0.02 }))
          .filter(stream => stream.progress < 1)
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Animate metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        processed: Math.floor(Math.random() * 500 + 2500),
        active: Math.floor(Math.random() * 50 + 150),
        latency: Math.floor(Math.random() * 10 + 5),
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path 
              d="M 60 0 L 0 0 0 60" 
              fill="none" 
              stroke="rgba(255,255,255,0.03)" 
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Floating particles */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map(node => (
          <circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="rgba(16, 185, 129, 0.4)"
            opacity={node.opacity}
            className="transition-all duration-300"
          />
        ))}
      </svg>

      {/* Data streams */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          {streams.map(stream => (
            <linearGradient 
              key={`grad-${stream.id}`} 
              id={`stream-grad-${stream.id}`}
              x1="0%" y1="0%" x2="100%" y2="0%"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop offset={`${stream.progress * 100}%`} stopColor={stream.color} />
              <stop offset={`${Math.min(stream.progress * 100 + 20, 100)}%`} stopColor="transparent" />
            </linearGradient>
          ))}
        </defs>
        {streams.map(stream => (
          <line
            key={stream.id}
            x1={`${stream.startX}%`}
            y1={`${stream.startY}%`}
            x2={`${stream.endX}%`}
            y2={`${stream.endY}%`}
            stroke={`url(#stream-grad-${stream.id})`}
            strokeWidth="1"
            opacity={1 - stream.progress * 0.5}
          />
        ))}
      </svg>

      {/* Hexagonal nodes at intersections */}
      <div className="absolute inset-0">
        {[
          { x: 15, y: 25, delay: 0 },
          { x: 75, y: 35, delay: 0.5 },
          { x: 45, y: 70, delay: 1 },
          { x: 85, y: 75, delay: 1.5 },
          { x: 25, y: 55, delay: 2 },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 animate-pulse"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              animationDelay: `${node.delay}s`,
            }}
          >
            <div className="w-full h-full bg-emerald-500/30 rotate-45 border border-emerald-500/50" />
          </div>
        ))}
      </div>

      {/* Floating metrics HUD elements */}
      <div className="absolute top-8 left-8 hidden lg:block">
        <div className="space-y-2 font-mono text-[10px]">
          <div className="flex items-center gap-2 text-white/30">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>DATA_STREAMS</span>
            <span className="text-emerald-400">{metrics.processed}/s</span>
          </div>
          <div className="flex items-center gap-2 text-white/30">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span>ACTIVE_NODES</span>
            <span className="text-cyan-400">{metrics.active}</span>
          </div>
        </div>
      </div>

      <div className="absolute top-8 right-8 hidden lg:block">
        <div className="space-y-2 font-mono text-[10px] text-right">
          <div className="flex items-center justify-end gap-2 text-white/30">
            <span className="text-emerald-400">{metrics.latency}ms</span>
            <span>LATENCY</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="flex items-center justify-end gap-2 text-white/30">
            <span className="text-emerald-400">OPTIMAL</span>
            <span>STATUS</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/10" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/10" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/10" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/10" />

      {/* Scan line */}
      <div 
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
        style={{
          animation: "scanDown 8s linear infinite",
        }}
      />

      <style>{`
        @keyframes scanDown {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default DataVisualization;
