"use client"

import { useEffect, useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Send,
  Plus,
  Users,
  Mail,
  Clock,
  CheckCircle2,
  Link as LinkIcon,
  Copy,
  Loader2,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"
import { timeAgo } from "@/lib/utils"

interface ReviewRequest {
  id: string
  customerName: string | null
  customerEmail: string | null
  customerPhone: string | null
  method: string
  status: string
  sentAt: string | null
  completedAt: string | null
  createdAt: string
}

interface CustomerEntry {
  name: string
  email: string
}

export default function CampaignsPage() {
  const { business } = useBusinessContext()
  const [requests, setRequests] = useState<ReviewRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [sending, setSending] = useState(false)
  const [customers, setCustomers] = useState<CustomerEntry[]>([
    { name: "", email: "" },
  ])

  const reviewUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/r/${business.slug}`
      : `/r/${business.slug}`

  useEffect(() => {
    fetch(`/api/campaigns?businessId=${business.id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed")
        return r.json()
      })
      .then((data) => setRequests(data.data ?? []))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [business.id])

  function addCustomerRow() {
    if (customers.length >= 50) {
      toast.error("Maximum 50 customers per batch")
      return
    }
    setCustomers((prev) => [...prev, { name: "", email: "" }])
  }

  function removeCustomerRow(index: number) {
    setCustomers((prev) => prev.filter((_, i) => i !== index))
  }

  function updateCustomer(index: number, field: "name" | "email", value: string) {
    setCustomers((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    )
  }

  async function handleSendCampaign() {
    const validCustomers = customers.filter(
      (c) => c.name.trim() || c.email.trim()
    )
    if (validCustomers.length === 0) {
      toast.error("Add at least one customer")
      return
    }

    setSending(true)
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: business.id,
          customers: validCustomers.map((c) => ({
            name: c.name.trim() || null,
            email: c.email.trim() || null,
            method: "email",
          })),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error || "Failed to create campaign")
        return
      }

      const data = await res.json()
      toast.success(`${data.created} review request${data.created > 1 ? "s" : ""} created!`)

      // Refresh the list
      setShowDialog(false)
      setCustomers([{ name: "", email: "" }])
      const refreshRes = await fetch(`/api/campaigns?businessId=${business.id}`)
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json()
        setRequests(refreshData.data ?? [])
      }
    } catch {
      toast.error("Failed to create campaign")
    } finally {
      setSending(false)
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(reviewUrl)
    toast.success("Review link copied!")
  }

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    sent: requests.filter((r) => r.status === "sent").length,
    completed: requests.filter((r) => r.status === "completed").length,
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Campaigns</h1>
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-6 w-6 animate-spin text-[#2d6a4f]" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Campaigns</h1>
        <Card className="border-[#b8dca8]">
          <CardContent className="py-12 text-center">
            <p className="text-red-600 font-medium">Failed to load campaigns</p>
            <Button variant="outline" className="mt-3" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3a2a]">Campaigns</h1>
          <p className="text-[#5a6b5a]">
            Send review requests to your customers
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-[#b8dca8]"
            onClick={handleCopyLink}
          >
            <Copy className="h-3.5 w-3.5" />
            Copy Review Link
          </Button>
          <Button
            size="sm"
            className="gap-1.5 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
            onClick={() => setShowDialog(true)}
          >
            <Plus className="h-3.5 w-3.5" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-4 pb-3 text-center">
            <p className="text-2xl font-bold text-[#1a3a2a]">{stats.total}</p>
            <p className="text-xs text-[#5a6b5a]">Total Requests</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-4 pb-3 text-center">
            <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            <p className="text-xs text-[#5a6b5a]">Pending</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-4 pb-3 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.sent}</p>
            <p className="text-xs text-[#5a6b5a]">Sent</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-4 pb-3 text-center">
            <p className="text-2xl font-bold text-[#2d6a4f]">{stats.completed}</p>
            <p className="text-xs text-[#5a6b5a]">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Review Link Card */}
      <Card className="border-[#b8dca8]">
        <CardContent className="pt-5 pb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <LinkIcon className="h-4 w-4 text-[#2d6a4f]" />
            <span className="text-sm font-medium text-[#1a3a2a]">Your review link:</span>
            <code className="text-sm bg-[#eef8e6] px-3 py-1 rounded border border-[#b8dca8] font-mono text-[#1a3a2a]">
              {reviewUrl}
            </code>
            <Button variant="outline" size="sm" className="gap-1 border-[#b8dca8]" onClick={handleCopyLink}>
              <Copy className="h-3 w-3" />
              Copy
            </Button>
          </div>
          <p className="text-xs text-[#5a6b5a] mt-2">
            Share this link with customers via email, text, or QR code. They&apos;ll be guided through the review process.
          </p>
        </CardContent>
      </Card>

      {/* Requests List */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Users className="h-4 w-4" />
            Review Requests ({requests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="py-8 text-center">
              <Send className="h-10 w-10 text-[#b8dca8] mx-auto mb-3" />
              <p className="font-medium text-[#1a3a2a]">No requests yet</p>
              <p className="text-sm text-[#5a6b5a] mt-1">
                Create a campaign to start collecting reviews from your customers
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {requests.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-[#b8dca8] hover:bg-[#eef8e6]/50"
                >
                  <div className="w-8 h-8 rounded-full bg-[#eef8e6] flex items-center justify-center text-xs font-medium text-[#1a3a2a]">
                    {r.customerName ? r.customerName[0].toUpperCase() : "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1a3a2a] truncate">
                      {r.customerName || "Unknown"}
                    </p>
                    <p className="text-xs text-[#5a6b5a] truncate">
                      {r.customerEmail || r.customerPhone || "No contact info"}
                    </p>
                  </div>
                  <Badge
                    variant={r.status === "completed" ? "default" : "secondary"}
                    className={
                      r.status === "completed"
                        ? "bg-[#d4f0c0] text-[#2d6a4f]"
                        : r.status === "sent"
                          ? "bg-blue-100 text-blue-700"
                          : ""
                    }
                  >
                    {r.status}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-[#5a6b5a]">
                    <Clock className="h-3 w-3" />
                    {timeAgo(r.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Campaign Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-[#2d6a4f]" />
              New Campaign
            </DialogTitle>
            <DialogDescription>
              Add customers to send review requests. They&apos;ll receive a link to submit their review.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {customers.map((c, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:items-end">
                <div className="flex-1 space-y-1">
                  <Label className="text-xs">Name</Label>
                  <Input
                    value={c.name}
                    onChange={(e) => updateCustomer(i, "name", e.target.value)}
                    placeholder="Customer name"
                    maxLength={100}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs">Email</Label>
                  <Input
                    type="email"
                    value={c.email}
                    onChange={(e) => updateCustomer(i, "email", e.target.value)}
                    placeholder="customer@email.com"
                    maxLength={255}
                  />
                </div>
                {customers.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomerRow(i)}
                    className="shrink-0 mb-0.5"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-red-400" />
                  </Button>
                )}
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-[#b8dca8]"
              onClick={addCustomerRow}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Customer
            </Button>

            <div className="bg-[#eef8e6] rounded-lg p-3 border border-[#b8dca8]">
              <div className="flex items-center gap-2 mb-1">
                <Mail className="h-3.5 w-3.5 text-[#2d6a4f]" />
                <span className="text-xs font-medium text-[#1a3a2a]">Note</span>
              </div>
              <p className="text-xs text-[#5a6b5a]">
                Review requests are recorded for tracking. Email delivery requires email integration (coming in a future update).
                For now, share your review link directly: <code className="bg-white px-1 rounded">/r/{business.slug}</code>
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSendCampaign}
              disabled={sending}
              className="gap-1.5 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
            >
              {sending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Create Requests
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
