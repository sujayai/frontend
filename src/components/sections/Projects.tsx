import React from 'react';
import { motion, useMotionTemplate } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Glass from '@/components/ui/Glass';
import { useTilt } from '@/lib/useTilt';
import { gravitySettle, staggerSlow, inViewProps } from '@/lib/motion';

interface Project {
  title: string;
  blurb: string;
  tech: string[];
  status: 'Live' | 'Research' | 'Archived';
  github: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Quickly v2',
    blurb: 'A multi-tenant CDN provisioned on bare-metal Linux with strong isolation.',
    tech: ['Ansible', 'Open vSwitch', 'Libvirt', 'etcd'],
    status: 'Live',
    github: 'https://github.com/sujaysreedharg/quicklyv2',
  },
  {
    title: 'Admission Oracle',
    blurb: 'A graduate-admission model, containerized and deployed to the cloud.',
    tech: ['Python', 'scikit-learn', 'Docker'],
    status: 'Live',
    github: 'https://github.com/sujaysreedharg/Graduate-admission-prediction-dockerized-deployment',
  },
  {
    title: 'Prophet Forecasts',
    blurb: 'A time-series forecasting pipeline built on Facebook Prophet.',
    tech: ['Python', 'Prophet', 'Jupyter'],
    status: 'Research',
    github: 'https://github.com/sujaysreedharg/Covid-19-future-prediction-with-time-series-forecasting-using-prophet-model',
  },
  {
    title: 'Auctions',
    blurb: 'An auction marketplace — listings, bids, comments, watchlists.',
    tech: ['Django', 'Postgres'],
    status: 'Archived',
    github: 'https://github.com/sujaysreedharg/Auctions-django-web-app-deployment-on-Heroku',
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const tilt = useTilt({ max: 9, mass: 1.4, stiffness: 85, damping: 14 });
  const glare = useMotionTemplate`radial-gradient(300px circle at ${tilt.glareX} ${tilt.glareY}, rgba(255,255,255,0.12), transparent 55%)`;

  return (
    <motion.div variants={gravitySettle} ref={tilt.ref} {...tilt.handlers} className="perspective h-full">
      <motion.div
        className="preserve-3d h-full"
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      >
        <Glass iris refract className="relative h-full p-8 flex flex-col overflow-hidden">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glare }}
          />
          <div className="relative flex items-start justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              {project.status}
            </span>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} repository`}
              className="text-faint hover:text-[hsl(var(--fg))] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          <h3 className="relative mt-10 text-2xl md:text-3xl font-light tracking-tight text-[hsl(var(--fg))]">
            {project.title}
          </h3>
          <p className="relative mt-3 text-muted font-light leading-relaxed flex-1 text-pretty">
            {project.blurb}
          </p>

          <div className="relative mt-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] text-faint px-2.5 py-1 rounded-full border border-[hsl(var(--line)/0.12)]"
              >
                {t}
              </span>
            ))}
          </div>
        </Glass>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Selected work"
          title="Things I've built."
          subtitle="A few projects, kept simple."
        />

        <motion.div
          {...inViewProps}
          variants={staggerSlow(0.1, 0.1)}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </motion.div>

        <div className="mt-12">
          <a
            href="https://github.com/sujaysreedharg?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet text-sm font-medium"
          >
            Every repository
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
