import type { Metadata } from 'next'
import { Source_Serif_4, Inter, IBM_Plex_Mono, EB_Garamond, DM_Sans, Noto_Serif, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { PostHogProvider } from './providers'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'JinsooKim Design',
  description: 'Designer-friendly UX portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${inter.variable} ${ibmPlexMono.variable} ${ebGaramond.variable} ${dmSans.variable} ${notoSerif.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preload" href="/images/iphone-17-frame.png" as="image" />
        <link rel="preload" href="/images/aika/aika-daily.png" as="image" />
        <link rel="preload" href="/images/aika/aika-add-habit.png" as="image" />
      </head>
      <body className="min-h-screen flex flex-col font-sans text-base antialiased bg-black text-white">
        <PostHogProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  )
}
