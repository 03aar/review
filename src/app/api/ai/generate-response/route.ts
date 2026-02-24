import { NextRequest, NextResponse } from "next/server"
import { generateResponse } from "@/lib/ai"

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

  const { review, rating, businessName, customerName } = body

  if (!review || !rating || !businessName) {
    return NextResponse.json(
      { error: "review, rating, and businessName are required" },
      { status: 400 }
    )
  }

  const response = generateResponse({
    review: String(review).slice(0, 5000),
    rating: Number(rating),
    businessName: String(businessName).slice(0, 200),
    customerName: customerName ? String(customerName).slice(0, 100) : undefined,
  })

  return NextResponse.json({ response })
}
