import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

// Stacked capsule shapes
const SupplementStack = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const capsules = [
    { position: [0, 0.8, 0] as [number, number, number], color: "#6366f1", scale: 0.9 },
    { position: [-0.5, 0, 0.3] as [number, number, number], color: "#8b5cf6", scale: 0.85 },
    { position: [0.4, -0.7, -0.2] as [number, number, number], color: "#a78bfa", scale: 0.8 },
  ];

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef}>
        {capsules.map((capsule, i) => (
          <group key={i} position={capsule.position}>
            <mesh rotation={[Math.PI / 6 + i * 0.3, i * 0.5, 0]} scale={capsule.scale}>
              <capsuleGeometry args={[0.3, 0.8, 16, 32]} />
              <meshStandardMaterial 
                color={capsule.color}
                roughness={0.15}
                metalness={0.85}
              />
            </mesh>
          </group>
        ))}
        
        {/* Floating particles around stack */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 1.8;
          return (
            <mesh 
              key={`particle-${i}`}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 0.5,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshStandardMaterial 
                color="#6366f1"
                emissive="#6366f1"
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}
        
        {/* Orbital ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial 
            color="#e0e0e0"
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
};

const SupplementStackVisual = () => {
  return (
    <div className="w-full aspect-square max-w-sm mx-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-3, 2, 3]} intensity={0.5} color="#8b5cf6" />
          <SupplementStack />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SupplementStackVisual;
