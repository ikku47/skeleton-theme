# React Components with Framer Motion & Lucide Icons

This Shopify theme now includes React components with Framer Motion animations and Lucide icons for enhanced interactivity and user experience.

## 🚀 Quick Start

### Development
```bash
# Start development with hot reloading for both CSS and JS
bun run dev

# Or run separately:
bun run dev:css  # Watch CSS changes
bun run dev:js   # Watch JS changes
```

### Production Build
```bash
# Build both CSS and JS for production
bun run build

# Or build separately:
bun run build:css  # Build optimized CSS
bun run build:js   # Build optimized JS bundle
```

## 📦 Available Components

### 1. AnimatedButton
Interactive button with hover and tap animations.

```liquid
{% assign button_props = '{"children": "Click Me", "variant": "primary", "size": "lg"}' %}
{% render 'react-component', component: 'AnimatedButton', props: button_props %}
```

**Props:**
- `children`: Button text or content
- `variant`: `'primary'` | `'secondary'` | `'outline'`
- `size`: `'sm'` | `'md'` | `'lg'`
- `href`: Optional link URL
- `onClick`: JavaScript function name (as string)

### 2. IconButton
Button with Lucide icons and animations.

```liquid
{% assign icon_props = '{"icon": "Heart", "variant": "ghost", "aria-label": "Add to wishlist"}' %}
{% render 'react-component', component: 'IconButton', props: icon_props %}
```

**Props:**
- `icon`: Any Lucide icon name (e.g., 'Heart', 'ShoppingCart', 'Search')
- `variant`: `'default'` | `'ghost'` | `'outline'`
- `size`: Icon size in pixels (default: 24)
- `aria-label`: Accessibility label

### 3. ProductCard
Animated product card with hover effects.

```liquid
{% capture product_props %}
{
  "title": "{{ product.title }}",
  "price": "{{ product.price | money }}",
  "compareAtPrice": "{{ product.compare_at_price | money }}",
  "imageUrl": "{{ product.featured_image | img_url: '400x400' }}",
  "productUrl": "{{ product.url }}"
}
{% endcapture %}
{% render 'react-component', component: 'ProductCard', props: product_props %}
```

### 4. CartDrawer
Sliding cart drawer with animations.

```liquid
{% assign cart_props = '{"isOpen": false, "items": []}' %}
{% render 'react-component', component: 'CartDrawer', props: cart_props, id: 'cart-drawer' %}
```

### 5. SearchModal
Modal search interface with animations.

```liquid
{% assign search_props = '{"isOpen": false}' %}
{% render 'react-component', component: 'SearchModal', props: search_props, id: 'search-modal' %}
```

### 6. ImageGallery
Interactive image gallery with zoom and navigation.

```liquid
{% capture gallery_props %}
{
  "images": [
    {
      "id": "1",
      "src": "{{ product.images[0] | img_url: '600x600' }}",
      "alt": "{{ product.images[0].alt }}",
      "thumbnail": "{{ product.images[0] | img_url: '100x100' }}"
    }
  ]
}
{% endcapture %}
{% render 'react-component', component: 'ImageGallery', props: gallery_props %}
```

## 🎨 Styling

Components use Tailwind CSS classes and CSS custom properties defined in your theme. Key variables:

- `--color-primary`: Primary brand color
- `--color-secondary`: Secondary color
- `--color-foreground`: Text color
- `--color-background`: Background color
- `--color-muted`: Muted text color

## 🔧 Adding New Components

1. Create your component in `src/components/`
2. Add it to `src/components/ComponentRegistry.tsx`
3. Build with `bun run build:js`
4. Use with the `react-component` snippet

## 📱 Browser Support

- Modern browsers with ES2015+ support
- React 18+ features
- Framer Motion animations
- All Lucide icons available

## 🎯 Performance

- Components are lazy-loaded when needed
- Animations use hardware acceleration
- Bundle size: ~746KB (210KB gzipped)
- Consider code-splitting for larger applications

## 🎯 Theme Integration

The React components have been integrated into the following Shopify theme sections:

### Header Section (`sections/header.liquid`)
- **Search Icon**: Opens search modal with popular searches
- **Cart Icon**: Opens cart drawer with live cart data
- **Account Icon**: User account access (if enabled)
- **Features**: Animated icons, cart count badge, responsive design

### Product Section (`sections/product.liquid`)
- **Image Gallery**: Multi-image product gallery with zoom and thumbnails
- **Add to Cart Button**: Animated primary button with hover effects
- **Wishlist Button**: Heart icon for adding to wishlist
- **Features**: Responsive grid layout, enhanced UX

### Collection Section (`sections/collection.liquid`)
- **Product Cards**: Animated product cards with hover effects
- **Grid Layout**: Responsive grid with proper spacing
- **Features**: Price comparison, image optimization, smooth animations

### Cart Section (`sections/cart.liquid`)
- **Enhanced Cart Items**: Interactive quantity controls with +/- buttons
- **Remove Items**: Trash icon for item removal
- **Empty State**: Friendly empty cart with call-to-action
- **Features**: Responsive design, real-time updates, animated buttons

### Homepage (`templates/index.json`)
- **Demo Section**: Showcases all available components
- **Interactive Examples**: Live demonstrations of component features

## 🛠️ Troubleshooting

### Component not rendering?
1. Check the browser console for errors
2. Verify the component name in ComponentRegistry
3. Ensure props are valid JSON
4. Check that `application.js` is loaded
5. Verify React components are built: `bun run build:js`

### Animations not working?
1. Verify Framer Motion is installed
2. Check for JavaScript errors
3. Ensure proper CSS is loaded
4. Check browser compatibility (ES2015+ required)

### Icons not showing?
1. Check the icon name exists in Lucide React
2. Verify the icon prop is correctly spelled
3. Check console for warnings
4. Ensure component is properly imported

### Cart/Search not opening?
1. Check that global functions are defined
2. Verify event listeners are attached
3. Check for JavaScript errors in console
4. Ensure React components are initialized

## 🚀 Development Workflow

1. **Start Development**:
   ```bash
   bun run dev
   ```

2. **Make Changes**:
   - Edit React components in `src/components/`
   - Modify Liquid templates in `sections/`
   - Update styles in component files or Tailwind

3. **Build for Production**:
   ```bash
   bun run build
   ```

4. **Test in Shopify**:
   ```bash
   bun run preview
   ```

## 📚 Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shopify Theme Development](https://shopify.dev/docs/themes)
