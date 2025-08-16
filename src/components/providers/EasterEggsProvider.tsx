import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface EasterEggsContextValue {
  showMatrix: boolean;
  showParticles: boolean;
  showGrid: boolean;
  turboGlow: boolean;
  toggleMatrix: () => void;
  toggleParticles: () => void;
  toggleGrid: () => void;
  toggleGlow: () => void;
}

const EasterEggsContext = createContext<EasterEggsContextValue | null>(null);

export const EasterEggsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [showMatrix, setShowMatrix] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [turboGlow, setTurboGlow] = useState(false);

  const toggleMatrix = useCallback(() => setShowMatrix(v => !v), []);
  const toggleParticles = useCallback(() => setShowParticles(v => !v), []);
  const toggleGrid = useCallback(() => setShowGrid(v => !v), []);
  const toggleGlow = useCallback(() => setTurboGlow(v => !v), []);

  // Keyboard shortcuts & Konami code
  useEffect(() => {
    const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    const buffer: string[] = [];

    const handler = (e: KeyboardEvent) => {
      // simple shortcuts
      if (e.key === 'g') toggleGrid();
      if (e.key === 'p') toggleParticles();
      if (e.key === 'm') toggleMatrix();
      if (e.key === 't') toggleGlow();

      buffer.push(e.key);
      if (buffer.length > konami.length) buffer.shift();
      if (buffer.join(',') === konami.join(',')) {
        setTurboGlow(true);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleGrid, toggleMatrix, toggleParticles, toggleGlow]);

  const value = useMemo(() => ({
    showMatrix,
    showParticles,
    showGrid,
    turboGlow,
    toggleMatrix,
    toggleParticles,
    toggleGrid,
    toggleGlow,
  }), [showMatrix, showParticles, showGrid, turboGlow, toggleMatrix, toggleParticles, toggleGrid, toggleGlow]);

  return (
    <EasterEggsContext.Provider value={value}>{children}</EasterEggsContext.Provider>
  );
};

export const useEasterEggs = () => {
  const ctx = useContext(EasterEggsContext);
  if (!ctx) throw new Error('useEasterEggs must be used within EasterEggsProvider');
  return ctx;
};
