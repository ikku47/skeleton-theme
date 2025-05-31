# VersaCommerce - Shopify 2.0 Theme

A premium, modular Shopify 2.0 theme built with React, Tailwind CSS v3, and modern web technologies. VersaCommerce features a clean, editorial design optimized for high engagement and conversions.

## 🎨 Design System

### Color Palette
- **Primary Accent**: Modern Black (#111111)
- **Secondary Accent**: Muted Charcoal (#2B2B2B)
- **CTA/Highlight**: Vibrant Yellow (#FFD100)
- **Light Background**: Off-White (#F9F9F9)
- **Neutral Text**: Warm Gray (#6F6F6F)
- **Card Background**: White (#FFFFFF)
- **Border**: Light Gray (#E0E0E0)

### Typography
- **Display Font**: Anton / Bebas Neue (Hero headers, 56px)
- **Heading Font**: Poppins SemiBold (Section titles, 36px)
- **Body Font**: Inter / Poppins Regular (Content, 16px)
- **Caption Font**: Inter Medium (Labels, 14px)

## ✨ Features

- 🎨 **VersaCommerce Design System** - Modern color palette and typography
- ⚛️ **React 18** - Interactive components with TypeScript support
- 🎭 **Framer Motion** - Smooth animations and micro-interactions
- 🎯 **Lucide Icons** - Beautiful, consistent iconography
- 🔥 **Hot Reload** - Instant development feedback for CSS and React changes
- 📱 **Mobile Optimized** - Responsive design with mobile-first approach
- 🛍️ **Shopify 2.0 Compatible** - Native Liquid templating with React components
- ⚡ **Performance Optimized** - Fast loading with optimized builds
- 🧩 **Modular Components** - Reusable VersaCommerce components

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Bun** (recommended) or npm
- **Shopify CLI** - [Install here](https://shopify.dev/docs/api/shopify-cli)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd shopify-react-tailwind-boilerplate
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Configure Shopify CLI:**
   ```bash
   shopify auth login
   ```

### Development

Start the development server with hot reload:

```bash
# Start asset watchers (CSS + JS)
bun run dev

# Start with Shopify development server
bun run dev:full
```

### Build & Deploy

```bash
# Build for production
bun run build

# Deploy to Shopify
bun run deploy
```

## 🧩 VersaCommerce Components

### Core Components
- **VersaHeader** - Sticky header with mega dropdown navigation
- **VersaHeroSection** - 50/50 split hero with left text, right image
- **FeatureCallouts** - 3-column responsive feature cards
- **FeaturedProductShowcase** - Large central product with 4 info blocks
- **VersaProductGrid** - 4-column responsive product grid with hover effects
- **AccessoriesCarousel** - Horizontal scrolling product carousel
- **TestimonialsSection** - Customer testimonials with carousel/grid layouts
- **VersaNewsletter** - Email signup with incentive messaging

### Legacy Components (Maintained for Compatibility)
- **HeroSection** - Original hero section
- **ProductCard** - Standard product cards
- **AnimatedButton** - Animated buttons
- **IconButton** - Icon buttons
- **Product Detail Components** - Gallery, info, variants, etc.

## 🏗️ Project Structure

```bash
.
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── Versa*.tsx     # VersaCommerce components
│   │   ├── *.tsx          # Legacy components
│   │   └── ComponentRegistry.tsx # Component registry
│   ├── styles/            # CSS source files
│   │   └── main.css       # Main Tailwind CSS file
│   └── main.tsx           # React entry point
├── assets/                # Compiled assets
│   ├── application.css    # Compiled Tailwind CSS
│   └── application.js     # Compiled React bundle
├── sections/              # Shopify sections
│   ├── versa-*.liquid     # VersaCommerce sections
│   └── *.liquid           # Legacy sections
├── templates/             # Shopify templates
│   ├── index-versa.json   # VersaCommerce homepage
│   └── *.json             # Other templates
├── snippets/              # Reusable Liquid code
└── config/                # Theme settings
```

## ⚛️ React Components

### Available Components

- **HeroSection** - Simple hero section with background and CTA
- **ProductCard** - Basic product cards with hover effects
- **AnimatedButton** - Buttons with Framer Motion animations
- **IconButton** - Icon buttons with Lucide icons

### Using Components in Liquid

```liquid
{% assign hero_props = '{"title": "Your Title", "description": "Your description"}' %}
{% render 'react-component', component: 'HeroSection', props: hero_props %}
```

## 🎨 Styling with Tailwind CSS

Use Tailwind classes directly in your components and Liquid templates:

```html
<!-- Use Tailwind classes directly -->
<div class="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors">
  Beautiful button
</div>

<!-- Responsive design -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Content -->
</div>
```

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start CSS and JS watchers |
| `bun run dev:full` | Start all watchers with Shopify server |
| `bun run build` | Build for production |
| `bun run deploy` | Deploy to Shopify |

## 📄 License

This project is licensed under the [MIT License](./LICENSE.md).

---

**Built with ❤️ for modern Shopify development**
