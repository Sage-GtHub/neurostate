import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Human silhouette particle positions (simplified body shape)
const generateHumanParticles = (count: number) => {
  const positions: number[] = [];
  const originalPositions: number[] = [];
  
  // Head (circle)
  for (let i = 0; i < count * 0.15; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 0.35;
    const x = Math.cos(angle) * radius;
    const y = 2.2 + Math.sin(angle) * radius * 0.9;
    const z = (Math.random() - 0.5) * 0.3;
    positions.push(x, y, z);
    originalPositions.push(x, y, z);
  }
  
  // Neck
  for (let i = 0; i < count * 0.03; i++) {
    const x = (Math.random() - 0.5) * 0.2;
    const y = 1.8 + Math.random() * 0.2;
    const z = (Math.random() - 0.5) * 0.15;
    positions.push(x, y, z);
    originalPositions.push(x, y, z);
  }
  
  // Torso (tapered rectangle)
  for (let i = 0; i < count * 0.25; i++) {
    const t = Math.random();
    const width = 0.5 - t * 0.15;
    const x = (Math.random() - 0.5) * width * 2;
    const y = 0.8 + t * 1.0;
    const z = (Math.random() - 0.5) * 0.25;
    positions.push(x, y, z);
    originalPositions.push(x, y, z);
  }
  
  // Left arm
  for (let i = 0; i < count * 0.12; i++) {
    const t = Math.random();
    const x = -0.55 - t * 0.5;
    const y = 1.5 - t * 0.8;
    const z = (Math.random() - 0.5) * 0.15;
    positions.push(x, y, z);
    originalPositions.push(x, y, z);
  }
  
  // Right arm
  for (let i = 0; i < count * 0.12; i++) {
    const t = Math.random();
    const x = 0.55 + t * 0.5;
    const y = 1.5 - t * 0.8;
    const z = (Math.random() - 0.5) * 0.15;
    positions.push(x, y, z);
    originalPositions.push(x, y, z);
  }
  
  // Left leg
  for (let i = 0; i < count * 0.16; i++) {
    const t = Math.random();
    const x = -0.2 - t * 0.1;
    const y = -0.8 + t * 1.6;
    const z = (Math.random() - 0.5) * 0.15;
    positions.push(x, y, z);
    originalPositions.push(x, y, z);
  }
  
  // Right leg
  for (let i = 0; i < count * 0.17; i++) {
    const t = Math.random();
    const x = 0.2 + t * 0.1;
    const y = -0.8 + t * 1.6;
    const z = (Math.random() - 0.5) * 0.15;
    positions.push(x, y, z);
    originalPositions.push(x, y, z);
  }
  
  return { 
    positions: new Float32Array(positions), 
    originalPositions: new Float32Array(originalPositions) 
  };
};

const HumanParticles = ({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 800;
  
  const { positions, originalPositions } = useMemo(() => generateHumanParticles(particleCount), []);
  
  const colors = useMemo(() => {
    const cols = new Float32Array(positions.length);
    for (let i = 0; i < positions.length / 3; i++) {
      const y = originalPositions[i * 3 + 1];
      // Color gradient from coral (head) to green (body) to blue (legs)
      if (y > 1.8) {
        // Head - coral
        cols[i * 3] = 0.92;
        cols[i * 3 + 1] = 0.27;
        cols[i * 3 + 2] = 0.16;
      } else if (y > 0.5) {
        // Torso - green
        cols[i * 3] = 0.06;
        cols[i * 3 + 1] = 0.73;
        cols[i * 3 + 2] = 0.51;
      } else {
        // Legs - blue
        cols[i * 3] = 0.23;
        cols[i * 3 + 1] = 0.51;
        cols[i * 3 + 2] = 0.96;
      }
    }
    return cols;
  }, [positions, originalPositions]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positionArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < positionArray.length / 3; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];
      
      // Mouse influence
      const dx = mousePosition.current.x * 3 - ox;
      const dy = mousePosition.current.y * 3 - oy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 2) * 0.3;
      
      // Breathing effect
      const breathe = Math.sin(time * 1.5) * 0.02;
      
      // Flowing particles effect
      const flow = Math.sin(time * 2 + i * 0.1) * 0.015;
      
      // Data stream pulse along body
      const pulse = Math.sin(time * 3 - oy * 2) * 0.02;
      
      positionArray[i * 3] = ox + dx * influence + flow;
      positionArray[i * 3 + 1] = oy + dy * influence + breathe + pulse;
      positionArray[i * 3 + 2] = oz + Math.sin(time + i * 0.05) * 0.02;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
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
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
};

