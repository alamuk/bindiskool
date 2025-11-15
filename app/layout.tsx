import type { Metadata } from 'next'
import { Playfair_Display, Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@/lib/analytics'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BirdiSkool - Your private practice should set you free',
  description: 'BirdiSkool shows healthcare professionals how to turn skill into scale, so you can create the impact, income, and lifestyle you deserve.',
  keywords: 'healthcare business, private practice, medical practice growth, healthcare marketing, practice management',
  authors: [{ name: 'BirdiSkool' }],
  creator: 'BirdiSkool',
  publisher: 'BirdiSkool Ltd',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.birdiskool.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    title: 'BirdiSkool - Your private practice should set you free',
    description: 'BirdiSkool shows healthcare professionals how to turn skill into scale, so you can create the impact, income, and lifestyle you deserve.',
    siteName: 'BirdiSkool',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BirdiSkool - Healthcare Practice Growth',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BirdiSkool - Your private practice should set you free',
    description: 'BirdiSkool shows healthcare professionals how to turn skill into scale, so you can create the impact, income, and lifestyle you deserve.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${montserrat.variable}`}>
      <body className="font-inter bg-white text-brand-indigo antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
