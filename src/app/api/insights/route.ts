import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { review, business } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { requireAuth } from "@/lib/api-auth"
import { insightsQuerySchema, parseQuery } from "@/lib/validators"
import { applyRateLimit, authLimiter } from "@/lib/rate-limit"

// Auth-protected — dashboard insights
export async function GET(req: NextRequest) {
  const { session, error } = await requireAuth(req)
  if (error) return error

  const limited = applyRateLimit(req, authLimiter, "insights")
  if (limited) return limited

  const parsed = parseQuery(insightsQuerySchema, req.nextUrl.searchParams)
  if (parsed.error) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 })
  }

  const { businessId } = parsed.data

  // Verify the business belongs to this user
  try {
    const [biz] = await db
      .select({ id: business.id })
      .from(business)
      .where(and(eq(business.id, businessId), eq(business.userId, session.user.id)))
      .limit(1)

    if (!biz) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }
  } catch {
    return NextResponse.json({ error: "Failed to verify business" }, { status: 500 })
  }

  try {
    // Fetch all reviews for this business
    const reviews = await db
      .select()
      .from(review)
      .where(eq(review.businessId, businessId))

    const totalReviews = reviews.length

    if (totalReviews === 0) {
      return NextResponse.json({
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
        topTopics: [],
        recentTrend: [],
        sourceBreakdown: {},
      })
    }

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews

    // Rating distribution
    const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    for (const r of reviews) {
      if (r.rating >= 1 && r.rating <= 5) {
        ratingDistribution[r.rating]++
      }
    }

    // Sentiment breakdown
    const sentimentBreakdown = { positive: 0, neutral: 0, negative: 0 }
    for (const r of reviews) {
      const s = r.sentiment as keyof typeof sentimentBreakdown
      if (s && sentimentBreakdown[s] !== undefined) {
        sentimentBreakdown[s]++
      }
    }

    // Topic analysis — validate parsed JSON is string[]
    const topicCounts: Record<string, { count: number; positive: number; negative: number }> = {}
    for (const r of reviews) {
      if (!r.topics) continue
      let topics: unknown
      try {
        topics = JSON.parse(r.topics)
      } catch {
        continue
      }
      if (!Array.isArray(topics)) continue
      for (const t of topics) {
        if (typeof t !== "string" || t.length > 100) continue
        const topic = t.slice(0, 100)
        if (!topicCounts[topic]) topicCounts[topic] = { count: 0, positive: 0, negative: 0 }
        topicCounts[topic].count++
        if (r.sentiment === "positive") topicCounts[topic].positive++
        if (r.sentiment === "negative") topicCounts[topic].negative++
      }
    }

    const topTopics = Object.entries(topicCounts)
      .map(([topic, data]) => ({
        topic,
        mentions: data.count,
        positiveCount: data.positive,
        negativeCount: data.negative,
        sentimentScore: data.count > 0 ? (data.positive - data.negative) / data.count : 0,
      }))
      .sort((a, b) => b.mentions - a.mentions)
      .slice(0, 10)

    // Recent trend (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const recentReviews = reviews.filter((r) => r.createdAt && r.createdAt >= thirtyDaysAgo)

    const dailyData: Record<string, { count: number; totalRating: number }> = {}
    for (const r of recentReviews) {
      if (!r.createdAt) continue
      const day = r.createdAt.toISOString().split("T")[0]
      if (!dailyData[day]) dailyData[day] = { count: 0, totalRating: 0 }
      dailyData[day].count++
      dailyData[day].totalRating += r.rating
    }

    const recentTrend = Object.entries(dailyData)
      .map(([date, data]) => ({
        date,
        reviews: data.count,
        avgRating: Math.round((data.totalRating / data.count) * 100) / 100,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Source breakdown
    const sourceBreakdown: Record<string, number> = {}
    for (const r of reviews) {
      const src = r.source || "link"
      sourceBreakdown[src] = (sourceBreakdown[src] || 0) + 1
    }

    return NextResponse.json({
      totalReviews,
      averageRating: Math.round(avgRating * 100) / 100,
      ratingDistribution,
      sentimentBreakdown,
      topTopics,
      recentTrend,
      sourceBreakdown,
    })
  } catch {
    return NextResponse.json({ error: "Failed to compute insights" }, { status: 500 })
  }
}
