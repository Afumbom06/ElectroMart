import { motion } from 'motion/react';
import { laptops } from '../store/products';
import { ProductCard } from './ProductCard';
import { useState } from 'react';

export function ProductShowcase() {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filters = ['all', 'Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Microsoft', 'Razer'];

  let filteredLaptops = filter === 'all' 
    ? laptops 
    : laptops.filter(laptop => laptop.brand === filter);

  // Sort laptops
  filteredLaptops = [...filteredLaptops].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <section id="shop" className="py-24 bg-white dark:bg-black">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-neutral-900 dark:text-white mb-4">
            Discover Your Perfect Laptop
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Browse our curated collection of premium laptops designed for every need
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-6"
        >
          {/* Brand Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((brand) => (
              <motion.button
                key={brand}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(brand)}
                className={`px-6 py-3 rounded-full transition-all ${
                  filter === brand
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-black'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                {brand === 'all' ? 'All Laptops' : brand}
              </motion.button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-neutral-600 dark:text-neutral-400 text-sm">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-full outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLaptops.map((laptop, index) => (
            <ProductCard key={laptop.id} laptop={laptop} index={index} />
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
          >
            Load More Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
