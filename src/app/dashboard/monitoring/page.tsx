"use client"

import { useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Eye,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Bell,
  BellOff,
  Copy,
  ExternalLink,
  AlertTriangle,
  TrendingUp,
  Hash,
  Globe,
  Mail,
  Smartphone,
  Monitor,
  Sparkles,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

type Sentiment = "positive" | "neutral" | "negative"

interface Mention {
  id: string
  platform: string
  platformIcon: string
  snippet: string
  source: string
  time: string
  sentiment: Sentiment
  reach: string
  engagement: string
  priority: "normal" | "high"
  suggestedResponse?: string
}

interface PlatformStat {
  name: string
  mentions: number
  color: string
}

const MOCK_MENTIONS: Mention[] = [
  {
    id: "m1",
    platform: "Reddit",
    platformIcon: "R",
    snippet: "Anyone tried {business}? Thinking of going there this weekend. Heard mixed things but the menu looks great.",
    source: "r/cityname",
    time: "2 hours ago",
    sentiment: "neutral",
    reach: "1.2k views",
    engagement: "3 replies",
    priority: "normal",
  },
  {
    id: "m2",
    platform: "Twitter/X",
    platformIcon: "X",
    snippet: "Had an amazing dinner at @{business} last night! The service was impeccable and the food was out of this world.",
    source: "@foodlover123",
    time: "4 hours ago",
    sentiment: "positive",
    reach: "3.4k impressions",
    engagement: "12 likes",
    priority: "normal",
  },
  {
    id: "m3",
    platform: "Facebook Group",
    platformIcon: "f",
    snippet: "Looking for restaurant recommendations in downtown. Someone mentioned {business} in the comments - anyone been recently?",
    source: "Local Community Group",
    time: "6 hours ago",
    sentiment: "neutral",
    reach: "890 members",
    engagement: "7 comments",
    priority: "normal",
  },
  {
    id: "m4",
    platform: "Yelp Talk",
    platformIcon: "Y",
    snippet: "Had a terrible experience at {business} last Friday. Cold food, rude staff, waited 40 minutes. Never going back.",
    source: "Yelp Community Forum",
    time: "8 hours ago",
    sentiment: "negative",
    reach: "2.1k views",
    engagement: "15 replies",
    priority: "high",
    suggestedResponse:
      "We sincerely apologize for your experience. This is not the standard we hold ourselves to. We'd love the opportunity to make things right - could you reach out to us directly at our email so we can address your concerns personally?",
  },
  {
    id: "m5",
    platform: "Blog",
    platformIcon: "B",
    snippet: "Top 10 restaurants in downtown - Coming in at #4 is {business}, known for their incredible ambiance and creative seasonal menu.",
    source: "CityEatsGuide.com",
    time: "1 day ago",
    sentiment: "positive",
    reach: "5.8k readers",
    engagement: "32 shares",
    priority: "normal",
  },
  {
    id: "m6",
    platform: "Instagram",
    platformIcon: "I",
    snippet: "Date night at {business} was perfect. The plating is gorgeous and the cocktails are so creative. Highly recommend!",
    source: "@lifestyle_sarah",
    time: "1 day ago",
    sentiment: "positive",
    reach: "8.2k followers",
    engagement: "245 likes",
    priority: "normal",
  },
  {
    id: "m7",
    platform: "Google Q&A",
    platformIcon: "G",
    snippet: "Does {business} have outdoor seating? Looking to visit with my dog this weekend.",
    source: "Google Business Profile",
    time: "2 days ago",
    sentiment: "neutral",
    reach: "340 views",
    engagement: "1 answer",
    priority: "normal",
  },
]

const PLATFORM_STATS: PlatformStat[] = [
  { name: "Google", mentions: 14, color: "#2d6a4f" },
  { name: "Twitter/X", mentions: 11, color: "#52b788" },
  { name: "Reddit", mentions: 8, color: "#74c69d" },
  { name: "Facebook", mentions: 6, color: "#95d5b2" },
  { name: "Yelp", mentions: 5, color: "#b7e4c7" },
  { name: "Other", mentions: 3, color: "#d8f3dc" },
]

const SENTIMENT_DATA = {
  positive: { count: 38, percent: 81, color: "#22c55e" },
  neutral: { count: 5, percent: 11, color: "#f59e0b" },
  negative: { count: 4, percent: 8, color: "#ef4444" },
}

function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
  const config = {
    positive: {
      label: "Positive",
      className: "bg-green-50 text-green-700 border-0",
      icon: ThumbsUp,
    },
    neutral: {
      label: "Neutral",
      className: "bg-yellow-50 text-yellow-700 border-0",
      icon: Minus,
    },
    negative: {
      label: "Negative",
      className: "bg-red-50 text-red-700 border-0",
      icon: ThumbsDown,
    },
  }

  const { label, className, icon: Icon } = config[sentiment]

  return (
    <Badge className={`${className} text-[10px] gap-1`}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  )
}

