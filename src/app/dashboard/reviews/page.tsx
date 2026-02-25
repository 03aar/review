"use client"

import { useEffect, useState, useMemo } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Star,
  MessageSquare,
  Reply,
  RefreshCw,
  Check,
  Edit3,
  Clock,
  Filter,
  Sparkles,
  Search,
  Download,
  Link as LinkIcon,
} from "lucide-react"
import { timeAgo } from "@/lib/utils"
import { toast } from "sonner"

interface ReviewData {
  id: string
  rating: number
  rawInput: string | null
  generatedReview: string | null
  finalReview: string | null
  customerName: string | null
  customerEmail: string | null
  sentiment: string | null
  topics: string | null
  platform: string
  source: string
  postedToPlatform: boolean
  createdAt: string
}

export default function ReviewsPage() {
  const { business } = useBusinessContext()
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [filter, setFilter] = useState<"all" | "positive" | "neutral" | "negative">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null)
  const [responseText, setResponseText] = useState("")
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetch(`/api/reviews?businessId=${business.id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch")
        return r.json()
      })
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [business.id])

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (filter !== "all" && r.sentiment !== filter) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const text = (r.finalReview || r.generatedReview || "").toLowerCase()
        const name = (r.customerName || "").toLowerCase()
        const topics = (r.topics || "").toLowerCase()
        if (!text.includes(q) && !name.includes(q) && !topics.includes(q)) return false
      }
      return true
    })
  }, [reviews, filter, searchQuery])

  async function handleGenerateResponse(review: ReviewData) {
    setSelectedReview(review)
    setIsGeneratingResponse(true)
    setIsEditing(false)

    try {
      const res = await fetch("/api/ai/generate-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          review: review.finalReview || review.generatedReview || "",
          rating: review.rating,
          businessName: business.name,
          customerName: review.customerName || undefined,
        }),
      })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      setResponseText(data.response)
    } catch {
      setResponseText("Thank you for your feedback! We really appreciate it.")
      toast.error("AI generation failed, using default response")
    } finally {
      setIsGeneratingResponse(false)
    }
  }

  async function handleApproveResponse() {
    if (!selectedReview) return

    try {
      const res = await fetch(`/api/reviews/${selectedReview.id}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditing ? "edit" : "approve",
          editedResponse: responseText,
        }),
      })
      if (!res.ok) throw new Error("Failed")
      toast.success("Response posted!")
      setSelectedReview(null)
    } catch {
      toast.error("Failed to post response")
    }
  }

  async function handleRegenerateResponse() {
    if (!selectedReview) return
    setIsGeneratingResponse(true)

    try {
      const res = await fetch(`/api/reviews/${selectedReview.id}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "regenerate" }),
      })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      setResponseText(data.response)
    } catch {
      toast.error("Failed to regenerate")
    } finally {
      setIsGeneratingResponse(false)
    }
  }

  function getTopics(topicsJson: string | null): string[] {
    if (!topicsJson) return []
    try {
      return JSON.parse(topicsJson)
    } catch {
      return []
    }
  }

  function handleExportCSV() {
    const headers = ["Customer", "Rating", "Sentiment", "Platform", "Source", "Review", "Date"]
    const rows = reviews.map((r) => [
      r.customerName || "Anonymous",
      r.rating.toString(),
      r.sentiment || "",
      r.platform,
      r.source,
      `"${(r.finalReview || r.generatedReview || "").replace(/"/g, '""')}"`,
      new Date(r.createdAt).toLocaleDateString(),
    ])

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `reviews-${business.slug}-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Reviews exported as CSV!")
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Reviews</h1>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse border-[#b8dca8]">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#d4f0c0]" />
                  <div className="flex-1">
                    <div className="h-4 bg-[#d4f0c0] rounded w-1/3 mb-3" />
                    <div className="h-3 bg-[#d4f0c0] rounded w-full mb-2" />
                    <div className="h-3 bg-[#d4f0c0] rounded w-2/3" />
                  </div>
                </div>
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
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Reviews</h1>
        <Card className="border-[#b8dca8]">
          <CardContent className="py-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-red-300" />
            <p className="font-medium text-red-600">Failed to load reviews</p>
            <p className="text-sm text-[#5a6b5a] mt-1">
              Please try refreshing the page
            </p>
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3a2a]">Reviews</h1>
          <p className="text-[#5a6b5a]">
            {reviews.length} reviews collected
          </p>
        </div>
        <div className="flex gap-2">
          {reviews.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-[#b8dca8]"
              onClick={handleExportCSV}
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </Button>
          )}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a6b5a]" />
          <Input
            placeholder="Search reviews by name, content, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-[#b8dca8]"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-[#5a6b5a]" />
          {(["all", "positive", "neutral", "negative"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-[#d4f0c0] text-[#1a3a2a]"
                  : "bg-white text-[#5a6b5a] hover:bg-[#eef8e6] border border-[#b8dca8]"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== "all" && (
                <span className="ml-1 text-xs">
                  ({reviews.filter((r) => r.sentiment === f).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <Card className="border-[#b8dca8]">
          <CardContent className="py-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-[#b8dca8]" />
            <p className="font-medium text-[#1a3a2a]">
              {reviews.length === 0 ? "No reviews yet" : "No reviews found"}
            </p>
            <p className="text-sm text-[#5a6b5a] mt-1">
              {reviews.length === 0 ? (
                <>Share your review link to start collecting feedback</>
              ) : searchQuery ? (
                <>Try adjusting your search or filter</>
              ) : (
                <>No reviews match this filter</>
              )}
            </p>
            {reviews.length === 0 && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#2d6a4f]">
                <LinkIcon className="h-4 w-4" />
                <code className="bg-[#eef8e6] px-2 py-1 rounded">/r/{business.slug}</code>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-[#5a6b5a]">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </p>
          {filteredReviews.map((r) => (
            <Card key={r.id} className="hover:shadow-md transition-shadow border-[#b8dca8]">
              <CardContent className="pt-5 pb-4">
                <div className="flex gap-3 sm:gap-4">
                  <div className="shrink-0 hidden sm:block">
                    <div className="w-10 h-10 rounded-full bg-[#d4f0c0] flex items-center justify-center text-[#1a3a2a] font-medium">
                      {r.customerName ? r.customerName[0].toUpperCase() : "?"}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-[#1a3a2a]">
                        {r.customerName || "Anonymous"}
                      </span>
                      <div className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < r.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <Badge
                        variant={
                          r.sentiment === "negative"
                            ? "destructive"
                            : "secondary"
                        }
                        className={r.sentiment === "positive" ? "bg-[#d4f0c0] text-[#1a3a2a] hover:bg-[#d4f0c0]" : ""}
                      >
                        {r.sentiment}
                      </Badge>
                      <Badge variant="outline" className="border-[#b8dca8]">{r.platform}</Badge>
                    </div>

                    <p className="text-sm mb-2 text-[#1a3a2a]">
                      {r.finalReview || r.generatedReview}
                    </p>

                    {r.rawInput && r.rawInput !== r.finalReview && (
                      <div className="text-xs text-[#5a6b5a] bg-[#eef8e6] p-2 rounded mb-2 border border-[#b8dca8]">
                        <span className="font-medium">Original input:</span>{" "}
                        &ldquo;{r.rawInput}&rdquo;
                      </div>
                    )}

                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <div className="flex items-center gap-1 text-xs text-[#5a6b5a]">
                        <Clock className="h-3 w-3" />
                        {timeAgo(r.createdAt)}
                      </div>

                      {getTopics(r.topics).map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px]">
                          {t}
                        </Badge>
                      ))}

                      <Badge variant="outline" className="text-[10px] border-[#b8dca8]">
                        via {r.source}
                      </Badge>
                    </div>

                    <div className="mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateResponse(r)}
                        className="gap-1.5 border-[#b8dca8]"
                      >
                        <Reply className="h-3.5 w-3.5" />
                        Respond with AI
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Response Dialog */}
      <Dialog
        open={!!selectedReview}
        onOpenChange={(open) => !open && setSelectedReview(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#2d6a4f]" />
              AI Response
            </DialogTitle>
            <DialogDescription>
              Review and approve the AI-generated response before posting
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-4">
              <div className="bg-[#eef8e6] rounded-lg p-3 border border-[#b8dca8]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[#1a3a2a]">
                    {selectedReview.customerName || "Anonymous"}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < selectedReview.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#5a6b5a]">
                  {selectedReview.finalReview || selectedReview.generatedReview}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1a3a2a]">Your Response</span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleRegenerateResponse}
                      disabled={isGeneratingResponse}
                      aria-label="Regenerate response"
                    >
                      <RefreshCw
                        className={`h-3.5 w-3.5 ${
                          isGeneratingResponse ? "animate-spin" : ""
                        }`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditing(!isEditing)}
                      aria-label={isEditing ? "Done editing" : "Edit response"}
                    >
                      {isEditing ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Edit3 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>

                {isGeneratingResponse ? (
                  <div className="flex items-center justify-center py-8">
                    <Sparkles className="h-5 w-5 animate-spin text-[#2d6a4f] mr-2" />
                    <span className="text-sm text-[#5a6b5a]">
                      Generating response...
                    </span>
                  </div>
                ) : isEditing ? (
                  <Textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="min-h-[120px]"
                  />
                ) : (
                  <div className="bg-[#eef8e6] rounded-lg p-3 text-sm text-[#1a3a2a] border border-[#b8dca8]">
                    {responseText}
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedReview(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApproveResponse}
              disabled={isGeneratingResponse || !responseText}
              className="bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
            >
              <Check className="h-4 w-4 mr-1" />
              Approve & Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
