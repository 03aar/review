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

  const competitors = await db
    .select()
    .from(schema.competitor)
    .where(eq(schema.competitor.businessId, businessId))

  // Get snapshots for each competitor
  const results = await Promise.all(
    competitors.map(async (c) => {
      const snapshots = await db
        .select()
        .from(schema.competitorSnapshot)
        .where(eq(schema.competitorSnapshot.competitorId, c.id))
        .orderBy(desc(schema.competitorSnapshot.capturedAt))
        .limit(30) // Last 30 snapshots for trend

      return { ...c, snapshots }
    })
  )

  return NextResponse.json(results)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { businessId, name, googlePlaceId, yelpId } = body

  if (!businessId || !name) {
    return NextResponse.json({ error: "businessId and name required" }, { status: 400 })
  }

  const competitor = {
    id: crypto.randomUUID(),
    businessId,
    name: String(name).slice(0, 200),
    googlePlaceId: googlePlaceId || null,
    yelpId: yelpId || null,
    rating: null,
    reviewCount: null,
    responseRate: null,
    lastCheckedAt: null,
    createdAt: new Date(),
  }

  await db.insert(schema.competitor).values(competitor)
  return NextResponse.json(competitor, { status: 201 })
}
