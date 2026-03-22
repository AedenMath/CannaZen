import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CannaZen — Premium Cannabis Légal',
  description: 'Boutique en ligne de CBD, HEC-10, CBN et plus. Livraison discrète en France.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
