import type { Metadata, Viewport } from 'next'
import { Montserrat, Lato, Poppins } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700'],
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700'],
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Keshwala - At-Home Hair, Wig & Grooming Services',
  description: 'Personalized Hair & Wig Care Delivered at Your Doorstep. Professional styling, wig solutions, and grooming services in the comfort of your home.',
  keywords: 'hair services, wig care, at-home grooming, hair styling, beauty services, bridal hair, wig fitting, hair coloring, professional stylist',
  authors: [{ name: 'Keshwala Team' }],
  creator: 'Keshwala',
  publisher: 'Keshwala',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://keshwala.com',
    title: 'Keshwala - At-Home Hair, Wig & Grooming Services',
    description: 'Personalized Hair & Wig Care Delivered at Your Doorstep. Professional styling, wig solutions, and grooming services in the comfort of your home.',
    siteName: 'Keshwala',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Keshwala - Professional Hair & Wig Care Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keshwala - At-Home Hair, Wig & Grooming Services',
    description: 'Personalized Hair & Wig Care Delivered at Your Doorstep',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable} ${poppins.variable}`}>
      <body className="font-lato bg-cream text-brown">
        {children}
      </body>
    </html>
  )
}

