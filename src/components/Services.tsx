'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Scissors, Sparkles, Crown, Heart, Calendar, Star } from 'lucide-react'

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
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

  const services = [
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

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

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
          <p className="text-xl text-gray max-w-3xl mx-auto">
            Professional hair and wig care services delivered to your doorstep with love and expertise
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
                  : 'bg-pink/30 text-maroon hover:bg-pink/50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
            >
              {/* Service Image */}
              <div className="relative h-48 bg-gradient-to-br from-maroon/20 to-pink/20 flex items-center justify-center">
                <div className="w-16 h-16 bg-maroon/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-maroon" />
                </div>
                <div className="absolute top-4 right-4 bg-maroon text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {service.price}
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-montserrat font-semibold text-maroon mb-3">
                  {service.title}
                </h3>
                <p className="text-gray mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray">
                      <div className="w-2 h-2 bg-pink rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full btn-primary group-hover:bg-maroon/90"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-maroon to-pink rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-montserrat font-bold mb-4">
              Don't See What You're Looking For?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              We offer custom services tailored to your specific needs. Contact us to discuss your requirements.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-maroon px-8 py-3 rounded-lg font-semibold hover:bg-pink transition-colors duration-300"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services

