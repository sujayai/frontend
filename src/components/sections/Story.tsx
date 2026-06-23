import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import NetworkTopology from '@/components/illustrations/NetworkTopology';
import GpuRacks from '@/components/illustrations/GpuRacks';
import { fadeUp, inViewProps, slideInLeft, slideInRight } from '@/lib/motion';

const LOGOS = ['Arista', 'xAI', 'Tesla', 'Lenovo', 'NC State'];

export const TrustStrip: React.FC = () => (
  <section className="border-y border-border-subtle bg-background-subtle/60">
    <div className="container py-10 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
        <p className="label-mono shrink-0">Worked at</p>
        <div className="flex flex-wrap items-center gap-x-10 md:gap-x-14 gap-y-4">
          {LOGOS.map((logo) => (
            <span
              key={logo}
              className="font-display text-xl md:text-2xl font-semibold tracking-tight text-foreground-muted hover:text-foreground transition-colors duration-300"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

interface StoryBlockProps {
  reverse?: boolean;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  linkLabel: string;
  visual: React.ReactNode;
  id?: string;
}

const StoryBlock: React.FC<StoryBlockProps> = ({
  reverse = false,
  eyebrow,
  title,
  body,
  linkLabel,
  visual,
  id,
}) => {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          {/* Visual */}
          <motion.div
            {...inViewProps}
            variants={reverse ? slideInRight : slideInLeft}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background-deep shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
              {visual}
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            {...inViewProps}
            variants={fadeUp}
            className="lg:col-span-5"
          >
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-5 font-display text-3xl md:text-4xl lg:text-[44px] font-semibold tracking-tight text-foreground leading-[1.05] text-balance">
              {title}
            </h2>
            <p className="mt-5 text-lg text-foreground-muted leading-relaxed text-pretty">
              {body}
            </p>
            <a href="#work" className="mt-7 arrow-link inline-flex">
              {linkLabel}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const NetworkStory: React.FC = () => (
  <StoryBlock
    id="network-story"
    eyebrow="Network engineering"
    title={<>Lossless fabrics at <span className="text-accent">hyperscaler scale</span>.</>}
    body="Designing and debugging routes across hundreds of nodes — RDMA, RoCE, EVPN — so the largest training jobs on the planet don't lose a gradient update."
    linkLabel="See Arista work"
    visual={<NetworkTopology className="block w-full h-auto" />}
  />
);

export const ComputeStory: React.FC = () => (
  <StoryBlock
    reverse
    eyebrow="Frontier compute"
    title={<>200,000 GPUs. <span className="text-accent">One supercomputer.</span></>}
    body="Core contributor to the cluster powering Grok 3 training at xAI — owning network reliability through pre-training so jobs stayed clean for weeks at a time."
    linkLabel="See xAI work"
    visual={<GpuRacks className="block w-full h-auto" />}
  />
);

export const StatsStrip: React.FC = () => (
  <section className="border-y border-border-subtle bg-background-subtle/50">
    <div className="container py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
      {[
        { v: '200k', l: 'GPUs operated', d: 'Across xAI pre-training' },
        { v: '4',    l: 'Years industry', d: 'Lenovo · Tesla · xAI · Arista' },
        { v: 'M.S.', l: 'Computer Networking', d: 'NC State University' },
      ].map((s, i) => (
        <motion.div
          key={i}
          {...inViewProps}
          variants={fadeUp}
          className="text-center md:text-left"
        >
          <div className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-foreground">
            {s.v}
          </div>
          <div className="mt-3 text-foreground font-medium">{s.l}</div>
          <div className="mt-1 text-sm text-foreground-muted">{s.d}</div>
        </motion.div>
      ))}
    </div>
  </section>
);
