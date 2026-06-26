import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

interface TiltOptions {
  /** Max tilt in degrees */
  max?: number;
  /** Spring weight — higher mass = heavier, slower settle (gravity feel) */
  mass?: number;
  stiffness?: number;
  damping?: number;
  /** Parallax lift of inner layers, px */
  lift?: number;
}

/**
 * Pointer-driven 3D tilt with weighty spring physics. Returns handlers to
 * spread on the container and motion values for rotateX / rotateY plus a
 * normalized pointer (px, py in -0.5..0.5) for inner-layer parallax and the
 * moving specular glare.
 */
export function useTilt(opts: TiltOptions = {}) {
  const { max = 12, mass = 1.4, stiffness = 90, damping = 14 } = opts;
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { mass, stiffness, damping };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);

  const glareX = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => {
    px.set(0);
    py.set(0);
  };

  return {
    ref,
    handlers: { onMouseMove, onMouseLeave },
    rotateX,
    rotateY,
    px: sx,
    py: sy,
    glareX,
    glareY,
  };
}

/** Parallax a layer by depth (px) using the tilt's normalized pointer. */
export function useParallaxLayer(px: MotionValue<number>, py: MotionValue<number>, depth: number) {
  const x = useTransform(px, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(py, [-0.5, 0.5], [-depth, depth]);
  return { x, y };
}
