'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Save,
  RefreshCw,
  Eye,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Settings,
  Package,
  Tag,
  Globe,
  Zap,
} from 'lucide-react'
import type { SiteConfig } from '@/lib/config'
import { DEFAULT_CONFIG } from '@/lib/config'

const ADMIN_KEY = 'cannazen2025'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG)
  const [saving, setSaving] = useState(false)
  const [deploying, setDeploying] = useState(false)
  const [message, setMessage] = useState('')
  const [tab, setTab] = useState<
    'general' | 'hero' | 'promo' | 'shipping' | 'seo'
  >('general')
  const [newPromoCode, setNewPromoCode] = useState('')
  const [newPromoValue, setNewPromoValue] = useState(10)

  useEffect(() => {
    if (localStorage.getItem('cz_admin_auth') === ADMIN_KEY) {
      setAuthed(true)
      const saved = localStorage.getItem('cz_admin_config')
      if (saved) {
        try {
          setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(saved) })
        } catch {}
      }
    }
  }, [])

  const login = () => {
    if (password === ADMIN_KEY) {
      localStorage.setItem('cz_admin_auth', ADMIN_KEY)
      setAuthed(true)
    } else {
      setMessage('❌ Mot de passe incorrect')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const logout = () => {
    localStorage.removeItem('cz_admin_auth')
    setAuthed(false)
  }

  const save = async () => {
    setSaving(true)
    localStorage.setItem('cz_admin_config', JSON.stringify(config))
    try {
      await fetch('/api/admin/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY,
        },
        body: JSON.stringify({ config }),
      })
    } catch {}
    setMessage('✅ Configuration sauvegardée')
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const deploy = async () => {
    setDeploying(true)
    try {
      const res = await fetch('/api/admin/deploy', {
        method: 'POST',
        headers: { 'x-admin-key': ADMIN_KEY },
      })
      const data = await res.json()
      setMessage(
        data.success ? `🚀 ${data.message}` : `❌ ${data.error}`
      )
    } catch {
      setMessage('❌ Erreur de connexion')
    }
    setDeploying(false)
    setTimeout(() => setMessage(''), 5000)
  }

  const addPromo = () => {
    if (!newPromoCode) return
    setConfig((c) => ({
      ...c,
      promoCodes: {
        ...c.promoCodes,
        [newPromoCode.toUpperCase()]: newPromoValue,
      },
    }))
    setNewPromoCode('')
    setNewPromoValue(10)
  }

  const removePromo = (code: string) => {
    const newCodes = { ...config.promoCodes }
    delete newCodes[code]
    setConfig((c) => ({ ...c, promoCodes: newCodes }))
  }

  if (!authed)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#060d06' }}
      >
        <div
          className="text-center p-10 rounded-3xl max-w-sm w-full mx-4"
          style={{
            background: 'rgba(34,197,94,.04)',
            border: '1px solid rgba(34,197,94,.2)',
          }}
        >
          <div className="text-5xl mb-4">🔒</div>
          <div className="font-syne font-black text-2xl text-white mb-1">
            Canna<span className="tg-green">Zen</span>
          </div>
          <p className="text-white/40 text-sm mb-8">Panel Administrateur</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Mot de passe admin"
            className="input-dark mb-3"
            autoFocus
          />
          <button
            onClick={login}
            className="w-full py-3 text-black font-syne font-black rounded-2xl transition-all"
            style={{
              background: 'linear-gradient(135deg,#22c55e,#16a34a)',
            }}
          >
            <Lock size={16} className="inline mr-2" />
            Se connecter
          </button>
          {message && (
            <p className="mt-4 text-sm text-red-400">{message}</p>
          )}
          <p className="mt-6 text-[11px] text-white/20">
            Mot de passe par défaut : cannazen2025
          </p>
        </div>
      </div>
    )

  const TABS = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'hero', label: 'Hero', icon: Globe },
    { id: 'promo', label: 'Promos', icon: Tag },
    { id: 'shipping', label: 'Livraison', icon: Package },
    { id: 'seo', label: 'SEO', icon: Zap },
  ] as const

  return (
    <div className="min-h-screen" style={{ background: '#060d06' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 border-b border-green-900/30"
        style={{
          background: 'rgba(6,13,6,.95)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-syne font-black text-xl text-white">
              Canna<span className="tg-green">Zen</span> Admin
            </span>
            <span className="text-xs text-green-400/60 bg-green-900/30 px-2 py-0.5 rounded-full">
              Panel
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-white/50 hover:text-white border border-white/10 hover:border-white/25 rounded-xl text-sm transition-all"
            >
              <Eye size={14} /> Voir le site
            </a>
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 text-black font-syne font-bold rounded-xl text-sm transition-all"
              style={{
                background: 'linear-gradient(135deg,#22c55e,#16a34a)',
              }}
            >
              <Save size={14} />
              {saving ? 'Saving...' : 'Sauvegarder'}
            </button>
            <button
              onClick={deploy}
              disabled={deploying}
              className="flex items-center gap-1.5 px-4 py-2 text-white font-syne font-bold rounded-xl text-sm transition-all"
              style={{
                background: 'linear-gradient(135deg,#7c3aed,#5b21b6)',
              }}
            >
              <RefreshCw
                size={14}
                className={deploying ? 'animate-spin' : ''}
              />
              {deploying ? 'En cours...' : 'Redéployer'}
            </button>
            <button
              onClick={logout}
              className="p-2 text-white/40 hover:text-white rounded-xl hover:bg-white/[.08] transition-all"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl text-white font-syne font-bold text-sm shadow-2xl"
            style={{
              background:
                message.startsWith('✅') || message.startsWith('🚀')
                  ? '#16a34a'
                  : '#dc2626',
            }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-48 flex-shrink-0">
            <div className="space-y-1">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id as any)}
                  className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-syne font-bold transition-all text-left ${
                    tab === id
                      ? 'text-black'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                  style={
                    tab === id
                      ? {
                          background:
                            'linear-gradient(135deg,#22c55e,#16a34a)',
                        }
                      : {}
                  }
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
            <div
              className="mt-6 p-4 rounded-2xl text-xs space-y-2"
              style={{
                background: 'rgba(34,197,94,.04)',
                border: '1px solid rgba(34,197,94,.1)',
              }}
            >
              <p className="font-syne font-bold text-white text-sm mb-3">
                💡 Comment ça marche
              </p>
              <p className="text-white/40">1. Modifie les champs</p>
              <p className="text-white/40">2. Clique Sauvegarder</p>
              <p className="text-white/40">3. Clique Redéployer</p>
              <p className="text-white/40">
                4. Le site se met à jour en 2 min
              </p>
            </div>

            {/* Deploy hook instructions */}
            <div
              className="mt-4 p-4 rounded-2xl text-xs space-y-2"
              style={{
                background: 'rgba(124,58,237,.04)',
                border: '1px solid rgba(124,58,237,.1)',
              }}
            >
              <p className="font-syne font-bold text-white text-sm mb-3">
                🔗 Activer le redéploiement
              </p>
              <p className="text-white/40">
                1. Vercel → Settings → Git → Deploy Hooks
              </p>
              <p className="text-white/40">2. Create Hook → &quot;Admin Panel&quot;</p>
              <p className="text-white/40">3. Copier l&apos;URL</p>
              <p className="text-white/40">
                4. Environment Variables → VERCEL_DEPLOY_HOOK_URL
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {/* GENERAL */}
            {tab === 'general' && (
              <div className="space-y-5">
                <h2 className="font-syne font-black text-2xl text-white">
                  Paramètres Généraux
                </h2>
                <div
                  className="p-6 rounded-2xl space-y-4"
                  style={{
                    background: 'rgba(34,197,94,.03)',
                    border: '1px solid rgba(34,197,94,.1)',
                  }}
                >
                  <h3 className="font-syne font-bold text-white">
                    📢 Barre d&apos;annonce
                  </h3>
                  <textarea
                    value={config.announcementText}
                    onChange={(e) =>
                      setConfig((c) => ({
                        ...c,
                        announcementText: e.target.value,
                      }))
                    }
                    rows={3}
                    className="input-dark resize-none"
                    placeholder="Texte de la barre d'annonce..."
                  />
                  <p className="text-xs text-white/30">
                    Utilise • pour séparer les messages. Le texte défile en
                    boucle.
                  </p>
                </div>
                <div
                  className="p-6 rounded-2xl space-y-4"
                  style={{
                    background: 'rgba(34,197,94,.03)',
                    border: '1px solid rgba(34,197,94,.1)',
                  }}
                >
                  <h3 className="font-syne font-bold text-white">
                    ⚙️ Options
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="flex items-center justify-between p-4 rounded-xl"
                      style={{
                        background: 'rgba(255,255,255,.04)',
                        border: '1px solid rgba(255,255,255,.08)',
                      }}
                    >
                      <div>
                        <p className="text-white font-bold text-sm">
                          Age Gate +18
                        </p>
                        <p className="text-white/40 text-xs">
                          Confirmation d&apos;âge
                        </p>
                      </div>
                      <div
                        onClick={() =>
                          setConfig((c) => ({
                            ...c,
                            showAgeGate: !c.showAgeGate,
                          }))
                        }
                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${
                          config.showAgeGate ? 'bg-green-500' : 'bg-white/15'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            config.showAgeGate
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        />
                      </div>
                    </div>
                    <div
                      className="flex items-center justify-between p-4 rounded-xl"
                      style={{
                        background: 'rgba(255,255,255,.04)',
                        border: '1px solid rgba(255,255,255,.08)',
                      }}
                    >
                      <div>
                        <p className="text-white font-bold text-sm">
                          Mode maintenance
                        </p>
                        <p className="text-white/40 text-xs">
                          Fermer le site
                        </p>
                      </div>
                      <div
                        onClick={() =>
                          setConfig((c) => ({
                            ...c,
                            maintenanceMode: !c.maintenanceMode,
                          }))
                        }
                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${
                          config.maintenanceMode
                            ? 'bg-red-500'
                            : 'bg-white/15'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            config.maintenanceMode
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="p-6 rounded-2xl space-y-4"
                  style={{
                    background: 'rgba(34,197,94,.03)',
                    border: '1px solid rgba(34,197,94,.1)',
                  }}
                >
                  <h3 className="font-syne font-bold text-white">
                    📧 Contact
                  </h3>
                  <input
                    value={config.contactEmail}
                    onChange={(e) =>
                      setConfig((c) => ({
                        ...c,
                        contactEmail: e.target.value,
                      }))
                    }
                    className="input-dark"
                    placeholder="contact@cannazen.fr"
                  />
                </div>
              </div>
            )}

            {/* HERO */}
            {tab === 'hero' && (
              <div className="space-y-5">
                <h2 className="font-syne font-black text-2xl text-white">
                  Section Hero
                </h2>
                <div
                  className="p-6 rounded-2xl space-y-4"
                  style={{
                    background: 'rgba(34,197,94,.03)',
                    border: '1px solid rgba(34,197,94,.1)',
                  }}
                >
                  <h3 className="font-syne font-bold text-white">
                    Titre principal
                  </h3>
                  <input
                    value={config.heroTitle}
                    onChange={(e) =>
                      setConfig((c) => ({
                        ...c,
                        heroTitle: e.target.value,
                      }))
                    }
                    className="input-dark"
                    placeholder="Titre hero..."
                  />
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: 'rgba(34,197,94,.06)' }}
                  >
                    <p className="text-xs text-green-400/70 mb-1">
                      Aperçu :
                    </p>
                    <p className="font-syne font-black text-white text-lg leading-tight">
                      {config.heroTitle}
                    </p>
                  </div>
                </div>
                <div
                  className="p-6 rounded-2xl space-y-4"
                  style={{
                    background: 'rgba(34,197,94,.03)',
                    border: '1px solid rgba(34,197,94,.1)',
                  }}
                >
                  <h3 className="font-syne font-bold text-white">
                    Sous-titre
                  </h3>
                  <textarea
                    value={config.heroSubtitle}
                    onChange={(e) =>
                      setConfig((c) => ({
                        ...c,
                        heroSubtitle: e.target.value,
                      }))
                    }
                    rows={3}
                    className="input-dark resize-none"
                  />
                </div>
                <div
                  className="p-6 rounded-2xl space-y-4"
                  style={{
                    background: 'rgba(34,197,94,.03)',
                    border: '1px solid rgba(34,197,94,.1)',
                  }}
                >
                  <h3 className="font-syne font-bold text-white">
                    Boutons d&apos;action
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-white/50 mb-1 block">
                        Bouton principal
                      </label>
                      <input
                        value={config.heroCTA1Text}
                        onChange={(e) =>
                          setConfig((c) => ({
                            ...c,
                            heroCTA1Text: e.target.value,
                          }))
                        }
                        className="input-dark"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 mb-1 block">
                        Bouton secondaire
                      </label>
                      <input
                        value={config.heroCTA2Text}
                        onChange={(e) =>
                          setConfig((c) => ({
                            ...c,
                            heroCTA2Text: e.target.value,
                          }))
                        }
                        className="input-dark"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROMOS */}
            {tab === 'promo' && (
              <div className="space-y-5">
                <h2 className="font-syne font-black text-2xl text-white">
                  Codes Promo
                </h2>
                <div
                  className="p-6 rounded-2xl space-y-4"
                  style={{
                    background: 'rgba(34,197,94,.03)',
                    border: '1px solid rgba(34,197,94,.1)',
                  }}
                >
                  <h3 className="font-syne font-bold text-white">
                    Codes actifs
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(config.promoCodes).map(
                      ([code, value]) => (
                        <div
                          key={code}
                          className="flex items-center justify-between p-3 rounded-xl"
                          style={{
                            background: 'rgba(255,255,255,.04)',
                            border: '1px solid rgba(255,255,255,.08)',
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-syne font-black text-green-400 text-sm tracking-widest">
                              {code}
                            </span>
                            <span className="text-white/50 text-sm">→</span>
                            <span className="text-amber-400 font-bold text-sm">
                              -{value}%
                            </span>
                          </div>
                          <button
                            onClick={() => removePromo(code)}
                            className="text-red-400/50 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <input
                      value={newPromoCode}
                      onChange={(e) =>
                        setNewPromoCode(e.target.value.toUpperCase())
                      }
                      placeholder="CODE"
                      className="input-dark flex-1 uppercase font-syne font-bold tracking-widest"
                    />
                    <input
                      type="number"
                      value={newPromoValue}
                      onChange={(e) =>
                        setNewPromoValue(Number(e.target.value))
                      }
                      placeholder="%"
                      min="1"
                      max="90"
                      className="input-dark w-24 text-center"
                    />
                    <button
                      onClick={addPromo}
                      className="flex items-center gap-1.5 px-4 py-2 text-black font-syne font-bold rounded-xl text-sm transition-all whitespace-nowrap"
                      style={{
                        background:
                          'linear-gradient(135deg,#22c55e,#16a34a)',
                      }}
                    >
                      <Plus size={14} /> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SHIPPING */}
            {tab === 'shipping' && (
              <div className="space-y-5">
                <h2 className="font-syne font-black text-2xl text-white">
                  Livraison
                </h2>
                <div
                  className="p-6 rounded-2xl space-y-4"
                  style={{
                    background: 'rgba(34,197,94,.03)',
                    border: '1px solid rgba(34,197,94,.1)',
                  }}
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-white/60 mb-2 block font-syne font-bold">
                        Seuil livraison gratuite
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={config.freeShippingThreshold}
                          onChange={(e) =>
                            setConfig((c) => ({
                              ...c,
                              freeShippingThreshold: Number(e.target.value),
                            }))
                          }
                          className="input-dark"
                          min="0"
                        />
                        <span className="text-white/50">€</span>
                      </div>
                      <p className="text-xs text-white/30 mt-1">
                        Au-dessus de ce montant, la livraison est offerte
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-white/60 mb-2 block font-syne font-bold">
                        Frais Colissimo standard
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={config.standardShipping}
                          onChange={(e) =>
                            setConfig((c) => ({
                              ...c,
                              standardShipping: Number(e.target.value),
                            }))
                          }
                          className="input-dark"
                          min="0"
                          step="0.5"
                        />
                        <span className="text-white/50">€</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-4 rounded-xl"
                    style={{ background: 'rgba(34,197,94,.06)' }}
                  >
                    <p className="text-sm text-green-400 font-syne font-bold">
                      📦 Aperçu
                    </p>
                    <p className="text-white/60 text-sm mt-1">
                      Livraison gratuite dès{' '}
                      <strong className="text-white">
                        {config.freeShippingThreshold}€
                      </strong>{' '}
                      · Sinon{' '}
                      <strong className="text-white">
                        {config.standardShipping}€
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SEO */}
            {tab === 'seo' && (
              <div className="space-y-5">
                <h2 className="font-syne font-black text-2xl text-white">
                  SEO & Métadonnées
                </h2>
                <div
                  className="p-6 rounded-2xl space-y-4"
                  style={{
                    background: 'rgba(34,197,94,.03)',
                    border: '1px solid rgba(34,197,94,.1)',
                  }}
                >
                  <div>
                    <label className="text-sm text-white/60 mb-2 block font-syne font-bold">
                      Titre du site (onglet navigateur)
                    </label>
                    <input
                      value={config.siteTitle}
                      onChange={(e) =>
                        setConfig((c) => ({
                          ...c,
                          siteTitle: e.target.value,
                        }))
                      }
                      className="input-dark"
                    />
                    <p className="text-xs text-white/30 mt-1">
                      {config.siteTitle.length}/60 caractères recommandés
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-white/60 mb-2 block font-syne font-bold">
                      Description (Google)
                    </label>
                    <textarea
                      value={config.siteDescription}
                      onChange={(e) =>
                        setConfig((c) => ({
                          ...c,
                          siteDescription: e.target.value,
                        }))
                      }
                      rows={3}
                      className="input-dark resize-none"
                    />
                    <p className="text-xs text-white/30 mt-1">
                      {config.siteDescription.length}/160 caractères
                      recommandés
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
