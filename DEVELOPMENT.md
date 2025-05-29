# JoyCommerce Shopify Theme - Development Guide

A modern, high-quality Shopify theme built with **Tailwind CSS v3** and **Google Fonts** integration.

## 🚀 Features

- **Tailwind CSS v3** - Modern utility-first CSS framework with reliable content scanning
- **Google Fonts Integration** - Multiple font combinations with optimized loading
- **Direct Tailwind CLI** - Fast, reliable build process with proper class generation
- **Modern Typography** - Enhanced font loading and typography system
- **Component Library** - Pre-built Tailwind components for common UI patterns
- **Shopify Best Practices** - Following official Shopify theme development guidelines

## 📁 Project Structure

```
├── src/styles/           # Source CSS files
│   └── main.css         # Main Tailwind CSS file
├── assets/              # Compiled assets
│   ├── application.css  # Compiled Tailwind CSS
│   └── critical.css     # Critical CSS for above-the-fold content
├── snippets/
│   └── css-variables.liquid  # Dynamic CSS variables and Google Fonts
├── config/
│   └── settings_schema.json  # Theme customization options
├── package.json         # Node.js dependencies
└── tailwind.config.js   # Tailwind CSS v3 configuration
```

## 🛠 Development Setup

### Prerequisites

- Node.js (v16 or higher)
- Shopify CLI
- Bun (preferred) or npm

### Installation

1. **Install dependencies:**
   ```bash
   bun install
   # or
   npm install
   ```

2. **Start development:**
   ```bash
   # Build CSS and watch for changes
   bun run dev

   # In another terminal, start Shopify development server
   shopify theme dev
   ```

3. **Build for production:**
   ```bash
   bun run build
   ```

## 🎨 Typography System

### Font Combinations

The theme includes three pre-configured Google Font combinations:

1. **Inter** (Default) - Modern & Clean
   - Heading: Inter (600-700 weight)
   - Body: Inter (400-500 weight)

2. **Playfair Display + Source Sans Pro** - Elegant & Professional
   - Heading: Playfair Display (serif)
   - Body: Source Sans Pro (sans-serif)

3. **Poppins + Open Sans** - Friendly & Approachable
   - Heading: Poppins (geometric)
   - Body: Open Sans (readable)

### Customization

Font combinations can be changed in the Shopify theme customizer under **Typography** settings.

## 🎯 CSS Architecture

### Tailwind v3 Configuration

The theme uses **Tailwind CSS v3** with JavaScript-based configuration:

- Configuration is done via `tailwind.config.js`
- Content scanning includes all Liquid template files
- Custom properties integrate seamlessly with Shopify's Liquid variables
- Direct Tailwind CLI ensures reliable class generation

### Tailwind Layers

1. **Base Layer** - CSS resets, typography, and global styles
2. **Components Layer** - Reusable component classes
3. **Utilities Layer** - Custom utility classes

### Custom Components

Pre-built components available:

- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline` - Button variants
- `.card`, `.card-body` - Card components
- `.container`, `.container-fluid` - Layout containers
- `.focus-visible-ring` - Accessibility focus styles

### CSS Variables

Dynamic CSS variables are generated in `snippets/css-variables.liquid`:

- `--font-heading` - Heading font family
- `--font-body` - Body font family
- `--font-heading-weight` - Heading font weight
- `--font-body-weight` - Body font weight
- Color and layout variables

## 📝 Development Workflow

### Making Changes

1. **CSS Changes:**
   - Edit `src/styles/main.css`
   - Run `bun run build` to compile
   - Changes will be reflected in `assets/application.css`

2. **Adding New Tailwind Classes:**
   - Use classes in Liquid templates
   - Tailwind will automatically include used classes in the build

3. **Font Changes:**
   - Modify font combinations in `snippets/css-variables.liquid`
   - Update settings in `config/settings_schema.json`

### Build Process

The build process:
1. Processes `src/styles/main.css` through Tailwind CSS v4
2. Generates optimized CSS with only used utilities
3. Outputs to `assets/application.css`
4. Minifies for production

## 🚀 Deployment

### Before Deploying

1. **Build production CSS:**
   ```bash
   bun run build
   ```

2. **Verify files:**
   - Ensure `assets/application.css` exists
   - Check that build files are excluded in `.shopifyignore`

3. **Deploy with Shopify CLI:**
   ```bash
   shopify theme push
   ```

### Files Excluded from Deployment

The following files are excluded via `.shopifyignore`:
- `node_modules/`
- `src/`
- `package.json`
- `vite.config.js`
- `tailwind.config.js`

## 🎨 Customization

### Adding New Components

1. Add component styles to `src/styles/main.css` in the `@layer components` section
2. Use Tailwind's `@apply` directive for utility composition
3. Rebuild CSS with `bun run build`

### Color Customization

Colors can be customized in:
1. **Theme settings** (Shopify customizer) - Primary method
2. **@theme directive** in `src/styles/main.css` - For additional colors
3. **CSS variables** in `snippets/css-variables.liquid` - For dynamic integration

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shopify Theme Development](https://shopify.dev/docs/storefronts/themes)
- [Google Fonts](https://fonts.google.com)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Contributing

1. Follow the existing code style
2. Test changes thoroughly
3. Update documentation as needed
4. Ensure build process works correctly
