import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role?: string
  avatar?: string
  content: string
  rating: number
  product?: string
}

interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
  className?: string
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title = 'What Our Customers Say',
  subtitle = 'Real reviews from real customers',
  testimonials = [],
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className={`py-16 lg:py-24 bg-gray-50 ${className}`}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            variants={itemVariants}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              custom={index}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote size={32} className="text-blue-600 opacity-20" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Product */}
              {testimonial.product && (
                <p className="text-sm text-blue-600 font-medium mb-4">
                  About: {testimonial.product}
                </p>
              )}

              {/* Author */}
              <div className="flex items-center gap-3">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  {testimonial.role && (
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="mt-16 bg-white rounded-2xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                4.8/5
              </div>
              <p className="text-gray-600">Average Rating</p>
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                2,500+
              </div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                98%
              </div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
