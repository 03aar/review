import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  // Get recent deliveries
  const deliveries = await db
    .select()
    .from(schema.webhookDelivery)
    .where(eq(schema.webhookDelivery.webhookId, id))
    .orderBy(desc(schema.webhookDelivery.deliveredAt))
    .limit(50)

  return NextResponse.json(deliveries)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const updates: Record<string, unknown> = {}
  if (body.url !== undefined) updates.url = body.url
  if (body.events !== undefined) updates.events = JSON.stringify(body.events)
  if (body.active !== undefined) updates.active = body.active

  await db.update(schema.webhook).set(updates).where(eq(schema.webhook.id, id))

  const updated = await db.select().from(schema.webhook).where(eq(schema.webhook.id, id)).limit(1)
  return NextResponse.json(updated[0])
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await db.delete(schema.webhookDelivery).where(eq(schema.webhookDelivery.webhookId, id))
  await db.delete(schema.webhook).where(eq(schema.webhook.id, id))
  return NextResponse.json({ success: true })
}
