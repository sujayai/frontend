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
  
  const navigation = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'blog', label: 'Blog', href: '#blog' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="mesh-bg" />
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
            
            {/* Featured Writings - Positioned prominently after Hero */}
            <section className="py-16 relative bg-gradient-to-br from-emerald-50/50 via-blue-50/30 to-purple-50/50 dark:from-emerald-950/20 dark:via-blue-950/10 dark:to-purple-950/20" id="writings">
              <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full border border-emerald-500/20 mb-6">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">Research & Insights</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    <span className="text-gradient">Research & Development</span>
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Deep dives into AI infrastructure, content delivery networks, and machine learning systems
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {[
                    {
                      title: "Content Delivery Networks at Scale",
                      excerpt: "Building tenant-isolated CDN infrastructure using Linux, Docker, and virtualization",
                      category: "Infrastructure",
                      readTime: "8 min",
                      impact: "Multi-tenant isolation",
                      icon: "🌐"
                    },
                    {
                      title: "Machine Learning Deployment Patterns",
                      excerpt: "Containerized ML models with automated deployment on cloud platforms",
                      category: "ML Engineering",
                      readTime: "12 min", 
                      impact: "Automated deployment",
                      icon: "🤖"
                    },
                    {
                      title: "Time Series Forecasting with Prophet",
                      excerpt: "Advanced forecasting techniques for COVID-19 and business applications",
                      category: "Data Science",
                      readTime: "15 min",
                      impact: "Predictive analytics",
                      icon: "📊"
                    }
                  ].map((article, index) => (
                    <div key={index} className="group cursor-pointer" onClick={() => switchTab('blog')}>
                      <div className="card-blur rounded-2xl p-6 h-full border-2 border-transparent hover:border-emerald-400/30 transition-all duration-500 relative overflow-hidden">
                        {/* Subtle background pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="text-3xl">{article.icon}</div>
                            <span className="px-2 py-1 bg-gradient-to-r from-emerald-500/15 to-blue-500/15 rounded-lg text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                              {article.category}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
                            {article.title}
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                            {article.excerpt}
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500 dark:text-gray-400">{article.readTime} read</span>
                              <span className="font-medium text-emerald-600 dark:text-emerald-400">{article.impact}</span>
                            </div>
                            <div className="h-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={() => switchTab('blog')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <span>Explore All Research</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>
            
            <section className="py-10">
              <div className="marquee">
                <div className="marquee__track">
                  {['CUDA','NCCL','InfiniBand','Kubernetes','vLLM','TPU','NVLink','RoCE','Mellanox','TensorRT','RDMA','gRPC'].flatMap((t,i)=>[
                    <span key={i} className="px-4 py-2 text-sm rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300">{t}</span>,
                    <span key={`d_${i}`} className="px-4 py-2 text-sm rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300">{t}</span>
                  ])}
                </div>
              </div>
            </section>
            
            <FeaturedBlog />
            <Projects />
            <Experience />
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
