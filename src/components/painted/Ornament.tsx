import React from 'react';

interface Props { className?: string }

/** A horizontal vine-and-bud dingbat used to separate plates and sections. */
export const Dingbat: React.FC<Props> = ({ className = '' }) => (
  <svg viewBox="0 0 240 28" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="dingbat-gilt" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stopColor="hsl(36 55% 38%)" />
        <stop offset="50%"  stopColor="hsl(45 78% 60%)" />
        <stop offset="100%" stopColor="hsl(36 55% 38%)" />
      </linearGradient>
    </defs>

    {/* The hand-ruled line that fades in from either end */}
    <line x1="0" y1="14" x2="92" y2="14" stroke="hsl(20 30% 28%)" strokeWidth="0.7" opacity="0.55" />
    <line x1="148" y1="14" x2="240" y2="14" stroke="hsl(20 30% 28%)" strokeWidth="0.7" opacity="0.55" />

    {/* The central trefoil — a contemporary nod to medieval flourishes */}
    <g transform="translate(120 14)" stroke="url(#dingbat-gilt)" strokeWidth="1.1" fill="none" strokeLinecap="round">
      <path d="M -22 0 Q -16 -10 -8 -2 Q -2 4 -8 8 Q -14 6 -10 0" />
      <path d="M  22 0 Q  16 -10  8 -2 Q  2 4   8 8 Q 14 6  10 0" />
      {/* central diamond */}
      <path d="M 0 -8 L 5 0 L 0 8 L -5 0 Z" fill="hsl(45 75% 55%)" stroke="hsl(36 55% 38%)" strokeWidth="0.8" />
      <circle cx="0" cy="0" r="1.4" fill="hsl(8 55% 38%)" stroke="none" />
    </g>
  </svg>
);

/** A small painted leaf marker, used as a bullet or in margins. */
export const LeafMark: React.FC<Props> = ({ className = '' }) => (
  <svg viewBox="0 0 16 12" className={className} aria-hidden="true">
    <path
      d="M 0 6 C 3 -1, 12 -2, 16 6 C 12 14, 3 13, 0 6 Z"
      fill="hsl(14 60% 42%)"
    />
    <path d="M 0 6 L 15 6" stroke="hsl(20 30% 12%)" strokeWidth="0.4" opacity="0.6" />
  </svg>
);

/** A tall vertical vine, used as a marginalia decoration. */
export const VineMargin: React.FC<Props> = ({ className = '' }) => (
  <svg viewBox="0 0 80 600" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="vine-bark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(24 34% 22%)" />
        <stop offset="100%" stopColor="hsl(20 30% 10%)" />
      </linearGradient>
    </defs>
    <path
      d="M 40 0 C 20 60, 60 140, 40 220 C 20 300, 60 380, 40 460 C 20 540, 50 580, 40 600"
      stroke="url(#vine-bark)"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      opacity="0.75"
    />
    {/* a few small leaves along the vine */}
    {[
      { x: 56, y: 90, a: 30 },
      { x: 24, y: 170, a: 200 },
      { x: 58, y: 280, a: 10 },
      { x: 22, y: 360, a: 200 },
      { x: 56, y: 460, a: 25 },
      { x: 28, y: 530, a: 195 },
    ].map((l, i) => (
      <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.a})`}>
        <path
          d="M 0 0 C 4 -7, 14 -10, 22 0 C 14 10, 4 7, 0 0 Z"
          fill={i % 2 === 0 ? 'hsl(14 55% 44%)' : 'hsl(40 55% 50%)'}
          opacity="0.85"
        />
      </g>
    ))}
  </svg>
);
