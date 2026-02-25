"use client"

import { useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  TrendingUp,
  TrendingDown,
  Star,
  Award,
  AlertTriangle,
  Send,
  Download,
  ChevronRight,
  ArrowLeft,
  Quote,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
} from "lucide-react"
import { toast } from "sonner"

interface StaffMember {
  id: string
  name: string
  initials: string
  avatarColor: string
  mentions: number
  sentimentPositive: number
  trend: number
  role: string
  praiseCategories: { label: string; count: number }[]
  complaintPatterns: { label: string; count: number }[]
  reviewQuotes: { text: string; stars: number; date: string }[]
  sentimentHistory: { month: string; sentiment: number }[]
}

const staffData: StaffMember[] = [
  {
    id: "staff-1",
    name: "Marco",
    initials: "MA",
    avatarColor: "#1a3a2a",
    mentions: 47,
    sentimentPositive: 96,
    trend: 12,
    role: "Senior Server",
    praiseCategories: [
      { label: "Being friendly", count: 23 },
      { label: "Great recommendations", count: 12 },
      { label: "Remembering customers", count: 8 },
      { label: "Fast service", count: 4 },
    ],
    complaintPatterns: [
      { label: "Slow on busy nights", count: 2 },
    ],
    reviewQuotes: [
      { text: "Marco remembered our anniversary and brought a complimentary dessert. Absolutely wonderful service!", stars: 5, date: "2026-02-18" },
      { text: "Our server Marco made fantastic wine recommendations that paired perfectly with our meal.", stars: 5, date: "2026-02-12" },
      { text: "Marco greeted us by name even though we've only been here twice. That personal touch makes all the difference.", stars: 5, date: "2026-02-05" },
      { text: "Service was a bit slow on Saturday night but Marco was very apologetic and attentive otherwise.", stars: 4, date: "2026-01-28" },
    ],
    sentimentHistory: [
      { month: "Sep", sentiment: 88 },
      { month: "Oct", sentiment: 90 },
      { month: "Nov", sentiment: 92 },
      { month: "Dec", sentiment: 93 },
      { month: "Jan", sentiment: 94 },
      { month: "Feb", sentiment: 96 },
    ],
  },
  {
    id: "staff-2",
    name: "Sarah",
    initials: "SA",
    avatarColor: "#2d6a4f",
    mentions: 34,
    sentimentPositive: 94,
    trend: 8,
    role: "Host / Manager",
    praiseCategories: [
      { label: "Warm greeting", count: 15 },
      { label: "Handling complaints well", count: 9 },
      { label: "Making reservations easy", count: 7 },
      { label: "Accommodating requests", count: 3 },
    ],
    complaintPatterns: [
      { label: "Wait time communication", count: 2 },
    ],
    reviewQuotes: [
      { text: "Sarah at the front was so welcoming. She made us feel like VIPs from the moment we walked in.", stars: 5, date: "2026-02-20" },
      { text: "We had an issue with our table and Sarah handled it gracefully, upgrading us without us even asking.", stars: 5, date: "2026-02-14" },
      { text: "Sarah could have been clearer about the wait time but she was very kind when we asked.", stars: 4, date: "2026-02-01" },
    ],
    sentimentHistory: [
      { month: "Sep", sentiment: 86 },
      { month: "Oct", sentiment: 89 },
      { month: "Nov", sentiment: 90 },
      { month: "Dec", sentiment: 91 },
      { month: "Jan", sentiment: 93 },
      { month: "Feb", sentiment: 94 },
    ],
  },
  {
    id: "staff-3",
    name: "Ahmed",
    initials: "AH",
    avatarColor: "#52b788",
    mentions: 23,
    sentimentPositive: 87,
    trend: 3,
    role: "Bartender",
    praiseCategories: [
      { label: "Creative cocktails", count: 11 },
      { label: "Knowledgeable about drinks", count: 7 },
      { label: "Entertaining", count: 3 },
      { label: "Quick drink prep", count: 2 },
    ],
    complaintPatterns: [
      { label: "Distracted during rush", count: 2 },
      { label: "Inconsistent pours", count: 1 },
    ],
    reviewQuotes: [
      { text: "Ahmed crafted an incredible custom cocktail for my partner based on her flavor preferences. True artistry!", stars: 5, date: "2026-02-16" },
      { text: "The bartender Ahmed knows his stuff. Great recommendations for whiskey lovers.", stars: 5, date: "2026-02-08" },
      { text: "Ahmed seemed a bit distracted on a busy Friday, but the drinks were still excellent.", stars: 4, date: "2026-01-30" },
    ],
    sentimentHistory: [
      { month: "Sep", sentiment: 82 },
      { month: "Oct", sentiment: 83 },
      { month: "Nov", sentiment: 84 },
      { month: "Dec", sentiment: 85 },
      { month: "Jan", sentiment: 86 },
      { month: "Feb", sentiment: 87 },
    ],
  },
  {
    id: "staff-4",
    name: "Jamie",
    initials: "JA",
    avatarColor: "#95d5b2",
    mentions: 8,
    sentimentPositive: 62,
    trend: -2,
    role: "New Server (2 weeks)",
    praiseCategories: [
      { label: "Polite", count: 3 },
      { label: "Eager to help", count: 2 },
    ],
    complaintPatterns: [
      { label: "Seemed rushed", count: 3 },
      { label: "Got order wrong", count: 2 },
      { label: "Forgot to check back", count: 1 },
    ],
    reviewQuotes: [
      { text: "Our server Jamie was polite but seemed quite rushed and forgot our drink refills.", stars: 3, date: "2026-02-21" },
      { text: "Jamie mixed up our orders which was frustrating, though they were very apologetic about it.", stars: 2, date: "2026-02-17" },
      { text: "Jamie was eager and friendly. You can tell they're new but trying hard!", stars: 4, date: "2026-02-13" },
    ],
    sentimentHistory: [
      { month: "Sep", sentiment: 0 },
      { month: "Oct", sentiment: 0 },
      { month: "Nov", sentiment: 0 },
      { month: "Dec", sentiment: 0 },
      { month: "Jan", sentiment: 68 },
      { month: "Feb", sentiment: 62 },
    ],
  },
]

