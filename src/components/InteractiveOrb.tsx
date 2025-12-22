import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface OrbCoreProps {
  color1: string;
  color2: string;
  color3: string;
}

const OrbCore = ({ color1, color2, color3 }: OrbCoreProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const nucleusRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -state.clock.elapsedTime * 0.2;
      innerRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1.2 + Math.random() * 0.3;
      temp.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ] as [number, number, number],
        scale: 0.02 + Math.random() * 0.03
      });
    }
    return temp;
  }, []);

  return (
    <group>
      {/* Outer distorted sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[1.3, 64, 64]}>
          <MeshDistortMaterial
            color={color1}
            transparent
            opacity={0.15}
            distort={0.4}
            speed={2}
            roughness={0.1}
          />
        </Sphere>
      </Float>

      {/* Middle layer */}
      <Sphere ref={innerRef} args={[1, 48, 48]}>
        <MeshDistortMaterial
          color={color2}
          transparent
          opacity={0.25}
          distort={0.3}
          speed={3}
          roughness={0.2}
        />
      </Sphere>

      {/* Inner nucleus */}
      <Float speed={4} rotationIntensity={1} floatIntensity={0.3}>
        <Sphere args={[0.6, 32, 32]}>
          <meshStandardMaterial
            color={color3}
            emissive={color3}
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Orbiting particles */}
      <group ref={nucleusRef}>
        {particles.map((particle, i) => (
          <mesh key={i} position={particle.position}>
            <sphereGeometry args={[particle.scale, 8, 8]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3}
              emissive={i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Energy rings */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.01, 16, 100]} />
          <meshStandardMaterial color={color1} transparent opacity={0.3} />
        </mesh>
      </group>
      <group rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[1.6, 0.008, 16, 100]} />
          <meshStandardMaterial color={color2} transparent opacity={0.25} />
        </mesh>
      </group>
      <group rotation={[Math.PI / 4, -Math.PI / 3, Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[1.7, 0.006, 16, 100]} />
          <meshStandardMaterial color={color3} transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  );
};

interface InteractiveOrbProps {
  className?: string;
}

const InteractiveOrb = ({ className = '' }: InteractiveOrbProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />
        <pointLight position={[0, 10, -10]} intensity={0.5} color="#f59e0b" />
        
        <OrbCore 
          color1="#8b5cf6" 
          color2="#10b981" 
          color3="#f59e0b" 
        />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default InteractiveOrb;
