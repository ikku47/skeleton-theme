import React from 'react'

// Import all components here
import { HeroSection } from './HeroSection'
import { AnimatedButton } from './AnimatedButton'
import { IconButton } from './IconButton'
import { ProductCard } from './ProductCard'
import { CartDrawer } from './CartDrawer'
import { SearchModal } from './SearchModal'
import { ImageGallery } from './ImageGallery'

// Component registry for dynamic loading
export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  HeroSection,
  AnimatedButton,
  IconButton,
  ProductCard,
  CartDrawer,
  SearchModal,
  ImageGallery,
}

// Type for component names
export type ComponentName = keyof typeof ComponentRegistry
