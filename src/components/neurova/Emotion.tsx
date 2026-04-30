import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EMOTIONS = [
  { name: "Curiosity", hue: 200, desc: "Active / outward" },
  { name: "Awe", hue: 230, desc: "Passive / vast" },
  { name: "Longing", hue: 280, desc: "Recursive / interior" },
  { name: "Stillness", hue: 180, desc: "Null / resolved" },
  { name: "Recognition", hue: 160, desc: "Pattern / return" },
];

// Pre-compute opacity transforms at module level to avoid hooks-in-loops violation.
// Each card gets its own scroll-linked opacity via index offset.
function EmotionCard({
  e,
  i,
  idx,
}: {
  e: (typeof EMOTIONS)[number];
  i: number;
  idx: ReturnType<typeof useTransform<number, number>>;
}) {
  const opacity = useTransform(idx, (v) => 0.4 + Math.max(0, 1 - Math.abs(v - i)) * 0.6);

  return (
    <motion.div
      style={{ opacity }}
      className="group relative overflow-hidden bg-background p-6 sm:p-8 transition-all duration-700 hover:bg-card/80"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-40"
        style={{
          background: `radial-gradient(circle at 30% 30%, oklch(0.55 0.18 ${e.hue}), transparent 70%)`,
        }}
      />
      {/* top line accent */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to right, transparent, oklch(0.65 0.18 ${e.hue} / 0.8), transparent)`,
        }}
      />
      <div className="relative">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          /{String(i + 1).padStart(2, "0")}
        </div>
        <div className="mt-3 font-display text-xl font-extralight tracking-tight sm:text-2xl">
          {e.name}
        </div>
        <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
          {e.desc}
        </div>
        <div className="mt-6 h-px w-full bg-border/60" />
        <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
          Hue {e.hue}° · weighted
        </div>
      </div>
    </motion.div>
  );
}

export function Emotion() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const idx = useTransform(scrollYProgress, [0, 1], [0, EMOTIONS.length - 1]);
  const hue = useTransform(scrollYProgress, [0, 1], [200, 280]);
  const bg = useTransform(
    hue,
    (h) => `radial-gradient(ellipse at center, oklch(0.5 0.18 ${h} / 0.2), transparent 65%)`,
  );

  // Waveform amplitude driven by scroll
  const waveAmp = useTransform(scrollYProgress, [0.2, 0.8], [20, 45]);

  return (
    <section id="emotion" ref={ref} className="relative py-32 md:py-48 lg:py-56">
      <motion.div style={{ background: bg }} className="pointer-events-none absolute inset-0" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:mb-24 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neural">
              ◍ Chapter 04
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Synthetic emotion engine
            </div>
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,5rem)] font-extralight leading-[1.05] tracking-[-0.03em] md:col-span-9">
            The environment <span className="italic text-muted-foreground">listens.</span> It tunes
            color, sound, and tempo to the emotional weight of your attention.
          </h2>
        </div>

        {/* Animated waveform */}
        <div className="relative mx-auto h-32 w-full overflow-hidden sm:h-48">
          <svg className="h-full w-full" viewBox="0 0 800 200" preserveAspectRatio="none">
            {[0, 1, 2].map((layer) => {
              const pts: string[] = [];
              for (let i = 0; i < 80; i++) {
                const x = ((i / 79) * 800).toFixed(2);
                const y = (100 + Math.sin(i * 0.4 + layer * 1.5) * (20 + layer * 8)).toFixed(2);
                pts.push(`${i === 0 ? "M" : "L"}${x},${y}`);
              }
              return (
                <motion.path
                  key={layer}
                  d={pts.join(" ")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.6}
                  className="text-neural"
                  opacity={0.7 - layer * 0.2}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2 + layer * 0.5, ease: "easeInOut" }}
                />
              );
            })}
          </svg>
          {/* scan line overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>

        {/* Emotion cards grid */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border/60 bg-border/40 sm:grid-cols-3 md:grid-cols-5 lg:mt-16">
          {EMOTIONS.map((e, i) => (
            <EmotionCard key={e.name} e={e} i={i} idx={idx} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50"
        >
          ◍ Scroll to modulate emotional frequency
        </motion.p>
      </div>
    </section>
  );
}
