import { NextRequest, NextResponse } from "next/server"
import { DEMO_REVIEWS, DEMO_BUSINESS } from "@/lib/demo-data"
import { generateResponse } from "@/lib/ai"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: reviewId } = await params
  const body = await req.json()
  const { action, editedResponse } = body

  const rev = DEMO_REVIEWS.find((r) => r.id === reviewId)
  if (!rev) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 })
  }

  if (action === "regenerate") {
    const newResponse = generateResponse({
      review: rev.finalReview || rev.generatedReview || "",
      rating: rev.rating,
      businessName: DEMO_BUSINESS.name,
      customerName: rev.customerName || undefined,
    })
    return NextResponse.json({ response: newResponse, status: "draft" })
  }

  if (action === "approve") {
    return NextResponse.json({ status: "posted" })
  }

  if (action === "edit") {
    if (!editedResponse) {
      return NextResponse.json({ error: "editedResponse is required" }, { status: 400 })
    }
    return NextResponse.json({ status: "posted" })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
