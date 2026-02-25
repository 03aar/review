"use client"

import { useState, useEffect } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Copy,
  Check,
  QrCode,
  Link as LinkIcon,
  Globe,
  Zap,
  ExternalLink,
  Download,
  Save,
} from "lucide-react"
import { toast } from "sonner"
import { generateSlug } from "@/lib/utils"

const SETTINGS_KEY = "reviewforge_settings"

interface AppSettings {
  autoRespond: boolean
  requireApprovalNegative: boolean
  responseTone: string
  connectedPlatforms: string[]
}

function loadSettings(): AppSettings {
  if (typeof window === "undefined") return defaultSettings()
  try {
    const stored = localStorage.getItem(SETTINGS_KEY)
    if (stored) return { ...defaultSettings(), ...JSON.parse(stored) }
  } catch { /* ignore */ }
  return defaultSettings()
}

function defaultSettings(): AppSettings {
  return {
    autoRespond: false,
    requireApprovalNegative: true,
    responseTone: "Friendly",
    connectedPlatforms: [],
  }
}

function saveSettings(s: AppSettings) {
  if (typeof window !== "undefined") {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
  }
}

export default function SettingsPage() {
  const { business, updateBusiness } = useBusinessContext()
  const [copied, setCopied] = useState(false)
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)
  const [showQR, setShowQR] = useState(false)

  // Business profile form
  const [bizName, setBizName] = useState(business.name)
  const [bizCategory, setBizCategory] = useState(business.category)
  const [profileDirty, setProfileDirty] = useState(false)

  useEffect(() => {
    setSettings(loadSettings())
  }, [])

  useEffect(() => {
    const isDirty = bizName !== business.name || bizCategory !== business.category
    setProfileDirty(isDirty)
  }, [bizName, bizCategory, business.name, business.category])

  const reviewUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/r/${business.slug}`
      : `/r/${business.slug}`

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(reviewUrl)
      setCopied(true)
      toast.success("Review link copied!")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Failed to copy link")
    }
  }

  function handleSaveProfile() {
    if (!bizName.trim()) {
      toast.error("Business name is required")
      return
    }
    const newSlug = generateSlug(bizName)
    updateBusiness({
      name: bizName.trim(),
      category: bizCategory,
      slug: newSlug,
    })
    toast.success("Business profile updated!")
    setProfileDirty(false)
  }

  function updateSettings(update: Partial<AppSettings>) {
    setSettings((prev) => {
      const next = { ...prev, ...update }
      saveSettings(next)
      return next
    })
  }

  function handleTogglePlatform(platformName: string) {
    const isConnected = settings.connectedPlatforms.includes(platformName)
    if (isConnected) {
      updateSettings({
        connectedPlatforms: settings.connectedPlatforms.filter((p) => p !== platformName),
      })
      toast.success(`${platformName} disconnected`)
    } else {
      updateSettings({
        connectedPlatforms: [...settings.connectedPlatforms, platformName],
      })
      toast.success(`${platformName} connected!`)
    }
  }

  function handleGenerateQR() {
    setShowQR(!showQR)
  }

  function handleDownloadQR() {
    // Generate a simple QR code via external API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(reviewUrl)}`
    const link = document.createElement("a")
    link.href = qrUrl
    link.download = `reviewforge-qr-${business.slug}.png`
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("QR code download started!")
  }

  const categories = [
    "restaurant", "hotel", "medical", "home_services", "auto_repair",
    "salon_spa", "dental", "legal", "ecommerce", "fitness",
    "education", "professional_services", "other",
  ]

  const platforms = [
    {
      name: "Google Business Profile",
      icon: "G",
      color: "bg-[#4285f4]",
      description: "Post reviews directly to Google Maps",
      primary: true,
    },
    {
      name: "Yelp",
      icon: "Y",
      color: "bg-red-600",
      description: "Share reviews on Yelp",
    },
    {
      name: "Facebook",
      icon: "f",
      color: "bg-[#1877f2]",
      description: "Post to your Facebook Business page",
    },
    {
      name: "TripAdvisor",
      icon: "T",
      color: "bg-green-600",
      description: "Share on TripAdvisor",
    },
  ]

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Settings</h1>
        <p className="text-[#5a6b5a]">
          Manage your business profile and integrations
        </p>
      </div>

      {/* Review Link */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <LinkIcon className="h-4 w-4" />
            Your Review Link
          </CardTitle>
          <CardDescription>
            Share this link with customers to collect reviews
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[#eef8e6] border border-[#b8dca8] rounded-lg px-4 py-2.5 font-mono text-sm text-[#1a3a2a] truncate">
              {reviewUrl}
            </div>
            <Button onClick={handleCopyLink} variant="outline" className="gap-2 shrink-0 border-[#b8dca8]">
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" size="sm" className="gap-2 border-[#b8dca8]" asChild>
              <a href={reviewUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                Preview
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-[#b8dca8]"
              onClick={handleGenerateQR}
            >
              <QrCode className="h-3.5 w-3.5" />
              {showQR ? "Hide QR Code" : "Show QR Code"}
            </Button>
          </div>

          {showQR && (
            <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg border border-[#b8dca8]">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(reviewUrl)}`}
                alt="QR Code for review link"
                width={200}
                height={200}
                className="rounded-lg"
              />
              <Button size="sm" variant="outline" className="gap-2 border-[#b8dca8]" onClick={handleDownloadQR}>
                <Download className="h-3.5 w-3.5" />
                Download QR Code
              </Button>
            </div>
          )}

          <div className="bg-[#eef8e6] border border-[#b8dca8] rounded-lg p-4">
            <h4 className="text-sm font-medium text-[#1a3a2a] mb-2">
              Tips for sharing your review link
            </h4>
            <ul className="text-sm text-[#4a7a5a] space-y-1">
              <li>- Print QR code on receipts and table cards</li>
              <li>- Text it to customers after their visit</li>
              <li>- Add it to your email signature</li>
              <li>- Include in post-purchase follow-up emails</li>
              <li>- Display it near the checkout/exit</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Business Profile */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base text-[#1a3a2a]">Business Profile</CardTitle>
          <CardDescription>
            This information is shown on your review collection page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="settings-biz-name">Business Name</Label>
              <Input
                id="settings-biz-name"
                value={bizName}
                onChange={(e) => setBizName(e.target.value)}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-biz-category">Category</Label>
              <select
                id="settings-biz-category"
                value={bizCategory}
                onChange={(e) => setBizCategory(e.target.value)}
                className="w-full px-3 py-2 border border-[#b8dca8] rounded-lg text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-white h-9"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>URL Slug</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#5a6b5a]">/r/</span>
              <Input
                value={business.slug}
                disabled
                className="flex-1 bg-[#eef8e6]"
              />
            </div>
            <p className="text-xs text-[#5a6b5a]">
              Slug is automatically generated from your business name
            </p>
          </div>
          <Button
            onClick={handleSaveProfile}
            disabled={!profileDirty}
            className="gap-2 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
          >
            <Save className="h-4 w-4" />
            {profileDirty ? "Save Changes" : "No Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Platform Integrations */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Globe className="h-4 w-4" />
            Platform Integrations
          </CardTitle>
          <CardDescription>
            Connect your review platforms to post reviews directly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {platforms.map((platform) => {
            const isConnected = settings.connectedPlatforms.includes(platform.name)
            return (
              <div
                key={platform.name}
                className="flex items-center justify-between p-3 border border-[#b8dca8] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}
                  >
                    {platform.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[#1a3a2a]">{platform.name}</p>
                      {platform.primary && (
                        <Badge variant="secondary" className="text-[10px]">
                          Primary
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-[#5a6b5a]">
                      {platform.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant={isConnected ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleTogglePlatform(platform.name)}
                  className={isConnected ? "border-[#2d6a4f] text-[#2d6a4f]" : "bg-[#1a3a2a] hover:bg-[#0f2a1c]"}
                >
                  {isConnected ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1" />
                      Connected
                    </>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* AI Settings */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Zap className="h-4 w-4" />
            AI Response Settings
          </CardTitle>
          <CardDescription>
            Configure how AI handles review responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#1a3a2a]">Auto-Respond to Reviews</p>
              <p className="text-xs text-[#5a6b5a]">
                Automatically generate and post responses to positive reviews (4-5 stars)
              </p>
            </div>
            <Switch
              checked={settings.autoRespond}
              onCheckedChange={(v) => {
                updateSettings({ autoRespond: v })
                toast.success(v ? "Auto-respond enabled" : "Auto-respond disabled")
              }}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#1a3a2a]">
                Require Approval for Negative Reviews
              </p>
              <p className="text-xs text-[#5a6b5a]">
                Always require manual approval for responses to 1-3 star reviews
              </p>
            </div>
            <Switch
              checked={settings.requireApprovalNegative}
              onCheckedChange={(v) => {
                updateSettings({ requireApprovalNegative: v })
                toast.success(v ? "Approval required for negative reviews" : "Auto-respond to all reviews")
              }}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Response Tone</Label>
            <div className="flex gap-2 flex-wrap">
              {["Professional", "Friendly", "Casual"].map((tone) => (
                <button
                  key={tone}
                  onClick={() => {
                    updateSettings({ responseTone: tone })
                    toast.success(`Response tone set to ${tone}`)
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    settings.responseTone === tone
                      ? "bg-[#d4f0c0] border-[#2d6a4f] text-[#1a3a2a]"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
