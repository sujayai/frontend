import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import { fadeUpStagger, item, inViewProps } from '@/lib/motion';

interface Job {
  company: string;
  role: string;
  year: string;
  href?: string;
}

const EXPERIENCES: Job[] = [
  { company: 'Arista Networks', role: 'Technical Solutions Engineer', year: '2025', href: 'https://www.arista.com' },
  { company: 'xAI',             role: 'Supercompute Network Engineer', year: '2024', href: 'https://x.ai' },
  { company: 'Tesla',           role: 'Software Engineering Intern',   year: '2023', href: 'https://www.tesla.com' },
  { company: 'Lenovo',          role: 'Security Software Intern',      year: '2022', href: 'https://www.lenovo.com' },
];

const Experience: React.FC = () => {
  return (
    <Section
      id="work"
      eyebrow="Cursus Vitae"
      title="Atelier."
      subtitle="A short tour of where I've shipped."
      align="center"
    >
      <motion.ol
        {...inViewProps}
        variants={fadeUpStagger(0, 0.12)}
        className="relative max-w-3xl mx-auto"
      >
        {EXPERIENCES.map((exp, i) => (
          <motion.li key={`${exp.company}-${i}`} variants={item}>
            <a
              href={exp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-6 py-7 border-b border-border last:border-b-0
                         hover:bg-gradient-to-r hover:from-transparent hover:via-primary/[0.04] hover:to-transparent
                         transition-colors duration-500"
            >
              <span className="font-mono text-xs text-foreground-subtle tabular-nums tracking-widest">
                {exp.year}
              </span>

              <div className="min-w-0">
                <div className="font-display uppercase tracking-[0.04em] text-2xl md:text-4xl font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                  {exp.company}
                </div>
                <div className="mt-1 font-serif italic text-sm md:text-base text-foreground-muted">
                  {exp.role}
                </div>
              </div>

              <ArrowUpRight
                className="w-5 h-5 text-foreground-subtle transition-all duration-500
                           group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
};

export default Experience;
