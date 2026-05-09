import { motion } from "framer-motion";

export function Final() {
  return (
    <section
      id="transmit"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden py-24 sm:py-32"
    >
      {/* Atmospheric backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_40%,oklch(0.14_0.025_240),var(--background)_75%)]" />
      <div className="absolute inset-0 scanline opacity-40" />
      <div className="absolute inset-0 neural-grid opacity-15 pointer-events-none" />

      {/* Corner HUD brackets */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-4 top-4 h-8 w-8 border-l border-t border-neural/20 md:left-8 md:top-8" />
        <div className="absolute right-4 top-4 h-8 w-8 border-r border-t border-neural/20 md:right-8 md:top-8" />
        <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-neural/20 md:bottom-8 md:left-8" />
        <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-neural/20 md:bottom-8 md:right-8" />
      </div>

      {/* Aurora bloom */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.85_0.12_220/0.1),transparent_65%)] blur-3xl animate-pulse-glow" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-5 text-center sm:px-8">
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-10 font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground/60"
        >
          ◍ Transmission · End
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(18px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-balance text-[clamp(2.6rem,9.5vw,10rem)] font-extralight leading-[0.93] tracking-[-0.05em]"
        >
          The future will not be <span className="italic text-neural-glow text-glow">typed.</span>
        </motion.h2>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          Be among the first to transmit — join the cognitive waitlist and help shape the
          post-screen era.
        </motion.p>

        {/* CTA cluster */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mt-14 flex flex-col items-center gap-8 sm:mt-16"
        >
          {/* Brand mark */}
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-neural opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-neural-glow" />
            </span>
            <span className="font-mono text-sm tracking-[0.5em] text-foreground/80">NEUROVA</span>
          </div>

          {/* Primary CTA */}
          <a
            href="#top"
            data-cursor="hover"
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-neural/40 bg-neural/5 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.4em] text-foreground backdrop-blur transition hover:border-neural hover:bg-neural/10 hover:shadow-[0_0_60px_-10px_var(--neural-glow)] active:scale-95 sm:px-10"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,var(--neural-glow),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-15" />
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-neural-glow" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-neural-glow" />
            </span>
            <span className="relative">Transmit</span>
            <span className="relative inline-block h-px w-7 bg-foreground/50 transition-all group-hover:w-12 group-hover:bg-neural-glow" />
          </a>

          {/* Info row */}
          <div className="flex flex-wrap items-center justify-center gap-8 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground sm:gap-12 md:gap-16">
            <div className="text-center">
              <div className="text-foreground/70">Lab</div>
              <div className="mt-1">San Francisco</div>
            </div>
            <div className="h-8 w-px bg-border/60" />
            <div className="text-center">
              <div className="text-foreground/70">Index</div>
              <div className="mt-1">N — 2049.001</div>
            </div>
            <div className="h-8 w-px bg-border/60" />
            <div className="text-center">
              <div className="text-foreground/70">Signal</div>
              <div className="mt-1 animate-flicker text-neural-glow">Live</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer bar */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/40 sm:bottom-6 sm:left-8 sm:right-8 sm:text-[9px]">
        <span>© Neurova Cognitive Lab</span>
        <span>End of transmission ◍</span>
      </div>
    </section>
  );
}
