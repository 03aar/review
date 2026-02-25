"use client"

import { useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Flag,
  Bot,
  Eye,
  XCircle,
  Clock,
  Send,
  FileText,
  UserX,
  Mail,
  MessageSquare,
  ScrollText,
  Activity,
  TrendingDown,
  UserMinus,
  Phone,
  Database,
  Lock,
} from "lucide-react"
import { toast } from "sonner"

interface FlaggedReview {
  id: string
  reviewerName: string
  rating: number
  text: string
  date: string
  likelihood: number
  flags: string[]
  status: "new" | "reported" | "under_review" | "removed" | "dismissed"
}

interface ActivityLogEntry {
  id: string
  message: string
  timestamp: string
  type: "request" | "optout" | "flag" | "compliance" | "system"
}

interface OptOut {
  id: string
  name: string
  email: string
  channel: "sms" | "email"
  date: string
}

const initialFlaggedReviews: FlaggedReview[] = [
  {
    id: "flag-1",
    reviewerName: "User29384",
    rating: 1,
    text: "Terrible experience. Would not recommend to anyone. Worst place ever.",
    date: "2026-02-23",
    likelihood: 78,
    flags: ["New account (created 2 days ago)", "Generic text pattern", "Part of negative burst"],
    status: "new",
  },
  {
    id: "flag-2",
    reviewerName: "JSmith_review",
    rating: 1,
    text: "Bad service bad food bad everything. Do not go here!",
    date: "2026-02-22",
    likelihood: 85,
    flags: ["New account (created 1 day ago)", "Generic text pattern", "Burst of negatives", "Doesn't match business type"],
    status: "reported",
  },
  {
    id: "flag-3",
    reviewerName: "ReviewerX",
    rating: 2,
    text: "Not worth visiting. Staff was unhelpful and the place was dirty.",
    date: "2026-02-21",
    likelihood: 62,
    flags: ["New account (created 5 days ago)", "Part of negative burst"],
    status: "under_review",
  },
  {
    id: "flag-4",
    reviewerName: "AnonymousUser",
    rating: 1,
    text: "Absolutely horrible. Stay away from this business.",
    date: "2026-02-18",
    likelihood: 91,
    flags: ["New account (created same day)", "Generic text pattern", "Burst of negatives", "Doesn't match business type"],
    status: "removed",
  },
]

const initialActivityLog: ActivityLogEntry[] = [
  {
    id: "log-1",
    message: "Review request sent to john@example.com via email",
    timestamp: "2026-02-25 09:42 AM",
    type: "request",
  },
  {
    id: "log-2",
    message: "Customer opted out of SMS communications",
    timestamp: "2026-02-25 09:15 AM",
    type: "optout",
  },
  {
    id: "log-3",
    message: "Review flagged as potential fake - auto-reported",
    timestamp: "2026-02-25 08:30 AM",
    type: "flag",
  },
  {
    id: "log-4",
    message: "Review request sent to sarah.m@example.com via email",
    timestamp: "2026-02-24 04:18 PM",
    type: "request",
  },
  {
    id: "log-5",
    message: "Compliance audit completed - all checks passed",
    timestamp: "2026-02-24 12:00 PM",
    type: "compliance",
  },
  {
    id: "log-6",
    message: "Review request sent to +1 (555) 234-5678 via SMS",
    timestamp: "2026-02-24 11:45 AM",
    type: "request",
  },
  {
    id: "log-7",
    message: "Data retention policy auto-purged records older than 24 months",
    timestamp: "2026-02-24 02:00 AM",
    type: "system",
  },
]

const optOuts: OptOut[] = [
  { id: "opt-1", name: "Mike Reynolds", email: "mike.r@example.com", channel: "sms", date: "2026-02-25" },
  { id: "opt-2", name: "Lisa Chen", email: "lisa.chen@example.com", channel: "email", date: "2026-02-24" },
  { id: "opt-3", name: "David Park", email: "d.park@example.com", channel: "sms", date: "2026-02-22" },
]

const complianceChecks = [
  { id: "cc-1", label: "No incentivized reviews (Google TOS)", icon: ShieldCheck },
  { id: "cc-2", label: "No review gating (all customers asked)", icon: UserX },
  { id: "cc-3", label: "Customer approves before posting", icon: CheckCircle2 },
  { id: "cc-4", label: "Full audit trail maintained", icon: ScrollText },
  { id: "cc-5", label: "TCPA compliance (SMS opt-in/opt-out)", icon: Phone },
  { id: "cc-6", label: "CAN-SPAM compliance (emails)", icon: Mail },
  { id: "cc-7", label: "Data retention policies active", icon: Database },
]

