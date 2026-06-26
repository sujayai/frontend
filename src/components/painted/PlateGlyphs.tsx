import React from 'react';

/**
 * Tiny painted glyphs that sit next to each plate — sketched, not iconic.
 * Each is a procedural SVG composition, no library art.
 */

interface Props { className?: string }

const Frame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
    <defs>
      <filter id="glyph-brush" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" />
        <feDisplacementMap in="SourceGraphic" scale="1.2" />
      </filter>
    </defs>
    <g filter="url(#glyph-brush)">{children}</g>
  </svg>
);

/** A globe-and-arc — for the CDN plate */
export const GlyphCDN: React.FC<Props> = ({ className }) => (
  <Frame className={className}>
    <circle cx="60" cy="60" r="34" fill="none" stroke="hsl(20 30% 14%)" strokeWidth="1.4" />
    <ellipse cx="60" cy="60" rx="34" ry="14" fill="none" stroke="hsl(20 30% 14%)" strokeWidth="0.9" opacity="0.7" />
    <line x1="60" y1="26" x2="60" y2="94" stroke="hsl(20 30% 14%)" strokeWidth="0.6" opacity="0.5" />
    {/* edge nodes */}
    {[
      [22, 38], [98, 36], [16, 80], [102, 82], [60, 14], [60, 106],
    ].map(([x, y], i) => (
      <g key={i}>
        <line x1={x} y1={y} x2="60" y2="60" stroke="hsl(14 60% 42%)" strokeWidth="0.7" opacity="0.7" />
        <circle cx={x} cy={y} r="2.4" fill="hsl(45 70% 50%)" stroke="hsl(20 30% 14%)" strokeWidth="0.4" />
      </g>
    ))}
    <circle cx="60" cy="60" r="3" fill="hsl(14 60% 42%)" />
  </Frame>
);

/** A small branching tree — for the ML plate */
export const GlyphML: React.FC<Props> = ({ className }) => (
  <Frame className={className}>
    <g stroke="hsl(20 30% 14%)" strokeWidth="1" fill="none">
      <line x1="60" y1="26" x2="36" y2="58" />
      <line x1="60" y1="26" x2="84" y2="58" />
      <line x1="36" y1="58" x2="22" y2="92" />
      <line x1="36" y1="58" x2="48" y2="92" />
      <line x1="84" y1="58" x2="72" y2="92" />
      <line x1="84" y1="58" x2="98" y2="92" />
    </g>
    {[[60, 26], [36, 58], [84, 58], [22, 92], [48, 92], [72, 92], [98, 92]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={i === 0 ? 3.5 : 2.4} fill={i === 0 ? 'hsl(14 60% 42%)' : 'hsl(45 70% 50%)'} stroke="hsl(20 30% 14%)" strokeWidth="0.5" />
    ))}
  </Frame>
);

/** A sine wave with a prophecy mark — for the forecast plate */
export const GlyphProphet: React.FC<Props> = ({ className }) => (
  <Frame className={className}>
    <path
      d="M 8 78 C 18 62, 28 88, 38 70 C 48 52, 58 84, 68 62 C 78 40, 88 70, 100 56 L 112 50"
      stroke="hsl(20 30% 14%)" strokeWidth="1.4" fill="none"
    />
    <line x1="68" y1="20" x2="68" y2="104" stroke="hsl(14 60% 42%)" strokeWidth="0.6" strokeDasharray="2 3" />
    <circle cx="68" cy="62" r="3.5" fill="hsl(45 70% 50%)" stroke="hsl(20 30% 14%)" strokeWidth="0.6" />
    <text x="68" y="14" fontFamily="Cormorant SC, serif" fontSize="6" fill="hsl(14 60% 42%)" textAnchor="middle" letterSpacing="2">NUNC</text>
  </Frame>
);

/** An auction gavel / row of vessels — for the auctions plate */
export const GlyphAuction: React.FC<Props> = ({ className }) => (
  <Frame className={className}>
    {/* a row of small vessels (chalices) */}
    {[20, 40, 60, 80, 100].map((x, i) => {
      const h = 32 + (i % 3) * 12;
      return (
        <g key={i}>
          <rect x={x - 7} y={92 - h} width="14" height={h - 6} fill="hsl(8 50% 36%)" stroke="hsl(20 30% 14%)" strokeWidth="0.7" />
          <line x1={x - 9} y1={94} x2={x + 9} y2={94} stroke="hsl(20 30% 14%)" strokeWidth="0.7" />
          {i === 4 && <circle cx={x} cy={92 - h - 6} r="2" fill="hsl(45 70% 50%)" />}
        </g>
      );
    })}
    <line x1="8" y1="98" x2="112" y2="98" stroke="hsl(20 30% 14%)" strokeWidth="1" />
  </Frame>
);
