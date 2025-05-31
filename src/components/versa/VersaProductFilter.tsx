import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, X, Filter } from 'lucide-react'

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterGroup {
  id: string
  title: string
  type: 'checkbox' | 'radio' | 'range' | 'color'
  options?: FilterOption[]
  min?: number
  max?: number
  step?: number
}

interface VersaProductFilterProps {
  filterGroups: FilterGroup[]
  activeFilters: Record<string, any>
  onFilterChange: (filterId: string, value: any) => void
  onClearFilters: () => void
  className?: string
  isMobile?: boolean
  isOpen?: boolean
  onToggle?: () => void
}

export const VersaProductFilter: React.FC<VersaProductFilterProps> = ({
  filterGroups,
  activeFilters,
  onFilterChange,
  onClearFilters,
  className = '',
  isMobile = false,
  isOpen = true,
  onToggle,
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    filterGroups.reduce((acc, group) => ({ ...acc, [group.id]: true }), {})
  )

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  const hasActiveFilters = Object.keys(activeFilters).length > 0

  const renderFilterGroup = (group: FilterGroup) => {
    const isExpanded = expandedGroups[group.id]
    
    return (
      <div key={group.id} className="border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => toggleGroup(group.id)}
          className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-primary">{group.title}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-neutral" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral" />
          )}
        </button>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pb-4">
            {group.type === 'checkbox' && renderCheckboxOptions(group)}
            {group.type === 'radio' && renderRadioOptions(group)}
            {group.type === 'range' && renderRangeOption(group)}
            {group.type === 'color' && renderColorOptions(group)}
          </div>
        </motion.div>
      </div>
    )
  }

  const renderCheckboxOptions = (group: FilterGroup) => {
    const activeValues = activeFilters[group.id] || []
    
    return (
      <div className="space-y-2">
        {group.options?.map((option) => (
          <label key={option.value} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="checkbox"
              checked={activeValues.includes(option.value)}
              onChange={(e) => {
                const newValues = e.target.checked
                  ? [...activeValues, option.value]
                  : activeValues.filter((v: string) => v !== option.value)
                onFilterChange(group.id, newValues)
              }}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm text-neutral flex-grow">{option.label}</span>
            {option.count && (
              <span className="text-xs text-gray-400">({option.count})</span>
            )}
          </label>
        ))}
      </div>
    )
  }

  const renderRadioOptions = (group: FilterGroup) => {
    const activeValue = activeFilters[group.id]
    
    return (
      <div className="space-y-2">
        {group.options?.map((option) => (
          <label key={option.value} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="radio"
              name={group.id}
              checked={activeValue === option.value}
              onChange={() => onFilterChange(group.id, option.value)}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-sm text-neutral flex-grow">{option.label}</span>
            {option.count && (
              <span className="text-xs text-gray-400">({option.count})</span>
            )}
          </label>
        ))}
      </div>
    )
  }

  const renderRangeOption = (group: FilterGroup) => {
    const activeValue = activeFilters[group.id] || [group.min || 0, group.max || 100]
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="Min"
            value={activeValue[0]}
            onChange={(e) => onFilterChange(group.id, [Number(e.target.value), activeValue[1]])}
            className="w-20 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
          />
          <span className="text-neutral">to</span>
          <input
            type="number"
            placeholder="Max"
            value={activeValue[1]}
            onChange={(e) => onFilterChange(group.id, [activeValue[0], Number(e.target.value)])}
            className="w-20 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
    )
  }

  const renderColorOptions = (group: FilterGroup) => {
    const activeValues = activeFilters[group.id] || []
    
    return (
      <div className="grid grid-cols-6 gap-2">
        {group.options?.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              const newValues = activeValues.includes(option.value)
                ? activeValues.filter((v: string) => v !== option.value)
                : [...activeValues, option.value]
              onFilterChange(group.id, newValues)
            }}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              activeValues.includes(option.value)
                ? 'border-primary scale-110'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: option.value }}
            title={option.label}
          />
        ))}
      </div>
    )
  }

  if (isMobile) {
    return (
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl ${className}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-heading font-semibold text-primary">Filters</h2>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="w-full mb-4 px-4 py-2 text-sm text-primary border border-primary rounded hover:bg-primary hover:text-white transition-colors"
            >
              Clear All Filters
            </button>
          )}
          
          <div className="space-y-0">
            {filterGroups.map(renderFilterGroup)}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-heading font-semibold text-primary flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-secondary transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="p-4">
        <div className="space-y-0">
          {filterGroups.map(renderFilterGroup)}
        </div>
      </div>
    </div>
  )
}
