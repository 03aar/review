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
  if (body.role !== undefined) updates.role = body.role
  if (body.status !== undefined) updates.status = body.status
  if (body.name !== undefined) updates.name = body.name

  await db.update(schema.teamMember).set(updates).where(eq(schema.teamMember.id, id))

  const updated = await db.select().from(schema.teamMember).where(eq(schema.teamMember.id, id)).limit(1)
  return NextResponse.json(updated[0])
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await db.delete(schema.teamMember).where(eq(schema.teamMember.id, id))
  return NextResponse.json({ success: true })
}
