import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Zap, Brain, Network, Database } from 'lucide-react';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { fadeUpStagger, item, inViewProps } from '@/lib/motion';

interface Project {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tech: string[];
  status: 'Production' | 'Research' | 'Archived';
  github: string;
  demo: string | null;
}

const PROJECTS: Project[] = [
  {
    title: 'Quickly v2 — Content Delivery Network',
    description:
      'A multi-tenant CDN that provisions infrastructure on bare-metal Linux hosts with strong tenant isolation using Ansible, Open vSwitch, Docker, and Libvirt.',
    icon: Zap,
    tech: ['Python', 'Ansible', 'Open vSwitch', 'Docker', 'Libvirt', 'etcd'],
    status: 'Production',
    github: 'https://github.com/sujaysreedharg/quicklyv2',
    demo: null,
  },
  {
    title: 'Graduate Admission Prediction',
    description:
      'A machine-learning model predicting graduate admission outcomes, packaged into a Docker image and deployed to Heroku for one-click access.',
    icon: Brain,
    tech: ['Python', 'scikit-learn', 'Docker', 'Heroku'],
    status: 'Production',
    github:
      'https://github.com/sujaysreedharg/Graduate-admission-prediction-dockerized-deployment',
    demo: null,
  },
  {
    title: 'COVID-19 Time Series Forecasting',
    description:
      'A forecasting pipeline using Facebook Prophet to predict COVID-19 trends — a template that generalizes to corporate, medical, and financial time series.',
    icon: Network,
    tech: ['Python', 'Prophet', 'Jupyter', 'Time Series'],
    status: 'Research',
    github:
      'https://github.com/sujaysreedharg/Covid-19-future-prediction-with-time-series-forecasting-using-prophet-model',
    demo: null,
  },
  {
    title: 'Auctions — Django Web App',
    description:
      "An eBay-like auctioning platform with listings, bidding, comments, and watchlists. Deployed to Heroku end-to-end.",
    icon: Database,
    tech: ['Python', 'Django', 'PostgreSQL', 'Heroku'],
    status: 'Archived',
    github: 'https://github.com/sujaysreedharg/Auctions-django-web-app-deployment-on-Heroku',
    demo: null,
  },
];

const statusColor: Record<Project['status'], string> = {
  Production: 'bg-success/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20',
  Research: 'bg-primary-subtle border-primary/20 text-primary dark:text-[hsl(var(--accent-foreground))]',
  Archived: 'bg-background-subtle border-border text-foreground-muted',
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
  };

  const Icon = project.icon;

  return (
    <motion.article
      variants={item}
      onMouseMove={handleMouseMove}
      className="spotlight surface surface-hover relative h-full p-6 md:p-7 group hover:-translate-y-0.5 transition-transform duration-300"
    >
      <div className="relative z-[2] flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="grid place-items-center w-10 h-10 rounded-lg bg-background-subtle border border-border-subtle text-foreground-muted group-hover:text-foreground group-hover:border-border transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium rounded-full border ${statusColor[project.status]}`}
          >
            {project.status === 'Production' && (
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
            )}
            {project.status}
          </span>
        </div>

        <h3 className="mt-5 font-display font-semibold text-xl text-foreground tracking-tight leading-snug">
          {project.title}
        </h3>

        <p className="mt-3 text-sm text-foreground-muted leading-relaxed flex-1 text-pretty">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-border-subtle flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" /> Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Live demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects: React.FC = () => {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Things I've built along the way."
      subtitle="A mix of side projects and coursework — from CDNs and Linux automation to ML pipelines and small web apps."
    >
      <motion.div
        {...inViewProps}
        variants={fadeUpStagger(0, 0.1)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
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
            window.open(
              'https://github.com/sujaysreedharg?tab=repositories',
              '_blank',
              'noopener,noreferrer'
            )
          }
          className="group"
        >
          View all repositories
          <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Button>
      </div>
    </Section>
  );
};

export default Projects;
