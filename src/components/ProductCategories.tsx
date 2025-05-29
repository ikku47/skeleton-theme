import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Category {
  id: string
  title: string
  description?: string
  image: string
  url: string
  productCount?: number
}

interface ProductCategoriesProps {
  title?: string
  subtitle?: string
  categories?: Category[]
  className?: string
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({
  title = 'Shop by Category',
  subtitle = 'Explore our curated collections',
  categories = [],
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
    <section className={`py-16 lg:py-24 bg-gray-50 ${className}`}>
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href={category.url}
              variants={cardVariants}
              custom={index}
              className={`group cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-2xl ${
                  index === 0 ? 'h-96 lg:h-[500px]' : 'h-64 lg:h-80'
                }`}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                  <div className="text-white">
                    <h3
                      className={`font-bold mb-2 ${
                        index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'
                      }`}
                    >
                      {category.title}
                    </h3>
                    
                    {category.description && (
                      <p
                        className={`mb-4 opacity-90 ${
                          index === 0 ? 'text-base lg:text-lg' : 'text-sm lg:text-base'
                        }`}
                      >
                        {category.description}
                      </p>
                    )}
                    
                    {category.productCount && (
                      <p className="text-sm opacity-75 mb-4">
                        {category.productCount} products
                      </p>
                    )}
                    
                    <div className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all duration-300">
                      Shop Now
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Featured Category Banner */}
        {categories.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-12 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 lg:p-12 text-center"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Browse our complete collection of products across all categories
            </p>
            <a
              href="/collections"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
            >
              View All Collections
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
