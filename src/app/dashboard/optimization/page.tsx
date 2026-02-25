"use client"

import { useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Zap,
  Clock,
  FlaskConical,
  BarChart3,
  Lightbulb,
  Filter,
  CheckCircle2,
  Trophy,
  MessageSquare,
  Mail,
  Smartphone,
  ArrowRight,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { toast } from "sonner"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

// -- Mock Data --

const dayOfWeekData = [
  { day: "Mon", rate: 28 },
  { day: "Tue", rate: 42 },
  { day: "Wed", rate: 35 },
  { day: "Thu", rate: 31 },
  { day: "Fri", rate: 26 },
  { day: "Sat", rate: 19 },
  { day: "Sun", rate: 15 },
]

const abTests = [
  {
    id: "test-1",
    status: "active" as const,
    messageA: "We'd love your feedback! Please leave us a review.",
    messageB: "Quick favor? Tell others about your experience!",
    sampleA: 312,
    sampleB: 308,
    conversionA: 27,
    conversionB: 36.2,
    significance: 94,
    winner: "B" as const,
    startDate: "2026-02-12",
  },
  {
    id: "test-2",
    status: "completed" as const,
    messageA: "Rate us on Google!",
    messageB: "How was your visit today?",
    sampleA: 540,
    sampleB: 535,
    conversionA: 22,
    conversionB: 31,
    significance: 98,
    winner: "B" as const,
    startDate: "2026-01-18",
  },
  {
    id: "test-3",
    status: "completed" as const,
    messageA: "Leave a review for a 10% discount",
    messageB: "Your opinion helps our small business grow",
    sampleA: 480,
    sampleB: 475,
    conversionA: 38,
    conversionB: 33,
    significance: 96,
    winner: "A" as const,
    startDate: "2026-01-02",
  },
]

const funnelSteps = [
  { label: "Requests Sent", value: 150, percent: 100 },
  { label: "Opened", value: 112, percent: 75 },
  { label: "Started Review", value: 67, percent: 45 },
  { label: "Completed", value: 51, percent: 34 },
]

const recommendations = [
  {
    id: "rec-1",
    title: "Switch to SMS for customers under 35",
    description: "Younger demographics show 3x higher conversion via text.",
    improvement: 18,
    applied: false,
  },
  {
    id: "rec-2",
    title: "Send requests at 6 PM instead of 10 AM",
    description: "Evening sends yield 42% conversion vs. 28% in the morning.",
    improvement: 14,
    applied: false,
  },
  {
    id: "rec-3",
    title: "Use shorter message variant for repeat customers",
    description: "Returning customers respond better to concise messages.",
    improvement: 9,
    applied: false,
  },
]

const scoreBreakdown = [
  { label: "Send Timing", score: 82, max: 100 },
  { label: "Message Quality", score: 75, max: 100 },
  { label: "Channel Mix", score: 68, max: 100 },
  { label: "Follow-up Cadence", score: 88, max: 100 },
]

// -- Component --

export default function OptimizationPage() {
  const { business } = useBusinessContext()
  const [autoPromoteWinner, setAutoPromoteWinner] = useState(true)
  const [autoRouting, setAutoRouting] = useState(true)
  const [appliedRecs, setAppliedRecs] = useState<Set<string>>(new Set())
  const [showPastTests, setShowPastTests] = useState(false)

  function handleApplyRecommendation(id: string, title: string) {
    setAppliedRecs((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
    toast.success(`Applied: ${title}`)
  }

  const activeTest = abTests.find((t) => t.status === "active")!
  const pastTests = abTests.filter((t) => t.status === "completed")
  const overallScore = 78

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Smart Optimization</h1>
        <p className="text-[#5a6b5a]">
          AI-powered tuning for {business.name}&apos;s review collection
        </p>
      </div>

      {/* Optimization Score */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Zap className="h-4 w-4 text-[#2d6a4f]" />
            Optimization Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Circular Progress */}
            <div className="relative w-36 h-36 shrink-0">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#eef8e6"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#2d6a4f"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(overallScore / 100) * 314} 314`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#1a3a2a]">{overallScore}</span>
                <span className="text-xs text-[#5a6b5a]">out of 100</span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="flex-1 w-full space-y-3">
              {scoreBreakdown.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#1a3a2a] font-medium">{item.label}</span>
                    <span className="text-[#2d6a4f] font-semibold">{item.score}/{item.max}</span>
                  </div>
                  <Progress
                    value={item.score}
                    className="h-2 bg-[#eef8e6] [&>div]:bg-[#2d6a4f]"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timing Intelligence */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Clock className="h-4 w-4 text-[#2d6a4f]" />
            Timing Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-[#d4f0c0] text-[#2d6a4f] hover:bg-[#d4f0c0] gap-1.5">
              <CheckCircle2 className="h-3 w-3" />
              Auto-adjusted send times
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-[#eef8e6] rounded-lg p-3 border border-[#b8dca8]">
              <p className="text-xs text-[#5a6b5a] mb-1">Best Day</p>
              <p className="text-lg font-bold text-[#1a3a2a]">Tuesday</p>
              <p className="text-xs text-[#2d6a4f]">42% conversion rate</p>
            </div>
            <div className="bg-[#eef8e6] rounded-lg p-3 border border-[#b8dca8]">
              <p className="text-xs text-[#5a6b5a] mb-1">Best Time</p>
              <p className="text-lg font-bold text-[#1a3a2a]">6:00 PM</p>
              <p className="text-xs text-[#2d6a4f]">Peak engagement window</p>
            </div>
            <div className="bg-[#eef8e6] rounded-lg p-3 border border-[#b8dca8]">
              <p className="text-xs text-[#5a6b5a] mb-1">Best Delay</p>
              <p className="text-lg font-bold text-[#1a3a2a]">3 Hours</p>
              <p className="text-xs text-[#2d6a4f]">After transaction</p>
            </div>
          </div>

          {/* Recharts Bar Chart */}
          <div>
            <p className="text-sm font-medium text-[#1a3a2a] mb-3">Conversion Rate by Day of Week</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dayOfWeekData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#b8dca8" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#5a6b5a" }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#5a6b5a" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    formatter={(value: number | undefined) => [`${value ?? 0}%`, "Conversion"]}
                    contentStyle={{ borderRadius: 8, border: "1px solid #b8dca8", fontSize: 13 }}
                  />
                  <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                    {dayOfWeekData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.day === "Tue" ? "#1a3a2a" : "#2d6a4f"}
                        opacity={entry.day === "Tue" ? 1 : 0.6}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* A/B Message Testing */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
              <FlaskConical className="h-4 w-4 text-[#2d6a4f]" />
              A/B Message Testing
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#5a6b5a]">Auto-promote winner</span>
              <Switch
                checked={autoPromoteWinner}
                onCheckedChange={(checked) => {
                  setAutoPromoteWinner(checked)
                  toast.success(checked ? "Auto-promote enabled" : "Auto-promote disabled")
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Active Test */}
          <div className="mb-4">
            <Badge className="bg-[#d4f0c0] text-[#2d6a4f] hover:bg-[#d4f0c0] mb-3">Active Test</Badge>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Message A */}
              <div className="rounded-lg border border-[#b8dca8] p-4 bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold bg-[#eef8e6] text-[#5a6b5a] px-2 py-0.5 rounded">A</span>
                  <span className="text-sm font-medium text-[#1a3a2a]">Control</span>
                </div>
                <p className="text-sm text-[#5a6b5a] italic mb-3">&ldquo;{activeTest.messageA}&rdquo;</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5a6b5a]">Conversion</span>
                  <span className="font-semibold text-[#1a3a2a]">{activeTest.conversionA}%</span>
                </div>
                <Progress value={activeTest.conversionA} className="h-2 mt-1.5 bg-[#eef8e6] [&>div]:bg-[#5a6b5a]" />
                <p className="text-xs text-[#5a6b5a] mt-2">n = {activeTest.sampleA} recipients</p>
              </div>

              {/* Message B */}
              <div className="rounded-lg border-2 border-[#2d6a4f] p-4 bg-[#eef8e6]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold bg-[#2d6a4f] text-white px-2 py-0.5 rounded">B</span>
                  <span className="text-sm font-medium text-[#1a3a2a]">Challenger</span>
                  <Badge className="bg-[#1a3a2a] text-[#d4f0c0] hover:bg-[#1a3a2a] text-[10px]">
                    <Trophy className="h-3 w-3 mr-1" />
                    Leading
                  </Badge>
                </div>
                <p className="text-sm text-[#2d6a4f] italic mb-3">&ldquo;{activeTest.messageB}&rdquo;</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5a6b5a]">Conversion</span>
                  <span className="font-semibold text-[#2d6a4f]">{activeTest.conversionB}%</span>
                </div>
                <Progress value={activeTest.conversionB} className="h-2 mt-1.5 bg-white [&>div]:bg-[#2d6a4f]" />
                <p className="text-xs text-[#5a6b5a] mt-2">n = {activeTest.sampleB} recipients</p>
              </div>
            </div>

            {/* Result Summary */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-[#d4f0c0] rounded-lg px-3 py-2 text-sm">
                <TrendingUp className="h-4 w-4 text-[#2d6a4f]" />
                <span className="font-medium text-[#1a3a2a]">
                  Message B outperforms by 34%
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#5a6b5a]">
                <Info className="h-4 w-4" />
                Statistical significance: {activeTest.significance}%
              </div>
            </div>
          </div>

          {/* Past Tests */}
          <div className="border-t border-[#b8dca8] pt-4">
            <button
              onClick={() => setShowPastTests(!showPastTests)}
              className="flex items-center gap-2 text-sm font-medium text-[#2d6a4f] hover:text-[#1a3a2a] transition-colors"
            >
              {showPastTests ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              Past Tests ({pastTests.length})
            </button>

            {showPastTests && (
              <div className="mt-3 space-y-3">
                {pastTests.map((test) => (
                  <div key={test.id} className="rounded-lg border border-[#b8dca8] p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#5a6b5a]">Started {test.startDate}</span>
                      <Badge className="bg-[#d4f0c0] text-[#2d6a4f] hover:bg-[#d4f0c0] text-[10px]">
                        <Trophy className="h-3 w-3 mr-1" />
                        Winner: Message {test.winner}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className={test.winner === "A" ? "font-semibold text-[#2d6a4f]" : "text-[#5a6b5a]"}>
                        <span className="text-xs font-bold bg-[#eef8e6] px-1.5 py-0.5 rounded mr-1.5">A</span>
                        &ldquo;{test.messageA}&rdquo; &mdash; {test.conversionA}%
                      </div>
                      <div className={test.winner === "B" ? "font-semibold text-[#2d6a4f]" : "text-[#5a6b5a]"}>
                        <span className="text-xs font-bold bg-[#eef8e6] px-1.5 py-0.5 rounded mr-1.5">B</span>
                        &ldquo;{test.messageB}&rdquo; &mdash; {test.conversionB}%
                      </div>
                    </div>
                    <p className="text-xs text-[#5a6b5a] mt-2">
                      {test.significance}% significance &middot; {test.sampleA + test.sampleB} total recipients
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Channel Optimization */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
              <MessageSquare className="h-4 w-4 text-[#2d6a4f]" />
              Channel Optimization
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#5a6b5a]">Auto-route by demographic</span>
              <Switch
                checked={autoRouting}
                onCheckedChange={(checked) => {
                  setAutoRouting(checked)
                  toast.success(checked ? "Auto-routing enabled" : "Auto-routing disabled")
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {/* SMS Channel */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-[#2d6a4f]" />
                  <span className="text-sm font-medium text-[#1a3a2a]">SMS</span>
                  <Badge className="bg-[#d4f0c0] text-[#2d6a4f] hover:bg-[#d4f0c0] text-[10px]">
                    Best for under 35
                  </Badge>
                </div>
                <span className="text-sm font-bold text-[#2d6a4f]">45%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-4 bg-[#eef8e6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2d6a4f] rounded-full transition-all"
                    style={{ width: "45%" }}
                  />
                </div>
              </div>
            </div>

            {/* Email Channel */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#5a6b5a]" />
                  <span className="text-sm font-medium text-[#1a3a2a]">Email</span>
                  <Badge variant="outline" className="border-[#b8dca8] text-[#5a6b5a] text-[10px]">
                    Best for over 55
                  </Badge>
                </div>
                <span className="text-sm font-bold text-[#5a6b5a]">28%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-4 bg-[#eef8e6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5a6b5a] rounded-full transition-all"
                    style={{ width: "28%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Insight Callout */}
          <div className="mt-5 flex items-start gap-3 bg-[#d4f0c0] rounded-lg p-3 border border-[#b8dca8]">
            <Lightbulb className="h-5 w-5 text-[#2d6a4f] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#1a3a2a]">Demographic Insight</p>
              <p className="text-sm text-[#2d6a4f]">
                Customers under 35 respond 3x better to SMS than email. Auto-routing is
                currently directing these customers to the SMS channel.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Recommendations */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Lightbulb className="h-4 w-4 text-[#2d6a4f]" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec) => {
              const isApplied = appliedRecs.has(rec.id)
              return (
                <div
                  key={rec.id}
                  className={`flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border p-4 transition-colors ${
                    isApplied
                      ? "bg-[#eef8e6] border-[#2d6a4f]"
                      : "bg-white border-[#b8dca8] hover:shadow-sm"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-[#1a3a2a]">{rec.title}</p>
                      <Badge className="bg-[#d4f0c0] text-[#2d6a4f] hover:bg-[#d4f0c0] text-[10px]">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{rec.improvement}%
                      </Badge>
                    </div>
                    <p className="text-xs text-[#5a6b5a]">{rec.description}</p>
                  </div>
                  <Button
                    size="sm"
                    disabled={isApplied}
                    onClick={() => handleApplyRecommendation(rec.id, rec.title)}
                    className={
                      isApplied
                        ? "bg-[#2d6a4f] text-white hover:bg-[#2d6a4f] gap-1.5"
                        : "bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6] gap-1.5"
                    }
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Applied
                      </>
                    ) : (
                      <>
                        Apply
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Filter className="h-4 w-4 text-[#2d6a4f]" />
            Conversion Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {funnelSteps.map((step, index) => {
              const widthPercent = Math.max(step.percent, 20)
              return (
                <div key={step.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#1a3a2a]">{step.label}</span>
                      {index > 0 && (
                        <span className="text-xs text-[#5a6b5a]">({step.percent}%)</span>
                      )}
                    </div>
                    <span className="font-semibold text-[#2d6a4f]">{step.value}</span>
                  </div>
                  <div className="flex justify-center">
                    <div
                      className="h-10 rounded-lg transition-all flex items-center justify-center"
                      style={{
                        width: `${widthPercent}%`,
                        backgroundColor: index === 0
                          ? "#1a3a2a"
                          : index === 1
                            ? "#2d6a4f"
                            : index === 2
                              ? "#52b788"
                              : "#95d5b2",
                      }}
                    >
                      <span className={`text-xs font-semibold ${index < 2 ? "text-white" : "text-[#1a3a2a]"}`}>
                        {step.value}
                      </span>
                    </div>
                  </div>
                  {index < funnelSteps.length - 1 && (
                    <div className="flex justify-center">
                      <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[6px] border-t-[#b8dca8]" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Drop-off Insight */}
          <div className="mt-5 flex items-start gap-3 bg-[#eef8e6] rounded-lg p-3 border border-[#b8dca8]">
            <BarChart3 className="h-5 w-5 text-[#2d6a4f] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-[#1a3a2a]">Funnel Insight</p>
              <p className="text-sm text-[#5a6b5a]">
                The biggest drop-off occurs between &ldquo;Opened&rdquo; and &ldquo;Started Review&rdquo;
                (30% loss). Consider simplifying the review landing page or reducing the
                number of required fields.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
