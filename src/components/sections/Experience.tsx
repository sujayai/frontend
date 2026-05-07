import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';
import Section from '@/components/ui/Section';
import { fadeUp, fadeUpStagger, item, inViewProps } from '@/lib/motion';

interface Job {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  technologies: string[];
  href?: string;
}

const EXPERIENCES: Job[] = [
  {
    company: 'Arista Networks',
    role: 'Technical Solutions Engineer',
    duration: '2025 — Present',
    location: 'San Francisco, CA',
    description:
      'Debugging large-scale network topologies and partnering with hyperscaler customers on EOS-based fabric design, performance, and rollout.',
    technologies: ['EOS', 'BGP / EVPN', 'RoCE', 'Network Topology', 'Performance'],
    href: 'https://www.arista.com',
  },
  {
    company: 'xAI',
    role: 'Supercompute Network Engineer',
    duration: '2024 — 2025',
    location: 'Memphis, TN',
    description:
      'Core contributor to the 200k-GPU supercompute powering Grok 3 training. Owned network reliability through pre-training so multi-week jobs ran clean.',
    technologies: ['200k GPUs', 'Distributed Training', 'NCCL', 'InfiniBand', 'Reliability'],
    href: 'https://x.ai',
  },
  {
    company: 'Tesla',
    role: 'Software Engineering Intern',
    duration: '2023 — 2024',
    location: 'Austin, TX',
    description:
      'Built internal tooling on a fast-moving software team. Got hands-on with large-scale systems and shipping software at Tesla velocity.',
    technologies: ['Python', 'Internal Tooling', 'Systems', 'Velocity'],
    href: 'https://www.tesla.com',
  },
  {
    company: 'Lenovo',
    role: 'Security Software Engineering Intern',
    duration: '2022 — 2023',
    location: 'Morrisville, NC',
    description:
      'Built features for the Global Security Lab, developing security tooling and services across Lenovo product lines.',
    technologies: ['NestJS', 'TypeScript', 'Security', 'Web Services'],
    href: 'https://www.lenovo.com',
  },
];

const Experience: React.FC = () => {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="A short tour of where I've shipped."
      subtitle="From security tooling at Lenovo, to building the network underneath one of the world's largest GPU clusters at xAI, to debugging hyperscaler fabrics at Arista today."
    >
      <motion.ol
        {...inViewProps}
        variants={fadeUpStagger(0, 0.1)}
        className="relative space-y-3"
      >
        {/* Vertical line */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-border via-border to-transparent"
        />

        {EXPERIENCES.map((exp, i) => (
          <motion.li
            key={`${exp.company}-${i}`}
            variants={item}
            className="relative pl-10 group"
          >
            {/* Dot */}
            <span className="absolute left-0 top-7 grid place-items-center w-[15px] h-[15px]">
              <span className="absolute inset-0 rounded-full bg-background-elevated border border-border" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-foreground-muted group-hover:bg-primary transition-colors" />
              {i === 0 && (
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping-soft" />
              )}
            </span>

            {/* Card */}
            <div className="surface surface-hover p-6 md:p-7 transition-transform duration-300 group-hover:-translate-y-0.5">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-semibold text-lg md:text-xl text-foreground tracking-tight">
                      {exp.role}
                    </h3>
                    <span className="text-foreground-subtle">·</span>
                    {exp.href ? (
                      <a
                        href={exp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-foreground-muted hover:text-foreground transition-colors group/link"
                      >
                        <span className="font-medium">{exp.company}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <span className="text-foreground-muted font-medium">{exp.company}</span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-foreground-subtle">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </span>
                  </div>
                </div>
                <div className="label-mono text-[10px] md:mt-1 shrink-0">{exp.duration}</div>
              </div>

              <p className="mt-4 text-foreground-muted leading-relaxed text-pretty">
                {exp.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {exp.technologies.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
};

export default Experience;
