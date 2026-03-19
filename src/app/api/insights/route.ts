import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const searchParams = req.nextUrl.searchParams
  const businessId = searchParams.get("businessId")

  if (!businessId) {
    return NextResponse.json({ error: "businessId is required" }, { status: 400 })
  }

  const reviews = await db
    .select()
    .from(schema.review)
    .where(eq(schema.review.businessId, businessId))

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

  const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviews.forEach((r) => { ratingDistribution[r.rating]++ })

  const sentimentBreakdown = { positive: 0, neutral: 0, negative: 0 }
  reviews.forEach((r) => {
    const s = r.sentiment as keyof typeof sentimentBreakdown
    if (sentimentBreakdown[s] !== undefined) sentimentBreakdown[s]++
  })

  const topicCounts: Record<string, { count: number; positive: number; negative: number }> = {}
  reviews.forEach((r) => {
    if (!r.topics) return
    try {
      const topics: string[] = JSON.parse(r.topics)
      topics.forEach((t) => {
        if (!topicCounts[t]) topicCounts[t] = { count: 0, positive: 0, negative: 0 }
        topicCounts[t].count++
        if (r.sentiment === "positive") topicCounts[t].positive++
        if (r.sentiment === "negative") topicCounts[t].negative++
      })
    } catch {
      // Skip malformed topics
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

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const recentReviews = reviews.filter((r) => {
    const d = r.createdAt instanceof Date ? r.createdAt : new Date(r.createdAt)
    return d >= thirtyDaysAgo
  })

  const dailyData: Record<string, { count: number; totalRating: number }> = {}
  recentReviews.forEach((r) => {
    const d = r.createdAt instanceof Date ? r.createdAt : new Date(r.createdAt)
    const day = d.toISOString().split("T")[0]
    if (!dailyData[day]) dailyData[day] = { count: 0, totalRating: 0 }
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

  const sourceBreakdown: Record<string, number> = {}
  reviews.forEach((r) => {
    sourceBreakdown[r.source] = (sourceBreakdown[r.source] || 0) + 1
  })

  return NextResponse.json({
    totalReviews,
    averageRating: Math.round(avgRating * 100) / 100,
    ratingDistribution,
    sentimentBreakdown,
    topTopics,
    recentTrend,
    sourceBreakdown,
  })
}
