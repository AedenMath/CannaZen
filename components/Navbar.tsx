'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { CATEGORIES } from '@/lib/products'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const cart = useCart()
  const count = cart.count()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navGroups = [
    {
      label: '🌿 Fleurs CBD',
      items: [
        { label: 'Fleurs CBD', href: '/boutique?cat=fleur-cbd' },
        { label: 'Californiennes', href: '/boutique?cat=fleur-californienne' },
      ],
    },
    {
      label: '🧱 Résines',
      items: [
        { label: 'Résines CBD', href: '/boutique?cat=resine-cbd' },
      ],
    },
    {
      label: '⚡ Alternatives',
      items: [
        { label: 'HEC-10', href: '/boutique?cat=hec-10' },
        { label: 'Magic Sauce', href: '/boutique?cat=magic-sauce' },
        { label: '10-OH-HHC', href: '/boutique?cat=10-oh-hhc' },
        { label: 'THCA', href: '/boutique?cat=thca' },
        { label: 'Delta-9', href: '/boutique?cat=delta-9' },
      ],
    },
    {
      label: '🌙 CBN',
      items: [{ label: 'CBN Sommeil', href: '/boutique?cat=cbn' }],
    },
    {
      label: '💨 Puffs',
      items: [{ label: 'Puffs & Vapes', href: '/boutique?cat=puff-vape' }],
    },
    {
      label: '🍪 Comestibles',
      items: [
        { label: 'Cookies', href: '/boutique?cat=cookies' },
      ],
    },
  ]

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#060d06]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'bg-gradient-to-b from-green-950/80 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-syne font-black text-2xl text-white tracking-tight">
              Canna<span className="tg-green">Zen</span>
            </span>
            <span className="text-xl">🌿</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/boutique"
              className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              Boutique
            </Link>
            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(group.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5 flex items-center gap-1">
                  {group.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {activeDropdown === group.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 py-2 min-w-[200px] rounded-xl border border-white/10 bg-[#0a1a0a]/95 backdrop-blur-xl shadow-2xl"
                    >
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link
              href="/boutique?sale=true"
              className="px-3 py-2 text-sm text-amber-400 hover:text-amber-300 transition-colors rounded-lg hover:bg-white/5"
            >
              Promos 🔥
            </Link>
            <Link
              href="/espace-pro"
              className="px-3 py-2 text-sm text-green-400 hover:text-green-300 transition-colors rounded-lg hover:bg-white/5"
            >
              Espace PRO ⭐
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => cart.open(true)}
              className="relative p-2 text-white/70 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 text-black text-[10px] font-black flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#060d06]/98 backdrop-blur-xl overflow-y-auto pt-20 px-6 pb-10 lg:hidden"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 p-2 text-white/60"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="space-y-1">
              <Link
                href="/boutique"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg text-white/80 hover:text-white border-b border-white/5"
              >
                🛒 Toute la boutique
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/boutique?cat=${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-lg text-white/60 hover:text-white border-b border-white/5"
                >
                  {cat.emoji} {cat.label}
                </Link>
              ))}
              <Link
                href="/boutique?sale=true"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg text-amber-400 border-b border-white/5"
              >
                🔥 Promotions
              </Link>
              <Link
                href="/espace-pro"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg text-green-400 border-b border-white/5"
              >
                ⭐ Espace PRO
              </Link>
              <Link
                href="/mon-compte"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-lg text-white/60 hover:text-white border-b border-white/5"
              >
                👤 Mon compte
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
