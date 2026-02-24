import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { review, business } from "@/db/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { eq, and, desc, sql } from "drizzle-orm"

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const searchParams = req.nextUrl.searchParams
  const businessId = searchParams.get("businessId")

  if (!businessId) {
    return NextResponse.json({ error: "businessId is required" }, { status: 400 })
  }

  // Verify ownership
  const biz = await db
    .select()
    .from(business)
    .where(and(eq(business.id, businessId), eq(business.userId, session.user.id)))
  if (biz.length === 0) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // Fetch all reviews for analysis
  const reviews = await db
    .select()
    .from(review)
    .where(eq(review.businessId, businessId))
    .orderBy(desc(review.createdAt))

  // Calculate insights
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

  // Average rating
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews

  // Rating distribution
  const ratingDist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviews.forEach((r) => {
    ratingDist[r.rating] = (ratingDist[r.rating] || 0) + 1
  })

  // Sentiment breakdown
  const sentimentBreakdown = { positive: 0, neutral: 0, negative: 0 }
  reviews.forEach((r) => {
    const s = r.sentiment as keyof typeof sentimentBreakdown
    if (s && sentimentBreakdown[s] !== undefined) {
      sentimentBreakdown[s]++
    }
  })

  // Topic analysis
  const topicCounts: Record<string, { count: number; positive: number; negative: number }> = {}
  reviews.forEach((r) => {
    if (r.topics) {
      try {
        const topics: string[] = JSON.parse(r.topics)
        topics.forEach((t) => {
          if (!topicCounts[t]) {
            topicCounts[t] = { count: 0, positive: 0, negative: 0 }
          }
          topicCounts[t].count++
          if (r.sentiment === "positive") topicCounts[t].positive++
          if (r.sentiment === "negative") topicCounts[t].negative++
        })
      } catch {}
    }
  })

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

  // Recent trend (last 30 days, grouped by day)
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const recentReviews = reviews.filter(
    (r) => new Date(r.createdAt) >= thirtyDaysAgo
  )

  const dailyData: Record<string, { count: number; totalRating: number }> = {}
  recentReviews.forEach((r) => {
    const day = new Date(r.createdAt).toISOString().split("T")[0]
    if (!dailyData[day]) {
      dailyData[day] = { count: 0, totalRating: 0 }
    }
    dailyData[day].count++
    dailyData[day].totalRating += r.rating
  })

  const recentTrend = Object.entries(dailyData)
    .map(([date, data]) => ({
      date,
      reviews: data.count,
      avgRating: data.totalRating / data.count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))

  // Source breakdown
  const sourceBreakdown: Record<string, number> = {}
  reviews.forEach((r) => {
    sourceBreakdown[r.source] = (sourceBreakdown[r.source] || 0) + 1
  })

  return NextResponse.json({
    totalReviews,
    averageRating: Math.round(avgRating * 100) / 100,
    ratingDistribution: ratingDist,
    sentimentBreakdown,
    topTopics,
    recentTrend,
    sourceBreakdown,
  })
}
