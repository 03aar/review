"use client"

import { useState, useMemo, useEffect } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Megaphone,
  Send,
  TrendingUp,
  MessageSquare,
  Mail,
  QrCode,
  Plus,
  Calendar,
  Eye,
  MousePointerClick,
  BarChart3,
  Pause,
  Play,
  Trash2,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"

interface Campaign {
  id: string
  name: string
  type: string
  status: string
  sentCount: number
  openedCount: number
  clickedCount: number
  convertedCount: number
  targetCount: number
  messageTemplate: string | null
  subject: string | null
  createdAt: string
}

export default function CampaignsPage() {
  const { business } = useBusinessContext()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [campaignName, setCampaignName] = useState("")
  const [messageTemplate, setMessageTemplate] = useState("")
  const [selectedType, setSelectedType] = useState<"sms" | "email" | "qr" | null>(null)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchCampaigns()
  }, [business.id])

  async function fetchCampaigns() {
    try {
      const res = await fetch(`/api/campaigns?businessId=${business.id}`)
      if (res.ok) {
        const data = await res.json()
        setCampaigns(data)
      }
    } catch {
      toast.error("Failed to load campaigns")
    } finally {
      setLoading(false)
    }
  }

  const stats = useMemo(() => {
    const activeCampaigns = campaigns.filter((c) => c.status === "active").length
    const totalSent = campaigns.reduce((sum, c) => sum + c.sentCount, 0)
    const totalConverted = campaigns.reduce((sum, c) => sum + c.convertedCount, 0)
    const avgConversion = totalSent > 0 ? ((totalConverted / totalSent) * 100).toFixed(1) : "0.0"
    return { activeCampaigns, totalSent, avgConversion }
  }, [campaigns])

  async function handleCreateCampaign(e: React.FormEvent) {
    e.preventDefault()
    if (!campaignName.trim()) {
      toast.error("Please enter a campaign name")
      return
    }
    if (!selectedType) {
      toast.error("Please select a campaign type")
      return
    }

    setCreating(true)
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: business.id,
          name: campaignName.trim(),
          type: selectedType,
          messageTemplate: messageTemplate.trim() || null,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        toast.error(err.error || "Failed to create campaign")
        return
      }

      const newCampaign = await res.json()
      setCampaigns((prev) => [newCampaign, ...prev])
      setCampaignName("")
      setMessageTemplate("")
      setSelectedType(null)
      toast.success(`Campaign "${newCampaign.name}" created!`)
    } catch {
      toast.error("Something went wrong")
    } finally {
      setCreating(false)
    }
  }

  async function toggleCampaignStatus(campaign: Campaign) {
    const newStatus = campaign.status === "active" ? "paused" : "active"
    try {
      const res = await fetch(`/api/campaigns/${campaign.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setCampaigns((prev) =>
          prev.map((c) => (c.id === campaign.id ? { ...c, status: newStatus } : c))
        )
        toast.success(`Campaign ${newStatus === "active" ? "resumed" : "paused"}`)
      }
    } catch {
      toast.error("Failed to update campaign")
    }
  }

  async function deleteCampaign(id: string) {
    try {
      const res = await fetch(`/api/campaigns/${id}`, { method: "DELETE" })
      if (res.ok) {
        setCampaigns((prev) => prev.filter((c) => c.id !== id))
        toast.success("Campaign deleted")
      }
    } catch {
      toast.error("Failed to delete campaign")
    }
  }

  function getTypeIcon(type: string) {
    switch (type) {
      case "sms": return <MessageSquare className="h-3.5 w-3.5" />
      case "email": return <Mail className="h-3.5 w-3.5" />
      case "qr": return <QrCode className="h-3.5 w-3.5" />
      default: return null
    }
  }

  function getTypeLabel(type: string) {
    switch (type) {
      case "sms": return "SMS"
      case "email": return "Email"
      case "qr": return "QR Code"
      default: return type
    }
  }

  function getStatusStyle(status: string) {
    switch (status) {
      case "active": return "bg-[#d4f0c0] text-[#2d6a4f] hover:bg-[#d4f0c0]"
      case "paused": return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "completed": return "bg-blue-100 text-blue-700 hover:bg-blue-100"
      case "draft": return "bg-gray-100 text-gray-600 hover:bg-gray-100"
      default: return ""
    }
  }

  function getConversionRate(campaign: Campaign): number {
    if (campaign.sentCount === 0) return 0
    return Math.round((campaign.convertedCount / campaign.sentCount) * 100)
  }

  const typeOptions: { value: "sms" | "email" | "qr"; label: string; icon: React.ReactNode }[] = [
    { value: "sms", label: "SMS", icon: <MessageSquare className="h-4 w-4" /> },
    { value: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
    { value: "qr", label: "QR Code", icon: <QrCode className="h-4 w-4" /> },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#2d6a4f]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Campaigns</h1>
        <p className="text-[#5a6b5a]">
          Create and manage review request campaigns for {business.name}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#5a6b5a]">Active Campaigns</span>
              <Megaphone className="h-5 w-5 text-[#2d6a4f]" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">{stats.activeCampaigns}</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#5a6b5a]">Total Sent</span>
              <Send className="h-5 w-5 text-[#2d6a4f]" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">{stats.totalSent.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#5a6b5a]">Avg Conversion Rate</span>
              <TrendingUp className="h-5 w-5 text-[#2d6a4f]" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">{stats.avgConversion}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Campaign */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Plus className="h-4 w-4" />
            Create Campaign
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateCampaign} className="space-y-4">
            <div>
              <label htmlFor="campaign-name" className="block text-sm font-medium mb-1.5 text-[#1a3a2a]">
                Campaign Name
              </label>
              <Input
                id="campaign-name"
                type="text"
                placeholder="e.g. Spring Review Drive"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="border-[#b8dca8]"
                maxLength={100}
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-2 text-[#1a3a2a]">Campaign Type</p>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedType((prev) => (prev === option.value ? null : option.value))}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                      selectedType === option.value
                        ? "bg-[#1a3a2a] text-[#e4f5d6] border-[#1a3a2a]"
                        : "bg-white text-[#5a6b5a] border-[#b8dca8] hover:bg-[#eef8e6] hover:text-[#1a3a2a]"
                    }`}
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {selectedType && selectedType !== "qr" && (
              <div>
                <label htmlFor="msg-template" className="block text-sm font-medium mb-1.5 text-[#1a3a2a]">
                  Message Template <span className="text-[#5a6b5a] font-normal">(optional)</span>
                </label>
                <textarea
                  id="msg-template"
                  placeholder={selectedType === "sms"
                    ? "Hi {name}! Thanks for visiting {business}. We'd love your feedback: {link}"
                    : "Dear {name}, thank you for choosing {business}. Your review means the world to us..."}
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#b8dca8] rounded-lg text-sm min-h-[80px] resize-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none"
                  maxLength={500}
                />
                <p className="text-xs text-[#5a6b5a] mt-1">
                  Use {"{name}"}, {"{business}"}, {"{link}"} as placeholders
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={creating}
              className="gap-2 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
            >
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {creating ? "Creating..." : "Create Campaign"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Campaigns List */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <BarChart3 className="h-4 w-4" />
            All Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          {campaigns.length === 0 ? (
            <div className="text-center py-10">
              <Megaphone className="h-10 w-10 mx-auto mb-3 text-[#b8dca8]" />
              <p className="font-medium text-[#1a3a2a]">No campaigns yet</p>
              <p className="text-sm text-[#5a6b5a] mt-1">
                Create your first campaign above to start collecting reviews
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {campaigns.map((campaign) => {
                const conversionRate = getConversionRate(campaign)
                return (
                  <div
                    key={campaign.id}
                    className="border border-[#b8dca8] rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-[#1a3a2a]">{campaign.name}</h3>
                        <Badge variant="outline" className="gap-1 border-[#b8dca8] text-[#5a6b5a]">
                          {getTypeIcon(campaign.type)}
                          {getTypeLabel(campaign.type)}
                        </Badge>
                        <Badge className={getStatusStyle(campaign.status)}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {campaign.status !== "completed" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleCampaignStatus(campaign)}
                            className="h-8 w-8 p-0 text-[#5a6b5a] hover:text-[#1a3a2a]"
                            title={campaign.status === "active" ? "Pause" : "Resume"}
                          >
                            {campaign.status === "active" ? (
                              <Pause className="h-3.5 w-3.5" />
                            ) : (
                              <Play className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteCampaign(campaign.id)}
                          className="h-8 w-8 p-0 text-[#5a6b5a] hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                        <span className="flex items-center gap-1.5 text-xs text-[#5a6b5a]">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(campaign.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Send className="h-3.5 w-3.5 text-[#2d6a4f]" />
                        <div>
                          <p className="text-xs text-[#5a6b5a]">Sent</p>
                          <p className="text-sm font-semibold text-[#1a3a2a]">{campaign.sentCount.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-3.5 w-3.5 text-[#2d6a4f]" />
                        <div>
                          <p className="text-xs text-[#5a6b5a]">Opened</p>
                          <p className="text-sm font-semibold text-[#1a3a2a]">{campaign.openedCount.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MousePointerClick className="h-3.5 w-3.5 text-[#2d6a4f]" />
                        <div>
                          <p className="text-xs text-[#5a6b5a]">Clicked</p>
                          <p className="text-sm font-semibold text-[#1a3a2a]">{campaign.clickedCount.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-3.5 w-3.5 text-[#2d6a4f]" />
                        <div>
                          <p className="text-xs text-[#5a6b5a]">Converted</p>
                          <p className="text-sm font-semibold text-[#1a3a2a]">{campaign.convertedCount.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Progress value={conversionRate} className="h-2 flex-1 bg-[#eef8e6]" />
                      <span className="text-xs font-medium text-[#2d6a4f] shrink-0 w-10 text-right">{conversionRate}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
