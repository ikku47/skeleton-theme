import React from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import { cartUtils } from './CartManager'
import { notificationManager } from './CartNotification'

interface ProductCardProps {
  title: string
  price: string
  compareAtPrice?: string
  imageUrl: string
  imageAlt?: string
  productUrl: string
  onAddToCart?: () => void
  onToggleWishlist?: () => void
  isInWishlist?: boolean
  className?: string
  variantId?: string
  available?: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  compareAtPrice,
  imageUrl,
  imageAlt = '',
  productUrl,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
  className = '',
  variantId,
  available = true,
}) => {
  const handleAddToCart = async () => {
    // Use custom onAddToCart if provided
    if (onAddToCart) {
      onAddToCart()
      return
    }

    // Otherwise use built-in cart functionality
    if (!variantId) {
      notificationManager.error('Product variant not available')
      return
    }

    if (!available) {
      notificationManager.error('This product is currently out of stock')
      return
    }

    try {
      const success = await cartUtils.addToCart(variantId, 1)

      if (success) {
        // Success notification is handled by CartManager
      } else {
        throw new Error('Failed to add to cart')
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
      notificationManager.error('Failed to add item to cart. Please try again.')
    }
  }
  return (
    <motion.div
      className={`card-product group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Image Container */}
      <div className="relative aspect-product overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={imageAlt || title}
          className="card-product-image w-full h-full object-scale-down"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {onToggleWishlist && (
              <motion.button
                onClick={onToggleWishlist}
                className={`p-2 rounded-full ${
                  isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                } hover:bg-red-500 hover:text-white transition-colors`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
              </motion.button>
            )}
          </div>

          {(onAddToCart || variantId) && (
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                onClick={handleAddToCart}
                disabled={!available}
                className={`w-full py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors ${
                  available
                    ? 'bg-primary text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={available ? { scale: 1.02 } : {}}
                whileTap={available ? { scale: 0.98 } : {}}
              >
                <ShoppingCart size={16} />
                {available ? 'Add to Cart' : 'Out of Stock'}
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
          <a href={productUrl} className="hover:text-primary transition-colors">
            {title}
          </a>
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-primary">{price}</span>
          {compareAtPrice && (
            <span className="text-sm text-gray-500 line-through">{compareAtPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
