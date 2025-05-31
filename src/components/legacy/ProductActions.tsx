import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Zap, Share2 } from 'lucide-react'
import { AddToCartButton } from '../shared/AddToCartButton'

interface ProductActionsProps {
  isAvailable: boolean
  isInWishlist?: boolean
  variantId?: string
  quantity?: number
  showBuyNow?: boolean
  showWishlist?: boolean
  showShare?: boolean
  addToCartText?: string
  buyNowText?: string
  className?: string
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  isAvailable,
  isInWishlist = false,
  variantId,
  quantity = 1,
  showBuyNow = true,
  showWishlist = true,
  showShare = true,
  addToCartText = 'Add to Cart',
  buyNowText = 'Buy Now',
  className = '',
}) => {
  const [wishlistState, setWishlistState] = useState(isInWishlist)
  const [currentQuantity, setCurrentQuantity] = useState(quantity)

  // Load wishlist state from localStorage on mount
  useEffect(() => {
    if (variantId) {
      const wishlistKey = `wishlist_${variantId}`
      const savedWishlistState = localStorage.getItem(wishlistKey) === 'true'
      setWishlistState(savedWishlistState)
    }
  }, [variantId])

  // Listen for quantity changes
  useEffect(() => {
    const handleQuantityChange = (event: CustomEvent) => {
      setCurrentQuantity(event.detail.quantity)
    }

    window.addEventListener('quantity:changed', handleQuantityChange as EventListener)
    return () => {
      window.removeEventListener('quantity:changed', handleQuantityChange as EventListener)
    }
  }, [])



  const handleBuyNow = async () => {
    if (!isAvailable || !variantId) return

    try {
      // Add to cart first using cart utils
      const success = await cartUtils.addToCart(variantId, currentQuantity)

      if (success) {
        // Redirect to checkout
        window.location.href = '/checkout'
      } else {
        throw new Error('Failed to add to cart')
      }
    } catch (error) {
      console.error('Error with buy now:', error)
      notificationManager.error('Failed to process buy now. Please try again.')
    }
  }

  const handleToggleWishlist = () => {
    const newWishlistState = !wishlistState
    setWishlistState(newWishlistState)

    // Store in localStorage for persistence
    const wishlistKey = `wishlist_${variantId}`
    if (newWishlistState) {
      localStorage.setItem(wishlistKey, 'true')
    } else {
      localStorage.removeItem(wishlistKey)
    }

    // Trigger wishlist update event
    window.dispatchEvent(new CustomEvent('wishlist:updated', {
      detail: { variantId, isInWishlist: newWishlistState }
    }))
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // Show feedback
      const originalText = 'Share'
      const button = document.querySelector('[aria-label="Share product"]')
      if (button) {
        button.textContent = 'Copied!'
        setTimeout(() => {
          button.textContent = originalText
        }, 2000)
      }
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Add to Cart Button */}
        <AddToCartButton
          variantId={variantId}
          quantity={currentQuantity}
          available={isAvailable}
          variant="primary"
          size="lg"
          className="flex-1 rounded-lg"
          loadingText="Adding..."
          successText="Added to Cart!"
          unavailableText="Out of Stock"
        >
          {addToCartText}
        </AddToCartButton>

        {/* Secondary Actions */}
        <div className="flex gap-2">
          {/* Wishlist Button */}
          {showWishlist && (
            <motion.button
              type="button"
              onClick={handleToggleWishlist}
              className={`p-3 rounded-lg border transition-all ${
                wishlistState
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={wishlistState ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                size={18}
                fill={wishlistState ? 'currentColor' : 'none'}
              />
            </motion.button>
          )}

          {/* Share Button */}
          {showShare && (
            <motion.button
              type="button"
              onClick={handleShare}
              className="p-3 rounded-lg border border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share product"
            >
              <Share2 size={18} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Buy Now Button */}
      {showBuyNow && isAvailable && (
        <motion.button
          type="button"
          onClick={handleBuyNow}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Zap size={18} />
          {buyNowText}
        </motion.button>
      )}

      {/* Out of Stock Message */}
      {!isAvailable && (
        <motion.div
          className="text-center py-3 px-4 bg-gray-100 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-600 font-medium">Currently Out of Stock</p>
          <p className="text-sm text-gray-500 mt-1">
            Get notified when this item is back in stock
          </p>
          <button className="mt-2 text-primary hover:text-blue-700 text-sm font-medium">
            Notify Me
          </button>
        </motion.div>
      )}
    </div>
  )
}
