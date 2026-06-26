import React from 'react';
import { motion } from 'framer-motion';
import { samplePosts } from '@/data/blogPosts';
import { Dingbat } from '@/components/painted/Ornament';
import Watercolor from '@/components/painted/Watercolor';

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
    <section id="folia" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute right-[-10%] top-10 w-[420px] h-[420px] opacity-70">
        <Watercolor pigment="gilt" intensity={0.2} className="w-full h-full" />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-12">
          <aside className="hidden md:flex md:col-span-1 flex-col items-end pt-6">
            <div className="marginalia">Plate III</div>
          </aside>

          <div className="col-span-12 md:col-span-11">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2 }}
            >
              <span className="folio">iii · Folia</span>
              <h2 className="display mt-8 text-[clamp(2.4rem,6vw,4.5rem)] ink text-balance">
                Pages set down
                <br />
                <span className="display-italic">by candlelight.</span>
              </h2>
            </motion.div>

            <motion.button
              onClick={open}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, delay: 0.1 }}
              className="group mt-20 grid grid-cols-12 gap-x-6 md:gap-x-10 items-baseline text-left w-full border-t border-b border-[hsl(var(--rule)/0.25)] py-14"
            >
              <div className="col-span-12 md:col-span-2">
                <span className="plate-no">Folio · I</span>
                <span className="block mt-2 marginalia">{featured.date}</span>
              </div>
              <div className="col-span-12 md:col-span-8 mt-4 md:mt-0">
                <h3 className="display text-3xl md:text-5xl ink leading-[1.05] group-hover:text-sienna transition-colors duration-500 text-balance">
                  {featured.title}
                </h3>
                <p className="mt-4 font-serif italic text-lg ink-soft max-w-2xl text-pretty">
                  {featured.summary}
                </p>
              </div>
              <div className="col-span-12 md:col-span-2 mt-4 md:mt-0 md:text-right">
                <span className="ink-button-quiet">
                  Read
                  <span aria-hidden>&rarr;</span>
                </span>
              </div>
            </motion.button>

            <div className="mt-12 flex items-center gap-8">
              <button onClick={all} className="ink-button">
                All folia
                <span aria-hidden>&rarr;</span>
              </button>
            </div>

            <div className="mt-24 flex justify-center">
              <Dingbat className="w-60 h-7 opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
