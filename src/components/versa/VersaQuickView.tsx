import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Share2, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react'
import { VersaButton } from './VersaButton'

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

interface QuickViewProduct {
  id: string
  title: string
  vendor?: string
  price: string
  compareAtPrice?: string
  description: string
  images: Array<{
    url: string
    alt?: string
  }>
  variants: ProductVariant[]
  options: ProductOption[]
  tags?: string[]
  productUrl: string
}

interface VersaQuickViewProps {
  product: QuickViewProduct | null
  isOpen: boolean
  onClose: () => void
  onAddToCart?: (variantId: string, quantity: number) => Promise<void>
  onToggleWishlist?: (productId: string) => void
  isInWishlist?: boolean
}

export const VersaQuickView: React.FC<VersaQuickViewProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0] || null)
      setSelectedOptions({})
      setQuantity(1)
      setCurrentImageIndex(0)
    }
  }, [product])

  // Update selected variant when options change
  useEffect(() => {
    if (product && Object.keys(selectedOptions).length > 0) {
      const matchingVariant = product.variants.find(variant =>
        Object.entries(selectedOptions).every(([key, value]) => variant.options[key] === value)
      )
      if (matchingVariant) {
        setSelectedVariant(matchingVariant)
      }
    }
  }, [selectedOptions, product])

  // Add keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          handleClose()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevImage()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextImage()
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Restore body scroll when modal closes
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }))
  }

  const handleAddToCart = async () => {
    if (!selectedVariant || !onAddToCart) return
    
    setIsLoading(true)
    try {
      await onAddToCart(selectedVariant.id, quantity)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = () => {
    if (product && navigator.share) {
      navigator.share({
        title: product.title,
        url: window.location.origin + product.productUrl,
      })
    }
  }

  const nextImage = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    if (product && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    if (product && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  const handleClose = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself, not child elements
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleModalClick = (e: React.MouseEvent) => {
    // Prevent modal content clicks from bubbling to backdrop
    e.stopPropagation()
  }

  const getSalePercentage = () => {
    if (!selectedVariant?.compareAtPrice) return null
    const price = parseFloat(selectedVariant.price.replace(/[^0-9.]/g, ''))
    const comparePrice = parseFloat(selectedVariant.compareAtPrice.replace(/[^0-9.]/g, ''))
    return Math.round(((comparePrice - price) / comparePrice) * 100)
  }

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={handleBackdropClick}
          >
            <div
              className="bg-white rounded-card max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-elegant"
              onClick={handleModalClick}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Image Section */}
                <div className="relative bg-off-white">
                  {/* Navigation Arrows */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                    <div className="flex gap-2">
                      <button
                        onClick={prevImage}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={product.images.length <= 1}
                        aria-label="Previous image"
                        type="button"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={product.images.length <= 1}
                        aria-label="Next image"
                        type="button"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    <button
                      onClick={handleClose}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-md hover:shadow-lg"
                      aria-label="Close quick view"
                      type="button"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="aspect-square relative overflow-hidden">
                    <motion.img
                      key={currentImageIndex}
                      src={product.images[currentImageIndex]?.url}
                      alt={product.images[currentImageIndex]?.alt || product.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Image Indicators */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setCurrentImageIndex(index)
                          }}
                          className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-110 ${
                            index === currentImageIndex ? 'bg-gold shadow-md' : 'bg-white/60 hover:bg-white/80'
                          }`}
                          aria-label={`View image ${index + 1}`}
                          type="button"
                        />
                      ))}
                    </div>
                  )}

                  {/* Sale Badge */}
                  {getSalePercentage() && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-accent-red text-white text-sm font-medium rounded-md">
                        {getSalePercentage()}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details Section */}
                <div className="p-6 lg:p-8 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <h2 className="font-heading text-2xl lg:text-3xl font-normal text-dark leading-tight">
                        {product.title}
                      </h2>
                      {product.vendor && (
                        <p className="text-sm text-medium-gray font-medium uppercase tracking-wide mt-1">
                          {product.vendor}
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-2xl font-medium text-dark">
                        {selectedVariant?.price || product.price}
                      </span>
                      {selectedVariant?.compareAtPrice && (
                        <span className="text-lg text-medium-gray line-through">
                          {selectedVariant.compareAtPrice}
                        </span>
                      )}
                      {getSalePercentage() && (
                        <span className="px-2 py-1 bg-gold text-white text-xs font-medium rounded">
                          {getSalePercentage()}% OFF
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <div className="prose prose-sm max-w-none">
                      <p className="text-charcoal leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Product Options */}
                    {product.options.map((option) => (
                      <div key={option.name} className="space-y-3">
                        <label className="block text-sm font-medium text-dark">
                          {option.name}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {option.values.map((value) => (
                            <button
                              key={value}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleOptionChange(option.name, value)
                              }}
                              className={`px-4 py-2 border rounded-button text-sm font-medium transition-all ${
                                selectedOptions[option.name] === value
                                  ? 'border-gold bg-gold text-white'
                                  : 'border-light-gray text-charcoal hover:border-gold'
                              }`}
                              type="button"
                              aria-label={`Select ${option.name}: ${value}`}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Quantity */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-dark">
                        Quantity
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setQuantity(Math.max(1, quantity - 1))
                          }}
                          className="p-2 border border-light-gray rounded-button hover:border-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={quantity <= 1}
                          aria-label="Decrease quantity"
                          type="button"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-medium">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setQuantity(quantity + 1)
                          }}
                          className="p-2 border border-light-gray rounded-button hover:border-gold transition-colors"
                          aria-label="Increase quantity"
                          type="button"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <VersaButton
                        variant="primary"
                        fullWidth
                        onClick={handleAddToCart}
                        disabled={!selectedVariant?.available}
                        loading={isLoading}
                      >
                        {selectedVariant?.available ? 'ADD TO BAG' : 'OUT OF STOCK'} — {selectedVariant?.price || product.price}
                      </VersaButton>

                      <VersaButton
                        variant="outline"
                        fullWidth
                        href={product.productUrl}
                      >
                        BUY IT NOW
                      </VersaButton>

                      <div className="flex gap-3">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onToggleWishlist?.(product.id)
                          }}
                          className="flex-1 flex items-center justify-center gap-2 p-3 border border-light-gray rounded-button hover:border-gold transition-colors"
                          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                          type="button"
                        >
                          <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
                          <span className="text-sm font-medium">Wishlist</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleShare()
                          }}
                          className="flex-1 flex items-center justify-center gap-2 p-3 border border-light-gray rounded-button hover:border-gold transition-colors"
                          aria-label="Share product"
                          type="button"
                        >
                          <Share2 size={18} />
                          <span className="text-sm font-medium">Share</span>
                        </button>
                      </div>
                    </div>

                    {/* View Full Details Link */}
                    <div className="pt-4 border-t border-light-gray">
                      <a
                        href={product.productUrl}
                        className="text-warm-brown hover:text-gold font-medium text-sm transition-colors"
                      >
                        View full details →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
