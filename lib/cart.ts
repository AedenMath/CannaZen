'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, Product, Variant } from './types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  add: (p: Product, v: Variant) => void
  remove: (id: string, label: string) => void
  setQty: (id: string, label: string, qty: number) => void
  clear: () => void
  open: (v: boolean) => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (p, v) =>
        set((s) => {
          const ex = s.items.find(
            (i) => i.product.id === p.id && i.variant.label === v.label
          )
          if (ex)
            return {
              items: s.items.map((i) =>
                i.product.id === p.id && i.variant.label === v.label
                  ? { ...i, qty: i.qty + 1 }
                  : i
              ),
              isOpen: true,
            }
          return {
            items: [...s.items, { product: p, variant: v, qty: 1 }],
            isOpen: true,
          }
        }),
      remove: (id, label) =>
        set((s) => ({
          items: s.items.filter(
            (i) => !(i.product.id === id && i.variant.label === label)
          ),
        })),
      setQty: (id, label, qty) => {
        if (qty <= 0) {
          get().remove(id, label)
          return
        }
        set((s) => ({
          items: s.items.map((i) =>
            i.product.id === id && i.variant.label === label
              ? { ...i, qty }
              : i
          ),
        }))
      },
      clear: () => set({ items: [] }),
      open: (v) => set({ isOpen: v }),
      total: () =>
        get().items.reduce((s, i) => s + i.variant.totalPrice * i.qty, 0),
      count: () => get().items.reduce((s, i) => s + i.qty, 0),
    }),
    {
      name: 'cannazen-cart-v3',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    }
  )
)

export const fmt = (n: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(n)
