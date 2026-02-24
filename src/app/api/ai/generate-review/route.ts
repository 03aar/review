import { NextRequest, NextResponse } from "next/server"
import { generateReview } from "@/lib/ai"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { rawInput, rating, businessName, businessCategory } = body

  if (!rawInput || !rating || !businessName) {
    return NextResponse.json(
      { error: "rawInput, rating, and businessName are required" },
      { status: 400 }
    )
  }

  const result = generateReview({
    rawInput,
    rating,
    businessName,
    businessCategory,
  })

  return NextResponse.json(result)
}
