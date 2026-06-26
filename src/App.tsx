import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import FeaturedBlog from './components/sections/FeaturedBlog';
import Contact from './components/sections/Contact';
import Blog from './components/sections/Blog';
import { EasterEggsProvider } from './components/providers/EasterEggsProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { cn } from './lib/utils';

const NAV = [
  { id: 'home', label: 'Index' },
  { id: 'blog', label: 'Folia' },
];

function Shell() {
  const [activeTab, setActiveTab] = useState<'home' | 'blog'>('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const switchTab = (tab: 'home' | 'blog') => {
    setActiveTab(tab);
    setMobileOpen(false);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
          }, 140);
        }
      }
    };
    window.addEventListener('switchTab', handleTabSwitch);
    return () => window.removeEventListener('switchTab', handleTabSwitch);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Header — a typographic running head, no chrome */}
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-700',
          scrolled
            ? 'bg-[hsl(var(--paper)/0.92)] backdrop-blur-[2px] border-b border-[hsl(var(--rule)/0.25)]'
            : 'bg-transparent'
        )}
      >
        <div className="container flex items-baseline justify-between gap-6 h-16 md:h-20">
          {/* the wordmark, set as a small running title */}
          <button
            onClick={() => switchTab('home')}
            className="display text-2xl ink hover:text-sienna transition-colors duration-300"
            aria-label="Home"
          >
            Sujay <span className="display-italic">Sreedhar</span>
          </button>

          {/* center nav, the folio numbers */}
          <nav className="hidden sm:flex items-baseline gap-8">
            {NAV.map((nav) => (
              <button
                key={nav.id}
                onClick={() => switchTab(nav.id as 'home' | 'blog')}
                className={cn(
                  'relative font-sc text-[0.74rem] tracking-[0.32em] uppercase pb-1 transition-colors duration-300',
                  activeTab === nav.id ? 'text-sienna' : 'ink-faint hover:text-sienna'
                )}
              >
                {nav.label}
                {activeTab === nav.id && (
                  <motion.span
                    layoutId="folio-mark"
                    className="absolute left-0 right-0 -bottom-0.5 h-px"
                    style={{ background: 'hsl(var(--sienna))' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-baseline gap-5">
            <ThemeToggle size="sm" />
            <a
              href="#epistola"
              onClick={(e) => {
                e.preventDefault();
                if (activeTab !== 'home') switchTab('home');
                setTimeout(
                  () => document.getElementById('epistola')?.scrollIntoView({ behavior: 'smooth' }),
                  activeTab !== 'home' ? 200 : 0
                );
              }}
              className="hidden sm:inline-block font-sc text-[0.74rem] tracking-[0.32em] uppercase ink-faint hover:text-sienna transition-colors"
            >
              Write
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              className="sm:hidden ink"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="sm:hidden overflow-hidden border-t border-[hsl(var(--rule)/0.25)] bg-[hsl(var(--paper)/0.95)] backdrop-blur-sm"
            >
              <div className="container py-6 flex flex-col gap-4">
                {NAV.map((nav) => (
                  <button
                    key={nav.id}
                    onClick={() => switchTab(nav.id as 'home' | 'blog')}
                    className={cn(
                      'text-left display text-3xl',
                      activeTab === nav.id ? 'text-sienna' : 'ink hover:text-sienna'
                    )}
                  >
                    {nav.label}
                  </button>
                ))}
                <a
                  href="#epistola"
                  onClick={() => setMobileOpen(false)}
                  className="display text-3xl gilded"
                >
                  Write to me
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'home' ? (
              <>
                <Hero />
                <Experience />
                <Projects />
                <FeaturedBlog />
                <Contact />
              </>
            ) : (
              <Blog />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer — the colophon */}
      <footer className="relative z-10">
        <div className="container py-16 flex flex-col items-center text-center gap-2 border-t border-[hsl(var(--rule)/0.25)]">
          <div className="folio">Colophon</div>
          <p className="font-serif italic ink-soft mt-4 max-w-md text-pretty">
            Set in Cormorant &amp; Garamond. Painted by hand, sent to press in the
            {' '}{new Date().getFullYear()}<sup className="text-xs ml-0.5">th</sup> year of the common reckoning,
            by S. Sreedhar of San Francisco.
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
