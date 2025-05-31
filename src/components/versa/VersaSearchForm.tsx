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
      className={`max-w-4xl mx-auto ${className}`}
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
            className="w-full px-6 py-5 pl-16 pr-32 text-lg border-2 border-border rounded-2xl
                     focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10
                     transition-all duration-300 bg-white shadow-lg hover:shadow-xl
                     placeholder:text-neutral/60 font-body
                     sm:px-8 sm:py-6 sm:pl-20 sm:pr-36 sm:text-xl"
            autoComplete="off"
          />

          {/* Search Icon */}
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-neutral/60 group-focus-within:text-primary transition-colors duration-200 sm:left-7">
            <Search className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          {/* Clear Button */}
          {query && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="absolute right-28 top-1/2 transform -translate-y-1/2
                       p-2 text-neutral/60 hover:text-primary transition-colors duration-200
                       hover:bg-gray-100 rounded-lg sm:right-32"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}

          {/* Enhanced Submit Button */}
          <motion.button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2
                     bg-gradient-to-r from-primary to-secondary text-white
                     px-6 py-3 rounded-xl font-semibold font-heading
                     hover:from-primary/90 hover:to-secondary/90
                     focus:outline-none focus:ring-4 focus:ring-primary/20
                     transition-all duration-200 shadow-lg hover:shadow-xl
                     disabled:opacity-50 disabled:cursor-not-allowed
                     sm:px-8 sm:py-3.5"
            disabled={!query.trim()}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="hidden sm:inline">Search</span>
            <Search className="w-5 h-5 sm:hidden" />
          </motion.button>
        </div>

        {/* Enhanced Search Suggestions */}
        <motion.div
          className="mt-6 space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center">
            <p className="text-sm text-neutral/70 font-body mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['New Arrivals', 'Best Sellers', 'Sale Items', 'Accessories', 'Electronics', 'Fashion'].map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuery(suggestion)}
                  className="px-4 py-2 text-sm text-neutral/70 hover:text-primary
                           border border-border hover:border-primary/30 rounded-full
                           transition-all duration-200 hover:bg-primary/5 hover:shadow-md
                           font-body"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <motion.a
              href="/collections/all"
              className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:text-accent
                       bg-light-bg hover:bg-accent/10 rounded-lg transition-all duration-200
                       font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Browse All</span>
            </motion.a>
            <motion.a
              href="/collections/sale"
              className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:text-accent
                       bg-light-bg hover:bg-accent/10 rounded-lg transition-all duration-200
                       font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Sale Items</span>
            </motion.a>
          </div>
        </motion.div>
      </form>
    </motion.div>
  )
}
