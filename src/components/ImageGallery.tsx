import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface GalleryImage {
  id: string
  src: string
  alt: string
  thumbnail?: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  className?: string
  showThumbnails?: boolean
  allowZoom?: boolean
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className = '',
  showThumbnails = true,
  allowZoom = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const currentImage = images[currentIndex]

  if (!images.length) return null

  return (
    <div className={`relative ${className}`}>
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage.id}
            src={currentImage.src}
            alt={currentImage.alt}
            className="w-full h-full object-cover cursor-zoom-in"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={() => allowZoom && setIsZoomed(true)}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Zoom Icon */}
        {allowZoom && (
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 transition-all"
            aria-label="Zoom image"
          >
            <ZoomIn size={16} />
          </button>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-50 text-white text-xs">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {images.map((image, index) => (
            <motion.button
              key={image.id}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-primary'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image.thumbnail || image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="relative max-w-full max-h-full">
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="max-w-full max-h-full object-contain"
                />
                <button
                  onClick={() => setIsZoomed(false)}
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 transition-all"
                  aria-label="Close zoom"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
