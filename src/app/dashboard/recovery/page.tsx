"use client"

import { useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Star,
  ArrowRight,
  Send,
  UserCheck,
  RefreshCw,
  ThumbsUp,
  Clock,
  MessageSquare,
  Eye,
  Pencil,
  Copy,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  Heart,
  ArrowUpRight,
} from "lucide-react"

// --- Types ---

interface RecoveryCase {
  id: string
  customerName: string
  avatarInitial: string
  originalRating: number
  reviewExcerpt: string
  stage: "received" | "responded" | "contacted" | "returned" | "updated"
  postedAgo: string
  platform: string
}

interface RecoveryTemplate {
  id: string
  title: string
  type: "public_response" | "private_followup"
  body: string
}

interface SuccessStory {
  id: string
  customerName: string
  originalRating: number
  updatedRating: number
  summary: string
  daysToRecover: number
}

// --- Mock Data ---

const PIPELINE_STAGES = [
  { key: "received", label: "Negative Review Received", count: 7, color: "#dc2626" },
  { key: "responded", label: "Response Sent", count: 5, color: "#d97706" },
  { key: "contacted", label: "Customer Contacted", count: 3, color: "#2563eb" },
  { key: "returned", label: "Customer Returned", count: 2, color: "#7c3aed" },
  { key: "updated", label: "Review Updated", count: 1, color: "#16a34a" },
] as const

const MOCK_CASES: RecoveryCase[] = [
  {
    id: "rc-1",
    customerName: "David L.",
    avatarInitial: "D",
    originalRating: 1,
    reviewExcerpt:
      "Absolutely terrible experience. We waited over an hour for our food and when it arrived it was cold. The manager didn't seem to care at all.",
    stage: "received",
    postedAgo: "2 hours ago",
    platform: "Google",
  },
  {
    id: "rc-2",
    customerName: "Jennifer K.",
    avatarInitial: "J",
    originalRating: 2,
    reviewExcerpt:
      "Disappointed with the quality. The dishes looked nothing like the photos on the menu and the portions were tiny for the price.",
    stage: "received",
    postedAgo: "5 hours ago",
    platform: "Yelp",
  },
  {
    id: "rc-3",
    customerName: "Mark T.",
    avatarInitial: "M",
    originalRating: 1,
    reviewExcerpt:
      "Found a hair in my food. When I brought it to the server's attention they just shrugged. Extremely unprofessional.",
    stage: "responded",
    postedAgo: "1 day ago",
    platform: "Google",
  },
  {
    id: "rc-4",
    customerName: "Amy R.",
    avatarInitial: "A",
    originalRating: 2,
    reviewExcerpt:
      "Service was rude and dismissive. I asked for a simple substitution and the waiter acted like I was being unreasonable.",
    stage: "responded",
    postedAgo: "2 days ago",
    platform: "Google",
  },
  {
    id: "rc-5",
    customerName: "Carlos P.",
    avatarInitial: "C",
    originalRating: 1,
    reviewExcerpt:
      "Worst dining experience in years. Overpriced, undercooked, and the staff couldn't care less. I won't be returning.",
    stage: "contacted",
    postedAgo: "3 days ago",
    platform: "Yelp",
  },
  {
    id: "rc-6",
    customerName: "Lisa W.",
    avatarInitial: "L",
    originalRating: 2,
    reviewExcerpt:
      "The ambiance was nice but the food did not match expectations at all. Very bland and the dessert was stale.",
    stage: "returned",
    postedAgo: "5 days ago",
    platform: "Google",
  },
  {
    id: "rc-7",
    customerName: "Brian H.",
    avatarInitial: "B",
    originalRating: 2,
    reviewExcerpt:
      "Used to love this place but the last two visits have been really bad. Long waits and mediocre food.",
    stage: "contacted",
    postedAgo: "4 days ago",
    platform: "TripAdvisor",
  },
]

