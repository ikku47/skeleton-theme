import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface ProductVariant {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  available: boolean
  options: Record<string, string>
  inventory_quantity?: number
  inventory_policy?: string
  featured_image?: {
    url: string
    alt: string
  }
}

interface ProductOption {
  name: string
  values: string[]
}

interface EnhancedVariantSelectorProps {
  product: {
    variants: ProductVariant[]
    options: ProductOption[]
  }
  selectedOptions: Record<string, string>
  onOptionChange: (optionName: string, value: string) => void
  isOptionValueAvailable: (optionName: string, value: string) => boolean
  className?: string
}

export const EnhancedVariantSelector: React.FC<EnhancedVariantSelectorProps> = ({
  product,
  selectedOptions,
  onOptionChange,
  isOptionValueAvailable,
  className = '',
}) => {

  // Color mapping for common color names
  const colorMap: Record<string, string> = {
    'black': '#000000',
    'white': '#ffffff',
    'red': '#ef4444',
    'blue': '#3b82f6',
    'green': '#10b981',
    'yellow': '#f59e0b',
    'purple': '#8b5cf6',
    'pink': '#ec4899',
    'gray': '#6b7280',
    'grey': '#6b7280',
    'brown': '#92400e',
    'orange': '#f97316',
    'navy': '#1e3a8a',
    'beige': '#f5f5dc',
    'cream': '#fffdd0',
    'silver': '#c0c0c0',
    'gold': '#ffd700',
  }

  const getColorValue = (colorName: string | null | undefined): string | null => {
    if (!colorName || typeof colorName !== 'string') {
      return null
    }
    const normalizedName = colorName.toLowerCase().trim()
    return colorMap[normalizedName] || null
  }

  const isColorOption = (option: ProductOption): boolean => {
    const optionName = option?.name
    if (typeof optionName !== 'string') {
      console.warn('Invalid option name:', option)
      return false
    }
    return optionName.toLowerCase().includes('color') ||
           optionName.toLowerCase().includes('colour')
  }

  const renderColorOption = (option: ProductOption) => {
    return (
      <div key={option.name}>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {option.name}: <span className="font-normal">{selectedOptions[option.name]}</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {option.values.filter(value => value !== null && value !== undefined).map((value) => {
            const isSelected = selectedOptions[option.name] === value
            const isAvailable = isOptionValueAvailable(option.name, value)
            const colorValue = getColorValue(value)
            
            return (
              <motion.button
                key={value}
                onClick={() => isAvailable && onOptionChange(option.name, value)}
                disabled={!isAvailable}
                className={`relative w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-yellow-400 shadow-lg'
                    : isAvailable
                    ? 'border-gray-300 hover:border-gray-400'
                    : 'border-gray-200 cursor-not-allowed'
                }`}
                style={{
                  backgroundColor: colorValue || '#f3f4f6',
                  opacity: isAvailable ? 1 : 0.5
                }}
                whileHover={isAvailable ? { scale: 1.1 } : {}}
                whileTap={isAvailable ? { scale: 0.95 } : {}}
                title={value}
              >
                {/* White border for light colors */}
                {colorValue && (colorValue === '#ffffff' || colorValue === '#fffdd0' || colorValue === '#f5f5dc') && (
                  <div className="absolute inset-1 rounded-full border border-gray-200"></div>
                )}
                
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check 
                      className={`w-4 h-4 ${
                        colorValue === '#ffffff' || colorValue === '#fffdd0' || colorValue === '#f5f5dc'
                          ? 'text-gray-800' 
                          : 'text-white'
                      }`} 
                    />
                  </div>
                )}
                
                {/* Unavailable indicator */}
                {!isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-0.5 bg-gray-400 transform rotate-45"></div>
                  </div>
                )}
                
                {/* Fallback text for colors without mapping */}
                {!colorValue && (
                  <span className={`text-xs font-medium ${
                    isAvailable ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {value.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    )
  }

  const renderStandardOption = (option: ProductOption) => {
    return (
      <div key={option.name}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {option.name}
        </label>
        <div className="flex flex-wrap gap-2">
          {option.values.filter(value => value !== null && value !== undefined).map((value) => {
            const isSelected = selectedOptions[option.name] === value
            const isAvailable = isOptionValueAvailable(option.name, value)
            
            return (
              <motion.button
                key={value}
                onClick={() => isAvailable && onOptionChange(option.name, value)}
                disabled={!isAvailable}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  isSelected
                    ? 'border-yellow-400 bg-yellow-50 text-yellow-800'
                    : isAvailable
                    ? 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={isAvailable ? { scale: 1.02 } : {}}
                whileTap={isAvailable ? { scale: 0.98 } : {}}
              >
                {value}
                {!isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gray-400 transform rotate-45"></div>
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    )
  }

  // Filter out options with no valid values
  const validOptions = product.options.filter(option =>
    option &&
    option.name &&
    option.values &&
    option.values.some(value => value !== null && value !== undefined && value !== '')
  )

  if (validOptions.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`space-y-6 ${className}`}
    >
      {validOptions.map((option) =>
        isColorOption(option) ? renderColorOption(option) : renderStandardOption(option)
      )}
    </motion.div>
  )
}
