import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { VersaProductGrid } from './VersaProductGrid'
import { ContentCard } from '../shared/ContentCard'

interface SearchResult {
  id: string
  title: string
  url: string
  type: 'product' | 'article' | 'page'
  image?: string
  price?: string
  excerpt?: string
  published_at?: string
  variantId?: string
  available?: boolean
}

interface VersaSearchResultsProps {
  results: SearchResult[]
  query: string
  totalResults: number
  className?: string
}

// Empty Search Illustration SVG Component
const EmptySearchIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Circle */}
    <circle cx="200" cy="150" r="120" fill="currentColor" opacity="0.05" />

    {/* Magnifying Glass */}
    <g transform="translate(150, 100)">
      {/* Glass Circle */}
      <circle
        cx="40"
        cy="40"
        r="35"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.3"
      />

      {/* Handle */}
      <line
        x1="67"
        y1="67"
        x2="85"
        y2="85"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* X Mark inside glass */}
      <g transform="translate(25, 25)">
        <line
          x1="10"
          y1="10"
          x2="20"
          y2="20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
        <line
          x1="20"
          y1="10"
          x2="10"
          y2="20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
    </g>

    {/* Floating Elements */}
    <g opacity="0.2">
      <circle cx="120" cy="80" r="3" fill="currentColor" />
      <circle cx="280" cy="100" r="2" fill="currentColor" />
      <circle cx="320" cy="180" r="2.5" fill="currentColor" />
      <circle cx="80" cy="220" r="2" fill="currentColor" />
    </g>

    {/* Search Lines */}
    <g opacity="0.15">
      <rect x="50" y="240" width="60" height="3" rx="1.5" fill="currentColor" />
      <rect x="130" y="240" width="40" height="3" rx="1.5" fill="currentColor" />
      <rect x="190" y="240" width="80" height="3" rx="1.5" fill="currentColor" />
      <rect x="290" y="240" width="50" height="3" rx="1.5" fill="currentColor" />
    </g>
  </svg>
)

// Initial Search Illustration SVG Component (for when no search is performed)
const InitialSearchIllustration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Circle */}
    <circle cx="200" cy="150" r="120" fill="currentColor" opacity="0.05" />

    {/* Magnifying Glass */}
    <g transform="translate(150, 100)">
      {/* Glass Circle */}
      <circle
        cx="40"
        cy="40"
        r="35"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.4"
      />

      {/* Handle */}
      <line
        x1="67"
        y1="67"
        x2="85"
        y2="85"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Search icon inside glass */}
      <g transform="translate(30, 30)" opacity="0.6">
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="18" y1="18" x2="22" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>

    {/* Floating Search Elements */}
    <g opacity="0.3">
      <circle cx="120" cy="80" r="3" fill="currentColor" />
      <circle cx="280" cy="100" r="2" fill="currentColor" />
      <circle cx="320" cy="180" r="2.5" fill="currentColor" />
      <circle cx="80" cy="220" r="2" fill="currentColor" />
    </g>

    {/* Search Suggestions Lines */}
    <g opacity="0.2">
      <rect x="50" y="240" width="60" height="3" rx="1.5" fill="currentColor" />
      <rect x="130" y="240" width="40" height="3" rx="1.5" fill="currentColor" />
      <rect x="190" y="240" width="80" height="3" rx="1.5" fill="currentColor" />
      <rect x="290" y="240" width="50" height="3" rx="1.5" fill="currentColor" />
    </g>

    {/* Sparkles */}
    <g opacity="0.4">
      <g transform="translate(100, 60)">
        <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" fill="currentColor" transform="scale(0.5)" />
      </g>
      <g transform="translate(300, 70)">
        <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" fill="currentColor" transform="scale(0.3)" />
      </g>
      <g transform="translate(90, 200)">
        <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" fill="currentColor" transform="scale(0.4)" />
      </g>
    </g>
  </svg>
)

