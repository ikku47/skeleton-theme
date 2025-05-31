import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  url?: string
  isActive?: boolean
}

interface ProductBreadcrumbsProps {
  items: BreadcrumbItem[]
  showHomeIcon?: boolean
  className?: string
}

export const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({
  items,
  showHomeIcon = true,
  className = '',
}) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <motion.nav
      className={`mb-8 ${className}`}
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* Separator */}
            {index > 0 && (
              <ChevronRight 
                size={14} 
                className="mx-2 text-gray-400" 
              />
            )}

            {/* Breadcrumb Item */}
            {item.url && !item.isActive ? (
              <motion.a
                href={item.url}
                className="hover:text-primary transition-colors flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                {index === 0 && showHomeIcon && (
                  <Home size={14} className="mr-1" />
                )}
                {item.label}
              </motion.a>
            ) : (
              <span 
                className={`flex items-center ${
                  item.isActive 
                    ? 'text-gray-900 font-medium' 
                    : 'text-gray-500'
                }`}
              >
                {index === 0 && showHomeIcon && (
                  <Home size={14} className="mr-1" />
                )}
                {item.label}
              </span>
            )}
          </motion.li>
        ))}
      </ol>
    </motion.nav>
  )
}
