import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

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
  layout?: 'carousel' | 'grid'
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title = 'What Our Customers Say',
  subtitle = 'Testimonials',
  testimonials,
  layout = 'carousel',
  autoPlay = true,
  autoPlayInterval = 5000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-play functionality for carousel
  useEffect(() => {
    if (autoPlay && layout === 'carousel' && testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }
  }, [autoPlay, autoPlayInterval, testimonials.length, layout])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
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

  // Carousel Layout
  return (
    <section className={`section-padding bg-light-bg ${className}`}>
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

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between pointer-events-none z-10">
            <motion.button
              onClick={prevTestimonial}
              className="pointer-events-auto p-3 bg-white shadow-lg rounded-full text-primary hover:bg-accent hover:text-primary transition-all duration-200 -translate-x-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={nextTestimonial}
              className="pointer-events-auto p-3 bg-white shadow-lg rounded-full text-primary hover:bg-accent hover:text-primary transition-all duration-200 translate-x-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <TestimonialCard testimonial={testimonials[currentIndex]} large />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
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
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ${
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
      <blockquote className={`text-center mb-6 ${
        large ? 'text-lg md:text-xl' : 'text-base'
      } text-neutral leading-relaxed italic`}>
        "{testimonial.content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-center gap-4">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div className="text-center">
          <p className="font-heading font-semibold text-primary">
            {testimonial.name}
          </p>
          {testimonial.role && (
            <p className="text-sm text-neutral">{testimonial.role}</p>
          )}
          {testimonial.location && (
            <p className="text-xs text-neutral">{testimonial.location}</p>
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
    rating: 5,
    content: 'The best online shopping experience I\'ve had. Great products, easy checkout, and excellent customer support.',
    location: 'Miami, FL',
  },
]
