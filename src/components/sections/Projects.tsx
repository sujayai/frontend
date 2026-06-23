import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { ArtCDN, ArtML, ArtForecast, ArtAuctions } from '@/components/illustrations/ProjectArt';
import { fadeUpStagger, item, inViewProps } from '@/lib/motion';

interface Project {
  title: string;
  blurb: string;
  art: React.ComponentType<{ className?: string }>;
  tech: string[];
  status: 'In production' | 'Research' | 'Archived';
  github: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Quickly v2',
    blurb: 'A multi-tenant CDN provisioned on bare-metal Linux hosts with strong isolation.',
    art: ArtCDN,
    tech: ['Ansible', 'Open vSwitch', 'Docker', 'Libvirt', 'etcd'],
    status: 'In production',
    github: 'https://github.com/sujaysreedharg/quicklyv2',
  },
  {
    title: 'Admission Oracle',
    blurb: 'Graduate-admission ML model, containerized and deployed to Heroku.',
    art: ArtML,
    tech: ['Python', 'scikit-learn', 'Docker', 'Heroku'],
    status: 'In production',
    github:
      'https://github.com/sujaysreedharg/Graduate-admission-prediction-dockerized-deployment',
  },
  {
    title: 'Prophet Forecasts',
    blurb: 'A time-series forecasting pipeline using Facebook Prophet on COVID-19 data.',
    art: ArtForecast,
    tech: ['Python', 'Prophet', 'Jupyter'],
    status: 'Research',
    github:
      'https://github.com/sujaysreedharg/Covid-19-future-prediction-with-time-series-forecasting-using-prophet-model',
  },
  {
    title: 'Auctions',
    blurb: "eBay-style auction platform with listings, bidding, comments, watchlists.",
    art: ArtAuctions,
    tech: ['Python', 'Django', 'Postgres', 'Heroku'],
    status: 'Archived',
    github: 'https://github.com/sujaysreedharg/Auctions-django-web-app-deployment-on-Heroku',
  },
];

const statusStyle: Record<Project['status'], string> = {
  'In production': 'bg-success/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/30',
  'Research': 'chip-primary',
  'Archived': '',
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const Art = project.art;
  return (
    <motion.article
      variants={item}
      className="surface surface-hover overflow-hidden group flex flex-col h-full"
    >
      {/* Art */}
      <div className="relative overflow-hidden border-b border-border">
        <Art className="block w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" />
        <ArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <span className={`chip whitespace-nowrap ${statusStyle[project.status]}`}>
            {project.status}
          </span>
        </div>

        <p className="mt-3 text-sm text-foreground-muted leading-relaxed flex-1">
          {project.blurb}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-border-subtle">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
            Repository
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const Projects: React.FC = () => {
  return (
    <Section
      id="projects"
      eyebrow="Selected projects"
      title="Things I've built."
      subtitle="Side projects and coursework — from CDN automation to ML pipelines."
    >
      <motion.div
        {...inViewProps}
        variants={fadeUpStagger(0, 0.08)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </motion.div>

      <div className="mt-12 flex justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() =>
            window.open('https://github.com/sujaysreedharg?tab=repositories', '_blank', 'noopener,noreferrer')
          }
        >
          See all repositories
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </Section>
  );
};

export default Projects;
