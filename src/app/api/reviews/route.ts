import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { generateReview } from "@/lib/ai"
import { getSession } from "@/lib/auth-server"
import { dispatchWebhook } from "@/lib/webhook-dispatch"
import { notifyNewReview, checkAndUnlockAchievements } from "@/lib/notifications"

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const searchParams = req.nextUrl.searchParams
  const businessId = searchParams.get("businessId")

  if (!businessId) {
    return NextResponse.json({ error: "businessId is required" }, { status: 400 })
  }

  // Verify the business belongs to this user
  const businesses = await db
    .select({ id: schema.business.id })
    .from(schema.business)
    .where(eq(schema.business.id, businessId))
    .limit(1)

  if (businesses.length === 0) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 })
  }

  const reviews = await db
    .select()
    .from(schema.review)
    .where(eq(schema.review.businessId, businessId))
    .orderBy(desc(schema.review.createdAt))

  // Convert dates to ISO strings for JSON serialization
  const serialized = reviews.map((r) => ({
    ...r,
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
  }))

  return NextResponse.json(serialized)
}

export async function POST(req: NextRequest) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { businessId, rawInput, rawInputType, customerName, customerEmail, platform, source } = body
  const rating = Number(body.rating)

  if (!businessId || !rating) {
    return NextResponse.json({ error: "businessId and rating are required" }, { status: 400 })
  }

  if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return NextResponse.json({ error: "rating must be an integer between 1 and 5" }, { status: 400 })
  }

  // Look up business for AI context
  const businesses = await db
    .select()
    .from(schema.business)
    .where(eq(schema.business.id, businessId))
    .limit(1)

  const biz = businesses[0]
  const businessName = biz?.name || "the business"
  const businessCategory = biz?.category || "restaurant"

  const aiResult = generateReview({
    rawInput: rawInput || "",
    rating,
    businessName,
    businessCategory,
  })

  const reviewId = crypto.randomUUID()
  const now = new Date()

  const newReview = {
    id: reviewId,
    businessId,
    customerName: customerName || null,
    customerEmail: customerEmail || null,
    rating,
    rawInput: rawInput || null,
    rawInputType: rawInputType || "text",
    generatedReview: aiResult.generatedReview,
    finalReview: aiResult.generatedReview,
    platform: platform || "google",
    postedToPlatform: false,
    sentiment: aiResult.sentiment,
    topics: JSON.stringify(aiResult.topics),
    source: source || "link",
    createdAt: now,
  }

  await db.insert(schema.review).values(newReview)

  // Log activity
  await db.insert(schema.activityLog).values({
    id: crypto.randomUUID(),
    businessId,
    action: "review.created",
    entityType: "review",
    entityId: reviewId,
    details: JSON.stringify({ rating, sentiment: aiResult.sentiment, source: source || "link" }),
    createdAt: now,
  })

  // Fire notifications and webhooks asynchronously (don't block response)
  Promise.all([
    notifyNewReview(businessId, { customerName, rating, sentiment: aiResult.sentiment }),
    dispatchWebhook(businessId, rating <= 2 ? "review.negative" : "review.created", {
      reviewId,
      rating,
      sentiment: aiResult.sentiment,
      customerName,
      generatedReview: aiResult.generatedReview,
    }),
    checkAndUnlockAchievements(businessId),
  ]).catch(() => {}) // Silently handle background errors

  return NextResponse.json({
    review: {
      ...newReview,
      createdAt: now.toISOString(),
    },
    generatedReview: aiResult.generatedReview,
    sentiment: aiResult.sentiment,
    topics: aiResult.topics,
  }, { status: 201 })
}
