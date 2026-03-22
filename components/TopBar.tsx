'use client'
import { useState, useEffect } from 'react'

export default function TopBar() {
  const [paused, setPaused] = useState(false)
  const [msg, setMsg] = useState(
    '🚚 Livraison gratuite dès 49€   •   ✅ 100% Légal France   •   ⚡ Magic Farmers exclusivité   •   🌿 THC < 0,3% certifié   •   💳 CB · Virement · Bitcoin   •   🎁 Code WELCOME30 = -30%   •   📦 Expédié sous 24/48h   •   🔬 Certifié laboratoire'
  )
  useEffect(() => {
    const saved = localStorage.getItem('cz_admin_config')
    if (saved) {
      try {
        const config = JSON.parse(saved)
        if (config.announcementText) setMsg(config.announcementText)
      } catch {}
    }
  }, [])
  return (
    <div
      className="h-10 flex items-center overflow-hidden relative"
      style={{
        background: 'linear-gradient(90deg,#031503,#16a34a,#031503)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="shimmer-overlay opacity-40" />
      </div>
      <div
        className="mq-wrap w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="mq-track flex whitespace-nowrap animate-marquee"
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          <span className="text-white/95 text-[13px] px-6">
            {msg}     {msg}
          </span>
          <span className="text-white/95 text-[13px] px-6">
            {msg}     {msg}
          </span>
        </div>
      </div>
    </div>
  )
}
