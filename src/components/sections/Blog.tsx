import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import BlogPost from './BlogPost';
import { samplePosts, BlogPostInterface } from '@/data/blogPosts';
import { Dingbat } from '@/components/painted/Ornament';
import Watercolor from '@/components/painted/Watercolor';

const toRoman = (n: number): string => {
  const map: [number, string][] = [[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let r = '';
  for (const [v, s] of map) { while (n >= v) { r += s; n -= v; } }
  return r;
};

const FolioRow: React.FC<{ post: BlogPostInterface; index: number; onClick: () => void }> = ({ post, index, onClick }) => (
  <motion.li
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 1, delay: index * 0.06 }}
  >
    <button onClick={onClick} className="group w-full text-left grid grid-cols-12 gap-x-6 md:gap-x-10 items-baseline py-10 border-b border-[hsl(var(--rule)/0.25)]">
      <span className="col-span-2 plate-no">Folio · {toRoman(index + 1)}</span>
      <span className="col-span-10 md:col-span-8">
        <span className="display text-2xl md:text-4xl ink leading-[1.1] group-hover:text-sienna transition-colors duration-500 text-balance block">
          {post.title}
        </span>
        <span className="font-serif italic text-base ink-soft mt-3 block max-w-2xl text-pretty">
          {post.summary}
        </span>
      </span>
      <span className="hidden md:block md:col-span-2 marginalia text-right">
        {post.date}
      </span>
    </button>
  </motion.li>
);

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const posts = useMemo(
    () => samplePosts.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  useEffect(() => {
    const handle = (event: Event) => setSelectedPost((event as CustomEvent).detail);
    window.addEventListener('openArticle', handle);
    return () => window.removeEventListener('openArticle', handle);
  }, []);

  if (selectedPost) return <BlogPost postId={selectedPost} onBack={() => setSelectedPost(null)} />;

  return (
    <section className="section pt-36 md:pt-48 relative overflow-hidden">
      <div className="pointer-events-none absolute right-[-12%] top-0 w-[520px] h-[520px] opacity-70">
        <Watercolor pigment="gilt" intensity={0.2} className="w-full h-full" />
      </div>
      <div className="pointer-events-none absolute left-[-12%] bottom-10 w-[480px] h-[480px] opacity-60">
        <Watercolor pigment="moss" intensity={0.18} className="w-full h-full" />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-12">
          <aside className="hidden md:flex md:col-span-1 flex-col items-end pt-6">
            <div className="marginalia">Liber Folia</div>
          </aside>

          <div className="col-span-12 md:col-span-11">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <span className="folio">A book of folia</span>
              <h1 className="display mt-8 text-[clamp(2.8rem,8vw,6rem)] ink">
                The writings,
                <br />
                <span className="display-italic gilded">collected.</span>
              </h1>
            </motion.div>

            <motion.ol
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-20 border-t border-[hsl(var(--rule)/0.25)]"
            >
              {posts.map((post, i) => (
                <FolioRow key={post.id} post={post} index={i} onClick={() => setSelectedPost(post.slug)} />
              ))}
            </motion.ol>

            <div className="mt-20 flex justify-center">
              <Dingbat className="w-60 h-7 opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
