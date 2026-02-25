"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Mic,
  Send,
  BarChart3,
  ArrowRight,
  MessageSquare,
  Star,
  Zap,
  Shield,
  Globe,
  Check,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  ChevronRight,
  ArrowUpRight,
  Smartphone,
  Languages,
  Wand2,
  ThumbsUp,
  Copy,
  CalendarClock,
  Target,
  Brain,
  Lock,
  FileText,
  LineChart,
  PieChart,
  Activity,
  Bell,
  Mail,
  QrCode,
  Nfc,
  Timer,
  TestTubes,
  LayoutDashboard,
  Workflow,
  AlertTriangle,
  Palette,
  ShieldCheck,
  Server,
  Eye,
  Utensils,
  Stethoscope,
  Car,
  ShoppingBag,
  BadgeCheck,
  Plug,
} from "lucide-react"

const font = { fontFamily: "var(--font-display)" }

export default function FeaturesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FFF8F0] overflow-hidden">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-[#1a2e1a] focus:text-[#FFF8F0] focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to content
      </a>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-[#1a2e1a]/5"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg" style={font}>R</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-[#1a2e1a]" style={font}>ReviewForge</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm font-medium text-[#1a2e1a] transition-colors">Features</Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors">How it works</Link>
            <Link href="/#pricing" className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="hidden sm:inline-flex text-sm font-medium text-[#1a2e1a] px-4 py-2">Sign In</Link>
            <Link
              href="/register"
              className="hidden sm:inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a]"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#1a2e1a]/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <span className={`block h-0.5 w-5 bg-[#1a2e1a] transition-all duration-200 ${mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
                <span className={`block h-0.5 w-5 bg-[#1a2e1a] transition-all duration-200 ${mobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFF8F0] border-t border-[#1a2e1a]/10 px-4 py-4 space-y-3">
            <Link href="/features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#1a2e1a] py-2">Features</Link>
            <Link href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2">How it works</Link>
            <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2">Pricing</Link>
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="text-sm font-medium text-[#1a2e1a] px-4 py-2">Sign In</Link>
              <Link href="/register" className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-2.5 rounded-full text-sm font-semibold">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ==================== HERO ==================== */}
      <section id="main-content" className="relative pt-28 pb-20 md:pt-40 md:pb-32 bg-[#FFF8F0]">
        {/* Floating shapes */}
        <div className="absolute top-32 left-[8%] w-20 h-20 bg-[#FFE566] rounded-full opacity-60" />
        <div className="absolute top-48 right-[10%] w-16 h-16 bg-[#FFB5B5] rounded-2xl opacity-60 rotate-12" />
        <div className="absolute bottom-40 left-[15%] w-12 h-12 bg-[#D4CCFF] rounded-xl opacity-60 -rotate-12" />
        <div className="absolute top-64 right-[20%] w-8 h-8 bg-[#C8F5D4] rounded-full opacity-50" />
        <div className="absolute bottom-60 right-[8%] w-14 h-14 bg-[#FFDAB5] rounded-2xl opacity-50 rotate-6" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-5 py-2 rounded-full text-sm font-semibold mb-8 border-2 border-[#1a2e1a]">
              <Sparkles className="h-4 w-4" /> FEATURES
            </div>

            <h1 className="mb-8" style={font}>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-[#1a2e1a] tracking-tight leading-[1.05]">EVERYTHING YOU</span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
                <span className="text-[#1a2e1a]">NEED TO{" "}</span>
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#1a2e1a]">OWN</span>
                  <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#FFE566] -z-0 rounded-sm" />
                </span>
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-[#1a2e1a] tracking-tight leading-[1.05]">
                YOUR{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">REPUTATION</span>
                  <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#C8F5D4] -z-0 rounded-sm" />
                </span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              The complete review management platform. From voice capture to AI-powered responses, ReviewForge gives you every tool to build, protect, and grow your online reputation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-3 bg-[#1a2e1a] text-[#FFF8F0] px-8 py-4 rounded-full text-base font-bold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                Start Free <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-3 bg-[#FFF8F0] text-[#1a2e1a] px-8 py-4 rounded-full text-base font-bold border-2 border-[#1a2e1a] hover:bg-[#C8F5D4] transition-all shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#1a2e1a] py-4 border-y-2 border-[#1a2e1a] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-8 mr-8">
              {["VOICE CAPTURE", "AI REVIEWS", "MULTI-PLATFORM", "SMART ANALYTICS", "AUTO-RESPOND", "SENTIMENT TRACKING", "ONE-TAP POSTING", "QR TRIGGERS"].map((t) => (
                <span key={`${i}-${t}`} className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-[#FFE566] fill-[#FFE566]" />
                  <span className="text-[#FFF8F0] text-sm font-bold tracking-widest uppercase" style={font}>{t}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ==================== A. VOICE-FIRST REVIEW CAPTURE ==================== */}
      <section className="py-20 md:py-28 bg-[#FFF8F0]" id="voice-capture">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <Mic className="h-3.5 w-3.5" /> Voice Capture
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4" style={font}>
              VOICE-FIRST REVIEW CAPTURE
            </h2>
            <p className="text-lg text-[#1a2e1a]/60 max-w-2xl mx-auto">
              Customers speak for 8 seconds, and a complete review appears. No typing, no app downloads, no friction.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Feature Details */}
            <div className="space-y-6">
              {[
                { icon: Clock, title: "8-Second Capture Flow", desc: "From tap to posted review in under 8 seconds. The fastest review process in the industry.", color: "#C8F5D4" },
                { icon: Smartphone, title: "No App Download Needed", desc: "Works directly in any mobile browser. Customers never leave the page or install anything.", color: "#C8F5D4" },
                { icon: Globe, title: "Works on Any Device", desc: "iOS, Android, desktop, tablet. If it has a browser and a microphone, it works.", color: "#C8F5D4" },
                { icon: Mic, title: "Microphone + Voice-to-Text", desc: "One tap to start recording. Advanced speech recognition captures every word accurately.", color: "#C8F5D4" },
                { icon: Brain, title: "AI-Powered Transcription", desc: "Not just transcription: intelligent understanding of context, names, dishes, and services mentioned.", color: "#C8F5D4" },
                { icon: Languages, title: "Multiple Language Support", desc: "Capture reviews in English, Spanish, French, German, Japanese, and 20+ more languages.", color: "#C8F5D4" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 border-[#1a2e1a]"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.icon className="h-5 w-5 text-[#1a2e1a]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1a2e1a] mb-1" style={font}>{item.title}</h3>
                    <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Mockup Card */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="bg-[#C8F5D4]/30 rounded-2xl p-6 border-2 border-[#1a2e1a]/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm" style={font}>R</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a2e1a]" style={font}>ReviewForge</p>
                    <p className="text-xs text-[#1a2e1a]/40">Voice Review Capture</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-[#1a2e1a]/10 mb-4">
                  <p className="text-sm text-[#1a2e1a]/60 mb-3">How was your experience today?</p>
                  <div className="flex items-center justify-center py-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-[#C8F5D4] rounded-full flex items-center justify-center border-2 border-[#1a2e1a] animate-pulse">
                        <Mic className="h-8 w-8 text-[#1a2e1a]" />
                      </div>
                      <div className="absolute -inset-3 rounded-full border-2 border-[#C8F5D4] opacity-50 animate-ping" />
                    </div>
                  </div>
                  <p className="text-center text-xs text-[#1a2e1a]/40 font-medium">Tap to speak your review</p>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-6 w-6 text-[#FFE566] fill-[#FFE566]" />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-[#1a2e1a]/30">
                  <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> Secure &amp; Private</span>
                  <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> No app needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== B. AI REVIEW GENERATION ==================== */}
      <section className="py-20 md:py-28 bg-[#FFE566]/20" id="ai-generation">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <Wand2 className="h-3.5 w-3.5" /> AI Generation
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4" style={font}>
              AI REVIEW GENERATION
            </h2>
            <p className="text-lg text-[#1a2e1a]/60 max-w-2xl mx-auto">
              Our AI transforms rough voice recordings into polished, authentic reviews that still sound exactly like your customer.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Feature list */}
            <div className="space-y-6">
              {[
                { icon: Sparkles, title: "Voice-to-Review Transformation", desc: "Advanced AI understands context, not just words. It knows that 'the pasta was fire' means something wonderful.", color: "#FFE566" },
                { icon: ThumbsUp, title: "Preserves Customer Personality", desc: "A casual speaker stays casual. A detailed reviewer stays detailed. The AI adapts to each person's natural voice.", color: "#FFE566" },
                { icon: Wand2, title: "Adds Detail and Polish", desc: "Fills in specifics like 'attentive service' from 'our waiter was nice' while keeping the authentic meaning.", color: "#FFE566" },
                { icon: Copy, title: "Multiple Review Styles", desc: "Generate short punchy reviews, detailed narratives, or structured formats to match different platforms.", color: "#FFE566" },
                { icon: Target, title: "Platform-Specific Formatting", desc: "Optimized length and format for Google (300 chars ideal), Yelp (longer narratives), Facebook (casual tone).", color: "#FFE566" },
                { icon: ShieldCheck, title: "Customer Approval Before Posting", desc: "Every AI-generated review is shown to the customer for approval. They can edit, regenerate, or post as-is.", color: "#FFE566" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 border-[#1a2e1a]"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.icon className="h-5 w-5 text-[#1a2e1a]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1a2e1a] mb-1" style={font}>{item.title}</h3>
                    <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Before/After */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#FFB5B5] border-2 border-[#1a2e1a] flex items-center justify-center">
                    <Mic className="h-5 w-5 text-[#1a2e1a]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a2e1a] text-sm" style={font}>CUSTOMER SAYS</p>
                    <p className="text-xs text-[#1a2e1a]/40">3 seconds of speaking</p>
                  </div>
                </div>
                <div className="bg-[#FFF8F0] rounded-2xl p-5 border-2 border-[#1a2e1a]/10">
                  <p className="text-[#1a2e1a]/70 italic leading-relaxed">
                    &ldquo;Yeah it was great, food was really good and Jake our waiter was super nice&rdquo;
                  </p>
                </div>
                <div className="flex gap-1 mt-4">
                  {[0, 1, 2].map((i) => <div key={i} className="h-1.5 flex-1 rounded-full bg-[#FFB5B5]" />)}
                  {[0, 1].map((i) => <div key={i} className="h-1.5 flex-1 rounded-full bg-[#1a2e1a]/10" />)}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#FFE566] border-2 border-[#1a2e1a] flex items-center justify-center shadow-[2px_2px_0px_0px_#1a2e1a]">
                  <Zap className="h-5 w-5 text-[#1a2e1a]" />
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#C8F5D4] border-2 border-[#1a2e1a] flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-[#1a2e1a]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a2e1a] text-sm" style={font}>REVIEWFORGE GENERATES</p>
                    <p className="text-xs text-[#1a2e1a]/40">Instant AI transformation</p>
                  </div>
                </div>
                <div className="bg-[#C8F5D4]/30 rounded-2xl p-5 border-2 border-[#2d6a4f]/20">
                  <p className="text-[#1a2e1a] leading-relaxed">
                    &ldquo;Had an excellent dinner here last night. The food was genuinely impressive &mdash; every dish was fresh and flavorful. Our waiter Jake went out of his way to make sure everything was perfect. Attentive without hovering, and his recommendations were spot-on. We&apos;ll definitely be back soon.&rdquo;
                  </p>
                </div>
                <div className="flex gap-1 mt-4">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5 text-[#FFE566] fill-[#FFE566]" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== C. MULTI-PLATFORM DISTRIBUTION ==================== */}
      <section className="py-20 md:py-28 bg-[#FFB5B5]/15" id="multi-platform">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#FFB5B5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <Globe className="h-3.5 w-3.5" /> Distribution
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4" style={font}>
              MULTI-PLATFORM DISTRIBUTION
            </h2>
            <p className="text-lg text-[#1a2e1a]/60 max-w-2xl mx-auto">
              One review, every platform. Post to Google, Yelp, Facebook, and TripAdvisor with a single tap.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Platform Grid */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <p className="text-sm font-bold text-[#1a2e1a]/40 uppercase tracking-widest mb-6" style={font}>Supported Platforms</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Google Business", icon: Star, color: "#C8F5D4", status: "Live" },
                  { name: "Yelp", icon: MessageSquare, color: "#FFB5B5", status: "Live" },
                  { name: "Facebook", icon: ThumbsUp, color: "#D4CCFF", status: "Live" },
                  { name: "TripAdvisor", icon: Globe, color: "#FFE566", status: "Live" },
                ].map((platform) => (
                  <div
                    key={platform.name}
                    className="rounded-2xl p-5 border-2 border-[#1a2e1a]/10 hover:border-[#1a2e1a] transition-all"
                    style={{ backgroundColor: `${platform.color}30` }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border-2 border-[#1a2e1a] mb-3"
                      style={{ backgroundColor: platform.color }}
                    >
                      <platform.icon className="h-5 w-5 text-[#1a2e1a]" />
                    </div>
                    <p className="text-sm font-bold text-[#1a2e1a]" style={font}>{platform.name}</p>
                    <span className="inline-flex items-center gap-1 mt-1 text-xs text-[#2d6a4f] font-medium">
                      <Check className="h-3 w-3" /> {platform.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#1a2e1a]/40 font-medium">
                <Sparkles className="h-3.5 w-3.5" /> More platforms added quarterly
              </div>
            </div>

            {/* Right: Feature list */}
            <div className="space-y-6">
              {[
                { icon: Send, title: "One-Tap Posting to All Platforms", desc: "Customer approves once, the review goes everywhere. No repetitive copy-paste across sites.", color: "#FFB5B5" },
                { icon: Target, title: "Platform-Specific Optimization", desc: "Each review is automatically adjusted for the ideal length, tone, and format for each platform.", color: "#FFB5B5" },
                { icon: CalendarClock, title: "Scheduled Posting", desc: "Spread reviews across time to look natural. No suspicious burst of 20 reviews in one hour.", color: "#FFB5B5" },
                { icon: Activity, title: "Posting Status Tracking", desc: "Real-time visibility into which reviews posted successfully and which need attention.", color: "#FFB5B5" },
                { icon: BarChart3, title: "Platform Performance Analytics", desc: "See which platforms drive the most traffic, calls, and conversions for your business.", color: "#FFB5B5" },
                { icon: Bell, title: "Smart Notifications", desc: "Get alerted when reviews go live, when they need moderation, or when a platform needs re-authentication.", color: "#FFB5B5" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 border-[#1a2e1a]"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.icon className="h-5 w-5 text-[#1a2e1a]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1a2e1a] mb-1" style={font}>{item.title}</h3>
                    <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== D. AI RESPONSE ENGINE ==================== */}
      <section className="py-20 md:py-28 bg-[#D4CCFF]/15" id="ai-responses">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <MessageSquare className="h-3.5 w-3.5" /> AI Responses
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4" style={font}>
              AI RESPONSE ENGINE
            </h2>
            <p className="text-lg text-[#1a2e1a]/60 max-w-2xl mx-auto">
              Every review deserves a reply. Our AI crafts personalized, on-brand responses in seconds, not hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Feature list */}
            <div className="space-y-6">
              {[
                { icon: Zap, title: "Auto-Respond to Reviews", desc: "Set it to autopilot or approval mode. AI responds to new reviews within minutes, 24/7.", color: "#D4CCFF" },
                { icon: Sparkles, title: "Personalized AI Responses", desc: "Not generic templates. Each response references specific details from the customer's review.", color: "#D4CCFF" },
                { icon: Palette, title: "Tone and Style Matching", desc: "Configure your brand voice: professional, friendly, casual, or formal. The AI adapts to your identity.", color: "#D4CCFF" },
                { icon: FileText, title: "Response Templates", desc: "Create reusable templates for common scenarios that the AI personalizes for each review.", color: "#D4CCFF" },
                { icon: Workflow, title: "Approval Workflow", desc: "Route responses through team members for approval before posting. Full audit trail included.", color: "#D4CCFF" },
                { icon: LineChart, title: "Response Analytics", desc: "Track response times, sentiment impact, and which responses drive the most customer engagement.", color: "#D4CCFF" },
                { icon: AlertTriangle, title: "Negative Review Routing", desc: "Automatically escalate negative reviews to managers. Convert complaints into recovery opportunities.", color: "#D4CCFF" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 border-[#1a2e1a]"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.icon className="h-5 w-5 text-[#1a2e1a]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1a2e1a] mb-1" style={font}>{item.title}</h3>
                    <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Response Mockup */}
            <div className="space-y-4">
              {/* Incoming review */}
              <div className="bg-white rounded-3xl p-6 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#FFE566] border-2 border-[#1a2e1a] flex items-center justify-center">
                    <span className="text-sm font-bold text-[#1a2e1a]">M</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a2e1a]">Maria G.</p>
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-3 w-3 text-[#FFE566] fill-[#FFE566]" />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-xs text-[#1a2e1a]/30">2 min ago</span>
                </div>
                <p className="text-sm text-[#1a2e1a]/70 leading-relaxed">
                  &ldquo;Amazing experience! The team was so professional and the results exceeded my expectations. Will definitely recommend to friends.&rdquo;
                </p>
              </div>

              {/* AI Response */}
              <div className="bg-[#D4CCFF]/30 rounded-3xl p-6 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#D4CCFF] border-2 border-[#1a2e1a] flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-[#1a2e1a]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a2e1a]" style={font}>AI-Generated Response</p>
                    <p className="text-xs text-[#1a2e1a]/40">Ready in 3 seconds</p>
                  </div>
                </div>
                <p className="text-sm text-[#1a2e1a]/70 leading-relaxed">
                  &ldquo;Thank you so much, Maria! We&apos;re thrilled to hear the team exceeded your expectations. Delivering professional, high-quality results is what we strive for with every client. We truly appreciate your recommendation and look forward to seeing you again!&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t-2 border-[#1a2e1a]/10">
                  <button className="inline-flex items-center gap-1.5 bg-[#1a2e1a] text-[#FFF8F0] px-4 py-2 rounded-full text-xs font-bold">
                    <Check className="h-3 w-3" /> Approve &amp; Post
                  </button>
                  <button className="inline-flex items-center gap-1.5 bg-white text-[#1a2e1a] px-4 py-2 rounded-full text-xs font-bold border-2 border-[#1a2e1a]/20">
                    <Wand2 className="h-3 w-3" /> Regenerate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== E. ANALYTICS & INTELLIGENCE ==================== */}
      <section className="py-20 md:py-28 bg-[#FFDAB5]/15" id="analytics">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#FFDAB5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <BarChart3 className="h-3.5 w-3.5" /> Analytics
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4" style={font}>
              ANALYTICS &amp; INTELLIGENCE
            </h2>
            <p className="text-lg text-[#1a2e1a]/60 max-w-2xl mx-auto">
              Go beyond star ratings. Understand what customers love, what needs fixing, and how you compare to competitors.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Mini dashboard mockups */}
            <div className="space-y-6">
              {/* Sentiment Chart Card */}
              <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-[#1a2e1a]" style={font}>Sentiment Analysis</p>
                  <span className="text-xs text-[#1a2e1a]/40">Last 30 days</span>
                </div>
                <div className="flex items-end gap-2 h-32">
                  {[65, 72, 80, 75, 88, 92, 85, 90, 95, 88, 93, 97].map((val, i) => (
                    <div key={i} className="flex-1 rounded-t-lg" style={{ height: `${val}%`, backgroundColor: val > 85 ? "#C8F5D4" : val > 70 ? "#FFE566" : "#FFB5B5" }} />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-[#1a2e1a]/30">
                  <span>Jan</span>
                  <span>Dec</span>
                </div>
              </div>

              {/* Mini Stat Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a]">
                  <PieChart className="h-5 w-5 text-[#FFDAB5] mb-2" />
                  <p className="text-2xl font-bold text-[#1a2e1a]" style={font}>94%</p>
                  <p className="text-xs text-[#1a2e1a]/40 mt-1">Positive Sentiment</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a]">
                  <TrendingUp className="h-5 w-5 text-[#C8F5D4] mb-2" />
                  <p className="text-2xl font-bold text-[#1a2e1a]" style={font}>+340%</p>
                  <p className="text-xs text-[#1a2e1a]/40 mt-1">Review Volume</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a]">
                  <Users className="h-5 w-5 text-[#D4CCFF] mb-2" />
                  <p className="text-2xl font-bold text-[#1a2e1a]" style={font}>Jake M.</p>
                  <p className="text-xs text-[#1a2e1a]/40 mt-1">Top Mentioned Staff</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a]">
                  <LineChart className="h-5 w-5 text-[#FFB5B5] mb-2" />
                  <p className="text-2xl font-bold text-[#1a2e1a]" style={font}>$12.4k</p>
                  <p className="text-xs text-[#1a2e1a]/40 mt-1">Monthly ROI</p>
                </div>
              </div>
            </div>

            {/* Right: Feature list */}
            <div className="space-y-6">
              {[
                { icon: Brain, title: "Sentiment Analysis", desc: "AI reads every review and categorizes sentiment at the topic level. Know which menu items, staff, or services get praise.", color: "#FFDAB5" },
                { icon: TrendingUp, title: "Trend Tracking", desc: "Spot emerging patterns before they become problems. See sentiment shifts week over week across all locations.", color: "#FFDAB5" },
                { icon: Eye, title: "Competitor Monitoring", desc: "Track competitor reviews, ratings, and sentiment. Benchmark your performance against local rivals.", color: "#FFDAB5" },
                { icon: Users, title: "Staff Insights", desc: "See which team members get mentioned most, track their impact on ratings, and reward top performers.", color: "#FFDAB5" },
                { icon: LineChart, title: "ROI Tracking", desc: "Connect reviews to revenue. See how rating improvements translate to calls, visits, and bookings.", color: "#FFDAB5" },
                { icon: FileText, title: "Custom Reports", desc: "Build custom reports for stakeholders. Schedule weekly or monthly delivery to any email address.", color: "#FFDAB5" },
                { icon: LayoutDashboard, title: "Real-Time Dashboard", desc: "Live overview of all review activity, sentiment scores, response rates, and KPIs in one beautiful dashboard.", color: "#FFDAB5" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 border-[#1a2e1a]"
                    style={{ backgroundColor: item.color }}
                  >
                    <item.icon className="h-5 w-5 text-[#1a2e1a]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1a2e1a] mb-1" style={font}>{item.title}</h3>
                    <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== F. SMART TRIGGERS & CAMPAIGNS ==================== */}
      <section className="py-20 md:py-28 bg-[#C8F5D4]/15" id="triggers">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <Zap className="h-3.5 w-3.5" /> Triggers &amp; Campaigns
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4" style={font}>
              SMART TRIGGERS &amp; CAMPAIGNS
            </h2>
            <p className="text-lg text-[#1a2e1a]/60 max-w-2xl mx-auto">
              Reach customers at the perfect moment. SMS, QR codes, NFC, email, and POS integrations that drive review collection on autopilot.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, title: "SMS Requests", desc: "Automated text messages sent at the optimal time after a visit or purchase. 45% open rate.", color: "#C8F5D4" },
              { icon: QrCode, title: "QR Codes", desc: "Printable QR codes for tables, receipts, business cards, and signage. Custom branded designs.", color: "#FFE566" },
              { icon: Nfc, title: "NFC Tap", desc: "Tap-to-review NFC stickers and cards. Customers just tap their phone to start reviewing.", color: "#FFB5B5" },
              { icon: Mail, title: "Email Campaigns", desc: "Beautiful review request emails with customizable templates and automated follow-up sequences.", color: "#D4CCFF" },
              { icon: Plug, title: "POS Integration", desc: "Automatically trigger review requests after transactions in Square, Toast, Clover, and more.", color: "#FFDAB5" },
              { icon: Timer, title: "Smart Timing", desc: "AI learns the best time to ask each customer. Dinner guests get asked the next morning, not at midnight.", color: "#C8F5D4" },
              { icon: Activity, title: "Drip Campaigns", desc: "Multi-touch sequences that follow up with non-responders. Gentle nudges that convert without annoying.", color: "#FFE566" },
              { icon: TestTubes, title: "A/B Testing", desc: "Test different messages, timing, and channels to find what drives the most reviews for your business.", color: "#FFB5B5" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]"
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon className="h-6 w-6 text-[#1a2e1a]" />
                </div>
                <h3 className="text-lg font-bold text-[#1a2e1a] mb-2" style={font}>{item.title}</h3>
                <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INTEGRATION GRID ==================== */}
      <section className="py-20 md:py-28 bg-[#1a2e1a] relative overflow-hidden" id="integrations">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-48 h-48 bg-[#C8F5D4]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-[10%] w-56 h-56 bg-[#FFE566]/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <Plug className="h-3.5 w-3.5" /> Integrations
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#FFF8F0] mb-4" style={font}>
              CONNECTS WITH YOUR STACK
            </h2>
            <p className="text-lg text-[#FFF8F0]/50 max-w-2xl mx-auto">
              ReviewForge integrates with the tools you already use. Plug in and start collecting reviews instantly.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Google", icon: Star, color: "#C8F5D4" },
              { name: "Yelp", icon: MessageSquare, color: "#FFB5B5" },
              { name: "Facebook", icon: ThumbsUp, color: "#D4CCFF" },
              { name: "TripAdvisor", icon: Globe, color: "#FFE566" },
              { name: "Stripe", icon: Zap, color: "#FFDAB5" },
              { name: "Slack", icon: MessageSquare, color: "#C8F5D4" },
              { name: "Zapier", icon: Workflow, color: "#FFE566" },
              { name: "HubSpot", icon: Target, color: "#FFB5B5" },
              { name: "Mailchimp", icon: Mail, color: "#D4CCFF" },
              { name: "Square POS", icon: LayoutDashboard, color: "#FFDAB5" },
              { name: "Toast POS", icon: Utensils, color: "#C8F5D4" },
              { name: "Clover", icon: ShoppingBag, color: "#FFE566" },
            ].map((integration) => (
              <div
                key={integration.name}
                className="bg-[#FFF8F0] rounded-2xl p-5 border-2 border-[#1a2e1a]/20 hover:border-[#FFF8F0] transition-all text-center group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 border-2 border-[#1a2e1a] group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: integration.color }}
                >
                  <integration.icon className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <p className="text-sm font-bold text-[#1a2e1a]" style={font}>{integration.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== USE CASES ==================== */}
      <section className="py-20 md:py-28 bg-[#FFF8F0]" id="use-cases">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <Users className="h-3.5 w-3.5" /> Use Cases
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4" style={font}>
              BUILT FOR EVERY INDUSTRY
            </h2>
            <p className="text-lg text-[#1a2e1a]/60 max-w-2xl mx-auto">
              From restaurants to dental offices, ReviewForge adapts to any business that depends on customer reviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Utensils,
                title: "Restaurants & Hospitality",
                color: "#C8F5D4",
                examples: [
                  "QR codes on table tents and receipts",
                  "Post-meal SMS review requests",
                  "Menu item sentiment tracking",
                  "Staff performance by shift",
                ],
                metric: "17x more reviews",
                metricDesc: "vs traditional methods",
              },
              {
                icon: Stethoscope,
                title: "Healthcare & Dental",
                color: "#D4CCFF",
                examples: [
                  "HIPAA-compliant review capture",
                  "Waiting room NFC tap stations",
                  "Post-appointment email campaigns",
                  "Provider-level analytics",
                ],
                metric: "4.8 avg rating",
                metricDesc: "across dental clients",
              },
              {
                icon: Car,
                title: "Automotive & Services",
                color: "#FFE566",
                examples: [
                  "Service completion SMS triggers",
                  "Technician-specific review routing",
                  "Before/after photo integration",
                  "Competitive benchmarking",
                ],
                metric: "52% conversion",
                metricDesc: "from service to review",
              },
              {
                icon: ShoppingBag,
                title: "Retail & E-commerce",
                color: "#FFB5B5",
                examples: [
                  "Post-purchase email sequences",
                  "In-store QR code displays",
                  "Product-specific review routing",
                  "Multi-location dashboards",
                ],
                metric: "+340% volume",
                metricDesc: "review collection increase",
              },
            ].map((useCase) => (
              <div
                key={useCase.title}
                className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]"
                  style={{ backgroundColor: useCase.color }}
                >
                  <useCase.icon className="h-6 w-6 text-[#1a2e1a]" />
                </div>
                <h3 className="text-lg font-bold text-[#1a2e1a] mb-4" style={font}>{useCase.title}</h3>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {useCase.examples.map((example) => (
                    <li key={example} className="text-sm text-[#1a2e1a]/50 flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t-2 border-[#1a2e1a]/10">
                  <p className="text-2xl font-bold text-[#1a2e1a]" style={font}>{useCase.metric}</p>
                  <p className="text-xs text-[#1a2e1a]/40 mt-1">{useCase.metricDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECURITY & COMPLIANCE ==================== */}
      <section className="py-12 bg-[#1a2e1a] border-y-2 border-[#1a2e1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { icon: ShieldCheck, label: "SOC 2 Type II" },
              { icon: Globe, label: "GDPR Compliant" },
              { icon: Shield, label: "CCPA Compliant" },
              { icon: Lock, label: "AES-256 Encryption" },
              { icon: Server, label: "99.99% Uptime" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF8F0]/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-[#C8F5D4]" />
                </div>
                <span className="text-sm font-bold text-[#FFF8F0]/70 tracking-wide" style={font}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-20 md:py-28 bg-[#1a2e1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] w-40 h-40 bg-[#C8F5D4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[10%] w-48 h-48 bg-[#FFE566]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4CCFF]/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border-2 border-[#1a2e1a]">
            Ready to start?
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#FFF8F0] mb-6 leading-tight" style={font}>
            READY TO TRANSFORM YOUR REVIEWS?
          </h2>
          <p className="text-lg text-[#FFF8F0]/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 2,000+ businesses already using ReviewForge to capture the silent majority. Start for free, see results in your first week.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-3 bg-[#FFE566] text-[#1a2e1a] px-8 py-4 rounded-full text-base font-bold hover:bg-[#FFD700] transition-all border-2 border-[#FFE566] shadow-[4px_4px_0px_0px_rgba(255,229,102,0.3)]"
            >
              Get Started Free <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[#FFF8F0]/60 hover:text-[#FFF8F0] transition-colors text-sm font-medium"
            >
              Already have an account? <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-[#FFF8F0]/30 font-medium">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#C8F5D4]" /> No credit card needed</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#C8F5D4]" /> 2 min setup</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#C8F5D4]" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#FFF8F0] border-t-2 border-[#1a2e1a] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg" style={font}>R</span>
                </div>
                <span className="text-xl font-bold text-[#1a2e1a]" style={font}>ReviewForge</span>
              </Link>
              <p className="text-sm text-[#1a2e1a]/40 leading-relaxed">
                Your happy customers have a lot to say. We help them say it.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4" style={font}>Product</h4>
              <ul className="space-y-3">
                {[
                  { label: "Features", href: "/features" },
                  { label: "Pricing", href: "/#pricing" },
                  { label: "How it works", href: "/#how-it-works" },
                  { label: "Integrations", href: "/features#integrations" },
                ].map((i) => (
                  <li key={i.label}>
                    <Link href={i.href} className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">{i.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4" style={font}>Company</h4>
              <ul className="space-y-3">
                {["About", "Blog", "Careers", "Contact"].map((i) => (
                  <li key={i}><a href="#" className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">{i}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4" style={font}>Legal</h4>
              <ul className="space-y-3">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Cookie Policy", href: "/cookies" },
                  { label: "Acceptable Use", href: "/acceptable-use" },
                  { label: "Security", href: "/security" },
                  { label: "DPA", href: "/dpa" },
                ].map((i) => (
                  <li key={i.label}>
                    <Link href={i.href} className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">{i.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 border-[#1a2e1a]/10 gap-4">
            <p className="text-xs text-[#1a2e1a]/30">
              &copy; 2026 Schroeder Technologies. All rights reserved. ReviewForge is a registered trademark.
            </p>
            <div className="flex items-center gap-6">
              {["Twitter", "LinkedIn", "Instagram"].map((s) => (
                <a key={s} href="#" className="text-xs text-[#1a2e1a]/30 hover:text-[#1a2e1a] transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
