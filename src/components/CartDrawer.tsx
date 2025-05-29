import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'

interface CartItem {
  id: string
  title: string
  price: string
  quantity: number
  imageUrl: string
  variant?: string
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items?: CartItem[]
  onUpdateQuantity?: (id: string, quantity: number) => void
  onRemoveItem?: (id: string) => void
  onCheckout?: () => void
  className?: string
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen: initialIsOpen = false,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen)

  // Listen for global open event
  useEffect(() => {
    const handleOpenDrawer = () => {
      setIsOpen(true)
    }

    document.addEventListener('openCartDrawer', handleOpenDrawer)
    return () => {
      document.removeEventListener('openCartDrawer', handleOpenDrawer)
    }
  }, [])

  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''))
    return sum + (price * item.quantity)
  }, 0)

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
            onClick={() => {
              setIsOpen(false)
              onClose?.()
            }}
          />
          
          {/* Drawer */}
          <motion.div
            className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col ${className}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <h2 className="text-lg font-semibold">Cart ({items.length})</h2>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false)
                  onClose?.()
                }}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex gap-3 p-3 border border-gray-200"
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-16 h-16 object-cover"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        {item.variant && (
                          <p className="text-xs text-gray-500">{item.variant}</p>
                        )}
                        <p className="text-sm font-semibold">{item.price}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))}
                            className="p-1 hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium px-2">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onRemoveItem?.(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>
                
                <motion.button
                  onClick={onCheckout}
                  className="w-full bg-primary text-white py-3 px-4 font-medium hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
