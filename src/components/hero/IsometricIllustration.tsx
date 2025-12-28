import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { useRef, Suspense, useMemo } from 'react';
import * as THREE from 'three';

// Isometric camera setup
const IsometricCamera = () => {
  return null;
};

// Floating cube with glass effect
const GlassCube = ({ position, scale = 1, rotationSpeed = 0.001 }: { position: [number, number, number]; scale?: number; rotationSpeed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 1.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#f0f0f0"
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
};

// Glowing sphere
const GlowSphere = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

// Torus ring
const TorusRing = ({ position, scale = 1, color = "#e0e0e0" }: { position: [number, number, number]; scale?: number; color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[0.8, 0.08, 16, 100]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
};

// Cylinder pillars
const Pillar = ({ position, height = 1, color = "#f5f5f5" }: { position: [number, number, number]; height?: number; color?: string }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.15, 0.15, height, 32]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  );
};

// Floating platform
const Platform = ({ position }: { position: [number, number, number] }) => {
  return (
    <mesh position={position} rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[2.5, 0.1, 2.5]} />
      <meshStandardMaterial 
        color="#fafafa"
        roughness={0.5}
        metalness={0.1}
      />
    </mesh>
  );
};

// Data flow particles
const DataParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={50}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color="#888888" 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main isometric scene
const IsometricScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main platform */}
      <Platform position={[0, -0.8, 0]} />
      
      {/* Glass cubes - stacked isometric */}
      <GlassCube position={[-0.6, 0.2, -0.3]} scale={0.6} rotationSpeed={0.002} />
      <GlassCube position={[0.5, 0.5, 0.2]} scale={0.4} rotationSpeed={0.003} />
      <GlassCube position={[0, 0.9, 0]} scale={0.5} rotationSpeed={0.0015} />
      
      {/* Glowing accents */}
      <GlowSphere position={[-0.8, 0.8, 0.5]} color="#6366f1" scale={0.6} />
      <GlowSphere position={[0.9, 0.3, -0.4]} color="#8b5cf6" scale={0.4} />
      <GlowSphere position={[0.2, 1.3, 0.3]} color="#a78bfa" scale={0.5} />
      
      {/* Orbital ring */}
      <TorusRing position={[0, 0.4, 0]} scale={1.2} color="#d4d4d4" />
      
      {/* Pillars */}
      <Pillar position={[-1, -0.4, -1]} height={0.8} />
      <Pillar position={[1, -0.3, -1]} height={1} />
      <Pillar position={[1, -0.5, 1]} height={0.6} />
      <Pillar position={[-1, -0.35, 1]} height={0.9} />
      
      {/* Floating particles */}
      <DataParticles />
    </group>
  );
};

const IsometricIllustration = () => {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
      <Canvas
        camera={{ 
          position: [5, 5, 5], 
          fov: 25,
          near: 0.1,
          far: 100
        }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#e0e0ff" />
          <pointLight position={[0, 3, 0]} intensity={0.5} color="#a78bfa" />
          
          {/* Scene */}
          <IsometricScene />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default IsometricIllustration;
