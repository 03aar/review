"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Clock,
  User,
  ArrowRight,
  Mail,
  Filter,
  Tag,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  Star,
} from "lucide-react"
import { toast } from "sonner"

const font = { fontFamily: "var(--font-display)" }

const categories = ["All", "Guides", "Strategy", "Case Studies", "Product", "Industry News"] as const
type Category = (typeof categories)[number]

const categoryColors: Record<string, string> = {
  Guide: "#D4CCFF",
  Guides: "#D4CCFF",
  Strategy: "#FFE566",
  "Case Study": "#FFB5B5",
  "Case Studies": "#FFB5B5",
  Product: "#C8F5D4",
  "Product Updates": "#C8F5D4",
  "Industry News": "#FFDAB5",
}

const blogPosts = [
  {
    title: "Why 97% of Happy Customers Never Leave Reviews (And How to Fix It)",
    category: "Strategy",
    filterCategory: "Strategy",
    date: "Feb 18, 2026",
    readTime: "8 min read",
    color: "#FFE566",
    excerpt:
      "Most satisfied customers walk out the door without saying a word online. Here is why that happens and proven strategies to change it.",
    author: "Alex Schroeder",
  },
  {
    title: "Voice vs. Text: Why Spoken Reviews Convert 3x Better",
    category: "Strategy",
    filterCategory: "Strategy",
    date: "Feb 15, 2026",
    readTime: "6 min read",
    color: "#C8F5D4",
    excerpt:
      "New data shows that voice-based review collection dramatically outperforms traditional text forms. We break down the numbers.",
    author: "Jordan Lee",
  },
  {
    title: "How Sakura Bistro Went from 12 to 200+ Reviews in 90 Days",
    category: "Case Study",
    filterCategory: "Case Studies",
    date: "Feb 12, 2026",
    readTime: "10 min read",
    color: "#FFB5B5",
    excerpt:
      "A deep dive into how one local restaurant transformed their online reputation using voice-first review capture.",
    author: "Sarah Chen",
  },
  {
    title: "AI-Generated Reviews: Ethics, Best Practices, and What You Need to Know",
    category: "Guide",
    filterCategory: "Guides",
    date: "Feb 10, 2026",
    readTime: "15 min read",
    color: "#D4CCFF",
    excerpt:
      "With AI playing a bigger role in review management, understanding the ethical boundaries is more important than ever.",
    author: "Alex Schroeder",
  },
  {
    title: "5 QR Code Strategies That Actually Work for Review Collection",
    category: "Strategy",
    filterCategory: "Strategy",
    date: "Feb 7, 2026",
    readTime: "7 min read",
    color: "#FFDAB5",
    excerpt:
      "Not all QR code placements are created equal. Learn which locations and formats drive the most review completions.",
    author: "Marcus Rivera",
  },
  {
    title: "ReviewForge 2.0: What's New in Our Latest Release",
    category: "Product",
    filterCategory: "Product",
    date: "Feb 5, 2026",
    readTime: "5 min read",
    color: "#C8F5D4",
    excerpt:
      "Announcing major updates including AI auto-responses, competitor benchmarking, and a completely redesigned dashboard.",
    author: "Jordan Lee",
  },
  {
    title: "The Psychology Behind Star Ratings: Why 4.5 Stars Beats 5.0",
    category: "Industry News",
    filterCategory: "Industry News",
    date: "Feb 2, 2026",
    readTime: "9 min read",
    color: "#FFE566",
    excerpt:
      "Consumers trust businesses with a 4.5-star rating more than those with a perfect 5.0. The psychology explains why.",
    author: "Dr. Emily Park",
  },
  {
    title: "How to Respond to Negative Reviews: A Step-by-Step Guide",
    category: "Guide",
    filterCategory: "Guides",
    date: "Jan 28, 2026",
    readTime: "11 min read",
    color: "#FFB5B5",
    excerpt:
      "Negative reviews do not have to be disasters. Learn how to turn unhappy customers into loyal advocates with the right response.",
    author: "Alex Schroeder",
  },
  {
    title: "Local SEO in 2026: Why Reviews Are Your #1 Ranking Factor",
    category: "Strategy",
    filterCategory: "Strategy",
    date: "Jan 25, 2026",
    readTime: "8 min read",
    color: "#D4CCFF",
    excerpt:
      "Google's latest algorithm updates make online reviews the single biggest factor in local search rankings. Here is what that means.",
    author: "Sarah Chen",
  },
]

