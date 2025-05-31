import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'

interface AccessoryProduct {
  id: string
  title: string
  price: string
  imageUrl: string
  productUrl: string
}

interface AccessoriesCarouselProps {
  title?: string
  subtitle?: string
  products: AccessoryProduct[]
  className?: string
}

export const AccessoriesCarousel: React.FC<AccessoriesCarouselProps> = ({
  title = 'Complete Your Look',
  subtitle = 'Accessories',
  products,
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  }

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.clientWidth / itemsPerView.desktop
      const scrollAmount = itemWidth * 2
      
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
        setCurrentIndex(Math.max(0, currentIndex - 2))
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        setCurrentIndex(Math.min(products.length - itemsPerView.desktop, currentIndex + 2))
      }
    }
  }

  useEffect(() => {
    checkScrollability()
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollability)
      return () => scrollElement.removeEventListener('scroll', checkScrollability)
    }
  }, [products])

  const totalDots = Math.ceil(products.length / itemsPerView.mobile)

  return (
    <section className={`section-padding bg-light-bg ${className}`}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            {subtitle && (
              <p className="font-body text-neutral text-lg mb-2 uppercase tracking-wide">
                {subtitle}
              </p>
            )}
            <h2 className="font-heading text-primary text-3xl md:text-4xl font-bold">
              {title}
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full border-2 transition-all duration-200 ${
                canScrollLeft
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              }`}
              whileHover={canScrollLeft ? { scale: 1.05 } : {}}
              whileTap={canScrollLeft ? { scale: 0.95 } : {}}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-2 rounded-full border-2 transition-all duration-200 ${
                canScrollRight
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              }`}
              whileHover={canScrollRight ? { scale: 1.05 } : {}}
              whileTap={canScrollRight ? { scale: 0.95 } : {}}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Products Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <AccessoryCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Pagination Dots */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex gap-2">
            {[...Array(totalDots)].map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === Math.floor(currentIndex / itemsPerView.mobile)
                    ? 'bg-primary w-6'
                    : 'bg-gray-300'
                }`}
                onClick={() => {
                  const targetIndex = index * itemsPerView.mobile
                  setCurrentIndex(targetIndex)
                  if (scrollRef.current) {
                    const itemWidth = scrollRef.current.clientWidth
                    scrollRef.current.scrollTo({
                      left: targetIndex * itemWidth,
                      behavior: 'smooth'
                    })
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Individual Accessory Card Component
const AccessoryCard: React.FC<{ product: AccessoryProduct }> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('Add accessory to cart:', product.id)
  }

  return (
    <motion.div
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
      whileHover={{ y: -3 }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden flex-shrink-0">
        <motion.img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-accent text-primary font-semibold text-sm rounded hover:bg-yellow-400 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-3 h-3" />
              Add
            </motion.button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 flex-grow flex flex-col justify-between">
        <h4 className="font-heading font-medium text-primary text-sm mb-1 line-clamp-2">
          <a href={product.productUrl} className="hover:text-secondary transition-colors">
            {product.title}
          </a>
        </h4>
        <p className="font-bold text-primary mt-auto">{product.price}</p>
      </div>
    </motion.div>
  )
}