const DataStreams = () => {
  const streamsRef = useRef<THREE.Group>(null);
  
  const streamParticles = useMemo(() => {
    const streams: { positions: Float32Array; color: string; offset: number }[] = [];
    
    // Heart rate stream (left chest)
    const heartStream = new Float32Array(30 * 3);
    for (let i = 0; i < 30; i++) {
      heartStream[i * 3] = -0.3 - i * 0.08;
      heartStream[i * 3 + 1] = 1.4;
      heartStream[i * 3 + 2] = 0.3;
    }
    streams.push({ positions: heartStream, color: '#ea4428', offset: 0 });
    
    // Brain activity stream (head)
    const brainStream = new Float32Array(25 * 3);
    for (let i = 0; i < 25; i++) {
      brainStream[i * 3] = 0.3 + i * 0.07;
      brainStream[i * 3 + 1] = 2.3;
      brainStream[i * 3 + 2] = 0.2;
    }
    streams.push({ positions: brainStream, color: '#10b981', offset: 1 });
    
    // Energy flow stream (torso)
    const energyStream = new Float32Array(35 * 3);
    for (let i = 0; i < 35; i++) {
      energyStream[i * 3] = 0.5 + i * 0.06;
      energyStream[i * 3 + 1] = 1.0;
      energyStream[i * 3 + 2] = 0.25;
    }
    streams.push({ positions: energyStream, color: '#3b82f6', offset: 2 });
    
    return streams;
  }, []);

  useFrame((state) => {
    if (!streamsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    streamsRef.current.children.forEach((child, streamIndex) => {
      if (child instanceof THREE.Points) {
        const positions = child.geometry.attributes.position.array as Float32Array;
        const offset = streamParticles[streamIndex].offset;
        
        for (let i = 0; i < positions.length / 3; i++) {
          // Animate particles along stream with wave
          const wave = Math.sin(time * 4 + i * 0.3 + offset) * 0.1;
          positions[i * 3 + 1] += Math.sin(time * 2 + i * 0.2) * 0.002;
          positions[i * 3 + 2] = 0.3 + wave;
        }
        child.geometry.attributes.position.needsUpdate = true;
      }
    });
  });

  return (
    <group ref={streamsRef}>
      {streamParticles.map((stream, i) => (
        <points key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={stream.positions.length / 3}
              array={stream.positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            color={stream.color}
            transparent
            opacity={0.7}
            sizeAttenuation
          />
        </points>
      ))}
    </group>
  );
};

const FloatingMetric = ({ position, value, label, color }: {
  position: [number, number, number];
  value: string;
  label: string;
  color: string;
}) => {
  return (
    <Html position={position} center distanceFactor={10}>
      <div className="bg-background/95 backdrop-blur-md border border-border/50 px-3 py-2 rounded-xl shadow-lg pointer-events-none select-none whitespace-nowrap">
        <p className="text-lg font-medium" style={{ color }}>{value}</p>
        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{label}</p>
      </div>
    </Html>
  );
};

const Scene = ({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      <HumanParticles mousePosition={mousePosition} />
      <DataStreams />
      
      {/* Floating metrics */}
      <FloatingMetric position={[-1.8, 1.4, 0]} value="72 bpm" label="Heart Rate" color="#ea4428" />
      <FloatingMetric position={[1.6, 2.3, 0]} value="94%" label="Focus" color="#10b981" />
      <FloatingMetric position={[2, 1.0, 0]} value="87" label="Readiness" color="#3b82f6" />
    </group>
  );
};

const MouseTracker = ({ mousePosition }: { mousePosition: React.MutableRefObject<{ x: number; y: number }> }) => {
  const { viewport } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition]);

  return null;
};

const ParticleHumanSilhouette = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.3} />
        <MouseTracker mousePosition={mousePosition} />
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default ParticleHumanSilhouette;
