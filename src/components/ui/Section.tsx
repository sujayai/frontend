import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUp, inViewProps } from '@/lib/motion';

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  children?: React.ReactNode;
  containerClassName?: string;
  tight?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  children,
  className,
  containerClassName,
  tight = false,
  ...props
}) => {
  return (
    <section id={id} className={cn(tight ? 'section-tight' : 'section', className)} {...props}>
      <div className={cn('container relative', containerClassName)}>
        {(eyebrow || title || subtitle) && (
          <motion.div
            {...inViewProps}
            variants={fadeUp}
            className={cn(
              'mb-12 md:mb-16 max-w-3xl',
              align === 'center' && 'mx-auto text-center'
            )}
          >
            {eyebrow && <div className="eyebrow mb-5">{eyebrow}</div>}
            {title && <h2 className="section-title text-balance">{title}</h2>}
            {subtitle && <p className="section-subtitle text-pretty">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
