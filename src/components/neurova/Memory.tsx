import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Node = {
  id: string;
  x: number;
  y: number;
  z: number;
  label: string;
  meta: string;
  year: string;
};

const NODES: Node[] = [
  { id: "n1", x: 12, y: 22, z: 0.4, label: "First light", meta: "Sensory / visual", year: "1994" },
  {
    id: "n2",
    x: 78,
    y: 18,
    z: 0.9,
    label: "A voice in another room",
    meta: "Auditory",
    year: "2001",
  },
  {
    id: "n3",
    x: 30,
    y: 70,
    z: 0.2,
    label: "The sound of rain on glass",
    meta: "Ambient",
    year: "2007",
  },
  {
    id: "n4",
    x: 62,
    y: 60,
    z: 0.7,
    label: "An unread message",
    meta: "Anticipation",
    year: "2014",
  },
  { id: "n5", x: 48, y: 38, z: 1.0, label: "Her name", meta: "Emotional / persistent", year: "—" },
  { id: "n6", x: 88, y: 78, z: 0.5, label: "A door closing", meta: "Spatial", year: "2019" },
  {
    id: "n7",
    x: 8,
    y: 50,
    z: 0.3,
    label: "Snow on a screen",
    meta: "Visual / decay",
    year: "1998",
  },
];

export function Memory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yField = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const [active, setActive] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouchDevice) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [isTouchDevice]);

  return (
    <section id="memory" ref={ref} className="relative py-32 md:py-48 lg:py-56">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
        {/* Chapter header */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:gap-8 md:mb-20 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-3"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neural">
              ◍ Chapter 02
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Memory architecture
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-[clamp(1.9rem,5vw,5rem)] font-extralight leading-[1.05] tracking-[-0.03em] md:col-span-9"
          >
            Memory is not storage. It is{" "}
            <span className="italic text-neural-glow text-glow">geometry</span> — a constellation of
            weighted moments.
          </motion.h2>
        </div>

        {/* Constellation field */}
        <motion.div
          style={{ y: yField }}
          className="relative mx-auto h-[55vh] min-h-[360px] w-full overflow-hidden rounded-sm border border-border/60 bg-card/20 sm:h-[65vh] sm:min-h-[440px] md:h-[70vh] md:min-h-[500px]"
        >
          <div className="absolute inset-0 neural-grid opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.85_0.12_220/0.12),transparent_70%)]" />

          {/* SVG connections */}
          <svg
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            {NODES.map((a, i) =>
              NODES.slice(i + 1).map((b) => {
                const dist = Math.hypot(a.x - b.x, a.y - b.y);
                const opacity = Math.max(0, 0.3 - dist / 180);
                if (opacity <= 0) return null;
                return (
                  <line
                    key={a.id + b.id}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="currentColor"
                    className="text-neural"
                    strokeWidth="0.06"
                    opacity={opacity}
                    vectorEffect="non-scaling-stroke"
                  />
                );
              }),
            )}
          </svg>

          {/* Nodes */}
          {NODES.map((n) => {
            const parX = isTouchDevice ? 0 : (mouse.x - 0.5) * n.z * -30;
            const parY = isTouchDevice ? 0 : (mouse.y - 0.5) * n.z * -30;
            const isActive = active === n.id;
            return (
              <motion.div
                key={n.id}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                onTouchStart={() => setActive(isActive ? null : n.id)}
                data-cursor="hover"
                className="absolute"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  transform: `translate(calc(-50% + ${parX}px), calc(-50% + ${parY}px))`,
                  filter: `blur(${(1 - n.z) * 1.2}px)`,
                  opacity: 0.3 + n.z * 0.7,
                  zIndex: isActive ? 20 : 10,
                }}
              >
                {/* Node dot */}
                <div className="relative flex items-center justify-center">
                  <span
                    className={`absolute rounded-full bg-neural/25 blur-xl transition-all duration-500 ${
                      isActive ? "h-16 w-16" : "h-8 w-8"
                    }`}
                  />
                  <span
                    className={`relative rounded-full bg-neural-glow transition-all duration-300 ${
                      isActive
                        ? "h-3 w-3 shadow-[0_0_24px_4px_var(--neural-glow)]"
                        : "h-2 w-2 shadow-[0_0_8px_var(--neural-glow)]"
                    }`}
                  />
                </div>

                {/* Tooltip */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none absolute left-1/2 top-full mt-4 w-48 -translate-x-1/2 sm:w-56"
                  style={{ zIndex: 30 }}
                >
                  <div className="glass-panel rounded-sm p-3 text-left shadow-[0_8px_32px_oklch(0_0_0/0.4)]">
                    <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-neural-glow">
                      {n.year} — fragment
                    </div>
                    <div className="mt-1 font-display text-sm font-light text-foreground">
                      {n.label}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      {n.meta}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* HUD labels */}
          <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60">
            {isTouchDevice ? "Tap" : "Hover"} — fragment metadata
          </div>
          <div className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60">
            Memory map / 7 / ∞
          </div>
          {/* Corner brackets */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-neural/30" />
            <div className="absolute right-3 top-3 h-4 w-4 border-r border-t border-neural/30" />
            <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-neural/30" />
            <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-neural/30" />
          </div>
        </motion.div>

        {/* Node count / legend row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50"
        >
          <span>{NODES.length} fragments indexed</span>
          <span>Parallax depth · 7 layers</span>
        </motion.div>
      </div>
    </section>
  );
}
