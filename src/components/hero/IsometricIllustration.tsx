import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef, Suspense, useMemo } from 'react';
import * as THREE from 'three';

// Neuron node
const Neuron = ({ position, size = 0.12, isActive = false }: {
  position: [number, number, number];
  size?: number;
  isActive?: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);
  
  useFrame((state) => {
    if (meshRef.current && glowRef.current && glowMatRef.current) {
      const pulse = isActive ? 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3 : 1;
      meshRef.current.scale.setScalar(size * pulse);
      glowRef.current.scale.setScalar(size * 2.5 * pulse);
      glowMatRef.current.opacity = isActive ? 0.15 + Math.sin(state.clock.elapsedTime * 4) * 0.1 : 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial 
          ref={glowMatRef}
          color={isActive ? "#8b5cf6" : "#6366f1"}
          transparent
          opacity={0.1}
        />
      </mesh>
      {/* Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial 
          color={isActive ? "#a78bfa" : "#e0e0e0"}
          emissive={isActive ? "#8b5cf6" : "#6366f1"}
          emissiveIntensity={isActive ? 0.8 : 0.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

// Synapse connection (line between neurons)
const Synapse = ({ start, end, pulseSpeed = 1 }: {
  start: [number, number, number];
  end: [number, number, number];
  pulseSpeed?: number;
}) => {
  const lineRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  
  const direction = useMemo(() => {
    const dir = new THREE.Vector3(
      end[0] - start[0],
      end[1] - start[1],
      end[2] - start[2]
    );
    return dir;
  }, [start, end]);
  
  const length = useMemo(() => direction.length(), [direction]);
  const midpoint = useMemo(() => [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2
  ] as [number, number, number], [start, end]);
  
  const quaternion = useMemo(() => {
    const quat = new THREE.Quaternion();
    quat.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );
    return quat;
  }, [direction]);

  const pulseMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (pulseRef.current && pulseMatRef.current) {
      const t = (state.clock.elapsedTime * pulseSpeed) % 1;
      pulseRef.current.position.set(
        start[0] + direction.x * t,
        start[1] + direction.y * t,
        start[2] + direction.z * t
      );
      pulseMatRef.current.opacity = Math.sin(t * Math.PI) * 0.8;
    }
  });

  return (
    <group ref={lineRef}>
      {/* Connection line */}
      <mesh position={midpoint} quaternion={quaternion}>
        <cylinderGeometry args={[0.008, 0.008, length, 8]} />
        <meshBasicMaterial color="#d4d4d4" transparent opacity={0.4} />
      </mesh>
      {/* Traveling pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial ref={pulseMatRef} color="#8b5cf6" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

// Central brain-like cluster
const BrainCluster = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Define neuron positions in a brain-like arrangement
  const neurons = useMemo(() => [
    // Core cluster
    { pos: [0, 0, 0] as [number, number, number], active: true, size: 0.18 },
    { pos: [0.5, 0.3, 0.2] as [number, number, number], active: true, size: 0.14 },
    { pos: [-0.4, 0.4, -0.1] as [number, number, number], active: false, size: 0.12 },
    { pos: [0.3, -0.4, 0.3] as [number, number, number], active: true, size: 0.13 },
    { pos: [-0.5, -0.2, 0.4] as [number, number, number], active: false, size: 0.11 },
    // Outer layer
    { pos: [1.2, 0.6, -0.3] as [number, number, number], active: false, size: 0.1 },
    { pos: [-1.0, 0.8, 0.2] as [number, number, number], active: true, size: 0.11 },
    { pos: [0.8, -0.7, 0.5] as [number, number, number], active: false, size: 0.09 },
    { pos: [-0.9, -0.5, -0.4] as [number, number, number], active: true, size: 0.1 },
    { pos: [0.2, 1.0, 0.4] as [number, number, number], active: false, size: 0.1 },
    // Extended network
    { pos: [1.8, 0.2, 0.1] as [number, number, number], active: false, size: 0.08 },
    { pos: [-1.5, 0.3, -0.2] as [number, number, number], active: false, size: 0.09 },
    { pos: [0, -1.2, -0.3] as [number, number, number], active: true, size: 0.1 },
    { pos: [1.0, 1.2, 0] as [number, number, number], active: false, size: 0.08 },
    { pos: [-1.2, -0.9, 0.3] as [number, number, number], active: false, size: 0.09 },
  ], []);

  // Define connections between neurons
  const connections = useMemo(() => [
    { from: 0, to: 1, speed: 0.8 },
    { from: 0, to: 2, speed: 1.2 },
    { from: 0, to: 3, speed: 0.6 },
    { from: 0, to: 4, speed: 1.0 },
    { from: 1, to: 5, speed: 0.9 },
    { from: 1, to: 9, speed: 1.1 },
    { from: 2, to: 6, speed: 0.7 },
    { from: 3, to: 7, speed: 1.3 },
    { from: 4, to: 8, speed: 0.5 },
    { from: 5, to: 10, speed: 0.8 },
    { from: 6, to: 11, speed: 1.0 },
    { from: 7, to: 12, speed: 0.9 },
    { from: 8, to: 14, speed: 1.2 },
    { from: 9, to: 13, speed: 0.7 },
    { from: 2, to: 9, speed: 1.1 },
    { from: 3, to: 8, speed: 0.6 },
    { from: 6, to: 14, speed: 0.8 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef}>
        {/* Render connections first (behind neurons) */}
        {connections.map((conn, i) => (
          <Synapse 
            key={`synapse-${i}`}
            start={neurons[conn.from].pos}
            end={neurons[conn.to].pos}
            pulseSpeed={conn.speed}
          />
        ))}
        
        {/* Render neurons */}
        {neurons.map((neuron, i) => (
          <Neuron 
            key={`neuron-${i}`}
            position={neuron.pos}
            size={neuron.size}
            isActive={neuron.active}
          />
        ))}
      </group>
    </Float>
  );
};

const IsometricIllustration = () => {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 45,
          near: 0.1,
          far: 100
        }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#8b5cf6" />
          <pointLight position={[0, 0, 3]} intensity={0.6} color="#a78bfa" />
          
          {/* Neural Network Scene */}
          <BrainCluster />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default IsometricIllustration;
