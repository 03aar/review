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
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
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
  Trash2,
  Key,
  Smartphone,
  Monitor,
  Clock,
  MapPin,
  Mail,
  Phone,
  Camera,
  Palette,
  Plug,
  Brain,
  FileText,
  AlertTriangle,
  ChevronRight,
  X,
  Printer,
} from "lucide-react"
import { toast } from "sonner"
import { generateSlug } from "@/lib/utils"

const SETTINGS_KEY = "reviewforge_settings"

type TabId = "profile" | "business" | "review-link" | "integrations" | "ai" | "notifications" | "billing" | "security" | "data-privacy"

interface AppSettings {
  // AI
  autoRespond: boolean
  requireApprovalNegative: boolean
  responseTone: string
  connectedPlatforms: string[]
  aiLanguage: string
  responseLength: string
  customTemplate1: string
  customTemplate2: string
  customTemplate3: string
  negativeHandling: string
  // Notifications
  emailNewReview: boolean
  emailNegativeAlert: boolean
  emailWeeklySummary: boolean
  emailMonthlyReport: boolean
  emailProductUpdates: boolean
  emailMarketing: boolean
  smsUrgentOnly: boolean
  smsAllReviews: boolean
  smsPhone: string
  notificationFrequency: string
  // Profile
  firstName: string
  lastName: string
  email: string
  phone: string
  timezone: string
  language: string
  // Business extended
  bizStreet: string
  bizCity: string
  bizState: string
  bizZip: string
  bizPhone: string
  bizWebsite: string
  brandColor: string
  businessHours: Record<string, { open: boolean; openTime: string; closeTime: string }>
  // Security
  twoFactorEnabled: boolean
  // Data
  dataRetention: string
  // QR
  qrSize: string
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function defaultBusinessHours(): Record<string, { open: boolean; openTime: string; closeTime: string }> {
  const hours: Record<string, { open: boolean; openTime: string; closeTime: string }> = {}
  DAYS.forEach((day) => {
    hours[day] = { open: day !== "Sunday", openTime: "09:00", closeTime: "17:00" }
  })
  return hours
}

function defaultSettings(): AppSettings {
  return {
    autoRespond: false,
    requireApprovalNegative: true,
    responseTone: "Friendly",
    connectedPlatforms: [],
    aiLanguage: "English",
    responseLength: "medium",
    customTemplate1: "",
    customTemplate2: "",
    customTemplate3: "",
    negativeHandling: "private",
    emailNewReview: true,
    emailNegativeAlert: true,
    emailWeeklySummary: true,
    emailMonthlyReport: false,
    emailProductUpdates: true,
    emailMarketing: false,
    smsUrgentOnly: false,
    smsAllReviews: false,
    smsPhone: "",
    notificationFrequency: "realtime",
    firstName: "",
    lastName: "",
    email: "owner@example.com",
    phone: "",
    timezone: "America/New_York",
    language: "English",
    bizStreet: "",
    bizCity: "",
    bizState: "",
    bizZip: "",
    bizPhone: "",
    bizWebsite: "",
    brandColor: "#2d6a4f",
    businessHours: defaultBusinessHours(),
    twoFactorEnabled: false,
    dataRetention: "90days",
    qrSize: "medium",
  }
}

function loadSettings(): AppSettings {
  if (typeof window === "undefined") return defaultSettings()
  try {
    const stored = localStorage.getItem(SETTINGS_KEY)
    if (stored) return { ...defaultSettings(), ...JSON.parse(stored) }
  } catch { /* ignore */ }
  return defaultSettings()
}

function saveSettings(s: AppSettings) {
  if (typeof window !== "undefined") {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
  }
}

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
  { id: "business", label: "Business", icon: <Building2 className="h-4 w-4" /> },
  { id: "review-link", label: "Review Link & QR", icon: <QrCode className="h-4 w-4" /> },
  { id: "integrations", label: "Integrations", icon: <Plug className="h-4 w-4" /> },
  { id: "ai", label: "AI Settings", icon: <Brain className="h-4 w-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  { id: "billing", label: "Billing", icon: <CreditCard className="h-4 w-4" /> },
  { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
  { id: "data-privacy", label: "Data & Privacy", icon: <FileText className="h-4 w-4" /> },
]

const categories = [
  "restaurant", "hotel", "medical", "home_services", "auto_repair",
  "salon_spa", "dental", "legal", "ecommerce", "fitness",
  "education", "professional_services", "other",
]

const timezones = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
  { value: "UTC", label: "UTC" },
]

const languages = ["English", "Spanish", "French", "German"]

const usStates = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
]

const timeOptions: string[] = []
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 30) {
    const hh = h.toString().padStart(2, "0")
    const mm = m.toString().padStart(2, "0")
    timeOptions.push(`${hh}:${mm}`)
  }
}

function formatTime12(t: string) {
  const [hStr, mStr] = t.split(":")
  let h = parseInt(hStr, 10)
  const ampm = h >= 12 ? "PM" : "AM"
  if (h === 0) h = 12
  else if (h > 12) h -= 12
  return `${h}:${mStr} ${ampm}`
}

const mockInvoices = [
  { id: "INV-2026-001", date: "Jan 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-2025-012", date: "Dec 1, 2025", amount: "$49.00", status: "Paid" },
  { id: "INV-2025-011", date: "Nov 1, 2025", amount: "$49.00", status: "Paid" },
  { id: "INV-2025-010", date: "Oct 1, 2025", amount: "$49.00", status: "Paid" },
  { id: "INV-2025-009", date: "Sep 1, 2025", amount: "$29.00", status: "Paid" },
]

const mockSessions = [
  { device: "Chrome on macOS", location: "New York, NY", lastActive: "Active now", icon: <Monitor className="h-4 w-4" />, current: true },
  { device: "Safari on iPhone", location: "New York, NY", lastActive: "2 hours ago", icon: <Smartphone className="h-4 w-4" />, current: false },
  { device: "Firefox on Windows", location: "Chicago, IL", lastActive: "3 days ago", icon: <Monitor className="h-4 w-4" />, current: false },
]

