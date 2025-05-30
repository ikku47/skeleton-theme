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

    if (componentName && ComponentRegistry[componentName]) {
      try {
        const Component = ComponentRegistry[componentName]
        let props = {}

        if (propsData) {
          // Sanitize and parse JSON
          const sanitizedProps = sanitizeJsonString(propsData)
          props = JSON.parse(sanitizedProps)
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
        console.error('Original props data:', propsData)

        if (propsData) {
          const sanitizedProps = sanitizeJsonString(propsData)
          console.error('Sanitized props data:', sanitizedProps)

          // Try to identify the specific issue
          try {
            JSON.parse(sanitizedProps)
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
