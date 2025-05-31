import React from 'react'
import { motion } from 'framer-motion'

interface CollectionCardProps {
  title: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  url: string
  productCount?: number
  className?: string
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  description,
  imageUrl,
  imageAlt = '',
  url,
  productCount,
  className = '',
}) => {
  // Get first letter for fallback
  const firstLetter = title.charAt(0).toUpperCase()

  return (
    <motion.a
      href={url}
      className={`group block ${className}`}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Collection Image */}
        <div className="aspect-square overflow-hidden">
          {imageUrl ? (
            <motion.img
              src={imageUrl}
              alt={imageAlt || title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-primary/10 group-hover:to-primary/20 transition-colors duration-300">
              <span className="text-gray-400 group-hover:text-primary text-4xl font-bold transition-colors duration-300">
                {firstLetter}
              </span>
            </div>
          )}
        </div>

        {/* Collection Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            {productCount !== undefined && (
              <span className="text-sm text-gray-500">
                {productCount} {productCount === 1 ? 'product' : 'products'}
              </span>
            )}
            <span className="text-primary font-medium text-sm group-hover:underline">
              View Collection →
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}
