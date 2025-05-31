import React from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

interface IconButtonProps {
  icon: keyof typeof Icons
  size?: number
  variant?: 'default' | 'ghost' | 'outline'
  onClick?: () => void
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 24,
  variant = 'default',
  onClick,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const IconComponent = Icons[icon] as React.ComponentType<{ size: number }>
  
  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in lucide-react`)
    return null
  }
  
  const baseClasses = 'inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
  
  const variantClasses = {
    default: 'bg-primary text-white hover:bg-primary/90',
    ghost: 'text-foreground hover:bg-muted',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
  }
  
  const sizeClasses = size <= 16 ? 'p-1' : size <= 24 ? 'p-2' : 'p-3'
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses} ${className}`
  
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <IconComponent size={size} />
    </motion.button>
  )
}
