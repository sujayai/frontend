import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type GlassProps = HTMLMotionProps<'div'> & {
  /** add the iridescent hover rim */
  iris?: boolean;
  /** enable backdrop refraction (warps content behind) */
  refract?: boolean;
  /** add the specular edge sweep */
  specular?: boolean;
  as?: 'div' | 'article' | 'section' | 'li' | 'button';
};

/**
 * A liquid-glass surface. Specular edge by default; opt into iris rim and
 * backdrop refraction. Built on motion.div so callers can animate freely.
 */
export const Glass = React.forwardRef<HTMLDivElement, GlassProps>(
  ({ className, iris = false, refract = false, specular = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'glass',
          specular && 'glass-specular',
          iris && 'glass-iris',
          refract && 'glass-refract',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Glass.displayName = 'Glass';

export default Glass;
