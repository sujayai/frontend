import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { samplePosts } from '@/data/blogPosts';
import { fadeUp, inViewProps } from '@/lib/motion';

/**
 * Cover illustration for the featured post — a deep-navy plate with a
 * subtle circuit-board overlay and a single accent dot.
 */
const ArticleCover: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 600 360" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="cover-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="hsl(214 55% 12%)" />
        <stop offset="100%" stopColor="hsl(214 65% 6%)" />
      </linearGradient>
      <radialGradient id="cover-halo" cx="35%" cy="40%" r="65%">
        <stop offset="0%"  stopColor="hsl(207 100% 55% / 0.5)" />
        <stop offset="100%" stopColor="hsl(207 100% 55% / 0)" />
      </radialGradient>
    </defs>
    <rect width="600" height="360" fill="url(#cover-bg)" />
    <ellipse cx="220" cy="160" rx="320" ry="220" fill="url(#cover-halo)" />

    {/* Circuit traces */}
    <g stroke="hsl(207 100% 70%)" strokeWidth="0.7" fill="none" opacity="0.35">
      <path d="M 0 80 L 120 80 L 140 100 L 260 100 L 280 80 L 600 80" />
      <path d="M 0 140 L 80 140 L 100 160 L 200 160 L 220 140 L 380 140 L 400 160 L 600 160" />
      <path d="M 0 220 L 60 220 L 80 200 L 240 200 L 260 220 L 600 220" />
      <path d="M 0 290 L 160 290 L 180 270 L 360 270 L 380 290 L 600 290" />
    </g>

    {/* Nodes */}
    {[
      [120, 80], [260, 100], [80, 140], [200, 160], [380, 140], [60, 220], [240, 200], [160, 290], [360, 270],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3" fill="hsl(207 100% 75%)" opacity="0.85" />
    ))}

    {/* Pulse node */}
    <circle cx="440" cy="200" r="6" fill="hsl(192 90% 65%)">
      <animate attributeName="r" values="6;10;6" dur="2.6s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="1;0.4;1" dur="2.6s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const FeaturedBlog: React.FC = () => {
  const featured = samplePosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  if (!featured) return null;

  const handleOpen = () => {
    window.dispatchEvent(
      new CustomEvent('switchTab', { detail: { tab: 'blog', slug: featured.slug } })
    );
  };
  const handleAll = () => {
    window.dispatchEvent(new CustomEvent('switchTab', { detail: { tab: 'blog' } }));
  };

  return (
    <Section
      id="writing"
      eyebrow="Latest writing"
      title="Notes from the field."
      subtitle="Occasional posts on AI infrastructure, networking, and the engineering reality behind production systems."
    >
      <motion.div
        {...inViewProps}
        variants={fadeUp}
        className="surface overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        {/* Cover */}
        <button
          onClick={handleOpen}
          className="group lg:col-span-6 relative overflow-hidden text-left border-b lg:border-b-0 lg:border-r border-border"
        >
          <ArticleCover className="block w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" />
          <span className="absolute top-5 left-5 chip chip-primary">
            {featured.category}
          </span>
          <span className="absolute top-5 right-5 grid place-items-center w-9 h-9 rounded-full bg-background/85 backdrop-blur-md border border-white/10 text-foreground transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </button>

        {/* Body */}
        <div className="lg:col-span-6 p-7 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 label-mono">
            <span>{featured.date}</span>
            <span className="h-px w-6 bg-border" />
            <span>{featured.readTime}</span>
          </div>

          <h3 className="mt-5 font-display text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-tight text-balance">
            <button onClick={handleOpen} className="text-left hover:text-primary transition-colors">
              {featured.title}
            </button>
          </h3>

          <p className="mt-4 text-foreground-muted leading-relaxed text-pretty">
            {featured.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button onClick={handleOpen} variant="primary" className="group">
              Read article
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button onClick={handleAll} variant="ghost">All writing</Button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default FeaturedBlog;
