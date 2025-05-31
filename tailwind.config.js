/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/**/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './templates/**/*.liquid',
    './templates/**/*.json',
    './blocks/**/*.liquid',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['var(--font-heading)', 'system-ui', 'sans-serif'],
        'body': ['var(--font-body)', 'system-ui', 'sans-serif'],
        'display': ['var(--font-display)', 'system-ui', 'sans-serif']
      },
      colors: {
        // VersaCommerce Color Palette
        'primary': '#111111',        // Modern Black
        'secondary': '#2B2B2B',      // Muted Charcoal
        'accent': '#FFD100',         // Vibrant Yellow
        'light-bg': '#F9F9F9',       // Off-White
        'neutral': '#6F6F6F',        // Warm Gray
        'card-bg': '#FFFFFF',        // White
        'border': '#E0E0E0',         // Light Gray

        // Legacy support
        'primary-legacy': 'var(--color-primary)',
        'secondary-legacy': 'var(--color-secondary)',
        'accent-legacy': 'var(--color-accent)'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        // VersaCommerce spacing
        'section-desktop': '80px',
        'section-tablet': '60px',
        'section-mobile': '40px'
      },
      maxWidth: {
        'container': '1440px'
      },
      aspectRatio: {
        'product': '3/4',
        'hero': '16/9',
        'feature': '1/1'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      borderRadius: {
        'cta': '12px'
      }
    }
  },
  plugins: []
}
