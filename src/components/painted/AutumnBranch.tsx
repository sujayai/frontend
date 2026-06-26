import React from 'react';

interface Props { className?: string }

/**
 * A sinuous painted branch from the upper right, draping into the page,
 * carrying a few oak-like leaves in burnt sienna, persimmon and gilt.
 * Strokes draw in slowly as it loads — like ink working into the paper.
 */
const AutumnBranch: React.FC<Props> = ({ className = '' }) => (
  <svg
    viewBox="0 0 520 760"
    className={className}
    role="img"
    aria-label="A painted autumn branch"
  >
    <defs>
      <linearGradient id="branch-bark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="hsl(24 34% 22%)" />
        <stop offset="60%"  stopColor="hsl(20 30% 16%)" />
        <stop offset="100%" stopColor="hsl(20 30% 10%)" />
      </linearGradient>

      <linearGradient id="leaf-sienna" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"  stopColor="hsl(14 65% 50%)" />
        <stop offset="100%" stopColor="hsl(10 55% 32%)" />
      </linearGradient>
      <linearGradient id="leaf-persimmon" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"  stopColor="hsl(20 80% 60%)" />
        <stop offset="100%" stopColor="hsl(16 60% 42%)" />
      </linearGradient>
      <linearGradient id="leaf-gilt" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"  stopColor="hsl(45 80% 65%)" />
        <stop offset="100%" stopColor="hsl(36 55% 40%)" />
      </linearGradient>
      <linearGradient id="leaf-moss" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"  stopColor="hsl(78 30% 42%)" />
        <stop offset="100%" stopColor="hsl(70 28% 24%)" />
      </linearGradient>
      <linearGradient id="leaf-oxblood" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"  stopColor="hsl(8 55% 42%)" />
        <stop offset="100%" stopColor="hsl(4 50% 22%)" />
      </linearGradient>

      <filter id="brush" x="-15%" y="-15%" width="130%" height="130%">
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" result="t" />
        <feDisplacementMap in="SourceGraphic" in2="t" scale="1.6" />
      </filter>
    </defs>

    {/* Soft watercolor wash behind */}
    <ellipse cx="320" cy="280" rx="260" ry="220" fill="hsl(14 60% 50%)" opacity="0.07" />
    <ellipse cx="200" cy="500" rx="220" ry="200" fill="hsl(45 60% 50%)" opacity="0.08" />

    {/* Main branch */}
    <g filter="url(#brush)" fill="none" stroke="url(#branch-bark)" strokeLinecap="round">
      <path
        d="M 520 40 C 460 80, 420 140, 380 200 C 340 260, 320 320, 300 380 C 280 440, 270 520, 260 600 C 252 660, 248 710, 244 760"
        strokeWidth="9"
        opacity="0.95"
      />
      {/* Side branches */}
      <path d="M 380 200 C 340 220, 300 240, 240 250" strokeWidth="3.5" opacity="0.85" />
      <path d="M 330 320 C 300 326, 250 320, 200 300" strokeWidth="3" opacity="0.8" />
      <path d="M 300 380 C 340 400, 380 410, 420 412" strokeWidth="3" opacity="0.8" />
      <path d="M 280 480 C 230 488, 170 484, 120 470" strokeWidth="3" opacity="0.78" />
      <path d="M 270 560 C 310 580, 360 600, 400 612" strokeWidth="2.6" opacity="0.75" />
    </g>

    {/* Leaves — clustered along the branches */}
    {/* Each leaf is a simple Bezier teardrop with a midvein */}
    <g filter="url(#brush)">
      {/* upper persimmon cluster */}
      <Leaf cx={245} cy={245} angle={-30} size={1.0} fill="url(#leaf-persimmon)" />
      <Leaf cx={235} cy={264} angle={-60} size={0.85} fill="url(#leaf-sienna)" />
      <Leaf cx={272} cy={232} angle={20} size={0.7} fill="url(#leaf-gilt)" />

      {/* mid sienna cluster */}
      <Leaf cx={208} cy={310} angle={-110} size={1.05} fill="url(#leaf-sienna)" />
      <Leaf cx={228} cy={336} angle={-150} size={0.8} fill="url(#leaf-oxblood)" />
      <Leaf cx={186} cy={282} angle={-80} size={0.78} fill="url(#leaf-persimmon)" />

      {/* mid gilt cluster on right side */}
      <Leaf cx={420} cy={410} angle={40} size={1.0} fill="url(#leaf-gilt)" />
      <Leaf cx={448} cy={428} angle={70} size={0.88} fill="url(#leaf-persimmon)" />
      <Leaf cx={400} cy={388} angle={10} size={0.78} fill="url(#leaf-sienna)" />

      {/* moss accent */}
      <Leaf cx={128} cy={476} angle={-140} size={0.9} fill="url(#leaf-moss)" />
      <Leaf cx={150} cy={500} angle={-170} size={0.78} fill="url(#leaf-sienna)" />

      {/* lower oxblood pair */}
      <Leaf cx={400} cy={620} angle={50} size={0.9} fill="url(#leaf-oxblood)" />
      <Leaf cx={418} cy={600} angle={20} size={0.7} fill="url(#leaf-gilt)" />

      {/* a single falling leaf */}
      <g transform="translate(120, 720) rotate(-25)">
        <Leaf cx={0} cy={0} angle={0} size={0.85} fill="url(#leaf-sienna)" />
      </g>
    </g>

    {/* Gilt freckles — scattered illumination */}
    <g fill="hsl(45 75% 60%)" opacity="0.55">
      <circle cx="262" cy="220" r="1.6" />
      <circle cx="170" cy="380" r="2" />
      <circle cx="440" cy="350" r="1.4" />
      <circle cx="200" cy="600" r="1.8" />
      <circle cx="80"  cy="650" r="1.2" />
      <circle cx="370" cy="700" r="1.5" />
    </g>
  </svg>
);

const Leaf: React.FC<{
  cx: number; cy: number; angle: number; size: number; fill: string;
}> = ({ cx, cy, angle, size, fill }) => {
  // teardrop leaf, 36 long × 22 wide, with midvein
  return (
    <g transform={`translate(${cx}, ${cy}) rotate(${angle}) scale(${size})`}>
      <path
        d="M 0 0 C 6 -10, 22 -14, 36 0 C 22 14, 6 10, 0 0 Z"
        fill={fill}
      />
      {/* midvein */}
      <path d="M 0 0 L 34 0" stroke="hsl(20 30% 12%)" strokeWidth="0.6" opacity="0.55" />
      {/* small veins */}
      <path d="M 8 -1 L 14 -7" stroke="hsl(20 30% 12%)" strokeWidth="0.4" opacity="0.4" />
      <path d="M 8 1  L 14 7"  stroke="hsl(20 30% 12%)" strokeWidth="0.4" opacity="0.4" />
      <path d="M 20 -1 L 26 -8" stroke="hsl(20 30% 12%)" strokeWidth="0.4" opacity="0.4" />
      <path d="M 20 1  L 26 8"  stroke="hsl(20 30% 12%)" strokeWidth="0.4" opacity="0.4" />
    </g>
  );
};

export default AutumnBranch;
