"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Link as LinkIcon,
  Copy,
  Check,
  Megaphone,
  Trophy,
  DollarSign,
  Users,
  Heart,
  Shield,
  Share2,
  Target,
  Radio,
  AlertTriangle,
  Zap,
  Code,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const navSections = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/reviews", label: "Reviews", icon: MessageSquare },
      { href: "/dashboard/insights", label: "Insights", icon: BarChart3 },
      { href: "/dashboard/campaigns", label: "Campaigns", icon: Megaphone },
    ],
  },
  {
    label: "Growth",
    items: [
      { href: "/dashboard/roi", label: "ROI & Impact", icon: DollarSign },
      { href: "/dashboard/goals", label: "Goals", icon: Target },
      { href: "/dashboard/marketing", label: "Marketing", icon: Share2 },
      { href: "/dashboard/optimization", label: "Optimization", icon: Zap },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/dashboard/staff", label: "Staff", icon: Users },
      { href: "/dashboard/competitors", label: "Competitors", icon: Trophy },
      { href: "/dashboard/monitoring", label: "Monitoring", icon: Radio },
      { href: "/dashboard/crisis", label: "Crisis", icon: AlertTriangle },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/dashboard/recovery", label: "Recovery", icon: Heart },
      { href: "/dashboard/protection", label: "Protection", icon: Shield },
      { href: "/dashboard/developers", label: "Developers", icon: Code },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
]

export function Sidebar({
  businessSlug,
  onNavigate,
  onSignOut,
}: {
  businessSlug?: string
  onNavigate?: () => void
  onSignOut?: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const reviewLink = businessSlug
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/r/${businessSlug}`
    : null

  async function handleCopyLink() {
    if (!reviewLink) return
    try {
      await navigator.clipboard.writeText(reviewLink)
      setCopied(true)
      toast.success("Review link copied!")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Failed to copy")
    }
  }

  function handleSignOut() {
    if (onSignOut) {
      onSignOut()
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="flex h-full flex-col border-r border-[#b8dca8] bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-[#b8dca8]">
        <div className="w-8 h-8 bg-[#1a3a2a] rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">R</span>
        </div>
        <span className="text-lg font-bold text-[#1a3a2a]">
          ReviewForge
        </span>
      </div>

      {/* Review Link */}
      {reviewLink && (
        <div className="mx-4 mt-4 p-3 rounded-lg bg-[#eef8e6] border border-[#b8dca8]">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#2d6a4f] mb-1.5">
            <LinkIcon className="h-3.5 w-3.5" />
            Your Review Link
          </div>
          <div className="flex items-center gap-1">
            <code className="text-xs bg-white px-2 py-1 rounded border border-[#b8dca8] flex-1 truncate text-[#1a3a2a]">
              /r/{businessSlug}
            </code>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 shrink-0"
              onClick={handleCopyLink}
              aria-label="Copy review link"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-[#2d6a4f]" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto" aria-label="Dashboard navigation">
        {navSections.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#b8dca8]">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition-colors border-l-[3px]",
                      isActive
                        ? "bg-[#d4f0c0] text-[#1a3a2a] font-semibold border-[#2d6a4f]"
                        : "text-[#4a7a5a] hover:bg-[#eef8e6] hover:text-[#1a3a2a] font-medium border-transparent"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="p-3 border-t border-[#b8dca8]">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#4a7a5a] hover:bg-[#eef8e6] hover:text-[#1a3a2a] transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
