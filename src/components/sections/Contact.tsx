import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          {...inViewProps}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl border border-border bg-background-elevated p-10 md:p-16"
        >
          {/* Soft accent backdrop — no rainbow */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 80% at 100% 0%, hsl(var(--primary) / 0.18), transparent 70%)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.08) 1px, transparent 0)',
              backgroundSize: '28px 28px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 80%)',
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <span className="eyebrow">Let&apos;s talk</span>

            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-tight text-foreground leading-[1.05] text-balance">
              Have a hard infrastructure problem? <br className="hidden md:block" />
              <span className="text-accent">Let&apos;s build the next one</span>.
            </h2>

            <p className="mt-6 text-lg md:text-xl text-foreground-muted leading-relaxed max-w-xl text-pretty">
              Open to consulting, infrastructure design reviews, and conversations about
              networking for AI training. Email is the fastest way in.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" variant="primary" className="group">
                <a href="mailto:support@sujay.ai">
                  support@sujay.ai
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <div className="flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid place-items-center w-11 h-11 rounded-lg border border-border bg-background-elevated text-foreground-muted hover:text-foreground hover:border-foreground/30 transition-colors"
                  >
                    <s.icon className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
