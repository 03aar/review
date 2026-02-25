"use client"

import { useState } from "react"
import { useBusinessContext } from "../layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Copy,
  Image,
  Instagram,
  Facebook,
  Download,
  Code,
  Mail,
  Printer,
  Eye,
  Share2,
  Palette,
  Sun,
  Moon,
  Sparkles,
  Quote,
  Layout,
  Smartphone,
  Monitor,
  Square,
  RectangleVertical,
  CheckCircle2,
} from "lucide-react"
import { toast } from "sonner"

const testimonials = [
  {
    id: "t-1",
    quote: "The best meal I've had in this city",
    author: "Sarah M.",
    rating: 5,
    date: "2026-02-18",
  },
  {
    id: "t-2",
    quote: "They went above and beyond to fix my issue",
    author: "John D.",
    rating: 5,
    date: "2026-02-12",
  },
  {
    id: "t-3",
    quote: "I've been coming here for 10 years and it never disappoints",
    author: "Maria L.",
    rating: 5,
    date: "2026-02-05",
  },
]

type SocialSize = "instagram-square" | "instagram-story" | "facebook-post"

const sizeOptions: { value: SocialSize; label: string; icon: React.ReactNode; dimensions: string }[] = [
  { value: "instagram-square", label: "Instagram Square", icon: <Square className="h-4 w-4" />, dimensions: "1080 x 1080" },
  { value: "instagram-story", label: "Instagram Story", icon: <RectangleVertical className="h-4 w-4" />, dimensions: "1080 x 1920" },
  { value: "facebook-post", label: "Facebook Post", icon: <Monitor className="h-4 w-4" />, dimensions: "1200 x 630" },
]

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  )
}

