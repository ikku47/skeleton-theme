import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

interface ProductQuantitySelectorProps {
  initialQuantity?: number
  minQuantity?: number
  maxQuantity?: number
  onQuantityChange?: (quantity: number) => void
  disabled?: boolean
  className?: string
}

export const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  initialQuantity = 1,
  minQuantity = 1,
  maxQuantity = 99,
  onQuantityChange,
  disabled = false,
  className = '',
}) => {
  const [quantity, setQuantity] = useState(initialQuantity)

  useEffect(() => {
    setQuantity(initialQuantity)
  }, [initialQuantity])

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(minQuantity, Math.min(maxQuantity, newQuantity))
    setQuantity(clampedQuantity)
    onQuantityChange?.(clampedQuantity)

    // Dispatch event for other components to listen
    window.dispatchEvent(new CustomEvent('quantity:changed', {
      detail: { quantity: clampedQuantity }
    }))
  }

  const increment = () => {
    if (quantity < maxQuantity && !disabled) {
      handleQuantityChange(quantity + 1)
    }
  }

  const decrement = () => {
    if (quantity > minQuantity && !disabled) {
      handleQuantityChange(quantity - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || minQuantity
    handleQuantityChange(value)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
        Quantity
      </label>
      <div className="flex items-center">
        {/* Decrement Button */}
        <motion.button
          type="button"
          onClick={decrement}
          disabled={disabled || quantity <= minQuantity}
          className={`p-2 border border-r-0 rounded-l-lg transition-colors ${
            disabled || quantity <= minQuantity
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          }`}
          whileHover={!disabled && quantity > minQuantity ? { scale: 1.05 } : {}}
          whileTap={!disabled && quantity > minQuantity ? { scale: 0.95 } : {}}
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </motion.button>

        {/* Quantity Input */}
        <input
          type="number"
          name="quantity"
          id="quantity"
          min={minQuantity}
          max={maxQuantity}
          value={quantity}
          onChange={handleInputChange}
          disabled={disabled}
          className={`w-16 px-3 py-2 border-t border-b text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
            disabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-900'
          }`}
        />

        {/* Increment Button */}
        <motion.button
          type="button"
          onClick={increment}
          disabled={disabled || quantity >= maxQuantity}
          className={`p-2 border border-l-0 rounded-r-lg transition-colors ${
            disabled || quantity >= maxQuantity
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          }`}
          whileHover={!disabled && quantity < maxQuantity ? { scale: 1.05 } : {}}
          whileTap={!disabled && quantity < maxQuantity ? { scale: 0.95 } : {}}
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </motion.button>
      </div>

      {/* Quantity Info */}
      <div className="text-xs text-gray-500">
        {maxQuantity < 99 && (
          <span>Maximum {maxQuantity} items</span>
        )}
      </div>
    </div>
  )
}
