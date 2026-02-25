"use client"

import { useEffect, useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  TrendingUp,
  TrendingDown,
  ThumbsUp,
  ThumbsDown,
  Minus,
  BarChart3,
  PieChart,
  Loader2,
  Copy,
  Link as LinkIcon,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  PieChart as RechartPie,
  Pie,
  Cell,
} from "recharts"

interface InsightsData {
  totalReviews: number
  averageRating: number
  ratingDistribution: Record<number, number>
  sentimentBreakdown: { positive: number; neutral: number; negative: number }
  topTopics: {
    topic: string
    mentions: number
    positiveCount: number
    negativeCount: number
    sentimentScore: number
  }[]
  recentTrend: { date: string; reviews: number; avgRating: number }[]
  sourceBreakdown: Record<string, number>
}

const SENTIMENT_COLORS = {
  positive: "#22c55e",
  neutral: "#f59e0b",
  negative: "#ef4444",
}

const SOURCE_COLORS = ["#2d6a4f", "#52b788", "#f0d040", "#95d5b2", "#1b4332"]

export default function InsightsPage() {
  const { business } = useBusinessContext()
  const [insights, setInsights] = useState<InsightsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/insights?businessId=${business.id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch")
        return r.json()
      })
      .then(setInsights)
      .catch(() => setInsights(null))
      .finally(() => setLoading(false))
  }, [business.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a4f]" />
      </div>
    )
  }

  if (!insights || insights.totalReviews === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3a2a]">Insights</h1>
          <p className="text-[#5a6b5a]">
            Customer intelligence from your reviews
          </p>
        </div>
        <Card className="border-[#b8dca8]">
          <CardContent className="py-16 text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 text-[#b8dca8]" />
            <p className="font-medium text-[#1a3a2a]">No data yet</p>
            <p className="text-sm text-[#5a6b5a] mt-1">
              Insights will appear once you start collecting reviews
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
              <Button
                size="sm"
                className="gap-1.5 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/r/${business.slug}`)
                  toast.success("Review link copied!")
                }}
              >
                <Copy className="h-3.5 w-3.5" />
                Copy Review Link
              </Button>
              <Link href="/dashboard/campaigns">
                <Button size="sm" variant="outline" className="gap-1.5 border-[#b8dca8]">
                  Send Review Requests
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const sentimentData = [
    { name: "Positive", value: insights.sentimentBreakdown.positive, fill: SENTIMENT_COLORS.positive },
    { name: "Neutral", value: insights.sentimentBreakdown.neutral, fill: SENTIMENT_COLORS.neutral },
    { name: "Negative", value: insights.sentimentBreakdown.negative, fill: SENTIMENT_COLORS.negative },
  ].filter((d) => d.value > 0)

  const ratingData = [5, 4, 3, 2, 1].map((r) => ({
    rating: `${r} star`,
    count: insights.ratingDistribution[r] || 0,
  }))

  const sourceData = Object.entries(insights.sourceBreakdown).map(
    ([source, count], i) => ({
      name: source,
      value: count,
      fill: SOURCE_COLORS[i % SOURCE_COLORS.length],
    })
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Insights</h1>
        <p className="text-muted-foreground">
          Customer intelligence from {insights.totalReviews} reviews
        </p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              <span className="text-3xl font-bold">
                {insights.averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              <span className="text-3xl font-bold">
                {Math.round(
                  (insights.sentimentBreakdown.positive /
                    insights.totalReviews) *
                    100
                )}
                %
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Positive Sentiment</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <span className="text-3xl font-bold">
              {insights.topTopics.length > 0
                ? insights.topTopics[0].topic
                : "N/A"}
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              Most Mentioned Topic
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Pie */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Sentiment Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartPie>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={(props: { name?: string; percent?: number }) =>
                      `${props.name ?? ""} ${((props.percent ?? 0) * 100).toFixed(0)}%`
                    }
                  >
                    {sentimentData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartPie>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Rating Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ratingData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="rating" width={60} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2d6a4f" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review Trend */}
      {insights.recentTrend.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Review Trend (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={insights.recentTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(d) =>
                      new Date(d).toLocaleDateString("en", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                  <Tooltip
                    labelFormatter={(d) =>
                      new Date(d).toLocaleDateString("en", {
                        month: "long",
                        day: "numeric",
                      })
                    }
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="reviews"
                    fill="#2d6a4f"
                    name="Reviews"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgRating"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Avg Rating"
                    dot={{ fill: "#f59e0b" }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Topic Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Topic Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {insights.topTopics.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Need 5+ reviews to analyze topics. You have {insights.totalReviews} so far.
            </p>
          ) : (
            <div className="space-y-4">
              {insights.topTopics.map((topic) => (
                <div key={topic.topic} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm capitalize">
                        {topic.topic}
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        {topic.mentions} mentions
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {topic.sentimentScore > 0.3 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : topic.sentimentScore < -0.3 ? (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      ) : (
                        <Minus className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {topic.positiveCount} positive, {topic.negativeCount}{" "}
                        negative
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-gray-100">
                    {topic.positiveCount > 0 && (
                      <div
                        className="bg-green-400 rounded-full"
                        style={{
                          width: `${
                            (topic.positiveCount / topic.mentions) * 100
                          }%`,
                        }}
                      />
                    )}
                    {topic.mentions - topic.positiveCount - topic.negativeCount >
                      0 && (
                      <div
                        className="bg-yellow-400 rounded-full"
                        style={{
                          width: `${
                            ((topic.mentions -
                              topic.positiveCount -
                              topic.negativeCount) /
                              topic.mentions) *
                            100
                          }%`,
                        }}
                      />
                    )}
                    {topic.negativeCount > 0 && (
                      <div
                        className="bg-red-400 rounded-full"
                        style={{
                          width: `${
                            (topic.negativeCount / topic.mentions) * 100
                          }%`,
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Source Breakdown */}
      {sourceData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Review Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              {sourceData.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: s.fill }}
                  />
                  <span className="text-sm font-medium capitalize">
                    {s.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
