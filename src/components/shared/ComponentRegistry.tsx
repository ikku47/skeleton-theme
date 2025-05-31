import React from 'react'

// Import shared components
import { AnimatedButton } from './AnimatedButton'
import { IconButton } from './IconButton'
import { ProductCard } from './ProductCard'
import { CollectionCard } from './CollectionCard'
import { FeatureCallouts } from './FeatureCallouts'
import { FeaturedProductShowcase } from './FeaturedProductShowcase'
import { AccessoriesCarousel } from './AccessoriesCarousel'
import { TestimonialsSection } from './TestimonialsSection'
import { CartNotification, NotificationContainer } from './CartNotification'
import { CartProvider } from './CartManager'

// Import VersaCommerce components
import { VersaHeader } from '../versa/VersaHeader'
import { VersaHeroSection } from '../versa/VersaHeroSection'
import { VersaProductGrid } from '../versa/VersaProductGrid'
import { VersaNewsletter } from '../versa/VersaNewsletter'
import { VersaProductGallery } from '../versa/VersaProductGallery'
import { VersaProductDetails } from '../versa/VersaProductDetails'
import { VersaPageHeader } from '../versa/VersaPageHeader'
import { VersaCollectionGrid } from '../versa/VersaCollectionGrid'
import { VersaBlogGrid } from '../versa/VersaBlogGrid'
import { VersaCartDrawer } from '../versa/VersaCartDrawer'
import { VersaFooter } from '../versa/VersaFooter'

// Import legacy components
import { HeroSection } from '../legacy/HeroSection'
import { ProductImageGallery } from '../legacy/ProductImageGallery'
import { ProductInfo } from '../legacy/ProductInfo'
import { ProductVariantSelector } from '../legacy/ProductVariantSelector'
import { ProductQuantitySelector } from '../legacy/ProductQuantitySelector'
import { ProductActions } from '../legacy/ProductActions'
import { ProductBreadcrumbs } from '../legacy/ProductBreadcrumbs'
import { RelatedProducts } from '../legacy/RelatedProducts'
import { ProductReviews } from '../legacy/ProductReviews'
import { EnhancedProductGallery } from '../legacy/EnhancedProductGallery'
import { EnhancedProductDetails } from '../legacy/EnhancedProductDetails'
import { EnhancedVariantSelector } from '../legacy/EnhancedVariantSelector'

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
  CartNotification,
  NotificationContainer,
  CartProvider,
}

// Type for component names
export type ComponentName = keyof typeof ComponentRegistry
