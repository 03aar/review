"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Settings,
  Star,
  LogOut,
  Link as LinkIcon,
  Copy,
  Check,
} from "lucide-react"
import { signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/reviews", label: "Reviews", icon: MessageSquare },
  { href: "/dashboard/insights", label: "Insights", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function Sidebar({ businessSlug }: { businessSlug?: string }) {
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

  async function handleSignOut() {
    await signOut()
    router.push("/login")
  }

  return (
    <div className="flex h-full flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b">
        <Star className="h-6 w-6 text-blue-600 fill-blue-600" />
        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ReviewForge
        </span>
      </div>

      {/* Review Link */}
      {reviewLink && (
        <div className="mx-4 mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
          <div className="flex items-center gap-1.5 text-xs font-medium text-blue-700 mb-1.5">
            <LinkIcon className="h-3.5 w-3.5" />
            Your Review Link
          </div>
          <div className="flex items-center gap-1">
            <code className="text-xs bg-white px-2 py-1 rounded border flex-1 truncate">
              /r/{businessSlug}
            </code>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 shrink-0"
              onClick={handleCopyLink}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-3 border-t">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
