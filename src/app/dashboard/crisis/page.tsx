"use client"

import { useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Circle,
  PauseCircle,
  FileText,
  Eye,
  Share2,
  Download,
  Phone,
  Mail,
  Clock,
  TrendingDown,
  TrendingUp,
  Calendar,
  MapPin,
  Megaphone,
  Zap,
  History,
  Users,
  Star,
} from "lucide-react"
import { toast } from "sonner"

interface ChecklistItem {
  id: string
  step: number
  title: string
  description: string
  actionLabel: string
  completed: boolean
}

interface CrisisHistoryEntry {
  id: string
  date: string
  type: string
  severity: "critical" | "high" | "medium" | "low"
  duration: string
  resolution: string
  ratingBefore: number
  ratingAfter: number
  ratingRecovered: number
}

interface SeasonalPrediction {
  id: string
  event: string
  timeframe: string
  impact: string
  likelihood: "high" | "medium" | "low"
}

const initialChecklist: ChecklistItem[] = [
  {
    id: "step-1",
    step: 1,
    title: "Pause all review request campaigns",
    description:
      "Stop sending automated review requests to prevent collecting more negative feedback during the crisis.",
    actionLabel: "Pause Campaigns",
    completed: false,
  },
  {
    id: "step-2",
    step: 2,
    title: "Respond to each review with care",
    description:
      "AI-drafted empathetic responses are ready for your review. Personalize each one before sending.",
    actionLabel: "View Drafts",
    completed: false,
  },
  {
    id: "step-3",
    step: 3,
    title: "Post a public statement",
    description:
      "Address the situation transparently on your Google Business profile and social media channels.",
    actionLabel: "Draft Statement",
    completed: false,
  },
  {
    id: "step-4",
    step: 4,
    title: "Monitor social media closely",
    description:
      "Track mentions across platforms to catch any viral spread early and respond promptly.",
    actionLabel: "View Mentions",
    completed: false,
  },
  {
    id: "step-5",
    step: 5,
    title: "Document everything",
    description:
      "Keep a record of all actions taken, responses sent, and timeline of events for future reference.",
    actionLabel: "Download Report",
    completed: false,
  },
]

const crisisHistory: CrisisHistoryEntry[] = [
  {
    id: "hist-1",
    date: "December 2024",
    type: "Holiday rush complaints",
    severity: "medium",
    duration: "3 days",
    resolution:
      "Increased staffing, sent apology coupons to affected customers, posted holiday hours update",
    ratingBefore: 4.6,
    ratingAfter: 4.3,
    ratingRecovered: 4.5,
  },
  {
    id: "hist-2",
    date: "September 2024",
    type: "Wait time complaints after viral TikTok",
    severity: "high",
    duration: "5 days",
    resolution:
      "Implemented reservation system, added temporary staff, responded to all reviews within 2 hours",
    ratingBefore: 4.5,
    ratingAfter: 4.1,
    ratingRecovered: 4.4,
  },
  {
    id: "hist-3",
    date: "June 2024",
    type: "AC outage during heatwave",
    severity: "low",
    duration: "1 day",
    resolution:
      "Offered complimentary drinks, fixed AC same day, proactively contacted affected diners",
    ratingBefore: 4.5,
    ratingAfter: 4.4,
    ratingRecovered: 4.5,
  },
]

const seasonalPredictions: SeasonalPrediction[] = [
  {
    id: "pred-1",
    event: "City marathon in 3 weeks",
    timeframe: "March 15, 2026",
    impact:
      "Expect 40% more foot traffic. Parking complaints likely due to road closures. Longer wait times expected.",
    likelihood: "high",
  },
  {
    id: "pred-2",
    event: "Holiday season approaching",
    timeframe: "December 2026",
    impact:
      "Historically your rating dips 0.2 stars in December due to increased volume and higher customer expectations.",
    likelihood: "medium",
  },
  {
    id: "pred-3",
    event: "Spring break tourism surge",
    timeframe: "April 2026",
    impact:
      "Tourist reviews tend to be 0.3 stars lower than locals. Expect unfamiliarity complaints about menu and hours.",
    likelihood: "medium",
  },
]

