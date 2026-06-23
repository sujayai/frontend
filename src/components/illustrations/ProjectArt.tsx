import React from 'react';

interface Props { className?: string }

const Base: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <svg
    viewBox="0 0 400 220"
    className={className}
    role="img"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="card-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="hsl(214 50% 14%)" />
        <stop offset="100%" stopColor="hsl(214 55% 8%)" />
      </linearGradient>
      <radialGradient id="card-halo" cx="50%" cy="40%" r="60%">
        <stop offset="0%"  stopColor="hsl(207 100% 55% / 0.35)" />
        <stop offset="100%" stopColor="hsl(207 100% 55% / 0)" />
      </radialGradient>
    </defs>
    <rect x="0" y="0" width="400" height="220" fill="url(#card-bg)" />
    <ellipse cx="200" cy="80" rx="280" ry="140" fill="url(#card-halo)" />
    {/* dotted grid */}
    <g opacity="0.18">
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 12 }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={20 + c * 32}
            cy={20 + r * 32}
            r="0.8"
            fill="hsl(207 100% 70%)"
          />
        ))
      )}
    </g>
    {children}
  </svg>
);

/** CDN — globe with edge nodes */
export const ArtCDN: React.FC<Props> = ({ className }) => (
  <Base className={className}>
    {/* Globe */}
    <circle cx="200" cy="120" r="60" fill="none" stroke="hsl(207 100% 70%)" strokeWidth="1" opacity="0.45" />
    <ellipse cx="200" cy="120" rx="60" ry="22" fill="none" stroke="hsl(207 100% 70%)" strokeWidth="0.8" opacity="0.35" />
    <ellipse cx="200" cy="120" rx="60" ry="38" fill="none" stroke="hsl(207 100% 70%)" strokeWidth="0.8" opacity="0.3" />
    <line x1="200" y1="60" x2="200" y2="180" stroke="hsl(207 100% 70%)" strokeWidth="0.6" opacity="0.3" />
    {/* Edge nodes around the globe */}
    {[
      [60, 60], [120, 40], [280, 50], [340, 80],
      [340, 160], [280, 190], [120, 195], [60, 165],
    ].map(([x, y], i) => (
      <g key={i}>
        <line x1={x} y1={y} x2="200" y2="120" stroke="hsl(192 90% 65% / 0.45)" strokeWidth="0.8" />
        <circle cx={x} cy={y} r="3.5" fill="hsl(192 90% 65%)" />
      </g>
    ))}
    <circle cx="200" cy="120" r="5" fill="hsl(207 100% 70%)" />
  </Base>
);

/** ML — decision tree */
export const ArtML: React.FC<Props> = ({ className }) => (
  <Base className={className}>
    {/* Root */}
    <g stroke="hsl(207 100% 70% / 0.45)" strokeWidth="1" fill="none">
      <line x1="200" y1="50" x2="120" y2="100" />
      <line x1="200" y1="50" x2="280" y2="100" />
      <line x1="120" y1="100" x2="80"  y2="160" />
      <line x1="120" y1="100" x2="160" y2="160" />
      <line x1="280" y1="100" x2="240" y2="160" />
      <line x1="280" y1="100" x2="320" y2="160" />
    </g>
    {[
      { x: 200, y: 50, r: 9,  fill: 'hsl(207 100% 70%)' },
      { x: 120, y: 100, r: 7, fill: 'hsl(192 90% 65%)' },
      { x: 280, y: 100, r: 7, fill: 'hsl(192 90% 65%)' },
      { x: 80,  y: 160, r: 5, fill: 'hsl(207 100% 70%)' },
      { x: 160, y: 160, r: 5, fill: 'hsl(207 100% 70%)' },
      { x: 240, y: 160, r: 5, fill: 'hsl(207 100% 70%)' },
      { x: 320, y: 160, r: 5, fill: 'hsl(207 100% 70%)' },
    ].map((n, i) => (
      <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.fill} />
    ))}
  </Base>
);

/** Forecast — sine-wave time-series chart */
export const ArtForecast: React.FC<Props> = ({ className }) => {
  // History path
  const histPoints = Array.from({ length: 24 }).map((_, i) => {
    const x = 30 + i * 9;
    const y = 130 + Math.sin(i * 0.55) * 28 + Math.cos(i * 0.3) * 12;
    return `${x},${y}`;
  });
  // Forecast path (smoother)
  const forecastPoints = Array.from({ length: 16 }).map((_, i) => {
    const x = 30 + (24 + i) * 9;
    const y = 130 + Math.sin((24 + i) * 0.55) * 22 + Math.cos((24 + i) * 0.3) * 8;
    return `${x},${y}`;
  });

  return (
    <Base className={className}>
      {/* Axis */}
      <line x1="30" y1="190" x2="370" y2="190" stroke="hsl(214 16% 45%)" strokeWidth="0.5" />
      {/* History line */}
      <polyline
        points={histPoints.join(' ')}
        fill="none"
        stroke="hsl(207 100% 70%)"
        strokeWidth="1.6"
      />
      {/* Confidence band */}
      <polygon
        points={`
          ${forecastPoints.join(' ')}
          ${forecastPoints.slice().reverse().map((p) => {
            const [x, y] = p.split(',').map(Number);
            return `${x},${y + 25}`;
          }).join(' ')}
        `}
        fill="hsl(192 90% 65% / 0.18)"
      />
      {/* Forecast line (dashed) */}
      <polyline
        points={forecastPoints.join(' ')}
        fill="none"
        stroke="hsl(192 90% 65%)"
        strokeWidth="1.6"
        strokeDasharray="4 3"
      />
      {/* Vertical divider at "now" */}
      <line x1="246" y1="50" x2="246" y2="190" stroke="hsl(207 100% 70%)" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.5" />
      <text x="246" y="44" fill="hsl(214 16% 70%)" fontSize="9" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="2">NOW</text>
    </Base>
  );
};

/** Auctions — bid grid */
export const ArtAuctions: React.FC<Props> = ({ className }) => {
  // Grid of cells with increasing "bid" heights
  const heights = [40, 55, 38, 70, 60, 82, 50, 95, 72, 105, 88, 120];

  return (
    <Base className={className}>
      <g>
        {heights.map((h, i) => {
          const x = 40 + i * 27;
          const y = 180 - h;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width="20"
                height={h}
                rx="1.5"
                fill="hsl(207 100% 70%)"
                opacity={0.3 + (i / heights.length) * 0.6}
              />
              <circle cx={x + 10} cy={y - 6} r="2" fill="hsl(192 90% 65%)" opacity={i === heights.length - 1 ? 1 : 0.4} />
            </g>
          );
        })}
      </g>
      <line x1="40" y1="180" x2="370" y2="180" stroke="hsl(214 16% 45%)" strokeWidth="0.5" />
    </Base>
  );
};
