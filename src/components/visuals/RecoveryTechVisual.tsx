import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

// Glowing recovery orb
const RecoveryOrb = () => {
  const orbRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Central orb with warm glow */}
        <mesh ref={orbRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#ff6b35"
            emissive="#ff4500"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        {/* Outer ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.6, 0.04, 16, 100]} />
          <meshStandardMaterial 
            color="#ffa07a"
            emissive="#ff6347"
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        
        {/* Second ring */}
        <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
          <torusGeometry args={[1.4, 0.03, 16, 100]} />
          <meshStandardMaterial 
            color="#ffd700"
            transparent
            opacity={0.6}
            roughness={0.4}
          />
        </mesh>
        
        {/* Pulse waves */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} scale={1.2 + i * 0.3}>
            <ringGeometry args={[0.9, 1, 32]} />
            <meshBasicMaterial 
              color="#ff6b35"
              transparent
              opacity={0.1 - i * 0.03}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </Float>
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
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-3, 3, 3]} intensity={0.6} color="#ff6347" />
          <RecoveryOrb />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RecoveryTechVisual;
