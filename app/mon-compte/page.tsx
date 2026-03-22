'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function MonComptePage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.info('Fonctionnalité en cours de développement')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <h1 className="font-syne font-black text-3xl text-white text-center mb-2">
          Mon compte
        </h1>
        <p className="text-white/40 text-sm text-center mb-8">
          Connectez-vous pour suivre vos commandes
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-white/40 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="input-dark"
              required
            />
          </div>
          <div>
            <label className="text-xs text-white/40 mb-1 block">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-dark"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3.5 rounded-2xl font-syne font-bold text-black uppercase text-sm"
            style={{
              background: 'linear-gradient(135deg,#22c55e,#16a34a)',
              boxShadow: '0 8px 32px rgba(34,197,94,.35)',
            }}
          >
            Se connecter
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