export default function MarketingPage() {
  const { business } = useBusinessContext()
  const [selectedTestimonial, setSelectedTestimonial] = useState(testimonials[0])
  const [selectedSize, setSelectedSize] = useState<SocialSize>("instagram-square")
  const [widgetTheme, setWidgetTheme] = useState<"light" | "dark">("light")
  const [accentColor, setAccentColor] = useState("#2d6a4f")
  const [showEmbedCode, setShowEmbedCode] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  function handleCopyQuote(testimonial: typeof testimonials[0]) {
    const text = `"${testimonial.quote}" - ${testimonial.author}`
    navigator.clipboard.writeText(text)
    setCopiedId(testimonial.id)
    toast.success("Quote copied to clipboard")
    setTimeout(() => setCopiedId(null), 2000)
  }

  function handleCreateGraphic(testimonial: typeof testimonials[0]) {
    setSelectedTestimonial(testimonial)
    toast.success(`Graphic preview updated for "${testimonial.quote.slice(0, 30)}..."`)
  }

  function handleShareInstagram() {
    toast.success("Instagram share dialog opened", {
      description: "Your review graphic is ready to share on Instagram.",
    })
  }

  function handleShareFacebook() {
    toast.success("Facebook share dialog opened", {
      description: "Your review graphic is ready to share on Facebook.",
    })
  }

  function handleDownloadGraphic() {
    toast.success("Downloading graphic...", {
      description: `${sizeOptions.find((s) => s.value === selectedSize)?.dimensions} PNG file`,
    })
  }

  function handleCopyEmbedCode() {
    const code = getEmbedCode()
    navigator.clipboard.writeText(code)
    toast.success("Embed code copied to clipboard")
  }

  function handleCopyEmailSignature() {
    toast.success("Email signature HTML copied to clipboard", {
      description: "Paste it into your email client's signature settings.",
    })
  }

  function handleDownloadPrintKit() {
    toast.success("Downloading print kit...", {
      description: "Includes table tent and window decal templates as PDF.",
    })
  }

  function getEmbedCode() {
    return `<!-- ReviewForge Widget -->
<div id="reviewforge-widget"></div>
<script src="https://cdn.reviewforge.io/widget.js"
  data-business="${business.slug}"
  data-theme="${widgetTheme}"
  data-accent="${accentColor}"
  data-reviews="5"
  async>
</script>`
  }

  const selectedSizeConfig = sizeOptions.find((s) => s.value === selectedSize)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1a3a2a]">Marketing Toolkit</h1>
        <p className="text-[#5a6b5a]">
          Turn your best reviews into marketing assets for {business.name}
        </p>
      </div>

      {/* Social Proof Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#5a6b5a]">Total 5-Star Reviews</span>
              <Star className="h-5 w-5 text-[#2d6a4f]" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">156</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#5a6b5a]">Testimonials Shared</span>
              <Share2 className="h-5 w-5 text-[#2d6a4f]" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">23</p>
          </CardContent>
        </Card>
        <Card className="border-[#b8dca8]">
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#5a6b5a]">Widget Impressions</span>
              <Eye className="h-5 w-5 text-[#2d6a4f]" />
            </div>
            <p className="text-2xl font-bold text-[#1a3a2a]">12,400</p>
          </CardContent>
        </Card>
      </div>

      {/* Best Testimonials */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Quote className="h-4 w-4" />
            Best Testimonials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#5a6b5a] mb-4">
            Your top 3 most quotable 5-star reviews, ready to use in marketing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`relative border rounded-lg p-5 transition-all ${
                  selectedTestimonial.id === testimonial.id
                    ? "border-[#2d6a4f] bg-[#eef8e6] shadow-sm"
                    : "border-[#b8dca8] bg-white hover:shadow-sm"
                }`}
              >
                <div className="mb-3">
                  <StarRow count={testimonial.rating} />
                </div>
                <blockquote className="text-[#1a3a2a] font-medium text-sm leading-relaxed mb-3">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <p className="text-xs text-[#5a6b5a] mb-4">
                  &mdash; {testimonial.author}
                  <span className="ml-2 text-[#b8dca8]">{testimonial.date}</span>
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 border-[#b8dca8] text-[#2d6a4f] hover:bg-[#d4f0c0] text-xs"
                    onClick={() => handleCopyQuote(testimonial)}
                  >
                    {copiedId === testimonial.id ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copiedId === testimonial.id ? "Copied" : "Copy"}
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1.5 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6] text-xs"
                    onClick={() => handleCreateGraphic(testimonial)}
                  >
                    <Image className="h-3.5 w-3.5" />
                    Create Graphic
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Media Content Generator */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Sparkles className="h-4 w-4" />
            Social Media Content Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Size Selector */}
          <div className="mb-5">
            <p className="text-sm font-medium text-[#1a3a2a] mb-2">Format</p>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedSize(option.value)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                    selectedSize === option.value
                      ? "bg-[#1a3a2a] text-[#e4f5d6] border-[#1a3a2a]"
                      : "bg-white text-[#5a6b5a] border-[#b8dca8] hover:bg-[#eef8e6] hover:text-[#1a3a2a]"
                  }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#5a6b5a] mt-1.5">
              {selectedSizeConfig?.dimensions}px
            </p>
          </div>

          {/* Graphic Preview */}
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1a3a2a] mb-2">Preview</p>
              <div
                className={`border-2 border-dashed border-[#b8dca8] rounded-lg bg-gradient-to-br from-[#1a3a2a] to-[#2d6a4f] flex items-center justify-center ${
                  selectedSize === "instagram-square"
                    ? "aspect-square max-w-sm"
                    : selectedSize === "instagram-story"
                    ? "aspect-[9/16] max-w-[240px]"
                    : "aspect-[1200/630] max-w-lg"
                }`}
              >
                <div className="text-center p-6 w-full">
                  <div className="flex justify-center mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-white font-semibold text-sm sm:text-base leading-relaxed mb-4 px-2">
                    &ldquo;{selectedTestimonial.quote}&rdquo;
                  </blockquote>
                  <p className="text-[#b8dca8] text-xs sm:text-sm">
                    &mdash; {selectedTestimonial.author}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/20">
                    <p className="text-white/80 text-xs font-medium tracking-wide uppercase">
                      {business.name}
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-white/70 text-xs">4.8 on ReviewForge</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Actions */}
            <div className="lg:w-56 flex flex-col gap-3">
              <p className="text-sm font-medium text-[#1a3a2a] mb-1">Share & Download</p>
              <Button
                className="gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white justify-start"
                onClick={handleShareInstagram}
              >
                <Instagram className="h-4 w-4" />
                Share to Instagram
              </Button>
              <Button
                className="gap-2 bg-[#1877F2] hover:bg-[#1565c0] text-white justify-start"
                onClick={handleShareFacebook}
              >
                <Facebook className="h-4 w-4" />
                Share to Facebook
              </Button>
              <Button
                variant="outline"
                className="gap-2 border-[#b8dca8] text-[#2d6a4f] hover:bg-[#d4f0c0] justify-start"
                onClick={handleDownloadGraphic}
              >
                <Download className="h-4 w-4" />
                Download PNG
              </Button>
              <div className="mt-2 p-3 rounded-lg bg-[#eef8e6] border border-[#b8dca8]">
                <p className="text-xs text-[#5a6b5a]">
                  Tip: Use review graphics in your social feed to build trust and attract
                  new customers.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Website Widget */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Code className="h-4 w-4" />
            Website Widget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#5a6b5a] mb-4">
            Embed a live review carousel or rating badge on your website.
          </p>

          <div className="flex flex-col lg:flex-row gap-5">
            {/* Widget Preview */}
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1a3a2a] mb-2">Preview</p>
              <div
                className={`border border-[#b8dca8] rounded-lg p-6 ${
                  widgetTheme === "dark" ? "bg-gray-900" : "bg-white"
                }`}
              >
                {/* Rating Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full"
                    style={{ backgroundColor: accentColor + "20" }}
                  >
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span
                      className={`text-sm font-bold ml-1 ${
                        widgetTheme === "dark" ? "text-white" : "text-[#1a3a2a]"
                      }`}
                    >
                      4.8
                    </span>
                    <span
                      className={`text-xs ${
                        widgetTheme === "dark" ? "text-gray-400" : "text-[#5a6b5a]"
                      }`}
                    >
                      (234 reviews)
                    </span>
                  </div>
                </div>

                {/* Carousel Preview */}
                <div className="flex gap-3 overflow-hidden">
                  {testimonials.slice(0, 2).map((t) => (
                    <div
                      key={t.id}
                      className={`flex-shrink-0 w-64 p-4 rounded-lg border ${
                        widgetTheme === "dark"
                          ? "bg-gray-800 border-gray-700"
                          : "bg-[#eef8e6] border-[#b8dca8]"
                      }`}
                    >
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p
                        className={`text-xs leading-relaxed mb-2 ${
                          widgetTheme === "dark" ? "text-gray-200" : "text-[#1a3a2a]"
                        }`}
                      >
                        &ldquo;{t.quote}&rdquo;
                      </p>
                      <p
                        className={`text-xs ${
                          widgetTheme === "dark" ? "text-gray-500" : "text-[#5a6b5a]"
                        }`}
                      >
                        &mdash; {t.author}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-1">
                  <span
                    className={`text-[10px] ${
                      widgetTheme === "dark" ? "text-gray-500" : "text-[#b8dca8]"
                    }`}
                  >
                    Powered by
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${
                      widgetTheme === "dark" ? "text-gray-400" : "text-[#5a6b5a]"
                    }`}
                  >
                    ReviewForge
                  </span>
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="lg:w-64 space-y-4">
              <p className="text-sm font-medium text-[#1a3a2a]">Customize</p>

              {/* Theme Toggle */}
              <div>
                <label className="text-xs font-medium text-[#5a6b5a] mb-1.5 block">
                  Theme
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setWidgetTheme("light")}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      widgetTheme === "light"
                        ? "bg-[#1a3a2a] text-[#e4f5d6] border-[#1a3a2a]"
                        : "bg-white text-[#5a6b5a] border-[#b8dca8] hover:bg-[#eef8e6]"
                    }`}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </button>
                  <button
                    onClick={() => setWidgetTheme("dark")}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                      widgetTheme === "dark"
                        ? "bg-[#1a3a2a] text-[#e4f5d6] border-[#1a3a2a]"
                        : "bg-white text-[#5a6b5a] border-[#b8dca8] hover:bg-[#eef8e6]"
                    }`}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </button>
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <label className="text-xs font-medium text-[#5a6b5a] mb-1.5 block">
                  Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-[#b8dca8] cursor-pointer"
                  />
                  <span className="text-xs text-[#5a6b5a] font-mono">{accentColor}</span>
                </div>
              </div>

              {/* Embed Button */}
              <div className="pt-2 space-y-2">
                <Button
                  className="gap-2 w-full bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
                  onClick={() => setShowEmbedCode(!showEmbedCode)}
                >
                  <Code className="h-4 w-4" />
                  {showEmbedCode ? "Hide Embed Code" : "Get Embed Code"}
                </Button>
                {showEmbedCode && (
                  <Button
                    variant="outline"
                    className="gap-2 w-full border-[#b8dca8] text-[#2d6a4f] hover:bg-[#d4f0c0]"
                    onClick={handleCopyEmbedCode}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Embed Code Block */}
          {showEmbedCode && (
            <div className="mt-5">
              <pre className="bg-[#1a3a2a] text-[#b8dca8] text-xs rounded-lg p-4 overflow-x-auto leading-relaxed">
                <code>{getEmbedCode()}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Signature Generator */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Mail className="h-4 w-4" />
            Email Signature Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#5a6b5a] mb-4">
            Add your review rating to every email you send.
          </p>

          {/* Signature Preview */}
          <div className="border border-[#b8dca8] rounded-lg p-5 bg-white max-w-md mb-4">
            <div className="border-t-2 border-[#b8dca8] pt-3">
              <p className="text-sm font-semibold text-[#1a3a2a]">{business.name}</p>
              <p className="text-xs text-[#5a6b5a] mt-0.5">
                reviewforge.io/{business.slug}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-[#eef8e6] border border-[#b8dca8] rounded-full px-2.5 py-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#1a3a2a] ml-0.5">4.8</span>
                </div>
                <span className="text-[10px] text-[#5a6b5a]">
                  234 reviews on ReviewForge
                </span>
              </div>
            </div>
          </div>

          <Button
            className="gap-2 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
            onClick={handleCopyEmailSignature}
          >
            <Copy className="h-4 w-4" />
            Copy HTML
          </Button>
        </CardContent>
      </Card>

      {/* Print Materials */}
      <Card className="border-[#b8dca8]">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#1a3a2a]">
            <Printer className="h-4 w-4" />
            Print Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#5a6b5a] mb-4">
            Physical marketing materials featuring your reviews and rating.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {/* Table Tent Preview */}
            <div className="border border-[#b8dca8] rounded-lg overflow-hidden bg-white">
              <div className="bg-gradient-to-b from-[#1a3a2a] to-[#2d6a4f] p-6 text-center">
                <p className="text-white/70 text-[10px] uppercase tracking-widest mb-2">
                  What our customers say
                </p>
                <div className="flex justify-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-white text-xs font-medium leading-relaxed mb-2">
                  &ldquo;{testimonials[0].quote}&rdquo;
                </p>
                <p className="text-[#b8dca8] text-[10px]">
                  &mdash; {testimonials[0].author}
                </p>
                <div className="mt-3 pt-2 border-t border-white/20">
                  <p className="text-white/80 text-[10px] font-medium">
                    Scan to leave a review
                  </p>
                  <div className="w-14 h-14 mx-auto mt-2 bg-white rounded-md flex items-center justify-center">
                    <Layout className="h-8 w-8 text-[#1a3a2a]" />
                  </div>
                </div>
              </div>
              <div className="p-3 text-center">
                <Badge
                  variant="outline"
                  className="text-[#5a6b5a] border-[#b8dca8] text-xs"
                >
                  Table Tent - 4&quot; x 6&quot;
                </Badge>
              </div>
            </div>

            {/* Window Decal Preview */}
            <div className="border border-[#b8dca8] rounded-lg overflow-hidden bg-white">
              <div className="bg-white p-6 text-center border-4 border-dashed border-[#d4f0c0] m-3 rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 bg-[#1a3a2a] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <p className="text-[#1a3a2a] text-xs font-bold mb-1">
                  {business.name}
                </p>
                <div className="flex justify-center mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-[#1a3a2a] text-lg font-bold">4.8</p>
                <p className="text-[#5a6b5a] text-[10px]">
                  Rated Excellent on ReviewForge
                </p>
                <p className="text-[#5a6b5a] text-[10px] mt-1">
                  Based on 234 verified reviews
                </p>
              </div>
              <div className="p-3 text-center">
                <Badge
                  variant="outline"
                  className="text-[#5a6b5a] border-[#b8dca8] text-xs"
                >
                  Window Decal - 5&quot; x 5&quot;
                </Badge>
              </div>
            </div>
          </div>

          <Button
            className="gap-2 bg-[#1a3a2a] hover:bg-[#0f2a1c] text-[#e4f5d6]"
            onClick={handleDownloadPrintKit}
          >
            <Download className="h-4 w-4" />
            Download Print Kit
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
