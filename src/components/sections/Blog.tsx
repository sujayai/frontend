import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BlogPost from './BlogPost';
import { samplePosts, BlogPostInterface } from '@/data/blogPosts';
import { gravitySettle, staggerSlow, inViewProps } from '@/lib/motion';

const BlogRow: React.FC<{ post: BlogPostInterface; onClick: () => void }> = ({ post, onClick }) => (
  <motion.li variants={gravitySettle}>
    <button
      onClick={onClick}
      className="group relative w-full text-left grid grid-cols-[1fr_auto] items-center gap-6 py-10 border-b border-[hsl(var(--line)/0.1)]"
    >
      <span className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 glass" />
      <span className="relative min-w-0">
        <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          <span>{post.category}</span>
          <span className="w-5 h-px hairline" />
          <span>{post.date}</span>
        </span>
        <span className="mt-4 block text-2xl md:text-4xl font-light tracking-tight text-[hsl(var(--fg))] transition-colors duration-300 group-hover:text-aurora text-balance">
          {post.title}
        </span>
        <span className="mt-3 block max-w-2xl text-muted font-light leading-relaxed text-pretty">
          {post.summary}
        </span>
      </span>
      <ArrowUpRight className="relative w-5 h-5 text-faint transition-all duration-500 group-hover:text-[hsl(var(--fg))] group-hover:translate-x-1 group-hover:-translate-y-1" />
    </button>
  </motion.li>
);

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const posts = useMemo(
    () =>
      samplePosts
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  useEffect(() => {
    const handle = (event: Event) => setSelectedPost((event as CustomEvent).detail);
    window.addEventListener('openArticle', handle);
    return () => window.removeEventListener('openArticle', handle);
  }, []);

  if (selectedPost) {
    return <BlogPost postId={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <section className="section pt-40">
      <div className="container">
        <div className="max-w-2xl">
          <span className="eyebrow">Writing</span>
          <h1 className="display mt-6 text-[clamp(2.5rem,7vw,5rem)] text-[hsl(var(--fg))]">
            Notes from
            <br />
            <span className="text-aurora">the field.</span>
          </h1>
        </div>

        <motion.ol
          {...inViewProps}
          variants={staggerSlow(0.1, 0.1)}
          className="mt-16 border-t border-[hsl(var(--line)/0.1)]"
        >
          {posts.map((post) => (
            <BlogRow key={post.id} post={post} onClick={() => setSelectedPost(post.slug)} />
          ))}
        </motion.ol>
      </div>
    </section>
  );
};

export default Blog;
