import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { review, business } from "@/db/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { eq, desc, and, sql } from "drizzle-orm"
import { generateReview, generateResponse } from "@/lib/ai"
import { reviewResponse } from "@/db/schema"

// GET: Fetch reviews for the authenticated user's business
export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const searchParams = req.nextUrl.searchParams
  const businessId = searchParams.get("businessId")

  if (!businessId) {
    return NextResponse.json({ error: "businessId is required" }, { status: 400 })
  }

  // Verify ownership
  const biz = await db
    .select()
    .from(business)
    .where(and(eq(business.id, businessId), eq(business.userId, session.user.id)))
  if (biz.length === 0) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const reviews = await db
    .select()
    .from(review)
    .where(eq(review.businessId, businessId))
    .orderBy(desc(review.createdAt))

  return NextResponse.json(reviews)
}

// POST: Submit a new review (from customer-facing capture flow)
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

  // Fetch business for AI generation
  const biz = await db.select().from(business).where(eq(business.id, businessId))
  if (biz.length === 0) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 })
  }

  // Generate AI review
  const aiResult = generateReview({
    rawInput: rawInput || "",
    rating,
    businessName: biz[0].name,
    businessCategory: biz[0].category,
  })

  const reviewId = crypto.randomUUID()
  const now = new Date()

  await db.insert(review).values({
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
    sentiment: aiResult.sentiment,
    topics: JSON.stringify(aiResult.topics),
    source: source || "link",
    createdAt: now,
  })

  // Auto-generate a response draft
  const responseDraft = generateResponse({
    review: aiResult.generatedReview,
    rating,
    businessName: biz[0].name,
    customerName: customerName || undefined,
  })

  await db.insert(reviewResponse).values({
    id: crypto.randomUUID(),
    reviewId,
    businessId,
    generatedResponse: responseDraft,
    status: biz[0].autoRespond ? "approved" : "draft",
    createdAt: now,
  })

  const newReview = await db.select().from(review).where(eq(review.id, reviewId))

  return NextResponse.json({
    review: newReview[0],
    generatedReview: aiResult.generatedReview,
    sentiment: aiResult.sentiment,
    topics: aiResult.topics,
  }, { status: 201 })
}
