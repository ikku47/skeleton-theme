import React from 'react'
import ReactDOM from 'react-dom/client'
import { ComponentRegistry } from './components/ComponentRegistry'

// Extend Window interface for global functions
declare global {
  interface Window {
    openSearchModal: () => void
    openCartDrawer: () => void
  }
}

// Store roots for cleanup
const componentRoots = new Map()

// Helper function to decode HTML entities and sanitize JSON
function decodeHtmlEntities(str: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = str
  return textarea.value
}

// Helper function to sanitize JSON string
function sanitizeJsonString(str: string): string {
  // First decode HTML entities
  let sanitized = decodeHtmlEntities(str)

  // Remove or escape control characters that break JSON parsing
  sanitized = sanitized
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
    .replace(/\n/g, '\\n')  // Escape newlines
    .replace(/\r/g, '\\r')  // Escape carriage returns
    .replace(/\t/g, '\\t')  // Escape tabs
    .trim() // Remove leading/trailing whitespace

  return sanitized
}

// Helper function to fix truncated JSON
function fixTruncatedJson(str: string): string {
  let fixed = str.trim()

  // Handle completely empty or invalid input
  if (!fixed || fixed.length < 2) {
    return '{}'
  }

  // Find the last complete object/array in case of truncation
  let lastCompleteIndex = -1
  let braceCount = 0
  let bracketCount = 0
  let inString = false
  let escaped = false

  for (let i = 0; i < fixed.length; i++) {
    const char = fixed[i]

    if (escaped) {
      escaped = false
      continue
    }

    if (char === '\\') {
      escaped = true
      continue
    }

    if (char === '"') {
      inString = !inString
      continue
    }

    if (inString) {
      continue
    }

    if (char === '{') {
      braceCount++
    } else if (char === '}') {
      braceCount--
      if (braceCount === 0 && bracketCount === 0) {
        lastCompleteIndex = i
      }
    } else if (char === '[') {
      bracketCount++
    } else if (char === ']') {
      bracketCount--
      if (braceCount === 0 && bracketCount === 0) {
        lastCompleteIndex = i
      }
    }
  }

  // If we found a complete structure, use it
  if (lastCompleteIndex > -1) {
    fixed = fixed.substring(0, lastCompleteIndex + 1)
  } else {
    // Try to repair the truncated JSON
    // Check if we're in the middle of a string value
    const lastQuoteIndex = fixed.lastIndexOf('"')
    const secondLastQuoteIndex = fixed.lastIndexOf('"', lastQuoteIndex - 1)

    // Count quotes to see if we're in an unterminated string
    const quoteCount = (fixed.match(/"/g) || []).length
    if (quoteCount % 2 === 1) {
      // We have an unterminated string, close it
      fixed += '"'
    }

    // Remove trailing comma if present
    if (fixed.endsWith(',')) {
      fixed = fixed.slice(0, -1)
    }

    // Count and close unmatched braces/brackets
    const openBraces = (fixed.match(/\{/g) || []).length
    const closeBraces = (fixed.match(/\}/g) || []).length
    const openBrackets = (fixed.match(/\[/g) || []).length
    const closeBrackets = (fixed.match(/\]/g) || []).length

    // Close any open objects
    for (let i = 0; i < openBraces - closeBraces; i++) {
      fixed += '}'
    }

    // Close any open arrays
    for (let i = 0; i < openBrackets - closeBrackets; i++) {
      fixed += ']'
    }
  }

  return fixed
}

// Helper function to validate and provide fallback data
function validateComponentProps(componentName: string, props: any): any {
  // Provide safe fallbacks for common component types
  switch (componentName) {
    case 'VersaProductGrid':
      return {
        title: props?.title || 'Products',
        subtitle: props?.subtitle || '',
        products: Array.isArray(props?.products) ? props.products : [],
        showViewAll: props?.showViewAll || false,
        viewAllUrl: props?.viewAllUrl || '#'
      }

    case 'AccessoriesCarousel':
      return {
        title: props?.title || 'Accessories',
        subtitle: props?.subtitle || '',
        products: Array.isArray(props?.products) ? props.products : []
      }

    case 'EnhancedProductDetails':
      return {
        product: props?.product || {
          id: 0,
          title: 'Product Not Found',
          price: '$0.00',
          description: '',
          variants: [],
          options: [],
          tags: []
        },
        showTrustBadges: props?.showTrustBadges || false,
        trustBadges: Array.isArray(props?.trustBadges) ? props.trustBadges : []
      }

    default:
      return props || {}
  }
}

// Initialize components
function initializeComponents() {
  // Find all elements with data-component attribute
  const componentElements = document.querySelectorAll('[data-component]')

  componentElements.forEach((element) => {
    // Skip if already initialized
    if (element.hasAttribute('data-react-initialized')) {
      return
    }

    const componentName = element.getAttribute('data-component')
    const propsData = element.getAttribute('data-props')
    const propsId = element.getAttribute('data-props-id')

    if (componentName && ComponentRegistry[componentName]) {
      try {
        const Component = ComponentRegistry[componentName]
        let props = {}

        // Try to get props from script tag first (new method), then fallback to attribute (old method)
        let rawPropsData = null

        if (propsId) {
          // New method: get JSON from script tag
          const scriptElement = document.getElementById(propsId)
          if (scriptElement) {
            rawPropsData = scriptElement.textContent || scriptElement.innerHTML
          }
        } else if (propsData) {
          // Old method: get JSON from data attribute
          rawPropsData = propsData
        }

        if (rawPropsData) {
          // Sanitize and fix truncated JSON
          let sanitizedProps = sanitizeJsonString(rawPropsData)
          sanitizedProps = fixTruncatedJson(sanitizedProps)
          const parsedProps = JSON.parse(sanitizedProps)

          // Validate and provide fallbacks for component props
          props = validateComponentProps(componentName, parsedProps)
        }

        // Create React root and render component
        const root = ReactDOM.createRoot(element as HTMLElement)
        root.render(React.createElement(Component, props))

        // Mark as initialized
        element.setAttribute('data-react-initialized', 'true')

        // Store root for potential cleanup
        componentRoots.set(element, root)
      } catch (error) {
        console.error(`Error initializing component ${componentName}:`, error)

        // Get the raw props data for debugging
        let debugPropsData = null
        if (propsId) {
          const scriptElement = document.getElementById(propsId)
          if (scriptElement) {
            debugPropsData = scriptElement.textContent || scriptElement.innerHTML
          }
        } else if (propsData) {
          debugPropsData = propsData
        }

        console.error('Original props data:', debugPropsData)

        if (debugPropsData) {
          let sanitizedProps = sanitizeJsonString(debugPropsData)
          console.error('Sanitized props data:', sanitizedProps)

          // Try to fix truncated JSON
          const fixedProps = fixTruncatedJson(sanitizedProps)
          console.error('Fixed props data:', fixedProps)

          // Try to identify the specific issue
          try {
            JSON.parse(fixedProps)
            console.log('JSON parsing successful after fixing')
          } catch (parseError) {
            console.error('JSON parse error details:', parseError)
          }
        }

        // Add error indicator to the element
        element.innerHTML = `<div style="color: red; padding: 1rem; border: 1px solid red; border-radius: 4px; font-size: 12px;">
          <strong>Error loading ${componentName} component</strong><br>
          ${error instanceof Error ? error.message : 'Unknown error'}<br>
          <small>Check console for details</small>
        </div>`
      }
    } else if (componentName) {
      console.warn(`Component "${componentName}" not found in registry`)
    }
  })
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeComponents)
} else {
  // DOM is already ready
  initializeComponents()
}

// Re-initialize when new content is added (for AJAX/dynamic content)
const observer = new MutationObserver((mutations) => {
  let shouldReinitialize = false

  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element
        if (element.hasAttribute('data-component') || element.querySelector('[data-component]')) {
          shouldReinitialize = true
        }
      }
    })
  })

  if (shouldReinitialize) {
    // Use a longer timeout to ensure DOM is fully updated
    setTimeout(initializeComponents, 100)
  }
})

// Global function to manually reinitialize components
function reinitializeComponents() {
  console.log('Manually reinitializing React components...')
  initializeComponents()
}

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
})

// Global functions for header interactions
window.openSearchModal = function() {
  const event = new CustomEvent('openSearchModal')
  document.dispatchEvent(event)
}

window.openCartDrawer = function() {
  const event = new CustomEvent('openCartDrawer')
  document.dispatchEvent(event)
}

// Make functions available globally (no exports needed for IIFE)
;(window as any).ComponentRegistry = ComponentRegistry
;(window as any).reinitializeComponents = reinitializeComponents
;(window as any).initializeComponents = initializeComponents
