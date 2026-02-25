"use client"

import { useEffect, useState, useCallback, createContext, useContext } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { SearchCommand, SearchTrigger } from "@/components/dashboard/search-command"
import { NotificationCenter } from "@/components/dashboard/notification-center"
import { Loader2, Menu, X, CheckCircle2 } from "lucide-react"
import { useSession, signOut } from "@/lib/auth-client"
import { toast } from "sonner"

interface Business {
  id: string
  name: string
  slug: string
  category: string
}

export const BusinessContext = createContext<{
  business: Business
  updateBusiness: (b: Partial<Business>) => void
} | null>(null)

export function useBusinessContext() {
  const ctx = useContext(BusinessContext)
  if (!ctx) throw new Error("No business context")
  return ctx
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: sessionData, isPending: sessionLoading } = useSession()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loadingBusiness, setLoadingBusiness] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Load businesses from API once session is available
  useEffect(() => {
    if (sessionLoading) return

    if (!sessionData?.session) {
      router.push("/login")
      return
    }

    async function loadBusinesses() {
      try {
        const res = await fetch("/api/businesses")
        if (res.status === 401) {
          router.push("/login")
          return
        }
        if (!res.ok) {
          throw new Error("Failed to load businesses")
        }
        const businesses = await res.json()
        if (businesses.length > 0) {
          setBusiness(businesses[0])
        }
      } catch (err) {
        console.error("Failed to load businesses:", err)
        toast.error("Failed to load your business data")
      } finally {
        setLoadingBusiness(false)
      }
    }

    loadBusinesses()
  }, [sessionData, sessionLoading, router])

  const updateBusiness = useCallback((updates: Partial<Business>) => {
    setBusiness((prev) => {
      if (!prev) return prev
      return { ...prev, ...updates }
    })
  }, [])

  function handleBusinessCreated(b: Business) {
    setBusiness(b)
  }

  // Close mobile menu on route change (not children, which changes every render)
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  async function handleSignOut() {
    await signOut()
    router.push("/login")
  }

  if (sessionLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#eef8e6]">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a4f]" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#eef8e6]">
      {/* Desktop Sidebar */}
      <div className="w-64 shrink-0 hidden md:block">
        <Sidebar businessSlug={business?.slug} onSignOut={handleSignOut} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-72 shadow-xl animate-in slide-in-from-left duration-200">
            <Sidebar
              businessSlug={business?.slug}
              onNavigate={() => setMobileMenuOpen(false)}
              onSignOut={handleSignOut}
            />
          </div>
        </div>
      )}

      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-40 bg-white border-b border-[#b8dca8] px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 rounded-lg transition-colors ${mobileMenuOpen ? "bg-[#d4f0c0]" : "hover:bg-[#eef8e6]"}`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-[#1a3a2a]" />
            ) : (
              <Menu className="h-5 w-5 text-[#1a3a2a]" />
            )}
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-7 h-7 bg-[#1a3a2a] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="text-sm font-bold text-[#1a3a2a]">ReviewForge</span>
          </div>
          <SearchTrigger />
          <NotificationCenter businessId={business?.id} />
        </div>

        {/* Desktop Header Bar */}
        <div className="hidden md:flex sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-[#b8dca8] px-6 py-2.5 items-center justify-between">
          <div />
          <div className="flex items-center gap-3">
            <SearchTrigger />
            <NotificationCenter businessId={business?.id} />
            <div className="w-8 h-8 rounded-full bg-[#d4f0c0] flex items-center justify-center text-xs font-bold text-[#1a3a2a]">
              {sessionData?.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {loadingBusiness ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-[#2d6a4f]" />
            </div>
          ) : !business ? (
            <SetupBusiness onCreated={handleBusinessCreated} />
          ) : (
            <BusinessContext.Provider value={{ business, updateBusiness }}>
              <SearchCommand />
              <OnboardingChecklist />
              {children}
            </BusinessContext.Provider>
          )}
        </div>
      </main>
    </div>
  )
}

