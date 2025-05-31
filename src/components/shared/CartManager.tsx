import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { notificationManager } from './CartNotification'

interface CartItem {
  id: string
  variant_id: string
  product_id: string
  title: string
  price: string
  quantity: number
  image?: string
  url?: string
  variant_title?: string
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  totalPrice: string
  isLoading: boolean
  addToCart: (variantId: string, quantity?: number) => Promise<boolean>
  updateQuantity: (itemKey: string, quantity: number) => Promise<boolean>
  removeItem: (itemKey: string) => Promise<boolean>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [itemCount, setItemCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState('$0.00')
  const [isLoading, setIsLoading] = useState(false)

  // Fetch cart data from Shopify
  const refreshCart = async () => {
    try {
      const response = await fetch('/cart.js')
      if (response.ok) {
        const cartData = await response.json()
        setItems(cartData.items || [])
        setItemCount(cartData.item_count || 0)
        setTotalPrice(formatPrice(cartData.total_price || 0))
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    }
  }

  // Add item to cart
  const addToCart = async (variantId: string, quantity: number = 1): Promise<boolean> => {
    setIsLoading(true)
    try {
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

      if (response.ok) {
        await refreshCart()
        // Trigger cart update event for other components
        window.dispatchEvent(new CustomEvent('cart:updated'))
        notificationManager.success('Item added to cart successfully!')
        return true
      } else {
        const errorData = await response.json()
        notificationManager.error(errorData.message || 'Failed to add to cart')
        throw new Error(errorData.message || 'Failed to add to cart')
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
      notificationManager.error('Failed to add item to cart. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Update item quantity
  const updateQuantity = async (itemKey: string, quantity: number): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updates: {
            [itemKey]: quantity
          }
        }),
      })

      if (response.ok) {
        await refreshCart()
        window.dispatchEvent(new CustomEvent('cart:updated'))
        return true
      } else {
        throw new Error('Failed to update cart')
      }
    } catch (error) {
      console.error('Failed to update cart:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Remove item from cart
  const removeItem = async (itemKey: string): Promise<boolean> => {
    return updateQuantity(itemKey, 0)
  }

  // Format price helper - get currency from cart data
  const formatPrice = (priceInCents: number): string => {
    // Try to get currency from window.shopCurrency or fallback to USD
    const shopCurrency = (window as any).shopCurrency
    const currencyCode = shopCurrency?.code || 'USD'

    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      }).format(priceInCents / 100)
    } catch (error) {
      console.warn(`Invalid currency code: ${currencyCode}, falling back to USD`)
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(priceInCents / 100)
    }
  }

  // Load cart on mount
  useEffect(() => {
    refreshCart()
  }, [])

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      refreshCart()
    }

    window.addEventListener('cart:updated', handleCartUpdate)
    return () => {
      window.removeEventListener('cart:updated', handleCartUpdate)
    }
  }, [])

  const value: CartContextType = {
    items,
    itemCount,
    totalPrice,
    isLoading,
    addToCart,
    updateQuantity,
    removeItem,
    refreshCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Utility functions for non-React components
export const cartUtils = {
  addToCart: async (variantId: string, quantity: number = 1): Promise<boolean> => {
    try {
      // Ensure variantId is a number for Shopify API
      const numericVariantId = parseInt(variantId, 10)

      if (isNaN(numericVariantId)) {
        throw new Error('Invalid variant ID')
      }

      console.log('Adding to cart:', { variantId: numericVariantId, quantity })

      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: numericVariantId,
          quantity: quantity,
        }),
      })

      if (response.ok) {
        window.dispatchEvent(new CustomEvent('cart:updated'))
        return true
      } else {
        const errorData = await response.json()
        console.error('Cart API error:', errorData)
        throw new Error(errorData.message || errorData.description || 'Failed to add to cart')
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
      return false
    }
  },

  getCart: async () => {
    try {
      const response = await fetch('/cart.js')
      if (response.ok) {
        return await response.json()
      }
      throw new Error('Failed to fetch cart')
    } catch (error) {
      console.error('Failed to fetch cart:', error)
      return null
    }
  }
}
