import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json()
    const key = process.env.STRIPE_SECRET_KEY
    if (!key || key.includes('REMPLACE'))
      return NextResponse.json(
        {
          error:
            'Configurez STRIPE_SECRET_KEY dans Vercel > Settings > Environment Variables',
        },
        { status: 400 }
      )
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(key)
    const subtotal = items.reduce(
      (s: number, i: any) => s + i.price * i.quantity,
      0
    )
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: items.map((i: any) => ({
        price_data: {
          currency: 'eur',
          product_data: { name: i.name, description: i.variantLabel },
          unit_amount: Math.round(i.price * 100),
        },
        quantity: i.quantity,
      })),
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: subtotal >= 49 ? 0 : 590,
              currency: 'eur',
            },
            display_name:
              subtotal >= 49 ? 'Livraison gratuite' : 'Colissimo',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://canna-zen.vercel.app'}/commande/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://canna-zen.vercel.app'}/panier`,
      locale: 'fr',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'DE', 'ES', 'IT', 'NL'],
      },
    })
    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
