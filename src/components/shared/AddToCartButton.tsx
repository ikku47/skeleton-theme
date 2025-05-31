import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'
import { cartUtils } from './CartManager'
import { notificationManager } from './CartNotification'

interface AddToCartButtonProps {
  variantId?: string
  quantity?: number
  available?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'accent' | 'outline'
  fullWidth?: boolean
  className?: string
  children?: React.ReactNode
  onAddToCart?: () => void | Promise<void>
  disabled?: boolean
  showIcon?: boolean
  loadingText?: string
  successText?: string
  unavailableText?: string
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  variantId,
  quantity = 1,
  available = true,
  size = 'md',
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  onAddToCart,
  disabled = false,
  showIcon = true,
  loadingText = 'Adding...',
  successText = 'Added!',
  unavailableText = 'Out of Stock',
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // If custom handler is provided, use it
    if (onAddToCart) {
      setIsLoading(true)
      try {
        await onAddToCart()
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 2000)
      } catch (error) {
        console.error('Add to cart failed:', error)
      } finally {
        setIsLoading(false)
      }
      return
    }

    // Otherwise use built-in cart functionality
    if (!variantId) {
      notificationManager.error('Product variant not available')
      return
    }

    if (!available) {
      notificationManager.error('This product is currently out of stock')
      return
    }

    setIsLoading(true)

    try {
      const success = await cartUtils.addToCart(variantId, quantity)

      if (success) {
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 2000)
      } else {
        throw new Error('Failed to add to cart')
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
      notificationManager.error('Failed to add item to cart. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  }

  // Variant classes
  const variantClasses = {
    primary: {
      default: 'bg-primary text-white hover:bg-blue-700',
      success: 'bg-green-600 text-white',
      disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
    },
    accent: {
      default: 'bg-accent text-primary hover:bg-yellow-400',
      success: 'bg-green-600 text-white',
      disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
    },
    outline: {
      default: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      success: 'border-2 border-green-600 bg-green-600 text-white',
      disabled: 'border-2 border-gray-300 text-gray-500 cursor-not-allowed',
    },
  }

  // Determine current state
  const isDisabled = disabled || !available || isLoading
  const currentVariant = isSuccess 
    ? variantClasses[variant].success 
    : isDisabled 
    ? variantClasses[variant].disabled 
    : variantClasses[variant].default

  // Icon size based on button size
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 20

  // Button content
  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 size={iconSize} />
          </motion.div>
          {loadingText}
        </>
      )
    }

    if (isSuccess) {
      return (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Check size={iconSize} />
          </motion.div>
          {successText}
        </>
      )
    }

    if (!available) {
      return unavailableText
    }

    return (
      <>
        {showIcon && <ShoppingCart size={iconSize} />}
        {children || 'Add to Cart'}
      </>
    )
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded-lg
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        ${sizeClasses[size]}
        ${currentVariant}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {getButtonContent()}
    </motion.button>
  )
}