const categoryPostCounts = [
  { name: "Guides", count: 12, color: "#D4CCFF" },
  { name: "Strategy", count: 18, color: "#FFE566" },
  { name: "Case Studies", count: 8, color: "#FFB5B5" },
  { name: "Product Updates", count: 6, color: "#C8F5D4" },
  { name: "Industry News", count: 10, color: "#FFDAB5" },
]

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All")
  const [email, setEmail] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filteredPosts =
    activeFilter === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.filterCategory === activeFilter)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      toast.error("Please enter your email address.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.")
      return
    }
    toast.success("You're subscribed! Check your inbox for a welcome email.")
    setEmail("")
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
              href="/blog"
              className="text-sm font-medium text-[#1a2e1a] transition-colors"
            >
              Blog
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
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#1a2e1a] py-2"
            >
              Blog
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
      <section id="main-content" className="relative pt-28 pb-16 md:pt-40 md:pb-20">
        {/* Floating shapes */}
        <div className="absolute top-32 left-[8%] w-20 h-20 bg-[#FFE566] rounded-full opacity-40" />
        <div className="absolute top-48 right-[10%] w-16 h-16 bg-[#FFB5B5] rounded-2xl opacity-40 rotate-12" />
        <div className="absolute bottom-20 left-[15%] w-12 h-12 bg-[#D4CCFF] rounded-xl opacity-40 -rotate-12" />
        <div className="absolute top-64 right-[20%] w-8 h-8 bg-[#C8F5D4] rounded-full opacity-30" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#D4CCFF] text-[#1a2e1a] px-5 py-2 rounded-full text-sm font-semibold mb-8 border-2 border-[#1a2e1a]">
              <BookOpen className="h-4 w-4" /> BLOG
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a2e1a] tracking-tight leading-[1.05] mb-6"
              style={font}
            >
              INSIGHTS, GUIDES{" "}
              <span className="relative inline-block">
                <span className="relative z-10">&amp; NEWS</span>
                <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-4 md:h-6 bg-[#FFE566] -z-0 rounded-sm" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#1a2e1a]/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Tips, strategies, and stories to help you build a 5-star reputation.
            </p>

            {/* Category filter pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Filter className="h-4 w-4 text-[#1a2e1a]/40 hidden sm:block" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                    activeFilter === category
                      ? "bg-[#1a2e1a] text-[#FFF8F0] border-[#1a2e1a] shadow-[2px_2px_0px_0px_rgba(26,46,26,0.3)]"
                      : "bg-white text-[#1a2e1a] border-[#1a2e1a]/20 hover:border-[#1a2e1a] hover:bg-[#1a2e1a]/5"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl border-2 border-[#1a2e1a] shadow-[6px_6px_0px_0px_#1a2e1a] overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Image area */}
              <div
                className="relative min-h-[280px] md:min-h-[420px] flex items-center justify-center"
                style={{ backgroundColor: "#C8F5D4" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-white/80 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-[#1a2e1a]/20">
                      <Star className="h-10 w-10 text-[#1a2e1a]" />
                    </div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-[#FFE566] fill-[#FFE566]"
                        />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-[#1a2e1a]/60">
                      The Complete Guide
                    </p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-[#FFE566]/60 rounded-full" />
                <div className="absolute bottom-8 right-8 w-16 h-16 bg-[#D4CCFF]/50 rounded-2xl rotate-12" />
                <div className="absolute top-12 right-12 w-8 h-8 bg-[#FFB5B5]/50 rounded-lg -rotate-6" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-[#1a2e1a]"
                    style={{ backgroundColor: "#D4CCFF" }}
                  >
                    <Tag className="h-3 w-3" /> Guide
                  </span>
                  <span className="text-xs text-[#1a2e1a]/40 font-medium">Featured</span>
                </div>

                <h2
                  className="text-2xl md:text-3xl font-bold text-[#1a2e1a] mb-4 leading-tight"
                  style={font}
                >
                  The Complete Guide to Getting More Google Reviews in 2026
                </h2>

                <p className="text-[#1a2e1a]/60 leading-relaxed mb-6">
                  Everything you need to know about collecting, managing, and leveraging
                  Google reviews for your business. From setup to advanced strategies,
                  this guide covers it all.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-[#1a2e1a]/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#C8F5D4] border-2 border-[#1a2e1a] flex items-center justify-center">
                      <span className="text-xs font-bold text-[#1a2e1a]">A</span>
                    </div>
                    <span className="font-medium text-[#1a2e1a]">Alex Schroeder</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>February 20, 2026</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>12 min read</span>
                  </div>
                </div>

                <div>
                  <Link
                    href="#"
                    className="group inline-flex items-center gap-3 bg-[#1a2e1a] text-[#FFF8F0] px-7 py-3.5 rounded-full text-sm font-bold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    Read More{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Post Grid */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-3xl border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all overflow-hidden flex flex-col"
              >
                {/* Colored header area */}
                <div
                  className="relative h-44 flex items-center justify-center"
                  style={{ backgroundColor: post.color }}
                >
                  <div className="text-center px-6">
                    <BookOpen className="h-8 w-8 text-[#1a2e1a]/30 mx-auto mb-2" />
                    <p
                      className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/40"
                      style={font}
                    >
                      {post.category}
                    </p>
                  </div>
                  <span
                    className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-[#1a2e1a] bg-white/80"
                  >
                    <Tag className="h-3 w-3" /> {post.category}
                  </span>
                  {/* Decorative circle */}
                  <div className="absolute bottom-3 right-4 w-8 h-8 bg-white/40 rounded-full" />
                </div>

                {/* Card body */}
                <div className="p-7 flex flex-col flex-1">
                  <h3
                    className="text-lg font-bold text-[#1a2e1a] mb-3 leading-snug line-clamp-2"
                    style={font}
                  >
                    {post.title}
                  </h3>

                  <p className="text-sm text-[#1a2e1a]/50 leading-relaxed mb-5 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-[#1a2e1a]/40 mb-5 pt-4 border-t-2 border-[#1a2e1a]/5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#C8F5D4] border border-[#1a2e1a]/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-[#1a2e1a]">
                          {post.author[0]}
                        </span>
                      </div>
                      <span className="font-medium text-[#1a2e1a]/60">{post.author}</span>
                    </div>
                    <span className="text-[#1a2e1a]/20">|</span>
                    <span>{post.date}</span>
                    <span className="text-[#1a2e1a]/20">|</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link
                    href="#"
                    className="group inline-flex items-center gap-2 text-sm font-bold text-[#1a2e1a] hover:text-[#1a2e1a]/70 transition-colors"
                  >
                    Read More{" "}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Empty state when filter yields no results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="h-12 w-12 text-[#1a2e1a]/20 mx-auto mb-4" />
              <h3
                className="text-xl font-bold text-[#1a2e1a] mb-2"
                style={font}
              >
                No posts found
              </h3>
              <p className="text-sm text-[#1a2e1a]/50">
                No blog posts match the selected category. Try selecting a different filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 md:py-28 bg-[#1a2e1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] w-40 h-40 bg-[#C8F5D4]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-[10%] w-48 h-48 bg-[#FFE566]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4CCFF]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border-2 border-[#1a2e1a]">
            <Mail className="h-3.5 w-3.5" /> Newsletter
          </div>

          <h2
            className="text-3xl md:text-5xl font-bold text-[#FFF8F0] mb-6 leading-tight"
            style={font}
          >
            STAY IN THE LOOP
          </h2>

          <p className="text-lg text-[#FFF8F0]/50 mb-10 max-w-xl mx-auto leading-relaxed">
            Get weekly tips on review management, reputation building, and growing your
            business.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto mb-6"
          >
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1a2e1a]/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-5 py-4 rounded-full border-2 border-[#1a2e1a]/20 bg-white text-[#1a2e1a] text-sm font-medium placeholder:text-[#1a2e1a]/30 focus:outline-none focus:border-[#FFE566] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 bg-[#FFE566] text-[#1a2e1a] px-8 py-4 rounded-full text-sm font-bold hover:bg-[#FFD700] transition-all border-2 border-[#FFE566] shadow-[4px_4px_0px_0px_rgba(255,229,102,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(255,229,102,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] whitespace-nowrap"
            >
              Subscribe{" "}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-sm text-[#FFF8F0]/30 flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            Join 5,000+ business owners
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-28 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-[#C8F5D4] text-[#1a2e1a] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border-2 border-[#1a2e1a]">
              <Filter className="h-3.5 w-3.5" /> Categories
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1a2e1a]"
              style={font}
            >
              BROWSE BY TOPIC
            </h2>
            <p className="text-lg text-[#1a2e1a]/50 max-w-xl mx-auto mt-4">
              Find exactly what you need across our growing library of articles.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {categoryPostCounts.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  const matchingFilter = categories.find(
                    (c) => c === cat.name || c === cat.name.replace(" Updates", "")
                  )
                  if (matchingFilter) {
                    setActiveFilter(matchingFilter)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                }}
                className="bg-white rounded-3xl p-7 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-[#1a2e1a] group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: cat.color }}
                >
                  <Tag className="h-6 w-6 text-[#1a2e1a]" />
                </div>
                <h3
                  className="text-sm font-bold text-[#1a2e1a] mb-1"
                  style={font}
                >
                  {cat.name}
                </h3>
                <p className="text-xs text-[#1a2e1a]/40 font-medium">
                  {cat.count} posts
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#FFE566] border-y-2 border-[#1a2e1a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-2xl md:text-4xl font-bold text-[#1a2e1a] mb-4"
            style={font}
          >
            READY TO BUILD YOUR 5-STAR REPUTATION?
          </h2>
          <p className="text-[#1a2e1a]/60 mb-8 max-w-xl mx-auto">
            Join thousands of businesses using ReviewForge to collect, manage, and
            showcase their customer reviews.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-3 bg-[#1a2e1a] text-[#FFF8F0] px-8 py-4 rounded-full text-base font-bold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_rgba(26,46,26,0.3)]"
            >
              Get Started Free{" "}
              <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors text-sm font-medium"
            >
              Learn more about ReviewForge <ChevronRight className="h-4 w-4" />
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
                {["Features", "Pricing", "How it works", "Integrations"].map((item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors"
                    >
                      {item}
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
                  { label: "About", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: "Careers", href: "/" },
                  { label: "Contact", href: "/" },
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
              &copy; 2026 Schroeder Technologies. All rights reserved. ReviewForge is a
              registered trademark.
            </p>
            <div className="flex items-center gap-6">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs text-[#1a2e1a]/30 hover:text-[#1a2e1a] transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
