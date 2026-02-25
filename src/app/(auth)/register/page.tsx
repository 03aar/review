"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Star, ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields")
      return
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    toast.success("Account created! Setting up your dashboard...")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] p-4 relative overflow-hidden">
      <div className="absolute top-20 right-[10%] w-32 h-32 bg-[#FFE566] rounded-full opacity-40 blur-xl" />
      <div className="absolute bottom-20 left-[10%] w-40 h-40 bg-[#C8F5D4] rounded-full opacity-30 blur-xl" />
      <div className="absolute top-1/3 left-[5%] w-16 h-16 bg-[#D4CCFF] rounded-2xl opacity-40 rotate-12" />
      <div className="absolute bottom-1/2 right-[5%] w-12 h-12 bg-[#FFB5B5] rounded-xl opacity-40 -rotate-12" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>R</span>
            </div>
            <span className="text-xl font-bold text-[#1a2e1a]" style={{ fontFamily: "var(--font-display)" }}>ReviewForge</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1a2e1a]" style={{ fontFamily: "var(--font-display)" }}>
            Get started
          </h1>
          <p className="text-[#1a2e1a]/50 text-sm mt-1">Create your account and start collecting reviews</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="reg-name" className="text-sm font-medium text-[#1a2e1a]">Full Name</label>
              <input
                id="reg-name"
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                className="w-full px-4 py-2.5 border-2 border-[#1a2e1a]/20 rounded-xl text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-[#FFF8F0] text-[#1a2e1a] placeholder:text-[#1a2e1a]/30"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="reg-email" className="text-sm font-medium text-[#1a2e1a]">Email</label>
              <input
                id="reg-email"
                type="email"
                placeholder="you@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border-2 border-[#1a2e1a]/20 rounded-xl text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-[#FFF8F0] text-[#1a2e1a] placeholder:text-[#1a2e1a]/30"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="reg-password" className="text-sm font-medium text-[#1a2e1a]">Password</label>
              <input
                id="reg-password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border-2 border-[#1a2e1a]/20 rounded-xl text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-[#FFF8F0] text-[#1a2e1a] placeholder:text-[#1a2e1a]/30"
              />
              <p className="text-xs text-[#1a2e1a]/40">Must be at least 8 characters</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] py-3 rounded-full text-sm font-bold hover:bg-[#0f1f0f] disabled:opacity-50 transition-all border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a] hover:shadow-[1px_1px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              {loading ? "Creating account..." : "Create Account"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-[#1a2e1a]/50">
              Already have an account?{" "}
              <Link href="/login" className="text-[#2d6a4f] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1 text-xs text-[#1a2e1a]/30">
          <Star className="h-3 w-3 fill-[#FFE566] text-[#FFE566]" />
          <span>No credit card required</span>
        </div>
      </div>
    </div>
  )
}
