import React from 'react'

// Import essential components
import { HeroSection } from './HeroSection'
import { AnimatedButton } from './AnimatedButton'
import { IconButton } from './IconButton'
import { ProductCard } from './ProductCard'
import { CollectionCard } from './CollectionCard'

// Import product detail components
import { ProductImageGallery } from './ProductImageGallery'
import { ProductInfo } from './ProductInfo'
import { ProductVariantSelector } from './ProductVariantSelector'
import { ProductQuantitySelector } from './ProductQuantitySelector'
import { ProductActions } from './ProductActions'
import { ProductBreadcrumbs } from './ProductBreadcrumbs'
import { RelatedProducts } from './RelatedProducts'
import { ProductReviews } from './ProductReviews'

// Component registry for dynamic loading
export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  HeroSection,
  AnimatedButton,
  IconButton,
  ProductCard,
  CollectionCard,
  ProductImageGallery,
  ProductInfo,
  ProductVariantSelector,
  ProductQuantitySelector,
  ProductActions,
  ProductBreadcrumbs,
  RelatedProducts,
  ProductReviews,
}

// Type for component names
export type ComponentName = keyof typeof ComponentRegistry