function SetupBusiness({ onCreated }: { onCreated: (b: Business) => void }) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("restaurant")
  const [loading, setLoading] = useState(false)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)

    try {
      const res = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          category,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || "Failed to create business")
        return
      }

      const created = await res.json()
      onCreated(created)
      toast.success("Business created! Your review link is ready.")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    "restaurant",
    "hotel",
    "medical",
    "home_services",
    "auto_repair",
    "salon_spa",
    "dental",
    "legal",
    "ecommerce",
    "fitness",
    "education",
    "professional_services",
    "other",
  ]

  return (
    <div className="max-w-lg mx-auto mt-8 md:mt-16">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#1a3a2a] rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">R</span>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-[#1a3a2a]">
          Set up your business
        </h1>
        <p className="text-[#5a6b5a]">
          Let&apos;s get your review collection link ready in under a minute.
        </p>
      </div>
      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label htmlFor="biz-name" className="block text-sm font-medium mb-1.5 text-[#1a3a2a]">
            Business Name
          </label>
          <input
            id="biz-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Luigi's Pizzeria"
            className="w-full px-3 py-2.5 border border-[#b8dca8] rounded-lg text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-white"
            required
            autoFocus
            maxLength={200}
          />
        </div>
        <div>
          <label htmlFor="biz-category" className="block text-sm font-medium mb-1.5 text-[#1a3a2a]">
            Category
          </label>
          <select
            id="biz-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2.5 border border-[#b8dca8] rounded-lg text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={!name.trim() || loading}
          className="w-full bg-[#1a3a2a] text-[#e4f5d6] py-3 rounded-lg font-medium hover:bg-[#0f2a1c] disabled:opacity-50 transition-colors"
        >
          {loading ? "Creating..." : "Create & Get My Review Link"}
        </button>
      </form>

      <div className="mt-8 bg-white rounded-lg border border-[#b8dca8] p-4">
        <h3 className="text-sm font-medium text-[#1a3a2a] mb-2">What happens next?</h3>
        <ul className="space-y-2 text-sm text-[#5a6b5a]">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 w-5 h-5 rounded-full bg-[#d4f0c0] flex items-center justify-center shrink-0 text-xs font-bold text-[#1a3a2a]">1</span>
            You get a unique review collection link
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 w-5 h-5 rounded-full bg-[#d4f0c0] flex items-center justify-center shrink-0 text-xs font-bold text-[#1a3a2a]">2</span>
            Share it with customers via QR, text, or email
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 w-5 h-5 rounded-full bg-[#d4f0c0] flex items-center justify-center shrink-0 text-xs font-bold text-[#1a3a2a]">3</span>
            AI transforms their feedback into polished reviews
          </li>
        </ul>
      </div>
    </div>
  )
}

const ONBOARDING_KEY = "reviewforge_onboarding"

function OnboardingChecklist() {
  const [dismissed, setDismissed] = useState(true)
  const [completed, setCompleted] = useState<string[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem(ONBOARDING_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data.dismissed) {
          setDismissed(true)
          return
        }
        setCompleted(data.completed || [])
        setDismissed(false)
      } catch {
        setDismissed(false)
      }
    } else {
      setDismissed(false)
      setCompleted(["create-account", "setup-business"])
    }
  }, [])

  function toggleStep(id: string) {
    setCompleted((prev) => {
      const next = prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      if (typeof window !== "undefined") {
        localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ dismissed: false, completed: next }))
      }
      return next
    })
  }

  function dismiss() {
    setDismissed(true)
    if (typeof window !== "undefined") {
      localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ dismissed: true, completed }))
    }
  }

  const steps = [
    { id: "create-account", label: "Create your account", time: "Done!" },
    { id: "setup-business", label: "Set up your business profile", time: "Done!" },
    { id: "share-link", label: "Share your review collection link", time: "1 min" },
    { id: "first-review", label: "Get your first review", time: "Varies" },
    { id: "first-response", label: "Respond to a review with AI", time: "2 min" },
  ]

  const completedCount = completed.length
  const totalSteps = steps.length
  const progress = Math.round((completedCount / totalSteps) * 100)

  if (dismissed || completedCount >= totalSteps) return null

  return (
    <div className="mb-6 bg-white rounded-xl border border-[#b8dca8] p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#1a3a2a]">
            Get started with ReviewForge
          </h3>
          <p className="text-xs text-[#5a6b5a] mt-0.5">
            {completedCount}/{totalSteps} steps complete
          </p>
        </div>
        <button
          onClick={dismiss}
          className="text-xs text-[#5a6b5a] hover:text-[#1a3a2a] transition-colors"
        >
          Dismiss
        </button>
      </div>

      <div className="w-full h-2 bg-[#eef8e6] rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-[#2d6a4f] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {steps.map((step) => {
          const isCompleted = completed.includes(step.id)
          return (
            <button
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                isCompleted
                  ? "bg-[#eef8e6] text-[#2d6a4f]"
                  : "hover:bg-[#eef8e6]/50 text-[#1a3a2a]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                  isCompleted
                    ? "bg-[#2d6a4f] border-[#2d6a4f]"
                    : "border-[#b8dca8]"
                }`}
              >
                {isCompleted && <CheckCircle2 className="h-3 w-3 text-white" />}
              </div>
              <span className={`flex-1 ${isCompleted ? "line-through opacity-60" : "font-medium"}`}>
                {step.label}
              </span>
              <span className="text-[10px] text-[#b8dca8] shrink-0">{step.time}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
