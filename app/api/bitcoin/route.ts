import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { amount, orderId } = await req.json()
    const key = process.env.COINGATE_API_KEY
    if (!key || key.includes('REMPLACE'))
      return NextResponse.json(
        {
          error:
            'Configurez COINGATE_API_KEY dans Vercel > Settings > Environment Variables',
        },
        { status: 400 }
      )
    const res = await fetch('https://api.coingate.com/v2/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${key}`,
      },
      body: JSON.stringify({
        order_id: orderId,
        price_amount: amount,
        price_currency: 'EUR',
        receive_currency: 'BTC',
        title: 'Commande CannaZen',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/commande/confirmation`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/panier`,
      }),
    })
    const data = await res.json()
    return NextResponse.json({ paymentUrl: data.payment_url })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
