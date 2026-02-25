"use client"

import { useEffect, useState } from "react"
import { useBusinessContext } from "./layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, MessageSquare, ThumbsUp, Clock, ExternalLink, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { timeAgo } from "@/lib/utils"

interface ReviewData {
  id: string
  rating: number
  finalReview: string | null
  generatedReview: string | null
  customerName: string | null
  sentiment: string | null
  platform: string
  createdAt: string
}

interface InsightsData {
  totalReviews: number
  averageRating: number
  ratingDistribution: Record<number, number>
  sentimentBreakdown: { positive: number; neutral: number; negative: number }
}

export default function DashboardOverview() {
  const { business } = useBusinessContext()
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const [insights, setInsights] = useState<InsightsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`/api/reviews?businessId=${business.id}`).then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      }),
      fetch(`/api/insights?businessId=${business.id}`).then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      }),
    ])
      .then(([revs, ins]) => {
        setReviews(Array.isArray(revs) ? revs : [])
        setInsights(ins)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [business.id])

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse border-[#b8dca8]">
              <CardContent className="pt-6">
                <div className="h-8 bg-[#d4f0c0] rounded w-1/2 mb-2" />
                <div className="h-4 bg-[#d4f0c0] rounded w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const recentReviews = reviews.slice(0, 5)
  const thisWeekReviews = reviews.filter((r) => {
    const d = new Date(r.createdAt)
    const now = new Date()
    return now.getTime() - d.getTime() < 7 * 24 * 60 * 60 * 1000
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">{business.name}</h1>
        <p className="text-muted-foreground">
          Review dashboard overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <p className="text-3xl font-bold text-[#1a3a2a]">{insights?.totalReviews || 0}</p>
              </div>
              <div className="p-3 bg-[#d4f0c0] rounded-full">
                <MessageSquare className="h-5 w-5 text-[#2d6a4f]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-[#1a3a2a]">
                    {insights?.averageRating?.toFixed(1) || "0.0"}
                  </p>
                  <Star className="h-5 w-5 text-[#f0d040] fill-[#f0d040]" />
                </div>
              </div>
              <div className="p-3 bg-[#fef3c7] rounded-full">
                <Star className="h-5 w-5 text-[#f0d040]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-3xl font-bold text-[#1a3a2a]">{thisWeekReviews.length}</p>
              </div>
              <div className="p-3 bg-[#d4f0c0] rounded-full">
                <TrendingUp className="h-5 w-5 text-[#2d6a4f]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Positive</p>
                <p className="text-3xl font-bold text-[#1a3a2a]">
                  {insights?.sentimentBreakdown
                    ? Math.round(
                        (insights.sentimentBreakdown.positive /
                          Math.max(insights.totalReviews, 1)) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="p-3 bg-[#d4f0c0] rounded-full">
                <ThumbsUp className="h-5 w-5 text-[#2d6a4f]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rating Distribution */}
      {insights && insights.totalReviews > 0 && (
        <Card className="border-[#b8dca8]">
          <CardHeader>
            <CardTitle className="text-base text-[#1a3a2a]">Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((r) => {
                const count = insights.ratingDistribution[r] || 0
                const pct = (count / insights.totalReviews) * 100
                return (
                  <div key={r} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-4 text-[#1a3a2a]">{r}</span>
                    <Star className="h-4 w-4 text-[#f0d040] fill-[#f0d040]" />
                    <div className="flex-1 h-2.5 bg-[#eef8e6] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#f0d040] rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8 text-right">
                      {count}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Reviews */}
      <Card className="border-[#b8dca8]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base text-[#1a3a2a]">Recent Reviews</CardTitle>
          {reviews.length > 0 && (
            <Link href="/dashboard/reviews" className="text-xs text-[#2d6a4f] hover:underline flex items-center gap-1">
              View all <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </CardHeader>
        <CardContent>
          {recentReviews.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-10 w-10 mx-auto mb-3 text-[#b8dca8]" />
              <p className="font-medium text-[#1a3a2a]">No reviews yet</p>
              <p className="text-sm mt-1 text-[#5a6b5a]">
                Share your review link to start collecting feedback
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-[#2d6a4f]">
                <LinkIcon className="h-4 w-4" />
                <code className="bg-[#eef8e6] px-2 py-1 rounded">/r/{business.slug}</code>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {recentReviews.map((r) => (
                <div
                  key={r.id}
                  className="flex gap-4 p-3 rounded-lg hover:bg-[#eef8e6] transition-colors"
                >
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#d4f0c0] flex items-center justify-center text-[#1a3a2a] font-medium text-sm">
                      {r.customerName
                        ? r.customerName[0].toUpperCase()
                        : "?"}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-[#1a3a2a]">
                        {r.customerName || "Anonymous"}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < r.rating
                                ? "text-[#f0d040] fill-[#f0d040]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge
                        variant={
                          r.sentiment === "positive"
                            ? "default"
                            : r.sentiment === "negative"
                            ? "destructive"
                            : "secondary"
                        }
                        className={`text-[10px] ${
                          r.sentiment === "positive"
                            ? "bg-[#d4f0c0] text-[#1a3a2a] hover:bg-[#d4f0c0]"
                            : ""
                        }`}
                      >
                        {r.sentiment}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {r.finalReview || r.generatedReview}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {timeAgo(r.createdAt)}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {r.platform}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
