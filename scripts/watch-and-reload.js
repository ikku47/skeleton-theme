#!/usr/bin/env node

/**
 * Enhanced file watcher for Shopify theme development
 * Provides better feedback and handles file changes more efficiently
 */

import { watch } from 'fs'
import { execSync } from 'child_process'

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  const timestamp = new Date().toLocaleTimeString()
  console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`)
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function buildAssets() {
  try {
    log('🔄 Building assets...', 'yellow')
    execSync('bun run build:css && bun run build:js', { stdio: 'pipe' })
    log('✅ Assets built successfully', 'green')
  } catch (error) {
    log('❌ Build failed', 'red')
    console.error(error.message)
  }
}

const debouncedBuild = debounce(buildAssets, 300)

function startWatching() {
  log('👀 Starting file watcher...', 'cyan')
  log('Watching: src/, sections/, templates/, snippets/', 'blue')
  
  // Watch source files
  const srcWatcher = watch('src', { recursive: true }, (eventType, filename) => {
    if (filename && (filename.endsWith('.tsx') || filename.endsWith('.ts') || filename.endsWith('.css'))) {
      log(`📝 ${filename} changed`, 'yellow')
      debouncedBuild()
    }
  })
  
  // Watch Liquid files (for reference, though they don't need building)
  const liquidWatcher = watch('sections', { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.liquid')) {
      log(`🧪 Liquid file changed: ${filename}`, 'magenta')
    }
  })
  
  log('✅ File watcher started', 'green')
  log('Press Ctrl+C to stop', 'blue')
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    log('\n🛑 Stopping file watcher...', 'yellow')
    srcWatcher.close()
    liquidWatcher.close()
    log('👋 Goodbye!', 'green')
    process.exit(0)
  })
}

// Initial build
log('🚀 Starting development watcher', 'bright')
buildAssets()
startWatching()
