import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Glass from '@/components/ui/Glass';
import { samplePosts } from '@/data/blogPosts';
import { glassRise, inViewProps } from '@/lib/motion';

const FeaturedBlog: React.FC = () => {
  const featured = samplePosts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  if (!featured) return null;

  const open = () =>
    window.dispatchEvent(
      new CustomEvent('switchTab', { detail: { tab: 'blog', slug: featured.slug } })
    );
  const all = () => window.dispatchEvent(new CustomEvent('switchTab', { detail: { tab: 'blog' } }));

  return (
    <section id="writing" className="section">
      <div className="container">
        <SectionHeading eyebrow="Writing" title="Notes from the field." />

        <motion.div {...inViewProps} variants={glassRise} className="mt-14">
          <Glass
            iris
            refract
            as="div"
            className="group cursor-pointer p-2 overflow-hidden"
            onClick={open}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* glyph panel */}
              <div className="lg:col-span-5 relative min-h-[260px] rounded-[calc(var(--radius)-0.5rem)] overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(120% 120% at 20% 10%, hsl(var(--accent) / 0.4), transparent 55%), radial-gradient(120% 120% at 90% 90%, hsl(var(--accent-2) / 0.4), transparent 55%)',
                  }}
                />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-[hsl(var(--fg))]/70">
                    {featured.category}
                  </span>
                </div>
              </div>

              {/* body */}
              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                  <span>{featured.date}</span>
                  <span className="w-6 h-px hairline" />
                  <span>{featured.readTime}</span>
                </div>
                <h3 className="mt-5 text-3xl md:text-4xl font-light tracking-tight text-[hsl(var(--fg))] leading-tight group-hover:text-aurora transition-colors duration-500 text-balance">
                  {featured.title}
                </h3>
                <p className="mt-4 text-muted font-light leading-relaxed text-pretty">
                  {featured.summary}
                </p>
                <div className="mt-8 flex items-center gap-6">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--fg))]">
                    Read article
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      all();
                    }}
                    className="link-quiet text-sm"
                  >
                    All writing
                  </button>
                </div>
              </div>
            </div>
          </Glass>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
