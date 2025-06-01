import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown } from 'lucide-react'

interface MenuItem {
  title: string
  url: string
  children?: MenuItem[]
}

interface VersaHeaderProps {
  logo?: string
  logoText?: string
  menuItems: MenuItem[]
  cartCount?: number
  wishlistCount?: number
  className?: string
}

export const VersaHeader: React.FC<VersaHeaderProps> = ({
  logo,
  logoText = 'VersaCommerce',
  menuItems,
  cartCount: initialCartCount = 0,
  wishlistCount = 0,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(initialCartCount)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update cart count when initial prop changes
  useEffect(() => {
    setCartCount(initialCartCount)
  }, [initialCartCount])

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = async () => {
      try {
        const response = await fetch('/cart.js')
        if (response.ok) {
          const cartData = await response.json()
          setCartCount(cartData.item_count)
        }
      } catch (error) {
        console.error('Error fetching cart data:', error)
      }
    }

    window.addEventListener('cart:updated', handleCartUpdate)
    return () => window.removeEventListener('cart:updated', handleCartUpdate)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleDropdownEnter = (title: string) => {
    setActiveDropdown(title)
  }

  const handleDropdownLeave = () => {
    setActiveDropdown(null)
  }

  const handleAccountClick = () => {
    // Navigate to account page or login page
    window.location.href = '/account'
  }

  const handleWishlistClick = () => {
    // Navigate to wishlist page or open wishlist modal
    window.location.href = '/pages/wishlist'
  }

  const handleCartClick = () => {
    // Navigate to cart page
    window.location.href = '/cart'
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-elegant border-b border-light-gray'
          : 'bg-white/90 backdrop-blur-sm'
      } ${className}`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-18 lg:h-24">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <a href="/" className="flex items-center gap-3">
              {logo ? (
                <img src={logo} alt={logoText} className="h-10 lg:h-12 w-auto" />
              ) : (
                <span className="font-heading text-3xl lg:text-4xl font-light text-dark tracking-display">
                  {logoText}
                </span>
              )}
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => item.children && handleDropdownEnter(item.title)}
                onMouseLeave={handleDropdownLeave}
              >
                <motion.a
                  href={item.url}
                  className="flex items-center gap-1 font-body font-medium text-warm-brown hover:text-gold transition-colors duration-300 py-3 relative"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <span className="relative">
                    {item.title}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-gold"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                  {item.children && (
                    <motion.div
                      animate={{ rotate: activeDropdown === item.title ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.a>

                {/* Mega Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.title && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-border overflow-hidden z-50"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="py-2">
                        {item.children.map((child, index) => (
                          <motion.a
                            key={child.title}
                            href={child.url}
                            className="block px-4 py-3 text-neutral hover:bg-light-bg hover:text-primary transition-all duration-200 font-body"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            whileHover={{ x: 4, backgroundColor: '#F9F9F9' }}
                          >
                            {child.title}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <motion.a
              href="/search"
              className="p-3 text-warm-brown hover:text-gold hover:bg-off-white rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
            </motion.a>

            <motion.button
              className="relative p-3 text-warm-brown hover:text-gold hover:bg-off-white rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWishlistClick}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-xs font-medium rounded-full flex items-center justify-center shadow-button"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {wishlistCount}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              className="relative p-3 text-warm-brown hover:text-gold hover:bg-off-white rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-xs font-medium rounded-full flex items-center justify-center shadow-button"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              className="p-3 text-warm-brown hover:text-gold hover:bg-off-white rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAccountClick}
            >
              <User className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-primary"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Enhanced Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-[9998] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMobileMenu}
            />

            {/* Full-Screen Menu */}
            <motion.div
              className="fixed inset-0 bg-white z-[9999] lg:hidden overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ height: '100dvh' }}
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  {logo ? (
                    <img src={logo} alt={logoText} className="h-8 w-auto" />
                  ) : (
                    <span className="font-heading text-xl font-bold text-primary">{logoText}</span>
                  )}
                </div>
                <motion.button
                  onClick={toggleMobileMenu}
                  className="p-2 text-primary hover:text-accent transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Mobile Search */}
              <div className="p-6 border-b border-border">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral" />
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const query = (e.target as HTMLInputElement).value.trim()
                        if (query) {
                          window.location.href = `/search?q=${encodeURIComponent(query)}`
                        }
                      }
                    }}
                  />
                </motion.div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 p-6 min-h-0 overflow-y-auto">
                <nav className="space-y-1">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + (index * 0.05) }}
                    >
                      <motion.a
                        href={item.url}
                        className="flex items-center justify-between py-3 font-heading text-lg font-semibold text-primary hover:text-accent transition-colors duration-200 border-b border-border/50"
                        whileHover={{ x: 8 }}
                        onClick={toggleMobileMenu}
                      >
                        <span>{item.title}</span>
                        {item.children && item.children.length > 0 && (
                          <motion.div
                            className="w-5 h-5 rounded-full bg-light-bg flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                          >
                            <span className="text-xs font-bold text-neutral">{item.children.length}</span>
                          </motion.div>
                        )}
                      </motion.a>

                      {item.children && (
                        <div className="ml-4 space-y-1 py-2">
                          {item.children.map((child, childIndex) => (
                            <motion.a
                              key={child.title}
                              href={child.url}
                              className="block py-2 text-base text-neutral hover:text-primary transition-colors duration-200 font-body"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) + (childIndex * 0.03) }}
                              whileHover={{ x: 6 }}
                              onClick={toggleMobileMenu}
                            >
                              {child.title}
                            </motion.a>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Mobile Actions Footer */}
              <div className="p-4 border-t border-border bg-light-bg flex-shrink-0">
                <div className="grid grid-cols-3 gap-3">
                  <motion.button
                    className="flex flex-col items-center gap-1 p-3 bg-white rounded-lg border border-border hover:border-primary transition-all duration-200"
                    onClick={handleWishlistClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="relative">
                      <Heart className="w-5 h-5 text-primary" />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-primary text-xs font-bold rounded-full flex items-center justify-center">
                          {wishlistCount}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-primary">Wishlist</span>
                  </motion.button>

                  <motion.button
                    className="flex flex-col items-center gap-1 p-3 bg-white rounded-lg border border-border hover:border-primary transition-all duration-200"
                    onClick={handleCartClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                  >
                    <div className="relative">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-primary text-xs font-bold rounded-full flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-primary">Cart</span>
                  </motion.button>

                  <motion.button
                    className="flex flex-col items-center gap-1 p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200"
                    onClick={handleAccountClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-xs font-medium">Account</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
