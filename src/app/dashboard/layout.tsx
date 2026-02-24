"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Loader2 } from "lucide-react"

interface Business {
  id: string
  name: string
  slug: string
  category: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [business, setBusiness] = useState<Business | null>(null)
  const [loadingBusiness, setLoadingBusiness] = useState(true)

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login")
    }
  }, [session, isPending, router])

  useEffect(() => {
    if (session) {
      fetch("/api/businesses")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setBusiness(data[0])
          }
          setLoadingBusiness(false)
        })
        .catch(() => setLoadingBusiness(false))
    }
  }, [session])

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 shrink-0 hidden md:block">
        <Sidebar businessSlug={business?.slug} />
      </div>
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {loadingBusiness ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : !business ? (
            <SetupBusiness
              onCreated={(b) => setBusiness(b)}
            />
          ) : (
            <BusinessContext.Provider value={business}>
              {children}
            </BusinessContext.Provider>
          )}
        </div>
      </main>
    </div>
  )
}

// Business context
import { createContext, useContext } from "react"

export const BusinessContext = createContext<Business | null>(null)
export function useBusinessContext() {
  const ctx = useContext(BusinessContext)
  if (!ctx) throw new Error("No business context")
  return ctx
}

// Setup component for first-time users
function SetupBusiness({ onCreated }: { onCreated: (b: Business) => void }) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("restaurant")
  const [loading, setLoading] = useState(false)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category }),
      })
      if (res.ok) {
        const data = await res.json()
        onCreated(data)
      }
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
    <div className="max-w-lg mx-auto mt-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Set up your business</h1>
        <p className="text-muted-foreground">
          Let&apos;s get your review collection link ready in under a minute.
        </p>
      </div>
      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Business Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Luigi's Pizzeria"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
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
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Creating..." : "Create & Get My Review Link"}
        </button>
      </form>
    </div>
  )
}
