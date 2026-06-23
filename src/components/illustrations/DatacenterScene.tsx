import React from 'react';

/**
 * Hero illustration — a glassy data-center silhouette with glowing fiber
 * paths. Original procedural composition. Animated light beams travel
 * along the fiber strokes via SMIL.
 *
 * Designed to feel like an enterprise hero render, not stock SaaS art.
 */
const DatacenterScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Rack rows — receding in 1-point perspective
  const racks = [
    // Foreground row
    { x: 60,  y: 240, w: 120, h: 260, depth: 0 },
    { x: 200, y: 240, w: 120, h: 260, depth: 0 },
    { x: 340, y: 240, w: 120, h: 260, depth: 0 },
    { x: 480, y: 240, w: 120, h: 260, depth: 0 },
    { x: 620, y: 240, w: 120, h: 260, depth: 0 },
    // Mid row
    { x: 130, y: 200, w: 95,  h: 200, depth: 1 },
    { x: 245, y: 200, w: 95,  h: 200, depth: 1 },
    { x: 360, y: 200, w: 95,  h: 200, depth: 1 },
    { x: 475, y: 200, w: 95,  h: 200, depth: 1 },
    { x: 590, y: 200, w: 95,  h: 200, depth: 1 },
  ];

  return (
    <svg
      viewBox="0 0 800 560"
      className={className}
      role="img"
      aria-label="An illustration of a data center"
    >
      <defs>
        {/* Stage gradient */}
        <linearGradient id="stage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="hsl(214 50% 12%)" />
          <stop offset="60%" stopColor="hsl(214 55% 9%)" />
          <stop offset="100%" stopColor="hsl(215 60% 6%)" />
        </linearGradient>

        {/* Rack face gradient */}
        <linearGradient id="rack-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(215 38% 22%)" />
          <stop offset="100%" stopColor="hsl(215 45% 14%)" />
        </linearGradient>
        <linearGradient id="rack-face-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="hsl(215 35% 18%)" />
          <stop offset="100%" stopColor="hsl(215 45% 12%)" />
        </linearGradient>

        {/* Floor */}
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(214 35% 14%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(214 50% 8%)" stopOpacity="1" />
        </linearGradient>

        {/* Halo / glow */}
        <radialGradient id="halo" cx="50%" cy="20%" r="60%">
          <stop offset="0%"  stopColor="hsl(207 100% 55% / 0.55)" />
          <stop offset="50%" stopColor="hsl(207 100% 55% / 0.15)" />
          <stop offset="100%" stopColor="hsl(207 100% 55% / 0)" />
        </radialGradient>

        {/* Fiber gradient */}
        <linearGradient id="fiber" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="hsl(192 80% 60%)" stopOpacity="0" />
          <stop offset="50%"  stopColor="hsl(192 80% 60%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(192 80% 60%)" stopOpacity="0" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Stage */}
      <rect x="0" y="0" width="800" height="560" fill="url(#stage)" />

      {/* Top halo */}
      <ellipse cx="400" cy="80" rx="500" ry="180" fill="url(#halo)" />

      {/* Subtle grid floor */}
      <g opacity="0.18" stroke="hsl(207 100% 70%)" strokeWidth="0.5">
        {Array.from({ length: 20 }).map((_, i) => {
          const y = 360 + i * 12;
          return <line key={i} x1="0" y1={y} x2="800" y2={y} />;
        })}
      </g>

      {/* Mid-row racks (further back, darker) */}
      {racks.filter((r) => r.depth === 1).map((r, i) => (
        <g key={`mid-${i}`}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="2" fill="url(#rack-face-mid)" />
          {/* Server slits */}
          {Array.from({ length: 12 }).map((_, k) => (
            <line
              key={k}
              x1={r.x + 6}
              y1={r.y + 14 + k * 16}
              x2={r.x + r.w - 6}
              y2={r.y + 14 + k * 16}
              stroke="hsl(215 50% 8%)"
              strokeWidth="0.7"
            />
          ))}
          {/* A few LEDs */}
          {[1, 4, 8, 11].map((k) => (
            <circle
              key={k}
              cx={r.x + r.w - 12}
              cy={r.y + 14 + k * 16}
              r="1.4"
              fill={k === 4 ? 'hsl(192 90% 65%)' : 'hsl(207 100% 70%)'}
              opacity="0.85"
            />
          ))}
        </g>
      ))}

      {/* Foreground racks */}
      {racks.filter((r) => r.depth === 0).map((r, i) => (
        <g key={`fg-${i}`} filter="url(#glow)">
          {/* Rack body */}
          <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="3" fill="url(#rack-face)" />
          <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="3" fill="none" stroke="hsl(207 100% 70% / 0.18)" strokeWidth="1" />
          {/* Server slits */}
          {Array.from({ length: 16 }).map((_, k) => (
            <line
              key={k}
              x1={r.x + 8}
              y1={r.y + 14 + k * 16}
              x2={r.x + r.w - 8}
              y2={r.y + 14 + k * 16}
              stroke="hsl(215 50% 5%)"
              strokeWidth="1"
            />
          ))}
          {/* LED strip on the right */}
          {Array.from({ length: 16 }).map((_, k) => (
            <circle
              key={k}
              cx={r.x + r.w - 14}
              cy={r.y + 14 + k * 16}
              r="1.7"
              fill={
                k === 3 || k === 9 || k === 14
                  ? 'hsl(192 90% 65%)'
                  : 'hsl(207 100% 70%)'
              }
              opacity={k % 5 === 0 ? 1 : 0.7}
            >
              {/* slow blink on one LED per rack */}
              {k === 7 && (
                <animate
                  attributeName="opacity"
                  values="0.2;1;0.2"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
          {/* Rack base shadow */}
          <ellipse cx={r.x + r.w / 2} cy={r.y + r.h + 6} rx={r.w / 2} ry="3" fill="hsl(215 60% 4%)" opacity="0.7" />
        </g>
      ))}

      {/* Overhead fiber arcs — connect rack tops */}
      <g stroke="url(#fiber)" strokeWidth="1.5" fill="none" filter="url(#glow)">
        {/* Three arcs spanning from left to right */}
        <path d="M 80 200 Q 400 60 720 200" strokeDasharray="200" strokeDashoffset="0">
          <animate
            attributeName="stroke-dashoffset"
            from="200" to="-200"
            dur="3.6s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M 80 220 Q 400 90 720 220" strokeDasharray="160" strokeDashoffset="80">
          <animate
            attributeName="stroke-dashoffset"
            from="160" to="-160"
            dur="4.4s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M 80 240 Q 400 120 720 240" strokeDasharray="120" strokeDashoffset="40">
          <animate
            attributeName="stroke-dashoffset"
            from="120" to="-120"
            dur="5.2s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* Stage floor wash */}
      <rect x="0" y="430" width="800" height="130" fill="url(#floor)" />

      {/* Soft ambient point at base */}
      <ellipse cx="400" cy="500" rx="320" ry="40" fill="hsl(207 100% 55% / 0.08)" />
    </svg>
  );
};

export default DatacenterScene;
