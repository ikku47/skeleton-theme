# 🔥 Hot Reload Development Guide

## Quick Start

```bash
# Check your development setup
bun run info

# Start development with hot reloading
bun run dev

# Or start with enhanced output
bun run dev:full
```

## ⚡ What's New

Your development environment is now optimized for **instant hot reloading**:

### 🎯 Enhanced Development Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start all watchers (CSS + JS + Shopify) |
| `bun run dev:full` | Enhanced output with colors and labels |
| `bun run dev:css` | Watch CSS changes only |
| `bun run dev:js` | Watch React/JS changes only |
| `bun run dev:shopify` | Shopify development server only |
| `bun run info` | Show development setup and commands |

### 🔧 Key Improvements

1. **Faster Development Builds**
   - No minification in development (8MB vs 750KB)
   - Inline source maps for debugging
   - Fast rebuild times (~1-2 seconds)

2. **Better File Watching**
   - Optimized Vite configuration
   - Debounced rebuilds to prevent spam
   - Proper exclusion of node_modules

3. **Enhanced Shopify Integration**
   - Live reload enabled by default
   - Better error handling
   - Automatic browser refresh

4. **Development vs Production Modes**
   - Development: Fast builds, source maps, no minification
   - Production: Optimized, minified, compressed

## 🚀 Workflow

### 1. Start Development
```bash
bun run dev:full
```

This starts three processes with colored output:
- 🎨 **CSS** (blue): Tailwind compilation
- ⚛️ **JS** (green): React/Vite compilation  
- 🛍️ **SHOPIFY** (magenta): Live preview server

### 2. Make Changes
- **React Components**: Edit `src/components/*.tsx`
- **Styles**: Modify `src/styles/main.css` or Tailwind classes
- **Liquid**: Edit `sections/`, `templates/`, `snippets/`

### 3. See Changes Instantly
- **CSS**: Instant update without page refresh
- **React**: Hot reload preserves component state
- **Liquid**: Browser refreshes automatically

## 🐛 Debugging

### React Components
- Source maps enabled in development
- Use React DevTools extension
- Check browser console for errors

### Performance
- Development builds are larger but faster to compile
- Production builds are optimized and compressed
- Use `bun run build` for final testing

## 💡 Tips

- Use `bun run dev:full` for the best experience
- Keep browser DevTools open to catch errors
- Clear cache if styles seem outdated
- Restart dev server if changes aren't reflecting

## 🎉 Ready to Code!

Your hot reload setup is now optimized for maximum productivity! 🚀
