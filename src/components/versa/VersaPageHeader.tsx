import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  title: string
  url?: string
}

interface VersaPageHeaderProps {
  title: string
  subtitle?: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  backgroundImage?: string
  overlay?: boolean
  textAlign?: 'left' | 'center' | 'right'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export const VersaPageHeader: React.FC<VersaPageHeaderProps> = ({
  title,
  subtitle,
  description,
  breadcrumbs,
  backgroundImage,
  overlay = true,
  textAlign = 'center',
  size = 'medium',
  className = '',
}) => {
  const sizeClasses = {
    small: 'pt-28 pb-12 md:pt-32 md:pb-16',
    medium: 'pt-32 pb-16 md:pt-36 md:pb-24',
    large: 'pt-36 pb-24 md:pt-40 md:pb-32',
  }

  const titleSizes = {
    small: 'text-3xl md:text-4xl',
    medium: 'text-4xl md:text-5xl',
    large: 'text-5xl md:text-6xl',
  }

  return (
    <section 
      className={`relative ${sizeClasses[size]} ${backgroundImage ? 'text-white' : 'bg-light-bg'} ${className}`}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}}
    >
      {/* Overlay */}
      {backgroundImage && overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      )}

      <div className="container relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            className={`mb-6 ${textAlign === 'center' ? 'flex justify-center' : textAlign === 'right' ? 'flex justify-end' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a 
                  href="/" 
                  className={`flex items-center gap-1 hover:text-accent transition-colors ${
                    backgroundImage ? 'text-white/80 hover:text-white' : 'text-neutral hover:text-primary'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  Home
                </a>
              </li>
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <ChevronRight className={`w-4 h-4 ${backgroundImage ? 'text-white/60' : 'text-neutral'}`} />
                  {item.url ? (
                    <a 
                      href={item.url}
                      className={`hover:text-accent transition-colors ${
                        backgroundImage ? 'text-white/80 hover:text-white' : 'text-neutral hover:text-primary'
                      }`}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span className={backgroundImage ? 'text-white' : 'text-primary'}>
                      {item.title}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        {/* Header Content */}
        <div className={`max-w-4xl ${textAlign === 'center' ? 'mx-auto text-center' : textAlign === 'right' ? 'ml-auto text-right' : ''}`}>
          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className={`font-body text-lg mb-4 uppercase tracking-wide ${
                backgroundImage ? 'text-white/80' : 'text-neutral'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            className={`font-heading ${titleSizes[size]} font-bold leading-tight mb-6 ${
              backgroundImage ? 'text-white' : 'text-primary'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              className={`font-body text-lg md:text-xl leading-relaxed max-w-2xl ${
                textAlign === 'center' ? 'mx-auto' : textAlign === 'right' ? 'ml-auto' : ''
              } ${backgroundImage ? 'text-white/90' : 'text-neutral'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
