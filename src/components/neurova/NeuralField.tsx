import { useEffect, useRef } from "react";

/**
 * Cursor-reactive neural particle field rendered to canvas.
 * Lightweight 2D — performant on mobile, looks cinematic on desktop.
 * On mobile/touch: reduced particle count, no cursor repulsion.
 */
export function NeuralField({ density = 80 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 1.5 : 2);

    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number; o: number };
    let pts: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Reduce particle count on small screens for performance
      const screenFactor = Math.min(1, w / 1200);
      const baseDensity = isTouch ? Math.floor(density * 0.5) : density;
      const count = Math.floor(((w * h) / 20000) * screenFactor) + baseDensity;
      pts = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.3,
        o: Math.random() * 0.55 + 0.18,
      }));
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Declare raf before any early returns so cleanup can always reference it
    let raf = 0;
    const connectionDist = isTouch ? 80 : 110;

    // Only track mouse on non-touch
    let onMove: ((e: MouseEvent) => void) | null = null;
    let onLeave: (() => void) | null = null;
    if (!isTouch) {
      onMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      };
      onLeave = () => {
        mouse.x = -9999;
        mouse.y = -9999;
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Soft center glow
      const grd = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.65);
      grd.addColorStop(0, "rgba(100, 170, 255, 0.04)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      for (const p of pts) {
        // Mouse repulsion (desktop only)
        if (!isTouch) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150 && dist > 0) {
            const f = (150 - dist) / 150;
            p.vx += (dx / dist) * f * 0.35;
            p.vy += (dy / dist) * f * 0.35;
          }
        }
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `rgba(170, 215, 255, ${p.o})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connection lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < connectionDist) {
            const alpha = (1 - d / connectionDist) * (isTouch ? 0.12 : 0.16);
            ctx.strokeStyle = `rgba(130, 195, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (onMove) window.removeEventListener("mousemove", onMove);
      if (onLeave) window.removeEventListener("mouseleave", onLeave);
    };
  }, [density]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
