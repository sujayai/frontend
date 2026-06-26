import React, { useEffect, useRef } from 'react';

/**
 * The living backdrop. Slow auroral orbs drift through the void; a faint
 * parallax follows the pointer so the whole scene has depth and weight.
 * Everything is blurred to abstraction — it reads as shifting light, not color.
 */
const Void: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(hover: none)').matches;
    if (reduce || coarse) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 40;
      ty = (e.clientY / window.innerHeight - 0.5) * 40;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="void" aria-hidden="true">
      <div ref={ref} className="absolute inset-[-8%]">
        <div
          className="aurora-orb animate-drift-1"
          style={{
            top: '-6%',
            left: '8%',
            width: '46vw',
            height: '46vw',
            background:
              'radial-gradient(circle at 30% 30%, hsl(var(--accent) / 0.55), transparent 62%)',
          }}
        />
        <div
          className="aurora-orb animate-drift-2"
          style={{
            top: '18%',
            right: '4%',
            width: '40vw',
            height: '40vw',
            background:
              'radial-gradient(circle at 60% 40%, hsl(var(--accent-2) / 0.5), transparent 62%)',
          }}
        />
        <div
          className="aurora-orb animate-drift-3"
          style={{
            bottom: '-10%',
            left: '30%',
            width: '52vw',
            height: '52vw',
            background:
              'radial-gradient(circle at 50% 50%, hsl(var(--accent-3) / 0.42), transparent 60%)',
          }}
        />
      </div>
    </div>
  );
};

export default Void;
