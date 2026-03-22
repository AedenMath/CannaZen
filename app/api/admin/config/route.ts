import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'cannazen2025'

export async function GET(req: NextRequest) {
  const auth = req.headers.get('x-admin-key')
  if (auth !== ADMIN_PASSWORD)
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json({ success: true, config: null })
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('x-admin-key')
  if (auth !== ADMIN_PASSWORD)
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { config } = await req.json()
  console.log('Config admin mise à jour:', config)
  return NextResponse.json({ success: true, message: 'Config sauvegardée' })
}
