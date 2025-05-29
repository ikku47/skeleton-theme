/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/**/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './templates/**/*.liquid',
    './templates/**/*.json',
    './blocks/**/*.liquid',
    './test-classes.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['var(--font-heading)', 'system-ui', 'sans-serif'],
        'body': ['var(--font-body)', 'system-ui', 'sans-serif'],
        'primary': ['var(--font-primary--family)', 'system-ui', 'sans-serif']
      },
      colors: {
        'background': 'var(--color-background)',
        'foreground': 'var(--color-foreground)',
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',
        'muted': 'var(--color-muted)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'error': 'var(--color-error)'
      },
      spacing: {
        'page-margin': 'var(--page-margin)',
      },
      maxWidth: {
        'page': 'var(--page-width)'
      },
      borderRadius: {
        'input': 'var(--style-border-radius-inputs)',
        'button': 'var(--style-border-radius-buttons)'
      }
    }
  },
  plugins: []
}
