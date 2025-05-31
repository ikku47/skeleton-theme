import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'

interface ProductImage {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
  aspectRatio?: number
  sizes?: {
    thumbnail: string
    small: string
    medium: string
    large: string
    xlarge: string
    square_small: string
    square_medium: string
    square_large: string
  }
  srcset?: string
}

interface VersaProductGalleryProps {
  images: ProductImage[]
  productTitle: string
  className?: string
}

// Utility functions for responsive image handling
const getOptimalImageUrl = (image: ProductImage, context: 'main' | 'thumbnail' | 'fullscreen'): string => {
  if (!image.sizes) return image.url

  switch (context) {
    case 'thumbnail':
      return image.sizes.thumbnail
    case 'main':
      return image.sizes.large
    case 'fullscreen':
      return image.sizes.xlarge
    default:
      return image.url
  }
}

const getImageSizes = (context: 'main' | 'thumbnail'): string => {
  switch (context) {
    case 'thumbnail':
      return '(max-width: 768px) 60px, 80px'
    case 'main':
      return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px'
    default:
      return '100vw'
  }
}

const getContainerAspectRatio = (images: ProductImage[]): string => {
  if (!images.length) return 'aspect-square'

  // Calculate average aspect ratio
  const validRatios = images
    .filter(img => img.aspectRatio && img.aspectRatio > 0)
    .map(img => img.aspectRatio!)

  if (validRatios.length === 0) return 'aspect-square'

  const avgRatio = validRatios.reduce((sum, ratio) => sum + ratio, 0) / validRatios.length

  // Determine best fit aspect ratio class
  if (avgRatio >= 1.4) return 'aspect-[3/2]'
  if (avgRatio >= 1.2) return 'aspect-[4/3]'
  if (avgRatio >= 0.9) return 'aspect-square'
  if (avgRatio >= 0.7) return 'aspect-[3/4]'
  return 'aspect-[2/3]'
}

const getObjectFitClass = (): string => {
  // Always use scale-down for product images to prevent cropping
  return 'object-scale-down'
}

export const VersaProductGallery: React.FC<VersaProductGalleryProps> = ({
  images,
  productTitle,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Calculate dynamic aspect ratio for the container
  const containerAspectRatio = getContainerAspectRatio(images)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  if (!images || images.length === 0) {
    return (
      <div className={`aspect-square bg-light-bg rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-neutral">No images available</p>
      </div>
    )
  }

  const currentImage = images[currentIndex]

  return (
    <>
      <div className={`versa-product-gallery ${className}`}>
        {/* Main Image Display */}
        <div className="relative">
          {/* Main Image Container */}
          <motion.div
            className={`relative ${containerAspectRatio} bg-white rounded-lg overflow-hidden shadow-sm group cursor-zoom-in`}
            onClick={toggleFullscreen}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage.id}
                src={getOptimalImageUrl(currentImage, 'main')}
                srcSet={currentImage.srcset}
                sizes={getImageSizes('main')}
                alt={currentImage.alt || productTitle}
                className={`w-full h-full ${getObjectFitClass()}`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>

            {/* Zoom Indicator */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black bg-opacity-50 text-white p-2 rounded-full">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5 text-primary" />
                </motion.button>

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5 text-primary" />
                </motion.button>
              </>
            )}
          </motion.div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="mt-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {images.map((image, index) => (
                <motion.button
                  key={image.id}
                  onClick={() => goToImage(index)}
                  className={`flex-none w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentIndex
                      ? 'border-accent shadow-md'
                      : 'border-border hover:border-neutral'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={getOptimalImageUrl(image, 'thumbnail')}
                    sizes={getImageSizes('thumbnail')}
                    alt={image.alt || `${productTitle} ${index + 1}`}
                    className="w-full h-full object-scale-down"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Fullscreen Image */}
            <div className="w-full h-full flex items-center justify-center p-8">
              <motion.img
                key={currentImage.id}
                src={getOptimalImageUrl(currentImage, 'fullscreen')}
                srcSet={currentImage.srcset}
                sizes="100vw"
                alt={currentImage.alt || productTitle}
                className="max-w-full max-h-full object-contain"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Fullscreen Navigation */}
            {images.length > 1 && (
              <>
                <motion.button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </>
            )}

            {/* Fullscreen Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-2 bg-black bg-opacity-30 p-2 rounded-lg">
                  {images.map((image, index) => (
                    <motion.button
                      key={image.id}
                      onClick={() => goToImage(index)}
                      className={`w-12 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                        index === currentIndex
                          ? 'border-accent'
                          : 'border-transparent hover:border-white'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img
                        src={getOptimalImageUrl(image, 'thumbnail')}
                        sizes={getImageSizes('thumbnail')}
                        alt={image.alt || `${productTitle} ${index + 1}`}
                        className="w-full h-full object-scale-down"
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
