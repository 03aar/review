import { NextRequest, NextResponse } from "next/server"
import { generateResponse } from "@/lib/ai"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { review, rating, businessName, customerName } = body

  if (!review || !rating || !businessName) {
    return NextResponse.json(
      { error: "review, rating, and businessName are required" },
      { status: 400 }
    )
  }

  const response = generateResponse({
    review,
    rating,
    businessName,
    customerName,
  })

  return NextResponse.json({ response })
}
