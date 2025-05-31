import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'

interface VersaEmptyCartProps {
  className?: string
  showRecommendations?: boolean
}

// Empty Cart Illustration SVG Component
const EmptyCartIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Circle */}
    <circle cx="200" cy="150" r="120" fill="currentColor" opacity="0.05" />
    
    {/* Shopping Cart */}
    <g transform="translate(120, 80)">
      {/* Cart Body */}
      <path
        d="M20 40 L140 40 L130 120 L30 120 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
      
      {/* Cart Handle */}
      <path
        d="M20 40 L10 40 L5 20 L0 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.3"
      />
      
      {/* Cart Wheels */}
      <circle cx="50" cy="140" r="8" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.3" />
      <circle cx="110" cy="140" r="8" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.3" />
      
      {/* Empty indicator - dotted lines inside cart */}
      <g opacity="0.2">
        <line x1="40" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
        <line x1="40" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
        <line x1="40" y1="100" x2="110" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
      </g>
    </g>
    
    {/* Floating Hearts */}
    <g opacity="0.15">
      <g transform="translate(280, 60)">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="currentColor"
          transform="scale(0.6)"
        />
      </g>
      <g transform="translate(80, 50)">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="currentColor"
          transform="scale(0.4)"
        />
      </g>
    </g>
    
    {/* Floating Elements */}
    <g opacity="0.2">
      <circle cx="320" cy="120" r="3" fill="currentColor" />
      <circle cx="60" cy="200" r="2" fill="currentColor" />
      <circle cx="340" cy="200" r="2.5" fill="currentColor" />
      <circle cx="80" cy="80" r="2" fill="currentColor" />
    </g>
    
    {/* Shopping Bag Outline */}
    <g transform="translate(260, 160)" opacity="0.1">
      <path
        d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2h3c.6 0 1 .4 1 1v11c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h3zm2-2v2h4V4h-4z"
        fill="currentColor"
        transform="scale(1.5)"
      />
    </g>
  </svg>
)

export const VersaEmptyCart: React.FC<VersaEmptyCartProps> = ({
  className = '',
  showRecommendations = true,
}) => {
  return (
    <motion.div
      className={`bg-card-bg rounded-2xl border border-border p-12 text-center ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md mx-auto">
        {/* Illustration */}
        <motion.div
          className="w-32 h-24 mx-auto mb-8 text-primary/40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EmptyCartIllustration className="w-full h-full" />
        </motion.div>
        
        {/* Heading */}
        <motion.h2
          className="text-2xl font-heading font-bold text-primary mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Your cart is empty
        </motion.h2>
        
        {/* Description */}
        <motion.p
          className="text-neutral mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
        </motion.p>
        
        {/* Action Button */}
        <motion.a
          href="/collections/all"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-medium
                   hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Shopping
          <ArrowRight className="w-4 h-4" />
        </motion.a>
        
        {/* Quick Links */}
        {showRecommendations && (
          <motion.div
            className="pt-6 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-sm text-neutral/60 mb-4">Popular categories:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { name: 'New Arrivals', href: '/collections/new-arrivals' },
                { name: 'Best Sellers', href: '/collections/best-sellers' },
                { name: 'Sale Items', href: '/collections/sale' },
                { name: 'Gift Cards', href: '/products/gift-card' }
              ].map((category, index) => (
                <motion.a
                  key={category.name}
                  href={category.href}
                  className="px-3 py-1 text-sm bg-light-bg text-neutral rounded-full hover:bg-primary/10 
                           hover:text-primary transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {category.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Additional Features */}
        <motion.div
          className="mt-8 pt-6 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-neutral/70">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Easy Returns</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
