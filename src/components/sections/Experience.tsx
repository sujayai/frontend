import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import { fadeUpStagger, item, inViewProps } from '@/lib/motion';

interface Job {
  company: string;
  role: string;
  duration: string;
  location: string;
  blurb: string;
  href?: string;
}

const EXPERIENCES: Job[] = [
  {
    company: 'Arista Networks',
    role: 'Technical Solutions Engineer',
    duration: '2025 — Now',
    location: 'San Francisco',
    blurb: 'Debugging large-scale topologies and partnering with hyperscaler customers on EOS-based fabric design.',
    href: 'https://www.arista.com',
  },
  {
    company: 'xAI',
    role: 'Supercompute Network Engineer',
    duration: '2024 — 2025',
    location: 'Memphis',
    blurb: 'Core contributor to the 200k-GPU cluster powering Grok 3. Owned network reliability through pre-training.',
    href: 'https://x.ai',
  },
  {
    company: 'Tesla',
    role: 'Software Engineering Intern',
    duration: '2023 — 2024',
    location: 'Austin',
    blurb: 'Built internal tooling for a fast-moving team. Got hands-on with large-scale systems at Tesla velocity.',
    href: 'https://www.tesla.com',
  },
  {
    company: 'Lenovo',
    role: 'Security Software Intern',
    duration: '2022 — 2023',
    location: 'Morrisville',
    blurb: 'Shipped features for the Global Security Lab — security tooling and services across product lines.',
    href: 'https://www.lenovo.com',
  },
];

const Experience: React.FC = () => {
  return (
    <Section
      id="work"
      eyebrow="Trajectory"
      title="Where I've shipped."
      subtitle="A short tour of the teams I've built network and infrastructure with."
    >
      <motion.ol
        {...inViewProps}
        variants={fadeUpStagger(0, 0.08)}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
      >
        {EXPERIENCES.map((exp) => (
          <motion.li key={exp.company} variants={item}>
            <a
              href={exp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="surface surface-hover p-6 group block h-full"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="label-mono">{exp.duration}</div>
                <ArrowUpRight className="w-4 h-4 text-foreground-subtle transition-all duration-500 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <h3 className="mt-5 font-display text-xl md:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                {exp.company}
              </h3>
              <p className="mt-1 text-sm text-foreground-muted">{exp.role}</p>

              <p className="mt-5 text-sm text-foreground-muted leading-relaxed text-pretty">
                {exp.blurb}
              </p>

              <p className="mt-6 pt-5 border-t border-border-subtle text-xs text-foreground-subtle">
                {exp.location}
              </p>
            </a>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
};

export default Experience;
