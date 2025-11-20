import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, Tag, Truck, CreditCard, Shield, ArrowRight, ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/cart-store';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect, useRef } from 'react';

export function Cart() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Check if scroll indicator should be shown
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const isScrollable = scrollHeight > clientHeight;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
        setShowScrollIndicator(isScrollable && !isAtBottom);
      }
    };

    checkScroll();
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', checkScroll);
    
    return () => container?.removeEventListener('scroll', checkScroll);
  }, [items]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[550px] bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-50 via-sky-50 to-white dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-950">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e910_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e910_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-slate-900 dark:text-white">Shopping Cart</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} • ${getTotalPrice().toLocaleString()}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleCart}
                  className="p-2.5 rounded-xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                </motion.button>
              </div>
            </div>

            {/* Cart Items - Scrollable */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent min-h-0 relative"
            >
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-28 h-28 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-3xl flex items-center justify-center shadow-lg"
                  >
                    <ShoppingBag className="w-14 h-14 text-blue-600 dark:text-sky-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-slate-900 dark:text-white mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Discover amazing laptops and start shopping
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleCart}
                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center gap-2"
                  >
                    <span>Start Shopping</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.cartItemId}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="relative group"
                      >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-800 overflow-hidden">
                          <div className="flex gap-4 p-4">
                            {/* Image */}
                            <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 relative">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                              {/* Discount badge if applicable */}
                              {item.originalPrice && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded-lg flex items-center gap-1">
                                  <Tag className="w-3 h-3" />
                                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                </div>
                              )}
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="min-w-0 flex-1">
                                  <h3 className="text-slate-900 dark:text-white text-sm mb-1 truncate">
                                    {item.name}
                                  </h3>
                                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">
                                    {item.brand}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                      <div 
                                        className="w-3 h-3 rounded-full border-2 border-white dark:border-slate-900"
                                        style={{ 
                                          backgroundColor: item.selectedColor === 'Space Gray' ? '#4B5563' : 
                                                         item.selectedColor === 'Silver' ? '#D1D5DB' :
                                                         item.selectedColor === 'Midnight Blue' ? '#1E3A8A' :
                                                         item.selectedColor === 'Rose Gold' ? '#F9A8D4' : '#9CA3AF'
                                        }}
                                      />
                                      <span className="text-xs text-slate-600 dark:text-slate-400">{item.selectedColor}</span>
                                    </div>
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1, rotate: 10 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeItem(item.cartItemId)}
                                  className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>

                              {/* Specs preview */}
                              <div className="flex flex-wrap gap-1 mb-3">
                                {item.specs && (
                                  <>
                                    <span className="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-md">
                                      {item.specs.processor}
                                    </span>
                                    <span className="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-md">
                                      {item.specs.ram}
                                    </span>
                                  </>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                    className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                                  >
                                    <Minus className="w-3 h-3 text-slate-700 dark:text-slate-300" />
                                  </motion.button>
                                  <span className="text-slate-900 dark:text-white text-sm w-8 text-center">
                                    {item.quantity}
                                  </span>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                    className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                                  >
                                    <Plus className="w-3 h-3 text-slate-700 dark:text-slate-300" />
                                  </motion.button>
                                </div>

                                {/* Price */}
                                <div className="text-right">
                                  <div className="text-slate-900 dark:text-white">
                                    ${(item.price * item.quantity).toLocaleString()}
                                  </div>
                                  {item.originalPrice && item.quantity === 1 && (
                                    <div className="text-xs text-slate-400 line-through">
                                      ${item.originalPrice.toLocaleString()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Scroll Indicator */}
              <AnimatePresence>
                {showScrollIndicator && items.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none flex items-end justify-center pb-4"
                  >
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="flex flex-col items-center gap-1"
                    >
                      <span className="text-xs text-slate-500 dark:text-slate-400">Scroll for more</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-5">
                {/* Benefits */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Truck, text: 'Free Shipping', color: 'text-blue-600 dark:text-blue-400' },
                    { icon: Shield, text: 'Secure Pay', color: 'text-green-600 dark:text-green-400' },
                    { icon: CreditCard, text: 'Easy Returns', color: 'text-purple-600 dark:text-purple-400' }
                  ].map((benefit, index) => (
                    <div key={index} className="text-center">
                      <benefit.icon className={`w-5 h-5 mx-auto mb-1 ${benefit.color}`} />
                      <p className="text-[10px] text-slate-600 dark:text-slate-400">{benefit.text}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                    <span className="text-slate-900 dark:text-white">
                      ${getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Shipping</span>
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Tax</span>
                    <span className="text-slate-900 dark:text-white">
                      ${Math.round(getTotalPrice() * 0.08).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-slate-900 dark:text-white">Total</span>
                    <div className="text-right">
                      <div className="text-slate-900 dark:text-white">
                        ${(getTotalPrice() + Math.round(getTotalPrice() * 0.08)).toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500">
                        Save ${items.reduce((total, item) => {
                          if (item.originalPrice) {
                            return total + ((item.originalPrice - item.price) * item.quantity);
                          }
                          return total;
                        }, 0).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 group"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleCart}
                  className="w-full py-4 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                >
                  Continue Shopping
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
