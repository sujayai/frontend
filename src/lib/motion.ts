import { Variants } from 'framer-motion';

export const ease = [0.16, 1, 0.3, 1] as const;
export const easeOut = [0.25, 1, 0.5, 1] as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export const fadeUpStagger = (delay = 0, stagger = 0.08): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: delay, staggerChildren: stagger },
  },
});

export const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const inViewProps = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-80px' },
};

/** Heavy settle — element falls into place with weight, like it has mass. */
export const gravitySettle: Variants = {
  hidden: { opacity: 0, y: -22, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', mass: 1.1, stiffness: 80, damping: 17 },
  },
};

/** Rise — for glass panels entering on scroll, slow and soft. */
export const glassRise: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease },
  },
};

export const staggerSlow = (delay = 0, stagger = 0.12): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
});
