import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/sections/Hero';
import Manifesto from './components/sections/Manifesto';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import FeaturedBlog from './components/sections/FeaturedBlog';
import Contact from './components/sections/Contact';
import Blog from './components/sections/Blog';
import Void from './components/effects/Void';
import AetherDefs from './components/effects/AetherDefs';
import { EasterEggsProvider } from './components/providers/EasterEggsProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { cn } from './lib/utils';

const NAV = [
  { id: 'home', label: 'Index' },
  { id: 'blog', label: 'Writing' },
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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
    <div className="relative min-h-screen text-[hsl(var(--fg))] antialiased">
      <Void />
      <AetherDefs />

      {/* Floating glass nav */}
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4">
        <motion.header
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'mt-4 w-full max-w-3xl rounded-full transition-all duration-500',
            scrolled ? 'glass glass-specular' : ''
          )}
        >
          <div className="flex items-center justify-between gap-4 pl-5 pr-3 h-14">
            <button
              onClick={() => switchTab('home')}
              className="inline-flex items-center gap-2.5 group"
              aria-label="Home"
            >
              <span className="relative grid place-items-center w-7 h-7">
                <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent))] blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-[hsl(var(--fg))]" />
              </span>
              <span className="font-medium tracking-tight text-[hsl(var(--fg))]">
                sujay<span className="text-faint">.ai</span>
              </span>
            </button>

            <nav className="hidden sm:flex items-center gap-1">
              {NAV.map((nav) => (
                <button
                  key={nav.id}
                  onClick={() => switchTab(nav.id as 'home' | 'blog')}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-sm transition-colors duration-300',
                    activeTab === nav.id ? 'text-[hsl(var(--fg))]' : 'text-faint hover:text-[hsl(var(--fg))]'
                  )}
                >
                  {nav.label}
                  {activeTab === nav.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <ThemeToggle size="sm" />
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  if (activeTab !== 'home') switchTab('home');
                  setTimeout(
                    () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
                    activeTab !== 'home' ? 200 : 0
                  );
                }}
                className="hidden sm:inline-flex items-center h-9 px-4 rounded-full text-sm font-medium bg-[hsl(var(--fg))] text-[hsl(var(--bg))] hover:opacity-90 transition-opacity"
              >
                Contact
              </a>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
                className="sm:hidden grid place-items-center w-9 h-9 rounded-full text-[hsl(var(--fg))]"
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
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="sm:hidden overflow-hidden px-3 pb-3"
              >
                {NAV.map((nav) => (
                  <button
                    key={nav.id}
                    onClick={() => switchTab(nav.id as 'home' | 'blog')}
                    className={cn(
                      'block w-full text-left px-4 py-3 rounded-2xl text-base transition-colors',
                      activeTab === nav.id ? 'text-[hsl(var(--fg))]' : 'text-faint'
                    )}
                  >
                    {nav.label}
                  </button>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-left px-4 py-3 rounded-2xl text-base text-[hsl(var(--accent))]"
                >
                  Contact
                </a>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.header>
      </div>

      {/* Main */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'home' ? (
              <>
                <Hero />
                <Manifesto />
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

      {/* Footer */}
      <footer className="relative z-10">
        <div className="container py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-[hsl(var(--line)/0.1)]">
          <div>
            <div className="font-medium tracking-tight">
              sujay<span className="text-faint">.ai</span>
            </div>
            <p className="mt-2 text-sm text-faint font-light">
              Network fabric for large-scale AI. © {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <button onClick={() => switchTab('home')} className="link-quiet">Index</button>
            <button onClick={() => switchTab('blog')} className="link-quiet">Writing</button>
            <a href="mailto:support@sujay.ai" className="link-quiet">Email</a>
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
