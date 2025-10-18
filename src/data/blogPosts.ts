export interface BlogPostInterface {
  id: number;
  slug: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  author: { name: string; avatar: string };
  date: string;
  readTime: string;
  content?: string;
}

export const samplePosts: BlogPostInterface[] = [
  {
    id: 1,
    title: "How I Built This Website (I Didn't)",
    slug: "how-i-built-this-website",
    summary: "A brutally honest tale of how this sleek portfolio came to life. Featuring: Docker containers, React components, and an AI that codes better than I do.",
    category: "Meta",
    image: "",
    author: { name: "Sujay Sreedhar", avatar: "" },
    date: "2025-10-18",
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

**Frontend:** React, TypeScript, Vite. Tailwind for styling because I'm not writing CSS from scratch. Framer Motion handles all the animations—every hover, every fade, all of it.

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

## Real talk

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

If you're wondering if you can do this too—yeah, you can. This is just how things work now in 2025.

Bugs are probably the AI's fault. Good design choices were definitely mine.

    `
  }
];

export const categories = ['All', 'Meta'];
