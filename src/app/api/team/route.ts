import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const businessId = req.nextUrl.searchParams.get("businessId")
  if (!businessId) return NextResponse.json({ error: "businessId required" }, { status: 400 })

  const members = await db
    .select()
    .from(schema.teamMember)
    .where(eq(schema.teamMember.businessId, businessId))

  return NextResponse.json(members)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { businessId, email, name, role } = body

  if (!businessId || !email) {
    return NextResponse.json({ error: "businessId and email required" }, { status: 400 })
  }

  // Check if already a member
  const existing = await db
    .select()
    .from(schema.teamMember)
    .where(eq(schema.teamMember.email, email))

  const existingForBiz = existing.filter((m) => m.businessId === businessId)
  if (existingForBiz.length > 0) {
    return NextResponse.json({ error: "This email is already on the team" }, { status: 409 })
  }

  const now = new Date()
  const inviteToken = crypto.randomUUID()

  const member = {
    id: crypto.randomUUID(),
    businessId,
    userId: null,
    email: String(email).slice(0, 200),
    name: name ? String(name).slice(0, 100) : null,
    role: role || "member",
    status: "pending",
    inviteToken,
    invitedAt: now,
    joinedAt: null,
    createdAt: now,
  }

  await db.insert(schema.teamMember).values(member)

  // Log activity
  await db.insert(schema.activityLog).values({
    id: crypto.randomUUID(),
    businessId,
    userId: session.user.id,
    action: "team.invited",
    entityType: "team_member",
    entityId: member.id,
    details: JSON.stringify({ email, role }),
    createdAt: now,
  })

  return NextResponse.json(member, { status: 201 })
}
