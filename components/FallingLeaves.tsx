'use client'
import { useEffect, useRef } from 'react'

export default function FallingLeaves() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const emojis = ['🍃', '🌿', '🍃', '🌱', '🍃', '🌿', '☘️']
    const leaves: HTMLSpanElement[] = []
    for (let i = 0; i < 16; i++) {
      const el = document.createElement('span')
      el.textContent = emojis[i % emojis.length]
      el.style.cssText = `position:absolute;left:${Math.random() * 100}%;top:-60px;font-size:${12 + Math.random() * 16}px;opacity:0;pointer-events:none;user-select:none;filter:opacity(.14);animation:leafFall ${12 + Math.random() * 22}s linear ${Math.random() * 20}s infinite;`
      c.appendChild(el)
      leaves.push(el)
    }
    return () => leaves.forEach((l) => l.remove())
  }, [])
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  )
}
