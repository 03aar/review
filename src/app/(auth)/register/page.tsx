"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Star, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react"
import { signUp } from "@/lib/auth-client"

function getPasswordStrength(pw: string): { label: string; color: string; width: string } {
  if (pw.length === 0) return { label: "", color: "", width: "0%" }
  if (pw.length < 8) return { label: "Too short", color: "bg-red-400", width: "20%" }
  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  if (score <= 2) return { label: "Weak", color: "bg-orange-400", width: "40%" }
  if (score <= 3) return { label: "Fair", color: "bg-yellow-400", width: "60%" }
  if (score <= 4) return { label: "Good", color: "bg-lime-400", width: "80%" }
  return { label: "Strong", color: "bg-green-500", width: "100%" }
}

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; form?: string }>({})

  function validate(): boolean {
    const newErrors: typeof errors = {}
    if (!name.trim()) {
      newErrors.name = "Name is required"
    } else if (name.trim().length > 100) {
      newErrors.name = "Name must be under 100 characters"
    }
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      newErrors.email = "Please enter a valid email"
    }
    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (password.length > 128) {
      newErrors.password = "Password must be under 128 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function clearFieldError(field: "name" | "email" | "password") {
    setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setErrors({})
    setLoading(true)
    try {
      const result = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      })
      if (result.error) {
        const msg = result.error.message || "Failed to create account"
        const msgLower = msg.toLowerCase()
        if (result.error.status === 422 || msgLower.includes("exist") || msgLower.includes("already")) {
          setErrors({ email: "An account with this email already exists" })
        } else if (msgLower.includes("password")) {
          setErrors({ password: "Password doesn't meet requirements. Use at least 8 characters." })
        } else {
          setErrors({ form: msg })
        }
        setLoading(false)
        return
      }
      toast.success("Account created! Setting up your dashboard...")
      router.push("/dashboard")
    } catch {
      setErrors({ form: "Something went wrong. Please try again." })
      setLoading(false)
    }
  }

  const inputBase = "w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-[#FFF8F0] text-[#1a2e1a] placeholder:text-[#1a2e1a]/50"
  const inputBorder = (hasError: boolean) => hasError ? "border-red-400" : "border-[#1a2e1a]/20"

  const strength = getPasswordStrength(password)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] p-4 relative overflow-hidden">
      <div className="absolute top-20 right-[10%] w-32 h-32 bg-[#FFE566] rounded-full opacity-40 blur-xl" />
      <div className="absolute bottom-20 left-[10%] w-40 h-40 bg-[#C8F5D4] rounded-full opacity-30 blur-xl" />
      <div className="absolute top-1/3 left-[5%] w-16 h-16 bg-[#D4CCFF] rounded-2xl opacity-40 rotate-12" />
      <div className="absolute bottom-1/2 right-[5%] w-12 h-12 bg-[#FFB5B5] rounded-xl opacity-40 -rotate-12" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6" aria-label="ReviewForge home">
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
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {errors.form && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl" role="alert">
                {errors.form}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="reg-name" className="text-sm font-medium text-[#1a2e1a]">Full Name</label>
              <input
                id="reg-name"
                type="text"
                placeholder="John Smith"
                value={name}
                onChange={(e) => { setName(e.target.value); clearFieldError("name") }}
                required
                autoFocus
                autoComplete="name"
                maxLength={100}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "reg-name-error" : undefined}
                className={`${inputBase} ${inputBorder(!!errors.name)}`}
              />
              {errors.name && (
                <p id="reg-name-error" className="text-xs text-red-500 mt-0.5">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="reg-email" className="text-sm font-medium text-[#1a2e1a]">Email</label>
              <input
                id="reg-email"
                type="email"
                placeholder="you@business.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearFieldError("email") }}
                required
                autoComplete="email"
                maxLength={255}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "reg-email-error" : undefined}
                className={`${inputBase} ${inputBorder(!!errors.email)}`}
              />
              {errors.email && (
                <p id="reg-email-error" className="text-xs text-red-500 mt-0.5">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="reg-password" className="text-sm font-medium text-[#1a2e1a]">Password</label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearFieldError("password") }}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  aria-invalid={!!errors.password}
                  aria-describedby="reg-password-hint"
                  className={`${inputBase} ${inputBorder(!!errors.password)} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a2e1a]/40 hover:text-[#1a2e1a]/70 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password ? (
                <p className="text-xs text-red-500 mt-0.5">{errors.password}</p>
              ) : (
                <>
                  {/* Password strength bar */}
                  {password.length > 0 && (
                    <div className="mt-1.5 space-y-1">
                      <div className="h-1.5 bg-[#1a2e1a]/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300 rounded-full`}
                          style={{ width: strength.width }}
                        />
                      </div>
                      <p className="text-xs text-[#1a2e1a]/50">{strength.label}</p>
                    </div>
                  )}
                  <p id="reg-password-hint" className="text-xs text-[#1a2e1a]/50">
                    Must be at least 8 characters
                  </p>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1a2e1a] text-[#FFF8F0] py-3 rounded-full text-sm font-bold hover:bg-[#0f1f0f] disabled:opacity-50 transition-all border-2 border-[#1a2e1a] shadow-[3px_3px_0px_0px_#1a2e1a] hover:shadow-[1px_1px_0px_0px_#1a2e1a] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-[10px] text-center text-[#1a2e1a]/40 mt-4">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-[#2d6a4f]">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline hover:text-[#2d6a4f]">Privacy Policy</Link>.
          </p>

          <div className="mt-4 text-center">
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
