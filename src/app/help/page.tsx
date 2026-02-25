"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Rocket,
  Mic,
  Sparkles,
  BarChart3,
  CreditCard,
  Shield,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Play,
  Clock,
  BookOpen,
  MessageCircle,
  Mail,
  Users,
  FileText,
  Code,
  CheckCircle2,
  ExternalLink,
  Star,
  Zap,
  Globe,
  HelpCircle,
} from "lucide-react"

const font = { fontFamily: "var(--font-display)" }

/* ───────────────────── Data ───────────────────── */

const categories = [
  {
    title: "Getting Started",
    color: "#C8F5D4",
    icon: Rocket,
    description: "Set up your account, connect Google, and send your first request",
    articles: 8,
    slug: "getting-started",
  },
  {
    title: "Review Collection",
    color: "#FFE566",
    icon: Mic,
    description: "Voice capture, QR codes, SMS requests, and NFC triggers",
    articles: 12,
    slug: "review-collection",
  },
  {
    title: "AI Features",
    color: "#FFB5B5",
    icon: Sparkles,
    description: "AI review generation, auto-responses, and smart timing",
    articles: 10,
    slug: "ai-features",
  },
  {
    title: "Analytics & Reports",
    color: "#D4CCFF",
    icon: BarChart3,
    description: "Dashboard, insights, competitor tracking, and exports",
    articles: 9,
    slug: "analytics",
  },
  {
    title: "Billing & Plans",
    color: "#FFDAB5",
    icon: CreditCard,
    description: "Subscriptions, payments, upgrades, and invoices",
    articles: 7,
    slug: "billing",
  },
  {
    title: "Account & Security",
    color: "#C8F5D4",
    icon: Shield,
    description: "Settings, team management, 2FA, and data privacy",
    articles: 11,
    slug: "account",
  },
]

const popularArticles = [
  { title: "How to connect your Google Business Profile", category: "Getting Started", readTime: "3 min", categoryColor: "#C8F5D4" },
  { title: "Setting up your first QR code", category: "Review Collection", readTime: "4 min", categoryColor: "#FFE566" },
  { title: "Understanding AI-generated reviews", category: "AI Features", readTime: "5 min", categoryColor: "#FFB5B5" },
  { title: "How to respond to negative reviews", category: "AI Features", readTime: "6 min", categoryColor: "#FFB5B5" },
  { title: "Upgrading or downgrading your plan", category: "Billing", readTime: "2 min", categoryColor: "#FFDAB5" },
  { title: "Adding team members to your account", category: "Account", readTime: "3 min", categoryColor: "#C8F5D4" },
  { title: "Configuring SMS review requests", category: "Review Collection", readTime: "4 min", categoryColor: "#FFE566" },
  { title: "Reading your analytics dashboard", category: "Analytics", readTime: "5 min", categoryColor: "#D4CCFF" },
  { title: "Setting up two-factor authentication", category: "Account", readTime: "2 min", categoryColor: "#C8F5D4" },
  { title: "Exporting your review data", category: "Analytics", readTime: "3 min", categoryColor: "#D4CCFF" },
]

const gettingStartedSteps = [
  { step: 1, title: "Create your account", time: "2 min", description: "Sign up with your email or Google account. No credit card required to get started with our free plan." },
  { step: 2, title: "Connect Google Business Profile", time: "3 min", description: "Link your Google Business Profile so reviews can be posted directly. We guide you through the OAuth flow step by step." },
  { step: 3, title: "Import existing reviews", time: "automatic", description: "ReviewForge automatically imports your existing reviews from Google, Yelp, and Facebook so you have a complete picture from day one." },
  { step: 4, title: "Generate your QR code", time: "1 min", description: "Create a branded QR code for your counter, receipts, or table tents. Customers scan and speak their review instantly." },
  { step: 5, title: "Send your first review request", time: "2 min", description: "Send an SMS or email request to a recent customer. They tap the link, speak for a few seconds, and a polished review is generated." },
  { step: 6, title: "Set up AI auto-responses", time: "5 min", description: "Configure tone, style, and approval settings for the AI response engine. Choose between manual approval or full autopilot." },
]

