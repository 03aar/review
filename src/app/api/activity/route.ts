import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const businessId = req.nextUrl.searchParams.get("businessId")
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get("limit") || "50"), 200)

  if (!businessId) return NextResponse.json({ error: "businessId required" }, { status: 400 })

  const logs = await db
    .select()
    .from(schema.activityLog)
    .where(eq(schema.activityLog.businessId, businessId))
    .orderBy(desc(schema.activityLog.createdAt))
    .limit(limit)

  return NextResponse.json(logs)
}
