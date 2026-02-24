import { NextRequest, NextResponse } from "next/server"
import { generateReview } from "@/lib/ai"

export async function POST(req: NextRequest) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    )
  }

  const { rawInput, rating, businessName, businessCategory } = body

  if (!rawInput || !rating || !businessName) {
    return NextResponse.json(
      { error: "rawInput, rating, and businessName are required" },
      { status: 400 }
    )
  }

  const numRating = Number(rating)
  if (numRating < 1 || numRating > 5 || !Number.isInteger(numRating)) {
    return NextResponse.json(
      { error: "rating must be an integer between 1 and 5" },
      { status: 400 }
    )
  }

  const result = generateReview({
    rawInput: String(rawInput).slice(0, 5000),
    rating: numRating,
    businessName: String(businessName).slice(0, 200),
    businessCategory,
  })

  return NextResponse.json(result)
}
