'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, CreditCard, Building2, Bitcoin } from 'lucide-react'
import { useCart, fmt } from '@/lib/cart'
import { toast } from 'sonner'

const PROMO_CODES: Record<string, number> = {
  WELCOME30: 30,
  KUSH10: 10,
  CANNAZEN20: 20,
}

const SHIPPING_OPTIONS = [
  { id: 'standard', label: 'Colissimo standard', price: 5.9, delay: '2-3 jours' },
  { id: 'relay', label: 'Point relais', price: 3.9, delay: '3-5 jours' },
  { id: 'express', label: 'Chronopost Express', price: 9.9, delay: '24h' },
]

export default function PanierPage() {
  const router = useRouter()
  const { items, remove, setQty, total, clear } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string
    discount: number
  } | null>(null)
  const [shipping, setShipping] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'virement' | 'bitcoin'>('card')
  const [loading, setLoading] = useState(false)

  const subtotal = total()
  const shippingOption = SHIPPING_OPTIONS.find((s) => s.id === shipping)!
  const shippingCost = subtotal >= 49 ? 0 : shippingOption.price
  const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0
  const finalTotal = subtotal - discount + shippingCost

  const applyPromo = () => {
    const upper = promoCode.toUpperCase().trim()
    if (PROMO_CODES[upper]) {
      setAppliedPromo({ code: upper, discount: PROMO_CODES[upper] })
      toast.success(`Code ${upper} appliqué ! -${PROMO_CODES[upper]}%`)
    } else {
      toast.error('Code promo invalide')
    }
  }

  const handleCheckout = async () => {
    if (items.length === 0) return
    setLoading(true)

    try {
      if (paymentMethod === 'card') {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((i) => ({
              name: i.product.name,
              variantLabel: i.variant.label,
              price: i.variant.totalPrice * (appliedPromo ? (100 - appliedPromo.discount) / 100 : 1),
              quantity: i.qty,
            })),
          }),
        })
        const data = await res.json()
        if (data.url) {
          window.location.href = data.url
        } else {
          toast.error(data.error || 'Erreur de paiement')
        }
      } else if (paymentMethod === 'bitcoin') {
        const res = await fetch('/api/bitcoin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: finalTotal,
            orderId: `CZ-${Date.now()}`,
          }),
        })
        const data = await res.json()
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl
        } else {
          toast.error(data.error || 'Erreur Bitcoin')
        }
      } else {
        clear()
        router.push('/commande/confirmation')
      }
    } catch {
      toast.error('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-7xl mb-6"
        >
          🛒
        </motion.div>
        <h1 className="font-syne font-black text-2xl text-white mb-3">
          Votre panier est vide
        </h1>
        <p className="text-white/40 text-sm mb-8">
          Explorez notre boutique pour trouver votre bonheur
        </p>
        <Link
          href="/boutique"
          className="px-8 py-3 font-syne font-bold text-black uppercase text-sm rounded-2xl"
          style={{
            background: 'linear-gradient(135deg,#22c55e,#16a34a)',
          }}
        >
          Découvrir la boutique
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="font-syne font-black text-3xl text-white mb-8">
          Mon panier
        </h1>

        {/* Free shipping progress */}
        <div className="mb-8">
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400"
              animate={{
                width: `${Math.min((subtotal / 49) * 100, 100)}%`,
              }}
            />
          </div>
          <p className="text-xs text-white/40 mt-1.5">
            {subtotal >= 49
              ? '✅ Livraison gratuite débloquée !'
              : `Plus que ${fmt(49 - subtotal)} pour la livraison gratuite`}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.variant.label}`}
                className="flex gap-4 p-4 rounded-2xl bg-white/[.03] border border-white/[.06]"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 shrink-0 relative">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-syne font-bold text-white text-sm">
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-white/30">{item.variant.label}</p>
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
                    <Trash2 className="w-4 h-4" />
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
                      className="w-7 h-7 rounded-lg bg-white/10 text-white/60 flex items-center justify-center hover:bg-white/20"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm text-white font-bold w-5 text-center">
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
                      className="w-7 h-7 rounded-lg bg-white/10 text-white/60 flex items-center justify-center hover:bg-white/20"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Promo code */}
            <div className="p-5 rounded-2xl bg-white/[.03] border border-white/[.06]">
              <h3 className="font-syne font-bold text-white text-sm mb-3">
                Code promo
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Entrez votre code"
                  className="input-dark flex-1"
                />
                <button
                  onClick={applyPromo}
                  className="px-4 py-2 bg-green-500/20 text-green-400 text-xs font-bold rounded-xl hover:bg-green-500/30 transition-colors"
                >
                  OK
                </button>
              </div>
              {appliedPromo && (
                <p className="text-xs text-green-400 mt-2">
                  ✅ {appliedPromo.code} — {appliedPromo.discount}% de
                  réduction
                </p>
              )}
            </div>

            {/* Shipping */}
            <div className="p-5 rounded-2xl bg-white/[.03] border border-white/[.06]">
              <h3 className="font-syne font-bold text-white text-sm mb-3">
                Livraison
              </h3>
              <div className="space-y-2">
                {SHIPPING_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                      shipping === opt.id
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-white/[.02] border border-white/5 hover:bg-white/[.04]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={shipping === opt.id}
                      onChange={(e) => setShipping(e.target.value)}
                      className="accent-green-500"
                    />
                    <div className="flex-1">
                      <p className="text-xs text-white font-semibold">
                        {opt.label}
                      </p>
                      <p className="text-[10px] text-white/30">{opt.delay}</p>
                    </div>
                    <span className="text-xs text-white/50">
                      {subtotal >= 49 ? (
                        <span className="text-green-400">Gratuit</span>
                      ) : (
                        fmt(opt.price)
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment method */}
            <div className="p-5 rounded-2xl bg-white/[.03] border border-white/[.06]">
              <h3 className="font-syne font-bold text-white text-sm mb-3">
                Paiement
              </h3>
              <div className="space-y-2">
                {[
                  {
                    id: 'card' as const,
                    label: 'CB / Stripe',
                    icon: <CreditCard className="w-4 h-4" />,
                  },
                  {
                    id: 'virement' as const,
                    label: 'Virement SEPA',
                    icon: <Building2 className="w-4 h-4" />,
                  },
                  {
                    id: 'bitcoin' as const,
                    label: 'Bitcoin / Crypto',
                    icon: <Bitcoin className="w-4 h-4" />,
                  },
                ].map((pm) => (
                  <label
                    key={pm.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === pm.id
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-white/[.02] border border-white/5 hover:bg-white/[.04]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={pm.id}
                      checked={paymentMethod === pm.id}
                      onChange={() => setPaymentMethod(pm.id)}
                      className="accent-green-500"
                    />
                    <span className="text-green-400">{pm.icon}</span>
                    <span className="text-xs text-white font-semibold">
                      {pm.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="p-5 rounded-2xl bg-white/[.03] border border-white/[.06] space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Sous-total</span>
                <span className="text-white">{fmt(subtotal)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">
                    Remise ({appliedPromo.discount}%)
                  </span>
                  <span className="text-green-400">-{fmt(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Livraison</span>
                <span className="text-white">
                  {shippingCost === 0 ? (
                    <span className="text-green-400">Gratuite</span>
                  ) : (
                    fmt(shippingCost)
                  )}
                </span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="font-syne font-bold text-white">
                  Total TTC
                </span>
                <span className="font-syne font-black text-xl text-white">
                  {fmt(finalTotal)}
                </span>
              </div>
            </div>

            {/* Checkout button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 rounded-2xl font-syne font-black text-black uppercase text-sm tracking-wider flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg,#22c55e,#16a34a)',
                boxShadow: '0 8px 32px rgba(34,197,94,.35)',
              }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
              ) : (
                `Commander — ${fmt(finalTotal)}`
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
