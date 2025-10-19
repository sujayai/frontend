import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Terminal as TermIcon, Cpu, Network } from 'lucide-react';
import Terminal from '@/components/interactive/Terminal';

const Hero: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    'Supercompute Network Engineer',
    'Technical Solutions Engineer'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { y: 18, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } } };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Soft radial vignettes (pure CSS) */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(600px circle at 20% 10%, rgba(16,185,129,0.08), transparent 60%), radial-gradient(500px circle at 80% 20%, rgba(59,130,246,0.08), transparent 60%)'
      }} />

      {/* Cool 3D Datacenter Switch Visualizations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Datacenter Switch - Left Side */}
        <div className="absolute top-20 left-4 lg:left-20 gpu-container">
          <div className="relative group">
            {/* Main Switch Body */}
            <div className="relative w-40 h-32 lg:w-48 lg:h-36 transform rotate-12 hover:rotate-6 transition-transform duration-500 gpu-image-3d">
              {/* Switch Base */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-lg shadow-2xl border-2 border-emerald-400/50 network-equipment-base">
                {/* Switch Faceplate */}
                <div className="absolute inset-2 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-md border border-emerald-300/30">
                  {/* Port Row 1 */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((port) => (
                      <div key={port} className="w-2 h-4 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-sm border border-emerald-300/50 network-port"></div>
                    ))}
                  </div>
                  
                  {/* Port Row 2 */}
                  <div className="absolute top-8 left-3 right-3 flex justify-between">
                    {[9, 10, 11, 12, 13, 14, 15, 16].map((port) => (
                      <div key={port} className="w-2 h-4 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-sm border border-emerald-300/50 network-port"></div>
                    ))}
                  </div>
                  
                  {/* Port Row 3 */}
                  <div className="absolute top-13 left-3 right-3 flex justify-between">
                    {[17, 18, 19, 20, 21, 22, 23, 24].map((port) => (
                      <div key={port} className="w-2 h-4 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-sm border border-emerald-300/50 network-port"></div>
                    ))}
                  </div>
                  
                  {/* Status LEDs */}
                  <div className="absolute top-1 right-2 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 status-led"></div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 status-led"></div>
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 status-led"></div>
                  </div>
                  
                  {/* Switch Branding */}
                  <div className="absolute bottom-2 left-3">
                    <span className="text-xs font-bold text-emerald-200 drop-shadow-lg">SWITCH</span>
                  </div>
                  
                  {/* Port Labels */}
                  <div className="absolute bottom-1 right-2">
                    <span className="text-xs text-emerald-300">24-PORT</span>
                  </div>
                </div>
                
                {/* Cool Rim Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 opacity-20 network-equipment-rim"></div>
                <div className="absolute inset-1 rounded-lg bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 opacity-30 network-equipment-rim"></div>
                <div className="absolute inset-2 rounded-lg bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-400 opacity-40 network-equipment-rim"></div>
              </div>
              
              {/* Static Green Flame Effect */}
              <div className="absolute -top-2 -left-2 w-4 h-6 bg-gradient-to-b from-emerald-400 via-emerald-500 to-transparent rounded-full opacity-80 gpu-flame"></div>
              <div className="absolute -top-1 -right-1 w-3 h-5 bg-gradient-to-b from-emerald-300 via-emerald-400 to-transparent rounded-full opacity-70 gpu-flame"></div>
            </div>
            
            {/* Static Data Particles */}
            <div className="absolute -top-4 -right-4 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
          </div>
        </div>

        {/* Network Router - Right Side */}
        <div className="absolute top-32 right-4 lg:right-20 gpu-container">
          <div className="relative group">
            {/* Router Body */}
            <div className="relative w-36 h-28 lg:w-44 lg:h-32 transform -rotate-12 hover:-rotate-6 transition-transform duration-500 gpu-image-3d">
              {/* Router Base */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg shadow-2xl border-2 border-blue-400/50 network-equipment-base blue">
                {/* Router Faceplate */}
                <div className="absolute inset-2 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 rounded-md border border-blue-300/30">
                  {/* Antenna Ports */}
                  <div className="absolute top-2 left-2 right-2 flex justify-between">
                    <div className="w-1.5 h-3 bg-gradient-to-b from-blue-400 to-blue-600 rounded-sm border border-blue-300/50 network-port"></div>
                    <div className="w-1.5 h-3 bg-gradient-to-b from-blue-400 to-blue-600 rounded-sm border border-blue-300/50 network-port"></div>
                    <div className="w-1.5 h-3 bg-gradient-to-b from-blue-400 to-blue-600 rounded-sm border border-blue-300/50 network-port"></div>
                    <div className="w-1.5 h-3 bg-gradient-to-b from-blue-400 to-blue-600 rounded-sm border border-blue-300/50 network-port"></div>
                  </div>
                  
                  {/* Ethernet Ports */}
                  <div className="absolute top-8 left-2 right-2 flex justify-between">
                    {[1, 2, 3, 4].map((port) => (
                      <div key={port} className="w-3 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-sm border border-blue-300/50 network-port"></div>
                    ))}
                  </div>
                  
                  {/* Status LEDs */}
                  <div className="absolute top-1 right-2 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 status-led"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 status-led"></div>
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 status-led"></div>
                  </div>
                  
                  {/* Router Branding */}
                  <div className="absolute bottom-2 left-2">
                    <span className="text-xs font-bold text-blue-200 drop-shadow-lg">ROUTER</span>
                  </div>
                  
                  {/* Port Labels */}
                  <div className="absolute bottom-1 right-2">
                    <span className="text-xs text-blue-300">4-PORT</span>
                  </div>
                </div>
                
                {/* Cool Rim Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-20 network-equipment-rim"></div>
                <div className="absolute inset-1 rounded-lg bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 opacity-30 network-equipment-rim"></div>
                <div className="absolute inset-2 rounded-lg bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 opacity-40 network-equipment-rim"></div>
              </div>
              
              {/* Static Blue Flame Effect */}
              <div className="absolute -top-2 -right-2 w-4 h-6 bg-gradient-to-b from-blue-400 via-blue-500 to-transparent rounded-full opacity-80 gpu-flame"></div>
              <div className="absolute -top-1 -left-1 w-3 h-5 bg-gradient-to-b from-blue-300 via-blue-400 to-transparent rounded-full opacity-70 gpu-flame"></div>
            </div>
            
            {/* Static Connection Lines with Glow */}
            <div className="absolute top-1/2 -left-8 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-gradient-to-l from-blue-400 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
          </div>
        </div>

        {/* Network Nodes */}
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-4 lg:space-x-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full shadow-lg shadow-emerald-400/50"
              />
            ))}
          </div>
        </div>

        {/* Data Flow Points */}
        <div className="absolute top-60 left-1/4 w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
        <div className="absolute top-60 right-1/4 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>

        {/* Network Traffic Bars */}
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2">
          <div className="flex items-end space-x-2 lg:space-x-4">
            {[60, 80, 45, 90, 70, 85].map((height, i) => (
              <div
                key={i}
                className="w-3 lg:w-4 bg-gradient-to-t from-emerald-500 to-blue-500 rounded-t-lg shadow-lg shadow-emerald-500/50"
                style={{ height: `${height * 0.4}px` }}
              />
            ))}
          </div>
        </div>

        {/* Network Connection Points */}
        <div className="absolute bottom-20 left-10 lg:left-20">
          <div className="relative">
            <div className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-emerald-400/30 rounded-full flex items-center justify-center shadow-lg shadow-emerald-400/20">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full shadow-lg shadow-emerald-400/50"></div>
            </div>
            {/* Static connection lines with glow */}
            <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
            <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gradient-to-b from-blue-400 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
          </div>
        </div>

        <div className="absolute bottom-20 right-10 lg:right-20">
          <div className="relative">
            <div className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-blue-400/30 rounded-full flex items-center justify-center shadow-lg shadow-blue-400/20">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg shadow-blue-400/50"></div>
            </div>
            {/* Static connection lines with glow */}
            <div className="absolute top-1/2 -left-8 w-8 h-0.5 bg-gradient-to-l from-blue-400 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
            <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gradient-to-b from-purple-400 to-transparent shadow-[0_0_10px_rgba(147,51,234,0.6)]"></div>
          </div>
        </div>
      </div>

      <motion.div className="container mx-auto px-6 text-center z-10 mt-16 lg:mt-0" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="mt-8 lg:mt-0"><Terminal /></motion.div>

        {/* Refined heading with better sizing */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            {/* Profile Image */}
            <motion.div 
              variants={itemVariants}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-emerald-500/20 shadow-2xl shadow-emerald-500/25">
                <img 
                  src="/profile.jpg" 
                  alt="Sujay Sreedhar" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            </motion.div>
            
            {/* Name and Title */}
            <div className="text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight font-extrabold tracking-tight">
            <span className="text-gray-900 dark:text-white">Hi, I'm </span>
            <span className="text-gradient bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 dark:from-emerald-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Sujay Sreedhar
            </span>
          </h1>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <motion.h2 
            key={currentRole} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-xl lg:text-2xl text-emerald-600 dark:text-emerald-400 font-mono min-h-[3rem] flex items-center justify-center"
          >
            {roles[currentRole]}
          </motion.h2>
        </motion.div>

        <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16 leading-relaxed">
          I love playing with packets and AI Infra. Former <span className="font-semibold text-emerald-600 dark:text-emerald-400">xAI</span> and <span className="font-semibold text-blue-600 dark:text-blue-400">Tesla</span> engineer interested in building the AI infrastructure network.
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center mb-16">
          {[
            { icon: TermIcon, value: 'Master of Science', label: 'Computer Networking @ North Carolina State University' }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="card-blur rounded-xl p-5 text-center group"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <stat.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 max-w-3xl mx-auto mb-16 px-4">
          {[
            { value: '1.5+', label: 'Years Experience' },
            { value: '200k', label: 'GPUs Managed' }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="card-blur rounded-xl p-5 text-center group w-full sm:w-48"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center items-center mb-16">
          <Button 
            variant="neon" 
            size="lg" 
            className="px-8 py-3"
            onClick={() => window.open('https://github.com/sujaysreedharg', '_blank')}
          >
            View My Work
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-emerald-600 dark:text-emerald-500">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
