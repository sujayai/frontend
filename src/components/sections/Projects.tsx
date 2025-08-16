import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Zap, Brain, Network, Database } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Quickly v2 - Content Delivery Network',
      description: 'CDN service that deploys infrastructure on Linux machines with tenant isolation using Ansible, OvSwitch, Docker, and Libvirt.',
      icon: Zap,
      tech: ['Python', 'Ansible', 'OvSwitch', 'Docker', 'Libvirt', 'Virsh', 'etcd'],
      gradient: 'from-yellow-400 to-orange-500',
      status: 'Production',
      github: 'https://github.com/sujaysreedharg/quicklyv2',
      demo: null,
    },
    {
      title: 'Graduate Admission Prediction ML',
      description: 'Machine Learning model for graduate admission prediction with Docker containerized deployment on Heroku cloud platform.',
      icon: Brain,
      tech: ['Python', 'Docker', 'Heroku', 'Machine Learning', 'HTML'],
      gradient: 'from-purple-500 to-pink-500',
      status: 'Production',
      github: 'https://github.com/sujaysreedharg/Graduate-admission-prediction-dockerized-deployment',
      demo: null,
    },
    {
      title: 'COVID-19 Time Series Forecasting',
      description: 'Time series analysis using Prophet model for COVID-19 future predictions, widely applicable in corporate, medical, and financial sectors.',
      icon: Network,
      tech: ['Python', 'Prophet', 'Jupyter Notebook', 'Time Series Analysis'],
      gradient: 'from-blue-500 to-cyan-500',
      status: 'Research',
      github: 'https://github.com/sujaysreedharg/Covid-19-future-prediction-with-time-series-forecasting-using-prophet-model',
      demo: null,
    },
    {
      title: 'Auctions Django Web App',
      description: 'eBay-like e-commerce auction site allowing users to post listings, place bids, comment, and manage watchlists.',
      icon: Database,
      tech: ['Python', 'Django', 'Heroku', 'Web Development', 'e-Commerce'],
      gradient: 'from-emerald-500 to-teal-500',
      status: 'Production',
      github: 'https://github.com/sujaysreedharg/Auctions-django-web-app-deployment-on-Heroku',
      demo: null,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--x', `${x}px`);
    target.style.setProperty('--y', `${y}px`);
  };

  return (
    <section className="py-20 relative" id="projects">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Pushing the boundaries of computational infrastructure and AI systems at enterprise scale
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={cardVariants}>
              <div className="spotlight" onMouseMove={handleMouseMove}>
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  perspective={1000}
                  scale={1.02}
                  transitionSpeed={2000}
                  gyroscope={true}
                >
                  <Card className="h-full group cursor-pointer relative z-10 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md hover:ring-2 hover:ring-emerald-400 dark:hover:ring-emerald-500 hover:ring-offset-2 ring-offset-white dark:ring-offset-black transition-all duration-300">
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    {/* Removed heavy glow to prevent uneven borders on hover */}
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${project.gradient} group-hover:scale-110 transition-transform duration-300`}>
                            <project.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-gradient transition-all duration-300">
                              {project.title}
                            </CardTitle>
                            <div className="flex items-center mt-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                project.status === 'Production' 
                                  ? 'bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                                  : project.status === 'Research'
                                  ? 'bg-purple-500/15 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
                                  : 'bg-blue-500/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      <CardDescription className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {project.description}
                      </CardDescription>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-xs rounded-full border transition-colors duration-300 bg-gray-100 text-gray-700 border-gray-200 group-hover:border-emerald-500/50 dark:bg-white/10 dark:text-gray-300 dark:border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex space-x-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-500/10"
                          onClick={() => window.open(project.github, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                        {project.demo && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-500/10"
                            onClick={() => project.demo && window.open(project.demo, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Button>
                        )}
                      </div>
                    </CardContent>

                    {/* Hover effect particles */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-emerald-500 rounded-full animate-ping"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </Card>
                </Tilt>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all projects button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button 
            variant="cyber" 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => window.open('https://github.com/sujaysreedharg?tab=repositories', '_blank')}
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
