import React from 'react'
import { motion } from 'framer-motion'
import { Check, X, Star } from 'lucide-react'

interface TrustBadge {
  text: string
  show: boolean
}

interface ProductInfoProps {
  title: string
  price: string
  compareAtPrice?: string
  vendor?: string
  description?: string
  isAvailable: boolean
  showVendor?: boolean
  rating?: number
  reviewCount?: number
  trustBadges?: TrustBadge[]
  showTrustBadges?: boolean
  className?: string
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  price,
  compareAtPrice,
  vendor,
  description,
  isAvailable,
  showVendor = true,
  rating,
  reviewCount,
  trustBadges = [],
  showTrustBadges = false,
  className = '',
}) => {
  const hasDiscount = compareAtPrice && compareAtPrice !== price
  
  // Calculate savings if there's a discount
  const savings = hasDiscount ? 
    parseFloat(compareAtPrice.replace(/[^0-9.-]+/g, '')) - parseFloat(price.replace(/[^0-9.-]+/g, '')) 
    : 0

  return (
    <motion.div
      className={`space-y-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Title */}
      <motion.h1 
        className="text-3xl md:text-4xl font-bold text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h1>

      {/* Rating */}
      {rating && (
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          {reviewCount && (
            <span className="text-sm text-gray-500">
              ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
            </span>
          )}
        </motion.div>
      )}

      {/* Price Section */}
      <motion.div 
        className="flex items-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-3xl font-bold text-primary">{price}</span>
        {hasDiscount && (
          <>
            <span className="text-xl text-gray-500 line-through">{compareAtPrice}</span>
            <motion.span 
              className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
            >
              Save ${savings.toFixed(2)}
            </motion.span>
          </>
        )}
      </motion.div>

      {/* Stock Status and Vendor */}
      <motion.div 
        className="flex items-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {/* Stock Status */}
        <div className="flex items-center">
          {isAvailable ? (
            <span className="flex items-center text-green-600">
              <Check className="w-4 h-4 mr-2" />
              In Stock
            </span>
          ) : (
            <span className="flex items-center text-red-600">
              <X className="w-4 h-4 mr-2" />
              Out of Stock
            </span>
          )}
        </div>

        {/* Vendor */}
        {showVendor && vendor && (
          <span className="text-gray-500">
            by <strong className="text-gray-700">{vendor}</strong>
          </span>
        )}
      </motion.div>

      {/* Product Description */}
      {description && (
        <motion.div 
          className="prose prose-gray max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}

      {/* Trust Badges */}
      {showTrustBadges && trustBadges.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {trustBadges.filter(badge => badge.show).map((badge, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              {badge.text}
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
