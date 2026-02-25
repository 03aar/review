"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Mic, MicOff, Check, Edit3, Loader2, Send, ArrowLeft, Zap, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

type Step = "rating" | "feedback" | "private-feedback" | "preview" | "success" | "private-success"

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

/** Step progress for the public review path (rating ≥4) */
const PUBLIC_STEPS: Step[] = ["rating", "feedback", "preview", "success"]
/** Step progress for the private feedback path (rating ≤3) */
const PRIVATE_STEPS: Step[] = ["rating", "private-feedback", "private-success"]

function getStepProgress(step: Step, rating: number): { current: number; total: number } {
  const steps = rating <= 3 ? PRIVATE_STEPS : PUBLIC_STEPS
  const idx = steps.indexOf(step)
  return { current: Math.max(idx, 0) + 1, total: steps.length }
}

/** Rotating progress messages shown during AI generation */
const AI_PROGRESS_MESSAGES = [
  "Polishing your words...",
  "Crafting the perfect review...",
  "Adding some sparkle...",
  "Almost there...",
]

/** sessionStorage key for persisting widget form state */
const STORAGE_KEY = "reviewforge-widget"

interface WidgetFormState {
  step: Step
  rating: number
  rawInput: string
  customerName: string
  generatedReview: string
  editedReview: string
  selectedPlatforms: string[]
  privateFeedback: string
  privateEmail: string
  usedVoice: boolean
}

function saveFormState(slug: string, state: WidgetFormState) {
  try {
    sessionStorage.setItem(`${STORAGE_KEY}-${slug}`, JSON.stringify(state))
  } catch { /* quota exceeded or unavailable — ignore */ }
}

