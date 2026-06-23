import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/sections/Hero';
import { TrustStrip, NetworkStory, ComputeStory, StatsStrip } from './components/sections/Story';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import FeaturedBlog from './components/sections/FeaturedBlog';
import Contact from './components/sections/Contact';
import Blog from './components/sections/Blog';
import { EasterEggsProvider, useEasterEggs } from './components/providers/EasterEggsProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { Github, Linkedin, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from './lib/utils';

const NAV = [
  { id: 'home', label: 'Overview' },
  { id: 'blog', label: 'Writing' },
];

const SOCIAL = [
  { icon: Github, href: 'https://github.com/sujaysreedharg', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/sujaysreedharg', label: 'LinkedIn' },
];

function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const sizes = size === 'sm'
    ? { square: 'w-7 h-7 text-xs', text: 'text-sm' }
    : { square: 'w-8 h-8 text-sm', text: 'text-base' };
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={cn(
          'grid place-items-center rounded-md text-white font-display font-bold tracking-tight',
          sizes.square
        )}
        style={{
          background:
            'linear-gradient(135deg, hsl(var(--primary)), hsl(207 100% 30%))',
        }}
      >
        s
      </span>
      <span className={cn('font-display font-semibold tracking-tight text-foreground', sizes.text)}>
        sujay<span className="text-foreground-muted">.ai</span>
      </span>
    </span>
  );
}

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
      {turboGlow && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              'radial-gradient(800px circle at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%)',
          }}
        />
      )}

      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-500',
          scrolled
            ? 'backdrop-blur-xl bg-background/80 border-b border-border-subtle'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="container flex items-center justify-between h-16 md:h-18">
          <button onClick={() => switchTab('home')} className="group" aria-label="Home">
            <Logo />
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((nav) => (
              <button
                key={nav.id}
                onClick={() => switchTab(nav.id as 'home' | 'blog')}
                className={cn(
                  'relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                  activeTab === nav.id
                    ? 'text-foreground'
                    : 'text-foreground-muted hover:text-foreground'
                )}
              >
                {nav.label}
                {activeTab === nav.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 -z-10 rounded-md bg-background-subtle"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid place-items-center w-9 h-9 rounded-md text-foreground-muted hover:text-foreground hover:bg-background-subtle transition-colors"
              >
                <s.icon className="w-4 h-4" strokeWidth={1.75} />
              </a>
            ))}
            <div className="w-px h-5 bg-border mx-1" />
            <ThemeToggle size="sm" />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="ml-2 inline-flex items-center gap-1.5 h-9 px-4 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contact
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle size="sm" />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="grid place-items-center w-9 h-9 rounded-md text-foreground hover:bg-background-subtle transition-colors"
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
                {NAV.map((nav) => (
                  <button
                    key={nav.id}
                    onClick={() => switchTab(nav.id as 'home' | 'blog')}
                    className={cn(
                      'text-left px-3 py-3 rounded-md text-base font-medium transition-colors',
                      activeTab === nav.id
                        ? 'text-foreground bg-background-subtle'
                        : 'text-foreground-muted hover:text-foreground hover:bg-background-subtle'
                    )}
                  >
                    {nav.label}
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
                      className="grid place-items-center w-10 h-10 rounded-md border border-border bg-background-subtle text-foreground-muted hover:text-foreground"
                    >
                      <s.icon className="w-4 h-4" strokeWidth={1.75} />
                    </a>
                  ))}
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="ml-auto inline-flex items-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Contact
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

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
                <TrustStrip />
                <NetworkStory />
                <ComputeStory />
                <StatsStrip />
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

      <footer className="relative z-10 border-t border-border-subtle mt-12">
        <div className="container py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Logo size="sm" />
            <p className="mt-4 text-sm text-foreground-muted max-w-xs">
              Network and infrastructure for large-scale AI training.
            </p>
          </div>
          <div>
            <div className="label-mono mb-4">Explore</div>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => switchTab('home')} className="text-foreground-muted hover:text-foreground transition-colors">Overview</button></li>
              <li><button onClick={() => switchTab('blog')} className="text-foreground-muted hover:text-foreground transition-colors">Writing</button></li>
              <li><a href="#contact" className="text-foreground-muted hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="label-mono mb-4">Elsewhere</div>
            <ul className="space-y-2 text-sm">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-foreground-muted hover:text-foreground transition-colors">
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="mailto:support@sujay.ai" className="text-foreground-muted hover:text-foreground transition-colors">
                  support@sujay.ai
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border-subtle">
          <div className="container py-5 flex items-center justify-between text-xs text-foreground-subtle">
            <span>© {new Date().getFullYear()} Sujay Sreedhar.</span>
            <span className="font-mono">Crafted with React + Vite</span>
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
