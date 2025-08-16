import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';



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
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    setIsSubmitting(true);

    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:support@sujay.ai?subject=${subject}&body=${body}`;
    
    // Open email client
    try {
      window.location.href = mailtoLink;
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Show success message
      alert('Email client opened! If it didn\'t open automatically, please email support@sujay.ai directly.');
    } catch (error) {
      console.error('Error opening email client:', error);
      alert('Error opening email client. Please email support@sujay.ai directly.');
    } finally {
      setIsSubmitting(false);
    }
  };



  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'support@sujay.ai',
      link: 'mailto:support@sujay.ai',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Remote / NC State Alumni',
      link: null,
    },
    {
      icon: Clock,
      label: 'Schedule Call',
      value: 'Book a meeting',
      link: 'https://calendly.com/sujay-sreedhar',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/sujaysreedharg',
      color: 'hover:text-gray-300',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/sujaysreedharg',
      color: 'hover:text-blue-400',
    },
    {
      icon: Twitter,
      label: 'X',
      url: 'https://x.com/sujay_sreedhar',
      color: 'hover:text-gray-200',
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient">Let's Connect</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Interested in collaborating on cutting-edge AI infrastructure projects? 
            Let's discuss how we can push the boundaries together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="card-blur">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Let's Build Something Amazing Together
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Ready to collaborate on cutting-edge AI infrastructure, supercomputing solutions, or innovative engineering projects? Let's connect!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                        Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-colors duration-300 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-colors duration-300 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-gray-700 dark:text-gray-300">
                      Subject *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="What's this about?"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-colors duration-300 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-gray-700 dark:text-gray-300">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell me about your project, collaboration idea, or just say hello!"
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-colors duration-300 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-400 resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="neon" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact methods */}
            <Card className="card-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center group cursor-pointer"
                  >
                  <div className="w-12 h-12 bg-emerald-500/15 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-emerald-500/25 dark:group-hover:bg-emerald-500/30 transition-colors duration-300">
                    <info.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
                    </div>
                    <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{info.label}</div>
                      {info.link ? (
                        <a
                          href={info.link}
                        className="text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                      <div className="text-gray-900 dark:text-white">{info.value}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Social links */}
            <Card className="glass glass-hover">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Follow Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center border transition-all duration-300 bg-gray-100 border-gray-200 hover:border-emerald-500/50 dark:bg-white/5 dark:border-white/10 ${social.color}`}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability status */}
            <Card className="glass glass-hover">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse" />
                  <div>
                    <div className="text-gray-900 dark:text-white font-medium">Available for projects</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Currently accepting new consulting opportunities
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