const videoTutorials = [
  { title: "Complete ReviewForge Walkthrough", duration: "12 min", color: "#C8F5D4", description: "End-to-end tour of every feature in ReviewForge" },
  { title: "Setting Up Voice Capture", duration: "5 min", color: "#FFE566", description: "Learn how to configure voice-first review collection" },
  { title: "Mastering the Analytics Dashboard", duration: "8 min", color: "#D4CCFF", description: "Deep dive into insights, trends, and reporting" },
  { title: "AI Response Engine Deep Dive", duration: "10 min", color: "#FFB5B5", description: "Configure auto-responses and review your AI settings" },
]

const faqs: { question: string; answer: string }[] = [
  {
    question: "How do I change my business information?",
    answer: "Navigate to Dashboard > Settings > Business Profile. You can update your business name, address, phone number, hours, and category. Changes sync to your review collection pages within minutes. Note that your Google Business Profile information is managed through Google directly.",
  },
  {
    question: "Can I use ReviewForge with multiple locations?",
    answer: "Yes! Our Growth plan supports up to 3 locations, and the Business plan supports up to 10. Each location gets its own QR codes, analytics dashboard, and review collection links. You can manage all locations from a single account with a unified overview dashboard.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "When you cancel, your account enters a 30-day grace period where all data is preserved and you can reactivate at any time. After 30 days, review data is archived for 90 additional days. You can export all your data at any point during this period. AI-generated content and analytics are permanently deleted after the 90-day archive period.",
  },
  {
    question: "How does the AI generate reviews?",
    answer: "Our AI listens to the customer's spoken feedback and transforms it into a well-written review while preserving their authentic voice, specific details, and sentiment. The AI never fabricates details; it only restructures and polishes what the customer actually said. Customers always review and approve the generated text before posting.",
  },
  {
    question: "Is ReviewForge compliant with Google's review policies?",
    answer: "Absolutely. ReviewForge is fully compliant with Google's review policies. Every review is based on a real customer's genuine experience and spoken words. The customer reviews, edits if desired, and personally posts the review to their own Google account. We never post reviews on behalf of customers or create fake accounts.",
  },
  {
    question: "How do I reset my password?",
    answer: "Click 'Forgot Password' on the login page and enter your email address. You'll receive a reset link within 2 minutes. The link expires after 1 hour for security. If you have two-factor authentication enabled, you'll need to verify your identity after resetting. Contact support if you don't receive the email.",
  },
  {
    question: "Can I export my reviews?",
    answer: "Yes. Go to Dashboard > Analytics > Export. You can export reviews in CSV, JSON, or PDF format. Filter by date range, platform, star rating, or sentiment. Exports include the original voice transcript, AI-generated text, final posted review, customer metadata, and response history. Business plan users can also access exports via the API.",
  },
  {
    question: "What's the difference between plans?",
    answer: "Free: 1 location, 25 reviews/month, basic AI, Google only. Starter ($29/mo): 1 location, 100 reviews/month, voice capture, multi-platform, AI responses. Growth ($79/mo): 3 locations, unlimited reviews, SMS + QR triggers, full analytics, priority support. Business ($199/mo): 10 locations, everything unlimited, white-label, API access, competitor tracking, dedicated account manager.",
  },
  {
    question: "How do I contact support?",
    answer: "Live chat is available Monday through Friday, 9am to 6pm ET, accessible from the chat widget in your dashboard. Email support@reviewforge.com for non-urgent issues. Response times depend on your plan: Free (48 hours), Starter (24 hours), Growth (12 hours), Business (4 hours). Business plan customers also have a dedicated account manager reachable by phone.",
  },
  {
    question: "How do I delete my account?",
    answer: "Go to Dashboard > Settings > Account > Danger Zone and click 'Delete Account'. You'll need to confirm by typing your email address and entering your password. Account deletion is permanent and removes all data, reviews, analytics, and team members after a 14-day cooling-off period. During the cooling-off period, you can contact support to reverse the deletion.",
  },
]

const popularSearches = ["QR codes", "Google connection", "AI responses", "billing", "cancel"]

/* ───────────────────── Component ───────────────────── */

