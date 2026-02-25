import { NextRequest, NextResponse } from "next/server"

interface RateLimitEntry {
  count: number
  resetAt: number
}

interface RateLimiterConfig {
  /** Max requests allowed in the window */
  limit: number
  /** Window size in seconds */
  windowSeconds: number
}

/**
 * Maximum number of unique keys stored per limiter.
 * Prevents memory exhaustion from distributed attacks.
 * When exceeded, expired entries are purged; if still over, oldest entries are evicted.
 */
const MAX_STORE_SIZE = 10_000

/**
 * Simple in-memory rate limiter using fixed window per key.
 * Suitable for single-instance deployments (SQLite/single-server).
 * For multi-instance, replace with Redis-based solution.
 */
class RateLimiter {
  private store = new Map<string, RateLimitEntry>()
  private config: RateLimiterConfig
  private cleanupInterval: ReturnType<typeof setInterval> | null = null

  constructor(config: RateLimiterConfig) {
    this.config = config
  }

  /**
   * Check if a request should be allowed.
   * Returns { allowed, retryAfter?, remaining }.
   */
  check(key: string): { allowed: boolean; retryAfter?: number; remaining: number } {
    const now = Date.now()
    const entry = this.store.get(key)

    // Lazy cleanup: start periodic sweep on first use
    if (!this.cleanupInterval) {
      this.cleanupInterval = setInterval(() => this.cleanup(), 60_000)
      if (typeof this.cleanupInterval === "object" && "unref" in this.cleanupInterval) {
        this.cleanupInterval.unref()
      }
    }

    if (!entry || now >= entry.resetAt) {
      // Enforce max store size before adding new entries
      if (!entry && this.store.size >= MAX_STORE_SIZE) {
        this.cleanup()
        // If still over limit after purging expired, evict oldest entries
        if (this.store.size >= MAX_STORE_SIZE) {
          this.evictOldest(Math.floor(MAX_STORE_SIZE * 0.1))
        }
      }

      this.store.set(key, {
        count: 1,
        resetAt: now + this.config.windowSeconds * 1000,
      })
      return { allowed: true, remaining: this.config.limit - 1 }
    }

    if (entry.count >= this.config.limit) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
      return { allowed: false, retryAfter, remaining: 0 }
    }

    entry.count++
    return { allowed: true, remaining: this.config.limit - entry.count }
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.store) {
      if (now >= entry.resetAt) {
        this.store.delete(key)
      }
    }
  }

  /** Evict the N oldest entries (by resetAt) to free memory under pressure. */
  private evictOldest(count: number) {
    const entries = [...this.store.entries()]
      .sort((a, b) => a[1].resetAt - b[1].resetAt)
    for (let i = 0; i < Math.min(count, entries.length); i++) {
      this.store.delete(entries[i][0])
    }
  }
}

// ============ PRE-CONFIGURED LIMITERS ============

/** Public review submission: 10 per minute per IP */
export const reviewLimiter = new RateLimiter({ limit: 10, windowSeconds: 60 })

/** AI endpoints: 20 per minute per IP */
export const aiLimiter = new RateLimiter({ limit: 20, windowSeconds: 60 })

/** Public business lookup: 60 per minute per IP */
export const publicLimiter = new RateLimiter({ limit: 60, windowSeconds: 60 })

/** Auth-protected endpoints: 30 per minute per IP */
export const authLimiter = new RateLimiter({ limit: 30, windowSeconds: 60 })

// ============ HELPER ============

/**
 * Extracts client IP from request headers.
 * Uses x-forwarded-for (reverse proxy), x-real-ip, or falls back to
 * a hash of user-agent + accept-language as a rough fingerprint.
 *
 * NOTE: x-forwarded-for is trustworthy only behind a reverse proxy
 * that overwrites it (Vercel, Cloudflare, nginx). Without one,
 * clients can spoof this header to bypass rate limits.
 */
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  const realIp = req.headers.get("x-real-ip")
  if (realIp) {
    return realIp
  }
  // Fallback: rough fingerprint from headers to avoid grouping all unknown IPs
  const ua = req.headers.get("user-agent") || ""
  const lang = req.headers.get("accept-language") || ""
  return `fp:${simpleHash(ua + lang)}`
}

/** Simple non-crypto hash for fingerprinting (FNV-1a inspired). */
function simpleHash(str: string): string {
  let hash = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i)
    hash = (hash * 0x01000193) >>> 0
  }
  return hash.toString(36)
}

/**
 * Applies rate limiting to a request.
 * Returns null if allowed, or a 429 response if rate limited.
 */
export function applyRateLimit(
  req: NextRequest,
  limiter: RateLimiter,
  prefix = ""
): NextResponse | null {
  const ip = getClientIp(req)
  const key = prefix ? `${prefix}:${ip}` : ip
  const result = limiter.check(key)

  if (!result.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(result.retryAfter || 60),
          "X-RateLimit-Remaining": "0",
        },
      }
    )
  }

  return null
}
