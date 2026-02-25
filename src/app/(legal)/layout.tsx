"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowRight,
  ArrowLeft,
  Shield,
  FileText,
  Cookie,
  Scale,
  Database,
  Lock,
  ChevronRight,
} from "lucide-react"

const font = { fontFamily: "var(--font-display)" }

const legalPages = [
  { href: "/privacy", label: "Privacy Policy", icon: Shield, color: "#C8F5D4" },
  { href: "/terms", label: "Terms of Service", icon: FileText, color: "#FFE566" },
  { href: "/cookies", label: "Cookie Policy", icon: Cookie, color: "#FFB5B5" },
  { href: "/acceptable-use", label: "Acceptable Use", icon: Scale, color: "#D4CCFF" },
  { href: "/dpa", label: "Data Processing", icon: Database, color: "#FFDAB5" },
  { href: "/security", label: "Security", icon: Lock, color: "#C8F5D4" },
]

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-[#1a2e1a]/5">
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
            <Link href="/register" className="hidden sm:inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0f1f0f] transition-all border-2 border-[#1a2e1a]">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#1a2e1a]/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
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

      {/* Legal Nav Bar */}
      <div className="pt-16 sm:pt-20 bg-[#1a2e1a] border-b-2 border-[#1a2e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {legalPages.map((page) => {
              const isActive = pathname === page.href
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap border-2 transition-all shrink-0 ${
                    isActive
                      ? "border-[#1a2e1a] text-[#1a2e1a] shadow-[2px_2px_0px_0px_#1a2e1a]"
                      : "border-transparent text-[#FFF8F0]/60 hover:text-[#FFF8F0] hover:border-[#FFF8F0]/20"
                  }`}
                  style={isActive ? { backgroundColor: page.color } : undefined}
                >
                  <page.icon className="h-3.5 w-3.5" />
                  {page.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#1a2e1a]/50 hover:text-[#1a2e1a] transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
        </div>
        {children}
      </main>

      {/* Footer */}
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
              <p className="text-sm text-[#1a2e1a]/40 leading-relaxed mb-3">A product by Schroeder Technologies.</p>
              <p className="text-sm text-[#1a2e1a]/40 leading-relaxed">Your happy customers have a lot to say. We help them say it.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4" style={font}>Product</h4>
              <ul className="space-y-3">
                {[
                  { label: "Features", href: "/#features" },
                  { label: "Pricing", href: "/#pricing" },
                  { label: "How it works", href: "/#how-it-works" },
                ].map((i) => (
                  <li key={i.label}><Link href={i.href} className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">{i.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4" style={font}>Company</h4>
              <ul className="space-y-3">
                <li><span className="text-sm text-[#1a2e1a]/60">Schroeder Technologies</span></li>
                <li><a href="mailto:legal@schroedertech.com" className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">legal@schroedertech.com</a></li>
                <li><a href="mailto:support@reviewforge.com" className="text-sm text-[#1a2e1a]/60 hover:text-[#1a2e1a] transition-colors">support@reviewforge.com</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a2e1a]/30 mb-4" style={font}>Legal</h4>
              <ul className="space-y-3">
                {legalPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className={`text-sm transition-colors flex items-center gap-1.5 ${
                        pathname === page.href ? "text-[#1a2e1a] font-semibold" : "text-[#1a2e1a]/60 hover:text-[#1a2e1a]"
                      }`}
                    >
                      {pathname === page.href && <ChevronRight className="h-3 w-3" />}
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-2 border-[#1a2e1a]/10 gap-4">
            <p className="text-xs text-[#1a2e1a]/30">&copy; 2026 Schroeder Technologies. All rights reserved. ReviewForge is a registered trademark.</p>
            <div className="flex items-center gap-6">
              {["Twitter", "LinkedIn", "Instagram"].map((s) => (
                <span key={s} className="text-xs text-[#1a2e1a]/30">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
