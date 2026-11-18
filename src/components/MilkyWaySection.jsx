import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";
import { Zap, ShieldCheck, Terminal, Cpu } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function SpiralGalaxy() {
  const pointsRef = useRef();

  const [positions, colors] = React.useMemo(() => {
    const count = 12000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorInside = new THREE.Color("#c77dff");
    const colorOutside = new THREE.Color("#3b82f6");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 6;
      const spinAngle = radius * 1.8;
      const branchAngle = ((i % 3) * Math.PI * 2) / 3;

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6;

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / 6);
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function InteractiveGalaxyCard({ feat, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    setMousePos({ x: clientX, y: clientY });

    const xPct = clientX / width - 0.5;
    const yPct = clientY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group rounded-3xl p-[1px] overflow-hidden cursor-pointer shadow-xl perspective-1000"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(250px circle at ${mousePos.x}px ${mousePos.y}px, rgba(199, 125, 255, 0.4), transparent 80%)`,
        }}
      />

      <div className="relative h-full bg-[#070312]/90 border border-purple-500/20 backdrop-blur-xl p-6 rounded-3xl flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            {feat.icon}
          </div>
          <h3 className="text-white font-bold text-base mb-2 group-hover:text-purple-300 transition-colors">
            {feat.title}
          </h3>
          <p className="text-purple-200/70 text-xs leading-relaxed">
            {feat.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function MilkyWaySection() {
  const { text } = useLanguage();

  const icons = [
    <Zap className="w-5 h-5 text-purple-400" />,
    <ShieldCheck className="w-5 h-5 text-cyan-400" />,
    <Terminal className="w-5 h-5 text-indigo-400" />,
    <Cpu className="w-5 h-5 text-purple-300" />
  ];

  return (
    <section id="milky-way" className="relative min-h-[90vh] w-full overflow-hidden bg-[#030008] select-none flex flex-col justify-between py-20">
      <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 4, 7], fov: 60 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
          <SpiralGalaxy />
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {text.milkyWay.features.map((feat, idx) => (
            <InteractiveGalaxyCard key={idx} feat={{ ...feat, icon: icons[idx] }} index={idx} />
          ))}
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md bg-[#070312]/85 border border-purple-500/25 backdrop-blur-xl p-7 rounded-3xl shadow-2xl"
        >
          <div className="text-purple-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <span>{text.milkyWay.networkBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-3 text-white">{text.milkyWay.title}</h2>
          <p className="text-sm leading-relaxed text-purple-200/70">{text.milkyWay.desc}</p>
        </motion.div>
      </div>
    </section>
  );
}