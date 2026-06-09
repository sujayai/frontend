import React from 'react';

/**
 * Decorative drifting pigment blobs — Renaissance palette.
 * Vermillion, gold-leaf, ultramarine. Heavy blur, slow drift.
 */
const Aurora: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`aurora ${className}`} aria-hidden="true">
      <div
        className="aurora-blob animate-blob-drift"
        style={{
          left: '-8%',
          top: '5%',
          width: 560,
          height: 560,
          background: 'radial-gradient(circle at 30% 30%, hsl(12 65% 50%), transparent 60%)',
          animationDelay: '0s',
        }}
      />
      <div
        className="aurora-blob animate-blob-drift"
        style={{
          right: '-6%',
          top: '12%',
          width: 640,
          height: 640,
          background: 'radial-gradient(circle at 70% 30%, hsl(41 75% 55%), transparent 60%)',
          animationDelay: '-7s',
        }}
      />
      <div
        className="aurora-blob animate-blob-drift"
        style={{
          left: '30%',
          top: '-12%',
          width: 520,
          height: 520,
          background: 'radial-gradient(circle at 50% 50%, hsl(222 70% 40%), transparent 60%)',
          animationDelay: '-14s',
        }}
      />
    </div>
  );
};

export default Aurora;
