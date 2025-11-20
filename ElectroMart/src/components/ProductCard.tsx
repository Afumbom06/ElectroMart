import { motion } from 'motion/react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Laptop } from '../store/products';
import { useCartStore } from '../store/cart-store';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  laptop: Laptop;
  index: number;
}

export function ProductCard({ laptop, index }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(laptop.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(laptop, selectedColor);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white dark:bg-black rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50 dark:bg-neutral-900">
        <ImageWithFallback
          src={laptop.image}
          alt={laptop.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/10 flex items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="p-4 bg-white dark:bg-black rounded-full shadow-lg"
          >
            <ShoppingCart className="w-5 h-5 text-neutral-900 dark:text-white" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-white dark:bg-black rounded-full shadow-lg"
          >
            <Heart className="w-5 h-5 text-neutral-900 dark:text-white" />
          </motion.button>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {laptop.originalPrice && (
            <div className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
              Save ${laptop.originalPrice - laptop.price}
            </div>
          )}
          {laptop.featured && (
            <div className="px-3 py-1 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full text-sm ml-auto">
              Featured
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Brand & Name */}
        <div>
          <div className="text-neutral-500 dark:text-neutral-500 text-sm mb-1">
            {laptop.brand}
          </div>
          <h3 className="text-neutral-900 dark:text-white">
            {laptop.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-neutral-900 dark:text-white text-sm">
              {laptop.rating}
            </span>
          </div>
          <span className="text-neutral-500 text-sm">
            ({laptop.reviews} reviews)
          </span>
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-neutral-600 dark:text-neutral-400">
            {laptop.specs.processor}
          </div>
          <div className="text-neutral-600 dark:text-neutral-400">
            {laptop.specs.ram}
          </div>
          <div className="text-neutral-600 dark:text-neutral-400">
            {laptop.specs.storage}
          </div>
          <div className="text-neutral-600 dark:text-neutral-400">
            {laptop.specs.display}
          </div>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-600 dark:text-neutral-400 text-sm">
            Colors:
          </span>
          <div className="flex gap-2">
            {laptop.colors.slice(0, 3).map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedColor === color
                    ? 'border-neutral-900 dark:border-white scale-110'
                    : 'border-neutral-300 dark:border-neutral-700'
                }`}
                title={color}
                style={{
                  backgroundColor: color.toLowerCase().includes('black') || color.toLowerCase().includes('gray')
                    ? '#1a1a1a'
                    : color.toLowerCase().includes('silver') || color.toLowerCase().includes('platinum')
                    ? '#d1d5db'
                    : color.toLowerCase().includes('blue')
                    ? '#3b82f6'
                    : color.toLowerCase().includes('white')
                    ? '#ffffff'
                    : '#6b7280'
                }}
              />
            ))}
            {laptop.colors.length > 3 && (
              <span className="text-neutral-500 text-sm">
                +{laptop.colors.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="text-neutral-900 dark:text-white">
              ${laptop.price.toLocaleString()}
            </div>
            {laptop.originalPrice && (
              <div className="text-neutral-500 line-through text-sm">
                ${laptop.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="px-6 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full text-sm hover:shadow-lg transition-shadow"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
