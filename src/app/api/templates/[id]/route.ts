import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const updates: Record<string, unknown> = { updatedAt: new Date() }
  if (body.name !== undefined) updates.name = body.name
  if (body.category !== undefined) updates.category = body.category
  if (body.content !== undefined) updates.content = body.content
  if (body.incrementUsage) {
    await db
      .update(schema.responseTemplate)
      .set({ usageCount: sql`${schema.responseTemplate.usageCount} + 1`, updatedAt: new Date() })
      .where(eq(schema.responseTemplate.id, id))
    const updated = await db.select().from(schema.responseTemplate).where(eq(schema.responseTemplate.id, id)).limit(1)
    return NextResponse.json(updated[0])
  }

  await db.update(schema.responseTemplate).set(updates).where(eq(schema.responseTemplate.id, id))
  const updated = await db.select().from(schema.responseTemplate).where(eq(schema.responseTemplate.id, id)).limit(1)
  return NextResponse.json(updated[0])
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await db.delete(schema.responseTemplate).where(eq(schema.responseTemplate.id, id))
  return NextResponse.json({ success: true })
}
