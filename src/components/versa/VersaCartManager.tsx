import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VersaCartItem } from './VersaCartItem'
import { VersaCartSummary } from './VersaCartSummary'
import { VersaEmptyCart } from './VersaEmptyCart'

interface CartItem {
  id: string
  title: string
  variant?: string
  price: string
  priceRaw?: number
  quantity: number
  linePrice?: string
  linePriceRaw?: number
  imageUrl?: string
  productUrl: string
  removeUrl: string
}

interface Currency {
  code: string
  symbol: string
  name?: string
}

interface ShopCurrency {
  code: string
  format: string
}

interface VersaCartManagerProps {
  initialItems: CartItem[]
  initialSubtotal: string
  initialTotal: string
  initialItemCount: number
  freeShippingThreshold?: number
  currentSubtotal?: number
  currency?: Currency
  shopCurrency?: ShopCurrency
  className?: string
}

export const VersaCartManager: React.FC<VersaCartManagerProps> = ({
  initialItems,
  initialSubtotal,
  initialTotal,
  initialItemCount,
  freeShippingThreshold = 50,
  currentSubtotal = 0,
  currency,
  shopCurrency,
  className = '',
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems)
  const [cartSubtotal, setCartSubtotal] = useState(initialSubtotal)
  const [cartTotal, setCartTotal] = useState(initialTotal)
  const [itemCount, setItemCount] = useState(initialItemCount)
  const [subtotalValue, setSubtotalValue] = useState(currentSubtotal)

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = async (event: CustomEvent) => {
      const { cart, itemId, newQuantity, removed } = event.detail

      if (removed) {
        // Remove item from local state with animation
        setCartItems(prev => prev.filter(item => item.id !== itemId))
      } else if (newQuantity !== undefined) {
        // Update item quantity in local state
        setCartItems(prev =>
          prev.map(item =>
            item.id === itemId
              ? { ...item, quantity: newQuantity }
              : item
          )
        )
      }

      // Update cart totals from API response
      if (cart) {
        const newSubtotal = formatMoney(cart.total_price)
        const newTotal = formatMoney(cart.total_price)
        const newItemCount = cart.item_count
        const newSubtotalValue = cart.total_price / 100

        // Batch state updates for smoother animations
        setCartSubtotal(newSubtotal)
        setCartTotal(newTotal)
        setItemCount(newItemCount)
        setSubtotalValue(newSubtotalValue)

        // Update individual item prices if they've changed
        if (cart.items) {
          setCartItems(prev =>
            prev.map(item => {
              const updatedItem = cart.items.find((cartItem: any) => cartItem.key === item.id)
              if (updatedItem) {
                return {
                  ...item,
                  price: formatMoney(updatedItem.price),
                  priceRaw: updatedItem.price,
                  quantity: updatedItem.quantity,
                  linePrice: formatMoney(updatedItem.line_price),
                  linePriceRaw: updatedItem.line_price
                }
              }
              return item
            })
          )
        }
      }
    }

    window.addEventListener('cart:updated', handleCartUpdate as EventListener)

    return () => {
      window.removeEventListener('cart:updated', handleCartUpdate as EventListener)
    }
  }, [])

  // Extract currency symbol from Shopify money format
  const getCurrencySymbol = (format: string): string => {
    // Remove {{amount}} and common formatting to get symbol
    return format.replace(/\{\{amount\}\}/g, '').replace(/\s/g, '').trim()
  }

  // Format money helper function
  const formatMoney = (cents: number): string => {
    const currencyCode = currency?.code || shopCurrency?.code || 'USD'

    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      }).format(cents / 100)
    } catch (error) {
      // Fallback if currency code is invalid
      console.warn(`Invalid currency code: ${currencyCode}, falling back to USD`)
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(cents / 100)
    }
  }

  const handleItemQuantityChange = (itemId: string, newQuantity: number) => {
    // This will be handled by the cart:updated event
    console.log('Item quantity changed:', itemId, newQuantity)
  }

  const handleItemRemove = (itemId: string) => {
    // This will be handled by the cart:updated event
    console.log('Item removed:', itemId)
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${className}`}>
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <AnimatePresence mode="popLayout">
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <VersaCartItem
                id={item.id}
                title={item.title}
                variant={item.variant}
                price={item.price}
                priceRaw={item.priceRaw}
                quantity={item.quantity}
                linePrice={item.linePrice}
                linePriceRaw={item.linePriceRaw}
                imageUrl={item.imageUrl}
                productUrl={item.productUrl}
                removeUrl={item.removeUrl}
                currency={currency}
                onQuantityChange={(newQuantity) => handleItemQuantityChange(item.id, newQuantity)}
                onRemove={() => handleItemRemove(item.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {cartItems.length === 0 && <VersaEmptyCart />}
      </div>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <motion.div 
          className="lg:col-span-1"
          layout
          transition={{ duration: 0.3 }}
        >
          <VersaCartSummary
            subtotal={cartSubtotal}
            total={cartTotal}
            itemCount={itemCount}
            freeShippingThreshold={freeShippingThreshold}
            currentSubtotal={subtotalValue}
          />
        </motion.div>
      )}
    </div>
  )
}
