import React, { useState } from 'react'
import { VersaButton } from './VersaButton'
import { VersaQuickView } from './VersaQuickView'
import { useQuickView, transformProductForQuickView } from './useQuickView'

// Debug component to test quick view functionality
export const VersaQuickViewDebug: React.FC = () => {
  const { isOpen, product, openQuickView, closeQuickView } = useQuickView()
  const [debugInfo, setDebugInfo] = useState<string>('')

  const sampleProduct = {
    id: '8979997098197',
    handle: 'engagement-ring-18k-gold',
    title: 'ENGAGEMENT RING IN 18K YELLOW GOLD',
    vendor: 'Luxury Jewelry Co.',
    price: '$2,499.00',
    compare_at_price: '$3,248.70',
    description: 'Lorem ipsum dolor sit amet nec eliamconsectetur. Egestas cursus a maecenas massa facilisi adipiscing dolor iaculis. In mattis nec...',
    images: [
      {
        url: 'https://via.placeholder.com/600x600/D4AF37/FFFFFF?text=Ring+Front',
        alt: 'Engagement Ring in 18K Yellow Gold - Front View'
      },
      {
        url: 'https://via.placeholder.com/600x600/B8860B/FFFFFF?text=Ring+Side',
        alt: 'Engagement Ring in 18K Yellow Gold - Side View'
      },
      {
        url: 'https://via.placeholder.com/600x600/DAA520/FFFFFF?text=Ring+Detail',
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
    available: true
  }

  const handleQuickView = () => {
    try {
      setDebugInfo('Transforming product data...')
      const quickViewProduct = transformProductForQuickView(sampleProduct)

      setDebugInfo('Opening quick view...')
      console.log('Quick view product:', quickViewProduct)

      // Try global quick view first, fallback to hook
      const globalQuickView = (window as any).globalQuickView
      if (globalQuickView) {
        globalQuickView.openQuickView(quickViewProduct)
        setDebugInfo('Quick view opened via global function!')
      } else {
        openQuickView(quickViewProduct)
        setDebugInfo('Quick view opened via hook!')
      }
    } catch (error) {
      setDebugInfo(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      console.error('Quick view error:', error)
    }
  }

  const handleAddToCart = async (variantId: string, quantity: number) => {
    console.log('Debug: Adding to cart', { variantId, quantity })
    setDebugInfo(`Adding ${quantity} of variant ${variantId} to cart...`)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setDebugInfo('Added to cart successfully!')
  }

  const handleToggleWishlist = (productId: string) => {
    console.log('Debug: Toggle wishlist', productId)
    setDebugInfo(`Toggled wishlist for product ${productId}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Quick View Debug</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
        <div className="space-y-4">
          <div>
            <strong>Quick View State (Hook):</strong>
            <ul className="ml-4 mt-2">
              <li>Is Open: {isOpen ? 'Yes' : 'No'}</li>
              <li>Product ID: {product?.id || 'None'}</li>
              <li>Product Title: {product?.title || 'None'}</li>
            </ul>
          </div>

          <div>
            <strong>Global Quick View State:</strong>
            <ul className="ml-4 mt-2">
              <li>Available: {(window as any).globalQuickView ? 'Yes' : 'No'}</li>
              <li>Global Is Open: {(window as any).globalQuickView?.isOpen ? 'Yes' : 'No'}</li>
              <li>Global Product ID: {(window as any).globalQuickView?.product?.id || 'None'}</li>
            </ul>
          </div>
          
          <div>
            <strong>Debug Messages:</strong>
            <p className="ml-4 mt-2 text-sm bg-gray-100 p-2 rounded">{debugInfo || 'No messages'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Product</h2>
        <div className="flex gap-4 items-center">
          <img 
            src={sampleProduct.images[0].url} 
            alt={sampleProduct.title}
            className="w-24 h-24 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{sampleProduct.title}</h3>
            <p className="text-gray-600">{sampleProduct.vendor}</p>
            <p className="text-lg font-bold text-green-600">{sampleProduct.price}</p>
          </div>
          <VersaButton
            variant="primary"
            onClick={handleQuickView}
          >
            Open Quick View
          </VersaButton>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Manual Controls</h2>
        <div className="flex gap-4">
          <VersaButton
            variant="outline"
            onClick={() => {
              setDebugInfo('Manually closing quick view...')
              closeQuickView()
            }}
          >
            Close Quick View
          </VersaButton>
          
          <VersaButton
            variant="outline"
            onClick={() => {
              setDebugInfo('Clearing debug info...')
              setTimeout(() => setDebugInfo(''), 500)
            }}
          >
            Clear Debug
          </VersaButton>
        </div>
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
