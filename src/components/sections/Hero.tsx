import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AutumnBranch from '@/components/painted/AutumnBranch';
import Watercolor from '@/components/painted/Watercolor';
import { Dingbat } from '@/components/painted/Ornament';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const branchY = useTransform(scrollY, [0, 700], [0, -90]);
  const dustY = useTransform(scrollY, [0, 700], [0, -40]);

  return (
    <section className="relative overflow-hidden pt-28 pb-24 md:pt-40 md:pb-32">
      {/* Watercolor washes — like wet paint blooming into the page */}
      <motion.div
        style={{ y: dustY }}
        className="pointer-events-none absolute -left-32 -top-20 w-[720px] h-[720px] opacity-90"
      >
        <Watercolor pigment="sienna" intensity={0.35} className="w-full h-full" />
      </motion.div>
      <motion.div
        style={{ y: dustY }}
        className="pointer-events-none absolute right-[-12%] top-[40%] w-[600px] h-[600px] opacity-80"
      >
        <Watercolor pigment="gilt" intensity={0.3} className="w-full h-full" />
      </motion.div>

      <div className="relative container">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-12">
          {/* Marginalia rail */}
          <aside className="hidden md:flex md:col-span-1 flex-col items-end pt-3">
            <div className="marginalia rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Folio · I
            </div>
          </aside>

          {/* Left: title page */}
          <div className="col-span-12 md:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="folio"
            >
              <span>Anno&nbsp;MMXXVI</span>
              <span className="ml-3 ink-faint">·</span>
              <span className="ml-3">An Index of Works</span>
            </motion.div>

            {/* Name set as a frontispiece */}
            <motion.h1
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
              transition={{ duration: 1.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="display mt-10 md:mt-14 text-[clamp(3.4rem,11vw,9rem)] ink"
            >
              Sujay
              <br />
              <span className="display-italic gilded inline-block pr-2">Sreedhar</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 0.6 }}
              className="mt-10"
            >
              <Dingbat className="w-60 h-7 opacity-90" />
            </motion.div>

            {/* The opening leaf — drop cap on the very first sentence */}
            <motion.p
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
              transition={{ duration: 1.4, delay: 0.8, ease: 'easeOut' }}
              className="dropcap mt-12 max-w-xl font-serif text-lg md:text-xl leading-[1.7] text-[hsl(var(--ink))/0.92]"
            >
              An engineer of <em>fabric</em>, of weave and weft &mdash; the
              networks that carry two hundred thousand minds when they think
              as one. Late nights at xAI; afternoons at Arista; a manuscript
              kept by candlelight.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
              className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6"
            >
              <button
                onClick={() => document.getElementById('cursus')?.scrollIntoView({ behavior: 'smooth' })}
                className="ink-button"
              >
                Read on
                <span aria-hidden>&rarr;</span>
              </button>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('switchTab', { detail: 'blog' }))}
                className="ink-button-quiet"
              >
                Folia · the writings
              </button>
            </motion.div>
          </div>

          {/* Right: the painted branch hanging into the page */}
          <motion.div
            style={{ y: branchY }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2.2, delay: 0.4, ease: 'easeOut' }}
            className="hidden md:block md:col-span-4 relative"
          >
            <AutumnBranch className="absolute -top-20 -right-10 w-[120%] h-auto" />
          </motion.div>
        </div>

        {/* A whispered folio index at the bottom of the page */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6 }}
          className="mt-32 md:mt-44 grid grid-cols-12 gap-6 items-baseline"
        >
          <div className="hidden md:block col-span-1" />
          <div className="col-span-12 md:col-span-11 flex flex-wrap items-baseline gap-x-10 gap-y-3 folio">
            <span>i. Cursus</span>
            <span>ii. Plates</span>
            <span>iii. Folia</span>
            <span>iv. Epistola</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
