import React from 'react'
import { motion } from 'framer-motion'
import { Truck, Shield, Headphones, CreditCard, Clock, Award } from 'lucide-react'

interface FeatureItem {
  icon: string
  title: string
  description: string
}

interface FeatureCalloutsProps {
  features: FeatureItem[]
  className?: string
}

const iconMap = {
  'truck': Truck,
  'shield': Shield,
  'headphones': Headphones,
  'credit-card': CreditCard,
  'clock': Clock,
  'award': Award,
}

export const FeatureCallouts: React.FC<FeatureCalloutsProps> = ({
  features,
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <section className={`section-padding bg-white ${className}`}>
      <div className="container">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Shield

            return (
              <motion.div
                key={index}
                className="group text-center p-6 rounded-lg hover:bg-light-bg transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <IconComponent className="w-8 h-8 text-primary" />
                </motion.div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-xl text-primary mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-body text-neutral leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// Default features for VersaCommerce
export const defaultFeatures: FeatureItem[] = [
  {
    icon: 'truck',
    title: 'Free Shipping',
    description: 'Free shipping on orders over $50. Fast and reliable delivery to your doorstep.',
  },
  {
    icon: 'shield',
    title: 'Secure Checkout',
    description: 'Your payment information is protected with industry-standard encryption.',
  },
  {
    icon: 'headphones',
    title: '24/7 Support',
    description: 'Our customer support team is here to help you anytime, anywhere.',
  },
]
