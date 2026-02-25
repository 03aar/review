"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Check,
  X,
  Sparkles,
  CreditCard,
  Building,
  Users,
  Zap,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Star,
  Shield,
  Globe,
  Mic,
  BarChart3,
  MessageSquare,
  Clock,
  Send,
  Smartphone,
  QrCode,
  Headphones,
  Crown,
  Minus,
} from "lucide-react"

const font = { fontFamily: "var(--font-display)" }

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    period: "forever",
    description: "Perfect for trying out ReviewForge with zero commitment.",
    color: "#FFF8F0",
    highlight: false,
    cta: "Start Free",
    features: [
      "1 location",
      "25 reviews/mo",
      "Basic AI review generation",
      "Google posting only",
      "Email support",
      "Basic analytics dashboard",
    ],
  },
  {
    name: "Starter",
    monthlyPrice: 29,
    annualPrice: 278,
    period: "/month",
    description: "For small businesses ready to grow their online reputation.",
    color: "#C8F5D4",
    highlight: false,
    cta: "Get Started",
    features: [
      "Everything in Free, plus:",
      "1 location",
      "100 reviews/mo",
      "Voice capture",
      "Multi-platform posting (Google, Yelp, Facebook)",
      "AI review responses",
      "Basic analytics",
      "Email + chat support",
    ],
  },
  {
    name: "Growth",
    monthlyPrice: 79,
    annualPrice: 758,
    period: "/month",
    description: "For growing businesses that need advanced automation.",
    color: "#FFE566",
    highlight: true,
    cta: "Get Started",
    features: [
      "Everything in Starter, plus:",
      "3 locations",
      "Unlimited reviews",
      "SMS + QR + NFC triggers",
      "AI auto-responses",
      "Full analytics + competitor tracking",
      "Smart timing optimization",
      "Priority support (12hr SLA)",
    ],
  },
  {
    name: "Business",
    monthlyPrice: 199,
    annualPrice: 1910,
    period: "/month",
    description: "For multi-location businesses that need full control.",
    color: "#D4CCFF",
    highlight: false,
    cta: "Get Started",
    features: [
      "Everything in Growth, plus:",
      "10 locations",
      "White-label branding",
      "API access + webhooks",
      "Staff performance tracking",
      "Dedicated account manager",
      "Custom integrations",
      "4hr support SLA",
      "Onboarding assistance",
    ],
  },
]

const enterpriseFeatures = [
  "Unlimited locations",
  "Custom AI models",
  "SSO + advanced security",
  "Custom SLA",
  "Dedicated infrastructure",
  "Professional services",
]

type CellValue = boolean | string

interface ComparisonCategory {
  category: string
  features: { name: string; free: CellValue; starter: CellValue; growth: CellValue; business: CellValue }[]
}

const comparisonData: ComparisonCategory[] = [
  {
    category: "Review Collection",
    features: [
      { name: "Reviews per month", free: "25", starter: "100", growth: "Unlimited", business: "Unlimited" },
      { name: "Voice capture", free: false, starter: true, growth: true, business: true },
      { name: "AI review generation", free: "Basic", starter: "Advanced", growth: "Advanced", business: "Advanced" },
      { name: "Multi-platform posting", free: false, starter: true, growth: true, business: true },
      { name: "QR code triggers", free: false, starter: false, growth: true, business: true },
      { name: "SMS triggers", free: false, starter: false, growth: true, business: true },
      { name: "NFC triggers", free: false, starter: false, growth: true, business: true },
    ],
  },
  {
    category: "AI & Automation",
    features: [
      { name: "AI review responses", free: false, starter: true, growth: true, business: true },
      { name: "Auto-respond mode", free: false, starter: false, growth: true, business: true },
      { name: "Smart timing optimization", free: false, starter: false, growth: true, business: true },
      { name: "Sentiment analysis", free: false, starter: false, growth: true, business: true },
      { name: "Custom AI models", free: false, starter: false, growth: false, business: false },
    ],
  },
  {
    category: "Analytics",
    features: [
      { name: "Basic analytics", free: true, starter: true, growth: true, business: true },
      { name: "Full analytics dashboard", free: false, starter: false, growth: true, business: true },
      { name: "Competitor tracking", free: false, starter: false, growth: true, business: true },
      { name: "Staff performance insights", free: false, starter: false, growth: false, business: true },
      { name: "ROI tracking", free: false, starter: false, growth: false, business: true },
    ],
  },
  {
    category: "Integrations",
    features: [
      { name: "Google", free: true, starter: true, growth: true, business: true },
      { name: "Yelp", free: false, starter: true, growth: true, business: true },
      { name: "Facebook", free: false, starter: true, growth: true, business: true },
      { name: "TripAdvisor", free: false, starter: false, growth: true, business: true },
      { name: "API access", free: false, starter: false, growth: false, business: true },
      { name: "Webhooks", free: false, starter: false, growth: false, business: true },
      { name: "White-label branding", free: false, starter: false, growth: false, business: true },
    ],
  },
  {
    category: "Support",
    features: [
      { name: "Email support", free: true, starter: true, growth: true, business: true },
      { name: "Chat support", free: false, starter: true, growth: true, business: true },
      { name: "Priority support", free: false, starter: false, growth: true, business: true },
      { name: "Dedicated account manager", free: false, starter: false, growth: false, business: true },
      { name: "SLA", free: false, starter: false, growth: "12hr", business: "4hr" },
    ],
  },
]

