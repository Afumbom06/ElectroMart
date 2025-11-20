import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { useRef, useState } from 'react';
import { VideoModal } from './VideoModal';
import laptopImage from '../assets/laptop.png';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3], [0.2, 0]);

  return (
    <>
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div id="home" ref={containerRef} className="relative h-screen overflow-hidden">
        {/* Background with gradients and patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900" />
        
        {/* Background Video */}
        <motion.div 
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 z-0"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className="w-full h-full object-cover"
            style={{ 
              filter: 'brightness(0.4) saturate(1.4) contrast(1.2)',
              transform: 'scale(1.1)'
            }}
          >
            <source 
              src="https://cdn.coverr.co/videos/coverr-close-up-of-a-laptop-keyboard-6008/1080p.mp4" 
              type="video/mp4" 
            />
          </video>
          {/* Video Overlay with stronger blue tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/30 via-white/90 to-white dark:from-blue-900/50 dark:via-slate-900/95 dark:to-slate-900" />
        </motion.div>
        
        {/* Animated radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.2),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.4),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.3),transparent_40%)]" />
        
        {/* Animated mesh grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e920_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e920_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        
        {/* Floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />

      <motion.div style={{ y, opacity }} className="relative h-full z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-full">
          <div className="grid lg:grid-cols-2 gap-12 h-full items-center pt-20 lg:pt-0">
            {/* Left Content */}
            <div className="space-y-8 relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-sky-200/50 dark:border-sky-500/30 shadow-lg shadow-sky-500/10">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                  <span className="text-slate-700 dark:text-slate-200 text-sm">
                    New 2025 Models Available
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <h1 className="text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                  <span className="block">The Future of</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 dark:from-blue-400 dark:via-sky-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    Premium Computing
                  </span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 max-w-lg text-lg leading-relaxed">
                  Discover cutting-edge laptops from the world's leading brands. 
                  Engineered for performance. Designed for excellence.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="group px-8 py-4 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-full hover:bg-white dark:hover:bg-slate-900/80 transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Watch Demo</span>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200 dark:border-slate-800"
              >
                {[
                  { label: 'Laptop Models', value: '200+' },
                  { label: 'Top Brands', value: '15+' },
                  { label: 'Happy Customers', value: '50k+' }
                ].map((stat, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-slate-900 dark:text-white">{stat.value}</div>
                    <div className="text-slate-600 dark:text-slate-400 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - Laptop Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 60 }}
              className="h-[500px] lg:h-[700px] relative hidden lg:block"
            >
              {/* Animated Glow Effects */}
              <motion.div
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/30 via-sky-500/30 to-cyan-500/30 rounded-full blur-[120px]"
              />
              
              {/* Laptop Image Container */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative h-full flex items-center justify-center z-10"
              >
                <div className="relative w-full h-full max-w-[700px] px-4">
                  <img
                    src={laptopImage}
                    alt="Premium Gaming Laptop"
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen"
                    style={{
                      filter: 'drop-shadow(0 25px 50px rgba(14,165,233,0.4)) drop-shadow(0 10px 30px rgba(6,182,212,0.3))',
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center pt-2 backdrop-blur-sm bg-white/10 dark:bg-slate-900/10"
          >
            <motion.div 
              className="w-1 h-2 bg-blue-500 dark:bg-sky-400 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
