import React from 'react';

/**
 * A futuristic-renaissance ornament: concentric rotating rings, a tilted
 * square, and radial lines — like a Da Vinci schematic come alive.
 * Stroked in gold leaf.
 */
const Vitruvian: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 520,
}) => {
  const stroke = 'hsl(var(--gold) / 0.55)';
  const strokeFaint = 'hsl(var(--gold) / 0.28)';
  const strokeStrong = 'hsl(var(--gold))';

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 500 500"
      className={`pointer-events-none ${className}`}
      width={size}
      height={size}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id="vitruvianGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--gold) / 0.18)" />
          <stop offset="70%" stopColor="hsl(var(--gold) / 0)" />
        </radialGradient>
      </defs>

      {/* Glow halo */}
      <circle cx="250" cy="250" r="240" fill="url(#vitruvianGlow)" />

      {/* Outer ring — rotating slowly */}
      <g className="animate-rotate-slower" style={{ transformOrigin: '250px 250px' }}>
        <circle cx="250" cy="250" r="230" fill="none" stroke={stroke} strokeWidth="1" strokeDasharray="2 6" />
      </g>

      {/* Mid ring — rotating reverse */}
      <g className="animate-rotate-reverse" style={{ transformOrigin: '250px 250px' }}>
        <circle cx="250" cy="250" r="195" fill="none" stroke={strokeFaint} strokeWidth="0.8" />
        {/* Tick marks every 30° */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 250 + Math.cos(angle) * 195;
          const y1 = 250 + Math.sin(angle) * 195;
          const x2 = 250 + Math.cos(angle) * 205;
          const y2 = 250 + Math.sin(angle) * 205;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={strokeStrong}
              strokeWidth="1.2"
              opacity={i % 3 === 0 ? 1 : 0.4}
            />
          );
        })}
      </g>

      {/* Tilted square */}
      <g className="animate-rotate-slow" style={{ transformOrigin: '250px 250px' }}>
        <rect
          x="90"
          y="90"
          width="320"
          height="320"
          fill="none"
          stroke={stroke}
          strokeWidth="1"
          transform="rotate(15 250 250)"
        />
      </g>

      {/* Inner ring + crosshair */}
      <circle cx="250" cy="250" r="120" fill="none" stroke={strokeStrong} strokeWidth="1.2" />
      <line x1="250" y1="60" x2="250" y2="440" stroke={strokeFaint} strokeWidth="0.6" />
      <line x1="60" y1="250" x2="440" y2="250" stroke={strokeFaint} strokeWidth="0.6" />

      {/* Center mark */}
      <circle cx="250" cy="250" r="4" fill={strokeStrong} />
      <circle cx="250" cy="250" r="10" fill="none" stroke={strokeStrong} strokeWidth="1" />

      {/* Roman numerals at cardinals */}
      {[
        { x: 250, y: 50, n: 'XII' },
        { x: 458, y: 256, n: 'III' },
        { x: 250, y: 460, n: 'VI' },
        { x: 42, y: 256, n: 'IX' },
      ].map((p) => (
        <text
          key={p.n}
          x={p.x}
          y={p.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Cinzel, serif"
          fontSize="14"
          fontWeight="500"
          fill="hsl(var(--gold))"
          opacity="0.7"
        >
          {p.n}
        </text>
      ))}
    </svg>
  );
};

export default Vitruvian;