const faqs = [
  {
    q: "Can I change plans at any time?",
    a: "Absolutely. You can upgrade or downgrade your plan at any time from your dashboard. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, the change takes effect at the start of your next billing period.",
  },
  {
    q: "Is there a free trial?",
    a: "Our Free plan is essentially a permanent free trial with no time limit. You get 1 location and 25 reviews per month to experience ReviewForge at your own pace. When you're ready to scale, simply upgrade to a paid plan.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as ACH bank transfers for annual plans. Enterprise customers can also pay via invoice with net-30 terms.",
  },
  {
    q: "What happens if I exceed my review limit?",
    a: "If you hit your monthly review limit, you'll receive a notification and can choose to upgrade your plan instantly. Existing reviews won't be affected, but new review collection will pause until the next billing cycle or until you upgrade.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes, you can cancel your subscription at any time with no cancellation fees. Your account will remain active until the end of your current billing period. After that, you'll be moved to the Free plan and retain access to your data.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied within the first 14 days, contact us for a full refund. After the 14-day window, we don't offer partial refunds but you can cancel to avoid future charges.",
  },
  {
    q: "What's the difference between monthly and annual billing?",
    a: "Annual billing saves you 20% compared to monthly billing. You pay for the full year upfront at a discounted rate. For example, Growth is $79/mo billed monthly, but only $63.17/mo when billed annually ($758/year).",
  },
  {
    q: "Do you offer discounts for nonprofits?",
    a: "Yes! We offer a 30% discount for registered nonprofit organizations. Contact our sales team with proof of your nonprofit status and we'll apply the discount to any plan. We also have special programs for educational institutions.",
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function displayPrice(plan: typeof plans[number]) {
    if (plan.monthlyPrice === 0) return "$0"
    if (annual) {
      const monthly = (plan.annualPrice / 12).toFixed(2)
      return `$${monthly}`
    }
    return `$${plan.monthlyPrice}`
  }

  function displayPeriod(plan: typeof plans[number]) {
    if (plan.monthlyPrice === 0) return "forever"
    return "/month"
  }

  function displayAnnualTotal(plan: typeof plans[number]) {
    if (plan.monthlyPrice === 0 || !annual) return null
    return `$${plan.annualPrice}/year`
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

      {/* ============================================================ */}
      {/*  Nav                                                          */}
      {/* ============================================================ */}
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
            <Link href="/pricing" className="text-sm font-medium text-[#1a2e1a] transition-colors">Pricing</Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors">How it works</Link>
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
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#1a2e1a] py-2">Pricing</Link>
            <Link href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2">How it works</Link>
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="text-sm font-medium text-[#1a2e1a] px-4 py-2">Sign In</Link>
              <Link href="/register" className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-2.5 rounded-full text-sm font-semibold">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ============================================================ */}
      {/*  Hero                                                         */}
      {/* ============================================================ */}
      <section id="main-content" className="relative pt-28 pb-16 md:pt-40 md:pb-24">
        {/* Floating shapes */}
        <div className="absolute top-32 left-[8%] w-20 h-20 bg-[#FFE566] rounded-full opacity-60" />
        <div className="absolute top-48 right-[10%] w-16 h-16 bg-[#FFB5B5] rounded-2xl opacity-60 rotate-12" />
        <div className="absolute bottom-20 left-[15%] w-12 h-12 bg-[#D4CCFF] rounded-xl opacity-60 -rotate-12" />
        <div className="absolute top-64 right-[20%] w-8 h-8 bg-[#C8F5D4] rounded-full opacity-50" />
        <div className="absolute bottom-32 right-[8%] w-14 h-14 bg-[#FFDAB5] rounded-2xl opacity-50 rotate-6" />

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FFB5B5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border-2 border-[#1a2e1a]">
            <CreditCard className="h-4 w-4" /> Simple Pricing
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a2e1a] tracking-tight leading-[1.05] mb-6 max-w-5xl mx-auto" style={font}>
            ONE PLAN FOR EVERY{" "}
            <span className="relative inline-block">
              <span className="relative z-10">STAGE</span>
              <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#FFE566] -z-0 rounded-sm" />
            </span>{" "}
            OF GROWTH
          </h1>

          <p className="text-lg md:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Transparent pricing with no hidden fees. Start free, scale as you grow.
            Every plan includes our core AI-powered review platform.
          </p>

          {/* Monthly / Annual toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`text-sm font-semibold transition-colors ${!annual ? "text-[#1a2e1a]" : "text-[#1a2e1a]/40"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-16 h-9 rounded-full border-2 border-[#1a2e1a] transition-colors ${annual ? "bg-[#C8F5D4]" : "bg-[#1a2e1a]/10"}`}
              aria-label={annual ? "Switch to monthly billing" : "Switch to annual billing"}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-[#1a2e1a] rounded-full transition-all duration-300 ${annual ? "left-[calc(100%-1.5rem)]" : "left-1"}`}
              />
            </button>
            <span className={`text-sm font-semibold transition-colors ${annual ? "text-[#1a2e1a]" : "text-[#1a2e1a]/40"}`}>Annual</span>
            {annual && (
              <span className="inline-flex items-center gap-1 bg-[#C8F5D4] text-[#1a2e1a] px-3 py-1 rounded-full text-xs font-bold border-2 border-[#1a2e1a]">
                <Sparkles className="h-3 w-3" /> Save 20%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Pricing Cards                                                */}
      {/* ============================================================ */}
      <section className="pb-20 md:pb-28 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.name} className="flex">
                <div
                  className={`rounded-3xl p-7 border-2 border-[#1a2e1a] flex flex-col w-full ${
                    plan.highlight
                      ? "shadow-[8px_8px_0px_0px_#1a2e1a] relative scale-[1.02] lg:-mt-4 lg:mb-4"
                      : "shadow-[4px_4px_0px_0px_#1a2e1a]"
                  }`}
                  style={{ backgroundColor: plan.color }}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1a2e1a] text-[#FFE566] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap">
                      <Star className="h-3 w-3 inline mr-1 fill-[#FFE566]" />
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#1a2e1a]/50 mb-1" style={font}>
                    {plan.name}
                  </h3>

                  <div className="mb-1">
                    <span className="text-4xl font-bold text-[#1a2e1a]" style={font}>
                      {displayPrice(plan)}
                    </span>
                    <span className="text-sm text-[#1a2e1a]/50 ml-1">{displayPeriod(plan)}</span>
                  </div>

                  {displayAnnualTotal(plan) && (
                    <p className="text-xs text-[#1a2e1a]/40 mb-2">{displayAnnualTotal(plan)} billed annually</p>
                  )}
                  {!displayAnnualTotal(plan) && <div className="mb-2" />}

                  <p className="text-xs text-[#1a2e1a]/50 mb-4 leading-relaxed">{plan.description}</p>

                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-3 rounded-full text-sm font-bold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] mb-6"
                  >
                    {plan.cta} <ChevronRight className="h-4 w-4" />
                  </Link>

                  <ul className="space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-sm text-[#1a2e1a]/60 flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#1a2e1a]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-[#1a2e1a]" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise card */}
          <div className="max-w-6xl mx-auto mt-8">
            <div className="bg-[#1a2e1a] rounded-3xl p-8 md:p-12 border-2 border-[#1a2e1a] shadow-[6px_6px_0px_0px_rgba(26,46,26,0.3)] relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute top-10 right-[10%] w-32 h-32 bg-[#C8F5D4]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-[5%] w-40 h-40 bg-[#FFE566]/10 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border-2 border-[#1a2e1a]">
                    <Crown className="h-3 w-3" /> Enterprise
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#FFF8F0] mb-2" style={font}>
                    Custom
                  </h3>
                  <p className="text-[#FFF8F0]/50 mb-6 max-w-lg leading-relaxed">
                    For large organizations with custom needs. Tailored solutions, dedicated infrastructure, and white-glove onboarding.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {enterpriseFeatures.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#C8F5D4]/20 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-[#C8F5D4]" />
                        </div>
                        <span className="text-sm text-[#FFF8F0]/70">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 bg-[#FFE566] text-[#1a2e1a] px-8 py-4 rounded-full text-base font-bold hover:bg-[#FFD700] transition-all border-2 border-[#FFE566] shadow-[4px_4px_0px_0px_rgba(255,229,102,0.3)]"
                  >
                    Contact Sales <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Feature Comparison Table                                     */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#C8F5D4] relative">
        <div className="absolute top-10 right-[15%] w-32 h-32 bg-[#FFE566]/30 rounded-full blur-2xl" />
        <div className="absolute bottom-20 left-[10%] w-40 h-40 bg-[#D4CCFF]/30 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <BarChart3 className="h-3 w-3" /> Compare Plans
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a]" style={font}>
              FEATURE-BY-FEATURE COMPARISON
            </h2>
            <p className="text-lg text-[#1a2e1a]/50 max-w-xl mx-auto mt-4">
              See exactly what you get with each plan. No surprises.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block bg-white rounded-3xl border-2 border-[#1a2e1a] shadow-[6px_6px_0px_0px_#1a2e1a] overflow-hidden">
            {/* Sticky header */}
            <div className="grid grid-cols-[1fr_120px_120px_120px_120px] sticky top-0 z-10 bg-[#1a2e1a]">
              <div className="p-5">
                <span className="text-sm font-bold text-[#FFF8F0]/50 uppercase tracking-wider" style={font}>Feature</span>
              </div>
              {["Free", "Starter", "Growth", "Business"].map((name, i) => (
                <div key={name} className="p-5 text-center">
                  <span
                    className="text-sm font-bold uppercase tracking-wider"
                    style={{ ...font, color: ["#FFF8F0", "#C8F5D4", "#FFE566", "#D4CCFF"][i] }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>

            {comparisonData.map((cat, catIdx) => (
              <div key={cat.category}>
                {/* Category header */}
                <div className="grid grid-cols-[1fr_120px_120px_120px_120px] bg-[#FFF8F0] border-t-2 border-[#1a2e1a]/10">
                  <div className="p-4 pl-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/40" style={font}>
                      {cat.category}
                    </span>
                  </div>
                  <div className="col-span-4" />
                </div>

                {cat.features.map((feature, fIdx) => (
                  <div
                    key={feature.name}
                    className={`grid grid-cols-[1fr_120px_120px_120px_120px] border-t border-[#1a2e1a]/5 ${
                      fIdx % 2 === 0 ? "bg-white" : "bg-[#FFF8F0]/50"
                    } hover:bg-[#FFE566]/10 transition-colors`}
                  >
                    <div className="p-4 pl-5 flex items-center">
                      <span className="text-sm text-[#1a2e1a]/70">{feature.name}</span>
                    </div>
                    {(["free", "starter", "growth", "business"] as const).map((tier) => {
                      const val = feature[tier]
                      return (
                        <div key={tier} className="p-4 flex items-center justify-center">
                          {val === true ? (
                            <div className="w-6 h-6 rounded-full bg-[#C8F5D4] flex items-center justify-center border border-[#1a2e1a]/10">
                              <Check className="h-3.5 w-3.5 text-[#1a2e1a]" />
                            </div>
                          ) : val === false ? (
                            <div className="w-6 h-6 rounded-full bg-[#1a2e1a]/5 flex items-center justify-center">
                              <Minus className="h-3.5 w-3.5 text-[#1a2e1a]/20" />
                            </div>
                          ) : (
                            <span className="text-sm font-semibold text-[#1a2e1a]">{val}</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile comparison cards */}
          <div className="lg:hidden space-y-6">
            {comparisonData.map((cat) => (
              <div key={cat.category} className="bg-white rounded-3xl border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] overflow-hidden">
                <div className="bg-[#1a2e1a] p-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-[#FFF8F0]" style={font}>
                    {cat.category}
                  </span>
                </div>
                {cat.features.map((feature, fIdx) => (
                  <div key={feature.name} className={`p-4 ${fIdx > 0 ? "border-t border-[#1a2e1a]/5" : ""} ${fIdx % 2 === 0 ? "bg-white" : "bg-[#FFF8F0]/50"}`}>
                    <p className="text-sm font-semibold text-[#1a2e1a] mb-2">{feature.name}</p>
                    <div className="grid grid-cols-4 gap-2">
                      {(["free", "starter", "growth", "business"] as const).map((tier) => {
                        const val = feature[tier]
                        const labels = { free: "Free", starter: "Starter", growth: "Growth", business: "Biz" }
                        return (
                          <div key={tier} className="text-center">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a2e1a]/30 mb-1">{labels[tier]}</p>
                            {val === true ? (
                              <div className="w-5 h-5 rounded-full bg-[#C8F5D4] flex items-center justify-center mx-auto border border-[#1a2e1a]/10">
                                <Check className="h-3 w-3 text-[#1a2e1a]" />
                              </div>
                            ) : val === false ? (
                              <div className="w-5 h-5 rounded-full bg-[#1a2e1a]/5 flex items-center justify-center mx-auto">
                                <Minus className="h-3 w-3 text-[#1a2e1a]/20" />
                              </div>
                            ) : (
                              <span className="text-xs font-semibold text-[#1a2e1a]">{val}</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ Section                                                  */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#FFF8F0]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <MessageSquare className="h-3 w-3" /> FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a]" style={font}>
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-lg text-[#1a2e1a]/50 max-w-xl mx-auto mt-4">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a] overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FFF8F0]/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-sm md:text-base font-bold text-[#1a2e1a] pr-4" style={font}>
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FFF8F0] border-2 border-[#1a2e1a] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4 text-[#1a2e1a]" />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 pt-0">
                    <div className="border-t border-[#1a2e1a]/10 pt-4">
                      <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Trust badges                                                 */}
      {/* ============================================================ */}
      <section className="py-16 bg-[#FFF8F0] border-t-2 border-[#1a2e1a]/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[
              { icon: Shield, label: "SSL Encrypted", color: "#C8F5D4" },
              { icon: CreditCard, label: "PCI Compliant", color: "#FFE566" },
              { icon: Clock, label: "14-Day Money Back", color: "#FFB5B5" },
              { icon: Users, label: "2,000+ Businesses", color: "#D4CCFF" },
              { icon: Zap, label: "99.9% Uptime", color: "#FFDAB5" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-[#1a2e1a]"
                  style={{ backgroundColor: badge.color }}
                >
                  <badge.icon className="h-4 w-4 text-[#1a2e1a]" />
                </div>
                <span className="text-sm font-semibold text-[#1a2e1a]/60">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA Section                                                  */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 bg-[#1a2e1a] relative overflow-hidden">
        <div className="absolute top-10 left-[10%] w-40 h-40 bg-[#C8F5D4]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[10%] w-48 h-48 bg-[#FFE566]/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border-2 border-[#1a2e1a]">
            <Sparkles className="h-3 w-3" /> Ready to start?
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#FFF8F0] mb-6 leading-tight" style={font}>
            START COLLECTING REVIEWS TODAY
          </h2>
          <p className="text-lg text-[#FFF8F0]/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 2,000+ businesses that have transformed their online reputation with ReviewForge.
            No credit card required to get started.
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
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Footer                                                       */}
      {/* ============================================================ */}
      <footer className="bg-[#FFF8F0] border-t-2 border-[#1a2e1a] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg" style={font}>R</span>
                </div>
                <span className="text-xl font-bold text-[#1a2e1a]" style={font}>ReviewForge</span>
              </div>
              <p className="text-sm text-[#1a2e1a]/40 leading-relaxed">
                Your happy customers have a lot to say. We help them say it.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4" style={font}>Product</h4>
              <ul className="space-y-3">
                {[
                  { label: "Features", href: "/#features" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "How it works", href: "/#how-it-works" },
                  { label: "Integrations", href: "#" },
                ].map((i) => (
                  <li key={i.label}>
                    <Link href={i.href} className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">
                      {i.label}
                    </Link>
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
                    <Link href={i.href} className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">
                      {i.label}
                    </Link>
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
