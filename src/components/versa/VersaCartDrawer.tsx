import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, Truck, Shield } from 'lucide-react'

interface CartItem {
  id: string
  variantId: string
  title: string
  variant: string
  price: string
  quantity: number
  imageUrl: string
  url: string
}

interface VersaCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  subtotal: string
  shipping?: string
  tax?: string
  total: string
  freeShippingThreshold?: number
  currentSubtotal?: number
  className?: string
}

export const VersaCartDrawer: React.FC<VersaCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  shipping,
  tax,
  total,
  freeShippingThreshold = 50,
  currentSubtotal = 0,
  className = '',
}) => {
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setUpdatingItems(prev => new Set(prev).add(itemId))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log('Update quantity:', itemId, newQuantity)
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  const removeItem = async (itemId: string) => {
    setUpdatingItems(prev => new Set(prev).add(itemId))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      console.log('Remove item:', itemId)
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }
  }

  const freeShippingProgress = Math.min((currentSubtotal / freeShippingThreshold) * 100, 100)
  const remainingForFreeShipping = Math.max(freeShippingThreshold - currentSubtotal, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Drawer */}
          <motion.div
            className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col ${className}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-xl font-semibold text-primary">
                  Shopping Cart ({items.length})
                </h2>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-light-bg rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-neutral" />
              </motion.button>
            </div>

            {/* Free Shipping Progress */}
            {remainingForFreeShipping > 0 && (
              <div className="p-6 bg-light-bg border-b border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-accent" />
                  <p className="text-sm font-medium text-primary">
                    Add ${remainingForFreeShipping.toFixed(2)} more for free shipping!
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-accent h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <ShoppingBag className="w-16 h-16 text-neutral mb-4" />
                  <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-neutral mb-6">
                    Add some products to get started
                  </p>
                  <motion.button
                    onClick={onClose}
                    className="px-6 py-3 bg-accent text-primary font-semibold rounded-cta hover:bg-yellow-400 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex gap-4 p-4 bg-light-bg rounded-lg"
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-white rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-primary text-sm line-clamp-1">
                          <a href={item.url}>{item.title}</a>
                        </h4>
                        {item.variant && (
                          <p className="text-xs text-neutral mt-1">{item.variant}</p>
                        )}
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-border rounded">
                            <motion.button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={updatingItems.has(item.id) || item.quantity <= 1}
                              className="p-1 hover:bg-white transition-colors disabled:opacity-50"
                              whileTap={{ scale: 0.95 }}
                            >
                              <Minus className="w-3 h-3" />
                            </motion.button>
                            <span className="px-2 py-1 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <motion.button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={updatingItems.has(item.id)}
                              className="p-1 hover:bg-white transition-colors disabled:opacity-50"
                              whileTap={{ scale: 0.95 }}
                            >
                              <Plus className="w-3 h-3" />
                            </motion.button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-primary">{item.price}</p>
                            <motion.button
                              onClick={() => removeItem(item.id)}
                              disabled={updatingItems.has(item.id)}
                              className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                              whileHover={{ scale: 1.05 }}
                            >
                              Remove
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                {/* Order Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral">Subtotal</span>
                    <span className="font-medium text-primary">{subtotal}</span>
                  </div>
                  {shipping && (
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral">Shipping</span>
                      <span className="font-medium text-primary">{shipping}</span>
                    </div>
                  )}
                  {tax && (
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral">Tax</span>
                      <span className="font-medium text-primary">{tax}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                    <span className="text-primary">Total</span>
                    <span className="text-primary">{total}</span>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="flex items-center justify-center gap-4 text-xs text-neutral py-2">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>Free Returns</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  className="w-full py-4 bg-primary text-white font-heading font-semibold text-lg rounded-cta hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Checkout
                </motion.button>

                {/* Continue Shopping */}
                <motion.button
                  onClick={onClose}
                  className="w-full py-3 text-primary font-medium hover:text-secondary transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  Continue Shopping
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
