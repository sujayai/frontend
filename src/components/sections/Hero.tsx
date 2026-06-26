import React from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Glass from '@/components/ui/Glass';
import Float from '@/components/ui/Float';
import { useTilt, useParallaxLayer } from '@/lib/useTilt';
import { gravitySettle, staggerSlow } from '@/lib/motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const nameY = useTransform(scrollY, [0, 700], [0, -140]);
  const stackY = useTransform(scrollY, [0, 700], [0, 90]);
  const fade = useTransform(scrollY, [0, 560], [1, 0]);

  const tilt = useTilt({ max: 14, mass: 1.6, stiffness: 80, damping: 13, lift: 30 });
  const chipA = useParallaxLayer(tilt.px, tilt.py, 42);
  const chipB = useParallaxLayer(tilt.px, tilt.py, 64);
  const portrait = useParallaxLayer(tilt.px, tilt.py, 22);
  const glare = useMotionTemplate`radial-gradient(220px circle at ${tilt.glareX} ${tilt.glareY}, rgba(255,255,255,0.18), transparent 60%)`;

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-20">
      {/* Huge faint name, parallaxing behind everything */}
      <motion.div
        style={{ y: nameY, opacity: fade }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[18%] flex justify-center select-none"
      >
        <span className="display text-[26vw] leading-none text-[hsl(var(--fg))] opacity-[0.035] whitespace-nowrap">
          SREEDHAR
        </span>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        variants={staggerSlow(0.15, 0.14)}
        initial="hidden"
        animate="visible"
        className="container relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left — quiet copy */}
          <div className="lg:col-span-6">
            <motion.div variants={gravitySettle}>
              <span className="eyebrow">Aether — AI Infrastructure</span>
            </motion.div>

            <motion.h1
              variants={gravitySettle}
              className="display mt-8 text-[clamp(3rem,8vw,7rem)] text-[hsl(var(--fg))]"
            >
              Sujay
              <br />
              <span className="text-aurora">Sreedhar</span>
            </motion.h1>

            <motion.p
              variants={gravitySettle}
              className="mt-10 max-w-md text-lg md:text-xl font-light leading-relaxed text-muted text-pretty"
            >
              I build the network fabric beneath large-scale AI — where two
              hundred thousand GPUs train as one.
            </motion.p>

            <motion.div variants={gravitySettle} className="mt-12 flex items-center gap-5">
              <button
                onClick={() =>
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group glass glass-specular glass-iris rounded-full px-7 py-3.5 text-sm font-medium text-[hsl(var(--fg))] transition-transform duration-500 hover:-translate-y-0.5"
              >
                <span className="inline-flex items-center gap-2">
                  Enter the work
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </span>
              </button>
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent('switchTab', { detail: 'blog' }))
                }
                className="link-quiet text-sm font-medium"
              >
                Read the writing
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Right — floating 3D glass stack */}
          <motion.div
            variants={gravitySettle}
            style={{ y: stackY }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div
              ref={tilt.ref}
              {...tilt.handlers}
              className="perspective relative w-full max-w-md"
              style={{ aspectRatio: '4 / 5' }}
            >
              {/* Soft halo lighting the glass from behind */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10"
                style={{
                  background:
                    'radial-gradient(60% 55% at 50% 45%, hsl(var(--accent) / 0.45), transparent 70%), radial-gradient(50% 50% at 70% 80%, hsl(var(--accent-2) / 0.4), transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />
              <motion.div
                className="preserve-3d absolute inset-0"
                style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
              >
                <Float amplitude={12} duration={9} className="absolute inset-0">
                  {/* Main monolith */}
                  <Glass
                    refract
                    iris
                    className="relative h-full w-full p-8 flex flex-col justify-between overflow-hidden"
                  >
                    {/* moving glare */}
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-[inherit]"
                      style={{ background: glare }}
                    />

                    {/* portrait */}
                    <motion.div
                      style={{ x: portrait.x, y: portrait.y }}
                      className="relative"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src="/profile.jpg"
                            alt="Sujay Sreedhar"
                            className="w-16 h-16 rounded-2xl object-cover ring-1 ring-white/15"
                          />
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[hsl(var(--accent-3))] ring-2 ring-[hsl(var(--bg))]" />
                        </div>
                        <div>
                          <div className="text-[hsl(var(--fg))] font-medium">Sujay Sreedhar</div>
                          <div className="text-sm text-faint">San Francisco · Available</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* live readout */}
                    <div className="relative">
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                        Cluster scale
                      </div>
                      <div className="mt-2 flex items-end gap-2">
                        <span className="display text-6xl text-[hsl(var(--fg))]">200</span>
                        <span className="display text-3xl text-aurora pb-1">K</span>
                        <span className="text-sm text-muted pb-2">GPUs</span>
                      </div>
                      {/* tiny equaliser bars */}
                      <div className="mt-4 flex items-end gap-1 h-8">
                        {[40, 70, 45, 90, 60, 80, 50, 75, 55, 85, 48, 68].map((h, i) => (
                          <motion.span
                            key={i}
                            className="flex-1 rounded-full bg-[hsl(var(--accent))]/50"
                            animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
                            transition={{
                              duration: 1.8 + (i % 4) * 0.4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: i * 0.08,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </Glass>
                </Float>

                {/* Floating chip A — front, parallax */}
                <motion.div
                  style={{ x: chipA.x, y: chipA.y, transform: 'translateZ(70px)' }}
                  className="absolute -left-6 top-[28%]"
                >
                  <Float amplitude={9} duration={7} delay={0.6}>
                    <Glass iris className="px-4 py-3 rounded-2xl">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                        Fabric
                      </div>
                      <div className="text-sm text-[hsl(var(--fg))] mt-0.5">RDMA · RoCE</div>
                    </Glass>
                  </Float>
                </motion.div>

                {/* Floating chip B — further front */}
                <motion.div
                  style={{ x: chipB.x, y: chipB.y, transform: 'translateZ(120px)' }}
                  className="absolute -right-5 bottom-[16%]"
                >
                  <Float amplitude={11} duration={8} delay={1.1}>
                    <Glass iris className="px-4 py-3 rounded-2xl">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                        Uptime
                      </div>
                      <div className="text-sm text-[hsl(var(--fg))] mt-0.5">
                        weeks, unbroken
                      </div>
                    </Glass>
                  </Float>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-px h-10 bg-[hsl(var(--fg))]/30"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
