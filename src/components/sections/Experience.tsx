import React from 'react';
import { motion } from 'framer-motion';
import { Dingbat, VineMargin } from '@/components/painted/Ornament';
import Watercolor from '@/components/painted/Watercolor';

interface Entry {
  year: string;
  company: string;
  role: string;
  place: string;
  note: string;
  href?: string;
}

const ENTRIES: Entry[] = [
  {
    year: 'MMXXV',
    company: 'Arista Networks',
    role: 'Technical Solutions',
    place: 'San Francisco',
    note: 'On the fabrics of hyperscalers; the inked routes through their cities of light.',
    href: 'https://www.arista.com',
  },
  {
    year: 'MMXXIV',
    company: 'xAI',
    role: 'Supercompute Network',
    place: 'Memphis',
    note: 'A cathedral of two hundred thousand minds, learning to think as one. I kept the choir in tune.',
    href: 'https://x.ai',
  },
  {
    year: 'MMXXIII',
    company: 'Tesla',
    role: 'Software Engineering',
    place: 'Austin',
    note: 'An intern among machines that drive themselves; small tools, swiftly forged.',
    href: 'https://www.tesla.com',
  },
  {
    year: 'MMXXII',
    company: 'Lenovo',
    role: 'Security Software',
    place: 'Morrisville',
    note: 'A first apprenticeship — the Global Security Lab, a workshop in trust.',
    href: 'https://www.lenovo.com',
  },
];

const Experience: React.FC = () => {
  return (
    <section id="cursus" className="section relative overflow-hidden">
      {/* a faint moss wash on the far margin */}
      <div className="pointer-events-none absolute -right-20 top-20 w-[420px] h-[420px] opacity-60">
        <Watercolor pigment="moss" intensity={0.2} className="w-full h-full" />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-12">
          {/* margin */}
          <aside className="hidden md:flex md:col-span-1 flex-col items-end pt-6">
            <div className="marginalia">Plate I</div>
            <VineMargin className="mt-12 w-14 h-[280px] opacity-70" />
          </aside>

          {/* content */}
          <div className="col-span-12 md:col-span-11">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <span className="folio">i · Cursus Vitæ</span>
              <h2 className="display mt-8 text-[clamp(2.4rem,6vw,4.5rem)] ink text-balance">
                A short course
                <br />
                <span className="display-italic">through the ateliers.</span>
              </h2>
            </motion.div>

            <div className="mt-16 md:mt-24">
              {ENTRIES.map((e, i) => (
                <motion.a
                  key={e.company}
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.1, delay: i * 0.08, ease: 'easeOut' }}
                  className="group block relative py-10 md:py-12 grid grid-cols-12 gap-x-6 items-baseline border-t border-[hsl(var(--rule)/0.25)]"
                >
                  {/* year in the gutter */}
                  <span className="col-span-3 md:col-span-2 marginalia ink-faint group-hover:text-sienna transition-colors">
                    {e.year}
                  </span>

                  {/* company line */}
                  <span className="col-span-9 md:col-span-7 block">
                    <span className="display text-3xl md:text-5xl ink group-hover:gilded transition-colors duration-500">
                      {e.company}
                    </span>
                    <span className="block mt-2 font-serif italic text-base md:text-lg ink-soft">
                      {e.role} · {e.place}
                    </span>
                    <span className="block mt-4 max-w-xl font-serif text-base ink-soft text-pretty">
                      {e.note}
                    </span>
                  </span>

                  {/* marginal mark on hover */}
                  <span className="col-span-12 md:col-span-3 hidden md:flex justify-end items-baseline">
                    <span className="font-display text-3xl text-sienna opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {i + 1}
                    </span>
                  </span>
                </motion.a>
              ))}
              <div className="border-t border-[hsl(var(--rule)/0.25)]" />

              <div className="mt-24 flex justify-center">
                <Dingbat className="w-60 h-7 opacity-90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
