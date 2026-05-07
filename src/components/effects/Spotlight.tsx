import React, { useEffect, useState } from 'react';

/**
 * Mouse-following radial spotlight — used at the top of the page.
 * Disables itself on touch devices and respects reduced-motion.
 */
const Spotlight: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (reduced || isTouch) return;

    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    const onMove = (e: MouseEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (pending) setPos(pending);
        });
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!pos) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, hsl(var(--primary) / 0.08), transparent 50%)`,
      }}
    />
  );
};

export default Spotlight;
