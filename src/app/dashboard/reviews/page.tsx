"use client"

import { useEffect, useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
  const business = useBusinessContext()
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "positive" | "neutral" | "negative">("all")
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null)
  const [responseText, setResponseText] = useState("")
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetch(`/api/reviews?businessId=${business.id}`)
      .then((r) => r.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [business.id])

  const filteredReviews = reviews.filter((r) => {
    if (filter === "all") return true
    return r.sentiment === filter
  })

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
      const data = await res.json()
      setResponseText(data.response)
    } catch {
      setResponseText("Thank you for your feedback! We really appreciate it.")
    } finally {
      setIsGeneratingResponse(false)
    }
  }

  async function handleApproveResponse() {
    if (!selectedReview) return

    try {
      await fetch(`/api/reviews/${selectedReview.id}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditing ? "edit" : "approve",
          editedResponse: responseText,
        }),
      })
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

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Reviews</h1>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-6">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">
            {reviews.length} reviews collected
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {(["all", "positive", "neutral", "negative"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? "bg-[#d4f0c0] text-[#1a3a2a]"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">No reviews found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {reviews.length === 0
                ? "Share your review link to start collecting feedback"
                : "No reviews match this filter"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredReviews.map((r) => (
            <Card key={r.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-5 pb-4">
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#d4f0c0] flex items-center justify-center text-[#1a3a2a] font-medium">
                      {r.customerName ? r.customerName[0].toUpperCase() : "?"}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium">
                        {r.customerName || "Anonymous"}
                      </span>
                      <div className="flex gap-0.5">
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
                      <Badge variant="outline">{r.platform}</Badge>
                    </div>

                    <p className="text-sm mb-2">
                      {r.finalReview || r.generatedReview}
                    </p>

                    {r.rawInput && r.rawInput !== r.finalReview && (
                      <div className="text-xs text-muted-foreground bg-gray-50 p-2 rounded mb-2">
                        <span className="font-medium">Original input:</span>{" "}
                        &ldquo;{r.rawInput}&rdquo;
                      </div>
                    )}

                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {timeAgo(r.createdAt)}
                      </div>

                      {getTopics(r.topics).map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px]">
                          {t}
                        </Badge>
                      ))}

                      <Badge variant="outline" className="text-[10px]">
                        via {r.source}
                      </Badge>
                    </div>

                    <div className="mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateResponse(r)}
                        className="gap-1.5"
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
              {/* Original Review */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">
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
                <p className="text-sm text-muted-foreground">
                  {selectedReview.finalReview || selectedReview.generatedReview}
                </p>
              </div>

              {/* Response */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Your Response</span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleRegenerateResponse}
                      disabled={isGeneratingResponse}
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
                    <span className="text-sm text-muted-foreground">
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
                  <div className="bg-[#eef8e6] rounded-lg p-3 text-sm">
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
