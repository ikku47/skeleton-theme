import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCw, Maximize2 } from 'lucide-react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'

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

interface EnhancedProductGalleryProps {
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

export const EnhancedProductGallery: React.FC<EnhancedProductGalleryProps> = ({
  images,
  productTitle,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [fullscreenSwiper, setFullscreenSwiper] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set())

  // Calculate dynamic aspect ratio for the container
  const containerAspectRatio = getContainerAspectRatio(images)
  const mainSwiperRef = useRef<any>(null)

  useEffect(() => {
    if (images && images.length > 0) {
      setIsLoading(false)
    }
  }, [images])

  const toggleFullscreen = () => {
    if (!isFullscreen && fullscreenSwiper) {
      // Sync fullscreen swiper to current index when opening
      fullscreenSwiper.slideTo(currentIndex, 0)
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex)
    // Sync fullscreen swiper if it exists
    if (fullscreenSwiper && swiper !== fullscreenSwiper) {
      fullscreenSwiper.slideTo(swiper.activeIndex, 300)
    }
  }

  const handleFullscreenSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex)
    // Sync main swiper
    if (mainSwiperRef.current && swiper !== mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(swiper.activeIndex, 300)
    }
  }

  const handleImageError = (imageId: string) => {
    setImageLoadErrors(prev => new Set(prev).add(imageId))
  }

  const goToSlide = (index: number) => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index)
    }
    setCurrentIndex(index)
  }

  if (!images || images.length === 0) {
    return (
      <div className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">No images available</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading images...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`enhanced-product-gallery ${className}`}>
        {/* Main Image Gallery */}
        <div className="relative group">
          <div className={`${containerAspectRatio} rounded-lg overflow-hidden bg-gray-100`}>
            <Swiper
              ref={mainSwiperRef}
              modules={[Navigation, Pagination, Thumbs]}
              spaceBetween={0}
              slidesPerView={1}
              loop={false}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                el: '.swiper-pagination-custom',
              }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              onSlideChange={handleSlideChange}
              className="w-full h-full"
              style={{
                '--swiper-theme-color': '#FFD100',
                width: '100%',
                height: '100%',
                display: 'block'
              } as any}
            >
            {images.map((image, index) => (
              <SwiperSlide
                key={image.id}
                className="w-full h-full"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <motion.div
                  className="relative w-full h-full bg-white cursor-zoom-in"
                  onClick={toggleFullscreen}
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.3 }}
                >
                  {!imageLoadErrors.has(image.id) ? (
                    <img
                      src={getOptimalImageUrl(image, 'main')}
                      srcSet={image.srcset}
                      sizes={getImageSizes('main')}
                      alt={image.alt || `${productTitle} view ${index + 1}`}
                      className={`w-full h-full ${getObjectFitClass()}`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      onError={() => handleImageError(image.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <ZoomIn className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Image unavailable</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Zoom Indicator */}
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {index + 1} / {images.length}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
            </Swiper>
          </div>

          {/* Custom Navigation Buttons */}
          {images.length > 1 && (
            <>
              <motion.button
                className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <motion.button
                className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </>
          )}

          {/* Custom Pagination */}
          {images.length > 1 && (
            <div className="swiper-pagination-custom absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"></div>
          )}
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="mt-4">
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[FreeMode, Thumbs]}
              spaceBetween={8}
              slidesPerView="auto"
              freeMode={true}
              watchSlidesProgress={true}
              className="thumbnail-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={image.id} className="!w-16 !h-16">
                  <motion.button
                    onClick={() => goToSlide(index)}
                    className={`w-full h-full rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentIndex
                        ? 'border-yellow-400 shadow-md ring-2 ring-yellow-400 ring-opacity-30'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {!imageLoadErrors.has(image.id) ? (
                      <img
                        src={getOptimalImageUrl(image, 'thumbnail')}
                        sizes={getImageSizes('thumbnail')}
                        alt={image.alt || `${productTitle} thumbnail ${index + 1}`}
                        className="w-full h-full object-scale-down"
                        onError={() => handleImageError(image.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <ZoomIn className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </motion.button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      {/* Enhanced Fullscreen Modal with Zoom */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleFullscreen}
          >
            {/* Close Button */}
            <motion.button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Fullscreen Swiper Gallery */}
            <div className="w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
              <Swiper
                onSwiper={setFullscreenSwiper}
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop={false}
                navigation={{
                  nextEl: '.fullscreen-swiper-button-next',
                  prevEl: '.fullscreen-swiper-button-prev',
                }}
                pagination={{
                  clickable: true,
                  el: '.fullscreen-swiper-pagination',
                }}
                onSlideChange={handleFullscreenSlideChange}
                initialSlide={currentIndex}
                className="w-full h-full"
                style={{
                  '--swiper-theme-color': '#ffffff',
                  width: '100%',
                  height: '100%',
                  display: 'block'
                } as any}
              >
                {images.map((image, index) => (
                  <SwiperSlide
                    key={image.id}
                    className="flex items-center justify-center"
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <TransformWrapper
                      initialScale={1}
                      minScale={0.5}
                      maxScale={3}
                      centerOnInit={true}
                      wheel={{ step: 0.1 }}
                      pinch={{ step: 5 }}
                      doubleClick={{ mode: 'toggle', step: 0.7 }}
                    >
                      {({ zoomIn, zoomOut, resetTransform }) => (
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Zoom Controls for this slide */}
                          <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation()
                                zoomIn()
                              }}
                              className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ZoomIn className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation()
                                zoomOut()
                              }}
                              className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ZoomOut className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation()
                                resetTransform()
                              }}
                              className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <RotateCw className="w-5 h-5" />
                            </motion.button>
                          </div>

                          <TransformComponent>
                            {!imageLoadErrors.has(image.id) ? (
                              <img
                                src={getOptimalImageUrl(image, 'fullscreen')}
                                srcSet={image.srcset}
                                sizes="100vw"
                                alt={image.alt || `${productTitle} fullscreen ${index + 1}`}
                                className="max-w-full max-h-full object-contain"
                                style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                                onError={() => handleImageError(image.id)}
                              />
                            ) : (
                              <div className="w-96 h-96 bg-gray-800 rounded-lg flex items-center justify-center">
                                <div className="text-center text-white">
                                  <ZoomIn className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                  <p className="text-sm opacity-75">Image unavailable</p>
                                </div>
                              </div>
                            )}
                          </TransformComponent>
                        </div>
                      )}
                    </TransformWrapper>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Fullscreen Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <motion.button
                    className="fullscreen-swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 z-20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    className="fullscreen-swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 z-20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}

              {/* Fullscreen Pagination */}
              {images.length > 1 && (
                <div className="fullscreen-swiper-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"></div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
