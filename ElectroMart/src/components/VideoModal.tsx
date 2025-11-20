import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 lg:p-8"
          >
            <div className="relative w-full max-w-5xl">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute -top-12 right-0 lg:-right-12 lg:top-0 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Video Container */}
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <video
                  controls
                  autoPlay
                  className="w-full h-full"
                  poster="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80"
                >
                  <source 
                    src="https://cdn.coverr.co/videos/coverr-laptop-on-a-desk-with-a-view-of-a-city-9142/1080p.mp4" 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center text-white"
              >
                <h3 className="text-white mb-2">Discover Premium Laptops</h3>
                <p className="text-slate-300 text-sm">
                  Watch how our laptops deliver unmatched performance and design excellence
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
