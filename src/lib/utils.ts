import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(name: string, suffix?: string): string {
  let slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) // Cap slug length to prevent excessively long URLs
    .replace(/-+$/g, "") // Re-trim trailing hyphen after slicing
  if (suffix) {
    slug = `${slug}-${suffix}`
  }
  return slug || "business"
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  if (isNaN(d.getTime())) return "Invalid date"
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function timeAgo(date: Date | string): string {
  const past = new Date(date)
  if (isNaN(past.getTime())) return "Invalid date"
  const now = new Date()
  const diffMs = now.getTime() - past.getTime()
  if (diffMs < 0) return "just now" // Future dates treated as "just now"
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(date)
}

export function getInitials(name: string): string {
  if (!name || !name.trim()) return "?"
  return name
    .trim()
    .split(" ")
    .filter((n) => n.length > 0)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function averageRating(ratings: number[]): number {
  if (ratings.length === 0) return 0
  return ratings.reduce((a, b) => a + b, 0) / ratings.length
}
