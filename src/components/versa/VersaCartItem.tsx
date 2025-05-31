import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Trash2, AlertCircle } from 'lucide-react'

interface Currency {
  code: string
  symbol: string
  name?: string
}

interface VersaCartItemProps {
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
  currency?: Currency
  onQuantityChange?: (newQuantity: number) => void
  onRemove?: () => void
  className?: string
}

export const VersaCartItem: React.FC<VersaCartItemProps> = ({
  id,
  title,
  variant,
  price,
  priceRaw,
  quantity: initialQuantity,
  linePrice: initialLinePrice,
  linePriceRaw,
  imageUrl,
  productUrl,
  removeUrl,
  currency,
  onQuantityChange,
  onRemove,
  className = '',
}) => {
  const [currentQuantity, setCurrentQuantity] = useState(initialQuantity)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lineTotal, setLineTotal] = useState('')

  // Calculate line total (price × quantity)
  const calculateLineTotal = (priceStr: string, qty: number) => {
    try {
      // If we have raw price data, use that for more accurate calculation
      if (priceRaw) {
        const totalCents = priceRaw * qty
        const currencyCode = currency?.code || 'USD'

        try {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
          }).format(totalCents / 100)
        } catch (error) {
          console.warn(`Invalid currency code: ${currencyCode}, falling back to USD`)
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(totalCents / 100)
        }
      }

      // Fallback: Extract numeric value from price string (e.g., "$19.99" -> 19.99)
      const numericPrice = parseFloat(priceStr.replace(/[^0-9.-]+/g, ''))
      const total = numericPrice * qty
      const currencyCode = currency?.code || 'USD'

      try {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currencyCode,
        }).format(total)
      } catch (error) {
        console.warn(`Invalid currency code: ${currencyCode}, falling back to USD`)
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(total)
      }
    } catch {
      return priceStr
    }
  }

  // Update line total when quantity or price changes
  useEffect(() => {
    // Use provided linePrice if available, otherwise calculate
    if (initialLinePrice && currentQuantity === initialQuantity) {
      setLineTotal(initialLinePrice)
    } else {
      setLineTotal(calculateLineTotal(price, currentQuantity))
    }
  }, [price, currentQuantity, initialLinePrice, initialQuantity])

  // Sync with prop changes
  useEffect(() => {
    setCurrentQuantity(initialQuantity)
  }, [initialQuantity])

  const handleQuantityChange = async (change: number) => {
    const newQuantity = Math.max(0, currentQuantity + change)

    if (newQuantity === 0) {
      handleRemove()
      return
    }

    setIsUpdating(true)
    setError(null)

    // Optimistic update for immediate feedback
    const previousQuantity = currentQuantity
    setCurrentQuantity(newQuantity)

    try {
      // Update quantity via Shopify Cart API
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          quantity: newQuantity,
        }),
      })

      if (response.ok) {
        const updatedCart = await response.json()

        // Notify parent component
        if (onQuantityChange) {
          onQuantityChange(newQuantity)
        }

        // Dispatch cart updated event for other components
        window.dispatchEvent(new CustomEvent('cart:updated', {
          detail: { cart: updatedCart, itemId: id, newQuantity }
        }))
      } else {
        const errorData = await response.json()
        console.error('Failed to update cart:', errorData)
        setError(errorData.message || 'Failed to update cart')
        throw new Error(errorData.message || 'Failed to update cart')
      }
    } catch (error) {
      console.error('Failed to update quantity:', error)
      // Revert optimistic update on error
      setCurrentQuantity(previousQuantity)
      setError(error instanceof Error ? error.message : 'Failed to update quantity')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    setIsRemoving(true)
    setError(null)

    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          quantity: 0,
        }),
      })

      if (response.ok) {
        const updatedCart = await response.json()

        // Notify parent component
        if (onRemove) {
          onRemove()
        }

        // Dispatch cart updated event
        window.dispatchEvent(new CustomEvent('cart:updated', {
          detail: { cart: updatedCart, itemId: id, removed: true }
        }))
      } else {
        const errorData = await response.json()
        console.error('Failed to remove item:', errorData)
        setError(errorData.message || 'Failed to remove item')
        throw new Error(errorData.message || 'Failed to remove item')
      }
    } catch (error) {
      console.error('Failed to remove item:', error)
      setError(error instanceof Error ? error.message : 'Failed to remove item')
      setIsRemoving(false)
    }
  }

  return (
    <motion.div
      className={`relative bg-card-bg rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300 ${className}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        {/* Product Image & Info */}
        <div className="md:col-span-2 flex items-center gap-4">
          <div className="w-20 h-20 bg-light-bg rounded-lg overflow-hidden flex-shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-light-bg flex items-center justify-center">
                <span className="text-neutral text-xs">No image</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-primary mb-1 line-clamp-2">
              <a href={productUrl} className="hover:text-secondary transition-colors">
                {title}
              </a>
            </h3>
            {variant && (
              <p className="text-sm text-neutral">{variant}</p>
            )}
            <div className="mt-2 space-y-1">
              <p className="text-sm text-neutral">
                {price} each
              </p>
              <motion.p
                className="text-lg font-semibold text-primary"
                key={lineTotal}
                initial={{ scale: 1.1, color: '#10b981' }}
                animate={{ scale: 1, color: 'inherit' }}
                transition={{ duration: 0.3 }}
              >
                {lineTotal}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex justify-center">
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <motion.button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={isUpdating || isRemoving || currentQuantity <= 1}
              className="p-2 hover:bg-light-bg transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Minus className="w-4 h-4 text-neutral" />
            </motion.button>

            <div className="px-4 py-2 min-w-[3rem] text-center font-medium text-primary">
              {currentQuantity}
            </div>

            <motion.button
              type="button"
              onClick={() => handleQuantityChange(1)}
              disabled={isUpdating || isRemoving}
              className="p-2 hover:bg-light-bg transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4 text-neutral" />
            </motion.button>
          </div>
        </div>

        {/* Remove Button */}
        <div className="flex justify-center">
          <motion.button
            onClick={handleRemove}
            disabled={isRemoving || isUpdating}
            className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors disabled:opacity-50"
            title="Remove item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRemoving ? 'Removing...' : 'Remove'}
          </motion.button>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700 transition-colors"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {isUpdating && (
        <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </motion.div>
  )
}
