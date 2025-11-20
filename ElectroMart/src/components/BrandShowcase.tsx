import { motion } from 'motion/react';
import { brands } from '../store/products';

export function BrandShowcase() {
  return (
    <section id="brands" className="py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-neutral-900 dark:text-white mb-4">
            Trusted by the Best
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Premium laptops from the world's leading technology brands
          </p>
        </motion.div>

        {/* Infinite Scroll Brands */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-50 dark:from-neutral-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-50 dark:from-neutral-950 to-transparent z-10" />
          
          <motion.div
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            className="flex gap-16 py-12"
          >
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="flex items-center gap-4 px-8 py-6 bg-white dark:bg-black rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all min-w-[200px] group-hover:scale-105">
                  <span className="text-4xl">{brand.logo}</span>
                  <span className="text-neutral-900 dark:text-white whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Brand Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { value: '15+', label: 'Premium Brands' },
            { value: '200+', label: 'Laptop Models' },
            { value: '50k+', label: 'Happy Customers' },
            { value: '4.8★', label: 'Average Rating' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-black p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-center hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
            >
              <div className="text-neutral-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
