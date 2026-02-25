import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { business } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { requireAuth } from "@/lib/api-auth"
import { generateSlug } from "@/lib/utils"
import {
  createBusinessSchema,
  updateBusinessSchema,
  parseBody,
} from "@/lib/validators"
import { sanitizeName, sanitizeText } from "@/lib/sanitize"
import { applyRateLimit, authLimiter } from "@/lib/rate-limit"

export async function GET(req: NextRequest) {
  const { session, error } = await requireAuth(req)
  if (error) return error

  const limited = applyRateLimit(req, authLimiter, "biz-list")
  if (limited) return limited

  try {
    const businesses = await db
      .select()
      .from(business)
      .where(eq(business.userId, session.user.id))

    return NextResponse.json(businesses)
  } catch {
    return NextResponse.json({ error: "Failed to load businesses" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { session, error } = await requireAuth(req)
  if (error) return error

  const limited = applyRateLimit(req, authLimiter, "biz-create")
  if (limited) return limited

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = parseBody(createBusinessSchema, body)
  if (parsed.error) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 })
  }

  const { name, category } = parsed.data
  const trimmedName = sanitizeName(name, 200)

  if (!trimmedName) {
    return NextResponse.json({ error: "Business name is required" }, { status: 400 })
  }

  // Generate a unique slug with collision handling
  let slug = generateSlug(trimmedName)
  const MAX_ATTEMPTS = 10

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const candidateSlug = i === 0 ? slug : `${slug}-${i}`
    const existing = await db
      .select({ id: business.id })
      .from(business)
      .where(eq(business.slug, candidateSlug))
      .limit(1)

    if (existing.length === 0) {
      slug = candidateSlug
      break
    }
    if (i === MAX_ATTEMPTS - 1) {
      slug = `${slug}-${crypto.randomUUID().slice(0, 8)}`
    }
  }

  const now = new Date()
  const id = crypto.randomUUID()

  try {
    await db.insert(business).values({
      id,
      userId: session.user.id,
      name: trimmedName,
      slug,
      category: category || "restaurant",
      createdAt: now,
      updatedAt: now,
    })

    const [created] = await db
      .select()
      .from(business)
      .where(eq(business.id, id))
      .limit(1)

    if (!created) {
      return NextResponse.json({ error: "Failed to create business" }, { status: 500 })
    }

    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : ""
    if (message.includes("UNIQUE") || message.includes("unique")) {
      return NextResponse.json({ error: "Please try again" }, { status: 409 })
    }
    return NextResponse.json({ error: "Failed to create business" }, { status: 500 })
  }
}

// PATCH /api/businesses — update business settings
export async function PATCH(req: NextRequest) {
  const { session, error } = await requireAuth(req)
  if (error) return error

  const limited = applyRateLimit(req, authLimiter, "biz-update")
  if (limited) return limited

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = parseBody(updateBusinessSchema, body)
  if (parsed.error) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 })
  }

  const fields = parsed.data

  // Verify ownership
  try {
    const [biz] = await db
      .select({ id: business.id })
      .from(business)
      .where(and(eq(business.id, fields.id), eq(business.userId, session.user.id)))
      .limit(1)

    if (!biz) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }
  } catch {
    return NextResponse.json({ error: "Failed to verify business" }, { status: 500 })
  }

  // Build update object from validated fields
  const updates: Record<string, unknown> = { updatedAt: new Date() }

  if (fields.name !== undefined) {
    updates.name = sanitizeName(fields.name, 200)
  }
  if (fields.category !== undefined) {
    updates.category = fields.category
  }
  if (fields.description !== undefined) {
    updates.description = fields.description ? sanitizeText(fields.description, 1000) : null
  }
  if (fields.address !== undefined) {
    updates.address = fields.address ? sanitizeText(fields.address, 500) : null
  }
  if (fields.phone !== undefined) {
    updates.phone = fields.phone ? fields.phone.trim().slice(0, 30) : null
  }
  if (fields.website !== undefined) {
    updates.website = fields.website ? fields.website.trim().slice(0, 500) : null
  }
  if (fields.primaryColor !== undefined) {
    updates.primaryColor = fields.primaryColor
  }
  if (fields.autoRespond !== undefined) {
    updates.autoRespond = fields.autoRespond
  }

  try {
    await db
      .update(business)
      .set(updates)
      .where(eq(business.id, fields.id))

    const [updated] = await db
      .select()
      .from(business)
      .where(eq(business.id, fields.id))
      .limit(1)

    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: "Failed to update business" }, { status: 500 })
  }
}
