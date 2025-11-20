import { motion } from 'motion/react';
import { useState } from 'react';
import { Check, X as XIcon, Plus } from 'lucide-react';
import { laptops, Laptop } from '../store/products';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ComparisonSection() {
  const [selectedLaptops, setSelectedLaptops] = useState<Laptop[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const addToComparison = (laptop: Laptop) => {
    if (selectedLaptops.length < 3 && !selectedLaptops.find(l => l.id === laptop.id)) {
      setSelectedLaptops([...selectedLaptops, laptop]);
      if (selectedLaptops.length === 2) {
        setShowSelector(false);
      }
    }
  };

  const removeFromComparison = (id: string) => {
    setSelectedLaptops(selectedLaptops.filter(l => l.id !== id));
  };

  const comparisonCategories = [
    { label: 'Processor', key: 'processor' },
    { label: 'RAM', key: 'ram' },
    { label: 'Storage', key: 'storage' },
    { label: 'Display', key: 'display' },
    { label: 'Graphics', key: 'graphics' },
  ];

  return (
    <section id="compare" className="py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-neutral-900 dark:text-white mb-4">
            Compare Laptops
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Select up to 3 laptops to compare their specifications side by side
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[0, 1, 2].map((index) => {
            const laptop = selectedLaptops[index];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-black rounded-3xl p-6 border-2 border-dashed border-neutral-200 dark:border-neutral-800 min-h-[400px] flex flex-col"
              >
                {laptop ? (
                  <>
                    {/* Laptop Card */}
                    <div className="relative mb-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromComparison(laptop.id)}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center z-10"
                      >
                        <XIcon className="w-4 h-4" />
                      </motion.button>
                      <div className="aspect-video rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-4">
                        <ImageWithFallback
                          src={laptop.image}
                          alt={laptop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-neutral-900 dark:text-white mb-1">
                        {laptop.name}
                      </h3>
                      <p className="text-neutral-500 text-sm mb-2">{laptop.brand}</p>
                      <div className="text-neutral-900 dark:text-white">
                        ${laptop.price.toLocaleString()}
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="space-y-3 flex-1">
                      {comparisonCategories.map((category) => (
                        <div key={category.key} className="pb-3 border-b border-neutral-200 dark:border-neutral-800">
                          <div className="text-neutral-500 text-xs mb-1">{category.label}</div>
                          <div className="text-neutral-900 dark:text-white text-sm">
                            {laptop.specs[category.key as keyof typeof laptop.specs]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSelector(true)}
                      className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mb-4"
                    >
                      <Plus className="w-8 h-8 text-neutral-400" />
                    </motion.button>
                    <p className="text-neutral-500 text-sm text-center">
                      Add a laptop to compare
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Laptop Selector */}
        {showSelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-black rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-neutral-900 dark:text-white">
                Select a Laptop
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSelector(false)}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                <XIcon className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4">
              {laptops
                .filter(l => !selectedLaptops.find(sl => sl.id === l.id))
                .slice(0, 8)
                .map((laptop) => (
                  <motion.button
                    key={laptop.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToComparison(laptop)}
                    className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl text-left hover:border-neutral-300 dark:hover:border-neutral-700 border border-transparent transition-all"
                  >
                    <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 mb-3">
                      <ImageWithFallback
                        src={laptop.image}
                        alt={laptop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-neutral-900 dark:text-white text-sm mb-1 truncate">
                      {laptop.name}
                    </p>
                    <p className="text-neutral-500 text-xs">{laptop.brand}</p>
                  </motion.button>
                ))}
            </div>
          </motion.div>
        )}

        {/* Comparison Table (when laptops are selected) */}
        {selectedLaptops.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-black rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 mt-12"
          >
            <h3 className="text-neutral-900 dark:text-white mb-6">
              Detailed Comparison
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800">
                    <th className="text-left py-4 text-neutral-600 dark:text-neutral-400">
                      Feature
                    </th>
                    {selectedLaptops.map((laptop) => (
                      <th key={laptop.id} className="text-left py-4 text-neutral-900 dark:text-white">
                        {laptop.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800">
                    <td className="py-4 text-neutral-600 dark:text-neutral-400">Price</td>
                    {selectedLaptops.map((laptop) => (
                      <td key={laptop.id} className="py-4 text-neutral-900 dark:text-white">
                        ${laptop.price.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800">
                    <td className="py-4 text-neutral-600 dark:text-neutral-400">Rating</td>
                    {selectedLaptops.map((laptop) => (
                      <td key={laptop.id} className="py-4 text-neutral-900 dark:text-white">
                        {laptop.rating} ★
                      </td>
                    ))}
                  </tr>
                  {comparisonCategories.map((category) => (
                    <tr key={category.key} className="border-b border-neutral-200 dark:border-neutral-800">
                      <td className="py-4 text-neutral-600 dark:text-neutral-400">
                        {category.label}
                      </td>
                      {selectedLaptops.map((laptop) => (
                        <td key={laptop.id} className="py-4 text-neutral-900 dark:text-white">
                          {laptop.specs[category.key as keyof typeof laptop.specs]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
