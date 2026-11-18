import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sparkles as ThreeSparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Rocket, Sparkles, ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function createPurpleJupiterMaps() {
  const width = 2048;
  const height = 1024;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width; colorCanvas.height = height;
  const ctx = colorCanvas.getContext('2d');
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width; bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext('2d');

  const bands = [
    { pos: 0.00, color: '#0d0614' }, { pos: 0.08, color: '#2b1042' }, { pos: 0.16, color: '#4c1c75' },
    { pos: 0.22, color: '#240d38' }, { pos: 0.28, color: '#7a22b2' }, { pos: 0.34, color: '#31104a' },
    { pos: 0.40, color: '#9d4edd' }, { pos: 0.45, color: '#560bad' }, { pos: 0.50, color: '#c77dff' },
    { pos: 0.55, color: '#3f37c9' }, { pos: 0.62, color: '#7209b7' }, { pos: 0.69, color: '#480ca8' },
    { pos: 0.76, color: '#560bad' }, { pos: 0.85, color: '#1a0526' }, { pos: 1.00, color: '#05010a' },
  ];
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  bands.forEach((b) => grad.addColorStop(b.pos, b.color));
  ctx.fillStyle = grad; ctx.fillRect(0, 0, width, height);
  bCtx.fillStyle = '#808080'; bCtx.fillRect(0, 0, width, height);

  for (let i = 0; i < 650; i++) {
    const y = Math.random() * height;
    const bandHeight = Math.random() * 8 + 1.5;
    const isLight = Math.random() > 0.48;
    ctx.beginPath(); bCtx.beginPath();
    let x = 0; const amplitude = Math.random() * 5 + 1.5; const frequency = Math.random() * 0.02 + 0.005; const phase = Math.random() * Math.PI * 2;
    ctx.moveTo(0, y); bCtx.moveTo(0, y);
    while (x <= width) {
      const offsetY = Math.sin(x * frequency + phase) * amplitude;
      ctx.lineTo(x, y + offsetY); bCtx.lineTo(x, y + offsetY); x += 12;
    }
    ctx.strokeStyle = isLight ? 'rgba(220, 180, 255, 0.16)' : 'rgba(40, 10, 60, 0.2)';
    ctx.lineWidth = bandHeight; ctx.stroke();
    bCtx.strokeStyle = isLight ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
    bCtx.lineWidth = bandHeight; bCtx.stroke();
  }

  const map = new THREE.CanvasTexture(colorCanvas); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 8;
  const bumpMap = new THREE.CanvasTexture(bumpCanvas); bumpMap.anisotropy = 8;
  return { map, bumpMap };
}

function CinematicJupiter() {
  const planetRef = useRef(); const moon1Ref = useRef(); const moon2Ref = useRef();
  const { viewport } = useThree();
  const isDesktop = viewport.width > 7;
  const positionX = isDesktop ? -viewport.width * 0.23 : 0;
  const positionY = isDesktop ? 0 : -1.5;
  const planetScale = isDesktop ? 1 : 0.72;
  const { map, bumpMap } = useMemo(() => createPurpleJupiterMaps(), []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.14;
    if (moon1Ref.current) {
      moon1Ref.current.position.x = Math.cos(t * 0.6) * 3.1;
      moon1Ref.current.position.z = Math.sin(t * 0.6) * 3.1;
      moon1Ref.current.position.y = Math.sin(t * 0.6) * 0.3;
    }
    if (moon2Ref.current) {
      moon2Ref.current.position.x = Math.cos(t * 0.38 + 2) * 3.7;
      moon2Ref.current.position.z = Math.sin(t * 0.38 + 2) * 3.7;
      moon2Ref.current.position.y = -Math.cos(t * 0.38) * 0.4;
    }
  });

  return (
    <group position={[positionX, positionY, 0]} scale={planetScale}>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.2}>
        <group rotation={[0.12, 0, -0.18]}>
          <mesh ref={planetRef}>
            <sphereGeometry args={[2.1, 96, 96]} />
            <meshStandardMaterial map={map} bumpMap={bumpMap} bumpScale={0.03} roughness={0.75} metalness={0.1} />
          </mesh>
          <mesh scale={[1.04, 1.04, 1.04]}>
            <sphereGeometry args={[2.1, 64, 64]} />
            <meshBasicMaterial color="#9d4edd" transparent opacity={0.15} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh rotation={[Math.PI / 2.15, 0, 0]}>
            <ringGeometry args={[2.5, 2.85, 128]} />
            <meshBasicMaterial color="#c77dff" transparent opacity={0.25} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[Math.PI / 2.15, 0, 0]}>
            <ringGeometry args={[2.95, 3.5, 128]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.12} side={THREE.DoubleSide} />
          </mesh>
          <mesh ref={moon1Ref}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial color="#e0aaff" roughness={0.5} emissive="#9d4edd" emissiveIntensity={0.4} />
          </mesh>
          <mesh ref={moon2Ref}>
            <sphereGeometry args={[0.075, 32, 32]} />
            <meshStandardMaterial color="#60a5fa" roughness={0.4} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function JupiterHero() {
  const { text, lang } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0.2, 6.8], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[7, 3, 5]} intensity={2.5} color="#e0aaff" />
          <pointLight position={[-7, -4, -5]} intensity={0.6} color="#3b82f6" />
          <Stars radius={80} depth={60} count={4500} factor={4} saturation={0} fade speed={0.8} />
          <ThreeSparkles count={75} scale={14} size={1.6} speed={0.25} opacity={0.5} color="#c77dff" />
          <Suspense fallback={null}>
            <CinematicJupiter />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10 pointer-events-none">
        <div className={`max-w-2xl pointer-events-auto ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-md text-purple-300 text-xs font-bold mb-6 shadow-[0_0_25px_rgba(157,78,221,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{text.hero.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.15] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {text.hero.titlePart1}{' '}
            <span className="bg-gradient-to-l from-purple-300 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              {text.hero.titlePart2}
            </span>
          </h1>

          <p className="text-purple-200/80 text-base sm:text-lg mb-8 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {text.hero.desc}
          </p>

          {/* الأزرار بعد التعديل والتنسيق الفاخر */}
          <div className={`flex flex-wrap items-center gap-4 ${lang === 'en' ? 'justify-start' : ''}`}>
            <a
              href="#contact"
              className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-[0_0_30px_rgba(157,78,221,0.4)] flex items-center gap-3 transition-all duration-300 border border-purple-400/40 hover:scale-[1.02]"
            >
              <Rocket className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              <span>{text.hero.startBtn}</span>
            </a>

            <a
              href="#services"
              className="px-8 py-4 rounded-2xl bg-[#070312]/80 hover:bg-purple-950/50 border border-purple-500/30 backdrop-blur-xl text-purple-200 hover:text-white font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:scale-[1.02]"
            >
              <span>{text.hero.servicesBtn}</span>
              <ArrowDown className="w-4 h-4 text-purple-400 animate-bounce" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#030008] via-[#030008]/70 to-transparent pointer-events-none z-10" />
    </section>
  );
}