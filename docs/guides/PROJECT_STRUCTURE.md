# VersaCommerce Project Structure Guide

This guide explains the organized file structure of the VersaCommerce Shopify theme and how to navigate the codebase effectively.

## 📁 Directory Overview

```
skeleton-theme/
├── 📁 docs/                          # Documentation Hub
├── 📁 src/                           # Source Code
├── 📁 assets/                        # Compiled Assets
├── 📁 sections/                      # Shopify Sections
├── 📁 templates/                     # Page Templates
├── 📁 snippets/                      # Reusable Code
├── 📁 layout/                        # Theme Layouts
├── 📁 config/                        # Theme Configuration
├── 📁 locales/                       # Internationalization
├── 📁 blocks/                        # Shopify Blocks
├── 📁 node_modules/                  # Dependencies
├── 📄 package.json                   # Project Configuration
├── 📄 README.md                      # Main Documentation
└── 📄 *.config.js                    # Build Configuration
```

## 📚 Documentation Structure (`docs/`)

### Implementation Documentation
- **`implementation/`** - Technical implementation details
  - `VERSACOMMERCE_IMPLEMENTATION.md` - Complete implementation overview
  - `VERSACOMMERCE_COMPONENTS_COMPLETE.md` - Component details
  - `VERSACOMMERCE_CONSISTENCY_COMPLETE.md` - Design consistency
  - `VERSACOMMERCE_PAGES_ENHANCEMENT.md` - Page enhancements

### Development Guides
- **`guides/`** - Step-by-step guides and best practices
  - `ENHANCED_PRODUCT_PAGE_SUMMARY.md` - Product page optimization
  - `SHOPIFY_VALIDATION_FIXES.md` - Theme validation
  - `ADD_TO_CART_FIXES_SUMMARY.md` - Cart functionality
  - `BUY_NOW_WISHLIST_FIXES_SUMMARY.md` - Purchase flows
  - `NO_FAKE_DATA_SUMMARY.md` - Real data integration
  - `PRODUCT_PAGE_FIXES_SUMMARY.md` - Troubleshooting

### Design System
- **`design-system/`** - Design principles and styling
  - `DESIGN_SYSTEM_CONSISTENCY_SUMMARY.md` - Design system overview

### Component Documentation
- **`components/`** - Component architecture and analysis
  - `PROJECT_COMPONENT_ANALYSIS.md` - Component architecture
  - `PRODUCT_COMPONENTS_SUMMARY.md` - Product components

### Backups & References
- **`backups/`** - Historical files and backups
  - `ORIGINAL_HOMEPAGE_BACKUP.md` - Original homepage template

## ⚛️ Source Code Structure (`src/`)

### Component Organization
```
src/components/
├── 📁 versa/                         # VersaCommerce Components
│   ├── VersaHeader.tsx              # Navigation header
│   ├── VersaHeroSection.tsx         # Hero section
│   ├── VersaProductGrid.tsx         # Product grid
│   ├── VersaProductGallery.tsx      # Product gallery
│   ├── VersaProductDetails.tsx      # Product details
│   ├── VersaNewsletter.tsx          # Newsletter signup
│   ├── VersaFooter.tsx              # Footer
│   ├── VersaPageHeader.tsx          # Page headers
│   ├── VersaCollectionGrid.tsx      # Collection grid
│   ├── VersaBlogGrid.tsx            # Blog grid
│   └── VersaCartDrawer.tsx          # Cart drawer
│
├── 📁 shared/                        # Shared Components
│   ├── ComponentRegistry.tsx        # Component registration
│   ├── AnimatedButton.tsx           # Animated buttons
│   ├── IconButton.tsx               # Icon buttons
│   ├── ProductCard.tsx              # Product cards
│   ├── CollectionCard.tsx           # Collection cards
│   ├── FeatureCallouts.tsx          # Feature highlights
│   ├── FeaturedProductShowcase.tsx  # Product showcase
│   ├── AccessoriesCarousel.tsx      # Product carousel
│   ├── TestimonialsSection.tsx      # Testimonials
│   ├── CartManager.tsx              # Cart state management
│   └── CartNotification.tsx         # Cart notifications
│
└── 📁 legacy/                        # Legacy Components
    ├── HeroSection.tsx               # Original hero
    ├── ProductImageGallery.tsx       # Product gallery
    ├── ProductInfo.tsx               # Product information
    ├── ProductVariantSelector.tsx    # Variant selection
    ├── ProductQuantitySelector.tsx   # Quantity input
    ├── ProductActions.tsx            # Product actions
    ├── ProductBreadcrumbs.tsx        # Breadcrumbs
    ├── RelatedProducts.tsx           # Related products
    ├── ProductReviews.tsx            # Product reviews
    ├── EnhancedProductGallery.tsx    # Enhanced gallery
    ├── EnhancedProductDetails.tsx    # Enhanced details
    └── EnhancedVariantSelector.tsx   # Enhanced variants
```

