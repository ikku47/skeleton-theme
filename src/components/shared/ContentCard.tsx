import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Calendar } from 'lucide-react'

interface ContentCardProps {
  title: string
  excerpt?: string
  url: string
  type: 'article' | 'page'
  publishedAt?: string
  className?: string
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  excerpt,
  url,
  type,
  publishedAt,
  className = '',
}) => {
  return (
    <motion.a
      href={url}
      className={`group block bg-card-bg rounded-2xl border-2 border-border hover:border-primary/30
                 transition-all duration-300 p-6 hover:shadow-lg ${className}`}
      whileHover={{ x: 4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full capitalize">
              {type}
            </span>
            {publishedAt && (
              <div className="flex items-center gap-1 text-xs text-neutral/60">
                <Calendar className="w-3 h-3" />
                <span>{new Date(publishedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          
          <h3 className="font-heading font-semibold text-primary group-hover:text-accent transition-colors duration-200 mb-2 line-clamp-2">
            {title}
          </h3>
          
          {excerpt && (
            <p className="text-neutral/70 text-sm line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          )}
        </div>
        
        <motion.div
          className="flex-shrink-0 text-neutral/40 group-hover:text-primary transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
        >
          <ExternalLink className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.a>
  )
}
