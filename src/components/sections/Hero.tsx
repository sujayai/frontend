import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DatacenterScene from '@/components/illustrations/DatacenterScene';
import { ease, fadeUpStagger, item } from '@/lib/motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 600], [0, 60]);

  return (
    <section className="relative overflow-hidden pt-20 md:pt-28 pb-24 md:pb-32">
      {/* Soft top wash — no rainbow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1400px] h-[600px] opacity-70 dark:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 50%, hsl(var(--primary) / 0.12), transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      <motion.div
        variants={fadeUpStagger(0.1, 0.12)}
        initial="hidden"
        animate="visible"
        className="container relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-6">
            <motion.div variants={item}>
              <span className="eyebrow">AI Infrastructure</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-7 font-display font-semibold text-[44px] sm:text-6xl lg:text-7xl xl:text-[80px] leading-[1.02] tracking-tight text-foreground text-balance"
            >
              The infrastructure behind <span className="text-accent">the AI era</span>.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 text-lg sm:text-xl text-foreground-muted leading-relaxed text-pretty max-w-xl"
            >
              I design the network fabric and operate the GPU clusters that keep
              frontier AI training healthy at hundreds of thousands of accelerators.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                variant="primary"
                onClick={() =>
                  document
                    .getElementById('network-story')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className="group"
              >
                Explore the work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent('switchTab', { detail: 'blog' }))
                }
                className="group"
              >
                Read the writing
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </motion.div>
          </div>

          {/* Right — data-center render with portrait inset */}
          <motion.div
            variants={item}
            style={{ y: visualY }}
            className="lg:col-span-6"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background-deep shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.35)]">
              <DatacenterScene className="block w-full h-auto" />

              {/* Portrait inset — bottom-left corner */}
              <div className="absolute bottom-5 left-5 flex items-center gap-3 pl-1 pr-4 py-1 rounded-full bg-background/85 backdrop-blur-md border border-white/10">
                <div className="relative">
                  <img
                    src="/profile.jpg"
                    alt="Sujay Sreedhar"
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[hsl(var(--success))] border-2 border-background" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-foreground leading-tight">
                    Sujay Sreedhar
                  </div>
                  <div className="text-[11px] text-foreground-muted leading-tight">
                    San Francisco · Available
                  </div>
                </div>
              </div>

              {/* Top-right meta label */}
              <div className="absolute top-5 right-5 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase tracking-[0.18em] text-foreground-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))]" />
                Cluster · 200k GPUs
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
