'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import WigsSection from '@/components/WigsSection'
import HowItWorks from '@/components/HowItWorks'
import BookingForm from '@/components/BookingForm'
import AboutUs from '@/components/AboutUs'
import BlogSection from '@/components/BlogSection'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingBookButton from '@/components/FloatingBookButton'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for animations
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-maroon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-montserrat font-semibold text-maroon">Keshwala</h2>
          <p className="text-gray mt-2">Loading your beauty experience...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <Hero />
      <Services />
      <WigsSection />
      <HowItWorks />
      <BookingForm />
      <AboutUs />
      <BlogSection />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingBookButton />
    </main>
  )
}

