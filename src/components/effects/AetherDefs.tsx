import React from 'react';

/**
 * Global SVG filter defs. The displacement filter is referenced by the
 * `.glass-refract` class (backdrop-filter: url(#aether-refract)) to warp
 * whatever sits behind the glass — real refraction, not a fake highlight.
 *
 * Rendered once, near the root, hidden.
 */
const AetherDefs: React.FC = () => (
  <svg
    aria-hidden="true"
    width="0"
    height="0"
    style={{ position: 'absolute', pointerEvents: 'none' }}
  >
    <defs>
      <filter id="aether-refract" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.009 0.012"
          numOctaves="2"
          seed="7"
          result="noise"
        >
          {/* breathe the turbulence very slowly so the glass feels liquid */}
          <animate
            attributeName="baseFrequency"
            dur="24s"
            values="0.009 0.012; 0.013 0.008; 0.009 0.012"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feGaussianBlur in="noise" stdDeviation="1.5" result="softNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softNoise"
          scale="10"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

export default AetherDefs;
