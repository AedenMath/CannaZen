'use client'
import { motion } from 'framer-motion'
import { Building2, Mail, Phone } from 'lucide-react'

export default function EspaceProPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg text-center"
      >
        <span className="text-5xl block mb-4">⭐</span>
        <h1 className="font-syne font-black text-3xl text-white mb-4">
          Espace <span className="tg-green">Professionnel</span>
        </h1>
        <p className="text-white/50 text-sm leading-relaxed mb-8">
          Vous êtes un professionnel du CBD (boutique, distributeur, grossiste) ?
          Accédez à nos tarifs B2B exclusifs, nos conditions de gros et notre
          catalogue complet. Minimum de commande : 500€ HT.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-white/[.03] border border-white/[.06]">
            <Building2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-xs text-white/50">Tarifs grossiste</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[.03] border border-white/[.06]">
            <Mail className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-xs text-white/50">Support dédié</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[.03] border border-white/[.06]">
            <Phone className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-xs text-white/50">Ligne directe</p>
          </div>
        </div>

        <a
          href="mailto:pro@cannazen.fr"
          className="inline-block px-8 py-4 rounded-2xl font-syne font-black text-black uppercase text-sm tracking-wider"
          style={{
            background: 'linear-gradient(135deg,#22c55e,#16a34a)',
            boxShadow: '0 8px 32px rgba(34,197,94,.35)',
          }}
        >
          Contactez-nous — pro@cannazen.fr
        </a>
      </motion.div>
    </div>
  )
}