const topPraiseCategories = [
  { label: "Friendliness", total: 41, color: "#2d6a4f" },
  { label: "Menu knowledge", total: 30, color: "#40916c" },
  { label: "Warm greetings", total: 22, color: "#52b788" },
  { label: "Remembering regulars", total: 15, color: "#74c69d" },
  { label: "Handling issues well", total: 13, color: "#95d5b2" },
  { label: "Speed of service", total: 10, color: "#b7e4c7" },
]

const maxPraise = Math.max(...topPraiseCategories.map((c) => c.total))

function SentimentBar({ value }: { value: number }) {
  const getColor = (v: number) => {
    if (v >= 90) return "bg-emerald-500"
    if (v >= 75) return "bg-green-400"
    if (v >= 60) return "bg-yellow-400"
    return "bg-red-400"
  }
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${getColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-[#1a3a2a] w-10 text-right">{value}%</span>
    </div>
  )
}

function TrendIndicator({ trend }: { trend: number }) {
  if (trend > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-emerald-600 text-xs font-semibold">
        <TrendingUp className="h-3.5 w-3.5" />
        +{trend}
      </span>
    )
  }
  if (trend < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-red-500 text-xs font-semibold">
        <TrendingDown className="h-3.5 w-3.5" />
        {trend}
      </span>
    )
  }
  return (
    <span className="text-xs text-[#5a6b5a] font-medium">--</span>
  )
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  )
}

