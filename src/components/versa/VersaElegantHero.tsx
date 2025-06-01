import React from 'react'
import { motion } from 'framer-motion'
import { VersaButton } from './VersaButton'

interface VersaElegantHeroProps {
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  backgroundVideo?: string
  primaryCTA?: {
    text: string
    url?: string
    onClick?: () => void
  }
  secondaryCTA?: {
    text: string
    url?: string
    onClick?: () => void
  }
  overlay?: boolean
  overlayOpacity?: number
  textAlign?: 'left' | 'center' | 'right'
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export const VersaElegantHero: React.FC<VersaElegantHeroProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundVideo,
  primaryCTA,
  secondaryCTA,
  overlay = true,
  overlayOpacity = 0.4,
  textAlign = 'center',
  height = 'lg',
  className = '',
}) => {
  const heightClasses = {
    sm: 'min-h-[60vh]',
    md: 'min-h-[70vh]',
    lg: 'min-h-[85vh]',
    xl: 'min-h-[95vh]',
    full: 'min-h-screen',
  }

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Background Media */}
      {backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-taupe via-off-white to-lighter-gray" />
      )}

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-dark"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <motion.div
        className={`relative z-10 container max-w-4xl px-6 flex flex-col ${alignmentClasses[textAlign]} space-y-8`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Subtitle */}
        {subtitle && (
          <motion.div variants={itemVariants}>
            <span className="font-accent text-xl md:text-2xl text-gold italic">
              {subtitle}
            </span>
          </motion.div>
        )}

        {/* Main Title */}
        <motion.div variants={titleVariants}>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-display">
            {title.split(' ').map((word, index) => {
              // Emphasize certain words
              const shouldEmphasize = word.toLowerCase().includes('timeless') || 
                                    word.toLowerCase().includes('sparkle') ||
                                    word.toLowerCase().includes('elegant') ||
                                    word.toLowerCase().includes('luxury')
              
              return (
                <motion.span
                  key={index}
                  className={`inline-block ${shouldEmphasize ? 'italic text-gold' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  {word}
                  {index < title.split(' ').length - 1 && '\u00A0'}
                </motion.span>
              )
            })}
          </h1>
        </motion.div>

        {/* Description */}
        {description && (
          <motion.div variants={itemVariants}>
            <p className="font-body text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
              {description}
            </p>
          </motion.div>
        )}

        {/* CTA Buttons */}
        {(primaryCTA || secondaryCTA) && (
          <motion.div 
            variants={itemVariants}
            className={`flex flex-col sm:flex-row gap-4 ${
              textAlign === 'center' ? 'justify-center' : 
              textAlign === 'right' ? 'justify-end' : 'justify-start'
            }`}
          >
            {primaryCTA && (
              <VersaButton
                variant="primary"
                size="lg"
                href={primaryCTA.url}
                onClick={primaryCTA.onClick}
                className="min-w-[200px]"
              >
                {primaryCTA.text}
              </VersaButton>
            )}
            
            {secondaryCTA && (
              <VersaButton
                variant="outline"
                size="lg"
                href={secondaryCTA.url}
                onClick={secondaryCTA.onClick}
                className="min-w-[200px] border-white text-white hover:bg-white hover:text-dark"
              >
                {secondaryCTA.text}
              </VersaButton>
            )}
          </motion.div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  )
}

// Preset variants for common use cases
export const VersaFullScreenHero: React.FC<Omit<VersaElegantHeroProps, 'height'>> = (props) => (
  <VersaElegantHero height="full" {...props} />
)

export const VersaCompactHero: React.FC<Omit<VersaElegantHeroProps, 'height'>> = (props) => (
  <VersaElegantHero height="md" {...props} />
)

export const VersaLeftAlignedHero: React.FC<Omit<VersaElegantHeroProps, 'textAlign'>> = (props) => (
  <VersaElegantHero textAlign="left" {...props} />
)