const MOCK_TEMPLATES: RecoveryTemplate[] = [
  {
    id: "tpl-1",
    title: "Empathetic Public Response",
    type: "public_response",
    body: `Thank you for taking the time to share your feedback, {customer_name}. I'm truly sorry to hear about your experience -- this is not the standard we hold ourselves to. I'd love the opportunity to make things right. Please reach out to me directly at {email} so we can discuss how to resolve this. Your satisfaction matters deeply to us.`,
  },
  {
    id: "tpl-2",
    title: "Service Issue Apology",
    type: "public_response",
    body: `Hi {customer_name}, thank you for your honest feedback. I sincerely apologize for the service issues you experienced. We've already spoken with our team about the concerns you raised. I'd love to invite you back for a complimentary experience so we can show you the level of care you deserve. Please contact us at {email}.`,
  },
  {
    id: "tpl-3",
    title: "Private Follow-Up: Make It Right",
    type: "private_followup",
    body: `Hi {customer_name},

I hope this message finds you well. My name is {owner_name} and I'm the owner of {business_name}. I wanted to personally reach out after reading your recent review.

I'm truly sorry about your experience. What you described is not reflective of who we are, and I take full responsibility. I'd love to make it right -- whether that means a complimentary visit, a personal conversation, or whatever would feel meaningful to you.

Would you be open to giving us another chance? I promise you'll see a very different experience.

Warm regards,
{owner_name}`,
  },
  {
    id: "tpl-4",
    title: "Private Follow-Up: Invitation to Return",
    type: "private_followup",
    body: `Dear {customer_name},

Thank you for your candid feedback. It genuinely helps us improve. I wanted you to know that we've taken your concerns seriously and made changes based on what you shared.

I'd love to invite you back as our guest so you can experience the improvements firsthand. No strings attached -- just a chance to show you the experience you originally deserved.

Please let me know if you're interested and I'll arrange everything personally.

Best,
{owner_name}`,
  },
]

const MOCK_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "ss-1",
    customerName: "Sarah M.",
    originalRating: 2,
    updatedRating: 4,
    summary:
      "After a personal follow-up call and a complimentary return visit, Sarah updated her review praising the owner's responsiveness and improved service.",
    daysToRecover: 12,
  },
  {
    id: "ss-2",
    customerName: "Tom G.",
    originalRating: 1,
    updatedRating: 4,
    summary:
      "Tom had a bad experience with wait times. After the team addressed staffing and invited him back, he was impressed with the turnaround and updated his review.",
    daysToRecover: 18,
  },
  {
    id: "ss-3",
    customerName: "Rachel N.",
    originalRating: 2,
    updatedRating: 5,
    summary:
      "Rachel's food quality concerns were addressed directly by the chef. A personalized return visit with a tasting menu led to a glowing updated review.",
    daysToRecover: 9,
  },
]

