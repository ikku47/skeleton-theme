import React from 'react'
import { motion } from 'framer-motion'
import { VersaButton } from './VersaButton'

interface VersaSectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  accent?: string
  textAlign?: 'left' | 'center' | 'right'
  showCTA?: boolean
  ctaText?: string
  ctaUrl?: string
  onCTAClick?: () => void
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export const VersaSectionHeader: React.FC<VersaSectionHeaderProps> = ({
  title,
  subtitle,
  description,
  accent,
  textAlign = 'left',
  showCTA = false,
  ctaText = 'View All',
  ctaUrl,
  onCTAClick,
  className = '',
  maxWidth = 'lg',
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const maxWidthClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-none',
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
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
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      className={`
        ${maxWidthClasses[maxWidth]} 
        ${textAlign === 'center' ? 'mx-auto' : ''} 
        ${className}
      `}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className={`space-y-6 ${alignmentClasses[textAlign]}`}>
        {/* Accent Text */}
        {accent && (
          <motion.div variants={itemVariants}>
            <span className="font-accent text-lg text-gold italic">
              {accent}
            </span>
          </motion.div>
        )}

        {/* Main Title */}
        <motion.div variants={itemVariants}>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-dark leading-tight tracking-display">
            {title.split(' ').map((word, index) => {
              // Check if word should be emphasized (you can customize this logic)
              const shouldEmphasize = word.toLowerCase().includes('timeless') || 
                                    word.toLowerCase().includes('sparkle') ||
                                    word.toLowerCase().includes('elegant') ||
                                    word.toLowerCase().includes('luxury')
              
              return (
                <span key={index}>
                  {shouldEmphasize ? (
                    <span className="italic text-gold">{word}</span>
                  ) : (
                    word
                  )}
                  {index < title.split(' ').length - 1 && ' '}
                </span>
              )
            })}
          </h2>
        </motion.div>

        {/* Subtitle */}
        {subtitle && (
          <motion.div variants={itemVariants}>
            <h3 className="font-body text-xl md:text-2xl font-light text-warm-brown">
              {subtitle}
            </h3>
          </motion.div>
        )}

        {/* Description */}
        {description && (
          <motion.div variants={itemVariants}>
            <p className="font-body text-lg text-charcoal leading-relaxed max-w-3xl">
              {description}
            </p>
          </motion.div>
        )}

        {/* CTA Button */}
        {showCTA && (
          <motion.div 
            variants={itemVariants}
            className={textAlign === 'center' ? 'flex justify-center' : textAlign === 'right' ? 'flex justify-end' : ''}
          >
            <VersaButton
              variant="outline"
              href={ctaUrl}
              onClick={onCTAClick}
              className="mt-4"
            >
              {ctaText}
            </VersaButton>
          </motion.div>
        )}
      </div>

      {/* Decorative Line */}
      <motion.div
        className={`mt-8 h-px bg-gradient-to-r ${
          textAlign === 'center' 
            ? 'from-transparent via-light-gray to-transparent' 
            : textAlign === 'right'
            ? 'from-light-gray to-transparent'
            : 'from-transparent to-light-gray'
        }`}
        variants={itemVariants}
      />
    </motion.div>
  )
}

// Preset variants for common use cases
export const VersaCenteredSectionHeader: React.FC<Omit<VersaSectionHeaderProps, 'textAlign'>> = (props) => (
  <VersaSectionHeader textAlign="center" {...props} />
)

export const VersaLeftAlignedSectionHeader: React.FC<Omit<VersaSectionHeaderProps, 'textAlign'>> = (props) => (
  <VersaSectionHeader textAlign="left" {...props} />
)

export const VersaHeroSectionHeader: React.FC<VersaSectionHeaderProps> = (props) => (
  <VersaSectionHeader 
    {...props} 
    textAlign="center" 
    maxWidth="xl"
    className="py-section-mobile md:py-section-tablet lg:py-section-desktop"
  />
)

// Split layout component for 50/50 content blocks
interface VersaSplitSectionProps {
  title: string
  subtitle?: string
  description?: string
  imageUrl: string
  imageAlt?: string
  ctaText?: string
  ctaUrl?: string
  onCTAClick?: () => void
  imagePosition?: 'left' | 'right'
  className?: string
}

export const VersaSplitSection: React.FC<VersaSplitSectionProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
  ctaText,
  ctaUrl,
  onCTAClick,
  imagePosition = 'right',
  className = '',
}) => {
  const contentVariants = {
    hidden: { opacity: 0, x: imagePosition === 'left' ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: imagePosition === 'left' ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
    },
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${className}`}>
      {/* Content */}
      <motion.div
        className={`space-y-6 ${imagePosition === 'left' ? 'lg:order-2' : ''}`}
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <VersaSectionHeader
          title={title}
          subtitle={subtitle}
          description={description}
          textAlign="left"
          showCTA={!!ctaText}
          ctaText={ctaText}
          ctaUrl={ctaUrl}
          onCTAClick={onCTAClick}
        />
      </motion.div>

      {/* Image */}
      <motion.div
        className={`relative ${imagePosition === 'left' ? 'lg:order-1' : ''}`}
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="aspect-[4/3] rounded-card overflow-hidden">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  )
}
