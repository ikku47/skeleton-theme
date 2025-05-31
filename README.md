# VersaCommerce - Premium Shopify 2.0 Theme

> A modern, high-performance Shopify theme built with React 18, TypeScript, and Tailwind CSS v3. Featuring a clean editorial design optimized for conversions and exceptional user experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE.md)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

## 🌟 Overview

VersaCommerce is a premium Shopify 2.0 theme that combines modern web technologies with thoughtful design to create exceptional eCommerce experiences. Built with a modular architecture, it offers both performance and flexibility for growing businesses.

### ✨ Key Highlights

- 🎨 **Professional Design System** - Cohesive color palette and typography
- ⚛️ **React 18 + TypeScript** - Modern, type-safe component architecture
- 🎭 **Smooth Animations** - Framer Motion powered micro-interactions
- 📱 **Mobile-First** - Responsive design optimized for all devices
- ⚡ **High Performance** - Optimized builds and lazy loading
- 🛍️ **Shopify 2.0 Native** - Full compatibility with latest Shopify features
- 🔥 **Developer Experience** - Hot reload and modern tooling
- 🧩 **Modular Components** - Reusable, customizable sections

### 🎯 Perfect For

- **Premium Brands** seeking a sophisticated online presence
- **Growing Businesses** needing scalable, maintainable code
- **Developers** wanting modern tools and clean architecture
- **Merchants** requiring high conversion optimization

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **Bun** (recommended) or npm ([Install Bun](https://bun.sh/))
- **Shopify CLI** ([Installation Guide](https://shopify.dev/docs/api/shopify-cli))
- **Git** for version control

### Installation

1. **Clone and setup:**
   ```bash
   git clone <your-repo-url>
   cd skeleton-theme
   bun install
   ```

2. **Authenticate with Shopify:**
   ```bash
   shopify auth login
   ```

3. **Start development:**
   ```bash
   # Full development environment with hot reload
   bun run dev:full

   # Or just asset watchers
   bun run dev
   ```

4. **Open your store:**
   - Your development store will open automatically
   - Changes to CSS and React components reload instantly

### Production Deployment

```bash
# Build optimized assets
bun run build

# Deploy to your Shopify store
bun run deploy
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--color-primary: #111111      /* Modern Black */
--color-secondary: #2B2B2B    /* Muted Charcoal */
--color-accent: #FFD100       /* Vibrant Yellow */

/* Background Colors */
--color-bg-light: #F9F9F9     /* Off-White */
--color-bg-card: #FFFFFF      /* Pure White */

/* Text Colors */
--color-text-primary: #111111  /* Primary Text */
--color-text-secondary: #6F6F6F /* Warm Gray */

/* Border & Dividers */
--color-border: #E0E0E0       /* Light Gray */
```

### Typography Scale
```css
/* Display (Hero Headers) */
font-family: 'Anton', 'Bebas Neue', sans-serif;
font-size: 56px; /* Desktop */

/* Headings (Section Titles) */
font-family: 'Poppins', sans-serif;
font-weight: 600;
font-size: 36px;

/* Body Text */
font-family: 'Inter', 'Poppins', sans-serif;
font-size: 16px;

/* Captions & Labels */
font-family: 'Inter', sans-serif;
font-weight: 500;
font-size: 14px;
```

## 🧩 Component Architecture

### VersaCommerce Components

#### 🏠 Layout & Navigation
- **VersaHeader** - Sticky navigation with mega dropdown, search, and cart
- **VersaFooter** - Multi-column footer with links and newsletter signup
- **VersaPageHeader** - Consistent page headers with breadcrumbs

#### 🎯 Hero & Marketing
- **VersaHeroSection** - 50/50 split layout with compelling CTAs
- **FeatureCallouts** - 3-column feature highlights with icons
- **TestimonialsSection** - Social proof with customer reviews

#### 🛍️ Product Display
- **VersaProductGrid** - 4-column responsive product listings
- **FeaturedProductShowcase** - Spotlight product with info blocks
- **AccessoriesCarousel** - Horizontal scrolling product recommendations
- **VersaProductDetails** - Enhanced product information display
- **VersaProductGallery** - Interactive product image gallery

#### 📧 Conversion & Engagement
- **VersaNewsletter** - Email capture with incentive messaging
- **VersaCartDrawer** - Slide-out cart with quick actions

### Shared Components

#### 🎨 UI Elements
- **AnimatedButton** - Buttons with Framer Motion animations
- **IconButton** - Icon-based action buttons
- **ProductCard** - Reusable product display cards

#### 🛒 eCommerce Features
- **CartManager** - Cart state management
- **ProductActions** - Add to cart, wishlist, quick view
- **ProductVariantSelector** - Size, color, and option selection
- **ProductQuantitySelector** - Quantity input with validation

## 🏗️ Project Structure

```
skeleton-theme/
├── 📁 src/                          # Source Code
│   ├── 📁 components/               # React Components
│   │   ├── 📄 Versa*.tsx           # VersaCommerce components
│   │   ├── 📄 *.tsx                # Shared/utility components
│   │   └── 📄 ComponentRegistry.tsx # Component registration
│   ├── 📁 styles/                   # Stylesheets
│   │   ├── 📄 main.css             # Main Tailwind CSS
│   │   └── 📄 swiper-custom.css    # Component-specific styles
│   └── 📄 main.tsx                 # React entry point
│
├── 📁 assets/                       # Compiled Assets
│   ├── 📄 application.css          # Compiled CSS bundle
│   ├── 📄 application.js           # Compiled JS bundle
│   ├── 📄 critical.css             # Critical path CSS
│   └── 📄 *.svg                    # Icon assets
│
├── 📁 sections/                     # Shopify Sections
│   ├── 📄 versa-*.liquid          # VersaCommerce sections
│   ├── 📄 enhanced-*.liquid       # Enhanced product sections
│   └── 📄 *.liquid                # Standard sections
│
├── 📁 templates/                    # Page Templates
│   ├── 📄 index.json              # Homepage template
│   ├── 📄 product.json            # Product page template
│   └── 📄 *.json                  # Other page templates
│
├── 📁 snippets/                     # Reusable Code
│   ├── 📄 react-component.liquid  # React component renderer
│   ├── 📄 css-variables.liquid    # CSS custom properties
│   └── 📄 *.liquid                # Utility snippets
│
├── 📁 layout/                       # Theme Layouts
│   ├── 📄 theme.liquid            # Main layout
│   └── 📄 password.liquid         # Password page layout
│
├── 📁 config/                       # Theme Configuration
│   ├── 📄 settings_schema.json    # Theme settings schema
│   └── 📄 settings_data.json      # Theme settings data
│
├── 📁 locales/                      # Internationalization
│   └── 📄 en.default.json         # English translations
│
└── 📁 blocks/                       # Shopify Blocks
    ├── 📄 text.liquid              # Text block
    └── 📄 group.liquid             # Group block
```

## ⚛️ Using React Components

### Component Integration

VersaCommerce seamlessly integrates React components with Shopify Liquid templates:

```liquid
<!-- Basic component usage -->
{% assign hero_props = '{"title": "Welcome to VersaCommerce", "subtitle": "Premium Shopify Theme"}' %}
{% render 'react-component', component: 'VersaHeroSection', props: hero_props %}

<!-- Component with complex data -->
{% assign product_data = product | json %}
{% assign gallery_props = '{"product": ' | append: product_data | append: '}' %}
{% render 'react-component', component: 'VersaProductGallery', props: gallery_props %}
```

### Component Props

Each component accepts specific props for customization:

```typescript
// VersaHeroSection Props
interface HeroProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: { text: string; url: string };
  ctaSecondary?: { text: string; url: string };
  backgroundImage?: string;
  videoUrl?: string;
}

// VersaProductGrid Props
interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  showQuickAdd?: boolean;
  showWishlist?: boolean;
}
```

## 🎨 Styling & Customization

### Tailwind CSS Integration

VersaCommerce uses Tailwind CSS v3 with custom configuration:

```html
<!-- Responsive grid layouts -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <!-- Product cards -->
</div>

<!-- VersaCommerce color system -->
<button class="bg-versa-accent text-versa-primary hover:bg-versa-accent/90">
  Shop Now
</button>

<!-- Typography scale -->
<h1 class="font-display text-display text-versa-primary">
  Hero Title
</h1>
```

### Custom CSS Variables

```css
:root {
  /* VersaCommerce Colors */
  --versa-primary: #111111;
  --versa-secondary: #2B2B2B;
  --versa-accent: #FFD100;
  --versa-bg-light: #F9F9F9;
  --versa-text-secondary: #6F6F6F;

  /* Spacing System */
  --section-padding-desktop: 80px;
  --section-padding-tablet: 60px;
  --section-padding-mobile: 40px;
}
```

## 🛠️ Development Workflow

### Available Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `bun run dev` | CSS + JS watchers | Quick asset development |
| `bun run dev:full` | Full development server | Complete theme development |
| `bun run build` | Production build | Pre-deployment optimization |
| `bun run deploy` | Deploy to Shopify | Live store updates |
| `bun run check` | Theme validation | Quality assurance |

### Development Best Practices

1. **Component Development**
   ```bash
   # Start with asset watchers for component work
   bun run dev
   ```

2. **Full Theme Testing**
   ```bash
   # Use full development server for complete testing
   bun run dev:full
   ```

3. **Production Deployment**
   ```bash
   # Always build before deploying
   bun run build && bun run deploy
   ```

## 📚 Documentation

### Additional Resources

- **[Component Documentation](./docs/components/)** - Detailed component guides
- **[Implementation Guide](./docs/implementation/)** - Setup and customization
- **[Design System](./docs/design-system/)** - Colors, typography, and spacing
- **[Performance Guide](./docs/performance/)** - Optimization best practices

## 🤝 Contributing

We welcome contributions to VersaCommerce! Please read our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the [MIT License](./LICENSE.md).

## 🙏 Acknowledgments

- **Shopify** - For the amazing platform and development tools
- **React Team** - For the incredible React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations and interactions

---

<div align="center">

**Built with ❤️ for modern eCommerce**

[🌟 Star this repo](https://github.com/your-username/skeleton-theme) • [🐛 Report Bug](https://github.com/your-username/skeleton-theme/issues) • [💡 Request Feature](https://github.com/your-username/skeleton-theme/issues)

</div>
