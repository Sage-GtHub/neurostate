import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef, Suspense, useMemo } from 'react';
import * as THREE from 'three';

// Ethereal crystal formation
const CrystalCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15;
      coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.25;
      innerRef.current.rotation.z = t * 0.1;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y = t * 0.1;
      ringsRef.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    }
  });

  // Floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      position: [
        Math.sin(i * 0.5) * (1.8 + Math.random() * 0.5),
        (Math.random() - 0.5) * 2,
        Math.cos(i * 0.5) * (1.8 + Math.random() * 0.5)
      ] as [number, number, number],
      scale: 0.02 + Math.random() * 0.03,
      speed: 0.5 + Math.random() * 0.5
    }));
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
      <group>
        {/* Central icosahedron */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial 
            color="#3b82f6"
            emissive="#2563eb"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>
        
        {/* Inner glowing sphere */}
        <mesh ref={innerRef} scale={0.5}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#60a5fa"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        {/* Orbiting rings */}
        <group ref={ringsRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.4, 0.015, 16, 64]} />
            <meshStandardMaterial 
              color="#93c5fd"
              emissive="#60a5fa"
              emissiveIntensity={0.4}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[1.2, 0.012, 16, 64]} />
            <meshStandardMaterial 
              color="#bfdbfe"
              emissive="#93c5fd"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
          
          <mesh rotation={[Math.PI / 2.5, -Math.PI / 3, Math.PI / 6]}>
            <torusGeometry args={[1.6, 0.01, 16, 64]} />
            <meshStandardMaterial 
              color="#dbeafe"
              emissive="#bfdbfe"
              emissiveIntensity={0.2}
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>

        {/* Floating particles */}
        {particles.map((particle, i) => (
          <FloatingParticle key={i} {...particle} index={i} />
        ))}
        
        {/* Outer glow sphere */}
        <mesh scale={2}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial 
            color="#2563eb"
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Animated floating particle
const FloatingParticle = ({ position, scale, speed, index }: { 
  position: [number, number, number]; 
  scale: number; 
  speed: number;
  index: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed;
      ref.current.position.y = position[1] + Math.sin(t + index) * 0.3;
      ref.current.position.x = position[0] + Math.cos(t * 0.7 + index) * 0.1;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} />
    </mesh>
  );
};

const RecoveryTechVisual = () => {
  return (
    <div className="w-full aspect-square max-w-sm mx-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-3, 2, 3]} intensity={0.5} color="#3b82f6" />
          <pointLight position={[3, -2, -3]} intensity={0.3} color="#2563eb" />
          <CrystalCore />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RecoveryTechVisual;