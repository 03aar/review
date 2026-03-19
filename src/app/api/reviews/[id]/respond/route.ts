import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm"
import { generateResponse } from "@/lib/ai"
import { getSession } from "@/lib/auth-server"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: reviewId } = await params
  const body = await req.json()
  const { action, editedResponse } = body

  // Look up the review
  const reviews = await db
    .select()
    .from(schema.review)
    .where(eq(schema.review.id, reviewId))
    .limit(1)

  if (reviews.length === 0) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 })
  }

  const rev = reviews[0]

  // Look up the business for context
  const businesses = await db
    .select()
    .from(schema.business)
    .where(eq(schema.business.id, rev.businessId))
    .limit(1)

  const biz = businesses[0]

  if (action === "regenerate") {
    const newResponse = generateResponse({
      review: rev.finalReview || rev.generatedReview || "",
      rating: rev.rating,
      businessName: biz?.name || "the business",
      customerName: rev.customerName || undefined,
    })

    // Upsert response record
    const existingResponses = await db
      .select()
      .from(schema.reviewResponse)
      .where(eq(schema.reviewResponse.reviewId, reviewId))
      .limit(1)

    if (existingResponses.length > 0) {
      await db
        .update(schema.reviewResponse)
        .set({ generatedResponse: newResponse, status: "draft", createdAt: new Date() })
        .where(eq(schema.reviewResponse.reviewId, reviewId))
    } else {
      await db.insert(schema.reviewResponse).values({
        id: crypto.randomUUID(),
        reviewId,
        businessId: rev.businessId,
        generatedResponse: newResponse,
        finalResponse: null,
        status: "draft",
        createdAt: new Date(),
      })
    }

    return NextResponse.json({ response: newResponse, status: "draft" })
  }

  if (action === "approve") {
    await db
      .update(schema.reviewResponse)
      .set({ status: "posted", postedAt: new Date() })
      .where(eq(schema.reviewResponse.reviewId, reviewId))

    return NextResponse.json({ status: "posted" })
  }

  if (action === "edit") {
    if (!editedResponse) {
      return NextResponse.json({ error: "editedResponse is required" }, { status: 400 })
    }

    await db
      .update(schema.reviewResponse)
      .set({ finalResponse: editedResponse, status: "posted", postedAt: new Date() })
      .where(eq(schema.reviewResponse.reviewId, reviewId))

    return NextResponse.json({ status: "posted" })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
