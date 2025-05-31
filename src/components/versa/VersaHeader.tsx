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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      } ${className}`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <a href="/" className="flex items-center gap-3">
              {logo ? (
                <img src={logo} alt={logoText} className="h-8 lg:h-10 w-auto" />
              ) : (
                <span className="font-display text-2xl lg:text-3xl font-bold text-primary">
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
                  className="flex items-center gap-1 font-heading font-medium text-primary hover:text-accent transition-colors duration-200 py-2"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.title}
                  {item.children && (
                    <motion.div
                      animate={{ rotate: activeDropdown === item.title ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
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
          <div className="hidden lg:flex items-center space-x-4">
            <motion.a
              href="/search"
              className="p-2 text-neutral hover:text-primary transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
            </motion.a>

            <motion.button
              className="relative p-2 text-neutral hover:text-primary transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWishlistClick}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </motion.button>

            <motion.button
              className="relative p-2 text-neutral hover:text-primary transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.button>

            <motion.button
              className="p-2 text-neutral hover:text-primary transition-colors duration-200"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-white border-t border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2 mb-8">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <motion.a
                      href={item.url}
                      className="block font-heading font-semibold text-lg text-primary hover:text-accent transition-colors duration-200 py-3 border-b border-border"
                      whileHover={{ x: 4 }}
                      onClick={toggleMobileMenu}
                    >
                      {item.title}
                    </motion.a>
                    {item.children && (
                      <div className="ml-4 mt-2 space-y-2 pb-2">
                        {item.children.map((child, childIndex) => (
                          <motion.a
                            key={child.title}
                            href={child.url}
                            className="block text-neutral hover:text-primary transition-colors duration-200 py-2 font-body"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: (index * 0.1) + (childIndex * 0.05) }}
                            whileHover={{ x: 4 }}
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

              {/* Mobile Actions */}
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border">
                <a
                  href="/search"
                  className="flex items-center gap-2 text-neutral hover:text-primary transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </a>

                <button
                  className="flex items-center gap-2 text-neutral hover:text-primary transition-colors duration-200"
                  onClick={handleWishlistClick}
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="w-5 h-5 bg-accent text-primary text-xs font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                <button
                  className="flex items-center gap-2 text-neutral hover:text-primary transition-colors duration-200"
                  onClick={handleCartClick}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="w-5 h-5 bg-accent text-primary text-xs font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  className="flex items-center gap-2 text-neutral hover:text-primary transition-colors duration-200"
                  onClick={handleAccountClick}
                >
                  <User className="w-5 h-5" />
                  <span>Account</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