function MiniSentimentChart({ data }: { data: { month: string; sentiment: number }[] }) {
  const filtered = data.filter((d) => d.sentiment > 0)
  if (filtered.length === 0) return <span className="text-xs text-[#5a6b5a]">No data</span>
  const max = 100
  const min = 0
  const chartWidth = 200
  const chartHeight = 48
  const paddingX = 4
  const paddingY = 4
  const effectiveWidth = chartWidth - paddingX * 2
  const effectiveHeight = chartHeight - paddingY * 2

  const points = filtered.map((d, i) => {
    const x = paddingX + (i / Math.max(filtered.length - 1, 1)) * effectiveWidth
    const y = paddingY + effectiveHeight - ((d.sentiment - min) / (max - min)) * effectiveHeight
    return { x, y, ...d }
  })

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ")

  return (
    <svg width={chartWidth} height={chartHeight} className="overflow-visible">
      <path d={pathD} fill="none" stroke="#2d6a4f" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#2d6a4f" />
      ))}
      {points.map((p, i) => (
        <text key={`label-${i}`} x={p.x} y={chartHeight + 10} textAnchor="middle" className="text-[9px] fill-[#5a6b5a]">
          {p.month}
        </text>
      ))}
    </svg>
  )
}

export default function StaffPage() {
  const { business } = useBusinessContext()
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null)

  const selectedStaff = staffData.find((s) => s.id === selectedStaffId) || null

  function handleShareWithStaff(name: string) {
    toast.success(`Recognition email sent to ${name}!`)
  }

  function handleExportForHR() {
    toast.success("Staff report downloaded")
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3a2a]">Staff Performance Insights</h1>
          <p className="text-[#5a6b5a]">
            Review-based intelligence for {business.name}&apos;s team
          </p>
        </div>
        <Button
          variant="outline"
          className="border-[#b8dca8] text-[#2d6a4f] hover:bg-[#eef8e6] gap-2"
          onClick={handleExportForHR}
        >
          <Download className="h-4 w-4" />
          Export for HR
        </Button>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4 text-center">
            <Users className="h-5 w-5 mx-auto mb-1 text-[#2d6a4f]" />
            <p className="text-2xl font-bold text-[#1a3a2a]">{staffData.length}</p>
            <p className="text-xs text-[#5a6b5a]">Staff Tracked</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4 text-center">
            <MessageSquare className="h-5 w-5 mx-auto mb-1 text-[#2d6a4f]" />
            <p className="text-2xl font-bold text-[#1a3a2a]">
              {staffData.reduce((sum, s) => sum + s.mentions, 0)}
            </p>
            <p className="text-xs text-[#5a6b5a]">Total Mentions</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4 text-center">
            <ThumbsUp className="h-5 w-5 mx-auto mb-1 text-[#2d6a4f]" />
            <p className="text-2xl font-bold text-[#1a3a2a]">
              {Math.round(
                staffData.reduce((sum, s) => sum + s.sentimentPositive * s.mentions, 0) /
                  staffData.reduce((sum, s) => sum + s.mentions, 0)
              )}%
            </p>
            <p className="text-xs text-[#5a6b5a]">Avg Positive</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4 text-center">
            <Award className="h-5 w-5 mx-auto mb-1 text-[#2d6a4f]" />
            <p className="text-2xl font-bold text-[#1a3a2a]">Marco</p>
            <p className="text-xs text-[#5a6b5a]">Top Performer</p>
          </CardContent>
        </Card>
      </div>

      {/* Main content area: leaderboard or detail */}
      {selectedStaff ? (
        /* ===== Individual Staff Detail View ===== */
        <div className="space-y-5">
          <button
            onClick={() => setSelectedStaffId(null)}
            className="flex items-center gap-1.5 text-sm text-[#2d6a4f] hover:text-[#1a3a2a] font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Leaderboard
          </button>

          {/* Staff header card */}
          <Card className="border-[#b8dca8]">
            <CardContent className="pt-6 pb-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                  style={{ backgroundColor: selectedStaff.avatarColor }}
                >
                  {selectedStaff.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl font-bold text-[#1a3a2a]">{selectedStaff.name}</h2>
                    <Badge variant="secondary" className="bg-[#d4f0c0] text-[#1a3a2a]">
                      {selectedStaff.role}
                    </Badge>
                    <TrendIndicator trend={selectedStaff.trend} />
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-sm text-[#5a6b5a]">
                    <span>{selectedStaff.mentions} review mentions</span>
                    <span>{selectedStaff.sentimentPositive}% positive sentiment</span>
                  </div>
                </div>
                <Button
                  className="bg-[#1a3a2a] text-white hover:bg-[#0f2a1c] gap-2 shrink-0"
                  onClick={() => handleShareWithStaff(selectedStaff.name)}
                >
                  <Send className="h-4 w-4" />
                  Share with Staff
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Praise Categories */}
            <Card className="border-[#b8dca8]">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                  <ThumbsUp className="h-4 w-4 text-emerald-500" />
                  What Customers Praise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedStaff.praiseCategories.map((cat) => (
                    <div key={cat.label} className="flex items-center gap-3">
                      <Badge variant="success" className="text-xs shrink-0">
                        {cat.label}
                      </Badge>
                      <div className="flex-1">
                        <Progress
                          value={(cat.count / selectedStaff.mentions) * 100}
                          className="h-2 bg-[#eef8e6] [&>div]:bg-emerald-500"
                        />
                      </div>
                      <span className="text-xs text-[#5a6b5a] font-medium w-20 text-right">
                        {cat.count} mentions
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Complaint Patterns */}
            <Card className="border-[#b8dca8]">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                  <ThumbsDown className="h-4 w-4 text-amber-500" />
                  Complaint Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedStaff.complaintPatterns.length === 0 ? (
                  <p className="text-sm text-[#5a6b5a] py-4 text-center">
                    No complaint patterns detected
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedStaff.complaintPatterns.map((pat) => (
                      <div key={pat.label} className="flex items-center gap-3">
                        <Badge variant="warning" className="text-xs shrink-0">
                          {pat.label}
                        </Badge>
                        <div className="flex-1">
                          <Progress
                            value={(pat.count / selectedStaff.mentions) * 100}
                            className="h-2 bg-[#eef8e6] [&>div]:bg-amber-400"
                          />
                        </div>
                        <span className="text-xs text-[#5a6b5a] font-medium w-20 text-right">
                          {pat.count} mentions
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sentiment Trend */}
          <Card className="border-[#b8dca8]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <TrendingUp className="h-4 w-4 text-[#2d6a4f]" />
                Sentiment Trend (6 months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-2">
                <MiniSentimentChart data={selectedStaff.sentimentHistory} />
              </div>
            </CardContent>
          </Card>

          {/* Review Quotes */}
          <Card className="border-[#b8dca8]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Quote className="h-4 w-4 text-[#2d6a4f]" />
                Recent Review Quotes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedStaff.reviewQuotes.map((quote, idx) => (
                  <div
                    key={idx}
                    className="bg-[#eef8e6] rounded-lg p-4 border border-[#d4f0c0]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <StarRating stars={quote.stars} />
                      <span className="text-xs text-[#5a6b5a]">{quote.date}</span>
                    </div>
                    <p className="text-sm text-[#1a3a2a] leading-relaxed italic">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* ===== Leaderboard & Overview View ===== */
        <div className="space-y-6">
          {/* Staff Leaderboard */}
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Award className="h-4 w-4 text-[#2d6a4f]" />
                Staff Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {/* Table header */}
                <div className="grid grid-cols-12 gap-3 px-3 py-2 text-xs font-semibold text-[#5a6b5a] uppercase tracking-wide">
                  <div className="col-span-1">#</div>
                  <div className="col-span-3">Staff</div>
                  <div className="col-span-2 text-center">Mentions</div>
                  <div className="col-span-3">Sentiment</div>
                  <div className="col-span-2 text-center">Trend</div>
                  <div className="col-span-1" />
                </div>
                {/* Staff rows */}
                {staffData.map((member, idx) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedStaffId(member.id)}
                    className="grid grid-cols-12 gap-3 items-center px-3 py-3 rounded-lg w-full text-left hover:bg-[#eef8e6] transition-colors group"
                  >
                    <div className="col-span-1">
                      <span className={`text-sm font-bold ${idx === 0 ? "text-[#2d6a4f]" : "text-[#5a6b5a]"}`}>
                        {idx + 1}
                      </span>
                    </div>
                    <div className="col-span-3 flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0"
                        style={{ backgroundColor: member.avatarColor }}
                      >
                        {member.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1a3a2a] truncate">{member.name}</p>
                        <p className="text-[11px] text-[#5a6b5a] truncate">{member.role}</p>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="text-sm font-bold text-[#1a3a2a]">{member.mentions}</span>
                    </div>
                    <div className="col-span-3">
                      <SentimentBar value={member.sentimentPositive} />
                    </div>
                    <div className="col-span-2 text-center">
                      <TrendIndicator trend={member.trend} />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <ChevronRight className="h-4 w-4 text-[#b8dca8] group-hover:text-[#2d6a4f] transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Trends Overview */}
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <TrendingUp className="h-4 w-4 text-[#2d6a4f]" />
                Staff Sentiment Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {staffData.map((member) => (
                  <div key={member.id} className="flex items-center gap-4">
                    <div className="shrink-0 w-16 text-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs mx-auto mb-1"
                        style={{ backgroundColor: member.avatarColor }}
                      >
                        {member.initials}
                      </div>
                      <p className="text-xs font-medium text-[#1a3a2a]">{member.name}</p>
                    </div>
                    <MiniSentimentChart data={member.sentimentHistory} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coaching Alerts */}
            <Card className="border-amber-300 bg-amber-50/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-amber-800">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Coaching Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0 mt-0.5"
                        style={{ backgroundColor: "#95d5b2" }}
                      >
                        JA
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-amber-800">Jamie needs attention</p>
                        <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                          Jamie has 3 mentions of &ldquo;seemed rushed&rdquo; and 2 mentions of
                          &ldquo;got order wrong&rdquo;. Consider additional training on
                          order accuracy and time management.
                        </p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <Badge variant="warning" className="text-xs">62% positive</Badge>
                          <Badge variant="warning" className="text-xs">Negative trend</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0 mt-0.5"
                        style={{ backgroundColor: "#52b788" }}
                      >
                        AH
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-amber-800">Ahmed: monitor weekend performance</p>
                        <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                          Ahmed has 2 mentions of being &ldquo;distracted during rush&rdquo; hours.
                          Consider reviewing staffing levels during peak times or
                          providing rush-hour workflow tips.
                        </p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <Badge variant="warning" className="text-xs">87% positive</Badge>
                          <Badge variant="secondary" className="text-xs">Slight concern</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Praise Categories */}
            <Card className="border-[#b8dca8]">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                  <Star className="h-4 w-4 text-[#2d6a4f]" />
                  Top Praise Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPraiseCategories.map((cat) => (
                    <div key={cat.label} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#1a3a2a]">{cat.label}</span>
                        <span className="text-xs text-[#5a6b5a]">{cat.total} mentions</span>
                      </div>
                      <div className="h-3 rounded-full bg-[#eef8e6] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${(cat.total / maxPraise) * 100}%`,
                            backgroundColor: cat.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recognition Quick Actions */}
          <Card className="border-[#b8dca8] bg-[#d4f0c0]/30">
            <CardContent className="pt-6 pb-5">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-[#1a3a2a]">
                    Recognize your top performers
                  </h3>
                  <p className="text-sm text-[#5a6b5a] mt-0.5">
                    Share performance insights with staff or export a detailed report for HR review.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Button
                    className="bg-[#1a3a2a] text-white hover:bg-[#0f2a1c] gap-2"
                    onClick={() => handleShareWithStaff("Marco")}
                  >
                    <Send className="h-4 w-4" />
                    Share with Staff
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#b8dca8] text-[#2d6a4f] hover:bg-[#eef8e6] gap-2"
                    onClick={handleExportForHR}
                  >
                    <Download className="h-4 w-4" />
                    Export for HR
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
