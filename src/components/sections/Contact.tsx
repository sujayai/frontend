import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import { fadeUp, inViewProps } from '@/lib/motion';

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
    <Section
      id="contact"
      eyebrow="Epistula"
      title="Correspond."
      align="center"
    >
      <motion.div
        {...inViewProps}
        variants={fadeUp}
        className="max-w-2xl mx-auto text-center"
      >
        <a
          href="mailto:support@sujay.ai"
          className="group inline-flex items-center gap-3 font-display uppercase tracking-[0.06em]
                     text-3xl md:text-5xl font-medium text-foreground hover:text-primary
                     transition-colors duration-300"
        >
          support@sujay.ai
          <ArrowUpRight
            className="w-7 h-7 md:w-9 md:h-9 text-foreground-subtle
                       transition-all duration-500
                       group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>

        <p className="mt-8 font-serif italic text-foreground-muted">
          Open to consulting, design reviews, and the occasional letter from afar.
        </p>

        <div className="mt-14 flex items-center justify-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid place-items-center w-12 h-12 rounded-full border border-border
                         bg-background-elevated text-foreground-muted hover:text-primary
                         hover:border-primary transition-colors duration-300"
            >
              <s.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Contact;
