import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Truck, CreditCard, PackageCheck } from 'lucide-react'
import { PRODUCTS, getBySlug, getRelated } from '@/lib/products'
import { fmt } from '@/lib/cart'
import AddToCartClient from '@/components/AddToCartClient'
import ProductCard from '@/components/ProductCard'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getBySlug(params.slug)
  if (!product) return { title: 'Produit introuvable' }
  return {
    title: `${product.name} — CannaZen`,
    description: product.description,
  }
}

export default function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = getBySlug(params.slug)
  if (!product) notFound()
  const related = getRelated(product, 4)

  return (
    <div className="min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-xs text-white/30">
          <Link href="/" className="hover:text-white/60 transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <Link
            href="/boutique"
            className="hover:text-white/60 transition-colors"
          >
            Boutique
          </Link>
          <span>/</span>
          <Link
            href={`/boutique?cat=${product.category}`}
            className="hover:text-white/60 transition-colors"
          >
            {product.category.replace(/-/g, ' ')}
          </Link>
          <span>/</span>
          <span className="text-white/50">{product.name}</span>
        </div>
      </div>

      {/* Product detail */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative group">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white/[.02] border border-white/[.06] relative">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.molecule && (
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full text-white"
                    style={{
                      background: product.moleculeColor || '#22c55e',
                    }}
                  >
                    {product.molecule}
                  </span>
                )}
                {product.isNew && <span className="badge-new">NEW</span>}
                {product.isOnSale && (
                  <span className="badge-sale">-{product.discountPct}%</span>
                )}
                {product.isOutOfStock && (
                  <span className="badge-rupture">Rupture</span>
                )}
              </div>
              <div className="absolute top-4 right-4">
                {product.legalStatus === 'legal' ? (
                  <span className="badge-legal">✓ Légal</span>
                ) : (
                  <span className="badge-grey">⚠ Zone grise</span>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-wider mb-1">
                {product.category.replace(/-/g, ' ')}
              </p>
              <h1 className="font-syne font-black text-4xl text-white">
                {product.name}
              </h1>
              {product.molecule && (
                <span
                  className="inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{
                    background: product.moleculeColor || '#22c55e',
                  }}
                >
                  {product.molecule}
                </span>
              )}
            </div>

            <p className="text-white/50 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Warning note */}
            {product.warningNote && (
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <p className="text-orange-400 text-sm font-semibold">
                  ⚠️ {product.warningNote}
                </p>
              </div>
            )}

            {/* Legal note */}
            {product.legalNote && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-green-400 text-sm">
                  ✓ {product.legalNote}
                </p>
              </div>
            )}

            {/* Smokellier */}
            <div className="p-5 rounded-2xl bg-white/[.03] border border-white/[.06]">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
                🍷 Le Smokellier
              </p>
              <p className="text-white/70 text-sm italic leading-relaxed">
                &quot;{product.smokellierQuote}&quot;
              </p>
              <div className="flex gap-6 mt-3">
                <div>
                  <span className="text-xs text-white/30">Goût</span>
                  <p className="font-syne font-bold text-green-400">
                    {product.tasteScore}/10
                  </p>
                </div>
                <div>
                  <span className="text-xs text-white/30">Effet</span>
                  <p className="font-syne font-bold text-green-400">
                    {product.effectScore}/10
                  </p>
                </div>
              </div>
            </div>

            {/* Aromas */}
            <div>
              <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
                Arômes
              </p>
              <div className="flex flex-wrap gap-2">
                {product.aromas.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1 text-xs text-white/50 border border-white/10 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Effects */}
            <div>
              <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
                Effets
              </p>
              <div className="flex flex-wrap gap-2">
                {product.effects.map((e) => (
                  <span
                    key={e}
                    className="px-3 py-1 text-xs text-green-400/60 bg-green-500/10 border border-green-500/20 rounded-full"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <AddToCartClient product={product} />

            {/* Info icons */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto text-green-400 mb-1" />
                <p className="text-[10px] text-white/30">Livraison 24/48h</p>
              </div>
              <div className="text-center">
                <CreditCard className="w-5 h-5 mx-auto text-green-400 mb-1" />
                <p className="text-[10px] text-white/30">Paiement sécurisé</p>
              </div>
              <div className="text-center">
                <PackageCheck className="w-5 h-5 mx-auto text-green-400 mb-1" />
                <p className="text-[10px] text-white/30">Emballage discret</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-20">
          <span className="section-label">Produits similaires</span>
          <h2 className="section-title mb-8">
            Vous aimerez <span className="tg-green">aussi</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
