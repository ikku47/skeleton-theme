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

// Import VersaCommerce components
import { VersaHeader } from './VersaHeader'
import { VersaHeroSection } from './VersaHeroSection'
import { FeatureCallouts } from './FeatureCallouts'
import { FeaturedProductShowcase } from './FeaturedProductShowcase'
import { VersaProductGrid } from './VersaProductGrid'
import { AccessoriesCarousel } from './AccessoriesCarousel'
import { TestimonialsSection } from './TestimonialsSection'
import { VersaNewsletter } from './VersaNewsletter'
import { VersaProductGallery } from './VersaProductGallery'
import { VersaProductDetails } from './VersaProductDetails'
import { VersaPageHeader } from './VersaPageHeader'
import { VersaCollectionGrid } from './VersaCollectionGrid'
import { VersaBlogGrid } from './VersaBlogGrid'
import { VersaCartDrawer } from './VersaCartDrawer'
import { VersaFooter } from './VersaFooter'
import { EnhancedProductGallery } from './EnhancedProductGallery'
import { EnhancedProductDetails } from './EnhancedProductDetails'
import { EnhancedVariantSelector } from './EnhancedVariantSelector'

// Component registry for dynamic loading
export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  // Existing components
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

  // VersaCommerce components
  VersaHeader,
  VersaHeroSection,
  FeatureCallouts,
  FeaturedProductShowcase,
  VersaProductGrid,
  AccessoriesCarousel,
  TestimonialsSection,
  VersaNewsletter,
  VersaProductGallery,
  VersaProductDetails,
  VersaPageHeader,
  VersaCollectionGrid,
  VersaBlogGrid,
  VersaCartDrawer,
  VersaFooter,
  EnhancedProductGallery,
  EnhancedProductDetails,
  EnhancedVariantSelector,
}

// Type for component names
export type ComponentName = keyof typeof ComponentRegistry
