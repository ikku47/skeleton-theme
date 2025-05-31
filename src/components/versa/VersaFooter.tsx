import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Heart,
  CreditCard,
  Shield,
  Truck
} from 'lucide-react'

interface FooterLink {
  title: string
  url: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  platform: string
  url: string
  icon: string | React.ReactNode
}

interface VersaFooterProps {
  logo?: string
  logoText?: string
  description?: string
  sections: FooterSection[]
  socialLinks: SocialLink[]
  contactInfo: {
    email?: string
    phone?: string
    address?: string
  }
  newsletterTitle?: string
  newsletterDescription?: string
  showPaymentIcons?: boolean
  showTrustBadges?: boolean
  className?: string
}

export const VersaFooter: React.FC<VersaFooterProps> = ({
  logo,
  logoText = 'VersaCommerce',
  description = 'Discover premium quality products designed for the modern lifestyle. Experience excellence in every purchase with our curated collection.',
  sections,
  socialLinks,
  contactInfo,
  newsletterTitle = 'Stay Connected',
  newsletterDescription = 'Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.',
  showPaymentIcons = true,
  showTrustBadges = true,
  className = '',
}) => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubscribing(true)
    try {
      // Simulate newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubscribeStatus('success')
      setEmail('')
    } catch (error) {
      setSubscribeStatus('error')
    } finally {
      setIsSubscribing(false)
      setTimeout(() => setSubscribeStatus('idle'), 4000)
    }
  }

  // Helper function to convert icon strings to React components
  const getIconComponent = (icon: string | React.ReactNode): React.ReactNode => {
    if (typeof icon !== 'string') {
      return icon
    }

    switch (icon.toLowerCase()) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />
      case 'instagram':
        return <Instagram className="w-5 h-5" />
      case 'twitter':
        return <Twitter className="w-5 h-5" />
      case 'youtube':
        return <Youtube className="w-5 h-5" />
      default:
        return <Facebook className="w-5 h-5" />
    }
  }

  const trustBadges = [
    { icon: <Truck className="w-5 h-5" />, text: 'Free Shipping' },
    { icon: <Shield className="w-5 h-5" />, text: 'Secure Payment' },
    { icon: <Heart className="w-5 h-5" />, text: '30-Day Returns' },
    { icon: <CreditCard className="w-5 h-5" />, text: 'Easy Checkout' },
  ]

  return (
    <footer className={`bg-primary text-white ${className}`}>
      {/* Main Footer Content */}
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Logo */}
            <div className="mb-6">
              {logo ? (
                <img src={logo} alt={logoText} className="h-10 w-auto" />
              ) : (
                <span className="font-display text-2xl font-bold text-white">
                  {logoText}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed font-body">
              {description}
            </p>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-secondary hover:bg-accent text-white hover:text-primary rounded-full flex items-center justify-center transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {getIconComponent(social.icon)}
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Navigation Sections */}
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (sectionIndex + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-lg font-semibold text-white mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <motion.a
                      href={link.url}
                      className="text-gray-300 hover:text-accent transition-colors duration-200 font-body"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.title}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-lg font-semibold text-white mb-6">
              {newsletterTitle}
            </h3>
            
            <p className="text-gray-300 mb-6 font-body">
              {newsletterDescription}
            </p>

            {/* Enhanced Newsletter Signup */}
            <form onSubmit={handleNewsletterSubmit} className="mb-8">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-secondary text-white placeholder-gray-400 border border-secondary rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
                  required
                />
                <motion.button
                  type="submit"
                  disabled={isSubscribing || !email.trim()}
                  className="px-6 py-3 bg-accent text-primary font-semibold rounded-r-lg hover:bg-yellow-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px]"
                  whileHover={{ scale: isSubscribing ? 1 : 1.02 }}
                  whileTap={{ scale: isSubscribing ? 1 : 0.98 }}
                >
                  {isSubscribing ? (
                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </motion.button>
              </div>

              {/* Subscription Status */}
              {subscribeStatus !== 'idle' && (
                <motion.div
                  className={`mt-3 text-sm ${
                    subscribeStatus === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {subscribeStatus === 'success'
                    ? '✓ Thank you for subscribing!'
                    : '✗ Something went wrong. Please try again.'
                  }
                </motion.div>
              )}
            </form>

            {/* Contact Info */}
            {(contactInfo.email || contactInfo.phone || contactInfo.address) && (
              <div className="space-y-3">
                {contactInfo.email && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-4 h-4 text-accent" />
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="hover:text-accent transition-colors duration-200 font-body"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                )}
                {contactInfo.phone && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-4 h-4 text-accent" />
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="hover:text-accent transition-colors duration-200 font-body"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                )}
                {contactInfo.address && (
                  <div className="flex items-start gap-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-accent mt-0.5" />
                    <span className="font-body">{contactInfo.address}</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Trust Badges */}
      {showTrustBadges && (
        <div className="border-t border-secondary">
          <div className="container py-8">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {trustBadges.map((badge, index) => (
                <div key={badge.text} className="flex items-center gap-3 text-gray-300">
                  <div className="text-accent">{badge.icon}</div>
                  <span className="font-body text-sm">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <div className="border-t border-secondary">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm font-body">
              © {currentYear} {logoText}. All rights reserved.
            </div>

            {/* Payment Icons */}
            {showPaymentIcons && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm font-body mr-3">We accept:</span>
                <div className="flex gap-2">
                  {['visa', 'mastercard', 'amex', 'paypal'].map((payment) => (
                    <div
                      key={payment}
                      className="w-8 h-5 bg-white rounded flex items-center justify-center"
                    >
                      <CreditCard className="w-4 h-3 text-gray-600" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
