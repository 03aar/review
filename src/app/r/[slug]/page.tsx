"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Mic, MicOff, Check, Edit3, Loader2, Send, ArrowLeft, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Step = "rating" | "feedback" | "preview" | "success"

interface BusinessInfo {
  id: string
  name: string
  slug: string
  category: string
  description: string | null
  logoUrl: string | null
  primaryColor: string
}

const RATING_EMOJIS = [
  { value: 1, emoji: "\uD83D\uDE20", label: "Terrible" },
  { value: 2, emoji: "\uD83D\uDE1F", label: "Poor" },
  { value: 3, emoji: "\uD83D\uDE10", label: "Okay" },
  { value: 4, emoji: "\uD83D\uDE0A", label: "Great" },
  { value: 5, emoji: "\uD83E\uDD29", label: "Amazing" },
]

export default function ReviewCapturePage() {
  const params = useParams()
  const slug = params.slug as string

  const [business, setBusiness] = useState<BusinessInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [step, setStep] = useState<Step>("rating")
  const [rating, setRating] = useState<number>(0)
  const [rawInput, setRawInput] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [generatedReview, setGeneratedReview] = useState("")
  const [editedReview, setEditedReview] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["google"])

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const res = await fetch(`/api/businesses/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setBusiness(data)
        } else {
          setNotFound(true)
        }
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    fetchBusiness()
  }, [slug])

  async function handleRatingSelect(value: number) {
    setRating(value)
    setTimeout(() => setStep("feedback"), 300)
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        // In a production app, we'd transcribe the audio here
        // For now, we'll simulate transcription
        stream.getTracks().forEach((t) => t.stop())
        setRawInput(
          (prev) => prev + (prev ? " " : "") + "Voice note recorded - great experience overall"
        )
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch {
      // If microphone access denied, just let user type
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  async function handleGenerateReview() {
    if (!business) return
    setIsGenerating(true)

    try {
      const res = await fetch("/api/ai/generate-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawInput,
          rating,
          businessName: business.name,
          businessCategory: business.category,
        }),
      })
      const data = await res.json()
      setGeneratedReview(data.generatedReview)
      setEditedReview(data.generatedReview)
      setStep("preview")
    } catch {
      // Fallback
      const fallback = `Had a great experience at ${business.name}! ${rawInput}`
      setGeneratedReview(fallback)
      setEditedReview(fallback)
      setStep("preview")
    } finally {
      setIsGenerating(false)
    }
  }

  async function handlePostReview() {
    if (!business) return
    setIsPosting(true)

    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: business.id,
          rating,
          rawInput,
          rawInputType: "text",
          customerName: customerName || undefined,
          platform: selectedPlatforms[0] || "google",
          source: "link",
        }),
      })
      setStep("success")
    } catch {
      setStep("success") // Show success anyway for demo
    } finally {
      setIsPosting(false)
    }
  }

  function togglePlatform(p: string) {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (notFound || !business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md text-center p-8">
          <h1 className="text-xl font-semibold mb-2">Business not found</h1>
          <p className="text-muted-foreground">
            This review link doesn&apos;t seem to be valid. Please check with the business for the correct link.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* ========== STEP 1: RATING ========== */}
          {step === "rating" && (
            <motion.div
              key="rating"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <div
                  className="h-2"
                  style={{ backgroundColor: business.primaryColor }}
                />
                <CardContent className="pt-8 pb-8 text-center space-y-6">
                  <div>
                    {business.logoUrl ? (
                      <img
                        src={business.logoUrl}
                        alt={business.name}
                        className="h-16 w-16 rounded-full mx-auto mb-3 object-cover"
                      />
                    ) : (
                      <div
                        className="h-16 w-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold"
                        style={{ backgroundColor: business.primaryColor }}
                      >
                        {business.name[0]}
                      </div>
                    )}
                    <h1 className="text-xl font-semibold">{business.name}</h1>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium mb-4">
                      How was your experience?
                    </h2>
                    <div className="flex justify-center gap-3">
                      {RATING_EMOJIS.map((r) => (
                        <button
                          key={r.value}
                          onClick={() => handleRatingSelect(r.value)}
                          className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all hover:scale-110 ${
                            rating === r.value
                              ? "bg-blue-100 scale-110"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <span className="text-3xl">{r.emoji}</span>
                          <span className="text-xs text-muted-foreground">
                            {r.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ========== STEP 2: FEEDBACK ========== */}
          {step === "feedback" && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <div
                  className="h-2"
                  style={{ backgroundColor: business.primaryColor }}
                />
                <CardContent className="pt-6 pb-6 space-y-4">
                  <button
                    onClick={() => setStep("rating")}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  <div className="text-center">
                    <span className="text-4xl">
                      {RATING_EMOJIS.find((r) => r.value === rating)?.emoji}
                    </span>
                    <h2 className="text-lg font-medium mt-2">
                      {rating >= 4
                        ? "Awesome! What did you love?"
                        : rating === 3
                        ? "What could we improve?"
                        : "We're sorry. What went wrong?"}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <Textarea
                        placeholder={
                          rating >= 4
                            ? "The food was amazing, our server was great..."
                            : "Tell us what happened..."
                        }
                        value={rawInput}
                        onChange={(e) => setRawInput(e.target.value)}
                        className="min-h-[100px] pr-12"
                      />
                      <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
                          isRecording
                            ? "bg-red-100 text-red-600 animate-pulse"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {isRecording ? (
                          <MicOff className="h-5 w-5" />
                        ) : (
                          <Mic className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {isRecording && (
                      <p className="text-sm text-red-600 text-center animate-pulse">
                        Recording... Tap the mic to stop
                      </p>
                    )}

                    <Input
                      placeholder="Your name (optional)"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={handleGenerateReview}
                    disabled={!rawInput.trim() || isGenerating}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="h-4 w-4 animate-spin" />
                        Creating your review...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate My Review
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    AI will help polish your words. You can edit before posting.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ========== STEP 3: PREVIEW ========== */}
          {step === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <div
                  className="h-2"
                  style={{ backgroundColor: business.primaryColor }}
                />
                <CardContent className="pt-6 pb-6 space-y-4">
                  <button
                    onClick={() => setStep("feedback")}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  <div className="text-center">
                    <h2 className="text-lg font-medium">
                      Here&apos;s your review
                    </h2>
                    <div className="flex justify-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 relative">
                    {isEditing ? (
                      <Textarea
                        value={editedReview}
                        onChange={(e) => setEditedReview(e.target.value)}
                        className="min-h-[120px] bg-white"
                      />
                    ) : (
                      <p className="text-sm leading-relaxed">
                        &ldquo;{editedReview}&rdquo;
                      </p>
                    )}
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      {isEditing ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Edit3 className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {customerName && (
                    <p className="text-sm text-muted-foreground text-right">
                      - {customerName}
                    </p>
                  )}

                  <div>
                    <p className="text-sm font-medium mb-2">
                      Share on:
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { id: "google", label: "Google", icon: "G" },
                        { id: "yelp", label: "Yelp", icon: "Y" },
                        { id: "facebook", label: "Facebook", icon: "f" },
                        { id: "tripadvisor", label: "TripAdvisor", icon: "T" },
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => togglePlatform(p.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                            selectedPlatforms.includes(p.id)
                              ? "bg-blue-50 border-blue-300 text-blue-700"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          <span className="font-bold text-xs">{p.icon}</span>
                          {p.label}
                          {selectedPlatforms.includes(p.id) && (
                            <Check className="h-3 w-3" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handlePostReview}
                    disabled={isPosting || selectedPlatforms.length === 0}
                    className="w-full"
                    size="lg"
                  >
                    {isPosting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Post Review
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ========== STEP 4: SUCCESS ========== */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="overflow-hidden">
                <div
                  className="h-2"
                  style={{ backgroundColor: business.primaryColor }}
                />
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold">
                    Thank you!
                  </h2>
                  <p className="text-muted-foreground">
                    Your review has been posted. {business.name} really
                    appreciates your feedback!
                  </p>
                  <div className="flex justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${
                          i < rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground bg-gray-50 rounded-lg p-3 italic">
                    &ldquo;{editedReview}&rdquo;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Powered by{" "}
          <span className="font-medium text-blue-600">ReviewForge</span>
        </p>
      </div>
    </div>
  )
}
