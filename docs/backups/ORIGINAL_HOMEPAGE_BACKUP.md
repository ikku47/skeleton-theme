# Original Homepage Template Backup

This file contains the original `templates/index.json` content before VersaCommerce implementation.

## Original index.json Content

```json
{
  "sections": {
    "hero": {
      "type": "hero-section",
      "settings": {}
    },
    "featured_products": {
      "type": "featured-products",
      "settings": {
        "products_limit": 8,
        "show_view_all": true
      }
    },
    "newsletter": {
      "type": "newsletter",
      "settings": {}
    }
  },
  "order": [
    "hero",
    "featured_products",
    "newsletter"
  ]
}
```

## How to Restore Original Homepage

If you want to revert to the original simple homepage:

1. Copy the JSON content above
2. Replace the content in `templates/index.json`
3. Save the file

## Current VersaCommerce Homepage

The current `templates/index.json` uses the full VersaCommerce layout with:
- Versa Hero Section
- Feature Callouts
- Featured Product Showcase
- Versa Product Grid
- Accessories Carousel
- Testimonials
- Versa Newsletter

Both versions are fully functional and use real Shopify data.
