import React from 'react'

// Import shared components
import { AnimatedButton } from './AnimatedButton'
import { IconButton } from './IconButton'
import { AddToCartButton } from './AddToCartButton'
import { ProductCard } from './ProductCard'
import { CollectionCard } from './CollectionCard'
import { ContentCard } from './ContentCard'
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
import { VersaSearchForm } from '../versa/VersaSearchForm'
import { VersaProductFilter } from '../versa/VersaProductFilter'
import { VersaCollectionPage } from '../versa/VersaCollectionPage'
import { VersaSearchPage } from '../versa/VersaSearchPage'
import { VersaSearchResults } from '../versa/VersaSearchResults'
import { VersaContactPage } from '../versa/VersaContactPage'
import { VersaCartItem } from '../versa/VersaCartItem'
import { VersaCartSummary } from '../versa/VersaCartSummary'
import { VersaCartManager } from '../versa/VersaCartManager'
import { VersaEmptyCart } from '../versa/VersaEmptyCart'

// Import new Elegant Design System components
import { VersaButton, VersaPrimaryButton, VersaSecondaryButton, VersaOutlineButton, VersaAccentButton } from '../versa/VersaButton'
import { VersaProductCard, VersaFeaturedProductCard, VersaCompactProductCard } from '../versa/VersaProductCard'
import { VersaSectionHeader, VersaCenteredSectionHeader, VersaLeftAlignedSectionHeader, VersaHeroSectionHeader, VersaSplitSection } from '../versa/VersaSectionHeader'
import { VersaElegantHero, VersaFullScreenHero, VersaCompactHero, VersaLeftAlignedHero } from '../versa/VersaElegantHero'

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
import { VersaQuickView } from '../versa/VersaQuickView'
import { VersaQuickViewExample } from '../versa/VersaQuickViewExample'
import { VersaQuickViewDebug } from '../versa/VersaQuickViewDebug'

// Component registry for dynamic loading
export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  // Existing components
  HeroSection,
  AnimatedButton,
  IconButton,
  AddToCartButton,
  ProductCard,
  CollectionCard,
  ContentCard,
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
  VersaSearchForm,
  VersaSearchResults,
  VersaProductFilter,
  VersaCollectionPage,
  VersaSearchPage,
  VersaContactPage,
  VersaCartItem,
  VersaCartSummary,
  VersaCartManager,
  VersaEmptyCart,
  EnhancedProductGallery,
  EnhancedProductDetails,
  EnhancedVariantSelector,
  CartNotification,
  NotificationContainer,
  CartProvider,

  // New Elegant Design System components
  VersaButton,
  VersaPrimaryButton,
  VersaSecondaryButton,
  VersaOutlineButton,
  VersaAccentButton,
  VersaProductCard,
  VersaFeaturedProductCard,
  VersaCompactProductCard,
  VersaSectionHeader,
  VersaCenteredSectionHeader,
  VersaLeftAlignedSectionHeader,
  VersaHeroSectionHeader,
  VersaSplitSection,
  VersaElegantHero,
  VersaFullScreenHero,
  VersaCompactHero,
  VersaLeftAlignedHero,
  VersaQuickView,
  VersaQuickViewExample,
  VersaQuickViewDebug,
}

// Type for component names
export type ComponentName = keyof typeof ComponentRegistry
