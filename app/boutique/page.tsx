'use client'
import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS, CATEGORIES } from '@/lib/products'
import type { Category } from '@/lib/types'

function BoutiqueContent() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat') as Category | null
  const saleParam = searchParams.get('sale')

  const [activeCat, setActiveCat] = useState<Category | null>(catParam)
  const [legalOnly, setLegalOnly] = useState(false)
  const [sort, setSort] = useState('pertinence')

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]

    if (saleParam === 'true') {
      list = list.filter((p) => p.isOnSale)
    }
    if (activeCat) {
      list = list.filter((p) => p.category === activeCat)
    }
    if (legalOnly) {
      list = list.filter((p) => p.legalStatus === 'legal')
    }

    switch (sort) {
      case 'nouveautes':
        list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew))
        break
      case 'promo':
        list.sort((a, b) => (b.discountPct || 0) - (a.discountPct || 0))
        break
      case 'prix-asc':
        list.sort(
          (a, b) => a.variants[0].totalPrice - b.variants[0].totalPrice
        )
        break
      case 'prix-desc':
        list.sort(
          (a, b) => b.variants[0].totalPrice - a.variants[0].totalPrice
        )
        break
    }

    return list
  }, [activeCat, legalOnly, sort, saleParam])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/30 to-transparent" />
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path
            className="wave-path-1"
            d="M0,40 C360,60 720,20 1440,40 L1440,60 L0,60 Z"
          />
        </svg>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="section-label">🛒 Boutique</span>
          <h1 className="section-title">
            {saleParam === 'true'
              ? 'Promotions 🔥'
              : activeCat
                ? CATEGORIES.find((c) => c.slug === activeCat)?.label ||
                  'Boutique'
                : 'Toute la boutique'}
          </h1>
          <p className="text-white/40 text-sm mt-3">
            {filtered.length} produit{filtered.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCat(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              !activeCat
                ? 'bg-green-500 text-black'
                : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
            }`}
          >
            Tout
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCat(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCat === cat.slug
                  ? 'text-black'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
              }`}
              style={
                activeCat === cat.slug
                  ? { background: categoryColors[cat.slug] || '#22c55e' }
                  : undefined
              }
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <label className="flex items-center gap-2 text-xs text-white/50 cursor-pointer">
            <input
              type="checkbox"
              checked={legalOnly}
              onChange={(e) => setLegalOnly(e.target.checked)}
              className="accent-green-500"
            />
            Légal uniquement
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white/60 outline-none"
          >
            <option value="pertinence">Pertinence</option>
            <option value="nouveautes">Nouveautés</option>
            <option value="promo">Promotions</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
          </select>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-white/40 text-sm mb-4">Aucun produit trouvé</p>
            <button
              onClick={() => {
                setActiveCat(null)
                setLegalOnly(false)
              }}
              className="text-green-400 text-sm hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const categoryColors: Record<string, string> = {
  'fleur-cbd': '#22c55e',
  'fleur-californienne': '#f59e0b',
  'resine-cbd': '#a16207',
  'hec-10': '#06b6d4',
  '10-oh-hhc': '#14b8a6',
  thca: '#f43f5e',
  'magic-sauce': '#ec4899',
  cbn: '#8b5cf6',
  'puff-vape': '#6366f1',
  'delta-9': '#eab308',
  cookies: '#f97316',
  accessoires: '#6b7280',
}

export default function BoutiquePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white/30 text-sm">Chargement...</div>
        </div>
      }
    >
      <BoutiqueContent />
    </Suspense>
  )
}
