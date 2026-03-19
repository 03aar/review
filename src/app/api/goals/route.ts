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

  const goals = await db
    .select()
    .from(schema.goal)
    .where(eq(schema.goal.businessId, businessId))
    .orderBy(desc(schema.goal.createdAt))

  const achievements = await db
    .select()
    .from(schema.achievement)
    .where(eq(schema.achievement.businessId, businessId))

  return NextResponse.json({ goals, achievements })
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { businessId, type, target, period } = body

  if (!businessId || !type || !target) {
    return NextResponse.json({ error: "businessId, type, and target required" }, { status: 400 })
  }

  const now = new Date()
  const endDate = new Date(now)
  if (period === "weekly") endDate.setDate(endDate.getDate() + 7)
  else if (period === "quarterly") endDate.setMonth(endDate.getMonth() + 3)
  else endDate.setMonth(endDate.getMonth() + 1) // monthly default

  const goal = {
    id: crypto.randomUUID(),
    businessId,
    type,
    target: Number(target),
    current: 0,
    period: period || "monthly",
    startDate: now,
    endDate,
    completed: false,
    completedAt: null,
    createdAt: now,
  }

  await db.insert(schema.goal).values(goal)
  return NextResponse.json(goal, { status: 201 })
}
