'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Eye, Check } from 'lucide-react'
import { toast } from 'sonner'
import { useCart, fmt } from '@/lib/cart'
import type { Product } from '@/lib/types'

export default function ProductCard({ product }: { product: Product }) {
  const cart = useCart()
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [addState, setAddState] = useState<'idle' | 'adding' | 'added'>('idle')
  const v = product.variants[selectedIdx]

  const handleAdd = () => {
    if (!v?.inStock || product.isOutOfStock) return
    setAddState('adding')
    setTimeout(() => {
      cart.add(product, v)
      setAddState('added')
      toast.success(`${product.name} ajouté au panier`, {
        description: v.label,
      })
      setTimeout(() => setAddState('idle'), 1500)
    }, 300)
  }

  return (
    <div className="group card-hover rounded-2xl border border-white/[.06] bg-white/[.02] overflow-hidden relative">
      {/* Shimmer */}
      <div className="shimmer-overlay rounded-2xl" />

      {/* Image */}
      <Link href={`/produit/${product.slug}`} className="block relative aspect-square overflow-hidden bg-black/20">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-medium border border-white/20">
            <Eye className="w-3.5 h-3.5" /> Aperçu rapide
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.molecule && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: product.moleculeColor || '#22c55e' }}
            >
              {product.molecule}
            </span>
          )}
          {product.isNew && <span className="badge-new">NEW</span>}
          {product.isOnSale && (
            <span className="badge-sale">-{product.discountPct}%</span>
          )}
          {product.isOutOfStock && <span className="badge-rupture">Rupture</span>}
          {product.isHigh && (
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="badge-high"
            >
              HIGH+++
            </motion.span>
          )}
        </div>

        {/* Legal badge */}
        <div className="absolute top-2 right-2">
          {product.legalStatus === 'legal' ? (
            <span className="badge-legal">✓ Légal</span>
          ) : (
            <span className="badge-grey">⚠ Zone grise</span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 space-y-2.5">
        <div>
          <p className="text-[10px] text-white/30 uppercase tracking-wider">
            {product.category.replace(/-/g, ' ')}
          </p>
          <h3 className="font-syne font-bold text-white text-sm mt-0.5 truncate">
            {product.name}
          </h3>
        </div>

        {/* Scores */}
        <div className="flex gap-3 text-[10px] text-white/40">
          <span>Goût {product.tasteScore}/10</span>
          <span>Effet {product.effectScore}/10</span>
        </div>

        {/* Variants */}
        <div className="flex flex-wrap gap-1">
          {product.variants.map((variant, idx) => (
            <button
              key={variant.label}
              onClick={() => setSelectedIdx(idx)}
              className={`text-[11px] px-2 py-1 rounded-lg border transition-all ${
                idx === selectedIdx
                  ? 'bg-green-500/20 border-green-500/50 text-green-400'
                  : variant.inStock
                    ? 'border-white/10 text-white/50 hover:border-white/20'
                    : 'border-white/5 text-white/20 line-through'
              }`}
              disabled={!variant.inStock}
            >
              {variant.label}
            </button>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-syne font-black text-white text-lg">
            {fmt(v.totalPrice)}
          </span>
          {v.discount && (
            <span className="text-xs text-green-400 font-semibold">
              -{v.discount}%
            </span>
          )}
        </div>

        {/* Add to cart */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          disabled={!v?.inStock || product.isOutOfStock || addState !== 'idle'}
          className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            product.isOutOfStock || !v?.inStock
              ? 'bg-white/5 text-white/20 cursor-not-allowed'
              : addState === 'added'
                ? 'bg-green-500 text-black'
                : addState === 'adding'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20'
          }`}
        >
          {product.isOutOfStock ? (
            'Rupture de stock'
          ) : addState === 'added' ? (
            <>
              <Check className="w-3.5 h-3.5" /> Ajouté
            </>
          ) : addState === 'adding' ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"
            />
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" /> Ajouter
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
