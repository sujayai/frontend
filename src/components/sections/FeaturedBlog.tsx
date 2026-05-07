import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { samplePosts } from '@/data/blogPosts';
import { fadeUp, inViewProps } from '@/lib/motion';

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
      eyebrow="Writing"
      title="Notes from the field."
      subtitle="Occasional posts on AI infrastructure, networking, and the engineering reality behind production-scale systems."
    >
      <motion.div
        {...inViewProps}
        variants={fadeUp}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Cover */}
        <button
          onClick={handleOpen}
          className="group lg:col-span-5 relative overflow-hidden rounded-xl border border-border bg-background-subtle min-h-[260px] text-left"
        >
          {/* Animated gradient cover */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 opacity-90 animate-aurora bg-[length:200%_200%]"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, hsl(244 75% 60%), hsl(280 70% 60%), hsl(220 90% 60%), hsl(244 75% 60%))',
              }}
            />
            <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between min-h-[260px]">
            <span className="inline-flex w-fit px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20">
              {featured.category}
            </span>
            <div className="flex items-center justify-between text-white/80 text-xs">
              <span>{featured.date}</span>
              <span>{featured.readTime}</span>
            </div>
          </div>

          <span className="absolute top-4 right-4 z-10 grid place-items-center w-9 h-9 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </button>

        {/* Body */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground text-balance">
            <button
              onClick={handleOpen}
              className="text-left hover:text-primary transition-colors"
            >
              {featured.title}
            </button>
          </h3>

          <p className="mt-4 text-foreground-muted text-base md:text-lg leading-relaxed text-pretty max-w-2xl">
            {featured.summary}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="grid place-items-center w-7 h-7 rounded-full bg-foreground text-background font-mono text-xs font-bold">
              {featured.author.name.charAt(0)}
            </div>
            <div className="text-sm text-foreground-muted">
              <span className="text-foreground font-medium">{featured.author.name}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button onClick={handleOpen} size="default" className="group">
              Read article
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button onClick={handleAll} variant="ghost" size="default">
              All writing
            </Button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default FeaturedBlog;
