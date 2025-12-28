import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

// Simple rotating torus
const GlowingTorus = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={torusRef}>
      <torusGeometry args={[1.5, 0.4, 32, 100]} />
      <meshStandardMaterial 
        color="#1a1a1a"
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

// Orbiting sphere
const OrbitingSphere = ({ radius, speed, size, delay }: { 
  radius: number; 
  speed: number; 
  size: number;
  delay: number;
}) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sphereRef.current) {
      const t = state.clock.elapsedTime * speed + delay;
      sphereRef.current.position.x = Math.cos(t) * radius;
      sphereRef.current.position.z = Math.sin(t) * radius;
      sphereRef.current.position.y = Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color="#6366f1"
        emissive="#6366f1"
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
};

// Simple floating cube
const FloatingCube = ({ position, size, color }: {
  position: [number, number, number];
  size: number;
  color: string;
}) => {
  const cubeRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={cubeRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
};

// Main scene
const SimpleScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central torus */}
      <GlowingTorus />
      
      {/* Orbiting spheres */}
      <OrbitingSphere radius={2.5} speed={0.5} size={0.15} delay={0} />
      <OrbitingSphere radius={2.5} speed={0.5} size={0.1} delay={Math.PI} />
      <OrbitingSphere radius={2.5} speed={0.5} size={0.12} delay={Math.PI / 2} />
      
      {/* Floating cubes */}
      <FloatingCube position={[-2, 1.5, 0]} size={0.3} color="#e5e5e5" />
      <FloatingCube position={[2.2, -1, 1]} size={0.25} color="#d4d4d4" />
      <FloatingCube position={[0, -2, -1.5]} size={0.2} color="#f5f5f5" />
    </group>
  );
};

const IsometricIllustration = () => {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
      <Canvas
        camera={{ 
          position: [0, 2, 6], 
          fov: 40,
          near: 0.1,
          far: 100
        }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Simple lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#6366f1" />
          
          {/* Scene */}
          <SimpleScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default IsometricIllustration;
