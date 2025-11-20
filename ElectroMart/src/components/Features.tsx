import { motion } from 'motion/react';
import { Truck, Shield, Headphones, RotateCcw, Award, Zap } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free delivery on orders over $500'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your payment information is safe'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated customer support team'
    },
    {
      icon: RotateCcw,
      title: '30-Day Returns',
      description: 'Easy returns within 30 days'
    },
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: 'All products are certified authentic'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Express shipping available'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-neutral-900 dark:text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Experience premium service and quality with every purchase
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-8 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
            >
              <div className="w-14 h-14 bg-neutral-900 dark:bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-white dark:text-black" />
              </div>
              <h3 className="text-neutral-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
