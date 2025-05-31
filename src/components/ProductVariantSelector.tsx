import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface ProductVariant {
  id: string
  title: string
  price: string
  available: boolean
  options?: { [key: string]: string }
}

interface ProductVariantSelectorProps {
  variants: ProductVariant[]
  selectedVariantId?: string
  onVariantChange: (variantId: string) => void
  className?: string
}

export const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
  variants,
  selectedVariantId,
  onVariantChange,
  className = '',
}) => {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    selectedVariantId || (variants.length > 0 ? variants[0].id : '')
  )

  useEffect(() => {
    if (selectedVariantId && selectedVariantId !== selectedVariant) {
      setSelectedVariant(selectedVariantId)
    }
  }, [selectedVariantId])

  const handleVariantChange = (variantId: string) => {
    setSelectedVariant(variantId)
    onVariantChange(variantId)
  }

  // If only one variant, don't show selector
  if (variants.length <= 1) {
    return (
      <input 
        type="hidden" 
        name="id" 
        value={variants[0]?.id || ''} 
      />
    )
  }

  // Group variants by option types (size, color, etc.)
  const optionTypes = new Set<string>()
  variants.forEach(variant => {
    if (variant.options) {
      Object.keys(variant.options).forEach(option => optionTypes.add(option))
    }
  })

  // If we have structured options, render as option groups
  if (optionTypes.size > 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from(optionTypes).map(optionType => {
          const optionValues = new Set<string>()
          variants.forEach(variant => {
            if (variant.options && variant.options[optionType]) {
              optionValues.add(variant.options[optionType])
            }
          })

          const currentVariant = variants.find(v => v.id === selectedVariant)
          const currentValue = currentVariant?.options?.[optionType] || ''

          return (
            <div key={optionType} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {optionType}
              </label>
              <div className="flex flex-wrap gap-2">
                {Array.from(optionValues).map(value => {
                  const variantForValue = variants.find(v => 
                    v.options && v.options[optionType] === value
                  )
                  const isSelected = currentValue === value
                  const isAvailable = variantForValue?.available || false

                  return (
                    <motion.button
                      key={value}
                      type="button"
                      onClick={() => {
                        if (variantForValue && isAvailable) {
                          handleVariantChange(variantForValue.id)
                        }
                      }}
                      disabled={!isAvailable}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                        isSelected
                          ? 'border-primary bg-primary text-white'
                          : isAvailable
                          ? 'border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary'
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      whileHover={isAvailable ? { scale: 1.02 } : {}}
                      whileTap={isAvailable ? { scale: 0.98 } : {}}
                    >
                      {value}
                      {!isAvailable && (
                        <span className="ml-1 text-xs">(Sold out)</span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )
        })}
        <input type="hidden" name="id" value={selectedVariant} />
      </div>
    )
  }

  // Fallback to dropdown selector
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor="variant-select" className="block text-sm font-medium text-gray-700">
        Variant
      </label>
      <div className="relative">
        <select
          name="id"
          id="variant-select"
          value={selectedVariant}
          onChange={(e) => handleVariantChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-white pr-10"
        >
          {variants.map((variant) => (
            <option
              key={variant.id}
              value={variant.id}
              disabled={!variant.available}
            >
              {variant.title} - {variant.price}
              {!variant.available ? ' (Sold out)' : ''}
            </option>
          ))}
        </select>
        <ChevronDown 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
          size={16} 
        />
      </div>
    </div>
  )
}
