import { motion } from "framer-motion";

const PHRASES = [
  "Cognitive bandwidth",
  "◍",
  "Post-screen interface",
  "◍",
  "Thought-to-render 0.04ms",
  "◍",
  "Neural read · 8 channels",
  "◍",
  "Designed in San Francisco",
  "◍",
  "Bidirectional · always on",
  "◍",
];

export function Marquee() {
  // Triple for seamless loop
  const row = [...PHRASES, ...PHRASES, ...PHRASES];
  return (
    <div className="relative overflow-hidden border-y border-border/50 bg-background/50 py-5 backdrop-blur-sm">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24 md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24 md:w-32" />

      {/* Forward track */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-10 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground/70 sm:gap-12 sm:text-[11px]"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
        >
          {row.map((p, i) => (
            <span
              key={i}
              className={
                p === "◍"
                  ? "text-neural-glow opacity-80"
                  : "transition-colors hover:text-foreground/60"
              }
            >
              {p}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
