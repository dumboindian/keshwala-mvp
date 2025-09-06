import type { Metadata } from 'next'
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
  keywords: 'hair services, wig care, at-home grooming, hair styling, beauty services',
  authors: [{ name: 'Keshwala Team' }],
  viewport: 'width=device-width, initial-scale=1',
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

