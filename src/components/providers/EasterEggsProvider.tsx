import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface EasterEggsContextValue {
  showGrid: boolean;
  turboGlow: boolean;
  toggleGrid: () => void;
  toggleGlow: () => void;
}

const EasterEggsContext = createContext<EasterEggsContextValue | null>(null);

export const EasterEggsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [showGrid, setShowGrid] = useState(false);
  const [turboGlow, setTurboGlow] = useState(false);

  const toggleGrid = useCallback(() => setShowGrid((v) => !v), []);
  const toggleGlow = useCallback(() => setTurboGlow((v) => !v), []);

  // Keyboard shortcuts & Konami code
  useEffect(() => {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const buf: string[] = [];

    const handler = (e: KeyboardEvent) => {
      // Don't trigger easter eggs while typing
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'g') toggleGrid();
      if (e.key === 't') toggleGlow();

      buf.push(e.key);
      if (buf.length > konami.length) buf.shift();
      if (buf.join(',') === konami.join(',')) {
        setTurboGlow(true);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleGrid, toggleGlow]);

  const value = useMemo(
    () => ({ showGrid, turboGlow, toggleGrid, toggleGlow }),
    [showGrid, turboGlow, toggleGrid, toggleGlow]
  );

  return <EasterEggsContext.Provider value={value}>{children}</EasterEggsContext.Provider>;
};

export const useEasterEggs = () => {
  const ctx = useContext(EasterEggsContext);
  if (!ctx) throw new Error('useEasterEggs must be used within EasterEggsProvider');
  return ctx;
};
