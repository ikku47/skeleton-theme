import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Grid, List, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { VersaProductGrid } from './VersaProductGrid'
import { VersaProductFilter } from './VersaProductFilter'

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

interface VersaCollectionPageProps {
  products: Product[]
  filterGroups: FilterGroup[]
  collectionTitle?: string
  collectionDescription?: string
  totalProducts?: number
  className?: string
}

export const VersaCollectionPage: React.FC<VersaCollectionPageProps> = ({
  products,
  filterGroups,
  collectionTitle,
  collectionDescription,
  totalProducts,
  className = '',
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4 | 5>(4)
  const [sortBy, setSortBy] = useState('featured')
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // Apply filters
    Object.entries(activeFilters).forEach(([filterId, filterValue]) => {
      if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) return

      const filterGroup = filterGroups.find(g => g.id === filterId)
      if (!filterGroup) return

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
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Keep original order for 'featured'
        break
    }

    return filtered
  }, [products, activeFilters, sortBy, filterGroups])

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
    { value: 'featured', label: 'Featured' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'title-a-z', label: 'Name: A to Z' },
    { value: 'title-z-a', label: 'Name: Z to A' },
    { value: 'newest', label: 'Newest First' },
  ]

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}

      {/* Mobile Filter Sidebar */}
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

      <div className="flex">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0 p-6">
          <VersaProductFilter
            filterGroups={filterGroups}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Collection Header */}
          {(collectionTitle || collectionDescription) && (
            <div className="mb-8">
              {collectionTitle && (
                <h1 className="text-3xl font-heading font-bold text-primary mb-4">
                  {collectionTitle}
                </h1>
              )}
              {collectionDescription && (
                <p className="text-neutral leading-relaxed max-w-3xl">
                  {collectionDescription}
                </p>
              )}
            </div>
          )}

          {/* Toolbar */}
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
                {filteredAndSortedProducts.length} of {totalProducts || products.length} products
              </span>
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

          {/* Products Grid */}
          <VersaProductGrid
            products={filteredAndSortedProducts}
            layout={viewMode}
            columns={gridColumns}
            className="bg-transparent"
          />

          {/* Empty State */}
          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Filter className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
