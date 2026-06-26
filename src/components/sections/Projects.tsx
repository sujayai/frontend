import React from 'react';
import { motion } from 'framer-motion';
import { Dingbat } from '@/components/painted/Ornament';
import Watercolor from '@/components/painted/Watercolor';
import { GlyphCDN, GlyphML, GlyphProphet, GlyphAuction } from '@/components/painted/PlateGlyphs';

interface Plate {
  no: string;
  title: string;
  blurb: string;
  craft: string;
  year: string;
  href: string;
  Glyph: React.FC<{ className?: string }>;
}

const PLATES: Plate[] = [
  {
    no: 'I',
    title: 'Quickly · the second edition',
    blurb: 'A delivery network laid into bare iron, every tenant kept in its own cloister.',
    craft: 'Ansible · Open vSwitch · Libvirt · etcd',
    year: 'MMXXI',
    href: 'https://github.com/sujaysreedharg/quicklyv2',
    Glyph: GlyphCDN,
  },
  {
    no: 'II',
    title: 'The Oracle of Admissions',
    blurb: 'A small model that augurs a student’s passage into graduate study.',
    craft: 'Python · scikit-learn · Docker',
    year: 'MMXX',
    href: 'https://github.com/sujaysreedharg/Graduate-admission-prediction-dockerized-deployment',
    Glyph: GlyphML,
  },
  {
    no: 'III',
    title: 'Of forecasts in a plague year',
    blurb: 'Sine waves laid against the news; a time-series learning to draw the days ahead.',
    craft: 'Python · Prophet · Jupyter',
    year: 'MMXX',
    href: 'https://github.com/sujaysreedharg/Covid-19-future-prediction-with-time-series-forecasting-using-prophet-model',
    Glyph: GlyphProphet,
  },
  {
    no: 'IV',
    title: 'An auction-house',
    blurb: 'Listings, bids, vigil-keepers — a Django marketplace in the old style.',
    craft: 'Django · Postgres · Heroku',
    year: 'MMXIX',
    href: 'https://github.com/sujaysreedharg/Auctions-django-web-app-deployment-on-Heroku',
    Glyph: GlyphAuction,
  },
];

const Projects: React.FC = () => {
  return (
    <section id="plates" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute left-[-12%] top-[40%] w-[520px] h-[520px] opacity-70">
        <Watercolor pigment="oxblood" intensity={0.2} className="w-full h-full" />
      </div>
      <div className="pointer-events-none absolute right-[-8%] bottom-0 w-[480px] h-[480px] opacity-80">
        <Watercolor pigment="persimmon" intensity={0.22} className="w-full h-full" />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-12">
          <aside className="hidden md:flex md:col-span-1 flex-col items-end pt-6">
            <div className="marginalia">Plate II</div>
          </aside>

          <div className="col-span-12 md:col-span-11">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2 }}
            >
              <span className="folio">ii · Plates</span>
              <h2 className="display mt-8 text-[clamp(2.4rem,6vw,4.5rem)] ink text-balance">
                A small <span className="display-italic">portfolio</span>
                <br /> kept in this hand.
              </h2>
            </motion.div>

            <div className="mt-20 md:mt-28 space-y-24">
              {PLATES.map((p, i) => {
                const G = p.Glyph;
                const reverse = i % 2 === 1;
                return (
                  <motion.a
                    key={p.no}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="group block grid grid-cols-12 gap-x-6 md:gap-x-10 items-baseline"
                  >
                    {/* number */}
                    <div className={`col-span-12 md:col-span-2 ${reverse ? 'md:order-last md:text-right' : ''}`}>
                      <div className="plate-no">Plate · {p.no}</div>
                      <div className="marginalia mt-2">{p.year}</div>
                    </div>

                    {/* glyph */}
                    <div className={`col-span-3 md:col-span-2 ${reverse ? 'md:order-1' : ''}`}>
                      <G className="w-20 h-20 md:w-24 md:h-24 text-sienna group-hover:scale-[1.04] transition-transform duration-700" />
                    </div>

                    {/* the typeset entry */}
                    <div className={`col-span-9 md:col-span-8 ${reverse ? 'md:order-2 md:text-right' : ''}`}>
                      <h3 className="display text-3xl md:text-5xl ink leading-[1.05] group-hover:text-sienna transition-colors duration-500 text-balance">
                        {p.title}
                      </h3>
                      <p className="mt-4 font-serif italic text-base md:text-lg ink-soft max-w-xl text-pretty">
                        {p.blurb}
                      </p>
                      <p className="mt-3 marginalia">{p.craft}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <div className="mt-28 flex justify-center">
              <Dingbat className="w-60 h-7 opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
