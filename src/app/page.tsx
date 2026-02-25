"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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
  Play,
  Quote,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
  const mainRef = useRef<HTMLDivElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } })
      heroTl
        .from(".hero-badge", { y: 30, opacity: 0, duration: 0.8 })
        .from(".hero-title-line", { y: 80, opacity: 0, duration: 1, stagger: 0.15 }, "-=0.4")
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(".hero-cta", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.4")
        .from(".hero-trust", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-visual", { y: 60, opacity: 0, scale: 0.95, duration: 1.2 }, "-=0.6")

      // Floating shapes parallax
      gsap.to(".float-shape-1", {
        y: -60, rotation: 15,
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
      })
      gsap.to(".float-shape-2", {
        y: -90, rotation: -20,
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
      })
      gsap.to(".float-shape-3", {
        y: -40, rotation: 10,
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
      })

      // Stat cards
      gsap.from(".stat-card", {
        y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".stats-section", start: "top 80%" },
      })

      // Problem section
      gsap.from(".problem-left", {
        x: -80, opacity: 0, duration: 1,
        scrollTrigger: { trigger: ".problem-section", start: "top 75%" },
      })
      gsap.from(".problem-right", {
        x: 80, opacity: 0, duration: 1,
        scrollTrigger: { trigger: ".problem-section", start: "top 75%" },
      })

      // Steps stagger
      gsap.from(".step-card", {
        y: 80, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".steps-section", start: "top 75%" },
      })

      // Demo
      gsap.from(".demo-before", {
        x: -60, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: ".demo-section", start: "top 75%" },
      })
      gsap.from(".demo-after", {
        x: 60, opacity: 0, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: ".demo-section", start: "top 75%" },
      })

      // Features
      gsap.from(".feature-card", {
        y: 60, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".features-section", start: "top 75%" },
      })

      // Testimonials
      gsap.from(".testimonial-card", {
        y: 50, opacity: 0, stagger: 0.15, duration: 0.7,
        scrollTrigger: { trigger: ".testimonials-section", start: "top 75%" },
      })

      // Pricing
      gsap.from(".pricing-card", {
        y: 80, opacity: 0, stagger: 0.12, duration: 0.8, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".pricing-section", start: "top 75%" },
      })

      // CTA
      gsap.from(".cta-content", {
        y: 40, opacity: 0, duration: 1,
        scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
      })

      // Section headings
      gsap.utils.toArray<HTMLElement>(".section-heading").forEach((el) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 0.8,
          scrollTrigger: { trigger: el, start: "top 85%" },
        })
      })

      // Parallax blobs
      gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((bg) => {
        gsap.to(bg, {
          y: -100,
          scrollTrigger: { trigger: bg.parentElement, start: "top bottom", end: "bottom top", scrub: 1.5 },
        })
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  const font = { fontFamily: "var(--font-display)" }

  return (
    <div ref={mainRef} className="min-h-screen bg-[#FFF8F0] overflow-hidden">
      {/* Skip to content */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-[#1a2e1a] focus:text-[#FFF8F0] focus:px-4 focus:py-2 focus:rounded-full">
        Skip to content
      </a>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-[#1a2e1a]/5" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg" style={font}>R</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-[#1a2e1a]" style={font}>ReviewForge</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors">How it works</a>
            <a href="#pricing" className="text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="hidden sm:inline-flex text-sm font-medium text-[#1a2e1a] px-4 py-2">Sign In</Link>
            <Link href="/register" className="hidden sm:inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a]">
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
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2">Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2">How it works</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#1a2e1a]/70 hover:text-[#1a2e1a] py-2">Pricing</a>
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="text-sm font-medium text-[#1a2e1a] px-4 py-2">Sign In</Link>
              <Link href="/register" className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-2.5 rounded-full text-sm font-semibold">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="main-content" className="hero-section relative pt-28 pb-20 md:pt-40 md:pb-32">
        <div className="float-shape-1 absolute top-32 left-[8%] w-20 h-20 bg-[#FFE566] rounded-full opacity-60" />
        <div className="float-shape-2 absolute top-48 right-[10%] w-16 h-16 bg-[#FFB5B5] rounded-2xl opacity-60 rotate-12" />
        <div className="float-shape-3 absolute bottom-40 left-[15%] w-12 h-12 bg-[#D4CCFF] rounded-xl opacity-60 -rotate-12" />
        <div className="absolute top-64 right-[20%] w-8 h-8 bg-[#C8F5D4] rounded-full opacity-50" />
        <div className="absolute bottom-60 right-[8%] w-14 h-14 bg-[#FFDAB5] rounded-2xl opacity-50 rotate-6" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto">
            <div className="hero-badge inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-5 py-2 rounded-full text-sm font-semibold mb-8 border-2 border-[#1a2e1a]">
              <Sparkles className="h-4 w-4" /> AI-Powered Review Platform
            </div>

            <h1 className="mb-8" style={font}>
              <span className="hero-title-line block text-5xl md:text-7xl lg:text-8xl font-bold text-[#1a2e1a] tracking-tight leading-[1.05]">TURN EVERY</span>
              <span className="hero-title-line block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
                <span className="relative inline-block"><span className="relative z-10 text-[#1a2e1a]">HAPPY</span><span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#FFE566] -z-0 rounded-sm" /></span>
                {" "}<span className="text-[#1a2e1a]">CUSTOMER</span>
              </span>
              <span className="hero-title-line block text-5xl md:text-7xl lg:text-8xl font-bold text-[#1a2e1a] tracking-tight leading-[1.05]">
                INTO A{" "}<span className="relative inline-block"><span className="relative z-10">5-STAR</span><span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#C8F5D4] -z-0 rounded-sm" /></span>{" "}REVIEW
              </span>
            </h1>

            <p className="hero-subtitle text-lg md:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              97% of happy customers leave without writing a review. ReviewForge captures their voice in 8 seconds and turns it into a polished, platform-ready review.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/register" className="hero-cta group inline-flex items-center gap-3 bg-[#1a2e1a] text-[#FFF8F0] px-8 py-4 rounded-full text-base font-bold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px]">
                Start Collecting Reviews <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how-it-works" className="hero-cta inline-flex items-center gap-3 bg-[#FFF8F0] text-[#1a2e1a] px-8 py-4 rounded-full text-base font-bold border-2 border-[#1a2e1a] hover:bg-[#C8F5D4] transition-all shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px]">
                <Play className="h-5 w-5" /> See How It Works
              </a>
            </div>

            <div className="hero-trust flex flex-wrap items-center justify-center gap-6 text-sm text-[#1a2e1a]/50 font-medium">
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#2d6a4f]" />No credit card needed</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#2d6a4f]" />2 min setup</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#2d6a4f]" />Google, Yelp &amp; more</span>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="hero-visual mt-20 max-w-5xl mx-auto">
            <div className="bg-[#1a2e1a] rounded-3xl p-6 md:p-8 border-2 border-[#1a2e1a] shadow-[8px_8px_0px_0px_rgba(26,46,26,0.3)]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFB5B5]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFE566]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#C8F5D4]" />
                <span className="text-[#C8F5D4]/60 text-xs ml-3 font-medium tracking-wider uppercase">ReviewForge Dashboard</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Reviews", value: "847", sub: "+23 this week", color: "#C8F5D4", icon: <TrendingUp className="h-3 w-3" /> },
                  { label: "Avg Rating", value: "4.8", sub: "Up from 4.2", color: "#FFE566", icon: <Star className="h-5 w-5 text-[#1a2e1a] fill-[#1a2e1a]" /> },
                  { label: "Response Rate", value: "100%", sub: "AI-powered", color: "#FFB5B5", icon: <Zap className="h-3 w-3" /> },
                  { label: "Conversion", value: "52%", sub: "vs 3% industry", color: "#D4CCFF", icon: null },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl p-5 border-2 border-[#1a2e1a]/10" style={{ backgroundColor: s.color }}>
                    <p className="text-[#1a2e1a]/50 text-xs font-semibold uppercase tracking-wider mb-2">{s.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-[#1a2e1a] text-3xl font-bold" style={font}>{s.value}</p>
                      {s.icon}
                    </div>
                    <p className="text-[#1a2e1a]/60 text-xs font-medium mt-1 flex items-center gap-1">{s.sub}</p>
                  </div>
                ))}
              </div>
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

      {/* Stats */}
      <section className="stats-section py-20 md:py-28 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "17x", label: "More reviews collected", color: "#C8F5D4", icon: TrendingUp },
              { value: "4.8", label: "Average star rating", color: "#FFE566", icon: Star },
              { value: "8s", label: "Time to leave a review", color: "#FFB5B5", icon: Clock },
              { value: "52%", label: "Customer conversion rate", color: "#D4CCFF", icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="stat-card text-center p-8 rounded-3xl border-2 border-[#1a2e1a] bg-white shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-default">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-[#1a2e1a]" style={{ backgroundColor: stat.color }}>
                  <stat.icon className="h-6 w-6 text-[#1a2e1a]" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-[#1a2e1a] mb-2" style={font}>{stat.value}</p>
                <p className="text-sm text-[#1a2e1a]/50 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="problem-section py-20 md:py-28 bg-[#C8F5D4] relative">
        <div className="parallax-bg absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[15%] w-32 h-32 bg-[#FFE566]/30 rounded-full blur-2xl" />
          <div className="absolute bottom-20 left-[10%] w-40 h-40 bg-[#D4CCFF]/30 rounded-full blur-2xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="section-heading text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">The Problem</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4" style={font}>YOUR ONLINE REPUTATION IS A LIE</h2>
            <p className="text-lg text-[#1a2e1a]/60 max-w-2xl mx-auto">Happy customers stay quiet. Angry ones write essays. Your star rating reflects just 3% of your actual customer experience.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="problem-left bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[6px_6px_0px_0px_#1a2e1a]">
              <div className="inline-flex items-center gap-2 bg-[#FFB5B5] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border-2 border-[#1a2e1a]">Without ReviewForge</div>
              <div className="space-y-4 text-[#1a2e1a]/70">
                {["100 customers visit your business", "70 had a great experience \u2192 only 2 write a review", "10 unhappy customers \u2192 4 write angry reviews"].map((text, i) => (
                  <p key={i} className="flex items-start gap-3"><span className="mt-1 w-6 h-6 rounded-full bg-[#FFB5B5] flex items-center justify-center shrink-0 border border-[#1a2e1a]/20 text-xs font-bold">{i + 1}</span>{text}</p>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t-2 border-[#1a2e1a]/10">
                <p className="text-xl font-bold text-[#1a2e1a]" style={font}>Result: 6 reviews, 67% negative</p>
                <p className="text-sm text-[#1a2e1a]/40 mt-1">Actual satisfaction: 70% happy</p>
              </div>
            </div>
            <div className="problem-right bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[6px_6px_0px_0px_#1a2e1a]">
              <div className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border-2 border-[#1a2e1a]">With ReviewForge</div>
              <div className="space-y-4 text-[#1a2e1a]/70">
                {["100 customers visit your business", "70 had a great experience \u2192 35 leave a review", "10 unhappy \u2192 4 leave reviews (handled privately)"].map((text, i) => (
                  <p key={i} className="flex items-start gap-3"><span className="mt-1 w-6 h-6 rounded-full bg-[#C8F5D4] flex items-center justify-center shrink-0 border border-[#1a2e1a]/20 text-xs font-bold">{i + 1}</span>{text}</p>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t-2 border-[#1a2e1a]/10">
                <p className="text-xl font-bold text-[#2d6a4f]" style={font}>Result: 44 reviews, 80% positive</p>
                <p className="text-sm text-[#1a2e1a]/40 mt-1">Your reputation finally matches reality</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="steps-section py-20 md:py-28 bg-[#FFF8F0]" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-heading text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">How It Works</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a]" style={font}>8 SECONDS FROM THOUGHT TO POSTED REVIEW</h2>
            <p className="text-lg text-[#1a2e1a]/50 max-w-xl mx-auto mt-4">No app downloads. No account creation. No typing. Just speak and post.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", icon: MessageSquare, title: "Customer taps link", desc: "QR code, text, or receipt link. Opens instantly in browser.", color: "#C8F5D4" },
              { step: "02", icon: Mic, title: "Speak naturally", desc: "\"The pasta was incredible and Jake was amazing.\" Just 3 seconds.", color: "#FFE566" },
              { step: "03", icon: Zap, title: "AI writes the review", desc: "Their words become a detailed, authentic review that sounds real.", color: "#FFB5B5" },
              { step: "04", icon: Send, title: "One tap to post", desc: "Goes live on Google, Yelp, and Facebook instantly.", color: "#D4CCFF" },
            ].map((item) => (
              <div key={item.step} className="step-card">
                <div className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-[#1a2e1a]/10" style={font}>{item.step}</span>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-[#1a2e1a]" style={{ backgroundColor: item.color }}>
                      <item.icon className="h-5 w-5 text-[#1a2e1a]" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a2e1a] mb-2" style={font}>{item.title}</h3>
                  <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee 2 */}
      <div className="bg-[#FFE566] py-4 border-y-2 border-[#1a2e1a] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap" style={{ animationDirection: "reverse", animationDuration: "25s" }}>
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-8 mr-8">
              {["TRUSTED BY 2,000+ BUSINESSES", "4.9 STAR RATING", "50,000+ REVIEWS GENERATED", "SETUP IN 2 MINUTES", "AI-POWERED MAGIC"].map((t) => (
                <span key={`${i}-${t}`} className="flex items-center gap-3">
                  <Sparkles className="h-4 w-4 text-[#1a2e1a]" />
                  <span className="text-[#1a2e1a] text-sm font-bold tracking-widest uppercase" style={font}>{t}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* AI Demo */}
      <section className="demo-section py-20 md:py-28 bg-[#FFF8F0] relative">
        <div className="parallax-bg absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[5%] w-24 h-24 bg-[#FFB5B5]/20 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-[8%] w-32 h-32 bg-[#C8F5D4]/20 rounded-full blur-xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="section-heading text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">AI Magic</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a]" style={font}>FROM RAW VOICE TO READY REVIEW</h2>
            <p className="text-lg text-[#1a2e1a]/50 max-w-xl mx-auto mt-4">The AI keeps their personality. It just adds detail and polish.</p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="demo-before bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#FFB5B5] border-2 border-[#1a2e1a] flex items-center justify-center"><Mic className="h-5 w-5 text-[#1a2e1a]" /></div>
                <div><p className="font-bold text-[#1a2e1a] text-sm" style={font}>CUSTOMER SAYS</p><p className="text-xs text-[#1a2e1a]/40">3 seconds of speaking</p></div>
              </div>
              <div className="bg-[#FFF8F0] rounded-2xl p-5 border-2 border-[#1a2e1a]/10">
                <p className="text-[#1a2e1a]/70 italic leading-relaxed">&ldquo;Yeah it was great, food was really good and Jake our waiter was super nice&rdquo;</p>
              </div>
              <div className="flex gap-1 mt-4">
                {[0, 1, 2].map((i) => <div key={i} className="h-1.5 flex-1 rounded-full bg-[#FFB5B5]" />)}
                {[0, 1].map((i) => <div key={i} className="h-1.5 flex-1 rounded-full bg-[#1a2e1a]/10" />)}
              </div>
            </div>
            <div className="demo-after bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#C8F5D4] border-2 border-[#1a2e1a] flex items-center justify-center"><Sparkles className="h-5 w-5 text-[#1a2e1a]" /></div>
                <div><p className="font-bold text-[#1a2e1a] text-sm" style={font}>REVIEWFORGE GENERATES</p><p className="text-xs text-[#1a2e1a]/40">Instant AI transformation</p></div>
              </div>
              <div className="bg-[#C8F5D4]/30 rounded-2xl p-5 border-2 border-[#2d6a4f]/20">
                <p className="text-[#1a2e1a] leading-relaxed">&ldquo;Had an excellent dinner here last night. The food was genuinely impressive, and our waiter Jake went out of his way to make sure everything was perfect. Attentive without hovering. We&apos;ll be back soon.&rdquo;</p>
              </div>
              <div className="flex gap-1 mt-4">
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5 text-[#FFE566] fill-[#FFE566]" />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section py-20 md:py-28 bg-[#1a2e1a] relative overflow-hidden" id="features">
        <div className="parallax-bg absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-48 h-48 bg-[#C8F5D4]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-[10%] w-56 h-56 bg-[#FFE566]/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="section-heading text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#FFF8F0]" style={font}>EVERYTHING YOU NEED TO OWN YOUR REPUTATION</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Mic, title: "Voice-First Capture", desc: "Customers speak for 3 seconds. The AI handles the rest. No typing, no friction.", color: "#C8F5D4" },
              { icon: Zap, title: "AI Review Writer", desc: "Turns casual speech into detailed, authentic reviews referencing specific details.", color: "#FFE566" },
              { icon: Globe, title: "Multi-Platform Posting", desc: "One review, every platform. Google, Yelp, Facebook, TripAdvisor. One tap.", color: "#FFB5B5" },
              { icon: MessageSquare, title: "AI Response Engine", desc: "Every review gets a personalized reply within minutes. Approve or go autopilot.", color: "#D4CCFF" },
              { icon: BarChart3, title: "Customer Intelligence", desc: "Track topics, sentiment shifts, and spot problems before they become patterns.", color: "#FFDAB5" },
              { icon: Shield, title: "Smart Triggers", desc: "SMS, QR code, NFC tap, email, or POS integration. Reach customers at the right moment.", color: "#C8F5D4" },
            ].map((f) => (
              <div key={f.title} className="feature-card">
                <div className="bg-[#FFF8F0] rounded-3xl p-7 border-2 border-[#1a2e1a]/20 hover:border-[#FFF8F0] transition-all h-full">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border-2 border-[#1a2e1a]" style={{ backgroundColor: f.color }}>
                    <f.icon className="h-6 w-6 text-[#1a2e1a]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a2e1a] mb-2" style={font}>{f.title}</h3>
                  <p className="text-sm text-[#1a2e1a]/50 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section py-20 md:py-28 bg-[#FFE566]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-heading text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a]" style={font}>LOVED BY BUSINESS OWNERS EVERYWHERE</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "We went from 12 reviews to 200+ in three months. Our Google rating jumped from 3.8 to 4.7. ReviewForge literally changed our business.", name: "Sarah Chen", role: "Owner, Sakura Bistro" },
              { quote: "The voice capture is genius. Customers actually enjoy leaving reviews now. We get compliments about how easy it is.", name: "Marcus Rivera", role: "GM, Rivera Auto Group" },
              { quote: "As a dentist, asking for reviews felt awkward. Now patients just scan a QR code in the waiting room and talk. Zero friction.", name: "Dr. Emily Park", role: "Park Family Dental" },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] h-full flex flex-col">
                  <Quote className="h-8 w-8 text-[#FFE566] mb-4" />
                  <p className="text-[#1a2e1a]/70 leading-relaxed flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex gap-1 mb-4">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 text-[#FFE566] fill-[#FFE566]" />)}</div>
                  <div className="flex items-center gap-3 pt-4 border-t-2 border-[#1a2e1a]/10">
                    <div className="w-10 h-10 rounded-full bg-[#C8F5D4] border-2 border-[#1a2e1a] flex items-center justify-center"><span className="text-sm font-bold text-[#1a2e1a]">{t.name[0]}</span></div>
                    <div><p className="text-sm font-bold text-[#1a2e1a]">{t.name}</p><p className="text-xs text-[#1a2e1a]/40">{t.role}</p></div>
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
      <section className="cta-section py-20 md:py-28 bg-[#1a2e1a] relative overflow-hidden">
        <div className="parallax-bg absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] w-40 h-40 bg-[#C8F5D4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[10%] w-48 h-48 bg-[#FFE566]/10 rounded-full blur-3xl" />
        </div>
        <div className="cta-content max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border-2 border-[#1a2e1a]">Ready to start?</div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#FFF8F0] mb-6 leading-tight" style={font}>STOP LOSING CUSTOMERS TO A BAD STAR RATING</h2>
          <p className="text-lg text-[#FFF8F0]/50 mb-10 max-w-2xl mx-auto leading-relaxed">Every day without ReviewForge, dozens of happy customers leave your business without saying a word online. Their silence costs you real money.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="group inline-flex items-center gap-3 bg-[#FFE566] text-[#1a2e1a] px-8 py-4 rounded-full text-base font-bold hover:bg-[#FFD700] transition-all border-2 border-[#FFE566] shadow-[4px_4px_0px_0px_rgba(255,229,102,0.3)]">
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
                {["Features", "Pricing", "How it works", "Integrations"].map((i) => <li key={i}><a href="#" className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">{i}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4" style={font}>Company</h4>
              <ul className="space-y-3">
                {["About", "Blog", "Careers", "Contact"].map((i) => <li key={i}><a href="#" className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">{i}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4" style={font}>Legal</h4>
              <ul className="space-y-3">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((i) => <li key={i}><a href="#" className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">{i}</a></li>)}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 border-[#1a2e1a]/10 gap-4">
            <p className="text-xs text-[#1a2e1a]/30">&copy; 2026 ReviewForge. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Twitter", "LinkedIn", "Instagram"].map((s) => <a key={s} href="#" className="text-xs text-[#1a2e1a]/30 hover:text-[#1a2e1a] transition-colors">{s}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
