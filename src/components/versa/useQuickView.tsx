import { useState, useCallback } from 'react'

interface QuickViewProduct {
  id: string
  title: string
  vendor?: string
  price: string
  compareAtPrice?: string
  description: string
  images: Array<{
    url: string
    alt?: string
  }>
  variants: Array<{
    id: string
    title: string
    price: string
    compareAtPrice?: string
    available: boolean
    options: Record<string, string>
  }>
  options: Array<{
    name: string
    values: string[]
  }>
  tags?: string[]
  productUrl: string
}

interface UseQuickViewReturn {
  isOpen: boolean
  product: QuickViewProduct | null
  openQuickView: (product: QuickViewProduct) => void
  closeQuickView: () => void
}

export const useQuickView = (): UseQuickViewReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<QuickViewProduct | null>(null)

  const openQuickView = useCallback((productData: QuickViewProduct) => {
    setProduct(productData)
    setIsOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }, [])

  const closeQuickView = useCallback(() => {
    setIsOpen(false)
    setProduct(null)
    // Restore body scroll
    document.body.style.overflow = 'unset'
  }, [])

  return {
    isOpen,
    product,
    openQuickView,
    closeQuickView,
  }
}

// Helper function to transform Shopify product data to QuickView format
export const transformProductForQuickView = (shopifyProduct: any): QuickViewProduct => {
  return {
    id: shopifyProduct.id,
    title: shopifyProduct.title,
    vendor: shopifyProduct.vendor,
    price: shopifyProduct.price,
    compareAtPrice: shopifyProduct.compare_at_price,
    description: shopifyProduct.description || shopifyProduct.excerpt || '',
    images: shopifyProduct.images?.map((img: any) => ({
      url: img.url || img.src,
      alt: img.alt || shopifyProduct.title,
    })) || [],
    variants: shopifyProduct.variants?.map((variant: any) => ({
      id: variant.id,
      title: variant.title,
      price: variant.price,
      compareAtPrice: variant.compare_at_price,
      available: variant.available,
      options: variant.options || {},
    })) || [],
    options: shopifyProduct.options?.map((option: any) => ({
      name: option.name,
      values: option.values || [],
    })) || [],
    tags: shopifyProduct.tags || [],
    productUrl: shopifyProduct.url || `/products/${shopifyProduct.handle}`,
  }
}

// Context for managing quick view across the app
import React, { createContext, useContext } from 'react'

interface QuickViewContextType {
  isOpen: boolean
  product: QuickViewProduct | null
  openQuickView: (product: QuickViewProduct) => void
  closeQuickView: () => void
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined)

export const QuickViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const quickView = useQuickView()

  return (
    <QuickViewContext.Provider value={quickView}>
      {children}
    </QuickViewContext.Provider>
  )
}

export const useQuickViewContext = () => {
  const context = useContext(QuickViewContext)
  if (context === undefined) {
    // Instead of throwing an error, return a fallback context
    console.warn('useQuickViewContext called outside of QuickViewProvider, returning fallback')
    return {
      isOpen: false,
      product: null,
      openQuickView: () => console.warn('QuickView not available'),
      closeQuickView: () => console.warn('QuickView not available')
    }
  }
  return context
}
