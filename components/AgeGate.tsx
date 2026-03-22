'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AgeGate() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      if (!localStorage.getItem('cz_age_v3')) setShow(true)
    }, 100)
  }, [])
  const confirm = () => {
    localStorage.setItem('cz_age_v3', '1')
    setShow(false)
  }
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%,#031503 0%,#020a02 50%,#010201 100%)',
          }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 22,
              delay: 0.1,
            }}
            className="relative text-center px-10 py-12 max-w-sm mx-4 rounded-3xl"
            style={{
              background: 'rgba(34,197,94,.04)',
              border: '1px solid rgba(34,197,94,.18)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 32px 80px rgba(0,0,0,.8)',
            }}
          >
            <span className="font-syne font-black text-4xl text-white tracking-tight">
              Canna<span className="tg-green">Zen</span>
            </span>
            <span className="ml-2 text-3xl">🌿</span>
            <p className="text-[11px] text-white/35 uppercase tracking-[.22em] mt-1 mb-8">
              Boutique CBD Premium
            </p>
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="text-5xl mb-5 inline-block"
            >
              🔞
            </motion.div>
            <h2 className="font-syne font-black text-xl text-white mb-3 uppercase">
              Réservé aux +18 ans
            </h2>
            <p className="text-white/45 text-sm mb-10 leading-relaxed">
              En accédant à CannaZen vous confirmez avoir 18 ans ou plus. Nos
              produits sont conformes à la législation française.
            </p>
            <div className="flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={confirm}
                className="w-full py-4 font-syne font-black text-base text-black uppercase tracking-wide rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg,#22c55e,#16a34a)',
                  boxShadow: '0 8px 32px rgba(34,197,94,.45)',
                }}
              >
                ✓ J&apos;ai 18 ans ou plus
              </motion.button>
              <button
                onClick={() => window.location.replace('https://google.fr')}
                className="w-full py-3 border border-white/10 text-white/40 hover:text-white/65 text-sm rounded-2xl transition-all"
              >
                J&apos;ai moins de 18 ans
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