export default function HelpCenterPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filteredArticles = searchQuery.trim().length > 0
    ? popularArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularArticles

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term)
    const el = document.getElementById("popular-articles")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] overflow-hidden">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-[#1a2e1a] focus:text-[#FFF8F0] focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to content
      </a>

      {/* ──────────── Nav ──────────── */}
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
            <Link href="/#features" className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors">Features</Link>
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
            {/* Mobile menu button */}
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
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFF8F0] border-t border-[#1a2e1a]/10 px-4 py-4 space-y-3">
            <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2">Features</Link>
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

      {/* ──────────── Hero ──────────── */}
      <section id="main-content" className="relative pt-28 pb-16 md:pt-40 md:pb-24">
        {/* Floating shapes */}
        <div className="absolute top-32 left-[8%] w-20 h-20 bg-[#FFE566] rounded-full opacity-40 pointer-events-none" />
        <div className="absolute top-48 right-[10%] w-16 h-16 bg-[#FFB5B5] rounded-2xl opacity-40 rotate-12 pointer-events-none" />
        <div className="absolute bottom-20 left-[15%] w-12 h-12 bg-[#D4CCFF] rounded-xl opacity-40 -rotate-12 pointer-events-none" />
        <div className="absolute top-64 right-[20%] w-8 h-8 bg-[#C8F5D4] rounded-full opacity-30 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-5 py-2 rounded-full text-sm font-semibold mb-8 border-2 border-[#1a2e1a]">
            <HelpCircle className="h-4 w-4" /> HELP CENTER
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a2e1a] tracking-tight mb-6" style={font}>
            HOW CAN WE{" "}
            <span className="relative inline-block">
              <span className="relative z-10">HELP?</span>
              <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#FFE566] -z-0 rounded-sm" />
            </span>
          </h1>

          <p className="text-lg text-[#1a2e1a]/50 max-w-xl mx-auto mb-10 leading-relaxed">
            Find answers, guides, and tutorials to get the most out of ReviewForge.
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a2e1a]/40">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search for articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-[#1a2e1a] rounded-xl px-4 py-3 pl-14 text-sm text-[#1a2e1a] placeholder:text-[#1a2e1a]/30 focus:outline-none focus:ring-2 focus:ring-[#1a2e1a]/20 shadow-[4px_4px_0px_0px_#1a2e1a] transition-shadow focus:shadow-[2px_2px_0px_0px_#1a2e1a]"
            />
          </div>

          {/* Popular searches */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-[#1a2e1a]/40 font-medium">Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handlePopularSearch(term)}
                className="text-xs font-medium text-[#1a2e1a]/60 bg-white border border-[#1a2e1a]/15 rounded-full px-3 py-1.5 hover:bg-[#C8F5D4] hover:border-[#1a2e1a]/30 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── Quick Start Categories ──────────── */}
      <section className="py-16 md:py-20 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a2e1a]" style={font}>BROWSE BY TOPIC</h2>
            <p className="text-sm text-[#1a2e1a]/50 mt-3 max-w-lg mx-auto">Choose a category to find the help you need, or use the search bar above.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                className="text-left bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a] group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: cat.color }}
                >
                  <cat.icon className="h-6 w-6 text-[#1a2e1a]" />
                </div>
                <h3 className="text-lg font-bold text-[#1a2e1a] mb-2" style={font}>{cat.title}</h3>
                <p className="text-sm text-[#1a2e1a]/50 leading-relaxed mb-4">{cat.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a2e1a]/40">
                  <BookOpen className="h-3.5 w-3.5" /> {cat.articles} articles
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── Popular Articles ──────────── */}
      <section id="popular-articles" className="py-16 md:py-20 bg-[#C8F5D4]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Star className="h-3.5 w-3.5" /> Most Read
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a2e1a]" style={font}>
              {searchQuery.trim().length > 0 ? "SEARCH RESULTS" : "POPULAR ARTICLES"}
            </h2>
            {searchQuery.trim().length > 0 && (
              <p className="text-sm text-[#1a2e1a]/50 mt-3">
                Showing {filteredArticles.length} result{filteredArticles.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery("")} className="ml-2 underline hover:text-[#1a2e1a] transition-colors">Clear</button>
              </p>
            )}
          </div>

          <div className="space-y-3">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, idx) => (
                <button
                  key={idx}
                  className="w-full text-left bg-white rounded-2xl px-6 py-4 border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a] hover:shadow-[1px_1px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 border-[#1a2e1a]/15" style={{ backgroundColor: article.categoryColor }}>
                    <FileText className="h-4 w-4 text-[#1a2e1a]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1a2e1a] group-hover:text-[#1a2e1a] truncate">{article.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#1a2e1a]/10"
                        style={{ backgroundColor: article.categoryColor }}
                      >
                        {article.category}
                      </span>
                      <span className="text-xs text-[#1a2e1a]/40 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {article.readTime} read
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#1a2e1a]/30 group-hover:text-[#1a2e1a] group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
                <Search className="h-10 w-10 text-[#1a2e1a]/20 mx-auto mb-4" />
                <p className="text-[#1a2e1a]/60 font-medium mb-1">No articles found</p>
                <p className="text-sm text-[#1a2e1a]/40">Try a different search term or browse categories above.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ──────────── Getting Started Guide ──────────── */}
      <section className="py-16 md:py-20 bg-[#FFF8F0]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <Rocket className="h-3.5 w-3.5" /> Quick Start
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a2e1a]" style={font}>GET UP AND RUNNING</h2>
            <p className="text-sm text-[#1a2e1a]/50 mt-3 max-w-lg mx-auto">Follow these six steps to start collecting five-star reviews in under 15 minutes.</p>
          </div>

          <div className="space-y-4">
            {gettingStartedSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-3xl p-6 md:p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFE566] border-2 border-[#1a2e1a] flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-[#1a2e1a]" style={font}>{step.step}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="text-base font-bold text-[#1a2e1a]" style={font}>{step.title}</h3>
                    <span className="text-xs text-[#1a2e1a]/40 flex items-center gap-1 shrink-0">
                      <Clock className="h-3 w-3" /> {step.time}
                    </span>
                  </div>
                  <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{step.description}</p>
                </div>
                <span className="text-sm font-semibold text-[#1a2e1a]/30 group-hover:text-[#1a2e1a] transition-colors hidden md:flex items-center gap-1 shrink-0 mt-1">
                  View Guide <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── Video Tutorials ──────────── */}
      <section className="py-16 md:py-20 bg-[#1a2e1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-48 h-48 bg-[#C8F5D4]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-[10%] w-56 h-56 bg-[#FFE566]/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#FFB5B5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <Play className="h-3.5 w-3.5" /> Video Guides
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-[#FFF8F0]" style={font}>WATCH AND LEARN</h2>
            <p className="text-sm text-[#FFF8F0]/40 mt-3 max-w-lg mx-auto">Step-by-step video tutorials to help you master every feature.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoTutorials.map((video) => (
              <button
                key={video.title}
                className="text-left bg-[#FFF8F0] rounded-3xl overflow-hidden border-2 border-[#1a2e1a]/20 hover:border-[#FFF8F0] transition-all group"
              >
                {/* Thumbnail area */}
                <div
                  className="relative h-36 flex items-center justify-center"
                  style={{ backgroundColor: video.color }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#1a2e1a] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="h-7 w-7 text-[#FFF8F0] ml-1" />
                  </div>
                  <span className="absolute bottom-3 right-3 bg-[#1a2e1a]/80 text-[#FFF8F0] text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {video.duration}
                  </span>
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="text-sm font-bold text-[#1a2e1a] mb-1.5 leading-snug" style={font}>{video.title}</h3>
                  <p className="text-xs text-[#1a2e1a]/40 leading-relaxed">{video.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── FAQ Accordion ──────────── */}
      <section className="py-16 md:py-20 bg-[#FFF8F0]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <HelpCircle className="h-3.5 w-3.5" /> FAQ
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a2e1a]" style={font}>FREQUENTLY ASKED QUESTIONS</h2>
            <p className="text-sm text-[#1a2e1a]/50 mt-3">Quick answers to the questions we hear most often.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                  aria-expanded={openFaq === idx}
                >
                  <span className="text-sm font-semibold text-[#1a2e1a] leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#1a2e1a]/40 shrink-0 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-0">
                    <div className="border-t border-[#1a2e1a]/10 pt-4">
                      <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── Contact Support ──────────── */}
      <section className="py-16 md:py-20 bg-[#FFE566]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Support
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-[#1a2e1a]" style={font}>STILL NEED HELP?</h2>
            <p className="text-sm text-[#1a2e1a]/60 mt-3">Our team is here for you. Reach out through any channel.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Live Chat */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]" style={{ backgroundColor: "#C8F5D4" }}>
                <MessageCircle className="h-6 w-6 text-[#1a2e1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1a2e1a] mb-2" style={font}>Live Chat</h3>
              <p className="text-sm text-[#1a2e1a]/50 leading-relaxed mb-3">Chat with our team in real time for instant answers to your questions.</p>
              <p className="text-xs text-[#1a2e1a]/40 mb-5 flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> Available Mon&ndash;Fri, 9am&ndash;6pm ET
              </p>
              <button className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a]">
                Start Chat <MessageCircle className="h-4 w-4" />
              </button>
            </div>

            {/* Email Support */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]" style={{ backgroundColor: "#FFE566" }}>
                <Mail className="h-6 w-6 text-[#1a2e1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1a2e1a] mb-2" style={font}>Email Support</h3>
              <p className="text-sm text-[#1a2e1a]/50 leading-relaxed mb-3">
                Send us a message at{" "}
                <a href="mailto:support@reviewforge.com" className="text-[#1a2e1a] font-semibold underline underline-offset-2 hover:no-underline">
                  support@reviewforge.com
                </a>
              </p>
              <div className="space-y-1.5 text-xs text-[#1a2e1a]/40">
                <p className="font-semibold text-[#1a2e1a]/60 text-[11px] uppercase tracking-wider mb-2">Response times by plan</p>
                <div className="flex items-center justify-between"><span>Free</span><span className="font-semibold text-[#1a2e1a]/60">48 hours</span></div>
                <div className="flex items-center justify-between"><span>Starter</span><span className="font-semibold text-[#1a2e1a]/60">24 hours</span></div>
                <div className="flex items-center justify-between"><span>Growth</span><span className="font-semibold text-[#1a2e1a]/60">12 hours</span></div>
                <div className="flex items-center justify-between"><span>Business</span><span className="font-semibold text-[#1a2e1a]/60">4 hours</span></div>
              </div>
            </div>

            {/* Community */}
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]" style={{ backgroundColor: "#FFB5B5" }}>
                <Users className="h-6 w-6 text-[#1a2e1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1a2e1a] mb-2" style={font}>Community</h3>
              <p className="text-sm text-[#1a2e1a]/50 leading-relaxed mb-3">
                Join 5,000+ business owners sharing tips, strategies, and success stories.
              </p>
              <p className="text-xs text-[#1a2e1a]/40 mb-5 flex items-center gap-1.5">
                <Zap className="h-3 w-3" /> Get peer advice and expert tips
              </p>
              <button className="inline-flex items-center gap-2 bg-[#FFF8F0] text-[#1a2e1a] px-5 py-2.5 rounded-full text-sm font-semibold border-2 border-[#1a2e1a] hover:bg-[#FFB5B5] transition-all">
                Visit Community <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── API Documentation Link ──────────── */}
      <section className="py-16 md:py-20 bg-[#FFF8F0]">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/dashboard/developers"
            className="block bg-white rounded-3xl p-8 md:p-10 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#FFDAB5] border-2 border-[#1a2e1a] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Code className="h-7 w-7 text-[#1a2e1a]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#1a2e1a] mb-2" style={font}>API Documentation</h3>
                <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">
                  Build custom integrations with the ReviewForge API. Access reviews, analytics, and automation endpoints. Available on the Business plan.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#1a2e1a]/40 group-hover:text-[#1a2e1a] transition-colors shrink-0">
                View Docs <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ──────────── Final CTA ──────────── */}
      <section className="py-16 md:py-20 bg-[#1a2e1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] w-40 h-40 bg-[#C8F5D4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[10%] w-48 h-48 bg-[#FFE566]/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
            <CheckCircle2 className="h-3.5 w-3.5" /> Ready to start?
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#FFF8F0] mb-4 leading-tight" style={font}>
            CAN&apos;T FIND WHAT YOU&apos;RE LOOKING FOR?
          </h2>
          <p className="text-sm text-[#FFF8F0]/40 mb-8 max-w-lg mx-auto leading-relaxed">
            Our support team is happy to help. Start a free account and chat with us directly from your dashboard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-3 bg-[#FFE566] text-[#1a2e1a] px-8 py-4 rounded-full text-base font-bold hover:bg-[#FFD700] transition-all border-2 border-[#FFE566] shadow-[4px_4px_0px_0px_rgba(255,229,102,0.3)]"
            >
              Get Started Free <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[#FFF8F0]/60 hover:text-[#FFF8F0] transition-colors text-sm font-medium"
            >
              Already have an account? <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────── Footer ──────────── */}
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
                {["Features", "Pricing", "How it works", "Integrations"].map((i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">{i}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4" style={font}>Company</h4>
              <ul className="space-y-3">
                {["About", "Blog", "Careers", "Contact"].map((i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">{i}</a>
                  </li>
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
