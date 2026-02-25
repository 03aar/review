"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Star, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react"
import { signIn } from "@/lib/auth-client"

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  )
}

function LoginSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-10 w-10 bg-[#1a2e1a]/10 rounded-full mx-auto mb-6 animate-pulse" />
          <div className="h-6 bg-[#1a2e1a]/10 rounded w-40 mx-auto mb-2 animate-pulse" />
        </div>
        <div className="bg-white rounded-3xl p-8 border-2 border-[#1a2e1a]/10 animate-pulse">
          <div className="space-y-4">
            <div className="h-10 bg-[#eef8e6] rounded-xl" />
            <div className="h-10 bg-[#eef8e6] rounded-xl" />
            <div className="h-12 bg-[#eef8e6] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({})

  function validate(): boolean {
    const newErrors: typeof errors = {}
    if (!email.trim()) {
      newErrors.email = "Email is required"
    }
    if (!password.trim()) {
      newErrors.password = "Password is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function clearFieldError(field: "email" | "password") {
    setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setErrors({})
    setLoading(true)
    try {
      const result = await signIn.email({
        email: email.trim(),
        password,
      })
      if (result.error) {
        setErrors({ form: "Invalid email or password. Please try again." })
        setLoading(false)
        return
      }
      toast.success("Signed in successfully!")
      const raw = searchParams.get("callbackUrl") || "/dashboard"
      const callbackUrl = raw.startsWith("/") && !raw.startsWith("//") ? raw : "/dashboard"
      router.push(callbackUrl)
    } catch {
      setErrors({ form: "Something went wrong. Please try again." })
      setLoading(false)
    }
  }

  const inputBase = "w-full px-4 py-2.5 border-2 rounded-xl text-sm focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none bg-[#FFF8F0] text-[#1a2e1a] placeholder:text-[#1a2e1a]/50"
  const inputBorder = (hasError: boolean) => hasError ? "border-red-400" : "border-[#1a2e1a]/20"

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] p-4 relative overflow-hidden">
      <div className="absolute top-20 left-[10%] w-32 h-32 bg-[#C8F5D4] rounded-full opacity-40 blur-xl" />
      <div className="absolute bottom-20 right-[10%] w-40 h-40 bg-[#FFE566] rounded-full opacity-30 blur-xl" />
      <div className="absolute top-1/2 right-[5%] w-16 h-16 bg-[#FFB5B5] rounded-2xl opacity-40 rotate-12" />
      <div className="absolute bottom-1/3 left-[5%] w-12 h-12 bg-[#D4CCFF] rounded-xl opacity-40 -rotate-12" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6" aria-label="ReviewForge home">
            <div className="w-10 h-10 bg-[#1a2e1a] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>R</span>
            </div>
            <span className="text-xl font-bold text-[#1a2e1a]" style={{ fontFamily: "var(--font-display)" }}>ReviewForge</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1a2e1a]" style={{ fontFamily: "var(--font-display)" }}>
            Welcome back
          </h1>
          <p className="text-[#1a2e1a]/50 text-sm mt-1">Sign in to manage your reviews</p>
        </div>

        <div className="bg-white rounded-3xl p-8 border-2 border-[#1a2e1a] shadow-[4px_4px_0px_0px_#1a2e1a]">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {errors.form && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl" role="alert">
                {errors.form}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-sm font-medium text-[#1a2e1a]">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@business.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearFieldError("email") }}
                required
                autoFocus
                autoComplete="email"
                maxLength={255}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "login-email-error" : undefined}
                className={`${inputBase} ${inputBorder(!!errors.email)}`}
              />
              {errors.email && (
                <p id="login-email-error" className="text-xs text-red-500 mt-0.5">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="login-password" className="text-sm font-medium text-[#1a2e1a]">Password</label>
                <span className="text-xs text-[#2d6a4f]/60 cursor-default" title="Password reset coming soon">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearFieldError("password") }}
                  required
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "login-password-error" : undefined}
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
              {errors.password && (
                <p id="login-password-error" className="text-xs text-red-500 mt-0.5">{errors.password}</p>
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-[#1a2e1a]/50">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#2d6a4f] hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1 text-xs text-[#1a2e1a]/30">
          <Star className="h-3 w-3 fill-[#FFE566] text-[#FFE566]" />
          <span>Trusted by 2,000+ businesses</span>
        </div>
      </div>
    </div>
  )
}
