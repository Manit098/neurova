import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#problem", label: "01 / Problem" },
  { href: "#memory", label: "02 / Memory" },
  { href: "#latency", label: "03 / Latency" },
  { href: "#emotion", label: "04 / Emotion" },
  { href: "#synapse", label: "05 / Synapse" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border/40 bg-background/60 py-3 backdrop-blur-2xl"
            : "py-5 md:py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-5 md:px-12">
          {/* Logo */}
          <a href="#top" data-cursor="hover" className="flex items-center gap-2 sm:gap-2.5 z-10">
            <span className="relative inline-flex h-1.5 sm:h-2 w-1.5 sm:w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-neural opacity-60" />
              <span className="relative h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-neural-glow" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-foreground/90 uppercase">
              NEUROVA
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-4 sm:gap-6 lg:gap-8 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="hover"
                className="relative transition hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-neural after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#transmit"
            data-cursor="hover"
            className="hidden font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-foreground/90 md:block"
          >
            <span className="inline-block border-b border-neural/50 pb-1 transition hover:border-neural hover:text-neural-glow">
              Request access ↗
            </span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            data-cursor="hover"
            className="relative z-10 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col items-end gap-[4px] sm:gap-[5px]">
              <motion.span
                animate={
                  open ? { rotate: 45, y: 6, width: "20px" } : { rotate: 0, y: 0, width: "20px" }
                }
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px bg-foreground/80"
                style={{ width: "20px" }}
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-3 sm:w-4 bg-foreground/80"
              />
              <motion.span
                animate={
                  open ? { rotate: -45, y: -6, width: "20px" } : { rotate: 0, y: 0, width: "14px" }
                }
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px bg-foreground/80"
                style={{ width: "14px" }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-2xl md:hidden"
          >
            {/* Decorative grid */}
            <div className="absolute inset-0 neural-grid opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_40%,oklch(0.85_0.12_220/0.06),transparent_70%)] pointer-events-none" />

            <nav className="flex flex-col items-start justify-center gap-2 px-6 sm:px-8 pt-24 sm:pt-28 pb-16 flex-1">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-[clamp(1.75rem,6vw,3.5rem)] font-extralight tracking-[-0.03em] text-foreground/70 transition hover:text-foreground hover:text-neural-glow py-2"
                >
                  {l.label.split(" / ")[1]}
                </motion.a>
              ))}

              <motion.a
                href="#transmit"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 sm:mt-10 inline-flex items-center gap-3 rounded-full border border-neural/40 bg-neural/5 px-5 sm:px-6 py-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-foreground backdrop-blur"
              >
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-neural-glow" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-neural-glow" />
                </span>
                Request access ↗
              </motion.a>
            </nav>

            {/* Bottom status bar */}
            <div className="border-t border-border/40 px-6 sm:px-8 py-4 sm:py-6 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60 flex justify-between">
              <span>N — 001 / Cognitive Layer</span>
              <span className="animate-flicker">◍ Signal live</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
