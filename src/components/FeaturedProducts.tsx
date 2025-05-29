import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Heart, ShoppingCart } from 'lucide-react'

interface Product {
  id: string
  title: string
  image: string
  url: string
  price: string
  compareAtPrice?: string
  rating?: number
  reviewCount?: number
  vendor?: string
  tags?: string[]
}

interface FeaturedProductsProps {
  title?: string
  subtitle?: string
  products?: Product[]
  showViewAll?: boolean
  viewAllUrl?: string
  className?: string
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title = 'Featured Products',
  subtitle = 'Discover our most popular items',
  products = [],
  showViewAll = true,
  viewAllUrl = '/collections/all',
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className={`py-16 lg:py-24 bg-white ${className}`}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            variants={itemVariants}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              custom={index}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-50 mb-4">
                <a href={product.url}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </a>
                
                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50">
                  <Heart size={18} className="text-gray-600" />
                </button>

                {/* Quick Add Button */}
                <button className="absolute bottom-4 left-4 right-4 bg-gray-900 text-white py-3 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center justify-center gap-2 hover:bg-gray-800">
                  <ShoppingCart size={18} />
                  Quick Add
                </button>

                {/* Sale Badge */}
                {product.compareAtPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Sale
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                {product.vendor && (
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    {product.vendor}
                  </p>
                )}
                
                <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                  <a href={product.url}>{product.title}</a>
                </h3>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < Math.floor(product.rating!)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    {product.reviewCount && (
                      <span className="text-sm text-gray-500">
                        ({product.reviewCount})
                      </span>
                    )}
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{product.price}</span>
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
        {showViewAll && (
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <a
              href={viewAllUrl}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors group"
            >
              View All Products
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
