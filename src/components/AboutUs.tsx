'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Users, Heart, Star, Quote } from 'lucide-react'

const AboutUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Founder & Lead Stylist',
      image: '/api/placeholder/200/200',
      experience: '8+ years',
      specialty: 'Bridal Hair & Wig Styling',
      description: 'Passionate about making every client feel beautiful and confident.',
    },
    {
      name: 'Anita Patel',
      role: 'Senior Hair Stylist',
      image: '/api/placeholder/200/200',
      experience: '6+ years',
      specialty: 'Hair Coloring & Cutting',
      description: 'Expert in modern hair techniques and color trends.',
    },
    {
      name: 'Rekha Singh',
      role: 'Wig Specialist',
      image: '/api/placeholder/200/200',
      experience: '5+ years',
      specialty: 'Wig Fitting & Maintenance',
      description: 'Dedicated to helping clients find their perfect wig solution.',
    },
  ]

  const stats = [
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Award, value: '50+', label: 'Expert Stylists' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: Heart, value: '1000+', label: 'Services Delivered' },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mission & Vision */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-montserrat font-bold text-maroon mb-6">
            About Keshwala
          </h2>
          <p className="text-xl text-gray max-w-3xl mx-auto mb-12">
            We believe that everyone deserves to feel confident and beautiful. Our mission is to bring professional hair and wig care services directly to your doorstep.
          </p>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-maroon to-pink rounded-2xl p-8 text-white"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-montserrat font-bold mb-4">Our Mission</h3>
              <p className="text-lg leading-relaxed">
                To provide accessible, professional hair and wig care services that boost confidence and bring out the natural beauty in every client, all from the comfort of their own home.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-pink to-maroon rounded-2xl p-8 text-white"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-montserrat font-bold mb-4">Our Vision</h3>
              <p className="text-lg leading-relaxed">
                To become the leading at-home beauty service provider, revolutionizing how people access professional hair and wig care while maintaining the highest standards of quality and customer satisfaction.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-maroon/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-maroon" />
              </div>
              <div className="text-3xl font-bold font-montserrat text-maroon mb-2">
                {stat.value}
              </div>
              <div className="text-gray">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-montserrat font-bold text-maroon text-center mb-12">
            Meet Our Team
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center card-hover group"
              >
                {/* Member Image */}
                <div className="w-32 h-32 bg-gradient-to-br from-maroon/20 to-pink/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">👩‍💼</span>
                </div>

                {/* Member Info */}
                <h4 className="text-xl font-montserrat font-semibold text-maroon mb-2">
                  {member.name}
                </h4>
                <p className="text-pink font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray mb-3">{member.experience} experience</p>
                <p className="text-sm font-medium text-maroon mb-3">{member.specialty}</p>
                <p className="text-sm text-gray leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-gradient-to-r from-maroon to-pink rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-montserrat font-bold mb-4">Our Values</h3>
            <p className="text-lg opacity-90">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Quality',
                description: 'We use only the finest products and techniques to ensure exceptional results.',
              },
              {
                title: 'Comfort',
                description: 'Your comfort and convenience are our top priorities in every service.',
              },
              {
                title: 'Trust',
                description: 'We build lasting relationships based on trust, reliability, and transparency.',
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                <p className="text-sm opacity-90 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUs

