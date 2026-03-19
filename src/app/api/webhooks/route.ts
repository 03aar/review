import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const businessId = req.nextUrl.searchParams.get("businessId")
  if (!businessId) return NextResponse.json({ error: "businessId required" }, { status: 400 })

  const webhooks = await db
    .select()
    .from(schema.webhook)
    .where(eq(schema.webhook.businessId, businessId))
    .orderBy(desc(schema.webhook.createdAt))

  // Mask the secrets
  const masked = webhooks.map((w) => ({
    ...w,
    secret: w.secret.slice(0, 8) + "..." + w.secret.slice(-4),
  }))

  return NextResponse.json(masked)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { businessId, url, events } = body

  if (!businessId || !url || !events) {
    return NextResponse.json({ error: "businessId, url, and events required" }, { status: 400 })
  }

  // Validate URL
  try {
    new URL(url)
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 })
  }

  const secret = "whsec_" + crypto.randomUUID().replace(/-/g, "")

  const webhook = {
    id: crypto.randomUUID(),
    businessId,
    url: String(url),
    secret,
    events: JSON.stringify(events),
    active: true,
    failureCount: 0,
    lastDeliveredAt: null,
    lastFailedAt: null,
    createdAt: new Date(),
  }

  await db.insert(schema.webhook).values(webhook)

  return NextResponse.json({
    ...webhook,
    secret, // Return full secret only on creation
  }, { status: 201 })
}
