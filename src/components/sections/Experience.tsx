import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Calendar } from 'lucide-react';

const Experience: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const experiences = [
    {
      company: 'Arista Networks',
      role: 'Technical Solutions Engineer',
      duration: '2025 - Present',
      location: 'San Francisco, California',
      description: 'Currently working as a technical solutions engineer debugging network topologies and providing expertise in network infrastructure solutions.',
      technologies: ['Network Topologies', 'Technical Solutions', 'Debugging', 'Arista EOS', 'Network Infrastructure'],
      logo: ''
    },
    {
      company: 'xAI',
      role: 'Supercompute Network Engineer',
      duration: '2024 - 2025',
      location: 'Memphis, Tennessee',
      description: 'Core contributor from start to end of the Grok 3\'s supercompute 200k GPU infrastructure, ensuring that pre-training was smooth without breaking the training jobs.',
      technologies: ['GPU Infrastructure', 'Supercomputing', 'Network Engineering', 'Training Jobs', 'Pre-training'],
      logo: ''
    },
    {
      company: 'Tesla',
      role: 'Software Engineering Intern',
      duration: '2023 - 2024',
      location: 'Austin, Texas',
      description: 'Software engineering intern working on various software projects and gaining experience in large-scale software development.',
      technologies: ['Software Engineering', 'Software Development', 'Internship', 'Tesla', 'Large-scale Systems'],
      logo: ''
    },
    {
      company: 'Lenovo',
      role: 'Security Software Engineering Intern',
      duration: '2022 - 2023',
      location: 'Morrisville, North Carolina',
      description: 'Worked on Global Security Lab for Lenovo Products, developing security solutions using modern web technologies.',
      technologies: ['Security Engineering', 'Global Security Lab', 'NestJS', 'Software Development', 'Lenovo Products'],
      logo: ''
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Building the future of AI infrastructure at the world's leading tech companies
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative flex items-start mb-12 last:mb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 rounded-full bg-emerald-500 border-4 border-background z-10 shadow-lg">
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
              </div>

              {/* Content card */}
              <div className="ml-20 w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="card-blur rounded-lg p-6 group cursor-pointer"
                >
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gradient transition-all duration-300">
                        {exp.role}
                      </h3>
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                        <Building2 className="w-4 h-4 mr-2" />
                        {exp.company}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {exp.location}
                      </div>
                    </div>
                    <div className="flex flex-col lg:items-end text-sm text-gray-500 dark:text-gray-400 mt-2 lg:mt-0">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.duration}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30 group-hover:border-emerald-500/60 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Experience;
