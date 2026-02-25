import { NextRequest, NextResponse } from "next/server"
import { generateReview } from "@/lib/ai"
import { generateReviewSchema, parseBody } from "@/lib/validators"
import { sanitizeText } from "@/lib/sanitize"
import { applyRateLimit, aiLimiter } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
  const limited = applyRateLimit(req, aiLimiter, "ai-review")
  if (limited) return limited

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = parseBody(generateReviewSchema, body)
  if (parsed.error) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 })
  }

  const { rawInput, rating, businessName, businessCategory } = parsed.data

  const result = generateReview({
    rawInput: sanitizeText(rawInput, 5000),
    rating,
    businessName: sanitizeText(businessName, 200),
    businessCategory,
  })

  return NextResponse.json(result)
}
