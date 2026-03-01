"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRight,
  Star,
  Check,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Quote,
  MessageSquare,
  Zap,
  Target,
  TrendingDown,
  AlertTriangle,
  Frown,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
  const mainRef = useRef<HTMLDivElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } })
      heroTl
        .from(".hero-badge", { y: 30, opacity: 0, duration: 0.8 })
        .from(".hero-title-line", { y: 80, opacity: 0, duration: 1, stagger: 0.15 }, "-=0.4")
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(".hero-cta", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.4")
        .from(".hero-trust", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-visual", { y: 60, opacity: 0, scale: 0.95, duration: 1.2 }, "-=0.6")

      gsap.to(".float-shape-1", {
        y: -60, rotation: 15,
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
      })
      gsap.to(".float-shape-2", {
        y: -40, rotation: -10,
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
      })

      gsap.from(".problem-card", {
        y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".problem-section", start: "top 80%" },
      })

      gsap.from(".solution-cta", {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: ".solution-cta", start: "top 90%" },
      })

      gsap.utils.toArray<HTMLElement>(".step-row").forEach((row) => {
        gsap.from(row, {
          y: 80, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 80%" },
        })
      })

      gsap.from(".testimonial-card", {
        y: 50, opacity: 0, stagger: 0.15, duration: 0.7,
        scrollTrigger: { trigger: ".testimonials-section", start: "top 75%" },
      })

      gsap.from(".pricing-card", {
        y: 80, opacity: 0, stagger: 0.12, duration: 0.8, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".pricing-section", start: "top 75%" },
      })

      gsap.from(".cta-content", {
        y: 40, opacity: 0, duration: 1,
        scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
      })

      gsap.utils.toArray<HTMLElement>(".section-heading").forEach((el) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 85%" },
        })
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  const font = { fontFamily: "var(--font-display)" }

  return (
    <div ref={mainRef} className="min-h-screen bg-[#FFF8F0] overflow-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-[#1a2e1a] focus:text-[#FFF8F0] focus:px-4 focus:py-2 focus:rounded-full">
        Skip to content
      </a>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-[#1a2e1a]/5" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#34D399] rounded-[14px] flex items-center justify-center shadow-[3px_3px_0px_0px_#0D3B2E] border-2 border-[#0D3B2E]">
              <span className="text-[#0D3B2E] font-bold text-base sm:text-lg" style={font}>R</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-[#1a2e1a]" style={font}>ReviewForge</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors uppercase tracking-wider">Features</a>
            <a href="#pricing" className="text-sm font-bold text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors uppercase tracking-wider">Pricing</a>
            <Link href="/dashboard" className="text-sm font-bold text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors uppercase tracking-wider">Dashboard</Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="hidden sm:inline-flex text-sm font-bold text-[#1a2e1a] px-5 py-2.5 rounded-full border-2 border-[#1a2e1a] hover:bg-[#1a2e1a] hover:text-[#FFF8F0] transition-all uppercase tracking-wider">Log In</Link>
            <Link href="/register" className="hidden sm:inline-flex items-center gap-2 bg-[#FFE566] text-[#0D3B2E] px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#FFD700] transition-all border-2 border-[#0D3B2E] uppercase tracking-wider">
              Start Free
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
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2 uppercase tracking-wider">Features</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2 uppercase tracking-wider">Pricing</a>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2 uppercase tracking-wider">Dashboard</Link>
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="text-sm font-bold text-[#1a2e1a] px-5 py-2.5 rounded-full border-2 border-[#1a2e1a] uppercase tracking-wider">Log In</Link>
              <Link href="/register" className="inline-flex items-center gap-2 bg-[#FFE566] text-[#0D3B2E] px-5 py-2.5 rounded-full text-sm font-bold border-2 border-[#0D3B2E] uppercase tracking-wider">
                Start Free
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="main-content" className="hero-section relative pt-28 pb-8 md:pt-40 md:pb-12 bg-[#34D399]">
        <div className="float-shape-1 absolute top-32 left-[5%] w-24 h-24 bg-[#A7F3D0] rounded-full opacity-70" />
        <div className="float-shape-2 absolute top-48 right-[8%] w-16 h-16 bg-[#D1D5DB] rounded-2xl opacity-60 rotate-12" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto">
            <div className="hero-badge inline-flex items-center gap-2 bg-[#FFF8F0] text-[#1a2e1a] px-5 py-2 rounded-full text-sm font-semibold mb-8 border-2 border-[#1a2e1a]">
              <Sparkles className="h-4 w-4" /> AI-POWERED REVIEW MANAGEMENT
            </div>

            <h1 className="mb-8" style={font}>
              <span className="hero-title-line block text-5xl md:text-7xl lg:text-8xl font-bold text-[#0D3B2E] tracking-tight leading-[1.05]">TURN CUSTOMER</span>
              <span className="hero-title-line block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#0D3B2E]">FEEDBACK</span>
                  <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 8 Q75 0 150 6 Q225 12 300 4" stroke="#FFE566" strokeWidth="8" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
              <span className="hero-title-line block text-5xl md:text-7xl lg:text-8xl font-bold text-[#0D3B2E] tracking-tight leading-[1.05]">INTO REVENUE</span>
            </h1>

            <p className="hero-subtitle text-lg md:text-xl text-[#0D3B2E]/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Collect, generate, and manage reviews across 20+ platforms with AI. <strong>10x your reviews in 30 days.</strong>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/register" className="hero-cta group inline-flex items-center gap-3 bg-[#FFE566] text-[#0D3B2E] px-8 py-4 rounded-full text-base font-bold hover:bg-[#FFD700] transition-all border-2 border-[#0D3B2E] shadow-[4px_4px_0px_0px_rgba(13,59,46,0.15)] hover:shadow-[2px_2px_0px_0px_rgba(13,59,46,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] uppercase tracking-wider">
                Start Free Trial
              </Link>
              <a href="#how-it-works" className="hero-cta inline-flex items-center gap-3 bg-[#FFF8F0] text-[#0D3B2E] px-8 py-4 rounded-full text-base font-bold border-2 border-[#0D3B2E] hover:bg-white transition-all shadow-[4px_4px_0px_0px_rgba(13,59,46,0.15)] hover:shadow-[2px_2px_0px_0px_rgba(13,59,46,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] uppercase tracking-wider">
                Watch Demo
              </a>
            </div>

            <div className="hero-trust flex flex-wrap items-center justify-center gap-4 text-sm text-[#0D3B2E]/70 font-medium">
              <span className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 text-[#FFE566] fill-[#FFE566]" />)}
                <span className="ml-1">4.9/5 rating</span>
              </span>
              <span className="text-[#0D3B2E]/30">|</span>
              <span>2,500+ businesses</span>
              <span className="text-[#0D3B2E]/30">|</span>
              <span>1M+ reviews managed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-[#34D399] pb-20 md:pb-28">
        <div className="hero-visual max-w-5xl mx-auto px-6 pt-12">
          <div className="bg-[#0D3B2E] rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF7A7A]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFE566]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#34D399]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "TOTAL REVIEWS", value: "12,847", badge: "+23%", icon: <MessageSquare className="h-4 w-4 text-[#0D3B2E]" />, iconBg: "#34D399" },
                { label: "AVG RATING", value: "4.8", badge: "+0.3", icon: <Star className="h-4 w-4 text-[#0D3B2E]" />, iconBg: "#FFE566" },
                { label: "RESPONSE RATE", value: "98%", badge: "+5%", icon: <Zap className="h-4 w-4 text-[#0D3B2E]" />, iconBg: "#34D399" },
                { label: "REVENUE IMPACT", value: "$847K", badge: "+34%", icon: <TrendingUp className="h-4 w-4 text-[#0D3B2E]" />, iconBg: "#34D399" },
              ].map((s) => (
                <div key={s.label} className="bg-[#FFF8F0] rounded-2xl p-4 md:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.iconBg }}>{s.icon}</div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#C8F5D4] text-[#0D3B2E]">{s.badge}</span>
                  </div>
                  <p className="text-[#1a2e1a]/50 text-[10px] font-bold uppercase tracking-wider mb-1">{s.label}</p>
                  <p className="text-[#1a2e1a] text-2xl md:text-3xl font-bold" style={font}>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#FFF8F0] rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#34D399] mb-4">Recent Reviews</p>
                <div className="space-y-4">
                  {[
                    { name: "Sarah M.", platform: "Google", text: "Amazing service! The AI suggestions were spot on...", color: "#FFB5B5" },
                    { name: "Mike R.", platform: "Yelp", text: "Best coffee in town. Will definitely come back!", color: "#D4CCFF" },
                  ].map((r) => (
                    <div key={r.name} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-[#1a2e1a]" style={{ backgroundColor: r.color }}>{r.name[0]}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-bold text-[#1a2e1a]">{r.name}</span>
                          <span className="flex gap-0.5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3 w-3 text-[#FFE566] fill-[#FFE566]" />)}</span>
                          <span className="text-xs text-[#1a2e1a]/40">{r.platform}</span>
                        </div>
                        <p className="text-xs text-[#1a2e1a]/60 truncate">{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#FFF8F0] rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#34D399] mb-4">AI Response Suggestion</p>
                <div className="border-2 border-dashed border-[#34D399]/40 rounded-xl p-4 bg-[#34D399]/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-[#0D3B2E]" />
                    <span className="text-sm font-bold text-[#1a2e1a]">Generated Response</span>
                  </div>
                  <p className="text-sm text-[#1a2e1a]/70 leading-relaxed mb-4">&ldquo;Thank you so much for your wonderful review, Sarah! We&apos;re thrilled to hear that our AI suggestions helped enhance your experience. Your feedback means the world to us!&rdquo;</p>
                  <button className="bg-[#0D3B2E] text-[#FFF8F0] text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wider hover:bg-[#1a2e1a] transition-colors">Publish Response</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section py-20 md:py-28 bg-[#0D3B2E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-heading text-center mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#FFF8F0] mb-4" style={font}>YOUR REPUTATION IS UNDER ATTACK</h2>
            <p className="text-base md:text-lg text-[#FFF8F0]/60 max-w-2xl mx-auto leading-relaxed">
              In today&apos;s digital world, a single negative review can undo years of hard work. Here&apos;s what&apos;s happening to businesses without review management:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {[
              { icon: Frown, title: "Negative Reviews Go Viral", desc: "One bad review can cost you 30 potential customers. Without proper management, your reputation suffers silently.", stat: "94%", statLabel: "of customers avoid businesses with bad reviews" },
              { icon: Clock, title: "Hours Wasted on Manual Responses", desc: "Crafting thoughtful responses takes time you don't have. Most businesses take 24+ hours to respond, if at all.", stat: "24h", statLabel: "average response time without automation" },
              { icon: AlertTriangle, title: "Competitors Are Winning", desc: "While you're busy running your business, competitors with better review strategies are stealing your customers.", stat: "72%", statLabel: "of customers check reviews before visiting" },
              { icon: TrendingDown, title: "Revenue Leaking Daily", desc: "Every day without a review strategy costs you money. Low ratings mean lower search rankings and fewer customers.", stat: "$8,000", statLabel: "average monthly revenue lost to bad reviews" },
            ].map((item) => (
              <div key={item.title} className="problem-card">
                <div className="bg-[#FFF8F0] rounded-2xl p-6 md:p-8 border-2 border-[#FF7A7A] h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFE0E0] flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-[#FF7A7A]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1a2e1a]" style={font}>{item.title}</h3>
                  </div>
                  <p className="text-sm text-[#1a2e1a]/60 leading-relaxed flex-1">{item.desc}</p>
                  <div className="mt-4 pt-2">
                    <span className="text-3xl font-bold text-[#FF7A7A]" style={font}>{item.stat}</span>
                    <span className="text-sm text-[#1a2e1a]/50 ml-3">{item.statLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="solution-cta text-center">
            <a href="#how-it-works" className="inline-flex items-center gap-3 text-[#34D399] px-6 py-3 rounded-full text-sm font-bold border-2 border-[#34D399] hover:bg-[#34D399]/10 transition-all">
              <Sparkles className="h-4 w-4" /> But there&apos;s a solution... <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="steps-section py-20 md:py-28 bg-gradient-to-b from-[#FFF8F0] to-[#E8FFF5]" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-heading text-center mb-16" id="features">
            <div className="inline-flex items-center gap-2 bg-[#E8FFF5] text-[#0D3B2E] px-5 py-2 rounded-full text-sm font-bold mb-6 border-2 border-[#0D3B2E] uppercase tracking-widest">How It Works</div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0D3B2E]" style={font}>FROM CHAOS TO CONTROL<br className="hidden md:block" /> IN 4 SIMPLE STEPS</h2>
            <p className="text-base md:text-lg text-[#1a2e1a]/50 max-w-xl mx-auto mt-4">No technical skills required. No complicated setup. Just results.</p>
          </div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Step 01 - text left, visual right */}
            <div className="step-row grid md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-white rounded-3xl p-8 border-2 border-[#0D3B2E] flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#34D399] flex items-center justify-center text-white font-bold text-sm" style={font}>01</div>
                  <h3 className="text-xl font-bold text-[#1a2e1a]" style={font}>Connect Your Platforms</h3>
                </div>
                <p className="text-[#1a2e1a]/60 leading-relaxed mb-6 flex-1">Link your Google, Yelp, Facebook, and TripAdvisor accounts in under 2 minutes. We pull in all your reviews automatically.</p>
                <div className="flex flex-wrap gap-2">
                  {["One-click integration", "Real-time sync", "All platforms unified"].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0D3B2E] bg-[#E8FFF5] px-3 py-1.5 rounded-full border border-[#34D399]/30">
                      <Check className="h-3 w-3 text-[#34D399]" />{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-[#E8FFF5] rounded-3xl p-8 border-2 border-[#0D3B2E]/20 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                  {["Google", "Yelp", "Facebook", "TripAdvisor"].map((platform) => (
                    <div key={platform} className="bg-white rounded-xl p-4 flex items-center gap-3 border border-[#0D3B2E]/10">
                      <CheckCircle2 className="h-5 w-5 text-[#34D399] shrink-0" />
                      <span className="text-sm font-medium text-[#1a2e1a]">{platform}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 02 - visual left, text right */}
            <div className="step-row grid md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-[#FFFDE8] rounded-3xl p-8 border-2 border-[#0D3B2E]/20 flex flex-col items-center justify-center order-2 md:order-1">
                <div className="bg-white rounded-xl p-4 border border-[#0D3B2E]/10 mb-4 w-full max-w-xs">
                  <div className="flex items-center gap-2 mb-1">
                    {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3.5 w-3.5 text-[#FFE566] fill-[#FFE566]" />)}
                    <span className="text-xs font-bold text-[#34D399] ml-1">Positive</span>
                  </div>
                  <p className="text-sm text-[#1a2e1a]/70">&ldquo;Amazing coffee!&rdquo;</p>
                </div>
                <Sparkles className="h-6 w-6 text-[#0D3B2E]/40 mb-4" />
                <div className="flex gap-2">
                  {[{ label: "coffee", color: "#C8F5D4" }, { label: "service", color: "#B5E8D5" }, { label: "atmosphere", color: "#FFD6E8" }].map((tag) => (
                    <span key={tag.label} className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#0D3B2E]/20" style={{ backgroundColor: tag.color }}>{tag.label}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 border-2 border-[#0D3B2E] flex flex-col order-1 md:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FFE566] flex items-center justify-center text-[#0D3B2E] font-bold text-sm" style={font}>02</div>
                  <h3 className="text-xl font-bold text-[#1a2e1a]" style={font}>AI Analyzes Every Review</h3>
                </div>
                <p className="text-[#1a2e1a]/60 leading-relaxed mb-6 flex-1">Our AI instantly reads each review, understands the sentiment, and identifies key topics mentioned by customers.</p>
                <div className="flex flex-wrap gap-2">
                  {["Sentiment analysis", "Topic extraction", "Urgency detection"].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0D3B2E] bg-[#E8FFF5] px-3 py-1.5 rounded-full border border-[#34D399]/30">
                      <Check className="h-3 w-3 text-[#34D399]" />{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 03 - text left, visual right */}
            <div className="step-row grid md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-white rounded-3xl p-8 border-2 border-[#0D3B2E] flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#34D399] flex items-center justify-center text-white font-bold text-sm" style={font}>03</div>
                  <h3 className="text-xl font-bold text-[#1a2e1a]" style={font}>Get Perfect Responses Instantly</h3>
                </div>
                <p className="text-[#1a2e1a]/60 leading-relaxed mb-6 flex-1">Click a button and get a personalized, on-brand response. Edit if you want, or publish directly to the platform.</p>
                <div className="flex flex-wrap gap-2">
                  {["Multiple tone options", "Brand voice learning", "One-click publish"].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0D3B2E] bg-[#E8FFF5] px-3 py-1.5 rounded-full border border-[#34D399]/30">
                      <Check className="h-3 w-3 text-[#34D399]" />{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-[#E8FFF5] rounded-3xl p-8 border-2 border-[#0D3B2E]/20 flex flex-col items-center justify-center">
                <div className="bg-[#34D399]/10 rounded-xl p-5 border border-[#34D399]/30 mb-4 w-full max-w-xs">
                  <p className="text-sm text-[#1a2e1a]/70 leading-relaxed mb-3">&ldquo;Thank you so much for your wonderful feedback! We&apos;re thrilled you loved the coffee...&rdquo;</p>
                  <div className="flex gap-2">
                    <span className="text-xs font-medium bg-[#34D399] text-white px-3 py-1 rounded-full">Professional</span>
                    <span className="text-xs font-medium border border-[#1a2e1a]/20 text-[#1a2e1a] px-3 py-1 rounded-full">Friendly</span>
                  </div>
                </div>
                <button className="bg-[#FFE566] text-[#0D3B2E] font-bold text-sm px-6 py-2.5 rounded-full border-2 border-[#0D3B2E] hover:bg-[#FFD700] transition-colors">
                  Publish Response &rarr;
                </button>
              </div>
            </div>

            {/* Step 04 - visual left, text right */}
            <div className="step-row grid md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-gradient-to-br from-[#FFF0F0] to-[#FFE8E0] rounded-3xl p-8 border-2 border-[#0D3B2E]/20 flex flex-col items-center justify-center order-2 md:order-1">
                <div className="flex gap-3 mb-6">
                  {[
                    { icon: MessageSquare, bg: "#34D399" },
                    { icon: Zap, bg: "#0D3B2E" },
                    { icon: Target, bg: "#FFB5B5" },
                  ].map((item, i) => (
                    <div key={i} className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: item.bg }}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl px-6 py-3 border-2 border-[#0D3B2E]/15 text-center">
                  <p className="text-2xl font-bold text-[#1a2e1a]" style={font}>4.8 &rarr; 4.9</p>
                  <p className="text-xs font-semibold text-[#34D399] mt-1">Rating improved!</p>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 border-2 border-[#0D3B2E] flex flex-col order-1 md:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#FFB5B5] flex items-center justify-center text-[#0D3B2E] font-bold text-sm" style={font}>04</div>
                  <h3 className="text-xl font-bold text-[#1a2e1a]" style={font}>Collect More 5-Star Reviews</h3>
                </div>
                <p className="text-[#1a2e1a]/60 leading-relaxed mb-6 flex-1">Automatically request reviews from happy customers via SMS, email, or QR codes. Watch your rating climb.</p>
                <div className="flex flex-wrap gap-2">
                  {["Smart timing", "Multi-channel outreach", "A/B testing built-in"].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0D3B2E] bg-[#E8FFF5] px-3 py-1.5 rounded-full border border-[#34D399]/30">
                      <Check className="h-3 w-3 text-[#34D399]" />{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section py-20 md:py-28 bg-[#0D3B2E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-heading text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#0D3B2E] px-5 py-2 rounded-full text-sm font-bold mb-6 border-2 border-[#0D3B2E] uppercase tracking-widest">Success Stories</div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#FFF8F0]" style={font}>TRUSTED BY 2,000+{" "}<br className="hidden md:block" />LOCAL BUSINESSES</h2>
            <p className="text-base md:text-lg text-[#FFF8F0]/50 max-w-xl mx-auto mt-4">See how businesses like yours transformed their online reputation.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { quote: "ReviewForge increased our Google rating from 4.1 to 4.8 in just 3 months. The AI responses save us hours every week.", name: "Maria Santos", initials: "MS", role: "Owner, Bella Luna Restaurant", rating: "4.8", growth: "+0.7 stars", color: "#34D399" },
              { quote: "We went from 50 reviews to over 400 in 6 months. The automated collection campaigns are incredibly effective.", name: "James Chen", initials: "JC", role: "Manager, Pacific Auto Repair", rating: "4.9", growth: "+350 reviews", color: "#FFE566" },
              { quote: "Finally, a tool that actually works! Response time went from 2 days to 2 hours. Our customers feel heard.", name: "Sarah Kim", initials: "SK", role: "Director, Kim Dental Group", rating: "4.7", growth: "+89% response rate", color: "#FFB5B5" },
              { quote: "The competitor tracking feature helped us identify exactly what we needed to improve. Game changer for our strategy.", name: "David Park", initials: "DP", role: "CEO, Park Hotels", rating: "4.9", growth: "+$12K monthly", color: "#D4CCFF" },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="bg-[#FFF8F0] rounded-2xl p-6 md:p-8 h-full flex flex-col">
                  <Quote className="h-8 w-8 text-[#34D399]/40 mb-4 shrink-0" />
                  <p className="text-[#1a2e1a]/70 leading-relaxed flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#1a2e1a]/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#1a2e1a]" style={{ backgroundColor: t.color }}>{t.initials}</div>
                      <div>
                        <p className="text-sm font-bold text-[#1a2e1a]">{t.name}</p>
                        <p className="text-xs text-[#1a2e1a]/40">{t.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3 w-3 text-[#FFE566] fill-[#FFE566]" />)}</div>
                        <span className="text-lg font-bold text-[#1a2e1a]" style={font}>{t.rating}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#34D399] mt-0.5">&#8599; {t.growth}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section py-20 md:py-28 bg-[#FFF8F0]" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-heading text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#FFB5B5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a]" style={font}>SIMPLE PRICING, REAL RESULTS</h2>
            <p className="text-lg text-[#1a2e1a]/50 max-w-xl mx-auto mt-4">Start free. Upgrade when you see the reviews coming in.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Free", price: "$0", period: "forever", features: ["1 location", "25 reviews/mo", "Basic AI", "Google posting", "Email support"], color: "#FFF8F0", highlight: false },
              { name: "Starter", price: "$29", period: "/month", features: ["1 location", "100 reviews/mo", "Voice capture", "Multi-platform", "AI responses", "Basic analytics"], color: "#C8F5D4", highlight: false },
              { name: "Growth", price: "$79", period: "/month", features: ["3 locations", "Unlimited reviews", "SMS + QR triggers", "AI auto-responses", "Full analytics", "Priority support"], color: "#FFE566", highlight: true },
              { name: "Business", price: "$199", period: "/month", features: ["10 locations", "Everything unlimited", "White-label", "API access", "Competitor tracking", "Account manager"], color: "#D4CCFF", highlight: false },
            ].map((plan) => (
              <div key={plan.name} className="pricing-card">
                <div className={`rounded-3xl p-7 border-2 border-[#1a2e1a] h-full flex flex-col ${plan.highlight ? "shadow-[6px_6px_0px_0px_#1a2e1a] relative" : "shadow-[4px_4px_0px_0px_#1a2e1a]"}`} style={{ backgroundColor: plan.color }}>
                  {plan.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1a2e1a] text-[#FFE566] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap">Most Popular</div>}
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#1a2e1a]/50 mb-1" style={font}>{plan.name}</h3>
                  <div className="mb-1"><span className="text-4xl font-bold text-[#1a2e1a]" style={font}>{plan.price}</span><span className="text-sm text-[#1a2e1a]/50 ml-1">{plan.period}</span></div>
                  <Link href="/register" className="inline-flex items-center justify-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-3 rounded-full text-sm font-bold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a] mb-6 mt-4">
                    Get Started <ChevronRight className="h-4 w-4" />
                  </Link>
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-sm text-[#1a2e1a]/60 flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#1a2e1a]/10 flex items-center justify-center shrink-0"><Check className="h-3 w-3 text-[#1a2e1a]" /></div>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-20 md:py-28 bg-[#0D3B2E] relative overflow-hidden">
        <div className="absolute top-10 left-[10%] w-40 h-40 bg-[#34D399]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-[10%] w-48 h-48 bg-[#FFE566]/10 rounded-full blur-3xl" />
        <div className="cta-content max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#0D3B2E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border-2 border-[#0D3B2E]">Ready to start?</div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#FFF8F0] mb-6 leading-tight" style={font}>STOP LOSING CUSTOMERS TO A BAD STAR RATING</h2>
          <p className="text-lg text-[#FFF8F0]/50 mb-10 max-w-2xl mx-auto leading-relaxed">Every day without ReviewForge, dozens of happy customers leave your business without saying a word online. Their silence costs you real money.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="group inline-flex items-center gap-3 bg-[#FFE566] text-[#0D3B2E] px-8 py-4 rounded-full text-base font-bold hover:bg-[#FFD700] transition-all border-2 border-[#FFE566] shadow-[4px_4px_0px_0px_rgba(255,229,102,0.3)]">
              Get Started Free <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 text-[#FFF8F0]/60 hover:text-[#FFF8F0] transition-colors text-sm font-medium">Already have an account? <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFF8F0] border-t-2 border-[#1a2e1a] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center"><span className="text-white font-bold text-lg" style={font}>R</span></div>
                <span className="text-xl font-bold text-[#1a2e1a]" style={font}>ReviewForge</span>
              </div>
              <p className="text-sm text-[#1a2e1a]/40 leading-relaxed">Your happy customers have a lot to say. We help them say it.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4" style={font}>Product</h4>
              <ul className="space-y-3">
                {[
                  { label: "Features", href: "/features" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "Customers", href: "/customers" },
                  { label: "Help Center", href: "/help" },
                ].map((i) => <li key={i.label}><Link href={i.href} className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">{i.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4" style={font}>Company</h4>
              <ul className="space-y-3">
                {[
                  { label: "About", href: "/about" },
                  { label: "Blog", href: "/blog" },
                  { label: "Contact", href: "/contact" },
                  { label: "Careers", href: "/about" },
                ].map((i) => <li key={i.label}><Link href={i.href} className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">{i.label}</Link></li>)}
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
                ].map((i) => <li key={i.label}><Link href={i.href} className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">{i.label}</Link></li>)}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 border-[#1a2e1a]/10 gap-4">
            <p className="text-xs text-[#1a2e1a]/30">&copy; 2026 Schroeder Technologies. All rights reserved. ReviewForge is a registered trademark.</p>
            <div className="flex items-center gap-6">
              {["Twitter", "LinkedIn", "Instagram"].map((s) => <span key={s} className="text-xs text-[#1a2e1a]/30">{s}</span>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
