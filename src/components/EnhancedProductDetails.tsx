import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, Share2, ShoppingCart, Plus, Minus, Truck, Shield, RotateCcw, Check, AlertCircle } from 'lucide-react'

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

interface TrustBadge {
  text: string
  show: boolean
}

interface EnhancedProductDetailsProps {
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
  trustBadges?: TrustBadge[]
  showTrustBadges?: boolean
  className?: string
}

export const EnhancedProductDetails: React.FC<EnhancedProductDetailsProps> = ({
  product,
  trustBadges = [],
  showTrustBadges = false,
  className = '',
}) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addToCartSuccess, setAddToCartSuccess] = useState(false)

  useEffect(() => {
    // Initialize selected options with first variant
    if (product.variants.length > 0 && product.options.length > 0) {
      const initialOptions: Record<string, string> = {}
      product.options.forEach(option => {
        if (option.values.length > 0) {
          initialOptions[option.name] = option.values[0]
        }
      })
      setSelectedOptions(initialOptions)
    }
  }, [product])

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

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 99))
  }

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1))
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1
    setQuantity(Math.max(1, Math.min(value, 99)))
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAddToCartSuccess(true)
      setTimeout(() => setAddToCartSuccess(false), 3000)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const hasDiscount = selectedVariant.compareAtPrice && selectedVariant.compareAtPrice !== selectedVariant.price
  const discountPercentage = hasDiscount ? 
    Math.round(((parseFloat(selectedVariant.compareAtPrice!.replace(/[^0-9.-]+/g, '')) - 
                parseFloat(selectedVariant.price.replace(/[^0-9.-]+/g, ''))) / 
               parseFloat(selectedVariant.compareAtPrice!.replace(/[^0-9.-]+/g, ''))) * 100) : 0

  return (
    <div className={`enhanced-product-details space-y-6 ${className}`}>
      {/* Product Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Vendor */}
        {product.vendor && (
          <p className="text-gray-600 text-sm uppercase tracking-wide mb-2 font-medium">
            {product.vendor}
          </p>
        )}

        {/* Title */}
        <h1 className="font-bold text-3xl lg:text-4xl text-gray-900 mb-4 leading-tight">
          {product.title}
        </h1>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating!) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount || 0} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-bold text-gray-900">
            {selectedVariant.price}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xl text-gray-500 line-through">
                {selectedVariant.compareAtPrice}
              </span>
              <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                Save {discountPercentage}%
              </span>
            </>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 mb-6">
          {selectedVariant.available ? (
            <>
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-green-600 font-medium">In Stock</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-600 font-medium">Out of Stock</span>
            </>
          )}
        </div>
      </motion.div>

      {/* Product Options */}
      {product.options.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          {product.options.map((option) => (
            <div key={option.name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {option.name}
              </label>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => (
                  <motion.button
                    key={value}
                    onClick={() => handleOptionChange(option.name, value)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedOptions[option.name] === value
                        ? 'border-yellow-400 bg-yellow-50 text-yellow-800'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {value}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Quantity Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <motion.button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 text-center border-0 focus:ring-0 focus:outline-none"
              min="1"
              max="99"
            />
            <motion.button
              onClick={incrementQuantity}
              disabled={quantity >= 99}
              className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-4"
      >
        {/* Add to Cart */}
        <motion.button
          onClick={handleAddToCart}
          disabled={!selectedVariant.available || isAddingToCart}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
            selectedVariant.available
              ? addToCartSuccess
                ? 'bg-green-600 text-white'
                : 'bg-yellow-400 hover:bg-yellow-500 text-black'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={selectedVariant.available ? { scale: 1.02 } : {}}
          whileTap={selectedVariant.available ? { scale: 0.98 } : {}}
        >
          <div className="flex items-center justify-center gap-2">
            {isAddingToCart ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                Adding to Cart...
              </>
            ) : addToCartSuccess ? (
              <>
                <Check className="w-5 h-5" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </div>
        </motion.button>

        {/* Secondary Actions */}
        <div className="flex gap-3">
          <motion.button
            onClick={toggleWishlist}
            className={`flex-1 py-3 px-4 border rounded-lg font-medium transition-all duration-200 ${
              isWishlisted
                ? 'border-red-300 bg-red-50 text-red-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </div>
          </motion.button>

          <motion.button
            onClick={handleShare}
            className="flex-1 py-3 px-4 border border-gray-300 bg-white text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Trust Badges */}
      {showTrustBadges && trustBadges.some(badge => badge.show) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t pt-6"
        >
          <div className="grid grid-cols-1 gap-3">
            {trustBadges.filter(badge => badge.show).map((badge, index) => (
              <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
                {index === 0 && <Truck className="w-4 h-4 text-green-600" />}
                {index === 1 && <RotateCcw className="w-4 h-4 text-blue-600" />}
                {index === 2 && <Shield className="w-4 h-4 text-purple-600" />}
                {index === 3 && <Check className="w-4 h-4 text-green-600" />}
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Product Description */}
      {product.description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t pt-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
          <div 
            className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </motion.div>
      )}
    </div>
  )
}
