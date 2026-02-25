"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Megaphone,
  DollarSign,
  Target,
  Share2,
  Zap,
  Users,
  Trophy,
  Radio,
  AlertTriangle,
  Heart,
  Shield,
  Code,
  Settings,
  Star,
  ArrowRight,
  Command,
} from "lucide-react"

interface SearchItem {
  label: string
  href: string
  icon: React.ElementType
  category: string
  keywords: string[]
}

const searchItems: SearchItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, category: "Pages", keywords: ["home", "dashboard", "main"] },
  { label: "Reviews", href: "/dashboard/reviews", icon: MessageSquare, category: "Pages", keywords: ["reviews", "feedback", "ratings", "stars"] },
  { label: "Insights", href: "/dashboard/insights", icon: BarChart3, category: "Pages", keywords: ["analytics", "charts", "sentiment", "trends"] },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone, category: "Pages", keywords: ["campaigns", "sms", "email", "requests"] },
  { label: "ROI & Impact", href: "/dashboard/roi", icon: DollarSign, category: "Growth", keywords: ["roi", "revenue", "impact", "money"] },
  { label: "Goals", href: "/dashboard/goals", icon: Target, category: "Growth", keywords: ["goals", "targets", "achievements", "gamification"] },
  { label: "Marketing", href: "/dashboard/marketing", icon: Share2, category: "Growth", keywords: ["marketing", "testimonials", "social", "widgets"] },
  { label: "Optimization", href: "/dashboard/optimization", icon: Zap, category: "Growth", keywords: ["optimization", "timing", "ab testing", "conversion"] },
  { label: "Staff Insights", href: "/dashboard/staff", icon: Users, category: "Intelligence", keywords: ["staff", "employees", "team", "performance"] },
  { label: "Competitors", href: "/dashboard/competitors", icon: Trophy, category: "Intelligence", keywords: ["competitors", "benchmark", "compare"] },
  { label: "Monitoring", href: "/dashboard/monitoring", icon: Radio, category: "Intelligence", keywords: ["monitoring", "mentions", "brand", "alerts"] },
  { label: "Crisis Management", href: "/dashboard/crisis", icon: AlertTriangle, category: "Intelligence", keywords: ["crisis", "emergency", "response"] },
  { label: "Recovery", href: "/dashboard/recovery", icon: Heart, category: "System", keywords: ["recovery", "customers", "negative", "rescue"] },
  { label: "Protection", href: "/dashboard/protection", icon: Shield, category: "System", keywords: ["protection", "fake", "compliance", "audit"] },
  { label: "Developers", href: "/dashboard/developers", icon: Code, category: "System", keywords: ["api", "developers", "webhooks", "keys"] },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, category: "System", keywords: ["settings", "profile", "billing", "notifications", "security"] },
]

const quickActions = [
  { label: "Send review request", category: "Actions", keywords: ["send", "request", "review"] },
  { label: "Generate QR code", category: "Actions", keywords: ["qr", "code", "generate", "print"] },
  { label: "View recent reviews", category: "Actions", keywords: ["recent", "latest", "new"] },
  { label: "Export data", category: "Actions", keywords: ["export", "download", "csv"] },
]

export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filteredItems = query.trim()
    ? searchItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some((k) => k.includes(query.toLowerCase()))
      )
    : searchItems

  const filteredActions = query.trim()
    ? quickActions.filter((a) =>
        a.label.toLowerCase().includes(query.toLowerCase()) ||
        a.keywords.some((k) => k.includes(query.toLowerCase()))
      )
    : []

  const allResults = [...filteredItems, ...filteredActions]

  // Keyboard shortcut to open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Focus input when open
  useEffect(() => {
    if (open) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, allResults.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        const selected = allResults[selectedIndex]
        if (selected && "href" in selected) {
          router.push((selected as SearchItem).href)
          setOpen(false)
        }
      }
    },
    [allResults, selectedIndex, router]
  )

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg">
        <div className="bg-white rounded-2xl border-2 border-[#b8dca8] shadow-xl overflow-hidden mx-4">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#b8dca8]">
            <Search className="h-5 w-5 text-[#5a6b5a]" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search pages, actions..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedIndex(0)
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 text-sm text-[#1a3a2a] placeholder:text-[#5a6b5a]/50 outline-none bg-transparent"
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-[#eef8e6] text-[10px] font-mono text-[#5a6b5a] border border-[#b8dca8]">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto py-2">
            {filteredItems.length === 0 && filteredActions.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-[#5a6b5a]">No results found for &ldquo;{query}&rdquo;</p>
              </div>
            ) : (
              <>
                {/* Group by category */}
                {["Pages", "Growth", "Intelligence", "System"].map((cat) => {
                  const items = filteredItems.filter((i) => i.category === cat)
                  if (items.length === 0) return null
                  return (
                    <div key={cat}>
                      <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#b8dca8]">
                        {cat}
                      </p>
                      {items.map((item) => {
                        const idx = allResults.indexOf(item)
                        return (
                          <button
                            key={item.href}
                            onClick={() => {
                              router.push(item.href)
                              setOpen(false)
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                              idx === selectedIndex
                                ? "bg-[#d4f0c0] text-[#1a3a2a]"
                                : "text-[#4a7a5a] hover:bg-[#eef8e6]"
                            }`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="flex-1 text-left">{item.label}</span>
                            <ArrowRight className="h-3 w-3 opacity-30" />
                          </button>
                        )
                      })}
                    </div>
                  )
                })}

                {filteredActions.length > 0 && (
                  <div>
                    <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#b8dca8]">
                      Quick Actions
                    </p>
                    {filteredActions.map((action, i) => {
                      const idx = filteredItems.length + i
                      return (
                        <button
                          key={action.label}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                            idx === selectedIndex
                              ? "bg-[#d4f0c0] text-[#1a3a2a]"
                              : "text-[#4a7a5a] hover:bg-[#eef8e6]"
                          }`}
                        >
                          <Star className="h-4 w-4" />
                          <span className="flex-1 text-left">{action.label}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#b8dca8] bg-[#eef8e6]">
            <div className="flex items-center gap-3 text-[10px] text-[#5a6b5a]">
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white border border-[#b8dca8] font-mono">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white border border-[#b8dca8] font-mono">↵</kbd> Open</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-white border border-[#b8dca8] font-mono">esc</kbd> Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SearchTrigger() {
  const [, setOpen] = useState(false)

  return (
    <button
      onClick={() => {
        // Dispatch Cmd+K event
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
      }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#eef8e6] border border-[#b8dca8] text-sm text-[#5a6b5a] hover:bg-[#d4f0c0] transition-colors"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white text-[10px] font-mono border border-[#b8dca8] ml-1">
        <Command className="h-2.5 w-2.5" />K
      </kbd>
    </button>
  )
}
