import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import { fadeUpStagger, item, inViewProps } from '@/lib/motion';

interface Project {
  title: string;
  blurb: string;
  tech: string[];
  status: 'In Production' | 'Research' | 'Archived';
  github: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Quickly v2',
    blurb: 'Multi-tenant CDN on bare metal.',
    tech: ['Ansible', 'OvS', 'Docker', 'Libvirt', 'etcd'],
    status: 'In Production',
    github: 'https://github.com/sujaysreedharg/quicklyv2',
  },
  {
    title: 'Admission Oracle',
    blurb: 'Graduate-admission ML, Dockerized.',
    tech: ['Python', 'scikit-learn', 'Docker', 'Heroku'],
    status: 'In Production',
    github: 'https://github.com/sujaysreedharg/Graduate-admission-prediction-dockerized-deployment',
  },
  {
    title: 'Prophet Forecasts',
    blurb: 'COVID-19 time-series prediction.',
    tech: ['Python', 'Prophet', 'Jupyter'],
    status: 'Research',
    github:
      'https://github.com/sujaysreedharg/Covid-19-future-prediction-with-time-series-forecasting-using-prophet-model',
  },
  {
    title: 'Auctions',
    blurb: 'eBay-style marketplace, Django.',
    tech: ['Django', 'Postgres', 'Heroku'],
    status: 'Archived',
    github: 'https://github.com/sujaysreedharg/Auctions-django-web-app-deployment-on-Heroku',
  },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const handleMouseMove: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div variants={item}>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        className="spotlight surface surface-hover relative block p-8 group h-full
                   transition-transform duration-500 hover:-translate-y-1"
      >
        <div className="relative z-[2] flex flex-col h-full">
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-xs text-foreground-subtle">
              0{index + 1}
            </span>
            <span
              className={`chip ${project.status === 'In Production' ? 'chip-primary' : ''}`}
            >
              {project.status === 'In Production' && (
                <span className="w-1 h-1 rounded-full bg-current" />
              )}
              {project.status}
            </span>
          </div>

          <h3 className="mt-10 font-display uppercase tracking-[0.04em] text-3xl md:text-4xl font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
            {project.title}
          </h3>

          <p className="mt-3 font-serif italic text-foreground-muted">
            {project.blurb}
          </p>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>

          <div className="mt-auto pt-8 flex items-center justify-between text-foreground-muted">
            <span className="inline-flex items-center gap-2 text-sm">
              <Github className="w-4 h-4" /> Repository
            </span>
            <ArrowUpRight className="w-5 h-5 transition-all duration-500 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </a>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  return (
    <Section
      id="projects"
      eyebrow="Opera"
      title="Selected Works."
      align="center"
    >
      <motion.div
        {...inViewProps}
        variants={fadeUpStagger(0, 0.1)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </motion.div>
    </Section>
  );
};

export default Projects;
