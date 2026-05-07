import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import Aurora from '@/components/effects/Aurora';
import Terminal from '@/components/interactive/Terminal';
import { Button } from '@/components/ui/button';
import { ease, fadeUpStagger, item } from '@/lib/motion';

const ROLES = [
  'Technical Solutions Engineer',
  'Supercompute Network Engineer',
  'AI Infrastructure Engineer',
];

const Hero: React.FC = () => {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden pt-20 md:pt-28 pb-24 md:pb-32">
      {/* Aurora background — only on hero */}
      <Aurora />

      {/* Subtle dotted grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.07) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 80%)',
        }}
      />

      <div className="container relative">
        <motion.div
          variants={fadeUpStagger(0.1, 0.1)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left: copy */}
          <div className="lg:col-span-7 max-w-2xl">
            {/* Status pill */}
            <motion.div variants={item}>
              <a
                href="mailto:support@sujay.ai"
                className="inline-flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-border-subtle bg-background-subtle text-xs font-medium text-foreground-muted hover:border-border hover:text-foreground transition-colors group"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-60 animate-ping-soft" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                Available for projects
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="mt-6 font-display font-semibold text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[1.02] tracking-tightest text-foreground text-balance"
            >
              Building the
              <br />
              network fabric for{' '}
              <span className="gradient-brand whitespace-nowrap">large-scale AI</span>.
            </motion.h1>

            {/* Rotating role */}
            <motion.div
              variants={item}
              className="mt-7 flex items-center gap-3 text-foreground-muted"
            >
              <span className="label-mono text-[11px]">currently</span>
              <span className="h-px w-6 bg-border" />
              <div className="relative h-7 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROLES[roleIdx]}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="block text-sm sm:text-base text-foreground font-medium"
                  >
                    {ROLES[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={item}
              className="mt-8 text-lg sm:text-xl text-foreground-muted leading-relaxed text-pretty max-w-xl"
            >
              I&apos;m Sujay — a Technical Solutions Engineer at{' '}
              <span className="text-foreground font-medium">Arista Networks</span>. Previously, I
              helped build the 200k-GPU supercompute behind Grok at{' '}
              <span className="text-foreground font-medium">xAI</span>, with earlier stops at{' '}
              <span className="text-foreground font-medium">Tesla</span> and{' '}
              <span className="text-foreground font-medium">Lenovo</span>.
            </motion.p>

            {/* Stats — minimal, mono, divider */}
            <motion.div
              variants={item}
              className="mt-10 grid grid-cols-3 max-w-md divide-x divide-border"
            >
              <div className="pr-6">
                <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  200k
                </div>
                <div className="mt-1 label-mono text-[10px]">GPUs operated</div>
              </div>
              <div className="px-6">
                <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  1.5+
                </div>
                <div className="mt-1 label-mono text-[10px]">Years industry</div>
              </div>
              <div className="pl-6">
                <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  M.S.
                </div>
                <div className="mt-1 label-mono text-[10px]">NC State</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById('experience')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className="group"
              >
                See experience
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open('https://github.com/sujaysreedharg', '_blank', 'noopener,noreferrer')
                }
                className="group"
              >
                GitHub
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </motion.div>

            {/* Tech logos / stack pill row */}
            <motion.div
              variants={item}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-foreground-muted"
            >
              <span className="label-mono text-[10px]">Stack</span>
              {['CUDA', 'NCCL', 'RDMA', 'Kubernetes', 'Go', 'Python'].map((t) => (
                <span
                  key={t}
                  className="text-sm font-medium hover:text-foreground transition-colors"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: avatar + terminal */}
          <motion.div variants={item} className="lg:col-span-5">
            <div className="relative">
              {/* Avatar header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/40 to-transparent blur-md" />
                  <img
                    src="/profile.jpg"
                    alt="Sujay Sreedhar"
                    className="relative w-14 h-14 rounded-full object-cover ring-2 ring-border"
                  />
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground">
                    Sujay Sreedhar
                  </div>
                  <div className="text-xs text-foreground-muted flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> San Francisco, CA
                  </div>
                </div>
              </div>

              {/* Terminal */}
              <Terminal />

              {/* Sub-text */}
              <p className="mt-4 text-xs text-foreground-subtle font-mono text-center">
                tip: type <span className="text-foreground-muted">help</span> · click to focus
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="hidden md:flex justify-center mt-20"
        >
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById('experience')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="group inline-flex flex-col items-center gap-2 text-foreground-subtle hover:text-foreground-muted transition-colors"
          >
            <span className="label-mono text-[10px]">scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="block w-px h-8 bg-current"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
