"use client"

import { useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Star,
  MapPin,
  Eye,
  DollarSign,
  Calendar,
  Download,
  Share2,
  Trophy,
  Target,
  Users,
  CheckCircle2,
  Sparkles,
  BarChart3,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts"

// --- Mock Data ---

const RATING_TREND_DATA = [
  { month: "Sep", rating: 4.1, reviews: 3 },
  { month: "Oct", rating: 4.15, reviews: 8 },
  { month: "Nov", rating: 4.28, reviews: 14 },
  { month: "Dec", rating: 4.38, reviews: 17 },
  { month: "Jan", rating: 4.51, reviews: 21 },
  { month: "Feb", rating: 4.6, reviews: 19 },
]

const REVIEW_VOLUME_DATA = [
  { month: "Sep", before: 2, after: 0 },
  { month: "Oct", before: 3, after: 8 },
  { month: "Nov", before: 2, after: 14 },
  { month: "Dec", before: 1, after: 17 },
  { month: "Jan", before: 3, after: 21 },
  { month: "Feb", before: 2, after: 19 },
]

const MILESTONES = [
  {
    title: "First 50 reviews collected",
    date: "Nov 12, 2025",
    icon: Trophy,
    achieved: true,
  },
  {
    title: "Reached 4.5-star average",
    date: "Dec 28, 2025",
    icon: Star,
    achieved: true,
  },
  {
    title: "Broke into Google Maps top 5",
    date: "Jan 9, 2026",
    icon: MapPin,
    achieved: true,
  },
  {
    title: "100th review milestone",
    date: "Jan 31, 2026",
    icon: Sparkles,
    achieved: true,
  },
  {
    title: "200 reviews collected",
    date: "In progress",
    icon: Target,
    achieved: false,
  },
]

// --- Helper Components ---

function BeforeAfterMetric({
  label,
  before,
  after,
  improvement,
  icon: Icon,
}: {
  label: string
  before: string
  after: string
  improvement: string
  icon: React.ElementType
}) {
  return (
    <Card className="border-[#b8dca8]">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#d4f0c0] flex items-center justify-center">
            <Icon className="h-5 w-5 text-[#2d6a4f]" />
          </div>
          <Badge className="bg-[#d4f0c0] text-[#2d6a4f] border-0 text-[10px] font-bold">
            {improvement}
          </Badge>
        </div>
        <p className="text-xs text-[#5a6b5a] font-medium mb-2">{label}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg text-[#5a6b5a] line-through">{before}</span>
          <ArrowRight className="h-4 w-4 text-[#b8dca8]" />
          <span className="text-2xl font-bold text-[#1a3a2a]">{after}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// --- Main Page ---

export default function ROIPage() {
  const { business } = useBusinessContext()
  const [ticketSize, setTicketSize] = useState(45)

  const additionalCustomers = 34
  const estimatedRevenue = additionalCustomers * ticketSize
  const reviewForgeCost = 79
  const roiPercent = Math.round(((estimatedRevenue - reviewForgeCost) / reviewForgeCost) * 100)

  function handleDownloadReport() {
    toast.success("ROI report downloaded", {
      description: "The PDF report has been saved to your downloads folder.",
    })
  }

  function handleShareReport() {
    toast.success("Share link copied to clipboard", {
      description: "Send this link to your business partner or stakeholders.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3a2a]">ROI Dashboard</h1>
          <p className="text-[#5a6b5a]">
            Measuring the impact of ReviewForge on {business.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-[#b8dca8] text-[#2d6a4f] text-xs px-3 py-1"
          >
            <Calendar className="h-3 w-3 mr-1.5" />
            Member for 87 days
          </Badge>
        </div>
      </div>

      {/* Before / After Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <BeforeAfterMetric
          label="Reviews per Month"
          before="2.3/mo"
          after="18.7/mo"
          improvement="+712%"
          icon={BarChart3}
        />
        <BeforeAfterMetric
          label="Average Rating"
          before="4.1"
          after="4.6"
          improvement="+0.5 stars"
          icon={Star}
        />
        <BeforeAfterMetric
          label="Google Maps Ranking"
          before="#7"
          after="#3"
          improvement="+4 spots"
          icon={MapPin}
        />
        <BeforeAfterMetric
          label="Profile Views"
          before="~310/mo"
          after="~443/mo"
          improvement="+43%"
          icon={Eye}
        />
      </div>

      {/* Estimated Revenue Impact */}
      <Card className="border-[#b8dca8] overflow-hidden">
        <CardHeader className="bg-[#eef8e6] border-b border-[#b8dca8]">
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <DollarSign className="h-4 w-4" />
            Estimated Revenue Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Breakdown */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-[#b8dca8] bg-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-[#2d6a4f]" />
                    <p className="text-xs text-[#5a6b5a] font-medium">
                      Additional Customers
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-[#1a3a2a]">
                    ~{additionalCustomers}
                    <span className="text-sm font-normal text-[#5a6b5a]">
                      /month
                    </span>
                  </p>
                  <p className="text-[10px] text-[#5a6b5a] mt-1">
                    From improved visibility and ratings
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-[#b8dca8] bg-white">
                  <p className="text-xs text-[#5a6b5a] font-medium mb-1">
                    Avg. Ticket Size
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#5a6b5a]">$</span>
                    <input
                      type="number"
                      value={ticketSize}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10)
                        if (!isNaN(val) && val >= 0) setTicketSize(val)
                      }}
                      className="w-24 text-2xl font-bold text-[#1a3a2a] bg-transparent border-b-2 border-[#b8dca8] focus:border-[#2d6a4f] outline-none transition-colors"
                      min={0}
                      max={9999}
                    />
                  </div>
                  <p className="text-[10px] text-[#5a6b5a] mt-1">
                    Edit to match your business
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-[#b8dca8] bg-white">
                  <p className="text-xs text-[#5a6b5a] font-medium mb-1">
                    Est. Additional Revenue
                  </p>
                  <p className="text-2xl font-bold text-[#2d6a4f]">
                    ${estimatedRevenue.toLocaleString()}
                    <span className="text-sm font-normal text-[#5a6b5a]">
                      /month
                    </span>
                  </p>
                  <p className="text-[10px] text-[#5a6b5a] mt-1">
                    {additionalCustomers} customers x ${ticketSize} avg. ticket
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-[#b8dca8] bg-white">
                  <p className="text-xs text-[#5a6b5a] font-medium mb-1">
                    ReviewForge Cost
                  </p>
                  <p className="text-2xl font-bold text-[#1a3a2a]">
                    ${reviewForgeCost}
                    <span className="text-sm font-normal text-[#5a6b5a]">
                      /month
                    </span>
                  </p>
                  <p className="text-[10px] text-[#5a6b5a] mt-1">
                    Professional plan
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Big ROI Number */}
            <div className="flex items-center justify-center">
              <div className="w-full p-6 rounded-xl bg-[#1a3a2a] text-center">
                <p className="text-xs font-medium text-[#b8dca8] uppercase tracking-wider mb-2">
                  Your ROI
                </p>
                <p className="text-5xl sm:text-6xl font-extrabold text-[#d4f0c0] leading-none">
                  {roiPercent.toLocaleString()}%
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  <ArrowUpRight className="h-4 w-4 text-[#b8dca8]" />
                  <p className="text-sm text-[#b8dca8]">
                    ${(estimatedRevenue - reviewForgeCost).toLocaleString()} net gain/mo
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#2d6a4f]">
                  <p className="text-[10px] text-[#5a6b5a]">
                    For every $1 spent on ReviewForge, you earn ~$
                    {Math.round(estimatedRevenue / reviewForgeCost)} back
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Trend Chart */}
        <Card className="border-[#b8dca8]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
              <TrendingUp className="h-4 w-4" />
              Rating Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={RATING_TREND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#5a6b5a" }}
                  />
                  <YAxis
                    domain={[3.8, 5.0]}
                    tick={{ fontSize: 12, fill: "#5a6b5a" }}
                    tickFormatter={(v: number) => v.toFixed(1)}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #b8dca8",
                      fontSize: "12px",
                    }}
                    formatter={(value: number | undefined) => [
                      (value ?? 0).toFixed(2),
                      "Rating",
                    ]}
                  />
                  <ReferenceLine
                    y={4.1}
                    stroke="#ef4444"
                    strokeDasharray="6 4"
                    label={{
                      value: "Before (4.1)",
                      position: "insideTopRight",
                      fill: "#ef4444",
                      fontSize: 11,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#2d6a4f"
                    strokeWidth={3}
                    dot={{ fill: "#2d6a4f", r: 5, strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 7, fill: "#1a3a2a" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-[#5a6b5a]">
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-0.5 bg-[#2d6a4f] rounded" />
                <span>Current trend</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-0.5 bg-[#ef4444] rounded border-dashed" style={{ borderTop: "2px dashed #ef4444", height: 0 }} />
                <span>Before ReviewForge</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Volume Chart */}
        <Card className="border-[#b8dca8]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
              <BarChart3 className="h-4 w-4" />
              Monthly Review Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVIEW_VOLUME_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#5a6b5a" }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: "#5a6b5a" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #b8dca8",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "12px" }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="before"
                    name="Before ReviewForge"
                    fill="#d1d5db"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <Bar
                    dataKey="after"
                    name="With ReviewForge"
                    fill="#2d6a4f"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-[#eef8e6] text-center">
              <p className="text-sm text-[#2d6a4f] font-medium">
                <TrendingUp className="h-3.5 w-3.5 inline mr-1" />
                Average monthly reviews increased from 2.3 to 18.7 — a{" "}
                <span className="font-bold">712% increase</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Milestones */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Trophy className="h-4 w-4" />
            Key Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MILESTONES.map((milestone, i) => {
              const MilestoneIcon = milestone.icon
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                    milestone.achieved
                      ? "bg-[#eef8e6] border-[#b8dca8]"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      milestone.achieved
                        ? "bg-[#d4f0c0]"
                        : "bg-gray-100"
                    }`}
                  >
                    {milestone.achieved ? (
                      <CheckCircle2 className="h-5 w-5 text-[#2d6a4f]" />
                    ) : (
                      <MilestoneIcon className="h-5 w-5 text-[#5a6b5a]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        milestone.achieved ? "text-[#1a3a2a]" : "text-[#5a6b5a]"
                      }`}
                    >
                      {milestone.title}
                    </p>
                    <p className="text-xs text-[#5a6b5a]">{milestone.date}</p>
                  </div>
                  {milestone.achieved ? (
                    <Badge className="bg-[#d4f0c0] text-[#2d6a4f] border-0 text-[10px]">
                      Achieved
                    </Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Progress
                        value={68}
                        className="w-16 h-2 bg-gray-200 [&>div]:bg-[#2d6a4f]"
                      />
                      <span className="text-[10px] text-[#5a6b5a] shrink-0">
                        68%
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Cumulative Impact Summary */}
      <Card className="border-[#b8dca8]">
        <CardHeader className="bg-[#eef8e6] border-b border-[#b8dca8]">
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Sparkles className="h-4 w-4" />
            Cumulative Impact (87 Days)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3">
              <p className="text-3xl font-extrabold text-[#1a3a2a]">112</p>
              <p className="text-xs text-[#5a6b5a] mt-1">
                Total New Reviews
              </p>
            </div>
            <div className="text-center p-3">
              <p className="text-3xl font-extrabold text-[#2d6a4f]">
                $4,421
              </p>
              <p className="text-xs text-[#5a6b5a] mt-1">
                Est. Revenue Generated
              </p>
            </div>
            <div className="text-center p-3">
              <p className="text-3xl font-extrabold text-[#1a3a2a]">~98</p>
              <p className="text-xs text-[#5a6b5a] mt-1">
                Additional Customers
              </p>
            </div>
            <div className="text-center p-3">
              <p className="text-3xl font-extrabold text-[#2d6a4f]">4.6</p>
              <div className="flex items-center justify-center gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-3 w-3 ${
                      s <= 4
                        ? "text-yellow-400 fill-yellow-400"
                        : s === 5
                          ? "text-yellow-400 fill-yellow-200"
                          : "text-gray-200 fill-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleDownloadReport}
          className="bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6] flex-1"
        >
          <Download className="h-4 w-4 mr-2" />
          Download ROI Report
        </Button>
        <Button
          onClick={handleShareReport}
          variant="outline"
          className="border-[#b8dca8] text-[#2d6a4f] hover:bg-[#eef8e6] flex-1"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share with Partner
        </Button>
      </div>

      {/* Footer Note */}
      <p className="text-[10px] text-[#5a6b5a] text-center leading-relaxed">
        ROI estimates are based on industry averages for businesses in the{" "}
        <span className="font-medium">{business.category.replace(/_/g, " ")}</span>{" "}
        category. Actual results may vary based on location, market conditions, and
        operational factors. Revenue calculations use your provided average ticket size
        and estimated new customer volume from increased review visibility.
      </p>
    </div>
  )
}
