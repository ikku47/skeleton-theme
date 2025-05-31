import React from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react'

interface InfoBlock {
  icon: string
  title: string
  description: string
}

interface FeaturedProductShowcaseProps {
  title: string
  subtitle?: string
  product: {
    name: string
    price: string
    compareAtPrice?: string
    imageUrl: string
    productUrl: string
    rating?: number
    reviewCount?: number
  }
  infoBlocks: InfoBlock[]
  className?: string
}

const iconMap = {
  'star': Star,
  'heart': Heart,
  'shopping-cart': ShoppingCart,
  'eye': Eye,
}

export const FeaturedProductShowcase: React.FC<FeaturedProductShowcaseProps> = ({
  title,
  subtitle,
  product,
  infoBlocks,
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  return (
    <section className={`section-padding bg-light-bg ${className}`}>
      <div className="container">
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

        {/* Main Content Grid */}
        <motion.div
          className="relative max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-8 items-center">
            {/* Top Left Info Block */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <InfoBlockContent infoBlock={infoBlocks[0]} />
            </motion.div>

            {/* Top Right Info Block */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <InfoBlockContent infoBlock={infoBlocks[1]} />
            </motion.div>

            {/* Central Product Image - spans 2 rows */}
            <motion.div
              className="row-span-2 relative group"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-scale-down group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Product Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-heading font-semibold text-lg text-primary mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xl text-primary">{product.price}</span>
                          {product.compareAtPrice && (
                            <span className="text-neutral line-through">{product.compareAtPrice}</span>
                          )}
                        </div>
                        {product.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-neutral">{product.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Left Info Block */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <InfoBlockContent infoBlock={infoBlocks[2]} />
            </motion.div>

            {/* Bottom Right Info Block */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <InfoBlockContent infoBlock={infoBlocks[3]} />
            </motion.div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-8">
            {/* Product Image */}
            <motion.div
              className="relative group"
              variants={itemVariants}
            >
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-scale-down"
                />
              </div>
              
              {/* Product Info */}
              <div className="text-center mt-6">
                <h3 className="font-heading font-semibold text-2xl text-primary mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="font-bold text-2xl text-primary">{product.price}</span>
                  {product.compareAtPrice && (
                    <span className="text-neutral line-through text-lg">{product.compareAtPrice}</span>
                  )}
                </div>
                <motion.a
                  href={product.productUrl}
                  className="inline-flex items-center px-6 py-3 bg-accent text-primary font-semibold rounded-cta hover:bg-yellow-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                </motion.a>
              </div>
            </motion.div>

            {/* Info Blocks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {infoBlocks.map((block, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm"
                  variants={itemVariants}
                >
                  <InfoBlockContent infoBlock={block} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Helper component for info block content
const InfoBlockContent: React.FC<{ infoBlock: InfoBlock }> = ({ infoBlock }) => {
  const IconComponent = iconMap[infoBlock.icon as keyof typeof iconMap] || Star

  return (
    <div className="text-center min-h-[120px] flex flex-col justify-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-full mb-3 mx-auto">
        <IconComponent className="w-6 h-6 text-primary" />
      </div>
      <h4 className="font-heading font-semibold text-lg text-primary mb-2">
        {infoBlock.title}
      </h4>
      <p className="font-body text-neutral text-sm leading-relaxed">
        {infoBlock.description}
      </p>
    </div>
  )
}
