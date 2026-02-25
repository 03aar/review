import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { review, reviewResponse, business } from "@/db/schema"
import { eq, and, desc } from "drizzle-orm"
import { requireAuth } from "@/lib/api-auth"
import { generateResponse } from "@/lib/ai"
import { respondToReviewSchema, parseBody } from "@/lib/validators"
import { sanitizeText } from "@/lib/sanitize"
import { applyRateLimit, authLimiter } from "@/lib/rate-limit"

// Auth-protected — only business owners can respond to their reviews
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { session, error } = await requireAuth(req)
  if (error) return error

  const limited = applyRateLimit(req, authLimiter, "respond")
  if (limited) return limited

  const { id: reviewId } = await params

  if (!reviewId || reviewId.length > 128) {
    return NextResponse.json({ error: "Review ID is required" }, { status: 400 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = parseBody(respondToReviewSchema, body)
  if (parsed.error) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 })
  }

  const data = parsed.data

  // Look up the review and verify it belongs to a business owned by this user
  let rev: {
    id: string
    businessId: string
    finalReview: string | null
    generatedReview: string | null
    rating: number
    customerName: string | null
  } | undefined

  let biz: { id: string; name: string; category: string } | undefined

  try {
    const [foundReview] = await db
      .select({
        id: review.id,
        businessId: review.businessId,
        finalReview: review.finalReview,
        generatedReview: review.generatedReview,
        rating: review.rating,
        customerName: review.customerName,
      })
      .from(review)
      .where(eq(review.id, reviewId))
      .limit(1)

    if (!foundReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }
    rev = foundReview

    // Verify business ownership
    const [foundBiz] = await db
      .select({ id: business.id, name: business.name, category: business.category })
      .from(business)
      .where(and(eq(business.id, rev.businessId), eq(business.userId, session.user.id)))
      .limit(1)

    if (!foundBiz) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 })
    }
    biz = foundBiz
  } catch {
    return NextResponse.json({ error: "Failed to look up review" }, { status: 500 })
  }

  const reviewText = rev.finalReview || rev.generatedReview || ""

  // Handle actions
  if (data.action === "regenerate") {
    try {
      const generatedText = generateResponse({
        review: reviewText,
        rating: rev.rating,
        businessName: biz.name,
        customerName: rev.customerName || undefined,
        businessCategory: biz.category,
      })

      const responseId = crypto.randomUUID()
      await db.insert(reviewResponse).values({
        id: responseId,
        reviewId: rev.id,
        businessId: biz.id,
        generatedResponse: generatedText,
        finalResponse: generatedText,
        status: "draft",
        createdAt: new Date(),
      })

      return NextResponse.json({
        id: responseId,
        response: generatedText,
        status: "draft",
      })
    } catch {
      return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
    }
  }

  if (data.action === "approve") {
    try {
      const [existing] = await db
        .select()
        .from(reviewResponse)
        .where(and(eq(reviewResponse.reviewId, rev.id), eq(reviewResponse.status, "draft")))
        .orderBy(desc(reviewResponse.createdAt))
        .limit(1)

      if (existing) {
        await db
          .update(reviewResponse)
          .set({ status: "posted", postedAt: new Date() })
          .where(eq(reviewResponse.id, existing.id))
        return NextResponse.json({ id: existing.id, status: "posted" })
      }

      return NextResponse.json({ error: "No draft response to approve" }, { status: 400 })
    } catch {
      return NextResponse.json({ error: "Failed to approve response" }, { status: 500 })
    }
  }

  if (data.action === "edit") {
    const trimmedResponse = sanitizeText(data.editedResponse, 5000)

    if (!trimmedResponse) {
      return NextResponse.json({ error: "Response text cannot be empty" }, { status: 400 })
    }

    try {
      const [existing] = await db
        .select()
        .from(reviewResponse)
        .where(and(eq(reviewResponse.reviewId, rev.id), eq(reviewResponse.status, "draft")))
        .orderBy(desc(reviewResponse.createdAt))
        .limit(1)

      if (existing) {
        await db
          .update(reviewResponse)
          .set({ finalResponse: trimmedResponse, status: "posted", postedAt: new Date() })
          .where(eq(reviewResponse.id, existing.id))
        return NextResponse.json({ id: existing.id, status: "posted" })
      }

      // No draft — create and post in one step
      const responseId = crypto.randomUUID()
      await db.insert(reviewResponse).values({
        id: responseId,
        reviewId: rev.id,
        businessId: biz.id,
        generatedResponse: null,
        finalResponse: trimmedResponse,
        status: "posted",
        postedAt: new Date(),
        createdAt: new Date(),
      })
      return NextResponse.json({ id: responseId, status: "posted" })
    } catch {
      return NextResponse.json({ error: "Failed to save response" }, { status: 500 })
    }
  }

  // This should be unreachable due to discriminatedUnion, but just in case
  return NextResponse.json({ error: "Invalid action. Use: regenerate, approve, or edit" }, { status: 400 })
}
