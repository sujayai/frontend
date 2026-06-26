import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Glass from '@/components/ui/Glass';
import { useTilt } from '@/lib/useTilt';

interface Principle {
  no: string;
  title: string;
  body: string;
}

const PRINCIPLES: Principle[] = [
  {
    no: '01',
    title: 'Lossless by design',
    body: 'A single dropped packet stalls ten thousand GPUs. The fabric is engineered so it never happens.',
  },
  {
    no: '02',
    title: 'Built to stay up',
    body: 'Training runs span weeks. Reliability is not a feature — it is the entire job.',
  },
  {
    no: '03',
    title: 'Scale is the medium',
    body: 'Two hundred thousand accelerators, made to behave as one coherent machine.',
  },
];

/** A single glass card that tilts toward the pointer with weight. */
const PrincipleCard: React.FC<{ p: Principle; rotate: number; lift: number }> = ({
  p,
  rotate,
  lift,
}) => {
  const tilt = useTilt({ max: 10, mass: 1.5, stiffness: 80, damping: 14 });
  return (
    <div
      ref={tilt.ref}
      {...tilt.handlers}
      className="perspective flex-1"
      style={{ marginTop: lift }}
    >
      <motion.div
        className="preserve-3d"
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, rotate }}
      >
        <Glass
          iris
          refract
          className="p-8 md:p-10 h-full min-h-[340px] flex flex-col justify-between"
        >
          <div className="font-mono text-sm text-aurora">{p.no}</div>
          <div>
            <h3 className="text-2xl md:text-[28px] font-light tracking-tight text-[hsl(var(--fg))]">
              {p.title}
            </h3>
            <p className="mt-4 text-muted font-light leading-relaxed text-pretty">
              {p.body}
            </p>
          </div>
        </Glass>
      </motion.div>
    </div>
  );
};

const Manifesto: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // The triptych gathers from spread → aligned as it crosses the viewport
  const spread = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -40]);
  const rise = useTransform(scrollYProgress, [0, 0.5], [80, 0]);

  return (
    <section ref={ref} id="principles" className="section">
      <div className="container">
        <motion.div style={{ y: rise }}>
          <div className="max-w-2xl">
            <span className="eyebrow">The work</span>
            <h2 className="display mt-6 text-[clamp(2.25rem,5vw,3.75rem)] text-[hsl(var(--fg))] text-balance">
              Three truths about training at the&nbsp;frontier.
            </h2>
          </div>

          <motion.div
            style={{ gap: spread }}
            className="mt-16 flex flex-col md:flex-row"
          >
            <PrincipleCard p={PRINCIPLES[0]} rotate={-1.5} lift={0} />
            <PrincipleCard p={PRINCIPLES[1]} rotate={0} lift={28} />
            <PrincipleCard p={PRINCIPLES[2]} rotate={1.5} lift={56} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
