import { NextRequest, NextResponse } from "next/server"
import { generateResponse } from "@/lib/ai"
import { generateResponseSchema, parseBody } from "@/lib/validators"
import { sanitizeText } from "@/lib/sanitize"
import { applyRateLimit, aiLimiter } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
  const limited = applyRateLimit(req, aiLimiter, "ai-response")
  if (limited) return limited

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = parseBody(generateResponseSchema, body)
  if (parsed.error) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 })
  }

  const { review, rating, businessName, customerName, businessCategory } = parsed.data

  const response = generateResponse({
    review: sanitizeText(review, 5000),
    rating,
    businessName: sanitizeText(businessName, 200),
    customerName: customerName ? sanitizeText(customerName, 100) : undefined,
    businessCategory,
  })

  return NextResponse.json({ response })
}
