import React from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'

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
}) => {
  return (
    <motion.div
      className={`group relative bg-white border border-gray-200 overflow-hidden ${className}`}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={imageAlt || title}
          className="w-full h-full object-cover"
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
          
          {onAddToCart && (
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                onClick={onAddToCart}
                className="w-full bg-primary text-white py-2 px-4 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </motion.button>
            </div>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-foreground mb-2 line-clamp-2">
          <a href={productUrl} className="hover:text-primary transition-colors">
            {title}
          </a>
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">{price}</span>
          {compareAtPrice && (
            <span className="text-sm text-muted line-through">{compareAtPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
