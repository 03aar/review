"use client"

import Link from "next/link"
import { Home, ArrowLeft, Search, MessageSquare, HelpCircle } from "lucide-react"

const font = { fontFamily: "var(--font-display)" }

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* Nav */}
      <nav className="bg-[#FFF8F0] border-b border-[#1a2e1a]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg" style={font}>R</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-[#1a2e1a]" style={font}>ReviewForge</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 relative overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-[#FFE566] rounded-full opacity-20 blur-2xl" />
        <div className="absolute bottom-20 right-[10%] w-40 h-40 bg-[#FFB5B5] rounded-full opacity-20 blur-2xl" />
        <div className="absolute top-40 right-[20%] w-20 h-20 bg-[#D4CCFF] rounded-2xl opacity-30 rotate-12" />
        <div className="absolute bottom-40 left-[15%] w-16 h-16 bg-[#C8F5D4] rounded-xl opacity-30 -rotate-12" />

        <div className="text-center max-w-2xl relative z-10">
          {/* Big 404 */}
          <div className="relative inline-block mb-8">
            <span className="text-[12rem] md:text-[16rem] font-bold text-[#1a2e1a]/5 leading-none select-none" style={font}>404</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#FFE566] w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] flex items-center justify-center">
                <Search className="h-10 w-10 md:h-14 md:w-14 text-[#1a2e1a]" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4" style={font}>
            PAGE NOT FOUND
          </h1>
          <p className="text-lg text-[#1a2e1a]/50 mb-10 max-w-md mx-auto leading-relaxed">
            Looks like this page took a vacation. Let&apos;s get you back on track.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] px-8 py-4 rounded-full text-sm font-bold border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Home className="h-4 w-4" /> Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-[#FFF8F0] text-[#1a2e1a] px-8 py-4 rounded-full text-sm font-bold border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a] hover:shadow-[2px_2px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-[#C8F5D4]"
            >
              <ArrowLeft className="h-4 w-4" /> Go Back
            </button>
          </div>

          {/* Helpful links */}
          <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { icon: Home, label: "Homepage", href: "/", color: "#C8F5D4" },
              { icon: HelpCircle, label: "Help Center", href: "/help", color: "#FFE566" },
              { icon: MessageSquare, label: "Contact Us", href: "/contact", color: "#FFB5B5" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-[#1a2e1a]/10 hover:border-[#1a2e1a] transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-[#1a2e1a]/20 group-hover:border-[#1a2e1a] transition-all"
                  style={{ backgroundColor: link.color }}
                >
                  <link.icon className="h-5 w-5 text-[#1a2e1a]" />
                </div>
                <span className="text-xs font-semibold text-[#1a2e1a]/60 group-hover:text-[#1a2e1a] transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-[#1a2e1a]/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-[#1a2e1a]/30">&copy; 2026 Schroeder Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
