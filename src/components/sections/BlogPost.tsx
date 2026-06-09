import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { samplePosts } from '@/data/blogPosts';

interface BlogPostProps {
  postId: string;
  onBack: () => void;
}

interface CodeBlockProps {
  lang: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ lang, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="code-block my-8">
      <div className="code-block-header">
        <span className="label-mono text-[10px]">{lang}</span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2 h-7 rounded-md text-xs font-medium text-foreground-muted hover:text-foreground hover:bg-background-subtle transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-5 m-0 text-[13px] leading-[1.7]">
          <code className={`language-${lang}`}>
            {code.split('\n').map((line, lineIndex) => (
              <div key={lineIndex} className="code-line">
                <span className="line-number text-[11px]">{lineIndex + 1}</span>
                <span className="line-content">{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

const renderInline = (text: string): React.ReactNode => {
  // Process bold (**...**), italic (*...*), inline code (`...`)
  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  let buffer = '';

  const flush = () => {
    if (buffer) {
      parts.push(buffer);
      buffer = '';
    }
  };

  while (i < text.length) {
    if (text[i] === '`') {
      const end = text.indexOf('`', i + 1);
      if (end !== -1) {
        flush();
        parts.push(<code key={key++}>{text.slice(i + 1, end)}</code>);
        i = end + 1;
        continue;
      }
    }
    if (text.startsWith('**', i)) {
      const end = text.indexOf('**', i + 2);
      if (end !== -1) {
        flush();
        parts.push(<strong key={key++}>{text.slice(i + 2, end)}</strong>);
        i = end + 2;
        continue;
      }
    }
    if (text[i] === '*' && text[i + 1] !== '*') {
      const end = text.indexOf('*', i + 1);
      if (end !== -1) {
        flush();
        parts.push(<em key={key++}>{text.slice(i + 1, end)}</em>);
        i = end + 1;
        continue;
      }
    }
    buffer += text[i];
    i++;
  }
  flush();
  return parts;
};

const renderContent = (content: string): React.ReactNode => {
  if (!content) return null;

  // Split into code blocks vs other content
  const sections = content.split(/(```[\s\S]*?```)/);

  return sections.map((section, index) => {
    const codeMatch = section.match(/```(\w+)?\n([\s\S]*?)```/);
    if (codeMatch) {
      const lang = codeMatch[1] || 'text';
      const code = codeMatch[2].trimEnd();
      return <CodeBlock key={index} lang={lang} code={code} />;
    }

    if (!section.trim()) return null;

    // Process line by line: headings, lists, paragraphs, hr
    const lines = section.split('\n');
    const elements: React.ReactNode[] = [];
    let listBuf: string[] = [];
    let listType: 'ul' | 'ol' | null = null;

    const flushList = () => {
      if (listBuf.length === 0) return;
      const items = listBuf.map((l, k) => <li key={k}>{renderInline(l)}</li>);
      elements.push(
        listType === 'ol' ? (
          <ol key={`list-${elements.length}`}>{items}</ol>
        ) : (
          <ul key={`list-${elements.length}`}>{items}</ul>
        )
      );
      listBuf = [];
      listType = null;
    };

    for (let li = 0; li < lines.length; li++) {
      const raw = lines[li];
      const line = raw.trimEnd();

      if (!line.trim()) {
        flushList();
        continue;
      }

      if (line.startsWith('# ')) {
        flushList();
        elements.push(<h1 key={`h1-${li}`}>{renderInline(line.slice(2))}</h1>);
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(<h2 key={`h2-${li}`}>{renderInline(line.slice(3))}</h2>);
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(<h3 key={`h3-${li}`}>{renderInline(line.slice(4))}</h3>);
      } else if (line.startsWith('---')) {
        flushList();
        elements.push(<hr key={`hr-${li}`} />);
      } else if (line.match(/^\s*-\s+/)) {
        if (listType === 'ol') flushList();
        listType = 'ul';
        listBuf.push(line.replace(/^\s*-\s+/, ''));
      } else if (line.match(/^\s*\d+\.\s+/)) {
        if (listType === 'ul') flushList();
        listType = 'ol';
        listBuf.push(line.replace(/^\s*\d+\.\s+/, ''));
      } else {
        flushList();
        elements.push(<p key={`p-${li}`}>{renderInline(line)}</p>);
      }
    }
    flushList();

    return <div key={index}>{elements}</div>;
  });
};

const formatDate = (date: string): string => {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return date;
  }
};

const BlogPost: React.FC<BlogPostProps> = ({ postId, onBack }) => {
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const post = samplePosts.find((p) => p.slug === postId);

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [postId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Post not found
          </h1>
          <p className="mt-3 text-foreground-muted">
            We couldn't find that article.
          </p>
          <Button onClick={onBack} variant="outline" className="mt-6">
            <ArrowLeft className="w-4 h-4" />
            Back to writing
          </Button>
        </div>
      </div>
    );
  }

  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;

  return (
    <div className="relative">
      {/* Reading progress */}
      <div
        className="fixed top-16 left-0 right-0 h-px z-30"
        style={{
          background: `linear-gradient(to right, hsl(var(--primary)) ${readProgress}%, transparent ${readProgress}%)`,
        }}
        aria-hidden="true"
      />

      <article className="container max-w-3xl py-12 md:py-16">
        {/* Back link */}
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="mb-10 -ml-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to writing
        </Button>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-2">
            <span className="chip chip-primary">{post.category}</span>
            <span className="text-foreground-subtle text-xs">·</span>
            <span className="label-mono text-[10px]">{post.readTime}</span>
          </div>
          <h1 className="mt-6 font-display uppercase tracking-[0.02em] text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.05] text-balance">
            {post.title}
          </h1>
          <p className="mt-6 font-serif italic text-lg md:text-xl text-foreground-muted leading-relaxed text-pretty">
            {post.summary}
          </p>

          <div className="mt-10 pb-8 border-b border-border-subtle flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-10 h-10 rounded-full bg-foreground text-background font-mono font-bold">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-foreground font-medium text-sm">
                  {post.author.name}
                </div>
                <div className="text-xs text-foreground-muted">
                  {formatDate(post.date)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={shareTwitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="grid place-items-center w-9 h-9 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-subtle transition-colors"
              >
                <Twitter className="w-4 h-4" strokeWidth={1.75} />
              </a>
              <a
                href={shareLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="grid place-items-center w-9 h-9 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-subtle transition-colors"
              >
                <Linkedin className="w-4 h-4" strokeWidth={1.75} />
              </a>
              <button
                onClick={handleCopy}
                aria-label="Copy link"
                className="grid place-items-center w-9 h-9 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-subtle transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" strokeWidth={1.75} />}
              </button>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="prose-codex"
        >
          {renderContent(post.content || '')}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-10 border-t border-border-subtle"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="label-mono text-[10px] mb-2">Share</div>
              <div className="flex items-center gap-2">
                <a
                  href={shareTwitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 h-9 rounded-lg border border-border-subtle bg-background-subtle text-sm text-foreground-muted hover:text-foreground hover:border-border transition-colors"
                >
                  <Twitter className="w-4 h-4" /> X
                </a>
                <a
                  href={shareLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 h-9 rounded-lg border border-border-subtle bg-background-subtle text-sm text-foreground-muted hover:text-foreground hover:border-border transition-colors"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-3 h-9 rounded-lg border border-border-subtle bg-background-subtle text-sm text-foreground-muted hover:text-foreground hover:border-border transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy link'}
                </button>
              </div>
            </div>

            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4" />
              All writing
            </Button>
          </div>
        </motion.footer>
      </article>
    </div>
  );
};

export default BlogPost;
