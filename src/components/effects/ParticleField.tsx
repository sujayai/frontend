import React, { useEffect, useRef } from 'react';

interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; }

const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();

    const create = (x: number, y: number): Particle => ({
      x, y,
      vx: (Math.random() - 0.5) * 1.4,
      vy: (Math.random() - 0.5) * 1.4,
      life: 0,
      maxLife: Math.random() * 80 + 80,
    });

    let last = 0; const step = 1/40; // 40fps

    const tick = (t: number) => {
      const dt = (t - last) / 1000; if (dt < step) { requestAnimationFrame(tick); return; }
      last = t;

      // update
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx; p.y += p.vy; p.life++; return p.life < p.maxLife;
      });
      if (particlesRef.current.length < 30 && Math.random() < 0.2) {
        particlesRef.current.push(create(Math.random() * canvas.width, Math.random() * canvas.height));
      }

      // draw
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particlesRef.current.forEach(p => {
        const a = 1 - p.life / p.maxLife; ctx.fillStyle = `rgba(16,185,129,${a*0.5})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI*2); ctx.fill();
      });
      requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ pointerEvents: 'none' }} />
};

export default ParticleField;
