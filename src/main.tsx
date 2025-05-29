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
        const props = propsData ? JSON.parse(propsData) : {}

        // Create React root and render component
        const root = ReactDOM.createRoot(element as HTMLElement)
        root.render(React.createElement(Component, props))

        // Mark as initialized
        element.setAttribute('data-react-initialized', 'true')

        // Store root for potential cleanup
        componentRoots.set(element, root)
      } catch (error) {
        console.error(`Error initializing component ${componentName}:`, error)
      }
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
    setTimeout(initializeComponents, 0)
  }
})

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
