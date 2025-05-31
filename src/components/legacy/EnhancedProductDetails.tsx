import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, Share2, Plus, Minus, Truck, Shield, RotateCcw, AlertCircle, Check } from 'lucide-react'
import { EnhancedVariantSelector } from './EnhancedVariantSelector'
import { AddToCartButton } from '../shared/AddToCartButton'

interface ProductVariant {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  available: boolean
  options: Record<string, string>
  inventory_quantity?: number
  inventory_policy?: string
  featured_image?: {
    url: string
    alt: string
  }
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

  useEffect(() => {
    // Initialize selected options with first available variant's actual options
    if (product.variants.length > 0) {
      const firstVariant = product.variants[0]
      console.log('Initializing with first variant:', firstVariant)
      console.log('All available variants:', product.variants)
      setSelectedVariant(firstVariant)
      setSelectedOptions(firstVariant.options)

      // Update URL with variant ID
      const url = new URL(window.location.href)
      url.searchParams.set('variant', firstVariant.id)
      window.history.replaceState({}, '', url.toString())
    }
  }, [product])

  // Check URL for variant parameter on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const variantId = urlParams.get('variant')

    if (variantId) {
      const variant = product.variants.find(v => v.id === variantId)
      if (variant) {
        setSelectedVariant(variant)
        setSelectedOptions(variant.options)
      }
    }
  }, [])

  // Helper function to check if an option value is available
  const isOptionValueAvailable = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value }
    return product.variants.some(variant =>
      Object.entries(newOptions).every(([key, val]) => variant.options[key] === val) &&
      variant.available
    )
  }

  // Helper function to get all available variants for current selection
  const getAvailableVariants = () => {
    return product.variants.filter(variant => variant.available)
  }

  const handleOptionChange = (optionName: string, value: string) => {
    console.log('Option changed:', optionName, '=', value)
    const newOptions = { ...selectedOptions, [optionName]: value }
    console.log('New options:', newOptions)
    setSelectedOptions(newOptions)

    // Find matching variant
    const matchingVariant = product.variants.find(variant =>
      Object.entries(newOptions).every(([key, val]) => variant.options[key] === val)
    )

    console.log('Matching variant found:', matchingVariant)

    if (matchingVariant) {
      console.log('Setting variant:', matchingVariant.id, 'Price:', matchingVariant.price)
      setSelectedVariant(matchingVariant)

      // Update URL with new variant
      const url = new URL(window.location.href)
      url.searchParams.set('variant', matchingVariant.id)
      window.history.replaceState({}, '', url.toString())
    } else {
      console.log('No exact match found, looking for best match...')
      // If no exact match, find the closest available variant
      const availableVariants = getAvailableVariants()
      if (availableVariants.length > 0) {
        // Find variant that matches the most options
        let bestMatch = availableVariants[0]
        let maxMatches = 0

        availableVariants.forEach(variant => {
          const matches = Object.entries(newOptions).filter(([key, val]) =>
            variant.options[key] === val
          ).length

          if (matches > maxMatches) {
            maxMatches = matches
            bestMatch = variant
          }
        })

        console.log('Best match found:', bestMatch.id, 'Price:', bestMatch.price)
        setSelectedVariant(bestMatch)
        setSelectedOptions(bestMatch.options)

        // Update URL
        const url = new URL(window.location.href)
        url.searchParams.set('variant', bestMatch.id)
        window.history.replaceState({}, '', url.toString())
      }
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
          {/* Debug info */}
          {process.env.NODE_ENV === 'development' && (
            <small className="text-xs text-gray-400">
              (Variant: {selectedVariant.id})
            </small>
          )}
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
              <div className="flex flex-col">
                <span className="text-green-600 font-medium">In Stock</span>
                {selectedVariant.inventory_quantity !== undefined &&
                 selectedVariant.inventory_quantity > 0 &&
                 selectedVariant.inventory_quantity <= 10 && (
                  <span className="text-orange-600 text-sm">
                    Only {selectedVariant.inventory_quantity} left!
                  </span>
                )}
              </div>
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
        <EnhancedVariantSelector
          product={product}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
          isOptionValueAvailable={isOptionValueAvailable}
        />
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
        <AddToCartButton
          variantId={selectedVariant.id}
          quantity={quantity}
          available={selectedVariant.available}
          variant="accent"
          size="lg"
          fullWidth
          className="rounded-lg"
          loadingText="Adding to Cart..."
          successText="Added to Cart!"
          unavailableText="Out of Stock"
        >
          Add to Cart
        </AddToCartButton>

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
