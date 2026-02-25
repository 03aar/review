"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bell,
  Star,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Users,
  CreditCard,
  Megaphone,
  Check,
  X,
} from "lucide-react"

interface Notification {
  id: string
  type: "review" | "negative" | "response" | "milestone" | "team" | "billing" | "campaign" | "system"
  title: string
  description: string
  time: string
  read: boolean
  icon: React.ElementType
  color: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "negative",
    title: "Negative Review Alert",
    description: "A 2-star review was just posted on Google. Immediate attention recommended.",
    time: "2 min ago",
    read: false,
    icon: AlertTriangle,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "2",
    type: "review",
    title: "New 5-Star Review",
    description: '"Amazing experience! The staff was incredibly helpful..." - Sarah M.',
    time: "15 min ago",
    read: false,
    icon: Star,
    color: "bg-[#FFE566]/30 text-[#1a3a2a]",
  },
  {
    id: "3",
    type: "response",
    title: "Response Reminder",
    description: "3 reviews are waiting for responses (oldest: 2 days ago).",
    time: "1 hour ago",
    read: false,
    icon: MessageSquare,
    color: "bg-[#D4CCFF]/30 text-[#1a3a2a]",
  },
  {
    id: "4",
    type: "milestone",
    title: "Milestone Reached!",
    description: "Congratulations! You've collected 100 reviews this month.",
    time: "3 hours ago",
    read: true,
    icon: TrendingUp,
    color: "bg-[#C8F5D4]/50 text-[#2d6a4f]",
  },
  {
    id: "5",
    type: "campaign",
    title: "Campaign Completed",
    description: '"Q1 Review Push" campaign finished. 45 of 120 requests converted.',
    time: "5 hours ago",
    read: true,
    icon: Megaphone,
    color: "bg-[#FFDAB5]/30 text-[#1a3a2a]",
  },
  {
    id: "6",
    type: "team",
    title: "Team Member Joined",
    description: "Jordan Kim accepted your invitation and joined as an Admin.",
    time: "Yesterday",
    read: true,
    icon: Users,
    color: "bg-[#C8F5D4]/30 text-[#2d6a4f]",
  },
  {
    id: "7",
    type: "billing",
    title: "Payment Successful",
    description: "Your Growth plan payment of $79.00 was processed successfully.",
    time: "2 days ago",
    read: true,
    icon: CreditCard,
    color: "bg-[#eef8e6] text-[#2d6a4f]",
  },
]

export function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

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

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  function dismissNotification(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
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

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl border border-[#b8dca8] shadow-lg z-50 overflow-hidden">
          {/* Header */}
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

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell className="h-8 w-8 text-[#b8dca8] mx-auto mb-2" />
                <p className="text-sm text-[#5a6b5a]">You&apos;re all caught up!</p>
              </div>
            ) : (
              notifications.map((notification) => (
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

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-[#b8dca8] bg-[#eef8e6]/50">
            <button className="text-xs text-[#2d6a4f] font-medium hover:underline w-full text-center">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
