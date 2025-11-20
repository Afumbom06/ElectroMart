import { motion } from 'motion/react';
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  const footerLinks = {
    Shop: ['All Laptops', 'Apple', 'Dell', 'HP', 'Lenovo', 'Gaming Laptops'],
    Support: ['Contact Us', 'Shipping Info', 'Returns', 'Warranty', 'FAQ'],
    Company: ['About Us', 'Careers', 'Press', 'Blog', 'Partnerships'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer']
  };

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏' },
    { name: 'Facebook', icon: '📘' },
    { name: 'Instagram', icon: '📷' },
    { name: 'LinkedIn', icon: '💼' },
    { name: 'YouTube', icon: '📺' }
  ];

  return (
    <footer className="relative bg-neutral-900 dark:bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-neutral-800">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-neutral-400">
                Subscribe to our newsletter for exclusive deals and latest product launches
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-neutral-800 rounded-full outline-none focus:ring-2 focus:ring-white/20 transition-all"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-white text-black rounded-full hover:shadow-2xl transition-shadow"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-black">💻</span>
              </div>
              <span className="text-white">LaptopStore</span>
            </div>
            <p className="text-neutral-400 mb-6">
              Your trusted destination for premium laptops from the world's leading brands.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-neutral-400 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>support@laptopstore.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>123 Tech Street, SF, CA 94102</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-neutral-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-neutral-400 text-sm">
            © 2025 LaptopStore. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
                aria-label={social.name}
              >
                <span className="text-lg">{social.icon}</span>
              </motion.a>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3 text-neutral-500 text-xs">
            <span>💳</span>
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>PayPal</span>
            <span>•</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
