import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
// Custom SVG icons
const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const { toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]} 
        relative flex items-center justify-center
        bg-white/10 dark:bg-white/10 
        hover:bg-white/20 dark:hover:bg-white/20
        border border-white/20 dark:border-white/20
        rounded-full
        backdrop-blur-sm
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-emerald-400/50
        group
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon container with smooth rotation */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Sun Icon - shown when in dark mode (to switch to light) */}
        <motion.div
          className={`absolute ${iconSizes[size]} text-yellow-400`}
          animate={{ 
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.8,
            rotate: isDark ? 0 : -90
          }}
          transition={{ duration: 0.3 }}
        >
          <SunIcon className="w-full h-full" />
        </motion.div>

        {/* Moon Icon - shown when in light mode (to switch to dark) */}
        <motion.div
          className={`absolute ${iconSizes[size]} text-blue-300`}
          animate={{ 
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.8 : 1,
            rotate: isDark ? 90 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <MoonIcon className="w-full h-full" />
        </motion.div>
      </motion.div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-400/30"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};
