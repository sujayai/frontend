import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import BlogPost from './BlogPost';
import { samplePosts, BlogPostInterface, categories } from '@/data/blogPosts';

const BlogCard: React.FC<{ post: BlogPostInterface; index: number; onClick: () => void }> = ({ post, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className="group"
    >
      <Card className="h-full card-blur blog-card-hover blog-card group cursor-pointer overflow-hidden border-0 transform transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20" onClick={onClick}>
        <div className="relative overflow-hidden">
          <div className="w-full h-48 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-emerald-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
            <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">{post.category === 'AI' ? '🤖' : post.category === 'Quantum' ? '⚛️' : post.category === 'Space' ? '🚀' : post.category === 'Blockchain' ? '⛓️' : '💻'}</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-xs font-semibold text-white shadow-lg">
              {post.category}
            </span>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-all duration-300">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
            {post.summary}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                {post.author.name.charAt(0)}
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{post.author.name}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-500/10 p-2 group-hover:scale-110 transition-all duration-300">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filteredPosts = selectedCategory === 'All' 
      ? samplePosts 
      : samplePosts.filter(post => post.category === selectedCategory);
    
    // Apply search filter
    if (searchTerm) {
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort by date (newest first) and then slice
    const sortedPosts = filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPosts(sortedPosts.slice(0, visiblePosts));
  }, [visiblePosts, selectedCategory, searchTerm]);

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + 3, samplePosts.length));
      setLoading(false);
    }, 800);
  };

  // Show individual blog post
  if (selectedPost) {
    return (
      <BlogPost 
        postId={selectedPost} 
        onBack={() => setSelectedPost(null)} 
      />
    );
  }

  return (
    <section id="blog-section" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 blog-header"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient">Technical Blog</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Deep technical insights on supercomputing, AI infrastructure, and cutting-edge engineering solutions
          </p>
        </motion.div>

        {/* Search Section - Mobile First */}
        <div className="lg:hidden mb-8 search-section-mobile">
          <Card className="card-blur">
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
                <Search className="w-5 h-5 mr-2 text-emerald-500" />
                Search Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search technical topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors duration-300 dark:bg-white/5 dark:border-white/10 dark:text-white"
                />
                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1 order-2 lg:order-1">
            {/* Category Filter */}
            <div className="mb-8 category-filters">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setVisiblePosts(6);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 button-hover ${
                      selectedCategory === category
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12 blog-grid">
              {posts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  index={index}
                  onClick={() => setSelectedPost(post.slug)}
                />
              ))}
            </div>

            {/* Load More */}
            {visiblePosts < samplePosts.length && (
              <div className="text-center">
                <Button
                  onClick={loadMorePosts}
                  disabled={loading}
                  variant="cyber"
                  size="lg"
                  className="px-8 py-4"
                >
                  {loading ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                      <span>Loading...</span>
                    </span>
                  ) : (
                    'Load More Articles'
                  )}
                </Button>
              </div>
            )}
          </main>

          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block w-80 order-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <Card className="card-blur">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
                    <Search className="w-5 h-5 mr-2 text-emerald-500" />
                    Search Articles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search technical topics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-lg px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-colors duration-300 dark:bg-white/5 dark:border-white/10 dark:text-white"
                    />
                    <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              {/* Popular Topics */}
              <Card className="card-blur">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
                    <Tag className="w-5 h-5 mr-2 text-purple-500" />
                    Popular Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['CDN Architecture', 'Network Performance', 'Edge Computing', 'Load Balancing', 'Cache Management', 'Geographic Routing'].map((topic, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTerm(topic)}
                        className="block w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-white/5 dark:hover:text-emerald-400 transition-all duration-300 text-sm button-hover"
                      >
                        #{topic}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="card-blur border border-emerald-500/20 dark:border-emerald-500/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-emerald-500" />
                    Stay Updated
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    Get the latest technical insights and infrastructure deep-dives delivered directly to your inbox.
                  </p>
                  <Button 
                    variant="neon" 
                    className="w-full"
                    onClick={() => {
                      alert('Thanks for your interest! Newsletter signup functionality will be implemented soon. 📧');
                    }}
                  >
                    Subscribe to Updates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Blog; 
