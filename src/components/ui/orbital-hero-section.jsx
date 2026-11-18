import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

function HelicalSystem() {
  const groupRef = useRef();

  const helices = useMemo(() => {
    const lines = [];
    const planetCount = 4;
    for (let i = 0; i < planetCount; i++) {
      const points = [];
      const radius = 1.4 + i * 0.75;
      const speed = 1.2 - i * 0.18;
      for (let t = 0; t < 40; t += 0.1) {
        const x = Math.cos(t * speed) * radius;
        const z = Math.sin(t * speed) * radius;
        const y = (t * 0.25) - 4;
        points.push(new THREE.Vector3(x, y, z));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lines.push({ 
        geometry, 
        color: i === 0 ? '#c77dff' : i === 1 ? '#3b82f6' : i === 2 ? '#9d4edd' : '#60a5fa' 
      });
    }
    return lines;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <pointLight color="#e0aaff" intensity={3} distance={25} />

      {helices.map((h, idx) => (
        <line key={idx} geometry={h.geometry}>
          <lineBasicMaterial color={h.color} transparent opacity={0.7} linewidth={2} />
        </line>
      ))}
    </group>
  );
}

export function OrbitalHeroSection({
  children,
  scrim = "left",
  scrimStrength = 0.92,
}) {
  return (
    <div className="relative w-full h-full min-h-[inherit] overflow-hidden bg-[#030008]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
          <HelicalSystem />
        </Canvas>
      </div>

      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: scrim === "left" 
            ? `linear-gradient(to right, rgba(3,0,8,${scrimStrength}) 0%, rgba(3,0,8,${scrimStrength * 0.7}) 55%, transparent 100%)`
            : `linear-gradient(to top, rgba(3,0,8,${scrimStrength}) 0%, rgba(3,0,8,${scrimStrength * 0.7}) 55%, transparent 100%)`
        }}
      />

      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
}