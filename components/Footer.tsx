import Link from 'next/link'
import { CATEGORIES } from '@/lib/products'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#030a03]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-syne font-black text-2xl text-white">
                Canna<span className="tg-green">Zen</span>
              </span>
              <span className="text-xl">🌿</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Boutique en ligne de CBD et cannabinoïdes premium. Livraison
              discrète en France métropolitaine.
            </p>
            <div className="flex gap-2">
              <span className="badge-legal">✓ THC {'<'} 0,3%</span>
              <span className="badge-legal">✓ Légal FR</span>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-syne font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Boutique
            </h4>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/boutique?cat=${cat.slug}`}
                  className="block text-sm text-white/40 hover:text-white/70 transition-colors"
                >
                  {cat.emoji} {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-syne font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Informations
            </h4>
            <div className="space-y-2">
              <Link
                href="/boutique"
                className="block text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                Toute la boutique
              </Link>
              <Link
                href="/espace-pro"
                className="block text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                Espace Professionnel
              </Link>
              <Link
                href="/mon-compte"
                className="block text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                Mon compte
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-syne font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Légal
            </h4>
            <div className="space-y-2 text-sm text-white/40">
              <p>Mentions légales</p>
              <p>CGV</p>
              <p>Politique de confidentialité</p>
              <p>Politique de cookies</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-[11px] text-white/25 leading-relaxed text-center max-w-3xl mx-auto">
            ⚠️ Les produits vendus sur CannaZen contiennent un taux de THC
            inférieur à 0,3% conformément à la législation française et
            européenne en vigueur. Ces produits ne sont pas des médicaments et ne
            peuvent se substituer à un traitement médical. La vente est
            strictement interdite aux mineurs de moins de 18 ans. En commandant
            sur CannaZen, vous certifiez avoir l&apos;âge légal dans votre pays de
            résidence. Consommation déconseillée aux femmes enceintes ou
            allaitantes. Les produits en &quot;zone grise&quot; relèvent de molécules non
            encore classées — leur statut légal peut évoluer.
          </p>
          <p className="text-center text-[11px] text-white/20 mt-4">
            © 2025 CannaZen. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
