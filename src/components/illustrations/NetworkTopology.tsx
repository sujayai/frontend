import React from 'react';

/**
 * Story-block illustration — a spine-and-leaf network topology.
 * Two spine switches at top, eight leaf switches, with animated light
 * pulses traveling along the edges.
 */
const NetworkTopology: React.FC<{ className?: string }> = ({ className = '' }) => {
  const spines = [{ id: 's1', x: 240 }, { id: 's2', x: 460 }];
  const leaves = Array.from({ length: 8 }).map((_, i) => ({
    id: `l${i}`,
    x: 60 + i * 80,
  }));

  const spineY = 90;
  const leafY = 320;

  return (
    <svg
      viewBox="0 0 700 440"
      className={className}
      role="img"
      aria-label="A spine-and-leaf network topology"
    >
      <defs>
        <linearGradient id="topo-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(215 50% 9%)" />
          <stop offset="100%" stopColor="hsl(214 55% 6%)" />
        </linearGradient>

        <linearGradient id="switch-spine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(207 80% 24%)" />
          <stop offset="100%" stopColor="hsl(207 75% 14%)" />
        </linearGradient>
        <linearGradient id="switch-leaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(215 35% 22%)" />
          <stop offset="100%" stopColor="hsl(215 40% 14%)" />
        </linearGradient>

        <radialGradient id="topo-halo" cx="50%" cy="35%" r="55%">
          <stop offset="0%"  stopColor="hsl(207 100% 55% / 0.35)" />
          <stop offset="100%" stopColor="hsl(207 100% 55% / 0)" />
        </radialGradient>

        <filter id="topo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      <rect x="0" y="0" width="700" height="440" fill="url(#topo-bg)" />
      <ellipse cx="350" cy="150" rx="400" ry="180" fill="url(#topo-halo)" />

      {/* Dotted grid */}
      <g opacity="0.18">
        {Array.from({ length: 9 }).map((_, r) =>
          Array.from({ length: 15 }).map((_, c) => (
            <circle
              key={`${r}-${c}`}
              cx={40 + c * 44}
              cy={30 + r * 44}
              r="0.8"
              fill="hsl(207 100% 70%)"
            />
          ))
        )}
      </g>

      {/* Edges spine -> leaf */}
      <g stroke="hsl(207 100% 70%)" strokeWidth="0.7" fill="none">
        {spines.map((s) =>
          leaves.map((l) => (
            <line
              key={`${s.id}-${l.id}`}
              x1={s.x}
              y1={spineY + 12}
              x2={l.x}
              y2={leafY - 12}
              opacity="0.28"
            />
          ))
        )}
      </g>

      {/* Animated light pulses on a few edges */}
      <g filter="url(#topo-glow)">
        {[
          { sx: spines[0].x, lx: leaves[1].x, dur: '3.5s', delay: '0s' },
          { sx: spines[0].x, lx: leaves[4].x, dur: '4.2s', delay: '0.8s' },
          { sx: spines[1].x, lx: leaves[2].x, dur: '3.0s', delay: '1.4s' },
          { sx: spines[1].x, lx: leaves[6].x, dur: '3.8s', delay: '2.0s' },
          { sx: spines[0].x, lx: leaves[7].x, dur: '4.6s', delay: '2.8s' },
        ].map((p, i) => (
          <circle
            key={i}
            r="3"
            fill="hsl(192 90% 65%)"
          >
            <animateMotion
              path={`M ${p.sx} ${spineY + 12} L ${p.lx} ${leafY - 12}`}
              dur={p.dur}
              begin={p.delay}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              dur={p.dur}
              begin={p.delay}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      {/* Spine switches */}
      {spines.map((s) => (
        <g key={s.id}>
          <rect x={s.x - 70} y={spineY - 16} width="140" height="32" rx="3" fill="url(#switch-spine)" />
          <rect x={s.x - 70} y={spineY - 16} width="140" height="32" rx="3" fill="none" stroke="hsl(207 100% 70% / 0.45)" strokeWidth="1" />
          {/* Tiny ports */}
          {Array.from({ length: 16 }).map((_, i) => (
            <rect
              key={i}
              x={s.x - 62 + i * 8}
              y={spineY - 4}
              width="5"
              height="8"
              rx="0.6"
              fill="hsl(207 100% 70%)"
              opacity={i % 5 === 0 ? 1 : 0.6}
            />
          ))}
          <text x={s.x} y={spineY - 22} fill="hsl(207 50% 75%)" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="2">
            SPINE
          </text>
        </g>
      ))}

      {/* Leaf switches */}
      {leaves.map((l, i) => (
        <g key={l.id}>
          <rect x={l.x - 28} y={leafY - 12} width="56" height="24" rx="2" fill="url(#switch-leaf)" />
          <rect x={l.x - 28} y={leafY - 12} width="56" height="24" rx="2" fill="none" stroke="hsl(207 100% 70% / 0.25)" strokeWidth="0.8" />
          {/* LED */}
          <circle cx={l.x + 22} cy={leafY} r="1.4" fill={i % 3 === 0 ? 'hsl(192 90% 65%)' : 'hsl(207 100% 70%)'} />
        </g>
      ))}

      {/* Bottom labels */}
      <text x="350" y="395" fill="hsl(214 16% 60%)" fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="3">
        LEAF · 01 02 03 04 05 06 07 08
      </text>
    </svg>
  );
};

export default NetworkTopology;