### Styles Organization
```
src/styles/
├── main.css                         # Main Tailwind CSS
└── swiper-custom.css                # Component-specific styles
```

## 🛍️ Shopify Theme Structure

### Sections (`sections/`)
```
sections/
├── versa-*.liquid                   # VersaCommerce sections
├── enhanced-*.liquid                # Enhanced product sections
├── feature-callouts.liquid          # Feature highlights
├── testimonials.liquid              # Customer testimonials
├── accessories-carousel.liquid      # Product carousel
├── newsletter.liquid                # Newsletter signup
├── header.liquid                    # Theme header
├── footer.liquid                    # Theme footer
└── *.liquid                         # Standard sections
```

### Templates (`templates/`)
```
templates/
├── index.json                       # Homepage template
├── product.json                     # Product page template
├── collection.json                  # Collection page template
├── cart.json                        # Cart page template
├── blog.json                        # Blog page template
├── article.json                     # Article page template
├── search.json                      # Search page template
├── 404.json                         # 404 page template
├── page.json                        # Generic page template
├── list-collections.json            # Collections list template
├── password.json                    # Password page template
└── gift_card.liquid                 # Gift card template
```

### Snippets (`snippets/`)
```
snippets/
├── react-component.liquid           # React component renderer
├── css-variables.liquid             # CSS custom properties
├── meta-tags.liquid                 # SEO meta tags
└── image.liquid                     # Image optimization
```

## 🔧 Configuration Files

### Build Configuration
- **`package.json`** - Dependencies and scripts
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`vite.config.js`** - Vite build configuration
- **`tsconfig.json`** - TypeScript configuration

### Theme Configuration
- **`config/settings_schema.json`** - Theme settings schema
- **`config/settings_data.json`** - Theme settings data

## 🚀 Development Workflow

### File Modification Guidelines

1. **VersaCommerce Components** (`src/components/versa/`)
   - Modern, production-ready components
   - Follow VersaCommerce design system
   - Use TypeScript for type safety

2. **Shared Components** (`src/components/shared/`)
   - Reusable across different contexts
   - Well-documented props interfaces
   - Minimal dependencies

3. **Legacy Components** (`src/components/legacy/`)
   - Maintained for backward compatibility
   - Avoid modifications unless necessary
   - Consider migrating to VersaCommerce equivalents

### Adding New Components

1. **Choose the right directory:**
   - `versa/` for VersaCommerce-specific components
   - `shared/` for reusable components
   - `legacy/` only for backward compatibility

2. **Update ComponentRegistry.tsx:**
   ```typescript
   // Add import
   import { NewComponent } from '../versa/NewComponent'
   
   // Add to registry
   export const ComponentRegistry = {
     // ... existing components
     NewComponent,
   }
   ```

3. **Create corresponding Liquid section:**
   ```liquid
   <!-- sections/new-component.liquid -->
   {% render 'react-component', 
      component: 'NewComponent', 
      props: component_props %}
   ```

## 📖 Navigation Tips

### Finding Components
- **By functionality:** Check the component category in `src/components/`
- **By usage:** Search for component name in `sections/` directory
- **By documentation:** Check `docs/components/` for detailed guides

### Understanding Data Flow
1. **Shopify Data** → Liquid templates extract data
2. **JSON Serialization** → Data formatted for React
3. **React Components** → Components receive props
4. **Component Registry** → Dynamic component loading

### Debugging Components
1. Check browser console for React errors
2. Verify component registration in `ComponentRegistry.tsx`
3. Validate JSON props in Liquid templates
4. Use React DevTools for component inspection

---

**Next Steps:** Review the [Component Documentation](../components/) for detailed component guides.
