import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { Dingbat } from '@/components/painted/Ornament';
import Watercolor from '@/components/painted/Watercolor';

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIALS = [
  { icon: Github, href: 'https://github.com/sujaysreedharg', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/sujaysreedharg', label: 'LinkedIn' },
  { icon: XIcon, href: 'https://x.com/sujay_sreedhar', label: 'X' },
];

const Contact: React.FC = () => {
  return (
    <section id="epistola" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute left-[-10%] top-0 w-[600px] h-[600px] opacity-70">
        <Watercolor pigment="sienna" intensity={0.22} className="w-full h-full" />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-12">
          <aside className="hidden md:flex md:col-span-1 flex-col items-end pt-6">
            <div className="marginalia">Plate IV</div>
          </aside>

          <div className="col-span-12 md:col-span-11 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2 }}
            >
              <span className="folio">iv · Epistola</span>
              <h2 className="display mt-8 text-[clamp(2.6rem,7vw,5rem)] ink text-balance">
                Write&nbsp;to&nbsp;me,
                <br />
                <span className="display-italic gilded">if you would.</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, delay: 0.1 }}
              className="dropcap mt-14 font-serif text-lg md:text-xl leading-[1.75] ink-soft max-w-2xl"
            >
              I take a small number of consulting engagements each year — usually
              upon the network fabric for AI training, sometimes upon the design
              of a new system. A short letter is the surest way.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="mt-16"
            >
              <a
                href="mailto:support@sujay.ai"
                className="block display text-[clamp(2rem,5vw,3.4rem)] gilded leading-none hover:text-sienna transition-colors duration-500"
              >
                support@sujay.ai
              </a>
              <div className="mt-2 marginalia">Postmarked San Francisco</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.2, delay: 0.35 }}
              className="mt-14 flex items-center gap-8"
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="ink-button-quiet"
                >
                  <s.icon className="w-3.5 h-3.5" />
                  {s.label}
                </a>
              ))}
            </motion.div>

            <div className="mt-24 flex justify-start">
              <Dingbat className="w-60 h-7 opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
