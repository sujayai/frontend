import React from 'react';
import { motion, useMotionTemplate } from 'framer-motion';
import { Github, Linkedin, ArrowUpRight } from 'lucide-react';
import Glass from '@/components/ui/Glass';
import { useTilt } from '@/lib/useTilt';
import { glassRise, inViewProps } from '@/lib/motion';

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
  const tilt = useTilt({ max: 6, mass: 1.6, stiffness: 70, damping: 16 });
  const glare = useMotionTemplate`radial-gradient(500px circle at ${tilt.glareX} ${tilt.glareY}, rgba(255,255,255,0.1), transparent 55%)`;

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          {...inViewProps}
          variants={glassRise}
          ref={tilt.ref}
          {...tilt.handlers}
          className="perspective"
        >
          <motion.div
            className="preserve-3d"
            style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
          >
            <Glass iris refract className="relative overflow-hidden p-12 md:p-20 text-center">
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{ background: glare }}
              />

              <div className="relative">
                <span className="eyebrow">Let&apos;s talk</span>
                <h2 className="display mt-6 text-[clamp(2.5rem,6vw,5rem)] text-[hsl(var(--fg))] text-balance">
                  Have a hard
                  <br />
                  <span className="text-aurora">infrastructure</span> problem?
                </h2>

                <p className="mt-8 mx-auto max-w-md text-lg font-light text-muted text-pretty">
                  Open to consulting, design reviews, and conversations about networking for AI.
                </p>

                <div className="mt-12 flex flex-col items-center gap-8">
                  <a
                    href="mailto:support@sujay.ai"
                    className="group glass glass-specular glass-iris rounded-full px-8 py-4 text-base font-medium text-[hsl(var(--fg))] transition-transform duration-500 hover:-translate-y-1"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      support@sujay.ai
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>

                  <div className="flex items-center gap-3">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="grid place-items-center w-12 h-12 rounded-full glass text-faint hover:text-[hsl(var(--fg))] transition-colors duration-300"
                      >
                        <s.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Glass>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
