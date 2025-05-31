import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, Share2, ShoppingCart, Plus, Minus, Truck, Shield, RotateCcw } from 'lucide-react'
import { cartUtils } from './CartManager'
import { notificationManager } from './CartNotification'

interface ProductVariant {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  available: boolean
  options: Record<string, string>
}

interface ProductOption {
  name: string
  values: string[]
}

interface VersaProductDetailsProps {
  product: {
    id: string
    title: string
    vendor?: string
    price: string
    compareAtPrice?: string
    description: string
    variants: ProductVariant[]
    options: ProductOption[]
    rating?: number
    reviewCount?: number
    tags?: string[]
  }
  className?: string
}

export const VersaProductDetails: React.FC<VersaProductDetailsProps> = ({
  product,
  className = '',
}) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value }
    setSelectedOptions(newOptions)
    
    // Find matching variant
    const matchingVariant = product.variants.find(variant =>
      Object.entries(newOptions).every(([key, val]) => variant.options[key] === val)
    )
    
    if (matchingVariant) {
      setSelectedVariant(matchingVariant)
    }
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = async () => {
    if (!selectedVariant.available || !selectedVariant.id) return

    try {
      const success = await cartUtils.addToCart(selectedVariant.id, quantity)

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

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      })
    } else {
      // Fallback to copy URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const savings = selectedVariant.compareAtPrice && selectedVariant.price
    ? parseFloat(selectedVariant.compareAtPrice.replace(/[^0-9.]/g, '')) - parseFloat(selectedVariant.price.replace(/[^0-9.]/g, ''))
    : 0

  return (
    <div className={`versa-product-details space-y-6 ${className}`}>
      {/* Product Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Vendor */}
        {product.vendor && (
          <p className="text-neutral text-sm uppercase tracking-wide mb-2">
            {product.vendor}
          </p>
        )}

        {/* Title */}
        <h1 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
          {product.title}
        </h1>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-primary font-medium">{product.rating}</span>
            {product.reviewCount && (
              <span className="text-neutral">({product.reviewCount} reviews)</span>
            )}
          </div>
        )}
      </motion.div>

      {/* Price */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-primary">
            {selectedVariant.price}
          </span>
          {selectedVariant.compareAtPrice && (
            <span className="text-xl text-neutral line-through">
              {selectedVariant.compareAtPrice}
            </span>
          )}
        </div>
        
        {savings > 0 && (
          <div className="flex items-center gap-2">
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
              Save ${savings.toFixed(2)}
            </span>
            <span className="text-green-600 text-sm font-medium">
              {Math.round((savings / parseFloat(selectedVariant.compareAtPrice!.replace(/[^0-9.]/g, ''))) * 100)}% off
            </span>
          </div>
        )}
      </motion.div>

      {/* Product Options */}
      {product.options.map((option, index) => (
        <motion.div
          key={option.name}
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
        >
          <label className="block font-heading font-semibold text-primary">
            {option.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => (
              <motion.button
                key={value}
                onClick={() => handleOptionChange(option.name, value)}
                className={`px-4 py-2 border-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedOptions[option.name] === value
                    ? 'border-accent bg-accent text-primary'
                    : 'border-border text-neutral hover:border-neutral'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {value}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Quantity & Add to Cart */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Quantity Selector */}
        <div className="space-y-2">
          <label className="block font-heading font-semibold text-primary">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center border-2 border-border rounded-lg">
              <motion.button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 hover:bg-light-bg transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <Minus className="w-4 h-4" />
              </motion.button>
              <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                {quantity}
              </span>
              <motion.button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-light-bg transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={handleAddToCart}
            disabled={!selectedVariant.available}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-accent text-primary font-heading font-semibold text-lg rounded-cta hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            whileHover={selectedVariant.available ? { scale: 1.02 } : {}}
            whileTap={selectedVariant.available ? { scale: 0.98 } : {}}
          >
            <ShoppingCart className="w-5 h-5" />
            {selectedVariant.available ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>

          <div className="flex gap-2">
            <motion.button
              onClick={toggleWishlist}
              className={`p-4 border-2 rounded-cta transition-all duration-200 ${
                isWishlisted
                  ? 'border-red-500 bg-red-50 text-red-500'
                  : 'border-border text-neutral hover:border-neutral'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>

            <motion.button
              onClick={handleShare}
              className="p-4 border-2 border-border text-neutral hover:border-neutral rounded-cta transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Trust Signals */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-primary">Free Shipping</p>
            <p className="text-sm text-neutral">On orders over $50</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-primary">Secure Payment</p>
            <p className="text-sm text-neutral">SSL encrypted</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-primary">Easy Returns</p>
            <p className="text-sm text-neutral">30-day policy</p>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        className="space-y-4 pt-6 border-t border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="font-heading font-semibold text-xl text-primary">
          Description
        </h3>
        <div 
          className="prose prose-neutral max-w-none"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </motion.div>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <motion.div
          className="space-y-3 pt-6 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="font-heading font-semibold text-primary">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-light-bg text-neutral text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
