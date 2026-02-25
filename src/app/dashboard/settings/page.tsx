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
  User,
  Building2,
  Bell,
  CreditCard,
  Shield,
  Database,
  Camera,
  MapPin,
  Clock,
  Languages,
  Phone,
  Mail,
  Palette,
  Slack,
  Smartphone,
  Monitor,
  Lock,
  Key,
  Fingerprint,
  LogOut,
  Trash2,
  FileDown,
  AlertTriangle,
  ChevronRight,
  Eye,
  EyeOff,
  Star,
  MessageSquare,
  TrendingUp,
  Users,
  Receipt,
  CircleDollarSign,
  ArrowUpRight,
} from "lucide-react"
import { toast } from "sonner"
import { generateSlug } from "@/lib/utils"

const SETTINGS_KEY = "reviewforge_settings"

interface AppSettings {
  autoRespond: boolean
  requireApprovalNegative: boolean
  responseTone: string
  responseLength: string
  connectedPlatforms: string[]
  notifications: {
    newReview: { email: boolean; push: boolean; sms: boolean }
    negativeReview: { email: boolean; push: boolean; sms: boolean }
    responseReminder: { email: boolean; push: boolean; sms: boolean }
    weeklyDigest: { email: boolean; push: boolean; sms: boolean }
    milestone: { email: boolean; push: boolean; sms: boolean }
    teamActivity: { email: boolean; push: boolean; sms: boolean }
    billing: { email: boolean; push: boolean; sms: boolean }
    campaignUpdate: { email: boolean; push: boolean; sms: boolean }
  }
  twoFactorEnabled: boolean
  dataRetentionMonths: number
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
    responseLength: "Medium",
    connectedPlatforms: [],
    notifications: {
      newReview: { email: true, push: true, sms: false },
      negativeReview: { email: true, push: true, sms: true },
      responseReminder: { email: true, push: false, sms: false },
      weeklyDigest: { email: true, push: false, sms: false },
      milestone: { email: true, push: true, sms: false },
      teamActivity: { email: false, push: true, sms: false },
      billing: { email: true, push: false, sms: false },
      campaignUpdate: { email: true, push: true, sms: false },
    },
    twoFactorEnabled: false,
    dataRetentionMonths: 36,
  }
}

function saveSettings(s: AppSettings) {
  if (typeof window !== "undefined") {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
  }
}

type SettingsTab =
  | "profile"
  | "business"
  | "review-link"
  | "integrations"
  | "ai"
  | "notifications"
  | "billing"
  | "security"
  | "data"

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "business", label: "Business", icon: Building2 },
  { id: "review-link", label: "Review Link & QR", icon: LinkIcon },
  { id: "integrations", label: "Integrations", icon: Globe },
  { id: "ai", label: "AI Settings", icon: Zap },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
  { id: "data", label: "Data & Privacy", icon: Database },
]

