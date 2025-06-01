import React from 'react'
import { QuickViewProvider, useQuickViewContext } from './useQuickView'
import { VersaQuickView } from './VersaQuickView'

interface VersaLayoutWithQuickViewProps {
  children: React.ReactNode
  onAddToCart?: (variantId: string, quantity: number) => Promise<void>
  onToggleWishlist?: (productId: string) => void
  getWishlistStatus?: (productId: string) => boolean
}

// Internal component that uses the context
const QuickViewModal: React.FC<{
  onAddToCart?: (variantId: string, quantity: number) => Promise<void>
  onToggleWishlist?: (productId: string) => void
  getWishlistStatus?: (productId: string) => boolean
}> = ({ onAddToCart, onToggleWishlist, getWishlistStatus }) => {
  const { isOpen, product, closeQuickView } = useQuickViewContext()

  const handleAddToCart = async (variantId: string, quantity: number) => {
    if (onAddToCart) {
      try {
        await onAddToCart(variantId, quantity)
        // Optionally close quick view after successful add to cart
        // closeQuickView()
      } catch (error) {
        console.error('Failed to add to cart:', error)
        // Handle error (show toast, etc.)
      }
    }
  }

  const handleToggleWishlist = (productId: string) => {
    onToggleWishlist?.(productId)
  }

  const isInWishlist = product ? getWishlistStatus?.(product.id) ?? false : false

  return (
    <VersaQuickView
      product={product}
      isOpen={isOpen}
      onClose={closeQuickView}
      onAddToCart={handleAddToCart}
      onToggleWishlist={handleToggleWishlist}
      isInWishlist={isInWishlist}
    />
  )
}

// Main layout component
export const VersaLayoutWithQuickView: React.FC<VersaLayoutWithQuickViewProps> = ({
  children,
  onAddToCart,
  onToggleWishlist,
  getWishlistStatus,
}) => {
  return (
    <QuickViewProvider>
      {children}
      <QuickViewModal
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        getWishlistStatus={getWishlistStatus}
      />
    </QuickViewProvider>
  )
}

// Hook for easy access to quick view functionality
export { useQuickViewContext as useQuickView } from './useQuickView'
export { transformProductForQuickView } from './useQuickView'

// Example usage component
export const ExampleUsage: React.FC = () => {
  // Example cart handler
  const handleAddToCart = async (variantId: string, quantity: number) => {
    try {
      // Shopify cart add example
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: quantity,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add to cart')
      }

      const result = await response.json()
      console.log('Added to cart:', result)

      // Update cart UI, show success message, etc.
      // You might want to dispatch an event or update global state here
      
    } catch (error) {
      console.error('Cart error:', error)
      throw error // Re-throw to let the quick view handle the error
    }
  }

  // Example wishlist handler
  const handleToggleWishlist = (productId: string) => {
    // Implement your wishlist logic
    console.log('Toggle wishlist for:', productId)
    
    // Example: Update local storage or make API call
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    const isInWishlist = wishlist.includes(productId)
    
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter((id: string) => id !== productId)
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
    } else {
      wishlist.push(productId)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
  }

  // Example wishlist status checker
  const getWishlistStatus = (productId: string): boolean => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    return wishlist.includes(productId)
  }

  return (
    <VersaLayoutWithQuickView
      onAddToCart={handleAddToCart}
      onToggleWishlist={handleToggleWishlist}
      getWishlistStatus={getWishlistStatus}
    >
      {/* Your app content goes here */}
      <div className="min-h-screen">
        <h1>Your Store Content</h1>
        {/* Product grids, collections, etc. */}
      </div>
    </VersaLayoutWithQuickView>
  )
}
