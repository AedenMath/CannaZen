'use client'
import { useEffect, useRef } from 'react'

export default function CanvasParticles() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const ps: any[] = []
    const resize = () => {
      canvas.width = innerWidth
      canvas.height = innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    const mk = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: Math.random() * 2.5 + 0.4,
      vy: -(Math.random() * 0.6 + 0.15),
      vx: (Math.random() - 0.5) * 0.25,
      op: 0,
      maxOp: Math.random() * 0.5 + 0.08,
      hue:
        Math.random() > 0.6
          ? 120 + Math.random() * 40
          : Math.random() > 0.5
            ? 270 + Math.random() * 30
            : 200 + Math.random() * 20,
      phase: Math.random() * Math.PI * 2,
      glow: Math.random() * 10 + 4,
      life: 0,
      maxLife: Math.random() * 300 + 200,
    })
    for (let i = 0; i < 100; i++) {
      const p = mk()
      p.y = Math.random() * canvas.height
      p.op = Math.random() * p.maxOp
      p.life = Math.random() * p.maxLife
      ps.push(p)
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const t = Date.now() * 0.0005
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]
        p.x += p.vx + Math.sin(t + p.phase) * 0.12
        p.y += p.vy
        p.life++
        if (p.life < 60) p.op = Math.min(p.maxOp, p.op + 0.008)
        else if (p.life > p.maxLife - 60)
          p.op = Math.max(0, p.op - 0.008)
        else p.op = Math.min(p.maxOp, p.op + 0.003)
        if (p.y < -20 || p.life >= p.maxLife) {
          ps[i] = mk()
          continue
        }
        ctx.save()
        ctx.shadowBlur = p.glow
        ctx.shadowColor = `hsla(${p.hue},80%,65%,${p.op})`
        ctx.fillStyle = `hsla(${p.hue},75%,65%,${p.op})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])
  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}
