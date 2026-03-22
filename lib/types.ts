export type LegalStatus = 'legal' | 'grey-zone'

export type Category =
  | 'fleur-cbd'
  | 'fleur-californienne'
  | 'resine-cbd'
  | 'hec-10'
  | '10-oh-hhc'
  | 'thca'
  | 'magic-sauce'
  | 'cbn'
  | 'puff-vape'
  | 'delta-9'
  | 'cookies'
  | 'accessoires'

export interface Variant {
  label: string
  pricePerUnit: number
  totalPrice: number
  discount?: number
  inStock: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  legalStatus: LegalStatus
  legalNote?: string
  warningNote?: string
  consumptionNote?: string
  smokellierQuote: string
  tasteScore: number
  effectScore: number
  description: string
  aromas: string[]
  effects: string[]
  variants: Variant[]
  images: string[]
  molecule?: string
  moleculeColor?: string
  isNew: boolean
  isBestSeller: boolean
  isOnSale: boolean
  discountPct?: number
  stock: number
  isHigh?: boolean
  isOutOfStock?: boolean
}

export interface CartItem {
  product: Product
  variant: Variant
  qty: number
}
