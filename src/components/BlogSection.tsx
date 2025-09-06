'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const BlogSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const blogPosts = [
    {
      id: 1,
      title: '5 Essential Hair Care Tips for Winter',
      excerpt: 'Keep your hair healthy and beautiful during the cold winter months with these expert tips.',
      image: '/api/placeholder/400/250',
      category: 'Hair Care',
      date: 'Dec 15, 2023',
      readTime: '5 min read',
      author: 'Priya Sharma',
    },
    {
      id: 2,
      title: 'How to Choose the Perfect Wig for Your Face Shape',
      excerpt: 'Find the ideal wig style that complements your face shape and enhances your natural beauty.',
      image: '/api/placeholder/400/250',
      category: 'Wig Care',
      date: 'Dec 10, 2023',
      readTime: '7 min read',
      author: 'Rekha Singh',
    },
    {
      id: 3,
      title: 'Bridal Hair Trends for 2024',
      excerpt: 'Discover the latest bridal hair trends and styles that will make you look stunning on your special day.',
      image: '/api/placeholder/400/250',
      category: 'Bridal',
      date: 'Dec 5, 2023',
      readTime: '6 min read',
      author: 'Anita Patel',
    },
    {
      id: 4,
      title: 'At-Home Hair Color Maintenance Guide',
      excerpt: 'Learn how to maintain your hair color at home and keep it looking fresh between salon visits.',
      image: '/api/placeholder/400/250',
      category: 'Hair Care',
      date: 'Nov 28, 2023',
      readTime: '8 min read',
      author: 'Priya Sharma',
    },
    {
      id: 5,
      title: 'Wig Styling Techniques for Beginners',
      excerpt: 'Master the basics of wig styling with these simple techniques that anyone can learn.',
      image: '/api/placeholder/400/250',
      category: 'Wig Care',
      date: 'Nov 20, 2023',
      readTime: '4 min read',
      author: 'Rekha Singh',
    },
    {
      id: 6,
      title: 'The Science Behind Hair Growth',
      excerpt: 'Understand the biology of hair growth and learn natural ways to promote healthy hair growth.',
      image: '/api/placeholder/400/250',
      category: 'Hair Care',
      date: 'Nov 15, 2023',
      readTime: '9 min read',
      author: 'Anita Patel',
    },
  ]

  const categories = ['All', 'Hair Care', 'Wig Care', 'Bridal', 'Tips']

  return (
    <section id="blog" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-montserrat font-bold text-maroon mb-6">
            Beauty Tips & Blog
          </h2>
          <p className="text-xl text-gray max-w-3xl mx-auto">
            Stay updated with the latest hair care tips, styling techniques, and beauty trends from our experts
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
              key={category}
              className="px-6 py-3 rounded-full font-medium transition-all duration-300 bg-white text-maroon hover:bg-maroon hover:text-white shadow-md hover:shadow-lg"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
            >
              {/* Post Image */}
              <div className="relative h-48 bg-gradient-to-br from-maroon/20 to-pink/20 flex items-center justify-center">
                <div className="w-16 h-16 bg-maroon/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📝</span>
                </div>
                <div className="absolute top-4 left-4 bg-maroon text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {post.category}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <h3 className="text-xl font-montserrat font-semibold text-maroon mb-3 group-hover:text-pink transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray mb-4 leading-relaxed text-sm">
                  {post.excerpt}
                </p>

                {/* Post Meta */}
                <div className="flex items-center justify-between text-sm text-gray mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <div className="text-sm text-maroon font-medium mb-4">
                  By {post.author}
                </div>

                {/* Read More Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-maroon font-medium group-hover:text-pink transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.article>
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
              Stay Updated with Our Latest Tips
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Subscribe to our newsletter and get expert beauty tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-maroon placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-maroon px-6 py-3 rounded-lg font-semibold hover:bg-pink transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogSection

