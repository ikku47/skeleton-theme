# Shopify React Tailwind Boilerplate

A minimal, modern Shopify theme boilerplate built with React, Tailwind CSS v3, and hot reload functionality.

## ✨ Features

- 🎨 **Tailwind CSS v3** - Utility-first CSS framework with JIT compilation
- ⚛️ **React 18** - Interactive components with TypeScript support
- 🎭 **Framer Motion** - Smooth animations and micro-interactions
- 🎯 **Lucide Icons** - Beautiful, consistent iconography
- 🔥 **Hot Reload** - Instant development feedback for CSS and React changes
- 📱 **Responsive Design** - Mobile-first approach
- 🛍️ **Shopify Integration** - Native Liquid templating with React components
- ⚡ **Performance Optimized** - Fast loading with optimized builds

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

## 🏗️ Project Structure

```bash
.
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── HeroSection.tsx # Simple hero section
│   │   ├── ProductCard.tsx # Product cards
│   │   ├── AnimatedButton.tsx # Animated buttons
│   │   └── IconButton.tsx  # Icon buttons
│   ├── styles/            # CSS source files
│   │   └── main.css       # Main Tailwind CSS file
│   └── main.tsx           # React entry point
├── assets/                # Compiled assets
│   ├── application.css    # Compiled Tailwind CSS
│   └── application.js     # Compiled React bundle
├── sections/              # Shopify sections
├── templates/             # Shopify templates
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