export default function ProtectionPage() {
  const { business } = useBusinessContext()
  const [flaggedReviews, setFlaggedReviews] = useState<FlaggedReview[]>(initialFlaggedReviews)
  const [activityLog] = useState<ActivityLogEntry[]>(initialActivityLog)
  const [expandedReview, setExpandedReview] = useState<string | null>(null)

  const protectionScore = 100
  const reviewBombingDetected = false

  const flaggedCount = flaggedReviews.filter((r) => r.status === "new").length
  const reportedCount = flaggedReviews.filter((r) => r.status === "reported" || r.status === "under_review").length
  const removedCount = flaggedReviews.filter((r) => r.status === "removed").length

  function handleReportToGoogle(reviewId: string) {
    setFlaggedReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status: "reported" as const } : r))
    )
    toast.success("Review reported to Google. Status will be tracked here.")
  }

  function handleDismiss(reviewId: string) {
    setFlaggedReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status: "dismissed" as const } : r))
    )
    toast("Review dismissed from flagged list.")
  }

  function getStatusBadge(status: FlaggedReview["status"]) {
    switch (status) {
      case "new":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">New</Badge>
      case "reported":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
      case "under_review":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Under Review</Badge>
      case "removed":
        return <Badge className="bg-[#d4f0c0] text-[#2d6a4f] hover:bg-[#d4f0c0]">Removed</Badge>
      case "dismissed":
        return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">Dismissed</Badge>
      default:
        return null
    }
  }

  function getActivityIcon(type: ActivityLogEntry["type"]) {
    switch (type) {
      case "request":
        return <Send className="h-3.5 w-3.5 text-[#2d6a4f]" />
      case "optout":
        return <UserMinus className="h-3.5 w-3.5 text-amber-600" />
      case "flag":
        return <Flag className="h-3.5 w-3.5 text-red-500" />
      case "compliance":
        return <ShieldCheck className="h-3.5 w-3.5 text-[#2d6a4f]" />
      case "system":
        return <Database className="h-3.5 w-3.5 text-[#5a6b5a]" />
      default:
        return <Activity className="h-3.5 w-3.5 text-[#5a6b5a]" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Protection & Compliance</h1>
        <p className="text-[#5a6b5a]">
          Monitor review authenticity and compliance for {business.name}
        </p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Protection Score */}
        <Card className="border-[#b8dca8] sm:col-span-1">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#5a6b5a]">Protection Score</span>
              <Shield className="h-5 w-5 text-[#2d6a4f]" />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0">
                <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill="none"
                    stroke="#eef8e6"
                    strokeWidth="5"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill="none"
                    stroke="#2d6a4f"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={`${(protectionScore / 100) * 150.8} 150.8`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-[#2d6a4f]" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a3a2a]">{protectionScore}%</p>
                <p className="text-xs text-[#2d6a4f] font-medium">Fully Compliant</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flagged Reviews Stat */}
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#5a6b5a]">Flagged Reviews</span>
              <Flag className="h-5 w-5 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">{flaggedCount}</p>
            <p className="text-xs text-[#5a6b5a] mt-0.5">Awaiting action</p>
          </CardContent>
        </Card>

        {/* Reported Reviews Stat */}
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#5a6b5a]">Reported</span>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">{reportedCount}</p>
            <p className="text-xs text-[#5a6b5a] mt-0.5">Pending review by platform</p>
          </CardContent>
        </Card>

        {/* Removed Reviews Stat */}
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#5a6b5a]">Removed</span>
              <XCircle className="h-5 w-5 text-[#2d6a4f]" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">{removedCount}</p>
            <p className="text-xs text-[#5a6b5a] mt-0.5">Fake reviews taken down</p>
          </CardContent>
        </Card>
      </div>

      {/* Review Bombing Alert */}
      <Card className={`border-[#b8dca8] ${reviewBombingDetected ? "border-amber-300 bg-amber-50" : ""}`}>
        <CardContent className="pt-5 pb-4">
          {reviewBombingDetected ? (
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-lg shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-amber-800">Review Bombing Detected</h3>
                <p className="text-sm text-amber-700 mt-1">
                  A sudden spike of 8 negative reviews was detected in the last 24 hours.
                  This is 400% above your normal rate. Automated reporting has been initiated.
                </p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
                    Dismiss Alert
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#d4f0c0] rounded-lg shrink-0">
                <TrendingDown className="h-5 w-5 text-[#2d6a4f]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1a3a2a]">No Review Bombing Detected</h3>
                <p className="text-sm text-[#5a6b5a] mt-0.5">
                  Review frequency is within normal patterns. Monitoring is active 24/7.
                </p>
              </div>
              <Badge className="ml-auto bg-[#d4f0c0] text-[#2d6a4f] hover:bg-[#d4f0c0] shrink-0">
                All Clear
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fake Review Detection */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Bot className="h-4 w-4" />
            Fake Review Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {flaggedReviews.length === 0 ? (
            <div className="text-center py-10">
              <ShieldCheck className="h-10 w-10 mx-auto mb-3 text-[#b8dca8]" />
              <p className="font-medium text-[#1a3a2a]">No suspicious reviews detected</p>
              <p className="text-sm text-[#5a6b5a] mt-1">
                Our AI continuously monitors incoming reviews for suspicious patterns
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {flaggedReviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-[#b8dca8] rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-[#1a3a2a]">
                        {review.reviewerName}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${i < review.rating ? "text-amber-400" : "text-gray-300"}`}
                          >
                            &#9733;
                          </span>
                        ))}
                      </div>
                      {getStatusBadge(review.status)}
                    </div>
                    <span className="text-xs text-[#5a6b5a] shrink-0">{review.date}</span>
                  </div>

                  <p className="text-sm text-[#5a6b5a] mb-3 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Likelihood Bar */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-[#1a3a2a] shrink-0 w-28">
                      {review.likelihood}% likely fake
                    </span>
                    <Progress
                      value={review.likelihood}
                      className={`h-2 flex-1 ${review.likelihood >= 80 ? "bg-red-100" : review.likelihood >= 60 ? "bg-amber-100" : "bg-[#eef8e6]"}`}
                    />
                  </div>

                  {/* Flags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {review.flags.map((flag, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs border-[#b8dca8] text-[#5a6b5a] font-normal"
                      >
                        <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                        {flag}
                      </Badge>
                    ))}
                  </div>

                  {/* Expanded Details */}
                  {expandedReview === review.id && (
                    <div className="bg-[#eef8e6] rounded-lg p-3 mb-3 text-sm text-[#5a6b5a]">
                      <p className="font-medium text-[#1a3a2a] mb-1">Detection Analysis</p>
                      <p className="mb-2">
                        Based on pattern analysis: {review.likelihood}% likely fake based on patterns.
                        This review was flagged by our AI detection system for exhibiting
                        multiple indicators commonly associated with inauthentic reviews.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Account creation date correlates with review spike</li>
                        <li>Language patterns match known fake review templates</li>
                        <li>No prior review history on the platform</li>
                        {review.flags.includes("Doesn't match business type") && (
                          <li>Review content does not reference specific products or services</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {review.status === "new" && (
                      <>
                        <Button
                          size="sm"
                          className="gap-1.5 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
                          onClick={() => handleReportToGoogle(review.id)}
                        >
                          <Flag className="h-3.5 w-3.5" />
                          Report to Google
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 border-[#b8dca8] text-[#5a6b5a] hover:bg-[#eef8e6]"
                          onClick={() => handleDismiss(review.id)}
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Dismiss
                        </Button>
                      </>
                    )}
                    {review.status === "reported" && (
                      <span className="text-xs text-amber-600 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Reported to Google - awaiting platform review
                      </span>
                    )}
                    {review.status === "under_review" && (
                      <span className="text-xs text-blue-600 flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        Google is reviewing this report
                      </span>
                    )}
                    {review.status === "removed" && (
                      <span className="text-xs text-[#2d6a4f] flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Successfully removed by Google
                      </span>
                    )}
                    {review.status === "dismissed" && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <XCircle className="h-3.5 w-3.5" />
                        Dismissed - no action taken
                      </span>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1.5 text-[#5a6b5a] hover:bg-[#eef8e6] ml-auto"
                      onClick={() =>
                        setExpandedReview((prev) => (prev === review.id ? null : review.id))
                      }
                    >
                      <FileText className="h-3.5 w-3.5" />
                      {expandedReview === review.id ? "Hide Details" : "View Details"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compliance Checklist & Opt-Out Management Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Checklist */}
        <Card className="border-[#b8dca8]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
              <Lock className="h-4 w-4" />
              Compliance Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[#5a6b5a] mb-4">
              Platform and legal compliance status for {business.name}
            </p>
            <div className="space-y-3">
              {complianceChecks.map((check) => {
                const IconComponent = check.icon
                return (
                  <div
                    key={check.id}
                    className="flex items-center gap-3 p-3 bg-[#eef8e6] rounded-lg border border-[#d4f0c0]"
                  >
                    <div className="p-1.5 bg-[#d4f0c0] rounded-md shrink-0">
                      <IconComponent className="h-4 w-4 text-[#2d6a4f]" />
                    </div>
                    <span className="text-sm text-[#1a3a2a] flex-1">{check.label}</span>
                    <CheckCircle2 className="h-5 w-5 text-[#2d6a4f] shrink-0" />
                  </div>
                )
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-[#b8dca8]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1a3a2a]">Overall Status</span>
                <Badge className="bg-[#d4f0c0] text-[#2d6a4f] hover:bg-[#d4f0c0]">
                  7/7 Checks Passed
                </Badge>
              </div>
              <Progress value={100} className="h-2 mt-2 bg-[#eef8e6]" />
            </div>
          </CardContent>
        </Card>

        {/* Opt-Out Management */}
        <Card className="border-[#b8dca8]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
              <UserMinus className="h-4 w-4" />
              Opt-Out Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4 p-3 bg-[#eef8e6] rounded-lg border border-[#d4f0c0]">
              <div>
                <p className="text-2xl font-bold text-[#1a3a2a]">{optOuts.length}</p>
                <p className="text-xs text-[#5a6b5a]">Total opt-outs</p>
              </div>
              <div className="h-10 w-px bg-[#b8dca8]" />
              <div>
                <p className="text-2xl font-bold text-[#1a3a2a]">
                  {optOuts.filter((o) => o.channel === "sms").length}
                </p>
                <p className="text-xs text-[#5a6b5a]">SMS opt-outs</p>
              </div>
              <div className="h-10 w-px bg-[#b8dca8]" />
              <div>
                <p className="text-2xl font-bold text-[#1a3a2a]">
                  {optOuts.filter((o) => o.channel === "email").length}
                </p>
                <p className="text-xs text-[#5a6b5a]">Email opt-outs</p>
              </div>
            </div>

            <p className="text-sm font-medium text-[#1a3a2a] mb-2">Recent Opt-Outs</p>
            <div className="space-y-2">
              {optOuts.map((optOut) => (
                <div
                  key={optOut.id}
                  className="flex items-center gap-3 p-3 border border-[#b8dca8] rounded-lg bg-white"
                >
                  <div className="p-1.5 bg-[#eef8e6] rounded-md shrink-0">
                    {optOut.channel === "sms" ? (
                      <MessageSquare className="h-4 w-4 text-[#5a6b5a]" />
                    ) : (
                      <Mail className="h-4 w-4 text-[#5a6b5a]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1a3a2a] truncate">{optOut.name}</p>
                    <p className="text-xs text-[#5a6b5a] truncate">{optOut.email}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge
                      variant="outline"
                      className="border-[#b8dca8] text-[#5a6b5a] text-xs"
                    >
                      {optOut.channel === "sms" ? "SMS" : "Email"}
                    </Badge>
                    <p className="text-xs text-[#5a6b5a] mt-1">{optOut.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#b8dca8]">
              <p className="text-xs text-[#5a6b5a]">
                Opted-out contacts are automatically excluded from all future campaigns.
                Opt-out requests are processed immediately per TCPA and CAN-SPAM requirements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Log */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Activity className="h-4 w-4" />
            Recent Activity Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#5a6b5a] mb-4">
            Full audit trail of review requests, compliance events, and system actions
          </p>
          <div className="space-y-1">
            {activityLog.map((entry, idx) => (
              <div
                key={entry.id}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-[#eef8e6] ${
                  idx % 2 === 0 ? "bg-white" : "bg-[#eef8e6]/50"
                }`}
              >
                <div className="mt-0.5 p-1.5 bg-[#eef8e6] rounded-md shrink-0">
                  {getActivityIcon(entry.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1a3a2a]">{entry.message}</p>
                </div>
                <span className="text-xs text-[#5a6b5a] shrink-0 whitespace-nowrap">
                  {entry.timestamp}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#b8dca8] flex items-center justify-between">
            <p className="text-xs text-[#5a6b5a]">
              Showing last 7 entries. Audit logs are retained for 24 months.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 border-[#b8dca8] text-[#5a6b5a] hover:bg-[#eef8e6]"
              onClick={() => toast("Full audit log export coming soon.")}
            >
              <ScrollText className="h-3.5 w-3.5" />
              Export Full Log
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
