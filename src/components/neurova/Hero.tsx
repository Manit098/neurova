import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { NeuralField } from "./NeuralField";

const HEADLINE_LINE1 = "The interface is";
const HEADLINE_ITALIC = "no longer";
const HEADLINE_LINE2 = "the screen.";

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Layered atmosphere */}
      <div className="absolute inset-0 neural-grid opacity-25" />
      <NeuralField />
      <div className="absolute inset-0 scanline pointer-events-none opacity-60" />

      {/* Radial vignette — gentle so headline stays crisp on ultra-wide */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_75%_at_50%_50%,transparent_0%,oklch(0.08_0.005_240/0.5)_70%,var(--background)_100%)]" />

      {/* Aurora bloom — dual layer for depth */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.85_0.12_220/0.14),transparent_70%)] blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute left-[45%] top-[45%] h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.15_260/0.08),transparent_65%)] blur-2xl animate-float-slow" />

      {/* Corner HUD decorations */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Top-left */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute left-3 sm:left-5 top-16 sm:top-20 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-muted-foreground md:left-8 md:left-12 md:top-28"
        >
          <div className="text-foreground/70">N — 001</div>
          <div className="mt-0.5">Cognitive Layer / v0.1</div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="h-px w-3 sm:w-4 bg-neural/40" />
            <span className="text-neural/60">initialized</span>
          </div>
        </motion.div>

        {/* Top-right */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute right-3 sm:right-5 top-16 sm:top-20 text-right font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-muted-foreground sm:right-8 md:right-12 md:top-28"
        >
          <div className="text-foreground/70">37.7749° N</div>
          <div className="mt-0.5">122.4194° W</div>
          <div className="mt-2 flex items-center justify-end gap-1.5">
            <span className="text-neural/60">San Francisco</span>
            <span className="h-px w-3 sm:w-4 bg-neural/40" />
          </div>
        </motion.div>

        {/* Bottom-left */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="absolute bottom-6 sm:bottom-8 left-3 sm:left-5 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-muted-foreground md:bottom-10 md:left-12"
        >
          <span className="mr-2 inline-block h-1 sm:h-1.5 w-1 sm:w-1.5 animate-pulse rounded-full bg-neural-glow" />
          Neural field — active
        </motion.div>

        {/* Bottom-right */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="absolute bottom-6 sm:bottom-8 right-3 sm:right-5 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-muted-foreground md:bottom-10 md:right-12"
        >
          <span className="animate-flicker">Scroll to enter ↓</span>
        </motion.div>

        {/* Subtle corner brackets — top left */}
        <div className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 sm:h-6 w-4 sm:w-6 border-l border-t border-neural/20 md:left-8 md:top-8" />
        {/* top right */}
        <div className="absolute right-3 sm:right-4 top-3 sm:top-4 h-4 sm:h-6 w-4 sm:w-6 border-r border-t border-neural/20 md:right-8 md:top-8" />
        {/* bottom left */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 h-4 sm:h-6 w-4 sm:w-6 border-b border-l border-neural/20 md:bottom-8 md:left-8" />
        {/* bottom right */}
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 h-4 sm:h-6 w-4 sm:w-6 border-b border-r border-neural/20 md:bottom-8 md:right-8" />
      </div>

      {/* Centered hero content */}
      <div className="absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-4 sm:px-5 md:px-12">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 sm:mb-8 inline-flex items-center gap-2 sm:gap-3 font-mono text-[8px] sm:text-[9px] sm:text-[10px] uppercase tracking-[0.45em] text-neural-glow"
          >
            <span className="h-px w-4 sm:w-6 sm:w-8 bg-neural-glow/50" />
            <span className="hidden sm:inline">Neurova · Cognitive Interface Lab</span>
            <span className="sm:hidden">Neurova Lab</span>
            <span className="h-px w-4 sm:w-6 sm:w-8 bg-neural-glow/50" />
          </motion.div>

          {/* Main headline */}
          <h1 className="font-display text-balance text-[clamp(2rem,6vw,6rem)] sm:text-[clamp(2.6rem,7.5vw,8.5rem)] font-extralight leading-[0.93] tracking-[-0.045em] text-foreground">
            {HEADLINE_LINE1.split(" ").map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: isMobile ? 24 : 36, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.1,
                  delay: 0.4 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mr-[0.22em] inline-block"
              >
                {w}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: isMobile ? 24 : 36, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.3, delay: 0.92, ease: [0.22, 1, 0.36, 1] }}
              className="mr-[0.2em] inline-block italic text-neural-glow text-glow"
            >
              {HEADLINE_ITALIC}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: isMobile ? 24 : 36, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.3, delay: 1.08, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {HEADLINE_LINE2}
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="mt-5 sm:mt-7 max-w-xs sm:max-w-lg text-pretty text-xs sm:text-sm leading-relaxed text-muted-foreground md:max-w-xl"
          >
            <span className="sm:hidden">We design the first cognitive layer between thought and machine.</span>
            <span className="hidden sm:inline">We are designing the first cognitive layer between thought and machine — a wearable interface for the post-screen era.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4 sm:flex-row sm:gap-6"
          >
            <a
              href="#problem"
              data-cursor="hover"
              className="group relative inline-flex items-center gap-2 sm:gap-3 overflow-hidden rounded-full border border-neural/40 bg-neural/5 px-5 sm:px-7 py-2.5 sm:py-3.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-foreground backdrop-blur transition hover:border-neural hover:bg-neural/10 hover:shadow-[0_0_50px_-10px_var(--neural-glow)] active:scale-95"
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-neural-glow" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-neural-glow" />
              </span>
              <span className="hidden sm:inline">Enter the system</span>
              <span className="sm:hidden">Enter</span>
              <span className="inline-block h-px w-4 sm:w-5 bg-foreground/60 transition-all group-hover:w-6 sm:group-hover:w-9 group-hover:bg-neural-glow" />
            </a>
            <a
              href="#synapse"
              data-cursor="hover"
              className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground"
            >
              <span className="hidden sm:inline">Witness Synapse →</span>
              <span className="sm:hidden">Synapse →</span>
            </a>
          </motion.div>

          {/* Stat chips — appear last */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.2 }}
            className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4 sm:gap-6"
          >
            {[
              ["0.04ms", "Latency"],
              ["8-ch", "Neural read"],
              ["14g", "Shell weight"],
            ].map(([val, lbl]) => (
              <div
                key={lbl}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-border/50 bg-background/30 px-3 sm:px-4 py-1 sm:py-1.5 backdrop-blur"
              >
                <span className="font-mono text-[10px] sm:text-[11px] font-light text-foreground">{val}</span>
                <span className="h-2.5 sm:h-3 w-px bg-border/60" />
                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  {lbl}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
