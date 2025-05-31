# VersaCommerce - Premium Shopify 2.0 Theme

<div align="center">

![VersaCommerce Logo](https://via.placeholder.com/200x80/111111/FFD100?text=VersaCommerce)

**A modern, high-performance Shopify theme built with React 18, TypeScript, and Tailwind CSS v3**

*Featuring a clean editorial design optimized for conversions and exceptional user experience*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE.md)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Shopify 2.0](https://img.shields.io/badge/Shopify-2.0-96bf48.svg)](https://shopify.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff.svg)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-ff0055.svg)](https://www.framer.com/motion/)

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-documentation) • [🧩 Components](#-component-architecture) • [� Design System](#-design-system) • [🛠️ Development](#️-development-workflow)

</div>

---

## �🌟 Overview

VersaCommerce is a **premium Shopify 2.0 theme** that combines cutting-edge web technologies with thoughtful design to create exceptional eCommerce experiences. Built with a modular architecture, it offers both performance and flexibility for growing businesses.

### ✨ Key Features

| Feature | Description | Technology |
|---------|-------------|------------|
| 🎨 **Professional Design System** | Cohesive color palette, typography, and spacing | Tailwind CSS v3 |
| ⚛️ **Modern React Architecture** | Type-safe component system with hot reload | React 18 + TypeScript |
| 🎭 **Smooth Animations** | Micro-interactions and page transitions | Framer Motion |
| 📱 **Mobile-First Design** | Responsive layouts optimized for all devices | CSS Grid + Flexbox |
| ⚡ **High Performance** | Optimized builds, lazy loading, and code splitting | Vite + Terser |
| 🛍️ **Shopify 2.0 Native** | Full compatibility with latest Shopify features | Shopify CLI |
| 🔥 **Developer Experience** | Hot reload, TypeScript, and modern tooling | Bun + Concurrently |
| 🧩 **Modular Components** | 40+ reusable, customizable sections | Component Registry |
| 🎯 **Conversion Optimized** | A/B tested layouts and UX patterns | Analytics Ready |
| 🌐 **SEO Optimized** | Structured data, meta tags, and performance | Core Web Vitals |

### 🎯 Perfect For

<table>
<tr>
<td width="25%">

**🏢 Premium Brands**
- Sophisticated online presence
- Custom design requirements
- Brand consistency needs
- High-quality user experience

</td>
<td width="25%">

**📈 Growing Businesses**
- Scalable architecture
- Maintainable codebase
- Performance optimization
- Conversion rate focus

</td>
<td width="25%">

**👨‍💻 Developers**
- Modern development tools
- Clean code architecture
- Component-based system
- TypeScript safety

</td>
<td width="25%">

**🛒 Merchants**
- Easy customization
- Mobile optimization
- Fast loading times
- SEO-friendly structure

</td>
</tr>
</table>

## 🚀 Quick Start

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Purpose | Installation |
|------|---------|---------|--------------|
| **Node.js** | v18+ | JavaScript runtime | [Download](https://nodejs.org/) |
| **Bun** | Latest | Package manager (recommended) | [Install Bun](https://bun.sh/) |
| **Shopify CLI** | Latest | Theme development | [Installation Guide](https://shopify.dev/docs/api/shopify-cli) |
| **Git** | Latest | Version control | [Download](https://git-scm.com/) |

> **💡 Tip:** You can use `npm` or `yarn` instead of Bun, but Bun provides faster installation and better performance.

### ⚡ Installation

#### 1. Clone and Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd skeleton-theme

# Install dependencies (choose one)
bun install          # Recommended
# npm install        # Alternative
# yarn install       # Alternative
```

#### 2. Shopify Authentication
```bash
# Login to your Shopify account
shopify auth login

# Connect to your development store
shopify theme dev --store=your-store-name
```

#### 3. Start Development

**Option A: Full Development Environment** (Recommended)
```bash
# Starts CSS watcher, JS watcher, and Shopify dev server
bun run dev:full
```

**Option B: Asset Watchers Only**
```bash
# Just CSS and JS compilation
bun run dev
```

**Option C: Individual Processes**
```bash
# CSS only
bun run dev:css

# JavaScript only
bun run dev:js

# Shopify dev server only
bun run dev:shopify
```

#### 4. Access Your Store
- 🌐 **Development URL**: Automatically opens in browser
- 🔄 **Hot Reload**: CSS and React components update instantly
- 📱 **Mobile Testing**: Use ngrok URL for mobile device testing

### 🚀 Production Deployment

#### Build and Deploy
```bash
# Build optimized assets
bun run build

# Deploy to your Shopify store
bun run deploy

# Or combine both steps
bun run build && bun run deploy
```

#### Pre-deployment Checklist
- [ ] Test all components and pages
- [ ] Verify mobile responsiveness
- [ ] Check performance metrics
- [ ] Validate theme with Shopify CLI
- [ ] Backup current live theme

```bash
# Validate theme before deployment
bun run check
```

## 🎨 Design System

VersaCommerce features a carefully crafted design system that ensures consistency and visual harmony across all components.

### 🎨 Color Palette

<table>
<tr>
<td width="50%">

**Primary Colors**
```css
--primary: #111111      /* Modern Black */
--secondary: #2B2B2B    /* Muted Charcoal */
--accent: #FFD100       /* Vibrant Yellow */
```

**Background Colors**
```css
--light-bg: #F9F9F9     /* Off-White */
--card-bg: #FFFFFF      /* Pure White */
--neutral: #6F6F6F      /* Warm Gray */
```

**Utility Colors**
```css
--border: #E0E0E0       /* Light Gray */
--success: #10B981      /* Green */
--warning: #F59E0B      /* Orange */
--error: #EF4444        /* Red */
```

</td>
<td width="50%">

**Color Usage Guidelines**

- **Primary (#111111)**: Headers, navigation, primary text
- **Secondary (#2B2B2B)**: Subheadings, secondary elements
- **Accent (#FFD100)**: CTAs, highlights, interactive elements
- **Light BG (#F9F9F9)**: Section backgrounds, cards
- **Neutral (#6F6F6F)**: Body text, descriptions
- **Border (#E0E0E0)**: Dividers, card borders

**Accessibility**
- All color combinations meet WCAG AA standards
- Contrast ratios tested for readability
- Color-blind friendly palette

</td>
</tr>
</table>

### ✍️ Typography System

<table>
<tr>
<td width="50%">

**Font Families**
```css
/* Display Typography */
font-display: 'Anton', 'Bebas Neue', sans-serif;

/* Heading Typography */
font-heading: 'Poppins', sans-serif;

/* Body Typography */
font-body: 'Inter', 'Poppins', sans-serif;
```

**Font Scale**
```css
/* Display (Hero Headers) */
text-display: 56px / 64px;    /* Desktop */
text-display-mobile: 36px / 44px; /* Mobile */

/* Headings */
text-4xl: 36px / 44px;        /* H1 */
text-3xl: 30px / 38px;        /* H2 */
text-2xl: 24px / 32px;        /* H3 */
text-xl: 20px / 28px;         /* H4 */

/* Body Text */
text-base: 16px / 24px;       /* Body */
text-sm: 14px / 20px;         /* Small */
text-xs: 12px / 16px;         /* Captions */
```

</td>
<td width="50%">

**Typography Usage**

- **Display**: Hero sections, major headlines
- **Heading**: Section titles, card headers
- **Body**: Paragraphs, descriptions, content
- **Small**: Captions, labels, metadata

**Font Weights**
- **Light (300)**: Large display text
- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Labels, small headings
- **Semibold (600)**: Section headings
- **Bold (700)**: Important headings
- **Black (900)**: Display text, hero titles

**Responsive Typography**
- Fluid scaling between mobile and desktop
- Optimized line heights for readability
- Consistent vertical rhythm

</td>
</tr>
</table>

### 📐 Spacing System

```css
/* VersaCommerce Spacing Scale */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */

/* Section Spacing */
--section-desktop: 80px;
--section-tablet: 60px;
--section-mobile: 40px;
```

## 🧩 Component Architecture

VersaCommerce features a modular component system with **40+ reusable components** organized into three main categories:

### 🎨 VersaCommerce Components (`/src/components/versa/`)

The core VersaCommerce component library featuring modern, conversion-optimized designs:

<table>
<tr>
<td width="50%">

#### 🏠 **Layout & Navigation**
- **`VersaHeader`** - Sticky navigation with mega dropdown, search, and cart
- **`VersaFooter`** - Multi-column footer with links and newsletter signup
- **`VersaPageHeader`** - Consistent page headers with breadcrumbs

#### 🎯 **Hero & Marketing**
- **`VersaHeroSection`** - 50/50 split layout with compelling CTAs
- **`VersaNewsletter`** - Email capture with incentive messaging

#### 🛍️ **Product Display**
- **`VersaProductGrid`** - 4-column responsive product listings
- **`VersaProductGallery`** - Interactive product image gallery with zoom
- **`VersaProductDetails`** - Enhanced product information display
- **`VersaCollectionGrid`** - Collection showcase with filtering

#### 🛒 **Shopping Experience**
- **`VersaCartDrawer`** - Slide-out cart with quick actions
- **`VersaCartItem`** - Individual cart item with quantity controls
- **`VersaCartSummary`** - Order summary with totals and discounts
- **`VersaEmptyCart`** - Empty state with call-to-action

</td>
<td width="50%">

#### 🔍 **Search & Discovery**
- **`VersaSearchForm`** - Advanced search with filters
- **`VersaSearchResults`** - Search results with sorting options

#### 📝 **Content & Blog**
- **`VersaBlogGrid`** - Blog post listings with excerpts
- **`VersaPageHeader`** - Consistent page headers

#### � **Analytics Ready**
All VersaCommerce components include:
- **Event tracking** for Google Analytics
- **Conversion optimization** features
- **A/B testing** compatibility
- **Performance monitoring** hooks

#### 🎨 **Design Features**
- **Consistent styling** across all components
- **Responsive design** for all screen sizes
- **Accessibility compliance** (WCAG AA)
- **Animation support** with Framer Motion
- **Dark mode ready** (coming soon)

#### ⚡ **Performance**
- **Lazy loading** for images and content
- **Code splitting** for optimal bundle size
- **Optimized rendering** with React 18
- **Minimal re-renders** with proper state management

</td>
</tr>
</table>

### 🔧 Shared Components (`/src/components/shared/`)

Reusable utility components used across the theme:

<table>
<tr>
<td width="33%">

#### 🎨 **UI Elements**
- **`AnimatedButton`** - Buttons with Framer Motion animations
- **`IconButton`** - Icon-based action buttons
- **`ProductCard`** - Reusable product display cards
- **`CollectionCard`** - Collection showcase cards
- **`ContentCard`** - Generic content containers

</td>
<td width="33%">

#### 🛒 **eCommerce Features**
- **`CartManager`** - Global cart state management
- **`CartNotification`** - Add to cart notifications
- **`AddToCartButton`** - Smart add to cart functionality

</td>
<td width="33%">

#### 🎯 **Marketing Components**
- **`FeatureCallouts`** - 3-column feature highlights
- **`FeaturedProductShowcase`** - Spotlight products
- **`AccessoriesCarousel`** - Product recommendations
- **`TestimonialsSection`** - Customer reviews

</td>
</tr>
</table>

### 🔄 Legacy Components (`/src/components/legacy/`)

Backward-compatible components for existing implementations:

- **Enhanced Product Components** - `EnhancedProductDetails`, `EnhancedProductGallery`
- **Classic Product Features** - `ProductActions`, `ProductVariantSelector`, `ProductQuantitySelector`
- **Legacy Layouts** - `HeroSection`, `ProductImageGallery`, `RelatedProducts`

## 🏗️ Project Structure

VersaCommerce follows a clean, organized structure that separates concerns and promotes maintainability:

```
skeleton-theme/
├── 📁 src/                          # 🎯 Source Code
│   ├── 📁 components/               # ⚛️ React Components
│   │   ├── � versa/               # 🎨 VersaCommerce components
│   │   │   ├── 📄 VersaHeader.tsx
│   │   │   ├── 📄 VersaHeroSection.tsx
│   │   │   ├── 📄 VersaProductGrid.tsx
│   │   │   └── 📄 ...
│   │   ├── 📁 shared/              # 🔧 Shared utilities
│   │   │   ├── 📄 ComponentRegistry.tsx
│   │   │   ├── 📄 AnimatedButton.tsx
│   │   │   └── 📄 ...
│   │   └── 📁 legacy/              # 🔄 Legacy components
│   │       ├── 📄 EnhancedProductDetails.tsx
│   │       └── 📄 ...
│   ├── 📁 styles/                   # 🎨 Stylesheets
│   │   ├── 📄 main.css             # Main Tailwind CSS
│   │   └── 📄 swiper-custom.css    # Component-specific styles
│   └── 📄 main.tsx                 # 🚀 React entry point
│
├── 📁 assets/                       # 📦 Compiled Assets
│   ├── 📄 application.css          # Compiled CSS bundle
│   ├── 📄 application.js           # Compiled JS bundle
│   ├── 📄 critical.css             # Critical path CSS
│   └── 📄 *.svg                    # Icon assets
│
├── 📁 sections/                     # 🧩 Shopify Sections
│   ├── 📄 versa-*.liquid          # VersaCommerce sections
│   ├── 📄 enhanced-*.liquid       # Enhanced product sections
│   ├── 📄 header.liquid           # Theme header
│   ├── 📄 footer.liquid           # Theme footer
│   └── 📄 *.liquid                # Standard sections
│
├── 📁 templates/                    # 📄 Page Templates
│   ├── 📄 index.json              # Homepage template
│   ├── 📄 product.json            # Product page template
│   ├── 📄 collection.json         # Collection page template
│   ├── 📄 cart.json               # Cart page template
│   └── 📄 *.json                  # Other page templates
│
├── 📁 snippets/                     # 🔧 Reusable Code
│   ├── 📄 react-component.liquid  # React component renderer
│   ├── 📄 css-variables.liquid    # CSS custom properties
│   ├── 📄 meta-tags.liquid        # SEO meta tags
│   └── 📄 *.liquid                # Utility snippets
│
├── 📁 layout/                       # 🏗️ Theme Layouts
│   ├── 📄 theme.liquid            # Main layout
│   └── 📄 password.liquid         # Password page layout
│
├── 📁 config/                       # ⚙️ Theme Configuration
│   ├── 📄 settings_schema.json    # Theme settings schema
│   └── 📄 settings_data.json      # Theme settings data
│
├── 📁 locales/                      # 🌐 Internationalization
│   ├── 📄 en.default.json         # English translations
│   └── 📄 en.default.schema.json  # Translation schema
│
├── 📁 blocks/                       # 🧱 Shopify Blocks
│   ├── 📄 text.liquid              # Text block
│   └── 📄 group.liquid             # Group block
│
├── 📁 docs/                         # 📚 Documentation
│   ├── 📁 implementation/          # Technical guides
│   ├── 📁 components/              # Component docs
│   ├── 📁 design-system/           # Design guidelines
│   └── 📁 guides/                  # Development guides
│
└── 📁 Configuration Files           # ⚙️ Build & Config
    ├── 📄 package.json             # Dependencies & scripts
    ├── 📄 vite.config.js           # Vite configuration
    ├── 📄 tailwind.config.js       # Tailwind CSS config
    ├── 📄 tsconfig.json            # TypeScript config
    └── 📄 bun.lock                 # Lock file
```

### 📂 Directory Breakdown

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| **`src/`** | Source code for React components and styles | `main.tsx`, component files |
| **`assets/`** | Compiled CSS and JavaScript bundles | `application.css`, `application.js` |
| **`sections/`** | Shopify section files for theme customization | `versa-*.liquid`, page sections |
| **`templates/`** | JSON templates defining page layouts | `index.json`, `product.json` |
| **`snippets/`** | Reusable Liquid code snippets | `react-component.liquid` |
| **`layout/`** | Main theme layout files | `theme.liquid` |
| **`config/`** | Theme settings and configuration | `settings_schema.json` |
| **`docs/`** | Comprehensive project documentation | Implementation guides |

## ⚛️ Using React Components

VersaCommerce seamlessly integrates React components with Shopify Liquid templates using a powerful component system.

### 🔧 Component Integration

#### Basic Usage
```liquid
<!-- Simple component with inline props -->
{% assign hero_props = '{"title": "Welcome to VersaCommerce", "subtitle": "Premium Shopify Theme"}' %}
{% render 'react-component', component: 'VersaHeroSection', props: hero_props %}
```

#### Advanced Usage with Script Tags (Recommended)
```liquid
<!-- Component with complex data using script tag -->
<script id="product-gallery-props" type="application/json">
{
  "product": {{ product | json }},
  "showZoom": true,
  "showThumbnails": true,
  "autoplay": false
}
</script>
<div data-component="VersaProductGallery" data-props-id="product-gallery-props"></div>
```

#### Dynamic Data Integration
```liquid
<!-- Product grid with collection data -->
{% assign grid_props = '{"title": "' | append: collection.title | append: '", "products": ' | append: collection.products | json | append: '}' %}
{% render 'react-component', component: 'VersaProductGrid', props: grid_props %}
```

### 📝 Component Props Reference

<table>
<tr>
<td width="50%">

#### **VersaHeroSection**
```typescript
interface HeroProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: {
    text: string;
    url: string;
  };
  ctaSecondary?: {
    text: string;
    url: string;
  };
  backgroundImage?: string;
  videoUrl?: string;
  alignment?: 'left' | 'center' | 'right';
}
```

#### **VersaProductGrid**
```typescript
interface ProductGridProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  columns?: 2 | 3 | 4;
  showQuickAdd?: boolean;
  showWishlist?: boolean;
  showViewAll?: boolean;
  viewAllUrl?: string;
}
```

</td>
<td width="50%">

#### **VersaProductGallery**
```typescript
interface GalleryProps {
  product: Product;
  showZoom?: boolean;
  showThumbnails?: boolean;
  autoplay?: boolean;
  showIndicators?: boolean;
  variant?: ProductVariant;
}
```

#### **VersaCartDrawer**
```typescript
interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  showShippingCalculator?: boolean;
  showRecommendations?: boolean;
  freeShippingThreshold?: number;
}
```

#### **VersaHeader**
```typescript
interface HeaderProps {
  logo?: string;
  logoText?: string;
  menuItems: MenuItem[];
  cartCount?: number;
  wishlistCount?: number;
  showSearch?: boolean;
}
```

</td>
</tr>
</table>

### 🎯 Component Usage Examples

#### Hero Section
```liquid
<!-- sections/versa-hero.liquid -->
{% assign hero_data = '{"title": "' | append: section.settings.title | append: '", "subtitle": "' | append: section.settings.subtitle | append: '", "ctaPrimary": {"text": "' | append: section.settings.cta_text | append: '", "url": "' | append: section.settings.cta_url | append: '"}}' %}
{% render 'react-component', component: 'VersaHeroSection', props: hero_data %}
```

#### Product Grid
```liquid
<!-- sections/versa-product-grid.liquid -->
<script id="product-grid-{{ section.id }}" type="application/json">
{
  "title": {{ section.settings.title | json }},
  "products": {{ collections[section.settings.collection].products | json }},
  "columns": {{ section.settings.columns | default: 4 }},
  "showQuickAdd": {{ section.settings.show_quick_add | default: true }}
}
</script>
<div data-component="VersaProductGrid" data-props-id="product-grid-{{ section.id }}"></div>
```

## 🎨 Styling & Customization

VersaCommerce provides multiple layers of customization to match your brand perfectly.

### 🎯 Tailwind CSS Integration

VersaCommerce uses **Tailwind CSS v3** with a custom configuration optimized for eCommerce:

<table>
<tr>
<td width="50%">

#### **Responsive Design**
```html
<!-- Mobile-first responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
  <!-- Product cards -->
</div>

<!-- Responsive typography -->
<h1 class="text-2xl md:text-4xl lg:text-display font-display">
  Hero Title
</h1>

<!-- Responsive spacing -->
<section class="py-section-mobile md:py-section-tablet lg:py-section-desktop">
  <!-- Content -->
</section>
```

#### **VersaCommerce Color System**
```html
<!-- Primary colors -->
<button class="bg-primary text-white hover:bg-secondary">
  Primary Button
</button>

<!-- Accent colors -->
<button class="bg-accent text-primary hover:bg-accent/90">
  Accent Button
</button>

<!-- Background colors -->
<div class="bg-light-bg border border-border rounded-lg">
  <!-- Card content -->
</div>
```

</td>
<td width="50%">

#### **Component Styling**
```html
<!-- Animated buttons -->
<button class="btn btn-primary animate-fade-in">
  Add to Cart
</button>

<!-- Product cards -->
<div class="product-card hover:scale-105 transition-transform">
  <!-- Product content -->
</div>

<!-- Custom animations -->
<div class="animate-slide-up delay-100">
  <!-- Animated content -->
</div>
```

#### **Utility Classes**
```html
<!-- Spacing utilities -->
<div class="container mx-auto px-4 lg:px-8">
  <!-- Content -->
</div>

<!-- Typography utilities -->
<p class="font-body text-base text-neutral leading-relaxed">
  Body text with proper spacing
</p>

<!-- Interactive states -->
<a class="text-primary hover:text-accent transition-colors duration-200">
  Link with smooth transition
</a>
```

</td>
</tr>
</table>

### 🎨 Custom CSS Variables

VersaCommerce uses CSS custom properties for easy theme customization:

```css
:root {
  /* Brand Colors */
  --primary: #111111;           /* Modern Black */
  --secondary: #2B2B2B;         /* Muted Charcoal */
  --accent: #FFD100;            /* Vibrant Yellow */

  /* Background Colors */
  --light-bg: #F9F9F9;          /* Off-White */
  --card-bg: #FFFFFF;           /* Pure White */
  --neutral: #6F6F6F;           /* Warm Gray */
  --border: #E0E0E0;            /* Light Gray */

  /* Typography */
  --font-display: 'Anton', 'Bebas Neue', sans-serif;
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', 'Poppins', sans-serif;

  /* Spacing System */
  --section-desktop: 80px;
  --section-tablet: 60px;
  --section-mobile: 40px;
  --container-max-width: 1440px;

  /* Animation Timing */
  --transition-fast: 0.15s;
  --transition-normal: 0.3s;
  --transition-slow: 0.5s;
}
```

### 🛠️ Customization Options

#### **1. Theme Settings (Shopify Admin)**
- Color palette customization
- Typography settings
- Spacing adjustments
- Component visibility toggles

#### **2. CSS Variable Overrides**
```css
/* Custom brand colors */
:root {
  --primary: #your-brand-color;
  --accent: #your-accent-color;
  --font-heading: 'Your-Custom-Font', sans-serif;
}
```

#### **3. Tailwind Configuration**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-primary': '#your-color',
        'brand-secondary': '#your-color',
      },
      fontFamily: {
        'custom': ['Your-Font', 'sans-serif'],
      }
    }
  }
}
```

## 🛠️ Development Workflow

VersaCommerce provides a comprehensive development environment with modern tooling and best practices.

### 📋 Available Commands

| Command | Description | What it does | When to use |
|---------|-------------|--------------|-------------|
| **`bun run dev`** | Asset watchers only | CSS + JS compilation with watch mode | Quick component development |
| **`bun run dev:full`** | Full development environment | CSS + JS + Shopify dev server | Complete theme development |
| **`bun run dev:css`** | CSS watcher only | Tailwind CSS compilation | Styling-focused work |
| **`bun run dev:js`** | JavaScript watcher only | React/TypeScript compilation | Component development |
| **`bun run dev:shopify`** | Shopify dev server only | Theme preview with hot reload | Template testing |
| **`bun run build`** | Production build | Optimized CSS + JS bundles | Pre-deployment |
| **`bun run deploy`** | Deploy to Shopify | Push theme to live store | Production deployment |
| **`bun run check`** | Theme validation | Shopify theme linting | Quality assurance |
| **`bun run preview`** | Preview on specific store | Test on staging environment | Pre-launch testing |

### 🔄 Development Best Practices

<table>
<tr>
<td width="50%">

#### **🚀 Getting Started**
```bash
# 1. Start full development environment
bun run dev:full

# 2. Open your browser to the development URL
# 3. Make changes to components or styles
# 4. See changes instantly with hot reload
```

#### **🎨 Component Development**
```bash
# For React component work
bun run dev

# Edit components in src/components/
# Changes auto-compile and reload
```

#### **💅 Styling Work**
```bash
# For CSS-only changes
bun run dev:css

# Edit src/styles/main.css
# Tailwind classes compile instantly
```

#### **🧪 Testing Changes**
```bash
# Validate theme before deployment
bun run check

# Test on specific store
bun run preview
```

</td>
<td width="50%">

#### **🚀 Production Deployment**
```bash
# 1. Build optimized assets
bun run build

# 2. Validate theme
bun run check

# 3. Deploy to live store
bun run deploy

# Or combine all steps
bun run build && bun run check && bun run deploy
```

#### **🔧 Troubleshooting**
```bash
# Clear node_modules and reinstall
rm -rf node_modules bun.lock
bun install

# Restart development server
# Stop current process (Ctrl+C)
bun run dev:full

# Check for TypeScript errors
bun run build
```

#### **📱 Mobile Testing**
- Use ngrok URL provided by Shopify CLI
- Test on real devices for touch interactions
- Verify responsive breakpoints
- Check performance on slower connections

</td>
</tr>
</table>

### ⚡ Performance Optimization

#### **Development Mode**
- **Hot Module Replacement** for instant updates
- **Source maps** for easier debugging
- **Fast refresh** for React components
- **Incremental compilation** for faster builds

#### **Production Mode**
- **Code splitting** for optimal loading
- **Tree shaking** to remove unused code
- **Minification** for smaller bundle sizes
- **Asset optimization** for faster delivery

### 🔍 Debugging Tips

#### **React Components**
```bash
# Check browser console for component errors
# Use React Developer Tools extension
# Inspect component props and state
```

#### **CSS Issues**
```bash
# Check Tailwind compilation
bun run dev:css

# Inspect generated CSS in assets/application.css
# Use browser dev tools for style debugging
```

#### **Shopify Integration**
```bash
# Validate Liquid syntax
bun run check

# Check Shopify CLI logs
# Inspect network requests in browser
```

## 📚 Documentation

VersaCommerce includes comprehensive documentation to help you get the most out of the theme.

### 📖 Documentation Structure

| Section | Description | Location |
|---------|-------------|----------|
| **[Component Documentation](./docs/components/)** | Detailed guides for each component | `docs/components/` |
| **[Implementation Guide](./docs/implementation/)** | Setup and customization instructions | `docs/implementation/` |
| **[Design System](./docs/design-system/)** | Colors, typography, and spacing guidelines | `docs/design-system/` |
| **[Development Guides](./docs/guides/)** | Best practices and troubleshooting | `docs/guides/` |

### 🔗 Quick Links

- **[Project Structure Guide](./docs/guides/PROJECT_STRUCTURE.md)** - Detailed file organization
- **[Component Analysis](./docs/components/PROJECT_COMPONENT_ANALYSIS.md)** - Component architecture overview
- **[VersaCommerce Implementation](./docs/implementation/VERSACOMMERCE_IMPLEMENTATION.md)** - Complete implementation guide
- **[Design System Consistency](./docs/design-system/DESIGN_SYSTEM_CONSISTENCY_SUMMARY.md)** - Design principles

## 🚀 Performance & SEO

### ⚡ Performance Features

- **Core Web Vitals Optimized** - Excellent Lighthouse scores
- **Lazy Loading** - Images and components load on demand
- **Code Splitting** - Optimal JavaScript bundle sizes
- **Critical CSS** - Above-the-fold styles inlined
- **Image Optimization** - WebP support with fallbacks
- **Preloading** - Critical resources loaded early

### 🔍 SEO Features

- **Structured Data** - Rich snippets for products and reviews
- **Meta Tags** - Comprehensive social media and search optimization
- **Sitemap Generation** - Automatic XML sitemap creation
- **Schema Markup** - Product, organization, and breadcrumb schemas
- **Open Graph** - Social media sharing optimization
- **Accessibility** - WCAG AA compliance

## 🛠️ Troubleshooting

### Common Issues

<details>
<summary><strong>🔧 Component not rendering</strong></summary>

1. Check browser console for JavaScript errors
2. Verify component is registered in `ComponentRegistry.tsx`
3. Validate JSON props syntax
4. Ensure React component is properly exported

```bash
# Restart development server
bun run dev:full
```
</details>

<details>
<summary><strong>🎨 Styles not applying</strong></summary>

1. Check Tailwind CSS compilation
2. Verify class names are correct
3. Check for CSS conflicts
4. Ensure Tailwind config includes your files

```bash
# Rebuild CSS
bun run build:css
```
</details>

<details>
<summary><strong>🚀 Slow build times</strong></summary>

1. Clear node_modules and reinstall dependencies
2. Check for large files in src directory
3. Optimize images before importing
4. Use development mode for faster iteration

```bash
# Clean install
rm -rf node_modules bun.lock
bun install
```
</details>

## 🤝 Contributing

We welcome contributions to VersaCommerce! Here's how you can help:

### 🔄 Development Process

1. **Fork the repository** and clone your fork
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Install dependencies** (`bun install`)
4. **Start development server** (`bun run dev:full`)
5. **Make your changes** and test thoroughly
6. **Commit your changes** (`git commit -m 'Add amazing feature'`)
7. **Push to your branch** (`git push origin feature/amazing-feature`)
8. **Open a Pull Request** with a clear description

### 📋 Contribution Guidelines

- **Code Style**: Follow existing TypeScript and React patterns
- **Testing**: Test your changes across different screen sizes
- **Documentation**: Update relevant documentation
- **Performance**: Ensure changes don't negatively impact performance
- **Accessibility**: Maintain WCAG AA compliance

### 🐛 Bug Reports

When reporting bugs, please include:
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser and device information
- Screenshots or screen recordings
- Console error messages

## 📄 License

This project is licensed under the **[MIT License](./LICENSE.md)**.

You are free to use, modify, and distribute this theme for personal and commercial projects.

## 🙏 Acknowledgments

VersaCommerce is built on the shoulders of giants. Special thanks to:

- **[Shopify](https://shopify.dev/)** - For the amazing platform and development tools
- **[React Team](https://reactjs.org/)** - For the incredible React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - For smooth animations and interactions
- **[Vite](https://vitejs.dev/)** - For the lightning-fast build tool
- **[TypeScript](https://www.typescriptlang.org/)** - For type safety and developer experience
- **[Lucide React](https://lucide.dev/)** - For beautiful, consistent icons

---

<div align="center">

## 🌟 Built with ❤️ for Modern eCommerce

**Ready to create something amazing?**

[🚀 Get Started](#-quick-start) • [📖 Read Docs](#-documentation) • [🎨 View Components](#-component-architecture)

---

[🌟 Star this repo](https://github.com/your-username/skeleton-theme) • [🐛 Report Bug](https://github.com/your-username/skeleton-theme/issues) • [💡 Request Feature](https://github.com/your-username/skeleton-theme/issues) • [💬 Discussions](https://github.com/your-username/skeleton-theme/discussions)

**VersaCommerce v2.0** - The future of Shopify theme development

</div>
