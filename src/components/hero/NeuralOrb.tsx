import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Ring, Html } from '@react-three/drei';
import * as THREE from 'three';

interface DataRingProps {
  radius: number;
  speed: number;
  color: string;
  thickness: number;
  rotationAxis: 'x' | 'y' | 'z';
  initialRotation?: number;
}

const DataRing = ({ radius, speed, color, thickness, rotationAxis, initialRotation = 0 }: DataRingProps) => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      const time = state.clock.getElapsedTime();
      ringRef.current.rotation[rotationAxis] = time * speed + initialRotation;
    }
  });

  return (
    <Ring
      ref={ringRef}
      args={[radius - thickness / 2, radius + thickness / 2, 64]}
      rotation={[
        rotationAxis === 'x' ? Math.PI / 2 : Math.PI / 3,
        rotationAxis === 'y' ? Math.PI / 4 : 0,
        rotationAxis === 'z' ? Math.PI / 6 : 0
      ]}
    >
      <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
    </Ring>
  );
};

interface DataPointProps {
  radius: number;
  speed: number;
  color: string;
  size: number;
  offset: number;
}

const DataPoint = ({ radius, speed, color, size, offset }: DataPointProps) => {
  const pointRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (pointRef.current) {
      const time = state.clock.getElapsedTime() * speed + offset;
      pointRef.current.position.x = Math.cos(time) * radius;
      pointRef.current.position.z = Math.sin(time) * radius;
      pointRef.current.position.y = Math.sin(time * 2) * 0.3;
    }
  });

  return (
    <Sphere ref={pointRef} args={[size, 16, 16]}>
      <meshBasicMaterial color={color} />
    </Sphere>
  );
};

interface MetricLabelProps {
  position: [number, number, number];
  value: string;
  label: string;
  color: string;
}

const MetricLabel = ({ position, value, label, color }: MetricLabelProps) => {
  return (
    <Html position={position} center distanceFactor={10}>
      <div className="bg-background/95 backdrop-blur-md border border-border/50 px-3 py-1.5 rounded-lg shadow-lg pointer-events-none select-none whitespace-nowrap">
        <p className="text-sm font-medium" style={{ color }}>{value}</p>
        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{label}</p>
      </div>
    </Html>
  );
};

const CoreOrb = () => {
  const orbRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (orbRef.current && glowRef.current) {
      const time = state.clock.getElapsedTime();
      const pulse = Math.sin(time * 2) * 0.05 + 1;
      orbRef.current.scale.setScalar(pulse);
      glowRef.current.scale.setScalar(pulse * 1.3);
      
      // Subtle rotation
      orbRef.current.rotation.y = time * 0.1;
      orbRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Inner glow */}
      <Sphere ref={glowRef} args={[1.2, 32, 32]}>
        <meshBasicMaterial color="#ea4428" transparent opacity={0.1} />
      </Sphere>
      
      {/* Core sphere */}
      <Sphere ref={orbRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#ea4428"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Surface detail layer */}
      <Sphere args={[1.01, 32, 32]}>
        <meshBasicMaterial color="#ea4428" transparent opacity={0.08} wireframe />
      </Sphere>
    </group>
  );
};

const OrbScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  const dataPoints = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      radius: 2.2 + (i % 3) * 0.4,
      speed: 0.3 + (i % 4) * 0.1,
      color: i % 2 === 0 ? '#ea4428' : '#10b981',
      size: 0.06,
      offset: (i / 8) * Math.PI * 2,
    })), []
  );

  return (
    <group ref={groupRef}>
      <CoreOrb />
      
      {/* Orbiting data rings */}
      <DataRing radius={1.8} speed={0.2} color="#ea4428" thickness={0.02} rotationAxis="y" />
      <DataRing radius={2.2} speed={-0.15} color="#10b981" thickness={0.015} rotationAxis="x" initialRotation={Math.PI / 4} />
      <DataRing radius={2.6} speed={0.1} color="#3b82f6" thickness={0.015} rotationAxis="z" initialRotation={Math.PI / 6} />
      
      {/* Orbiting data points */}
      {dataPoints.map((point, i) => (
        <DataPoint key={i} {...point} />
      ))}
      
      {/* Floating metric labels */}
      <MetricLabel position={[2.5, 1.2, 0]} value="85" label="HRV Score" color="#10b981" />
      <MetricLabel position={[-2.2, -0.8, 1]} value="94%" label="Recovery" color="#ea4428" />
      <MetricLabel position={[0.5, -1.5, 2]} value="7.8h" label="Sleep" color="#3b82f6" />
    </group>
  );
};

const NeuralOrb = () => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#ea4428" />
        <OrbScene />
      </Canvas>
    </div>
  );
};

export default NeuralOrb;
