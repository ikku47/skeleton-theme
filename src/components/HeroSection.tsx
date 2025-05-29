import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Star, Users } from 'lucide-react'

interface Product {
  id: string
  title: string
  image: string
  url: string
  price: string
  color: string
}

interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  primaryButtonText?: string
  primaryButtonUrl?: string
  secondaryButtonText?: string
  secondaryButtonUrl?: string
  products?: Product[]
  testimonialText?: string
  testimonialAuthor?: string
  showCustomers?: boolean
  customerAvatars?: string[]
  className?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = 'Elevate Your Style With Bold Fashion',
  subtitle = '',
  description = '',
  primaryButtonText = 'Explore Collections',
  primaryButtonUrl = '/collections/all',
  secondaryButtonText = '',
  secondaryButtonUrl = '#',
  products = [],
  testimonialText = 'TrendZone styles are fresh, bold and exactly what I needed to upgrade my wardrobe. Love the quality and vibe!',
  testimonialAuthor = 'Ruby Chen',
  showCustomers = true,
  customerAvatars = [],
  className = '',
}) => {
  // Default products if none provided
  const defaultProducts: Product[] = [
    {
      id: '1',
      title: 'Vibrant Orange Suit',
      image: '/api/placeholder/280/350',
      url: '/products/orange-suit',
      price: '$299',
      color: 'bg-orange-400'
    },
    {
      id: '2',
      title: 'Emerald Green Coat',
      image: '/api/placeholder/280/400',
      url: '/products/green-coat',
      price: '$399',
      color: 'bg-emerald-500'
    },
    {
      id: '3',
      title: 'Golden Yellow Blazer',
      image: '/api/placeholder/300/320',
      url: '/products/yellow-blazer',
      price: '$249',
      color: 'bg-yellow-400'
    },
    {
      id: '4',
      title: 'Sky Blue Ensemble',
      image: '/api/placeholder/280/380',
      url: '/products/blue-ensemble',
      price: '$349',
      color: 'bg-sky-400'
    },
    {
      id: '5',
      title: 'Cream Casual Wear',
      image: '/api/placeholder/280/350',
      url: '/products/cream-casual',
      price: '$199',
      color: 'bg-stone-200'
    },
    {
      id: '6',
      title: 'Forest Green Hoodie',
      image: '/api/placeholder/280/320',
      url: '/products/green-hoodie',
      price: '$159',
      color: 'bg-emerald-600'
    }
  ]

  const displayProducts = products.length > 0 ? products : defaultProducts
  const defaultAvatars = [
    'https://i.pravatar.cc/300',
    'https://i.pravatar.cc/300',
    'https://i.pravatar.cc/300'
  ]
  const displayAvatars = customerAvatars.length > 0 ? customerAvatars : defaultAvatars

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className={`relative min-h-screen bg-gray-50 overflow-hidden ${className}`}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Play Button */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-8 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <Play size={24} className="text-gray-800 ml-1" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primay-900 mb-8 leading-tight"
          >
            {title}
          </motion.h1>

          {/* Customer Avatars */}
          {showCustomers && (
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <div className="flex -space-x-2">
                {displayAvatars.map((avatar, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                  >
                    <img
                      src={avatar}
                      alt={`Customer ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {displayProducts.map((product, index) => (
            <motion.a
              key={product.id}
              href={product.url}
              variants={cardVariants}
              custom={index}
              className={`relative group cursor-pointer ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              } ${index === 2 ? 'col-span-2' : ''}`}
            >
              <div
                className={`relative overflow-hidden rounded-2xl ${product.color} ${
                  index === 0 ? 'h-80 lg:h-96' : 'h-40 lg:h-48'
                } ${index === 2 ? 'h-32 lg:h-40' : ''}`}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Product Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-3">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {product.title}
                    </h3>
                    <p className="text-white text-xs opacity-90">
                      {product.price}
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
            </motion.a>
          ))}

          {/* Explore Collections Button */}
          <motion.a
            href={primaryButtonUrl}
            variants={cardVariants}
            custom={6}
            className="col-span-2 h-40 lg:h-48 bg-gray-900 rounded-2xl flex items-center justify-center group cursor-pointer hover:bg-gray-800 transition-colors"
          >
            <div className="text-center">
              <div className="text-white font-semibold mb-2">
                {primaryButtonText}
              </div>
              <ArrowRight
                size={20}
                className="text-white mx-auto group-hover:translate-x-1 transition-transform"
              />
            </div>
          </motion.a>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Testimonial */}
          <motion.div
            variants={itemVariants}
            className="flex-1 max-w-md"
          >
            <div className="text-4xl text-gray-300 mb-4">"</div>
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              {testimonialText}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
              <span className="font-semibold text-gray-900">
                {testimonialAuthor}
              </span>
            </div>
          </motion.div>

          {/* Lifestyle Section */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 text-gray-600"
          >
            <div className="text-6xl font-bold">01</div>
            <div>
              <div className="text-sm uppercase tracking-wide mb-1">Lifestyle</div>
              <div className="font-semibold text-gray-900">
                Set Up Your Fashion With The Latest Trends
              </div>
            </div>
            <ArrowRight size={20} className="text-gray-400" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
