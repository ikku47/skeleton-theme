import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

interface VersaHeroSectionProps {
  title: string
  subtitle?: string
  description: string
  cta_text: string
  cta_url: string
  secondary_cta_text?: string
  secondary_cta_url?: string
  background_image?: string
  video_url?: string
  className?: string
}

export const VersaHeroSection: React.FC<VersaHeroSectionProps> = ({
  title,
  subtitle,
  description,
  cta_text,
  cta_url,
  secondary_cta_text,
  secondary_cta_url,
  background_image,
  video_url,
  className = '',
}) => {
  return (
    <section className={`relative w-full min-h-screen flex items-center bg-light-bg overflow-hidden ${className}`}>
      {/* Background Video or Image */}
      {video_url && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={video_url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-primary bg-opacity-40"></div>
        </div>
      )}

      {/* Container */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {subtitle && (
              <motion.p
                className="text-neutral font-medium text-lg tracking-wide uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}

            <motion.h1
              className="font-display text-primary text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="font-body text-neutral text-lg md:text-xl leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.a
                href={cta_url}
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-heading font-semibold text-lg rounded-cta hover:bg-yellow-400 transition-all duration-200 group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {cta_text}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              {secondary_cta_text && secondary_cta_url && (
                <motion.a
                  href={secondary_cta_url}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-heading font-semibold text-lg rounded-cta hover:bg-primary hover:text-white transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {secondary_cta_text}
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {background_image && (
              <div className="relative aspect-hero rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={background_image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play button overlay for video */}
                {video_url && (
                  <motion.button
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                    </div>
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-neutral rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-neutral rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
