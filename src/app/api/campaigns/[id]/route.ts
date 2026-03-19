import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  const campaigns = await db
    .select()
    .from(schema.campaign)
    .where(eq(schema.campaign.id, id))
    .limit(1)

  if (campaigns.length === 0) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
  }

  // Get associated review requests
  const requests = await db
    .select()
    .from(schema.reviewRequest)
    .where(eq(schema.reviewRequest.campaignId, id))

  return NextResponse.json({ campaign: campaigns[0], requests })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const updates: Record<string, unknown> = { updatedAt: new Date() }
  if (body.name !== undefined) updates.name = String(body.name).slice(0, 200)
  if (body.status !== undefined) updates.status = body.status
  if (body.messageTemplate !== undefined) updates.messageTemplate = body.messageTemplate
  if (body.subject !== undefined) updates.subject = body.subject

  await db
    .update(schema.campaign)
    .set(updates)
    .where(eq(schema.campaign.id, id))

  const updated = await db.select().from(schema.campaign).where(eq(schema.campaign.id, id)).limit(1)
  return NextResponse.json(updated[0])
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await db.delete(schema.campaign).where(eq(schema.campaign.id, id))
  return NextResponse.json({ success: true })
}
