import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface ProductImage {
  url: string
  alt: string
  id?: string
}

interface ProductImageGalleryProps {
  images: ProductImage[]
  productTitle: string
  className?: string
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productTitle,
  className = '',
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

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
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImageIndex}
            src={currentImage.url}
            alt={currentImage.alt || productTitle}
            className="w-full h-full object-cover cursor-zoom-in"
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
                src={image.url}
                alt={image.alt || `${productTitle} view ${index + 1}`}
                className="w-full h-full object-cover"
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
              src={currentImage.url}
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
