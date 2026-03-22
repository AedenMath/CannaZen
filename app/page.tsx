'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Truck, Shield, Clock, Star } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import {
  CATEGORIES,
  getBestsellers,
  getNewArrivals,
  getOnSale,
} from '@/lib/products'

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

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOp = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const newArrivals = getNewArrivals().slice(0, 4)
  const bestsellers = getBestsellers().slice(0, 8)
  const onSale = getOnSale()

  const reviews = [
    {
      name: 'Thomas R.',
      text: 'Qualité incroyable, la Blueberry Muffin est un délice. Livraison rapide et discrète.',
      rating: 5,
    },
    {
      name: 'Marie L.',
      text: "Le Caramelo CBN m'aide énormément pour dormir. Meilleur CBD que j'ai testé.",
      rating: 5,
    },
    {
      name: 'Lucas D.',
      text: 'La Magic Sauce Crazy Dog est dévastatrice. Pas pour les débutants mais quel produit !',
      rating: 5,
    },
  ]

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
          />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOp }} className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">🌿 Boutique Cannabis Premium</span>
            <h1 className="font-syne font-black text-white leading-[1.05] mt-4" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
              La nature,{' '}
              <span className="tg-green">sublimée</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
              CBD, CBN, HEC-10, Magic Sauce, THCA — découvrez notre sélection de
              cannabinoïdes premium. Livraison discrète en 24/48h.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mt-10"
          >
            <Link
              href="/boutique"
              className="px-8 py-4 font-syne font-black text-black uppercase text-sm tracking-wider rounded-2xl"
              style={{
                background: 'linear-gradient(135deg,#22c55e,#16a34a)',
                boxShadow: '0 8px 32px rgba(34,197,94,.35)',
              }}
            >
              Explorer la boutique
            </Link>
            <Link
              href="/boutique?cat=magic-sauce"
              className="px-8 py-4 font-syne font-bold text-white uppercase text-sm tracking-wider rounded-2xl border border-white/10 hover:border-white/20 transition-colors"
            >
              Magic Sauce 🧪
            </Link>
          </motion.div>

          {/* Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 justify-center mt-8"
          >
            {['CBD', 'CBN', 'HEC-10', 'Magic Sauce', 'THCA', 'Delta-9'].map((chip) => (
              <span
                key={chip}
                className="px-3 py-1 text-xs text-white/40 border border-white/10 rounded-full"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom waves */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path className="wave-path-1" d="M0,80 C360,120 720,40 1440,80 L1440,120 L0,120 Z" />
          <path className="wave-path-2" d="M0,100 C480,60 960,120 1440,90 L1440,120 L0,120 Z" />
        </svg>
      </section>

      {/* DELIVERY BANNER */}
      <section className="py-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-8 justify-center">
          {[
            { icon: <Truck className="w-5 h-5" />, text: 'Livraison gratuite dès 49€' },
            { icon: <Shield className="w-5 h-5" />, text: '100% Légal France' },
            { icon: <Clock className="w-5 h-5" />, text: 'Expédié sous 24/48h' },
            { icon: <Star className="w-5 h-5" />, text: 'Certifié laboratoire' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-white/40 text-sm">
              <span className="text-green-400">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <span className="section-label">Catégories</span>
          <h2 className="section-title mb-10">Trouvez votre <span className="tg-green">produit</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/boutique?cat=${cat.slug}`}
                className="group p-4 rounded-2xl border border-white/[.06] bg-white/[.02] hover:bg-white/[.06] transition-all text-center"
                style={{
                  ['--cat-color' as any]: categoryColors[cat.slug] || '#22c55e',
                }}
              >
                <span className="text-3xl block mb-2">{cat.emoji}</span>
                <span className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NOUVEAUTÉS */}
      {newArrivals.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <span className="section-label">🆕 Nouveautés</span>
            <h2 className="section-title mb-10">Arrivages <span className="tg-green">récents</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BANNER HEC-10 + MAGIC SAUCE */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-4">
          <Link
            href="/boutique?cat=hec-10"
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 group"
            style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' }}
          >
            <div className="shimmer-overlay" />
            <span className="text-5xl">⚡</span>
            <h3 className="font-syne font-black text-white text-2xl mt-4">HEC-10</h3>
            <p className="text-white/60 text-sm mt-2 max-w-xs">
              L&apos;alternative puissante. Effets psychoactifs, légalité en zone grise.
            </p>
            <span className="inline-block mt-4 text-white/80 text-sm font-semibold group-hover:text-white transition-colors">
              Découvrir →
            </span>
          </Link>
          <Link
            href="/boutique?cat=magic-sauce"
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 group"
            style={{ background: 'linear-gradient(135deg, #9333ea 0%, #581c87 100%)' }}
          >
            <div className="shimmer-overlay" />
            <span className="text-5xl">🧪</span>
            <h3 className="font-syne font-black text-white text-2xl mt-4">Magic Sauce</h3>
            <p className="text-white/60 text-sm mt-2 max-w-xs">
              La formule secrète. Le plus puissant du catalogue. Réservé aux expérimentés.
            </p>
            <span className="inline-block mt-4 text-white/80 text-sm font-semibold group-hover:text-white transition-colors">
              Découvrir →
            </span>
          </Link>
        </div>
      </section>

      {/* SMALL BANNERS */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-3 gap-4">
          <Link
            href="/boutique?cat=thca"
            className="relative overflow-hidden rounded-2xl p-6 group"
            style={{ background: 'linear-gradient(135deg, #0d9488 0%, #134e4a 100%)' }}
          >
            <div className="shimmer-overlay" />
            <span className="text-3xl">💎</span>
            <h4 className="font-syne font-bold text-white text-lg mt-2">THCA</h4>
            <p className="text-white/50 text-xs mt-1">Se convertit en THC à la chaleur</p>
          </Link>
          <Link
            href="/boutique?cat=10-oh-hhc"
            className="relative overflow-hidden rounded-2xl p-6 group"
            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)' }}
          >
            <div className="shimmer-overlay" />
            <span className="text-3xl">🔬</span>
            <h4 className="font-syne font-bold text-white text-lg mt-2">10-OH-HHC</h4>
            <p className="text-white/50 text-xs mt-1">Effets doux et prolongés</p>
          </Link>
          <Link
            href="/boutique?cat=cbn"
            className="relative overflow-hidden rounded-2xl p-6 group"
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e3a5f 100%)' }}
          >
            <div className="shimmer-overlay" />
            <span className="text-3xl">🌙</span>
            <h4 className="font-syne font-bold text-white text-lg mt-2">CBN</h4>
            <p className="text-white/50 text-xs mt-1">La molécule du sommeil</p>
          </Link>
        </div>
      </section>

      {/* BESTSELLERS */}
      {bestsellers.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <span className="section-label">🏆 Bestsellers</span>
            <h2 className="section-title mb-10">Les plus <span className="tg-green">populaires</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bestsellers.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TRUST */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { emoji: '🚚', title: 'Livraison 24/48h', desc: 'Expédition rapide et discrète' },
            { emoji: '🔒', title: 'Paiement sécurisé', desc: 'CB, Virement, Bitcoin' },
            { emoji: '✅', title: '100% Légal', desc: 'THC < 0,3% certifié' },
            { emoji: '🔬', title: 'Lab tested', desc: 'Analyses certifiées' },
          ].map((item) => (
            <div key={item.title} className="space-y-2">
              <span className="text-4xl block">{item.emoji}</span>
              <h4 className="font-syne font-bold text-white text-sm">{item.title}</h4>
              <p className="text-xs text-white/40">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <span className="section-label">⭐ Avis clients</span>
          <h2 className="section-title mb-10">Ils nous font <span className="tg-green">confiance</span></h2>
          <div className="grid md:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="p-6 rounded-2xl border border-white/[.06] bg-white/[.02]"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  &quot;{review.text}&quot;
                </p>
                <p className="text-xs text-white/30 font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
