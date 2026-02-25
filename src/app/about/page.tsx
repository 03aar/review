"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Shield,
  Heart,
  Lightbulb,
  Eye,
  Users,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Building2,
  MapPin,
  Briefcase,
  ChevronRight,
  Sparkles,
  BarChart3,
  Globe,
} from "lucide-react"

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const font = { fontFamily: "var(--font-display)" }

  const teamMembers = [
    {
      name: "Alex Schroeder",
      initials: "AS",
      title: "CEO & Co-Founder",
      bio: "Former restaurant owner who got tired of 3-star ratings despite 90% happy customers. Built ReviewForge to fix what he lived through every day.",
      color: "#C8F5D4",
    },
    {
      name: "Maya Patel",
      initials: "MP",
      title: "CTO & Co-Founder",
      bio: "AI/ML engineer, ex-Google, obsessed with making AI feel human. Leads the engineering team that turns messy voice clips into polished reviews.",
      color: "#FFE566",
    },
    {
      name: "Jordan Kim",
      initials: "JK",
      title: "VP of Product",
      bio: "Built products at Yelp and Square. Knows the review ecosystem inside out and designs every feature around real business owner pain points.",
      color: "#FFB5B5",
    },
    {
      name: "Sarah Chen",
      initials: "SC",
      title: "Head of AI",
      bio: "PhD in NLP from Stanford. Makes our AI understand emotion, not just words. Her models capture personality in every generated review.",
      color: "#D4CCFF",
    },
    {
      name: "Marcus Rivera",
      initials: "MR",
      title: "Head of Sales",
      bio: "Helped 500+ businesses grow their online presence before joining. Connects with business owners because he genuinely understands their struggles.",
      color: "#FFDAB5",
    },
    {
      name: "Dr. Emily Park",
      initials: "EP",
      title: "Head of Customer Success",
      bio: "Former business consultant who ensures every customer gets maximum value. Turned our onboarding into an industry-leading experience.",
      color: "#C8F5D4",
    },
  ]

  const openPositions = [
    {
      title: "Senior Full-Stack Engineer",
      location: "Remote",
      description:
        "Build the next generation of our review platform. TypeScript, React, Node.js, and a passion for delightful user experiences.",
      color: "#C8F5D4",
    },
    {
      title: "AI/ML Engineer",
      location: "Remote",
      description:
        "Push the boundaries of NLP and voice-to-text. Train models that understand sentiment, context, and personality from short voice clips.",
      color: "#FFE566",
    },
    {
      title: "Customer Success Manager",
      location: "Remote",
      description:
        "Help businesses unlock the full potential of ReviewForge. You will be their advocate, advisor, and biggest champion.",
      color: "#FFB5B5",
    },
    {
      title: "Enterprise Sales Representative",
      location: "Remote",
      description:
        "Drive growth with multi-location businesses and franchises. Consultative selling to decision-makers who care about reputation.",
      color: "#D4CCFF",
    },
  ]

  const stats = [
    { value: "2,000+", label: "Businesses served", icon: Building2, color: "#C8F5D4" },
    { value: "50,000+", label: "Reviews generated", icon: Star, color: "#FFE566" },
    { value: "17x", label: "More reviews vs. industry avg", icon: TrendingUp, color: "#FFB5B5" },
    { value: "4.8", label: "Avg star rating across clients", icon: Star, color: "#D4CCFF" },
    { value: "8s", label: "Average time to review", icon: Clock, color: "#FFDAB5" },
    { value: "52%", label: "Customer conversion rate", icon: Target, color: "#C8F5D4" },
  ]

  const values = [
    {
      icon: Heart,
      title: "Authenticity First",
      description:
        "Every review on our platform comes from a real customer interaction. We never fake, manipulate, or manufacture reviews. Our AI enhances expression, it does not invent it.",
      color: "#C8F5D4",
    },
    {
      icon: Lightbulb,
      title: "Technology for Good",
      description:
        "We build AI that empowers small businesses to compete with larger companies on reputation. A local pizzeria deserves the same online presence as a national chain.",
      color: "#FFE566",
    },
    {
      icon: Users,
      title: "Customer Obsession",
      description:
        "We eat our own dog food. Our support team uses ReviewForge to collect feedback about ReviewForge. If something frustrates our users, we feel it first.",
      color: "#FFB5B5",
    },
    {
      icon: Eye,
      title: "Transparency",
      description:
        "Clear pricing, honest terms, open about how our AI works. No dark patterns, no hidden fees, no bait-and-switch. What you see is what you get.",
      color: "#D4CCFF",
    },
  ]

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
              <span className="text-white font-bold text-sm sm:text-lg" style={font}>
                R
              </span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-[#1a2e1a]" style={font}>
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
              href="/about"
              className="text-sm font-medium text-[#1a2e1a] transition-colors"
            >
              About
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
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#1a2e1a] py-2"
            >
              About
            </Link>
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="text-sm font-medium text-[#1a2e1a] px-4 py-2">
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

      {/* Hero */}
      <section id="main-content" className="relative pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="absolute top-32 left-[8%] w-20 h-20 bg-[#FFE566] rounded-full opacity-60" />
        <div className="absolute top-48 right-[10%] w-16 h-16 bg-[#FFB5B5] rounded-2xl opacity-60 rotate-12" />
        <div className="absolute bottom-40 left-[15%] w-12 h-12 bg-[#D4CCFF] rounded-xl opacity-60 -rotate-12" />
        <div className="absolute top-64 right-[20%] w-8 h-8 bg-[#C8F5D4] rounded-full opacity-50" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-5 py-2 rounded-full text-sm font-semibold mb-8 border-2 border-[#1a2e1a]">
              <Sparkles className="h-4 w-4" /> ABOUT US
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a2e1a] tracking-tight leading-[1.05] mb-6" style={font}>
              WE BELIEVE EVERY{" "}
              <span className="relative inline-block">
                <span className="relative z-10">HAPPY</span>
                <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#FFE566] -z-0 rounded-sm" />
              </span>{" "}
              CUSTOMER DESERVES A{" "}
              <span className="relative inline-block">
                <span className="relative z-10">VOICE</span>
                <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#C8F5D4] -z-0 rounded-sm" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Schroeder Technologies builds AI tools that bridge the gap between how customers feel and what the internet says. ReviewForge is our flagship product, and this is our story.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              {[
                { value: "2,000+", label: "Businesses" },
                { value: "50,000+", label: "Reviews" },
                { value: "4.9", label: "Rating" },
                { value: "Founded 2024", label: "" },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="bg-white rounded-2xl px-6 py-4 border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a]"
                >
                  <p className="text-xl md:text-2xl font-bold text-[#1a2e1a]" style={font}>
                    {stat.value}
                  </p>
                  {stat.label && (
                    <p className="text-xs text-[#1a2e1a]/40 font-medium">{stat.label}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28 bg-[#C8F5D4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Our Story
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a]" style={font}>
              FROM FRUSTRATION TO A PLATFORM
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[6px_6px_0px_0px_#1a2e1a]">
              <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border-2 border-[#1a2e1a]">
                The Problem We Lived
              </div>
              <div className="space-y-4 text-[#1a2e1a]/70 leading-relaxed">
                <p>
                  ReviewForge was born out of firsthand frustration. Our founder, Alex Schroeder, spent years running a family restaurant in Delaware. Night after night, customers would shake his hand, tell him the meal was incredible, and promise to leave a review.
                </p>
                <p>
                  They almost never did. Meanwhile, the handful of unhappy customers had no trouble finding the time to write detailed complaints. His 3.8-star Google rating told a story that had nothing to do with reality.
                </p>
                <p>
                  The data confirmed what Alex experienced:{" "}
                  <span className="font-bold text-[#1a2e1a]">
                    97% of happy customers leave without writing a review.
                  </span>{" "}
                  The silent majority stays silent, and businesses pay the price in lost revenue, missed customers, and an online reputation that feels like a funhouse mirror.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[6px_6px_0px_0px_#1a2e1a]">
              <div className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border-2 border-[#1a2e1a]">
                The Solution We Built
              </div>
              <div className="space-y-4 text-[#1a2e1a]/70 leading-relaxed">
                <p>
                  Alex partnered with Maya Patel, an AI engineer he met at a startup event in Philadelphia. Together, they asked a simple question: what if you could capture that handshake moment and turn it into a posted review in under 10 seconds?
                </p>
                <p>
                  That question became ReviewForge. A platform where customers speak naturally for a few seconds, and AI transforms their words into a detailed, authentic review ready to post on Google, Yelp, or any platform.
                </p>
                <p>
                  Founded in 2024 and headquartered in Wilmington, Delaware, Schroeder Technologies now serves over 2,000 businesses with a distributed team across the country. We are backed by the belief that{" "}
                  <span className="font-bold text-[#1a2e1a]">
                    your online reputation should reflect your actual customer experience.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 md:py-28 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#FFB5B5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              Mission & Values
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a]" style={font}>
              WHAT WE STAND FOR
            </h2>
            <p className="text-lg text-[#1a2e1a]/50 max-w-2xl mx-auto mt-4">
              These are not just words on a wall. They are the principles we use to make every product decision, hire every team member, and serve every customer.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]"
                  style={{ backgroundColor: value.color }}
                >
                  <value.icon className="h-6 w-6 text-[#1a2e1a]" />
                </div>
                <h3 className="text-lg font-bold text-[#1a2e1a] mb-2" style={font}>
                  {value.title}
                </h3>
                <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 md:py-28 bg-[#FFE566]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Our Team
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a]" style={font}>
              MEET THE PEOPLE BEHIND REVIEWFORGE
            </h2>
            <p className="text-lg text-[#1a2e1a]/50 max-w-2xl mx-auto mt-4">
              A team of builders, operators, and former business owners who understand the problem because they have lived it.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-[#1a2e1a] shrink-0"
                    style={{ backgroundColor: member.color }}
                  >
                    <span className="text-xl font-bold text-[#1a2e1a]" style={font}>
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1a2e1a]" style={font}>
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#1a2e1a]/50 font-medium">{member.title}</p>
                  </div>
                </div>
                <p className="text-sm text-[#1a2e1a]/60 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-20 md:py-28 bg-[#1a2e1a] relative overflow-hidden">
        <div className="absolute top-20 right-[10%] w-48 h-48 bg-[#C8F5D4]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[10%] w-56 h-56 bg-[#FFE566]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              By the Numbers
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#FFF8F0]" style={font}>
              THE IMPACT SO FAR
            </h2>
            <p className="text-lg text-[#FFF8F0]/40 max-w-xl mx-auto mt-4">
              Real metrics from real businesses using ReviewForge every day.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-8 rounded-3xl border-2 border-[#1a2e1a]/20 bg-[#FFF8F0] shadow-[4px_4px_0px_0px_rgba(255,248,240,0.1)]"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-[#1a2e1a]"
                  style={{ backgroundColor: stat.color }}
                >
                  <stat.icon className="h-6 w-6 text-[#1a2e1a]" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-[#1a2e1a] mb-2" style={font}>
                  {stat.value}
                </p>
                <p className="text-sm text-[#1a2e1a]/50 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schroeder Technologies */}
      <section className="py-20 md:py-28 bg-[#D4CCFF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Parent Company
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a]" style={font}>
                SCHROEDER TECHNOLOGIES
              </h2>
            </div>
            <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-[#1a2e1a] shadow-[6px_6px_0px_0px_#1a2e1a]">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-bold text-[#1a2e1a] mb-4" style={font}>
                    Schroeder Technologies, Inc.
                  </h3>
                  <div className="space-y-4 text-[#1a2e1a]/70 leading-relaxed">
                    <p>
                      Schroeder Technologies is a Delaware corporation focused on building AI-powered tools that solve real problems for real businesses. We believe artificial intelligence should amplify human intention, not replace it.
                    </p>
                    <p>
                      ReviewForge is our flagship product, born from the simple observation that most businesses have far more happy customers than their online reviews suggest. Every tool we build starts from a question: how can AI close the gap between reality and perception?
                    </p>
                  </div>
                </div>
                <div className="space-y-5">
                  {[
                    {
                      icon: Building2,
                      label: "Incorporated",
                      value: "Delaware Corporation, 2024",
                      color: "#C8F5D4",
                    },
                    {
                      icon: MapPin,
                      label: "Headquarters",
                      value: "Wilmington, Delaware",
                      color: "#FFE566",
                    },
                    {
                      icon: Globe,
                      label: "Team",
                      value: "Distributed across the United States",
                      color: "#FFB5B5",
                    },
                    {
                      icon: Zap,
                      label: "Focus",
                      value: "AI-powered business tools",
                      color: "#D4CCFF",
                    },
                    {
                      icon: Shield,
                      label: "Commitment",
                      value: "Privacy, security, and ethical AI",
                      color: "#FFDAB5",
                    },
                    {
                      icon: BarChart3,
                      label: "Flagship Product",
                      value: "ReviewForge",
                      color: "#C8F5D4",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 border-[#1a2e1a]"
                        style={{ backgroundColor: item.color }}
                      >
                        <item.icon className="h-5 w-5 text-[#1a2e1a]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#1a2e1a]/40">
                          {item.label}
                        </p>
                        <p className="text-sm font-medium text-[#1a2e1a]">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-20 md:py-28 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#FFDAB5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <Briefcase className="h-3.5 w-3.5" /> Careers
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a]" style={font}>
              JOIN OUR TEAM
            </h2>
            <p className="text-lg text-[#1a2e1a]/50 max-w-2xl mx-auto mt-4">
              We are hiring passionate people who want to help businesses get the reputation they deserve. All positions are remote-first.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {openPositions.map((position) => (
              <div
                key={position.title}
                className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#1a2e1a]" style={font}>
                      {position.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-3.5 w-3.5 text-[#1a2e1a]/40" />
                      <span className="text-xs text-[#1a2e1a]/40 font-medium">
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-1.5"
                    style={{ backgroundColor: position.color }}
                  />
                </div>
                <p className="text-sm text-[#1a2e1a]/50 leading-relaxed mb-5">
                  {position.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1a2e1a] hover:text-[#1a2e1a]/70 transition-colors"
                >
                  Apply Now <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] max-w-md mx-auto">
              <p className="text-sm text-[#1a2e1a]/60 mb-3">
                Don&apos;t see a role that fits? We are always looking for talented people.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a]"
              >
                Send a General Application <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#1a2e1a] relative overflow-hidden">
        <div className="absolute top-10 left-[10%] w-40 h-40 bg-[#C8F5D4]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[10%] w-48 h-48 bg-[#FFE566]/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border-2 border-[#1a2e1a]">
            See it in action
          </div>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#FFF8F0] mb-6 leading-tight"
            style={font}
          >
            WANT TO SEE WHAT WE&apos;VE BUILT?
          </h2>
          <p className="text-lg text-[#FFF8F0]/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            ReviewForge helps businesses turn every happy customer into a 5-star review. See how it works with a free account, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
              Already have an account? <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFF8F0] border-t-2 border-[#1a2e1a] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg" style={font}>
                    R
                  </span>
                </div>
                <span className="text-xl font-bold text-[#1a2e1a]" style={font}>
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
                {[
                  { label: "Features", href: "/#features" },
                  { label: "Pricing", href: "/#pricing" },
                  { label: "How it works", href: "/#how-it-works" },
                  { label: "Integrations", href: "#" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
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
                {[
                  { label: "About", href: "/about" },
                  { label: "Blog", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Contact", href: "#" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors"
                    >
                      {item.label}
                    </Link>
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
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 border-[#1a2e1a]/10 gap-4">
            <p className="text-xs text-[#1a2e1a]/30">
              &copy; 2026 Schroeder Technologies. All rights reserved. ReviewForge is a registered
              trademark.
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
