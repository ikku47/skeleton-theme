import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, TrendingUp } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  price: string
  imageUrl: string
  url: string
  type: 'product' | 'collection' | 'page'
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSearch?: (query: string) => Promise<SearchResult[]>
  popularSearches?: string[]
  className?: string
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen: initialIsOpen = false,
  onClose,
  onSearch,
  popularSearches = ['Shirts', 'Jeans', 'Sneakers', 'Accessories'],
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Listen for global open event
  useEffect(() => {
    const handleOpenModal = () => {
      setIsOpen(true)
    }

    document.addEventListener('openSearchModal', handleOpenModal)
    return () => {
      document.removeEventListener('openSearchModal', handleOpenModal)
    }
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchTimeout = setTimeout(async () => {
      if (onSearch) {
        setIsLoading(true)
        try {
          const searchResults = await onSearch(query)
          setResults(searchResults)
        } catch (error) {
          console.error('Search error:', error)
          setResults([])
        } finally {
          setIsLoading(false)
        }
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query, onSearch])

  const handleClose = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    onClose?.()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white z-50 max-h-[80vh] overflow-hidden ${className}`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-lg outline-none"
                autoFocus
              />
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {!query.trim() ? (
                /* Popular Searches */
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search) => (
                      <motion.button
                        key={search}
                        onClick={() => setQuery(search)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : isLoading ? (
                /* Loading */
                <div className="p-8 text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-gray-500 mt-2">Searching...</p>
                </div>
              ) : results.length > 0 ? (
                /* Search Results */
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                  </h3>
                  <div className="space-y-3">
                    {results.map((result) => (
                      <motion.a
                        key={result.id}
                        href={result.url}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ x: 4 }}
                      >
                        <img
                          src={result.imageUrl}
                          alt={result.title}
                          className="w-12 h-12 object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{result.title}</h4>
                          <p className="text-xs text-gray-500 capitalize">{result.type}</p>
                          {result.price && (
                            <p className="text-sm font-semibold text-primary">{result.price}</p>
                          )}
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              ) : (
                /* No Results */
                <div className="p-8 text-center">
                  <Search size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No results found for "{query}"</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
