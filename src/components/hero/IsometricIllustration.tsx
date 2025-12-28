import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import { useRef, Suspense, useMemo } from 'react';
import * as THREE from 'three';

// Central morphing sphere
const MorphingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#1a1a1a"
          roughness={0.1}
          metalness={0.9}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

// Orbiting rings
const OrbitRing = ({ radius, speed, thickness, color, tilt }: { 
  radius: number; 
  speed: number; 
  thickness: number;
  color: string;
  tilt: [number, number, number];
}) => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={tilt}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.3}
        metalness={0.7}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Floating crystal shapes
const Crystal = ({ position, scale, color, rotationSpeed }: {
  position: [number, number, number];
  scale: number;
  color: string;
  rotationSpeed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.1}
          metalness={0.95}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
};

// Glowing energy orb
const EnergyOrb = ({ position, color, size }: {
  position: [number, number, number];
  color: string;
  size: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      meshRef.current.scale.setScalar(size * pulse);
      glowRef.current.scale.setScalar(size * 2 * pulse);
    }
  });

  return (
    <Float speed={4} rotationIntensity={0} floatIntensity={1.5}>
      <group position={position}>
        {/* Glow */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial 
            color={color}
            transparent
            opacity={0.15}
          />
        </mesh>
        {/* Core */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={2}
            roughness={0}
            metalness={1}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Flowing arc paths
const FlowingArc = ({ startAngle, color }: { startAngle: number; color: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 50; i++) {
      const t = (i / 50) * Math.PI * 0.6;
      const angle = startAngle + t;
      const radius = 2.5 + Math.sin(t * 2) * 0.3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(t * 3) * 0.5;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [startAngle]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {points.slice(0, -1).map((point, i) => {
        const next = points[i + 1];
        const mid = new THREE.Vector3().addVectors(point, next).multiplyScalar(0.5);
        const direction = new THREE.Vector3().subVectors(next, point);
        const length = direction.length();
        
        return (
          <mesh key={i} position={mid} quaternion={new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction.normalize()
          )}>
            <cylinderGeometry args={[0.008, 0.008, length, 4]} />
            <meshBasicMaterial color={color} transparent opacity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
};

// Particle field
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(200 * 3);
    const col = new Float32Array(200 * 3);
    
    for (let i = 0; i < 200; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3 + Math.random() * 2;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      col[i * 3] = 0.4 + Math.random() * 0.3;
      col[i * 3 + 1] = 0.3 + Math.random() * 0.2;
      col[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    }
    
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={200} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={200} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.04} 
        vertexColors
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main scene
const AbstractScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central morphing sphere */}
      <MorphingSphere />
      
      {/* Orbiting rings */}
      <OrbitRing radius={2.2} speed={0.2} thickness={0.02} color="#6366f1" tilt={[Math.PI / 3, 0, 0]} />
      <OrbitRing radius={2.6} speed={-0.15} thickness={0.015} color="#8b5cf6" tilt={[Math.PI / 2.5, Math.PI / 4, 0]} />
      <OrbitRing radius={3} speed={0.1} thickness={0.01} color="#a78bfa" tilt={[Math.PI / 4, -Math.PI / 6, 0]} />
      
      {/* Floating crystals */}
      <Crystal position={[2.5, 0.5, 1]} scale={0.25} color="#e0e0e0" rotationSpeed={0.008} />
      <Crystal position={[-2, 1, -1.5]} scale={0.2} color="#d4d4d4" rotationSpeed={0.006} />
      <Crystal position={[1.5, -1, -2]} scale={0.18} color="#f0f0f0" rotationSpeed={0.01} />
      <Crystal position={[-1.8, -0.5, 2]} scale={0.22} color="#e8e8e8" rotationSpeed={0.007} />
      
      {/* Energy orbs */}
      <EnergyOrb position={[2, 1.5, 0]} color="#6366f1" size={0.12} />
      <EnergyOrb position={[-1.5, -1.2, 1.5]} color="#8b5cf6" size={0.1} />
      <EnergyOrb position={[0.5, -1.8, -1]} color="#a78bfa" size={0.08} />
      
      {/* Flowing arcs */}
      <FlowingArc startAngle={0} color="#6366f1" />
      <FlowingArc startAngle={Math.PI * 0.66} color="#8b5cf6" />
      <FlowingArc startAngle={Math.PI * 1.33} color="#a78bfa" />
      
      {/* Particle field */}
      <ParticleField />
    </group>
  );
};

const IsometricIllustration = () => {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[500px]">
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 45,
          near: 0.1,
          far: 100
        }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-10, -5, -5]} intensity={0.4} color="#6366f1" />
          <pointLight position={[0, 5, 0]} intensity={0.8} color="#8b5cf6" />
          <pointLight position={[5, -5, 5]} intensity={0.5} color="#a78bfa" />
          
          {/* Scene */}
          <AbstractScene />
          
          {/* Environment */}
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default IsometricIllustration;
