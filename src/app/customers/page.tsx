"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Star,
  TrendingUp,
  Users,
  Building,
  ArrowRight,
  ArrowUpRight,
  Quote,
  Clock,
  Sparkles,
  Check,
  Mic,
  MessageSquare,
  QrCode,
  Smartphone,
  Mail,
  Heart,
  Dumbbell,
  Home,
  Scissors,
  Car,
  UtensilsCrossed,
  Stethoscope,
} from "lucide-react"

const font = { fontFamily: "var(--font-display)" }

const industries = [
  "All",
  "Restaurant",
  "Healthcare",
  "Automotive",
  "Beauty",
  "Fitness",
  "Real Estate",
  "Veterinary",
] as const

type Industry = (typeof industries)[number]

interface CaseStudy {
  company: string
  industry: Industry
  person: string
  role: string
  quote: string
  accent: string
  initial: string
  beforeReviews: number
  beforeStars: number
  afterReviews: string
  afterStars: number
  keyWin: string
  keyWinIcon: React.ReactNode
}

const caseStudies: CaseStudy[] = [
  {
    company: "Rivera Auto Group",
    industry: "Automotive",
    person: "Marcus Rivera",
    role: "GM",
    quote:
      "The voice capture is genius. Customers actually enjoy leaving reviews now.",
    accent: "#FFE566",
    initial: "R",
    beforeReviews: 45,
    beforeStars: 3.5,
    afterReviews: "310",
    afterStars: 4.6,
    keyWin: "SMS follow-ups after service",
    keyWinIcon: <Smartphone className="h-3.5 w-3.5" />,
  },
  {
    company: "Park Family Dental",
    industry: "Healthcare",
    person: "Dr. Emily Park",
    role: "Owner",
    quote:
      "As a dentist, asking for reviews felt awkward. Now patients just scan a QR code in the waiting room.",
    accent: "#C8F5D4",
    initial: "P",
    beforeReviews: 28,
    beforeStars: 4.0,
    afterReviews: "180",
    afterStars: 4.9,
    keyWin: "QR codes in waiting room",
    keyWinIcon: <QrCode className="h-3.5 w-3.5" />,
  },
  {
    company: "Coastal Hair Studio",
    industry: "Beauty",
    person: "Jamie Torres",
    role: "Owner",
    quote: "We tripled our bookings from Google in 2 months.",
    accent: "#FFB5B5",
    initial: "C",
    beforeReviews: 8,
    beforeStars: 3.2,
    afterReviews: "95",
    afterStars: 4.8,
    keyWin: "NFC tap cards at checkout",
    keyWinIcon: <Smartphone className="h-3.5 w-3.5" />,
  },
  {
    company: "Mountain View Veterinary",
    industry: "Veterinary",
    person: "Dr. Michael Torres",
    role: "Owner",
    quote:
      "Pet owners love telling stories about their visits. Voice capture is perfect for that.",
    accent: "#D4CCFF",
    initial: "M",
    beforeReviews: 15,
    beforeStars: 3.9,
    afterReviews: "120",
    afterStars: 4.7,
    keyWin: "Voice capture stories",
    keyWinIcon: <Mic className="h-3.5 w-3.5" />,
  },
  {
    company: "Metro Fitness",
    industry: "Fitness",
    person: "Lisa Zhang",
    role: "Director",
    quote:
      "Our new member signups increased 40% after our rating jumped.",
    accent: "#FFDAB5",
    initial: "M",
    beforeReviews: 22,
    beforeStars: 3.6,
    afterReviews: "175",
    afterStars: 4.5,
    keyWin: "Post-class SMS triggers",
    keyWinIcon: <MessageSquare className="h-3.5 w-3.5" />,
  },
  {
    company: "Greenleaf Property Management",
    industry: "Real Estate",
    person: "David Nakamura",
    role: "CEO",
    quote:
      "We were getting destroyed by angry tenants. Now our happy tenants finally speak up.",
    accent: "#C8F5D4",
    initial: "G",
    beforeReviews: 5,
    beforeStars: 2.8,
    afterReviews: "85",
    afterStars: 4.4,
    keyWin: "Email campaigns to happy tenants",
    keyWinIcon: <Mail className="h-3.5 w-3.5" />,
  },
]

