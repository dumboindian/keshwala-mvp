'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Star, Clock, Shield } from 'lucide-react'

const WigsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const wigs = [
    {
      id: 1,
      name: 'Silky Straight Wig',
      type: 'Synthetic',
      price: '₹3,500',
      image: '/api/placeholder/300/400',
      description: 'Luxurious straight hair with natural shine and movement',
      features: ['Heat Resistant', 'Easy Maintenance', 'Natural Look'],
      rating: 4.9,
      reviews: 127,
    },
    {
      id: 2,
      name: 'Curly Bob Wig',
      type: 'Human Hair',
      price: '₹8,500',
      image: '/api/placeholder/300/400',
      description: 'Beautiful curly bob with bounce and volume',
      features: ['100% Human Hair', 'Stylable', 'Long Lasting'],
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      name: 'Wavy Long Wig',
      type: 'Synthetic',
      price: '₹4,200',
      image: '/api/placeholder/300/400',
      description: 'Elegant wavy hair perfect for special occasions',
      features: ['Tangle Free', 'Color Safe', 'Comfortable Cap'],
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: 'Pixie Cut Wig',
      type: 'Human Hair',
      price: '₹6,800',
      image: '/api/placeholder/300/400',
      description: 'Modern pixie cut with texture and style',
      features: ['Professional Grade', 'Easy Styling', 'Natural Hairline'],
      rating: 4.9,
      reviews: 73,
    },
    {
      id: 5,
      name: 'Bridal Wig',
      type: 'Human Hair',
      price: '₹12,000',
      image: '/api/placeholder/300/400',
      description: 'Special bridal collection with premium quality',
      features: ['Wedding Ready', 'Luxury Quality', 'Custom Styling'],
      rating: 5.0,
      reviews: 45,
    },
    {
      id: 6,
      name: 'Hair Patch',
      type: 'Hair Extension',
      price: '₹2,500',
      image: '/api/placeholder/300/400',
      description: 'Hair patches for thinning areas and volume',
      features: ['Natural Blend', 'Easy Application', 'Comfortable'],
      rating: 4.6,
      reviews: 98,
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(wigs.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(wigs.length / 3)) % Math.ceil(wigs.length / 3))
  }

  const visibleWigs = wigs.slice(currentSlide * 3, (currentSlide + 1) * 3)

  return (
    <section id="wigs" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-montserrat font-bold text-maroon mb-6">
            Wigs & Hair Solutions
          </h2>
          <p className="text-xl text-gray max-w-3xl mx-auto">
            Discover our premium collection of wigs and hair solutions, designed to boost your confidence and style
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-maroon hover:bg-pink transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-maroon hover:bg-pink transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Wigs Grid */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visibleWigs.map((wig, index) => (
              <motion.div
                key={wig.id}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
              >
                {/* Wig Image */}
                <div className="relative h-64 bg-gradient-to-br from-maroon/10 to-pink/10 flex items-center justify-center">
                  <div className="w-20 h-20 bg-maroon/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">💇‍♀️</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-maroon text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {wig.type}
                  </div>
                  <div className="absolute top-4 right-4 bg-pink text-maroon px-3 py-1 rounded-full text-sm font-semibold">
                    {wig.price}
                  </div>
                </div>

                {/* Wig Content */}
                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-semibold text-maroon mb-2">
                    {wig.name}
                  </h3>
                  <p className="text-gray mb-4 text-sm leading-relaxed">
                    {wig.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(wig.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray">
                      {wig.rating} ({wig.reviews} reviews)
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {wig.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray">
                        <div className="w-2 h-2 bg-pink rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 btn-primary text-sm"
                    >
                      Book Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 border border-maroon text-maroon rounded-lg text-sm hover:bg-maroon hover:text-white transition-colors duration-300"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(Math.ceil(wigs.length / 3))].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? 'bg-maroon' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-maroon to-pink rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-montserrat font-bold mb-4">
                Wig Care Subscription Plans
              </h3>
              <p className="text-lg opacity-90">
                Keep your wigs looking perfect with our maintenance plans
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Basic Care',
                  price: '₹500/mo',
                  features: ['Monthly Cleaning', 'Basic Styling', 'Storage Tips'],
                  icon: Clock,
                },
                {
                  name: 'Premium Care',
                  price: '₹1,200/mo',
                  features: ['Bi-weekly Maintenance', 'Professional Styling', 'Deep Cleaning'],
                  icon: Star,
                },
                {
                  name: 'Luxury Care',
                  price: '₹2,000/mo',
                  features: ['Weekly Maintenance', 'Custom Styling', 'Priority Service'],
                  icon: Shield,
                },
              ].map((plan, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
                  <div className="text-2xl font-bold mb-4">{plan.price}</div>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-pink rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WigsSection
