import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2 } from 'lucide-react';

interface BlogPostProps {
  postId: string;
  onBack: () => void;
}

const blogPosts: Record<string, any> = {
  'how-i-built-this-website': {
    title: "How I Built This Website (I Didn't)",
    summary: "A brutally honest tale of how this sleek portfolio came to life. Featuring: Docker containers, React components, and an AI that codes better than I do.",
    category: "Meta",
    author: { name: "Sujay Sreedhar", avatar: "" },
    date: "Oct 18, 2025",
    readTime: "5 min read",
    content: `
# How I Built This Website (I Didn't)

## Let's be honest

So you're on this website with all the fancy animations, dark mode, and those green gradients everywhere. There's Docker, Kubernetes, a Go backend—the whole nine yards.

Here's the thing: I wrote this blog post. Everything else? AI coded it.

Yeah, welcome to 2025.

## How it started

Saturday afternoon, needed to update my portfolio. Should've been simple, right? Just throw up some HTML, call it a day.

Instead, I ended up with this full production setup. Why? Because I got curious about what's actually possible when you work with AI tools.

Opened Cursor, started describing what I wanted, and honestly? It was weird at first. You're basically telling something what to build, and it just... builds it. No Stack Overflow tabs, no "why won't this CSS work" moments. Just conversation.

"Make it look modern" turned into a whole design system.
"Add a terminal thing" became an interactive component.
"Make it feel tech-y" got me matrix effects.

It kept going from there.

## What's actually running

**Frontend:** React, TypeScript, Vite. Tailwind for styling because I'm not writing CSS from scratch. Framer Motion handles all the animations: every hover, every fade, all of it.

\`\`\`typescript
// Example: The animated hero section
const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Technical Solutions Engineer</h1>
      {/* Stats, buttons, all animated */}
    </motion.div>
  );
};
\`\`\`

**Backend:** Go with Gin framework. Serves the blog posts, handles uploads, has some basic auth. Compiles to one binary which is nice.

\`\`\`go
// Simple API setup
func main() {
    r := gin.Default()
    
    // Serve blog posts
    r.GET("/api/posts", func(c *gin.Context) {
        c.JSON(200, posts)
    })
    
    // Admin routes with auth
    admin := r.Group("/api/admin")
    admin.Use(AuthMiddleware())
    
    r.Run(":8080")
}
\`\`\`

**Infrastructure:** Docker containers, Kubernetes configs, behind Cloudflare. 

\`\`\`dockerfile
# Multi-stage build keeps it lean
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
\`\`\`

Is it overkill for a personal site? Probably. But it works and I learned a lot watching it come together.

## The process

Started simple: "clean portfolio, show my experience."

Then came the additions. Terminal component. Blog section. Animated stats. Matrix background. Glowing buttons. Custom favicon. 

And yeah, I kept changing my mind. "Center this. Actually move it left. No wait, center it again." You know how it goes.

The AI just kept adjusting. No complaints, no "are you sure about this?" Just made the changes.

That's basically the workflow. Describe what you want, review what it builds, iterate.

## What I learned

Being specific matters. "Make it pretty" doesn't work. "Add an emerald to blue gradient with blur" does.

Modern web dev has a lot of moving parts. Components, state, animations, routing, Docker, Kubernetes. Watching it all come together was educational.

This isn't about replacing developers. It's about working differently. I focused on what to build and why. The AI handled the how.

Building software is changing. It's becoming more about knowing what you want than knowing every syntax detail.

I spent time on UX decisions, content strategy, architecture choices. The AI wrote TypeScript, configured Docker, organized the CSS.

Is that cheating? I don't think so. It's just using available tools.

## Bottom line

This website has:
- Go backend (didn't write it)
- React components (didn't create them)
- Docker containers (didn't configure them)
- Kubernetes setup (didn't build it)
- Cloudflare CDN (okay, I did set that up)

The code is real. The infrastructure works. I just didn't write most of it myself.

\`\`\`yaml
# Kubernetes deployment (AI generated)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sujay-frontend
spec:
  replicas: 2
  template:
    spec:
      containers:
      - name: frontend
        image: sujay-frontend:latest
        ports:
        - containerPort: 80
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: frontend-hpa
spec:
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
\`\`\`

And that's fine. It works, looks decent, shows what I do. How it got built is just an implementation detail.

## Credits

I wrote this blog post. Every word here is mine.

Everything else on the site? Claude coded it. The AI tool in Cursor. It handled all the TypeScript, React, Go, Docker configs, everything.

---

If you're wondering if you can do this too? Sure, yeah, you can. This is just how things work now in 2025.

Bugs are probably the AI's fault. Good design choices were definitely mine.
    `
  }
};

