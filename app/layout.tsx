import type { Metadata } from 'next';
import './globals.css';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import StoreProvider from '@/components/StoreProvides';

export const metadata: Metadata = {
  title: 'Car Showcase',
  description: 'Discover the best cars in the world',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className="relative">
        <StoreProvider>
          <NavBar session={session} />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
