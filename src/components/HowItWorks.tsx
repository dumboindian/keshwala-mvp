'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, Calendar, Home, Heart } from 'lucide-react'

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const steps = [
    {
      number: '01',
      title: 'Choose Service',
      description: 'Browse our services and select what you need - haircut, styling, wig care, or special event services.',
      icon: Search,
      color: 'from-maroon to-pink',
    },
    {
      number: '02',
      title: 'Pick Date & Time',
      description: 'Select your preferred date and time slot. We offer flexible scheduling to fit your busy lifestyle.',
      icon: Calendar,
      color: 'from-pink to-maroon',
    },
    {
      number: '03',
      title: 'Professional Visits You',
      description: 'Our expert stylist arrives at your doorstep with all necessary tools and premium products.',
      icon: Home,
      color: 'from-maroon to-pink',
    },
    {
      number: '04',
      title: 'Enjoy Your New Look',
      description: 'Relax and enjoy your transformation. We ensure you leave feeling confident and beautiful.',
      icon: Heart,
      color: 'from-pink to-maroon',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-montserrat font-bold text-maroon mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray max-w-3xl mx-auto">
            Getting your dream hair has never been easier. Follow these simple steps to book your appointment.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-maroon text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                {step.number}
              </div>

              {/* Step Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full card-hover group">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-montserrat font-semibold text-maroon mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-gray text-center leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-maroon to-pink transform -translate-y-1/2 z-0" />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-maroon to-pink rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-montserrat font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Book your appointment today and experience professional hair care at home
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-maroon px-8 py-3 rounded-lg font-semibold hover:bg-pink transition-colors duration-300"
            >
              Book Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks
