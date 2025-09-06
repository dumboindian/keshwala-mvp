'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const testimonials = [
    {
      id: 1,
      name: 'Priya Mehta',
      location: 'Mumbai',
      rating: 5,
      text: 'Keshwala transformed my hair completely! The stylist was so professional and made me feel comfortable throughout the entire process. I love my new look!',
      service: 'Hair Cut & Styling',
      image: '/api/placeholder/80/80',
    },
    {
      id: 2,
      name: 'Anita Sharma',
      location: 'Delhi',
      rating: 5,
      text: 'The wig fitting service was exceptional. They helped me find the perfect wig that looks so natural. I feel confident and beautiful again.',
      service: 'Wig Fitting',
      image: '/api/placeholder/80/80',
    },
    {
      id: 3,
      name: 'Rekha Patel',
      location: 'Bangalore',
      rating: 5,
      text: 'I was skeptical about at-home services, but Keshwala exceeded my expectations. The quality is amazing and the convenience is unbeatable.',
      service: 'Hair Coloring',
      image: '/api/placeholder/80/80',
    },
    {
      id: 4,
      name: 'Sunita Singh',
      location: 'Pune',
      rating: 5,
      text: 'The bridal hair service was perfect! They understood exactly what I wanted and delivered beyond my expectations. Highly recommended!',
      service: 'Bridal Hair & Makeup',
      image: '/api/placeholder/80/80',
    },
    {
      id: 5,
      name: 'Meera Joshi',
      location: 'Chennai',
      rating: 5,
      text: 'Professional, punctual, and amazing results. The monthly hair care subscription has been a game-changer for me.',
      service: 'Monthly Hair Care',
      image: '/api/placeholder/80/80',
    },
    {
      id: 6,
      name: 'Kavita Reddy',
      location: 'Hyderabad',
      rating: 5,
      text: 'The team is so friendly and skilled. They made me feel special and the results speak for themselves. Will definitely book again!',
      service: 'Wig Maintenance',
      image: '/api/placeholder/80/80',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index)
  }

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
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Keshwala.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-maroon text-white rounded-full shadow-lg flex items-center justify-center hover:bg-pink transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-maroon text-white rounded-full shadow-lg flex items-center justify-center hover:bg-pink transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Card */}
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-maroon to-pink rounded-2xl p-8 text-white"
          >
            <div className="text-center">
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Quote className="w-8 h-8 text-white" />
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl lg:text-2xl leading-relaxed mb-8 font-medium">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Client Info */}
              <div className="flex flex-col items-center">
                {/* Client Image */}
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">👩</span>
                </div>

                {/* Client Details */}
                <div className="text-center">
                  <h4 className="text-xl font-montserrat font-semibold mb-1">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-white/80 mb-2">
                    {testimonials[currentTestimonial].location}
                  </p>
                  <p className="text-sm text-white/70 mb-3">
                    {testimonials[currentTestimonial].service}
                  </p>

                  {/* Rating */}
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentTestimonial === index ? 'bg-maroon' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Happy Clients' },
              { number: '4.9/5', label: 'Average Rating' },
              { number: '1000+', label: 'Services Delivered' },
              { number: '98%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold font-montserrat text-maroon mb-2">
                  {stat.number}
                </div>
                <div className="text-gray">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
