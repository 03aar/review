import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { review, reviewResponse, business } from "@/db/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { eq, and } from "drizzle-orm"
import { generateResponse } from "@/lib/ai"

// POST: Generate or update a response for a review
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: reviewId } = await params
  const body = await req.json()
  const { action, editedResponse } = body // action: "regenerate" | "approve" | "edit"

  // Fetch review
  const rev = await db.select().from(review).where(eq(review.id, reviewId))
  if (rev.length === 0) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 })
  }

  // Verify ownership
  const biz = await db
    .select()
    .from(business)
    .where(and(eq(business.id, rev[0].businessId), eq(business.userId, session.user.id)))
  if (biz.length === 0) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // Check for existing response
  const existing = await db
    .select()
    .from(reviewResponse)
    .where(eq(reviewResponse.reviewId, reviewId))

  if (action === "regenerate") {
    const newResponse = generateResponse({
      review: rev[0].finalReview || rev[0].generatedReview || "",
      rating: rev[0].rating,
      businessName: biz[0].name,
      customerName: rev[0].customerName || undefined,
    })

    if (existing.length > 0) {
      await db
        .update(reviewResponse)
        .set({
          generatedResponse: newResponse,
          finalResponse: null,
          status: "draft",
        })
        .where(eq(reviewResponse.id, existing[0].id))
    } else {
      await db.insert(reviewResponse).values({
        id: crypto.randomUUID(),
        reviewId,
        businessId: rev[0].businessId,
        generatedResponse: newResponse,
        status: "draft",
        createdAt: new Date(),
      })
    }

    return NextResponse.json({ response: newResponse, status: "draft" })
  }

  if (action === "approve") {
    if (existing.length === 0) {
      return NextResponse.json({ error: "No response to approve" }, { status: 400 })
    }

    await db
      .update(reviewResponse)
      .set({
        finalResponse: existing[0].generatedResponse,
        status: "posted",
        postedAt: new Date(),
      })
      .where(eq(reviewResponse.id, existing[0].id))

    return NextResponse.json({ status: "posted" })
  }

  if (action === "edit") {
    if (!editedResponse) {
      return NextResponse.json({ error: "editedResponse is required" }, { status: 400 })
    }

    if (existing.length > 0) {
      await db
        .update(reviewResponse)
        .set({
          finalResponse: editedResponse,
          status: "posted",
          postedAt: new Date(),
        })
        .where(eq(reviewResponse.id, existing[0].id))
    } else {
      await db.insert(reviewResponse).values({
        id: crypto.randomUUID(),
        reviewId,
        businessId: rev[0].businessId,
        generatedResponse: editedResponse,
        finalResponse: editedResponse,
        status: "posted",
        postedAt: new Date(),
        createdAt: new Date(),
      })
    }

    return NextResponse.json({ status: "posted" })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
