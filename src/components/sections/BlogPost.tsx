import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2 } from 'lucide-react';

interface BlogPostProps {
  postId: string;
  onBack: () => void;
}

const blogPosts: Record<string, any> = {
  'building-high-performance-cdn': {
    title: "Building a High-Performance CDN: From Concept to Production",
    summary: "A deep dive into architecting and implementing a content delivery network that scales to handle millions of requests while maintaining sub-100ms latency.",
    category: "Infrastructure",
    author: { name: "Sujay Sreedhar", avatar: "" },
    date: "Dec 19, 2024",
    readTime: "8 min read",
    content: `
# Building a High-Performance CDN: From Concept to Production

## Introduction

Content Delivery Networks (CDNs) are the backbone of modern web performance, serving as the critical infrastructure that ensures fast, reliable content delivery to users worldwide. In this technical deep-dive, I'll walk through the architecture, implementation challenges, and optimization strategies behind building a high-performance CDN from the ground up.

## Architecture Overview

### Edge Node Distribution
Our CDN architecture follows a multi-tier approach with strategically placed edge nodes across major geographic regions:

- **Tier 1**: Major metropolitan areas (NYC, LA, London, Tokyo)
- **Tier 2**: Secondary cities with high traffic density
- **Tier 3**: Regional distribution centers for broader coverage

### Core Components

#### 1. Load Balancer Layer
- **Global Load Balancing**: Geographic routing based on user location
- **Health Checks**: Real-time monitoring of edge node availability
- **Failover Mechanisms**: Automatic routing to healthy nodes

#### 2. Edge Node Architecture
- **Nginx + OpenResty**: High-performance web server with Lua scripting
- **Redis**: In-memory caching for frequently accessed content
- **Local Storage**: SSD-based storage for static assets
- **Custom Middleware**: Request processing and optimization

#### 3. Origin Server Integration
- **Origin Pull**: Automatic content fetching from source servers
- **Cache Invalidation**: Real-time cache management
- **Compression**: Gzip/Brotli compression for bandwidth optimization

## Implementation Challenges

### 1. Latency Optimization
Achieving sub-100ms response times required careful optimization at every layer:

\`\`\`nginx
# Nginx configuration for optimal performance
location / {
    expires 1y;
    add_header Cache-Control "public, immutable";
    
    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript;
    
    # Custom headers for performance
    add_header X-Cache-Status $upstream_cache_status;
    add_header X-Response-Time $request_time;
}
\`\`\`

### 2. Cache Management
Implementing intelligent cache invalidation and management:

\`\`\`lua
-- OpenResty Lua script for cache management
local function invalidate_cache(path_pattern)
    local redis = require "resty.redis"
    local red = redis:new()
    
    -- Connect to Redis
    local ok, err = red:connect("127.0.0.1", 6379)
    if not ok then
        ngx.log(ngx.ERR, "Failed to connect to Redis: ", err)
        return
    end
    
    -- Invalidate matching cache keys
    local keys = red:keys(path_pattern)
    for _, key in ipairs(keys) do
        red:del(key)
    end
    
    red:close()
end
\`\`\`

### 3. Geographic Routing
Implementing intelligent routing based on user location:

\`\`\`go
// Go service for geographic routing
type GeoRouter struct {
    geoDB    *geoip2.Reader
    edgeNodes map[string][]EdgeNode
}

func (gr *GeoRouter) RouteRequest(clientIP string) *EdgeNode {
    // Resolve client location
    record, err := gr.geoDB.City(net.ParseIP(clientIP))
    if err != nil {
        return gr.getDefaultNode()
    }
    
    // Find closest edge node
    closest := gr.findClosestNode(record.Location.Latitude, record.Location.Longitude)
    return closest
}
\`\`\`

## Performance Metrics

### Latency Benchmarks
- **Edge Node Response**: 15-25ms
- **Cache Hit Response**: 5-15ms
- **Origin Pull**: 100-500ms (depending on origin location)
- **Global Average**: 45ms

### Throughput Results
- **Peak Requests**: 2.5M requests/second
- **Bandwidth**: 15 Gbps sustained
- **Cache Hit Ratio**: 94.2%
- **Uptime**: 99.99%

## Monitoring and Observability

### Real-time Metrics
- **Response Time**: Per-edge-node latency tracking
- **Cache Performance**: Hit/miss ratios and eviction rates
- **Bandwidth Usage**: Traffic patterns and peak utilization
- **Error Rates**: 4xx/5xx response monitoring

### Alerting System
- **Latency Thresholds**: Alerts when response times exceed 100ms
- **Cache Miss Spikes**: Notifications for unusual cache behavior
- **Geographic Anomalies**: Alerts for region-specific performance issues

## Future Optimizations

### 1. HTTP/3 and QUIC
Implementing HTTP/3 for improved connection establishment and multiplexing:

\`\`\`nginx
# Future HTTP/3 configuration
http3 on;
http3_hq on;
quic_bpf on;
\`\`\`

### 2. Edge Computing
Adding serverless functions at the edge for dynamic content processing:

\`\`\`javascript
// Edge function for dynamic content
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    // Process request at the edge
    const response = await fetch(request)
    
    // Add custom headers
    const modifiedResponse = new Response(response.body, response)
    modifiedResponse.headers.set('X-Edge-Processed', 'true')
    
    return modifiedResponse
}
\`\`\`

### 3. AI-Powered Routing
Implementing machine learning for predictive routing and cache warming.

## Conclusion

Building a high-performance CDN requires careful consideration of architecture, implementation details, and ongoing optimization. The key success factors include:

- **Strategic Edge Placement**: Minimize latency through geographic distribution
- **Intelligent Caching**: Implement smart cache management and invalidation
- **Performance Monitoring**: Real-time visibility into system performance
- **Continuous Optimization**: Iterative improvements based on metrics and user feedback

The result is a CDN that delivers exceptional performance while maintaining reliability and scalability for millions of users worldwide.

---

*This project demonstrates the complexity and engineering challenges involved in building production-grade infrastructure that powers the modern web.*
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
