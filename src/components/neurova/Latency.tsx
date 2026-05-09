import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  return (
    <button
      ref={ref}
      data-cursor="hover"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setT({
          x: (e.clientX - r.left - r.width / 2) * 0.4,
          y: (e.clientY - r.top - r.height / 2) * 0.4,
        });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setT({ x: 0, y: 0 });
        setHovered(false);
      }}
      style={{ transform: `translate(${t.x}px, ${t.y}px)` }}
      className="group relative inline-flex h-28 w-28 items-center justify-center rounded-full border border-neural/40 bg-neural/5 backdrop-blur transition-[border-color,background-color,box-shadow,transform] duration-500 hover:border-neural hover:bg-neural/10 hover:shadow-[0_0_60px_-10px_var(--neural-glow)] sm:h-32 sm:w-32 md:h-36 md:w-36"
    >
      <span
        className={`absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--neural-glow),transparent_70%)] blur-2xl transition-opacity duration-500 ${
          hovered ? "opacity-25" : "opacity-0"
        }`}
      />
      {/* Animated ring */}
      <span
        className={`absolute inset-[-8px] rounded-full border border-neural/20 transition-all duration-700 ${
          hovered ? "inset-[-16px] opacity-100" : "opacity-0"
        }`}
      />
      <span className="relative font-mono text-[9px] uppercase tracking-[0.35em] text-foreground sm:text-[10px]">
        {children}
      </span>
    </button>
  );
}

const STATS = [
  { label: "Predictive offset", value: "96ms", active: true },
  { label: "Magnetic field gravity", value: "0.4×", active: false },
  { label: "Inertia decay", value: "0.86", active: false },
];

export function Latency() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [pred, setPred] = useState({ x: 0, y: 0, on: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || isMobile) return;
    let lx = 0;
    let ly = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const vx = x - lx;
      const vy = y - ly;
      lx = x;
      ly = y;
      setPred({ x: x + vx * 6, y: y + vy * 6, on: true });
    };
    const onLeave = () => setPred((p) => ({ ...p, on: false }));
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile]);

  return (
    <section
      id="latency"
      ref={sectionRef}
      className="relative overflow-hidden py-32 md:py-48 lg:py-56"
    >
      {/* Predictive crosshair (desktop only) */}
      {!isMobile && (
        <>
          <div
            className={`pointer-events-none absolute z-10 h-px w-32 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-neural-glow to-transparent transition-opacity duration-200 sm:w-40 ${
              pred.on ? "opacity-50" : "opacity-0"
            }`}
            style={{ left: pred.x, top: pred.y }}
          />
          <div
            className={`pointer-events-none absolute z-10 h-32 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-neural-glow to-transparent transition-opacity duration-200 sm:h-40 ${
              pred.on ? "opacity-50" : "opacity-0"
            }`}
            style={{ left: pred.x, top: pred.y }}
          />
          {/* Prediction dot */}
          <div
            className={`pointer-events-none absolute z-10 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neural-glow transition-opacity duration-200 ${
              pred.on ? "opacity-80" : "opacity-0"
            }`}
            style={{ left: pred.x, top: pred.y, boxShadow: "0 0 8px var(--neural-glow)" }}
          />
        </>
      )}

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
              ◍ Chapter 03
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Human latency
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-[clamp(1.9rem,5vw,5rem)] font-extralight leading-[1.05] tracking-[-0.03em] md:col-span-9"
          >
            The interface anticipates.{" "}
            <span className="italic text-muted-foreground">It moves toward you</span> before you
            have decided to move.
          </motion.h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          {/* Left column: description + stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {isMobile
                ? "The system reads velocity, vector, and intent — and renders the next state before you arrive."
                : "Move your cursor across this region. The system reads velocity, vector, and intent — and renders the next state before you arrive."}
            </p>

            <div className="space-y-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between border-b border-border/40 pb-3 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-px w-6 ${s.active ? "bg-neural-glow" : "bg-muted-foreground/30"}`}
                    />
                    {s.label}
                  </div>
                  <span className={s.active ? "text-neural-glow" : ""}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Mobile touch hint */}
            {isMobile && (
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">
                ◍ Interact with the button below
              </p>
            )}
          </motion.div>

          {/* Right column: magnetic button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[320px] items-center justify-center sm:h-[380px] md:h-[400px]"
          >
            {/* Decorative concentric rings */}
            <div className="relative">
              {[1, 2, 3].map((r) => (
                <div
                  key={r}
                  className="absolute rounded-full border border-neural/10"
                  style={{
                    inset: `${-r * 32}px`,
                    animationDelay: `${r * 0.6}s`,
                  }}
                />
              ))}
              <MagneticButton>Reach</MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
