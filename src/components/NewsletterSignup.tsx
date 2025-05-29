import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Check, Gift, Zap, Bell } from 'lucide-react'

interface NewsletterSignupProps {
  title?: string
  subtitle?: string
  description?: string
  placeholder?: string
  buttonText?: string
  benefits?: string[]
  discount?: string
  className?: string
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  title = 'Stay in the Loop',
  subtitle = 'Get exclusive offers and updates',
  description = 'Be the first to know about new products, sales, and special events. Plus, get 10% off your first order!',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  benefits = [
    'Exclusive discounts and offers',
    'Early access to new products',
    'Style tips and inspiration',
    'Special event invitations'
  ],
  discount = '10%',
  className = '',
}) => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className={`py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-purple-700 ${className}`}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div variants={itemVariants} className="text-white">
            {discount && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Gift size={18} className="text-yellow-300" />
                <span className="font-semibold">Get {discount} off your first order!</span>
              </div>
            )}
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {title}
            </h2>
            <h3 className="text-xl lg:text-2xl text-blue-100 font-semibold mb-6">
              {subtitle}
            </h3>
            <p className="text-lg text-blue-100 leading-relaxed mb-8">
              {description}
            </p>

            {/* Benefits */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="text-blue-100">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-2xl">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Mail size={32} className="text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Join Our Newsletter
                    </h3>
                    <p className="text-gray-600">
                      Subscribe and never miss out on exclusive deals
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={placeholder}
                        required
                        className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                      <Mail size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          {buttonText}
                          <ArrowRight
                            size={20}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By subscribing, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome to the Family!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for subscribing. Check your email for your {discount} discount code!
                  </p>
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Bell size={18} />
                    <span className="font-medium">You'll hear from us soon!</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
