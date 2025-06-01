import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, ArrowRight } from 'lucide-react'

interface VersaButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  className?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  loading?: boolean
}

export const VersaButton: React.FC<VersaButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  href,
  type = 'button',
  icon: Icon,
  iconPosition = 'right',
  fullWidth = false,
  loading = false,
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium transition-all duration-300 ease-out 
    focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden
    font-body letter-spacing-elegant
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `
  
  const variantClasses = {
    primary: `
      bg-warm-brown text-white shadow-button
      hover:bg-dark hover:shadow-button-hover hover:-translate-y-0.5
      focus:ring-warm-brown
    `,
    secondary: `
      bg-gold text-white shadow-button
      hover:bg-light-gold hover:shadow-button-hover hover:-translate-y-0.5
      focus:ring-gold
    `,
    outline: `
      bg-transparent text-warm-brown border-2 border-warm-brown
      hover:bg-warm-brown hover:text-white hover:-translate-y-0.5 hover:shadow-button
      focus:ring-warm-brown
    `,
    accent: `
      bg-taupe text-warm-brown
      hover:bg-light-gray hover:-translate-y-0.5
      focus:ring-taupe
    `,
  }
  
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm rounded-button',
    md: 'px-8 py-3 text-base rounded-button',
    lg: 'px-10 py-4 text-lg rounded-button',
  }
  
  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  const motionProps = {
    whileHover: disabled || loading ? {} : { scale: 1.02 },
    whileTap: disabled || loading ? {} : { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  }

  const shimmerEffect = (
    <motion.div
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
      animate={{
        translateX: ['100%', '100%', '-100%', '-100%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3,
        ease: 'linear',
      }}
    />
  )

  const content = (
    <>
      {shimmerEffect}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon size={iconSizes[size]} />
        )}
        {loading ? (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : (
          children
        )}
        {Icon && iconPosition === 'right' && !loading && (
          <motion.div
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={iconSizes[size]} />
          </motion.div>
        )}
        {!Icon && !loading && variant === 'primary' && (
          <motion.div
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={iconSizes[size]} />
          </motion.div>
        )}
      </span>
    </>
  )
  
  if (href && !disabled && !loading) {
    return (
      <motion.a
        href={href}
        className={classes}
        {...motionProps}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...motionProps}
    >
      {content}
    </motion.button>
  )
}

// Preset button variants for common use cases
export const VersaPrimaryButton: React.FC<Omit<VersaButtonProps, 'variant'>> = (props) => (
  <VersaButton variant="primary" {...props} />
)

export const VersaSecondaryButton: React.FC<Omit<VersaButtonProps, 'variant'>> = (props) => (
  <VersaButton variant="secondary" {...props} />
)

export const VersaOutlineButton: React.FC<Omit<VersaButtonProps, 'variant'>> = (props) => (
  <VersaButton variant="outline" {...props} />
)

export const VersaAccentButton: React.FC<Omit<VersaButtonProps, 'variant'>> = (props) => (
  <VersaButton variant="accent" {...props} />
)
