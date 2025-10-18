import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { samplePosts, BlogPostInterface } from '@/data/blogPosts';

const FeaturedBlog: React.FC = () => {
  // Get the most recent blog post by date
  const featuredPost = samplePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const handleReadFullArticle = () => {
    // Dispatch custom event to switch to blog tab and open specific article
    window.dispatchEvent(new CustomEvent('switchTab', { detail: { tab: 'blog', slug: featuredPost.slug } }));
  };

  const handleViewAllArticles = () => {
    // Dispatch custom event to switch to blog tab
    window.dispatchEvent(new CustomEvent('switchTab', { detail: { tab: 'blog' } }));
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient">Latest Insights</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Deep technical insights on supercomputing, AI infrastructure, and cutting-edge engineering solutions
          </p>
        </motion.div>

        {/* Featured Blog Post */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="card-blur blog-card-hover blog-card group cursor-pointer overflow-hidden border-0 transform transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20">
            <div className="relative overflow-hidden">
              <div className="w-full h-64 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-emerald-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <div className="text-8xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                  {featuredPost.category === 'AI' ? '🤖' : featuredPost.category === 'Quantum' ? '⚛️' : featuredPost.category === 'Space' ? '🚀' : featuredPost.category === 'Blockchain' ? '⛓️' : '💻'}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-sm font-semibold text-white shadow-lg">
                  {featuredPost.category}
                </span>
              </div>
            </div>
            
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-all duration-300">
                {featuredPost.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                {featuredPost.summary}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {featuredPost.author.name.charAt(0)}
                  </div>
                  <span className="text-base text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {featuredPost.author.name}
                  </span>
                </div>
                <Button 
                  variant="neon" 
                  size="lg" 
                  className="px-6 py-3 group-hover:scale-105 transition-all duration-300"
                  onClick={handleReadFullArticle}
                >
                  <span className="mr-2">Read Full Article</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Explore more technical insights and infrastructure deep-dives
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-3 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all duration-300"
            onClick={handleViewAllArticles}
          >
            View All Articles
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
