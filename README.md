<h1 align="center" style="position: relative;">
  <br>
    <img src="./assets/shoppy-x-ray.svg" alt="logo" width="200">
  <br>
  JoyCommerce Shopify Theme
</h1>

<p align="center">
  <strong>A modern, high-performance Shopify theme built with cutting-edge technologies</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v3">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
</p>

<p align="center">
  <a href="./LICENSE.md"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/Shopify-Compatible-95BF47?logo=shopify&logoColor=white" alt="Shopify Compatible">
  <img src="https://img.shields.io/badge/Hot_Reload-✅-brightgreen" alt="Hot Reload">
</p>

## ✨ Features

- 🎨 **Tailwind CSS v3** - Modern utility-first CSS framework with JIT compilation
- ⚛️ **React 18** - Interactive components with TypeScript support
- 🎭 **Framer Motion** - Smooth animations and micro-interactions
- 🎯 **Lucide Icons** - Beautiful, consistent iconography
- 🔥 **Hot Reload** - Instant development feedback for CSS and React changes
- 📱 **Responsive Design** - Mobile-first approach with modern layouts
- 🛍️ **Shopify Integration** - Native product data and Liquid templating
- ⚡ **Performance Optimized** - Fast loading with optimized builds

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Bun** (recommended) or npm
- **Shopify CLI** - [Install here](https://shopify.dev/docs/api/shopify-cli)
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd joycommerce-shopify-theme
   ```

2. **Install dependencies:**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Configure Shopify CLI:**
   ```bash
   shopify auth login
   ```

4. **Check your setup:**
   ```bash
   bun run info
   ```

### Development

Start the development server with hot reload:

```bash
# Start asset watchers (CSS + JS)
bun run dev

# Start with enhanced output and Shopify server
bun run dev:full

# Individual watchers
bun run dev:css    # CSS only
bun run dev:js     # React/JS only
bun run dev:shopify # Shopify server only
```

### Build & Deploy

```bash
# Build for production
bun run build

# Deploy to Shopify
bun run deploy

# Pull latest from Shopify
bun run pull
```

## 🏗️ Project Structure

```bash
.
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── HeroSection.tsx # Expressive hero with product showcase
│   │   ├── ProductCard.tsx # Interactive product cards
│   │   ├── CartDrawer.tsx  # Sliding cart drawer
│   │   └── ...            # More components
│   ├── styles/            # CSS source files
│   │   └── main.css       # Main Tailwind CSS file
│   └── main.tsx           # React entry point
├── assets/                # Compiled assets
│   ├── application.css    # Compiled Tailwind CSS
│   └── application.js     # Compiled React bundle
├── sections/              # Shopify sections
│   ├── hero-section.liquid # Hero section with React integration
│   ├── product.liquid     # Product page with React components
│   └── ...               # More sections
├── templates/             # Shopify templates
├── snippets/              # Reusable Liquid code
├── config/                # Theme settings
└── scripts/               # Development scripts
```

## 🔥 Hot Reload Development

This theme features an optimized development workflow with instant hot reloading:

### What You Get

- **⚡ CSS Hot Reload**: Tailwind changes reflect instantly without page refresh
- **🔄 React Hot Reload**: Component changes update while preserving state
- **🛍️ Shopify Live Reload**: Browser refreshes automatically on Liquid changes
- **🐛 Source Maps**: Debug React components with original file names
- **📊 Fast Builds**: Development builds in ~2 seconds, production optimized

### Development Workflow

1. **Start Development:**
   ```bash
   bun run dev:full
   ```

2. **Make Changes:**
   - Edit React components in `src/components/`
   - Modify styles in `src/styles/main.css` or add Tailwind classes
   - Update Liquid files in `sections/`, `templates/`, `snippets/`

3. **See Changes Instantly:**
   - CSS changes appear immediately
   - React changes hot reload with state preservation
   - Liquid changes trigger browser refresh

## ⚛️ React Components

### Available Components

- **HeroSection** - Expressive hero with product showcase and testimonials
- **ProductCard** - Interactive product cards with hover effects
- **CartDrawer** - Sliding cart drawer with animations
- **SearchModal** - Modal search interface
- **ImageGallery** - Product image gallery with zoom
- **AnimatedButton** - Buttons with Framer Motion animations
- **IconButton** - Icon buttons with Lucide icons

### Using Components in Liquid

```liquid
{% assign hero_props = '{"title": "Your Title", "products": [...]}' %}
{% render 'react-component', component: 'HeroSection', props: hero_props %}
```

## 🎨 Styling with Tailwind CSS

This theme uses Tailwind CSS v3 with JIT compilation for optimal performance:

### Key Features

- **JIT Compilation**: Only generates CSS for classes you actually use
- **Custom Configuration**: Optimized for Shopify theme development
- **Google Fonts Integration**: Multiple font combinations with optimized loading
- **Responsive Design**: Mobile-first approach with modern breakpoints
- **Dark Mode Support**: Built-in dark mode utilities

### Adding Styles

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

## 📊 Performance

### Development vs Production

| Mode | Bundle Size | Build Time | Features |
|------|-------------|------------|----------|
| Development | ~8MB | ~2s | Source maps, no minification, hot reload |
| Production | ~750KB | ~3s | Minified, optimized, compressed |

### Optimization Features

- **Tree Shaking**: Removes unused code
- **Code Splitting**: Loads only necessary components
- **Image Optimization**: Responsive images with lazy loading
- **CSS Purging**: Removes unused Tailwind classes
- **Bundle Compression**: Gzip compression for faster loading

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `bun run info` | Show setup information and available commands |
| `bun run dev` | Start CSS and JS watchers |
| `bun run dev:full` | Start all watchers with enhanced output |
| `bun run dev:css` | Watch CSS changes only |
| `bun run dev:js` | Watch React/JS changes only |
| `bun run dev:shopify` | Start Shopify development server |
| `bun run build` | Build for production |
| `bun run deploy` | Deploy to Shopify |
| `bun run pull` | Pull latest theme from Shopify |
| `bun run check` | Check theme for issues |

## 🤝 Contributing

We welcome contributions! Please read our development guidelines:

1. **Code Style**: Follow TypeScript and React best practices
2. **Components**: Create reusable, accessible components
3. **Performance**: Optimize for speed and bundle size
4. **Documentation**: Document new features and components

## 📄 License

This project is licensed under the [MIT License](./LICENSE.md).

---

<p align="center">
  <strong>Built with ❤️ for modern Shopify development</strong>
</p>
