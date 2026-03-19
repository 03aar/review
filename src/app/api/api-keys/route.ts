import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(key)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("")
}

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const businessId = req.nextUrl.searchParams.get("businessId")
  if (!businessId) return NextResponse.json({ error: "businessId required" }, { status: 400 })

  const keys = await db
    .select()
    .from(schema.apiKey)
    .where(eq(schema.apiKey.businessId, businessId))
    .orderBy(desc(schema.apiKey.createdAt))

  // Never return the hash
  const safe = keys.map(({ keyHash, ...rest }) => rest)
  return NextResponse.json(safe)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { businessId, name, permissions } = body

  if (!businessId || !name) {
    return NextResponse.json({ error: "businessId and name required" }, { status: 400 })
  }

  // Generate the API key
  const rawKey = `rf_live_${crypto.randomUUID().replace(/-/g, "")}`
  const keyHash = await hashKey(rawKey)
  const keyPrefix = rawKey.slice(0, 12)

  const apiKeyRecord = {
    id: crypto.randomUUID(),
    businessId,
    name: String(name).slice(0, 100),
    keyHash,
    keyPrefix,
    permissions: permissions || "read",
    lastUsedAt: null,
    expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
    rateLimit: body.rateLimit || 1000,
    requestCount: 0,
    active: true,
    createdAt: new Date(),
  }

  await db.insert(schema.apiKey).values(apiKeyRecord)

  // Log activity
  await db.insert(schema.activityLog).values({
    id: crypto.randomUUID(),
    businessId,
    userId: session.user.id,
    action: "apikey.created",
    entityType: "api_key",
    entityId: apiKeyRecord.id,
    details: JSON.stringify({ name, permissions }),
    createdAt: new Date(),
  })

  // Return the raw key ONLY on creation
  return NextResponse.json({
    ...apiKeyRecord,
    key: rawKey,
    keyHash: undefined,
  }, { status: 201 })
}
