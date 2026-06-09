import React, { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Aurora from '@/components/effects/Aurora';
import Vitruvian from '@/components/effects/Vitruvian';
import { Button } from '@/components/ui/button';

/**
 * Each character becomes a span so the `.illuminate` keyframe can stagger
 * the reveal — Renaissance manuscript "ink-in" effect.
 */
const Illuminate: React.FC<{ text: string; className?: string; delay?: number }> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const chars = useMemo(() => Array.from(text), [text]);
  return (
    <span className={`illuminate ${className}`}>
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            animationDelay: `${delay + i * 0.045}s`,
          }}
        >
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const vitruvianY = useTransform(scrollY, [0, 600], [0, 140]);
  const vitruvianRot = useTransform(scrollY, [0, 600], [0, 22]);
  const heroY = useTransform(scrollY, [0, 400], [0, -40]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden pt-16 md:pt-20 pb-32 md:pb-40">
      <Aurora />

      {/* Vitruvian ornament — sits behind the hero text */}
      <motion.div
        style={{ y: vitruvianY, rotate: vitruvianRot }}
        className="pointer-events-none absolute top-24 left-0 right-0 mx-auto opacity-90 w-[680px] h-[680px] max-w-[90vw]"
      >
        <Vitruvian size={680} className="w-full h-full" />
      </motion.div>

      {/* Subtle parchment grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, hsl(var(--gold) / 0.4) 1px, transparent 0)',
          backgroundSize: '36px 36px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 80%)',
        }}
      />

      <motion.div
        style={{ y: heroY }}
        className="container relative z-10 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow">
            <span>Codex MMXXVI</span>
          </div>
        </motion.div>

        {/* Headline — Cinzel caps, illuminate-in */}
        <h1 className="mt-10 md:mt-14 font-display font-medium uppercase tracking-[0.02em] text-foreground leading-[0.95] text-balance">
          <span className="block text-[12vw] sm:text-7xl md:text-8xl lg:text-[120px]">
            {mounted ? <Illuminate text="Sujay" delay={0.1} /> : 'Sujay'}
          </span>
          <motion.span
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[12vw] sm:text-7xl md:text-8xl lg:text-[120px] shimmer"
          >
            Sreedhar
          </motion.span>
        </h1>

        {/* One-line tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 font-serif italic text-xl md:text-2xl text-foreground-muted max-w-xl mx-auto"
        >
          Network architect for the machine renaissance.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center justify-center gap-3"
        >
          <Button
            size="lg"
            variant="primary"
            onClick={() =>
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="group font-display tracking-[0.18em] uppercase text-xs"
          >
            Enter
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() =>
              window.dispatchEvent(new CustomEvent('switchTab', { detail: 'blog' }))
            }
            className="group font-display tracking-[0.18em] uppercase text-xs"
          >
            Writing
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </motion.div>

        {/* Mono attribution line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-20 flex items-center justify-center gap-6 text-foreground-subtle"
        >
          <span className="h-px w-12 bg-current opacity-50" />
          <span className="label-mono">
            Arista · xAI · Tesla · Lenovo
          </span>
          <span className="h-px w-12 bg-current opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
