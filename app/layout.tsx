import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast';
import './globals.css'
import { CartProvider } from '@/providers/CartProvider';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';

const poppins = Poppins({ subsets: ['latin'], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: 'E-Shop',
  description: 'Ecommerce app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster toastOptions={{
          style: {
            background: 'rgb(51 65 85)',
            color: '#fff'
          }
        }} />
        <CartProvider>
          <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-grow bg-slate-100'>
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
};
