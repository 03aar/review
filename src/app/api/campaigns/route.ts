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

  const campaigns = await db
    .select()
    .from(schema.campaign)
    .where(eq(schema.campaign.businessId, businessId))
    .orderBy(desc(schema.campaign.createdAt))

  return NextResponse.json(campaigns)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { businessId, name, type, messageTemplate, subject } = body

  if (!businessId || !name) {
    return NextResponse.json({ error: "businessId and name required" }, { status: 400 })
  }

  const now = new Date()
  const newCampaign = {
    id: crypto.randomUUID(),
    businessId,
    name: String(name).slice(0, 200),
    type: type || "sms",
    status: "active",
    messageTemplate: messageTemplate || null,
    subject: subject || null,
    scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
    targetCount: 0,
    sentCount: 0,
    openedCount: 0,
    clickedCount: 0,
    convertedCount: 0,
    variantName: body.variantName || null,
    parentCampaignId: body.parentCampaignId || null,
    createdAt: now,
    updatedAt: now,
  }

  await db.insert(schema.campaign).values(newCampaign)

  // Log activity
  await db.insert(schema.activityLog).values({
    id: crypto.randomUUID(),
    businessId,
    userId: session.user.id,
    action: "campaign.created",
    entityType: "campaign",
    entityId: newCampaign.id,
    details: JSON.stringify({ name, type }),
    createdAt: now,
  })

  return NextResponse.json(newCampaign, { status: 201 })
}
