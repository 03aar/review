import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { review, business } from "@/db/schema"
import { eq, desc, and, sql } from "drizzle-orm"
import { requireAuth } from "@/lib/api-auth"
import { generateReview } from "@/lib/ai"
import {
  createReviewSchema,
  listReviewsSchema,
  parseBody,
  parseQuery,
} from "@/lib/validators"
import { sanitizeText, sanitizeName } from "@/lib/sanitize"
import { applyRateLimit, reviewLimiter, authLimiter } from "@/lib/rate-limit"

// GET /api/reviews?businessId=xxx&page=1&pageSize=20
// Auth-protected — dashboard use only
export async function GET(req: NextRequest) {
  const { session, error } = await requireAuth(req)
  if (error) return error

  const limited = applyRateLimit(req, authLimiter, "reviews-list")
  if (limited) return limited

  const parsed = parseQuery(listReviewsSchema, req.nextUrl.searchParams)
  if (parsed.error) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 })
  }

  const { businessId, page, pageSize } = parsed.data

  // Verify the business belongs to this user
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

  const offset = (page - 1) * pageSize

  try {
    const [reviews, countResult] = await Promise.all([
      db
        .select()
        .from(review)
        .where(eq(review.businessId, businessId))
        .orderBy(desc(review.createdAt))
        .limit(pageSize)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)` })
        .from(review)
        .where(eq(review.businessId, businessId)),
    ])

    const total = countResult[0]?.count ?? 0
    const totalPages = Math.ceil(total / pageSize)

    return NextResponse.json({
      data: reviews,
      pagination: { page, pageSize, total, totalPages },
    })
  } catch {
    return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 })
  }
}

// POST /api/reviews — public endpoint (customers submit reviews via r/[slug])
// No auth required
export async function POST(req: NextRequest) {
  const limited = applyRateLimit(req, reviewLimiter, "review-submit")
  if (limited) return limited

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = parseBody(createReviewSchema, body)
  if (parsed.error) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 })
  }

  const data = parsed.data

  // Look up the real business for name/category
  let biz: { id: string; name: string; category: string } | undefined
  try {
    const [found] = await db
      .select({ id: business.id, name: business.name, category: business.category })
      .from(business)
      .where(eq(business.id, data.businessId))
      .limit(1)
    biz = found
  } catch {
    return NextResponse.json({ error: "Failed to verify business" }, { status: 500 })
  }

  if (!biz) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 })
  }

  // Sanitize text fields
  const rawInputStr = sanitizeText(data.rawInput || "", 5000)
  const aiResult = generateReview({
    rawInput: rawInputStr,
    rating: data.rating,
    businessName: biz.name,
    businessCategory: biz.category,
  })

  // Resolve platforms
  const platformsArr = data.platforms && data.platforms.length > 0
    ? data.platforms
    : [data.platform || "google"]
  const primaryPlatform = platformsArr[0]

  // Use finalReview if provided (user edited the AI review), else use AI-generated
  const finalReviewStr = data.finalReview
    ? sanitizeText(data.finalReview, 5000)
    : aiResult.generatedReview

  const sanitizedName = data.customerName ? sanitizeName(data.customerName, 100) : null

  const now = new Date()
  const reviewId = crypto.randomUUID()

  try {
    await db.insert(review).values({
      id: reviewId,
      businessId: biz.id,
      customerName: sanitizedName || null,
      customerEmail: data.customerEmail || null,
      rating: data.rating,
      rawInput: rawInputStr || null,
      rawInputType: data.rawInputType || "text",
      generatedReview: aiResult.generatedReview,
      finalReview: finalReviewStr,
      platform: primaryPlatform,
      postedToPlatform: false,
      sentiment: aiResult.sentiment,
      topics: JSON.stringify(aiResult.topics),
      source: data.source || "link",
      createdAt: now,
      updatedAt: now,
    })

    return NextResponse.json({
      review: {
        id: reviewId,
        businessId: biz.id,
        rating: data.rating,
        generatedReview: aiResult.generatedReview,
        finalReview: finalReviewStr,
        platform: primaryPlatform,
        platforms: platformsArr,
        sentiment: aiResult.sentiment,
        topics: aiResult.topics,
        createdAt: now.toISOString(),
      },
      generatedReview: aiResult.generatedReview,
      sentiment: aiResult.sentiment,
      topics: aiResult.topics,
    }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 })
  }
}
