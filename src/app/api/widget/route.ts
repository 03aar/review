import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq, desc } from "drizzle-orm"

// Public endpoint - no auth required (used by embedded widget)
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get("limit") || "5"), 20)
  const minRating = parseInt(req.nextUrl.searchParams.get("minRating") || "4")

  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 })

  // Find business by slug
  const businesses = await db
    .select()
    .from(schema.business)
    .where(eq(schema.business.slug, slug))
    .limit(1)

  if (businesses.length === 0) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 })
  }

  const biz = businesses[0]

  // Get top reviews for widget display
  const reviews = await db
    .select({
      customerName: schema.review.customerName,
      rating: schema.review.rating,
      finalReview: schema.review.finalReview,
      platform: schema.review.platform,
      createdAt: schema.review.createdAt,
    })
    .from(schema.review)
    .where(eq(schema.review.businessId, biz.id))
    .orderBy(desc(schema.review.rating), desc(schema.review.createdAt))
    .limit(limit * 2) // Fetch more to filter

  // Filter by min rating and only show posted reviews
  const filtered = reviews
    .filter((r) => r.rating >= minRating && r.finalReview)
    .slice(0, limit)

  // Get aggregate stats
  const allReviews = await db
    .select({ rating: schema.review.rating })
    .from(schema.review)
    .where(eq(schema.review.businessId, biz.id))

  const totalReviews = allReviews.length
  const avgRating = totalReviews > 0
    ? Math.round((allReviews.reduce((s, r) => s + r.rating, 0) / totalReviews) * 10) / 10
    : 0

  // Get widget config
  const configs = await db
    .select()
    .from(schema.widgetConfig)
    .where(eq(schema.widgetConfig.businessId, biz.id))
    .limit(1)

  const config = configs[0] || null

  return NextResponse.json({
    business: {
      name: biz.name,
      slug: biz.slug,
      primaryColor: biz.primaryColor,
    },
    stats: {
      totalReviews,
      averageRating: avgRating,
    },
    reviews: filtered.map((r) => ({
      customerName: r.customerName,
      rating: r.rating,
      review: r.finalReview,
      platform: r.platform,
      date: r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt,
    })),
    config: config ? {
      type: config.type,
      theme: config.theme,
      accentColor: config.accentColor,
      showRating: config.showRating,
      showCount: config.showCount,
      autoPlay: config.autoPlay,
    } : null,
  }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Cache-Control": "public, max-age=300", // 5-minute cache
    },
  })
}
