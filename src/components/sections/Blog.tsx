import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import BlogPost from './BlogPost';
import { samplePosts, BlogPostInterface } from '@/data/blogPosts';
import { fadeUpStagger, item, inViewProps } from '@/lib/motion';

const BlogCard: React.FC<{ post: BlogPostInterface; onClick: () => void }> = ({
  post,
  onClick,
}) => {
  return (
    <motion.button
      variants={item}
      onClick={onClick}
      className="surface surface-hover relative text-left overflow-hidden group flex flex-col h-full p-7"
    >
      <div className="flex items-center justify-between">
        <span className="chip chip-primary">{post.category}</span>
        <ArrowUpRight className="w-4 h-4 text-foreground-subtle group-hover:text-primary transition-colors" />
      </div>

      <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground leading-snug text-balance group-hover:text-primary transition-colors">
        {post.title}
      </h3>

      <p className="mt-3 text-sm text-foreground-muted leading-relaxed line-clamp-3 flex-1">
        {post.summary}
      </p>

      <div className="mt-6 pt-5 border-t border-border-subtle flex items-center justify-between label-mono">
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
    </motion.button>
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
      <Section
        eyebrow="Writing"
        title="Notes from the field."
        subtitle="Posts on AI infrastructure, networking, distributed training, and engineering reality."
        tight
      />

      <div className="container pb-32">
        <motion.div
          {...inViewProps}
          variants={fadeUpStagger(0, 0.08)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={() => setSelectedPost(post.slug)}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Blog;
