import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Eye, Star } from 'lucide-react'
import { AddToCartButton } from '../shared/AddToCartButton'
import { useQuickViewContext, transformProductForQuickView } from './useQuickView'

interface Product {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  imageUrl: string
  imageAlt?: string
  productUrl: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isOnSale?: boolean
  variants?: Array<{
    id: string
    available: boolean
  }>
  // Additional fields for quick view
  vendor?: string
  description?: string
  images?: Array<{
    url: string
    alt?: string
  }>
  options?: Array<{
    name: string
    values: string[]
  }>
  tags?: string[]
  handle?: string
}

interface VersaProductGridProps {
  title?: string
  subtitle?: string
  products: Product[]
  showViewAll?: boolean
  viewAllUrl?: string
  className?: string
  layout?: 'grid' | 'list'
  columns?: 2 | 3 | 4 | 5
}

export const VersaProductGrid: React.FC<VersaProductGridProps> = ({
  title,
  subtitle,
  products,
  showViewAll = false,
  viewAllUrl = '/collections/all',
  className = '',
  layout = 'grid',
  columns = 4,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const getGridClasses = () => {
    if (layout === 'list') {
      return 'space-y-4'
    }

    const columnClasses = {
      2: 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6',
      3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
      4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
      5: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6'
    }

    return columnClasses[columns] || columnClasses[4]
  }

  return (
    <section className={`section-padding bg-white ${className}`}>
      <div className="container">
        {/* Section Header - Only show when explicitly provided (for homepage/standalone use) */}
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {subtitle && (
              <p className="font-body text-neutral text-lg mb-4 uppercase tracking-wide">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="font-heading text-primary text-4xl md:text-5xl font-bold">
                {title}
              </h2>
            )}
          </motion.div>
        )}

        {/* Product Grid */}
        <motion.div
          className={getGridClasses()}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              animationVariants={itemVariants}
              layout={layout}
            />
          ))}
        </motion.div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              href={viewAllUrl}
              className="inline-flex items-center px-8 py-4 border-2 border-primary text-primary font-heading font-semibold text-lg rounded-cta hover:bg-primary hover:text-white transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Products
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Individual Product Card Component
const ProductCard: React.FC<{
  product: Product;
  animationVariants: any;
  layout?: 'grid' | 'list';
}> = ({ product, animationVariants, layout = 'grid' }) => {
  // Get the first available variant from product data
  const firstVariant = product.variants?.find((v: any) => v.available) || product.variants?.[0]

  // Use global quick view function
  const openQuickView = (window as any).globalQuickView?.openQuickView || (() => {
    console.warn('Global QuickView not available, redirecting to product page')
    window.location.href = product.productUrl
  })

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    // Wishlist logic here
    console.log('Toggle wishlist:', product.id)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()

    console.log('Quick view clicked for product:', product.id)

    // Transform product data for quick view
    const quickViewProduct = transformProductForQuickView({
      id: product.id,
      title: product.title,
      vendor: product.vendor,
      price: product.price,
      compare_at_price: product.compareAtPrice,
      description: product.description || '',
      images: product.images || [{ url: product.imageUrl, alt: product.imageAlt }],
      variants: product.variants?.map(v => ({
        id: v.id,
        title: 'Default',
        price: product.price,
        compare_at_price: product.compareAtPrice,
        available: v.available,
        options: {}
      })) || [],
      options: product.options || [],
      tags: product.tags || [],
      url: product.productUrl,
      handle: product.handle || product.id
    })

    console.log('Transformed product for quick view:', quickViewProduct)
    openQuickView(quickViewProduct)
  }

  if (layout === 'list') {
    return (
      <motion.div
        className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex gap-4 p-4"
        variants={animationVariants}
        whileHover={{ y: -2 }}
      >
        {/* Product Image */}
        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
          <motion.img
            src={product.imageUrl}
            alt={product.imageAlt || product.title}
            className="w-full h-full object-scale-down group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="px-1.5 py-0.5 bg-accent text-primary text-xs font-semibold rounded">
                NEW
              </span>
            )}
            {product.isOnSale && (
              <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-semibold rounded">
                SALE
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-medium text-primary mb-2 line-clamp-2 hover:text-secondary transition-colors">
              <a href={product.productUrl}>
                {product.title}
              </a>
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating!)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                {product.reviewCount && (
                  <span className="text-xs text-neutral">({product.reviewCount})</span>
                )}
              </div>
            )}
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-primary">{product.price}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-neutral line-through">{product.compareAtPrice}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleToggleWishlist}
                className="p-2 text-neutral hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-4 h-4" />
              </motion.button>

              <AddToCartButton
                variantId={firstVariant?.id}
                available={firstVariant?.available}
                variant="primary"
                size="sm"
                className="rounded-cta"
                loadingText="Adding..."
                successText="Added!"
              >
                Add to Cart
              </AddToCartButton>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col"
      variants={animationVariants}
      whileHover={{ y: -5 }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden flex-shrink-0">
        <motion.img
          src={product.imageUrl}
          alt={product.imageAlt || product.title}
          className="w-full h-full object-scale-down group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2 py-1 bg-accent text-primary text-xs font-semibold rounded">
              NEW
            </span>
          )}
          {product.isOnSale && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
              SALE
            </span>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={handleToggleWishlist}
              className="p-2 bg-white text-neutral hover:text-red-500 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={handleQuickView}
              className="p-2 bg-white text-neutral hover:text-primary rounded-full shadow-md hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <AddToCartButton
              variantId={firstVariant?.id}
              available={firstVariant?.available}
              variant="accent"
              size="md"
              fullWidth
              className="rounded-cta"
              loadingText="Adding..."
              successText="Added!"
            >
              Quick Add
            </AddToCartButton>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="font-heading font-medium text-primary mb-2 line-clamp-2 hover:text-secondary transition-colors">
            <a href={product.productUrl}>
              {product.title}
            </a>
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating!)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              {product.reviewCount && (
                <span className="text-xs text-neutral">({product.reviewCount})</span>
              )}
            </div>
          )}
        </div>

        {/* Price - Always at bottom */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="font-bold text-lg text-primary">{product.price}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-neutral line-through">{product.compareAtPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
