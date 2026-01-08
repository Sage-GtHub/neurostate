import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface ArcSegmentProps {
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  color: string;
  opacity?: number;
  animated?: boolean;
  animationSpeed?: number;
  glowIntensity?: number;
}

const ArcSegment = ({ 
  innerRadius, 
  outerRadius, 
  startAngle, 
  endAngle, 
  color, 
  opacity = 1,
  animated = false,
  animationSpeed = 1,
  glowIntensity = 0
}: ArcSegmentProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const segments = 64;
    
    // Outer arc
    for (let i = 0; i <= segments; i++) {
      const angle = startAngle + (endAngle - startAngle) * (i / segments);
      const x = Math.cos(angle) * outerRadius;
      const y = Math.sin(angle) * outerRadius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    
    // Inner arc (reverse)
    for (let i = segments; i >= 0; i--) {
      const angle = startAngle + (endAngle - startAngle) * (i / segments);
      const x = Math.cos(angle) * innerRadius;
      const y = Math.sin(angle) * innerRadius;
      shape.lineTo(x, y);
    }
    
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, [innerRadius, outerRadius, startAngle, endAngle]);

  useFrame((state) => {
    if (animated && materialRef.current) {
      const time = state.clock.getElapsedTime();
      const pulse = Math.sin(time * animationSpeed) * 0.15 + 0.85;
      materialRef.current.opacity = opacity * pulse;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial 
        ref={materialRef}
        color={color} 
        transparent 
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

interface ScoreRingProps {
  radius: number;
  thickness: number;
  score: number;
  maxScore: number;
  color: string;
  bgColor: string;
  label: string;
  animationDelay?: number;
}

const ScoreRing = ({ 
  radius, 
  thickness, 
  score, 
  maxScore, 
  color, 
  bgColor,
  label,
  animationDelay = 0
}: ScoreRingProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  
  const targetProgress = score / maxScore;
  const startAngle = -Math.PI / 2;
  const fullAngle = Math.PI * 2;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (time > animationDelay) {
      progressRef.current = THREE.MathUtils.lerp(
        progressRef.current,
        targetProgress,
        0.02
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background ring */}
      <ArcSegment
        innerRadius={radius - thickness / 2}
        outerRadius={radius + thickness / 2}
        startAngle={0}
        endAngle={Math.PI * 2}
        color={bgColor}
        opacity={0.15}
      />
      
      {/* Progress arc */}
      <ArcSegment
        innerRadius={radius - thickness / 2}
        outerRadius={radius + thickness / 2}
        startAngle={startAngle}
        endAngle={startAngle + fullAngle * targetProgress}
        color={color}
        opacity={0.9}
        animated
        animationSpeed={1.5}
      />
    </group>
  );
};

const CenterScore = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.02);
    }
  });

  return (
    <group ref={groupRef}>
      <Html center distanceFactor={8}>
        <div className="flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="text-5xl font-light text-foreground tracking-tight">87</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Readiness</span>
        </div>
      </Html>
    </group>
  );
};

const MetricLabel = ({ position, value, label, color }: { 
  position: [number, number, number]; 
  value: string; 
  label: string;
  color: string;
}) => {
  return (
    <Html position={position} center distanceFactor={10}>
      <div className="bg-background/95 backdrop-blur-md border border-border/50 px-3 py-2 rounded-xl shadow-lg pointer-events-none select-none whitespace-nowrap">
        <p className="text-lg font-medium" style={{ color }}>{value}</p>
        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{label}</p>
      </div>
    </Html>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 1.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ea4428"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const DashboardScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer ring - Recovery */}
      <ScoreRing
        radius={2.2}
        thickness={0.18}
        score={94}
        maxScore={100}
        color="#10b981"
        bgColor="#10b981"
        label="Recovery"
        animationDelay={0.2}
      />
      
      {/* Middle ring - Strain */}
      <ScoreRing
        radius={1.8}
        thickness={0.18}
        score={12.4}
        maxScore={21}
        color="#3b82f6"
        bgColor="#3b82f6"
        label="Strain"
        animationDelay={0.4}
      />
      
      {/* Inner ring - Sleep */}
      <ScoreRing
        radius={1.4}
        thickness={0.18}
        score={85}
        maxScore={100}
        color="#ea4428"
        bgColor="#ea4428"
        label="Sleep"
        animationDelay={0.6}
      />
      
      {/* Center score */}
      <CenterScore />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Metric labels */}
      <MetricLabel position={[2.8, 1.2, 0]} value="94%" label="Recovery" color="#10b981" />
      <MetricLabel position={[-2.6, -0.5, 0]} value="12.4" label="Strain" color="#3b82f6" />
      <MetricLabel position={[1.5, -2.2, 0]} value="85%" label="Sleep" color="#ea4428" />
    </group>
  );
};

const RadialDashboard = () => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.4} />
        <DashboardScene />
      </Canvas>
    </div>
  );
};

export default RadialDashboard;
