import { NextRequest, NextResponse } from "next/server"
import { DEMO_REVIEWS, DEMO_BUSINESS } from "@/lib/demo-data"
import { generateReview } from "@/lib/ai"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const businessId = searchParams.get("businessId")

  if (!businessId) {
    return NextResponse.json({ error: "businessId is required" }, { status: 400 })
  }

  return NextResponse.json(DEMO_REVIEWS)
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

  const aiResult = generateReview({
    rawInput: rawInput || "",
    rating,
    businessName: DEMO_BUSINESS.name,
    businessCategory: DEMO_BUSINESS.category,
  })

  const reviewId = crypto.randomUUID()

  return NextResponse.json({
    review: {
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
      createdAt: new Date().toISOString(),
    },
    generatedReview: aiResult.generatedReview,
    sentiment: aiResult.sentiment,
    topics: aiResult.topics,
  }, { status: 201 })
}
