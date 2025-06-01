import React from 'react'
import { VersaProductCard } from './VersaProductCard'
import { VersaQuickView } from './VersaQuickView'
import { useQuickView, transformProductForQuickView } from './useQuickView'

// Example product data structure
const sampleProducts = [
  {
    id: '1',
    handle: 'engagement-ring-18k-gold',
    title: 'ENGAGEMENT RING IN 18K YELLOW GOLD',
    vendor: 'Luxury Jewelry Co.',
    price: '$2,499.00',
    compare_at_price: '$3,248.70',
    description: 'Lorem ipsum dolor sit amet nec eliamconsectetur. Egestas cursus a maecenas massa facilisi adipiscing dolor iaculis. In mattis nec...',
    images: [
      {
        url: '/api/placeholder/600/600',
        alt: 'Engagement Ring in 18K Yellow Gold - Front View'
      },
      {
        url: '/api/placeholder/600/600',
        alt: 'Engagement Ring in 18K Yellow Gold - Side View'
      },
      {
        url: '/api/placeholder/600/600',
        alt: 'Engagement Ring in 18K Yellow Gold - Detail View'
      }
    ],
    variants: [
      {
        id: 'variant-1',
        title: 'Gold / 48',
        price: '$2,499.00',
        compare_at_price: '$3,248.70',
        available: true,
        options: {
          'Material': 'Gold',
          'Size': '48'
        }
      },
      {
        id: 'variant-2',
        title: 'Gold / 50',
        price: '$2,499.00',
        compare_at_price: '$3,248.70',
        available: true,
        options: {
          'Material': 'Gold',
          'Size': '50'
        }
      },
      {
        id: 'variant-3',
        title: 'Gold / 52',
        price: '$2,499.00',
        compare_at_price: '$3,248.70',
        available: true,
        options: {
          'Material': 'Gold',
          'Size': '52'
        }
      },
      {
        id: 'variant-4',
        title: 'Gold / 54',
        price: '$2,499.00',
        compare_at_price: '$3,248.70',
        available: false,
        options: {
          'Material': 'Gold',
          'Size': '54'
        }
      }
    ],
    options: [
      {
        name: 'Material',
        values: ['Gold', 'Rose Gold', 'White Gold']
      },
      {
        name: 'Size',
        values: ['48', '50', '52', '54']
      }
    ],
    tags: ['engagement', 'luxury', 'gold'],
    url: '/products/engagement-ring-18k-gold',
    available: true,
    rating: 4.8,
    reviewCount: 127
  },
  {
    id: '2',
    handle: 'diamond-necklace',
    title: 'DIAMOND TENNIS NECKLACE',
    vendor: 'Elite Diamonds',
    price: '$4,299.00',
    compare_at_price: '$5,999.00',
    description: 'Exquisite diamond tennis necklace featuring brilliant cut diamonds set in 18K white gold. Perfect for special occasions.',
    images: [
      {
        url: '/api/placeholder/600/600',
        alt: 'Diamond Tennis Necklace'
      }
    ],
    variants: [
      {
        id: 'variant-5',
        title: 'White Gold / 16"',
        price: '$4,299.00',
        compare_at_price: '$5,999.00',
        available: true,
        options: {
          'Material': 'White Gold',
          'Length': '16"'
        }
      }
    ],
    options: [
      {
        name: 'Material',
        values: ['White Gold', 'Yellow Gold']
      },
      {
        name: 'Length',
        values: ['16"', '18"', '20"']
      }
    ],
    tags: ['necklace', 'diamond', 'luxury'],
    url: '/products/diamond-necklace',
    available: true,
    rating: 4.9,
    reviewCount: 89
  }
]

export const VersaQuickViewExample: React.FC = () => {
  const { isOpen, product, openQuickView, closeQuickView } = useQuickView()

  const handleQuickView = (productData: any) => {
    const quickViewProduct = transformProductForQuickView(productData)
    openQuickView(quickViewProduct)
  }

  const handleAddToCart = async (variantId: string, quantity: number) => {
    // Simulate API call
    console.log('Adding to cart:', { variantId, quantity })
    
    // Here you would typically make an API call to add the item to cart
    // For example:
    // await fetch('/cart/add.js', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     id: variantId,
    //     quantity: quantity
    //   })
    // })
    
    // Show success message or update cart state
    alert(`Added ${quantity} item(s) to cart!`)
  }

  const handleToggleWishlist = (productId: string) => {
    console.log('Toggle wishlist for product:', productId)
    // Implement wishlist functionality
  }

  const getSalePercentage = (price: string, comparePrice: string) => {
    const priceNum = parseFloat(price.replace(/[^0-9.]/g, ''))
    const comparePriceNum = parseFloat(comparePrice.replace(/[^0-9.]/g, ''))
    return Math.round(((comparePriceNum - priceNum) / comparePriceNum) * 100)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-normal text-dark mb-8">
        Quick View Example
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sampleProducts.map((product) => (
          <VersaProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            compareAtPrice={product.compare_at_price}
            imageUrl={product.images[0]?.url}
            imageAlt={product.images[0]?.alt}
            productUrl={product.url}
            rating={product.rating}
            reviewCount={product.reviewCount}
            isOnSale={!!product.compare_at_price}
            salePercentage={
              product.compare_at_price 
                ? getSalePercentage(product.price, product.compare_at_price)
                : undefined
            }
            vendor={product.vendor}
            variantId={product.variants[0]?.id}
            available={product.available}
            onQuickView={() => handleQuickView(product)}
            onToggleWishlist={() => handleToggleWishlist(product.id)}
            onAddToCart={() => {
              // Quick add to cart with first available variant
              const firstAvailableVariant = product.variants.find(v => v.available)
              if (firstAvailableVariant) {
                handleAddToCart(firstAvailableVariant.id, 1)
              }
            }}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      <VersaQuickView
        product={product}
        isOpen={isOpen}
        onClose={closeQuickView}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
      />
    </div>
  )
}

// Usage example for integrating with existing product listings
export const useProductQuickView = () => {
  const { openQuickView } = useQuickView()

  const openProductQuickView = (shopifyProduct: any) => {
    const quickViewProduct = transformProductForQuickView(shopifyProduct)
    openQuickView(quickViewProduct)
  }

  return { openProductQuickView }
}
