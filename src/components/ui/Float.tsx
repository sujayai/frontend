import React from 'react';
import { motion } from 'framer-motion';

interface FloatProps {
  children: React.ReactNode;
  className?: string;
  /** vertical travel in px */
  amplitude?: number;
  /** seconds per cycle — heavier objects move slower */
  duration?: number;
  delay?: number;
  rotate?: number;
}

/**
 * Idle buoyancy — a slow, weighty hover as if the element is suspended in
 * fluid. Combine with useTilt for pointer reactivity.
 */
const Float: React.FC<FloatProps> = ({
  children,
  className = '',
  amplitude = 14,
  duration = 8,
  delay = 0,
  rotate = 0,
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: rotate ? [-rotate, rotate, -rotate] : 0,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default Float;