export default function CrisisPage() {
  const { business } = useBusinessContext()
  const [crisisActive, setCrisisActive] = useState(false)
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist)

  const completedSteps = checklist.filter((item) => item.completed).length
  const totalSteps = checklist.length
  const progressPercent = Math.round((completedSteps / totalSteps) * 100)

  function handleSimulateCrisis() {
    if (crisisActive) {
      setCrisisActive(false)
      setChecklist(initialChecklist.map((item) => ({ ...item, completed: false })))
      toast.success("Crisis simulation ended. All clear!")
    } else {
      setCrisisActive(true)
      toast.error("Crisis simulation activated! Follow the response checklist.", {
        duration: 4000,
      })
    }
  }

  function toggleChecklistItem(id: string) {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  function handleChecklistAction(item: ChecklistItem) {
    switch (item.id) {
      case "step-1":
        toast.success("All active campaigns have been paused")
        break
      case "step-2":
        toast.info("Opening AI-drafted responses for review...")
        break
      case "step-3":
        toast.info("Opening statement editor...")
        break
      case "step-4":
        toast.info("Opening social media monitoring dashboard...")
        break
      case "step-5":
        toast.success("Crisis report downloaded as PDF")
        break
    }
  }

  function getSeverityStyle(severity: string) {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "low":
        return "bg-[#d4f0c0] text-[#2d6a4f] hover:bg-[#d4f0c0]"
      default:
        return ""
    }
  }

  function getLikelihoodStyle(likelihood: string) {
    switch (likelihood) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "low":
        return "bg-[#d4f0c0] text-[#2d6a4f] hover:bg-[#d4f0c0]"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3a2a]">Crisis Management</h1>
          <p className="text-[#5a6b5a]">
            Monitor, respond to, and prevent reputation crises for {business.name}
          </p>
        </div>
        <Button
          onClick={handleSimulateCrisis}
          className={
            crisisActive
              ? "gap-2 bg-[#2d6a4f] hover:bg-[#1a3a2a] text-white"
              : "gap-2 bg-red-600 hover:bg-red-700 text-white"
          }
        >
          {crisisActive ? (
            <>
              <ShieldCheck className="h-4 w-4" />
              End Simulation
            </>
          ) : (
            <>
              <AlertTriangle className="h-4 w-4" />
              Simulate Crisis
            </>
          )}
        </Button>
      </div>

      {/* Crisis Status Hero Card */}
      {!crisisActive ? (
        <Card className="border-[#b8dca8] bg-[#eef8e6]">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-[#d4f0c0] rounded-full flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-[#2d6a4f]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#2d6a4f] mb-1">All Clear</h2>
                <p className="text-[#5a6b5a] text-sm">
                  No unusual activity detected for {business.name}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#5a6b5a] bg-white px-3 py-1.5 rounded-full border border-[#b8dca8]">
                <Clock className="h-3.5 w-3.5" />
                Last checked: {new Date().toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 w-full max-w-lg">
                <div className="bg-white rounded-lg border border-[#b8dca8] p-3 text-center">
                  <p className="text-lg font-bold text-[#1a3a2a]">0</p>
                  <p className="text-xs text-[#5a6b5a]">Negative reviews today</p>
                </div>
                <div className="bg-white rounded-lg border border-[#b8dca8] p-3 text-center">
                  <p className="text-lg font-bold text-[#1a3a2a]">4.6</p>
                  <p className="text-xs text-[#5a6b5a]">Current rating</p>
                </div>
                <div className="bg-white rounded-lg border border-[#b8dca8] p-3 text-center">
                  <p className="text-lg font-bold text-[#1a3a2a]">Stable</p>
                  <p className="text-xs text-[#5a6b5a]">Sentiment trend</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-red-300 bg-red-50">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                <AlertOctagon className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-700 mb-1">
                  Crisis Detected
                </h2>
                <p className="text-red-600 text-sm">
                  Unusual negative activity detected for {business.name}
                </p>
              </div>
              <Badge className="bg-red-600 text-white hover:bg-red-600 text-sm px-4 py-1">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Urgency: Critical
              </Badge>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 w-full max-w-xl">
                <div className="bg-white rounded-lg border border-red-200 p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <p className="text-lg font-bold text-red-700">7</p>
                  </div>
                  <p className="text-xs text-red-600">
                    Negative reviews in 24h
                  </p>
                  <p className="text-[10px] text-red-400 mt-0.5">vs 1 average</p>
                </div>
                <div className="bg-white rounded-lg border border-red-200 p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <p className="text-lg font-bold text-red-700">4</p>
                  </div>
                  <p className="text-xs text-red-600">
                    Mention &quot;food poisoning&quot;
                  </p>
                  <p className="text-[10px] text-red-400 mt-0.5">common keyword</p>
                </div>
                <div className="bg-white rounded-lg border border-red-200 p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Share2 className="h-4 w-4 text-red-500" />
                    <p className="text-lg font-bold text-red-700">2</p>
                  </div>
                  <p className="text-xs text-red-600">
                    Social posts with 500+ reach
                  </p>
                  <p className="text-[10px] text-red-400 mt-0.5">potential viral</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Crisis Response Checklist (only when crisis active) */}
      {crisisActive && (
        <Card className="border-red-300">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <CheckCircle2 className="h-4 w-4" />
                Crisis Response Checklist
              </CardTitle>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#5a6b5a]">
                  {completedSteps} of {totalSteps} completed
                </span>
                <Progress
                  value={progressPercent}
                  className="h-2 w-24 bg-red-100"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    item.completed
                      ? "bg-[#eef8e6] border-[#b8dca8]"
                      : "bg-white border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleChecklistItem(item.id)}
                      className="mt-0.5 shrink-0"
                      aria-label={
                        item.completed
                          ? `Mark step ${item.step} incomplete`
                          : `Mark step ${item.step} complete`
                      }
                    >
                      {item.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-[#2d6a4f]" />
                      ) : (
                        <Circle className="h-5 w-5 text-red-400" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3
                            className={`text-sm font-semibold ${
                              item.completed
                                ? "text-[#5a6b5a] line-through"
                                : "text-[#1a3a2a]"
                            }`}
                          >
                            Step {item.step}: {item.title}
                          </h3>
                          <p className="text-xs text-[#5a6b5a] mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant={item.completed ? "outline" : "default"}
                          className={
                            item.completed
                              ? "gap-1.5 border-[#b8dca8] text-[#5a6b5a] shrink-0"
                              : "gap-1.5 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6] shrink-0"
                          }
                          onClick={() => handleChecklistAction(item)}
                        >
                          {item.id === "step-1" && (
                            <PauseCircle className="h-3.5 w-3.5" />
                          )}
                          {item.id === "step-2" && (
                            <FileText className="h-3.5 w-3.5" />
                          )}
                          {item.id === "step-3" && (
                            <Megaphone className="h-3.5 w-3.5" />
                          )}
                          {item.id === "step-4" && (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                          {item.id === "step-5" && (
                            <Download className="h-3.5 w-3.5" />
                          )}
                          {item.actionLabel}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Crisis History */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <History className="h-4 w-4" />
            Crisis History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {crisisHistory.length === 0 ? (
            <div className="text-center py-10">
              <ShieldCheck className="h-10 w-10 mx-auto mb-3 text-[#b8dca8]" />
              <p className="font-medium text-[#1a3a2a]">No past incidents</p>
              <p className="text-sm text-[#5a6b5a] mt-1">
                Your crisis history will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {crisisHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="border border-[#b8dca8] rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-[#1a3a2a]">
                        {entry.type}
                      </h3>
                      <Badge className={getSeverityStyle(entry.severity)}>
                        {entry.severity.charAt(0).toUpperCase() +
                          entry.severity.slice(1)}{" "}
                        Severity
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#5a6b5a] shrink-0">
                      <Calendar className="h-3.5 w-3.5" />
                      {entry.date}
                    </div>
                  </div>

                  <p className="text-xs text-[#5a6b5a] mb-3">{entry.resolution}</p>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#2d6a4f]" />
                      <span className="text-xs text-[#5a6b5a]">
                        Resolved in {entry.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs text-[#5a6b5a]">
                        Rating: {entry.ratingBefore}
                      </span>
                      <TrendingDown className="h-3 w-3 text-red-500" />
                      <span className="text-xs text-red-600 font-medium">
                        {entry.ratingAfter}
                      </span>
                      <TrendingUp className="h-3 w-3 text-[#2d6a4f]" />
                      <span className="text-xs text-[#2d6a4f] font-medium">
                        {entry.ratingRecovered}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Seasonal Predictions */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
              <Calendar className="h-4 w-4" />
              Seasonal Predictions
            </CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 border-[#b8dca8] text-[#2d6a4f] hover:bg-[#eef8e6]"
                onClick={() =>
                  toast.success("Response template editor opened")
                }
              >
                <FileText className="h-3.5 w-3.5" />
                Prepare Response Templates
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 border-[#b8dca8] text-[#2d6a4f] hover:bg-[#eef8e6]"
                onClick={() =>
                  toast.success("Proactive post draft created")
                }
              >
                <Megaphone className="h-3.5 w-3.5" />
                Draft Proactive Post
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {seasonalPredictions.map((prediction) => (
              <div
                key={prediction.id}
                className="border border-[#b8dca8] rounded-lg p-4 bg-[#eef8e6]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <MapPin className="h-4 w-4 text-[#2d6a4f]" />
                    <h3 className="text-sm font-semibold text-[#1a3a2a]">
                      {prediction.event}
                    </h3>
                    <Badge className={getLikelihoodStyle(prediction.likelihood)}>
                      {prediction.likelihood.charAt(0).toUpperCase() +
                        prediction.likelihood.slice(1)}{" "}
                      Likelihood
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#5a6b5a] shrink-0">
                    <Calendar className="h-3.5 w-3.5" />
                    {prediction.timeframe}
                  </div>
                </div>
                <p className="text-xs text-[#5a6b5a] ml-6">{prediction.impact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Users className="h-4 w-4" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-[#b8dca8] rounded-lg p-4 bg-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#d4f0c0] rounded-full flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-[#2d6a4f]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1a3a2a]">
                    Business Owner
                  </h3>
                  <p className="text-xs text-[#5a6b5a] mt-0.5">Primary contact</p>
                  <p className="text-sm text-[#2d6a4f] font-medium mt-1">
                    (555) 123-4567
                  </p>
                  <p className="text-xs text-[#5a6b5a]">Available 24/7</p>
                </div>
              </div>
            </div>
            <div className="border border-[#b8dca8] rounded-lg p-4 bg-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#d4f0c0] rounded-full flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-[#2d6a4f]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1a3a2a]">
                    ReviewForge Support Team
                  </h3>
                  <p className="text-xs text-[#5a6b5a] mt-0.5">
                    Crisis response specialists
                  </p>
                  <p className="text-sm text-[#2d6a4f] font-medium mt-1">
                    crisis@reviewforge.com
                  </p>
                  <p className="text-xs text-[#5a6b5a]">
                    Response time: under 30 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
