import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight, Mail } from 'lucide-react';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import BlogPost from './BlogPost';
import { samplePosts, BlogPostInterface, categories } from '@/data/blogPosts';
import { fadeUpStagger, item, inViewProps } from '@/lib/motion';

const POSTS_PER_PAGE = 9;

const BlogCard: React.FC<{ post: BlogPostInterface; onClick: () => void }> = ({
  post,
  onClick,
}) => {
  const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.button
      variants={item}
      onClick={onClick}
      onMouseMove={handleMouseMove as React.MouseEventHandler<HTMLButtonElement>}
      className="spotlight surface surface-hover relative text-left overflow-hidden group flex flex-col h-full transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="relative z-[2] p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <span className="chip">{post.category}</span>
          <ArrowUpRight className="w-4 h-4 text-foreground-subtle group-hover:text-foreground transition-colors" />
        </div>

        <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground leading-snug text-balance">
          {post.title}
        </h3>

        <p className="mt-3 text-sm text-foreground-muted leading-relaxed line-clamp-3 flex-1">
          {post.summary}
        </p>

        <div className="mt-6 pt-5 border-t border-border-subtle flex items-center justify-between text-xs text-foreground-subtle">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-6 h-6 rounded-full bg-foreground text-background font-mono font-bold text-[10px]">
              {post.author.name.charAt(0)}
            </span>
            <span className="text-foreground-muted">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{post.date}</span>
            <span className="text-border">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

const Blog: React.FC = () => {
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredPosts = useMemo(() => {
    let posts = selectedCategory === 'All'
      ? samplePosts
      : samplePosts.filter((p) => p.category === selectedCategory);

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return posts.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCategory, searchTerm]);

  const visible = filteredPosts.slice(0, visiblePosts);

  // Listen for openArticle event (from FeaturedBlog deep-link)
  useEffect(() => {
    const handleOpenArticle = (event: Event) => {
      setSelectedPost((event as CustomEvent).detail);
    };
    window.addEventListener('openArticle', handleOpenArticle);
    return () => window.removeEventListener('openArticle', handleOpenArticle);
  }, []);

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      setVisiblePosts((prev) => Math.min(prev + 6, filteredPosts.length));
      setLoading(false);
    }, 400);
  };

  // Show individual blog post
  if (selectedPost) {
    return <BlogPost postId={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <>
      {/* Hero header for blog */}
      <Section
        id="blog"
        eyebrow="Writing"
        title="Notes from the field."
        subtitle="Deep technical posts on AI infrastructure, networking, distributed training, and the engineering reality behind production-scale systems."
        tight
      />

      {/* Search + filter bar */}
      <div className="container">
        <div className="surface p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisiblePosts(POSTS_PER_PAGE);
              }}
              className="w-full pl-10 pr-3 h-10 rounded-lg bg-background-subtle border border-border-subtle text-sm placeholder:text-foreground-subtle focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisiblePosts(POSTS_PER_PAGE);
                }}
                className={`px-3 h-8 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-foreground text-background'
                    : 'bg-background-subtle text-foreground-muted hover:text-foreground hover:bg-background-elevated border border-border-subtle'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <Section tight>
        {visible.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-foreground-muted">
              No articles match{' '}
              <span className="text-foreground font-medium">"{searchTerm}"</span>.
            </p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-4"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <motion.div
            {...inViewProps}
            variants={fadeUpStagger(0, 0.06)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {visible.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onClick={() => setSelectedPost(post.slug)}
              />
            ))}
          </motion.div>
        )}

        {visiblePosts < filteredPosts.length && (
          <div className="mt-12 flex justify-center">
            <Button
              onClick={loadMorePosts}
              disabled={loading}
              variant="outline"
              size="lg"
            >
              {loading ? (
                <>
                  <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Loading
                </>
              ) : (
                'Load more articles'
              )}
            </Button>
          </div>
        )}

        {/* Newsletter card */}
        <motion.div
          {...inViewProps}
          variants={item}
          className="mt-20 surface relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(800px circle at 80% 0%, hsl(var(--primary) / 0.18), transparent 50%)',
            }}
          />
          <div className="relative p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="eyebrow mb-4">Stay updated</div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance">
                Get new posts in your inbox.
              </h3>
              <p className="mt-3 text-foreground-muted text-pretty">
                Occasional posts on AI infrastructure, networking, and the engineering reality
                behind production-scale systems. No spam.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Button
                size="lg"
                onClick={() => setShowSubscribeModal(true)}
                className="group"
              >
                <Mail className="w-4 h-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Subscribe modal */}
      {showSubscribeModal && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={() => setShowSubscribeModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="surface w-full max-w-md p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid place-items-center w-12 h-12 mx-auto rounded-xl bg-primary-subtle text-primary">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
              Coming soon
            </h3>
            <p className="mt-2 text-foreground-muted">
              Newsletter signup isn't live yet. In the meantime, check{' '}
              <a
                href="https://x.com/sujay_sreedhar"
                className="text-primary link-underline"
                target="_blank"
                rel="noreferrer"
              >
                X
              </a>{' '}
              for updates.
            </p>
            <Button onClick={() => setShowSubscribeModal(false)} className="mt-6 w-full">
              Got it
            </Button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Blog;
