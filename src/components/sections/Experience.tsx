import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { gravitySettle, staggerSlow, inViewProps } from '@/lib/motion';

interface Job {
  company: string;
  role: string;
  year: string;
  href?: string;
}

const EXPERIENCES: Job[] = [
  { company: 'Arista Networks', role: 'Technical Solutions Engineer', year: '2025', href: 'https://www.arista.com' },
  { company: 'xAI', role: 'Supercompute Network Engineer', year: '2024', href: 'https://x.ai' },
  { company: 'Tesla', role: 'Software Engineering Intern', year: '2023', href: 'https://www.tesla.com' },
  { company: 'Lenovo', role: 'Security Software Intern', year: '2022', href: 'https://www.lenovo.com' },
];

const Experience: React.FC = () => {
  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Trajectory"
          title="Where I've shipped."
          subtitle="A short line through the teams I've built network and infrastructure with."
        />

        <motion.ol
          {...inViewProps}
          variants={staggerSlow(0.1, 0.1)}
          className="mt-16 border-t border-[hsl(var(--line)/0.1)]"
        >
          {EXPERIENCES.map((exp) => (
            <motion.li key={exp.company} variants={gravitySettle}>
              <a
                href={exp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-12 py-8 md:py-10 border-b border-[hsl(var(--line)/0.1)] transition-colors duration-500"
              >
                {/* hover glass wash */}
                <span className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 glass" />

                <span className="relative font-mono text-sm text-faint tabular-nums">
                  {exp.year}
                </span>
                <span className="relative min-w-0">
                  <span className="block text-3xl md:text-5xl font-light tracking-tight text-[hsl(var(--fg))] transition-colors duration-300 group-hover:text-aurora">
                    {exp.company}
                  </span>
                  <span className="mt-1 block text-sm md:text-base text-muted font-light">
                    {exp.role}
                  </span>
                </span>
                <ArrowUpRight className="relative w-5 h-5 text-faint transition-all duration-500 group-hover:text-[hsl(var(--fg))] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
};

export default Experience;
