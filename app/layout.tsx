import type { Metadata } from 'next'
import './globals.css'

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Provider from '@/components/Provider'

export const metadata: Metadata = {
  title: 'Car Showcase',
  description: 'Discover the best cars in the world',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Provider>
          <NavBar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
