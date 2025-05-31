import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'

interface VersaSearchFormProps {
  initialQuery?: string
  placeholder?: string
  className?: string
}

export const VersaSearchForm: React.FC<VersaSearchFormProps> = ({
  initialQuery = '',
  placeholder = 'Search products, articles, and pages...',
  className = '',
}) => {
  const [query, setQuery] = useState(initialQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
    }
  }

  const handleClear = () => {
    setQuery('')
  }

  return (
    <motion.div
      className={`max-w-2xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-6 py-4 pl-14 pr-20 text-lg border-2 border-border rounded-2xl 
                     focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 
                     transition-all duration-300 bg-white shadow-sm hover:shadow-md
                     placeholder:text-neutral/60"
            autoComplete="off"
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral/60 group-focus-within:text-primary transition-colors duration-200">
            <Search className="w-6 h-6" />
          </div>

          {/* Clear Button */}
          {query && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 p-1 text-neutral/60 hover:text-neutral transition-colors duration-200"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 
                     bg-primary text-white px-6 py-2.5 rounded-xl font-medium
                     hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20
                     transition-all duration-200 shadow-sm hover:shadow-md
                     disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!query.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Search
          </motion.button>
        </div>

        {/* Search Suggestions (could be enhanced later) */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {['New Arrivals', 'Best Sellers', 'Sale Items', 'Accessories'].map((suggestion) => (
            <motion.button
              key={suggestion}
              type="button"
              onClick={() => setQuery(suggestion)}
              className="px-4 py-2 text-sm text-neutral/70 hover:text-primary 
                       border border-border hover:border-primary/30 rounded-full
                       transition-all duration-200 hover:bg-primary/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      </form>
    </motion.div>
  )
}
