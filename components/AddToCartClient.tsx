'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'
import { toast } from 'sonner'
import { useCart, fmt } from '@/lib/cart'
import type { Product } from '@/lib/types'

export default function AddToCartClient({ product }: { product: Product }) {
  const cart = useCart()
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [addState, setAddState] = useState<'idle' | 'loading' | 'done'>('idle')
  const v = product.variants[selectedIdx]

  const handleAdd = () => {
    if (!v?.inStock) return
    setAddState('loading')
    setTimeout(() => {
      cart.add(product, v)
      setAddState('done')
      toast.success(`${product.name} ajouté au panier`, { description: v.label })
      setTimeout(() => setAddState('idle'), 2000)
    }, 400)
  }

  return (
    <div className="space-y-5">
      {/* Variants grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {product.variants.map((variant, idx) => (
          <motion.button
            key={variant.label}
            onClick={() => variant.inStock && setSelectedIdx(idx)}
            whileTap={{ scale: 0.95 }}
            className={`relative p-3 rounded-xl border text-center transition-all ${
              idx === selectedIdx
                ? 'bg-green-500/15 border-green-500/50'
                : variant.inStock
                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                  : 'bg-white/[.02] border-white/5 opacity-40 cursor-not-allowed'
            }`}
            disabled={!variant.inStock}
          >
            {idx === selectedIdx && (
              <motion.div
                layoutId="variant-select"
                className="absolute inset-0 rounded-xl border-2 border-green-500/60"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span
              className={`text-sm font-bold block ${
                idx === selectedIdx ? 'text-green-400' : 'text-white/70'
              }`}
            >
              {variant.label}
            </span>
            <span className="text-xs text-white/40 block mt-0.5">
              {fmt(variant.totalPrice)}
            </span>
            {variant.discount && (
              <span className="text-[10px] text-green-400 font-bold">
                -{variant.discount}%
              </span>
            )}
            {!variant.inStock && (
              <span className="text-[9px] text-red-400 block mt-0.5">
                Rupture
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Selected price */}
      <div className="flex items-baseline gap-3">
        <span className="font-syne font-black text-3xl text-white">
          {fmt(v.totalPrice)}
        </span>
        <span className="text-sm text-white/40">
          ({fmt(v.pricePerUnit)}/unité)
        </span>
        {v.discount && (
          <span className="text-sm font-bold text-green-400">
            -{v.discount}%
          </span>
        )}
      </div>

      {/* Add button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleAdd}
        disabled={!v?.inStock || addState !== 'idle'}
        className={`w-full py-4 rounded-2xl font-syne font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-all ${
          addState === 'done'
            ? 'bg-green-500 text-black'
            : addState === 'loading'
              ? 'bg-green-500/20 text-green-400'
              : !v?.inStock
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : 'text-black'
        }`}
        style={
          addState === 'idle' && v?.inStock
            ? {
                background: 'linear-gradient(135deg,#22c55e,#16a34a)',
                boxShadow: '0 8px 32px rgba(34,197,94,.35)',
              }
            : undefined
        }
      >
        {addState === 'done' ? (
          <>
            <Check className="w-5 h-5" /> Ajouté au panier
          </>
        ) : addState === 'loading' ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full"
          />
        ) : !v?.inStock ? (
          'Rupture de stock'
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" /> Ajouter au panier
          </>
        )}
      </motion.button>

      {/* Consumption note */}
      {product.consumptionNote && (
        <p className="text-xs text-white/30 text-center italic">
          💡 {product.consumptionNote}
        </p>
      )}
    </div>
  )
}