function PlatformAvatar({ icon, platform }: { icon: string; platform: string }) {
  const bgColors: Record<string, string> = {
    Reddit: "bg-orange-500",
    "Twitter/X": "bg-black",
    "Facebook Group": "bg-blue-600",
    "Yelp Talk": "bg-red-600",
    Blog: "bg-purple-600",
    Instagram: "bg-pink-600",
    "Google Q&A": "bg-blue-500",
  }

  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
        bgColors[platform] || "bg-[#1a3a2a]"
      }`}
    >
      <span className="text-white font-bold text-xs">{icon}</span>
    </div>
  )
}

function DonutChart() {
  const total = SENTIMENT_DATA.positive.count + SENTIMENT_DATA.neutral.count + SENTIMENT_DATA.negative.count
  const radius = 54
  const strokeWidth = 14
  const circumference = 2 * Math.PI * radius

  const positiveArc = (SENTIMENT_DATA.positive.count / total) * circumference
  const neutralArc = (SENTIMENT_DATA.neutral.count / total) * circumference
  const negativeArc = (SENTIMENT_DATA.negative.count / total) * circumference

  const positiveOffset = 0
  const neutralOffset = circumference - positiveArc
  const negativeOffset = circumference - positiveArc - neutralArc

  return (
    <div className="flex items-center justify-center gap-6">
      <div className="relative">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={SENTIMENT_DATA.negative.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${negativeArc} ${circumference - negativeArc}`}
            strokeDashoffset={-negativeOffset}
            transform="rotate(-90 70 70)"
            strokeLinecap="round"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={SENTIMENT_DATA.neutral.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${neutralArc} ${circumference - neutralArc}`}
            strokeDashoffset={-neutralOffset}
            transform="rotate(-90 70 70)"
            strokeLinecap="round"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={SENTIMENT_DATA.positive.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${positiveArc} ${circumference - positiveArc}`}
            strokeDashoffset={-positiveOffset}
            transform="rotate(-90 70 70)"
            strokeLinecap="round"
          />
          <text
            x="70"
            y="65"
            textAnchor="middle"
            className="text-2xl font-bold fill-[#1a3a2a]"
          >
            {total}
          </text>
          <text
            x="70"
            y="82"
            textAnchor="middle"
            className="text-xs fill-[#5a6b5a]"
          >
            mentions
          </text>
        </svg>
      </div>
      <div className="space-y-2">
        {Object.entries(SENTIMENT_DATA).map(([key, data]) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <span className="text-sm text-[#1a3a2a] capitalize w-16">{key}</span>
            <span className="text-sm font-semibold text-[#1a3a2a]">{data.count}</span>
            <span className="text-xs text-[#5a6b5a]">({data.percent}%)</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlatformBar({ stat, maxMentions }: { stat: PlatformStat; maxMentions: number }) {
  const widthPercent = (stat.mentions / maxMentions) * 100

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[#1a3a2a] w-20 shrink-0">{stat.name}</span>
      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${widthPercent}%`, backgroundColor: stat.color }}
        />
      </div>
      <span className="text-sm font-semibold text-[#1a3a2a] w-8 text-right">
        {stat.mentions}
      </span>
    </div>
  )
}

export default function MonitoringPage() {
  const { business } = useBusinessContext()
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [alertThreshold, setAlertThreshold] = useState<"all" | "negative" | "high_reach">("all")
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifySms, setNotifySms] = useState(false)
  const [notifyPush, setNotifyPush] = useState(true)
  const [expandedMention, setExpandedMention] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const maxPlatformMentions = Math.max(...PLATFORM_STATS.map((p) => p.mentions))

  function replaceBusiness(text: string) {
    return text.replace(/\{business\}/g, business.name)
  }

  function handleCopyResponse(mentionId: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(mentionId)
      toast.success("Response copied to clipboard")
      setTimeout(() => setCopiedId(null), 2000)
    }).catch(() => {
      toast.error("Failed to copy to clipboard")
    })
  }

  function handleRespond(platform: string) {
    toast.success(`Opening ${platform} to respond...`)
  }

  function handleViewThread(platform: string) {
    toast.info(`Opening ${platform} thread...`)
  }

  function toggleAlerts() {
    setAlertsEnabled((prev) => !prev)
    toast.success(alertsEnabled ? "Alerts disabled" : "Alerts enabled")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3a2a]">Brand Mention Monitoring</h1>
          <p className="text-[#5a6b5a]">
            Track what people are saying about {business.name} across the web
          </p>
        </div>
        <Button
          onClick={toggleAlerts}
          variant="outline"
          className="border-[#b8dca8] text-[#2d6a4f] hover:bg-[#eef8e6] gap-2 self-start"
        >
          {alertsEnabled ? (
            <>
              <Bell className="h-4 w-4" />
              Alerts On
            </>
          ) : (
            <>
              <BellOff className="h-4 w-4" />
              Alerts Off
            </>
          )}
        </Button>
      </div>

      {/* Monitoring Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4f0c0] flex items-center justify-center">
                <Hash className="h-5 w-5 text-[#2d6a4f]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a3a2a]">47</p>
                <p className="text-xs text-[#5a6b5a]">Mentions This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4f0c0] flex items-center justify-center">
                <ThumbsUp className="h-5 w-5 text-[#2d6a4f]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a3a2a]">
                  38 <span className="text-sm font-normal text-[#5a6b5a]">(81%)</span>
                </p>
                <p className="text-xs text-[#5a6b5a]">Positive Mentions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4f0c0] flex items-center justify-center">
                <Globe className="h-5 w-5 text-[#2d6a4f]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a3a2a]">6</p>
                <p className="text-xs text-[#5a6b5a]">Platforms Monitored</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4f0c0] flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-[#2d6a4f]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a3a2a]">89%</p>
                <p className="text-xs text-[#5a6b5a]">Response Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Mentions Feed */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Eye className="h-4 w-4" />
            Recent Mentions
            <Badge className="bg-[#d4f0c0] text-[#2d6a4f] border-0 text-[10px]">
              Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_MENTIONS.map((mention) => (
              <div
                key={mention.id}
                className={`p-4 rounded-lg border bg-white space-y-3 ${
                  mention.priority === "high"
                    ? "border-red-300 bg-red-50/30"
                    : "border-[#b8dca8]"
                }`}
              >
                {/* Mention Header */}
                <div className="flex items-start gap-3">
                  <PlatformAvatar icon={mention.platformIcon} platform={mention.platform} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-[#1a3a2a]">
                        {mention.platform}
                      </span>
                      <span className="text-xs text-[#5a6b5a]">{mention.source}</span>
                      <SentimentBadge sentiment={mention.sentiment} />
                      {mention.priority === "high" && (
                        <Badge className="bg-red-100 text-red-700 border-0 text-[10px] gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          High Priority
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#1a3a2a] mt-1.5 leading-relaxed">
                      &quot;{replaceBusiness(mention.snippet)}&quot;
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#5a6b5a]">
                      <span>{mention.time}</span>
                      <span>{mention.reach}</span>
                      <span>{mention.engagement}</span>
                    </div>
                  </div>
                </div>

                {/* Mention Actions */}
                <div className="flex items-center gap-2 pl-12">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-[#b8dca8] text-[#2d6a4f] hover:bg-[#eef8e6] gap-1 h-7"
                    onClick={() => handleViewThread(mention.platform)}
                  >
                    <ExternalLink className="h-3 w-3" />
                    View Thread
                  </Button>
                  {mention.suggestedResponse && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-[#b8dca8] text-[#2d6a4f] hover:bg-[#eef8e6] gap-1 h-7"
                      onClick={() =>
                        setExpandedMention(
                          expandedMention === mention.id ? null : mention.id
                        )
                      }
                    >
                      <Sparkles className="h-3 w-3" />
                      Suggested Response
                      {expandedMention === mention.id ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Expanded Suggested Response */}
                {mention.suggestedResponse && expandedMention === mention.id && (
                  <div className="ml-12 p-3 rounded-lg bg-[#eef8e6] border border-[#b8dca8] space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#2d6a4f]">
                      <Sparkles className="h-3 w-3" />
                      AI-Suggested Response
                    </div>
                    <p className="text-sm text-[#1a3a2a] leading-relaxed">
                      {mention.suggestedResponse}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        size="sm"
                        className="text-xs bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6] gap-1 h-7"
                        onClick={() =>
                          handleCopyResponse(mention.id, mention.suggestedResponse!)
                        }
                      >
                        <Copy className="h-3 w-3" />
                        {copiedId === mention.id ? "Copied!" : "Copy"}
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs bg-[#2d6a4f] hover:bg-[#1a3a2a] text-white gap-1 h-7"
                        onClick={() => handleRespond(mention.platform)}
                      >
                        <Send className="h-3 w-3" />
                        Respond
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Overview */}
        <Card className="border-[#b8dca8]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
              <TrendingUp className="h-4 w-4" />
              Sentiment Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart />
          </CardContent>
        </Card>

        {/* Platform Breakdown */}
        <Card className="border-[#b8dca8]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
              <Globe className="h-4 w-4" />
              Platform Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {PLATFORM_STATS.map((stat) => (
                <PlatformBar
                  key={stat.name}
                  stat={stat}
                  maxMentions={maxPlatformMentions}
                />
              ))}
            </div>
            <p className="text-xs text-[#5a6b5a] text-center mt-4">
              Total: {PLATFORM_STATS.reduce((sum, p) => sum + p.mentions, 0)} mentions
              across {PLATFORM_STATS.length} platforms
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Settings */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Bell className="h-4 w-4" />
            Alert Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Real-time Alerts Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#eef8e6] border border-[#b8dca8]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#d4f0c0] flex items-center justify-center">
                  {alertsEnabled ? (
                    <Bell className="h-4 w-4 text-[#2d6a4f]" />
                  ) : (
                    <BellOff className="h-4 w-4 text-[#5a6b5a]" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">Real-time Alerts</p>
                  <p className="text-xs text-[#5a6b5a]">
                    Get notified immediately when new mentions are detected
                  </p>
                </div>
              </div>
              <button
                onClick={toggleAlerts}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  alertsEnabled ? "bg-[#2d6a4f]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    alertsEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Priority Thresholds */}
            <div>
              <p className="text-sm font-medium text-[#1a3a2a] mb-3">Priority Threshold</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  {
                    value: "all" as const,
                    label: "All Mentions",
                    desc: "Every new mention",
                  },
                  {
                    value: "negative" as const,
                    label: "Negative Only",
                    desc: "Negative sentiment only",
                  },
                  {
                    value: "high_reach" as const,
                    label: "High Reach",
                    desc: "1k+ views/impressions",
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setAlertThreshold(option.value)
                      toast.success(`Alert threshold set to: ${option.label}`)
                    }}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      alertThreshold === option.value
                        ? "border-[#2d6a4f] bg-[#eef8e6]"
                        : "border-[#b8dca8] bg-white hover:bg-[#eef8e6]"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        alertThreshold === option.value
                          ? "text-[#2d6a4f]"
                          : "text-[#1a3a2a]"
                      }`}
                    >
                      {option.label}
                    </p>
                    <p className="text-xs text-[#5a6b5a] mt-0.5">{option.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Channels */}
            <div>
              <p className="text-sm font-medium text-[#1a3a2a] mb-3">
                Notification Channels
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    key: "email",
                    label: "Email",
                    icon: Mail,
                    enabled: notifyEmail,
                    toggle: () => setNotifyEmail((p) => !p),
                  },
                  {
                    key: "sms",
                    label: "SMS",
                    icon: Smartphone,
                    enabled: notifySms,
                    toggle: () => setNotifySms((p) => !p),
                  },
                  {
                    key: "push",
                    label: "Push",
                    icon: Monitor,
                    enabled: notifyPush,
                    toggle: () => setNotifyPush((p) => !p),
                  },
                ].map((channel) => (
                  <button
                    key={channel.key}
                    onClick={() => {
                      channel.toggle()
                      toast.success(
                        `${channel.label} notifications ${
                          channel.enabled ? "disabled" : "enabled"
                        }`
                      )
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
                      channel.enabled
                        ? "border-[#2d6a4f] bg-[#eef8e6] text-[#2d6a4f]"
                        : "border-[#b8dca8] bg-white text-[#5a6b5a] hover:bg-[#eef8e6]"
                    }`}
                  >
                    <channel.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{channel.label}</span>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        channel.enabled ? "bg-[#2d6a4f]" : "bg-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Responses for Negative Mentions */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Sparkles className="h-4 w-4" />
            AI-Suggested Responses
            <Badge className="bg-red-50 text-red-600 border-0 text-[10px]">
              {MOCK_MENTIONS.filter((m) => m.sentiment === "negative").length} Negative
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#5a6b5a] mb-4">
            ReviewForge AI has drafted responses for negative mentions that need your attention.
          </p>
          <div className="space-y-4">
            {MOCK_MENTIONS.filter((m) => m.sentiment === "negative").map((mention) => (
              <div
                key={`response-${mention.id}`}
                className="p-4 rounded-lg border border-red-200 bg-white space-y-3"
              >
                <div className="flex items-start gap-3">
                  <PlatformAvatar
                    icon={mention.platformIcon}
                    platform={mention.platform}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-[#1a3a2a]">
                        {mention.platform}
                      </span>
                      <span className="text-xs text-[#5a6b5a]">{mention.source}</span>
                      <Badge className="bg-red-50 text-red-700 border-0 text-[10px]">
                        Negative
                      </Badge>
                    </div>
                    <p className="text-sm text-[#1a3a2a] mt-1 leading-relaxed">
                      &quot;{replaceBusiness(mention.snippet)}&quot;
                    </p>
                  </div>
                </div>

                {mention.suggestedResponse && (
                  <div className="ml-12 p-3 rounded-lg bg-[#eef8e6] border border-[#b8dca8] space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#2d6a4f]">
                      <Sparkles className="h-3 w-3" />
                      Suggested Response
                    </div>
                    <p className="text-sm text-[#1a3a2a] leading-relaxed">
                      {mention.suggestedResponse}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        size="sm"
                        className="text-xs bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6] gap-1 h-7"
                        onClick={() =>
                          handleCopyResponse(
                            `response-${mention.id}`,
                            mention.suggestedResponse!
                          )
                        }
                      >
                        <Copy className="h-3 w-3" />
                        {copiedId === `response-${mention.id}` ? "Copied!" : "Copy"}
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs bg-[#2d6a4f] hover:bg-[#1a3a2a] text-white gap-1 h-7"
                        onClick={() => handleRespond(mention.platform)}
                      >
                        <Send className="h-3 w-3" />
                        Respond on {mention.platform}
                      </Button>
                    </div>
                  </div>
                )}

                {!mention.suggestedResponse && (
                  <div className="ml-12 p-3 rounded-lg bg-[#eef8e6] border border-[#b8dca8]">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-[#b8dca8] text-[#2d6a4f] hover:bg-white gap-1 h-7"
                      onClick={() =>
                        toast.success("Generating AI response...")
                      }
                    >
                      <Sparkles className="h-3 w-3" />
                      Generate Response
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
