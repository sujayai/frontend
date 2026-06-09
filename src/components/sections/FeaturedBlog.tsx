import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
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

  return (
    <Section
      id="writing"
      eyebrow="Folia"
      title="Notes."
      align="center"
    >
      <motion.div {...inViewProps} variants={fadeUp} className="max-w-3xl mx-auto">
        <button
          onClick={handleOpen}
          className="group block text-left w-full surface surface-hover p-10 md:p-14
                     transition-transform duration-500 hover:-translate-y-1"
        >
          <div className="flex items-center gap-3 text-foreground-subtle">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{featured.date}</span>
            <span className="h-px w-8 bg-current opacity-40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{featured.readTime}</span>
          </div>

          <h3 className="mt-8 font-display uppercase tracking-[0.02em] text-3xl md:text-5xl font-medium text-foreground leading-[1.05] transition-colors duration-300 group-hover:text-primary">
            {featured.title}
          </h3>

          <p className="mt-6 font-serif italic text-lg md:text-xl text-foreground-muted">
            {featured.summary}
          </p>

          <div className="mt-10 flex items-center justify-between">
            <span className="font-display uppercase text-xs tracking-[0.25em] text-primary">
              Read →
            </span>
            <ArrowUpRight className="w-5 h-5 text-foreground-muted transition-all duration-500 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </button>
      </motion.div>
    </Section>
  );
};

export default FeaturedBlog;