const industryIcon = (industry: string) => {
  switch (industry) {
    case "Automotive":
      return <Car className="h-4 w-4" />
    case "Healthcare":
      return <Stethoscope className="h-4 w-4" />
    case "Beauty":
      return <Scissors className="h-4 w-4" />
    case "Veterinary":
      return <Heart className="h-4 w-4" />
    case "Fitness":
      return <Dumbbell className="h-4 w-4" />
    case "Real Estate":
      return <Home className="h-4 w-4" />
    case "Restaurant":
      return <UtensilsCrossed className="h-4 w-4" />
    default:
      return <Building className="h-4 w-4" />
  }
}

const logoNames = [
  "Sunrise Cafe",
  "Atlas Motors",
  "Bloom Salon",
  "Peak Dental",
  "Urban Fitness",
  "Haven Realty",
  "Paws & Claws",
  "Golden Wok",
  "Swift Auto",
  "Pure Glow Spa",
  "ClearView Optics",
  "FreshBite Deli",
]

export default function CustomersPage() {
  const [activeFilter, setActiveFilter] = useState<Industry>("All")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filteredStudies =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.industry === activeFilter)

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
              <span
                className="text-white font-bold text-sm sm:text-lg"
                style={font}
              >
                R
              </span>
            </div>
            <span
              className="text-lg sm:text-xl font-bold text-[#1a2e1a]"
              style={font}
            >
              ReviewForge
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/customers"
              className="text-sm font-medium text-[#1a2e1a] transition-colors"
            >
              Customers
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm font-medium text-[#1a2e1a] px-4 py-2"
            >
              Sign In
            </Link>
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
                <span
                  className={`block h-0.5 w-5 bg-[#1a2e1a] transition-all duration-200 ${mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 bg-[#1a2e1a] transition-all duration-200 ${mobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFF8F0] border-t border-[#1a2e1a]/10 px-4 py-4 space-y-3">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2"
            >
              How it works
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2"
            >
              Pricing
            </Link>
            <Link
              href="/customers"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#1a2e1a] py-2"
            >
              Customers
            </Link>
            <div className="flex gap-3 pt-2">
              <Link
                href="/login"
                className="text-sm font-medium text-[#1a2e1a] px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-2.5 rounded-full text-sm font-semibold"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section
        id="main-content"
        className="relative pt-28 pb-16 md:pt-40 md:pb-24"
      >
        {/* Floating decorative shapes */}
        <div className="absolute top-32 left-[8%] w-20 h-20 bg-[#FFE566] rounded-full opacity-60" />
        <div className="absolute top-48 right-[10%] w-16 h-16 bg-[#FFB5B5] rounded-2xl opacity-60 rotate-12" />
        <div className="absolute bottom-40 left-[15%] w-12 h-12 bg-[#D4CCFF] rounded-xl opacity-60 -rotate-12" />
        <div className="absolute top-64 right-[20%] w-8 h-8 bg-[#C8F5D4] rounded-full opacity-50" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-5 py-2 rounded-full text-sm font-semibold mb-8 border-2 border-[#1a2e1a]">
              <Users className="h-4 w-4" /> CUSTOMER STORIES
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a2e1a] tracking-tight leading-[1.05] mb-6"
              style={font}
            >
              REAL BUSINESSES,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">REAL RESULTS</span>
                <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#FFE566] -z-0 rounded-sm" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              See how businesses like yours are using ReviewForge to transform
              their online reputation.
            </p>

            {/* Social proof stat bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
              <div className="flex items-center gap-3 px-6 sm:px-8 py-4 sm:border-r-2 sm:border-[#1a2e1a]/10">
                <div className="w-10 h-10 rounded-full bg-[#C8F5D4] border-2 border-[#1a2e1a] flex items-center justify-center">
                  <Building className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <div className="text-left">
                  <p
                    className="text-2xl font-bold text-[#1a2e1a]"
                    style={font}
                  >
                    2,000+
                  </p>
                  <p className="text-xs text-[#1a2e1a]/50 font-medium">
                    businesses
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 sm:px-8 py-4 sm:border-r-2 sm:border-[#1a2e1a]/10">
                <div className="w-10 h-10 rounded-full bg-[#FFE566] border-2 border-[#1a2e1a] flex items-center justify-center">
                  <Star className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <div className="text-left">
                  <p
                    className="text-2xl font-bold text-[#1a2e1a]"
                    style={font}
                  >
                    50,000+
                  </p>
                  <p className="text-xs text-[#1a2e1a]/50 font-medium">
                    reviews generated
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 sm:px-8 py-4">
                <div className="w-10 h-10 rounded-full bg-[#FFB5B5] border-2 border-[#1a2e1a] flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <div className="text-left">
                  <p
                    className="text-2xl font-bold text-[#1a2e1a]"
                    style={font}
                  >
                    4.8
                  </p>
                  <p className="text-xs text-[#1a2e1a]/50 font-medium">
                    avg rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED CASE STUDY ===== */}
      <section className="py-16 md:py-24 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl border-2 border-[#1a2e1a] shadow-[8px_8px_0px_0px_#1a2e1a] overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left - Story */}
              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-full bg-[#FFB5B5] border-2 border-[#1a2e1a] flex items-center justify-center">
                    <span
                      className="text-xl font-bold text-[#1a2e1a]"
                      style={font}
                    >
                      S
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold text-[#1a2e1a]"
                      style={font}
                    >
                      Sakura Bistro
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[#1a2e1a]/50">
                      <UtensilsCrossed className="h-3.5 w-3.5" />
                      <span>Restaurant</span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-[#1a2e1a]">
                  <Sparkles className="h-3 w-3" /> Featured Case Study
                </div>

                <div className="bg-[#FFF8F0] rounded-2xl p-6 border-2 border-[#1a2e1a]/10 mb-6">
                  <Quote className="h-8 w-8 text-[#FFE566] mb-3" />
                  <p className="text-[#1a2e1a]/70 leading-relaxed text-lg italic">
                    &ldquo;ReviewForge literally changed our business. We went
                    from invisible to the #1 rated Japanese restaurant in our
                    area.&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#1a2e1a]/10">
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-[#FFE566] fill-[#FFE566]"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-[#1a2e1a]">
                      Sarah Chen, Owner
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-3" style={font}>
                    Key Strategies Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "QR codes on tables", icon: <QrCode className="h-3.5 w-3.5" /> },
                      { label: "Voice capture", icon: <Mic className="h-3.5 w-3.5" /> },
                      { label: "AI responses", icon: <MessageSquare className="h-3.5 w-3.5" /> },
                    ].map((strategy) => (
                      <span
                        key={strategy.label}
                        className="inline-flex items-center gap-1.5 bg-[#C8F5D4] text-[#1a2e1a] px-3 py-1.5 rounded-full text-xs font-semibold border border-[#1a2e1a]/20"
                      >
                        {strategy.icon} {strategy.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#1a2e1a]/50">
                  <Clock className="h-4 w-4" />
                  <span>
                    Results achieved in <strong className="text-[#1a2e1a]">90 days</strong>
                  </span>
                </div>
              </div>

              {/* Right - Metrics */}
              <div className="bg-[#1a2e1a] p-8 md:p-12 flex flex-col justify-center">
                <p
                  className="text-xs font-bold uppercase tracking-widest text-[#FFF8F0]/30 mb-8"
                  style={font}
                >
                  The Transformation
                </p>

                <div className="space-y-6">
                  {/* Reviews metric */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#FFB5B5]/20 rounded-2xl p-5 border border-[#FFB5B5]/30">
                      <p className="text-xs text-[#FFF8F0]/40 font-semibold uppercase tracking-wider mb-1">
                        Before
                      </p>
                      <p
                        className="text-3xl font-bold text-[#FFB5B5]"
                        style={font}
                      >
                        12
                      </p>
                      <p className="text-xs text-[#FFF8F0]/40 mt-1">reviews</p>
                    </div>
                    <div className="bg-[#C8F5D4]/20 rounded-2xl p-5 border border-[#C8F5D4]/30">
                      <p className="text-xs text-[#FFF8F0]/40 font-semibold uppercase tracking-wider mb-1">
                        After
                      </p>
                      <p
                        className="text-3xl font-bold text-[#C8F5D4]"
                        style={font}
                      >
                        200+
                      </p>
                      <p className="text-xs text-[#FFF8F0]/40 mt-1">reviews</p>
                    </div>
                  </div>

                  {/* Rating metric */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#FFB5B5]/20 rounded-2xl p-5 border border-[#FFB5B5]/30">
                      <p className="text-xs text-[#FFF8F0]/40 font-semibold uppercase tracking-wider mb-1">
                        Before
                      </p>
                      <div className="flex items-center gap-2">
                        <p
                          className="text-3xl font-bold text-[#FFB5B5]"
                          style={font}
                        >
                          3.8
                        </p>
                        <Star className="h-5 w-5 text-[#FFB5B5] fill-[#FFB5B5]" />
                      </div>
                      <p className="text-xs text-[#FFF8F0]/40 mt-1">rating</p>
                    </div>
                    <div className="bg-[#C8F5D4]/20 rounded-2xl p-5 border border-[#C8F5D4]/30">
                      <p className="text-xs text-[#FFF8F0]/40 font-semibold uppercase tracking-wider mb-1">
                        After
                      </p>
                      <div className="flex items-center gap-2">
                        <p
                          className="text-3xl font-bold text-[#C8F5D4]"
                          style={font}
                        >
                          4.7
                        </p>
                        <Star className="h-5 w-5 text-[#C8F5D4] fill-[#C8F5D4]" />
                      </div>
                      <p className="text-xs text-[#FFF8F0]/40 mt-1">rating</p>
                    </div>
                  </div>

                  {/* Conversion metric */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#FFB5B5]/20 rounded-2xl p-5 border border-[#FFB5B5]/30">
                      <p className="text-xs text-[#FFF8F0]/40 font-semibold uppercase tracking-wider mb-1">
                        Before
                      </p>
                      <p
                        className="text-3xl font-bold text-[#FFB5B5]"
                        style={font}
                      >
                        3%
                      </p>
                      <p className="text-xs text-[#FFF8F0]/40 mt-1">
                        conversion
                      </p>
                    </div>
                    <div className="bg-[#C8F5D4]/20 rounded-2xl p-5 border border-[#C8F5D4]/30">
                      <p className="text-xs text-[#FFF8F0]/40 font-semibold uppercase tracking-wider mb-1">
                        After
                      </p>
                      <p
                        className="text-3xl font-bold text-[#C8F5D4]"
                        style={font}
                      >
                        52%
                      </p>
                      <p className="text-xs text-[#FFF8F0]/40 mt-1">
                        conversion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRY FILTER ===== */}
      <section className="py-8 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              Case Studies
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4"
              style={font}
            >
              SUCCESS ACROSS EVERY INDUSTRY
            </h2>
            <p className="text-lg text-[#1a2e1a]/50 max-w-2xl mx-auto">
              From restaurants to real estate, ReviewForge works for any
              business that depends on customer reviews.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveFilter(industry)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border-2 ${
                  activeFilter === industry
                    ? "bg-[#1a2e1a] text-[#FFF8F0] border-[#1a2e1a] shadow-[2px_2px_0px_0px_#1a2e1a]"
                    : "bg-white text-[#1a2e1a] border-[#1a2e1a]/20 hover:border-[#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a]"
                }`}
              >
                {industry !== "All" && industryIcon(industry)}
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CASE STUDY GRID ===== */}
      <section className="pb-20 md:pb-28 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((cs) => (
              <div
                key={cs.company}
                className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-[#1a2e1a] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: cs.accent }}
                  >
                    <span
                      className="text-lg font-bold text-[#1a2e1a]"
                      style={font}
                    >
                      {cs.initial}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold text-[#1a2e1a] leading-tight"
                      style={font}
                    >
                      {cs.company}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#1a2e1a]/50">
                      {industryIcon(cs.industry)}
                      <span>{cs.industry}</span>
                    </div>
                  </div>
                </div>

                {/* Before/After Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-[#FFB5B5]/20 rounded-xl p-3 text-center border border-[#FFB5B5]/30">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a2e1a]/40 mb-0.5">
                      Before
                    </p>
                    <p
                      className="text-lg font-bold text-[#1a2e1a]"
                      style={font}
                    >
                      {cs.beforeReviews}
                    </p>
                    <p className="text-[10px] text-[#1a2e1a]/40">reviews</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <span className="text-xs font-bold text-[#1a2e1a]/60">
                        {cs.beforeStars}
                      </span>
                      <Star className="h-3 w-3 text-[#FFE566] fill-[#FFE566]" />
                    </div>
                  </div>
                  <div className="bg-[#C8F5D4]/30 rounded-xl p-3 text-center border border-[#C8F5D4]/50">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a2e1a]/40 mb-0.5">
                      After
                    </p>
                    <p
                      className="text-lg font-bold text-[#1a2e1a]"
                      style={font}
                    >
                      {cs.afterReviews}
                    </p>
                    <p className="text-[10px] text-[#1a2e1a]/40">reviews</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <span className="text-xs font-bold text-[#1a2e1a]">
                        {cs.afterStars}
                      </span>
                      <Star className="h-3 w-3 text-[#FFE566] fill-[#FFE566]" />
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex-1 mb-5">
                  <Quote className="h-5 w-5 text-[#1a2e1a]/10 mb-2" />
                  <p className="text-sm text-[#1a2e1a]/60 leading-relaxed italic">
                    &ldquo;{cs.quote}&rdquo;
                  </p>
                  <p className="text-xs font-semibold text-[#1a2e1a] mt-2">
                    {cs.person},{" "}
                    <span className="text-[#1a2e1a]/50">{cs.role}</span>
                  </p>
                </div>

                {/* Key Win */}
                <div className="pt-4 border-t-2 border-[#1a2e1a]/10 flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a2e1a]/50 px-3 py-1.5 rounded-full border border-[#1a2e1a]/10"
                    style={{ backgroundColor: cs.accent + "33" }}
                  >
                    {cs.keyWinIcon} {cs.keyWin}
                  </span>
                  <button className="inline-flex items-center gap-1 text-xs font-bold text-[#1a2e1a] hover:text-[#1a2e1a]/70 transition-colors">
                    Read Full Story{" "}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state for filter */}
          {filteredStudies.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#D4CCFF] border-2 border-[#1a2e1a] flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-[#1a2e1a]" />
              </div>
              <h3
                className="text-xl font-bold text-[#1a2e1a] mb-2"
                style={font}
              >
                No case studies yet for this industry
              </h3>
              <p className="text-sm text-[#1a2e1a]/50">
                Check back soon. We&apos;re adding new success stories every
                week.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== LOGO CLOUD ===== */}
      <section className="py-16 md:py-20 bg-[#C8F5D4] border-y-2 border-[#1a2e1a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <p
            className="text-sm font-bold uppercase tracking-widest text-[#1a2e1a]/40 mb-2"
            style={font}
          >
            Trusted by 2,000+ businesses
          </p>
        </div>
        {/* Marquee row 1 */}
        <div className="flex animate-marquee whitespace-nowrap mb-4">
          {[0, 1].map((dupeIdx) => (
            <div key={dupeIdx} className="flex items-center gap-6 mr-6">
              {logoNames.map((name) => (
                <div
                  key={`${dupeIdx}-${name}`}
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#1a2e1a]/10"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1a2e1a]/5 flex items-center justify-center">
                    <span
                      className="text-sm font-bold text-[#1a2e1a]/30"
                      style={font}
                    >
                      {name[0]}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-[#1a2e1a]/60">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Marquee row 2 (reverse) */}
        <div
          className="flex animate-marquee whitespace-nowrap"
          style={{ animationDirection: "reverse", animationDuration: "35s" }}
        >
          {[0, 1].map((dupeIdx) => (
            <div key={dupeIdx} className="flex items-center gap-6 mr-6">
              {[...logoNames].reverse().map((name) => (
                <div
                  key={`${dupeIdx}-rev-${name}`}
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#1a2e1a]/10"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1a2e1a]/5 flex items-center justify-center">
                    <span
                      className="text-sm font-bold text-[#1a2e1a]/30"
                      style={font}
                    >
                      {name[0]}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-[#1a2e1a]/60">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== AGGREGATE STATS ===== */}
      <section className="py-20 md:py-28 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              By The Numbers
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4"
              style={font}
            >
              AVERAGE RESULTS ACROSS ALL CUSTOMERS
            </h2>
            <p className="text-lg text-[#1a2e1a]/50 max-w-2xl mx-auto">
              These aren&apos;t cherry-picked outliers. This is what our average
              customer experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Rating improvement */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FFE566] border-2 border-[#1a2e1a] flex items-center justify-center mx-auto mb-5">
                <Star className="h-8 w-8 text-[#1a2e1a]" />
              </div>
              <p
                className="text-5xl md:text-6xl font-bold text-[#1a2e1a] mb-2"
                style={font}
              >
                +0.9
              </p>
              <p className="text-sm font-semibold text-[#1a2e1a]/70 mb-1">
                stars
              </p>
              <p className="text-sm text-[#1a2e1a]/40">
                Average rating improvement
              </p>
            </div>

            {/* Review increase */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#C8F5D4] border-2 border-[#1a2e1a] flex items-center justify-center mx-auto mb-5">
                <TrendingUp className="h-8 w-8 text-[#1a2e1a]" />
              </div>
              <p
                className="text-5xl md:text-6xl font-bold text-[#1a2e1a] mb-2"
                style={font}
              >
                12x
              </p>
              <p className="text-sm font-semibold text-[#1a2e1a]/70 mb-1">
                more reviews
              </p>
              <p className="text-sm text-[#1a2e1a]/40">
                Average review increase
              </p>
            </div>

            {/* Time to results */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#D4CCFF] border-2 border-[#1a2e1a] flex items-center justify-center mx-auto mb-5">
                <Clock className="h-8 w-8 text-[#1a2e1a]" />
              </div>
              <p
                className="text-5xl md:text-6xl font-bold text-[#1a2e1a] mb-2"
                style={font}
              >
                45
              </p>
              <p className="text-sm font-semibold text-[#1a2e1a]/70 mb-1">
                days
              </p>
              <p className="text-sm text-[#1a2e1a]/40">
                Average time to results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 md:py-28 bg-[#1a2e1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] w-40 h-40 bg-[#C8F5D4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[10%] w-48 h-48 bg-[#FFE566]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4CCFF]/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border-2 border-[#1a2e1a]">
            <Sparkles className="h-3 w-3" /> Ready to start?
          </div>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#FFF8F0] mb-6 leading-tight"
            style={font}
          >
            YOUR SUCCESS STORY{" "}
            <span className="relative inline-block">
              <span className="relative z-10">STARTS HERE</span>
              <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#FFE566]/30 -z-0 rounded-sm" />
            </span>
          </h2>
          <p className="text-lg text-[#FFF8F0]/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 2,000+ businesses already growing with ReviewForge. Start
            collecting authentic reviews today and watch your online reputation
            transform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/register"
              className="group inline-flex items-center gap-3 bg-[#FFE566] text-[#1a2e1a] px-8 py-4 rounded-full text-base font-bold hover:bg-[#FFD700] transition-all border-2 border-[#FFE566] shadow-[4px_4px_0px_0px_rgba(255,229,102,0.3)]"
            >
              Get Started Free{" "}
              <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[#FFF8F0]/60 hover:text-[#FFF8F0] transition-colors text-sm font-medium"
            >
              Already have an account?{" "}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#FFF8F0]/30 font-medium">
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[#C8F5D4]" />
              No credit card needed
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[#C8F5D4]" />
              2 min setup
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-[#C8F5D4]" />
              Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#FFF8F0] border-t-2 border-[#1a2e1a] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center">
                  <span
                    className="text-white font-bold text-lg"
                    style={font}
                  >
                    R
                  </span>
                </div>
                <span
                  className="text-xl font-bold text-[#1a2e1a]"
                  style={font}
                >
                  ReviewForge
                </span>
              </Link>
              <p className="text-sm text-[#1a2e1a]/40 leading-relaxed">
                Your happy customers have a lot to say. We help them say it.
              </p>
            </div>
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4"
                style={font}
              >
                Product
              </h4>
              <ul className="space-y-3">
                {["Features", "Pricing", "How it works", "Integrations"].map(
                  (i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors"
                      >
                        {i}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4"
                style={font}
              >
                Company
              </h4>
              <ul className="space-y-3">
                {["About", "Blog", "Careers", "Contact"].map((i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4"
                style={font}
              >
                Legal
              </h4>
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
                    <Link
                      href={i.href}
                      className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors"
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 border-[#1a2e1a]/10 gap-4">
            <p className="text-xs text-[#1a2e1a]/30">
              &copy; 2026 Schroeder Technologies. All rights reserved.
              ReviewForge is a registered trademark.
            </p>
            <div className="flex items-center gap-6">
              {["Twitter", "LinkedIn", "Instagram"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs text-[#1a2e1a]/30 hover:text-[#1a2e1a] transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
