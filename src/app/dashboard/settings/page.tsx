"use client"

import { useEffect, useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Copy,
  Check,
  QrCode,
  Link as LinkIcon,
  Globe,
  MessageSquare,
  Zap,
  ExternalLink,
} from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const business = useBusinessContext()
  const [copied, setCopied] = useState(false)
  const [autoRespond, setAutoRespond] = useState(false)

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

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your business profile and integrations
        </p>
      </div>

      {/* Review Link */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            Your Review Link
          </CardTitle>
          <CardDescription>
            Share this link with customers to collect reviews. Put it on
            receipts, in emails, on table cards - anywhere your customers can
            see it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-50 border rounded-lg px-4 py-2.5 font-mono text-sm">
              {reviewUrl}
            </div>
            <Button onClick={handleCopyLink} variant="outline" className="gap-2">
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href={reviewUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                Preview
              </a>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <QrCode className="h-3.5 w-3.5" />
              Generate QR Code
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              Tips for sharing your review link
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
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
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Profile</CardTitle>
          <CardDescription>
            This information is shown on your review collection page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input defaultValue={business.name} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                defaultValue={business.category
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l: string) => l.toUpperCase())}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>URL Slug</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">/r/</span>
              <Input defaultValue={business.slug} className="flex-1" />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Platform Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Platform Integrations
          </CardTitle>
          <CardDescription>
            Connect your review platforms to post reviews directly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              name: "Google Business Profile",
              icon: "G",
              color: "bg-blue-600",
              description: "Post reviews directly to Google Maps",
              connected: false,
              primary: true,
            },
            {
              name: "Yelp",
              icon: "Y",
              color: "bg-red-600",
              description: "Share reviews on Yelp",
              connected: false,
            },
            {
              name: "Facebook",
              icon: "f",
              color: "bg-blue-700",
              description: "Post to your Facebook Business page",
              connected: false,
            },
            {
              name: "TripAdvisor",
              icon: "T",
              color: "bg-green-600",
              description: "Share on TripAdvisor",
              connected: false,
            },
          ].map((platform) => (
            <div
              key={platform.name}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}
                >
                  {platform.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{platform.name}</p>
                    {platform.primary && (
                      <Badge variant="secondary" className="text-[10px]">
                        Primary
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {platform.description}
                  </p>
                </div>
              </div>
              <Button
                variant={platform.connected ? "outline" : "default"}
                size="sm"
              >
                {platform.connected ? "Connected" : "Connect"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
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
              <p className="text-sm font-medium">Auto-Respond to Reviews</p>
              <p className="text-xs text-muted-foreground">
                Automatically generate and post responses to positive reviews
                (4-5 stars)
              </p>
            </div>
            <Switch
              checked={autoRespond}
              onCheckedChange={setAutoRespond}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                Require Approval for Negative Reviews
              </p>
              <p className="text-xs text-muted-foreground">
                Always require manual approval for responses to 1-3 star reviews
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Response Tone</Label>
            <div className="flex gap-2">
              {["Professional", "Friendly", "Casual"].map((tone) => (
                <button
                  key={tone}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    tone === "Friendly"
                      ? "bg-blue-50 border-blue-300 text-blue-700"
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
