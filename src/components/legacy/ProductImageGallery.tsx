import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface ProductImage {
  id?: string
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

interface ProductImageGalleryProps {
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

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productTitle,
  className = '',
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Calculate dynamic aspect ratio for the container
  const containerAspectRatio = getContainerAspectRatio(images)

  if (!images || images.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No image available</span>
        </div>
      </div>
    )
  }

  const currentImage = images[selectedImageIndex]
  const hasMultipleImages = images.length > 1

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className={`relative ${containerAspectRatio} overflow-hidden rounded-lg bg-gray-100 group`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImageIndex}
            src={getOptimalImageUrl(currentImage, 'main')}
            srcSet={currentImage.srcset}
            sizes={getImageSizes('main')}
            alt={currentImage.alt || productTitle}
            className={`w-full h-full ${getObjectFitClass()} cursor-zoom-in`}
            onClick={() => setIsZoomed(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Zoom Icon */}
        <div className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <ZoomIn size={16} />
        </div>

        {/* Image Counter */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/50 text-white text-sm rounded">
            {selectedImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {hasMultipleImages && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 4).map((image, index) => (
            <motion.div
              key={index}
              className={`aspect-square overflow-hidden rounded-md bg-gray-100 cursor-pointer border-2 transition-all ${
                index === selectedImageIndex
                  ? 'border-primary shadow-md'
                  : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => setSelectedImageIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={getOptimalImageUrl(image, 'thumbnail')}
                sizes={getImageSizes('thumbnail')}
                alt={image.alt || `${productTitle} view ${index + 1}`}
                className="w-full h-full object-scale-down"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              src={getOptimalImageUrl(currentImage, 'fullscreen')}
              srcSet={currentImage.srcset}
              sizes="100vw"
              alt={currentImage.alt || productTitle}
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full"
              aria-label="Close zoom"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