export const VersaSearchResults: React.FC<VersaSearchResultsProps> = ({
  results,
  query,
  totalResults,
  className = '',
}) => {
  const productResults = results.filter(result => result.type === 'product')
  const contentResults = results.filter(result => result.type !== 'product')

  // If no search has been performed yet, show initial search state
  if (!query && totalResults === 0) {
    return (
      <motion.div
        className={`text-center py-16 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          {/* Illustration */}
          <motion.div
            className="w-32 h-24 mx-auto mb-8 text-primary/40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InitialSearchIllustration className="w-full h-full" />
          </motion.div>

          {/* Heading */}
          <motion.h3
            className="text-2xl font-heading font-bold text-primary mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Start your search
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-neutral/70 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Discover amazing products, helpful articles, and useful pages.
            Type in the search box above to get started!
          </motion.p>

          {/* Popular Searches */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-sm text-neutral/60 mb-4">Popular searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['new arrivals', 'best sellers', 'sale', 'accessories', 'gift cards'].map((term, index) => (
                <motion.a
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="px-4 py-2 text-sm bg-light-bg text-neutral rounded-full hover:bg-primary/10
                           hover:text-primary transition-colors border border-border hover:border-primary/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {term}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Browse Collections Button */}
          <motion.a
            href="/collections"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-medium
                     hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Browse All Collections
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.div>
    )
  }

  if (totalResults === 0) {
    return (
      <motion.div
        className={`text-center py-16 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          {/* Illustration */}
          <motion.div
            className="w-32 h-24 mx-auto mb-8 text-primary/40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <EmptySearchIllustration className="w-full h-full" />
          </motion.div>

          {/* Heading */}
          <motion.h3
            className="text-2xl font-heading font-bold text-primary mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            No results found
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-neutral/70 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {query ? (
              <>
                We couldn't find anything matching "
                <span className="font-medium text-primary">{query}</span>".
                Try adjusting your search terms or browse our collections.
              </>
            ) : (
              "Start typing to search for products, articles, and pages."
            )}
          </motion.p>

          {/* Action Button */}
          <motion.a
            href="/collections"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-medium
                     hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Browse Collections
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          {/* Search Suggestions */}
          {query && (
            <motion.div
              className="mt-8 pt-6 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-sm text-neutral/60 mb-3">Try searching for:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['shirts', 'accessories', 'shoes', 'bags'].map((suggestion, index) => (
                  <motion.a
                    key={suggestion}
                    href={`/search?q=${suggestion}`}
                    className="px-3 py-1 text-sm bg-light-bg text-neutral rounded-full hover:bg-primary/10
                             hover:text-primary transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {suggestion}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className={className}>
      {/* Results Summary */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg text-neutral">
          <span className="font-semibold text-primary">{totalResults}</span> result{totalResults !== 1 ? 's' : ''} for 
          <span className="font-medium text-primary"> "{query}"</span>
        </p>
      </motion.div>

      {/* Product Results */}
      {productResults.length > 0 && (
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <VersaProductGrid
            title="Products"
            subtitle={`${productResults.length} result${productResults.length !== 1 ? 's' : ''} found`}
            products={productResults.map(product => ({
              id: product.id,
              title: product.title,
              price: product.price || '',
              imageUrl: product.image || '',
              imageAlt: product.title,
              productUrl: product.url,
              variants: [{
                id: product.variantId || product.id,
                available: product.available !== false
              }]
            }))}
            showViewAll={false}
            className="mb-0"
          />
        </motion.section>
      )}

      {/* Content Results */}
      {contentResults.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-heading font-bold text-primary mb-6 flex items-center gap-2">
            Articles & Pages
            <span className="text-sm font-normal text-neutral/60 bg-neutral/10 px-2 py-1 rounded-full">
              {contentResults.length}
            </span>
          </h2>
          
          <div className="space-y-4">
            {contentResults.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              >
                <ContentCard
                  title={content.title}
                  excerpt={content.excerpt}
                  url={content.url}
                  type={content.type as 'article' | 'page'}
                  publishedAt={content.published_at}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  )
}