function loadFormState(slug: string): WidgetFormState | null {
  try {
    const raw = sessionStorage.getItem(`${STORAGE_KEY}-${slug}`)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function clearFormState(slug: string) {
  try {
    sessionStorage.removeItem(`${STORAGE_KEY}-${slug}`)
  } catch { /* ignore */ }
}

export default function ReviewCapturePage() {
  const params = useParams()
  const slug = params.slug as string

  const [business, setBusiness] = useState<BusinessInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Restore form state from sessionStorage on mount
  const saved = useRef<WidgetFormState | null>(null)
  if (saved.current === null) {
    saved.current = loadFormState(slug) || ({} as WidgetFormState)
  }
  const s = saved.current

  const [step, setStep] = useState<Step>(s.step || "rating")
  const [rating, setRating] = useState<number>(s.rating || 0)
  const [rawInput, setRawInput] = useState(s.rawInput || "")
  const [customerName, setCustomerName] = useState(s.customerName || "")
  const [generatedReview, setGeneratedReview] = useState(s.generatedReview || "")
  const [editedReview, setEditedReview] = useState(s.editedReview || "")
  const [isEditing, setIsEditing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [usedVoice, setUsedVoice] = useState(s.usedVoice || false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiProgressIdx, setAiProgressIdx] = useState(0)
  const [isPosting, setIsPosting] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(s.selectedPlatforms || ["google"])
  const [privateFeedback, setPrivateFeedback] = useState(s.privateFeedback || "")
  const [privateEmail, setPrivateEmail] = useState(s.privateEmail || "")
  const [isSubmittingPrivate, setIsSubmittingPrivate] = useState(false)

  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Persist form state to sessionStorage on changes (not on success steps)
  useEffect(() => {
    if (step === "success" || step === "private-success") {
      clearFormState(slug)
      return
    }
    saveFormState(slug, {
      step, rating, rawInput, customerName, generatedReview, editedReview,
      selectedPlatforms, privateFeedback, privateEmail, usedVoice,
    })
  }, [slug, step, rating, rawInput, customerName, generatedReview, editedReview, selectedPlatforms, privateFeedback, privateEmail, usedVoice])

  // Warn before leaving page with unsaved data
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (step !== "rating" && step !== "success" && step !== "private-success") {
        e.preventDefault()
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [step])

  // Rotate AI progress messages during generation
  useEffect(() => {
    if (!isGenerating) {
      setAiProgressIdx(0)
      return
    }
    const interval = setInterval(() => {
      setAiProgressIdx((prev) => (prev + 1) % AI_PROGRESS_MESSAGES.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [isGenerating])

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
    if (value <= 3) {
      setTimeout(() => setStep("private-feedback"), 300)
    } else {
      setTimeout(() => setStep("feedback"), 300)
    }
  }

  async function handleSubmitPrivateFeedback() {
    if (!business) return
    setIsSubmittingPrivate(true)

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: business.id,
          rating,
          rawInput: privateFeedback,
          rawInputType: "text",
          customerName: customerName || undefined,
          customerEmail: privateEmail || undefined,
          platform: "private",
          source: "link",
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || "Failed to send feedback. Please try again.")
        return
      }
      toast.success("Thank you! We'll review your feedback carefully.", { duration: 4000 })
      setStep("private-success")
    } catch {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmittingPrivate(false)
    }
  }

  function startRecording() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      toast.error("Voice input is not supported in your browser. Please type your feedback instead.", { duration: 4000 })
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

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsRecording(false)
      if (event.error === "not-allowed") {
        toast.error("Microphone access denied. Please allow mic access in your browser settings.", { duration: 5000 })
      } else if (event.error === "no-speech") {
        toast.error("No speech detected. Please try again and speak clearly.", { duration: 3000 })
      } else {
        toast.error("Voice recording failed. Please type your feedback instead.", { duration: 3000 })
      }
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsRecording(true)
    setUsedVoice(true)
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
      if (!res.ok) {
        throw new Error("API error")
      }
      const data = await res.json()
      setGeneratedReview(data.generatedReview)
      setEditedReview(data.generatedReview)
      setStep("preview")
    } catch {
      // Fallback: use the customer's raw input directly (rating-aware, no fake embellishment)
      const fallback = rawInput.trim() || `My experience at ${business.name} was ${rating >= 4 ? "great" : rating === 3 ? "okay" : "disappointing"}.`
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
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: business.id,
          rating,
          rawInput,
          rawInputType: usedVoice ? "voice" : "text",
          finalReview: editedReview,
          customerName: customerName || undefined,
          platform: selectedPlatforms[0] || "google",
          platforms: selectedPlatforms,
          source: "link",
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || "Failed to post review. Please try again.")
        return
      }
      setStep("success")
    } catch {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsPosting(false)
    }
  }

  function togglePlatform(p: string) {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  // Step progress for the progress bar
  const { current: stepCurrent, total: stepTotal } = getStepProgress(step, rating)
  const progressPct = (stepCurrent / stepTotal) * 100

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
                {/* Progress bar — step 1 always shows a sliver */}
                <div className="h-1.5 bg-[#eef8e6]">
                  <div className="h-full bg-[#2d6a4f] transition-all duration-500 rounded-r-full" style={{ width: "10%" }} />
                </div>
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
                <div className="h-1.5 bg-[#eef8e6]">
                  <div className="h-full bg-[#2d6a4f] transition-all duration-500 rounded-r-full" style={{ width: `${progressPct}%` }} />
                </div>
                <CardContent className="pt-6 pb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setStep("rating")}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <span className="text-xs text-muted-foreground">Step {stepCurrent} of {stepTotal}</span>
                  </div>

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
                        maxLength={5000}
                        className="min-h-[100px] pr-12"
                        autoFocus
                      />
                      <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
                          isRecording
                            ? "bg-red-100 text-red-600 animate-pulse"
                            : "bg-[#d4f0c0] text-[#1a3a2a] hover:bg-[#b8dca8]"
                        }`}
                        aria-label={isRecording ? "Stop recording" : "Start voice recording"}
                      >
                        {isRecording ? (
                          <MicOff className="h-5 w-5" />
                        ) : (
                          <Mic className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {isRecording && (
                      <p className="text-sm text-red-600 text-center animate-pulse" role="status" aria-live="polite">
                        Listening... Tap the mic to stop
                      </p>
                    )}
                    {rawInput.length > 0 && (
                      <p className="text-xs text-muted-foreground text-right">{rawInput.length.toLocaleString()} / 5,000</p>
                    )}

                    <div>
                      <label htmlFor="widget-name" className="text-sm text-muted-foreground mb-1 block">
                        Your name <span className="text-xs opacity-60">(optional)</span>
                      </label>
                      <Input
                        id="widget-name"
                        placeholder="Jane Smith"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        maxLength={100}
                      />
                    </div>
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
                        <span key={aiProgressIdx} className="animate-pulse">
                          {AI_PROGRESS_MESSAGES[aiProgressIdx]}
                        </span>
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

          {/* STEP: PRIVATE FEEDBACK (for ratings 1-3) */}
          {step === "private-feedback" && (
            <motion.div
              key="private-feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-[#b8dca8]">
                <div className="h-1.5 bg-[#eef8e6]">
                  <div className="h-full bg-[#2d6a4f] transition-all duration-500 rounded-r-full" style={{ width: `${progressPct}%` }} />
                </div>
                <CardContent className="pt-6 pb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setStep("rating")}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <span className="text-xs text-muted-foreground">Step {stepCurrent} of {stepTotal}</span>
                  </div>

                  <div className="text-center">
                    <span className="text-4xl">{"\uD83D\uDE1E"}</span>
                    <h2 className="text-lg font-medium mt-2 text-[#1a3a2a]">
                      We&apos;d love to hear from you
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your feedback helps us improve. This goes directly to our team.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Textarea
                        placeholder="Tell us what happened and how we can do better..."
                        value={privateFeedback}
                        onChange={(e) => setPrivateFeedback(e.target.value)}
                        maxLength={5000}
                        className="min-h-[150px]"
                        autoFocus
                      />
                      {privateFeedback.length > 0 && (
                        <p className="text-xs text-muted-foreground text-right mt-1">{privateFeedback.length.toLocaleString()} / 5,000</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="private-name" className="text-sm text-muted-foreground mb-1 block">
                        Your name <span className="text-xs opacity-60">(optional)</span>
                      </label>
                      <Input
                        id="private-name"
                        placeholder="Jane Smith"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        maxLength={100}
                      />
                    </div>

                    <div>
                      <label htmlFor="private-email" className="text-sm text-muted-foreground mb-1 block">
                        Email for follow-up <span className="text-xs opacity-60">(optional)</span>
                      </label>
                      <Input
                        id="private-email"
                        placeholder="you@example.com"
                        type="email"
                        value={privateEmail}
                        onChange={(e) => setPrivateEmail(e.target.value)}
                        maxLength={255}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmitPrivateFeedback}
                    disabled={!privateFeedback.trim() || isSubmittingPrivate}
                    className="w-full bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
                    size="lg"
                  >
                    {isSubmittingPrivate ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="h-4 w-4" />
                        Send Feedback
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    This feedback is private and will only be seen by the {business.name} team.
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
                <div className="h-1.5 bg-[#eef8e6]">
                  <div className="h-full bg-[#2d6a4f] transition-all duration-500 rounded-r-full" style={{ width: `${progressPct}%` }} />
                </div>
                <CardContent className="pt-6 pb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setStep("feedback")}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <span className="text-xs text-muted-foreground">Step {stepCurrent} of {stepTotal}</span>
                  </div>

                  <div className="text-center">
                    <h2 className="text-lg font-medium text-[#1a3a2a]">
                      Here&apos;s your review
                    </h2>
                    <div className="flex justify-center gap-0.5 mt-1" aria-label={`${rating} out of 5 stars`}>
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
                      <div>
                        <Textarea
                          value={editedReview}
                          onChange={(e) => setEditedReview(e.target.value)}
                          maxLength={5000}
                          className="min-h-[120px] bg-white"
                          autoFocus
                        />
                        <p className="text-xs text-muted-foreground text-right mt-1">{editedReview.length.toLocaleString()} / 5,000</p>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed text-[#1a3a2a] pr-10">
                        &ldquo;{editedReview}&rdquo;
                      </p>
                    )}
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="absolute top-2 right-2 p-3 rounded-md hover:bg-[#d4f0c0] transition-colors"
                      aria-label={isEditing ? "Done editing" : "Edit review"}
                    >
                      {isEditing ? (
                        <Check className="h-5 w-5 text-[#2d6a4f]" />
                      ) : (
                        <Edit3 className="h-5 w-5 text-[#4a7a5a]" />
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
                          aria-pressed={selectedPlatforms.includes(p.id)}
                          title={p.label}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm border-2 transition-all ${
                            selectedPlatforms.includes(p.id)
                              ? "bg-[#d4f0c0] border-[#2d6a4f] text-[#1a3a2a] shadow-sm"
                              : "border-[#b8dca8] text-[#4a7a5a] hover:border-[#2d6a4f] hover:bg-[#eef8e6]"
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
                <div className="h-1.5 bg-[#2d6a4f]" />
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
                  <div className="flex justify-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
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
          {/* STEP: PRIVATE SUCCESS */}
          {step === "private-success" && (
            <motion.div
              key="private-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="overflow-hidden border-[#b8dca8]">
                <div className="h-1.5 bg-[#2d6a4f]" />
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-[#d4f0c0] rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-[#2d6a4f]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#1a3a2a]">
                    Thank you for your feedback!
                  </h2>
                  <p className="text-muted-foreground">
                    Your feedback has been sent directly to the team at {business.name}.
                    We take every comment seriously and will work to improve.
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
