import React from 'react';

/**
 * Decorative drifting blurred blobs — sits behind hero / page header.
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
          background: 'radial-gradient(circle at 30% 30%, hsl(244 90% 70%), transparent 60%)',
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
          background: 'radial-gradient(circle at 70% 30%, hsl(280 80% 65%), transparent 60%)',
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
          background: 'radial-gradient(circle at 50% 50%, hsl(220 90% 65%), transparent 60%)',
          animationDelay: '-12s',
        }}
      />
    </div>
  );
};

export default Aurora;
