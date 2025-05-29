#!/usr/bin/env node

/**
 * Development Setup Script
 * Ensures proper development environment and provides helpful information
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'

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
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function checkRequirements() {
  log('\n🔍 Checking development requirements...', 'cyan')
  
  // Check if Shopify CLI is installed
  try {
    execSync('shopify version', { stdio: 'pipe' })
    log('✅ Shopify CLI is installed', 'green')
  } catch (error) {
    log('❌ Shopify CLI not found. Install with: npm install -g @shopify/cli', 'red')
    process.exit(1)
  }
  
  // Check if bun is available
  try {
    execSync('bun --version', { stdio: 'pipe' })
    log('✅ Bun is available', 'green')
  } catch (error) {
    log('⚠️  Bun not found. Using npm instead...', 'yellow')
  }
  
  // Check if required files exist
  const requiredFiles = [
    'vite.config.js',
    'tailwind.config.js',
    'src/main.tsx',
    'src/styles/main.css'
  ]
  
  requiredFiles.forEach(file => {
    if (existsSync(file)) {
      log(`✅ ${file} exists`, 'green')
    } else {
      log(`❌ ${file} missing`, 'red')
    }
  })
}

function showDevCommands() {
  log('\n🚀 Available Development Commands:', 'cyan')
  log('', 'reset')
  log('  bun run dev          - Start all development watchers', 'bright')
  log('  bun run dev:full     - Start with colored output and labels', 'bright')
  log('  bun run dev:css      - Watch CSS changes only', 'blue')
  log('  bun run dev:js       - Watch JavaScript/React changes only', 'green')
  log('  bun run dev:shopify  - Start Shopify development server only', 'magenta')
  log('', 'reset')
  log('🏗️  Build Commands:', 'cyan')
  log('', 'reset')
  log('  bun run build        - Build for production', 'bright')
  log('  bun run build:css    - Build CSS only', 'blue')
  log('  bun run build:js     - Build JavaScript only', 'green')
  log('', 'reset')
  log('🚀 Deployment Commands:', 'cyan')
  log('', 'reset')
  log('  bun run deploy       - Deploy to Shopify', 'bright')
  log('  bun run pull         - Pull latest theme from Shopify', 'yellow')
  log('  bun run check        - Check theme for issues', 'yellow')
}

function showTips() {
  log('\n💡 Development Tips:', 'cyan')
  log('', 'reset')
  log('• Use "bun run dev:full" for the best development experience', 'yellow')
  log('• Source maps are enabled in development mode for easier debugging', 'yellow')
  log('• CSS and JS changes will trigger automatic rebuilds', 'yellow')
  log('• Shopify live reload will refresh the browser automatically', 'yellow')
  log('• Check the browser console for React component errors', 'yellow')
  log('', 'reset')
  log('🔧 Troubleshooting:', 'cyan')
  log('', 'reset')
  log('• If changes aren\'t reflecting, try restarting the dev server', 'yellow')
  log('• Clear browser cache if styles seem outdated', 'yellow')
  log('• Check that your Shopify store URL is correct in package.json', 'yellow')
  log('• Ensure you\'re logged into Shopify CLI: shopify auth login', 'yellow')
}

function main() {
  log('🎨 JoyCommerce Shopify Theme - Development Setup', 'bright')
  log('================================================', 'bright')
  
  checkRequirements()
  showDevCommands()
  showTips()
  
  log('\n🎉 Ready to start developing!', 'green')
  log('Run "bun run dev" to begin...', 'bright')
  log('')
}

main()
