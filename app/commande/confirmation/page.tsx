'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-syne font-black text-3xl text-white mt-8 mb-4">
            Commande confirmée !
          </h1>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Merci pour votre commande ! Vous recevrez un email de confirmation
            avec les détails de suivi. Expédition sous 24/48h.
          </p>
          <Link
            href="/boutique"
            className="inline-block px-8 py-3 font-syne font-bold text-black uppercase text-sm rounded-2xl"
            style={{
              background: 'linear-gradient(135deg,#22c55e,#16a34a)',
              boxShadow: '0 8px 32px rgba(34,197,94,.35)',
            }}
          >
            Retour à la boutique
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
