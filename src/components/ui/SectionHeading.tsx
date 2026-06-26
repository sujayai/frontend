import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { gravitySettle, staggerSlow, inViewProps } from '@/lib/motion';

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeading: React.FC<Props> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}) => (
  <motion.div
    {...inViewProps}
    variants={staggerSlow(0, 0.1)}
    className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
  >
    {eyebrow && (
      <motion.div variants={gravitySettle} className={cn(align === 'center' && 'flex justify-center')}>
        <span className="eyebrow">{eyebrow}</span>
      </motion.div>
    )}
    <motion.h2
      variants={gravitySettle}
      className="display mt-6 text-[clamp(2.25rem,5vw,3.75rem)] text-[hsl(var(--fg))] text-balance"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        variants={gravitySettle}
        className={cn(
          'mt-5 text-lg font-light leading-relaxed text-muted text-pretty',
          align === 'center' ? 'mx-auto max-w-xl' : 'max-w-xl'
        )}
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

export default SectionHeading;
