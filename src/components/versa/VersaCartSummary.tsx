import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, Shield, CreditCard } from 'lucide-react'

interface VersaCartSummaryProps {
  subtotal: string
  shipping?: string
  tax?: string
  total: string
  itemCount: number
  freeShippingThreshold?: number
  currentSubtotal?: number
  className?: string
}

export const VersaCartSummary: React.FC<VersaCartSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  total,
  itemCount,
  freeShippingThreshold = 50,
  currentSubtotal = 0,
  className = '',
}) => {
  const [previousSubtotal, setPreviousSubtotal] = useState(subtotal)
  const [previousTotal, setPreviousTotal] = useState(total)
  const [isUpdating, setIsUpdating] = useState(false)

  const freeShippingProgress = Math.min((currentSubtotal / freeShippingThreshold) * 100, 100)
  const remainingForFreeShipping = Math.max(freeShippingThreshold - currentSubtotal, 0)

  // Detect changes in totals for animation
  useEffect(() => {
    if (subtotal !== previousSubtotal || total !== previousTotal) {
      setIsUpdating(true)
      const timer = setTimeout(() => {
        setIsUpdating(false)
        setPreviousSubtotal(subtotal)
        setPreviousTotal(total)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [subtotal, total, previousSubtotal, previousTotal])

  return (
    <motion.div
      className={`bg-card-bg rounded-2xl border border-border p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Free Shipping Progress */}
      {remainingForFreeShipping > 0 && (
        <div className="mb-6 p-4 bg-accent/10 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary">
              ${remainingForFreeShipping.toFixed(2)} away from free shipping!
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <motion.div
              className="bg-accent h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${freeShippingProgress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="space-y-4 mb-6">
        <h3 className="font-heading text-xl font-bold text-primary">
          Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-neutral">Subtotal</span>
            <motion.span
              className="font-semibold text-primary"
              key={subtotal}
              initial={{ scale: 1.1, color: '#10b981' }}
              animate={{ scale: 1, color: 'inherit' }}
              transition={{ duration: 0.3 }}
            >
              {subtotal}
            </motion.span>
          </div>

          {shipping && (
            <div className="flex justify-between items-center">
              <span className="text-neutral">Shipping</span>
              <span className="font-semibold text-primary">{shipping}</span>
            </div>
          )}

          {tax && (
            <div className="flex justify-between items-center">
              <span className="text-neutral">Tax</span>
              <span className="font-semibold text-primary">{tax}</span>
            </div>
          )}

          <div className="border-t-2 border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-heading font-bold text-primary">Total</span>
              <motion.span
                className="text-2xl font-bold text-primary"
                key={total}
                initial={{ scale: 1.1, color: '#10b981' }}
                animate={{ scale: 1, color: 'inherit' }}
                transition={{ duration: 0.3 }}
              >
                {total}
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-neutral">Secure Payment</span>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-neutral">Fast Shipping</span>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs text-neutral">Easy Returns</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <form action="/cart" method="post" className="w-full">
          <input type="hidden" name="checkout" value="1" />
          <motion.button
            type="submit"
            className="w-full py-4 bg-primary text-white font-heading font-semibold text-lg rounded-lg hover:bg-secondary transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Checkout
          </motion.button>
        </form>

        <motion.a
          href="/collections/all"
          className="block w-full py-3 text-center text-primary font-medium hover:text-secondary transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          Continue Shopping
        </motion.a>
      </div>
    </motion.div>
  )
}
