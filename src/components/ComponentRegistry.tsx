import React from 'react'

// Import essential components
import { HeroSection } from './HeroSection'
import { AnimatedButton } from './AnimatedButton'
import { IconButton } from './IconButton'
import { ProductCard } from './ProductCard'

// Component registry for dynamic loading
export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  HeroSection,
  AnimatedButton,
  IconButton,
  ProductCard,
}

// Type for component names
export type ComponentName = keyof typeof ComponentRegistry
