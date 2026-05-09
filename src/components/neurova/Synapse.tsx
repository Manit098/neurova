import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";

// ─── Orbiting particle cloud ──────────────────────────────────────────────────
function NeuralParticles({ count = 260, isMobile = false }: { count?: number; isMobile?: boolean }) {
  const ref = useRef<THREE.Points>(null);
  
  // Reduce particle count on mobile for performance
  const adjustedCount = isMobile ? Math.floor(count * 0.6) : count;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(adjustedCount * 3);
    const sz = new Float32Array(adjustedCount);
    for (let i = 0; i < adjustedCount; i++) {
      // Distribute on a shell between r=1.8 and r=3.2
      const r = 1.8 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = Math.random() * 2.5 + 0.5;
    }
    return [pos, sz];
  }, [adjustedCount]);

  useFrame((state) => {
    if (ref.current) {
      const speed = isMobile ? 0.03 : 0.06;
      ref.current.rotation.y = state.clock.elapsedTime * speed;
      ref.current.rotation.x = state.clock.elapsedTime * (speed * 0.5);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#7fc8f8"
        size={isMobile ? 0.025 : 0.018}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Animated halo rings ──────────────────────────────────────────────────────
function HaloRings({ isMobile = false }: { isMobile?: boolean }) {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const speed = isMobile ? 0.5 : 1;
    
    if (r1.current) {
      r1.current.rotation.z = t * 0.18 * speed;
      // Pulse opacity
      (r1.current.material as THREE.MeshBasicMaterial).opacity = 0.65 + Math.sin(t * 1.1 * speed) * 0.25;
    }
    if (r2.current) {
      r2.current.rotation.z = -t * 0.12 * speed;
      (r2.current.material as THREE.MeshBasicMaterial).opacity = 0.45 + Math.sin(t * 0.8 * speed + 1) * 0.2;
    }
    if (r3.current) {
      r3.current.rotation.z = t * 0.08 * speed;
      (r3.current.material as THREE.MeshBasicMaterial).opacity =
        0.25 + Math.sin(t * 1.4 * speed + 2) * 0.15;
    }
  });

  return (
    <>
      {/* Ring 1 — bright primary */}
      <mesh ref={r1} rotation={[Math.PI / 2.1, 0.1, 0]}>
        <torusGeometry args={[1.75, isMobile ? 0.008 : 0.006, 16, isMobile ? 120 : 240]} />
        <meshBasicMaterial color="#9ed8ff" transparent opacity={0.7} />
      </mesh>
      {/* Ring 2 — wider, tilted */}
      <mesh ref={r2} rotation={[Math.PI / 1.55, 0.5, 0.2]}>
        <torusGeometry args={[2.05, isMobile ? 0.006 : 0.004, 16, isMobile ? 120 : 240]} />
        <meshBasicMaterial color="#6ab8f5" transparent opacity={0.5} />
      </mesh>
      {/* Ring 3 — outermost, faint */}
      <mesh ref={r3} rotation={[Math.PI / 3.2, 0.8, 0.4]}>
        <torusGeometry args={[2.35, isMobile ? 0.005 : 0.003, 16, isMobile ? 100 : 200]} />
        <meshBasicMaterial color="#4a9de0" transparent opacity={0.28} />
      </mesh>
    </>
  );
}

// ─── Wireframe shell ──────────────────────────────────────────────────────────
function WireShell({ isMobile = false }: { isMobile?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const speed = isMobile ? 0.04 : 0.08;
      ref.current.rotation.y = -state.clock.elapsedTime * speed;
      ref.current.rotation.x = state.clock.elapsedTime * (speed * 0.625);
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.06 + Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.55, 1]} />
      <meshBasicMaterial color="#9ed8ff" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

// ─── Core object ─────────────────────────────────────────────────────────────
function SynapseObject({ isMobile = false }: { isMobile?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      const speed = isMobile ? 0.1 : 0.18;
      group.current.rotation.y += delta * speed;
    }
    if (core.current) {
      // Subtle breathe scale
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.015;
      core.current.scale.setScalar(s);
    }
  });

  return (
    <Float speed={0.9} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={group}>
        {/* ── Core: high-end physical material ── */}
        <mesh ref={core}>
          <icosahedronGeometry args={[1.1, isMobile ? 2 : 4]} />
          <MeshDistortMaterial
            color="#060d1a"
            roughness={0.04}
            metalness={1.0}
            distort={0.18}
            speed={1.0}
            envMapIntensity={3.5}
            /* clearcoat + iridescence via drei's extended props */
            clearcoat={1}
            clearcoatRoughness={0.08}
            iridescence={0.6}
            iridescenceIOR={1.4}
          />
        </mesh>

        {/* ── Glow halo inside ── */}
        <mesh scale={1.18}>
          <sphereGeometry args={[1, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
          <meshBasicMaterial
            color="#1a4a8a"
            transparent
            opacity={0.055}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>

        {/* ── Outer atmosphere sphere ── */}
        <mesh scale={1.6}>
          <sphereGeometry args={[1, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
          <meshBasicMaterial
            color="#0d2a50"
            transparent
            opacity={0.028}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>

        <WireShell isMobile={isMobile} />
        <HaloRings isMobile={isMobile} />
      </group>
    </Float>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const SPECS = [
  ["00.04ms", "Thought-to-render latency"],
  ["8 ch", "Bidirectional neural read"],
  ["72 hr", "Ambient operation"],
  ["14 g", "Titanium / sapphire shell"],
];

export function Synapse() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 1.04]);
  const [canvasError, setCanvasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Detect mobile and low-end devices
    const checkDevice = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      setIsMobile(mobile);
      
      // Simple performance check for low-end devices
      const isLowEnd = mobile || 
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || 
        /Android.*Chrome\/[1-6][0-9]/.test(navigator.userAgent);
      setIsLowEndDevice(isLowEnd);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Enhanced error handling with retry mechanism
  const handleCanvasError = () => {
    console.error('3D Canvas Error: WebGL context lost or initialization failed');
    setCanvasError(true);
    setIsLoaded(false);
    // Optional: retry after delay
    setTimeout(() => {
      if (canvasError) {
        setCanvasError(false);
        setIsLoaded(false);
      }
    }, 3000);
  };

  // Handle canvas load
  const handleCanvasCreated = () => {
    setIsLoaded(true);
  };

  return (
    <section id="synapse" ref={ref} className="relative overflow-hidden py-24 md:py-40 lg:py-48">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.16_0.035_240),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 neural-grid opacity-15" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
        {/* Header */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:gap-8 md:mb-12 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-3"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neural">
              ◍ Chapter 05
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Product reveal
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-9"
          >
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.45em] text-neural-glow">
              Introducing
            </div>
            <h2 className="font-display text-[clamp(3rem,8.5vw,9rem)] font-extralight leading-[0.9] tracking-[-0.05em]">
              Neurova <span className="italic text-neural-glow text-glow">Synapse</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              A wearable cognitive interface. 14 grams. Always present. Never visible.
            </p>
          </motion.div>
        </div>

        {/* 3D Canvas viewport */}
        <motion.div
          style={{ scale }}
          className="relative mx-auto h-[50vh] min-h-[300px] w-full sm:h-[60vh] sm:min-h-[400px] md:h-[70vh] md:min-h-[500px] lg:h-[80vh] lg:min-h-[580px]"
        >
          {/* Loading overlay */}
          {!isLoaded && !canvasError && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-neural/20 border-t-neural" />
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                  ◍ Initializing holographic projection
                </div>
              </div>
            </div>
          )}
          {/* Left HUD */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 flex items-center">
            <div className="hidden sm:flex">
              <div className="h-px w-16 bg-gradient-to-r from-neural to-transparent md:w-24" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="ml-3 space-y-1.5 font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[9px] bg-background/60 backdrop-blur-sm p-2 rounded"
            >
              <div className="text-neural-glow">◍ MODEL — N/SYN.01</div>
              <div>14g titanium / sapphire</div>
              <div>8-channel neural read</div>
              <div className="mt-3 animate-flicker text-neural/60">◍ Synced</div>
            </motion.div>
          </div>

          {/* Right HUD */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mr-3 space-y-1.5 text-right font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[9px] bg-background/60 backdrop-blur-sm p-2 rounded"
            >
              <div className="text-neural-glow">◍ STATUS — SYNCED</div>
              <div>Latency · 0.04ms</div>
              <div>Battery · 72hr ambient</div>
              <div className="mt-3 text-neural/60">Bidirectional · active</div>
            </motion.div>
            <div className="hidden sm:flex">
              <div className="h-px w-16 bg-gradient-to-l from-neural to-transparent md:w-24" />
            </div>
          </div>

          {/* Bottom HUD */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 text-center font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/60 sm:text-[9px] bg-background/60 backdrop-blur-sm px-3 py-1 rounded">
            ◍ Holographic projection · live render
          </div>

          {/* 3D Canvas */}
          {!canvasError ? (
            <Canvas
              camera={{ position: [0, 0, isMobile ? 6 : 5], fov: isMobile ? 42 : 36 }}
              dpr={isLowEndDevice ? [1, 1] : [1, 2]}
              gl={{
                antialias: !isLowEndDevice,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 0.9,
                powerPreference: isMobile ? 'low-power' : 'high-performance',
                alpha: true,
                premultipliedAlpha: false,
              }}
              onError={handleCanvasError}
              onCreated={handleCanvasCreated}
              performance={{ min: 0.5, max: isMobile ? 0.7 : 1 }}
              style={{ background: 'transparent' }}
            >
              {/*
                Environment with background=false:
                provides IBL reflections for metallic material
                WITHOUT rendering as a visible background.
              */}
              <Environment preset="studio" background={false} />

              {/* Cinematic lighting - simplified for mobile */}
              <ambientLight intensity={isMobile ? 0.3 : 0.15} />
              <directionalLight position={[6, 6, 4]} intensity={isMobile ? 1.5 : 1.8} color="#c0e8ff" />
              <directionalLight position={[-5, -3, -3]} intensity={0.8} color="#4a80c0" />
              <pointLight position={[0, 0, 3.5]} intensity={2.2} color="#9ed8ff" distance={8} />
              {!isMobile && (
                <>
                  <pointLight position={[3, -2, 2]} intensity={0.6} color="#a090ff" distance={6} />
                  <pointLight position={[-3, 3, -1]} intensity={0.4} color="#60a0e0" distance={6} />
                </>
              )}

              <NeuralParticles isMobile={isMobile} />
              <SynapseObject isMobile={isMobile} />
            </Canvas>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-neural">
                  ◍ N/SYN.01
                </div>
                <div className="mt-4 font-display text-4xl font-extralight text-foreground/40">
                  Synapse
                </div>
              </div>
            </div>
          )}

          {/* Vignette overlay */}
          <div className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_78%)]" />
        </motion.div>

        {/* Specs grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border/60 bg-border/40 sm:grid-cols-4 md:mt-16"
        >
          {SPECS.map(([n, l]) => (
            <div
              key={l}
              className="group relative overflow-hidden bg-background p-6 transition-colors duration-500 hover:bg-card/60 sm:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neural/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="font-display text-2xl font-extralight tracking-tight text-foreground sm:text-3xl">
                {n}
              </div>
              <div className="mt-2 font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[9px]">
                {l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
