import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Eye, Star } from 'lucide-react'
import { VersaButton } from './VersaButton'

interface VersaProductCardProps {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  imageUrl: string
  imageAlt?: string
  productUrl: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isOnSale?: boolean
  salePercentage?: number
  vendor?: string
  variantId?: string
  available?: boolean
  onAddToCart?: () => void
  onToggleWishlist?: () => void
  onQuickView?: () => void
  isInWishlist?: boolean
  className?: string
}

export const VersaProductCard: React.FC<VersaProductCardProps> = ({
  id,
  title,
  price,
  compareAtPrice,
  imageUrl,
  imageAlt,
  productUrl,
  rating,
  reviewCount,
  isNew = false,
  isOnSale = false,
  salePercentage,
  vendor,
  variantId,
  available = true,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  isInWishlist = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart?.()
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleWishlist?.()
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.()
  }

  return (
    <motion.div
      className={`group relative bg-white border border-light-gray rounded-card overflow-hidden transition-all duration-300 ease-out hover:border-gold hover:shadow-elegant ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <a href={productUrl} className="block">
        {/* Image Container */}
        <div className="relative aspect-product overflow-hidden bg-off-white">
          {/* Product Image */}
          <motion.img
            src={imageUrl}
            alt={imageAlt || title}
            className={`w-full h-full object-cover transition-all duration-500 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          />

          {/* Loading Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-lighter-gray animate-pulse" />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <motion.span
                className="px-2 py-1 bg-accent-red text-white text-xs font-medium rounded-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                NEW
              </motion.span>
            )}
            {isOnSale && salePercentage && (
              <motion.span
                className="px-2 py-1 bg-gold text-white text-xs font-medium rounded-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                -{salePercentage}%
              </motion.span>
            )}
          </div>

          {/* Action Buttons Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-black/20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleQuickView}
                    className="p-3 bg-white/90 backdrop-blur-sm text-warm-brown rounded-full hover:bg-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Eye size={18} />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleToggleWishlist}
                    className={`p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors ${
                      isInWishlist ? 'text-red-500' : 'text-warm-brown'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Vendor */}
          {vendor && (
            <p className="text-xs text-medium-gray font-medium uppercase tracking-wide">
              {vendor}
            </p>
          )}

          {/* Title */}
          <h3 className="font-heading text-lg font-normal text-dark line-clamp-2 leading-tight">
            {title}
          </h3>

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${
                      i < Math.floor(rating)
                        ? 'text-gold fill-current'
                        : 'text-light-gray'
                    }`}
                  />
                ))}
              </div>
              {reviewCount && (
                <span className="text-xs text-medium-gray">
                  ({reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl font-medium text-dark">
              {price}
            </span>
            {compareAtPrice && (
              <span className="text-sm text-medium-gray line-through">
                {compareAtPrice}
              </span>
            )}
          </div>
        </div>
      </a>

      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <VersaButton
          variant="outline"
          size="sm"
          fullWidth
          onClick={handleAddToCart}
          disabled={!available}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {available ? 'Add to Cart' : 'Out of Stock'}
        </VersaButton>
      </div>
    </motion.div>
  )
}

// Preset variants for different use cases
export const VersaFeaturedProductCard: React.FC<VersaProductCardProps> = (props) => (
  <VersaProductCard {...props} className="shadow-elegant" />
)

export const VersaCompactProductCard: React.FC<VersaProductCardProps> = (props) => (
  <VersaProductCard {...props} className="max-w-sm" />
)
