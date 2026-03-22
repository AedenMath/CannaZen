'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart, fmt } from '@/lib/cart'

export default function CartDrawer() {
  const { items, isOpen, open, remove, setQty, total, count } = useCart()
  const t = total()
  const FREE_SHIPPING = 49
  const progress = Math.min((t / FREE_SHIPPING) * 100, 100)
  const remaining = Math.max(FREE_SHIPPING - t, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => open(false)}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-[71] w-full max-w-md bg-[#0a1a0a] border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h2 className="font-syne font-black text-lg text-white">
                Panier ({count()})
              </h2>
              <button
                onClick={() => open(false)}
                className="p-2 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping progress */}
            <div className="px-5 pt-4 pb-2">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-white/50 mt-1.5">
                {remaining > 0
                  ? `Plus que ${fmt(remaining)} pour la livraison gratuite 🚚`
                  : '✅ Livraison gratuite débloquée !'}
              </p>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    🛒
                  </motion.div>
                  <p className="text-white/40 text-sm">Votre panier est vide</p>
                  <Link
                    href="/boutique"
                    onClick={() => open(false)}
                    className="mt-4 text-green-400 text-sm hover:underline"
                  >
                    Découvrir la boutique →
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.variant.label}`}
                    className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 shrink-0 relative">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-white/40">{item.variant.label}</p>
                      <p className="text-sm font-bold text-green-400 mt-1">
                        {fmt(item.variant.totalPrice)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() =>
                          remove(item.product.id, item.variant.label)
                        }
                        className="text-white/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setQty(
                              item.product.id,
                              item.variant.label,
                              item.qty - 1
                            )
                          }
                          className="w-6 h-6 rounded-md bg-white/10 text-white/60 flex items-center justify-center hover:bg-white/20"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm text-white w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() =>
                            setQty(
                              item.product.id,
                              item.variant.label,
                              item.qty + 1
                            )
                          }
                          className="w-6 h-6 rounded-md bg-white/10 text-white/60 flex items-center justify-center hover:bg-white/20"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Sous-total</span>
                  <span className="text-white font-bold">{fmt(t)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Livraison</span>
                  <span className="text-white">
                    {t >= FREE_SHIPPING ? (
                      <span className="text-green-400">Gratuite</span>
                    ) : (
                      fmt(5.9)
                    )}
                  </span>
                </div>
                <Link
                  href="/panier"
                  onClick={() => open(false)}
                  className="block w-full py-3.5 text-center font-syne font-black text-black uppercase text-sm rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg,#22c55e,#16a34a)',
                    boxShadow: '0 8px 32px rgba(34,197,94,.35)',
                  }}
                >
                  Commander — {fmt(t + (t >= FREE_SHIPPING ? 0 : 5.9))}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
