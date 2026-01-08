import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

const WaveMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8, 6, 128, 96);
    return geo;
  }, []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color('#ea4428') },
        uColorB: { value: new THREE.Color('#10b981') },
        uColorC: { value: new THREE.Color('#3b82f6') },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Multiple wave layers for organic feel
          float wave1 = sin(pos.x * 1.5 + uTime * 0.8) * 0.3;
          float wave2 = sin(pos.x * 2.5 + pos.y * 1.5 + uTime * 0.6) * 0.2;
          float wave3 = cos(pos.y * 2.0 + uTime * 0.4) * 0.25;
          float wave4 = sin(pos.x * 0.5 + pos.y * 0.8 + uTime * 1.2) * 0.15;
          
          pos.z = wave1 + wave2 + wave3 + wave4;
          vElevation = pos.z;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          // Dynamic color mixing based on elevation and position
          float mixFactor1 = smoothstep(-0.5, 0.5, vElevation);
          float mixFactor2 = sin(vUv.x * 3.14159 + uTime * 0.3) * 0.5 + 0.5;
          
          vec3 color1 = mix(uColorA, uColorB, mixFactor1);
          vec3 color2 = mix(color1, uColorC, mixFactor2 * 0.5);
          
          // Add subtle glow at peaks
          float glow = smoothstep(0.3, 0.8, vElevation) * 0.3;
          vec3 finalColor = color2 + glow;
          
          // Fade edges
          float edgeFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
          edgeFade *= smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
          
          gl_FragColor = vec4(finalColor, 0.85 * edgeFade);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = -0.5 + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-0.5, 0, 0]} position={[0, -0.5, 0]}>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
};

const GridLines = () => {
  const linesRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const lineData: [number, number, number][][] = [];
    
    // Horizontal lines
    for (let i = -3; i <= 3; i += 0.5) {
      lineData.push([
        [-4, i * 0.8, 0],
        [4, i * 0.8, 0],
      ]);
    }
    
    // Vertical lines
    for (let i = -4; i <= 4; i += 0.5) {
      lineData.push([
        [i, -2.4, 0],
        [i, 2.4, 0],
      ]);
    }
    
    return lineData;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.x = -0.5 + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
    }
  });

  return (
    <group ref={linesRef} position={[0, -0.5, -0.1]}>
      {lines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#ffffff"
          opacity={0.08}
          transparent
          lineWidth={1}
        />
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
      <div className="bg-background/95 backdrop-blur-md border border-border/50 px-4 py-2.5 rounded-xl shadow-lg pointer-events-none select-none whitespace-nowrap">
        <p className="text-xl font-light" style={{ color }}>{value}</p>
        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{label}</p>
      </div>
    </Html>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, velocities } = useMemo(() => {
    const count = 100;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = 0;
    }
    
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.getElapsedTime();
      
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += Math.sin(time + i) * 0.002;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ea4428"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

const WaveScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <GridLines />
      <WaveMesh />
      <ParticleField />
      
      {/* Floating metrics */}
      <FloatingMetric position={[3, 1.5, 1]} value="72" label="Heart Rate" color="#ea4428" />
      <FloatingMetric position={[-3, 0.5, 1]} value="96%" label="SpO2" color="#10b981" />
      <FloatingMetric position={[2, -1.5, 1]} value="7.2h" label="Sleep" color="#3b82f6" />
    </group>
  );
};

const AbstractWaveMesh = () => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <WaveScene />
      </Canvas>
    </div>
  );
};

export default AbstractWaveMesh;
