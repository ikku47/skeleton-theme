import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    plugins: [
      react({
        // Fast refresh for better development experience
        fastRefresh: isDev,
        // Include .jsx files
        include: "**/*.{jsx,tsx}"
      })
    ],
    build: {
      outDir: 'assets',
      emptyOutDir: false, // Don't empty the assets directory (CSS files are there)
      lib: {
        entry: resolve(__dirname, 'src/main.tsx'),
        name: 'ReactComponents',
        fileName: () => 'application.js',
        formats: ['iife'] // Immediately Invoked Function Expression for browser compatibility
      },
      rollupOptions: {
        external: [], // Don't externalize anything, bundle everything
        output: {
          globals: {}
        }
      },
      target: 'es2015', // Support older browsers
      minify: isDev ? false : 'terser', // Don't minify in development for faster builds
      sourcemap: isDev ? 'inline' : false, // Source maps for development debugging
      watch: isDev ? {
        // Watch options for better file watching
        buildDelay: 100,
        exclude: ['node_modules/**', 'assets/**']
      } : null
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@styles': resolve(__dirname, 'src/styles')
      }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode || 'production')
    },
    // Development server options (though we're using build mode)
    server: {
      hmr: true,
      watch: {
        usePolling: true,
        interval: 100
      }
    },
    // Optimize dependencies for faster dev builds
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'framer-motion',
        'lucide-react',
        'react-zoom-pan-pinch'
      ],
      exclude: [
        'swiper',
        'react-image-gallery',
        'embla-carousel-react'
      ]
    }
  }
})
