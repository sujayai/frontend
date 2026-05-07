import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { inViewProps, slideInLeft, slideInRight } from '@/lib/motion';

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:support@sujay.ai?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoLink;
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error opening email client:', error);
      alert('Error opening email client. Please email support@sujay.ai directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/sujaysreedharg' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/sujaysreedharg' },
    { icon: XIcon, label: 'X', url: 'https://x.com/sujay_sreedhar' },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something."
      subtitle="Open to consulting, infrastructure design reviews, and conversations about networking for AI training. Best way to reach me is email."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Form */}
        <motion.div
          {...inViewProps}
          variants={slideInLeft}
          className="lg:col-span-7"
        >
          <form onSubmit={handleSubmit} className="surface p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="label-mono text-[10px] block mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="email" className="label-mono text-[10px] block mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="label-mono text-[10px] block mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
                placeholder="What's this about?"
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="message" className="label-mono text-[10px] block mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Tell me about your project, idea, or just say hello."
                required
                rows={6}
                className="input-field resize-none"
              />
            </div>
            <div className="pt-2 flex items-center justify-between">
              <p className="text-xs text-foreground-subtle">
                This opens your email client with the message pre-filled.
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting} className="group">
                {isSubmitting ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          {...inViewProps}
          variants={slideInRight}
          className="lg:col-span-5 space-y-5"
        >
          {/* Direct contact */}
          <div className="surface p-6">
            <div className="label-mono text-[10px] mb-4">Direct</div>
            <a
              href="mailto:support@sujay.ai"
              className="flex items-center gap-3 group"
            >
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-background-subtle border border-border-subtle text-foreground-muted group-hover:text-foreground group-hover:border-border transition-colors">
                <Mail className="w-4 h-4" strokeWidth={1.75} />
              </span>
              <div>
                <div className="text-foreground font-medium">support@sujay.ai</div>
                <div className="text-xs text-foreground-muted">Best way to reach me</div>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-foreground-subtle opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>

            <div className="my-5 h-px bg-border-subtle" />

            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-background-subtle border border-border-subtle text-foreground-muted">
                <MapPin className="w-4 h-4" strokeWidth={1.75} />
              </span>
              <div>
                <div className="text-foreground font-medium">San Francisco, CA</div>
                <div className="text-xs text-foreground-muted">Pacific time</div>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="surface p-6">
            <div className="label-mono text-[10px] mb-4">Elsewhere</div>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center gap-2 px-3 h-10 rounded-lg border border-border-subtle bg-background-subtle text-foreground-muted hover:text-foreground hover:border-border transition-colors text-sm"
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="surface p-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-50 animate-ping-soft" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <div>
                <div className="text-foreground font-medium text-sm">
                  Available for projects
                </div>
                <div className="text-xs text-foreground-muted">
                  Currently accepting consulting work
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </Section>
  );
};

export default Contact;
