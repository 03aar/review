"use client"

import { useState, useMemo } from "react"
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
} from "lucide-react"
import { toast } from "sonner"

interface Campaign {
  id: string
  name: string
  type: "sms" | "email" | "qr"
  status: "active" | "paused" | "completed"
  sent: number
  opened: number
  converted: number
  createdAt: string
}

const initialCampaigns: Campaign[] = [
  {
    id: "camp-1",
    name: "Weekend Follow-up Blast",
    type: "sms",
    status: "active",
    sent: 342,
    opened: 278,
    converted: 124,
    createdAt: "2026-02-10",
  },
  {
    id: "camp-2",
    name: "Post-Visit Thank You",
    type: "email",
    status: "active",
    sent: 518,
    opened: 347,
    converted: 163,
    createdAt: "2026-02-05",
  },
  {
    id: "camp-3",
    name: "Table Card QR Campaign",
    type: "qr",
    status: "paused",
    sent: 210,
    opened: 158,
    converted: 72,
    createdAt: "2026-01-22",
  },
  {
    id: "camp-4",
    name: "January Newsletter Push",
    type: "email",
    status: "completed",
    sent: 1024,
    opened: 614,
    converted: 287,
    createdAt: "2026-01-08",
  },
]

export default function CampaignsPage() {
  const { business } = useBusinessContext()
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)
  const [campaignName, setCampaignName] = useState("")
  const [selectedType, setSelectedType] = useState<"sms" | "email" | "qr" | null>(null)

  const stats = useMemo(() => {
    const activeCampaigns = campaigns.filter((c) => c.status === "active").length
    const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0)
    const totalConverted = campaigns.reduce((sum, c) => sum + c.converted, 0)
    const avgConversion = totalSent > 0 ? ((totalConverted / totalSent) * 100).toFixed(1) : "0.0"
    return { activeCampaigns, totalSent, avgConversion }
  }, [campaigns])

  function handleCreateCampaign(e: React.FormEvent) {
    e.preventDefault()

    if (!campaignName.trim()) {
      toast.error("Please enter a campaign name")
      return
    }
    if (!selectedType) {
      toast.error("Please select a campaign type")
      return
    }

    const newCampaign: Campaign = {
      id: `camp-${Date.now()}`,
      name: campaignName.trim(),
      type: selectedType,
      status: "active",
      sent: 0,
      opened: 0,
      converted: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setCampaigns((prev) => [newCampaign, ...prev])
    setCampaignName("")
    setSelectedType(null)
    toast.success(`Campaign "${newCampaign.name}" created for ${business.name}`)
  }

  function getTypeIcon(type: string) {
    switch (type) {
      case "sms":
        return <MessageSquare className="h-3.5 w-3.5" />
      case "email":
        return <Mail className="h-3.5 w-3.5" />
      case "qr":
        return <QrCode className="h-3.5 w-3.5" />
      default:
        return null
    }
  }

  function getTypeLabel(type: string) {
    switch (type) {
      case "sms":
        return "SMS"
      case "email":
        return "Email"
      case "qr":
        return "QR Code"
      default:
        return type
    }
  }

  function getStatusStyle(status: string) {
    switch (status) {
      case "active":
        return "bg-[#d4f0c0] text-[#2d6a4f] hover:bg-[#d4f0c0]"
      case "paused":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "completed":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100"
      default:
        return ""
    }
  }

  function getConversionRate(campaign: Campaign): number {
    if (campaign.sent === 0) return 0
    return Math.round((campaign.converted / campaign.sent) * 100)
  }

  const typeOptions: { value: "sms" | "email" | "qr"; label: string; icon: React.ReactNode }[] = [
    { value: "sms", label: "SMS", icon: <MessageSquare className="h-4 w-4" /> },
    { value: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
    { value: "qr", label: "QR Code", icon: <QrCode className="h-4 w-4" /> },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
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
              <label
                htmlFor="campaign-name"
                className="block text-sm font-medium mb-1.5 text-[#1a3a2a]"
              >
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
                    onClick={() =>
                      setSelectedType((prev) => (prev === option.value ? null : option.value))
                    }
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

            <Button
              type="submit"
              className="gap-2 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
            >
              <Plus className="h-4 w-4" />
              Create Campaign
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Active Campaigns List */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <BarChart3 className="h-4 w-4" />
            Active Campaigns
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
                        <h3 className="text-sm font-semibold text-[#1a3a2a]">
                          {campaign.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className="gap-1 border-[#b8dca8] text-[#5a6b5a]"
                        >
                          {getTypeIcon(campaign.type)}
                          {getTypeLabel(campaign.type)}
                        </Badge>
                        <Badge className={getStatusStyle(campaign.status)}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#5a6b5a] shrink-0">
                        <Calendar className="h-3.5 w-3.5" />
                        {campaign.createdAt}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Send className="h-3.5 w-3.5 text-[#2d6a4f]" />
                        <div>
                          <p className="text-xs text-[#5a6b5a]">Sent</p>
                          <p className="text-sm font-semibold text-[#1a3a2a]">
                            {campaign.sent.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-3.5 w-3.5 text-[#2d6a4f]" />
                        <div>
                          <p className="text-xs text-[#5a6b5a]">Opened</p>
                          <p className="text-sm font-semibold text-[#1a3a2a]">
                            {campaign.opened.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MousePointerClick className="h-3.5 w-3.5 text-[#2d6a4f]" />
                        <div>
                          <p className="text-xs text-[#5a6b5a]">Converted</p>
                          <p className="text-sm font-semibold text-[#1a3a2a]">
                            {campaign.converted.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Progress
                        value={conversionRate}
                        className="h-2 flex-1 bg-[#eef8e6]"
                      />
                      <span className="text-xs font-medium text-[#2d6a4f] shrink-0 w-10 text-right">
                        {conversionRate}%
                      </span>
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
