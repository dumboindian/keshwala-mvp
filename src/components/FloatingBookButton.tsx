'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, X, Phone, MessageSquare } from 'lucide-react'

const FloatingBookButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const quickActions = [
    {
      icon: Calendar,
      label: 'Book Appointment',
      action: () => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
        setIsExpanded(false)
      },
      color: 'bg-maroon hover:bg-maroon/90',
    },
    {
      icon: Phone,
      label: 'Call Now',
      action: () => {
        window.location.href = 'tel:+919876543210'
        setIsExpanded(false)
      },
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      icon: MessageSquare,
      label: 'WhatsApp',
      action: () => {
        window.open('https://wa.me/919876543210', '_blank')
        setIsExpanded(false)
      },
      color: 'bg-green-600 hover:bg-green-700',
    },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Quick Actions */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="mb-4 space-y-3"
              >
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={action.action}
                    className={`${action.color} text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-3 hover:shadow-xl transition-all duration-300 group`}
                  >
                    <action.icon className="w-5 h-5" />
                    <span className="font-medium whitespace-nowrap">{action.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-16 h-16 bg-gradient-to-r from-maroon to-pink text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? (
                <X className="w-6 h-6" />
              ) : (
                <Calendar className="w-6 h-6" />
              )}
            </motion.div>
          </motion.button>

          {/* Pulse Animation */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-maroon to-pink rounded-full opacity-30"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingBookButton

