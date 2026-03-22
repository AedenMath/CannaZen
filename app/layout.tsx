import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import CanvasParticles from '@/components/CanvasParticles'
import FallingLeaves from '@/components/FallingLeaves'
import AgeGate from '@/components/AgeGate'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import CartDrawer from '@/components/CartDrawer'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'CannaZen — Premium Cannabis Légal',
  description:
    'Boutique en ligne de CBD, HEC-10, CBN, Magic Sauce et plus. Livraison discrète en France métropolitaine.',
  keywords: ['CBD', 'cannabis légal', 'HEC-10', 'CBN', 'Magic Sauce', 'THCA', 'boutique'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-[#060d06] text-[#f0fdf4] font-inter antialiased overflow-x-hidden">
        <CanvasParticles />
        <FallingLeaves />
        <AgeGate />
        <TopBar />
        <Navbar />
        <CartDrawer />
        <main className="relative z-10">{children}</main>
        <Footer />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0a1a0a',
              border: '1px solid rgba(34,197,94,.2)',
              color: '#f0fdf4',
            },
          }}
        />
      </body>
    </html>
  )
}
