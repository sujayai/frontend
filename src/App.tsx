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
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { cn } from './lib/utils';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'blog', label: 'Writing' },
];

const SOCIAL = [
  { icon: Github, href: 'https://github.com/sujaysreedharg', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/sujaysreedharg', label: 'LinkedIn' },
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

  // Track scroll for header treatment
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Custom tab-switch event (used by FeaturedBlog → article deep-link)
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
    <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      {/* Subtle global mouse spotlight */}
      <Spotlight />

      {/* Optional turbo glow easter-egg accent */}
      {turboGlow && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              'radial-gradient(800px circle at 50% 0%, hsl(var(--primary) / 0.15), transparent 60%)',
          }}
        />
      )}

      {/* Header */}
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-xl bg-background/75 border-b border-border-subtle'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => switchTab('home')}
            className="group inline-flex items-center gap-2 text-foreground"
            aria-label="Home"
          >
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-display italic text-base font-semibold">
              s
            </span>
            <span className="font-display text-lg font-medium tracking-tight">
              sujay<span className="text-foreground-muted">.ai</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => switchTab(item.id as 'home' | 'blog')}
                className={cn(
                  'relative px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                  activeTab === item.id
                    ? 'text-foreground'
                    : 'text-foreground-muted hover:text-foreground'
                )}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 -z-10 rounded-md bg-background-subtle"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid place-items-center w-9 h-9 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-subtle transition-colors"
              >
                <s.icon className="w-4 h-4" strokeWidth={1.75} />
              </a>
            ))}
            <div className="w-px h-5 bg-border mx-1" />
            <ThemeToggle size="sm" />
            <a
              href="mailto:support@sujay.ai"
              className="ml-2 inline-flex items-center h-9 px-3.5 text-sm font-medium rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              Get in touch
            </a>
          </div>

          {/* Mobile actions */}
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

        {/* Mobile menu */}
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
                      'text-left px-3 py-3 rounded-lg text-base font-medium transition-colors',
                      activeTab === item.id
                        ? 'text-foreground bg-background-subtle'
                        : 'text-foreground-muted hover:text-foreground hover:bg-background-subtle'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="h-px bg-border my-2" />
                <div className="flex items-center gap-2 px-3 py-2">
                  {SOCIAL.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid place-items-center w-10 h-10 rounded-lg border border-border bg-background-subtle text-foreground-muted hover:text-foreground"
                    >
                      <s.icon className="w-4 h-4" strokeWidth={1.75} />
                    </a>
                  ))}
                  <a
                    href="mailto:support@sujay.ai"
                    className="ml-auto inline-flex items-center h-10 px-4 text-sm font-medium rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors"
                  >
                    Get in touch
                  </a>
                </div>
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
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'home' && (
              <>
                <Hero />
                <Experience />
                <FeaturedBlog />
                <Projects />
                <Contact />
              </>
            )}
            {activeTab === 'blog' && <Blog />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border-subtle mt-24">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <button
                onClick={() => switchTab('home')}
                className="inline-flex items-center gap-2"
              >
                <span className="grid place-items-center w-7 h-7 rounded-md bg-primary text-primary-foreground font-display italic text-sm font-semibold">
                  s
                </span>
                <span className="font-display text-base font-medium tracking-tight">
                  sujay<span className="text-foreground-muted">.ai</span>
                </span>
              </button>
              <p className="mt-3 text-sm text-foreground-muted max-w-md">
                Building the network fabric behind large-scale AI training.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid place-items-center w-9 h-9 rounded-lg border border-border-subtle text-foreground-muted hover:text-foreground hover:border-border transition-colors"
                >
                  <s.icon className="w-4 h-4" strokeWidth={1.75} />
                </a>
              ))}
              <a
                href="mailto:support@sujay.ai"
                className="grid place-items-center px-3 h-9 rounded-lg border border-border-subtle text-sm text-foreground-muted hover:text-foreground hover:border-border transition-colors"
              >
                support@sujay.ai
              </a>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-foreground-subtle">
            <p>© {new Date().getFullYear()} Sujay Sreedhar. All rights reserved.</p>
            <p className="font-mono">
              press <kbd className="px-1.5 py-0.5 rounded bg-background-subtle border border-border-subtle text-foreground-muted">g</kbd> for grid, <kbd className="px-1.5 py-0.5 rounded bg-background-subtle border border-border-subtle text-foreground-muted">t</kbd> for glow
            </p>
          </div>
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
