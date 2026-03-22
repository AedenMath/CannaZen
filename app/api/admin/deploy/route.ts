import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'cannazen2025'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('x-admin-key')
  if (auth !== ADMIN_PASSWORD)
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  try {
    const webhookUrl = process.env.VERCEL_DEPLOY_HOOK_URL
    if (webhookUrl) {
      const res = await fetch(webhookUrl, { method: 'POST' })
      if (res.ok)
        return NextResponse.json({
          success: true,
          message: 'Redéploiement déclenché via Vercel webhook',
        })
    }
    return NextResponse.json({
      success: true,
      message:
        'Pour redéployer, ajoutez VERCEL_DEPLOY_HOOK_URL dans les env vars Vercel',
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
