"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Mic, MicOff, Check, Edit3, Loader2, Send, ArrowLeft, Zap } from "lucide-react"
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

  const recognitionRef = useRef<SpeechRecognition | null>(null)

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

  function handleRatingSelect(value: number) {
    setRating(value)
    setTimeout(() => setStep("feedback"), 300)
  }

  function startRecording() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      // Fallback: no speech API available
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    let finalTranscript = ""

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " "
        } else {
          interim += transcript
        }
      }
      setRawInput(finalTranscript + interim)
    }

    recognition.onerror = () => {
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
  }

  function stopRecording() {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
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
      setStep("success")
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
      <div className="min-h-screen flex items-center justify-center bg-[#eef8e6]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a4f]" />
      </div>
    )
  }

  if (notFound || !business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eef8e6] p-4">
        <Card className="w-full max-w-md text-center p-8 border-[#b8dca8]">
          <h1 className="text-xl font-semibold mb-2 text-[#1a3a2a]">Business not found</h1>
          <p className="text-muted-foreground">
            This review link doesn&apos;t seem to be valid. Please check with the business for the correct link.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef8e6] p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* STEP 1: RATING */}
          {step === "rating" && (
            <motion.div
              key="rating"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-[#b8dca8]">
                <div className="h-2 bg-[#1a3a2a]" />
                <CardContent className="pt-8 pb-8 text-center space-y-6">
                  <div>
                    {business.logoUrl ? (
                      <img
                        src={business.logoUrl}
                        alt={business.name}
                        className="h-16 w-16 rounded-full mx-auto mb-3 object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold bg-[#1a3a2a]">
                        {business.name[0]}
                      </div>
                    )}
                    <h1 className="text-xl font-semibold text-[#1a3a2a]">{business.name}</h1>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium mb-4 text-[#1a3a2a]">
                      How was your experience?
                    </h2>
                    <div className="flex justify-center gap-3">
                      {RATING_EMOJIS.map((r) => (
                        <button
                          key={r.value}
                          onClick={() => handleRatingSelect(r.value)}
                          className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all hover:scale-110 ${
                            rating === r.value
                              ? "bg-[#d4f0c0] scale-110"
                              : "hover:bg-[#eef8e6]"
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

          {/* STEP 2: FEEDBACK */}
          {step === "feedback" && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-[#b8dca8]">
                <div className="h-2 bg-[#1a3a2a]" />
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
                    <h2 className="text-lg font-medium mt-2 text-[#1a3a2a]">
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
                            : "bg-[#d4f0c0] text-[#1a3a2a] hover:bg-[#b8dca8]"
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
                        Listening... Tap the mic to stop
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
                    className="w-full bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating your review...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
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

          {/* STEP 3: PREVIEW */}
          {step === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-[#b8dca8]">
                <div className="h-2 bg-[#1a3a2a]" />
                <CardContent className="pt-6 pb-6 space-y-4">
                  <button
                    onClick={() => setStep("feedback")}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  <div className="text-center">
                    <h2 className="text-lg font-medium text-[#1a3a2a]">
                      Here&apos;s your review
                    </h2>
                    <div className="flex justify-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < rating
                              ? "text-[#f0d040] fill-[#f0d040]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#eef8e6] rounded-lg p-4 relative">
                    {isEditing ? (
                      <Textarea
                        value={editedReview}
                        onChange={(e) => setEditedReview(e.target.value)}
                        className="min-h-[120px] bg-white"
                      />
                    ) : (
                      <p className="text-sm leading-relaxed text-[#1a3a2a]">
                        &ldquo;{editedReview}&rdquo;
                      </p>
                    )}
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-[#d4f0c0] transition-colors"
                    >
                      {isEditing ? (
                        <Check className="h-4 w-4 text-[#2d6a4f]" />
                      ) : (
                        <Edit3 className="h-4 w-4 text-[#4a7a5a]" />
                      )}
                    </button>
                  </div>

                  {customerName && (
                    <p className="text-sm text-muted-foreground text-right">
                      - {customerName}
                    </p>
                  )}

                  <div>
                    <p className="text-sm font-medium mb-2 text-[#1a3a2a]">
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
                              ? "bg-[#d4f0c0] border-[#2d6a4f] text-[#1a3a2a]"
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
                    className="w-full bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
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

          {/* STEP 4: SUCCESS */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="overflow-hidden border-[#b8dca8]">
                <div className="h-2 bg-[#1a3a2a]" />
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-[#d4f0c0] rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-[#2d6a4f]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#1a3a2a]">
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
                            ? "text-[#f0d040] fill-[#f0d040]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground bg-[#eef8e6] rounded-lg p-3 italic">
                    &ldquo;{editedReview}&rdquo;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Powered by{" "}
          <span className="font-medium text-[#2d6a4f]">ReviewForge</span>
        </p>
      </div>
    </div>
  )
}
