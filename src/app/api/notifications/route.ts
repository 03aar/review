import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq, and, desc } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const businessId = req.nextUrl.searchParams.get("businessId")
  const unreadOnly = req.nextUrl.searchParams.get("unread") === "true"
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get("limit") || "50"), 100)

  if (!businessId) return NextResponse.json({ error: "businessId required" }, { status: 400 })

  let query = db
    .select()
    .from(schema.notification)
    .where(
      unreadOnly
        ? and(eq(schema.notification.businessId, businessId), eq(schema.notification.read, false))
        : eq(schema.notification.businessId, businessId)
    )
    .orderBy(desc(schema.notification.createdAt))
    .limit(limit)

  const notifications = await query

  // Also get unread count
  const allUnread = await db
    .select()
    .from(schema.notification)
    .where(and(eq(schema.notification.businessId, businessId), eq(schema.notification.read, false)))

  return NextResponse.json({
    notifications,
    unreadCount: allUnread.length,
  })
}

export async function PATCH(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { ids, markAllRead, businessId } = body

  if (markAllRead && businessId) {
    await db
      .update(schema.notification)
      .set({ read: true, readAt: new Date() })
      .where(and(eq(schema.notification.businessId, businessId), eq(schema.notification.read, false)))
    return NextResponse.json({ success: true })
  }

  if (ids && Array.isArray(ids)) {
    for (const id of ids) {
      await db
        .update(schema.notification)
        .set({ read: true, readAt: new Date() })
        .where(eq(schema.notification.id, id))
    }
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: "ids or markAllRead required" }, { status: 400 })
}
