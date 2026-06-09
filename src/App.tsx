import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import Blog from './components/sections/Blog';
import FeaturedBlog from './components/sections/FeaturedBlog';
import Spotlight from './components/effects/Spotlight';
import { EasterEggsProvider, useEasterEggs } from './components/providers/EasterEggsProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { cn } from './lib/utils';

const NAV = [
  { id: 'home', label: 'Codex' },
  { id: 'blog', label: 'Folia' },
];

function Shell() {
  const { turboGlow } = useEasterEggs();
  const [activeTab, setActiveTab] = useState<'home' | 'blog'>('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const switchTab = (tab: 'home' | 'blog') => {
    setActiveTab(tab);
    setMobileOpen(false);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleTabSwitch = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (typeof detail === 'string' && (detail === 'home' || detail === 'blog')) {
        switchTab(detail);
      } else if (detail && detail.tab) {
        switchTab(detail.tab);
        if (detail.slug) {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('openArticle', { detail: detail.slug }));
          }, 120);
        }
      }
    };
    window.addEventListener('switchTab', handleTabSwitch);
    return () => window.removeEventListener('switchTab', handleTabSwitch);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <Spotlight />

      {turboGlow && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              'radial-gradient(800px circle at 50% 0%, hsl(var(--gold) / 0.18), transparent 60%)',
          }}
        />
      )}

      {/* Header */}
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-500',
          scrolled
            ? 'backdrop-blur-xl bg-background/80 border-b border-border-subtle'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="container flex items-center justify-between h-20">
          {/* Wordmark — a gold-leaf monogram */}
          <button
            onClick={() => switchTab('home')}
            className="group inline-flex items-center gap-3 text-foreground"
            aria-label="Home"
          >
            <span className="grid place-items-center w-9 h-9 rounded-full border border-gold/40">
              <span className="font-display text-xs uppercase tracking-[0.2em] shimmer">SS</span>
            </span>
            <span className="font-display text-sm uppercase tracking-[0.32em] font-medium">
              sujay<span className="text-primary">.</span>ai
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => switchTab(item.id as 'home' | 'blog')}
                className={cn(
                  'relative px-4 py-2 font-display uppercase text-[11px] tracking-[0.3em] transition-colors duration-300',
                  activeTab === item.id
                    ? 'text-primary'
                    : 'text-foreground-muted hover:text-foreground'
                )}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle size="sm" />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle size="sm" />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="grid place-items-center w-9 h-9 rounded-lg text-foreground hover:bg-background-subtle transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden border-t border-border-subtle bg-background/95 backdrop-blur-xl overflow-hidden"
            >
              <nav className="container py-4 flex flex-col gap-1">
                {NAV.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => switchTab(item.id as 'home' | 'blog')}
                    className={cn(
                      'text-left px-3 py-3 rounded-lg font-display uppercase text-xs tracking-[0.3em] transition-colors',
                      activeTab === item.id
                        ? 'text-primary bg-background-subtle'
                        : 'text-foreground-muted hover:text-foreground hover:bg-background-subtle'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'home' && (
              <>
                <Hero />
                <Experience />
                <Projects />
                <FeaturedBlog />
                <Contact />
              </>
            )}
            {activeTab === 'blog' && <Blog />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border-subtle mt-16">
        <div className="container py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-display uppercase text-[10px] tracking-[0.4em] text-foreground-muted">
            MMXXVI · Sujay Sreedhar
          </p>
          <p className="font-serif italic text-sm text-foreground-subtle">
            Ars longa, vita brevis.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <EasterEggsProvider>
        <Shell />
      </EasterEggsProvider>
    </ThemeProvider>
  );
}

export default App;
