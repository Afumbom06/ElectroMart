import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Menu, X, User, Laptop2, Heart } from 'lucide-react';
import { useCartStore } from '../store/cart-store';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Shop', href: '#shop' },
    { name: 'Brands', href: '#brands' },
    { name: 'Features', href: '#features' },
    { name: 'Compare', href: '#compare' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-9 h-9 lg:w-11 lg:h-11">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-600 rounded-2xl shadow-lg shadow-blue-500/40 group-hover:shadow-blue-500/60 transition-shadow" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Laptop2 className="w-5 h-5 lg:w-6 lg:h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white tracking-tight leading-tight">
                TechLaptops
              </span>
              <span className="text-[10px] text-blue-600 dark:text-sky-400 tracking-wider uppercase leading-tight">
                Pro
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors group"
                whileHover={{ y: -2 }}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Hover background */}
                <motion.div
                  className="absolute inset-0 bg-blue-50 dark:bg-blue-950/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="navbar-hover"
                />
                
                {/* Bottom indicator */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2.5 rounded-xl transition-all ${
                isSearchOpen
                  ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-sky-400'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all text-slate-700 dark:text-slate-300 relative group"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            {/* User */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all text-slate-700 dark:text-slate-300"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </motion.button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              className="relative p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-lg"
                  >
                    {totalItems}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-200/50 dark:border-slate-800/50 overflow-hidden"
          >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
              <input
                type="text"
                placeholder="Search for laptops..."
                className="w-full bg-slate-100 dark:bg-slate-900 rounded-2xl px-6 py-3 outline-none text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-neutral-900 dark:text-white py-3 px-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="#account"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="text-neutral-900 dark:text-white py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Account
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
