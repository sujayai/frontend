import React from 'react';

/**
 * Story-block illustration — GPU server rows receding in 1-point perspective.
 * Blue indicator LEDs blink subtly.
 */
const GpuRacks: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Three rows of racks, scaled down as they recede
  const rows = [
    { y: 280, scale: 1.0,  count: 7 },
    { y: 230, scale: 0.75, count: 9 },
    { y: 195, scale: 0.55, count: 11 },
  ];

  return (
    <svg
      viewBox="0 0 700 440"
      className={className}
      role="img"
      aria-label="An illustration of GPU server racks"
    >
      <defs>
        <linearGradient id="gpu-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(215 50% 9%)" />
          <stop offset="100%" stopColor="hsl(214 55% 6%)" />
        </linearGradient>

        <linearGradient id="gpu-rack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(215 38% 22%)" />
          <stop offset="100%" stopColor="hsl(215 45% 12%)" />
        </linearGradient>

        <linearGradient id="gpu-rack-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(215 30% 16%)" />
          <stop offset="100%" stopColor="hsl(215 40% 10%)" />
        </linearGradient>

        <radialGradient id="gpu-halo" cx="50%" cy="40%" r="60%">
          <stop offset="0%"  stopColor="hsl(207 100% 55% / 0.4)" />
          <stop offset="100%" stopColor="hsl(207 100% 55% / 0)" />
        </radialGradient>

        <filter id="gpu-glow">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      <rect x="0" y="0" width="700" height="440" fill="url(#gpu-bg)" />
      <ellipse cx="350" cy="180" rx="450" ry="200" fill="url(#gpu-halo)" />

      {/* Receding floor lines */}
      <g opacity="0.22" stroke="hsl(207 100% 70%)" strokeWidth="0.6">
        {Array.from({ length: 12 }).map((_, i) => {
          const y = 360 + i * 6;
          const span = 700 - i * 14;
          const start = (700 - span) / 2;
          return <line key={i} x1={start} y1={y} x2={start + span} y2={y} />;
        })}
      </g>

      {/* Render rows back to front */}
      {rows.map((row, ri) => {
        const baseW = 70 * row.scale;
        const baseH = 110 * row.scale;
        const gap = 18 * row.scale;
        const totalW = row.count * baseW + (row.count - 1) * gap;
        const startX = (700 - totalW) / 2;
        const rackGradient = ri === 0 ? 'url(#gpu-rack)' : 'url(#gpu-rack-back)';

        return (
          <g key={ri} filter={ri === 0 ? 'url(#gpu-glow)' : undefined}>
            {Array.from({ length: row.count }).map((_, ci) => {
              const x = startX + ci * (baseW + gap);
              const slits = Math.max(6, Math.floor(baseH / 9));
              return (
                <g key={ci}>
                  <rect
                    x={x}
                    y={row.y}
                    width={baseW}
                    height={baseH}
                    rx={2 * row.scale}
                    fill={rackGradient}
                  />
                  <rect
                    x={x}
                    y={row.y}
                    width={baseW}
                    height={baseH}
                    rx={2 * row.scale}
                    fill="none"
                    stroke="hsl(207 100% 70% / 0.16)"
                    strokeWidth={0.7 * row.scale}
                  />
                  {/* Server slits */}
                  {Array.from({ length: slits }).map((_, k) => (
                    <line
                      key={k}
                      x1={x + 4 * row.scale}
                      y1={row.y + 6 * row.scale + k * (baseH / slits)}
                      x2={x + baseW - 4 * row.scale}
                      y2={row.y + 6 * row.scale + k * (baseH / slits)}
                      stroke="hsl(215 60% 5%)"
                      strokeWidth={0.6 * row.scale}
                    />
                  ))}
                  {/* LED column on the right */}
                  {Array.from({ length: slits }).map((_, k) => (
                    <circle
                      key={k}
                      cx={x + baseW - 8 * row.scale}
                      cy={row.y + 6 * row.scale + k * (baseH / slits)}
                      r={1.1 * row.scale}
                      fill={k % 3 === 0 ? 'hsl(192 90% 65%)' : 'hsl(207 100% 70%)'}
                      opacity={k % 4 === 0 ? 1 : 0.7}
                    >
                      {ri === 0 && k === 4 + ci && (
                        <animate
                          attributeName="opacity"
                          values="0.2;1;0.2"
                          dur="2.4s"
                          repeatCount="indefinite"
                        />
                      )}
                    </circle>
                  ))}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Foreground floor wash */}
      <linearGradient id="gpu-floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(214 35% 12%)" stopOpacity="0" />
        <stop offset="100%" stopColor="hsl(214 50% 6%)" stopOpacity="1" />
      </linearGradient>
      <rect x="0" y="370" width="700" height="70" fill="url(#gpu-floor)" />
    </svg>
  );
};

export default GpuRacks;
