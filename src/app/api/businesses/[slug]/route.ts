import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { business } from "@/db/schema"
import { eq } from "drizzle-orm"
import { applyRateLimit, publicLimiter } from "@/lib/rate-limit"

// Public endpoint — used by the review capture widget (r/[slug])
// No auth required: customers need to see business info to submit reviews
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const limited = applyRateLimit(req, publicLimiter, "biz-slug")
  if (limited) return limited

  const { slug } = await params

  if (!slug || slug.length < 1 || slug.length > 100 || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 })
  }

  try {
    const [found] = await db
      .select({
        id: business.id,
        name: business.name,
        slug: business.slug,
        category: business.category,
        description: business.description,
        primaryColor: business.primaryColor,
        googleConnected: business.googleConnected,
        yelpConnected: business.yelpConnected,
        facebookConnected: business.facebookConnected,
      })
      .from(business)
      .where(eq(business.slug, slug))
      .limit(1)

    if (!found) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    return NextResponse.json(found)
  } catch {
    return NextResponse.json({ error: "Failed to load business" }, { status: 500 })
  }
}