const mockLoginHistory = [
  { date: "Feb 25, 2026 10:32 AM", device: "Chrome / macOS", location: "New York, NY", ip: "192.168.1.xxx" },
  { date: "Feb 24, 2026 3:15 PM", device: "Safari / iPhone", location: "New York, NY", ip: "192.168.1.xxx" },
  { date: "Feb 22, 2026 9:00 AM", device: "Chrome / macOS", location: "New York, NY", ip: "192.168.1.xxx" },
  { date: "Feb 20, 2026 1:45 PM", device: "Firefox / Windows", location: "Chicago, IL", ip: "10.0.0.xxx" },
  { date: "Feb 18, 2026 11:20 AM", device: "Chrome / macOS", location: "New York, NY", ip: "192.168.1.xxx" },
]

const reviewPlatforms = [
  { name: "Google Business Profile", icon: "G", color: "bg-[#4285f4]", description: "Post reviews directly to Google Maps", primary: true },
  { name: "Yelp", icon: "Y", color: "bg-red-600", description: "Share reviews on Yelp" },
  { name: "Facebook", icon: "f", color: "bg-[#1877f2]", description: "Post to your Facebook Business page" },
  { name: "TripAdvisor", icon: "T", color: "bg-green-600", description: "Share on TripAdvisor" },
]

const posIntegrations = [
  { name: "Square", icon: "Sq", color: "bg-black", description: "Sync transactions from Square POS" },
  { name: "Toast", icon: "To", color: "bg-orange-600", description: "Connect Toast restaurant POS" },
  { name: "Clover", icon: "Cl", color: "bg-emerald-600", description: "Integrate with Clover POS" },
]

const crmIntegrations = [
  { name: "HubSpot", icon: "Hs", color: "bg-[#ff7a59]", description: "Sync contacts with HubSpot CRM" },
  { name: "Salesforce", icon: "Sf", color: "bg-[#00a1e0]", description: "Connect Salesforce customer data" },
]

const commIntegrations = [
  { name: "Slack", icon: "Sl", color: "bg-[#4a154b]", description: "Get review alerts in Slack channels" },
  { name: "Microsoft Teams", icon: "Ms", color: "bg-[#6264a7]", description: "Receive notifications in Teams" },
]