export default function SettingsPage() {
  const { business, updateBusiness } = useBusinessContext()
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)

  useEffect(() => {
    setSettings(loadSettings())
  }, [])

  function updateSettings(update: Partial<AppSettings>) {
    setSettings((prev) => {
      const next = { ...prev, ...update }
      saveSettings(next)
      return next
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Settings</h1>
        <p className="text-[#5a6b5a]">
          Manage your account, business, and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab Navigation */}
        <nav className="lg:w-56 shrink-0">
          <div className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#d4f0c0] text-[#1a3a2a]"
                    : "text-[#5a6b5a] hover:bg-[#eef8e6] hover:text-[#1a3a2a]"
                }`}
              >
                <tab.icon className="h-4 w-4 shrink-0" />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Tab Content */}
        <div className="flex-1 min-w-0 max-w-3xl">
          {activeTab === "profile" && (
            <ProfileTab />
          )}
          {activeTab === "business" && (
            <BusinessTab business={business} updateBusiness={updateBusiness} />
          )}
          {activeTab === "review-link" && (
            <ReviewLinkTab business={business} />
          )}
          {activeTab === "integrations" && (
            <IntegrationsTab settings={settings} updateSettings={updateSettings} />
          )}
          {activeTab === "ai" && (
            <AISettingsTab settings={settings} updateSettings={updateSettings} />
          )}
          {activeTab === "notifications" && (
            <NotificationsTab settings={settings} updateSettings={updateSettings} />
          )}
          {activeTab === "billing" && (
            <BillingTab />
          )}
          {activeTab === "security" && (
            <SecurityTab settings={settings} updateSettings={updateSettings} />
          )}
          {activeTab === "data" && (
            <DataPrivacyTab settings={settings} updateSettings={updateSettings} />
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Profile Tab ──────────────────────────────────────────────────────── */

function ProfileTab() {
  const [firstName, setFirstName] = useState("Alex")
  const [lastName, setLastName] = useState("Schroeder")
  const [email, setEmail] = useState("alex@schroeder.tech")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [timezone, setTimezone] = useState("America/New_York")
  const [language, setLanguage] = useState("en")
  const [dirty, setDirty] = useState(false)

  function handleSave() {
    toast.success("Profile updated successfully")
    setDirty(false)
  }

  return (
    <div className="space-y-6">
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base text-[#1a3a2a]">Personal Information</CardTitle>
          <CardDescription>Update your personal details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#d4f0c0] flex items-center justify-center text-xl font-bold text-[#1a3a2a]">
              AS
            </div>
            <div>
              <Button variant="outline" size="sm" className="gap-2 border-[#b8dca8]">
                <Camera className="h-3.5 w-3.5" />
                Change Photo
              </Button>
              <p className="text-xs text-[#5a6b5a] mt-1">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>

          <Separator />

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); setDirty(true) }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); setDirty(true) }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a6b5a]" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setDirty(true) }}
                  className="pl-9"
                />
              </div>
              <Badge variant="outline" className="border-[#2d6a4f] text-[#2d6a4f] shrink-0 h-9 px-3">
                Verified
              </Badge>
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a6b5a]" />
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setDirty(true) }}
                className="pl-9"
              />
            </div>
            <p className="text-xs text-[#5a6b5a]">Used for SMS notifications and 2FA</p>
          </div>

          <Separator />

          {/* Timezone & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone" className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> Timezone
              </Label>
              <select
                id="timezone"
                value={timezone}
                onChange={(e) => { setTimezone(e.target.value); setDirty(true) }}
                className="w-full px-3 py-2 border border-[#b8dca8] rounded-lg text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-white h-9"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="America/Anchorage">Alaska Time (AKT)</option>
                <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
                <option value="Europe/London">GMT (London)</option>
                <option value="Europe/Paris">CET (Paris)</option>
                <option value="Asia/Tokyo">JST (Tokyo)</option>
                <option value="Australia/Sydney">AEST (Sydney)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language" className="flex items-center gap-1.5">
                <Languages className="h-3.5 w-3.5" /> Language
              </Label>
              <select
                id="language"
                value={language}
                onChange={(e) => { setLanguage(e.target.value); setDirty(true) }}
                className="w-full px-3 py-2 border border-[#b8dca8] rounded-lg text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-white h-9"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="pt">Português</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={!dirty}
            className="gap-2 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
          >
            <Save className="h-4 w-4" />
            {dirty ? "Save Changes" : "No Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── Business Tab ─────────────────────────────────────────────────────── */

function BusinessTab({
  business,
  updateBusiness,
}: {
  business: { id: string; name: string; slug: string; category: string }
  updateBusiness: (b: Partial<{ name: string; slug: string; category: string }>) => void
}) {
  const [bizName, setBizName] = useState(business.name)
  const [bizCategory, setBizCategory] = useState(business.category)
  const [address, setAddress] = useState("123 Main Street, Suite 100")
  const [city, setCity] = useState("San Francisco")
  const [state, setState] = useState("CA")
  const [zip, setZip] = useState("94102")
  const [businessPhone, setBusinessPhone] = useState("+1 (555) 987-6543")
  const [website, setWebsite] = useState("https://example.com")
  const [profileDirty, setProfileDirty] = useState(false)

  useEffect(() => {
    setProfileDirty(bizName !== business.name || bizCategory !== business.category)
  }, [bizName, bizCategory, business.name, business.category])

  function handleSaveProfile() {
    if (!bizName.trim()) {
      toast.error("Business name is required")
      return
    }
    const newSlug = generateSlug(bizName)
    updateBusiness({ name: bizName.trim(), category: bizCategory, slug: newSlug })
    toast.success("Business profile updated!")
    setProfileDirty(false)
  }

  const categories = [
    "restaurant", "hotel", "medical", "home_services", "auto_repair",
    "salon_spa", "dental", "legal", "ecommerce", "fitness",
    "education", "professional_services", "other",
  ]

  return (
    <div className="space-y-6">
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base text-[#1a3a2a]">Business Details</CardTitle>
          <CardDescription>Shown on your review collection page and public profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[#1a3a2a] flex items-center justify-center text-xl font-bold text-white">
              {bizName?.[0]?.toUpperCase() || "B"}
            </div>
            <div>
              <Button variant="outline" size="sm" className="gap-2 border-[#b8dca8]">
                <Camera className="h-3.5 w-3.5" />
                Upload Logo
              </Button>
              <p className="text-xs text-[#5a6b5a] mt-1">Square image, at least 256x256px</p>
            </div>
          </div>

          <Separator />

          {/* Name & Category */}
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

          {/* Slug */}
          <div className="space-y-2">
            <Label>URL Slug</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#5a6b5a]">/r/</span>
              <Input value={business.slug} disabled className="flex-1 bg-[#eef8e6]" />
            </div>
            <p className="text-xs text-[#5a6b5a]">Auto-generated from your business name</p>
          </div>

          <Separator />

          {/* Address */}
          <div>
            <Label className="flex items-center gap-1.5 mb-3">
              <MapPin className="h-3.5 w-3.5" /> Business Address
            </Label>
            <div className="space-y-3">
              <Input
                placeholder="Street address"
                value={address}
                onChange={(e) => { setAddress(e.target.value); setProfileDirty(true) }}
              />
              <div className="grid grid-cols-3 gap-3">
                <Input
                  placeholder="City"
                  value={city}
                  onChange={(e) => { setCity(e.target.value); setProfileDirty(true) }}
                />
                <Input
                  placeholder="State"
                  value={state}
                  onChange={(e) => { setState(e.target.value); setProfileDirty(true) }}
                />
                <Input
                  placeholder="ZIP"
                  value={zip}
                  onChange={(e) => { setZip(e.target.value); setProfileDirty(true) }}
                />
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="biz-phone">Business Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a6b5a]" />
                <Input
                  id="biz-phone"
                  value={businessPhone}
                  onChange={(e) => { setBusinessPhone(e.target.value); setProfileDirty(true) }}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="biz-website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a6b5a]" />
                <Input
                  id="biz-website"
                  value={website}
                  onChange={(e) => { setWebsite(e.target.value); setProfileDirty(true) }}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Brand Colors */}
          <div>
            <Label className="flex items-center gap-1.5 mb-3">
              <Palette className="h-3.5 w-3.5" /> Brand Colors
            </Label>
            <div className="flex gap-3">
              {[
                { label: "Primary", color: "#1a3a2a" },
                { label: "Secondary", color: "#2d6a4f" },
                { label: "Accent", color: "#d4f0c0" },
              ].map((c) => (
                <div key={c.label} className="space-y-1.5">
                  <div
                    className="w-10 h-10 rounded-lg border-2 border-[#b8dca8] cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: c.color }}
                  />
                  <p className="text-[10px] text-[#5a6b5a] text-center">{c.label}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#5a6b5a] mt-2">Customize colors on your review page</p>
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
    </div>
  )
}

/* ─── Review Link & QR Tab ─────────────────────────────────────────────── */

function ReviewLinkTab({ business }: { business: { slug: string } }) {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

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

  function handleDownloadQR() {
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

  return (
    <div className="space-y-6">
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <LinkIcon className="h-4 w-4" />
            Your Review Link
          </CardTitle>
          <CardDescription>Share this link with customers to collect reviews</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[#eef8e6] border border-[#b8dca8] rounded-lg px-4 py-2.5 font-mono text-sm text-[#1a3a2a] truncate">
              {reviewUrl}
            </div>
            <Button onClick={handleCopyLink} variant="outline" className="gap-2 shrink-0 border-[#b8dca8]">
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
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
              onClick={() => setShowQR(!showQR)}
            >
              <QrCode className="h-3.5 w-3.5" />
              {showQR ? "Hide QR Code" : "Show QR Code"}
            </Button>
          </div>

          {showQR && (
            <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-lg border border-[#b8dca8]">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(reviewUrl)}`}
                alt="QR Code for review link"
                width={200}
                height={200}
                className="rounded-lg"
              />
              <p className="text-xs text-[#5a6b5a]">Scan to leave a review</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2 border-[#b8dca8]" onClick={handleDownloadQR}>
                  <Download className="h-3.5 w-3.5" />
                  Download PNG
                </Button>
                <Button size="sm" variant="outline" className="gap-2 border-[#b8dca8]" onClick={handleDownloadQR}>
                  <Download className="h-3.5 w-3.5" />
                  Download SVG
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base text-[#1a3a2a]">Sharing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: "🧾", title: "Receipts", desc: "Print QR code on receipts and invoices" },
              { icon: "📱", title: "Text Message", desc: "Send link via SMS after each visit" },
              { icon: "✉️", title: "Email", desc: "Add to email signatures and follow-ups" },
              { icon: "🏪", title: "In-Store", desc: "Display near checkout or exit" },
              { icon: "📲", title: "Social Media", desc: "Pin in your bio or stories" },
              { icon: "💻", title: "Website", desc: "Embed a review button on your site" },
            ].map((tip) => (
              <div key={tip.title} className="flex items-start gap-3 p-3 rounded-lg border border-[#b8dca8] hover:bg-[#eef8e6]/50 transition-colors">
                <span className="text-lg">{tip.icon}</span>
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">{tip.title}</p>
                  <p className="text-xs text-[#5a6b5a]">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── Integrations Tab ─────────────────────────────────────────────────── */

function IntegrationsTab({
  settings,
  updateSettings,
}: {
  settings: AppSettings
  updateSettings: (u: Partial<AppSettings>) => void
}) {
  function handleTogglePlatform(name: string) {
    const isConnected = settings.connectedPlatforms.includes(name)
    if (isConnected) {
      updateSettings({
        connectedPlatforms: settings.connectedPlatforms.filter((p) => p !== name),
      })
      toast.success(`${name} disconnected`)
    } else {
      updateSettings({
        connectedPlatforms: [...settings.connectedPlatforms, name],
      })
      toast.success(`${name} connected!`)
    }
  }

  const platforms = [
    { name: "Google Business Profile", icon: "G", color: "bg-[#4285f4]", description: "Post reviews directly to Google Maps", primary: true },
    { name: "Yelp", icon: "Y", color: "bg-red-600", description: "Share reviews on Yelp" },
    { name: "Facebook", icon: "f", color: "bg-[#1877f2]", description: "Post to your Facebook Business page" },
    { name: "TripAdvisor", icon: "T", color: "bg-green-600", description: "Share on TripAdvisor" },
    { name: "Trustpilot", icon: "★", color: "bg-[#00b67a]", description: "Sync reviews with Trustpilot" },
  ]

  const tools = [
    { name: "Slack", icon: Slack, description: "Get review notifications in Slack channels", connected: false },
    { name: "Square POS", icon: Monitor, description: "Auto-send review requests after transactions", connected: false },
    { name: "Zapier", icon: Zap, description: "Connect to 5,000+ apps via Zapier", connected: false },
  ]

  return (
    <div className="space-y-6">
      {/* Review Platforms */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Globe className="h-4 w-4" />
            Review Platforms
          </CardTitle>
          <CardDescription>Connect your review platforms to sync and post reviews</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {platforms.map((platform) => {
            const isConnected = settings.connectedPlatforms.includes(platform.name)
            return (
              <div
                key={platform.name}
                className="flex items-center justify-between p-3 border border-[#b8dca8] rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                    {platform.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[#1a3a2a]">{platform.name}</p>
                      {platform.primary && <Badge variant="secondary" className="text-[10px]">Primary</Badge>}
                    </div>
                    <p className="text-xs text-[#5a6b5a]">{platform.description}</p>
                  </div>
                </div>
                <Button
                  variant={isConnected ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleTogglePlatform(platform.name)}
                  className={isConnected ? "border-[#2d6a4f] text-[#2d6a4f]" : "bg-[#1a3a2a] hover:bg-[#0f2a1c]"}
                >
                  {isConnected ? (
                    <><Check className="h-3.5 w-3.5 mr-1" /> Connected</>
                  ) : "Connect"}
                </Button>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Tools & Automation */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base text-[#1a3a2a]">Tools & Automation</CardTitle>
          <CardDescription>Connect with your favorite tools for automated workflows</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {tools.map((tool) => (
            <div key={tool.name} className="flex items-center justify-between p-3 border border-[#b8dca8] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#eef8e6] rounded-lg flex items-center justify-center">
                  <tool.icon className="h-4 w-4 text-[#2d6a4f]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">{tool.name}</p>
                  <p className="text-xs text-[#5a6b5a]">{tool.description}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-[#b8dca8]">
                Connect
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── AI Settings Tab ──────────────────────────────────────────────────── */

function AISettingsTab({
  settings,
  updateSettings,
}: {
  settings: AppSettings
  updateSettings: (u: Partial<AppSettings>) => void
}) {
  return (
    <div className="space-y-6">
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Zap className="h-4 w-4" />
            AI Response Settings
          </CardTitle>
          <CardDescription>Configure how AI handles review responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#1a3a2a]">Auto-Respond to Reviews</p>
              <p className="text-xs text-[#5a6b5a]">Automatically generate and post responses to positive reviews (4-5 stars)</p>
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
              <p className="text-sm font-medium text-[#1a3a2a]">Require Approval for Negative Reviews</p>
              <p className="text-xs text-[#5a6b5a]">Always require manual approval for responses to 1-3 star reviews</p>
            </div>
            <Switch
              checked={settings.requireApprovalNegative}
              onCheckedChange={(v) => {
                updateSettings({ requireApprovalNegative: v })
                toast.success(v ? "Approval required" : "Auto-respond to all")
              }}
            />
          </div>

          <Separator />

          {/* Response Tone */}
          <div className="space-y-2">
            <Label>Response Tone</Label>
            <p className="text-xs text-[#5a6b5a]">Choose the voice for AI-generated responses</p>
            <div className="flex gap-2 flex-wrap">
              {["Professional", "Friendly", "Casual", "Empathetic"].map((tone) => (
                <button
                  key={tone}
                  onClick={() => {
                    updateSettings({ responseTone: tone })
                    toast.success(`Response tone set to ${tone}`)
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    settings.responseTone === tone
                      ? "bg-[#d4f0c0] border-[#2d6a4f] text-[#1a3a2a] font-medium"
                      : "border-[#b8dca8] text-[#5a6b5a] hover:border-[#2d6a4f]"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Response Length */}
          <div className="space-y-2">
            <Label>Response Length</Label>
            <p className="text-xs text-[#5a6b5a]">How long AI responses should be</p>
            <div className="flex gap-2 flex-wrap">
              {["Short", "Medium", "Detailed"].map((len) => (
                <button
                  key={len}
                  onClick={() => {
                    updateSettings({ responseLength: len })
                    toast.success(`Response length set to ${len}`)
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    settings.responseLength === len
                      ? "bg-[#d4f0c0] border-[#2d6a4f] text-[#1a3a2a] font-medium"
                      : "border-[#b8dca8] text-[#5a6b5a] hover:border-[#2d6a4f]"
                  }`}
                >
                  {len}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Preview */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base text-[#1a3a2a]">Response Templates</CardTitle>
          <CardDescription>Customize templates for different review types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "5-Star Response", desc: "Thank customers for excellent reviews", stars: 5 },
            { label: "4-Star Response", desc: "Appreciate good feedback with encouragement", stars: 4 },
            { label: "3-Star Response", desc: "Acknowledge and address improvement areas", stars: 3 },
            { label: "Negative Response", desc: "Handle critical reviews with empathy", stars: 1 },
          ].map((tmpl) => (
            <div key={tmpl.label} className="flex items-center justify-between p-3 border border-[#b8dca8] rounded-lg hover:bg-[#eef8e6]/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < tmpl.stars ? "text-yellow-500 fill-yellow-500" : "text-gray-200"}`}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">{tmpl.label}</p>
                  <p className="text-xs text-[#5a6b5a]">{tmpl.desc}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-[#b8dca8]" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── Notifications Tab ────────────────────────────────────────────────── */

function NotificationsTab({
  settings,
  updateSettings,
}: {
  settings: AppSettings
  updateSettings: (u: Partial<AppSettings>) => void
}) {
  type NotifKey = keyof AppSettings["notifications"]

  function toggleChannel(key: NotifKey, channel: "email" | "push" | "sms") {
    const current = settings.notifications[key][channel]
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: { ...settings.notifications[key], [channel]: !current },
      },
    })
  }

  const notifTypes: { key: NotifKey; label: string; desc: string; icon: React.ElementType }[] = [
    { key: "newReview", label: "New Review", desc: "When a new review is posted", icon: Star },
    { key: "negativeReview", label: "Negative Review Alert", desc: "Immediate alert for 1-3 star reviews", icon: AlertTriangle },
    { key: "responseReminder", label: "Response Reminder", desc: "Remind to respond to pending reviews", icon: MessageSquare },
    { key: "weeklyDigest", label: "Weekly Digest", desc: "Summary of your weekly review activity", icon: TrendingUp },
    { key: "milestone", label: "Milestones", desc: "When you hit review count milestones", icon: Star },
    { key: "teamActivity", label: "Team Activity", desc: "When team members take actions", icon: Users },
    { key: "billing", label: "Billing", desc: "Payment confirmations and plan updates", icon: CreditCard },
    { key: "campaignUpdate", label: "Campaign Updates", desc: "When campaigns complete or need attention", icon: TrendingUp },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Bell className="h-4 w-4" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose how and when you want to be notified</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Channel headers */}
          <div className="flex items-center gap-3 mb-4 pl-4">
            <div className="flex-1" />
            <div className="flex gap-6">
              <div className="w-14 text-center">
                <Mail className="h-4 w-4 mx-auto mb-1 text-[#5a6b5a]" />
                <p className="text-[10px] text-[#5a6b5a] font-medium">Email</p>
              </div>
              <div className="w-14 text-center">
                <Smartphone className="h-4 w-4 mx-auto mb-1 text-[#5a6b5a]" />
                <p className="text-[10px] text-[#5a6b5a] font-medium">Push</p>
              </div>
              <div className="w-14 text-center">
                <MessageSquare className="h-4 w-4 mx-auto mb-1 text-[#5a6b5a]" />
                <p className="text-[10px] text-[#5a6b5a] font-medium">SMS</p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {notifTypes.map((notif) => (
              <div
                key={notif.key}
                className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-[#eef8e6]/50 transition-colors"
              >
                <notif.icon className="h-4 w-4 text-[#2d6a4f] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1a3a2a]">{notif.label}</p>
                  <p className="text-xs text-[#5a6b5a]">{notif.desc}</p>
                </div>
                <div className="flex gap-6">
                  {(["email", "push", "sms"] as const).map((channel) => (
                    <div key={channel} className="w-14 flex justify-center">
                      <Switch
                        checked={settings.notifications[notif.key][channel]}
                        onCheckedChange={() => toggleChannel(notif.key, channel)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base text-[#1a3a2a]">Quiet Hours</CardTitle>
          <CardDescription>Pause non-critical notifications during specific times</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 border border-[#b8dca8] rounded-lg">
            <div>
              <p className="text-sm font-medium text-[#1a3a2a]">Enable Quiet Hours</p>
              <p className="text-xs text-[#5a6b5a]">10:00 PM - 8:00 AM (your timezone)</p>
            </div>
            <Switch />
          </div>
          <p className="text-xs text-[#5a6b5a] mt-2">
            Critical alerts (negative reviews) will still come through during quiet hours.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── Billing Tab ──────────────────────────────────────────────────────── */

function BillingTab() {
  const invoices = [
    { id: "INV-2026-002", date: "Feb 1, 2026", amount: "$79.00", status: "Paid" },
    { id: "INV-2026-001", date: "Jan 1, 2026", amount: "$79.00", status: "Paid" },
    { id: "INV-2025-012", date: "Dec 1, 2025", amount: "$79.00", status: "Paid" },
    { id: "INV-2025-011", date: "Nov 1, 2025", amount: "$49.00", status: "Paid" },
  ]

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <CreditCard className="h-4 w-4" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between p-4 rounded-lg bg-[#eef8e6] border border-[#b8dca8]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-[#1a3a2a]">Growth Plan</h3>
                <Badge className="bg-[#2d6a4f] text-white">Current</Badge>
              </div>
              <p className="text-sm text-[#5a6b5a]">Billed monthly</p>
              <div className="mt-3">
                <span className="text-3xl font-bold text-[#1a3a2a]">$79</span>
                <span className="text-sm text-[#5a6b5a]">/month</span>
              </div>
            </div>
            <Button variant="outline" className="border-[#b8dca8]">
              Change Plan
            </Button>
          </div>

          {/* Usage */}
          <div>
            <h4 className="text-sm font-medium text-[#1a3a2a] mb-3">Usage This Month</h4>
            <div className="space-y-3">
              {[
                { label: "Review Requests", used: 245, limit: 500 },
                { label: "AI Responses", used: 180, limit: 300 },
                { label: "Team Members", used: 3, limit: 5 },
              ].map((item) => {
                const pct = Math.round((item.used / item.limit) * 100)
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#5a6b5a]">{item.label}</span>
                      <span className="text-[#1a3a2a] font-medium">{item.used} / {item.limit}</span>
                    </div>
                    <div className="w-full h-2 bg-[#eef8e6] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${pct > 80 ? "bg-orange-400" : "bg-[#2d6a4f]"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base text-[#1a3a2a]">Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 border border-[#b8dca8] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-[10px] font-bold">
                VISA
              </div>
              <div>
                <p className="text-sm font-medium text-[#1a3a2a]">•••• •••• •••• 4242</p>
                <p className="text-xs text-[#5a6b5a]">Expires 12/2027</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-[#b8dca8]">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoice History */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base text-[#1a3a2a]">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#eef8e6]/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Receipt className="h-4 w-4 text-[#5a6b5a]" />
                  <div>
                    <p className="text-sm font-medium text-[#1a3a2a]">{inv.id}</p>
                    <p className="text-xs text-[#5a6b5a]">{inv.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-[#1a3a2a]">{inv.amount}</span>
                  <Badge variant="outline" className="border-[#2d6a4f] text-[#2d6a4f] text-[10px]">
                    {inv.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Download className="h-3.5 w-3.5 text-[#5a6b5a]" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cancel */}
      <div className="pt-2">
        <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 text-sm">
          Cancel Subscription
        </Button>
      </div>
    </div>
  )
}

/* ─── Security Tab ─────────────────────────────────────────────────────── */

function SecurityTab({
  settings,
  updateSettings,
}: {
  settings: AppSettings
  updateSettings: (u: Partial<AppSettings>) => void
}) {
  const [showPassword, setShowPassword] = useState(false)

  const sessions = [
    { device: "Chrome on macOS", location: "San Francisco, CA", time: "Active now", current: true },
    { device: "Safari on iPhone", location: "San Francisco, CA", time: "2 hours ago", current: false },
    { device: "Firefox on Windows", location: "New York, NY", time: "3 days ago", current: false },
  ]

  const loginHistory = [
    { time: "Today, 9:14 AM", ip: "192.168.1.xxx", device: "Chrome / macOS", status: "success" },
    { time: "Yesterday, 6:30 PM", ip: "192.168.1.xxx", device: "Safari / iOS", status: "success" },
    { time: "Feb 22, 3:15 PM", ip: "10.0.0.xxx", device: "Firefox / Windows", status: "success" },
    { time: "Feb 20, 11:40 AM", ip: "203.0.113.xxx", device: "Unknown / Linux", status: "failed" },
  ]

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Lock className="h-4 w-4" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-pw">Current Password</Label>
            <div className="relative">
              <Input
                id="current-pw"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-[#5a6b5a]" /> : <Eye className="h-4 w-4 text-[#5a6b5a]" />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-pw">New Password</Label>
              <Input id="new-pw" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pw">Confirm Password</Label>
              <Input id="confirm-pw" type="password" placeholder="••••••••" />
            </div>
          </div>
          <Button
            className="bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
            onClick={() => toast.success("Password updated successfully")}
          >
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Fingerprint className="h-4 w-4" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg border border-[#b8dca8]">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                settings.twoFactorEnabled ? "bg-[#d4f0c0]" : "bg-[#eef8e6]"
              }`}>
                <Key className={`h-5 w-5 ${settings.twoFactorEnabled ? "text-[#2d6a4f]" : "text-[#5a6b5a]"}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1a3a2a]">
                  {settings.twoFactorEnabled ? "2FA is enabled" : "2FA is disabled"}
                </p>
                <p className="text-xs text-[#5a6b5a]">
                  {settings.twoFactorEnabled
                    ? "Your account is protected with an authenticator app"
                    : "Protect your account with an authenticator app"}
                </p>
              </div>
            </div>
            <Button
              variant={settings.twoFactorEnabled ? "outline" : "default"}
              size="sm"
              onClick={() => {
                updateSettings({ twoFactorEnabled: !settings.twoFactorEnabled })
                toast.success(settings.twoFactorEnabled ? "2FA disabled" : "2FA enabled")
              }}
              className={settings.twoFactorEnabled ? "border-[#b8dca8]" : "bg-[#1a3a2a] hover:bg-[#0f2a1c]"}
            >
              {settings.twoFactorEnabled ? "Disable" : "Enable"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base text-[#1a3a2a]">Active Sessions</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 text-xs"
              onClick={() => toast.success("All other sessions have been revoked")}
            >
              <LogOut className="h-3.5 w-3.5 mr-1" />
              Revoke All Others
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {sessions.map((session, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-[#b8dca8] rounded-lg">
              <div className="flex items-center gap-3">
                <Monitor className="h-4 w-4 text-[#5a6b5a]" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#1a3a2a]">{session.device}</p>
                    {session.current && (
                      <Badge variant="outline" className="text-[10px] border-[#2d6a4f] text-[#2d6a4f]">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-[#5a6b5a]">{session.location} · {session.time}</p>
                </div>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 h-7 text-xs">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Login History */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base text-[#1a3a2a]">Login History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {loginHistory.map((entry, i) => (
              <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#eef8e6]/50 transition-colors">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  entry.status === "success" ? "bg-[#2d6a4f]" : "bg-red-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1a3a2a]">{entry.device}</p>
                  <p className="text-xs text-[#5a6b5a]">{entry.time} · {entry.ip}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[10px] ${
                    entry.status === "success"
                      ? "border-[#2d6a4f] text-[#2d6a4f]"
                      : "border-red-300 text-red-500"
                  }`}
                >
                  {entry.status === "success" ? "Success" : "Failed"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── Data & Privacy Tab ───────────────────────────────────────────────── */

function DataPrivacyTab({
  settings,
  updateSettings,
}: {
  settings: AppSettings
  updateSettings: (u: Partial<AppSettings>) => void
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <div className="space-y-6">
      {/* Export Data */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <FileDown className="h-4 w-4" />
            Export Your Data
          </CardTitle>
          <CardDescription>Download a copy of all your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-[#5a6b5a]">
            Export includes reviews, responses, analytics, customer data, and account information.
            The export will be prepared and sent to your email.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2 border-[#b8dca8]"
              onClick={() => toast.success("Export started! You'll receive an email when it's ready.")}
            >
              <Download className="h-4 w-4" />
              Export as CSV
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-[#b8dca8]"
              onClick={() => toast.success("Export started! You'll receive an email when it's ready.")}
            >
              <Download className="h-4 w-4" />
              Export as JSON
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base text-[#1a3a2a]">Data Retention</CardTitle>
          <CardDescription>Control how long we keep your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Retention Period</Label>
            <select
              value={settings.dataRetentionMonths}
              onChange={(e) => {
                updateSettings({ dataRetentionMonths: Number(e.target.value) })
                toast.success("Retention period updated")
              }}
              className="w-full px-3 py-2 border border-[#b8dca8] rounded-lg text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-white h-9"
            >
              <option value={12}>12 months</option>
              <option value={24}>24 months</option>
              <option value={36}>36 months (default)</option>
              <option value={60}>60 months</option>
              <option value={0}>Indefinite</option>
            </select>
            <p className="text-xs text-[#5a6b5a]">
              After this period, inactive data will be automatically anonymized
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base text-[#1a3a2a]">Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#1a3a2a]">Analytics Cookies</p>
              <p className="text-xs text-[#5a6b5a]">Allow us to collect usage analytics to improve our service</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#1a3a2a]">Marketing Emails</p>
              <p className="text-xs text-[#5a6b5a]">Receive tips, product updates, and promotional content</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#1a3a2a]">Public Profile</p>
              <p className="text-xs text-[#5a6b5a]">Allow your business to appear in ReviewForge directory</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-4 w-4" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showDeleteConfirm ? (
            <div className="flex items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50/50">
              <div>
                <p className="text-sm font-medium text-[#1a3a2a]">Delete Account</p>
                <p className="text-xs text-[#5a6b5a]">Permanently delete your account and all associated data</p>
              </div>
              <Button
                variant="outline"
                className="text-red-500 border-red-300 hover:bg-red-50 hover:text-red-600"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          ) : (
            <div className="p-4 rounded-lg border-2 border-red-300 bg-red-50 space-y-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-700">Are you absolutely sure?</p>
                  <p className="text-xs text-red-600 mt-1">
                    This action cannot be undone. This will permanently delete your account,
                    all reviews, responses, analytics, and customer data.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="delete-confirm" className="text-xs text-red-600">
                  Type &quot;DELETE&quot; to confirm
                </Label>
                <Input
                  id="delete-confirm"
                  placeholder="DELETE"
                  className="border-red-300 focus:ring-red-500"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => toast.error("Account deletion requires email confirmation")}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Delete Account
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
