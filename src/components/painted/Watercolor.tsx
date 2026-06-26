import React from 'react';

interface Props {
  className?: string;
  /** Hue: sienna | gilt | moss | oxblood | persimmon */
  pigment?: 'sienna' | 'gilt' | 'moss' | 'oxblood' | 'persimmon';
  /** Opacity of the wash */
  intensity?: number;
}

const PIGMENT: Record<NonNullable<Props['pigment']>, string> = {
  sienna:    'hsl(14 60% 42%)',
  gilt:      'hsl(40 70% 55%)',
  moss:      'hsl(75 28% 32%)',
  oxblood:   'hsl(6 50% 28%)',
  persimmon: 'hsl(16 70% 50%)',
};

/**
 * A slow watercolor wash — turbulence noise displaces a radial gradient
 * so the wash breathes and bleeds at its edges like wet paint on paper.
 */
const Watercolor: React.FC<Props> = ({
  className = '',
  pigment = 'sienna',
  intensity = 0.3,
}) => {
  const id = React.useId();
  const color = PIGMENT[pigment];
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id={`wash-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="3" result="noise">
            <animate
              attributeName="baseFrequency"
              dur="32s"
              values="0.012 0.018; 0.018 0.014; 0.012 0.018"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="40" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <radialGradient id={`wash-grad-${id}`} cx="50%" cy="45%" r="55%">
          <stop offset="0%"  stopColor={color} stopOpacity={intensity} />
          <stop offset="60%" stopColor={color} stopOpacity={intensity * 0.45} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx="200"
        cy="200"
        r="160"
        fill={`url(#wash-grad-${id})`}
        filter={`url(#wash-${id})`}
      />
    </svg>
  );
};

export default Watercolor;
