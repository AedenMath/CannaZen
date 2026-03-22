export interface SiteConfig {
  announcementText: string
  heroTitle: string
  heroSubtitle: string
  heroCTA1Text: string
  heroCTA2Text: string
  freeShippingThreshold: number
  standardShipping: number
  promoCodes: Record<string, number>
  showAgeGate: boolean
  maintenanceMode: boolean
  siteTitle: string
  siteDescription: string
  contactEmail: string
  instagramUrl: string
  primaryColor: string
}

export const DEFAULT_CONFIG: SiteConfig = {
  announcementText:
    '🚚 Livraison gratuite dès 49€   •   ✅ 100% Légal France   •   ⚡ Magic Farmers exclusivité   •   🌿 THC < 0,3% certifié   •   💳 CB · Virement · Bitcoin   •   🎁 Code WELCOME30 = -30%   •   📦 Expédié sous 24/48h   •   🔬 Certifié laboratoire',
  heroTitle: 'Fleurs CBD, HEC-10, THCA, Magic Sauce & CBN',
  heroSubtitle:
    "L'alternative légale la plus puissante du marché. 100+ produits sélectionnés. THC < 0,3% certifié laboratoire. Livraison gratuite dès 49€.",
  heroCTA1Text: 'Découvrir la boutique',
  heroCTA2Text: 'HEC-10 — HIGH +++',
  freeShippingThreshold: 49,
  standardShipping: 5.9,
  promoCodes: {
    WELCOME30: 30,
    KUSH10: 10,
    BA69YKAUBK: 10,
    CANNAZEN20: 20,
  },
  showAgeGate: true,
  maintenanceMode: false,
  siteTitle: 'CannaZen | CBD, HEC-10, THCA, Magic Sauce — La référence',
  siteDescription:
    'CannaZen — Fleurs CBD, HEC-10, THCA, Magic Sauce, CBN. 100% légal France. Livraison gratuite dès 49€.',
  contactEmail: 'contact@cannazen.fr',
  instagramUrl: 'https://instagram.com/cannazen.fr',
  primaryColor: '#22c55e',
}