// --- Helpers ---

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "h-4 w-4" : "h-3 w-3"
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${cls} ${
            s <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-200 fill-gray-200"
          }`}
        />
      ))}
    </div>
  )
}

function getStageBadgeStyle(stage: RecoveryCase["stage"]): string {
  switch (stage) {
    case "received":
      return "bg-red-50 text-red-600 border-red-200"
    case "responded":
      return "bg-amber-50 text-amber-700 border-amber-200"
    case "contacted":
      return "bg-blue-50 text-blue-600 border-blue-200"
    case "returned":
      return "bg-purple-50 text-purple-600 border-purple-200"
    case "updated":
      return "bg-emerald-50 text-emerald-600 border-emerald-200"
  }
}

function getStageLabel(stage: RecoveryCase["stage"]): string {
  switch (stage) {
    case "received":
      return "Review Received"
    case "responded":
      return "Response Sent"
    case "contacted":
      return "Contacted"
    case "returned":
      return "Returned"
    case "updated":
      return "Updated"
  }
}

// --- Component ---

export default function RecoveryPage() {
  const { business } = useBusinessContext()
  const [cases, setCases] = useState<RecoveryCase[]>(MOCK_CASES)
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null)

  function handleSendFollowUp(caseId: string) {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId && c.stage === "received"
          ? { ...c, stage: "responded" as const }
          : c.id === caseId && c.stage === "responded"
            ? { ...c, stage: "contacted" as const }
            : c
      )
    )
    toast.success("Follow-up message sent successfully")
  }

  function handleMarkReturned(caseId: string) {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId ? { ...c, stage: "returned" as const } : c
      )
    )
    toast.success("Customer marked as returned")
  }

  function handleCopyTemplate(body: string) {
    navigator.clipboard.writeText(body).then(() => {
      toast.success("Template copied to clipboard")
    }).catch(() => {
      toast.error("Failed to copy template")
    })
  }

  // Compute pipeline counts from current case state
  const pipelineCounts = {
    received: cases.filter((c) => c.stage === "received").length,
    responded: cases.filter((c) => c.stage === "responded").length,
    contacted: cases.filter((c) => c.stage === "contacted").length,
    returned: cases.filter((c) => c.stage === "returned").length,
    updated: cases.filter((c) => c.stage === "updated").length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Customer Recovery</h1>
        <p className="text-[#5a6b5a]">
          Turn negative reviews into second chances for {business.name}
        </p>
      </div>

      {/* Recovery Pipeline */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <RefreshCw className="h-4 w-4" />
            Recovery Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {PIPELINE_STAGES.map((stage, index) => {
              const count =
                pipelineCounts[stage.key as keyof typeof pipelineCounts]
              return (
                <div key={stage.key} className="flex items-center gap-2 shrink-0">
                  <div className="flex flex-col items-center gap-2 min-w-[130px]">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: stage.color }}
                    >
                      {count}
                    </div>
                    <span className="text-xs text-[#5a6b5a] text-center leading-tight">
                      {stage.label}
                    </span>
                  </div>
                  {index < PIPELINE_STAGES.length - 1 && (
                    <ChevronRight className="h-5 w-5 text-[#b8dca8] shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-[#5a6b5a] mb-1">
              <span>Pipeline Progress</span>
              <span>
                {pipelineCounts.updated} of{" "}
                {Object.values(pipelineCounts).reduce((a, b) => a + b, 0)}{" "}
                recovered
              </span>
            </div>
            <Progress
              value={
                (pipelineCounts.updated /
                  Math.max(
                    Object.values(pipelineCounts).reduce((a, b) => a + b, 0),
                    1
                  )) *
                100
              }
              className="h-2 bg-[#eef8e6]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recovery Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">23</p>
            <p className="text-xs text-[#5a6b5a] mt-0.5">Negative Reviews</p>
            <p className="text-[10px] text-[#b8dca8]">This year</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <Send className="h-4 w-4 text-[#2d6a4f]" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">14</p>
            <p className="text-xs text-[#5a6b5a] mt-0.5">Contacted</p>
            <p className="text-[10px] text-[#b8dca8]">For recovery</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <UserCheck className="h-4 w-4 text-[#2d6a4f]" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">8</p>
            <p className="text-xs text-[#5a6b5a] mt-0.5">Returned</p>
            <p className="text-[10px] text-[#b8dca8]">For another visit</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <ThumbsUp className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">5</p>
            <p className="text-xs text-[#5a6b5a] mt-0.5">Reviews Updated</p>
            <p className="text-[10px] text-[#b8dca8]">To positive</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-4 w-4 text-[#2d6a4f]" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">35%</p>
            <p className="text-xs text-[#5a6b5a] mt-0.5">Recovery Rate</p>
            <p className="text-[10px] text-[#b8dca8]">Of contacted</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">+0.2</p>
            <p className="text-xs text-[#5a6b5a] mt-0.5">Stars Saved</p>
            <p className="text-[10px] text-[#b8dca8]">Estimated impact</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Recovery Cases */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <MessageSquare className="h-4 w-4" />
            Active Recovery Cases
            <Badge className="bg-[#d4f0c0] text-[#2d6a4f] border-0 text-[10px]">
              {cases.length} active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cases.map((recoveryCase) => (
              <div
                key={recoveryCase.id}
                className="border border-[#b8dca8] rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1a3a2a] flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm">
                        {recoveryCase.avatarInitial}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-[#1a3a2a]">
                          {recoveryCase.customerName}
                        </span>
                        <StarDisplay rating={recoveryCase.originalRating} />
                        <Badge
                          variant="outline"
                          className="text-[10px] border-[#b8dca8] text-[#5a6b5a]"
                        >
                          {recoveryCase.platform}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Clock className="h-3 w-3 text-[#b8dca8]" />
                        <span className="text-[11px] text-[#5a6b5a]">
                          {recoveryCase.postedAgo}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 text-[10px] ${getStageBadgeStyle(recoveryCase.stage)}`}
                  >
                    {getStageLabel(recoveryCase.stage)}
                  </Badge>
                </div>

                <p className="text-sm text-[#5a6b5a] leading-relaxed mb-3 pl-12">
                  &quot;{recoveryCase.reviewExcerpt}&quot;
                </p>

                <div className="flex items-center gap-2 pl-12 flex-wrap">
                  {(recoveryCase.stage === "received" ||
                    recoveryCase.stage === "responded") && (
                    <Button
                      size="sm"
                      className="gap-1.5 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6] text-xs h-8"
                      onClick={() => handleSendFollowUp(recoveryCase.id)}
                    >
                      <Send className="h-3 w-3" />
                      Send Follow-up
                    </Button>
                  )}
                  {(recoveryCase.stage === "contacted" ||
                    recoveryCase.stage === "responded") && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1.5 border-[#b8dca8] text-[#2d6a4f] hover:bg-[#eef8e6] text-xs h-8"
                      onClick={() => handleMarkReturned(recoveryCase.id)}
                    >
                      <UserCheck className="h-3 w-3" />
                      Mark Returned
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 border-[#b8dca8] text-[#5a6b5a] hover:bg-[#eef8e6] text-xs h-8"
                    onClick={() =>
                      toast.info(
                        `Viewing details for ${recoveryCase.customerName}'s review`
                      )
                    }
                  >
                    <Eye className="h-3 w-3" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recovery Templates */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Pencil className="h-4 w-4" />
            Recovery Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_TEMPLATES.map((template) => (
              <div
                key={template.id}
                className="border border-[#b8dca8] rounded-lg bg-white overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#eef8e6] transition-colors"
                  onClick={() =>
                    setExpandedTemplate(
                      expandedTemplate === template.id ? null : template.id
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        template.type === "public_response"
                          ? "bg-amber-50"
                          : "bg-blue-50"
                      }`}
                    >
                      {template.type === "public_response" ? (
                        <MessageSquare className="h-4 w-4 text-amber-600" />
                      ) : (
                        <Heart className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1a3a2a]">
                        {template.title}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-[10px] border-[#b8dca8] text-[#5a6b5a] mt-1"
                      >
                        {template.type === "public_response"
                          ? "Public Response"
                          : "Private Follow-up"}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 text-[#b8dca8] transition-transform ${
                      expandedTemplate === template.id ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expandedTemplate === template.id && (
                  <div className="px-4 pb-4 border-t border-[#eef8e6]">
                    <pre className="text-sm text-[#5a6b5a] whitespace-pre-wrap leading-relaxed mt-3 font-sans bg-[#eef8e6] rounded-lg p-3">
                      {template.body}
                    </pre>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        className="gap-1.5 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6] text-xs h-8"
                        onClick={() => handleCopyTemplate(template.body)}
                      >
                        <Copy className="h-3 w-3" />
                        Copy Template
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 border-[#b8dca8] text-[#2d6a4f] hover:bg-[#eef8e6] text-xs h-8"
                        onClick={() =>
                          toast.info("Template editor coming soon")
                        }
                      >
                        <Pencil className="h-3 w-3" />
                        Customize
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <ThumbsUp className="h-4 w-4" />
            Success Stories
            <Badge className="bg-[#d4f0c0] text-[#2d6a4f] border-0 text-[10px]">
              {MOCK_SUCCESS_STORIES.length} recovered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_SUCCESS_STORIES.map((story) => (
              <div
                key={story.id}
                className="border border-[#b8dca8] rounded-lg p-4 bg-[#eef8e6]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-9 h-9 rounded-full bg-[#2d6a4f] flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm">
                        {story.customerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1a3a2a]">
                        {story.customerName}
                      </p>
                      <p className="text-[11px] text-[#5a6b5a]">
                        Recovered in {story.daysToRecover} days
                      </p>
                    </div>
                  </div>

                  {/* Before/After Rating */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-[#5a6b5a] mb-0.5">
                        Before
                      </span>
                      <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded">
                        <Star className="h-3.5 w-3.5 text-red-400 fill-red-400" />
                        <span className="text-sm font-bold text-red-600">
                          {story.originalRating}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#2d6a4f]" />
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-[#5a6b5a] mb-0.5">
                        After
                      </span>
                      <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded">
                        <Star className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500" />
                        <span className="text-sm font-bold text-emerald-600">
                          {story.updatedRating}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>

                <p className="text-sm text-[#5a6b5a] leading-relaxed pl-12">
                  {story.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-white border border-[#b8dca8] text-center">
            <p className="text-sm text-[#2d6a4f] font-medium">
              Every recovered review improves your overall rating
            </p>
            <p className="text-xs text-[#5a6b5a] mt-1">
              Businesses that respond to negative reviews see a 33% higher chance
              of the customer updating their rating.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
