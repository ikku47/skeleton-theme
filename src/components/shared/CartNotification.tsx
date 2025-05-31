import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ShoppingCart, AlertCircle } from 'lucide-react'

interface CartNotificationProps {
  type: 'success' | 'error' | 'info'
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export const CartNotification: React.FC<CartNotificationProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5" />
      case 'error':
        return <AlertCircle className="w-5 h-5" />
      case 'info':
        return <ShoppingCart className="w-5 h-5" />
      default:
        return <ShoppingCart className="w-5 h-5" />
    }
  }

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'info':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className={`rounded-lg shadow-lg p-4 flex items-center gap-3 ${getColors()}`}>
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Global notification manager
class NotificationManager {
  private listeners: Array<(notification: NotificationData) => void> = []

  subscribe(listener: (notification: NotificationData) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  show(type: 'success' | 'error' | 'info', message: string, duration?: number) {
    this.listeners.forEach(listener => {
      listener({ type, message, duration, id: Date.now().toString() })
    })
  }

  success(message: string, duration?: number) {
    this.show('success', message, duration)
  }

  error(message: string, duration?: number) {
    this.show('error', message, duration)
  }

  info(message: string, duration?: number) {
    this.show('info', message, duration)
  }
}

interface NotificationData {
  type: 'success' | 'error' | 'info'
  message: string
  duration?: number
  id: string
}

export const notificationManager = new NotificationManager()

// Global notification container component
export const NotificationContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([])

  useEffect(() => {
    const unsubscribe = notificationManager.subscribe((notification) => {
      setNotifications(prev => [...prev, notification])
    })

    return unsubscribe
  }, [])

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <CartNotification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          isVisible={true}
          onClose={() => removeNotification(notification.id)}
          duration={notification.duration}
        />
      ))}
    </div>
  )
}
