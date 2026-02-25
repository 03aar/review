"use client"

import { useEffect, useState } from "react"
import { useBusinessContext } from "./layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, MessageSquare, ThumbsUp, Clock, ExternalLink, Link as LinkIcon, Shield, AlertTriangle, Copy, CheckCircle2, Circle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { timeAgo } from "@/lib/utils"
import { toast } from "sonner"

interface ReviewData {
  id: string
  rating: number
  finalReview: string | null
  generatedReview: string | null
  customerName: string | null
  sentiment: string | null
  platform: string
  postedToPlatform: boolean
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
      fetch(`/api/reviews?businessId=${business.id}&pageSize=50`).then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      }),
      fetch(`/api/insights?businessId=${business.id}`).then((r) => {
        if (!r.ok) throw new Error()
        return r.json()
      }),
    ])
      .then(([revs, ins]) => {
        // API returns { data: [...], pagination: {...} }
        const reviewList = revs?.data ?? (Array.isArray(revs) ? revs : [])
        setReviews(reviewList)
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

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Dashboard</h1>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6 text-center py-12">
            <p className="text-[#1a3a2a] font-medium">Failed to load dashboard data</p>
            <p className="text-sm text-muted-foreground mt-1">Please try refreshing the page.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const recentReviews = reviews.slice(0, 5)
  const thisWeekReviews = reviews.filter((r) => {
    const d = new Date(r.createdAt)
    const now = new Date()
    return now.getTime() - d.getTime() < 7 * 24 * 60 * 60 * 1000
  })

  // Reputation Score calculation
  const totalReviews = insights?.totalReviews || 0
  const averageRating = insights?.averageRating || 0
  const positivePercentage = insights?.sentimentBreakdown
    ? (insights.sentimentBreakdown.positive / Math.max(totalReviews, 1)) * 100
    : 0
  const reputationBase = (averageRating / 5) * 50
  const reputationVolume = (Math.min(totalReviews, 50) / 50) * 20
  const reputationSentiment = (positivePercentage / 100) * 20
  const reputationRecency = (Math.min(thisWeekReviews.length, 5) / 5) * 10
  const reputationScore = Math.round(reputationBase + reputationVolume + reputationSentiment + reputationRecency)
  const reputationColor = reputationScore < 40 ? "#ef4444" : reputationScore <= 70 ? "#eab308" : "#22c55e"

  // Needs Attention: low-rated reviews not yet responded to
  const needsAttentionReviews = reviews.filter(
    (r) => r.rating <= 2 && r.postedToPlatform === false
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">{business.name}</h1>
        <p className="text-muted-foreground">
          Review dashboard overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reputation Score</p>
                <p className="text-3xl font-bold" style={{ color: reputationColor }}>
                  {reputationScore}
                </p>
              </div>
              <div className="relative flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="#eef8e6"
                    strokeWidth="4"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke={reputationColor}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${(reputationScore / 100) * 125.66} 125.66`}
                    transform="rotate(-90 24 24)"
                  />
                </svg>
                <Shield className="h-4 w-4 absolute" style={{ color: reputationColor }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onboarding Checklist — shown when new user has no reviews */}
      {totalReviews === 0 && (
        <Card className="border-[#2d6a4f]/30 bg-[#eef8e6]">
          <CardHeader>
            <CardTitle className="text-base text-[#1a3a2a] flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#2d6a4f]" />
              Get started in 3 steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#b8dca8]">
              <div className="shrink-0 mt-0.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#2d6a4f] text-white text-xs font-bold">1</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1a3a2a]">Copy your review link</p>
                <p className="text-xs text-[#5a6b5a] mt-0.5">Share this link with customers to collect reviews</p>
                <div className="flex items-center gap-2 mt-2">
                  <code className="text-xs bg-[#eef8e6] px-2 py-1 rounded border border-[#b8dca8] text-[#2d6a4f]">
                    {typeof window !== "undefined" ? window.location.origin : ""}/r/{business.slug}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-xs border-[#b8dca8]"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/r/${business.slug}`)
                      toast.success("Review link copied!")
                    }}
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#b8dca8]">
              <div className="shrink-0 mt-0.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#2d6a4f] text-white text-xs font-bold">2</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1a3a2a]">Send it to a customer</p>
                <p className="text-xs text-[#5a6b5a] mt-0.5">Email, text, or add it to a receipt — however you reach customers</p>
                <Link href="/dashboard/campaigns">
                  <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-[#b8dca8]">
                    Send review requests
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-[#b8dca8] border-dashed">
              <div className="shrink-0 mt-0.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#b8dca8] text-white text-xs font-bold">3</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#5a6b5a]">Watch reviews roll in</p>
                <p className="text-xs text-[#5a6b5a] mt-0.5">AI will polish each review and you can respond from your dashboard</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Needs Attention */}
      <Card className="border-[#f59e0b]/30 bg-[#fffbeb]">
        <CardHeader>
          <CardTitle className="text-base text-[#92400e] flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#f59e0b]" />
            Needs Attention
          </CardTitle>
        </CardHeader>
        <CardContent>
          {needsAttentionReviews.length === 0 ? (
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-2 text-[#16a34a] bg-[#dcfce7] px-4 py-2 rounded-full">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm font-medium">All caught up!</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {needsAttentionReviews.map((r) => (
                <div
                  key={r.id}
                  className="flex gap-4 p-3 rounded-lg border border-[#f59e0b]/20 bg-white"
                >
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#fef3c7] flex items-center justify-center text-[#92400e] font-medium text-sm">
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
                                ? "text-[#f59e0b] fill-[#f59e0b]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#5a6b5a]">
                        {timeAgo(r.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {r.finalReview || r.generatedReview}
                    </p>
                    <div className="mt-2">
                      <Link href="/dashboard/reviews">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs border-[#f59e0b]/40 text-[#92400e] hover:bg-[#fef3c7]"
                        >
                          View & Respond
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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
