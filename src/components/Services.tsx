'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Scissors, Sparkles, Crown, Heart, Calendar, Star } from 'lucide-react'
import { useFirestore } from '@/hooks/useFirestore'

interface Service {
  id: number | string
  title: string
  description: string
  price: string
  category: string
  icon: any
  image: string
  features: string[]
}

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const { getServices } = useFirestore()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'haircare', name: 'Haircare' },
    { id: 'wigs', name: 'Wigs' },
    { id: 'event', name: 'Event Styling' },
    { id: 'subscription', name: 'Subscriptions' },
  ]

  // Default services as fallback
  const defaultServices: Service[] = [
    {
      id: 1,
      title: 'Hair Cut & Styling',
      description: 'Professional haircuts and styling tailored to your face shape and lifestyle.',
      price: '₹800',
      category: 'haircare',
      icon: Scissors,
      image: '/api/placeholder/300/200',
      features: ['Expert Consultation', 'Modern Techniques', 'Home Service'],
    },
    {
      id: 2,
      title: 'Hair Coloring',
      description: 'Beautiful hair coloring services with premium products and expert application.',
      price: '₹1,500',
      category: 'haircare',
      icon: Sparkles,
      image: '/api/placeholder/300/200',
      features: ['Color Consultation', 'Premium Products', 'Aftercare Tips'],
    },
    {
      id: 3,
      title: 'Wig Fitting & Styling',
      description: 'Professional wig fitting, cutting, and styling for the perfect look.',
      price: '₹1,200',
      category: 'wigs',
      icon: Crown,
      image: '/api/placeholder/300/200',
      features: ['Custom Fitting', 'Professional Styling', 'Maintenance Tips'],
    },
    {
      id: 4,
      title: 'Bridal Hair & Makeup',
      description: 'Complete bridal hair and makeup services for your special day.',
      price: '₹5,000',
      category: 'event',
      icon: Heart,
      image: '/api/placeholder/300/200',
      features: ['Trial Session', 'Wedding Day Service', 'Touch-up Kit'],
    },
    {
      id: 5,
      title: 'Monthly Hair Care',
      description: 'Regular hair care subscription with personalized treatments and maintenance.',
      price: '₹2,500/mo',
      category: 'subscription',
      icon: Calendar,
      image: '/api/placeholder/300/200',
      features: ['Monthly Visits', 'Personalized Care', 'Priority Booking'],
    },
    {
      id: 6,
      title: 'Wig Maintenance',
      description: 'Regular wig cleaning, styling, and maintenance services.',
      price: '₹600',
      category: 'wigs',
      icon: Star,
      image: '/api/placeholder/300/200',
      features: ['Deep Cleaning', 'Restyling', 'Storage Tips'],
    },
  ]

  // Load services from Firebase
  useEffect(() => {
    const loadServices = async () => {
      try {
        const result = await getServices()
        if (result.success && result.data) {
          // Map Firebase data to Service interface
          const mappedServices = result.data.map((service: any) => ({
            id: service.id,
            title: service.title || service.name || 'Service',
            description: service.description || service.desc || '',
            price: service.price || 'Contact for pricing',
            category: service.category || 'haircare',
            icon: Scissors, // Default icon, could be mapped based on category
            image: service.image || '/api/placeholder/300/200',
            features: service.features || []
          }))
          setServices(mappedServices)
        } else {
          console.error('Failed to load services:', result.error)
          // Fallback to hardcoded services if Firebase fails
          setServices(defaultServices)
        }
      } catch (error) {
        console.error('Error loading services:', error)
        setServices(defaultServices)
      } finally {
        setLoading(false)
      }
    }
    
    loadServices()
  }, [getServices])

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  if (loading) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-montserrat font-bold text-maroon mb-6">
              Our Services
            </h2>
            <p className="text-lg text-gray max-w-2xl mx-auto">
              Professional hair and wig services tailored to your needs
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-maroon border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-montserrat font-bold text-maroon mb-6">
            Our Services
          </h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Professional hair and wig services tailored to your needs
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-maroon text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 bg-gradient-to-br from-pink to-maroon">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
                    <span className="text-maroon font-bold text-lg">{service.price}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-bold text-maroon mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-maroon rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-pink to-maroon text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    Book Now
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-montserrat font-bold text-maroon mb-4">
            Don't see what you're looking for?
          </h3>
          <p className="text-gray mb-6 max-w-2xl mx-auto">
            We offer custom services tailored to your specific needs. Contact us to discuss your requirements.
          </p>
          <button className="bg-maroon text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300">
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Services