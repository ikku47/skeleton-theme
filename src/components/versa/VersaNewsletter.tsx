import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Check, X } from 'lucide-react'

interface VersaNewsletterProps {
  title?: string
  subtitle?: string
  description?: string
  incentive?: string
  placeholder?: string
  buttonText?: string
  className?: string
}

export const VersaNewsletter: React.FC<VersaNewsletterProps> = ({
  title = 'Stay in the Loop',
  subtitle = 'Newsletter',
  description = 'Get the latest updates on new products, exclusive offers, and style tips delivered straight to your inbox.',
  incentive = '10% off your first order',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  className = '',
}) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    
    try {
      // Simulate API call - replace with actual newsletter signup logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, we'll always show success
      setStatus('success')
      setMessage('Thank you for subscribing! Check your email for your discount code.')
      setEmail('')
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    }
  }

  return (
    <section className={`section-padding bg-light-bg ${className}`}>
      <div className="container">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="mb-8">
            {subtitle && (
              <motion.p
                className="font-body text-neutral text-lg mb-4 uppercase tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {subtitle}
              </motion.p>
            )}
            
            <motion.h2
              className="font-heading text-primary text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {title}
            </motion.h2>
            
            <motion.p
              className="font-body text-neutral text-lg leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {description}
            </motion.p>
          </div>

          {/* Incentive Badge */}
          {incentive && (
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-primary font-semibold rounded-full mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-4 h-4" />
              {incentive}
            </motion.div>
          )}

          {/* Newsletter Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 border-2 border-border rounded-cta focus:border-primary focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                
                {/* Status Icons */}
                {status === 'success' && (
                  <motion.div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <Check className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
                
                {status === 'error' && (
                  <motion.div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </motion.div>
                )}
              </div>
              
              <motion.button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-cta hover:bg-secondary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              >
                {status === 'loading' ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    {buttonText}
                  </>
                )}
              </motion.button>
            </div>

            {/* Status Message */}
            <AnimatePresence>
              {message && (
                <motion.p
                  className={`mt-3 text-sm ${
                    status === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Privacy Notice */}
          <motion.p
            className="text-xs text-neutral mt-4 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            By subscribing, you agree to our{' '}
            <a href="/pages/privacy-policy" className="underline hover:text-primary transition-colors">
              Privacy Policy
            </a>{' '}
            and consent to receive updates from our company.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
