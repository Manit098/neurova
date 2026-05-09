import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const lines = [
  { num: "01", label: "Keyboards", verdict: "are slow.", ms: "≈ 240ms", active: false },
  { num: "02", label: "Touch", verdict: "is primitive.", ms: "≈ 110ms", active: false },
  { num: "03", label: "Voice", verdict: "is performative.", ms: "≈ 380ms", active: false },
  { num: "04", label: "Thought", verdict: "is instant.", ms: "0ms", active: true },
];

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const lineX = useTransform(scrollYProgress, [0.3, 0.7], ["-100%", "0%"]);

  return (
    <section id="problem" ref={ref} className="relative py-32 md:py-48 lg:py-56">
      {/* Parallax background grid */}
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 mask-fade-edges neural-grid opacity-25"
      />

      {/* Animated border-line reveal */}
      <motion.div
        style={{ x: lineX }}
        className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-neural/30 to-transparent"
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
        {/* Chapter header */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:gap-8 md:mb-24 md:grid-cols-12">
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neural">
                ◍ Chapter 01
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                The problem
              </div>
            </motion.div>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-[clamp(1.9rem,5vw,5rem)] font-extralight leading-[1.05] tracking-[-0.03em] md:col-span-9"
          >
            Every interface we have ever built is a{" "}
            <span className="italic text-muted-foreground">translation layer</span> — a slow, lossy
            bridge between intention and outcome.
          </motion.h2>
        </div>

        {/* Latency comparison rows */}
        <div className="divide-y divide-border/50 border-y border-border/50">
          {lines.map((l, i) => (
            <motion.div
              key={l.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative grid grid-cols-12 items-baseline gap-3 py-7 sm:gap-4 sm:py-10 md:py-12 ${
                l.active ? "cursor-default" : ""
              }`}
              data-cursor="hover"
            >
              {/* Active row glow */}
              {l.active && (
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_20%_50%,oklch(0.85_0.12_220/0.05),transparent_70%)]" />
              )}

              {/* Number */}
              <div className="col-span-2 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground sm:col-span-1 sm:text-[10px]">
                {l.num}
              </div>

              {/* Label + verdict */}
              <div className="col-span-7 font-display text-[clamp(1.5rem,4vw,4rem)] font-extralight leading-none tracking-[-0.03em] sm:col-span-8 md:col-span-8">
                <span className="text-foreground">{l.label}</span>{" "}
                <span
                  className={
                    l.active
                      ? "italic text-neural-glow text-glow"
                      : "italic text-muted-foreground/60"
                  }
                >
                  {l.verdict}
                </span>
              </div>

              {/* Latency */}
              <div className="col-span-3 text-right font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground sm:text-[10px]">
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`inline-block h-px transition-all duration-700 ${
                      l.active ? "w-10 bg-neural-glow" : "w-5 bg-muted-foreground/30"
                    }`}
                  />
                  <span className={l.active ? "text-neural-glow" : ""}>{l.ms}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-24 max-w-2xl text-center md:mt-32"
        >
          <blockquote className="font-display text-xl font-extralight italic leading-relaxed text-muted-foreground sm:text-2xl md:text-3xl">
            "We did not invent a faster interface.
            <br />
            We <span className="not-italic text-foreground">removed</span> it."
          </blockquote>
          <figcaption className="mt-6 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">
            — Neurova Research Division, 2049
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
