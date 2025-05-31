import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface RelatedProduct {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  imageUrl: string
  imageAlt?: string
  productUrl: string
}

interface RelatedProductsProps {
  products: RelatedProduct[]
  title?: string
  subtitle?: string
  viewAllUrl?: string
  viewAllText?: string
  limit?: number
  className?: string
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  title = 'Related Products',
  subtitle = 'You might also like these products',
  viewAllUrl,
  viewAllText = 'View All',
  limit = 4,
  className = '',
}) => {
  if (!products || products.length === 0) {
    return null
  }

  const displayProducts = products.slice(0, limit)

  return (
    <motion.section
      className={`mt-20 pt-16 border-t border-gray-200 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -4 }}
          >
            {/* Product Image */}
            <div className="relative aspect-product overflow-hidden">
              <motion.img
                src={product.imageUrl}
                alt={product.imageAlt || product.title}
                className="w-full h-full object-scale-down"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Quick View Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={product.productUrl}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Quick View
                  </motion.a>
                </div>
              </div>

              {/* Sale Badge */}
              {product.compareAtPrice && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Sale
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                <a 
                  href={product.productUrl} 
                  className="hover:text-primary transition-colors"
                >
                  {product.title}
                </a>
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-primary">
                  {product.price}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.compareAtPrice}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      {viewAllUrl && products.length > limit && (
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.a
            href={viewAllUrl}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:border-primary hover:text-primary transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {viewAllText}
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      )}
    </motion.section>
  )
}
