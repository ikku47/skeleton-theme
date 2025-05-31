import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, User } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

interface Testimonial {
  id: string
  name: string
  role?: string
  avatar?: string
  rating: number
  content: string
  location?: string
}

interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
  layout?: 'carousel' | 'grid' | 'three-column'
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title = 'What Our Customers Say',
  subtitle = 'Testimonials',
  testimonials,
  layout = 'three-column',
  autoPlay = true,
  autoPlayInterval = 5000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.activeIndex)
  }

  // Three-column layout with Swiper
  if (layout === 'three-column') {
    return (
      <section className={`section-padding bg-light-bg ${className}`}>
        <div className="container testimonials-section-container">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
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
            <h2 className="font-heading text-primary text-4xl md:text-5xl font-bold">
              {title}
            </h2>
          </motion.div>

          {/* Testimonials Swiper */}
          <div className="relative testimonials-swiper-container overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              slidesPerGroup={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 1,
                  spaceBetween: 32,
                },
              }}
              navigation={{
                nextEl: '.testimonials-swiper-button-next',
                prevEl: '.testimonials-swiper-button-prev',
              }}
              pagination={{
                el: '.testimonials-swiper-pagination',
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={autoPlay ? {
                delay: autoPlayInterval,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              } : false}
              loop={testimonials.length > 3}
              onSlideChange={handleSlideChange}
              className="testimonials-swiper !overflow-hidden"
              style={{
                '--swiper-theme-color': '#FFD100',
                '--swiper-pagination-color': '#111111',
              } as any}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            {testimonials.length > 3 && (
              <>
                <motion.button
                  className="testimonials-swiper-button-prev p-3 bg-white shadow-lg rounded-full text-primary hover:bg-accent hover:text-primary transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <motion.button
                  className="testimonials-swiper-button-next p-3 bg-white shadow-lg rounded-full text-primary hover:bg-accent hover:text-primary transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </>
            )}

            {/* Custom Pagination */}
            <div className="testimonials-swiper-pagination flex justify-center mt-12"></div>
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'grid') {
    return (
      <section className={`section-padding bg-white ${className}`}>
        <div className="container">
          {/* Section Header */}
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
            <h2 className="font-heading text-primary text-4xl md:text-5xl font-bold">
              {title}
            </h2>
          </motion.div>

          {/* Grid Layout */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    )
  }

  // Carousel Layout with Swiper
  return (
    <section className={`section-padding bg-light-bg ${className}`}>
      <div className="container testimonials-section-container">
        {/* Section Header */}
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
          <h2 className="font-heading text-primary text-4xl md:text-5xl font-bold">
            {title}
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto carousel-swiper-container overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.carousel-swiper-button-next',
              prevEl: '.carousel-swiper-button-prev',
            }}
            pagination={{
              el: '.carousel-swiper-pagination',
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={autoPlay ? {
              delay: autoPlayInterval,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            } : false}
            loop={testimonials.length > 1}
            onSlideChange={handleSlideChange}
            className="carousel-swiper"
            style={{
              '--swiper-theme-color': '#FFD100',
              '--swiper-pagination-color': '#111111',
            } as any}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} large />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <motion.button
            className="carousel-swiper-button-prev p-3 bg-white shadow-lg rounded-full text-primary hover:bg-accent hover:text-primary transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <motion.button
            className="carousel-swiper-button-next p-3 bg-white shadow-lg rounded-full text-primary hover:bg-accent hover:text-primary transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          {/* Custom Pagination */}
          <div className="carousel-swiper-pagination flex justify-center mt-8"></div>
        </div>
      </div>
    </section>
  )
}

// Individual Testimonial Card Component
const TestimonialCard: React.FC<{ testimonial: Testimonial; large?: boolean }> = ({
  testimonial,
  large = false,
}) => {
  return (
    <div className={`testimonial-card bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full ${
      large ? 'p-8 md:p-12' : 'p-6'
    }`}>
      {/* Quote Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
          <Quote className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Rating */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <blockquote className={`text-center mb-8 ${
        large ? 'text-lg md:text-xl' : 'text-base'
      } text-neutral leading-relaxed italic`}>
        "{testimonial.content}"
      </blockquote>

      {/* Author */}
      <div className="flex flex-col items-center gap-4">
        {/* Avatar with placeholder */}
        <div className="relative">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const placeholder = target.nextElementSibling as HTMLElement
                if (placeholder) placeholder.style.display = 'flex'
              }}
            />
          ) : null}
          {/* Placeholder avatar */}
          <div
            className={`w-16 h-16 rounded-full bg-gradient-to-br from-accent to-yellow-300 flex items-center justify-center border-2 border-gray-100 ${
              testimonial.avatar ? 'hidden' : 'flex'
            }`}
            style={{ display: testimonial.avatar ? 'none' : 'flex' }}
          >
            <User className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Author info */}
        <div className="text-center">
          <p className="font-heading font-semibold text-primary text-lg">
            {testimonial.name}
          </p>
          {testimonial.role && (
            <p className="text-sm text-neutral font-medium">{testimonial.role}</p>
          )}
          {testimonial.location && (
            <p className="text-xs text-neutral mt-1">{testimonial.location}</p>
          )}
        </div>
      </div>
    </div>
  )
}

// Default testimonials for VersaCommerce
export const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Verified Customer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    content: 'Amazing quality and fast shipping! The product exceeded my expectations and the customer service was outstanding.',
    location: 'New York, NY',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Verified Customer',
    rating: 5,
    content: 'I\'ve been shopping here for months and every purchase has been perfect. Highly recommend to anyone looking for quality products.',
    location: 'Los Angeles, CA',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Verified Customer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    content: 'The best online shopping experience I\'ve had. Great products, easy checkout, and excellent customer support.',
    location: 'Miami, FL',
  },
  {
    id: '4',
    name: 'David Thompson',
    role: 'Verified Customer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    content: 'Outstanding customer service and product quality. I\'ve recommended this store to all my friends and family.',
    location: 'Chicago, IL',
  },
  {
    id: '5',
    name: 'Jessica Williams',
    role: 'Verified Customer',
    rating: 4,
    content: 'Great selection and competitive prices. The delivery was quick and everything arrived in perfect condition.',
    location: 'Austin, TX',
  },
  {
    id: '6',
    name: 'Robert Martinez',
    role: 'Verified Customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    content: 'Exceptional quality products and seamless shopping experience. Will definitely be a returning customer.',
    location: 'Seattle, WA',
  },
]
