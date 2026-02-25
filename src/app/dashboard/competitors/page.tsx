"use client"

import { useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Plus,
  Star,
  Eye,
  BarChart3,
  Users,
} from "lucide-react"

interface Competitor {
  name: string
  rating: number
  reviewCount: number
  responseRate: number
}

interface CompetitorReview {
  competitor: string
  author: string
  rating: number
  text: string
  date: string
}

const MOCK_COMPETITORS: Competitor[] = [
  { name: "Tokyo Garden", rating: 4.2, reviewCount: 324, responseRate: 45 },
  { name: "Sushi Palace", rating: 3.8, reviewCount: 189, responseRate: 23 },
  { name: "Noodle House", rating: 4.4, reviewCount: 512, responseRate: 67 },
]

const YOUR_STATS = {
  rating: 4.6,
  reviewCount: 847,
  responseRate: 92,
}

const MOCK_COMPETITOR_REVIEWS: CompetitorReview[] = [
  {
    competitor: "Tokyo Garden",
    author: "Mike R.",
    rating: 2,
    text: "Waited 45 minutes for our food. The sushi was decent but the slow service really ruined the experience. Staff seemed overwhelmed and disorganized.",
    date: "2 days ago",
  },
  {
    competitor: "Sushi Palace",
    author: "Linda K.",
    rating: 1,
    text: "Terrible experience. Fish tasted off and when we complained, the manager was dismissive. No one ever responded to my Google review either. Won't be back.",
    date: "5 days ago",
  },
  {
    competitor: "Noodle House",
    author: "James T.",
    rating: 2,
    text: "Used to love this place but quality has gone downhill. Portions are smaller, prices are higher, and they no longer seem to care about customer feedback.",
    date: "1 week ago",
  },
]

function ComparisonBar({
  label,
  yourValue,
  competitorValue,
  maxValue,
  suffix = "",
  higherIsBetter = true,
}: {
  label: string
  yourValue: number
  competitorValue: number
  maxValue: number
  suffix?: string
  higherIsBetter?: boolean
}) {
  const youWin = higherIsBetter
    ? yourValue >= competitorValue
    : yourValue <= competitorValue
  const competitorWins = !youWin

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#5a6b5a]">{label}</span>
        <div className="flex items-center gap-3">
          <span className={`font-semibold ${youWin ? "text-emerald-600" : "text-[#1a3a2a]"}`}>
            {yourValue}
            {suffix}
          </span>
          <span className="text-[#b8dca8]">vs</span>
          <span className={`font-semibold ${competitorWins ? "text-red-500" : "text-[#5a6b5a]"}`}>
            {competitorValue}
            {suffix}
          </span>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${youWin ? "bg-emerald-500" : "bg-emerald-300"}`}
            style={{ width: `${(yourValue / maxValue) * 100}%` }}
          />
        </div>
        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${competitorWins ? "bg-red-400" : "bg-gray-300"}`}
            style={{ width: `${(competitorValue / maxValue) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3.5 w-3.5 ${
            s <= Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-200 fill-gray-200"
          }`}
        />
      ))}
    </div>
  )
}

