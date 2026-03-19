import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const updates: Record<string, unknown> = {}
  if (body.name !== undefined) updates.name = body.name
  if (body.active !== undefined) updates.active = body.active
  if (body.permissions !== undefined) updates.permissions = body.permissions
  if (body.rateLimit !== undefined) updates.rateLimit = body.rateLimit

  await db.update(schema.apiKey).set(updates).where(eq(schema.apiKey.id, id))

  const updated = await db.select().from(schema.apiKey).where(eq(schema.apiKey.id, id)).limit(1)
  if (updated.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const { keyHash, ...safe } = updated[0]
  return NextResponse.json(safe)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await db.delete(schema.apiKey).where(eq(schema.apiKey.id, id))
  return NextResponse.json({ success: true })
}
