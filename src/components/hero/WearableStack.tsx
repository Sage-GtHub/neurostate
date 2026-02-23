import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, RoundedBox, Torus, Float } from '@react-three/drei';
import * as THREE from 'three';

const SmartWatch = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={position}>
        {/* Watch body */}
        <RoundedBox args={[0.8, 1, 0.15]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        
        {/* Screen */}
        <RoundedBox args={[0.65, 0.85, 0.02]} radius={0.08} smoothness={4} position={[0, 0, 0.08]}>
          <meshStandardMaterial color="#0a0a12" metalness={0.3} roughness={0.1} />
        </RoundedBox>
        
        {/* Screen glow */}
        <RoundedBox args={[0.6, 0.8, 0.01]} radius={0.06} smoothness={4} position={[0, 0, 0.095]}>
          <meshBasicMaterial color="#ea4428" transparent opacity={0.3} />
        </RoundedBox>
        
        {/* Watch band top */}
        <RoundedBox args={[0.5, 0.8, 0.08]} radius={0.04} smoothness={4} position={[0, 0.85, 0]}>
          <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        
        {/* Watch band bottom */}
        <RoundedBox args={[0.5, 0.8, 0.08]} radius={0.04} smoothness={4} position={[0, -0.85, 0]}>
          <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        
        {/* Metric label */}
        <Html position={[0, 0, 0.2]} center distanceFactor={8}>
          <div className="text-center pointer-events-none select-none">
            <p className="text-lg font-light text-primary">72</p>
            <p className="text-[8px] text-muted-foreground uppercase">BPM</p>
          </div>
        </Html>
      </group>
    </Float>
  );
};

const SmartRing = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} position={position}>
        {/* Ring body */}
        <Torus args={[0.35, 0.08, 32, 64]}>
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </Torus>
        
        {/* Inner glow ring */}
        <Torus args={[0.35, 0.03, 16, 64]}>
          <meshBasicMaterial color="#10b981" transparent opacity={0.5} />
        </Torus>
        
        {/* Sensor bump */}
        <mesh position={[0.35, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Metric label */}
        <Html position={[0, 0.6, 0]} center distanceFactor={8}>
          <div className="text-center pointer-events-none select-none">
            <p className="text-sm font-light text-emerald-500">94%</p>
            <p className="text-[8px] text-muted-foreground uppercase">SpO2</p>
          </div>
        </Html>
      </group>
    </Float>
  );
};

const Smartphone = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4 + 1) * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.25) * 0.05;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} position={position}>
        {/* Phone body */}
        <RoundedBox args={[1.2, 2.4, 0.12]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        
        {/* Screen */}
        <RoundedBox args={[1.1, 2.3, 0.02]} radius={0.1} smoothness={4} position={[0, 0, 0.07]}>
          <meshStandardMaterial color="#0a0a12" metalness={0.2} roughness={0.1} />
        </RoundedBox>
        
        {/* Screen content glow */}
        <RoundedBox args={[1.0, 2.1, 0.01]} radius={0.08} smoothness={4} position={[0, 0, 0.085]}>
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} />
        </RoundedBox>
        
        {/* Camera bump */}
        <mesh position={[0.35, 1.05, -0.08]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Metric label */}
        <Html position={[0, 0, 0.15]} center distanceFactor={8}>
          <div className="text-center pointer-events-none select-none">
            <p className="text-xl font-light text-blue-500">87</p>
            <p className="text-[8px] text-muted-foreground uppercase">Readiness</p>
          </div>
        </Html>
      </group>
    </Float>
  );
};

const DataStream = ({ start, end, color, speed = 1, particleCount = 20 }: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  speed?: number;
  particleCount?: number;
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      pos[i * 3] = start[0] + (end[0] - start[0]) * t;
      pos[i * 3 + 1] = start[1] + (end[1] - start[1]) * t;
      pos[i * 3 + 2] = start[2] + (end[2] - start[2]) * t;
    }
    return pos;
  }, [start, end, particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime() * speed;
    
    for (let i = 0; i < particleCount; i++) {
      const baseT = i / particleCount;
      const animT = (baseT + time * 0.3) % 1;
      
      // Curved path with sine wave
      const curve = Math.sin(animT * Math.PI) * 0.3;
      
      posArray[i * 3] = start[0] + (end[0] - start[0]) * animT + curve * 0.5;
      posArray[i * 3 + 1] = start[1] + (end[1] - start[1]) * animT + curve;
      posArray[i * 3 + 2] = start[2] + (end[2] - start[2]) * animT;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const CentralHub = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central glowing orb */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#ea4428" transparent opacity={0.3} />
      </mesh>
      
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#ea4428" emissive="#ea4428" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Orbiting ring */}
      <Torus ref={ringRef} args={[0.5, 0.02, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </Torus>
      
      {/* Label */}
      <Html position={[0, -0.8, 0]} center distanceFactor={8}>
        <div className="text-center pointer-events-none select-none">
          <p className="text-[10px] font-medium text-primary uppercase tracking-wider">NeuroState</p>
          <p className="text-[8px] text-muted-foreground">Connected Hub</p>
        </div>
      </Html>
    </group>
  );
};

const WearableStackScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Devices */}
      <SmartWatch position={[-2, 0.5, 0]} />
      <SmartRing position={[0, 1.8, 0.5]} />
      <Smartphone position={[2, -0.3, 0]} />
      
      {/* Central hub */}
      <CentralHub />
      
      {/* Data streams connecting devices */}
      <DataStream start={[-1.5, 0.5, 0]} end={[-0.3, 0, 0]} color="#ea4428" speed={1.2} />
      <DataStream start={[0, 1.3, 0.4]} end={[0, 0.3, 0]} color="#10b981" speed={1} />
      <DataStream start={[1.5, -0.3, 0]} end={[0.3, 0, 0]} color="#3b82f6" speed={0.8} />
      
      {/* Cross-device streams */}
      <DataStream start={[-1.5, 0.5, 0]} end={[1.5, -0.3, 0]} color="#ffffff" speed={0.5} particleCount={15} />
      <DataStream start={[0, 1.3, 0.4]} end={[-1.5, 0.5, 0]} color="#ffffff" speed={0.6} particleCount={12} />
    </group>
  );
};

const WearableStack = () => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); });
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ea4428" />
        <spotLight position={[0, 5, 5]} intensity={0.4} angle={0.5} penumbra={1} />
        <WearableStackScene />
      </Canvas>
    </div>
  );
};

export default WearableStack;
