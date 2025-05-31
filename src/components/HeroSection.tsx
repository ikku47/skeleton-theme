import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { AnimatedButton } from './AnimatedButton'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  description?: string
  cta_text?: string
  cta_url?: string
  secondary_cta_text?: string
  secondary_cta_url?: string
  background_image?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  cta_text = "Shop Now",
  cta_url = "/collections/all",
  secondary_cta_text = "Browse Collections",
  secondary_cta_url = "/collections",
  background_image
}) => {
  const backgroundStyle = background_image 
    ? { backgroundImage: `url(${background_image})` }
    : { background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }

  return (
    <section 
      className="relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
      style={backgroundStyle}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-left"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              {subtitle}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {title}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-white/90 mb-8"
          >
            {description}
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <AnimatedButton
              href={cta_url}
              variant="primary"
              size="lg"
              icon={ArrowRight}
            >
              {cta_text}
            </AnimatedButton>
            <AnimatedButton
              href={secondary_cta_url}
              variant="outline"
              size="lg"
            >
              {secondary_cta_text}
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