const BlogPost: React.FC<BlogPostProps> = ({ postId, onBack }) => {
  const post = blogPosts[postId];
  
  // Simple content renderer that doesn't get stuck
  const renderContent = (content: string) => {
    if (!content) return null;
    
    // Split content into sections
    const sections = content.split(/(```[\s\S]*?```)/);
    
    return sections.map((section, index) => {
      // Check if this is a code block
      const codeBlockMatch = section.match(/```(\w+)?\n([\s\S]*?)```/);
      
      if (codeBlockMatch) {
        const lang = codeBlockMatch[1] || 'python';
        const code = codeBlockMatch[2].trim();
        
        return (
          <div key={index} className="code-block my-6 rounded-xl border overflow-hidden">
            <div className="code-block-header px-4 py-2 border-b flex items-center justify-between bg-gray-50 dark:bg-gray-800">
              <div className="language-selector flex items-center space-x-2">
                <div className="lang-indicator flex items-center space-x-2 px-2 py-1 rounded text-xs font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                  <span className="lang-icon">
                    {lang === 'python' ? '🐍' : lang === 'c' ? '⚡' : lang === 'cpp' ? '🔧' : lang === 'go' ? '🚀' : lang === 'bash' ? '💻' : lang === 'yaml' ? '📋' : '📄'}
                  </span>
                  <span className="lang-name">{lang.toUpperCase()}</span>
                </div>
              </div>
              <div className="code-actions flex items-center space-x-2">
                <button 
                  className="action-btn copy-btn p-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(code);
                    const btn = event?.target as HTMLElement;
                    if (btn) {
                      const originalHTML = btn.innerHTML;
                      btn.innerHTML = '✓';
                      btn.classList.add('text-green-600');
                      setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.classList.remove('text-green-600');
                      }, 2000);
                    }
                  }}
                  title="Copy code"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
                <button 
                  className="action-btn expand-btn p-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={(e) => {
                    const codeBlock = (e.target as HTMLElement).closest('.code-block');
                    if (codeBlock) {
                      codeBlock.classList.toggle('fullscreen');
                      if (codeBlock.classList.contains('fullscreen')) {
                        document.body.classList.add('code-fullscreen-active');
                      } else {
                        document.body.classList.remove('code-fullscreen-active');
                      }
                    }
                  }}
                  title="Expand"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="code-block-content overflow-x-auto">
              <pre className="p-4 m-0 bg-gray-50 dark:bg-gray-900">
                <code className={`language-${lang} text-sm`}>
                  {code.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex} className="code-line flex">
                      <span className="line-number w-12 text-right pr-4 text-gray-500 select-none border-r border-gray-200 dark:border-gray-700">
                        {lineIndex + 1}
                      </span>
                      <span className="line-content pl-4 flex-1">{line || ' '}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        );
      }
      
      // Regular text content
      if (section.trim()) {
        return (
          <div key={index} className="mb-4">
            {section.split('\n').map((line, lineIndex) => {
              if (!line.trim()) return <br key={lineIndex} />;
              
              // Handle headers
              if (line.startsWith('# ')) {
                return <h1 key={lineIndex} className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">{line.substring(2)}</h1>;
              }
              if (line.startsWith('## ')) {
                return <h2 key={lineIndex} className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">{line.substring(3)}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={lineIndex} className="text-xl font-bold text-emerald-400 mt-8 mb-3">{line.substring(4)}</h3>;
              }
              
              // Handle bold text
              if (line.includes('**')) {
                const processedLine = line
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em class="text-emerald-700 dark:text-emerald-300">$1</em>');
                return <p key={lineIndex} className="mb-4" dangerouslySetInnerHTML={{ __html: processedLine }} />;
              }
              
              // Handle inline code
              if (line.includes('`')) {
                const processedLine = line.replace(/`([^`]+)`/g, '<code class="inline-code bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>');
                return <p key={lineIndex} className="mb-4" dangerouslySetInnerHTML={{ __html: processedLine }} />;
              }
              
              // Regular paragraph
              return <p key={lineIndex} className="mb-4 text-gray-700 dark:text-gray-300">{line}</p>;
            })}
          </div>
        );
      }
      
      return null;
      });
    };

  React.useEffect(() => {
    // Add keyboard support for fullscreen mode
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const fullscreenBlock = document.querySelector('.code-block.fullscreen');
        if (fullscreenBlock) {
          fullscreenBlock.classList.remove('fullscreen');
          document.body.classList.remove('code-fullscreen-active');
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('code-fullscreen-active');
    };
  }, []);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <Button onClick={onBack} variant="cyber">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <Button 
          onClick={onBack} 
          variant="ghost" 
          className="mb-8 text-emerald-400 hover:text-emerald-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-6">
            <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-xs font-semibold text-white">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {post.summary}
          </p>
          
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center text-lg font-bold">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-gray-900 dark:text-white font-medium">{post.author.name}</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">{post.date} • {post.readTime}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-emerald-400"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  // Show feedback
                  const btn = document.activeElement as HTMLElement;

                  btn.textContent = 'Copied!';
                  setTimeout(() => {
                    btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path></svg>';
                  }, 2000);
                }}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-emerald max-w-none blog-content dark:prose-invert"
        >
          {renderContent(post.content)}
        </motion.article>

        {/* Article Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-400">Share this article:</span>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                Twitter
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600">
                LinkedIn
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-500">
                Reddit
              </Button>
            </div>
            
            <Button onClick={onBack} variant="cyber">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default BlogPost;