export default function CompetitorsPage() {
  const { business } = useBusinessContext()
  const [competitors, setCompetitors] = useState<Competitor[]>(MOCK_COMPETITORS)
  const [newCompetitorName, setNewCompetitorName] = useState("")

  function handleAddCompetitor(e: React.FormEvent) {
    e.preventDefault()
    const name = newCompetitorName.trim()
    if (!name) return

    const newCompetitor: Competitor = {
      name,
      rating: parseFloat((3.0 + Math.random() * 1.5).toFixed(1)),
      reviewCount: Math.floor(50 + Math.random() * 300),
      responseRate: Math.floor(10 + Math.random() * 60),
    }

    setCompetitors((prev) => [...prev, newCompetitor])
    setNewCompetitorName("")
    toast.success("Competitor added")
  }

  const avgCompetitorRating =
    competitors.reduce((sum, c) => sum + c.rating, 0) / competitors.length
  const avgCompetitorReviews =
    Math.round(
      competitors.reduce((sum, c) => sum + c.reviewCount, 0) / competitors.length
    )
  const avgCompetitorResponseRate =
    Math.round(
      competitors.reduce((sum, c) => sum + c.responseRate, 0) / competitors.length
    )

  const closestRatingCompetitor = [...competitors].sort(
    (a, b) => Math.abs(b.rating - YOUR_STATS.rating) - Math.abs(a.rating - YOUR_STATS.rating)
  )[competitors.length - 1]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Competitor Tracking</h1>
        <p className="text-[#5a6b5a]">
          Monitor how you compare to nearby businesses
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4f0c0] flex items-center justify-center">
                <Target className="h-5 w-5 text-[#2d6a4f]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a3a2a]">#1</p>
                <p className="text-xs text-[#5a6b5a]">Market Position</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4f0c0] flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-[#2d6a4f]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a3a2a]">
                  +{(YOUR_STATS.rating - avgCompetitorRating).toFixed(1)}
                </p>
                <p className="text-xs text-[#5a6b5a]">Rating Advantage</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4f0c0] flex items-center justify-center">
                <Users className="h-5 w-5 text-[#2d6a4f]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a3a2a]">
                  {competitors.length}
                </p>
                <p className="text-xs text-[#5a6b5a]">Tracked Competitors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Competitor */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Plus className="h-4 w-4" />
            Add Competitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCompetitor} className="flex gap-3">
            <Input
              placeholder="Business name..."
              value={newCompetitorName}
              onChange={(e) => setNewCompetitorName(e.target.value)}
              className="border-[#b8dca8] focus-visible:ring-[#2d6a4f]"
            />
            <Button
              type="submit"
              disabled={!newCompetitorName.trim()}
              className="bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6] shrink-0"
            >
              Track
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comparison Overview */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <BarChart3 className="h-4 w-4" />
            Comparison Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Your Business Header */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#eef8e6] border border-[#b8dca8]">
              <div className="w-10 h-10 rounded-full bg-[#1a3a2a] flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">
                  {business.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#1a3a2a] truncate">
                  {business.name}
                  <Badge className="ml-2 bg-[#d4f0c0] text-[#2d6a4f] border-0 text-[10px]">
                    You
                  </Badge>
                </p>
                <div className="flex items-center gap-3 text-xs text-[#5a6b5a]">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    {YOUR_STATS.rating}
                  </span>
                  <span>{YOUR_STATS.reviewCount} reviews</span>
                  <span>{YOUR_STATS.responseRate}% response</span>
                </div>
              </div>
            </div>

            {/* Competitor Comparisons */}
            <div className="space-y-5">
              {competitors.map((competitor) => (
                <div key={competitor.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <span className="text-[#5a6b5a] font-semibold text-xs">
                          {competitor.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-sm text-[#1a3a2a]">
                        {competitor.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={competitor.rating} />
                      <span className="text-xs text-[#5a6b5a] ml-1">
                        {competitor.rating}
                      </span>
                    </div>
                  </div>

                  <div className="pl-10 space-y-2">
                    <ComparisonBar
                      label="Rating"
                      yourValue={YOUR_STATS.rating}
                      competitorValue={competitor.rating}
                      maxValue={5}
                    />
                    <ComparisonBar
                      label="Reviews"
                      yourValue={YOUR_STATS.reviewCount}
                      competitorValue={competitor.reviewCount}
                      maxValue={1000}
                    />
                    <ComparisonBar
                      label="Response Rate"
                      yourValue={YOUR_STATS.responseRate}
                      competitorValue={competitor.responseRate}
                      maxValue={100}
                      suffix="%"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Eye className="h-4 w-4" />
            Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Insight 1: Rating Leadership */}
            <div className="flex gap-3 p-3 rounded-lg bg-[#eef8e6]">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-[#1a3a2a] font-medium">
                  Rating Leader
                </p>
                <p className="text-sm text-[#5a6b5a] mt-0.5">
                  Your rating ({YOUR_STATS.rating}) leads the market. The closest
                  competitor is {closestRatingCompetitor?.name} at{" "}
                  {closestRatingCompetitor?.rating}.
                </p>
              </div>
            </div>

            {/* Insight 2: Response Rate */}
            <div className="flex gap-3 p-3 rounded-lg bg-[#eef8e6]">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                <Target className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-[#1a3a2a] font-medium">
                  Response Rate Dominance
                </p>
                <p className="text-sm text-[#5a6b5a] mt-0.5">
                  You respond to {YOUR_STATS.responseRate}% of reviews. The average
                  competitor response rate is {avgCompetitorResponseRate}%. This is a
                  major differentiator.
                </p>
              </div>
            </div>

            {/* Insight 3: Competitor Weakness */}
            <div className="flex gap-3 p-3 rounded-lg bg-[#eef8e6]">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                <TrendingDown className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-[#1a3a2a] font-medium">
                  Competitor Weakness Detected
                </p>
                <p className="text-sm text-[#5a6b5a] mt-0.5">
                  Tokyo Garden&apos;s customers frequently mention &quot;slow
                  service&quot; (mentioned 23 times, 78% negative). Emphasize your
                  speed in marketing.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Reviews */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Star className="h-4 w-4" />
            Competitor Reviews
            <Badge className="bg-[#d4f0c0] text-[#2d6a4f] border-0 text-[10px]">
              Opportunities
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_COMPETITOR_REVIEWS.map((review, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-[#b8dca8] bg-white space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-[10px] border-[#b8dca8] text-[#5a6b5a]"
                    >
                      {review.competitor}
                    </Badge>
                    <StarRating rating={review.rating} />
                  </div>
                  <span className="text-[10px] text-[#5a6b5a] shrink-0">
                    {review.date}
                  </span>
                </div>
                <p className="text-sm text-[#1a3a2a] leading-relaxed">
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[#5a6b5a]">
                    &mdash; {review.author}
                  </span>
                  <Badge className="bg-red-50 text-red-600 border-0 text-[10px]">
                    Negative
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#5a6b5a] text-center mt-4">
            Negative competitor reviews highlight areas where your business can
            stand out. Use these insights to refine your marketing and operations.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