export default function SettingsPage() {
  const { business, updateBusiness } = useBusinessContext()
  const [activeTab, setActiveTab] = useState<TabId>("profile")
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  // Business profile form
  const [bizName, setBizName] = useState(business.name)
  const [bizCategory, setBizCategory] = useState(business.category)

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Delete account dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")

  // Cancel subscription dialog
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  // Export format
  const [exportFormat, setExportFormat] = useState("json")

  useEffect(() => {
    setSettings(loadSettings())
  }, [])

  const reviewUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/r/${business.slug}`
      : `/r/${business.slug}`

  function updateSettingsField(update: Partial<AppSettings>) {
    setSettings((prev) => {
      const next = { ...prev, ...update }
      saveSettings(next)
      return next
    })
  }

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
    updateSettingsField({
      firstName: settings.firstName,
      lastName: settings.lastName,
      phone: settings.phone,
      timezone: settings.timezone,
      language: settings.language,
    })
    toast.success("Profile saved successfully!")
  }

  function handleSaveBusiness() {
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
    updateSettingsField({
      bizStreet: settings.bizStreet,
      bizCity: settings.bizCity,
      bizState: settings.bizState,
      bizZip: settings.bizZip,
      bizPhone: settings.bizPhone,
      bizWebsite: settings.bizWebsite,
      brandColor: settings.brandColor,
      businessHours: settings.businessHours,
    })
    toast.success("Business settings saved!")
  }

  function handleTogglePlatform(platformName: string) {
    const isConnected = settings.connectedPlatforms.includes(platformName)
    if (isConnected) {
      updateSettingsField({
        connectedPlatforms: settings.connectedPlatforms.filter((p) => p !== platformName),
      })
      toast.success(`${platformName} disconnected`)
    } else {
      updateSettingsField({
        connectedPlatforms: [...settings.connectedPlatforms, platformName],
      })
      toast.success(`${platformName} connected!`)
    }
  }

  function handleSaveAI() {
    updateSettingsField({
      aiLanguage: settings.aiLanguage,
      responseLength: settings.responseLength,
      customTemplate1: settings.customTemplate1,
      customTemplate2: settings.customTemplate2,
      customTemplate3: settings.customTemplate3,
      negativeHandling: settings.negativeHandling,
    })
    toast.success("AI settings saved!")
  }

  function handleSaveNotifications() {
    saveSettings(settings)
    toast.success("Notification preferences saved!")
  }

  function handleUpdatePassword() {
    if (!currentPassword) {
      toast.error("Please enter your current password")
      return
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    toast.success("Password updated successfully!")
  }

  function handleRevokeSession(device: string) {
    toast.success(`Session on ${device} revoked`)
  }

  function handleExportData() {
    toast.success(`Data export started in ${exportFormat.toUpperCase()} format. You will receive an email when ready.`)
  }

  function handleDeleteAccount() {
    if (deleteConfirmText !== "DELETE") {
      toast.error("Please type DELETE to confirm")
      return
    }
    setShowDeleteDialog(false)
    setDeleteConfirmText("")
    toast.success("Account deletion request submitted. You will receive a confirmation email.")
  }

  function handleDownloadQR() {
    const sizeMap: Record<string, number> = { small: 200, medium: 400, large: 800 }
    const size = sizeMap[settings.qrSize] || 400
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(reviewUrl)}`
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

  function handlePrintQRSheet() {
    toast.success("Print-ready QR sheet generated!")
  }

  function handleUpdateBusinessHour(day: string, field: string, value: string | boolean) {
    const updated = { ...settings.businessHours }
    updated[day] = { ...updated[day], [field]: value }
    updateSettingsField({ businessHours: updated })
  }

  const initials = settings.firstName && settings.lastName
    ? `${settings.firstName[0]}${settings.lastName[0]}`.toUpperCase()
    : business.name.slice(0, 2).toUpperCase()

  function renderIntegrationRow(platform: { name: string; icon: string; color: string; description: string; primary?: boolean }) {
    const isConnected = settings.connectedPlatforms.includes(platform.name)
    return (
      <div key={platform.name} className="flex items-center justify-between p-3 border border-[#b8dca8] rounded-lg">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
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
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Settings</h1>
        <p className="text-[#5a6b5a]">Manage your account, business, and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-1 min-w-max pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#1a3a2a] text-[#e4f5d6]"
                  : "text-[#5a6b5a] hover:bg-[#d4f0c0] hover:text-[#1a3a2a]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <Separator className="bg-[#b8dca8]" />

      {/* Tab 1: Profile */}
      {activeTab === "profile" && (
        <Card className="border-[#b8dca8]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
              <User className="h-4 w-4" />
              Personal Profile
            </CardTitle>
            <CardDescription>Manage your personal account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Photo */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-xl font-bold">
                {initials}
              </div>
              <div>
                <Button variant="outline" size="sm" className="gap-2 border-[#b8dca8]">
                  <Camera className="h-3.5 w-3.5" />
                  Upload Photo
                </Button>
                <p className="text-xs text-[#5a6b5a] mt-1">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>

            <Separator className="bg-[#b8dca8]" />

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  value={settings.firstName}
                  onChange={(e) => updateSettingsField({ firstName: e.target.value })}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  value={settings.lastName}
                  onChange={(e) => updateSettingsField({ lastName: e.target.value })}
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSettingsField({ email: e.target.value })}
                  className="flex-1"
                />
                <Badge className="bg-[#d4f0c0] text-[#1a3a2a] hover:bg-[#d4f0c0]">
                  <Check className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={settings.phone}
                onChange={(e) => updateSettingsField({ phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Timezone */}
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                value={settings.timezone}
                onChange={(e) => updateSettingsField({ timezone: e.target.value })}
                className="w-full px-3 py-2 border border-[#b8dca8] rounded-lg text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-white h-9"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={settings.language}
                onChange={(e) => updateSettingsField({ language: e.target.value })}
                className="w-full px-3 py-2 border border-[#b8dca8] rounded-lg text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-white h-9"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <Button onClick={handleSaveProfile} className="gap-2 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]">
              <Save className="h-4 w-4" />
              Save Profile
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Business */}
      {activeTab === "business" && (
        <div className="space-y-6">
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Building2 className="h-4 w-4" />
                Business Profile
              </CardTitle>
              <CardDescription>Information shown on your review collection page</CardDescription>
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
                  <Input value={business.slug} disabled className="flex-1 bg-[#eef8e6]" />
                </div>
                <p className="text-xs text-[#5a6b5a]">Slug is automatically generated from your business name</p>
              </div>

              <Separator className="bg-[#b8dca8]" />

              {/* Business Address */}
              <h3 className="text-sm font-semibold text-[#1a3a2a]">Business Address</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="biz-street">Street Address</Label>
                  <Input
                    id="biz-street"
                    value={settings.bizStreet}
                    onChange={(e) => updateSettingsField({ bizStreet: e.target.value })}
                    placeholder="123 Main St"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <Label htmlFor="biz-city">City</Label>
                    <Input
                      id="biz-city"
                      value={settings.bizCity}
                      onChange={(e) => updateSettingsField({ bizCity: e.target.value })}
                      placeholder="New York"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biz-state">State</Label>
                    <select
                      id="biz-state"
                      value={settings.bizState}
                      onChange={(e) => updateSettingsField({ bizState: e.target.value })}
                      className="w-full px-3 py-2 border border-[#b8dca8] rounded-lg text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-white h-9"
                    >
                      <option value="">--</option>
                      {usStates.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="biz-zip">ZIP Code</Label>
                    <Input
                      id="biz-zip"
                      value={settings.bizZip}
                      onChange={(e) => updateSettingsField({ bizZip: e.target.value })}
                      placeholder="10001"
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-[#b8dca8]" />

              {/* Business Contact */}
              <h3 className="text-sm font-semibold text-[#1a3a2a]">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="biz-phone">Business Phone</Label>
                  <Input
                    id="biz-phone"
                    type="tel"
                    value={settings.bizPhone}
                    onChange={(e) => updateSettingsField({ bizPhone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biz-website">Website URL</Label>
                  <Input
                    id="biz-website"
                    type="url"
                    value={settings.bizWebsite}
                    onChange={(e) => updateSettingsField({ bizWebsite: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <Separator className="bg-[#b8dca8]" />

              {/* Business Hours */}
              <h3 className="text-sm font-semibold text-[#1a3a2a]">Business Hours</h3>
              <div className="space-y-2">
                {DAYS.map((day) => {
                  const hours = settings.businessHours[day] || { open: false, openTime: "09:00", closeTime: "17:00" }
                  return (
                    <div key={day} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#eef8e6]">
                      <div className="w-24 text-sm font-medium text-[#1a3a2a]">{day}</div>
                      <Switch
                        checked={hours.open}
                        onCheckedChange={(v) => handleUpdateBusinessHour(day, "open", v)}
                      />
                      <span className="text-xs text-[#5a6b5a] w-10">{hours.open ? "Open" : "Closed"}</span>
                      {hours.open && (
                        <div className="flex items-center gap-2">
                          <select
                            value={hours.openTime}
                            onChange={(e) => handleUpdateBusinessHour(day, "openTime", e.target.value)}
                            className="px-2 py-1 border border-[#b8dca8] rounded text-xs bg-white"
                          >
                            {timeOptions.map((t) => (
                              <option key={t} value={t}>{formatTime12(t)}</option>
                            ))}
                          </select>
                          <span className="text-xs text-[#5a6b5a]">to</span>
                          <select
                            value={hours.closeTime}
                            onChange={(e) => handleUpdateBusinessHour(day, "closeTime", e.target.value)}
                            className="px-2 py-1 border border-[#b8dca8] rounded text-xs bg-white"
                          >
                            {timeOptions.map((t) => (
                              <option key={t} value={t}>{formatTime12(t)}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <Separator className="bg-[#b8dca8]" />

              {/* Branding */}
              <h3 className="text-sm font-semibold text-[#1a3a2a]">Branding</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-[#eef8e6] border-2 border-dashed border-[#b8dca8] flex items-center justify-center">
                  <Camera className="h-6 w-6 text-[#5a6b5a]" />
                </div>
                <div>
                  <Button variant="outline" size="sm" className="gap-2 border-[#b8dca8]">
                    <Camera className="h-3.5 w-3.5" />
                    Upload Logo
                  </Button>
                  <p className="text-xs text-[#5a6b5a] mt-1">Recommended: 256x256px, PNG or SVG</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand-color">Brand Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    id="brand-color"
                    type="color"
                    value={settings.brandColor}
                    onChange={(e) => updateSettingsField({ brandColor: e.target.value })}
                    className="w-10 h-10 rounded border border-[#b8dca8] cursor-pointer"
                  />
                  <Input
                    value={settings.brandColor}
                    onChange={(e) => updateSettingsField({ brandColor: e.target.value })}
                    className="w-32"
                    maxLength={7}
                  />
                  <div className="w-24 h-10 rounded-lg" style={{ backgroundColor: settings.brandColor }} />
                </div>
                <p className="text-xs text-[#5a6b5a]">Primary color used on your review collection page</p>
              </div>

              <Button onClick={handleSaveBusiness} className="gap-2 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]">
                <Save className="h-4 w-4" />
                Save Business Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 3: Review Link & QR */}
      {activeTab === "review-link" && (
        <Card className="border-[#b8dca8]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
              <LinkIcon className="h-4 w-4" />
              Your Review Link & QR Code
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
              <Button variant="outline" size="sm" className="gap-2 border-[#b8dca8]" onClick={() => setShowQR(!showQR)}>
                <QrCode className="h-3.5 w-3.5" />
                {showQR ? "Hide QR Code" : "Show QR Code"}
              </Button>
            </div>

            {showQR && (
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg border border-[#b8dca8]">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=${settings.qrSize === "small" ? "150x150" : settings.qrSize === "large" ? "400x400" : "250x250"}&data=${encodeURIComponent(reviewUrl)}`}
                    alt="QR Code for review link"
                    width={settings.qrSize === "small" ? 150 : settings.qrSize === "large" ? 400 : 250}
                    height={settings.qrSize === "small" ? 150 : settings.qrSize === "large" ? 400 : 250}
                    className="rounded-lg"
                  />
                  <div className="flex gap-2">
                    {(["small", "medium", "large"] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => updateSettingsField({ qrSize: size })}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          settings.qrSize === size
                            ? "bg-[#d4f0c0] border-[#2d6a4f] text-[#1a3a2a]"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2 border-[#b8dca8]" onClick={handleDownloadQR}>
                      <Download className="h-3.5 w-3.5" />
                      Download QR Code
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2 border-[#b8dca8]" onClick={handlePrintQRSheet}>
                      <Printer className="h-3.5 w-3.5" />
                      Print QR Sheet
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#eef8e6] border border-[#b8dca8] rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#1a3a2a] mb-2">Tips for sharing your review link</h4>
              <ul className="text-sm text-[#4a7a5a] space-y-1">
                <li>- Print QR code on receipts and table cards</li>
                <li>- Text it to customers after their visit</li>
                <li>- Add it to your email signature</li>
                <li>- Include in post-purchase follow-up emails</li>
                <li>- Display it near the checkout/exit</li>
                <li>- Share on social media profiles</li>
                <li>- Add to your Google Business Profile</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: Integrations */}
      {activeTab === "integrations" && (
        <div className="space-y-6">
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Globe className="h-4 w-4" />
                Review Platforms
              </CardTitle>
              <CardDescription>Connect your review platforms to post reviews directly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviewPlatforms.map((p) => renderIntegrationRow(p))}
            </CardContent>
          </Card>

          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <CreditCard className="h-4 w-4" />
                POS Integrations
              </CardTitle>
              <CardDescription>Connect your point-of-sale system to automate review requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {posIntegrations.map((p) => renderIntegrationRow(p))}
            </CardContent>
          </Card>

          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <User className="h-4 w-4" />
                CRM
              </CardTitle>
              <CardDescription>Sync customer data with your CRM platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {crmIntegrations.map((p) => renderIntegrationRow(p))}
            </CardContent>
          </Card>

          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Mail className="h-4 w-4" />
                Communication
              </CardTitle>
              <CardDescription>Get review alerts in your team communication tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {commIntegrations.map((p) => renderIntegrationRow(p))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 5: AI Settings */}
      {activeTab === "ai" && (
        <Card className="border-[#b8dca8]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
              <Zap className="h-4 w-4" />
              AI Response Settings
            </CardTitle>
            <CardDescription>Configure how AI handles review responses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#1a3a2a]">Auto-Respond to Reviews</p>
                <p className="text-xs text-[#5a6b5a]">Automatically generate and post responses to positive reviews (4-5 stars)</p>
              </div>
              <Switch
                checked={settings.autoRespond}
                onCheckedChange={(v) => {
                  updateSettingsField({ autoRespond: v })
                  toast.success(v ? "Auto-respond enabled" : "Auto-respond disabled")
                }}
              />
            </div>
            <Separator className="bg-[#b8dca8]" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#1a3a2a]">Require Approval for Negative Reviews</p>
                <p className="text-xs text-[#5a6b5a]">Always require manual approval for responses to 1-3 star reviews</p>
              </div>
              <Switch
                checked={settings.requireApprovalNegative}
                onCheckedChange={(v) => {
                  updateSettingsField({ requireApprovalNegative: v })
                  toast.success(v ? "Approval required for negative reviews" : "Auto-respond to all reviews")
                }}
              />
            </div>
            <Separator className="bg-[#b8dca8]" />

            {/* Response Tone */}
            <div className="space-y-2">
              <Label>Response Tone</Label>
              <div className="flex gap-2 flex-wrap">
                {["Professional", "Friendly", "Casual"].map((tone) => (
                  <button
                    key={tone}
                    onClick={() => {
                      updateSettingsField({ responseTone: tone })
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
            <Separator className="bg-[#b8dca8]" />

            {/* AI Language */}
            <div className="space-y-2">
              <Label htmlFor="ai-language">AI Response Language</Label>
              <select
                id="ai-language"
                value={settings.aiLanguage}
                onChange={(e) => updateSettingsField({ aiLanguage: e.target.value })}
                className="w-full px-3 py-2 border border-[#b8dca8] rounded-lg text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-white h-9"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <p className="text-xs text-[#5a6b5a]">Language used for AI-generated responses</p>
            </div>
            <Separator className="bg-[#b8dca8]" />

            {/* Response Length */}
            <div className="space-y-2">
              <Label>Response Length Preference</Label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: "short", label: "Short", desc: "1-2 sentences" },
                  { value: "medium", label: "Medium", desc: "3-4 sentences" },
                  { value: "detailed", label: "Detailed", desc: "5+ sentences" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateSettingsField({ responseLength: opt.value })}
                    className={`px-4 py-2 rounded-lg text-sm border transition-colors text-left ${
                      settings.responseLength === opt.value
                        ? "bg-[#d4f0c0] border-[#2d6a4f] text-[#1a3a2a]"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{opt.label}</div>
                    <div className="text-xs opacity-70">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <Separator className="bg-[#b8dca8]" />

            {/* Custom Templates */}
            <div className="space-y-3">
              <Label>Custom Response Templates</Label>
              <p className="text-xs text-[#5a6b5a]">Provide template text the AI can reference when crafting responses</p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-[#5a6b5a]">Template 1 - Positive Reviews</Label>
                  <Textarea
                    value={settings.customTemplate1}
                    onChange={(e) => updateSettingsField({ customTemplate1: e.target.value })}
                    placeholder="Thank you for the wonderful review! We're thrilled you enjoyed..."
                    rows={3}
                    className="border-[#b8dca8]"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-[#5a6b5a]">Template 2 - Neutral Reviews</Label>
                  <Textarea
                    value={settings.customTemplate2}
                    onChange={(e) => updateSettingsField({ customTemplate2: e.target.value })}
                    placeholder="Thank you for your feedback. We appreciate you taking the time..."
                    rows={3}
                    className="border-[#b8dca8]"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-[#5a6b5a]">Template 3 - Negative Reviews</Label>
                  <Textarea
                    value={settings.customTemplate3}
                    onChange={(e) => updateSettingsField({ customTemplate3: e.target.value })}
                    placeholder="We're sorry to hear about your experience. We take feedback seriously..."
                    rows={3}
                    className="border-[#b8dca8]"
                  />
                </div>
              </div>
            </div>
            <Separator className="bg-[#b8dca8]" />

            {/* Negative Review Handling */}
            <div className="space-y-2">
              <Label>Negative Review Handling</Label>
              <p className="text-xs text-[#5a6b5a]">How should the system handle negative reviews (1-2 stars)?</p>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-[#b8dca8] rounded-lg cursor-pointer hover:bg-[#eef8e6]">
                  <input
                    type="radio"
                    name="negative-handling"
                    value="private"
                    checked={settings.negativeHandling === "private"}
                    onChange={() => updateSettingsField({ negativeHandling: "private" })}
                    className="accent-[#2d6a4f]"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#1a3a2a]">Route to Private Feedback</p>
                    <p className="text-xs text-[#5a6b5a]">Redirect negative reviewers to a private feedback form instead of posting publicly</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-[#b8dca8] rounded-lg cursor-pointer hover:bg-[#eef8e6]">
                  <input
                    type="radio"
                    name="negative-handling"
                    value="ai-respond"
                    checked={settings.negativeHandling === "ai-respond"}
                    onChange={() => updateSettingsField({ negativeHandling: "ai-respond" })}
                    className="accent-[#2d6a4f]"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#1a3a2a]">AI Respond (with approval)</p>
                    <p className="text-xs text-[#5a6b5a]">Let AI draft a response, but require your approval before posting</p>
                  </div>
                </label>
              </div>
            </div>

            <Button onClick={handleSaveAI} className="gap-2 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]">
              <Save className="h-4 w-4" />
              Save AI Settings
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tab 6: Notifications */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Mail className="h-4 w-4" />
                Email Notifications
              </CardTitle>
              <CardDescription>Choose which email notifications you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">New Review Received</p>
                  <p className="text-xs text-[#5a6b5a]">Get notified when a new review is submitted</p>
                </div>
                <Switch
                  checked={settings.emailNewReview}
                  onCheckedChange={(v) => updateSettingsField({ emailNewReview: v })}
                />
              </div>
              <Separator className="bg-[#b8dca8]" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">Negative Review Alert</p>
                  <p className="text-xs text-[#5a6b5a]">Immediate alert for reviews with 1-3 stars</p>
                </div>
                <Switch
                  checked={settings.emailNegativeAlert}
                  onCheckedChange={(v) => updateSettingsField({ emailNegativeAlert: v })}
                />
              </div>
              <Separator className="bg-[#b8dca8]" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">Weekly Summary</p>
                  <p className="text-xs text-[#5a6b5a]">A weekly digest of your review activity</p>
                </div>
                <Switch
                  checked={settings.emailWeeklySummary}
                  onCheckedChange={(v) => updateSettingsField({ emailWeeklySummary: v })}
                />
              </div>
              <Separator className="bg-[#b8dca8]" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">Monthly Report</p>
                  <p className="text-xs text-[#5a6b5a]">Monthly analytics and insights report</p>
                </div>
                <Switch
                  checked={settings.emailMonthlyReport}
                  onCheckedChange={(v) => updateSettingsField({ emailMonthlyReport: v })}
                />
              </div>
              <Separator className="bg-[#b8dca8]" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">Product Updates</p>
                  <p className="text-xs text-[#5a6b5a]">New features, improvements, and tips</p>
                </div>
                <Switch
                  checked={settings.emailProductUpdates}
                  onCheckedChange={(v) => updateSettingsField({ emailProductUpdates: v })}
                />
              </div>
              <Separator className="bg-[#b8dca8]" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">Marketing Emails</p>
                  <p className="text-xs text-[#5a6b5a]">Promotional offers, case studies, and webinars</p>
                </div>
                <Switch
                  checked={settings.emailMarketing}
                  onCheckedChange={(v) => updateSettingsField({ emailMarketing: v })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Smartphone className="h-4 w-4" />
                SMS Notifications
              </CardTitle>
              <CardDescription>Text message alerts for urgent notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sms-phone">SMS Phone Number</Label>
                <Input
                  id="sms-phone"
                  type="tel"
                  value={settings.smsPhone}
                  onChange={(e) => updateSettingsField({ smsPhone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <Separator className="bg-[#b8dca8]" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">Urgent Alerts Only</p>
                  <p className="text-xs text-[#5a6b5a]">Only receive SMS for negative reviews and critical issues</p>
                </div>
                <Switch
                  checked={settings.smsUrgentOnly}
                  onCheckedChange={(v) => updateSettingsField({ smsUrgentOnly: v })}
                />
              </div>
              <Separator className="bg-[#b8dca8]" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">All Review Notifications</p>
                  <p className="text-xs text-[#5a6b5a]">Receive SMS for every new review</p>
                </div>
                <Switch
                  checked={settings.smsAllReviews}
                  onCheckedChange={(v) => updateSettingsField({ smsAllReviews: v })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Clock className="h-4 w-4" />
                Notification Frequency
              </CardTitle>
              <CardDescription>How often should we send notification digests?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { value: "realtime", label: "Real-time", desc: "Get notified immediately for each event" },
                { value: "hourly", label: "Hourly Digest", desc: "Bundled notifications every hour" },
                { value: "daily", label: "Daily Digest", desc: "One daily summary at 9:00 AM" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    settings.notificationFrequency === opt.value
                      ? "border-[#2d6a4f] bg-[#eef8e6]"
                      : "border-[#b8dca8] hover:bg-[#eef8e6]"
                  }`}
                >
                  <input
                    type="radio"
                    name="notification-frequency"
                    value={opt.value}
                    checked={settings.notificationFrequency === opt.value}
                    onChange={() => updateSettingsField({ notificationFrequency: opt.value })}
                    className="accent-[#2d6a4f]"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#1a3a2a]">{opt.label}</p>
                    <p className="text-xs text-[#5a6b5a]">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </CardContent>
          </Card>

          <Button onClick={handleSaveNotifications} className="gap-2 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]">
            <Save className="h-4 w-4" />
            Save Notification Preferences
          </Button>
        </div>
      )}

      {/* Tab 7: Billing */}
      {activeTab === "billing" && (
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
              <div className="flex items-center justify-between p-4 bg-[#eef8e6] border border-[#b8dca8] rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#1a3a2a]">Growth Plan</h3>
                    <Badge className="bg-[#2d6a4f] text-white hover:bg-[#2d6a4f]">Active</Badge>
                  </div>
                  <p className="text-sm text-[#5a6b5a] mt-1">$49/month - billed monthly</p>
                  <p className="text-xs text-[#5a6b5a] mt-0.5">Next billing date: March 1, 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#1a3a2a]">$49</p>
                  <p className="text-xs text-[#5a6b5a]">/month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage */}
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base text-[#1a3a2a]">Usage This Period</CardTitle>
              <CardDescription>Feb 1 - Feb 28, 2026</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#5a6b5a]">Reviews Collected</span>
                  <span className="font-medium text-[#1a3a2a]">142 / 500</span>
                </div>
                <Progress value={28} className="h-2 bg-[#d4f0c0]" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#5a6b5a]">AI Responses Sent</span>
                  <span className="font-medium text-[#1a3a2a]">89 / 250</span>
                </div>
                <Progress value={36} className="h-2 bg-[#d4f0c0]" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#5a6b5a]">Team Members</span>
                  <span className="font-medium text-[#1a3a2a]">3 / 10</span>
                </div>
                <Progress value={30} className="h-2 bg-[#d4f0c0]" />
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
                  <div className="w-10 h-7 bg-[#1a3a2a] rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1a3a2a]">Visa ending in 4242</p>
                    <p className="text-xs text-[#5a6b5a]">Expires 12/2028</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-[#b8dca8]">
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Plan Comparison */}
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base text-[#1a3a2a]">Compare Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#b8dca8]">
                      <th className="text-left py-2 pr-4 text-[#5a6b5a] font-medium">Feature</th>
                      <th className="text-center py-2 px-4 text-[#5a6b5a] font-medium">Starter</th>
                      <th className="text-center py-2 px-4 text-[#1a3a2a] font-bold bg-[#eef8e6] rounded-t-lg">Growth</th>
                      <th className="text-center py-2 px-4 text-[#5a6b5a] font-medium">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#b8dca8]/50">
                      <td className="py-2 pr-4 text-[#1a3a2a]">Price</td>
                      <td className="text-center py-2 px-4 text-[#5a6b5a]">$19/mo</td>
                      <td className="text-center py-2 px-4 bg-[#eef8e6] font-medium text-[#1a3a2a]">$49/mo</td>
                      <td className="text-center py-2 px-4 text-[#5a6b5a]">$149/mo</td>
                    </tr>
                    <tr className="border-b border-[#b8dca8]/50">
                      <td className="py-2 pr-4 text-[#1a3a2a]">Reviews</td>
                      <td className="text-center py-2 px-4 text-[#5a6b5a]">100/mo</td>
                      <td className="text-center py-2 px-4 bg-[#eef8e6] font-medium text-[#1a3a2a]">500/mo</td>
                      <td className="text-center py-2 px-4 text-[#5a6b5a]">Unlimited</td>
                    </tr>
                    <tr className="border-b border-[#b8dca8]/50">
                      <td className="py-2 pr-4 text-[#1a3a2a]">AI Responses</td>
                      <td className="text-center py-2 px-4 text-[#5a6b5a]">50/mo</td>
                      <td className="text-center py-2 px-4 bg-[#eef8e6] font-medium text-[#1a3a2a]">250/mo</td>
                      <td className="text-center py-2 px-4 text-[#5a6b5a]">Unlimited</td>
                    </tr>
                    <tr className="border-b border-[#b8dca8]/50">
                      <td className="py-2 pr-4 text-[#1a3a2a]">Team Members</td>
                      <td className="text-center py-2 px-4 text-[#5a6b5a]">2</td>
                      <td className="text-center py-2 px-4 bg-[#eef8e6] font-medium text-[#1a3a2a]">10</td>
                      <td className="text-center py-2 px-4 text-[#5a6b5a]">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-[#1a3a2a]">Integrations</td>
                      <td className="text-center py-2 px-4 text-[#5a6b5a]">2</td>
                      <td className="text-center py-2 px-4 bg-[#eef8e6] font-medium text-[#1a3a2a]">All</td>
                      <td className="text-center py-2 px-4 text-[#5a6b5a]">All + API</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" size="sm" className="border-[#b8dca8] text-[#5a6b5a]">
                  Downgrade to Starter
                </Button>
                <Button size="sm" className="bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]">
                  Upgrade to Enterprise
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
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#b8dca8]">
                      <th className="text-left py-2 pr-4 text-[#5a6b5a] font-medium">Invoice</th>
                      <th className="text-left py-2 px-4 text-[#5a6b5a] font-medium">Date</th>
                      <th className="text-left py-2 px-4 text-[#5a6b5a] font-medium">Amount</th>
                      <th className="text-left py-2 px-4 text-[#5a6b5a] font-medium">Status</th>
                      <th className="text-right py-2 pl-4 text-[#5a6b5a] font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInvoices.map((inv) => (
                      <tr key={inv.id} className="border-b border-[#b8dca8]/50">
                        <td className="py-2 pr-4 text-[#1a3a2a] font-medium">{inv.id}</td>
                        <td className="py-2 px-4 text-[#5a6b5a]">{inv.date}</td>
                        <td className="py-2 px-4 text-[#1a3a2a]">{inv.amount}</td>
                        <td className="py-2 px-4">
                          <Badge className="bg-[#d4f0c0] text-[#1a3a2a] hover:bg-[#d4f0c0]">{inv.status}</Badge>
                        </td>
                        <td className="py-2 pl-4 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-[#2d6a4f]"
                            onClick={() => toast.success(`Downloading ${inv.id}...`)}
                          >
                            <Download className="h-3 w-3" />
                            PDF
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Cancel Subscription */}
          <Card className="border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700">Cancel Subscription</p>
                  <p className="text-xs text-red-500">Your account will remain active until the end of your billing period</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => setShowCancelDialog(true)}
                >
                  Cancel Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cancel Subscription Dialog */}
          <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
            <DialogContent className="border-[#b8dca8]">
              <DialogHeader>
                <DialogTitle className="text-[#1a3a2a]">Cancel Subscription?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel your Growth plan? You will lose access to premium features at the end of your current billing period (March 1, 2026).
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCancelDialog(false)} className="border-[#b8dca8]">
                  Keep My Plan
                </Button>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setShowCancelDialog(false)
                    toast.success("Subscription cancellation scheduled for March 1, 2026")
                  }}
                >
                  Yes, Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Tab 8: Security */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Password */}
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Key className="h-4 w-4" />
                Change Password
              </CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                  />
                </div>
              </div>
              <Button onClick={handleUpdatePassword} className="gap-2 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]">
                <Shield className="h-4 w-4" />
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Smartphone className="h-4 w-4" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">
                    {settings.twoFactorEnabled ? "Two-factor authentication is enabled" : "Two-factor authentication is disabled"}
                  </p>
                  <p className="text-xs text-[#5a6b5a]">
                    {settings.twoFactorEnabled
                      ? "Your account is protected with an authenticator app"
                      : "Protect your account with an authenticator app like Google Authenticator or Authy"}
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactorEnabled}
                  onCheckedChange={(v) => {
                    updateSettingsField({ twoFactorEnabled: v })
                    toast.success(v ? "Two-factor authentication enabled" : "Two-factor authentication disabled")
                  }}
                />
              </div>
              {settings.twoFactorEnabled && (
                <div className="p-4 bg-[#eef8e6] border border-[#b8dca8] rounded-lg space-y-3">
                  <p className="text-sm font-medium text-[#1a3a2a]">Setup Instructions</p>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 bg-white border border-[#b8dca8] rounded-lg flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-[#5a6b5a]" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-[#5a6b5a]">1. Open your authenticator app</p>
                      <p className="text-xs text-[#5a6b5a]">2. Scan the QR code or enter the setup key</p>
                      <p className="text-xs text-[#5a6b5a]">3. Enter the 6-digit verification code</p>
                      <div className="flex gap-2 mt-2">
                        <Input placeholder="000000" maxLength={6} className="w-28 text-center tracking-widest" />
                        <Button size="sm" className="bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]">Verify</Button>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#5a6b5a]">
                    Setup key: <code className="bg-white px-2 py-0.5 rounded text-[#1a3a2a] font-mono">JBSW Y3DP EHPK 3PXP</code>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Monitor className="h-4 w-4" />
                Active Sessions
              </CardTitle>
              <CardDescription>Devices currently logged into your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSessions.map((session, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-[#b8dca8] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#eef8e6] rounded-lg flex items-center justify-center text-[#2d6a4f]">
                      {session.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-[#1a3a2a]">{session.device}</p>
                        {session.current && <Badge className="bg-[#d4f0c0] text-[#1a3a2a] text-[10px] hover:bg-[#d4f0c0]">Current</Badge>}
                      </div>
                      <p className="text-xs text-[#5a6b5a]">
                        <MapPin className="h-3 w-3 inline mr-1" />{session.location} - {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => handleRevokeSession(session.device)}
                    >
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
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Clock className="h-4 w-4" />
                Login History
              </CardTitle>
              <CardDescription>Recent login activity on your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#b8dca8]">
                      <th className="text-left py-2 pr-4 text-[#5a6b5a] font-medium">Date</th>
                      <th className="text-left py-2 px-4 text-[#5a6b5a] font-medium">Device</th>
                      <th className="text-left py-2 px-4 text-[#5a6b5a] font-medium">Location</th>
                      <th className="text-left py-2 pl-4 text-[#5a6b5a] font-medium">IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLoginHistory.map((login, idx) => (
                      <tr key={idx} className="border-b border-[#b8dca8]/50">
                        <td className="py-2 pr-4 text-[#1a3a2a]">{login.date}</td>
                        <td className="py-2 px-4 text-[#5a6b5a]">{login.device}</td>
                        <td className="py-2 px-4 text-[#5a6b5a]">{login.location}</td>
                        <td className="py-2 pl-4 text-[#5a6b5a] font-mono text-xs">{login.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Key className="h-4 w-4" />
                API Keys
              </CardTitle>
              <CardDescription>Manage API keys for programmatic access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 bg-[#eef8e6] border border-[#b8dca8] rounded-lg">
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">Developer API Access</p>
                  <p className="text-xs text-[#5a6b5a]">Create and manage API keys for integrations</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2 border-[#b8dca8]" asChild>
                  <a href="/dashboard/developers">
                    Manage API Keys
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 9: Data & Privacy */}
      {activeTab === "data-privacy" && (
        <div className="space-y-6">
          {/* Export Data */}
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Download className="h-4 w-4" />
                Export Your Data
              </CardTitle>
              <CardDescription>Download a copy of all your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Export Format</Label>
                <div className="flex gap-2">
                  {["json", "csv"].map((format) => (
                    <button
                      key={format}
                      onClick={() => setExportFormat(format)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        exportFormat === format
                          ? "bg-[#d4f0c0] border-[#2d6a4f] text-[#1a3a2a]"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={handleExportData} className="gap-2 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]">
                <Download className="h-4 w-4" />
                Export All Data
              </Button>
              <p className="text-xs text-[#5a6b5a]">
                We will prepare your data export and send a download link to your email. This may take up to 24 hours.
              </p>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
                <Clock className="h-4 w-4" />
                Data Retention
              </CardTitle>
              <CardDescription>Control how long we keep your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="data-retention">Voice Recording Retention</Label>
                <select
                  id="data-retention"
                  value={settings.dataRetention}
                  onChange={(e) => {
                    updateSettingsField({ dataRetention: e.target.value })
                    toast.success("Data retention setting updated")
                  }}
                  className="w-full px-3 py-2 border border-[#b8dca8] rounded-lg text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-white h-9"
                >
                  <option value="24hours">24 Hours</option>
                  <option value="30days">30 Days</option>
                  <option value="90days">90 Days</option>
                  <option value="1year">1 Year</option>
                </select>
                <p className="text-xs text-[#5a6b5a]">
                  Voice recordings used for review generation will be automatically deleted after this period
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Preferences */}
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base text-[#1a3a2a]">Cookie Preferences</CardTitle>
              <CardDescription>Manage your cookie and tracking preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="gap-2 border-[#b8dca8]" onClick={() => toast.success("Cookie preferences panel opened")}>
                <Globe className="h-3.5 w-3.5" />
                Manage Cookie Preferences
              </Button>
            </CardContent>
          </Card>

          {/* GDPR */}
          <Card className="border-[#b8dca8]">
            <CardHeader>
              <CardTitle className="text-base text-[#1a3a2a]">GDPR Data Request</CardTitle>
              <CardDescription>Submit a data access or deletion request under GDPR</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-[#b8dca8]"
                onClick={() => toast.success("GDPR data request submitted. We will respond within 30 days.")}
              >
                <FileText className="h-3.5 w-3.5" />
                Submit GDPR Request
              </Button>
            </CardContent>
          </Card>

          {/* Delete Account */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-4 w-4" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-red-500">
                Irreversible actions that will permanently affect your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50/50">
                <div>
                  <p className="text-sm font-medium text-red-700">Delete Account</p>
                  <p className="text-xs text-red-500">
                    Permanently delete your account and all associated data. This cannot be undone.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Delete Account Dialog */}
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent className="border-red-200">
              <DialogHeader>
                <DialogTitle className="text-red-700 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Delete Your Account?
                </DialogTitle>
                <DialogDescription>
                  This action is permanent and cannot be undone. All your data, reviews, responses, and settings will be permanently deleted.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <Label htmlFor="delete-confirm" className="text-sm text-red-700">
                  Type <strong>DELETE</strong> to confirm:
                </Label>
                <Input
                  id="delete-confirm"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE"
                  className="border-red-200"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => { setShowDeleteDialog(false); setDeleteConfirmText("") }} className="border-[#b8dca8]">
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmText !== "DELETE"}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Permanently Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}
