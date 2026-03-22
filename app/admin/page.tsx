'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Eye, Settings, Lock } from 'lucide-react'
import { toast } from 'sonner'

interface AdminConfig {
  announcementText: string
  freeShippingThreshold: number
  promoCode: string
  promoDiscount: number
  heroTitle: string
  heroSubtitle: string
  maintenanceMode: boolean
  ageGateEnabled: boolean
}

const DEFAULT_CONFIG: AdminConfig = {
  announcementText:
    '🚚 Livraison gratuite dès 49€ • ✅ 100% Légal France • 🎁 Code WELCOME30 = -30%',
  freeShippingThreshold: 49,
  promoCode: 'WELCOME30',
  promoDiscount: 30,
  heroTitle: 'La nature, sublimée',
  heroSubtitle:
    'CBD, CBN, HEC-10, Magic Sauce, THCA — découvrez notre sélection premium.',
  maintenanceMode: false,
  ageGateEnabled: true,
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [config, setConfig] = useState<AdminConfig>(DEFAULT_CONFIG)

  useEffect(() => {
    const auth = localStorage.getItem('cz_admin_auth')
    if (auth === '1') setAuthenticated(true)
    const saved = localStorage.getItem('cz_admin_config')
    if (saved) {
      try {
        setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(saved) })
      } catch {}
    }
  }, [])

  const login = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setAuthenticated(true)
      localStorage.setItem('cz_admin_auth', '1')
      toast.success('Connexion réussie')
    } else {
      toast.error('Mot de passe incorrect')
    }
  }

  const save = () => {
    localStorage.setItem('cz_admin_config', JSON.stringify(config))
    toast.success('Configuration sauvegardée')
  }

  const update = <K extends keyof AdminConfig>(
    key: K,
    value: AdminConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h1 className="font-syne font-black text-2xl text-white">
              Admin Panel
            </h1>
            <p className="text-white/40 text-sm mt-1">
              CannaZen Administration
            </p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe admin"
              className="input-dark"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 rounded-2xl font-syne font-bold text-black uppercase text-sm"
              style={{
                background: 'linear-gradient(135deg,#22c55e,#16a34a)',
              }}
            >
              Connexion
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-green-400" />
            <h1 className="font-syne font-black text-2xl text-white">
              Admin Panel
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white/60 text-sm hover:bg-white/10 transition-colors border border-white/10"
            >
              <Eye className="w-4 h-4" /> Prévisualiser
            </button>
            <button
              onClick={save}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-black text-sm font-bold"
              style={{
                background: 'linear-gradient(135deg,#22c55e,#16a34a)',
              }}
            >
              <Save className="w-4 h-4" /> Sauvegarder
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Announcement */}
          <div className="p-6 rounded-2xl bg-white/[.03] border border-white/[.06]">
            <h3 className="font-syne font-bold text-white text-sm mb-4">
              📢 Barre d&apos;annonce
            </h3>
            <textarea
              value={config.announcementText}
              onChange={(e) => update('announcementText', e.target.value)}
              className="input-dark h-20 resize-none"
            />
          </div>

          {/* Free shipping */}
          <div className="p-6 rounded-2xl bg-white/[.03] border border-white/[.06]">
            <h3 className="font-syne font-bold text-white text-sm mb-4">
              🚚 Seuil livraison gratuite
            </h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={config.freeShippingThreshold}
                onChange={(e) =>
                  update('freeShippingThreshold', Number(e.target.value))
                }
                className="input-dark w-32"
              />
              <span className="text-white/40 text-sm">€</span>
            </div>
          </div>

          {/* Promo code */}
          <div className="p-6 rounded-2xl bg-white/[.03] border border-white/[.06]">
            <h3 className="font-syne font-bold text-white text-sm mb-4">
              🎁 Code promo actif
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/40 mb-1 block">Code</label>
                <input
                  type="text"
                  value={config.promoCode}
                  onChange={(e) => update('promoCode', e.target.value)}
                  className="input-dark"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">
                  Réduction (%)
                </label>
                <input
                  type="number"
                  value={config.promoDiscount}
                  onChange={(e) =>
                    update('promoDiscount', Number(e.target.value))
                  }
                  className="input-dark"
                />
              </div>
            </div>
          </div>

          {/* Hero */}
          <div className="p-6 rounded-2xl bg-white/[.03] border border-white/[.06]">
            <h3 className="font-syne font-bold text-white text-sm mb-4">
              🏠 Hero (page d&apos;accueil)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-white/40 mb-1 block">
                  Titre
                </label>
                <input
                  type="text"
                  value={config.heroTitle}
                  onChange={(e) => update('heroTitle', e.target.value)}
                  className="input-dark"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">
                  Sous-titre
                </label>
                <textarea
                  value={config.heroSubtitle}
                  onChange={(e) => update('heroSubtitle', e.target.value)}
                  className="input-dark h-16 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="p-6 rounded-2xl bg-white/[.03] border border-white/[.06]">
            <h3 className="font-syne font-bold text-white text-sm mb-4">
              ⚙️ Paramètres
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-white/60">
                  Mode maintenance
                </span>
                <div
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    config.maintenanceMode ? 'bg-red-500' : 'bg-white/10'
                  }`}
                  onClick={() =>
                    update('maintenanceMode', !config.maintenanceMode)
                  }
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      config.maintenanceMode
                        ? 'translate-x-6'
                        : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-white/60">
                  Vérification d&apos;âge (+18)
                </span>
                <div
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    config.ageGateEnabled ? 'bg-green-500' : 'bg-white/10'
                  }`}
                  onClick={() =>
                    update('ageGateEnabled', !config.ageGateEnabled)
                  }
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                      config.ageGateEnabled
                        ? 'translate-x-6'
                        : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem('cz_admin_auth')
              setAuthenticated(false)
            }}
            className="text-sm text-white/30 hover:text-white/60 transition-colors"
          >
            Déconnexion admin
          </button>
        </div>
      </div>
    </div>
  )
}
