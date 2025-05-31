import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Grid, List, Filter, SlidersHorizontal, ChevronDown, Search } from 'lucide-react'
import { VersaProductGrid } from './VersaProductGrid'
import { VersaProductFilter } from './VersaProductFilter'
import { VersaSearchForm } from './VersaSearchForm'
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
  tags?: string[]
  vendor?: string
  productType?: string
}

interface Product {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  imageUrl: string
  imageAlt?: string
  productUrl: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isOnSale?: boolean
  variants?: Array<{
    id: string
    available: boolean
  }>
  tags?: string[]
  vendor?: string
  type?: string
}

interface FilterGroup {
  id: string
  title: string
  type: 'checkbox' | 'radio' | 'range' | 'color'
  options?: Array<{
    value: string
    label: string
    count?: number
  }>
  min?: number
  max?: number
  step?: number
}

interface VersaSearchPageProps {
  results: SearchResult[]
  query: string
  totalResults: number
  searchFormProps?: {
    initialQuery?: string
    placeholder?: string
  }
  className?: string
}

export const VersaSearchPage: React.FC<VersaSearchPageProps> = ({
  results,
  query,
  totalResults,
  searchFormProps = {},
  className = '',
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4 | 5>(4)
  const [sortBy, setSortBy] = useState('relevance')
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [showProductsOnly, setShowProductsOnly] = useState(false)

  // Separate product and content results
  const productResults = results.filter(result => result.type === 'product')
  const contentResults = results.filter(result => result.type !== 'product')

  // Convert search results to Product format
  const products: Product[] = productResults.map(result => ({
    id: result.id,
    title: result.title,
    price: result.price || '$0.00',
    imageUrl: result.image || '',
    imageAlt: result.title,
    productUrl: result.url,
    variants: [{
      id: result.variantId || result.id,
      available: result.available !== false
    }],
    tags: result.tags || [],
    vendor: result.vendor || '',
    type: result.productType || ''
  }))

  // Generate filter groups based on search results
  const filterGroups: FilterGroup[] = useMemo(() => {
    if (productResults.length === 0) return []

    const groups: FilterGroup[] = []

    // Price filter
    const prices = productResults
      .map(p => parseFloat(p.price?.replace(/[^0-9.]/g, '') || '0'))
      .filter(p => p > 0)
    
    if (prices.length > 0) {
      const maxPrice = Math.max(...prices)
      groups.push({
        id: 'price',
        title: 'Price',
        type: 'range',
        min: 0,
        max: Math.ceil(maxPrice / 50) * 50, // Round up to nearest 50
        step: 10
      })
    }

    // Availability filter
    groups.push({
      id: 'availability',
      title: 'Availability',
      type: 'radio',
      options: [
        { value: 'all', label: 'All Products' },
        { value: 'in-stock', label: 'In Stock' }
      ]
    })

    // Tags filter
    const allTags = productResults.flatMap(p => p.tags || [])
    const uniqueTags = [...new Set(allTags)].filter(Boolean)
    if (uniqueTags.length > 1) {
      groups.push({
        id: 'tags',
        title: 'Tags',
        type: 'checkbox',
        options: uniqueTags.slice(0, 10).map(tag => ({
          value: tag,
          label: tag.charAt(0).toUpperCase() + tag.slice(1),
          count: productResults.filter(p => p.tags?.includes(tag)).length
        }))
      })
    }

    // Vendor filter
    const vendors = [...new Set(productResults.map(p => p.vendor).filter(Boolean))] as string[]
    if (vendors.length > 1) {
      groups.push({
        id: 'vendor',
        title: 'Brand',
        type: 'checkbox',
        options: vendors.slice(0, 10).map(vendor => ({
          value: vendor,
          label: vendor,
          count: productResults.filter(p => p.vendor === vendor).length
        }))
      })
    }

    // Product type filter
    const types = [...new Set(productResults.map(p => p.productType).filter(Boolean))] as string[]
    if (types.length > 1) {
      groups.push({
        id: 'type',
        title: 'Product Type',
        type: 'checkbox',
        options: types.slice(0, 10).map(type => ({
          value: type,
          label: type,
          count: productResults.filter(p => p.productType === type).length
        }))
      })
    }

    return groups
  }, [productResults])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // Apply filters
    Object.entries(activeFilters).forEach(([filterId, filterValue]) => {
      if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) return

      filtered = filtered.filter(product => {
        switch (filterId) {
          case 'price':
            const price = parseFloat(product.price.replace(/[^0-9.]/g, ''))
            return price >= filterValue[0] && price <= filterValue[1]
          
          case 'availability':
            if (filterValue === 'in-stock') {
              return product.variants?.some(v => v.available) ?? true
            }
            return true
          
          case 'tags':
            return filterValue.some((tag: string) => product.tags?.includes(tag))
          
          case 'vendor':
            return filterValue.includes(product.vendor)
          
          case 'type':
            return filterValue.includes(product.type)
          
          default:
            return true
        }
      })
    })

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''))
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''))
          return priceA - priceB
        })
        break
      case 'price-high-low':
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''))
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''))
          return priceB - priceA
        })
        break
      case 'title-a-z':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'title-z-a':
        filtered.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        // Keep original order for 'relevance'
        break
    }

    return filtered
  }, [products, activeFilters, sortBy])

  const handleFilterChange = (filterId: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: value
    }))
  }

  const handleClearFilters = () => {
    setActiveFilters({})
  }

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'title-a-z', label: 'Name: A to Z' },
    { value: 'title-z-a', label: 'Name: Z to A' },
  ]

  // If no search has been performed yet
  if (!query && totalResults === 0) {
    return (
      <div className={`min-h-screen bg-gray-50 ${className}`}>
        <div className="p-6">
          {/* Search Form */}
          <div className="max-w-4xl mx-auto mb-12">
            <VersaSearchForm
              initialQuery={searchFormProps.initialQuery || ''}
              placeholder={searchFormProps.placeholder || 'Search products, articles, and pages...'}
            />
          </div>

          {/* Initial Search State */}
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                Start your search
              </h3>
              <p className="text-neutral/70 mb-8 leading-relaxed">
                Discover amazing products, helpful articles, and useful pages.
                Type in the search box above to get started!
              </p>
              
              {/* Popular Searches */}
              <div className="mb-8">
                <p className="text-sm text-neutral/60 mb-4">Popular searches:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['new arrivals', 'best sellers', 'sale', 'accessories', 'gift cards'].map((term) => (
                    <a
                      key={term}
                      href={`/search?q=${encodeURIComponent(term)}`}
                      className="px-4 py-2 text-sm bg-white text-neutral rounded-full hover:bg-primary/10
                               hover:text-primary transition-colors border border-gray-200 hover:border-primary/30"
                    >
                      {term}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Search Form */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <VersaSearchForm
            initialQuery={query}
            placeholder={searchFormProps.placeholder || 'Search products, articles, and pages...'}
          />
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}

      {/* Mobile Filter Sidebar */}
      {productResults.length > 0 && (
        <div className="lg:hidden">
          <VersaProductFilter
            filterGroups={filterGroups}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isMobile={true}
            isOpen={isMobileFilterOpen}
            onToggle={() => setIsMobileFilterOpen(false)}
          />
        </div>
      )}

      <div className="flex">
        {/* Desktop Filter Sidebar - only show if there are products */}
        {productResults.length > 0 && (
          <div className="hidden lg:block w-80 flex-shrink-0 p-6">
            <VersaProductFilter
              filterGroups={filterGroups}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 p-6 ${productResults.length === 0 ? 'max-w-4xl mx-auto' : ''}`}>
          {/* Search Results Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-primary mb-4">
              Search Results
            </h1>
            {totalResults > 0 ? (
              <p className="text-lg text-neutral">
                <span className="font-semibold text-primary">{totalResults}</span> result{totalResults !== 1 ? 's' : ''} for 
                <span className="font-medium text-primary"> "{query}"</span>
              </p>
            ) : (
              <p className="text-lg text-neutral">
                No results found for <span className="font-medium text-primary">"{query}"</span>
              </p>
            )}
          </div>

          {/* Results found */}
          {totalResults > 0 && (
            <>
              {/* Toolbar - only show if there are products */}
              {productResults.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Button */}
                    <button
                      onClick={() => setIsMobileFilterOpen(true)}
                      className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                    </button>

                    {/* Results Count */}
                    <span className="text-sm text-neutral">
                      {filteredAndSortedProducts.length} of {productResults.length} products
                    </span>

                    {/* Show Products Only Toggle */}
                    {contentResults.length > 0 && (
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={showProductsOnly}
                          onChange={(e) => setShowProductsOnly(e.target.checked)}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        Products only
                      </label>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sort Dropdown */}
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-primary focus:border-primary"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 transition-colors ${
                          viewMode === 'grid'
                            ? 'bg-primary text-white'
                            : 'bg-white text-neutral hover:bg-gray-50'
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 transition-colors ${
                          viewMode === 'list'
                            ? 'bg-primary text-white'
                            : 'bg-white text-neutral hover:bg-gray-50'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Grid Columns (only show in grid mode) */}
                    {viewMode === 'grid' && (
                      <div className="hidden sm:flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-neutral" />
                        <select
                          value={gridColumns}
                          onChange={(e) => setGridColumns(Number(e.target.value) as 2 | 3 | 4 | 5)}
                          className="appearance-none bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:ring-primary focus:border-primary"
                        >
                          <option value={2}>2 Columns</option>
                          <option value={3}>3 Columns</option>
                          <option value={4}>4 Columns</option>
                          <option value={5}>5 Columns</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Product Results */}
              {filteredAndSortedProducts.length > 0 && (
                <motion.section
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <VersaProductGrid
                    products={filteredAndSortedProducts}
                    layout={viewMode}
                    columns={gridColumns}
                    showViewAll={false}
                    className="bg-transparent"
                  />
                </motion.section>
              )}

              {/* Content Results */}
              {contentResults.length > 0 && !showProductsOnly && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
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
                        transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
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

              {/* Empty State for Filtered Products */}
              {productResults.length > 0 && filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <Filter className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products match your filters</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your filter criteria.</p>
                    <button
                      onClick={handleClearFilters}
                      className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* No Results State */}
          {totalResults === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                  No results found
                </h3>
                <p className="text-neutral/70 mb-8 leading-relaxed">
                  We couldn't find anything matching "
                  <span className="font-medium text-primary">{query}</span>".
                  Try adjusting your search terms or browse our collections.
                </p>
                
                {/* Search Suggestions */}
                <div className="mb-8">
                  <p className="text-sm text-neutral/60 mb-3">Try searching for:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['shirts', 'accessories', 'shoes', 'bags'].map((suggestion) => (
                      <a
                        key={suggestion}
                        href={`/search?q=${suggestion}`}
                        className="px-3 py-1 text-sm bg-white text-neutral rounded-full hover:bg-primary/10
                                 hover:text-primary transition-colors border border-gray-200"
                      >
                        {suggestion}
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href="/collections"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-medium
                           hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Browse Collections
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
