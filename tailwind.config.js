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
        'display': ['var(--font-display)', 'Playfair Display', 'Garamond', 'serif'],
        'heading': ['var(--font-heading)', 'Playfair Display', 'Garamond', 'serif'],
        'body': ['var(--font-body)', 'Montserrat', 'Open Sans', 'sans-serif'],
        'accent': ['var(--font-accent)', 'Dancing Script', 'cursive']
      },
      colors: {
        // Sophisticated Color Palette - Warm & Elegant
        // Primary Neutrals
        'white': 'var(--color-white)',
        'off-white': 'var(--color-off-white)',
        'light-gray': 'var(--color-light-gray)',
        'lighter-gray': 'var(--color-lighter-gray)',

        // Warm Accents & Text
        'warm-brown': 'var(--color-warm-brown)',
        'taupe': 'var(--color-taupe)',
        'gold': 'var(--color-gold)',
        'light-gold': 'var(--color-light-gold)',

        // Text & Dark Elements
        'charcoal': 'var(--color-charcoal)',
        'dark': 'var(--color-dark)',
        'medium-gray': 'var(--color-medium-gray)',

        // Accent Colors
        'accent-red': 'var(--color-accent-red)',
        'success': 'var(--color-success)',
        'error': 'var(--color-error)',

        // Legacy support - mapped to new sophisticated colors
        'primary': 'var(--color-charcoal)',
        'secondary': 'var(--color-warm-brown)',
        'accent': 'var(--color-gold)',
        'light-bg': 'var(--color-off-white)',
        'neutral': 'var(--color-medium-gray)',
        'card-bg': 'var(--color-white)',
        'border': 'var(--color-light-gray)'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        // Elegant spacing system - generous whitespace
        'section-desktop': '120px',
        'section-tablet': '80px',
        'section-mobile': '60px',
        'content-gap': '48px',
        'element-gap': '32px',
        'tight-gap': '16px'
      },
      maxWidth: {
        'container': '1440px',
        'container-narrow': '1200px',
        'container-wide': '1600px',
        'content': '800px'
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
        'elegant': '16px',
        'cta': '12px',
        'card': '16px',
        'button': '12px'
      },
      boxShadow: {
        'elegant': '0 12px 32px rgba(106, 85, 74, 0.1)',
        'elegant-hover': '0 16px 40px rgba(106, 85, 74, 0.15)',
        'button': '0 4px 12px rgba(106, 85, 74, 0.2)',
        'button-hover': '0 6px 20px rgba(106, 85, 74, 0.3)'
      },
      letterSpacing: {
        'elegant': '0.02em',
        'display': '0.05em'
      }
    }
  },
  plugins: []
}
