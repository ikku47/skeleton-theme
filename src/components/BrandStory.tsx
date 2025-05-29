import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Award, Users, Truck, Shield } from 'lucide-react'

interface Feature {
  icon: 'award' | 'users' | 'truck' | 'shield'
  title: string
  description: string
}

interface BrandStoryProps {
  title?: string
  subtitle?: string
  description?: string
  image?: string
  buttonText?: string
  buttonUrl?: string
  features?: Feature[]
  stats?: {
    label: string
    value: string
  }[]
  className?: string
}

export const BrandStory: React.FC<BrandStoryProps> = ({
  title = 'Our Story',
  subtitle = 'Crafting Excellence Since Day One',
  description = 'We believe in creating products that not only look great but also make a positive impact on your life. Our journey started with a simple idea: to bring you the finest quality products at prices that make sense.',
  image = '/api/placeholder/600/400',
  buttonText = 'Learn More',
  buttonUrl = '/pages/about',
  features = [
    {
      icon: 'award',
      title: 'Premium Quality',
      description: 'Every product is carefully selected and tested for quality'
    },
    {
      icon: 'truck',
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $50 with quick delivery'
    },
    {
      icon: 'shield',
      title: 'Secure Shopping',
      description: 'Your data is protected with industry-leading security'
    },
    {
      icon: 'users',
      title: '24/7 Support',
      description: 'Our team is here to help you every step of the way'
    }
  ],
  stats = [
    { label: 'Happy Customers', value: '10K+' },
    { label: 'Products Sold', value: '50K+' },
    { label: 'Years Experience', value: '5+' },
    { label: 'Countries Served', value: '25+' }
  ],
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

  const getIcon = (iconName: string) => {
    const iconProps = { size: 24, className: 'text-blue-600' }
    switch (iconName) {
      case 'award': return <Award {...iconProps} />
      case 'users': return <Users {...iconProps} />
      case 'truck': return <Truck {...iconProps} />
      case 'shield': return <Shield {...iconProps} />
      default: return <Award {...iconProps} />
    }
  }

  return (
    <section className={`py-16 lg:py-24 bg-white ${className}`}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Text Content */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <h3 className="text-xl lg:text-2xl text-blue-600 font-semibold mb-6">
              {subtitle}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {description}
            </p>
            
            {buttonText && buttonUrl && (
              <a
                href={buttonUrl}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors group"
              >
                {buttonText}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={image}
                alt={title}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                {getIcon(feature.icon)}
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
