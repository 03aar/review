import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { reviewRequest, business } from "@/db/schema"
import { eq, and, desc } from "drizzle-orm"
import { requireAuth } from "@/lib/api-auth"
import {
  createCampaignSchema,
  listCampaignsSchema,
  parseBody,
  parseQuery,
} from "@/lib/validators"
import { sanitizeName } from "@/lib/sanitize"
import { applyRateLimit, authLimiter } from "@/lib/rate-limit"

// GET /api/campaigns?businessId=xxx — list review requests for a business
export async function GET(req: NextRequest) {
  const { session, error } = await requireAuth(req)
  if (error) return error

  const limited = applyRateLimit(req, authLimiter, "campaigns-list")
  if (limited) return limited

  const parsed = parseQuery(listCampaignsSchema, req.nextUrl.searchParams)
  if (parsed.error) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 })
  }

  const { businessId } = parsed.data

  // Verify ownership
  try {
    const [biz] = await db
      .select({ id: business.id })
      .from(business)
      .where(and(eq(business.id, businessId), eq(business.userId, session.user.id)))
      .limit(1)

    if (!biz) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }
  } catch {
    return NextResponse.json({ error: "Failed to verify business" }, { status: 500 })
  }

  try {
    const requests = await db
      .select()
      .from(reviewRequest)
      .where(eq(reviewRequest.businessId, businessId))
      .orderBy(desc(reviewRequest.createdAt))
      .limit(200)

    return NextResponse.json({ data: requests })
  } catch {
    return NextResponse.json({ error: "Failed to load campaigns" }, { status: 500 })
  }
}

// POST /api/campaigns — create review request(s) for a business
export async function POST(req: NextRequest) {
  const { session, error } = await requireAuth(req)
  if (error) return error

  const limited = applyRateLimit(req, authLimiter, "campaigns-create")
  if (limited) return limited

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = parseBody(createCampaignSchema, body)
  if (parsed.error) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 })
  }

  const { businessId, customers } = parsed.data

  // Verify ownership
  let biz: { id: string; slug: string } | undefined
  try {
    const [found] = await db
      .select({ id: business.id, slug: business.slug })
      .from(business)
      .where(and(eq(business.id, businessId), eq(business.userId, session.user.id)))
      .limit(1)

    if (!found) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }
    biz = found
  } catch {
    return NextResponse.json({ error: "Failed to verify business" }, { status: 500 })
  }

  const now = new Date()
  const created: Array<{ id: string; customerName: string | null; customerEmail: string | null; method: string }> = []

  try {
    for (const c of customers) {
      const name = c.name ? sanitizeName(c.name, 100) : null
      const email = c.email ? c.email.trim().slice(0, 255) : null
      const phone = c.phone ? c.phone.trim().slice(0, 30) : null
      const method = c.method || "email"

      if (!name && !email) continue

      const id = crypto.randomUUID()
      await db.insert(reviewRequest).values({
        id,
        businessId: biz.id,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        method,
        status: "pending",
        createdAt: now,
      })

      created.push({ id, customerName: name, customerEmail: email, method })
    }

    return NextResponse.json({
      created: created.length,
      requests: created,
      reviewLink: `/r/${biz.slug}`,
    }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
