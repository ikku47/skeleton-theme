import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Collection {
  id: string
  title: string
  description?: string
  imageUrl: string
  productCount: number
  url: string
}

interface VersaCollectionGridProps {
  title?: string
  subtitle?: string
  collections: Collection[]
  layout?: 'grid' | 'masonry' | 'featured'
  showProductCount?: boolean
  className?: string
}

export const VersaCollectionGrid: React.FC<VersaCollectionGridProps> = ({
  title,
  subtitle,
  collections,
  layout = 'grid',
  showProductCount = true,
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const getGridClasses = () => {
    switch (layout) {
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6'
      case 'featured':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    }
  }

  const getItemClasses = (index: number) => {
    if (layout === 'featured' && index === 0) {
      return 'md:col-span-2 md:row-span-2'
    }
    return ''
  }

  return (
    <section className="section-padding bg-white">
      <div className="container">
        {/* Section Header */}
        {(title || subtitle) && (
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
            {title && (
              <h2 className="font-heading text-primary text-4xl md:text-5xl font-bold">
                {title}
              </h2>
            )}
          </motion.div>
        )}

        {/* Collections Grid */}
        <motion.div
          className={`${getGridClasses()} ${className}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className={`${getItemClasses(index)} ${layout === 'masonry' ? 'break-inside-avoid' : ''}`}
              variants={itemVariants}
            >
              <CollectionCard
                collection={collection}
                showProductCount={showProductCount}
                featured={layout === 'featured' && index === 0}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Individual Collection Card Component
const CollectionCard: React.FC<{ 
  collection: Collection
  showProductCount: boolean
  featured?: boolean 
}> = ({ collection, showProductCount, featured = false }) => {
  return (
    <motion.div
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
    >
      {/* Collection Image */}
      <div className={`relative overflow-hidden ${featured ? 'aspect-square' : 'aspect-[4/3]'}`}>
        <motion.img
          src={collection.imageUrl}
          alt={collection.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
          {/* CTA Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.a
              href={collection.url}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-cta hover:bg-accent hover:text-primary transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Collection
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Product Count Badge */}
        {showProductCount && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {collection.productCount} {collection.productCount === 1 ? 'item' : 'items'}
          </div>
        )}
      </div>

      {/* Collection Info */}
      <div className={`p-6 ${featured ? 'space-y-4' : 'space-y-3'}`}>
        <h3 className={`font-heading font-semibold text-primary group-hover:text-secondary transition-colors ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          <a href={collection.url}>
            {collection.title}
          </a>
        </h3>

        {collection.description && (
          <p className={`text-neutral leading-relaxed ${
            featured ? 'text-base' : 'text-sm'
          } line-clamp-3`}>
            {collection.description}
          </p>
        )}

        {/* Shop Link */}
        <motion.a
          href={collection.url}
          className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors group"
          whileHover={{ x: 5 }}
        >
          Shop Now
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </motion.div>
  )
}
