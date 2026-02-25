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
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/reviews", label: "Reviews", icon: MessageSquare },
  { href: "/dashboard/insights", label: "Insights", icon: BarChart3 },
  { href: "/dashboard/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/dashboard/competitors", label: "Competitors", icon: Trophy },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function Sidebar({
  businessSlug,
  onNavigate,
}: {
  businessSlug?: string
  onNavigate?: () => void
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
    if (typeof window !== "undefined") {
      localStorage.removeItem("reviewforge_business")
      localStorage.removeItem("reviewforge_settings")
    }
    router.push("/login")
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
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Dashboard navigation">
        {navItems.map((item) => {
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
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#d4f0c0] text-[#1a3a2a]"
                  : "text-[#4a7a5a] hover:bg-[#eef8e6] hover:text-[#1a3a2a]"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
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
