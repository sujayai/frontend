import { useEffect, useState } from 'react';
import MatrixBackground from './components/effects/MatrixBackground';
import ParticleField from './components/effects/ParticleField';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import Blog from './components/sections/Blog';
import FeaturedBlog from './components/sections/FeaturedBlog';
import { EasterEggsProvider, useEasterEggs } from './components/providers/EasterEggsProvider';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';

function Effects() {
  const { showMatrix, showParticles } = useEasterEggs();
  return (
    <>
      {showMatrix && <MatrixBackground />}
      {showParticles && <ParticleField />}
    </>
  );
}

function Shell() {
  const { showGrid } = useEasterEggs();
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    // Ensure we land at the top of the new view
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      
      if (mobileMenu && mobileMenuButton && 
          !mobileMenu.contains(event.target as Node) && 
          !mobileMenuButton.contains(event.target as Node)) {
        setMobileMenuOpen(false);
        mobileMenu.classList.add('hidden');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen for custom tab switch events
  useEffect(() => {
    const handleTabSwitch = (event: CustomEvent) => {
      const detail = event.detail;
      if (typeof detail === 'string') {
        // Simple tab switch
        switchTab(detail);
      } else if (detail && detail.tab) {
        // Tab switch with additional data (like article slug)
        switchTab(detail.tab);
        // If there's a slug, dispatch another event to open that article
        if (detail.slug) {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('openArticle', { detail: detail.slug }));
          }, 100);
        }
      }
    };

    window.addEventListener('switchTab', handleTabSwitch as EventListener);
    return () => window.removeEventListener('switchTab', handleTabSwitch as EventListener);
  }, []);
  
  const navigation = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'blog', label: 'Blog', href: '#blog' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 transition-colors duration-300 relative overflow-x-hidden">
      <div className="mesh-bg fixed inset-0 z-0" />
      {showGrid && <div className="absolute inset-0 cyber-grid z-0" />}
      <Effects />

      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-black/30 border-b border-gray-200/80 dark:border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => switchTab('home')}
            className="font-bold text-xl tracking-tight text-gray-900 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-300 transform hover:scale-105"
          >
            sujay<span className="text-emerald-500 dark:text-emerald-400">.ai</span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-8 text-sm text-gray-600 dark:text-gray-300">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => switchTab(item.id)}
                  className={`relative font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                    activeTab === item.id 
                      ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-400/10' 
                      : 'hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-500 dark:bg-emerald-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>
            <ThemeToggle size="sm" />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle size="sm" />
            <button
              id="mobile-menu-button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                  mobileMenu.classList.toggle('hidden');
                }
              }}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className={`md:hidden border-t border-gray-200/80 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-md transition-all duration-300 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    switchTab(item.id);
                  }}
                  className={`text-left py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === item.id 
                      ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-400/10' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {activeTab === 'home' && (
          <>
            <Hero />
            
            
            
            <Experience />
            <FeaturedBlog />
            <Projects />
            <Contact />
          </>
        )}
        
        {activeTab === 'projects' && (
          <div id="projects" className="carousel-3d"><Projects /></div>
        )}
        
        {activeTab === 'blog' && (
          <div id="blog"><Blog /></div>
        )}
        
        {activeTab === 'experience' && (
          <div id="experience"><Experience /></div>
        )}
        
        {activeTab === 'contact' && (
          <div id="contact"><Contact /></div>
        )}
      </main>

      <footer className="relative z-10 py-8 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200/80 dark:border-white/10">
        <div className="container mx-auto px-6">
          <p className="text-sm">&copy; 2024 Sujay. Built with React, TypeScript, and cutting-edge web technologies.</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Hotkeys: g=grid, m=matrix, p=particles, t=glow, c=confetti, Konami=turbo</p>
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
