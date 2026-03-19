import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth-server"

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const businessId = req.nextUrl.searchParams.get("businessId")
  if (!businessId) return NextResponse.json({ error: "businessId required" }, { status: 400 })

  // Get all reviews
  const reviews = await db
    .select()
    .from(schema.review)
    .where(eq(schema.review.businessId, businessId))

  // Get all responses
  const responses = await db
    .select()
    .from(schema.reviewResponse)
    .where(eq(schema.reviewResponse.businessId, businessId))

  // Get all campaigns
  const campaigns = await db
    .select()
    .from(schema.campaign)
    .where(eq(schema.campaign.businessId, businessId))

  // Get all review requests
  const requests = await db
    .select()
    .from(schema.reviewRequest)
    .where(eq(schema.reviewRequest.businessId, businessId))

  const now = Date.now()
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000

  const recentReviews = reviews.filter((r) => {
    const t = r.createdAt instanceof Date ? r.createdAt.getTime() : new Date(r.createdAt).getTime()
    return t >= thirtyDaysAgo
  })

  const thisWeekReviews = reviews.filter((r) => {
    const t = r.createdAt instanceof Date ? r.createdAt.getTime() : new Date(r.createdAt).getTime()
    return t >= sevenDaysAgo
  })

  // Response rate
  const respondedReviews = reviews.filter((r) => r.respondedAt)
  const responseRate = reviews.length > 0 ? (respondedReviews.length / reviews.length) * 100 : 0

  // Average response time (in hours)
  const responseTimes = reviews.filter((r) => r.responseTime).map((r) => r.responseTime!)
  const avgResponseTime = responseTimes.length > 0
    ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length / 3600
    : 0

  // Rating trend (by week)
  const weeklyData: Record<string, { total: number; count: number }> = {}
  reviews.forEach((r) => {
    const d = r.createdAt instanceof Date ? r.createdAt : new Date(r.createdAt)
    const weekStart = new Date(d)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    const key = weekStart.toISOString().split("T")[0]
    if (!weeklyData[key]) weeklyData[key] = { total: 0, count: 0 }
    weeklyData[key].total += r.rating
    weeklyData[key].count++
  })

  const ratingTrend = Object.entries(weeklyData)
    .map(([week, data]) => ({
      week,
      avgRating: Math.round((data.total / data.count) * 100) / 100,
      count: data.count,
    }))
    .sort((a, b) => a.week.localeCompare(b.week))

  // Platform distribution
  const platformCounts: Record<string, number> = {}
  reviews.forEach((r) => {
    platformCounts[r.platform] = (platformCounts[r.platform] || 0) + 1
  })

  // Staff mentions
  const staffMentions: Record<string, { count: number; avgRating: number; ratings: number[] }> = {}
  reviews.forEach((r) => {
    if (r.staffMention) {
      if (!staffMentions[r.staffMention]) staffMentions[r.staffMention] = { count: 0, avgRating: 0, ratings: [] }
      staffMentions[r.staffMention].count++
      staffMentions[r.staffMention].ratings.push(r.rating)
    }
  })
  Object.values(staffMentions).forEach((s) => {
    s.avgRating = s.ratings.reduce((a, b) => a + b, 0) / s.ratings.length
  })

  // Campaign performance
  const totalSent = campaigns.reduce((sum, c) => sum + c.sentCount, 0)
  const totalConverted = campaigns.reduce((sum, c) => sum + c.convertedCount, 0)
  const campaignConversionRate = totalSent > 0 ? (totalConverted / totalSent) * 100 : 0

  // Recovery metrics
  const negativeReviews = reviews.filter((r) => r.sentiment === "negative")
  const recoveredReviews = reviews.filter((r) => r.recoveryStatus === "updated")
  const recoveryRate = negativeReviews.length > 0
    ? (recoveredReviews.length / negativeReviews.length) * 100
    : 0

  return NextResponse.json({
    overview: {
      totalReviews: reviews.length,
      averageRating: reviews.length > 0
        ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 100) / 100
        : 0,
      thisWeekReviews: thisWeekReviews.length,
      thisMonthReviews: recentReviews.length,
      positivePercentage: reviews.length > 0
        ? Math.round((reviews.filter((r) => r.sentiment === "positive").length / reviews.length) * 100)
        : 0,
      responseRate: Math.round(responseRate),
      avgResponseTimeHours: Math.round(avgResponseTime * 10) / 10,
    },
    ratingTrend,
    platformDistribution: platformCounts,
    staffMentions: Object.entries(staffMentions)
      .map(([name, data]) => ({ name, count: data.count, avgRating: Math.round(data.avgRating * 100) / 100 }))
      .sort((a, b) => b.count - a.count),
    campaigns: {
      total: campaigns.length,
      totalSent,
      totalConverted,
      conversionRate: Math.round(campaignConversionRate * 10) / 10,
    },
    recovery: {
      negativeCount: negativeReviews.length,
      recoveredCount: recoveredReviews.length,
      recoveryRate: Math.round(recoveryRate),
    },
  })
}
