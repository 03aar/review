"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Bell,
  Star,
  MessageSquare,
  AlertTriangle,
  Check,
  X,
} from "lucide-react"
import { timeAgo } from "@/lib/utils"

interface ReviewData {
  id: string
  rating: number
  customerName: string | null
  finalReview: string | null
  generatedReview: string | null
  sentiment: string | null
  createdAt: string
}

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  icon: React.ElementType
  color: string
}

function buildNotifications(reviews: ReviewData[]): Notification[] {
  const notifications: Notification[] = []

  // Negative review alerts (rating <= 2)
  const negativeReviews = reviews.filter((r) => r.rating <= 2)
  for (const r of negativeReviews.slice(0, 3)) {
    notifications.push({
      id: `neg-${r.id}`,
      title: "Negative Review Alert",
      description: `${r.rating}-star review from ${r.customerName || "Anonymous"}. Consider responding promptly.`,
      time: timeAgo(r.createdAt),
      read: false,
      icon: AlertTriangle,
      color: "bg-red-100 text-red-600",
    })
  }

  // Recent positive reviews (5 stars)
  const recentPositive = reviews.filter((r) => r.rating >= 4).slice(0, 3)
  for (const r of recentPositive) {
    const text = r.finalReview || r.generatedReview || ""
    const preview = text.length > 60 ? text.slice(0, 60) + "..." : text
    notifications.push({
      id: `rev-${r.id}`,
      title: `New ${r.rating}-Star Review`,
      description: preview
        ? `"${preview}" - ${r.customerName || "Anonymous"}`
        : `From ${r.customerName || "Anonymous"}`,
      time: timeAgo(r.createdAt),
      read: true,
      icon: Star,
      color: "bg-[#FFE566]/30 text-[#1a3a2a]",
    })
  }

  // Count of reviews that might need responses (neutral/negative)
  const needResponse = reviews.filter((r) => r.rating <= 3).length
  if (needResponse > 0) {
    notifications.push({
      id: "response-reminder",
      title: "Response Reminder",
      description: `${needResponse} review${needResponse > 1 ? "s" : ""} with 3 stars or below may benefit from a response.`,
      time: "Now",
      read: false,
      icon: MessageSquare,
      color: "bg-[#D4CCFF]/30 text-[#1a3a2a]",
    })
  }

  return notifications
}

export function NotificationCenter({ businessId }: { businessId?: string }) {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [loaded, setLoaded] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const fetchNotifications = useCallback(async () => {
    if (!businessId) return
    try {
      const res = await fetch(`/api/reviews?businessId=${businessId}&pageSize=20`)
      if (!res.ok) return
      const data = await res.json()
      const reviews: ReviewData[] = data?.data ?? (Array.isArray(data) ? data : [])
      setNotifications(buildNotifications(reviews))
    } catch {
      // Silently fail — notifications are non-critical
    } finally {
      setLoaded(true)
    }
  }, [businessId])

  // Fetch when dropdown opens
  useEffect(() => {
    if (open && !loaded) {
      fetchNotifications()
    }
  }, [open, loaded, fetchNotifications])

  // Re-fetch when businessId changes
  useEffect(() => {
    setLoaded(false)
    setNotifications([])
  }, [businessId])

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  const visibleNotifications = notifications.filter((n) => !dismissed.has(n.id))
  const unreadCount = visibleNotifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  function dismissNotification(id: string) {
    setDismissed((prev) => new Set(prev).add(id))
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-[#eef8e6] transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
      >
        <Bell className="h-5 w-5 text-[#4a7a5a]" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl border border-[#b8dca8] shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#b8dca8]">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#1a3a2a]">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-[#2d6a4f] font-medium hover:underline flex items-center gap-1"
              >
                <Check className="h-3 w-3" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {visibleNotifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell className="h-8 w-8 text-[#b8dca8] mx-auto mb-2" />
                <p className="text-sm text-[#5a6b5a]">
                  {!businessId ? "Set up your business to get started" : "No notifications yet"}
                </p>
              </div>
            ) : (
              visibleNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-3 px-4 py-3 border-b border-[#eef8e6] last:border-0 hover:bg-[#eef8e6]/50 transition-colors ${
                    !notification.read ? "bg-[#eef8e6]/30" : ""
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${notification.color}`}>
                    <notification.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${!notification.read ? "font-semibold text-[#1a3a2a]" : "font-medium text-[#1a3a2a]/80"}`}>
                        {notification.title}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          dismissNotification(notification.id)
                        }}
                        className="p-0.5 rounded hover:bg-[#b8dca8]/30 shrink-0"
                        aria-label="Dismiss"
                      >
                        <X className="h-3 w-3 text-[#5a6b5a]" />
                      </button>
                    </div>
                    <p className="text-xs text-[#5a6b5a] mt-0.5 line-clamp-2">{notification.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-[#b8dca8]">{notification.time}</span>
                      {!notification.read && (
                        <button
                          onClick={() => markRead(notification.id)}
                          className="text-[10px] text-[#2d6a4f] hover:underline"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
