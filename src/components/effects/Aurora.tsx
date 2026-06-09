import React from 'react';

/**
 * Decorative drifting blurred blobs — sits behind hero / page header.
 * Anthropic-warm palette: clay, kraft, manilla.
 * Pure CSS animation; no JS work per frame.
 */
const Aurora: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`aurora ${className}`} aria-hidden="true">
      <div
        className="aurora-blob animate-blob-drift"
        style={{
          left: '-10%',
          top: '0%',
          width: 520,
          height: 520,
          background: 'radial-gradient(circle at 30% 30%, hsl(15 63% 60%), transparent 60%)',
          animationDelay: '0s',
        }}
      />
      <div
        className="aurora-blob animate-blob-drift"
        style={{
          right: '-5%',
          top: '10%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle at 70% 30%, hsl(25 50% 66%), transparent 60%)',
          animationDelay: '-6s',
        }}
      />
      <div
        className="aurora-blob animate-blob-drift"
        style={{
          left: '30%',
          top: '-10%',
          width: 480,
          height: 480,
          background: 'radial-gradient(circle at 50% 50%, hsl(40 54% 78%), transparent 60%)',
          animationDelay: '-12s',
        }}
      />
    </div>
  );
};

export default Aurora;
