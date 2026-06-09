import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import BlogPost from './BlogPost';
import { samplePosts, BlogPostInterface } from '@/data/blogPosts';
import { fadeUpStagger, item, inViewProps } from '@/lib/motion';

const BlogRow: React.FC<{ post: BlogPostInterface; onClick: () => void; index: number }> = ({
  post,
  onClick,
  index,
}) => {
  return (
    <motion.li variants={item}>
      <button
        onClick={onClick}
        className="group w-full text-left grid grid-cols-[auto_1fr_auto] items-baseline gap-6 py-8 border-b border-border last:border-b-0
                   hover:bg-gradient-to-r hover:from-transparent hover:via-primary/[0.05] hover:to-transparent
                   transition-colors duration-500"
      >
        <span className="font-mono text-xs text-foreground-subtle tabular-nums tracking-widest">
          0{index + 1}
        </span>

        <div className="min-w-0">
          <div className="font-display uppercase tracking-[0.04em] text-2xl md:text-4xl font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
            {post.title}
          </div>
          <div className="mt-2 font-serif italic text-sm md:text-base text-foreground-muted">
            {post.summary}
          </div>
          <div className="mt-3 flex items-center gap-3 label-mono">
            <span>{post.date}</span>
            <span className="h-px w-6 bg-current opacity-40" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <ArrowUpRight
          className="w-5 h-5 text-foreground-subtle transition-all duration-500
                     group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>
    </motion.li>
  );
};

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const posts = useMemo(() => {
    return samplePosts
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  useEffect(() => {
    const handleOpenArticle = (event: Event) => {
      setSelectedPost((event as CustomEvent).detail);
    };
    window.addEventListener('openArticle', handleOpenArticle);
    return () => window.removeEventListener('openArticle', handleOpenArticle);
  }, []);

  if (selectedPost) {
    return <BlogPost postId={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <>
      <Section eyebrow="Folia" title="Writing." align="center" />

      <div className="container max-w-3xl">
        <motion.ul {...inViewProps} variants={fadeUpStagger(0, 0.1)} className="pb-32">
          {posts.map((post, i) => (
            <BlogRow
              key={post.id}
              post={post}
              index={i}
              onClick={() => setSelectedPost(post.slug)}
            />
          ))}
        </motion.ul>
      </div>
    </>
  );
};

export default Blog;
